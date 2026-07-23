import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { goldenSnapshot } from "../../helpers/goldenSnapshot.ts";

// Use an isolated tmpdir so the selftest does not pollute tests/snapshots/
let tmpDir: string;

test("goldenSnapshot writes on first run then matches", (t) => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "golden-selftest-"));

  // First run: UPDATE_GOLDEN=1 → writes
  process.env.UPDATE_GOLDEN = "1";
  goldenSnapshot("selftest/sample", { b: 2, a: 1 }, tmpDir);
  delete process.env.UPDATE_GOLDEN;

  // Re-run without flag: same value (keys re-ordered) → should pass
  assert.doesNotThrow(() => goldenSnapshot("selftest/sample", { a: 1, b: 2 }, tmpDir));

  // Mismatch: different value → should throw
  assert.throws(() => goldenSnapshot("selftest/sample", { a: 1, b: 3 }, tmpDir));

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("goldenSnapshot first-run (no UPDATE_GOLDEN) writes and passes", () => {
  const td = fs.mkdtempSync(path.join(os.tmpdir(), "golden-first-run-"));
  try {
    // File does not exist yet: should write and not throw
    assert.doesNotThrow(() => goldenSnapshot("test/value", { x: 42 }, td));
    // File now exists: same value should pass
    assert.doesNotThrow(() => goldenSnapshot("test/value", { x: 42 }, td));
    // File exists: different value should throw
    assert.throws(() => goldenSnapshot("test/value", { x: 99 }, td));
  } finally {
    fs.rmSync(td, { recursive: true, force: true });
  }
});
