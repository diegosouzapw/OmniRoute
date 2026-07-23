import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

// Regression: an all-system OpenAI request (e.g. an all-system compaction or
// title-generation turn from a client like OpenCode) hoists every
// system/developer message into Claude's top-level `system` field, leaving the
// `messages` array empty. Claude's Messages API then rejects the request with
// `400 messages: at least one message is required`. The converter must
// synthesize a minimal user turn so the request stays valid. (#5245)

test("openaiToClaudeRequest: all-system input never yields an empty messages array", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-6",
    {
      messages: [
        { role: "system", content: "You summarize." },
        { role: "system", content: "Summarize the conversation so far." },
      ],
    },
    false
  );

  // system content is hoisted to the top-level `system` field …
  assert.ok(result.system, "system content should be hoisted to result.system");
  // … but `messages` must not be empty (would 400 upstream).
  assert.ok(Array.isArray(result.messages));
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "user");
  // content block must be non-empty text (Anthropic rejects empty text blocks).
  const block = result.messages[0].content[0];
  assert.equal(block.type, "text");
  assert.ok(typeof block.text === "string" && block.text.length > 0);
});

test("openaiToClaudeRequest: developer-only input also gets a synthesized user turn", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-6",
    { messages: [{ role: "developer", content: "Follow these rules." }] },
    false
  );
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "user");
});

test("openaiToClaudeRequest: normal system+user request is unaffected by the guard", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-6",
    {
      messages: [
        { role: "system", content: "You summarize." },
        { role: "user", content: "Summarize: hello world" },
      ],
    },
    false
  );
  // Exactly the real user turn — no synthesized placeholder appended.
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].role, "user");
  const text = JSON.stringify(result.messages[0].content);
  assert.ok(text.includes("hello world"));
});
