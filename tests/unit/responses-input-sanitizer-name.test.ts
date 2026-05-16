import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

test("truncates function_call name longer than 128 chars", () => {
  const longName = "a".repeat(156);
  const items = [{ type: "function_call", call_id: "c1", name: longName, arguments: "{}" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.ok((result[0].name as string).length <= 128);
});

test("strips illegal characters from function_call name leaving only [a-zA-Z0-9_-]", () => {
  const items = [
    { type: "function_call", call_id: "c2", name: "mcp__ns__get.issue item", arguments: "{}" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.match(result[0].name as string, /^[a-zA-Z0-9_-]+$/);
});

test("strips illegal characters from function_call_output name", () => {
  const items = [
    { type: "function_call_output", call_id: "c3", name: "tool.with.dots", output: "ok" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.match(result[0].name as string, /^[a-zA-Z0-9_-]+$/);
});

test("leaves a valid name unchanged", () => {
  const items = [
    { type: "function_call", call_id: "c4", name: "valid_tool-name", arguments: "{}" },
  ];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.equal(result[0].name, "valid_tool-name");
});

test("does not modify message items", () => {
  const items = [{ type: "message", role: "user", content: "hello" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  assert.deepEqual(result[0], { type: "message", role: "user", content: "hello" });
});

test("handles name that is both too long and has illegal chars", () => {
  const badName = "mcp__ns__get.issue.".repeat(10); // 190 chars with dots
  const items = [{ type: "function_call", call_id: "c5", name: badName, arguments: "{}" }];
  const result = sanitizeResponsesInputItems(items) as Array<Record<string, unknown>>;
  const name = result[0].name as string;
  assert.ok(name.length <= 128);
  assert.match(name, /^[a-zA-Z0-9_-]+$/);
});
