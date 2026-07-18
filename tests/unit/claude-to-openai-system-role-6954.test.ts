/**
 * Tests for #6954 — mid-conversation system turns misattributed as assistant.
 *
 * `convertClaudeMessage` mapped any role that wasn't "user" or "tool" to
 * "assistant", so a Claude message with `role: "system"` (e.g. an injected
 * system reminder mid-conversation) was forwarded to OpenAI-format upstreams
 * as an assistant turn — polluting the conversation history.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

// ---------------------------------------------------------------------------
// 1. system message mid-conversation keeps role: "system"
// ---------------------------------------------------------------------------
test("mid-conversation system message preserves role:system (not assistant)", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        { role: "user", content: "hello" },
        { role: "assistant", content: "hi" },
        { role: "system", content: "Reminder: be concise." },
        { role: "user", content: "ok" },
      ],
    },
    false
  );

  const roles = result.messages.map((m: { role: string }) => m.role);
  assert.deepEqual(roles, ["user", "assistant", "system", "user"]);
});

// ---------------------------------------------------------------------------
// 2. system message with array content keeps role: "system"
// ---------------------------------------------------------------------------
test("system message with array content preserves role:system", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        { role: "user", content: "hello" },
        {
          role: "system",
          content: [{ type: "text", text: "System reminder text" }],
        },
      ],
    },
    false
  );

  const sysMsg = result.messages.find((m: { role: string }) => m.role === "system");
  assert.ok(sysMsg, "expected a system message in output");
  // Array content with text blocks is flattened to a string for system role
  assert.equal(
    typeof sysMsg.content === "string" ? sysMsg.content : JSON.stringify(sysMsg.content),
    "System reminder text"
  );
});

// ---------------------------------------------------------------------------
// 3. top-level body.system still produces role: "system" (regression check)
// ---------------------------------------------------------------------------
test("body.system still produces role:system at index 0", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      system: "You are helpful.",
      messages: [{ role: "user", content: "hi" }],
    },
    false
  );

  assert.equal(result.messages[0].role, "system");
  assert.equal(result.messages[1].role, "user");
});

// ---------------------------------------------------------------------------
// 4. assistant with tool_use still maps to assistant (regression check)
// ---------------------------------------------------------------------------
test("assistant role still maps to assistant (no regression)", () => {
  const result = claudeToOpenAIRequest(
    "gpt-4o",
    {
      messages: [
        { role: "user", content: "use the tool" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "calling tool" },
            { type: "tool_use", id: "t1", name: "foo", input: {} },
          ],
        },
      ],
    },
    false
  );

  const roles = result.messages.map((m: { role: string }) => m.role);
  assert.ok(roles.includes("assistant"), "assistant role must be preserved");
});
