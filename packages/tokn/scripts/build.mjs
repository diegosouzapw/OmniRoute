#!/usr/bin/env node
// Build the native binary for omniroute-tokn-ffi.
// Skips gracefully if cargo/rustc is unavailable.

import { spawnSync } from 'node:child_process';
import { existsSync, symlinkSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..', '..');
const WS_ROOT = join(REPO_ROOT, 'omniroute-rs');

function have(cmd) {
  const r = spawnSync(cmd, ['--version'], { stdio: 'pipe', encoding: 'utf8' });
  return r.status === 0;
}

if (!have('cargo')) {
  console.log('[tokn] cargo not found — skipping native build; will use TS fallback.');
  process.exit(0);
}

const releaseBin = join(WS_ROOT, 'target', 'release', 'omniroute_tokn_ffi.node');
if (existsSync(releaseBin)) {
  console.log(`[tokn] native binary already built at ${releaseBin} — skipping.`);
  console.log('[tokn] (set OMNIROUTE_TOKN_REBUILD=1 to force)');
  if (!process.env.OMNIROUTE_TOKN_REBUILD) process.exit(0);
}

console.log('[tokn] building omniroute-tokn-ffi (release) ...');
const t0 = Date.now();
const r = spawnSync(
  'cargo',
  ['build', '-p', 'omniroute-tokn-ffi', '--release'],
  { cwd: WS_ROOT, stdio: 'inherit' },
);
if (r.status !== 0) {
  console.error('[tokn] cargo build failed — package will use TS fallback at runtime.');
  process.exit(0); // do not fail install
}

console.log(`[tokn] built in ${((Date.now() - t0) / 1000).toFixed(1)}s → ${releaseBin}`);

// Create the canonical .node symlink so JS loaders using the napi-rs standard
// path work without modification. On macOS, cargo produces
// libomniroute_tokn_ffi.dylib; the symlink makes omniroute_tokn_ffi.node resolve
// to the same file.
const linkTarget = join(WS_ROOT, 'target', 'release', 'omniroute_tokn_ffi.node');
try {
  if (existsSync(releaseBin) && !existsSync(linkTarget)) {
    symlinkSync(releaseBin, linkTarget);
    console.log(`[tokn] linked ${linkTarget} -> ${releaseBin}`);
  }
} catch (err) {
  console.log(`[tokn] symlink skipped: ${err.message}`);
}
