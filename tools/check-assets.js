#!/usr/bin/env node
import fs from 'fs/promises';
import {existsSync} from 'fs';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8000';
const caseFile = new URL('../data/case-studies.json', import.meta.url);

async function loadCaseStudies() {
  try {
    const txt = await fs.readFile(caseFile, 'utf8');
    return JSON.parse(txt);
  } catch (err) {
    console.error('Failed to read case-studies.json:', err.message);
    return [];
  }
}

async function probe(url, method = 'HEAD') {
  try {
    const res = await fetch(url, { method, redirect: 'follow' });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function localFsCheck(path) {
  // path is relative to repo root; try both as-is and under public/
  const candidates = [path.replace(/^\//, ''), `public/${path.replace(/^\//, '')}`];
  for (const c of candidates) {
    if (existsSync(c)) return { found: true, path: c };
  }
  return { found: false };
}

function alternativesFor(imgPath) {
  const alts = [];
  if (imgPath.startsWith('/assets/')) {
    alts.push(imgPath); // original
    alts.push('/public' + imgPath); // local server mapping
    // jpg fallback in images folder
    const jpg = imgPath.replace('/assets/', '/images/').replace(/\.webp$/i, '.jpg');
    alts.push(jpg);
    alts.push('/public' + jpg);
  } else {
    alts.push(imgPath);
  }
  return [...new Set(alts)];
}

async function main() {
  const cases = await loadCaseStudies();
  if (!cases.length) {
    console.log('No case studies found. Nothing to check.');
    process.exit(0);
  }

  const missing = [];

  for (const c of cases) {
    const imgs = c.images || [];
    for (const img of imgs) {
      const alts = alternativesFor(img);
      let ok = false;
      for (const a of alts) {
        const url = BASE.replace(/\/$/, '') + a;
        // Try HEAD first
        const head = await probe(url, 'HEAD');
        if (head.ok) { ok = true; console.log(`OK (HEAD) ${url}`); break; }
        // If HEAD not allowed or not ok, try GET
        const get = await probe(url, 'GET');
        if (get.ok) { ok = true; console.log(`OK (GET)  ${url}`); break; }
        // continue to next alt
      }
      if (!ok) {
        // last-ditch: check filesystem
        const fsCheck = localFsCheck(img);
        if (fsCheck.found) {
          console.log(`FOUND on disk: ${fsCheck.path} (but not served at ${BASE}${img})`);
        } else {
          console.error(`MISSING: ${img} -> tried: ${alts.join(', ')}`);
          missing.push({ id: c.id, image: img, tried: alts });
        }
      }
    }
  }

  console.log('\nSummary:');
  if (missing.length === 0) {
    console.log('All assets reachable or present on disk.');
    process.exit(0);
  } else {
    console.error(`${missing.length} missing assets:`);
    missing.forEach(m => console.error(` - ${m.id}: ${m.image} (tried ${m.tried.join('; ')})`));
    process.exit(2);
  }
}

main();
