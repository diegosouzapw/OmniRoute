import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { analyzeForgottenSiblingTests } from "../../scripts/check/check-forgotten-sibling-tests.mjs";

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "forgotten-sibling-"));
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  return root;
}

test("detects a missing sibling test for a static consumer", () => {
  const root = fixture({
    "src/lib/value.ts": "export const value = 1;\n",
    "src/lib/consumer.ts": 'import { value } from "./value";\nexport const doubled = value * 2;\n',
    "tests/unit/consumer.test.ts": 'import "../../src/lib/consumer";\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: "src/lib/value.ts" }],
    impactMap: { sources: { "src/lib/consumer.ts": ["tests/unit/consumer.test.ts"] } },
    allowlist: [],
  });

  assert.deepEqual(result.findings, [
    {
      changedModule: "src/lib/value.ts",
      changedSymbols: [],
      consumer: "src/lib/consumer.ts",
      candidateTest: "tests/unit/consumer.test.ts",
      reason: "candidate sibling test is absent from the PR diff",
    },
  ]);
});

test("updating the candidate sibling test clears the finding", () => {
  const root = fixture({
    "src/lib/value.ts": "export const value = 1;\n",
    "src/lib/consumer.ts": 'import { value } from "./value";\n',
    "tests/unit/consumer.test.ts": 'import "../../src/lib/consumer";\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [
      { status: "M", file: "src/lib/value.ts" },
      { status: "M", file: "tests/unit/consumer.test.ts" },
    ],
    impactMap: { sources: { "src/lib/consumer.ts": ["tests/unit/consumer.test.ts"] } },
    allowlist: [],
  });

  assert.equal(result.findings.length, 0);
});

test("barrel and dynamic-import consumers remain advisory diagnostics", () => {
  const root = fixture({
    "src/lib/value.ts": "export const value = 1;\n",
    "src/lib/index.ts": 'export { value } from "./value";\n',
    "src/lib/lazy.ts": 'export const load = () => import("./value");\n',
    "tests/unit/index.test.ts": 'import "../../src/lib/index";\n',
    "tests/unit/lazy.test.ts": 'import "../../src/lib/lazy";\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: "src/lib/value.ts" }],
    impactMap: {
      sources: {
        "src/lib/index.ts": ["tests/unit/index.test.ts"],
        "src/lib/lazy.ts": ["tests/unit/lazy.test.ts"],
      },
    },
    allowlist: [],
  });

  assert.equal(result.findings.length, 0);
  assert.deepEqual(
    result.diagnostics.map(({ consumer, kind }) => ({ consumer, kind })),
    [
      { consumer: "src/lib/index.ts", kind: "barrel" },
      { consumer: "src/lib/lazy.ts", kind: "dynamic-import" },
    ]
  );
});

test("a changed workflow file flags its pinning test as a forgotten sibling (#16068)", () => {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "tests/unit/build/check-workflows.test.ts":
      'const p = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: ".github/workflows/quality.yml" }],
    impactMap: {
      sources: {
        ".github/workflows/quality.yml": ["tests/unit/build/check-workflows.test.ts"],
      },
    },
    allowlist: [],
  });

  assert.deepEqual(result.findings, [
    {
      changedModule: ".github/workflows/quality.yml",
      changedSymbols: [],
      consumer: ".github/workflows/quality.yml",
      candidateTest: "tests/unit/build/check-workflows.test.ts",
      reason: "candidate sibling test is absent from the PR diff",
    },
  ]);
});

test("touching the pinning test alongside the workflow file clears the finding", () => {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "tests/unit/build/check-workflows.test.ts":
      'const p = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [
      { status: "M", file: ".github/workflows/quality.yml" },
      { status: "M", file: "tests/unit/build/check-workflows.test.ts" },
    ],
    impactMap: {
      sources: {
        ".github/workflows/quality.yml": ["tests/unit/build/check-workflows.test.ts"],
      },
    },
    allowlist: [],
  });

  assert.equal(result.findings.length, 0);
});

test("a config-mapped file that was not itself changed produces no finding", () => {
  const root = fixture({
    ".github/workflows/quality.yml": "name: quality\n",
    "next.config.mjs": "export default {};\n",
    "tests/unit/build/check-workflows.test.ts":
      'const p = new URL("../../../.github/workflows/quality.yml", import.meta.url);\n',
    "tests/unit/next-config.test.ts": 'const c = path.join(process.cwd(), "next.config.mjs");\n',
  });

  const result = analyzeForgottenSiblingTests({
    root,
    // Only next.config.mjs changed; quality.yml did not, even though it has its own
    // map entry too — it must not be flagged.
    changedEntries: [{ status: "M", file: "next.config.mjs" }],
    impactMap: {
      sources: {
        ".github/workflows/quality.yml": ["tests/unit/build/check-workflows.test.ts"],
        "next.config.mjs": ["tests/unit/next-config.test.ts"],
      },
    },
    allowlist: [],
  });

  assert.deepEqual(result.findings, [
    {
      changedModule: "next.config.mjs",
      changedSymbols: [],
      consumer: "next.config.mjs",
      candidateTest: "tests/unit/next-config.test.ts",
      reason: "candidate sibling test is absent from the PR diff",
    },
  ]);
});

test("a changed src/ file present in the map produces no finding from the config-file loop", () => {
  // src/lib/foo.ts has no production importer in this fixture, so importEdges()
  // never emits an edge for it: the only way it could reach a finding is through
  // the config-file loop treating it as its own module/consumer, which must not
  // happen for a production file (isProduction guards it; that guard belongs to
  // the main importEdges-based loop, not this one).
  const root = fixture({
    "src/lib/foo.ts": "export const foo = 1;\n",
  });

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: "src/lib/foo.ts" }],
    impactMap: { sources: { "src/lib/foo.ts": ["tests/unit/foo.test.ts"] } },
    allowlist: [],
  });

  assert.equal(result.findings.length, 0);
});

test("a deleted sibling test flags a masking risk via the config-file loop, not a finding", () => {
  const root = fixture({});

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [
      { status: "M", file: ".github/workflows/quality.yml" },
      { status: "D", file: "tests/unit/build/check-workflows.test.ts" },
    ],
    impactMap: {
      sources: {
        ".github/workflows/quality.yml": ["tests/unit/build/check-workflows.test.ts"],
      },
    },
    allowlist: [],
  });

  assert.equal(result.findings.length, 0);
  assert.deepEqual(result.maskingRisks, [
    {
      changedModule: ".github/workflows/quality.yml",
      consumer: ".github/workflows/quality.yml",
      candidateTest: "tests/unit/build/check-workflows.test.ts",
      reason: "candidate sibling test was deleted",
    },
  ]);
});

test("an allowlisted config-file/sibling-test pair is suppressed, not a finding", () => {
  const root = fixture({});

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: ".github/workflows/quality.yml" }],
    impactMap: {
      sources: {
        ".github/workflows/quality.yml": ["tests/unit/build/check-workflows.test.ts"],
      },
    },
    allowlist: [
      {
        consumer: ".github/workflows/quality.yml",
        candidateTest: "tests/unit/build/check-workflows.test.ts",
        rationale: "covered by a separate manual CI smoke test, tracked in the issue",
        reference: "#16068",
      },
    ],
  });

  assert.equal(result.findings.length, 0);
  assert.equal(result.suppressed.length, 1);
  assert.equal(result.suppressed[0].candidateTest, "tests/unit/build/check-workflows.test.ts");
});
