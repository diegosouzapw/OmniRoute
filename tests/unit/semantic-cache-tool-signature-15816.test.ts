import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { generateSignature } from "../../src/lib/semanticCache.ts";
import {
  generateDirectHash,
  SemanticCacheManager,
} from "../../open-sse/services/cache/semanticCacheManager.ts";
import { MemoryVectorStore } from "../../open-sse/services/cache/memoryVectorStore.ts";

const responseCall = {
  type: "function_call",
  name: "weather",
  call_id: "call_1",
  arguments: '{"city":"Paris"}',
};
const output = { type: "function_call_output", call_id: "call_1", output: "sunny" };
const chatCall = (args: string) => ({
  role: "assistant",
  content: null,
  tool_calls: [{ id: "call_1", type: "function", function: { name: "weather", arguments: args } }],
});
const cases: Array<[string, Record<string, unknown>, Record<string, unknown>]> = [
  ["Responses arguments", responseCall, { ...responseCall, arguments: '{"city":"Tokyo"}' }],
  ["Responses function name", responseCall, { ...responseCall, name: "forecast" }],
  ["Responses call identity", responseCall, { ...responseCall, call_id: "call_2" }],
  ["Responses function output", output, { ...output, output: "rainy" }],
  ["Responses output identity", output, { ...output, call_id: "call_2" }],
  ["Chat tool arguments", chatCall("{}"), chatCall('{"city":"Tokyo"}')],
  [
    "legacy function arguments",
    { role: "assistant", function_call: { name: "weather", arguments: "{}" } },
    { role: "assistant", function_call: { name: "weather", arguments: '{"city":"Tokyo"}' } },
  ],
  [
    "Chat tool result identity",
    { role: "tool", content: "sunny", tool_call_id: "call_1" },
    { role: "tool", content: "sunny", tool_call_id: "call_2" },
  ],
];

for (const [cache, signature] of [
  ["legacy", (items: unknown) => generateSignature("model", items)],
  ["direct", (items: unknown) => generateDirectHash("model", items)],
] as const) {
  for (const [name, first, second] of cases) {
    test(`${cache}: ${name} participates in the request signature`, () => {
      assert.notEqual(signature([first]), signature([second]));
      assert.equal(signature([first]), signature([structuredClone(first)]));
    });
  }
  test(`${cache}: conversation order remains significant`, () => {
    assert.notEqual(signature([responseCall, output]), signature([output, responseCall]));
  });
}

test("plain text retains the pre-fix legacy and direct cache keys", () => {
  const messages = [{ role: "user", content: "Hello" }];
  const digest = (payload: unknown) =>
    createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  assert.equal(
    generateSignature("model", messages),
    digest({ model: "model", messages, temperature: 0, top_p: 1 })
  );
  assert.equal(
    generateDirectHash("model", messages),
    digest({ model: "model", provider: "*", messages, temperature: 0, top_p: 1 })
  );
  const typedMessages = messages.map((message) => ({ ...message, type: "message" }));
  assert.equal(generateSignature("model", typedMessages), generateSignature("model", messages));
  assert.equal(generateDirectHash("model", typedMessages), generateDirectHash("model", messages));
});

test("tool conversations preserve tenant and explicit cache-key isolation", () => {
  const messages = [responseCall, output];
  assert.notEqual(
    generateSignature("model", messages, 0, 1, "tenant-a"),
    generateSignature("model", messages, 0, 1, "tenant-b")
  );
  assert.notEqual(
    generateDirectHash("model", messages, 0, 1, { apiKeyId: "tenant-a" }),
    generateDirectHash("model", messages, 0, 1, { apiKeyId: "tenant-b" })
  );
  assert.notEqual(
    generateDirectHash("model", messages, 0, 1, { cacheKey: "a" }),
    generateDirectHash("model", messages, 0, 1, { cacheKey: "b" })
  );
});

test("direct cache never replays a response for different function output", async () => {
  const manager = new SemanticCacheManager(
    { enabled: true, backend: "memory", requireZeroTemperature: false },
    new MemoryVectorStore({ maxEntries: 10 })
  );
  const params = {
    model: "model",
    provider: "provider",
    apiKeyId: "tenant-a",
    headers: { "x-omniroute-cache-type": "direct" },
  };
  const body = { input: [responseCall, output] };
  await manager.store({
    ...params,
    body,
    response: { choices: [{ message: { content: "Sunny" } }] },
  });
  assert.equal((await manager.lookup({ ...params, body })).hit, true);
  assert.equal(
    (
      await manager.lookup({
        ...params,
        body: { input: [responseCall, { ...output, output: "rainy" }] },
      })
    ).hit,
    false
  );
});
