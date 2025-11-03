#!/usr/bin/env node
/*
Script: fetch-lighthouse-artifact.js

Usage:
  GITHUB_TOKEN=ghp_xxx node scripts/fetch-lighthouse-artifact.js --owner Lohithravi69 --repo lohith-portfolio --workflow run-lighthouse.yml --branch blackboxai/fix-github-actions-versions

This script locates the latest successful workflow run for a given workflow file (or id)
on a branch, finds artifacts for that run, and downloads any artifact whose name
contains "lighthouse" (case-insensitive). It saves the zip to ./tmp-lh-artifact-download.zip
and prints the path.

Requires:
  - Node.js 18+ (global fetch available)
  - GITHUB_TOKEN environment variable with repo read access
*/

import fs from 'fs';
import path from 'path';

function usageAndExit(msg) {
  if (msg) console.error(msg);
  console.error('\nUsage: GITHUB_TOKEN=... node scripts/fetch-lighthouse-artifact.js --owner OWNER --repo REPO --workflow WORKFLOW_YML --branch BRANCH');
  process.exit(msg ? 1 : 0);
}

// minimal arg parsing to avoid external deps
function parseArgs() {
  const out = {};
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = args[i+1] && !args[i+1].startsWith('--') ? args[i+1] : true;
      out[key] = val;
      if (val !== true) i++;
    } else if (a.startsWith('-')) {
      const key = a.slice(1);
      const val = args[i+1] && !args[i+1].startsWith('-') ? args[i+1] : true;
      out[key] = val;
      if (val !== true) i++;
    }
  }
  return out;
}

const argv = parseArgs();
const owner = argv.owner || argv.o;
const repo = argv.repo || argv.r;
const workflow = argv.workflow || argv.w;
const branch = argv.branch || argv.b || 'main';
const token = process.env.GITHUB_TOKEN || argv.token;

if (!owner || !repo || !workflow || !token) {
  usageAndExit('Missing required parameter or GITHUB_TOKEN env var.');
}

const apiBase = `https://api.github.com/repos/${owner}/${repo}`;

async function api(pathSuffix) {
  const url = apiBase + pathSuffix;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'fetch-lighthouse-artifact-script'
    }
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GitHub API ${res.status} ${res.statusText}: ${t}`);
  }
  return res.json();
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/octet-stream' }
  });
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return dest;
}

async function main() {
  console.log('Finding workflow runs for', workflow, 'on branch', branch);
  const runsResp = await api(`/actions/workflows/${encodeURIComponent(workflow)}/runs?branch=${encodeURIComponent(branch)}&per_page=20`);
  const runs = runsResp.workflow_runs || [];
  if (!runs.length) throw new Error('No workflow runs found.');
  const goodRun = runs.find(r => r.conclusion === 'success') || runs[0];
  console.log('Selected run id', goodRun.id, 'status', goodRun.status, 'conclusion', goodRun.conclusion);

  const artifactsResp = await api(`/actions/runs/${goodRun.id}/artifacts`);
  const artifacts = artifactsResp.artifacts || [];
  if (!artifacts.length) throw new Error('No artifacts found for run ' + goodRun.id);

  const lhArtifact = artifacts.find(a => /lighthouse/i.test(a.name)) || artifacts[0];
  console.log('Will download artifact:', lhArtifact.name, 'id', lhArtifact.id);

  const destDir = path.resolve(process.cwd(), 'tmp-lh-artifact-download');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const zipPath = path.join(destDir, `${lhArtifact.name.replace(/[^a-z0-9-_]/gi,'_')}.zip`);

  // Use the archive endpoint
  const archiveUrl = `${apiBase}/actions/artifacts/${lhArtifact.id}/zip`;
  console.log('Downloading to', zipPath);
  await download(archiveUrl, zipPath);
  console.log('Saved artifact to', zipPath);
  console.log('You can unzip it with: unzip', zipPath);
}

main().catch(err => {
  console.error('Error:', err.message || err);
  process.exit(2);
});
