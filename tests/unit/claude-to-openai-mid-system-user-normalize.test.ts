/**
 * Claude Code hook contexts (SessionStart hook ~25KB, PreToolUse hook) arrive
 * as role:"system" messages in the MIDDLE of the messages array — non-standard
 * for the Anthropic Messages API, but Claude Code emits them. The claude →
 * openai translation passed them through at their original positions, and
 * HCP-Vision-Latest's vLLM (fronted by a LiteLLM gateway) rejects any system
 * turn not at index 0 with:
 *   400 litellm.BadRequestError - Hosted_vlllException
 *   "System message must be at the beginning."
 * Live repro (2026-09): the failing request translated to roles
 *   system,user,system,assistant,tool,user,system
 * while 135/138 recent mid-system calls to other upstreams (GLM-5.3-Flash,
 * DeepSeek-V4-Flash) already returned 200 — so demoting mid-conversation
 * systems to user (content preserved byte-identical) satisfies the strict
 * vLLM gateway without changing what accepting upstreams already accept.
 * The index-0 system (translator-made from the top-level `system` field, or
 * client-supplied at position 0) stays untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

// The bilingual system-append feature rewrites/unshifts the index-0 system
// message; blank it so role/content assertions are deterministic regardless
// of the operator environment running the suite.
delete process.env.OMNIROUTE_SYSTEM_INSTRUCTION_APPEND;

test("mid-conversation system roles are demoted to user with content preserved", () => {
  const body = {
    max_tokens: 64,
    messages: [
      { role: "user", content: [{ type: "text", text: "plan the deploy" }] },
      { role: "system", content: "SessionStart hook context" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu-1", name: "Read", input: { file_path: "/x" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu-1", content: "file contents" }],
      },
      { role: "system", content: "PreToolUse hook context" },
    ],
  };
  const result = claudeToOpenAIRequest("hcp-vision-latest", body, false, null);
  const roles = result.messages.map((m) => m.role);
  assert.deepEqual(roles, ["user", "user", "assistant", "tool", "user"]);
  assert.ok(!roles.includes("system"), "system may only appear at index 0");
  assert.equal(result.messages[1].content, "SessionStart hook context");
  assert.equal(result.messages[4].content, "PreToolUse hook context");
});

test("index-0 system (translator-made from the top-level system field) is preserved", () => {
  const body = {
    system: "You are helpful.",
    max_tokens: 64,
    messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
  };
  const result = claudeToOpenAIRequest("hcp-vision-latest", body, false, null);
  assert.equal(result.messages[0].role, "system");
  assert.equal(result.messages[0].content, "You are helpful.");
});

test("no-op when there is no mid-conversation system (roles identical to pre-fix)", () => {
  const body = {
    system: "You are helpful.",
    messages: [
      { role: "user", content: [{ type: "text", text: "hello" }] },
      { role: "assistant", content: [{ type: "text", text: "hi" }] },
      { role: "user", content: [{ type: "text", text: "bye" }] },
    ],
  };
  const result = claudeToOpenAIRequest("gpt-4o", body, false, null);
  assert.deepEqual(
    result.messages.map((m) => m.role),
    ["system", "user", "assistant", "user"]
  );

  // Edge: empty messages array — nothing to demote, the translator-made
  // index-0 system is the only message left.
  const empty = claudeToOpenAIRequest("gpt-4o", { system: "sys", messages: [] }, false, null);
  assert.deepEqual(
    empty.messages.map((m) => m.role),
    ["system"]
  );
});

test("demotion preserves tool_result -> role:tool mapping and assistant content", () => {
  const body = {
    system: "You are helpful.",
    messages: [
      { role: "user", content: [{ type: "text", text: "list files" }] },
      { role: "system", content: "SessionStart hook context" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "listing now" },
          { type: "tool_use", id: "toolu-2", name: "Bash", input: { command: "ls" } },
        ],
      },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "toolu-2", content: "a.ts\nb.ts" },
          { type: "text", text: "continue" },
        ],
      },
    ],
  };
  const result = claudeToOpenAIRequest("hcp-vision-latest", body, false, null);
  assert.deepEqual(
    result.messages.map((m) => m.role),
    ["system", "user", "user", "assistant", "tool", "user"]
  );
  const tool = result.messages.find((m) => m.role === "tool");
  assert.equal(tool.tool_call_id, "toolu-2");
  assert.equal(tool.content, "a.ts\nb.ts");
  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.equal(assistant.content, "listing now");
  assert.equal(assistant.tool_calls[0].function.name, "Bash");
});

test("full reproduction: mid hook systems become user, index-0 system stays", () => {
  const body = {
    system: "You are Claude Code, Anthropic's official CLI for Claude.",
    max_tokens: 128,
    messages: [
      { role: "user", content: [{ type: "text", text: "plan the deploy" }] },
      { role: "system", content: "<session-start-hook>~25KB context</session-start-hook>" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "checking the tree" },
          { type: "tool_use", id: "toolu-9", name: "Bash", input: { command: "ls" } },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu-9", content: "src\nopen-sse" }],
      },
      { role: "user", content: [{ type: "text", text: "continue" }] },
      { role: "system", content: "<pre-tool-use-hook>context</pre-tool-use-hook>" },
    ],
  };
  const result = claudeToOpenAIRequest("hcp-vision-latest", body, false, null);
  assert.deepEqual(
    result.messages.map((m) => m.role),
    ["system", "user", "user", "assistant", "tool", "user", "user"]
  );
  assert.equal(result.messages[0].role, "system");
  assert.equal(
    result.messages[2].content,
    "<session-start-hook>~25KB context</session-start-hook>"
  );
  assert.equal(result.messages[6].content, "<pre-tool-use-hook>context</pre-tool-use-hook>");
});
