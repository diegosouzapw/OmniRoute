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
  const total = MAX_LOG_ARRAY_ITEMS + 10;
  const messages = Array.from({ length: total }, (_, i) => ({ role: "user", content: `msg ${i}` }));
  const result = cloneBoundedForLog({ messages }) as { messages: Array<Record<string, unknown>> };
  assert.equal(result.messages.length, MAX_LOG_ARRAY_ITEMS + 1, "1 marker + tail items");
  const marker = result.messages[0];
  assert.equal(marker._omniroute_truncated_array, true);
  assert.equal(marker.originalLength, total);
  assert.equal(marker.retainedTailItems, MAX_LOG_ARRAY_ITEMS);
});

test("cloneBoundedForLog: nested tools field still exempt", () => {
  const body = {
    body: { tools: Array.from({ length: 30 }, (_, i) => ({ name: `t_${i}` })) },
  };
  const result = cloneBoundedForLog(body) as { body: { tools: unknown[] } };
  assert.equal(result.body.tools.length, 30);
});

// Regression: a Chat Completions response's tool_calls[].function is 6 levels
// deep from the response body (body -> choices -> [i] -> message -> tool_calls
// -> [i] -> function) — the depth cap used to be a hardcoded 6, so every
// logged tool call's `function` (name + arguments) got replaced outright with
// the literal string "[MaxDepth]", not just deeply truncated. This broke tool
// call rendering in the request-detail view for ANY response with a tool
// call — not an edge case, universal.
test("cloneBoundedForLog: tool_calls[].function survives at its natural depth (was clobbered to '[MaxDepth]')", () => {
  const body = {
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "write", arguments: '{"path":"/tmp/x","content":"hi"}' },
            },
          ],
        },
      },
    ],
  };
  const result = cloneBoundedForLog(body) as {
    choices: Array<{ message: { tool_calls: Array<{ function: unknown }> } }>;
  };
  const fn = result.choices[0].message.tool_calls[0].function;
  assert.notEqual(fn, "[MaxDepth]", "function must not be clobbered to the MaxDepth placeholder");
  assert.deepEqual(fn, { name: "write", arguments: '{"path":"/tmp/x","content":"hi"}' });
});

test("cloneBoundedForLog: top-level array without key context still truncated", () => {
  const arr = Array.from({ length: MAX_LOG_ARRAY_ITEMS + 10 }, (_, i) => i);
  const result = cloneBoundedForLog(arr) as unknown[];
  assert.equal(result.length, MAX_LOG_ARRAY_ITEMS + 1);
});

test("cloneBoundedForLog: small tools array (<=MAX) passes through unchanged", () => {
  const tools = Array.from({ length: 10 }, (_, i) => ({ name: `t_${i}` }));
  const result = cloneBoundedForLog({ tools }) as { tools: unknown[] };
  assert.equal(result.tools.length, 10);
});
