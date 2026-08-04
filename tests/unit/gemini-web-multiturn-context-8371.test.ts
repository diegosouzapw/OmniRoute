import test from "node:test";
import assert from "node:assert/strict";

// #8371 — gemini-web is a stateless, single-turn Web Cookie provider: the
// no-tools path historically forwarded only the LAST user message
// (`messages.filter(m => m.role === "user").pop()`), dropping all prior turns
// so follow-up questions lost context ("I am in Berlin" → "What should I wear?"
// answered without Berlin). The issue's accepted fallback (b) is to flatten the
// full messages history into the single prompt sent to the web UI. These tests
// pin that flatten behavior while guaranteeing single-turn requests stay
// byte-for-byte identical (regression guard for the existing no-tools path).

const { buildGeminiPrompt } = await import("../../open-sse/executors/gemini-web.ts");

// ─── Single-turn: byte-for-byte identical to the original derivation ─────────

test("#8371: single user message returns that message verbatim (single-turn unchanged)", () => {
  const prompt = buildGeminiPrompt([{ role: "user", content: "What about Paris?" }]);
  assert.equal(prompt, "What about Paris?");
});

test("#8371: single user turn with a system message still returns only the user text", () => {
  // Preserves the pre-existing no-tools derivation, which ignored system-only
  // context on the first turn.
  const prompt = buildGeminiPrompt([
    { role: "system", content: "You are helpful" },
    { role: "user", content: "Hello" },
  ]);
  assert.equal(prompt, "Hello");
});

// ─── Multi-turn: full history is flattened into the prompt ───────────────────

test("#8371: multi-turn history is flattened so prior turns are preserved as context", () => {
  const prompt = buildGeminiPrompt([
    { role: "user", content: "I am in Berlin." },
    { role: "assistant", content: "Nice, Berlin is great." },
    { role: "user", content: "What should I wear today?" },
  ]);

  // The prior turns must survive into the prompt (this is what fails today —
  // the old code only forwarded the final user message).
  assert.match(prompt, /Berlin/);
  assert.match(prompt, /I am in Berlin\./);
  assert.match(prompt, /Nice, Berlin is great\./);
  // The current question must still be present and clearly marked.
  assert.match(prompt, /What should I wear today\?/);
  // Prior turns are labeled by role.
  assert.match(prompt, /User: I am in Berlin\./);
  assert.match(prompt, /Assistant: Nice, Berlin is great\./);
});

test("#8371: system instructions are carried into the flattened multi-turn prompt", () => {
  const prompt = buildGeminiPrompt([
    { role: "system", content: "Always answer in French." },
    { role: "user", content: "What about Paris?" },
    { role: "assistant", content: "Paris is the capital of France." },
    { role: "user", content: "How is the weather?" },
  ]);
  assert.match(prompt, /Always answer in French\./);
  assert.match(prompt, /What about Paris\?/);
  assert.match(prompt, /Paris is the capital of France\./);
  assert.match(prompt, /How is the weather\?/);
});

test("#8371: non-string / empty message contents are ignored without throwing", () => {
  const prompt = buildGeminiPrompt([
    { role: "user", content: "First question" },
    { role: "assistant", content: "" },
    { role: "user", content: "Second question" },
  ] as Array<{ role: string; content: string }>);
  // Empty assistant turn drops out; the earlier user turn is still preserved.
  assert.match(prompt, /First question/);
  assert.match(prompt, /Second question/);
});
