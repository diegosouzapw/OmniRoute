import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  isTurbopackCacheCorruption,
  purgeTurbopackCache,
  turbopackCacheDirs,
} from "../../scripts/dev/turbopackCacheHeal.mjs";

// Regression for #6289: on Windows, `pnpm dev` fails when Turbopack mmaps a
// corrupted persistent-cache SST file ("os error 1455" / paging file too
// small), surfaced as a misleading `Module not found: Can't resolve
// '@/shared/utils/machine'`. The launcher (scripts/dev/run-next.mjs) uses these
// pure helpers to detect that signature and purge the Turbopack dev cache
// before retrying once. This test covers ONLY the pure logic — reproducing the
// real mmap failure is host-only and out of scope.

test("isTurbopackCacheCorruption matches the corrupted-cache signatures", () => {
  const matching = [
    "failed to mmap SST file .build/next/cache/turbopack/data.sst",
    "Backend error: Storage restore task data failed",
    "memory map failed: os error 1455",
    "The paging file is too small for this operation to complete. (os error 1455)",
    "Module not found: os error 1455 while trying to restore task data",
  ];
  for (const msg of matching) {
    assert.equal(isTurbopackCacheCorruption(msg), true, `should match: ${msg}`);
  }
});

test("isTurbopackCacheCorruption returns false for unrelated errors", () => {
  const unrelated = [
    "Module not found: Can't resolve '@/shared/utils/machine'",
    "EADDRINUSE: address already in use :::20128",
    "TypeError: Cannot read properties of undefined",
    "",
    null,
    undefined,
  ];
  for (const msg of unrelated) {
    assert.equal(isTurbopackCacheCorruption(msg), false, `should NOT match: ${String(msg)}`);
  }
});

test("turbopackCacheDirs resolves both known cache layouts under the dist dir", () => {
  const cwd = "/tmp/omniroute-test";
  const dirs = turbopackCacheDirs(".build/next", cwd);
  assert.deepEqual(dirs, [
    path.join(cwd, ".build/next", "cache", "turbopack"),
    path.join(cwd, ".build/next", "dev", "cache", "turbopack"),
  ]);
});

test("purgeTurbopackCache removes an existing cache/turbopack dir", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tp-cache-heal-"));
  const cacheDir = path.join(tmp, "cache", "turbopack");
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(path.join(cacheDir, "data.sst"), "corrupt");
  assert.equal(fs.existsSync(cacheDir), true);

  const removed = purgeTurbopackCache(cacheDir);

  assert.equal(removed, true);
  assert.equal(fs.existsSync(cacheDir), false);

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("purgeTurbopackCache is a no-op (returns false) when the dir is absent", () => {
  const missing = path.join(os.tmpdir(), "tp-cache-heal-missing-does-not-exist");
  assert.equal(fs.existsSync(missing), false);
  assert.equal(purgeTurbopackCache(missing), false);
});
