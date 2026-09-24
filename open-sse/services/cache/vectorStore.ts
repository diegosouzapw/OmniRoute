/**
 * Vector Store Interface & Mathematical Utilities
 *
 * Provides common types and optimized vector similarity math for semantic caching.
 *
 * @module services/cache/vectorStore
 */

export interface CacheEntry {
  id: string;
  hash: string;
  signature?: string;
  embedding?: number[];
  promptText: string;
  model: string;
  provider: string;
  apiKeyId?: string;
  cacheKey?: string;
  response: Record<string, unknown>;
  streamChunks?: Array<Record<string, unknown>>;
  tokensSaved: number;
  createdAt: number;
  expiresAt: number;
}

export interface StoreFilter {
  model?: string;
  provider?: string;
  /**
   * Filter by API key ID:
   * - string: entry must match this apiKeyId.
   * - null: entry must have NO apiKeyId (anonymous/unkeyed).
   * - undefined: do not filter by apiKeyId.
   */
  apiKeyId?: string | null;
  /**
   * Filter by cache key:
   * - string: entry must match this cacheKey.
   * - null: entry must have NO cacheKey.
   * - undefined: do not filter by cacheKey.
   */
  cacheKey?: string | null;
}

export interface SimilaritySearchResult {
  entry: CacheEntry;
  similarity: number;
}

export interface IVectorStore {
  get(id: string): Promise<CacheEntry | null>;
  getByHash(hash: string): Promise<CacheEntry | null>;
  set(entry: CacheEntry, ttlMs: number): Promise<void>;
  searchNearest(
    embedding: number[],
    filter: StoreFilter,
    threshold: number,
    limit?: number
  ): Promise<SimilaritySearchResult[]>;
  delete(id: string): Promise<boolean>;
  deleteByModel(model: string): Promise<number>;
  clear(): Promise<number>;
  getStats(): Promise<{ entries: number }>;
  close?(): Promise<void>;
}

/**
 * Computes the dot product of two numerical vectors.
 */
export function dotProduct(a: number[], b: number[]): number {
  const len = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

/**
 * Computes the L2 norm (magnitude) of a vector.
 */
export function l2Norm(v: number[]): number {
  let sumSq = 0;
  for (let i = 0; i < v.length; i++) {
    sumSq += v[i] * v[i];
  }
  return Math.sqrt(sumSq);
}

/**
 * Returns a unit vector (L2 normalized) of the given vector.
 * If magnitude is 0, returns a copy of the vector.
 */
export function l2Normalize(v: number[]): number[] {
  const norm = l2Norm(v);
  if (norm === 0 || !Number.isFinite(norm)) {
    return v.slice();
  }
  const invNorm = 1 / norm;
  const out = new Array<number>(v.length);
  for (let i = 0; i < v.length; i++) {
    out[i] = v[i] * invNorm;
  }
  return out;
}

/**
 * Computes cosine similarity between vectors a and b.
 * Range: [-1.0, 1.0]. Returns 0 if either vector has zero magnitude.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const normA = l2Norm(a);
  const normB = l2Norm(b);
  if (normA === 0 || normB === 0) return 0;
  const dot = dotProduct(a, b);
  const sim = dot / (normA * normB);
  // Guard against floating point rounding errors beyond [-1, 1]
  if (sim > 1) return 1;
  if (sim < -1) return -1;
  return sim;
}
