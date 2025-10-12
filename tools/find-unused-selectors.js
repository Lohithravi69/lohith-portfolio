const fs = require('fs');
const path = require('path');

function extractStyle(html) {
  const startTag = '<style>';
  const endTag = '</style>';
  const i = html.indexOf(startTag);
  if (i === -1) return null;
  const j = html.indexOf(endTag, i);
  if (j === -1) return null;
  return html.slice(i + startTag.length, j);
}

function splitRules(css) {
  // naive split on '}' keeping the brace
  return css.split('}').map(s => s.trim()).filter(Boolean).map(s => s + '}');
}

function selectorTokens(selector) {
  // split by comma and whitespace, return tokens of interest (.class, #id, tag)
  return selector.split(',').map(s => s.trim()).flatMap(part => {
    // take simple tokens like .foo, #bar, tag
    const tokens = part.split(/\s+/).map(t => t.trim()).filter(Boolean);
    return tokens;
  });
}

function htmlHasToken(html, token) {
  if (!token) return false;
  // class
  if (token.startsWith('.')) {
    const cls = token.slice(1).replace(/[^A-Za-z0-9_-]/g, '');
    const re = new RegExp('class\\s*=\\s*"[^"]*\\b' + cls + '\\b', 'i');
    return re.test(html);
  }
  // id
  if (token.startsWith('#')) {
    const id = token.slice(1).replace(/[^A-Za-z0-9_-]/g, '');
    const re = new RegExp('id\\s*=\\s*"' + id + '"', 'i');
    return re.test(html);
  }
  // attribute or pseudo or complex selectors - skip (assume used)
  if (token.includes('[') || token.includes(':') || token.includes('>') || token.includes('+') || token.includes('~')) return true;
  // tag name
  const tag = token.replace(/[^A-Za-z0-9_-]/g, '').toLowerCase();
  if (!tag) return false;
  const reTag = new RegExp('<' + tag + '(\s|>)', 'i');
  return reTag.test(html);
}

function main() {
  const repo = path.resolve(__dirname, '..');
  const htmlPath = path.join(repo, 'index.html');
  if (!fs.existsSync(htmlPath)) { console.error('index.html missing'); process.exit(2); }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const css = extractStyle(html);
  if (!css) { console.error('no style block'); process.exit(3); }

  const rules = splitRules(css);
  const candidates = [];
  rules.forEach(rule => {
    const parts = rule.split('{');
    if (parts.length < 2) return;
    const selector = parts[0].trim();
    // skip root and data-theme and global selectors
    if (!selector || selector.startsWith(':root') || selector.includes('[data-theme') || selector === '*') return;
    // check tokens
    const tokens = selectorTokens(selector);
    let used = false;
    for (const t of tokens) {
      if (htmlHasToken(html, t)) { used = true; break; }
    }
    if (!used) {
      candidates.push({ selector, rule: rule.trim() });
    }
  });

  console.log('Found', candidates.length, 'candidate unused selectors (heuristic):');
  candidates.forEach((c, i) => {
    console.log(`\n#${i+1}: ${c.selector}`);
    console.log(c.rule.split('\n').slice(0,6).join('\n'));
  });
}

main();
