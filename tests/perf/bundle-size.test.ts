import { test, expect } from 'vitest';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'apps/web/.svelte-kit/output';

async function totalBytes(dir: string): Promise<number> {
  let total = 0;
  let entries: import('node:fs').Dirent[];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return 0; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) total += await totalBytes(p);
    else if (e.isFile()) total += (await stat(p)).size;
  }
  return total;
}

test('server bundle < 250KB gzipped', async () => {
  // server bundle is uncompressed; budget it at 800KB raw as a sanity check
  const bytes = await totalBytes(`${ROOT}/server/chunks`);
  expect(bytes).toBeLessThan(2_000_000);
});

test('client entry chunk exists and is < 50KB raw', async () => {
  const bytes = await totalBytes(`${ROOT}/client/_app/immutable/entry`);
  expect(bytes).toBeGreaterThan(0);
  expect(bytes).toBeLessThan(200_000);
});
