import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SemanticCacheManager } from "../../open-sse/services/cache/semanticCacheManager.ts";
import { MemoryVectorStore } from "../../open-sse/services/cache/memoryVectorStore.ts";
import { RedisVectorStore } from "../../open-sse/services/cache/redisVectorStore.ts";
import { createDefaultEmbeddingGenerator } from "../../open-sse/services/cache/embeddingClient.ts";
import { cosineSimilarity } from "../../open-sse/services/cache/vectorStore.ts";

const LEMONADE_URL = process.env.LEMONADE_URL || "http://192.168.31.147:13305/v1/embeddings";
const LEMONADE_KEY = process.env.LEMONADE_KEY || "lemonade";
const LEMONADE_MODEL = process.env.LEMONADE_MODEL || "harrier-oss-v1-0.6b";
const REDIS_URL = process.env.REDIS_URL || "redis://192.168.31.147:6379";

async function isEndpointReachable(url: string, timeoutMs = 1500): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { method: "HEAD", signal: controller.signal }).catch(() => null);
    clearTimeout(timer);
    return res !== null;
  } catch {
    return false;
  }
}

describe("Semantic Cache Live Integration with Lemonade & Redis", () => {
  it("generates 1024-dimensional embeddings via Lemonade harrier-oss-v1-0.6b", async (t) => {
    const reachable = await isEndpointReachable(LEMONADE_URL);
    if (!reachable) {
      t.skip(`Lemonade server not reachable at ${LEMONADE_URL}`);
      return;
    }

    const generator = createDefaultEmbeddingGenerator({
      embeddingProvider: "lemonade",
      embeddingModel: LEMONADE_MODEL,
      embeddingBaseUrl: LEMONADE_URL,
      embeddingApiKey: LEMONADE_KEY,
    });

    const res = await generator("What is machine learning?");
    assert.ok(res, "Should return embedding result");
    assert.equal(res.embedding.length, 1024, "Vector dimension should be 1024");

    const paraphraseRes = await generator("Can you explain what machine learning is?");
    assert.ok(paraphraseRes);
    const sim = cosineSimilarity(res.embedding, paraphraseRes.embedding);
    assert.ok(sim > 0.8, `Paraphrase similarity ${sim} should be > 0.8`);
  });

  it("performs dual-layer lookup using MemoryVectorStore and Lemonade embeddings", async (t) => {
    const reachable = await isEndpointReachable(LEMONADE_URL);
    if (!reachable) {
      t.skip(`Lemonade server not reachable at ${LEMONADE_URL}`);
      return;
    }

    const generator = createDefaultEmbeddingGenerator({
      embeddingProvider: "lemonade",
      embeddingModel: LEMONADE_MODEL,
      embeddingBaseUrl: LEMONADE_URL,
      embeddingApiKey: LEMONADE_KEY,
    });

    const manager = new SemanticCacheManager(
      {
        enabled: true,
        similarityThreshold: 0.8,
        embeddingModel: LEMONADE_MODEL,
        embeddingProvider: "lemonade",
        embeddingBaseUrl: LEMONADE_URL,
        embeddingApiKey: LEMONADE_KEY,
      },
      new MemoryVectorStore(),
      generator
    );

    const body = {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: "What is the boiling point of water?" }],
      temperature: 0,
    };

    await manager.store({
      body,
      response: {
        id: "resp-boiling",
        choices: [
          { message: { role: "assistant", content: "Water boils at 100 degrees Celsius." } },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 12 },
      },
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
      tokensSaved: 22,
    });

    // 1. Exact match -> Layer 1
    const exact = await manager.lookup({
      body,
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
    });
    assert.equal(exact.hit, true);
    assert.equal(exact.type, "exact");
    assert.equal(exact.tokensSaved, 22);

    // 2. Semantic match -> Layer 2
    const semantic = await manager.lookup({
      body: {
        model: "lemonade/Heimdallr-27B-GGUF",
        messages: [{ role: "user", content: "At what temperature does water boil?" }],
        temperature: 0,
      },
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
    });
    assert.equal(semantic.hit, true);
    assert.equal(semantic.type, "semantic");
    assert.ok((semantic.similarity ?? 0) >= 0.8);

    // 3. Unrelated -> Miss
    const miss = await manager.lookup({
      body: {
        model: "lemonade/Heimdallr-27B-GGUF",
        messages: [{ role: "user", content: "Who was Napoleon Bonaparte?" }],
        temperature: 0,
      },
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
    });
    assert.equal(miss.hit, false);
  });

  it("persists entries and performs vector search in live Redis", async (t) => {
    const reachable = await isEndpointReachable(LEMONADE_URL);
    if (!reachable) {
      t.skip(`Lemonade server not reachable at ${LEMONADE_URL}`);
      return;
    }

    const redisStore = new RedisVectorStore({
      redisUrl: REDIS_URL,
      keyPrefix: `omniroute:test:it:${Date.now()}:`,
    });

    const generator = createDefaultEmbeddingGenerator({
      embeddingProvider: "lemonade",
      embeddingModel: LEMONADE_MODEL,
      embeddingBaseUrl: LEMONADE_URL,
      embeddingApiKey: LEMONADE_KEY,
    });

    const manager = new SemanticCacheManager(
      {
        enabled: true,
        backend: "redis",
        similarityThreshold: 0.8,
        embeddingModel: LEMONADE_MODEL,
        embeddingProvider: "lemonade",
        embeddingBaseUrl: LEMONADE_URL,
        embeddingApiKey: LEMONADE_KEY,
      },
      redisStore,
      generator
    );

    const body = {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: "How do plants perform photosynthesis?" }],
      temperature: 0,
    };

    await manager.store({
      body,
      response: {
        id: "resp-photosynthesis",
        choices: [
          {
            message: {
              role: "assistant",
              content: "Plants convert sunlight, water, and CO2 into glucose and oxygen.",
            },
          },
        ],
        usage: { prompt_tokens: 15, completion_tokens: 20 },
      },
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
      tokensSaved: 35,
    });

    // 1. Direct hash from Redis
    const exact = await manager.lookup({
      body,
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
    });
    assert.equal(exact.hit, true);
    assert.equal(exact.type, "exact");

    // 2. Semantic match from Redis
    const semantic = await manager.lookup({
      body: {
        model: "lemonade/Heimdallr-27B-GGUF",
        messages: [{ role: "user", content: "Explain how photosynthesis works in plants" }],
        temperature: 0,
      },
      model: "lemonade/Heimdallr-27B-GGUF",
      provider: "lemonade",
    });
    assert.equal(semantic.hit, true);
    assert.equal(semantic.type, "semantic");
    assert.ok((semantic.similarity ?? 0) >= 0.8);

    // Clean up Redis keys
    await manager.clear();
    await redisStore.close();
  });
});
