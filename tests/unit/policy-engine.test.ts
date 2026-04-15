import { describe, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// ──────────────────────────────────────────────────────
//  Policy Engine Tests — FASE-06
// ──────────────────────────────────────────────────────

let tmpDir;

// Set up isolated DB for each test run
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pe-test-"));
  process.env.DATA_DIR = tmpDir;
});

afterEach(() => {
  delete process.env.DATA_DIR;
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("policyEngine", async () => {
  // Dynamic import to pick up DATA_DIR
  const { evaluateRequest, evaluateFirstAllowed } =
    await import("../../src/domain/policyEngine.ts");
  const { registerFallback } = await import("../../src/domain/fallbackPolicy.ts");
  const { setBudget, recordCost } = await import("../../src/domain/costRules.ts");
  const { recordFailedAttempt } = await import("../../src/domain/lockoutPolicy.ts");

  test("allows a basic request with no restrictions", () => {
    const verdict = evaluateRequest({ model: "gpt-4o" });
    assert.equal(verdict.allowed, true);
    assert.equal(verdict.policyPhase, "passed");
    assert.equal(verdict.reason, null);
  });

  test("returns fallback chain when registered", () => {
    registerFallback("pe-model-fb", [
      { provider: "openai", priority: 1, enabled: true },
      { provider: "azure", priority: 2, enabled: true },
    ]);

    const verdict = evaluateRequest({ model: "pe-model-fb" });
    assert.equal(verdict.allowed, true);
    assert.ok(Array.isArray(verdict.adjustments.fallbackChain));
    assert.ok(verdict.adjustments.fallbackChain.length > 0);
  });

  test("denies when budget is exceeded", () => {
    const keyId = `pe-budget-${Date.now()}`;
    setBudget(keyId, { dailyLimitUsd: 0.001 });
    recordCost(keyId, 100);

    const verdict = evaluateRequest({ model: "gpt-4o", apiKeyId: keyId });
    assert.equal(verdict.allowed, false);
    assert.equal(verdict.policyPhase, "budget");
    assert.ok(verdict.reason.includes("Budget exceeded"));
  });

  test("denies when client is locked out", () => {
    const ip = `pe-lockout-${Date.now()}`;
    // Force lockout by recording many failures
    for (let i = 0; i < 20; i++) {
      recordFailedAttempt(ip);
    }

    const verdict = evaluateRequest({ model: "gpt-4o", clientIp: ip });
    assert.equal(verdict.allowed, false);
    assert.equal(verdict.policyPhase, "lockout");
  });

  test("evaluateFirstAllowed returns first allowed model", () => {
    const result = evaluateFirstAllowed(["model-a", "model-b", "model-c"], {});
    assert.equal(result.model, "model-a");
    assert.equal(result.verdict.allowed, true);
  });

  test("evaluateFirstAllowed returns null when all denied", () => {
    const keyId = `pe-all-denied-${Date.now()}`;
    setBudget(keyId, { dailyLimitUsd: 0.001 });
    recordCost(keyId, 100);

    const result = evaluateFirstAllowed(["model-a", "model-b"], { apiKeyId: keyId });
    assert.equal(result.model, null);
    assert.equal(result.verdict.allowed, false);
  });
});
