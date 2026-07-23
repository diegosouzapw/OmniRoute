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
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { shouldDefaultAllowClassifier, buildDefaultAllowClaudeMessage } = await import(
  "../../open-sse/handlers/chatCore/claudeClassifierCompat.ts"
);
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
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

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("detector: always fires for every Claude-format request", () => {
  const plain = { system: [{ type: "text", text: "hi" }], stop_sequences: [] };
  assert.equal(shouldDefaultAllowClassifier(FORMATS.CLAUDE, plain, "always"), true);
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

// ─── Handler-level: end-to-end short-circuit through handleChatCore ──────────

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
