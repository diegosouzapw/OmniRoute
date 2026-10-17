import assert from "node:assert/strict";
import test from "node:test";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { remapToolNamesInRequest } from "../../open-sse/services/claudeCodeToolRemapper.ts";

test("claude-step remap leaves the caller's Anthropic-format body untouched", () => {
  const body = {
    model: "claude-opus-5-5",
    tools: [{ name: "read", description: "Read a file", input_schema: { type: "object" } }],
    messages: [
      { role: "user", content: [{ type: "text", text: "read it" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "read", input: { path: "a.ts" } }],
      },
    ],
  };
  const executor = new BaseExecutor("claude", {} as never);
  const transformed = executor.transformRequest(
    "claude-opus-5-5",
    body,
    true,
    {} as never
  ) as Record<string, unknown>;
  remapToolNamesInRequest(transformed);

  assert.equal((transformed.tools as Array<{ name: string }>)[0].name, "Read");
  assert.equal(
    (transformed.messages as Array<{ content: Array<{ name: string }> }>)[1].content[0].name,
    "Read",
    "the copy sent upstream must carry the renamed tool_use"
  );
  assert.equal(body.tools[0].name, "read", "tool definition leaked into the caller's body");
  assert.equal(
    (body.messages[1].content[0] as { name: string }).name,
    "read",
    "tool_use history leaked"
  );
});

test("claude-step remap leaves the caller's tool_choice untouched", () => {
  const body = {
    model: "claude-opus-5-5",
    tools: [{ name: "read", input_schema: { type: "object" } }],
    tool_choice: { type: "tool", name: "read" },
    messages: [{ role: "user", content: "read it" }],
  };
  const executor = new BaseExecutor("claude", {} as never);
  const transformed = executor.transformRequest(
    "claude-opus-5-5",
    body,
    true,
    {} as never
  ) as Record<string, unknown>;
  remapToolNamesInRequest(transformed);

  assert.equal((transformed.tool_choice as { name: string }).name, "Read");
  assert.equal(body.tool_choice.name, "read", "tool_choice leaked into the caller's body");
});
