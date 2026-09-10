import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  SemanticCacheManager,
  generateDirectHash,
  resetSemanticCacheManager,
} from "../../open-sse/services/cache/semanticCacheManager.ts";
import { MemoryVectorStore } from "../../open-sse/services/cache/memoryVectorStore.ts";
import {
  RedisVectorStore,
  type RedisLike,
} from "../../open-sse/services/cache/redisVectorStore.ts";
import {
  cosineSimilarity,
  dotProduct,
  l2Normalize,
} from "../../open-sse/services/cache/vectorStore.ts";
import {
  normalizeConversationForEmbedding,
  generateEmbeddingWithTimeout,
} from "../../open-sse/services/cache/embeddingClient.ts";
import { resolveSemanticCacheConfig } from "../../open-sse/config/semanticCacheConfig.ts";

describe("Semantic Cache — Dual-Layer Architecture", () => {
  beforeEach(() => {
    resetSemanticCacheManager(null);
  });

  describe("Vector Math & Normalization", () => {
    it("computes cosine similarity accurately", () => {
      const a = [1, 0, 0];
      const b = [1, 0, 0];
      const c = [0, 1, 0];
      const d = [0.7071, 0.7071, 0];

      assert.equal(Math.round(cosineSimilarity(a, b) * 1000) / 1000, 1);
      assert.equal(cosineSimilarity(a, c), 0);
      assert.ok(cosineSimilarity(a, d) > 0.7 && cosineSimilarity(a, d) < 0.71);
      assert.equal(dotProduct([1, 2], [3, 4]), 11);
    });

    it("handles zero vectors and empty arrays gracefully", () => {
      assert.equal(cosineSimilarity([], []), 0);
      assert.equal(cosineSimilarity([0, 0], [1, 2]), 0);
    });

    it("resolves config defaults and overrides properly", () => {
      const conf = resolveSemanticCacheConfig({ similarityThreshold: 0.85 });
      assert.equal(conf.similarityThreshold, 0.85);
      assert.equal(conf.backend, "memory");
    });

    it("l2Normalize creates unit vector", () => {
      const v = [3, 4];
      const norm = l2Normalize(v);
      assert.equal(Math.round(norm[0] * 10) / 10, 0.6);
      assert.equal(Math.round(norm[1] * 10) / 10, 0.8);
      const magnitude = Math.sqrt(norm[0] ** 2 + norm[1] ** 2);
      assert.equal(Math.round(magnitude * 1000) / 1000, 1);
    });
  });

  describe("Conversation Normalization", () => {
    it("extracts clean text from string and array messages", () => {
      const msgs = [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "What is the capital of France?" },
        { role: "assistant", content: "Paris" },
        { role: "user", content: "What is its population?" },
      ];

      const textWithSystem = normalizeConversationForEmbedding(msgs, {
        excludeSystemPrompt: false,
        historyDepth: 3,
      });
      assert.ok(textWithSystem.includes("user: What is its population?"));
      assert.ok(textWithSystem.includes("assistant: Paris"));

      const textNoSystem = normalizeConversationForEmbedding(msgs, {
        excludeSystemPrompt: true,
        historyDepth: 3,
      });
      assert.ok(!textNoSystem.includes("system:"));
    });

    it("handles multipart content objects", () => {
      const msgs = [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            { type: "text", text: "World" },
          ],
        },
      ];
      const text = normalizeConversationForEmbedding(msgs);
      assert.equal(text, "user: Hello World");
    });
  });

  describe("Layer 1: Exact Match (Direct Hash)", () => {
    it("bypasses embedding generation on exact match (0 embedding latency)", async () => {
      let embeddingCalls = 0;
      const mockEmbeddingGenerator = async () => {
        embeddingCalls++;
        return { embedding: [1, 0, 0], inputTokens: 5 };
      };

      const manager = new SemanticCacheManager(
        { enabled: true },
        new MemoryVectorStore(),
        mockEmbeddingGenerator
      );

      const requestBody = {
        model: "gpt-4o",
        messages: [{ role: "user", content: "How do I reverse a string in JS?" }],
        temperature: 0,
      };

      const responsePayload = {
        id: "chatcmpl-test-1",
        choices: [
          { message: { role: "assistant", content: "Use str.split('').reverse().join('')" } },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 15 },
      };

      // 1. Store response
      await manager.store({
        body: requestBody,
        response: responsePayload,
        model: "gpt-4o",
        provider: "openai",
        tokensSaved: 25,
      });

      // Reset embedding counter after store
      embeddingCalls = 0;

      // 2. Lookup identical query -> Layer 1 exact match
      const result = await manager.lookup({
        body: requestBody,
        model: "gpt-4o",
        provider: "openai",
      });

      assert.equal(result.hit, true, "Should hit cache");
      assert.equal(result.type, "exact", "Should be an exact match hit");
      assert.equal(embeddingCalls, 0, "Exact match MUST NOT call embedding generator");
      assert.equal(result.tokensSaved, 25);
    });

    it("isolates direct hashes by apiKeyId (#3740)", () => {
      const conv = [{ role: "user", content: "test query" }];
      const hashA = generateDirectHash("gpt-4", conv, 0, 1, { apiKeyId: "user-a" });
      const hashB = generateDirectHash("gpt-4", conv, 0, 1, { apiKeyId: "user-b" });
      const hashAnonymous = generateDirectHash("gpt-4", conv, 0, 1);

      assert.notEqual(hashA, hashB);
      assert.notEqual(hashA, hashAnonymous);
      assert.ok(hashA.startsWith("user-a."));
    });
  });

  describe("Layer 2: Semantic Similarity Match", () => {
    it("hits cache when prompt is semantically similar above threshold", async () => {
      const embeddings: Record<string, number[]> = {
        "user: What is the capital of France?": [0.95, 0.31, 0],
        "user: Tell me the capital city of France": [0.94, 0.34, 0],
        "user: How to make a chocolate cake?": [0.1, 0.99, 0],
      };

      const mockEmbeddingGenerator = async (text: string) => {
        const vec = embeddings[text] || [0.5, 0.5, 0];
        return { embedding: vec, inputTokens: 8 };
      };

      const manager = new SemanticCacheManager(
        { enabled: true, similarityThreshold: 0.8 },
        new MemoryVectorStore(),
        mockEmbeddingGenerator
      );

      // 1. Store first query
      await manager.store({
        body: {
          model: "gpt-4o",
          messages: [{ role: "user", content: "What is the capital of France?" }],
          temperature: 0,
        },
        response: {
          id: "chatcmpl-paris",
          choices: [{ message: { role: "assistant", content: "The capital of France is Paris." } }],
          usage: { prompt_tokens: 8, completion_tokens: 10 },
        },
        model: "gpt-4o",
        provider: "openai",
        tokensSaved: 18,
      });

      // 2. Query with different wording (synonymous)
      const similarResult = await manager.lookup({
        body: {
          model: "gpt-4o",
          messages: [{ role: "user", content: "Tell me the capital city of France" }],
          temperature: 0,
        },
        model: "gpt-4o",
        provider: "openai",
      });

      assert.equal(similarResult.hit, true, "Similar query should hit cache");
      assert.equal(similarResult.type, "semantic", "Should be a semantic hit");
      assert.ok(
        (similarResult.similarity ?? 0) >= 0.8,
        `Similarity score ${similarResult.similarity} should be >= 0.8`
      );

      // 3. Query with completely different topic
      const differentResult = await manager.lookup({
        body: {
          model: "gpt-4o",
          messages: [{ role: "user", content: "How to make a chocolate cake?" }],
          temperature: 0,
        },
        model: "gpt-4o",
        provider: "openai",
      });

      assert.equal(differentResult.hit, false, "Unrelated query should miss cache");
    });

    it("respects per-request threshold override via x-omniroute-cache-threshold", async () => {
      // 0.85 similarity between vectors
      const mockEmbeddingGenerator = async (text: string) => {
        if (text.includes("query-1")) return { embedding: [1, 0, 0], inputTokens: 5 };
        return { embedding: [0.85, 0.5268, 0], inputTokens: 5 }; // dot product = 0.85
      };

      const manager = new SemanticCacheManager(
        { enabled: true, similarityThreshold: 0.8 },
        new MemoryVectorStore(),
        mockEmbeddingGenerator
      );

      await manager.store({
        body: { model: "gpt-4o", messages: [{ role: "user", content: "query-1" }], temperature: 0 },
        response: { id: "res-1", choices: [{ message: { role: "assistant", content: "ans-1" } }] },
        model: "gpt-4o",
        provider: "openai",
      });

      // Normal threshold 0.8: similarity 0.85 >= 0.8 -> HIT
      const hitNormal = await manager.lookup({
        body: { model: "gpt-4o", messages: [{ role: "user", content: "query-2" }], temperature: 0 },
        model: "gpt-4o",
        provider: "openai",
      });
      assert.equal(hitNormal.hit, true);

      // Strict per-request threshold 0.95: similarity 0.85 < 0.95 -> MISS
      const missStrict = await manager.lookup({
        body: { model: "gpt-4o", messages: [{ role: "user", content: "query-2" }], temperature: 0 },
        headers: { "x-omniroute-cache-threshold": "0.95" },
        model: "gpt-4o",
        provider: "openai",
      });
      assert.equal(missStrict.hit, false);
    });
  });

  describe("Request Overrides & Bypasses", () => {
    it("respects Cache-Control: no-cache and x-omniroute-no-cache: true", async () => {
      const manager = new SemanticCacheManager({ enabled: true }, new MemoryVectorStore());
      const body = {
        model: "gpt-4",
        messages: [{ role: "user", content: "test" }],
        temperature: 0,
      };

      await manager.store({
        body,
        response: { id: "1", choices: [] },
        model: "gpt-4",
        provider: "openai",
      });

      const bypassedX = await manager.lookup({
        body,
        headers: { "x-omniroute-no-cache": "true" },
        model: "gpt-4",
        provider: "openai",
      });
      assert.equal(bypassedX.hit, false);
      assert.equal(bypassedX.bypassed, true);

      const bypassedCC = await manager.lookup({
        body,
        headers: { "cache-control": "no-cache" },
        model: "gpt-4",
        provider: "openai",
      });
      assert.equal(bypassedCC.hit, false);
      assert.equal(bypassedCC.bypassed, true);
    });

    it("respects x-omniroute-cache-type: direct and x-omniroute-cache-type: semantic", async () => {
      let semCalls = 0;
      const mockEmbeddingGenerator = async () => {
        semCalls++;
        return { embedding: [1, 0], inputTokens: 2 };
      };

      const manager = new SemanticCacheManager(
        { enabled: true },
        new MemoryVectorStore(),
        mockEmbeddingGenerator
      );

      // Direct-only mode skips semantic search completely on miss
      const result = await manager.lookup({
        body: { model: "m", messages: [{ role: "user", content: "new" }], temperature: 0 },
        headers: { "x-omniroute-cache-type": "direct" },
        model: "m",
        provider: "p",
      });
      assert.equal(result.hit, false);
      assert.equal(semCalls, 0, "direct mode must not call embedding generator");
    });

    it("respects x-omniroute-cache-no-store: true", async () => {
      const manager = new SemanticCacheManager({ enabled: true }, new MemoryVectorStore());
      const body = {
        model: "gpt-4",
        messages: [{ role: "user", content: "no-store-test" }],
        temperature: 0,
      };

      await manager.store({
        body,
        headers: { "x-omniroute-cache-no-store": "true" },
        response: { id: "1", choices: [] },
        model: "gpt-4",
        provider: "openai",
      });

      const check = await manager.lookup({
        body,
        model: "gpt-4",
        provider: "openai",
      });
      assert.equal(check.hit, false, "Entry should not have been stored");
    });
  });

  describe("Streaming SSE Replay", () => {
    it("synthesizes valid OpenAI SSE frames ending in data: [DONE]", () => {
      const manager = new SemanticCacheManager({ enabled: true });
      const entry = {
        id: "test",
        hash: "h",
        promptText: "hi",
        model: "gpt-4o",
        provider: "openai",
        response: {
          id: "chatcmpl-stream-test",
          created: 123456789,
          model: "gpt-4o",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: "Streaming answer content" },
              finish_reason: "stop",
            },
          ],
        },
        tokensSaved: 15,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60000,
      };

      const sse = manager.synthesizeSseFromEntry(entry);
      assert.ok(sse.startsWith("data: "));
      assert.ok(sse.includes("Streaming answer content"));
      assert.ok(sse.trimEnd().endsWith("data: [DONE]"));
    });
  });

  describe("MemoryVectorStore Operations & Eviction", () => {
    it("evicts oldest entries when exceeding maxEntries", async () => {
      const store = new MemoryVectorStore({ maxEntries: 2 });
      const now = Date.now();

      await store.set(
        {
          id: "1",
          hash: "h1",
          promptText: "p1",
          model: "m",
          provider: "p",
          response: {},
          tokensSaved: 1,
          createdAt: now,
          expiresAt: now + 100000,
        },
        100000
      );

      await store.set(
        {
          id: "2",
          hash: "h2",
          promptText: "p2",
          model: "m",
          provider: "p",
          response: {},
          tokensSaved: 1,
          createdAt: now,
          expiresAt: now + 100000,
        },
        100000
      );

      await store.set(
        {
          id: "3",
          hash: "h3",
          promptText: "p3",
          model: "m",
          provider: "p",
          response: {},
          tokensSaved: 1,
          createdAt: now,
          expiresAt: now + 100000,
        },
        100000
      );

      // Oldest entry 1 should have been evicted
      assert.equal(await store.get("1"), null);
      assert.notEqual(await store.get("2"), null);
      assert.notEqual(await store.get("3"), null);
      const stats = await store.getStats();
      assert.equal(stats.entries, 2);
    });

    it("expires entries past TTL", async () => {
      const store = new MemoryVectorStore();
      const now = Date.now();

      await store.set(
        {
          id: "expired",
          hash: "hexp",
          promptText: "p",
          model: "m",
          provider: "p",
          response: {},
          tokensSaved: 1,
          createdAt: now - 5000,
          expiresAt: now - 1000, // already expired
        },
        -1000
      );

      assert.equal(await store.get("expired"), null);
      assert.equal(await store.getByHash("hexp"), null);
    });
  });

  describe("RedisVectorStore with Mock Client & Fail-Open", () => {
    it("handles Redis get, set, smembers and fails open on connection errors", async () => {
      const redisStorage = new Map<string, string>();
      const setStorage = new Map<string, Set<string>>();

      const mockClient: RedisLike = {
        get: async (k: string) => redisStorage.get(k) || null,
        set: async (k: string, v: string) => {
          redisStorage.set(k, v);
          return "OK";
        },
        del: async (...keys: string[]) => {
          let count = 0;
          for (const k of keys) {
            if (redisStorage.delete(k)) count++;
          }
          return count;
        },
        sadd: async (k: string, ...members: string[]) => {
          if (!setStorage.has(k)) setStorage.set(k, new Set());
          const s = setStorage.get(k)!;
          let added = 0;
          for (const m of members) {
            if (!s.has(m)) {
              s.add(m);
              added++;
            }
          }
          return added;
        },
        srem: async (k: string, ...members: string[]) => {
          const s = setStorage.get(k);
          if (!s) return 0;
          let removed = 0;
          for (const m of members) {
            if (s.delete(m)) removed++;
          }
          return removed;
        },
        smembers: async (k: string) => {
          const s = setStorage.get(k);
          return s ? Array.from(s) : [];
        },
        mget: async (...keys: string[]) => {
          return keys.map((k) => redisStorage.get(k) || null);
        },
        keys: async (_p: string) => Array.from(redisStorage.keys()),
      };

      const redisStore = new RedisVectorStore({ client: mockClient });

      const entry = {
        id: "redis-entry-1",
        hash: "hash-redis",
        embedding: [1, 0, 0],
        promptText: "hello redis",
        model: "gpt-4",
        provider: "openai",
        response: { id: "res" },
        tokensSaved: 10,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60000,
      };

      await redisStore.set(entry, 60000);
      const fetched = await redisStore.getByHash("hash-redis");
      assert.ok(fetched);
      assert.equal(fetched.promptText, "hello redis");

      const search = await redisStore.searchNearest([1, 0, 0], { model: "gpt-4" }, 0.8);
      assert.equal(search.length, 1);
      assert.equal(search[0].entry.id, "redis-entry-1");

      // Test fail-open resilience when client errors
      const failingClient: RedisLike = {
        get: async () => {
          throw new Error("ECONNREFUSED");
        },
        set: async () => {
          throw new Error("ECONNREFUSED");
        },
        del: async () => {
          throw new Error("ECONNREFUSED");
        },
        sadd: async () => {
          throw new Error("ECONNREFUSED");
        },
        srem: async () => {
          throw new Error("ECONNREFUSED");
        },
        smembers: async () => {
          throw new Error("ECONNREFUSED");
        },
        mget: async () => {
          throw new Error("ECONNREFUSED");
        },
        keys: async () => {
          throw new Error("ECONNREFUSED");
        },
      };

      const brokenStore = new RedisVectorStore({ client: failingClient });
      // Should NOT throw, but return null/empty
      assert.equal(await brokenStore.get("any"), null);
      assert.equal(await brokenStore.getByHash("any"), null);
      const emptyResults = await brokenStore.searchNearest([1, 0], {}, 0.8);
      assert.deepEqual(emptyResults, []);
    });
  });

  describe("Graceful Degradation", () => {
    it("fails open when embedding generation times out or throws", async () => {
      const failingGenerator = async () => {
        throw new Error("Embedding upstream 503 Service Unavailable");
      };

      const manager = new SemanticCacheManager(
        { enabled: true },
        new MemoryVectorStore(),
        failingGenerator
      );

      const result = await manager.lookup({
        body: { model: "gpt-4", messages: [{ role: "user", content: "test" }], temperature: 0 },
        model: "gpt-4",
        provider: "openai",
      });

      assert.equal(result.hit, false, "Embedding failure must fail open cleanly");
    });

    it("handles empty input in generateEmbeddingWithTimeout", async () => {
      const res = await generateEmbeddingWithTimeout("", async () => null);
      assert.equal(res, null);
    });

    it("times out uncooperative generators that ignore AbortSignal via Promise.race", async () => {
      // Generator that never resolves and completely ignores AbortSignal
      const hangingGenerator = () =>
        new Promise<{ embedding: number[]; inputTokens: number }>(() => {});

      const t0 = Date.now();
      const res = await generateEmbeddingWithTimeout("hello", hangingGenerator, { timeoutMs: 50 });
      const elapsed = Date.now() - t0;

      assert.equal(res, null, "Should return null on timeout");
      assert.ok(elapsed >= 45 && elapsed < 500, `Should resolve around 50ms, took ${elapsed}ms`);
    });
  });

  describe("Multi-Tenant Partition Isolation", () => {
    it("isolates anonymous requests from authenticated entries in semantic search", async () => {
      const store = new MemoryVectorStore();
      const manager = new SemanticCacheManager(
        { enabled: true, similarityThreshold: 0.8 },
        store,
        async () => ({ embedding: [1, 0], inputTokens: 5 })
      );

      // Store entry under apiKeyId: "tenant-a"
      await manager.store({
        body: {
          model: "gpt-4",
          messages: [{ role: "user", content: "sensitive data" }],
          temperature: 0,
        },
        response: { choices: [{ message: { content: "secret answer" } }] },
        model: "gpt-4",
        provider: "openai",
        apiKeyId: "tenant-a",
        tokensSaved: 10,
      });

      // Anonymous query (no apiKeyId) should MISS
      const anonResult = await manager.lookup({
        body: {
          model: "gpt-4",
          messages: [{ role: "user", content: "sensitive data paraphrase" }],
          temperature: 0,
        },
        model: "gpt-4",
        provider: "openai",
      });
      assert.equal(anonResult.hit, false, "Anonymous query must NOT hit tenant-a cached entry");

      // Another tenant query should MISS
      const otherTenantResult = await manager.lookup({
        body: {
          model: "gpt-4",
          messages: [{ role: "user", content: "sensitive data paraphrase" }],
          temperature: 0,
        },
        model: "gpt-4",
        provider: "openai",
        apiKeyId: "tenant-b",
      });
      assert.equal(
        otherTenantResult.hit,
        false,
        "Tenant-b query must NOT hit tenant-a cached entry"
      );

      // Same tenant query should HIT
      const sameTenantResult = await manager.lookup({
        body: {
          model: "gpt-4",
          messages: [{ role: "user", content: "sensitive data paraphrase" }],
          temperature: 0,
        },
        model: "gpt-4",
        provider: "openai",
        apiKeyId: "tenant-a",
      });
      assert.equal(sameTenantResult.hit, true, "Tenant-a query must HIT tenant-a cached entry");
    });
  });

  describe("MemoryVectorStore Hash Index Consistency", () => {
    it("replaces older entry when inserting a new entry with identical hash", async () => {
      const store = new MemoryVectorStore();
      const now = Date.now();

      await store.set(
        {
          id: "id-old",
          hash: "shared-hash-1",
          promptText: "prompt 1",
          model: "m",
          provider: "p",
          response: { v: 1 },
          tokensSaved: 10,
          createdAt: now,
          expiresAt: now + 60000,
        },
        60000
      );

      // Insert newer entry with same hash but new ID
      await store.set(
        {
          id: "id-new",
          hash: "shared-hash-1",
          promptText: "prompt 1 updated",
          model: "m",
          provider: "p",
          response: { v: 2 },
          tokensSaved: 15,
          createdAt: now + 100,
          expiresAt: now + 60000,
        },
        60000
      );

      // Old entry should be removed from store
      assert.equal(await store.get("id-old"), null);
      // New entry should be accessible directly and by hash
      const byHash = await store.getByHash("shared-hash-1");
      assert.equal(byHash?.id, "id-new");
      assert.equal((byHash?.response as { v: number }).v, 2);

      // Deleting the old ID must not delete the hash mapping for the new ID
      await store.delete("id-old");
      const byHashAfterOldDelete = await store.getByHash("shared-hash-1");
      assert.equal(byHashAfterOldDelete?.id, "id-new");
    });
  });

  describe("RedisVectorStore Stale Set Pruning & Conditional Hash Deletion", () => {
    it("prunes expired / missing entries from candidate sets and decrements getStats", async () => {
      const redisStorage = new Map<string, string>();
      const setStorage = new Map<string, Set<string>>();

      const mockClient: RedisLike = {
        get: async (k: string) => redisStorage.get(k) || null,
        set: async (k: string, v: string) => {
          redisStorage.set(k, v);
        },
        del: async (...keys: string[]) => {
          keys.forEach((k) => redisStorage.delete(k));
          return keys.length;
        },
        sadd: async (k: string, ...members: string[]) => {
          if (!setStorage.has(k)) setStorage.set(k, new Set());
          const set = setStorage.get(k)!;
          members.forEach((m) => set.add(m));
          return members.length;
        },
        srem: async (k: string, ...members: string[]) => {
          const set = setStorage.get(k);
          if (!set) return 0;
          let count = 0;
          members.forEach((m) => {
            if (set.delete(m)) count++;
          });
          return count;
        },
        smembers: async (k: string) => Array.from(setStorage.get(k) || []),
        mget: async (...keys: string[]) => keys.map((k) => redisStorage.get(k) || null),
      };

      const store = new RedisVectorStore({ client: mockClient, keyPrefix: "test:" });
      const now = Date.now();

      // Store entry 1 (active)
      await store.set(
        {
          id: "active-1",
          hash: "hash-active",
          embedding: [1, 0],
          promptText: "active prompt",
          model: "gpt-4",
          provider: "openai",
          response: { text: "active" },
          tokensSaved: 10,
          createdAt: now,
          expiresAt: now + 10000,
        },
        10000
      );

      // Store entry 2 (expired)
      await store.set(
        {
          id: "expired-2",
          hash: "hash-expired",
          embedding: [1, 0],
          promptText: "expired prompt",
          model: "gpt-4",
          provider: "openai",
          response: { text: "expired" },
          tokensSaved: 10,
          createdAt: now - 5000,
          expiresAt: now - 1000,
        },
        -1000
      );

      // Simulate entry 3 that was deleted from Redis keys directly (e.g. TTL expired naturally in Redis)
      await mockClient.sadd!("test:all_ids", "ghost-3");
      await mockClient.sadd!("test:model:gpt-4", "ghost-3");

      // getStats should count only living entries and prune expired/ghost entries
      const stats = await store.getStats();
      assert.equal(stats.entries, 1, "Only active-1 should be counted as live");

      // searchNearest should also prune stale entries and return only active-1
      const nearest = await store.searchNearest([1, 0], { model: "gpt-4" }, 0.8);
      assert.equal(nearest.length, 1);
      assert.equal(nearest[0].entry.id, "active-1");
    });

    it("conditionally deletes hash mapping only if matching the entry being deleted", async () => {
      const redisStorage = new Map<string, string>();
      const setStorage = new Map<string, Set<string>>();

      const mockClient: RedisLike = {
        get: async (k: string) => redisStorage.get(k) || null,
        set: async (k: string, v: string) => {
          redisStorage.set(k, v);
        },
        del: async (...keys: string[]) => {
          keys.forEach((k) => redisStorage.delete(k));
          return keys.length;
        },
        sadd: async (k: string, ...members: string[]) => {
          if (!setStorage.has(k)) setStorage.set(k, new Set());
          members.forEach((m) => setStorage.get(k)!.add(m));
          return members.length;
        },
        srem: async (k: string, ...members: string[]) => {
          const set = setStorage.get(k);
          if (!set) return 0;
          let count = 0;
          members.forEach((m) => {
            if (set.delete(m)) count++;
          });
          return count;
        },
        smembers: async (k: string) => Array.from(setStorage.get(k) || []),
        mget: async (...keys: string[]) => keys.map((k) => redisStorage.get(k) || null),
      };

      const store = new RedisVectorStore({ client: mockClient, keyPrefix: "test:" });
      const now = Date.now();

      // Store entry 1
      await store.set(
        {
          id: "id-1",
          hash: "shared-hash",
          embedding: [1, 0],
          promptText: "prompt",
          model: "gpt-4",
          provider: "openai",
          response: {},
          tokensSaved: 5,
          createdAt: now,
          expiresAt: now + 60000,
        },
        60000
      );

      // Overwrite with entry 2 under same hash
      await store.set(
        {
          id: "id-2",
          hash: "shared-hash",
          embedding: [1, 0],
          promptText: "prompt",
          model: "gpt-4",
          provider: "openai",
          response: {},
          tokensSaved: 5,
          createdAt: now + 10,
          expiresAt: now + 60000,
        },
        60000
      );

      // Now attempt to delete id-1 (older entry)
      await store.delete("id-1");

      // The hash mapping in Redis must STILL point to id-2!
      const hashKey = "test:hash:shared-hash";
      assert.equal(
        redisStorage.get(hashKey),
        "id-2",
        "Hash mapping must not be deleted by older entry deletion"
      );
    });
  });
});
