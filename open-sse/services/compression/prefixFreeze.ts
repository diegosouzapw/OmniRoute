/**
 * T08/H5 — usage-observed prefix freeze (gaps v3.8.42; opt-in, default OFF).
 *
 * Augments the static cache-aware heuristic (`getCacheAwareStrategy`). Instead of only freezing the
 * system prompt for providers the static check knows to cache, it OBSERVES which system prompts
 * actually recur across requests and, once one has been seen `>= threshold` times, treats it as a
 * stable cacheable prefix to preserve — even for a provider the static check does not recognize.
 *
 * Content-addressed by a hash of the system prompt (no principal needed): a "freeze" only
 * *preserves* the prefix from compression, which never corrupts a payload and is safe to share
 * across tenants. In-memory + bounded, zero DB/IO. Default OFF
 * (`COMPRESSION_PREFIX_FREEZE_ENABLED`); when off the observer is never consulted (zero cost).
 */

import crypto from "node:crypto";

export interface PrefixFreezeConfig {
  /** Master switch. Default false — the resolver never observes/consults when off. */
  enabled: boolean;
  /** Times a system prompt must be observed before it is treated as a frozen stable prefix. */
  threshold: number;
}

export const DEFAULT_PREFIX_FREEZE: PrefixFreezeConfig = { enabled: false, threshold: 3 };

/** Upper bound on tracked prefixes (oldest evicted first), mirroring the CCR store cap. */
export const MAX_PREFIX_ENTRIES = 5_000;

const observations = new Map<string, number>();

function boundedInc(hash: string): void {
  if (!observations.has(hash) && observations.size >= MAX_PREFIX_ENTRIES) {
    const oldest = observations.keys().next().value;
    if (oldest !== undefined) observations.delete(oldest);
  }
  observations.set(hash, (observations.get(hash) ?? 0) + 1);
}

function toPositiveInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : fallback;
}

/** Resolve config from env (`COMPRESSION_PREFIX_FREEZE_ENABLED` / `_THRESHOLD`). Opt-in. */
export function resolvePrefixFreezeConfig(
  env: NodeJS.ProcessEnv = process.env
): PrefixFreezeConfig {
  return {
    enabled: env.COMPRESSION_PREFIX_FREEZE_ENABLED === "true",
    threshold: toPositiveInt(
      env.COMPRESSION_PREFIX_FREEZE_THRESHOLD,
      DEFAULT_PREFIX_FREEZE.threshold
    ),
  };
}

// ─── prefix extraction ──────────────────────────────────────────────────────────

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * Pull plain text out of the system-prompt shapes: `string`, `Array<…>`, `{text}` (OpenAI/Claude
 * text parts), and `{parts: [...]}` (Gemini `systemInstruction`).
 */
function collectText(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    if (value.trim()) out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectText(item, out);
    return;
  }
  if (isRecord(value)) {
    if (typeof value.text === "string" && value.text.trim()) out.push(value.text);
    if (value.parts !== undefined) collectText(value.parts, out); // Gemini systemInstruction
  }
}

/**
 * Compute a stable 24-hex hash of the request's system prompt across the common body shapes
 * (OpenAI `messages[].role==="system"`, Claude `system`, Gemini `systemInstruction`). Returns
 * `null` when there is no system prompt to freeze.
 */
export function extractStablePrefixHash(body: unknown): string | null {
  if (!isRecord(body)) return null;
  const parts: string[] = [];
  collectText(body.system, parts);
  collectText(body.systemInstruction, parts);
  collectText(body.system_instruction, parts);
  const messages = body.messages;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      if (isRecord(msg) && msg.role === "system") collectText(msg.content, parts);
    }
  }
  if (parts.length === 0) return null;
  return crypto.createHash("sha256").update(parts.join("\n")).digest("hex").slice(0, 24);
}

// ─── observation + query ──────────────────────────────────────────────────────────

/** Record one observation of a system-prompt hash (call once per request when enabled). */
export function observePrefix(hash: string): void {
  boundedInc(hash);
}

/** True once a prefix has been observed `>= threshold` times (a stable, freezable prefix). */
export function isPrefixFrozen(hash: string, threshold: number): boolean {
  return (observations.get(hash) ?? 0) >= threshold;
}

/** Current observation count for a prefix hash (telemetry/tests). */
export function getPrefixObservations(hash: string): number {
  return observations.get(hash) ?? 0;
}

/** Clear all observations (tests + operator reset). */
export function resetPrefixFreeze(): void {
  observations.clear();
}
