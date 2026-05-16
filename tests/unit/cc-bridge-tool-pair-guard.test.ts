import test from "node:test";
import assert from "node:assert/strict";

const { buildAndSignClaudeCodeRequest } =
  await import("../../open-sse/services/claudeCodeCompatible.ts");
const { fixToolPairs } = await import("../../open-sse/services/contextManager.ts");

// Regression for prod 400 (call log fd429ec8-34f7-4f24-8154-f220f0cc3cd3):
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
