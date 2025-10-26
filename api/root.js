import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const repoRoot = path.resolve(process.cwd());
    const publicIndex = path.join(repoRoot, 'public', 'index.html');
    if (fs.existsSync(publicIndex)) {
      const html = fs.readFileSync(publicIndex, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.statusCode = 200;
      res.end(html);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('index not found on server');
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('server error');
  }
}
