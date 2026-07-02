// tests/unit/chatcore-upstream-body.test.ts
// Characterization of prepareUpstreamBody — the first internal sub-slice of executeProviderRequest
// (chatCore god-file decomposition, #3501). Uses a fresh temp DB (no payload rules / no detected
// tool limits → defaults). Locks: target-model pinning, the Qwen OAuth user backfill (and its
// guards), and the prompt_cache_key gating (excluded providers + non-OPENAI format never inject).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-upstream-body-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
});

test("pins the target model when it differs from the translated body model", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "model-a", messages: [] },
    modelToCall: "model-b",
    provider: "some-provider",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.model, "model-b");
});

test("leaves the model untouched when it already matches", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "model-a", messages: [] },
    modelToCall: "model-a",
    provider: "some-provider",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.model, "model-a");
});

// PR #5563: the `effectiveToolLimit < MAX_TOOLS_LIMIT` gate was removed from
// truncateToolList, so providers whose proactive limit is >= the 128 default
// (e.g. grok-cli at 200) are actually truncated. Without the gate removal these
// two assertions fail (250 tools would pass through untruncated).
test("truncates the tool list to the grok-cli proactive limit (200) when exceeded", async () => {
  const tools = Array.from({ length: 250 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, parameters: {} },
  }));
  const out = await prepareUpstreamBody({
    translatedBody: { model: "grok-cli-model", messages: [], tools },
    modelToCall: "grok-cli-model",
    provider: "grok-cli",
    targetFormat: "claude",
    credentials: null,
  });
  assert.ok(Array.isArray(out.tools));
  assert.equal(out.tools.length, 200);
});

test("preserves the full tool list when within the grok-cli limit", async () => {
  const tools = Array.from({ length: 150 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, parameters: {} },
  }));
  const out = await prepareUpstreamBody({
    translatedBody: { model: "grok-cli-model", messages: [], tools },
    modelToCall: "grok-cli-model",
    provider: "grok-cli",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.tools.length, 150);
});

test("backfills the Qwen OAuth user when missing", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "qwen-max", messages: [] },
    modelToCall: "qwen-max",
    provider: "qwen",
    targetFormat: "claude",
    credentials: { accessToken: "tok-123" },
  });
  assert.equal(out.user, "omniroute-qwen-oauth");
});

test("does not backfill the Qwen user when an apiKey is present (API-key mode)", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "qwen-max", messages: [] },
    modelToCall: "qwen-max",
    provider: "qwen",
    targetFormat: "claude",
    credentials: { apiKey: "k", accessToken: "tok-123" },
  });
  assert.equal(out.user, undefined);
});

test("does not backfill the Qwen user when one is already set", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "qwen-max", messages: [], user: "real-user" },
    modelToCall: "qwen-max",
    provider: "qwen",
    targetFormat: "claude",
    credentials: { accessToken: "tok-123" },
  });
  assert.equal(out.user, "real-user");
});

test("never injects prompt_cache_key for an excluded provider (codex)", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "gpt-5-codex", messages: [{ role: "user", content: "hi" }] },
    modelToCall: "gpt-5-codex",
    provider: "codex",
    targetFormat: "openai",
    credentials: null,
  });
  assert.equal(out.prompt_cache_key, undefined);
});

test("never injects prompt_cache_key when the target format is not OpenAI", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "claude-x", messages: [{ role: "user", content: "hi" }] },
    modelToCall: "claude-x",
    provider: "claude",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.prompt_cache_key, undefined);
});
