import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-rm-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const providers = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("call logs persist requestedModel and allow filtering by requested model", async () => {
  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-5.2-mini",
    requestedModel: "openai/gpt-5.2-codex",
    provider: "openai",
    duration: 123,
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { id: "resp_1" },
  });

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].model, "openai/gpt-5.2-mini");
  assert.equal(all[0].requestedModel, "openai/gpt-5.2-codex");

  const byRequested = await callLogs.getCallLogs({ model: "gpt-5.2-codex", limit: 10 });
  assert.equal(byRequested.length, 1);
  assert.equal(byRequested[0].requestedModel, "openai/gpt-5.2-codex");

  const detail = await callLogs.getCallLogById(all[0].id);
  assert.equal(detail?.requestedModel, "openai/gpt-5.2-codex");
});

test("requestedModel uses provider node prefix for openai-compatible provider at save time", async () => {
  const providerId = "openai-compatible-chat-07dea2c6-269e-45f7-b731-b310bc016eb8";

  await providers.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: "OrcAI",
    prefix: "orc",
    apiType: "chat",
    baseUrl: "https://api.orc.ai/v1",
  });

  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "gpt-5.4",
    requestedModel: `${providerId}/gpt-5.4`,
    provider: providerId,
    duration: 200,
  });

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].requestedModel, "orc/gpt-5.4");

  const detail = await callLogs.getCallLogById(all[0].id);
  assert.equal(detail?.requestedModel, "orc/gpt-5.4");
});

test("requestedModel read-time transformation for old logs stored with UUID prefix", async () => {
  const providerId = "openai-compatible-chat-aabbccdd-1111-2222-3333-444455556666";

  await providers.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: "MyAI",
    prefix: "myai",
    apiType: "chat",
    baseUrl: "https://api.my.ai/v1",
  });

  const db = core.getDbInstance();
  const logId = `old-log-${Date.now()}`;
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, requested_model, provider,
      account, duration, tokens_in, tokens_out, cache_source)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'gpt-4', ?, ?, '-', 100, 10, 20, 'upstream')`
  ).run(logId, new Date().toISOString(), `${providerId}/gpt-4`, providerId);

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].requestedModel, "myai/gpt-4");

  const detail = await callLogs.getCallLogById(logId);
  assert.equal(detail?.requestedModel, "myai/gpt-4");
});

test("requestedModel unchanged for openai-compatible provider without registered node", async () => {
  const providerId = "openai-compatible-chat-99999999-9999-9999-9999-999999999999";

  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "gpt-3",
    requestedModel: `${providerId}/gpt-3`,
    provider: providerId,
    duration: 50,
  });

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].requestedModel, `${providerId}/gpt-3`);
});

test("requestedModel for anthropic-compatible provider with prefix", async () => {
  const providerId = "anthropic-compatible-aaaabbbb-cccc-dddd-eeee-ffffaaaabbbb";

  await providers.createProviderNode({
    id: providerId,
    type: "anthropic-compatible",
    name: "MyAnthropicClone",
    prefix: "mac",
    apiType: "chat",
    baseUrl: "https://api.mac.ai/v1",
  });

  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "claude-opus-4",
    requestedModel: `${providerId}/claude-opus-4`,
    provider: providerId,
    duration: 300,
  });

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].requestedModel, "mac/claude-opus-4");
});
