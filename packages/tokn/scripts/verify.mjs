#!/usr/bin/env node
// Smoke test: import the package and call decide(). Exits 0 on success, 1 on failure.
import { decide, ffiVersion, isHealthy, implKind, binaryPath, loadError } from '../index.js';

async function main() {
  // Wait for eager resolveImpl() to complete.
  await new Promise((r) => setTimeout(r, 500));

  console.log('[verify] implKind     :', implKind());
  console.log('[verify] isHealthy    :', isHealthy());
  console.log('[verify] ffiVersion   :', ffiVersion());
  console.log('[verify] binaryPath   :', binaryPath());
  console.log('[verify] loadError    :', loadError());

  const cases = [
    { model: 'gpt-4o' },
    { model: 'claude-3-5-sonnet-latest' },
    { model: 'gemini-2.0-flash' },
    { model: 'totally-unknown-xyz' },
    { model: 'gpt-4o', tenantId: 'tenant-x' },
  ];

  for (const req of cases) {
    const d = await decide(req);
    console.log(`[verify] decide(${JSON.stringify(req)}) =`, d);
    if (!d.provider || typeof d.provider !== 'string') {
      console.error('[verify] FAIL: missing provider on', req);
      process.exit(1);
    }
  }

  console.log('[verify] OK');
}

main().catch((e) => {
  console.error('[verify] FAIL:', e);
  process.exit(1);
});
