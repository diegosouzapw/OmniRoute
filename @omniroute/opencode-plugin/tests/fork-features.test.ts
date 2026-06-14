/**
 * Tests for the 3 mrmm-fork features backported to @omniroute/opencode-plugin:
 *
 *   1. `normaliseFreeLabel` — free-tier model display names get a consistent
 *      `[Free] ` prefix instead of trailing "(Free)" or ad-hoc "free" words.
 *
 *   2. `resolveApiBlock` — per-provider-prefix API format routing. Anthropic
 *      prefixes (`cc/`, `claude/`, `anthropic/`, `kiro/`, `kr/`) get the
 *      Anthropic SDK block; everything else gets OpenAI-compat.
 *
 *   3. `debugLog` — JSONL request/response capture, gated by
 *      `features.debugLog` and togglable at runtime via
 *      `debugLogEnabled/SetEnabled`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normaliseFreeLabel,
  resolveApiBlock,
  DEFAULT_ANTHROPIC_PREFIXES,
  ensureV1Suffix,
  debugLogEnabled,
  debugLogSetEnabled,
  debugLogClear,
  debugLogRead,
  debugLogAppend,
  createDebugLoggingFetch,
  DebugLogEntry,
} from "../src/index.js";

// ── 1. normaliseFreeLabel ────────────────────────────────────────────────────

test("normaliseFreeLabel: '(Free)' suffix becomes [Free] prefix", () => {
  assert.equal(normaliseFreeLabel("GPT-4.1 (Free)"), "[Free] GPT-4.1");
});

test("normaliseFreeLabel: trailing ' Free' word becomes [Free] prefix", () => {
  assert.equal(
    normaliseFreeLabel("DeepSeek V4 Flash Free"),
    "[Free] DeepSeek V4 Flash"
  );
});

test("normaliseFreeLabel: trailing '-free' (hyphen) becomes [Free] prefix", () => {
  assert.equal(normaliseFreeLabel("Llama 4 Scout-free"), "[Free] Llama 4 Scout");
});

test("normaliseFreeLabel: case-insensitive (FREE, Free, free all match)", () => {
  assert.equal(normaliseFreeLabel("Model A FREE"), "[Free] Model A");
  assert.equal(normaliseFreeLabel("Model A free"), "[Free] Model A");
  assert.equal(normaliseFreeLabel("Model A Free"), "[Free] Model A");
});

test("normaliseFreeLabel: names without 'free' pass through unchanged", () => {
  assert.equal(normaliseFreeLabel("Claude 4.7 Opus"), "Claude 4.7 Opus");
  assert.equal(normaliseFreeLabel("GPT-5"), "GPT-5");
});

test("normaliseFreeLabel: 'free' in the middle of a name is NOT rewritten", () => {
  // Only trailing/standalone "free" markers count; embedded "freedom" stays
  assert.equal(
    normaliseFreeLabel("Freedom Model"),
    "Freedom Model"
  );
});

test("normaliseFreeLabel: empty / whitespace-only inputs are handled", () => {
  // Empty input returns empty; pure whitespace input passes through (no Free marker)
  assert.equal(normaliseFreeLabel(""), "");
  assert.equal(normaliseFreeLabel("   "), "   ");
});

// ── 2. resolveApiBlock ───────────────────────────────────────────────────────

test("resolveApiBlock: cc/* models get the Anthropic SDK block (no /v1)", () => {
  const block = resolveApiBlock("cc/claude-opus-4-7", "https://api.example.com");
  assert.equal(block.id, "anthropic");
  assert.equal(block.npm, "@ai-sdk/anthropic");
  assert.equal(block.url, "https://api.example.com"); // NO /v1 suffix
});

test("resolveApiBlock: claude/*, anthropic/*, kiro/*, kr/* all route to Anthropic", () => {
  for (const id of [
    "claude/claude-opus-4-7",
    "anthropic/claude-sonnet-4",
    "kiro/claude-sonnet-4-5",
    "kr/claude-opus-4-6",
  ]) {
    const block = resolveApiBlock(id, "https://api.example.com");
    assert.equal(block.id, "anthropic", `${id} should route to Anthropic`);
    assert.equal(block.npm, "@ai-sdk/anthropic");
  }
});

test("resolveApiBlock: non-Anthropic models get OpenAI-compat with /v1", () => {
  const block = resolveApiBlock("gpt-4o", "https://api.example.com");
  assert.equal(block.id, "openai-compatible");
  assert.equal(block.npm, "@ai-sdk/openai-compatible");
  assert.equal(block.url, "https://api.example.com/v1");
});

test("resolveApiBlock: user can override anthropicPrefixes to add custom prefixes", () => {
  const block = resolveApiBlock("myproxy/claude-opus", "https://api.example.com", {
    anthropicPrefixes: ["myproxy"],
  });
  assert.equal(block.id, "anthropic");
  assert.equal(block.npm, "@ai-sdk/anthropic");
});

test("resolveApiBlock: empty anthropicPrefixes forces OpenAI-compat for everything", () => {
  const block = resolveApiBlock("cc/claude-opus", "https://api.example.com", {
    anthropicPrefixes: [],
  });
  assert.equal(block.id, "openai-compatible");
});

test("resolveApiBlock: baseURL that already ends in /v1 is not double-suffixed (OpenAI path)", () => {
  const block = resolveApiBlock("gpt-4o", "https://api.example.com/v1");
  assert.equal(block.url, "https://api.example.com/v1"); // idempotent
});

test("resolveApiBlock: model id without '/' uses the id as prefix", () => {
  const block = resolveApiBlock("claude-opus-4-7", "https://api.example.com");
  // The whole id is the prefix, which doesn't match "cc"/"claude" etc.
  // So it falls through to OpenAI-compat.
  assert.equal(block.id, "openai-compatible");
});

test("DEFAULT_ANTHROPIC_PREFIXES: contains the canonical Anthropic aliases", () => {
  assert.deepEqual(DEFAULT_ANTHROPIC_PREFIXES, [
    "cc",
    "claude",
    "anthropic",
    "kiro",
    "kr",
  ]);
});

test("ensureV1Suffix: idempotent for URLs that already end in /v1", () => {
  assert.equal(ensureV1Suffix("https://api.example.com/v1"), "https://api.example.com/v1");
  assert.equal(
    ensureV1Suffix("https://api.example.com/v1/"),
    "https://api.example.com/v1" // trailing slash is stripped
  );
});

test("ensureV1Suffix: appends /v1 when missing", () => {
  assert.equal(ensureV1Suffix("https://api.example.com"), "https://api.example.com/v1");
  assert.equal(ensureV1Suffix("https://api.example.com/"), "https://api.example.com/v1");
});

// ── 3. debugLog ──────────────────────────────────────────────────────────────

test("debugLog: default state is disabled", () => {
  debugLogClear("test-provider-disabled-default");
  assert.equal(debugLogEnabled("test-provider-disabled-default"), false);
});

test("debugLogSetEnabled + debugLogEnabled: roundtrip", () => {
  debugLogSetEnabled("test-provider-toggle", true);
  assert.equal(debugLogEnabled("test-provider-toggle"), true);
  debugLogSetEnabled("test-provider-toggle", false);
  assert.equal(debugLogEnabled("test-provider-toggle"), false);
});

test("debugLogAppend + debugLogRead: roundtrip preserves entry shape", () => {
  const providerId = "test-provider-readroundtrip";
  debugLogClear(providerId);
  const entry: DebugLogEntry = {
    reqId: "req-1",
    providerId,
    ts: 1700000000000,
    url: "https://api.example.com/v1/chat",
    method: "POST",
    reqHeaders: { "content-type": "application/json" },
    reqBody: { model: "gpt-4o", messages: [] },
    resStatus: 200,
    resHeaders: { "content-type": "application/json" },
    resBody: { choices: [] },
    durationMs: 42,
  };
  debugLogAppend(entry);
  const read = debugLogRead(providerId, 10);
  assert.equal(read.length, 1);
  assert.deepEqual(read[0], entry);
});

test("createDebugLoggingFetch: passes through when disabled", async () => {
  const providerId = "test-provider-passthrough";
  debugLogClear(providerId);
  debugLogSetEnabled(providerId, false);
  const calls: unknown[] = [];
  const inner: typeof fetch = async (input) => {
    calls.push(input);
    return new Response("ok", { status: 200 });
  };
  const wrapped = createDebugLoggingFetch(inner, providerId, false);
  const res = await wrapped("https://api.example.com/v1/chat");
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  // No log entry should be written when disabled
  assert.equal(debugLogRead(providerId).length, 0);
});

test("createDebugLoggingFetch: captures request/response when enabled", async () => {
  const providerId = "test-provider-captures";
  debugLogClear(providerId);
  const inner: typeof fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);
  const res = await wrapped("https://api.example.com/v1/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o" }),
  });
  assert.equal(res.status, 200);
  const entries = debugLogRead(providerId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].method, "POST");
  assert.equal(entries[0].resStatus, 200);
  assert.equal(entries[0].url, "https://api.example.com/v1/chat");
  assert.deepEqual(entries[0].reqBody, { model: "gpt-4o" });
});

test("createDebugLoggingFetch: records error without crashing the wrapped fetch", async () => {
  const providerId = "test-provider-error";
  debugLogClear(providerId);
  const inner: typeof fetch = async () => {
    throw new Error("network down");
  };
  const wrapped = createDebugLoggingFetch(inner, providerId, true);
  await assert.rejects(wrapped("https://api.example.com/v1/chat"), /network down/);
  const entries = debugLogRead(providerId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].resStatus, null);
  assert.equal(entries[0].error, "network down");
});

// ── Regression tests for the 3 HIGH-priority bot review fixes ───────────────

test("createDebugLoggingFetch: URL instance input is captured (not 'undefined')", async () => {
  const providerId = "test-provider-url-input";
  debugLogClear(providerId);
  const inner: typeof fetch = async () =>
    new Response("ok", { status: 200 });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);
  await wrapped(new URL("https://api.example.com/v1/chat"));
  const entries = debugLogRead(providerId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].url, "https://api.example.com/v1/chat");
  assert.notEqual(entries[0].url, undefined);
});

test("createDebugLoggingFetch: Request object input captures URL and headers", async () => {
  const providerId = "test-provider-request-input";
  debugLogClear(providerId);
  const inner: typeof fetch = async () =>
    new Response("ok", { status: 200 });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);
  const req = new Request("https://api.example.com/v1/chat", {
    method: "POST",
    headers: { "x-test": "yes" },
  });
  await wrapped(req);
  const entries = debugLogRead(providerId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].url, "https://api.example.com/v1/chat");
  assert.equal(entries[0].reqHeaders["x-test"], "yes");
});

test("createDebugLoggingFetch: SSE response is NOT buffered (resBody is the stream marker)", async () => {
  const providerId = "test-provider-sse";
  debugLogClear(providerId);
  const inner: typeof fetch = async () =>
    new Response("data: hello\n\n", {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
  const wrapped = createDebugLoggingFetch(inner, providerId, true);
  const res = await wrapped("https://api.example.com/v1/stream");
  // The response body must remain readable downstream
  const txt = await res.text();
  assert.equal(txt, "data: hello\n\n");
  const entries = debugLogRead(providerId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].resBody, "[stream]", "SSE responses must not be buffered");
});
