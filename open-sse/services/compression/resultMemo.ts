import crypto from "node:crypto";
import type { CompressionConfig, CompressionMode, CompressionResult } from "./types.ts";

export const MEMO_CAP = 5_000;

const memoMap = new Map<string, CompressionResult>();

// Opt-IN whitelist (NOT opt-out): cache only engines proven pure + STATELESS across
// requests. Excluded on purpose: `ccr` and `session-dedup` write to the cross-request
// CCR store (`ccr/index.ts` ccrStore; session-dedup imports storeBlock), so their output
// depends on prior state → not safe to memoize; `ultra`/`aggressive`/`llmlingua` are
// model-backed/non-deterministic. Any NEW engine is excluded until explicitly vetted.
// "omniglyph" is intentionally excluded too (P2 registry-consistency pass): it renders
// context as an image via a model-backed pipeline, so it is not yet proven deterministic
// across requests — conservative default (never-wrong) until explicitly vetted.
const DETERMINISTIC_ENGINES = new Set(["lite", "caveman", "rtk"]);

/** Top-level modes safe to cache (whitelist — any unknown/new mode defaults to false).
 * "omniglyph" intentionally omitted — see comment on DETERMINISTIC_ENGINES above. */
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

  // #8137: Only include model + supportsVision in the cache key when the compression
  // result actually depends on them. The `lite` engine strips data:image URLs only when
  // vision is unsupported (replaceImageUrls / modelSupportsVision), so the same (body,
  // config) yields a DIFFERENT result per target — omitting them would return a wrong
  // (image-stripped or image-kept) cached body across vision/non-vision targets.
  //
  // For all other deterministic engines (caveman, rtk), the output is model-independent.
  // Including model in the key defeats memoization across combo retries — the body is
  // identical but the model changes each attempt, producing a fresh cache miss every time
  // and re-running the full compression pipeline 5-8x per request.
  const isVisionDependent = usesVisionDependentEngine(mode, config);

  return sha256hex(
    JSON.stringify({
      bodyHash,
      mode,
      config,
      principalId: principalId ?? null,
      model: isVisionDependent ? (model ?? null) : null,
      supportsVision: isVisionDependent ? (supportsVision ?? null) : null,
    })
  );
}

/**
 * Whether the compression pipeline for this mode/config includes the `lite` engine,
 * whose output depends on the target's vision support (image-URL stripping).
 * Only `lite` itself, `standard` (lite → caveman), and `stacked` pipelines containing
 * a `lite` step are vision-dependent.
 */
function usesVisionDependentEngine(mode: CompressionMode, config?: CompressionConfig): boolean {
  if (mode === "lite") return true;
  if (mode === "standard") return true; // standard = lite → caveman pipeline
  if (mode === "stacked") {
    const pipeline = config?.stackedPipeline;
    if (!pipeline || pipeline.length === 0) return false;
    return pipeline.some((step) => step.engine === "lite");
  }
  return false;
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
