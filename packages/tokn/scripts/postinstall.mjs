#!/usr/bin/env node
// Postinstall: try to build the native binary. Skip on OMNIROUTE_SKIP_TOKN_BUILD=1.
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.OMNIROUTE_SKIP_TOKN_BUILD === '1') {
  console.log('[tokn] postinstall skipped (OMNIROUTE_SKIP_TOKN_BUILD=1).');
  process.exit(0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const build = resolve(__dirname, 'build.mjs');
const r = spawnSync(process.execPath, [build], { stdio: 'inherit' });
process.exit(r.status ?? 0);
