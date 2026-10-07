/**
 * Tests for #6954 — mid-conversation system turns misattributed as assistant.
 *
 * `convertClaudeMessage` mapped any role that wasn't "user" or "tool" to
 * "assistant", so a Claude message with `role: "system"` (e.g. an injected
 * system reminder mid-conversation) was forwarded to OpenAI-format upstreams
 * as an assistant turn — polluting the conversation history.
 *
 * SUPERSEDED (mid-system demotion): mid-conversation system roles are now
 * demoted to "user" (content preserved) because OpenAI-compatible upstreams
 * reject a system turn after index 0 (HCP-Vision-Latest vLLM: 400 "System
 * message must be at the beginning."). The #6954 intent still holds — the
 * turns are NOT attributed to the assistant — so these tests assert the
 * demoted "user" shape. See
 * tests/unit/claude-to-openai-mid-system-user-normalize.test.ts for the
 * full demotion contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

// The bilingual system-append feature rewrites/unshifts the index-0 system
// message; blank it so role/content assertions are deterministic regardless
// of the operator environment running the suite.
delete process.env.OMNIROUTE_SYSTEM_INSTRUCTION_APPEND;

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

// ---------------------------------------------------------------------------
// 1. system message mid-conversation is demoted to "user" (never "assistant")
// ---------------------------------------------------------------------------
test("mid-conversation system message is demoted to user (not assistant)", () => {
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
  assert.deepEqual(roles, ["user", "assistant", "user", "user"]);
});

// ---------------------------------------------------------------------------
// 2. system message with array content keeps its content when demoted to "user"
// ---------------------------------------------------------------------------
test("system message with array content is demoted to user, content preserved", () => {
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

  const demoted = result.messages[1];
  assert.ok(demoted, "expected a second message in output");
  assert.equal(demoted.role, "user");
  // Array content with text blocks is flattened to a string
  assert.equal(
    typeof demoted.content === "string" ? demoted.content : JSON.stringify(demoted.content),
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
