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

interface LiveZoneContext {
  field: "messages" | "input";
  key: string;
  rawItems: unknown[];
  rawItemDigests: string[];
  rawStableFieldsDigest: string;
  ttlMs: number;
  now: number;
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
    item.role === "tool_result" ||
    item.type === "function_call_output" ||
    item.type === "local_shell_call_output" ||
    item.type === "apply_patch_call_output" ||
    item.type === "computer_call_output" ||
    item.type === "tool_result"
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

function hasGlobalHardBudget(variant: unknown): boolean {
  if (!variant || typeof variant !== "object") return false;
  const config = (variant as Record<string, unknown>).config;
  if (!config || typeof config !== "object") return false;
  const record = config as Record<string, unknown>;
  return record.targetTokens != null || record.targetRatio != null;
}

function resolveLiveZoneContext(
  body: Record<string, unknown>,
  options: LiveZoneOptions
): LiveZoneContext | null {
  const field = sequenceField(body);
  const key = field ? makeKey(options, field) : null;
  if (!field || !key) return null;

  const rawItems = body[field] as unknown[];
  const rawItemDigests = rawItems.map(digest);
  if (rawItemDigests.some((value) => value === null)) return null;
  const rawStableFieldsDigest = digest(pickStableFields(body));
  if (!rawStableFieldsDigest) return null;
  const ttlMinutes = Math.min(60, Math.max(1, options.ttlMinutes ?? DEFAULT_TTL_MINUTES));
  const now = Date.now();
  return {
    field,
    key,
    rawItems,
    rawItemDigests: rawItemDigests as string[],
    rawStableFieldsDigest,
    ttlMs: ttlMinutes * 60_000,
    now,
  };
}

async function compressAndStore(
  body: Record<string, unknown>,
  context: LiveZoneContext,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  const result = await compress(body);
  store(
    context.key,
    context.rawItemDigests,
    context.rawStableFieldsDigest,
    result,
    context.field,
    context.now,
    context.ttlMs
  );
  return result;
}

async function compressLiveToolOutputs(
  body: Record<string, unknown>,
  field: "messages" | "input",
  liveItems: unknown[],
  previousStats: CompressionStats | null,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<{ liveResult: CompressionResult; transformedLive: unknown[] } | null> {
  const transformedLive = cloneItems(liveItems);
  if (!transformedLive) return null;
  const liveToolIndexes = liveItems.flatMap((item, index) =>
    isToolOutputItem(item) ? [index] : []
  );
  if (liveToolIndexes.length === 0) {
    return { liveResult: { body, compressed: false, stats: previousStats }, transformedLive };
  }

  const liveToolItems = liveToolIndexes.map((index) => liveItems[index]);
  const liveResult = await compress({ ...body, [field]: liveToolItems });
  const transformed = liveResult.body[field];
  if (!Array.isArray(transformed) || transformed.length !== liveToolItems.length) {
    return { liveResult: { body, compressed: false, stats: null }, transformedLive };
  }
  for (let index = 0; index < liveToolIndexes.length; index++) {
    transformedLive[liveToolIndexes[index]] = transformed[index];
  }
  return { liveResult, transformedLive };
}

async function reuseLiveZoneEntry(
  body: Record<string, unknown>,
  context: LiveZoneContext,
  previous: LiveZoneEntry,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  entries.delete(context.key);
  previous.lastAccess = context.now;
  entries.set(context.key, previous);

  const frozenItems = previous.rawItemDigests.length;
  const liveItems = context.rawItems.slice(frozenItems);
  const frozenPrefix = cloneItems(previous.transformedPrefix);
  if (!frozenPrefix) return compress(body);
  const live = await compressLiveToolOutputs(
    body,
    context.field,
    liveItems,
    previous.stats,
    compress
  );
  if (!live) return compress(body);
  const restoredBody = restoreStableFields(live.liveResult.body, previous.transformedStableFields);
  if (!restoredBody) return compress(body);
  const combinedBody = {
    ...restoredBody,
    [context.field]: [...frozenPrefix, ...live.transformedLive],
  };
  const combinedResult = withLiveZoneStats(
    body,
    { ...live.liveResult, body: combinedBody },
    frozenItems,
    liveItems.length
  );
  if (entries.get(context.key) === previous) {
    store(
      context.key,
      context.rawItemDigests,
      context.rawStableFieldsDigest,
      combinedResult,
      context.field,
      Date.now(),
      context.ttlMs
    );
  }
  return combinedResult;
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
  if (hasGlobalHardBudget(options.variant)) return compress(body);
  const context = resolveLiveZoneContext(body, options);
  if (!context) return compress(body);
  prune(context.now);
  const previous = entries.get(context.key);

  if (
    !previous ||
    previous.rawStableFieldsDigest !== context.rawStableFieldsDigest ||
    !hasExactRawPrefix(context.rawItemDigests, previous)
  ) {
    return compressAndStore(body, context, compress);
  }
  return reuseLiveZoneEntry(body, context, previous, compress);
}

export function resetLiveZoneCache(): void {
  entries.clear();
  totalBytes = 0;
}

export function getLiveZoneCacheStats(): { entries: number; bytes: number } {
  return { entries: entries.size, bytes: totalBytes };
}
