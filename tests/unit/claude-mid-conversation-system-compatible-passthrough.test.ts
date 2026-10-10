// @ts-nocheck
/**
 * Mid-conversation system turns on a plain `anthropic-compatible-*` connection.
 *
 * The claude → claude passthrough for a non-native provider ran
 * normalizeClaudeUpstreamMessages(), which hoists EVERY system-role turn into the
 * top-level `system`. A client that appends a system notification each turn (e.g. a
 * `<total_tokens>` budget update) therefore grows `system` — the head of the prompt —
 * on every request, so the cached conversation history after it never matches again
 * (observed: ~27K cache read / ~105K cache write per turn on a 133K prompt).
 *
 * Those turns now always stay in place, whatever beta the client sent. The
 * `mid-conversation-system-2026-04-07` beta is forwarded only when the client sent it.
 * These tests assert the FINAL body and headers handed to fetch, not the helper in isolation.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compat-midsys-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resolveClaudeMidConversationSystemPolicy } =
  await import("../../open-sse/services/claudeMidConversationSystem.ts");

const originalFetch = globalThis.fetch;
const PROVIDER = "anthropic-compatible-relay-test";
const MODEL = "claude-opus-5-5";
const MID_SYSTEM_BETA = "mid-conversation-system-2026-04-07";

// Captured Claude Code shape: it negotiates the beta itself when it sends such turns.
const CLAUDE_CODE_HEADERS = {
  "user-agent": "claude-cli/2.1.286 (external, cli)",
  "x-app": "cli",
  "anthropic-beta": `claude-code-20250219,${MID_SYSTEM_BETA},effort-2025-11-24,per-turn-control-2026-07-01`,
};
// Same beta from a non-Claude Code client: identity must not matter.
const SDK_HEADERS = {
  "user-agent": "opencode/1.4.0 ai-sdk/anthropic",
  "anthropic-beta": MID_SYSTEM_BETA,
};
// A client that did NOT negotiate the beta.
const NO_BETA_HEADERS = {
  "user-agent": "claude-cli/2.1.160 (external, cli)",
  "anthropic-beta": "claude-code-20250219,effort-2025-11-24",
};

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function credentials() {
  return {
    apiKey: "sk-relay-test",
    providerSpecificData: { baseUrl: "https://relay.example.test/v1" },
  };
}

/** Synthetic Claude Code-shaped turn `n`: each turn appends assistant/tool/user + a budget notice. */
function buildBody(turns, model = MODEL) {
  const messages = [
    { role: "user", content: [{ type: "text", text: "Initial request" }] },
    { role: "system", content: "Environment instructions: auto mode is active." },
  ];
  for (let i = 0; i < turns; i++) {
    messages.push(
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: `plan ${i}`, signature: `sig-${i}` },
          { type: "tool_use", id: `toolu_${i}`, name: "Bash", input: { command: `ls ${i}` } },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: `toolu_${i}`, content: `result ${i}` }],
      },
      {
        role: "system",
        content: `<total_tokens>${15_000_000 - i * 1000} tokens left</total_tokens>`,
      }
    );
  }
  // The client advances its last breakpoint to the newest tool_result.
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  lastUser.content[lastUser.content.length - 1].cache_control = { type: "ephemeral", ttl: "1h" };
  return {
    model,
    max_tokens: 1024,
    stream: false,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    system: [
      { type: "text", text: "You are Claude Code, Anthropic's official CLI for Claude." },
      { type: "text", text: "BASE SYSTEM", cache_control: { type: "ephemeral", ttl: "1h" } },
    ],
    tools: [{ name: "Bash", description: "Run a command", input_schema: { type: "object" } }],
    messages,
  };
}

async function send(body, { headers = CLAUDE_CODE_HEADERS, model = MODEL } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body || "{}")),
    });
    return new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model,
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 4, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: PROVIDER, model, extendedContext: false },
    credentials: credentials(),
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({ "content-type": "application/json", ...headers }),
    },
    userAgent: headers["user-agent"],
  });
  assert.equal(result.success, true, "request should succeed");
  assert.equal(calls.length, 1, "exactly one upstream call");
  return calls[0];
}

const roles = (messages) => messages.map((m) => m.role);
const systemTexts = (system) => (Array.isArray(system) ? system.map((b) => b.text) : [system]);
const betaTokens = (call) => (call.headers.get("anthropic-beta") || "").split(",").filter(Boolean);
const stripCacheControl = (value) =>
  JSON.parse(JSON.stringify(value), (key, v) => (key === "cache_control" ? undefined : v));

function assertInPlace(call, body) {
  assert.deepEqual(roles(call.body.messages), roles(body.messages));
  assert.deepEqual(call.body.system, body.system);
}

function assertHoisted(call) {
  assert.equal(call.body.messages.filter((m) => m.role === "system").length, 0);
  const texts = systemTexts(call.body.system);
  assert.ok(texts.includes("Environment instructions: auto mode is active."));
  assert.ok(texts.some((t) => /<total_tokens>/.test(t)));
  assert.ok(!betaTokens(call).includes(MID_SYSTEM_BETA), `beta: ${betaTokens(call)}`);
}

test("default: mid-conversation system turns stay in place in the final body", async () => {
  const body = buildBody(3);
  const call = await send(body);

  assert.ok(call.url.startsWith("https://relay.example.test/v1/messages"));
  assert.deepEqual(roles(call.body.messages), roles(body.messages));
  assert.equal(call.body.messages.filter((m) => m.role === "system").length, 4);
  assert.equal(call.body.messages[1].content, "Environment instructions: auto mode is active.");
  assert.match(call.body.messages.at(-1).content, /<total_tokens>/);
  // Top-level system is exactly what the client sent — no hoisted turns appended.
  assert.deepEqual(call.body.system, body.system);
  // Tools, thinking history, message-level config and cache markers survive.
  // (The shared tool normalization may stamp `type: "custom"`; it is deterministic per turn.)
  assert.deepEqual(
    call.body.tools.map(({ name, input_schema }) => ({ name, input_schema })),
    body.tools.map(({ name, input_schema }) => ({ name, input_schema }))
  );
  assert.deepEqual(call.body.messages[2].content[0], body.messages[2].content[0]);
  assert.deepEqual(call.body.output_config, body.output_config);
  const lastToolResult = call.body.messages.at(-2).content.at(-1);
  assert.deepEqual(lastToolResult.cache_control, { type: "ephemeral", ttl: "1h" });
  assert.equal(lastToolResult.type, "tool_result", "tool_result block is not collapsed to text");
  // The client's own beta token reaches upstream next to the rest of its allowlisted set.
  assert.ok(betaTokens(call).includes(MID_SYSTEM_BETA), `beta: ${betaTokens(call)}`);
  assert.ok(betaTokens(call).includes("per-turn-control-2026-07-01"), `beta: ${betaTokens(call)}`);
});

test("default: successive turns keep system stable and earlier messages a prefix", async () => {
  const bodies = [];
  for (const turns of [1, 2, 3, 4]) bodies.push((await send(buildBody(turns))).body);
  for (let i = 1; i < bodies.length; i++) {
    const prev = bodies[i - 1];
    const next = bodies[i];
    assert.deepEqual(next.tools, prev.tools, `tools changed between turn ${i} and ${i + 1}`);
    assert.deepEqual(next.system, prev.system, `system changed between turn ${i} and ${i + 1}`);
    assert.deepEqual(
      stripCacheControl(next.messages.slice(0, prev.messages.length)),
      stripCacheControl(prev.messages),
      `turn ${i} messages are not a prefix of turn ${i + 1}`
    );
  }
});

test("a non-Claude Code client gets the same treatment and its beta is forwarded", async () => {
  const body = buildBody(2);
  const call = await send(body, { headers: SDK_HEADERS });
  assertInPlace(call, body);
  assert.ok(betaTokens(call).includes(MID_SYSTEM_BETA));
});

test("the client's beta token is matched case-insensitively and with spaces", async () => {
  const body = buildBody(2);
  const call = await send(body, {
    headers: {
      ...SDK_HEADERS,
      "anthropic-beta": `effort-2025-11-24, ${MID_SYSTEM_BETA.toUpperCase()} `,
    },
  });
  assertInPlace(call, body);
  assert.ok(
    betaTokens(call).some((t) => t.toLowerCase() === MID_SYSTEM_BETA),
    `beta: ${betaTokens(call)}`
  );
});

test("a token that only looks like the beta is not forwarded", async () => {
  const call = await send(buildBody(2), {
    headers: { ...SDK_HEADERS, "anthropic-beta": `${MID_SYSTEM_BETA}x` },
  });
  assert.ok(!betaTokens(call).some((t) => t.toLowerCase() === MID_SYSTEM_BETA));
});

test("client without the beta: turns still stay in place, and OmniRoute never invents it", async () => {
  const body = buildBody(2);
  const call = await send(body, { headers: NO_BETA_HEADERS });
  assertInPlace(call, body);
  assert.ok(!betaTokens(call).includes(MID_SYSTEM_BETA), `beta: ${betaTokens(call)}`);
});

test("client without any anthropic-beta header: turns stay in place, no beta header invented", async () => {
  const body = buildBody(2);
  const call = await send(body, { headers: { "user-agent": "curl/8.0" } });
  assertInPlace(call, body);
  assert.ok(!betaTokens(call).includes(MID_SYSTEM_BETA), `beta: ${betaTokens(call)}`);
});

test("successive turns from a client without the beta also keep earlier messages a prefix", async () => {
  const bodies = [];
  for (const turns of [1, 2, 3]) {
    bodies.push((await send(buildBody(turns), { headers: NO_BETA_HEADERS })).body);
  }
  for (let i = 1; i < bodies.length; i++) {
    assert.deepEqual(bodies[i].system, bodies[i - 1].system);
    assert.deepEqual(
      stripCacheControl(bodies[i].messages.slice(0, bodies[i - 1].messages.length)),
      stripCacheControl(bodies[i - 1].messages)
    );
  }
});

test("a body carrying an OpenAI developer turn keeps the full legacy hoist", async () => {
  const body = buildBody(2);
  body.messages.splice(2, 0, { role: "developer", content: "developer note" });
  const call = await send(body);
  assertHoisted(call);
  assert.equal(call.body.messages.filter((m) => m.role === "developer").length, 0);
  assert.ok(systemTexts(call.body.system).includes("developer note"));
});

test("leading text system turn is hoisted, directive-only one relocated", async () => {
  const body = buildBody(1);
  body.messages.unshift(
    { role: "system", content: [], output_config: { effort: "low" } },
    { role: "system", content: "[Output Styles] terse" }
  );
  const call = await send(body);
  const msgs = call.body.messages;
  assert.equal(msgs[0].role, "user", "messages[0] must be a real turn");
  assert.equal(msgs[1].role, "system");
  assert.deepEqual(msgs[1].output_config, { effort: "low" });
  assert.deepEqual(systemTexts(call.body.system), [
    ...systemTexts(body.system),
    "[Output Styles] terse",
  ]);
  // Genuine mid-conversation turns after the first user turn keep their place.
  assert.equal(msgs[2].content, "Environment instructions: auto mode is active.");
  assert.match(msgs.at(-1).content, /<total_tokens>/);
});

test("requests without mid-conversation system turns keep their shape and get no extra beta", async () => {
  const body = buildBody(1);
  body.messages = body.messages.filter((m) => m.role !== "system");
  const call = await send(body);
  assert.deepEqual(roles(call.body.messages), roles(body.messages));
  assert.deepEqual(call.body.system, body.system);
  assert.ok(!betaTokens(call).includes(MID_SYSTEM_BETA), "no beta without a surviving turn");
});

test("the caller's body is not mutated, so retries/combo attempts see the original", async () => {
  const body = buildBody(2);
  const snapshot = structuredClone(body);
  const credentialsFixture = credentials();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: MODEL,
        content: [{ type: "text", text: "OK" }],
        usage: { input_tokens: 1, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  for (let attempt = 0; attempt < 2; attempt++) {
    await handleChatCore({
      body,
      modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
      credentials: credentialsFixture,
      log: noopLog(),
      clientRawRequest: { endpoint: "/v1/messages", body, headers: new Headers(SDK_HEADERS) },
      userAgent: SDK_HEADERS["user-agent"],
    });
  }
  assert.deepEqual(body.messages, snapshot.messages);
  assert.deepEqual(body.system, snapshot.system);
});

test("policy: scope", () => {
  const resolve = (extra = {}) =>
    resolveClaudeMidConversationSystemPolicy({
      provider: PROVIDER,
      sourceFormat: "claude",
      targetFormat: "claude",
      ...extra,
    });
  assert.equal(resolve(), true, "plain anthropic-compatible claude passthrough");
  assert.equal(resolve({ targetFormat: "openai" }), false);
  assert.equal(resolve({ provider: "claude" }), false, "native path keeps its own policy");
  assert.equal(
    resolve({ provider: "anthropic-compatible-cc-relay" }),
    false,
    "CC bridge builds its own body"
  );
});
