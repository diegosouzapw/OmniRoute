/**
 * C1 — the `-<tier>` suffix resolver validates against the EFFECTIVE tier set
 * (learned ?? sync), not raw synced metadata. Without this, the catalog
 * advertises <alias>/<model>-max (learned set) but dispatch refuses to strip
 * `-max` because sync metadata lacks the tier — dead-on-arrival variant.
 * Harness mirrors deepseek-thinking-efforts.test.ts (custom provider +
 * persistDiscoveredModels + async getModelInfo).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-c1-effort-dispatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "c1-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { recordLearnedReasoningEffort, __test_resetLearnedReasoningEffortCaps } =
  await import("@omniroute/open-sse/services/learnedReasoningEffortCaps.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

const PROVIDER = "c1prov";
const MODEL_ID = "c1-model";

async function seed() {
  const connection = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "c1-runtime-efforts",
    apiKey: `${PROVIDER}-key`,
    isActive: true,
    testStatus: "active",
  });
  // Sync tiers deliberately EXCLUDE max — only the learned set will vouch for it.
  await modelDiscovery.persistDiscoveredModels(PROVIDER, connection.id, [
    { id: MODEL_ID, reasoning: { supported_efforts: ["none", "low", "medium", "high"] } },
  ]);
}

test.beforeEach(async () => {
  __test_resetLearnedReasoningEffortCaps();
  await resetStorage();
  await seed();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("-max resolves once the learned set advertises it (sync metadata does not)", async () => {
  // Real record path, executor-style CONNECTION key — NOT the provider alias.
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", MODEL_ID, ["low", "high", "max"]);
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-max`);
  assert.equal(info.provider, PROVIDER);
  assert.equal(info.model, MODEL_ID);
  assert.equal(info.resolvedThinkingEffort, "max");
});

test("-medium still resolves via sync tiers even before anything is learned", async () => {
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-medium`);
  assert.equal(info.model, MODEL_ID);
  assert.equal(info.resolvedThinkingEffort, "medium");
});

test("a tier neither learned nor synced is left untouched (literal id)", async () => {
  recordLearnedReasoningEffort("conn-a", MODEL_ID, ["low"]);
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-ultra`);
  assert.equal(info.resolvedThinkingEffort, undefined);
});
