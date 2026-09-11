import test from "node:test";
import assert from "node:assert/strict";

const {
  injectSystemPrompt,
  injectSystemPromptPostTranslation,
  setSystemPromptConfig,
  getSystemPromptConfig,
} = await import("../../open-sse/services/systemPrompt.ts");

// ─── Config ─────────────────────────────────────────────────────────────────

test("default config: disabled", () => {
  const config = getSystemPromptConfig();
  assert.equal(config.enabled, false);
  assert.equal(config.prefixPrompt, "");
  assert.equal(config.suffixPrompt, "");
});

test("setSystemPromptConfig: legacy prompt migrates to suffixPrompt", () => {
  setSystemPromptConfig({ enabled: true, prompt: "legacy text" });
  const config = getSystemPromptConfig();
  assert.equal(config.suffixPrompt, "legacy text");
});

test("setSystemPromptConfig: explicit prefix/suffix clears legacy prompt", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const config = getSystemPromptConfig();
  assert.equal(config.prefixPrompt, "PRE");
  assert.equal(config.suffixPrompt, "SUF");
});

// ─── Injection ──────────────────────────────────────────────────────────────

test("injectSystemPrompt: disabled → no change", () => {
  setSystemPromptConfig({ enabled: false, suffixPrompt: "system" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body);
  assert.deepEqual(result, body);
});

test("injectSystemPrompt: empty prefix and suffix → no change", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "", suffixPrompt: "" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body);
  assert.deepEqual(result, body);
});

test("injectSystemPrompt: suffix adds system message when none exists", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "", suffixPrompt: "You are an AI." });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPrompt(body);
  assert.equal(result.messages[0].role, "system");
  assert.ok(result.messages[0].content.includes("You are an AI."));
  assert.equal(result.messages.length, 2);
});

test("injectSystemPrompt: prefix + suffix wrap existing system message (#2468)", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "BEFORE", suffixPrompt: "AFTER" });
  const body = {
    messages: [
      { role: "system", content: "Original prompt" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.messages[0].content.startsWith("BEFORE"));
  assert.ok(result.messages[0].content.includes("Original prompt"));
  assert.ok(result.messages[0].content.trimEnd().endsWith("AFTER"));
  assert.equal(result.messages.length, 2);
});

test("injectSystemPrompt: only prefix prepends before system message", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PREFIX", suffixPrompt: "" });
  const body = {
    messages: [
      { role: "system", content: "Agent instructions" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.messages[0].content.startsWith("PREFIX"));
  assert.ok(result.messages[0].content.includes("Agent instructions"));
});

test("injectSystemPrompt: Claude body.system string — prefix/suffix wrap (#2468)", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    system: "Claude prompt",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.system.startsWith("PRE"));
  assert.ok(result.system.includes("Claude prompt"));
  assert.ok(result.system.trimEnd().endsWith("SUF"));
});

test("injectSystemPrompt: Claude array system field — prefix/suffix wrap (#2468)", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    system: [{ type: "text", text: "Claude prompt" }],
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.ok(Array.isArray(result.system));
  assert.equal(result.system[0].text, "PRE");
  assert.equal(result.system[1].text, "Claude prompt");
  assert.equal(result.system[2].text, "SUF");
  assert.equal(result.system.length, 3);
});

test("injectSystemPrompt: _skipSystemPrompt bypasses", () => {
  setSystemPromptConfig({ enabled: true, suffixPrompt: "GLOBAL:" });
  const body = {
    _skipSystemPrompt: true,
    messages: [{ role: "user", content: "hi" }],
  };
  const result = injectSystemPrompt(body);
  assert.deepEqual(result, body);
});

test("injectSystemPrompt: null body returns as-is", () => {
  setSystemPromptConfig({ enabled: true, suffixPrompt: "test" });
  assert.equal(injectSystemPrompt(null), null);
});

test("injectSystemPrompt: non-object bodies return as-is", () => {
  setSystemPromptConfig({ enabled: true, suffixPrompt: "test" });

  for (const body of [undefined, "prompt", 42, true]) {
    assert.equal(injectSystemPrompt(body), body);
  }
});

test("injectSystemPrompt: skips malformed message entries safely", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    messages: [
      { role: "user", content: "hi" },
      null,
      { role: "system", content: "Original prompt" },
    ],
  };

  const result = injectSystemPrompt(body);

  assert.equal(result.messages[2].content, "PRE\n\nOriginal prompt\n\nSUF");
  assert.equal(result.messages[1], null);
});

test("injectSystemPrompt: does not mutate the request or nested message content", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const systemContent = [{ type: "text", text: "Original prompt" }];
  const systemMessage = { role: "system", content: systemContent };
  const body = {
    messages: [systemMessage, { role: "user", content: "hi" }],
  };

  const result = injectSystemPrompt(body);

  assert.notEqual(result, body);
  assert.notEqual(result.messages, body.messages);
  assert.notEqual(result.messages[0], systemMessage);
  assert.notEqual(result.messages[0].content, systemContent);
  assert.deepEqual(body, {
    messages: [
      { role: "system", content: [{ type: "text", text: "Original prompt" }] },
      { role: "user", content: "hi" },
    ],
  });
});

test("injectSystemPrompt: developer role treated as system", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    messages: [
      { role: "developer", content: "Dev instructions" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPrompt(body);
  assert.ok(result.messages[0].content.startsWith("PRE"));
  assert.ok(result.messages[0].content.includes("Dev instructions"));
  assert.ok(result.messages[0].content.trimEnd().endsWith("SUF"));
});

// ─── Post-translation injection (codex/Responses path — #3) ────────────────
// injectSystemPromptPostTranslation runs AFTER translation, on a body whose
// messages[] already contains the resolved system/developer messages. The key
// difference from injectSystemPrompt: with multiple system/developer messages
// (codex sends a developer role per input item), prefix goes on the FIRST and
// suffix on the LAST — so suffix retains the highest recency position.

test("postTranslation: single system → prefix front, suffix back", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    messages: [
      { role: "system", content: "Original" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPromptPostTranslation(body);
  assert.ok(result.messages[0].content.startsWith("PRE"));
  assert.ok(result.messages[0].content.includes("Original"));
  assert.ok(result.messages[0].content.trimEnd().endsWith("SUF"));
  assert.equal(result.messages.length, 2);
});

test("postTranslation: multiple system/developer → prefix on first, suffix on LAST", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  // codex-like: several developer (system-equivalent) messages then a user
  const body = {
    messages: [
      { role: "developer", content: "dev-0" },
      { role: "developer", content: "dev-1" },
      { role: "developer", content: "dev-2" },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPromptPostTranslation(body);
  assert.equal(result.messages.length, 4);
  // prefix on FIRST system/developer (index 0)
  assert.ok(result.messages[0].content.startsWith("PRE"));
  assert.ok(result.messages[0].content.includes("dev-0"));
  // suffix on LAST system/developer (index 2) — NOT index 0
  assert.ok(result.messages[2].content.includes("dev-2"));
  assert.ok(result.messages[2].content.trimEnd().endsWith("SUF"));
  // the first must NOT carry the suffix, the last must NOT carry the prefix
  assert.ok(!result.messages[0].content.includes("SUF"));
  assert.ok(!result.messages[2].content.includes("PRE"));
  // middle untouched
  assert.equal(result.messages[1].content, "dev-1");
});

test("postTranslation: array content → unshift prefix on first, push suffix on last", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = {
    messages: [
      { role: "developer", content: [{ type: "text", text: "dev-0" }] },
      { role: "developer", content: [{ type: "text", text: "dev-1" }] },
      { role: "user", content: "hi" },
    ],
  };
  const result = injectSystemPromptPostTranslation(body);
  // first developer: PRE at index 0
  assert.equal(result.messages[0].content[0].text, "PRE");
  assert.equal(result.messages[0].content[1].text, "dev-0");
  // last developer: SUF at the end
  assert.equal(result.messages[1].content[0].text, "dev-1");
  assert.equal(result.messages[1].content[1].text, "SUF");
});

test("postTranslation: no system → combined inserted at front", () => {
  setSystemPromptConfig({ enabled: true, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  const result = injectSystemPromptPostTranslation(body);
  assert.equal(result.messages[0].role, "system");
  assert.ok(result.messages[0].content.includes("PRE"));
  assert.ok(result.messages[0].content.includes("SUF"));
  assert.equal(result.messages.length, 2);
});

test("postTranslation: disabled / empty → no change", () => {
  setSystemPromptConfig({ enabled: false, prefixPrompt: "PRE", suffixPrompt: "SUF" });
  const body = { messages: [{ role: "user", content: "hi" }] };
  assert.deepEqual(injectSystemPromptPostTranslation(body), body);
  setSystemPromptConfig({ enabled: true, prefixPrompt: "", suffixPrompt: "" });
  assert.deepEqual(injectSystemPromptPostTranslation(body), body);
});

test("postTranslation: codex regression — suffix lands on LAST developer after translation shape", () => {
  // Simulate the post-translation body shape for a codex Responses request:
  // openai-responses.ts converts `instructions`→system (index 0) and each
  // input developer item→system. The After Prompt (suffix) MUST land on the
  // LAST system/developer, not the first — otherwise it is buried by the
  // later developer messages and loses recency priority.
  setSystemPromptConfig({ enabled: true, prefixPrompt: "", suffixPrompt: "AFTER-PROMPT-MARKER" });
  const body = {
    messages: [
      { role: "system", content: "instructions-from-catalog" },
      { role: "system", content: "dev-0-from-input" },
      { role: "system", content: "dev-1-from-input" },
      { role: "system", content: "dev-2-from-input" },
      { role: "user", content: "do the task" },
    ],
  };
  const result = injectSystemPromptPostTranslation(body);
  const lastSys = result.messages[3];
  assert.ok(lastSys.content.trimEnd().endsWith("AFTER-PROMPT-MARKER"));
  // the first system must NOT carry the suffix
  assert.ok(!result.messages[0].content.includes("AFTER-PROMPT-MARKER"));
});

// Reset
test.after(() => setSystemPromptConfig({ enabled: false, prefixPrompt: "", suffixPrompt: "" }));
