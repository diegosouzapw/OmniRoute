import test from "node:test";
import assert from "node:assert/strict";

const { buildAndSignClaudeCodeRequest } =
  await import("../../open-sse/services/claudeCodeCompatible.ts");
const { fixToolPairs, stripTrailingAssistantOrphanToolUse } =
  await import("../../open-sse/services/contextManager.ts");

// Regression for the Anthropic 400:
//   `messages.N: tool_use ids were found without tool_result blocks
//   immediately after: toolu_...`
// The CC bridge now invokes fixToolPairs in step 5c before serialization
// so orphan tool_use blocks from mid-tool-call truncated histories are
// stripped before reaching Anthropic.

test("fixToolPairs strips orphan tool_use blocks from non-final assistant messages", () => {
  const messages = [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "calling" },
        { type: "tool_use", id: "toolu_orphan", name: "Bash", input: {} },
      ],
    },
    { role: "user", content: "no tool result here" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "done" },
        { type: "tool_use", id: "toolu_kept", name: "Bash", input: {} },
      ],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_kept", content: "ok" }],
    },
  ];

  const fixed = fixToolPairs(messages as never);
  const text = JSON.stringify(fixed);
  assert.ok(!text.includes("toolu_orphan"), "orphan tool_use must be stripped");
  assert.ok(text.includes("toolu_kept"), "paired tool_use must survive");
});

test("fixToolPairs is idempotent on clean histories", () => {
  const cleanMessages = [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "calling" },
        { type: "tool_use", id: "toolu_a", name: "Bash", input: {} },
      ],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_a", content: "ok" }],
    },
  ];

  const once = fixToolPairs(cleanMessages as never);
  const twice = fixToolPairs(once);
  assert.deepEqual(once, twice, "idempotent on clean histories");
});

test("buildAndSignClaudeCodeRequest invokes fixToolPairs via step 5c", async () => {
  // Pass messages via claudeBody (BuildRequestOptions accepts sourceBody/
  // normalizedBody/claudeBody — claudeBody is the path that preserves the
  // shape we expect for an Anthropic-format upstream).
  const result = await buildAndSignClaudeCodeRequest({
    model: "claude-opus-4-7",
    apiKey: "test-key",
    claudeBody: {
      model: "claude-opus-4-7",
      max_tokens: 32,
      messages: [
        { role: "user", content: "hi" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "calling" },
            { type: "tool_use", id: "toolu_orphan", name: "Bash", input: {} },
          ],
        },
        { role: "user", content: "no tool result here" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "done" },
            { type: "tool_use", id: "toolu_kept", name: "Bash", input: {} },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "toolu_kept", content: "ok" }],
        },
      ],
    },
  });

  const body = JSON.parse(result.bodyString);
  const text = JSON.stringify(body.messages);
  assert.ok(!text.includes("toolu_orphan"), "orphan tool_use must be stripped before send");
  assert.ok(text.includes("toolu_kept"), "paired tool_use must survive");
});

test("stripTrailingAssistantOrphanToolUse strips trailing assistant tool_use blocks", () => {
  const messages = [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "thinking" },
        { type: "tool_use", id: "toolu_trailing", name: "Bash", input: {} },
      ],
    },
  ];

  const stripped = stripTrailingAssistantOrphanToolUse(messages as never);
  const text = JSON.stringify(stripped);
  assert.ok(!text.includes("toolu_trailing"), "trailing tool_use must be removed");
  // Text content survives — message kept, only tool_use blocks removed.
  assert.ok(text.includes("thinking"), "non-tool_use content must survive");
});

test("stripTrailingAssistantOrphanToolUse drops final message if it becomes empty", () => {
  const messages = [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_only", name: "Bash", input: {} }],
    },
  ];

  const stripped = stripTrailingAssistantOrphanToolUse(messages as never);
  assert.equal(stripped.length, 1, "now-empty assistant message dropped entirely");
  assert.equal(stripped[0].role, "user");
});

test("stripTrailingAssistantOrphanToolUse is a no-op when last message is a user turn", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: [{ type: "text", text: "hello" }] },
    { role: "user", content: "follow up" },
  ];

  const stripped = stripTrailingAssistantOrphanToolUse(messages as never);
  assert.deepEqual(stripped, messages);
});

test("stripTrailingAssistantOrphanToolUse is a no-op on text-only trailing assistant", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: [{ type: "text", text: "answer" }] },
  ];

  const stripped = stripTrailingAssistantOrphanToolUse(messages as never);
  assert.deepEqual(stripped, messages);
});

test("buildAndSignClaudeCodeRequest strips trailing assistant tool_use (gemini HIGH review)", async () => {
  // Anthropic rejects a body whose LAST message is assistant(tool_use)
  // with no matching tool_result in the next user message — by definition
  // there is no next message. fixToolPairs alone preserves the trailing
  // tool_use (intentional for context pruning), so the guard pipeline
  // pairs it with stripTrailingAssistantOrphanToolUse.
  const result = await buildAndSignClaudeCodeRequest({
    model: "claude-opus-4-7",
    apiKey: "test-key",
    claudeBody: {
      model: "claude-opus-4-7",
      max_tokens: 32,
      messages: [
        { role: "user", content: "hi" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "calling" },
            { type: "tool_use", id: "toolu_trailing", name: "Bash", input: {} },
          ],
        },
      ],
    },
  });

  const body = JSON.parse(result.bodyString);
  const text = JSON.stringify(body.messages);
  assert.ok(
    !text.includes("toolu_trailing"),
    "trailing assistant tool_use must be stripped before upstream send"
  );
});
