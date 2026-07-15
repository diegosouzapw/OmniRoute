import { createHash } from "node:crypto";

import { estimateCompressionTokens } from "./stats.ts";
import type { CompressionResult, CompressionStats } from "./types.ts";

export interface LiveZoneOptions {
  principalId?: string;
  sessionId?: string;
  variant: unknown;
  ttlMinutes?: number;
}

interface LiveZoneEntry {
  rawItemDigests: string[];
  rawStableFieldsDigest: string;
  transformedPrefix: unknown[];
  transformedStableFields: Record<string, unknown>;
  stats: CompressionStats | null;
  lastAccess: number;
  expiresAt: number;
  bytes: number;
}

const MAX_ENTRIES = 100;
const MAX_ENTRY_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 32 * 1024 * 1024;
const DEFAULT_TTL_MINUTES = 5;
const STABLE_PREFIX_FIELDS = [
  "system",
  "systemInstruction",
  "system_instruction",
  "instructions",
  "tools",
  "tool_choice",
] as const;

const entries = new Map<string, LiveZoneEntry>();
let totalBytes = 0;

function serialize(value: unknown): string | null {
  try {
    const serialized = JSON.stringify(value);
    return typeof serialized === "string" ? serialized : null;
  } catch {
    return null;
  }
}

function digest(value: unknown): string | null {
  const serialized = serialize(value);
  return serialized === null ? null : createHash("sha256").update(serialized).digest("hex");
}

function cloneItems(items: unknown[]): unknown[] | null {
  try {
    return structuredClone(items);
  } catch {
    const serialized = serialize(items);
    if (serialized === null) return null;
    try {
      return JSON.parse(serialized) as unknown[];
    } catch {
      return null;
    }
  }
}

function cloneValue<T>(value: T): T | null {
  try {
    return structuredClone(value);
  } catch {
    const serialized = serialize(value);
    if (serialized === null) return null;
    try {
      return JSON.parse(serialized) as T;
    } catch {
      return null;
    }
  }
}

function pickStableFields(body: Record<string, unknown>): Record<string, unknown> | null {
  const fields: Record<string, unknown> = {};
  for (const field of STABLE_PREFIX_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) fields[field] = body[field];
  }
  return cloneValue(fields);
}

function sequenceField(body: Record<string, unknown>): "messages" | "input" | null {
  if (Array.isArray(body.messages)) return "messages";
  if (Array.isArray(body.input)) return "input";
  return null;
}

function isToolOutputItem(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    item.role === "tool" ||
    item.role === "function" ||
    item.type === "function_call_output" ||
    item.type === "computer_call_output"
  );
}

function makeKey(options: LiveZoneOptions, field: string): string | null {
  const principal = options.principalId?.trim();
  const session = options.sessionId?.trim();
  const variant = digest(options.variant);
  if (!principal || !session || !variant) return null;
  return `${principal}:${session}:${field}:${variant}`;
}

function deleteEntry(key: string): void {
  const existing = entries.get(key);
  if (!existing) return;
  totalBytes -= existing.bytes;
  entries.delete(key);
}

function prune(now: number): void {
  for (const [key, entry] of entries) {
    if (now >= entry.expiresAt) deleteEntry(key);
  }
  while (entries.size > MAX_ENTRIES || totalBytes > MAX_TOTAL_BYTES) {
    const oldest = entries.keys().next().value as string | undefined;
    if (!oldest) break;
    deleteEntry(oldest);
  }
}

function store(
  key: string,
  rawItemDigests: string[],
  rawStableFieldsDigest: string,
  result: CompressionResult,
  field: "messages" | "input",
  now: number,
  ttlMs: number
): void {
  const transformedItems = result.body[field];
  if (!Array.isArray(transformedItems)) return;
  const transformedPrefix = cloneItems(transformedItems);
  const transformedStableFields = pickStableFields(result.body);
  const stats = cloneValue(result.stats);
  if (!transformedPrefix || !transformedStableFields) return;
  const serialized = serialize({ transformedPrefix, transformedStableFields, stats });
  if (serialized === null) return;
  const bytes = Buffer.byteLength(serialized, "utf8") + rawItemDigests.length * 64;
  if (bytes > MAX_ENTRY_BYTES) return;

  deleteEntry(key);
  entries.set(key, {
    rawItemDigests,
    rawStableFieldsDigest,
    transformedPrefix,
    transformedStableFields,
    stats,
    lastAccess: now,
    expiresAt: now + ttlMs,
    bytes,
  });
  totalBytes += bytes;
  prune(now);
}

function hasExactRawPrefix(rawItemDigests: string[], entry: LiveZoneEntry): boolean {
  if (rawItemDigests.length < entry.rawItemDigests.length) return false;
  for (let index = 0; index < entry.rawItemDigests.length; index++) {
    if (rawItemDigests[index] !== entry.rawItemDigests[index]) return false;
  }
  return true;
}

function restoreStableFields(
  body: Record<string, unknown>,
  stableFields: Record<string, unknown>
): Record<string, unknown> | null {
  const restored = cloneValue(stableFields);
  return restored ? { ...body, ...restored } : null;
}

function withLiveZoneStats(
  body: Record<string, unknown>,
  result: CompressionResult,
  frozenItems: number,
  liveItems: number
): CompressionResult {
  const originalTokens = estimateCompressionTokens(body);
  const compressedTokens = estimateCompressionTokens(result.body);
  const savingsPercent =
    originalTokens > 0
      ? Math.max(
          0,
          Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
        )
      : 0;
  const base = result.stats;
  const stats: CompressionStats = {
    ...(base ?? {
      techniquesUsed: [],
      mode: "stacked",
      timestamp: Date.now(),
    }),
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed: [...new Set([...(base?.techniquesUsed ?? []), "live-zone-prefix-reuse"])],
    liveZone: {
      cacheHit: true,
      frozenItems,
      liveItems,
    },
  };
  return {
    ...result,
    compressed: result.compressed || compressedTokens < originalTokens,
    stats,
  };
}

/**
 * Reuses the byte-identical transformed prefix from the previous request in a session and runs
 * compression only over newly appended messages/input items. Any changed prefix, missing identity,
 * unsupported body shape, serialization failure, or oversized entry fails open to full compression.
 */
export async function applyLiveZoneCompression(
  body: Record<string, unknown>,
  options: LiveZoneOptions,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  // A global hard budget needs the complete history to make correct keep/drop decisions.
  const variantConfig =
    options.variant && typeof options.variant === "object"
      ? (options.variant as Record<string, unknown>).config
      : null;
  if (
    variantConfig &&
    typeof variantConfig === "object" &&
    ((variantConfig as Record<string, unknown>).targetTokens != null ||
      (variantConfig as Record<string, unknown>).targetRatio != null)
  ) {
    return compress(body);
  }
  const field = sequenceField(body);
  const key = field ? makeKey(options, field) : null;
  if (!field || !key) return compress(body);

  const rawItems = body[field] as unknown[];
  const rawItemDigests = rawItems.map(digest);
  if (rawItemDigests.some((value) => value === null)) return compress(body);
  const rawStableFieldsDigest = digest(pickStableFields(body));
  if (!rawStableFieldsDigest) return compress(body);
  const ttlMinutes = Math.min(60, Math.max(1, options.ttlMinutes ?? DEFAULT_TTL_MINUTES));
  const ttlMs = ttlMinutes * 60_000;
  const now = Date.now();
  prune(now);
  const previous = entries.get(key);

  if (
    !previous ||
    previous.rawStableFieldsDigest !== rawStableFieldsDigest ||
    !hasExactRawPrefix(rawItemDigests as string[], previous)
  ) {
    const result = await compress(body);
    store(key, rawItemDigests as string[], rawStableFieldsDigest, result, field, now, ttlMs);
    return result;
  }

  // LRU touch. Deleting/re-inserting also makes deterministic oldest-first eviction cheap.
  entries.delete(key);
  previous.lastAccess = now;
  entries.set(key, previous);

  const frozenItems = previous.rawItemDigests.length;
  const liveItems = rawItems.slice(frozenItems);
  const frozenPrefix = cloneItems(previous.transformedPrefix);
  if (!frozenPrefix) return compress(body);
  let liveResult: CompressionResult;
  let transformedLive = cloneItems(liveItems);
  if (!transformedLive) return compress(body);
  const liveToolIndexes = liveItems.flatMap((item, index) =>
    isToolOutputItem(item) ? [index] : []
  );
  if (liveToolIndexes.length === 0) {
    liveResult = { body, compressed: false, stats: previous.stats };
  } else {
    const liveToolItems = liveToolIndexes.map((index) => liveItems[index]);
    const liveBody = { ...body, [field]: liveToolItems };
    liveResult = await compress(liveBody);
    const transformed = liveResult.body[field];
    if (!Array.isArray(transformed) || transformed.length !== liveToolItems.length) {
      liveResult = { body, compressed: false, stats: null };
    } else {
      for (let index = 0; index < liveToolIndexes.length; index++) {
        transformedLive[liveToolIndexes[index]] = transformed[index];
      }
    }
  }
  const restoredBody = restoreStableFields(liveResult.body, previous.transformedStableFields);
  if (!restoredBody) return compress(body);
  const combinedBody = { ...restoredBody, [field]: [...frozenPrefix, ...transformedLive] };
  const combinedResult = withLiveZoneStats(
    body,
    { ...liveResult, body: combinedBody },
    frozenItems,
    liveItems.length
  );

  // Do not let a concurrent divergent request overwrite the winning session branch.
  if (entries.get(key) === previous) {
    store(
      key,
      rawItemDigests as string[],
      rawStableFieldsDigest,
      combinedResult,
      field,
      Date.now(),
      ttlMs
    );
  }
  return combinedResult;
}

export function resetLiveZoneCache(): void {
  entries.clear();
  totalBytes = 0;
}

export function getLiveZoneCacheStats(): { entries: number; bytes: number } {
  return { entries: entries.size, bytes: totalBytes };
}
