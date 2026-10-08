import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGeminiToolCallIds } from "../../open-sse/translator/request/openai-to-gemini/toolCallIds.ts";
import type { GeminiContent } from "../../open-sse/translator/request/openai-to-gemini/helpers.ts";

function call(id: string, name = "tool"): GeminiContent {
  return {
    role: "model",
    parts: [{ thoughtSignature: `signature-${name}`, functionCall: { id, name, args: { name } } }],
  };
}

function response(id: string, name = "tool"): GeminiContent {
  return { role: "user", parts: [{ functionResponse: { id, name, response: { result: name } } }] };
}

function ids(contents: GeminiContent[], key: string): unknown[] {
  return contents
    .flatMap((content) => content.parts)
    .filter((part) => part[key])
    .map((part) => (part[key] as { id: string }).id);
}

test("reserves future call and orphan response IDs before allocating suffixes", () => {
  const history = [
    call("repeat"),
    response("repeat"),
    call("repeat"),
    response("repeat"),
    call("repeat_occ2"),
    response("repeat_occ2"),
    response("repeat_occ3"),
  ];
  const result = normalizeGeminiToolCallIds(history);
  assert.deepEqual(ids(result, "functionCall"), ["repeat", "repeat_occ4", "repeat_occ2"]);
  assert.deepEqual(ids(result, "functionResponse"), [
    "repeat",
    "repeat_occ4",
    "repeat_occ2",
    "repeat_occ3",
  ]);
});

test("normalization is deterministic, idempotent and does not mutate its input", () => {
  const history = [
    call("repeat", "first"),
    response("repeat", "first"),
    call("repeat", "second"),
    response("repeat", "second"),
  ];
  const original = structuredClone(history);
  const result = normalizeGeminiToolCallIds(history);
  assert.deepEqual(history, original);
  assert.deepEqual(normalizeGeminiToolCallIds(history), result);
  assert.deepEqual(normalizeGeminiToolCallIds(result), result);
  assert.deepEqual(result[2].parts[0], {
    thoughtSignature: "signature-second",
    functionCall: { id: "repeat_occ2", name: "second", args: { name: "second" } },
  });
});

test("parallel distinct IDs and reversed result order remain correctly paired across reuse", () => {
  const history = [
    { role: "model", parts: [...call("a").parts, ...call("b").parts] },
    { role: "user", parts: [...response("b").parts, ...response("a").parts] },
    { role: "model", parts: [...call("a").parts, ...call("b").parts] },
    { role: "user", parts: [...response("b").parts, ...response("a").parts] },
  ];
  const result = normalizeGeminiToolCallIds(history);
  assert.deepEqual(ids(result, "functionCall"), ["a", "b", "a_occ2", "b_occ2"]);
  assert.deepEqual(ids(result, "functionResponse"), ["b", "a", "b_occ2", "a_occ2"]);
});

test("long IDs with shared prefixes do not collide and the first IDs stay unchanged", () => {
  const first = "x".repeat(512) + "a";
  const second = "x".repeat(512) + "b";
  const result = normalizeGeminiToolCallIds([
    call(first),
    response(first),
    call(first),
    response(first),
    call(second),
    response(second),
    call(second),
    response(second),
  ]);
  assert.deepEqual(ids(result, "functionCall"), [first, `${first}_occ2`, second, `${second}_occ2`]);
  assert.deepEqual(ids(result, "functionResponse"), ids(result, "functionCall"));
});

test("trailing reuse gets an ID without inventing a result and ID-less Vertex parts are unchanged", () => {
  const trailing = normalizeGeminiToolCallIds([call("repeat"), response("repeat"), call("repeat")]);
  assert.deepEqual(ids(trailing, "functionCall"), ["repeat", "repeat_occ2"]);
  assert.deepEqual(ids(trailing, "functionResponse"), ["repeat"]);
  const vertex = [
    { role: "model", parts: [{ functionCall: { name: "tool", args: {} } }] },
    { role: "user", parts: [{ functionResponse: { name: "tool", response: {} } }] },
  ];
  assert.deepEqual(normalizeGeminiToolCallIds(vertex), vertex);
});

test("overlapping IDs are rejected without partially changing input", () => {
  const history = [call("same", "first"), call("same", "second"), response("same")];
  const original = structuredClone(history);
  assert.throws(() => normalizeGeminiToolCallIds(history), /overlapping tool calls/);
  assert.deepEqual(history, original);
});
