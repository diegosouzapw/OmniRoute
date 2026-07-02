/**
 * TDD test for per-endpoint custom system prompt injection (port of upstream #2063).
 *
 * Validates that injectCustomSystemPrompt():
 *  - Appends the custom prompt to an existing system message (string content)
 *  - Appends the custom prompt to an existing system message (array content)
 *  - Creates a new system message when none exists
 *  - Injects into Claude-style `system` field (string)
 *  - Injects into Claude-style `system` field (array)
 *  - Does NOT inject when prompt is empty string
 *  - Does NOT inject when body has _skipSystemPrompt flag
 *  - Leaves body unchanged when prompt is falsy
 *
 * Also validates settings defaults include customSystemPromptEnabled / customSystemPrompt.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { injectCustomSystemPrompt } = await import(
  "../../open-sse/services/systemPrompt.ts"
);

// ─── injectCustomSystemPrompt ────────────────────────────────────────────────

test("injectCustomSystemPrompt: appends to existing string system message", () => {
  const body = {
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello" },
    ],
  };
  const result = injectCustomSystemPrompt(body, "Always respond formally.");
  const sysMsg = result.messages.find((m) => m.role === "system");
  assert.ok(sysMsg, "system message must exist");
  assert.ok(
    typeof sysMsg.content === "string" && sysMsg.content.includes("You are a helpful assistant."),
    "original content preserved"
  );
  assert.ok(
    typeof sysMsg.content === "string" && sysMsg.content.includes("Always respond formally."),
    "custom prompt appended"
  );
});

test("injectCustomSystemPrompt: appends to existing array-content system message", () => {
  const body = {
    messages: [
      { role: "system", content: [{ type: "text", text: "Base instructions." }] },
      { role: "user", content: "Hi" },
    ],
  };
  const result = injectCustomSystemPrompt(body, "Speak like a pirate.");
  const sysMsg = result.messages.find((m) => m.role === "system");
  assert.ok(sysMsg, "system message must exist");
  assert.ok(Array.isArray(sysMsg.content), "content must remain array");
  const texts = (sysMsg.content as Array<{ type: string; text: string }>).map((c) => c.text);
  assert.ok(texts.includes("Base instructions."), "original block preserved");
  assert.ok(texts.includes("Speak like a pirate."), "custom prompt block appended");
});

test("injectCustomSystemPrompt: creates system message when none exists", () => {
  const body = {
    messages: [{ role: "user", content: "What is 2+2?" }],
  };
  const result = injectCustomSystemPrompt(body, "Think step by step.");
  assert.equal(result.messages[0].role, "system", "system message prepended");
  assert.equal(result.messages[0].content, "Think step by step.", "prompt is the content");
  assert.equal(result.messages[1].role, "user", "user message preserved after system");
});

test("injectCustomSystemPrompt: injects into Claude-style string system field", () => {
  const body = {
    system: "You are Claude.",
    messages: [{ role: "user", content: "Hello" }],
  };
  const result = injectCustomSystemPrompt(body, "Be concise.");
  assert.ok(typeof result.system === "string", "system field still a string");
  assert.ok(result.system.includes("You are Claude."), "original system preserved");
  assert.ok(result.system.includes("Be concise."), "custom prompt appended to system");
});

test("injectCustomSystemPrompt: injects into Claude-style array system field", () => {
  const body = {
    system: [{ type: "text", text: "You are Claude." }],
    messages: [{ role: "user", content: "Hello" }],
  };
  const result = injectCustomSystemPrompt(body, "Be concise.");
  assert.ok(Array.isArray(result.system), "system field still an array");
  const texts = (result.system as Array<{ type: string; text: string }>).map((c) => c.text);
  assert.ok(texts.includes("You are Claude."), "original system block preserved");
  assert.ok(texts.includes("Be concise."), "custom prompt block appended");
});

test("injectCustomSystemPrompt: no-op when prompt is empty string", () => {
  const body = {
    messages: [{ role: "user", content: "Hello" }],
  };
  const result = injectCustomSystemPrompt(body, "");
  assert.deepEqual(result, body, "body unchanged when prompt is empty");
});

test("injectCustomSystemPrompt: no-op when body has _skipSystemPrompt flag", () => {
  const body = {
    _skipSystemPrompt: true,
    messages: [{ role: "user", content: "Hello" }],
  };
  const result = injectCustomSystemPrompt(body as Record<string, unknown>, "Be formal.");
  assert.deepEqual(result, body, "body unchanged when _skipSystemPrompt is set");
});

test("injectCustomSystemPrompt: does not mutate input body (immutable)", () => {
  const body = {
    messages: [
      { role: "system", content: "Original." },
      { role: "user", content: "Hi" },
    ],
  };
  const original = JSON.stringify(body);
  injectCustomSystemPrompt(body, "New instruction.");
  assert.equal(JSON.stringify(body), original, "input body not mutated");
});

// ─── Settings defaults ───────────────────────────────────────────────────────
// Verify that getSettings() returns the expected defaults for the new keys.
// Uses an in-memory DB (DATA_DIR set to a temp path so no production DB is touched).

import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync } from "node:fs";

const tmpDir = join(tmpdir(), `omniroute-test-${Date.now()}`);
mkdirSync(tmpDir, { recursive: true });
process.env["DATA_DIR"] = tmpDir;

test("settings defaults include customSystemPromptEnabled=false and customSystemPrompt=''", async (t) => {
  // Dynamic import after setting DATA_DIR to avoid polluting other tests
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  const { getSettings } = await import("../../src/lib/db/settings.ts");

  const settings = await getSettings();
  assert.equal(
    settings.customSystemPromptEnabled,
    false,
    "customSystemPromptEnabled default is false"
  );
  assert.equal(
    settings.customSystemPrompt,
    "",
    "customSystemPrompt default is empty string"
  );

  t.after(() => {
    resetDbInstance();
  });
});
