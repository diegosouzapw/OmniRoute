import test from "node:test";
import assert from "node:assert/strict";

// Live incident: a real request through /v1/responses to a strict OpenAI-compatible
// upstream (AI Horde's Aphrodite-backed facade, oai.aihorde.net) got a 500 Internal
// Server Error for every message, including the simplest possible single-string
// input. Root cause: normalizeResponsesInputForChat() always wraps a plain string
// input as `content: [{ type: "input_text", text: value }]` (array of ONE part),
// and openaiResponsesToOpenAIRequest() maps that straight through to
// `content: [{ type: "text", text: value }]` — an array — never collapsing it back
// to a plain string. That's spec-valid per OpenAI's own API (which accepts both
// shapes), but several strict/naive OpenAI-compatible backends only implement the
// plain-string form for single-part text messages and reject the array form
// outright. A single-text-part array and a plain string are semantically
// identical, so collapsing is safe and doesn't affect real multi-part (text+image,
// text+file) messages, which must stay arrays.
const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type ChatMsg = { role: string; content?: unknown };

test("Responses -> OpenAI: plain string input collapses to string content, not a single-part array", () => {
  const result = openaiResponsesToOpenAIRequest(
    "aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    { input: "Say OK." },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const userMsg = result.messages.find((m) => m.role === "user");
  assert.ok(userMsg, "expected a user message");
  assert.equal(typeof userMsg!.content, "string", "expected a plain string, got an array/object");
  assert.equal(userMsg!.content, "Say OK.");
});

test("Responses -> OpenAI: single-part input_text array input also collapses to a string", () => {
  const result = openaiResponsesToOpenAIRequest(
    "aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    {
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi there" }] },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const userMsg = result.messages.find((m) => m.role === "user");
  assert.equal(typeof userMsg!.content, "string");
  assert.equal(userMsg!.content, "hi there");
});

test("Responses -> OpenAI: multi-turn conversation collapses every single-text-part message", () => {
  const result = openaiResponsesToOpenAIRequest(
    "aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    {
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "question one" }] },
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "answer one" }],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "question two" }] },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const turnMessages = result.messages.filter((m) => m.role === "user" || m.role === "assistant");
  assert.equal(turnMessages.length, 3);
  for (const m of turnMessages) {
    assert.equal(typeof m.content, "string", `expected string content for role ${m.role}`);
  }
  assert.equal(turnMessages[0].content, "question one");
  assert.equal(turnMessages[1].content, "answer one");
  assert.equal(turnMessages[2].content, "question two");
});

test("Responses -> OpenAI: real multi-part content (text + image) is NOT collapsed", () => {
  const result = openaiResponsesToOpenAIRequest(
    "aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    {
      input: [
        {
          type: "message",
          role: "user",
          content: [
            { type: "input_text", text: "what is this?" },
            { type: "input_image", image_url: "https://example.com/cat.png" },
          ],
        },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const userMsg = result.messages.find((m) => m.role === "user");
  assert.ok(Array.isArray(userMsg!.content), "multi-part content must stay an array");
  assert.equal((userMsg!.content as unknown[]).length, 2);
});
