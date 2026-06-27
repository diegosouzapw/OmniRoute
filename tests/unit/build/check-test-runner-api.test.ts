import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { findRunnerMismatches } from "../../../scripts/check/check-test-runner-api.mjs";

function tmpRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "runner-api-"));
  fs.mkdirSync(path.join(root, "tests/unit/autoCombo"), { recursive: true });
  return root;
}

test("flags a vitest-only-dir test that imports node:test", () => {
  const root = tmpRepo();
  fs.writeFileSync(
    path.join(root, "tests/unit/autoCombo/bad.test.ts"),
    `import { describe, it } from "node:test";\ndescribe("x", () => it("y", () => {}));\n`
  );
  const bad = findRunnerMismatches(root);
  assert.equal(bad.length, 1);
  assert.match(bad[0].file, /autoCombo\/bad\.test\.ts$/);
  assert.match(bad[0].reason, /vitest-only/);
  fs.rmSync(root, { recursive: true, force: true });
});

test("accepts a vitest-only-dir test that imports vitest", () => {
  const root = tmpRepo();
  fs.writeFileSync(
    path.join(root, "tests/unit/autoCombo/good.test.ts"),
    `import { describe, it } from "vitest";\ndescribe("x", () => it("y", () => {}));\n`
  );
  assert.equal(findRunnerMismatches(root).length, 0);
  fs.rmSync(root, { recursive: true, force: true });
});
