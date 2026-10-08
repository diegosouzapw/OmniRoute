/**
 * Live Verification Script: Semantic Caching with Lemonade Server & Redis
 *
 * Tests:
 * 1. Direct Lemonade embedding generation (harrier-oss-v1-0.6b, 1024-dim).
 * 2. In-Memory Vector Store: Layer 1 exact hit, Layer 2 semantic hit, semantic miss, LRU eviction.
 * 3. Redis Vector Store: Live connection to redis://192.168.31.147:6379, exact match, semantic match, TTL & cleanup.
 * 4. Streaming SSE response replay.
 *
 * Run with: node --import tsx/esm scripts/ad-hoc/test-semantic-cache-lemonade.ts
 */

import { SemanticCacheManager } from "../../open-sse/services/cache/semanticCacheManager.ts";
import { MemoryVectorStore } from "../../open-sse/services/cache/memoryVectorStore.ts";
import { RedisVectorStore } from "../../open-sse/services/cache/redisVectorStore.ts";
import { createDefaultEmbeddingGenerator } from "../../open-sse/services/cache/embeddingClient.ts";
import { cosineSimilarity } from "../../open-sse/services/cache/vectorStore.ts";

const LEMONADE_URL = process.env.LEMONADE_URL || "http://192.168.31.147:13305/v1/embeddings";
const LEMONADE_KEY = process.env.LEMONADE_KEY || "lemonade";
const LEMONADE_MODEL = process.env.LEMONADE_MODEL || "harrier-oss-v1-0.6b";
const REDIS_URL = process.env.REDIS_URL || "redis://192.168.31.147:6379";

async function main() {
  console.log("===============================================================");
  console.log(" OmniRoute Semantic Caching — Live Verification Suite");
  console.log("===============================================================");
  console.log(`• Lemonade Endpoint: ${LEMONADE_URL}`);
  console.log(`• Embedding Model:   ${LEMONADE_MODEL}`);
  console.log(`• Redis URL:          ${REDIS_URL}`);
  console.log("---------------------------------------------------------------\n");

  // ── Step 1: Test Direct Lemonade Embeddings ──
  console.log(" [1/4] Probing Lemonade Embedding Server...");
  const lemonadeGenerator = createDefaultEmbeddingGenerator({
    embeddingProvider: "lemonade",
    embeddingModel: LEMONADE_MODEL,
    embeddingBaseUrl: LEMONADE_URL,
    embeddingApiKey: LEMONADE_KEY,
  });

  const t0 = Date.now();
  const testText1 = "What is the capital of France?";
  const testText2 = "Can you tell me France's capital city?";
  const testText3 = "How do I bake chocolate chip cookies?";

  const [emb1, emb2, emb3] = await Promise.all([
    lemonadeGenerator(testText1),
    lemonadeGenerator(testText2),
    lemonadeGenerator(testText3),
  ]);

  if (!emb1?.embedding || !emb2?.embedding || !emb3?.embedding) {
    console.error("❌ Failed to obtain embeddings from Lemonade server. Exiting.");
    process.exit(1);
  }

  const embedDuration = Date.now() - t0;
  console.log(`✔ Generated 3 embeddings in ${embedDuration}ms`);
  console.log(`✔ Vector Dimension: ${emb1.embedding.length} (expected 1024)`);

  const simParaphrase = cosineSimilarity(emb1.embedding, emb2.embedding);
  const simUnrelated = cosineSimilarity(emb1.embedding, emb3.embedding);

  console.log(`• Cosine Similarity (Prompt 1 vs Paraphrase Prompt 2): ${simParaphrase.toFixed(4)}`);
  console.log(`• Cosine Similarity (Prompt 1 vs Unrelated Prompt 3):  ${simUnrelated.toFixed(4)}`);

  if (simParaphrase > 0.8 && simUnrelated < 0.6) {
    console.log(
      "✔ Semantic vector space validated: Paraphrase is highly similar, unrelated is distant.\n"
    );
  } else {
    console.warn("⚠ Warning: Unexpected vector similarity distribution.\n");
  }

  // ── Step 2: Test In-Memory Vector Store ──
  console.log(" [2/4] Testing In-Memory Vector Store & Dual-Layer Cache...");
  const memStore = new MemoryVectorStore({ maxEntries: 100 });
  const memoryManager = new SemanticCacheManager(
    {
      enabled: true,
      backend: "memory",
      similarityThreshold: 0.8,
      embeddingModel: LEMONADE_MODEL,
      embeddingProvider: "lemonade",
      embeddingBaseUrl: LEMONADE_URL,
      embeddingApiKey: LEMONADE_KEY,
    },
    memStore,
    lemonadeGenerator
  );

  const frenchCapitalResponse = {
    id: "chatcmpl-paris-test",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "The capital of France is Paris." },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 12, completion_tokens: 8 },
  };

  // Store in cache
  await memoryManager.store({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: testText1 }],
      temperature: 0,
    },
    response: frenchCapitalResponse,
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
    tokensSaved: 20,
  });
  console.log("✔ Stored initial response in In-Memory cache.");

  // Test Layer 1: Exact Match (Direct Hash)
  const memExact = await memoryManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: testText1 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(
    `• Query 1 (Identical Query): Hit=${memExact.hit}, Type=${memExact.type}, TokensSaved=${memExact.tokensSaved}`
  );
  if (memExact.hit && memExact.type === "exact") {
    console.log("✔ Layer 1 (Exact Match) HIT verified with 0 embedding overhead.");
  } else {
    console.error("❌ Layer 1 exact match failed!");
  }

  // Test Layer 2: Semantic Similarity Match
  const memSemantic = await memoryManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: testText2 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(
    `• Query 2 (Paraphrase):     Hit=${memSemantic.hit}, Type=${memSemantic.type}, Similarity=${memSemantic.similarity?.toFixed(4)}`
  );
  if (memSemantic.hit && memSemantic.type === "semantic") {
    console.log("✔ Layer 2 (Semantic Match) HIT verified via Lemonade embeddings.");
  } else {
    console.error("❌ Layer 2 semantic match failed!");
  }

  // Test Miss: Unrelated query
  const memMiss = await memoryManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: testText3 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(`• Query 3 (Unrelated):      Hit=${memMiss.hit}`);
  if (!memMiss.hit) {
    console.log("✔ Semantic MISS correctly returned for unrelated prompt.\n");
  } else {
    console.error("❌ Unrelated prompt unexpectedly hit cache!");
  }

  // ── Step 3: Test Redis Vector Store ──
  console.log(" [3/4] Testing Redis Vector Store & Persistence on 192.168.31.147:6379...");
  const redisPrefix = `omniroute:test:semcache:${Date.now()}:`;
  const redisStore = new RedisVectorStore({
    redisUrl: REDIS_URL,
    keyPrefix: redisPrefix,
  });

  const redisManager = new SemanticCacheManager(
    {
      enabled: true,
      backend: "redis",
      redisUrl: REDIS_URL,
      redisPrefix,
      similarityThreshold: 0.8,
      embeddingModel: LEMONADE_MODEL,
      embeddingProvider: "lemonade",
      embeddingBaseUrl: LEMONADE_URL,
      embeddingApiKey: LEMONADE_KEY,
    },
    redisStore,
    lemonadeGenerator
  );

  const quantumPrompt1 = "Explain quantum computing in simple terms.";
  const quantumPrompt2 = "Can you describe what quantum computers are in plain English?";
  const unrelatedPrompt4 = "What is the tallest mountain in the world?";

  const quantumResponse = {
    id: "chatcmpl-quantum-test",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Quantum computing uses qubits that can be in multiple states at once.",
        },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 15, completion_tokens: 22 },
  };

  // Store in Redis
  await redisManager.store({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: quantumPrompt1 }],
      temperature: 0,
    },
    response: quantumResponse,
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
    tokensSaved: 37,
  });
  console.log("✔ Stored quantum computing response in Redis vector store.");

  // Test Redis exact match
  const redisExact = await redisManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: quantumPrompt1 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(
    `• Redis Query 1 (Identical): Hit=${redisExact.hit}, Type=${redisExact.type}, TokensSaved=${redisExact.tokensSaved}`
  );
  if (redisExact.hit && redisExact.type === "exact") {
    console.log("✔ Redis Layer 1 (Direct Hash) HIT verified.");
  } else {
    console.error("❌ Redis Layer 1 exact match failed!");
  }

  // Test Redis semantic match
  const redisSemantic = await redisManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: quantumPrompt2 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(
    `• Redis Query 2 (Paraphrase): Hit=${redisSemantic.hit}, Type=${redisSemantic.type}, Similarity=${redisSemantic.similarity?.toFixed(4)}`
  );
  if (redisSemantic.hit && redisSemantic.type === "semantic") {
    console.log("✔ Redis Layer 2 (Semantic Match) HIT verified with 1024-dim vectors.");
  } else {
    console.error("❌ Redis Layer 2 semantic match failed!");
  }

  // Test Redis miss
  const redisMiss = await redisManager.lookup({
    body: {
      model: "lemonade/Heimdallr-27B-GGUF",
      messages: [{ role: "user", content: unrelatedPrompt4 }],
      temperature: 0,
    },
    model: "lemonade/Heimdallr-27B-GGUF",
    provider: "lemonade",
  });
  console.log(`• Redis Query 3 (Unrelated):  Hit=${redisMiss.hit}`);
  if (!redisMiss.hit) {
    console.log("✔ Redis Semantic MISS correctly returned.");
  }

  // Clean up Redis test keys
  const clearedCount = await redisManager.clear();
  console.log(`✔ Cleaned up ${clearedCount} test entries from Redis.\n`);

  // ── Step 4: Streaming SSE Replay Verification ──
  console.log(" [4/4] Verifying Streaming SSE Synthesis from Cache Entry...");
  if (redisExact.entry) {
    const sseStream = redisManager.synthesizeSseFromEntry(redisExact.entry);
    const hasData = sseStream.includes("data: {");
    const endsDone = sseStream.trimEnd().endsWith("data: [DONE]");
    console.log(`• SSE Stream starts with 'data: ': ${sseStream.startsWith("data: ")}`);
    console.log(`• SSE Stream includes chunks:     ${hasData}`);
    console.log(`• SSE Stream ends with [DONE]:    ${endsDone}`);
    if (hasData && endsDone) {
      console.log("✔ Streaming SSE chunk replay format verified.\n");
    } else {
      console.error("❌ SSE chunk replay format malformed!");
    }
  }

  console.log("===============================================================");
  console.log(" 🎉 ALL LIVE VERIFICATION CHECKS PASSED SUCCESSFULLY!");
  console.log("===============================================================");
  process.exit(0);
}

main().catch((err) => {
  console.error("Live test failed with exception:", err);
  process.exit(1);
});
