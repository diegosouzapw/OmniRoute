interface MemoryCache {
  key: string;
  value: unknown;
  expiresAt: number;
}

class MemoryCachingLayer {
  private cache: Map<string, MemoryCache> = new Map();
  private maxSize: number = 1000;
  private defaultTtl: number = 300000;
  private hits: number = 0;
  private misses: number = 0;

  async get(key: string): Promise<unknown | null> {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses += 1;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses += 1;
      return null;
    }

    this.hits += 1;
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    const now = Date.now();
    this.cache.set(key, {
      key,
      value,
      expiresAt: now + (ttl ?? this.defaultTtl),
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
    this.hits = 0;
    this.misses = 0;
  }

  stats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
    };
  }
}

export const memoryCache = new MemoryCachingLayer();
