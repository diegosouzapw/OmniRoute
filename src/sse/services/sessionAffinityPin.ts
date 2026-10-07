/**
 * #5903 — session-affinity-pin resolution + TTL, extracted from auth.ts as a
 * pure leaf so the frozen god-file `auth.ts` does not grow.
 *
 * Problem: reset-aware (and other quota-scoring) combo strategies recompute a
 * "winner" connection on every request and hand it to getProviderCredentials
 * as `forcedConnectionId`. That id narrows the connection pool to exactly one
 * connection BEFORE session affinity is consulted, so an existing pin pointing
 * at a previously-selected account is never found and gets silently
 * deleted/re-pinned to the fresh winner — breaking "same session -> reuse
 * pinned account".
 *
 * Fix: when an active, non-expired affinity pin already exists for this
 * (session, provider) AND the pinned connection is still eligible, the pin wins
 * over the freshly recomputed `forcedConnectionId`. If the pin is ineligible
 * (rate-limited / exhausted / model-locked / etc.) the caller keeps its forced
 * connection, so the existing 429-driven `deleteSessionAccountAffinity`
 * failover still owns rotating away from a pin that stops working.
 *
 * @changes
 * - [2026-07-24] [Composer] - Drop forcedConnectionId when excluded or ineligible (429 loop fix)
 *
 * This module stays decoupled from auth.ts internals: the three predicates that
 * live in (or would cause a cycle back into) auth.ts —
 * `isTerminalConnectionStatus`, `isCodexScopeUnavailable`, and the quota-policy
 * check wrapping `evaluateQuotaLimitPolicy` — are injected as callbacks.
 */

import { createHash } from "crypto";
import {
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
  evictSessionAccountAffinityForConnection,
} from "@/lib/db/sessionAccountAffinity";
import { touchConnectionLastUsed } from "@/lib/db/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { isAccountQuotaExhausted } from "@/domain/quotaCache";
import {
  isAccountUnavailable,
  isModelLocked,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isComboPerModelTimeoutAbort } from "@omniroute/open-sse/services/combo/comboAbortReasons.ts";
import * as log from "../utils/logger";
import { readHeaderValue } from "./headerReader.ts";

export { readHeaderValue } from "./headerReader.ts";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** Maximum accepted session-key input length. Longer identifiers are rejected before processing. */
const SESSION_KEY_MAX_INPUT_LEN = 4096;

function normalizeSessionKey(value: unknown, prefix: string): string | null {
  if (typeof value !== "string" || value.length > SESSION_KEY_MAX_INPUT_LEN) return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.length <= 180 && /^[A-Za-z0-9._:-]+$/.test(trimmed)) {
    return `${prefix}:${trimmed}`;
  }
  return `${prefix}:sha256:${createHash("sha256").update(trimmed).digest("hex")}`;
}

/** Upper bound on text extracted for session hashing (matches the slice in extractSessionAffinityKey). */
const SESSION_HASH_TEXT_LIMIT = 4096;

function extractBoundedNonEmptyText(
  value: unknown,
  limit = SESSION_HASH_TEXT_LIMIT
): string | null {
  if (typeof value !== "string" || limit <= 0) return null;
  const bounded = value.slice(0, limit);
  return bounded.trim().length > 0 ? bounded : null;
}

/**
 * Extracts human-readable text from a value for session-affinity hashing.
 *
 * Design constraints (post-adversarial-review):
 * - NEVER calls `JSON.stringify` on arbitrary objects — avoids synchronous
 *   Event Loop blocking on huge payloads (e.g. 50MB multimodal base64).
 * - NEVER returns structural tokens like `"[]"` or `"{}"` — avoids global
 *   session-key collisions across unrelated users with empty payloads.
 * - Only extracts values from known text fields (`.text`, `.content`) or
 *   raw strings.  Payloads without recognisable text content get `null`,
 *   which correctly signals "no input-based session affinity" — callers
 *   should use explicit session IDs instead.
 */
function extractTextForSessionHash(value: unknown): string | null {
  if (typeof value === "string") return extractBoundedNonEmptyText(value);

  if (Array.isArray(value)) {
    const parts: string[] = [];
    let totalLen = 0;
    for (const item of value) {
      if (totalLen >= SESSION_HASH_TEXT_LIMIT) break;
      let candidate: unknown = null;
      if (typeof item === "string") {
        candidate = item;
      } else {
        const record = asRecord(item);
        if (typeof record.text === "string") candidate = record.text;
        else if (typeof record.content === "string") candidate = record.content;
      }
      const separatorLength = parts.length > 0 ? 1 : 0;
      const text = extractBoundedNonEmptyText(
        candidate,
        SESSION_HASH_TEXT_LIMIT - totalLen - separatorLength
      );
      if (text) {
        parts.push(text);
        totalLen += separatorLength + text.length;
      }
    }
    return parts.length > 0 ? parts.join("\n") : null;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    // Known text fields — covers OpenAI, Anthropic, and most providers
    const directText =
      extractBoundedNonEmptyText(record.text) ??
      extractBoundedNonEmptyText(record.content) ??
      extractBoundedNonEmptyText(record.prompt);
    if (directText) return directText;
    // Gemini format: { parts: [{ text: "..." }, ...] }
    if (Array.isArray(record.parts)) {
      const partsText = extractTextForSessionHash(record.parts);
      if (partsText) return partsText;
    }
    // No recognisable text field — return null rather than risking a
    // potentially huge JSON.stringify on arbitrary payload shapes.
    return null;
  }

  return null;
}

function getFirstInputText(body: unknown): string | null {
  const record = asRecord(body);

  // Codex / Responses API: { input: "..." | [...] }
  if (record.input !== undefined) {
    if (typeof record.input === "string") return extractBoundedNonEmptyText(record.input);
    if (Array.isArray(record.input)) {
      for (const item of record.input) {
        const itemRecord = asRecord(item);
        const text = extractTextForSessionHash(itemRecord.content ?? item);
        if (text) return text;
      }
    }
    const text = extractTextForSessionHash(record.input);
    if (text) return text;
  }

  // OpenAI Chat / Anthropic Messages: { messages: [...] }
  if (Array.isArray(record.messages)) {
    const userMessage = record.messages.find((message) => asRecord(message).role === "user");
    const firstMessage = userMessage ?? record.messages[0];
    const text = extractTextForSessionHash(asRecord(firstMessage).content ?? firstMessage);
    if (text) return text;
  }

  // Google Gemini: { contents: [{ role: "user", parts: [{ text: "..." }] }] }
  if (Array.isArray(record.contents)) {
    const userContent = record.contents.find((c) => asRecord(c).role === "user");
    const firstContent = userContent ?? record.contents[0];
    const text = extractTextForSessionHash(asRecord(firstContent).parts ?? firstContent);
    if (text) return text;
  }

  // OpenAI Legacy Completions / Anthropic /v1/complete / Ollama: { prompt: "..." }
  const prompt = extractBoundedNonEmptyText(record.prompt);
  if (prompt) return prompt;

  // Other common root-level text fields
  const query = extractBoundedNonEmptyText(record.query);
  if (query) return query;
  const instruction = extractBoundedNonEmptyText(record.instruction);
  if (instruction) return instruction;

  return null;
}

/**
 * Derives the stable connection-affinity key for a request.
 *
 * @param body - Parsed request body containing explicit session identifiers or recognized text.
 * @param headers - Optional request headers that may carry an explicit session identifier.
 * @returns A namespaced affinity key, or `null` when no safe key can be derived.
 */
export function extractSessionAffinityKey(
  body: unknown,
  headers?: Headers | { get?: (name: string) => string | null } | null
): string | null {
  const headerKey = normalizeSessionKey(
    readHeaderValue(headers, "x-codex-session-id") ??
      readHeaderValue(headers, "x-session-id") ??
      readHeaderValue(headers, "x-omniroute-session"),
    "header"
  );
  if (headerKey) return headerKey;

  const record = asRecord(body);
  const metadata = asRecord(record.metadata);
  const explicitKey =
    normalizeSessionKey(metadata.session_id, "metadata") ??
    normalizeSessionKey(metadata.sessionId, "metadata") ??
    normalizeSessionKey(record.conversation_id, "conversation") ??
    normalizeSessionKey(record.session_id, "session") ??
    normalizeSessionKey(record.prompt_cache_key, "prompt-cache");
  if (explicitKey) return explicitKey;

  const inputText = getFirstInputText(body);
  if (!inputText) return null;
  return `input:sha256:${createHash("sha256").update(inputText).digest("hex")}`;
}

/** Minimal structural view of a provider connection this module reads. */
export interface AffinityPinConnection {
  id: string;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
  providerSpecificData?: unknown;
}

/** Fields the LRU tie-break / session-affinity selection reads. */
export interface SessionAffinityConnection {
  id: string;
  lastUsedAt?: string | null;
  consecutiveUseCount?: number | null;
  priority?: number | null;
}

export function syncSessionAffinityRuntimeFields(
  connections: SessionAffinityConnection[],
  selected: SessionAffinityConnection
): void {
  const cached = connections.find((connection) => connection.id === selected.id);
  if (!cached) return;
  cached.lastUsedAt = selected.lastUsedAt;
  cached.consecutiveUseCount = selected.consecutiveUseCount;
}

export function formatSessionKeyForLog(sessionKey: string): string {
  return `${sessionKey.slice(0, 18)}...`;
}

function compareLruConnections(a: SessionAffinityConnection, b: SessionAffinityConnection): number {
  if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
  if (!a.lastUsedAt) return -1;
  if (!b.lastUsedAt) return 1;
  const recencyDelta = new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
  if (recencyDelta !== 0) return recencyDelta;
  if ((a.consecutiveUseCount || 0) !== (b.consecutiveUseCount || 0)) {
    return (a.consecutiveUseCount || 0) - (b.consecutiveUseCount || 0);
  }
  return (a.priority || 999) - (b.priority || 999);
}

/**
 * Session-affinity account selection (moved from auth.ts alongside the #5903
 * pin-override so all session-affinity logic lives in one leaf). Reuses an
 * active pin when its connection is in the pool; otherwise picks the LRU
 * connection and creates a fresh pin. Behavior byte-identical to the original.
 */
export async function selectSessionAffinityConnection<T extends SessionAffinityConnection>(
  provider: string,
  sessionKey: string | null | undefined,
  connections: T[],
  ttlMs = 0
): Promise<T | null> {
  if (!sessionKey || connections.length === 0 || ttlMs <= 0) return null;

  const existing = getSessionAccountAffinity(sessionKey, provider, ttlMs);
  if (existing) {
    const connection = connections.find((candidate) => candidate.id === existing.connectionId);
    if (connection) {
      touchSessionAccountAffinity(sessionKey, provider, Date.now(), ttlMs);
      const nextCount = (connection.consecutiveUseCount || 0) + 1;
      await touchConnectionLastUsed(connection.id, nextCount);
      connection.lastUsedAt = new Date().toISOString();
      connection.consecutiveUseCount = nextCount;
      log.info(
        "AUTH",
        `session_key=${formatSessionKeyForLog(sessionKey)} -> connection ${connection.id.slice(
          0,
          8
        )} (affinity)`
      );
      return connection;
    }

    deleteSessionAccountAffinity(sessionKey, provider);
    log.info(
      "AUTH",
      `affinity cleared for session_key=${formatSessionKeyForLog(sessionKey)} provider=${provider}`
    );
  }

  const connection = [...connections].sort(compareLruConnections)[0] ?? null;
  if (!connection) return null;

  upsertSessionAccountAffinity(sessionKey, provider, connection.id, Date.now(), ttlMs);
  await touchConnectionLastUsed(connection.id, 1);
  connection.lastUsedAt = new Date().toISOString();
  connection.consecutiveUseCount = 1;
  log.info(
    "AUTH",
    `new affinity created for session_key=${formatSessionKeyForLog(
      sessionKey
    )} -> connection ${connection.id.slice(0, 8)}`
  );
  return connection;
}

/**
 * Read-only affinity selection used when another durable authority must claim
 * the candidate before any affinity/LRU state is changed.
 */
export function planSessionAffinityConnection<T extends SessionAffinityConnection>(
  provider: string,
  sessionKey: string | null | undefined,
  connections: T[],
  ttlMs = 0
) {
  if (!sessionKey || connections.length === 0 || ttlMs <= 0) return null;
  const existing = getSessionAccountAffinity(sessionKey, provider, ttlMs);
  const existingConnection =
    existing && connections.find((candidate) => candidate.id === existing.connectionId);
  const connection = existingConnection ?? [...connections].sort(compareLruConnections)[0] ?? null;
  if (!connection) return null;

  return {
    connection,
    commit: async () => {
      if (existingConnection) {
        touchSessionAccountAffinity(sessionKey, provider, Date.now(), ttlMs);
        const nextCount = (connection.consecutiveUseCount || 0) + 1;
        await touchConnectionLastUsed(connection.id, nextCount);
        connection.lastUsedAt = new Date().toISOString();
        connection.consecutiveUseCount = nextCount;
        return;
      }
      if (existing) deleteSessionAccountAffinity(sessionKey, provider);
      upsertSessionAccountAffinity(sessionKey, provider, connection.id, Date.now(), ttlMs);
      await touchConnectionLastUsed(connection.id, 1);
      connection.lastUsedAt = new Date().toISOString();
      connection.consecutiveUseCount = 1;
    },
  };
}

/** Inputs the combo-timeout eviction needs from the dispatch site. */
export interface ComboTimeoutAffinityEvictionParams {
  sessionKey?: string | null;
  provider: string;
  connectionId?: string | null;
  /** Per-target abort signal handed down by the combo timeout runner. */
  modelAbortSignal?: AbortSignal | null;
}

/**
 * #6219 follow-up — evict the sticky pin when a COMBO per-model timeout abandons
 * the pinned account.
 *
 * The #6219 eviction only fires on the generic `markAccountUnavailable` →
 * `shouldFallback` path in chat.ts. A combo target timeout never reaches it: the
 * combo runner aborts the dispatch, the abort propagates out of
 * `executeChatWithBreaker` as a rejection, and `buildTargetTimeoutRunner`
 * swallows it behind the synthetic 524. Nothing marks the account unavailable
 * (correctly — a stall is not a quota/auth failure), so the pin survived its full
 * TTL and every following request in that session was handed straight back to the
 * stalled account.
 *
 * Only a genuine per-model timeout evicts. A client disconnect or a hedge
 * cancellation says nothing about the account's health and must leave the pin
 * intact. The eviction is connection-matched, so a pin pointing at a different
 * (healthy) account is never touched. Best-effort: never throws into the dispatch
 * path.
 *
 * @returns true when a pin was actually evicted.
 */
export function evictSessionAffinityOnComboTimeout(
  params: ComboTimeoutAffinityEvictionParams
): boolean {
  const { sessionKey, provider, connectionId, modelAbortSignal } = params;
  if (!sessionKey || !provider || !connectionId) return false;
  if (!isComboPerModelTimeoutAbort(modelAbortSignal)) return false;

  try {
    const evicted = evictSessionAccountAffinityForConnection(sessionKey, provider, connectionId);
    if (evicted) {
      log.warn(
        "AUTH",
        `session_key=${formatSessionKeyForLog(sessionKey)} pin on ${connectionId.slice(
          0,
          8
        )} evicted — ${provider} stalled past the combo target timeout`
      );
    }
    return evicted;
  } catch {
    // Best-effort: a failed eviction must never break the dispatch path.
    return false;
  }
}

/** Subset of credential-selection options the pin resolution consults. */
export interface AffinityPinOptions {
  sessionKey?: string | null;
  allowSuppressedConnections?: boolean;
  allowRateLimitedConnections?: boolean;
  bypassQuotaPolicy?: boolean;
  sessionAffinityTtlMs?: number | null;
}

/**
 * Settings subset needed to resolve the session-affinity TTL. `sessionAffinityTtlMs`
 * is the generic (#7274) key; `codexSessionAffinityTtlMs` is kept as a read-only
 * legacy fallback for the (unlikely) case a caller hands in raw pre-migration
 * settings that were never round-tripped through `getSettings()` (which already
 * carries the value over — see migration 124_generic_session_affinity_ttl.sql).
 */
export interface AffinityPinSettings {
  sessionAffinityTtlMs?: number | null;
  codexSessionAffinityTtlMs?: number | null;
}

/**
 * Resolve the effective session-affinity TTL for any provider (#7274 — previously
 * hardcoded to codex only): an explicit per-request override wins, else the
 * persisted generic setting (falling back to the legacy codex-only key for
 * pre-migration callers), else 0 (disabled). Kept here so auth.ts can reuse it at
 * both the pin-override site and the downstream `selectSessionAffinityConnection`
 * site with one call.
 */
export function resolveSessionAffinityTtlMs(
  _provider: string,
  options: AffinityPinOptions,
  settings: AffinityPinSettings
): number {
  const override = Number(options.sessionAffinityTtlMs);
  if (Number.isFinite(override) && override > 0) return override;
  const configured = Number(settings.sessionAffinityTtlMs ?? settings.codexSessionAffinityTtlMs);
  if (Number.isFinite(configured) && configured > 0) return configured;
  return 0;
}

/**
 * Predicates supplied by the caller because they either live in auth.ts or
 * would introduce a circular import if pulled in directly.
 */
export interface AffinityPinPredicates {
  /** auth.ts::isTerminalConnectionStatus (banned/expired/credits_exhausted). */
  isTerminalConnectionStatus: (connection: AffinityPinConnection) => boolean;
  /** auth.ts::isCodexScopeUnavailable (codex per-scope cooldown). */
  isCodexScopeUnavailable: (
    connection: AffinityPinConnection,
    requestedModel: string | null
  ) => boolean;
  /** Wraps auth.ts::evaluateQuotaLimitPolicy(...).blocked for one connection. */
  isQuotaPolicyBlocked: (connection: AffinityPinConnection) => boolean;
}

export interface ApplySessionAffinityPinParams extends AffinityPinPredicates {
  forcedConnectionId: string | null;
  options: AffinityPinOptions;
  sessionAffinityTtlMs: number;
  connections: AffinityPinConnection[];
  provider: string;
  requestedModel: string | null;
  excludedConnectionIds: Set<string>;
}

/**
 * Mirrors the eligibility predicates applied later in getProviderCredentials
 * (availableConnections filter + quota policy + quota exhaustion) but scoped to
 * a single candidate connection. Pure/read-only.
 */
function isConnectionEligibleForAffinityPin(
  connection: AffinityPinConnection,
  params: ApplySessionAffinityPinParams
): boolean {
  const { provider, requestedModel, options } = params;
  const allowSuppressed = options.allowSuppressedConnections === true;
  const allowRateLimited = allowSuppressed || options.allowRateLimitedConnections === true;
  if (params.excludedConnectionIds.has(connection.id)) return false;
  if (
    requestedModel &&
    isModelExcludedByConnection(requestedModel, connection.providerSpecificData)
  ) {
    return false;
  }
  if (!allowSuppressed) {
    if (!allowRateLimited && isAccountUnavailable(connection.rateLimitedUntil)) return false;
    if (params.isTerminalConnectionStatus(connection)) return false;
    if (provider === "codex" && params.isCodexScopeUnavailable(connection, requestedModel)) {
      return false;
    }
    if (requestedModel && isModelLocked(provider, connection.id, requestedModel)) return false;
  }
  if (isAccountQuotaExhausted(connection.id)) return false;
  if (options.bypassQuotaPolicy !== true && params.isQuotaPolicyBlocked(connection)) return false;
  return true;
}

/**
 * If an active, non-expired affinity pin exists for (sessionKey, provider) and
 * the pinned connection is present-and-eligible in the current pool, returns
 * that pinned connectionId (which should override `forcedConnectionId`) and
 * logs the override. Returns null when the caller should keep its
 * `forcedConnectionId` — no session, TTL disabled, no pin, pin already equals
 * the forced id, pin absent from pool, or pin ineligible.
 */
export function applySessionAffinityPin(params: ApplySessionAffinityPinParams): string | null {
  const { forcedConnectionId, options, sessionAffinityTtlMs, connections, provider } = params;
  const sessionKey = options.sessionKey;
  if (!forcedConnectionId || !sessionKey || sessionAffinityTtlMs <= 0) return null;

  const pinned = getSessionAccountAffinity(sessionKey, provider, sessionAffinityTtlMs);
  if (!pinned || pinned.connectionId === forcedConnectionId) return null;

  const pinnedConnection = connections.find((conn) => conn.id === pinned.connectionId);
  if (!pinnedConnection || !isConnectionEligibleForAffinityPin(pinnedConnection, params)) {
    return null;
  }

  log.info(
    "AUTH",
    `session affinity pin ${pinned.connectionId.slice(0, 8)}... overrides forcedConnectionId ${forcedConnectionId.slice(0, 8)}... (#5903)`
  );
  return pinned.connectionId;
}

export interface ResolveForcedConnectionForPoolParams {
  forcedConnectionId: string | null;
  excludedConnectionIds: ReadonlySet<string>;
  connections: AffinityPinConnection[];
  allowRateLimitedConnections: boolean;
  bypassQuotaPolicy: boolean;
  isQuotaExhausted: (connectionId: string) => boolean;
  isQuotaPolicyBlocked: (connection: AffinityPinConnection) => boolean;
}

/**
 * Reset-aware combo routing pins a single `forcedConnectionId` per target. When
 * that account 429s (quota exhausted / cooldown), the chat retry loop excludes
 * it — but keeping the force would narrow the pool back to the same dead
 * account. Drop the pin whenever the forced id is excluded or no longer eligible.
 */
export function resolveForcedConnectionForCredentialPool(
  params: ResolveForcedConnectionForPoolParams
): string | null {
  const forced = params.forcedConnectionId?.trim() || null;
  if (!forced || params.excludedConnectionIds.has(forced)) return null;

  if (params.connections.length === 0) {
    return forced;
  }

  const forcedConn = params.connections.find((conn) => conn.id === forced);
  if (!forcedConn) return null;

  if (!params.allowRateLimitedConnections && isAccountUnavailable(forcedConn.rateLimitedUntil)) {
    return null;
  }
  if (params.isQuotaExhausted(forced)) return null;
  if (!params.bypassQuotaPolicy && params.isQuotaPolicyBlocked(forcedConn)) return null;

  return forced;
}

/**
 * A forced connection (combo step `connectionId` / `x-omniroute-connection`) is an
 * operator instruction, not a suggestion. resolveForcedConnectionForCredentialPool()
 * above returns null for two very different reasons: (a) intentional pin-release
 * cases it already handles correctly (the forced id was excluded after a failed
 * attempt, is cooling down, or is quota-blocked — those must keep degrading to
 * normal sibling fallback), and (b) the forced id simply not being present in the
 * pool at all (e.g. an operator deactivated that connection). Only (b) must be
 * treated as a hard failure instead of falling through to dynamic sibling
 * selection across the rest of the provider's connections — this predicate
 * identifies exactly (b), checked *before* resolveForcedConnectionForCredentialPool
 * runs, so the two cases are never conflated.
 */
export function isForcedConnectionMissingFromPool(
  forcedConnectionId: string | null,
  excludedConnectionIds: ReadonlySet<string>,
  connections: AffinityPinConnection[]
): boolean {
  return (
    forcedConnectionId !== null &&
    !excludedConnectionIds.has(forcedConnectionId) &&
    !connections.some((conn) => conn.id === forcedConnectionId)
  );
}
