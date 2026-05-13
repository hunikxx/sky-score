#!/usr/bin/env node
// Copies the static site (index.html + PWA assets) into www/ for Capacitor to bundle.
// Capacitor wants webDir to contain only what ships in the app — not node_modules,
// not the iOS/Android projects, not the build script itself. So we mirror the shell
// into www/ on every sync.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'www');

const FILES = ['index.html', 'manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-maskable.svg'];
const DIRS = ['icons'];

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}
function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) copyRecursive(path.join(src, entry), path.join(dst, entry));
  } else {
    fs.copyFileSync(src, dst);
  }
}

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) copyRecursive(src, path.join(OUT, f));
}
for (const d of DIRS) {
  const src = path.join(ROOT, d);
  if (fs.existsSync(src)) copyRecursive(src, path.join(OUT, d));
}
console.log(`built www/ → ${fs.readdirSync(OUT).length} entries`);
