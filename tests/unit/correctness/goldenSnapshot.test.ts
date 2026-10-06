import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { goldenSnapshot } from "../../helpers/goldenSnapshot.ts";

// Use an isolated tmpdir so the selftest does not pollute tests/snapshots/
let tmpDir: string;

test.beforeEach((t) => {
  const previous = process.env.UPDATE_GOLDEN;
  delete process.env.UPDATE_GOLDEN;
  t.after(() => {
    if (previous === undefined) delete process.env.UPDATE_GOLDEN;
    else process.env.UPDATE_GOLDEN = previous;
  });
});

test("goldenSnapshot writes only with explicit update then validates without rewriting", () => {
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
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("goldenSnapshot fails closed when an expected snapshot is missing", () => {
  const td = fs.mkdtempSync(path.join(os.tmpdir(), "golden-first-run-"));
  try {
    for (const flag of [undefined, "0", "false"]) {
      if (flag === undefined) delete process.env.UPDATE_GOLDEN;
      else process.env.UPDATE_GOLDEN = flag;
      assert.throws(
        () => goldenSnapshot("test/value", { x: 42 }, td),
        /missing golden snapshot.*UPDATE_GOLDEN=1/i
      );
      assert.deepEqual(fs.readdirSync(td), [], "validation must not create or approve evidence");
    }
  } finally {
    fs.rmSync(td, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
