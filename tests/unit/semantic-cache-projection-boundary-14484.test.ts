import test from "node:test";
import assert from "node:assert/strict";
import { SemanticCacheManager } from "../../open-sse/services/cache/semanticCacheManager.ts";
import { MemoryVectorStore } from "../../open-sse/services/cache/memoryVectorStore.ts";

function manager() {
  return new SemanticCacheManager(
    { enabled: true, requireZeroTemperature: false },
    new MemoryVectorStore({ maxEntries: 20 }),
    async () => ({ embedding: [1, 0], inputTokens: 1 })
  );
}
const tail = [
  { role: "user", content: "hello" },
  { role: "assistant", content: "hello" },
  { role: "user", content: "continue" },
];

for (const [name, first, second] of [
  [
    "truncated instructions",
    [{ role: "system", content: "answer in French" }, ...tail],
    [{ role: "system", content: "answer in English" }, ...tail],
  ],
  [
    "image parts",
    [
      {
        role: "user",
        content: [
          { type: "text", text: "describe" },
          { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
        ],
      },
    ],
    [
      {
        role: "user",
        content: [
          { type: "text", text: "describe" },
          { type: "image_url", image_url: { url: "data:image/png;base64,BBBB" } },
        ],
      },
    ],
  ],
] as const) {
  test(`similarity never crosses omitted ${name}`, async () => {
    const cache = manager();
    await cache.store({
      model: "fixture",
      provider: "fixture",
      body: { messages: first },
      response: { id: "wrong" },
    });
    const hit = await cache.lookup({
      model: "fixture",
      provider: "fixture",
      body: { messages: second },
      headers: { "x-omniroute-cache-type": "semantic" },
    });
    assert.equal(hit.hit, false);
  });
}

test("similarity does not cross tool/output-contract boundaries", async () => {
  const cache = manager();
  await cache.store({
    model: "fixture",
    provider: "fixture",
    body: { messages: tail.slice(-1), tools: [{ type: "function", function: { name: "lookup" } }] },
    response: { id: "wrong" },
  });
  assert.equal(
    (
      await cache.lookup({
        model: "fixture",
        provider: "fixture",
        body: { messages: tail.slice(-1) },
        headers: { "x-omniroute-cache-type": "semantic" },
      })
    ).hit,
    false
  );
});

test("simple complete text conversations still use similarity", async () => {
  const cache = manager();
  await cache.store({
    model: "fixture",
    provider: "fixture",
    body: { messages: [{ role: "user", content: "Hi" }] },
    response: { id: "right" },
  });
  const hit = await cache.lookup({
    model: "fixture",
    provider: "fixture",
    body: { messages: [{ role: "user", content: "Hello" }] },
    headers: { "x-omniroute-cache-type": "semantic" },
  });
  assert.equal(hit.type, "semantic");
});

test("similarity ignores pre-hardening vector entries retained in Redis", async () => {
  const cache = manager();
  await cache.getStore().set(
    {
      id: "legacy",
      hash: "legacy",
      model: "fixture",
      provider: "fixture",
      embedding: [1, 0],
      promptText: "user: hello",
      response: { id: "unsafe-old-entry" },
      tokensSaved: 1,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60000,
    },
    60000
  );
  const result = await cache.lookup({
    model: "fixture",
    provider: "fixture",
    body: { messages: [{ role: "user", content: "hello" }] },
  });
  assert.equal(result.hit, false);
});
