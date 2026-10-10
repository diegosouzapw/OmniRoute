/**
 * #16068 — path-literal edges: tests that read a workflow/config/doc as a FILE get an
 * `artifacts` edge in the impact map, consumed by the sibling gate and TIA (additively).
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { analyzeForgottenSiblingTests } from "../../scripts/check/check-forgotten-sibling-tests.mjs";
import { buildTestImpactMap } from "../../scripts/quality/build-test-impact-map.mjs";
import { extractPathLiteralEdges } from "../../scripts/quality/lib/pathLiteralEdges.mjs";
import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "path-literal-"));
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  return root;
}

const TRACKED = new Set([
  ".github/workflows/quality.yml",
  "next.config.mjs",
  "eslint.config.mjs",
  "docs/guide.md",
  "package.json",
  "package-lock.json",
  "src/lib/value.ts",
  "tests/unit/other.test.ts",
  "dist/bundle.js",
  ".next/cache.json",
  "coverage/lcov.info",
  "docs/i18n/pt/guide.md",
]);

function extract(testBody: string) {
  const root = fixture({ "tests/unit/a.test.ts": testBody });
  return extractPathLiteralEdges({ root, testFiles: ["tests/unit/a.test.ts"], tracked: TRACKED });
}

test("new URL(..., import.meta.url) literal resolves test-relative", () => {
  const out = extract('const p = new URL("../../.github/workflows/quality.yml", import.meta.url);');
  assert.deepEqual(out, { ".github/workflows/quality.yml": ["tests/unit/a.test.ts"] });
});

test("resolve(here, ...) literal resolves test-relative", () => {
  const out = extract('readFileSync(resolve(here, "../../next.config.mjs"), "utf8");');
  assert.deepEqual(out, { "next.config.mjs": ["tests/unit/a.test.ts"] });
});

test("path.join(process.cwd(), ...) resolves root-relative, including multi-segment joins", () => {
  const out = extract(
    'path.join(process.cwd(), "eslint.config.mjs");\npath.join(process.cwd(), "docs", "guide.md");'
  );
  assert.deepEqual(Object.keys(out), ["docs/guide.md", "eslint.config.mjs"]);
});

test("readFileSync with a plain root-relative literal resolves", () => {
  const out = extract('readFileSync("next.config.mjs", "utf8");');
  assert.deepEqual(out, { "next.config.mjs": ["tests/unit/a.test.ts"] });
});

test("negatives: nonexistent path, import specifier, tests/, generated trees, hub files", () => {
  const out = extract(
    [
      'readFileSync("nope/missing.yml");',
      'import { value } from "../../src/lib/value";',
      'import "../../src/lib/value.ts";',
      'readFileSync("tests/unit/other.test.ts");',
      'readFileSync("dist/bundle.js");',
      'readFileSync(".next/cache.json");',
      'readFileSync("coverage/lcov.info");',
      'readFileSync("docs/i18n/pt/guide.md");',
      'readFileSync("package.json");',
      'readFileSync(path.join(process.cwd(), "package-lock.json"));',
      'readFileSync("src/lib/value.ts");',
    ].join("\n")
  );
  assert.deepEqual(out, {});
});

test("output is sorted and deterministic", () => {
  const a = extract('read("next.config.mjs"); read("eslint.config.mjs"); read("docs/guide.md");');
  assert.deepEqual(Object.keys(a), ["docs/guide.md", "eslint.config.mjs", "next.config.mjs"]);
});

test("TIA selects artifact tests additively and never escalates to __RUN_ALL__", () => {
  const map = {
    sources: { "src/lib/value.ts": ["tests/unit/value.test.ts"] },
    artifacts: { "next.config.mjs": ["tests/unit/nextcfg.test.ts"] },
  };
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs"], map }), [
    "tests/unit/nextcfg.test.ts",
  ]);
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs", "src/lib/value.ts"], map }), [
    "tests/unit/nextcfg.test.ts",
    "tests/unit/value.test.ts",
  ]);
  assert.deepEqual(selectImpacted({ changed: ["README.md"], map }), []);
  // map without an artifacts key keeps the old behavior
  assert.deepEqual(selectImpacted({ changed: ["next.config.mjs"], map: { sources: {} } }), []);
});

test("sibling gate: artifact edge reports a missing test, honours diff, masking and allowlist", () => {
  const root = fixture({});
  const impactMap = {
    sources: {},
    artifacts: { "next.config.mjs": ["tests/unit/nextcfg.test.ts"] },
  };
  const base = { root, impactMap, allowlist: [] };
  const missing = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [{ status: "M", file: "next.config.mjs" }],
  });
  assert.equal(missing.findings.length, 1);
  assert.equal(missing.findings[0].candidateTest, "tests/unit/nextcfg.test.ts");

  const touched = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [
      { status: "M", file: "next.config.mjs" },
      { status: "M", file: "tests/unit/nextcfg.test.ts" },
    ],
  });
  assert.equal(touched.findings.length, 0);

  const deleted = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [
      { status: "M", file: "next.config.mjs" },
      { status: "D", file: "tests/unit/nextcfg.test.ts" },
    ],
  });
  assert.equal(deleted.maskingRisks.length, 1);

  const allowed = analyzeForgottenSiblingTests({
    ...base,
    changedEntries: [{ status: "M", file: "next.config.mjs" }],
    allowlist: [
      {
        consumer: "next.config.mjs",
        candidateTest: "tests/unit/nextcfg.test.ts",
        rationale: "reviewed: config change does not affect this test",
        reference: "#16068",
      },
    ],
  });
  assert.equal(allowed.findings.length, 0);
  assert.equal(allowed.suppressed.length, 1);
});

function gitFixture() {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "package.json": "{}\n",
    "src/lib/value.ts": "export const value = 1;\n",
    "tests/unit/build/check-workflows.test.ts":
      'const qualityWorkflowPath = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n' +
      'readFileSync("package.json");\n',
    "tests/unit/value.test.ts": 'import { value } from "../../src/lib/value";\n',
  });
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["add", "-A"], { cwd: root });
  return root;
}

test("#10408 regression: changed quality.yml names check-workflows.test.ts in gate and TIA", () => {
  const root = gitFixture();
  const map = buildTestImpactMap(root);
  const pinned = "tests/unit/build/check-workflows.test.ts";
  assert.deepEqual(map.artifacts, { ".github/workflows/quality.yml": [pinned] });
  assert.deepEqual(map.sources, { "src/lib/value.ts": ["tests/unit/value.test.ts"] });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: ".github/workflows/quality.yml" }],
    impactMap: map,
    allowlist: [],
  });
  assert.deepEqual(
    result.findings.map((f: { candidateTest: string }) => f.candidateTest),
    [pinned]
  );

  const selected = selectImpacted({ changed: [".github/workflows/quality.yml"], map });
  assert.deepEqual(selected, [pinned]);
});

test("the real check-workflows test is linked to the real quality.yml", () => {
  const artifacts = extractPathLiteralEdges({
    root: REPO_ROOT,
    testFiles: ["tests/unit/build/check-workflows.test.ts"],
  });
  assert.ok(
    artifacts[".github/workflows/quality.yml"]?.includes("tests/unit/build/check-workflows.test.ts")
  );
});

test("determinism: building the map twice is byte-identical", () => {
  const root = gitFixture();
  assert.equal(JSON.stringify(buildTestImpactMap(root)), JSON.stringify(buildTestImpactMap(root)));
});
