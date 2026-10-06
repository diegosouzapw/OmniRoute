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
  assert.match(bad[0].file.replace(/\\/g, "/"), /autoCombo\/bad\.test\.ts$/);
  assert.match(bad[0].reason, /vitest-only/);
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("accepts a vitest-only-dir test that imports vitest", () => {
  const root = tmpRepo();
  fs.writeFileSync(
    path.join(root, "tests/unit/autoCombo/good.test.ts"),
    `import { describe, it } from "vitest";\ndescribe("x", () => it("y", () => {}));\n`
  );
  assert.equal(findRunnerMismatches(root).length, 0);
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flags node:test imports in the Vitest-only config roots", () => {
  const root = tmpRepo();
  const dirs = [
    "open-sse/services/__tests__",
    "open-sse/translator/helpers/__tests__",
    "src/lib/memory/__tests__",
    "src/lib/skills/__tests__",
  ];

  for (const dir of dirs) {
    fs.mkdirSync(path.join(root, dir), { recursive: true });
    fs.writeFileSync(
      path.join(root, dir, "bad.test.ts"),
      `import { describe, it } from "node:test";\ndescribe("x", () => it("y", () => {}));\n`
    );
  }

  assert.equal(findRunnerMismatches(root).length, dirs.length);
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
