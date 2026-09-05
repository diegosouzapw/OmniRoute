import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { analyzeForgottenSiblingTests } from "../../../scripts/check/check-forgotten-sibling-tests.mjs";

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
    "tests/unit/consumer.test.ts": 'import "../../../src/lib/consumer";\n',
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
    "tests/unit/consumer.test.ts": 'import "../../../src/lib/consumer";\n',
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
    "tests/unit/index.test.ts": 'import "../../../src/lib/index";\n',
    "tests/unit/lazy.test.ts": 'import "../../../src/lib/lazy";\n',
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
