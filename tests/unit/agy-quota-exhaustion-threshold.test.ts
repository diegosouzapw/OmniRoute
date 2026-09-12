import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-quota-threshold-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const { evaluateQuotaLimitPolicy } = await import("../../src/sse/services/auth.ts");
const { toProviderConnection } = await import("../../src/lib/db/providers/lazyConnectionView.ts");

beforeEach(() => cache.__clearForTests());
after(() => {
  cache.__clearForTests();
  core.resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function seed(provider: string, remaining: number, fractionReported = true) {
  const resetAt = new Date(Date.now() + 86_400_000).toISOString();
  cache.setQuotaCache("threshold-account", provider, {
    "gemini-3.8-flash-high": { remainingPercentage: remaining, resetAt, fractionReported },
    gemini_weekly: { remainingPercentage: remaining, resetAt, fractionReported },
    "claude-opus-4-6-thinking": { remainingPercentage: 0, resetAt },
    claude_gpt_weekly: { remainingPercentage: 0, resetAt },
  });
}

for (const provider of ["agy", "antigravity"]) {
  for (const remaining of [0.01, 0.94, 1, 1.01]) {
    test(`${provider}: positive ${remaining}% is not automatic exhaustion`, () => {
      seed(provider, remaining);
      assert.equal(
        cache.isQuotaExhaustedForRequest("threshold-account", provider, "gemini-3.8-flash-high"),
        false
      );
      assert.equal(
        cache.isQuotaExhaustedForRequest("threshold-account", provider, "claude-opus-4-6-thinking"),
        true
      );
    });
  }

  test(`${provider}: reported zero remains exhausted`, () => {
    seed(provider, 0);
    assert.equal(
      cache.isQuotaExhaustedForRequest("threshold-account", provider, "gemini-3.8-flash-high"),
      true
    );
  });

  test(`${provider}: unreported zero remains unknown`, () => {
    seed(provider, 0, false);
    assert.equal(
      cache.isQuotaExhaustedForRequest("threshold-account", provider, "gemini-3.8-flash-high"),
      false
    );
  });

  test(`${provider}: explicit 99% usage policy still blocks low remaining quota`, () => {
    seed(provider, 0.94);
    const decision = evaluateQuotaLimitPolicy(
      provider,
      toProviderConnection({
        id: "threshold-account",
        provider,
        isActive: true,
        providerSpecificData: {
          limitPolicy: { enabled: true, thresholdPercent: 99, windows: ["gemini_weekly"] },
        },
      }),
      "gemini-3.8-flash-high"
    );
    assert.equal(decision.blocked, true);
    assert.equal(decision.reasons.length, 1);
  });
}
