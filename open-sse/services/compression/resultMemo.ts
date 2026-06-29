import crypto from "node:crypto";
import type { CompressionConfig, CompressionMode, CompressionResult } from "./types.ts";

export const MEMO_CAP = 5_000;

const memoMap = new Map<string, CompressionResult>();

// Opt-IN whitelist (NOT opt-out): cache only engines proven pure + STATELESS across
// requests. Excluded on purpose: `ccr` and `session-dedup` write to the cross-request
// CCR store (`ccr/index.ts` ccrStore; session-dedup imports storeBlock), so their output
// depends on prior state → not safe to memoize; `ultra`/`aggressive`/`llmlingua` are
// model-backed/non-deterministic. Any NEW engine is excluded until explicitly vetted.
const DETERMINISTIC_ENGINES = new Set(["lite", "caveman", "rtk"]);

/** Top-level modes safe to cache (whitelist — any unknown/new mode defaults to false). */
const DETERMINISTIC_MODES = new Set<CompressionMode>(["lite", "standard", "rtk"]);

export function isDeterministicMode(mode: CompressionMode, config?: CompressionConfig): boolean {
  if (mode === "stacked") {
    const pipeline = config?.stackedPipeline;
    if (!pipeline || pipeline.length === 0) return false;
    return pipeline.every((step) => DETERMINISTIC_ENGINES.has(step.engine));
  }
  return DETERMINISTIC_MODES.has(mode);
}

function sha256hex(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function makeMemoKey(
  body: Record<string, unknown>,
  mode: CompressionMode,
  config: CompressionConfig,
  principalId?: string,
  model?: string,
  supportsVision?: boolean | null
): string {
  const bodyHash = sha256hex(JSON.stringify(body));
  // model + supportsVision MUST be part of the key: the `lite` engine strips data:image
  // URLs only when vision is unsupported (replaceImageUrls / modelSupportsVision), so the
  // same (body, config) yields a DIFFERENT result per target — omitting them returns a
  // wrong (image-stripped or image-kept) cached body across vision/non-vision targets.
  return sha256hex(
    JSON.stringify({
      bodyHash,
      mode,
      config,
      principalId: principalId ?? null,
      model: model ?? null,
      supportsVision: supportsVision ?? null,
    })
  );
}

function boundedSet(key: string, value: CompressionResult): void {
  if (!memoMap.has(key) && memoMap.size >= MEMO_CAP) {
    const firstKey = memoMap.keys().next().value;
    if (firstKey !== undefined) {
      memoMap.delete(firstKey);
    }
  }
  memoMap.set(key, value);
}

export function memoLookup(key: string): CompressionResult | null {
  const hit = memoMap.get(key);
  if (!hit) return null;
  // Return a clone so downstream mutation cannot corrupt the cached value.
  return JSON.parse(JSON.stringify(hit)) as CompressionResult;
}

export function memoStore(key: string, result: CompressionResult): void {
  // Clone on STORE too (memoLookup already clones on read). Storing the caller's live
  // object would let a later mutation of it (e.g. an async engine holding a sub-ref)
  // corrupt the cached entry. Both ends isolated ⇒ the cache is immutable once stored.
  boundedSet(key, JSON.parse(JSON.stringify(result)) as CompressionResult);
}

/** For tests only — clears the in-process memo store. */
export function clearMemoStore(): void {
  memoMap.clear();
}
