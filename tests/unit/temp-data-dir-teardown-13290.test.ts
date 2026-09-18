import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { createTempDataDir, cleanupTempDataDir } from "../_setup/tempDataDir.ts";

// #13290 — teardown that removes a temp DATA_DIR must close the SQLite handle
// first, or Windows refuses to remove the directory (EPERM).

test("createTempDataDir points DATA_DIR at a fresh directory", () => {
  const previous = process.env.DATA_DIR;
  const { dir, cleanup } = createTempDataDir("omniroute-tempdatadir-test-");
  try {
    assert.equal(process.env.DATA_DIR, dir);
    assert.ok(fs.existsSync(dir), "directory must exist");
  } finally {
    void cleanup();
    process.env.DATA_DIR = previous;
  }
});

test("cleanup removes the directory after the database has been opened", async () => {
  const previous = process.env.DATA_DIR;
  const { dir, cleanup } = createTempDataDir("omniroute-tempdatadir-db-");

  try {
    // Open the DB so a real SQLite handle exists inside the directory. This is the
    // exact shape that fails with EPERM when teardown skips the close.
    const core = await import("../../src/lib/db/core.ts");
    await core.ensureDbInitialized();
    core.getDbInstance();

    const sidecars = fs.readdirSync(dir).filter((f) => f.startsWith("storage.sqlite"));
    assert.ok(
      sidecars.length > 0,
      "the database must actually be open for this test to mean anything"
    );

    await cleanup();

    assert.equal(fs.existsSync(dir), false, "cleanup must remove the directory");
  } finally {
    process.env.DATA_DIR = previous;
  }
});

test("cleanup never throws when the directory is already gone", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tempdatadir-missing-"));
  fs.rmSync(dir, { recursive: true, force: true });

  await assert.doesNotReject(() => cleanupTempDataDir(dir));
});
