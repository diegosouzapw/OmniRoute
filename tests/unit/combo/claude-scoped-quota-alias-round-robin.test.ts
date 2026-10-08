import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-cc-rr-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const rrState = await import("../../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../../src/lib/db/core.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const providerCooldown = await import("../../../open-sse/services/providerCooldownTracker.ts");
const { resolveResilienceSettings } = await import("../../../src/lib/resilience/settings.ts");

const connectionId = "claude-cc-round-robin";
const settings = {
  resilienceSettings: {
    providerCooldown: {
      enabled: true,
      minRetryCooldownMs: 1_000,
      maxRetryCooldownMs: 120_000,
    },
  },
};

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

test.beforeEach(() => {
  rrState.rrCounters.clear();
  rrState.rrStickyTargets.clear();
  quotaCache.__clearForTests();
  providerCooldown.clearCooldownState();
});

test.after(() => {
  try {
    dbCore.resetDbInstance?.();
  } catch {
    // Best-effort teardown for a lazily initialized test database.
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("round-robin canonicalizes cc scoped quota and keeps the sibling model eligible", async () => {
  const resetAt = new Date(Date.now() + 10_000).toISOString();
  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": {
        remainingPercentage: 0,
        resetAt,
        claudeQuota: {
          kind: "weekly_scoped",
          active: true,
          severity: "critical",
          scopeKey: "model:fable",
          modelId: "claude-fable-5-1",
          modelDisplayName: "Fable",
        },
      },
    }
  );

  const combo = {
    name: "claude-cc-scoped-quota-rr",
    strategy: "round-robin",
    config: { maxRetries: 0, disableSessionStickiness: true },
    models: [
      {
        kind: "model",
        provider: "cc",
        providerId: "cc",
        model: "claude-fable-5-1",
        connectionId,
        id: "claude-cc-fable",
      },
      {
        kind: "model",
        provider: "cc",
        providerId: "cc",
        model: "claude-opus-5",
        connectionId,
        id: "claude-cc-opus",
      },
    ],
  };
  const attemptedModels: string[] = [];

  const response = await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings,
    log: makeLog(),
    handleSingleModel: async (_body, modelStr) => {
      attemptedModels.push(modelStr);
      if (modelStr === "cc/claude-fable-5-1") {
        return Response.json(
          {
            error: {
              message:
                "This request would exceed your account's rate limit. Please try again later.",
            },
          },
          {
            status: 429,
            headers: { "x-omniroute-selected-connection-id": connectionId },
          }
        );
      }
      return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(attemptedModels, ["cc/claude-fable-5-1", "cc/claude-opus-5"]);
  assert.equal(
    providerCooldown.isProviderInCooldown("cc", connectionId, resolveResilienceSettings(settings)),
    false
  );
});
