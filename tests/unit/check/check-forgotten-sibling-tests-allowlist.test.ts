import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  analyzeForgottenSiblingTests,
  validateAllowlist,
} from "../../../scripts/check/check-forgotten-sibling-tests.mjs";

test("allowlist entries require consumer, candidate test, rationale, and tracking reference", () => {
  assert.throws(
    () => validateAllowlist([{ consumer: "src/lib/a.ts", candidateTest: "tests/unit/a.test.ts" }]),
    /rationale/
  );
  assert.throws(
    () =>
      validateAllowlist([
        {
          consumer: "src/lib/a.ts",
          candidateTest: "tests/unit/a.test.ts",
          rationale: "Covered by the integration suite during this migration.",
          reference: "later",
        },
      ]),
    /reference/
  );
});

test("allowlist cannot suppress deleted, skipped, or todo candidate tests", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "forgotten-sibling-allowlist-"));
  const files = {
    "src/lib/value.ts": "export const value = 1;\n",
    "src/lib/consumer.ts": 'import { value } from "./value";\n',
    "tests/unit/consumer.test.ts": 'test.skip("masked", () => {});\n',
  };
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  const allowlist = validateAllowlist([
    {
      consumer: "src/lib/consumer.ts",
      candidateTest: "tests/unit/consumer.test.ts",
      rationale: "Temporarily covered by an integration suite while the unit fixture is repaired.",
      reference: "#9530",
    },
  ]);

  for (const status of ["D", "M"]) {
    const result = analyzeForgottenSiblingTests({
      root,
      changedEntries: [
        { status: "M", file: "src/lib/value.ts" },
        { status, file: "tests/unit/consumer.test.ts" },
      ],
      impactMap: { sources: { "src/lib/consumer.ts": ["tests/unit/consumer.test.ts"] } },
      allowlist,
      addedTestLines: status === "M" ? ['+test.todo("still missing");'] : [],
    });

    assert.equal(result.suppressed.length, 0);
    assert.equal(result.maskingRisks.length, 1);
  }
});

test("a reviewed exception suppresses only its unchanged candidate test", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "forgotten-sibling-reviewed-"));
  for (const [file, contents] of Object.entries({
    "src/lib/value.ts": "export const value = 1;\n",
    "src/lib/consumer.ts": 'import { value } from "./value";\n',
    "tests/unit/consumer.test.ts": 'import "../../../src/lib/consumer";\n',
  })) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }

  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: [{ status: "M", file: "src/lib/value.ts" }],
    impactMap: { sources: { "src/lib/consumer.ts": ["tests/unit/consumer.test.ts"] } },
    allowlist: validateAllowlist([
      {
        consumer: "src/lib/consumer.ts",
        candidateTest: "tests/unit/consumer.test.ts",
        rationale: "Covered by the integration suite while this consumer is being migrated.",
        reference: "#9530",
      },
    ]),
  });

  assert.equal(result.findings.length, 0);
  assert.equal(result.suppressed.length, 1);
});
