/**
 * In-Memory Vector Store
 *
 * High-performance, zero-dependency in-memory vector store with cosine similarity,
 * L2 normalization, O(1) direct-hash index, and LRU/TTL eviction.
 *
 * @module services/cache/memoryVectorStore
 */

import {
  type CacheEntry,
  type IVectorStore,
  type SimilaritySearchResult,
  type StoreFilter,
  dotProduct,
  l2Normalize,
} from "./vectorStore.ts";

interface InternalMemoryEntry {
  entry: CacheEntry;
  normalizedEmbedding?: number[];
}

export class MemoryVectorStore implements IVectorStore {
  private readonly maxEntries: number;
  private readonly entries = new Map<string, InternalMemoryEntry>();
  private readonly hashToId = new Map<string, string>();

  constructor(options?: { maxEntries?: number }) {
    this.maxEntries = options?.maxEntries ?? 1000;
  }

  private isExpired(expiresAt: number): boolean {
    return expiresAt > 0 && expiresAt <= Date.now();
  }

  private removeEntry(id: string): boolean {
    const existing = this.entries.get(id);
    if (!existing) return false;
    // Only delete hashToId mapping if it still points to this id
    if (this.hashToId.get(existing.entry.hash) === id) {
      this.hashToId.delete(existing.entry.hash);
    }
    this.entries.delete(id);
    return true;
  }

  private evictOldestIfNeeded(): void {
    while (this.entries.size >= this.maxEntries) {
      // Map keys iterator yields oldest inserted key first
      const oldestKey = this.entries.keys().next().value;
      if (!oldestKey) break;
      this.removeEntry(oldestKey);
    }
  }

  public async get(id: string): Promise<CacheEntry | null> {
    const item = this.entries.get(id);
    if (!item) return null;

    if (this.isExpired(item.entry.expiresAt)) {
      this.removeEntry(id);
      return null;
    }

    // Refresh LRU order on hit: delete and re-insert
    this.entries.delete(id);
    this.entries.set(id, item);

    return item.entry;
  }

  public async getByHash(hash: string): Promise<CacheEntry | null> {
    const id = this.hashToId.get(hash);
    if (!id) return null;
    return this.get(id);
  }

  public async set(entry: CacheEntry, ttlMs: number): Promise<void> {
    // If ID already exists, remove it first
    if (this.entries.has(entry.id)) {
      this.removeEntry(entry.id);
    }

    // If an existing entry shares the same direct hash, remove the older entry
    const existingIdWithHash = this.hashToId.get(entry.hash);
    if (existingIdWithHash && existingIdWithHash !== entry.id) {
      this.removeEntry(existingIdWithHash);
    }

    this.evictOldestIfNeeded();

    const expiresAt = ttlMs > 0 ? Date.now() + ttlMs : entry.expiresAt;
    const finalEntry: CacheEntry = {
      ...entry,
      expiresAt,
    };

    let normalizedEmbedding: number[] | undefined;
    if (Array.isArray(entry.embedding) && entry.embedding.length > 0) {
      normalizedEmbedding = l2Normalize(entry.embedding);
    }

    const internal: InternalMemoryEntry = {
      entry: finalEntry,
      normalizedEmbedding,
    };

    this.entries.set(finalEntry.id, internal);
    this.hashToId.set(finalEntry.hash, finalEntry.id);
  }

  public async searchNearest(
    embedding: number[],
    filter: StoreFilter,
    threshold: number,
    limit = 1
  ): Promise<SimilaritySearchResult[]> {
    if (!embedding || embedding.length === 0 || this.entries.size === 0) {
      return [];
    }

    const queryNorm = l2Normalize(embedding);
    const now = Date.now();
    const expiredIds: string[] = [];
    const candidates: SimilaritySearchResult[] = [];

    for (const [id, item] of this.entries.entries()) {
      if (item.entry.expiresAt > 0 && item.entry.expiresAt <= now) {
        expiredIds.push(id);
        continue;
      }

      // Metadata filter checks
      if (filter.model && item.entry.model !== filter.model) continue;
      if (filter.provider && item.entry.provider !== filter.provider) continue;

      // Partition key isolation: null means must have NO key, string means exact match
      if (filter.apiKeyId !== undefined) {
        const expected = filter.apiKeyId === null ? undefined : filter.apiKeyId;
        if (item.entry.apiKeyId !== expected) continue;
      }
      if (filter.cacheKey !== undefined) {
        const expected = filter.cacheKey === null ? undefined : filter.cacheKey;
        if (item.entry.cacheKey !== expected) continue;
      }

      if (!item.normalizedEmbedding || item.normalizedEmbedding.length !== queryNorm.length) {
        continue;
      }

      // Since both query and candidate are L2-normalized, cosine similarity is the dot product
      const sim = dotProduct(queryNorm, item.normalizedEmbedding);
      if (sim >= threshold) {
        candidates.push({
          entry: item.entry,
          similarity: sim,
        });
      }
    }

    // Clean expired entries found during traversal
    for (const id of expiredIds) {
      this.removeEntry(id);
    }

    // Sort descending by similarity
    candidates.sort((a, b) => b.similarity - a.similarity);

    return candidates.slice(0, limit);
  }

  public async delete(id: string): Promise<boolean> {
    return this.removeEntry(id);
  }

  public async deleteByModel(model: string): Promise<number> {
    let count = 0;
    const toRemove: string[] = [];
    for (const [id, item] of this.entries.entries()) {
      if (item.entry.model === model) {
        toRemove.push(id);
      }
    }
    for (const id of toRemove) {
      if (this.removeEntry(id)) count++;
    }
    return count;
  }

  public async clear(): Promise<number> {
    const count = this.entries.size;
    this.entries.clear();
    this.hashToId.clear();
    return count;
  }

  public async getStats(): Promise<{ entries: number }> {
    return { entries: this.entries.size };
  }
}
