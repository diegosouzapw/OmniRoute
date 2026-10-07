import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-arcee-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const dbCore = await import("../../src/lib/db/core.ts");

test.after(() => {
  dbCore.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const ARCEE_CHAT_URL = "https://api.arcee.ai/api/v1/chat/completions";

test("arcee-ai is offered in the onboarding catalog", () => {
  assert.ok(APIKEY_PROVIDERS["arcee-ai"]);
});

test("arcee-ai has a routing entry in the executor REGISTRY", () => {
  const entry = providerRegistry["arcee-ai"];
  assert.ok(entry, "providerRegistry['arcee-ai'] must be defined");
  assert.equal(entry.id, "arcee-ai");
  assert.equal(entry.alias, "arcee");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, ARCEE_CHAT_URL);
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
});

test("DefaultExecutor routes arcee-ai to Arcee's own base URL, not OpenAI's", () => {
  const executor = new DefaultExecutor("arcee-ai");
  assert.equal(executor.config.baseUrl, ARCEE_CHAT_URL);
  assert.notEqual(executor.config.baseUrl, PROVIDERS.openai.baseUrl);
});
