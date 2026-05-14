import test from "node:test";
import assert from "node:assert/strict";

const { cloneBoundedForLog, MAX_LOG_ARRAY_ITEMS } =
  await import("../../open-sse/utils/requestLogger.ts");

test("cloneBoundedForLog: tools array is exempt from truncation (debug-critical)", () => {
  const tools = Array.from({ length: 45 }, (_, i) => ({
    name: `tool_${String(i).padStart(2, "0")}`,
    description: `Tool ${i} description`,
  }));
  const result = cloneBoundedForLog({ tools }) as { tools: Array<Record<string, unknown>> };
  assert.equal(result.tools.length, 45);
  assert.equal(result.tools[0].name, "tool_00");
  assert.equal(result.tools[44].name, "tool_44");
  // No truncation marker should appear inside tools
  assert.ok(
    !("_omniroute_truncated_array" in result.tools[0]),
    "tools array should NOT have truncation marker"
  );
});

test("cloneBoundedForLog: other large arrays still truncated to MAX_LOG_ARRAY_ITEMS", () => {
  const messages = Array.from({ length: 45 }, (_, i) => ({ role: "user", content: `msg ${i}` }));
  const result = cloneBoundedForLog({ messages }) as { messages: Array<Record<string, unknown>> };
  assert.equal(result.messages.length, MAX_LOG_ARRAY_ITEMS + 1, "1 marker + tail items");
  const marker = result.messages[0];
  assert.equal(marker._omniroute_truncated_array, true);
  assert.equal(marker.originalLength, 45);
  assert.equal(marker.retainedTailItems, MAX_LOG_ARRAY_ITEMS);
});

test("cloneBoundedForLog: nested tools field still exempt", () => {
  const body = {
    body: { tools: Array.from({ length: 30 }, (_, i) => ({ name: `t_${i}` })) },
  };
  const result = cloneBoundedForLog(body) as { body: { tools: unknown[] } };
  assert.equal(result.body.tools.length, 30);
});

test("cloneBoundedForLog: top-level array without key context still truncated", () => {
  const arr = Array.from({ length: 45 }, (_, i) => i);
  const result = cloneBoundedForLog(arr) as unknown[];
  assert.equal(result.length, MAX_LOG_ARRAY_ITEMS + 1);
});

test("cloneBoundedForLog: small tools array (<=MAX) passes through unchanged", () => {
  const tools = Array.from({ length: 10 }, (_, i) => ({ name: `t_${i}` }));
  const result = cloneBoundedForLog({ tools }) as { tools: unknown[] };
  assert.equal(result.tools.length, 10);
});
