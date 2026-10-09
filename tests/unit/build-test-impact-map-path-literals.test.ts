// Path-literal edges in the test impact map.
//
// The import graph only sees `import`/`require`. A test that pins a workflow or a root
// config reads it as a FILE — `new URL("../../.github/workflows/x.yml", import.meta.url)`,
// `readFileSync(resolve(here, "../../next.config.mjs"))`, `path.join(process.cwd(),
// "next.config.mjs")` — so no edge existed and neither the forgotten-sibling gate nor TIA
// could see that the test depends on that artifact. Measured 2026-08-14: 37 test files
// were invisible this way (16 pinning workflows, 20+ pinning root configs).
//
// `artifacts` is a SEPARATE key from `sources` on purpose: `sources` keeps the exact
// import-graph semantics the TIA selector relies on (unmapped src file → __RUN_ALL__), and
// an artifact that nobody pins must never trigger a full run.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  artifactLiteralsOf,
  buildTestImpactMap,
} from "../../scripts/quality/build-test-impact-map.mjs";

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "impact-map-literals-"));
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  return root;
}

test("artifactLiteralsOf resolves test-relative and root-relative path literals to real files", () => {
  const root = fixture({
    ".github/workflows/sibling-fixture.yml": "name: q\n",
    "next.config.mjs": "export default {};\n",
    "config/quality/admission-policy.json": "{}\n",
    "tests/unit/build/workflow.test.ts":
      'const u = new URL("../../../.github/workflows/sibling-fixture.yml", import.meta.url);\n',
    "tests/unit/config.test.ts":
      'import path from "node:path";\nconst a = path.join(process.cwd(), "next.config.mjs");\n' +
      'const b = "config/quality/admission-policy.json";\n',
  });

  assert.deepEqual(
    [...artifactLiteralsOf(path.join(root, "tests/unit/build/workflow.test.ts"), root)].sort(),
    [".github/workflows/sibling-fixture.yml"]
  );
  assert.deepEqual(
    [...artifactLiteralsOf(path.join(root, "tests/unit/config.test.ts"), root)].sort(),
    ["config/quality/admission-policy.json", "next.config.mjs"]
  );
});

test("artifactLiteralsOf ignores import-graph territory, missing files, tests and hub files", () => {
  const root = fixture({
    "src/lib/thing.ts": "export const x = 1;\n",
    "package.json": "{}\n",
    "package-lock.json": "{}\n",
    "tests/unit/other.test.ts": "",
    "tests/fixtures/sample.json": "{}\n",
    "tests/unit/probe.test.ts":
      'import "../../src/lib/thing";\n' + // import territory → sources, not artifacts
      'const s = "../../src/lib/thing.ts";\n' + // literal into src → still not an artifact
      'const missing = "./does-not-exist.yml";\n' +
      'const sibling = "./other.test.ts";\n' + // tests/ are never artifacts…
      'const fx = "../fixtures/sample.json";\n' + // …not even non-test files under tests/
      'const hub = "package.json";\nconst lock = "package-lock.json";\n' + // hub files excluded
      'const mod = "node:fs";\nconst enc = "utf8";\n',
  });

  assert.deepEqual([...artifactLiteralsOf(path.join(root, "tests/unit/probe.test.ts"), root)], []);
});

test("buildTestImpactMap emits artifacts alongside sources and keeps sources import-only", () => {
  const root = fixture({
    ".github/workflows/sibling-fixture.yml": "name: q\n",
    "src/lib/thing.ts": "export const x = 1;\n",
    "tests/unit/workflow.test.ts":
      'const u = new URL("../../.github/workflows/sibling-fixture.yml", import.meta.url);\n',
    "tests/unit/thing.test.ts": 'import { x } from "../../src/lib/thing";\n',
  });

  const map = buildTestImpactMap(root);
  assert.deepEqual(map.sources, { "src/lib/thing.ts": ["tests/unit/thing.test.ts"] });
  assert.deepEqual(map.artifacts, {
    ".github/workflows/sibling-fixture.yml": ["tests/unit/workflow.test.ts"],
  });
  assert.equal(map.generatedFrom, "import-graph+path-literals");
});
