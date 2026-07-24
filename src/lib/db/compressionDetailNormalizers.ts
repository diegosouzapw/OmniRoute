// Normalizers for the compression engine DETAIL settings sub-objects that persist to a
// single key_value row each (settings.sessionDedup / settings.ccr). Extracted out of
// src/lib/db/compression.ts (frozen at cap by file-size-baseline.json — see
// scripts/check/check-file-size.mjs) rather than growing that file inline.
//
// #8388: session-dedup and ccr detail fields (minBlockChars/fuzzy, minChars/
// retrievalRampFactor) were editable on the EngineConfigPage detail form but had no
// persisted sub-object — mirrors the #8056 headroom/minRows fix (normalizeHeadroomConfig
// in compression.ts), extended to the two engines #8056 left uncovered.
import {
  DEFAULT_CCR_CONFIG,
  DEFAULT_SESSION_DEDUP_CONFIG,
  type CcrConfig,
  type CompressionConfig,
  type SessionDedupConfig,
} from "@omniroute/open-sse/services/compression/types.ts";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function boundedInt(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

/** Matches SESSION_DEDUP_SCHEMA bounds (engines/session-dedup/index.ts). */
export function normalizeSessionDedupConfig(value: unknown): SessionDedupConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_SESSION_DEDUP_CONFIG,
    minBlockChars: boundedInt(
      record.minBlockChars,
      DEFAULT_SESSION_DEDUP_CONFIG.minBlockChars,
      1,
      100000
    ),
    fuzzy: typeof record.fuzzy === "boolean" ? record.fuzzy : DEFAULT_SESSION_DEDUP_CONFIG.fuzzy,
  };
}

/** Matches CCR_SCHEMA bounds (engines/ccr/index.ts). */
export function normalizeCcrConfig(value: unknown): CcrConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CCR_CONFIG,
    minChars: boundedInt(record.minChars, DEFAULT_CCR_CONFIG.minChars, 100, 1_000_000),
    retrievalRampFactor: boundedInt(
      record.retrievalRampFactor,
      DEFAULT_CCR_CONFIG.retrievalRampFactor,
      1,
      100
    ),
  };
}

/** Default sub-objects spread into getCompressionSettings' seed config. */
export function buildDetailConfigDefaults(): Pick<CompressionConfig, "sessionDedup" | "ccr"> {
  return { sessionDedup: normalizeSessionDedupConfig(undefined), ccr: normalizeCcrConfig(undefined) };
}

/** Applies a stored sessionDedup/ccr row onto config during getCompressionSettings' row scan. */
export function applyDetailConfigUpdate(
  config: CompressionConfig,
  key: "sessionDedup" | "ccr",
  parsed: unknown
): void {
  if (key === "sessionDedup") config.sessionDedup = normalizeSessionDedupConfig(parsed);
  else config.ccr = normalizeCcrConfig(parsed);
}
