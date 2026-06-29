/**
 * TDD for the risk-gate pattern catalog (#5 compression roadmap).
 * Run: node --import tsx/esm --test tests/unit/compression/riskGateDetect.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  RISK_PATTERNS,
  SELF_EVIDENT,
  MAX_PEM_LEN,
} from "../../../open-sse/services/compression/riskGate/riskPatterns.ts";
import { detectRiskSpans } from "../../../open-sse/services/compression/riskGate/riskGate.ts";

const ALL = { enabled: true } as const;

describe("riskPatterns catalog", () => {
  it("exposes one entry per category with a global regex", () => {
    const categories = RISK_PATTERNS.map((p) => p.category);
    for (const c of ["private_key", "secret_assignment", "stack_trace", "db_migration", "legal"]) {
      assert.ok(categories.includes(c as never), `missing pattern for ${c}`);
    }
    for (const p of RISK_PATTERNS) assert.ok(p.regex.flags.includes("g"), `${p.category} regex must be global`);
  });

  it("marks private_key as self-evident and secret_assignment as guarded", () => {
    assert.equal(SELF_EVIDENT.has("private_key"), true);
    assert.equal(SELF_EVIDENT.has("secret_assignment"), false);
  });

  it("private_key regex is bounded — adversarial input returns promptly", () => {
    const evil = "-----BEGIN PRIVATE KEY-----\n" + "A".repeat(20000); // never closed
    const start = Date.now();
    RISK_PATTERNS.find((p) => p.category === "private_key")!.regex.lastIndex = 0;
    const m = RISK_PATTERNS.find((p) => p.category === "private_key")!.regex.exec(evil);
    assert.equal(m, null, "unterminated key must not match");
    assert.ok(Date.now() - start < 200, "bounded regex must not hang");
    assert.ok(MAX_PEM_LEN <= 4096);
  });
});

describe("detectRiskSpans — guards", () => {
  it("promotes a self-evident PEM block on a single hit, even in a long message", () => {
    const pem =
      "-----BEGIN PRIVATE KEY-----\nMIIBVQ...short...body\n-----END PRIVATE KEY-----";
    const text = "prose ".repeat(60) + pem + " trailing ".repeat(60);
    const spans = detectRiskSpans(text, ALL);
    assert.equal(spans.length, 1);
    assert.equal(spans[0].category, "private_key");
    assert.equal(text.slice(spans[0].start, spans[0].end), pem);
  });

  it("does NOT promote a lone guarded hit (secret_assignment) in a long message", () => {
    const text = "lorem ".repeat(100) + 'api_key="ABCDEFGH1234567890"' + " ipsum ".repeat(100);
    assert.equal(detectRiskSpans(text, ALL).length, 0);
  });

  it("promotes a lone guarded hit inside a short (<200 char) section", () => {
    const text = 'api_key="ABCDEFGH1234567890"';
    const spans = detectRiskSpans(text, ALL);
    assert.equal(spans.length, 1);
    assert.equal(spans[0].category, "secret_assignment");
  });

  it("promotes guarded hits when >=2 signals corroborate", () => {
    const text =
      "x".repeat(400) +
      '\npassword: "hunter2hunter2"\n' +
      "  at foo (file.js:1:1)\n" +
      "y".repeat(400);
    const spans = detectRiskSpans(text, ALL);
    assert.ok(spans.length >= 2, "two corroborating signals promote both");
  });

  it("promotes db_migration only with >=2 DDL statements", () => {
    const one = "x".repeat(400) + "\nALTER TABLE users ADD COLUMN x int;\n" + "y".repeat(400);
    assert.equal(detectRiskSpans(one, ALL).length, 0, "single DDL in prose is not flagged");
    const two =
      "x".repeat(400) +
      "\nCREATE TABLE a (id int);\nALTER TABLE a ADD COLUMN b int;\n" +
      "y".repeat(400);
    const spans = detectRiskSpans(two, ALL);
    assert.equal(spans.length, 1);
    assert.equal(spans[0].category, "db_migration");
  });

  it("commit-log guard drops a DDL that only appears inside a diff hunk", () => {
    const text =
      "diff --git a/m.sql b/m.sql\n@@ -1,2 +1,3 @@\n+CREATE TABLE a (id int);\n+ALTER TABLE a ADD COLUMN b int;\n";
    assert.equal(detectRiskSpans(text, ALL).length, 0);
  });

  it("detects a k8s Secret block structurally", () => {
    const text =
      "apiVersion: v1\nkind: Secret\nmetadata:\n  name: s\ndata:\n  token: aGVsbG8=\n";
    const spans = detectRiskSpans(text, ALL);
    assert.equal(spans.length, 1);
    assert.equal(spans[0].category, "k8s_secret");
  });

  it("honors the categories allow-list", () => {
    const text = 'api_key="ABCDEFGH1234567890"';
    assert.equal(detectRiskSpans(text, { enabled: true, categories: ["legal"] }).length, 0);
  });
});
