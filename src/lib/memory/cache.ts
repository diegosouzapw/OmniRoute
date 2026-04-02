import { getDbInstance } from "../db/core";

interface MemoryCache {
  key: string;
  value: any;
  timestamp: number;
  ttl: number;
}

class MemoryCachingLayer {
  private cache: Map<string, MemoryCache> = new Map();
  private maxSize: number = 1000;
  private defaultTtl: number = 300000;

  async get(key: string): Promise<any | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (this.cache.size >= this.maxSize) {
      const oldest = Array.from(this.cache.entries()).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      )[0];
      this.cache.delete(oldest[0]);
    }

    this.cache.set(key, {
      key,
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl,
    });
  }

  async invalidate(pattern: string): Promise<void> {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  stats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }
}

export const memoryCache = new MemoryCachingLayer();
