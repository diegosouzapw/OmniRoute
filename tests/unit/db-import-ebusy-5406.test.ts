import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Regression guard for #5406: the database-import route deleted the live
// storage.sqlite + WAL/-shm/-journal sidecars with a plain synchronous
// `fs.unlinkSync` and no retry. On Windows the OS releases the SQLite file
// handle asynchronously after `db.close()` (mmap / antivirus), so the immediate
// unlink races and throws EBUSY. The restore path already solved this with
// `unlinkFileWithRetry` (EBUSY/EPERM backoff); the import path must use the
// same helper instead of raw `fs.unlinkSync`.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const importRoute = join(repoRoot, "src/app/api/db-backups/import/route.ts");

test("#5406: import route uses unlinkFileWithRetry (EBUSY-safe on Windows)", () => {
  const src = readFileSync(importRoute, "utf8");
  assert.match(
    src,
    /unlinkFileWithRetry/,
    "import route must delete the sqlite files via unlinkFileWithRetry (EBUSY retry)"
  );
});

test("#5406: import route does not raw-unlink the live sqlite files (EBUSY race)", () => {
  const src = readFileSync(importRoute, "utf8");
  // The buggy code deleted the sqlite + WAL sidecars with `fs.unlinkSync(filePath)`
  // inside the sqliteFilesToReplace loop. Only that path races to EBUSY; the
  // temp-upload cleanup (`fs.unlinkSync(tmpPath)`) is a different, unlocked file.
  assert.ok(
    !/fs\.unlinkSync\s*\(\s*filePath\b/.test(src),
    "the sqlite-replace loop must use unlinkFileWithRetry, not raw fs.unlinkSync(filePath)"
  );
});
