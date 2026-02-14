import test from "node:test";
import assert from "node:assert/strict";

const {
  injectSystemPrompt,
  setSystemPromptConfig,
  getSystemPromptConfig,
} = await import("../../open-sse/services/systemPrompt.js");

// ─── Config ─────────────────────────────────────────────────────────────────

test("default config: disabled", () => {
  const config = getSystemPromptConfig();
  assert.equal(config.enabled, false);
  assert.equal(config.prompt, "");
});

// ─── Injection ──────────────────────────────────────────────────────────────

test("injectSystemPrompt: disabled → no change", () => {
  setSystemPromptConfig({ enabled: false, prompt: "system" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body);
  assert.deepEqual(result, body);
});

test("injectSystemPrompt: adds system message when none exists", () => {
  setSystemPromptConfig({ enabled: true, prompt: "You are an AI assistant." });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body);
  assert.equal(result.messages[0].role, "system");
  assert.ok(result.messages[0].content.includes("You are an AI assistant."));
  assert.equal(result.messages.length, 2);
});

test("injectSystemPrompt: prepends to existing system message", () => {
  setSystemPromptConfig({ enabled: true, prompt: "GLOBAL:" });
  const body = {
    messages: [
      { role: "system", content: "Original prompt" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.messages[0].content.startsWith("GLOBAL:"));
  assert.ok(result.messages[0].content.includes("Original prompt"));
  assert.equal(result.messages.length, 2);
});

test("injectSystemPrompt: Claude body.system field", () => {
  setSystemPromptConfig({ enabled: true, prompt: "GLOBAL:" });
  const body = {
    system: "Claude prompt",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.system.startsWith("GLOBAL:"));
  assert.ok(result.system.includes("Claude prompt"));
});

test("injectSystemPrompt: Claude array system field", () => {
  setSystemPromptConfig({ enabled: true, prompt: "GLOBAL:" });
  const body = {
    system: [{ type: "text", text: "Claude prompt" }],
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.ok(Array.isArray(result.system));
  assert.equal(result.system[0].text, "GLOBAL:");
  assert.equal(result.system.length, 2);
});

test("injectSystemPrompt: _skipSystemPrompt bypasses", () => {
  setSystemPromptConfig({ enabled: true, prompt: "GLOBAL:" });
  const body = {
    _skipSystemPrompt: true,
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.deepEqual(result, body);
});

test("injectSystemPrompt: with explicit promptText override", () => {
  setSystemPromptConfig({ enabled: true, prompt: "default" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body, "custom override");
  assert.ok(result.messages[0].content.includes("custom override"));
});

test("injectSystemPrompt: null body returns as-is", () => {
  setSystemPromptConfig({ enabled: true, prompt: "test" });
  assert.equal(injectSystemPrompt(null), null);
});

// Reset
test.after(() => setSystemPromptConfig({ enabled: false, prompt: "" }));
