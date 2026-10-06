import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-codex-orphaned-2928-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

type InputItem = Record<string, unknown>;

function transform(input: InputItem[]): InputItem[] {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-sol",
    {
      _nativeCodexPassthrough: true,
      model: "gpt-5.6-sol",
      input,
      stream: true,
    },
    true,
    { requestEndpointPath: "/responses" }
  );

  assert.ok(Array.isArray(result.input));
  return result.input as InputItem[];
}

function toolOutputs(input: InputItem[]): InputItem[] {
  return input.filter((item) => item.type === "function_call_output");
}

test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Codex strips function_call_output items without matching function calls", () => {
  const result = transform([
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "hi" }],
    },
    { type: "function_call_output", call_id: "call_orphan1", output: "result1" },
    { type: "function_call_output", call_id: "call_orphan2", output: "result2" },
  ]);

  assert.deepEqual(toolOutputs(result), []);
});

test("Codex keeps a function_call_output with a matching Responses function_call", () => {
  const result = transform([
    {
      type: "function_call",
      call_id: "call_valid",
      name: "read_file",
      arguments: '{"path":"a.txt"}',
    },
    { type: "function_call_output", call_id: "call_valid", output: "file contents" },
  ]);

  assert.deepEqual(toolOutputs(result), [
    { type: "function_call_output", call_id: "call_valid", output: "file contents" },
  ]);
});

test("Codex keeps matched outputs and removes orphaned outputs from mixed input", () => {
  const result = transform([
    { type: "function_call", call_id: "call_keep", name: "read_file", arguments: "{}" },
    { type: "function_call_output", call_id: "call_keep", output: "ok" },
    { type: "function_call_output", call_id: "call_orphan", output: "orphaned" },
  ]);

  assert.equal(result.length, 2);
  assert.deepEqual(toolOutputs(result), [
    { type: "function_call_output", call_id: "call_keep", output: "ok" },
  ]);
});

test("Codex recognizes embedded Chat Completions tool_calls as matching calls", () => {
  const result = transform([
    {
      type: "message",
      role: "assistant",
      content: [],
      tool_calls: [
        { id: "call_cc1", type: "function", function: { name: "read_file", arguments: "{}" } },
      ],
    },
    { type: "function_call_output", call_id: "call_cc1", output: "ok" },
    { type: "function_call_output", call_id: "call_cc2", output: "orphaned" },
  ]);

  assert.deepEqual(toolOutputs(result), [
    { type: "function_call_output", call_id: "call_cc1", output: "ok" },
  ]);
});

test("Codex preserves tool outputs linked to a remote previous_response_id", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-sol",
    {
      _nativeCodexPassthrough: true,
      previous_response_id: "resp_remote_history",
      input: [{ type: "function_call_output", call_id: "call_remote", output: "remote result" }],
      stream: true,
    },
    true,
    { requestEndpointPath: "/responses" }
  );

  assert.deepEqual(result.input, [
    { type: "function_call_output", call_id: "call_remote", output: "remote result" },
  ]);
});

test("Codex leaves inputs without function_call_output items unchanged", () => {
  const input = [
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "hi" }],
    },
    { type: "function_call", call_id: "call_1", name: "read_file", arguments: "{}" },
  ];

  assert.deepEqual(transform(input), [
    input[0],
    input[1],
    { type: "function_call_output", call_id: "call_1", output: "" },
  ]);
});
