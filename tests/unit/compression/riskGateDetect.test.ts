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
