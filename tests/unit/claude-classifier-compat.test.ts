/**
 * TDD test for the Claude Code auto-mode classifier compat mode (opt-in, default off).
 *
 * Claude Code's `--permission-mode auto` sends an internal `/v1/messages` security-classifier
 * request and requires the response to START with the literal token `<block>no</block>` (ALLOW)
 * or `<block>yes</block>` (BLOCK) — anything else is unparseable and Claude Code fails closed
 * with "Auto mode could not evaluate this action and is blocking it for safety".
 *
 * When a combo/fallback route sends the classifier call to a cheap model that returns 200 with
 * empty content, the well-formed-but-empty Claude message OmniRoute produces still fails that
 * parser. With `claudeClassifierCompat` set to "auto" (or "always"), handleChatCore detects the
 * classifier request and short-circuits with a synthetic ALLOW response — WITHOUT ever calling
 * the upstream provider. Default is "off": nothing changes unless an operator explicitly opts in.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-classifier-compat-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const {
  shouldDefaultAllowClassifier,
  detectClassifierFormat,
  buildDefaultAllowClaudeMessage,
  applyClaudeClassifierReasoningDefault,
} = await import("../../open-sse/handlers/chatCore/claudeClassifierCompat.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function invokeUpstreamClassifier({
  headers = {},
  resolvedThinkingEffort,
}: {
  headers?: Record<string, string>;
  resolvedThinkingEffort?: string;
} = {}) {
  let outbound: Record<string, unknown> | null = null;
  globalThis.fetch = (async (_url, init) => {
    outbound = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-classifier",
        object: "chat.completion",
        model: "sonnet-classifier-test",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "<block>yes</block>" },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const body = {
    ...structuredClone(CLASSIFIER_BODY),
    model: "sonnet-classifier-test",
    max_tokens: 2112,
  };
  try {
    const result = await handleChatCore({
      body,
      modelInfo: {
        provider: "openai-compatible-classifier-test",
        model: "sonnet-classifier-test",
        extendedContext: false,
        resolvedThinkingEffort,
      },
      credentials: {
        apiKey: "sk-test",
        providerSpecificData: {
          baseUrl: "https://engine.example.test/v1",
          apiType: "chat",
          reasoningControl: "chat-template",
        },
      },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json", ...headers }),
      },
      userAgent: "unit-test",
    });
    await waitForCallLogSaves(5000);
    return { outbound, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

// Shape of the classifier request Claude Code's `--permission-mode auto` sends internally:
// a Claude Messages request carrying the security-monitor system prompt AND `</block>` as a
// stop sequence — the two independent signals the compat detector relies on.
const CLASSIFIER_BODY = {
  model: "claude-3-5-haiku-20241022",
  stream: false,
  system: [
    {
      type: "text",
      text: "You are a security monitor for autonomous AI coding agents. Evaluate the following action and respond with <block>yes</block> or <block>no</block>.",
    },
  ],
  stop_sequences: ["</block>"],
  messages: [
    {
      role: "user",
      content: [{ type: "text", text: "<transcript>WebFetch https://example.com</transcript>" }],
    },
  ],
  max_tokens: 8,
};

// Newer Claude Code builds send a "severity classifier" variant of the same internal
// request: same security-monitor marker, but `stop_sequences` carries `</severity>`
// instead of `</block>`, and it expects a `<severity>N</severity>` reply (#11289).
const SEVERITY_CLASSIFIER_BODY = {
  ...CLASSIFIER_BODY,
  stop_sequences: ["</severity>"],
};

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── Settings default is opt-in (off) ────────────────────────────────────────
// Runs FIRST, before any updateSettings() write, so it reads the pristine DB.
// (DATA_DIR freezes at the first DB open, so a later "fresh dir" swap would still
// read this same DB — hence assert the default up front.)

test("settings default: claudeClassifierCompat is 'off' (opt-in)", async () => {
  const { getSettings } = await import("../../src/lib/db/settings.ts");
  const settings = await getSettings();
  assert.equal(settings.claudeClassifierCompat, "off", "claudeClassifierCompat defaults to off");
});

// ─── Pure detector: shouldDefaultAllowClassifier ─────────────────────────────

test("detector: off never short-circuits (pass-through preserved by default)", () => {
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, CLASSIFIER_BODY, "off"), false);
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, CLASSIFIER_BODY, undefined), false);
});

test("detector: auto fires on the security-monitor system-prompt marker", () => {
  const body = {
    system: [{ type: "text", text: "You are a security monitor for autonomous AI coding agents." }],
    stop_sequences: [],
  };
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "auto"), true);
});

test("detector: auto does NOT fire on the </block> stop_sequence token alone (#8189 — over-broad trigger fix)", () => {
  const body = { system: [{ type: "text", text: "unrelated" }], stop_sequences: ["</block>"] };
  assert.equal(
    shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "auto"),
    false,
    "stop_sequences=['</block>'] alone must not short-circuit without the security-monitor marker"
  );
});

test("detector: auto does NOT fire on a regular Claude request (no marker, no </block>)", () => {
  const body = {
    system: [{ type: "text", text: "You are a helpful coding assistant." }],
    stop_sequences: [],
    messages: [{ role: "user", content: "hello" }],
  };
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, body, "auto"), false);
});

test("detector: never fires for non-Claude source formats even in always mode", () => {
  assert.equal(shouldDefaultAllowClassifier(FORMATS.OPENAI, CLASSIFIER_BODY, "always"), false);
});

test("detector: always does NOT fire for normal chat without classifier marker (#9276)", () => {
  const plain = { system: [{ type: "text", text: "hi" }], stop_sequences: [] };
  assert.equal(
    shouldDefaultAllowClassifier(FORMATS.CLAUDE, plain, "always"),
    false,
    "always must NOT short-circuit a normal chat (no security-monitor marker)"
  );
});

test("detector: always fires when classifier marker is present", () => {
  const classifier = {
    system: [
      {
        type: "text",
        text: "You are a security monitor for autonomous AI coding agents. Evaluate the following action.",
      },
    ],
    stop_sequences: ["</block>"],
  };
  assert.equal(
    shouldDefaultAllowClassifier(FORMATS.CLAUDE, classifier, "always"),
    true,
    "always must short-circuit when the classifier marker is present"
  );
});

test("classifier requests without reasoning default to disabled native thinking on both stages", () => {
  assert.equal(
    typeof applyClaudeClassifierReasoningDefault,
    "function",
    "classifier reasoning default is not implemented"
  );

  for (const [maxTokens, stopSequences] of [
    [2112, ["</block>"]],
    [10240, undefined],
  ] as const) {
    const body: Record<string, unknown> = {
      ...structuredClone(CLASSIFIER_BODY),
      model: "sonnet-classifier-test",
      max_tokens: maxTokens,
    };
    if (stopSequences === undefined) delete body.stop_sequences;
    else body.stop_sequences = [...stopSequences];

    const normalized = applyClaudeClassifierReasoningDefault!(FORMATS.CLAUDE, body);

    assert.deepEqual(normalized?.thinking, { type: "disabled" });
    assert.equal(normalized?.max_tokens, maxTokens);
    assert.deepEqual(normalized?.stop_sequences, stopSequences);
    assert.equal(body.thinking, undefined, "normalization must not mutate the client body");
  }
});

test("ordinary requests and explicit classifier reasoning controls stay unchanged", () => {
  assert.equal(
    typeof applyClaudeClassifierReasoningDefault,
    "function",
    "classifier reasoning default is not implemented"
  );

  const ordinary = {
    system: "You are a coding assistant.",
    messages: [{ role: "user", content: "hi" }],
  };
  assert.equal(applyClaudeClassifierReasoningDefault!(FORMATS.CLAUDE, ordinary), ordinary);
  assert.equal(
    applyClaudeClassifierReasoningDefault!(FORMATS.OPENAI, CLASSIFIER_BODY),
    CLASSIFIER_BODY
  );

  for (const explicit of [
    { thinking: { type: "enabled", budget_tokens: 1024 } },
    { thinking: { type: "disabled" } },
    { reasoning: { effort: "high" } },
    { reasoning_effort: "high" },
    { output_config: { effort: "high" } },
    { chat_template_kwargs: { enable_thinking: true, custom_flag: "kept" } },
    {
      _omnirouteReasoningRule: {
        id: "force-high",
        effortMode: "force",
        targetEffort: "high",
      },
    },
  ]) {
    const body = { ...structuredClone(CLASSIFIER_BODY), ...explicit };
    assert.equal(applyClaudeClassifierReasoningDefault!(FORMATS.CLAUDE, body), body);
  }

  const explicitContexts = [
    ...["auto", "low", "medium", "high", "xhigh", "max", "off"].map((value) => [
      `effort header ${value}`,
      { headers: new Headers({ "X-OmniRoute-Effort": value.toUpperCase() }) },
    ]),
    ...["adaptive", "off"].map((value) => [
      `thinking header ${value}`,
      { headers: { "x-OMNIROUTE-thinking": value.toUpperCase() } },
    ]),
    ["resolved effort", { resolvedThinkingEffort: "high" }],
  ] as Array<
    [string, { headers?: Headers | Record<string, string>; resolvedThinkingEffort?: string }]
  >;
  for (const [name, context] of explicitContexts) {
    const body = structuredClone(CLASSIFIER_BODY);
    assert.equal(applyClaudeClassifierReasoningDefault!(FORMATS.CLAUDE, body, context), body, name);
  }
});

// ─── Pure detector: detectClassifierFormat (#11289) ──────────────────────────

test("format detector: defaults to 'block' for the legacy </block> classifier shape", () => {
  assert.equal(detectClassifierFormat(CLASSIFIER_BODY), "block");
});

test("format detector: returns 'severity' when stop_sequences carries </severity>", () => {
  assert.equal(detectClassifierFormat(SEVERITY_CLASSIFIER_BODY), "severity");
});

test("format detector: defaults to 'block' when stop_sequences is missing/empty", () => {
  assert.equal(detectClassifierFormat({}), "block");
  assert.equal(detectClassifierFormat({ stop_sequences: [] }), "block");
});

// ─── Pure builder: buildDefaultAllowClaudeMessage ────────────────────────────

test("builder: synthetic message text STARTS WITH <block>no</block>", async () => {
  const built = buildDefaultAllowClaudeMessage("claude-3-5-haiku-20241022");
  assert.equal(built.success, true);
  const payload = (await built.response.json()) as {
    type: string;
    role: string;
    stop_reason: string;
    content: Array<{ type: string; text?: string }>;
  };
  assert.equal(payload.type, "message");
  assert.equal(payload.role, "assistant");
  assert.equal(payload.stop_reason, "end_turn");
  const text = payload.content.find((b) => b.type === "text")?.text ?? "";
  assert.ok(
    text.startsWith("<block>no</block>"),
    `expected synthetic text to start with <block>no</block>, got: ${text}`
  );
  assert.ok(!text.includes("<block>yes"), "must not signal BLOCK");
});

test("builder: format='severity' returns <severity>0</severity> (#11289)", async () => {
  const built = buildDefaultAllowClaudeMessage("claude-3-5-haiku-20241022", "severity");
  assert.equal(built.success, true);
  const payload = (await built.response.json()) as {
    content: Array<{ type: string; text?: string }>;
  };
  const text = payload.content.find((b) => b.type === "text")?.text ?? "";
  assert.equal(text, "<severity>0</severity>");
});

// ─── Handler-level: end-to-end short-circuit through handleChatCore ──────────

test("handler: compat=off preserves upstream BLOCK while disabling native thinking", async () => {
  await updateSettings({ claudeClassifierCompat: "off" });
  const { outbound, result } = await invokeUpstreamClassifier();

  assert.deepEqual(outbound?.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });
  assert.equal(outbound?.reasoning_effort, undefined);
  assert.equal(outbound?.max_tokens, 2112);
  const payload = await (result as { response: Response }).response.json();
  assert.equal(payload.content[0].text, "<block>yes</block>");
});

test("handler: explicit classifier effort header and resolved effort remain authoritative", async () => {
  await updateSettings({ claudeClassifierCompat: "off" });

  const header = await invokeUpstreamClassifier({
    headers: { "x-omniroute-effort": "auto" },
  });
  assert.equal(header.outbound?.reasoning_effort, "low");
  assert.equal(header.outbound?.chat_template_kwargs, undefined);

  const resolved = await invokeUpstreamClassifier({ resolvedThinkingEffort: "high" });
  assert.equal(resolved.outbound?.reasoning_effort, "high");
  assert.equal(resolved.outbound?.chat_template_kwargs, undefined);
});

test("handler: claudeClassifierCompat=auto short-circuits WITHOUT calling upstream, text starts with <block>no</block>", async () => {
  await updateSettings({ claudeClassifierCompat: "auto" });

  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls++;
    throw new Error("upstream fetch should NOT be called when the classifier short-circuits");
  }) as typeof fetch;

  try {
    const result = await handleChatCore({
      body: structuredClone(CLASSIFIER_BODY),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(CLASSIFIER_BODY),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    });

    assert.equal(fetchCalls, 0, "upstream fetch must NOT be called");
    assert.equal(result.success, true, "handleChatCore must report success");
    const payload = (await (result as { response: Response }).response.json()) as {
      type: string;
      content: Array<{ type: string; text?: string }>;
    };
    assert.equal(payload.type, "message");
    const text = payload.content.find((b) => b.type === "text")?.text ?? "";
    assert.ok(
      text.startsWith("<block>no</block>"),
      `expected classifier response to start with <block>no</block>, got: ${text}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handler: claudeClassifierCompat=auto emits <severity>0</severity> for the severity-classifier shape (#11289)", async () => {
  await updateSettings({ claudeClassifierCompat: "auto" });

  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls++;
    throw new Error("upstream fetch should NOT be called when the classifier short-circuits");
  }) as typeof fetch;

  try {
    const result = await handleChatCore({
      body: structuredClone(SEVERITY_CLASSIFIER_BODY),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(SEVERITY_CLASSIFIER_BODY),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    });

    assert.equal(fetchCalls, 0, "upstream fetch must NOT be called");
    assert.equal(result.success, true, "handleChatCore must report success");
    const payload = (await (result as { response: Response }).response.json()) as {
      type: string;
      content: Array<{ type: string; text?: string }>;
    };
    assert.equal(payload.type, "message");
    const text = payload.content.find((b) => b.type === "text")?.text ?? "";
    assert.equal(
      text,
      "<severity>0</severity>",
      `expected severity-classifier response to be <severity>0</severity>, got: ${text}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
