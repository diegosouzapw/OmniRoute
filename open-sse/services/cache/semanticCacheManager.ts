/**
 * Semantic Cache Manager
 *
 * Orchestrates OmniRoute's dual-layer caching architecture:
 *   - Layer 1: Deterministic SHA-256 direct-hash lookup (0-latency exact replay)
 *   - Layer 2: Vector embedding similarity search (cosine threshold fuzzy match)
 *
 * Supports pluggable vector backends (in-memory and Redis), request overrides,
 * namespace isolation, SSE streaming replay, and fail-open resilience.
 *
 * @module services/cache/semanticCacheManager
 */

import crypto from "crypto";
import {
  type SemanticCacheConfig,
  type SemanticCacheType,
  resolveSemanticCacheConfig,
} from "../../config/semanticCacheConfig.ts";
import { type CacheEntry, type IVectorStore, type StoreFilter } from "./vectorStore.ts";
import { MemoryVectorStore } from "./memoryVectorStore.ts";
import { RedisVectorStore } from "./redisVectorStore.ts";
import {
  normalizeConversationForEmbedding,
  generateEmbeddingWithTimeout,
  createDefaultEmbeddingGenerator,
  type EmbeddingGenerator,
} from "./embeddingClient.ts";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";

export interface CacheLookupParams {
  body: Record<string, unknown> & {
    messages?: unknown;
    input?: unknown;
    temperature?: number;
    top_p?: number;
  };
  headers?: unknown;
  model: string;
  provider: string;
  stream?: boolean;
  apiKeyId?: string | null;
  cacheDefaultMode?: "legacy" | "bypass" | null;
}

export interface CacheLookupResult {
  hit: boolean;
  type?: "exact" | "semantic";
  entry?: CacheEntry;
  similarity?: number;
  tokensSaved?: number;
  bypassed?: boolean;
}

export interface CacheStoreParams {
  body: Record<string, unknown> & {
    messages?: unknown;
    input?: unknown;
    temperature?: number;
    top_p?: number;
  };
  headers?: unknown;
  response: Record<string, unknown>;
  streamChunks?: Array<Record<string, unknown>>;
  model: string;
  provider: string;
  apiKeyId?: string | null;
  signature?: string;
  tokensSaved?: number;
  ttlMs?: number;
}

function getHeader(headers: unknown, name: string): string | null {
  if (!headers) return null;
  const needle = name.toLowerCase();

  if (typeof (headers as { get?: (n: string) => string | null }).get === "function") {
    return (headers as { get: (n: string) => string | null }).get(name);
  }

  if (typeof headers === "object" && !Array.isArray(headers)) {
    for (const [key, val] of Object.entries(headers as Record<string, unknown>)) {
      if (key.toLowerCase() === needle && typeof val === "string") {
        return val;
      }
    }
  }

  return null;
}

function stringifyValue(val: unknown): string {
  if (typeof val === "string") return val;
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function normalizeMessagesForHash(conversation: unknown): Array<{ role: string; content: string }> {
  if (typeof conversation === "string") {
    return [{ role: "user", content: conversation }];
  }
  if (!Array.isArray(conversation)) return [];

  return conversation.map((item) => {
    if (!item || typeof item !== "object") {
      return { role: "user", content: stringifyValue(item) };
    }
    const record = item as Record<string, unknown>;
    const role =
      typeof record.role === "string" && record.role.trim().length > 0 ? record.role : "user";
    return {
      role,
      content: stringifyValue(record.content),
    };
  });
}

/**
 * Generate Layer 1 exact hash signature from request parameters.
 */
export function generateDirectHash(
  model: string,
  conversation: unknown,
  temperature = 0,
  topP = 1,
  scoping?: {
    apiKeyId?: string | null;
    cacheKey?: string | null;
    provider?: string | null;
    cacheByModel?: boolean;
    cacheByProvider?: boolean;
  }
): string {
  const payload = JSON.stringify({
    model: scoping?.cacheByModel !== false ? model : "*",
    provider: scoping?.cacheByProvider ? scoping.provider || "*" : "*",
    cacheKey: scoping?.cacheKey || undefined,
    messages: normalizeMessagesForHash(conversation),
    temperature,
    top_p: topP,
  });

  const digest = crypto.createHash("sha256").update(payload).digest("hex");
  return scoping?.apiKeyId ? `${scoping.apiKeyId}.${digest}` : digest;
}

export class SemanticCacheManager {
  private config: SemanticCacheConfig;
  private vectorStore: IVectorStore;
  private embeddingGenerator: EmbeddingGenerator | null = null;

  constructor(
    config?: Partial<SemanticCacheConfig>,
    customStore?: IVectorStore,
    customEmbeddingGenerator?: EmbeddingGenerator
  ) {
    this.config = resolveSemanticCacheConfig(config);
    if (customStore) {
      this.vectorStore = customStore;
    } else if (this.config.backend === "redis") {
      this.vectorStore = new RedisVectorStore({
        redisUrl: this.config.redisUrl,
        keyPrefix: this.config.redisPrefix,
      });
    } else {
      this.vectorStore = new MemoryVectorStore({
        maxEntries: this.config.maxEntries,
      });
    }

    if (customEmbeddingGenerator) {
      this.embeddingGenerator = customEmbeddingGenerator;
    } else {
      this.embeddingGenerator = createDefaultEmbeddingGenerator(this.config);
    }
  }

  public setEmbeddingGenerator(generator: EmbeddingGenerator): void {
    this.embeddingGenerator = generator;
  }

  public getStore(): IVectorStore {
    return this.vectorStore;
  }

  public getConfig(): SemanticCacheConfig {
    return this.config;
  }

  public updateConfig(newConfig: Partial<SemanticCacheConfig>): void {
    this.config = resolveSemanticCacheConfig({ ...this.config, ...newConfig });
  }

  private isBypassed(headers: unknown, body: Record<string, unknown>): boolean {
    const noCacheHeader = getHeader(headers, "x-omniroute-no-cache");
    if (noCacheHeader && noCacheHeader.toLowerCase() === "true") {
      return true;
    }
    const cacheControl = getHeader(headers, "cache-control");
    if (cacheControl && cacheControl.toLowerCase().includes("no-cache")) {
      return true;
    }
    const pragma = getHeader(headers, "pragma");
    if (pragma && pragma.toLowerCase().includes("no-cache")) {
      return true;
    }

    if (this.config.requireZeroTemperature) {
      if (typeof body.temperature === "number" && body.temperature !== 0) {
        return true;
      }
      if (body.temperature === undefined) {
        return true;
      }
    }

    return false;
  }

  public async lookup(params: CacheLookupParams): Promise<CacheLookupResult> {
    if (!this.config.enabled) {
      return { hit: false };
    }

    if (params.cacheDefaultMode === "bypass") {
      return { hit: false, bypassed: true };
    }

    if (this.isBypassed(params.headers, params.body)) {
      return { hit: false, bypassed: true };
    }

    const cacheKey = getHeader(params.headers, "x-omniroute-cache-key");
    const cacheTypeHeader = (
      getHeader(params.headers, "x-omniroute-cache-type") || "both"
    ).toLowerCase() as SemanticCacheType;

    const thresholdHeader = getHeader(params.headers, "x-omniroute-cache-threshold");
    const threshold =
      thresholdHeader !== null && Number.isFinite(Number(thresholdHeader))
        ? Math.max(0, Math.min(1, Number(thresholdHeader)))
        : this.config.similarityThreshold;

    const conv = params.body.messages ?? params.body.input;
    const temp = typeof params.body.temperature === "number" ? params.body.temperature : 0;
    const topP = typeof params.body.top_p === "number" ? params.body.top_p : 1;

    // ── Layer 1: Direct Hash Lookup ──
    const directHash = generateDirectHash(params.model, conv, temp, topP, {
      apiKeyId: params.apiKeyId,
      cacheKey,
      provider: params.provider,
      cacheByModel: this.config.cacheByModel,
      cacheByProvider: this.config.cacheByProvider,
    });

    if (cacheTypeHeader !== "semantic") {
      try {
        const exactEntry = await this.vectorStore.getByHash(directHash);
        if (exactEntry) {
          return {
            hit: true,
            type: "exact",
            entry: exactEntry,
            tokensSaved: exactEntry.tokensSaved,
          };
        }
      } catch (err) {
        console.warn("[CACHE] Direct hash lookup error:", (err as Error).message);
      }
    }

    // ── Layer 2: Semantic Vector Similarity Lookup ──
    if (cacheTypeHeader === "direct" || !this.embeddingGenerator) {
      return { hit: false };
    }

    // Guard: check conversation history depth/threshold
    if (Array.isArray(conv) && conv.length > this.config.conversationHistoryThreshold) {
      return { hit: false };
    }

    const promptText = normalizeConversationForEmbedding(conv, {
      excludeSystemPrompt: this.config.excludeSystemPrompt,
      historyDepth: this.config.conversationHistoryDepth,
    });

    if (!promptText) {
      return { hit: false };
    }

    const embedResult = await generateEmbeddingWithTimeout(promptText, this.embeddingGenerator, {
      model: this.config.embeddingModel,
      provider: this.config.embeddingProvider,
      timeoutMs: this.config.embeddingTimeoutMs,
    });

    if (!embedResult?.embedding || embedResult.embedding.length === 0) {
      return { hit: false };
    }

    const filter: StoreFilter = {
      model: this.config.cacheByModel ? params.model : undefined,
      provider: this.config.cacheByProvider ? params.provider : undefined,
      apiKeyId: params.apiKeyId || null,
      cacheKey: cacheKey || null,
    };

    try {
      const nearest = await this.vectorStore.searchNearest(
        embedResult.embedding,
        filter,
        threshold,
        1
      );
      if (nearest.length > 0 && nearest[0].similarity >= threshold) {
        return {
          hit: true,
          type: "semantic",
          entry: nearest[0].entry,
          similarity: nearest[0].similarity,
          tokensSaved: nearest[0].entry.tokensSaved,
        };
      }
    } catch (err) {
      console.warn("[CACHE] Semantic similarity search error:", (err as Error).message);
    }

    return { hit: false };
  }

  public async store(params: CacheStoreParams): Promise<void> {
    if (!this.config.enabled) return;

    // Check no-store header
    const noStore = getHeader(params.headers, "x-omniroute-cache-no-store");
    if (noStore && noStore.toLowerCase() === "true") return;

    if (this.isBypassed(params.headers, params.body)) return;

    const cacheKey = getHeader(params.headers, "x-omniroute-cache-key");
    const conv = params.body.messages ?? params.body.input;
    const temp = typeof params.body.temperature === "number" ? params.body.temperature : 0;
    const topP = typeof params.body.top_p === "number" ? params.body.top_p : 1;

    const directHash = generateDirectHash(params.model, conv, temp, topP, {
      apiKeyId: params.apiKeyId,
      cacheKey,
      provider: params.provider,
      cacheByModel: this.config.cacheByModel,
      cacheByProvider: this.config.cacheByProvider,
    });

    const promptText = normalizeConversationForEmbedding(conv, {
      excludeSystemPrompt: this.config.excludeSystemPrompt,
      historyDepth: this.config.conversationHistoryDepth,
    });

    // Custom TTL from header or config
    const ttlHeader = getHeader(params.headers, "x-omniroute-cache-ttl");
    let effectiveTtl = this.config.ttlMs;
    if (ttlHeader) {
      const parsed = Number(ttlHeader);
      if (Number.isFinite(parsed) && parsed > 0) {
        effectiveTtl = parsed > 100000 ? parsed : parsed * 1000;
      }
    } else if (params.ttlMs && params.ttlMs > 0) {
      effectiveTtl = params.ttlMs;
    }

    let embedding: number[] | undefined;
    if (this.embeddingGenerator && promptText) {
      const embedResult = await generateEmbeddingWithTimeout(promptText, this.embeddingGenerator, {
        model: this.config.embeddingModel,
        provider: this.config.embeddingProvider,
        timeoutMs: this.config.embeddingTimeoutMs,
      });
      if (embedResult?.embedding) {
        embedding = embedResult.embedding;
      }
    }

    const now = Date.now();
    const entry: CacheEntry = {
      id: crypto.randomUUID(),
      hash: directHash,
      signature: params.signature || undefined,
      embedding,
      promptText,
      model: params.model,
      provider: params.provider,
      apiKeyId: params.apiKeyId || undefined,
      cacheKey: cacheKey || undefined,
      response: params.response,
      streamChunks: params.streamChunks,
      tokensSaved: params.tokensSaved || 0,
      createdAt: now,
      expiresAt: now + effectiveTtl,
    };

    try {
      await this.vectorStore.set(entry, effectiveTtl);
    } catch (err) {
      console.warn("[CACHE] Asynchronous cache store failed:", (err as Error).message);
    }
  }

  public synthesizeSseFromEntry(entry: CacheEntry): string {
    if (Array.isArray(entry.streamChunks) && entry.streamChunks.length > 0) {
      const frames = entry.streamChunks.map((c) => `data: ${JSON.stringify(c)}\n\n`);
      frames.push("data: [DONE]\n\n");
      return frames.join("");
    }
    return synthesizeOpenAiSseFromJson(JSON.stringify(entry.response));
  }

  public async invalidateByModel(model: string): Promise<number> {
    try {
      return await this.vectorStore.deleteByModel(model);
    } catch {
      return 0;
    }
  }

  public async invalidateById(id: string): Promise<boolean> {
    try {
      return await this.vectorStore.delete(id);
    } catch {
      return false;
    }
  }

  public async clear(): Promise<number> {
    try {
      return await this.vectorStore.clear();
    } catch {
      return 0;
    }
  }

  public async getStats(): Promise<{ entries: number }> {
    return this.vectorStore.getStats();
  }
}

// ── Singleton Instance ──
let defaultManager: SemanticCacheManager | null = null;

export function getSemanticCacheManager(): SemanticCacheManager {
  if (!defaultManager) {
    defaultManager = new SemanticCacheManager();
  }
  return defaultManager;
}

export function resetSemanticCacheManager(custom?: SemanticCacheManager | null): void {
  defaultManager = custom ?? null;
}
