import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { configFileDepsOf } from "../../scripts/quality/build-test-impact-map.mjs";

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "config-file-deps-"));
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  return root;
}

test("a test that reads a workflow file via new URL(..., import.meta.url) is mapped to it", () => {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "tests/unit/build/check-workflows.test.ts":
      'const p = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n',
  });
  const testFile = path.join(root, "tests/unit/build/check-workflows.test.ts");
  const deps = configFileDepsOf(testFile, root);
  assert.ok(deps.has(".github/workflows/quality.yml"));
});

test("a test that reads a root config via readFileSync(resolve(here, ...)) is mapped to it", () => {
  const root = fixture({
    "next.config.mjs": "export default {};\n",
    "tests/unit/csp-lan-ws-5083.test.ts":
      'const c = readFileSync(resolve(here, "../../next.config.mjs"));\n',
  });
  const testFile = path.join(root, "tests/unit/csp-lan-ws-5083.test.ts");
  const deps = configFileDepsOf(testFile, root);
  assert.ok(deps.has("next.config.mjs"));
});

test("a test that reads a root config via path.join(process.cwd(), ...) is mapped to it", () => {
  const root = fixture({
    "next.config.mjs": "export default {};\n",
    "tests/unit/next-config.test.ts": 'const c = path.join(process.cwd(), "next.config.mjs");\n',
  });
  const testFile = path.join(root, "tests/unit/next-config.test.ts");
  const deps = configFileDepsOf(testFile, root);
  assert.ok(deps.has("next.config.mjs"));
});

test("a config path that does not exist on disk is not reported as a dependency", () => {
  const root = fixture({
    "tests/unit/no-such-config.test.ts":
      'const c = path.join(process.cwd(), "no-such.config.mjs");\n',
  });
  const testFile = path.join(root, "tests/unit/no-such-config.test.ts");
  const deps = configFileDepsOf(testFile, root);
  assert.equal(deps.size, 0);
});

test("a test with no literal config reference has no config-file dependencies", () => {
  const root = fixture({
    "tests/unit/plain.test.ts": 'import { ok } from "node:assert";\nok(true);\n',
  });
  const testFile = path.join(root, "tests/unit/plain.test.ts");
  const deps = configFileDepsOf(testFile, root);
  assert.equal(deps.size, 0);
});
