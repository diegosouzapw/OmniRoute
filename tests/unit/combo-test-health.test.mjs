import test from "node:test";
import assert from "node:assert/strict";

const { buildComboTestRequestBody, extractComboTestResponseText } =
  await import("../../src/lib/combos/testHealth.ts");

test("combo test helper builds a realistic smoke payload", () => {
  const body = buildComboTestRequestBody("openrouter/openai/gpt-5.4");

  assert.equal(body.model, "openrouter/openai/gpt-5.4");
  assert.equal(body.messages[0].content, "Reply with OK only.");
  assert.equal(body.max_tokens, 16);
  assert.equal(body.stream, false);
});

test("combo test helper extracts text from chat-completions responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: "OK",
        },
      },
    ],
  });

  assert.equal(text, "OK");
});

test("combo test helper extracts text from block-based responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: [
            { type: "text", text: "OK" },
            { type: "output_text", text: "Confirmed." },
          ],
        },
      },
    ],
  });

  assert.equal(text, "OK\nConfirmed.");
});

test("combo test helper returns empty string when no text content exists", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: [{ type: "tool_call", id: "call_1" }],
        },
      },
    ],
  });

  assert.equal(text, "");
});
