import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

/**
 * #15534 real-path probes. The issue's production 400 sent Anthropic a thinking
 * block with empty text and a ~2408-char non-empty signature during a combo
 * codex → claude fallback. These tests drive the FULL chat pipeline (route
 * handler → combo resolution → translation → executor dispatch) with mocked
 * upstream fetches and inspect the exact serialized outbound Anthropic body.
 *
 * What they pin:
 * 1. A normal codex Responses leg (encrypted-only reasoning) never yields a
 *    signed thinking block on the Claude fallback attempt — provenance probes
 *    at translator level are mirrored here end-to-end.
 * 2. A deliberately FOREIGN signed-empty historical block is converted to
 *    redacted_thinking before dispatch (the existing historical-turn path),
 *    the mocked 400 triggers exactly one recovery retry, and the active
 *    tool-use cycle survives that retry verbatim.
 *
 * No signature is ever attributed to codex by the fixtures themselves: the
 * signed block in test 2 is explicitly the CLIENT's replayed history.
 */

const harness = await createChatPipelineHarness("codex-claude-sig-15534");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;

const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";
const ENCRYPTED_CONTENT_SENTINEL = "encrypted-codex-state:" + "B".repeat(910);

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function seedOAuthCodex() {
  const providersDb = await import("../../src/lib/db/providers.ts");
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-sig-15534",
    email: "codex-sig@example.test",
    accessToken: "mock-codex-access-token",
    refreshToken: "mock-codex-refresh-token",
    tokenType: "Bearer",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function codexResponsesSse() {
  const response = {
    id: "resp_sig_15534",
    object: "response",
    status: "in_progress",
    model: "gpt-5.6-sol",
    output: [],
  };
  return [
    { type: "response.created", response },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: {
        id: "rs_sig_15534",
        type: "reasoning",
        encrypted_content: ENCRYPTED_CONTENT_SENTINEL,
        summary: [],
      },
    },
    {
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "rs_sig_15534",
        type: "reasoning",
        encrypted_content: ENCRYPTED_CONTENT_SENTINEL,
        summary: [],
      },
    },
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { id: "msg_sig_15534", type: "message", role: "assistant", content: [] },
    },
    {
      type: "response.content_part.added",
      item_id: "msg_sig_15534",
      output_index: 1,
      content_index: 0,
      part: { type: "output_text", text: "", annotations: [] },
    },
    {
      type: "response.output_text.delta",
      item_id: "msg_sig_15534",
      output_index: 1,
      content_index: 0,
      delta: "Codex answered first.",
    },
    {
      type: "response.output_text.done",
      item_id: "msg_sig_15534",
      output_index: 1,
      content_index: 0,
      text: "Codex answered first.",
    },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: {
        id: "msg_sig_15534",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Codex answered first.", annotations: [] }],
      },
    },
    {
      type: "response.completed",
      response: {
        ...response,
        status: "completed",
        output: [
          { id: "rs_sig_15534", type: "reasoning", summary: [] },
          {
            id: "msg_sig_15534",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "Codex answered first.", annotations: [] }],
          },
        ],
        usage: { input_tokens: 8, output_tokens: 9, total_tokens: 17 },
      },
    },
  ]
    .map((event) => `data: ${JSON.stringify(event)}\n\n`)
    .join("");
}

function anthropicSignature400() {
  return new Response(
    JSON.stringify({
      type: "error",
      error: {
        type: "invalid_request_error",
        message: "messages.1.content.0: Invalid `signature` in `thinking` block",
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

type UpstreamCapture = { url: string; body: any };

test("#15534 real path: codex encrypted reasoning never sends a signed thinking block to the Claude fallback leg", async () => {
  await seedOAuthCodex();
  await seedConnection("claude", { apiKey: "sk-claude-15534" });
  await combosDb.createCombo({
    name: "sig-15534-priority",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["codex/gpt-5.6-sol", "claude/claude-opus-5-5"],
  });

  const upstream: UpstreamCapture[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    const text = typeof init.body === "string" ? init.body : "";
    let parsed: any = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }
    upstream.push({ url: target, body: parsed });

    if (target === CODEX_RESPONSES_URL) {
      // Turn 1: codex healthy. Turn 2: codex fails → combo falls back to claude.
      if (upstream.filter((c) => c.url === CODEX_RESPONSES_URL).length === 1) {
        return new Response(codexResponsesSse(), {
          status: 200,
          headers: { "Content-Type": "text/event-stream; charset=utf-8" },
        });
      }
      return new Response(JSON.stringify({ error: { message: "codex upstream down" } }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (target.includes("api.anthropic.com")) {
      return buildClaudeResponse("Claude fallback answered", "claude-opus-5-5");
    }
    throw new Error(`Unexpected upstream fetch: ${target}`);
  };

  // Turn 1 — served by the codex leg (streaming so reasoning items appear).
  const first = await handleChat(
    buildRequest({
      body: {
        model: "sig-15534-priority",
        stream: true,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "Plan the migration." }],
      },
    })
  );
  assert.equal(first.status, 200, await first.text());

  // Turn 2 — client replays the assistant turn exactly as OmniRoute emitted it,
  // codex fails, fallback hits Claude. This is the incident's shape.
  const second = await handleChat(
    buildRequest({
      body: {
        model: "sig-15534-priority",
        stream: false,
        messages: [
          { role: "user", content: "Plan the migration." },
          { role: "assistant", content: "Codex answered first." },
          { role: "user", content: "Proceed." },
        ],
      },
    })
  );
  assert.equal(second.status, 200, await second.text());

  const claudeCalls = upstream.filter((c) => c.url.includes("api.anthropic.com"));
  assert.ok(claudeCalls.length >= 1, "combo must reach the claude fallback leg");
  for (const call of claudeCalls) {
    const serialized = JSON.stringify(call.body);
    assert.equal(
      serialized.includes('"signature"'),
      false,
      "no thinking signature may appear in any outbound Anthropic body"
    );
    assert.equal(
      serialized.includes(ENCRYPTED_CONTENT_SENTINEL),
      false,
      "codex encrypted reasoning must not leak into the Claude request"
    );
  }
});

test("#15534 real path: a foreign signed-empty historical block is sanitized, rejected once, and recovered without touching the active tool cycle", async () => {
  await seedConnection("claude", { apiKey: "sk-claude-15534-foreign" });
  await combosDb.createCombo({
    name: "sig-15534-foreign",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["claude/claude-opus-5-5"],
  });

  // Deliberately FOREIGN signed-empty thinking in HISTORICAL turns, plus a
  // complete active tool cycle whose thinking must survive recovery verbatim.
  const FOREIGN_SIGNATURE = "FOREIGN_NON_ANTHROPIC_SIGNATURE_SENTINEL";
  const clientBody = {
    model: "sig-15534-foreign",
    stream: false,
    messages: [
      { role: "user", content: [{ type: "text", text: "run the checks" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "", signature: FOREIGN_SIGNATURE },
          { type: "text", text: "starting" },
        ],
      },
      { role: "user", content: [{ type: "text", text: "continue" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "needed for the tool", signature: "ACTIVE_CYCLE_SIG" },
          { type: "tool_use", id: "toolu_15534", name: "Bash", input: { cmd: "ls" } },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_15534", content: "ok" }],
      },
    ],
  };

  const claudeBodies: any[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    if (!target.includes("api.anthropic.com")) {
      throw new Error(`Unexpected upstream fetch: ${target}`);
    }
    const text = typeof init.body === "string" ? init.body : "";
    let parsed: any = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }
    claudeBodies.push(parsed);
    // First attempt: exact incident 400. Recovery retry: success.
    if (claudeBodies.length === 1) return anthropicSignature400();
    return buildClaudeResponse("Recovered after signature retry", "claude-opus-5-5");
  };

  const response = await handleChat(buildRequest({ body: clientBody }));
  assert.equal(response.status, 200, await response.text());

  assert.equal(claudeBodies.length, 2, "recovery is bounded to one retry");

  // First wire body: the foreign signed thinking in HISTORICAL turns must NOT
  // reach Anthropic as a signed `thinking` block (claudeHelper's historical
  // sanitization converts it to redacted_thinking); the signed form only
  // survives verbatim on the latest assistant turn's verbatim-preserve path.
  const firstContent = claudeBodies[0].messages.flatMap((m: any) => m.content ?? []);
  const firstThinking = firstContent.filter((b: any) => b?.type === "thinking");
  assert.equal(
    firstThinking.some((b: any) => b.signature === FOREIGN_SIGNATURE),
    false,
    "foreign signed thinking must not be forwarded as a signed thinking block in historical turns"
  );
  const serializedFirst = JSON.stringify(claudeBodies[0]);
  assert.equal(
    serializedFirst.includes(FOREIGN_SIGNATURE),
    false,
    "the foreign signature value must not appear anywhere in the first outbound body"
  );
  assert.ok(
    firstContent.some((b: any) => b?.type === "tool_use" && b.id === "toolu_15534"),
    "active tool_use is present on the first attempt"
  );

  // Retry body: historical thinking removed, active-cycle thinking preserved.
  const retryContent = claudeBodies[1].messages.flatMap((m: any) => m.content ?? []);
  const retryThinking = retryContent.filter((b: any) => b?.type === "thinking");
  assert.equal(
    retryThinking.some((b: any) => b.signature === FOREIGN_SIGNATURE),
    false,
    "rejected historical thinking is stripped on the recovery retry"
  );
  assert.ok(
    retryThinking.some((b: any) => b.signature === "ACTIVE_CYCLE_SIG"),
    "active tool-cycle thinking survives the recovery retry verbatim"
  );
  assert.ok(
    retryContent.some((b: any) => b?.type === "tool_use" && b.id === "toolu_15534"),
    "active tool_use survives the recovery retry"
  );
});
