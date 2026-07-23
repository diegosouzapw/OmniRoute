// tests/unit/chatcore-tool-calling-required-check.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkToolCallingRequiredButUnsupported } from "../../open-sse/handlers/chatCore/toolCallingRequiredCheck.ts";

test("blocks a direct request that needs tools on a model that can't do tool calling", () => {
  const body = { model: "x", tools: [{ type: "function", function: { name: "exec" } }] };
  const result = checkToolCallingRequiredButUnsupported(
    body,
    ["tools", "tool_choice", "parallel_tool_calls"],
    false,
    "aphrodite/TheDrummer/Behemoth-X-123B-v2.1"
  );
  assert.equal(result.blocked, true);
  assert.match(result.message!, /does not support tool calling/);
  assert.match(result.message!, /Behemoth-X-123B-v2\.1/);
});

test("does not block a combo request — filterTargetsByRequestCompatibility already keeps this target out", () => {
  const body = { model: "x", tools: [{ type: "function", function: { name: "exec" } }] };
  const result = checkToolCallingRequiredButUnsupported(
    body,
    ["tools", "tool_choice", "parallel_tool_calls"],
    true, // isCombo
    "aphrodite/TheDrummer/Behemoth-X-123B-v2.1"
  );
  assert.equal(result.blocked, false);
});

test("does not block when the model supports tools (tools not in unsupported list)", () => {
  const body = { model: "x", tools: [{ type: "function", function: { name: "exec" } }] };
  const result = checkToolCallingRequiredButUnsupported(body, ["temperature"], false, "gpt-4o");
  assert.equal(result.blocked, false);
});

test("does not block when the current request has no live tools array (stale history is handled by flattening, not a hard error)", () => {
  const body = { model: "x", messages: [{ role: "tool", content: "leftover" }] };
  const result = checkToolCallingRequiredButUnsupported(
    body,
    ["tools", "tool_choice", "parallel_tool_calls"],
    false,
    "aphrodite/TheDrummer/Behemoth-X-123B-v2.1"
  );
  assert.equal(result.blocked, false);
});

test("does not block when tools is present but empty", () => {
  const body = { model: "x", tools: [] };
  const result = checkToolCallingRequiredButUnsupported(
    body,
    ["tools"],
    false,
    "aphrodite/TheDrummer/Behemoth-X-123B-v2.1"
  );
  assert.equal(result.blocked, false);
});
