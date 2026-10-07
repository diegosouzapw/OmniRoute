import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Node's test runner stops registering tests past a top-level `await import`, so
// every module import — and the DATA_DIR pin that must precede combo.ts — happens
// here, before any `test()` call. Mirrors the combo-attempt-body-isolation harness.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-tpl-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  expandComboSystemPromptIfPresent,
  expandComboSystemPromptTemplates,
  resolveTargetFingerprint,
} = await import("../../open-sse/services/comboAgentMiddleware.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

const CTX = {
  modelId: "openrouter/owl-alpha",
  providerId: "openrouter",
  account: "my-key",
  fingerprint: "fp-123",
};

function createLog() {
  const entries: unknown[] = [];
  const push = (level: string) => (tag: unknown, msg: unknown) => entries.push({ level, tag, msg });
  return {
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
    debug: push("debug"),
    entries,
  };
}

const okResponse = () =>
  new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

const MODELS = ["openai/gpt-4o-mini", "claude/sonnet", "gemini/flash"];

function comboOf(name: string, systemMessage?: string, strategy = "priority") {
  return {
    name,
    strategy,
    models: MODELS,
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    ...(systemMessage ? { system_message: systemMessage } : {}),
  };
}

function bodyWithSystem(content: string) {
  return {
    model: "openai/gpt-4o-mini",
    max_tokens: 100,
    messages: [
      { role: "system", content },
      { role: "user", content: "hi" },
    ],
  };
}

test("messages format: expands all placeholders in messages[0] system content", () => {
  const body = {
    messages: [
      {
        role: "system",
        content: "M={{MODEL_ID}} P={{PROVIDER_ID}} A={{ACCOUNT}} F={{FINGERPRINT}}",
      },
      { role: "user", content: "hi" },
    ],
  };
  const out = expandComboSystemPromptTemplates(body, CTX);
  assert.equal(out.messages[0].content, "M=openrouter/owl-alpha P=openrouter A=my-key F=fp-123");
  assert.equal(out.messages[1].content, "hi");
});

test("instructions (Responses API): expands instructions, leaves client messages untouched", () => {
  const body = {
    instructions: "Model: {{MODEL_ID}}",
    input: "hi",
    messages: [{ role: "system", content: "client {{MODEL_ID}}" }],
  };
  const out = expandComboSystemPromptTemplates(body, CTX);
  assert.equal(out.instructions, "Model: openrouter/owl-alpha");
  assert.equal(out.messages[0].content, "client {{MODEL_ID}}");
});

test("unknown placeholder stays literal", () => {
  const body = { messages: [{ role: "system", content: "{{FOO}} {{MODEL_ID}}" }] };
  const out = expandComboSystemPromptTemplates(body, CTX);
  assert.equal(out.messages[0].content, "{{FOO}} openrouter/owl-alpha");
});

test("no recursion: expanded value is never re-scanned", () => {
  const body = { messages: [{ role: "system", content: "{{MODEL_ID}}" }] };
  const out = expandComboSystemPromptTemplates(body, { ...CTX, modelId: "{{PROVIDER_ID}}" });
  assert.equal(out.messages[0].content, "{{PROVIDER_ID}}");
});

test("empty value expands to empty string", () => {
  const body = { messages: [{ role: "system", content: "[{{FINGERPRINT}}]" }] };
  const out = expandComboSystemPromptTemplates(body, { ...CTX, fingerprint: "" });
  assert.equal(out.messages[0].content, "[]");
});

test("no placeholders: body unchanged (deep equal)", () => {
  const body = {
    messages: [
      { role: "system", content: "plain" },
      { role: "user", content: "hi" },
    ],
  };
  const out = expandComboSystemPromptTemplates(body, CTX);
  assert.deepEqual(out, body);
});

test("messages[0] non-system role: unchanged", () => {
  const body = { messages: [{ role: "user", content: "{{MODEL_ID}}" }] };
  const out = expandComboSystemPromptTemplates(body, CTX);
  assert.equal(out.messages[0].content, "{{MODEL_ID}}");
});

test("expandComboSystemPromptIfPresent: absent system_message passes body through", () => {
  const body = { messages: [{ role: "system", content: "keep {{MODEL_ID}}" }] };
  const out = expandComboSystemPromptIfPresent(body, { system_message: null }, CTX);
  assert.equal(out, body);
  const out2 = expandComboSystemPromptIfPresent(body, {}, CTX);
  assert.equal(out2, body);
});

test("expandComboSystemPromptIfPresent: blank system_message passes body through", () => {
  const body = { messages: [{ role: "system", content: "keep {{MODEL_ID}}" }] };
  const out = expandComboSystemPromptIfPresent(body, { system_message: "   " }, CTX);
  assert.equal(out, body);
});

test("expandComboSystemPromptIfPresent: non-empty system_message expands", () => {
  const body = { messages: [{ role: "system", content: "M={{MODEL_ID}}" }] };
  const out = expandComboSystemPromptIfPresent(body, { system_message: "M={{MODEL_ID}}" }, CTX);
  assert.equal(out.messages[0].content, "M=openrouter/owl-alpha");
});

test("resolveTargetFingerprint: non-fp provider returns null", () => {
  assert.equal(resolveTargetFingerprint({ provider: "openai", executionKey: "k@fp:abc" }), null);
});

test("resolveTargetFingerprint: pinned fingerprint wins", () => {
  assert.equal(
    resolveTargetFingerprint({
      provider: "opencode",
      pinnedFingerprint: "pin1",
      executionKey: "k@fp:abc",
    }),
    "pin1"
  );
});

test("resolveTargetFingerprint: parses @fp: suffix from executionKey", () => {
  assert.equal(resolveTargetFingerprint({ provider: "opencode", executionKey: "k@fp:abc" }), "abc");
});

test("resolveTargetFingerprint: null when no source", () => {
  assert.equal(resolveTargetFingerprint({ provider: "opencode", executionKey: "k" }), null);
});

// ── Integration: hook + gate through handleComboChat (#5501) ──────────────────

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("combo system_message: {{MODEL_ID}} expands to the resolved target model", async () => {
  const seen: string[] = [];
  await handleComboChat({
    body: bodyWithSystem("placeholder"),
    combo: comboOf("cow-tpl-expand", "Model: {{MODEL_ID}}"),
    handleSingleModel: async (received: Record<string, unknown>) => {
      seen.push((received.messages as { content: string }[])[0].content);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.deepEqual(seen, ["Model: openai/gpt-4o-mini"]);
});

test("gate: without combo system_message, client system content is NOT expanded", async () => {
  const seen: string[] = [];
  await handleComboChat({
    body: bodyWithSystem("keep {{MODEL_ID}} literal"),
    combo: comboOf("cow-tpl-gate"),
    handleSingleModel: async (received: Record<string, unknown>) => {
      seen.push((received.messages as { content: string }[])[0].content);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.deepEqual(seen, ["keep {{MODEL_ID}} literal"]);
});

test("{{FINGERPRINT}} on a non-fp target expands to empty string, not literal 'null'", async () => {
  const seen: string[] = [];
  await handleComboChat({
    body: bodyWithSystem("placeholder"),
    combo: comboOf("cow-tpl-fp", "F=[{{FINGERPRINT}}]"),
    handleSingleModel: async (received: Record<string, unknown>) => {
      seen.push((received.messages as { content: string }[])[0].content);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.deepEqual(seen, ["F=[]"]);
});

test("round-robin combo: {{MODEL_ID}} expands to the resolved target model", async () => {
  const seen: string[] = [];
  const routed: string[] = [];
  await handleComboChat({
    body: bodyWithSystem("placeholder"),
    combo: comboOf("cow-tpl-rr", "Model: {{MODEL_ID}}", "round-robin"),
    handleSingleModel: async (received: Record<string, unknown>, modelStr: string) => {
      seen.push((received.messages as { content: string }[])[0].content);
      routed.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.equal(seen.length, 1, "round-robin must dispatch exactly one target");
  assert.deepEqual(seen, [`Model: ${routed[0]}`]);
});

test("round-robin gate: without combo system_message, client system content stays literal", async () => {
  const seen: string[] = [];
  await handleComboChat({
    body: bodyWithSystem("keep {{MODEL_ID}} literal"),
    combo: comboOf("cow-tpl-rr-gate", undefined, "round-robin"),
    handleSingleModel: async (received: Record<string, unknown>) => {
      seen.push((received.messages as { content: string }[])[0].content);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.deepEqual(seen, ["keep {{MODEL_ID}} literal"]);
});
