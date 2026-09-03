/**
 * GLM-family gateways (Z.AI / Zhipu — fronted by opencode-go, opencode-zen, and
 * glm-* model ids) reject any chat.completions payload whose `messages` array
 * contains NO role:"user" turn with `400 [1214] The messages parameter is
 * illegal`.
 *
 * Claude Code agent loops legitimately produce such payloads: every inbound
 * user turn carries only tool_result blocks (translated to role:"tool"), and
 * context compression can evict the original prompt. Verified live against the
 * upstream on 2026-08-23:
 *   - system + assistant(tool_calls) + tool          → 1214
 *   - same + trailing user                            → 200
 *   - assistant content:null / "" with a user present → 200
 *
 * Fix: when the credentials carry `_ensureUserTurn === true` and the translated
 * messages have no user turn, append a minimal synthetic user turn. The flag is
 * set by translateRequest for GLM-family providers only, so every other
 * backend keeps byte-identical request bodies.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } = await import(
  "../../../open-sse/translator/request/claude-to-openai.ts"
);

const TOOL_LOOP_BODY = {
  system: "You are helpful.",
  max_tokens: 64,
  messages: [
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "tool-1", name: "Read", input: { file_path: "/x" } }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "tool-1", content: "file contents" }],
    },
  ],
};

test("RED: pure tool-loop with _ensureUserTurn gains a synthetic trailing user message", () => {
  const result = claudeToOpenAIRequest("ox-alpha-free", TOOL_LOOP_BODY, false, {
    _ensureUserTurn: true,
  });
  const roles = result.messages.map((m) => m.role);
  assert.ok(roles.includes("user"), `expected a user role, got [${roles.join(",")}]`);
  const last = result.messages[result.messages.length - 1];
  assert.equal(last.role, "user");
  assert.ok(typeof last.content === "string" && last.content.trim().length > 0);
});

test("RED: without the flag the body stays unchanged (no user injected)", () => {
  const result = claudeToOpenAIRequest("gpt-4o", TOOL_LOOP_BODY, false, null);
  const roles = result.messages.map((m) => m.role);
  assert.ok(!roles.includes("user"), `flag absent must not inject user, got [${roles.join(",")}]`);
});

test("RED: existing user turns are preserved untouched (no duplicate injection)", () => {
  const body = {
    system: "You are helpful.",
    messages: [
      { role: "user", content: [{ type: "text", text: "hello" }] },
      { role: "assistant", content: [{ type: "text", text: "hi" }] },
    ],
  };
  const result = claudeToOpenAIRequest("glm-5.2", body, false, { _ensureUserTurn: true });
  const users = result.messages.filter((m) => m.role === "user");
  assert.equal(users.length, 1, "must not add a synthetic user when one exists");
});
