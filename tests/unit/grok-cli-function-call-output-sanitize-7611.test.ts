import test from "node:test";
import assert from "node:assert/strict";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";

const testCredentials: ProviderCredentials = { accessToken: "tok" };

test("#7611: GrokCliExecutor sanitizes incomplete hex escapes in function_call_output", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [
      {
        type: "function_call",
        call_id: "call_1",
        name: "read_file",
        arguments: "{}",
      },
      {
        type: "function_call_output",
        call_id: "call_1",
        // incomplete \u escape — the production failure mode
        output: '{"path":"foo","snippet":"bad \\u12"}',
      },
    ],
  };

  const transformed = executor.transformRequest("grok-4.5", body, true, testCredentials) as Record<
    string,
    unknown
  >;

  const input = transformed.input as Array<Record<string, unknown>>;
  const outputItem = input.find((item) => item.type === "function_call_output");
  assert.ok(outputItem, "function_call_output item should remain");
  assert.equal(typeof outputItem.output, "string");
  // Must be re-parseable as a JSON string payload after sanitization.
  assert.doesNotThrow(() => JSON.parse(JSON.stringify({ output: outputItem.output })));
  assert.doesNotMatch(String(outputItem.output), /\\u12(?![0-9A-Fa-f])/);
});

test("#7611: valid JSON tool outputs are re-serialized cleanly", () => {
  const executor = new GrokCliExecutor();
  const payload = { ok: true, data: ["a", "b"], note: "café" };
  const body = {
    model: "grok-4.5",
    input: [
      {
        type: "function_call_output",
        call_id: "call_2",
        output: JSON.stringify(payload),
      },
    ],
  };
  const transformed = executor.transformRequest("grok-4.5", body, false, testCredentials) as Record<
    string,
    unknown
  >;
  const input = transformed.input as Array<Record<string, unknown>>;
  const outputItem = input.find((item) => item.type === "function_call_output");
  assert.deepEqual(JSON.parse(String(outputItem?.output)), payload);
});

test("#7611: array content parts are flattened to text", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [
      {
        type: "function_call_output",
        call_id: "call_3",
        output: [
          { type: "input_text", text: "hello" },
          { type: "input_text", text: "world" },
        ],
      },
    ],
  };
  const transformed = executor.transformRequest("grok-4.5", body, false, testCredentials) as Record<
    string,
    unknown
  >;
  const input = transformed.input as Array<Record<string, unknown>>;
  const outputItem = input.find((item) => item.type === "function_call_output");
  assert.equal(typeof outputItem?.output, "string");
  assert.match(String(outputItem?.output), /hello/);
  assert.match(String(outputItem?.output), /world/);
});
