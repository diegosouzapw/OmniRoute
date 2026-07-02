import test from "node:test";
import assert from "node:assert/strict";

const { buildComboTestRequestBody, extractComboTestResponseText } =
  await import("../../src/lib/combos/testHealth.ts");

test("combo test helper builds a realistic smoke payload", () => {
  const originalRandom = Math.random;
  let callCount = 0;
  let body;
  try {
    Math.random = () => {
      callCount += 1;
      return callCount === 1 ? 0.4680222223 : 0.2677;
    };

    body = buildComboTestRequestBody("openrouter/openai/gpt-5.4");
  } finally {
    Math.random = originalRandom;
  }

  assert.equal(body.model, "openrouter/openai/gpt-5.4");
  assert.equal(body.messages[0].content, "Calculate 52122+34093, and reply with the result only.");
  assert.equal(body.max_tokens, 2048);
  assert.equal("temperature" in body, false);
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

test("combo test helper extracts reasoning content when visible text is absent", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          reasoning_content: "Working through the request.\nOK",
        },
      },
    ],
  });

  assert.equal(text, "Working through the request.\nOK");
});

test("combo test helper extracts reasoning_text aliases from GitHub-style responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: "",
          reasoning_text: "Reasoning trace",
        },
      },
    ],
  });

  assert.equal(text, "Reasoning trace");
});

test("combo test helper treats reasoning-only completions as a healthy signal", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        finish_reason: "length",
        message: {
          role: "assistant",
          content: "",
        },
      },
    ],
    usage: {
      prompt_tokens: 6,
      completion_tokens: 12,
      total_tokens: 18,
      completion_tokens_details: {
        reasoning_tokens: 12,
      },
    },
  });

  assert.equal(text, "[reasoning-only completion]");
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
