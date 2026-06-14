import { createHash } from "node:crypto";

function getEnv(name: string, defaultValue: number): number {
  const val = process.env[name];
  if (!val) return defaultValue;
  const num = parseInt(val, 10);
  return isNaN(num) ? defaultValue : num;
}

interface CacheEntry {
  vector: Float32Array;
  ts: number;
}

let hitCount = 0;
let missCount = 0;
const store = new Map<string, CacheEntry>();

function getTtl(): number {
  return getEnv("MEMORY_EMBEDDING_CACHE_TTL_MS", 300_000);
}

function getMax(): number {
  return getEnv("MEMORY_EMBEDDING_CACHE_MAX", 1000);
}

export function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export function buildCacheKey(
  source: string,
  model: string | null,
  dim: number | null,
  text: string
): string {
  const safeModel = model ?? "unknown";
  const safeDim = dim != null ? String(dim) : "0";
  return `${source}:${safeModel}:${safeDim}:${hashText(text)}`;
}

export function get(key: string): Float32Array | undefined {
  const entry = store.get(key);
  if (!entry) {
    missCount++;
    return undefined;
  }
  if (Date.now() - entry.ts > getTtl()) {
    store.delete(key);
    missCount++;
    return undefined;
  }
  hitCount++;
  return entry.vector;
}

export function set(key: string, vector: Float32Array): void {
  const max = getMax();
  // LRU eviction: if at capacity, remove oldest entry
  if (store.size >= max && !store.has(key)) {
    const oldestKey = store.keys().next().value;
    if (oldestKey !== undefined) {
      store.delete(oldestKey);
    }
  }
  store.set(key, { vector, ts: Date.now() });
}

export function invalidate(): void {
  store.clear();
  hitCount = 0;
  missCount = 0;
}

export function stats(): { hits: number; misses: number; size: number } {
  return { hits: hitCount, misses: missCount, size: store.size };
}
