import crypto from "node:crypto";
import type { CompressionConfig, CompressionMode, CompressionResult } from "./types.ts";

export const MEMO_CAP = 5_000;

const memoMap = new Map<string, CompressionResult>();

/** Non-deterministic engine IDs — any stacked pipeline containing these is excluded. */
const NON_DETERMINISTIC_ENGINES = new Set(["ultra", "aggressive", "llmlingua"]);

/** Non-deterministic top-level modes — never cached even with flag on. */
const NON_DETERMINISTIC_MODES = new Set<CompressionMode>(["off", "ultra", "aggressive"]);

export function isDeterministicMode(mode: CompressionMode, config?: CompressionConfig): boolean {
  if (NON_DETERMINISTIC_MODES.has(mode)) return false;
  if (mode === "stacked") {
    const pipeline = config?.stackedPipeline;
    if (!pipeline || pipeline.length === 0) return false;
    return pipeline.every((step) => !NON_DETERMINISTIC_ENGINES.has(step.engine));
  }
  // lite, standard, rtk are deterministic
  return true;
}

function sha256hex(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function makeMemoKey(
  body: Record<string, unknown>,
  mode: CompressionMode,
  config: CompressionConfig,
  principalId?: string
): string {
  const bodyHash = sha256hex(JSON.stringify(body));
  return sha256hex(JSON.stringify({ bodyHash, mode, config, principalId: principalId ?? null }));
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
  boundedSet(key, result);
}

/** For tests only — clears the in-process memo store. */
export function clearMemoStore(): void {
  memoMap.clear();
}
