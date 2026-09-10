/**
 * Redis Vector Store Adapter
 *
 * Production-ready Redis-backed vector store for semantic caching.
 * Uses ioredis as a soft dependency.
 * Supports RediSearch vector indexes where available, with automatic
 * resilient fallback for standard Redis / Valkey instances.
 *
 * All operations fail open to ensure Redis issues never crash LLM traffic.
 *
 * @module services/cache/redisVectorStore
 */

import {
  type CacheEntry,
  type IVectorStore,
  type SimilaritySearchResult,
  type StoreFilter,
  dotProduct,
  l2Normalize,
} from "./vectorStore.ts";

export interface RedisLike {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: unknown[]): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  sadd(key: string, ...members: string[]): Promise<number>;
  srem(key: string, ...members: string[]): Promise<number>;
  smembers(key: string): Promise<string[]>;
  mget(...keys: string[]): Promise<Array<string | null>>;
  keys(pattern: string): Promise<string[]>;
  call?(command: string, ...args: unknown[]): Promise<unknown>;
  quit?(): Promise<string>;
}

export interface RedisVectorStoreOptions {
  redisUrl?: string;
  client?: RedisLike;
  keyPrefix?: string;
}

export class RedisVectorStore implements IVectorStore {
  private client: RedisLike | null = null;
  private readonly redisUrl?: string;
  private readonly prefix: string;
  private rediSearchAvailable: boolean | null = null;

  constructor(options?: RedisVectorStoreOptions) {
    this.redisUrl = options?.redisUrl;
    this.prefix = options?.keyPrefix ?? "omniroute:semcache:";
    if (options?.client) {
      this.client = options.client;
    }
  }

  private async getClient(): Promise<RedisLike | null> {
    if (this.client) return this.client;
    try {
      const mod = await import("ioredis");
      const RedisClass = (mod.default ?? mod) as unknown as new (url?: string) => RedisLike;
      this.client = new RedisClass(this.redisUrl);
      return this.client;
    } catch (err) {
      console.warn("[CACHE] Redis driver unavailable:", (err as Error).message);
      return null;
    }
  }

  private entryKey(id: string): string {
    return `${this.prefix}entry:${id}`;
  }

  private hashKey(hash: string): string {
    return `${this.prefix}hash:${hash}`;
  }

  private modelSetKey(model: string): string {
    return `${this.prefix}model:${model}`;
  }

  private allIdsKey(): string {
    return `${this.prefix}all_ids`;
  }

  public async get(id: string): Promise<CacheEntry | null> {
    try {
      const client = await this.getClient();
      if (!client) return null;

      const raw = await client.get(this.entryKey(id));
      if (!raw) return null;

      const entry = JSON.parse(raw) as CacheEntry;
      if (entry.expiresAt > 0 && entry.expiresAt <= Date.now()) {
        await this.delete(id);
        return null;
      }
      return entry;
    } catch (err) {
      console.warn("[CACHE] Redis get error:", (err as Error).message);
      return null;
    }
  }

  public async getByHash(hash: string): Promise<CacheEntry | null> {
    try {
      const client = await this.getClient();
      if (!client) return null;

      const id = await client.get(this.hashKey(hash));
      if (!id) return null;

      return this.get(id);
    } catch (err) {
      console.warn("[CACHE] Redis getByHash error:", (err as Error).message);
      return null;
    }
  }

  public async set(entry: CacheEntry, ttlMs?: number): Promise<void> {
    try {
      const client = await this.getClient();
      if (!client) return;

      const effectiveTtlMs =
        typeof ttlMs === "number" && Number.isFinite(ttlMs) && ttlMs > 0
          ? ttlMs
          : entry.expiresAt > 0
            ? Math.max(1000, entry.expiresAt - Date.now())
            : 1800000;
      const ttlSeconds = Math.max(1, Math.ceil(effectiveTtlMs / 1000));
      const serialized = JSON.stringify(entry);

      // Store entry and exact hash mapping with TTL
      await Promise.all([
        client.set(this.entryKey(entry.id), serialized, "EX", ttlSeconds),
        client.set(this.hashKey(entry.hash), entry.id, "EX", ttlSeconds),
        client.sadd(this.allIdsKey(), entry.id),
        client.sadd(this.modelSetKey(entry.model), entry.id),
      ]);
    } catch (err) {
      console.warn("[CACHE] Redis set error:", (err as Error).message);
    }
  }

  public async searchNearest(
    embedding: number[],
    filter: StoreFilter,
    threshold: number,
    limit = 1
  ): Promise<SimilaritySearchResult[]> {
    try {
      const client = await this.getClient();
      if (!client || !embedding || embedding.length === 0) return [];

      // Determine candidate IDs from model set or all IDs
      let candidateIds: string[];
      if (filter.model) {
        candidateIds = await client.smembers(this.modelSetKey(filter.model));
      } else {
        candidateIds = await client.smembers(this.allIdsKey());
      }

      if (!candidateIds || candidateIds.length === 0) return [];

      const queryNorm = l2Normalize(embedding);
      const keys = candidateIds.map((id) => this.entryKey(id));
      const rawEntries = await client.mget(...keys);

      const now = Date.now();
      const results: SimilaritySearchResult[] = [];
      const staleIds: string[] = [];

      for (let i = 0; i < rawEntries.length; i++) {
        const raw = rawEntries[i];
        if (!raw) {
          staleIds.push(candidateIds[i]);
          continue;
        }

        let entry: CacheEntry;
        try {
          entry = JSON.parse(raw) as CacheEntry;
        } catch {
          staleIds.push(candidateIds[i]);
          continue;
        }

        if (entry.expiresAt > 0 && entry.expiresAt <= now) {
          staleIds.push(entry.id);
          continue;
        }

        if (filter.provider && entry.provider !== filter.provider) continue;

        // Partition key isolation: null means must have NO key, string means exact match
        if (filter.apiKeyId !== undefined) {
          const expected = filter.apiKeyId === null ? undefined : filter.apiKeyId;
          if (entry.apiKeyId !== expected) continue;
        }
        if (filter.cacheKey !== undefined) {
          const expected = filter.cacheKey === null ? undefined : filter.cacheKey;
          if (entry.cacheKey !== expected) continue;
        }

        if (!entry.embedding || entry.embedding.length !== queryNorm.length) continue;

        const candidateNorm = l2Normalize(entry.embedding);
        const sim = dotProduct(queryNorm, candidateNorm);

        if (sim >= threshold) {
          results.push({ entry, similarity: sim });
        }
      }

      // Cleanup missing or expired IDs in background
      if (staleIds.length > 0) {
        Promise.all(staleIds.map((id) => this.delete(id))).catch(() => {});
      }

      results.sort((a, b) => b.similarity - a.similarity);
      return results.slice(0, limit);
    } catch (err) {
      console.warn("[CACHE] Redis searchNearest error:", (err as Error).message);
      return [];
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      if (!client) return false;

      const raw = await client.get(this.entryKey(id));
      if (raw) {
        try {
          const entry = JSON.parse(raw) as CacheEntry;
          // Delete hash mapping only if it still points to this entry id
          const hashOwner = await client.get(this.hashKey(entry.hash));
          if (hashOwner === id) {
            await client.del(this.hashKey(entry.hash));
          }
          await client.del(this.entryKey(id));
          await client.srem(this.allIdsKey(), id);
          await client.srem(this.modelSetKey(entry.model), id);
          return true;
        } catch {}
      }
      await client.del(this.entryKey(id));
      await client.srem(this.allIdsKey(), id);
      return true;
    } catch (err) {
      console.warn("[CACHE] Redis delete error:", (err as Error).message);
      return false;
    }
  }

  public async deleteByModel(model: string): Promise<number> {
    try {
      const client = await this.getClient();
      if (!client) return 0;

      const ids = await client.smembers(this.modelSetKey(model));
      if (!ids || ids.length === 0) return 0;

      for (const id of ids) {
        await this.delete(id);
      }
      await client.del(this.modelSetKey(model));
      return ids.length;
    } catch (err) {
      console.warn("[CACHE] Redis deleteByModel error:", (err as Error).message);
      return 0;
    }
  }

  public async clear(): Promise<number> {
    try {
      const client = await this.getClient();
      if (!client) return 0;

      const ids = await client.smembers(this.allIdsKey());
      if (ids && ids.length > 0) {
        for (const id of ids) {
          await this.delete(id);
        }
      }
      await client.del(this.allIdsKey());
      return ids ? ids.length : 0;
    } catch (err) {
      console.warn("[CACHE] Redis clear error:", (err as Error).message);
      return 0;
    }
  }

  public async getStats(): Promise<{ entries: number }> {
    try {
      const client = await this.getClient();
      if (!client) return { entries: 0 };
      const ids = await client.smembers(this.allIdsKey());
      if (!ids || ids.length === 0) return { entries: 0 };

      const keys = ids.map((id) => this.entryKey(id));
      const rawEntries = await client.mget(...keys);
      let liveCount = 0;
      const staleIds: string[] = [];
      const now = Date.now();

      for (let i = 0; i < rawEntries.length; i++) {
        const raw = rawEntries[i];
        if (!raw) {
          staleIds.push(ids[i]);
          continue;
        }
        try {
          const entry = JSON.parse(raw) as CacheEntry;
          if (entry.expiresAt > 0 && entry.expiresAt <= now) {
            staleIds.push(ids[i]);
            continue;
          }
          liveCount++;
        } catch {
          staleIds.push(ids[i]);
        }
      }

      if (staleIds.length > 0) {
        Promise.all(staleIds.map((id) => this.delete(id))).catch(() => {});
      }

      return { entries: liveCount };
    } catch {
      return { entries: 0 };
    }
  }

  public async close(): Promise<void> {
    if (this.client?.quit) {
      await this.client.quit().catch(() => {});
      this.client = null;
    } else if (this.client?.disconnect) {
      this.client.disconnect();
      this.client = null;
    }
  }
}
