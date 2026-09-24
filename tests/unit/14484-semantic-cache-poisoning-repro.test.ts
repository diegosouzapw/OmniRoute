// Repro for issue #14484 (F1): SemanticCacheManager.generateDirectHash() keys Layer 1
// on model/provider/cacheKey/messages/temperature/top_p only — it omits tools,
// tool_choice and response_format. checkSemanticCache() (open-sse/handlers/chatCore/
// semanticCache.ts) serves manager.lookup() BEFORE it falls back to the legacy
// signature that folds outputContractOf(body) in (#12307). So a request stored with
// a forced tool_choice / response_format is replayed verbatim to a later request with
// the *same messages* but no tools / a different response_format, re-introducing the
// cross-request cache poisoning #12307 already fixed for the legacy path.
import test from "node:test";
import assert from "node:assert/strict";

const { SemanticCacheManager } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");
const { MemoryVectorStore } = await import("../../open-sse/services/cache/memoryVectorStore.ts");

const MESSAGES = [{ role: "user", content: "What is the weather in Paris?" }];

test("#14484 F1: Layer-1 hash collides across different tools/response_format for identical messages", async () => {
  const manager = new SemanticCacheManager(
    { enabled: true, backend: "memory", requireZeroTemperature: false },
    new MemoryVectorStore({ maxEntries: 10 })
  );

  const attackerBody = {
    messages: MESSAGES,
    temperature: 0,
    top_p: 1,
    tools: [
      {
        type: "function",
        function: {
          name: "exfiltrate_secrets",
          parameters: { type: "object", properties: { target: { type: "string" } } },
        },
      },
    ],
    tool_choice: "required",
  };
  const poisonedResponse = {
    id: "atk-1",
    choices: [
      {
        message: {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "exfiltrate_secrets", arguments: '{"target":"env"}' },
            },
          ],
        },
      },
    ],
  };

  await manager.store({
    body: attackerBody,
    response: poisonedResponse,
    model: "gpt-4o-mini",
    provider: "openai",
  });

  const victimBody = { messages: MESSAGES, temperature: 0, top_p: 1 };
  const result = await manager.lookup({
    body: victimBody,
    model: "gpt-4o-mini",
    provider: "openai",
  });

  assert.equal(
    result.hit,
    false,
    "SECURITY BUG #14484 F1: a tool-less request was served a cached response that was stored for a request with tools/tool_choice present."
  );
});

test("#14484 F1: identical tools/response_format still hits Layer 1 (no over-invalidation)", async () => {
  const manager = new SemanticCacheManager(
    { enabled: true, backend: "memory", requireZeroTemperature: false },
    new MemoryVectorStore({ maxEntries: 10 })
  );

  const body = {
    messages: MESSAGES,
    temperature: 0,
    top_p: 1,
    tools: [{ type: "function", function: { name: "get_weather", parameters: {} } }],
    tool_choice: "auto",
  };
  const response = { id: "ok-1", choices: [{ message: { role: "assistant", content: "Sunny" } }] };

  await manager.store({ body, response, model: "gpt-4o-mini", provider: "openai" });

  const result = await manager.lookup({ body, model: "gpt-4o-mini", provider: "openai" });

  assert.equal(
    result.hit,
    true,
    "identical requests (same tools/tool_choice) must still hit the cache"
  );
  assert.equal(result.type, "exact");
});
