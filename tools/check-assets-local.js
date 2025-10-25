// Local filesystem asset verifier for case-studies
// Usage: node tools/check-assets-local.js
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'case-studies.json');
if (!fs.existsSync(dataPath)) {
  console.error('Missing', dataPath);
  process.exit(2);
}
const list = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let missing = 0;
console.log('Checking files on disk (workspace root):', process.cwd());
for (const cs of list) {
  const id = cs.id || '<unknown>';
  console.log('\n' + id + ':', cs.title || '');
  const images = Array.isArray(cs.images) ? cs.images : (cs.image ? [cs.image] : []);
  for (const img of images) {
    if (!img) continue;
    const candidates = [];
    // original /assets/ path
    if (img.startsWith('/assets/')) candidates.push(path.join(process.cwd(), 'public', img.replace('/assets/', 'assets/')));
    // public/assets fallback
    if (img.startsWith('/assets/')) candidates.push(path.join(process.cwd(), 'public', 'assets', path.basename(img)));
    // images jpg fallback
    candidates.push(path.join(process.cwd(), 'images', path.basename(img).replace(/\.webp$/, '.jpg')));
    // id-based fallback (take first hyphen segment)
    if (cs.id && cs.id.includes('-')) {
      const maybe = cs.id.split('-')[0];
      candidates.push(path.join(process.cwd(), 'public', 'assets', maybe + '.webp'));
      candidates.push(path.join(process.cwd(), 'images', maybe + '.jpg'));
    }
    let ok = false;
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        console.log('  FOUND', c);
        ok = true;
        break;
      }
    }
    if (!ok) {
      console.log('  MISSING candidates:', candidates.join(' | '));
      missing++;
    }
  }
}
console.log('\nSummary: ' + (missing === 0 ? 'All files exist on disk' : (missing + ' missing files')));
process.exit(missing === 0 ? 0 : 1);
