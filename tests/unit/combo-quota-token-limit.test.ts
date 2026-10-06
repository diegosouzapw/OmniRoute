import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-quota-token-limit-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_QUOTA_ROUTING = process.env.OMNIROUTE_QUOTA_AWARE_ROUTING;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_QUOTA_AWARE_ROUTING = "1";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getProviderQuota } = await import("../../src/lib/quota/providerQuotaState.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const dbCore = await import("../../src/lib/db/core.ts");

const log = { info() {}, warn() {}, debug() {}, error() {} };

test.after(() => {
  dbCore.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_QUOTA_ROUTING === undefined) delete process.env.OMNIROUTE_QUOTA_AWARE_ROUTING;
  else process.env.OMNIROUTE_QUOTA_AWARE_ROUTING = ORIGINAL_QUOTA_ROUTING;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("round-robin quota reservation keeps the connection token limit", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "quota token limit test",
    apiKey: "sk-quota-token-limit-test",
    rateLimitOverrides: { tpm: 5000 },
  });
  assert.ok(connection?.id);

  const model = "openai/gpt-4o";
  const combo = {
    name: "quota-token-limit-test",
    strategy: "round-robin",
    config: { maxRetries: 0, disableSessionStickiness: true },
    models: [
      {
        kind: "model",
        provider: "openai",
        providerId: "openai",
        model: "gpt-4o",
        connectionId: connection.id,
        id: "quota-token-limit-test-target",
      },
    ],
  };

  const result = await handleComboChat({
    body: {
      model,
      messages: [{ role: "user", content: "reserve this request" }],
      max_tokens: 8,
      stream: false,
    },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    settings: {},
    log,
    handleSingleModel: async () => Response.json({ choices: [{ message: { content: "ok" } }] }),
  });

  assert.equal(result.ok, true);
  const snapshot = getProviderQuota(connection.id, model);
  assert.equal(snapshot?.known, true);
  assert.equal(snapshot?.tokenLimit, 5000);
  assert.ok((snapshot?.tokensUsed ?? 0) > 0);
});
