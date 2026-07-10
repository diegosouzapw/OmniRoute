/**
 * Session stickiness for prompt-cache integrity — Fase 3 #5
 *
 * Problem: multi-turn conversations routed to different connections on each
 * request lose the provider's prompt-cache, inflating token cost 5-10× (known
 * effect in dario/clewdr). This module pins a session to the same connection
 * while that connection remains healthy (headroom > STICKINESS_HEADROOM_THRESHOLD).
 *
 * Design
 * ──────
 * • Hash key: SHA-256 of the FIRST user message → first 16 hex chars.
 *   Using only the first message gives a stable key that does not change as
 *   the conversation grows, yet still identifies the conversation reliably.
 * • Headroom gate: before reusing the sticky connection we re-check that its
 *   headroom (= 1 − max(util_5h, util_7d)) is above STICKINESS_HEADROOM_THRESHOLD
 *   (0.15). Below this threshold the connection is considered saturated and the
 *   session is rebound to whatever the normal ordering picks.
 *   Rationale for 0.15: empirically a connection at >85 % utilisation is within
 *   one burst of hitting rate limits, so the cache benefit no longer outweighs
 *   the cost of sticking to a degraded connection. The value matches the soft-
 *   penalty zone used elsewhere in the quota-share engine.
 * • Fail-open: any error (no body, no messages, hash failure, saturation fetch
 *   failure) falls back to the normal target ordering without throwing.
 * • Storage: in-memory Map with a TTL (15 min, aligned with sessionManager.ts).
 *   Max 500 entries; oldest entry evicted when the cap is exceeded.
 * • Saturation: resolved via the same dynamic-import seam as
 *   orderTargetsByHeadroom (quotaStrategies.ts), so the open-sse leaf has no
 *   static edge into src/lib/quota. For tests the fetcher is injected via
 *   __setStickinessHeadroomFetcherForTests.
 * • Terminal-status gate (#6692): headroom alone is orthogonal to account
 *   availability — a credits_exhausted/banned/expired connection (or one still
 *   inside its rate-limit window) reports perfectly healthy 5h/weekly
 *   utilization, so the headroom-only gate kept re-promoting a dead connection
 *   forever. The connection's testStatus/rateLimitedUntil is now resolved via
 *   the same dynamic-import-with-injectable-override seam (fail-open on lookup
 *   errors, mirroring resolveSaturation) and gates the pin alongside headroom.
 *   For tests the fetcher is injected via __setStickinessConnectionFetcherForTests.
 *
 * No barrel import — consistent with the other combo/* helpers.
 *
 * Part of: Group B — Quota Sharing Engine (Fase 3, point #5).
 */

import { createHash } from "node:crypto";
import { computeHeadroom, type HeadroomSaturation } from "./headroomRanking.ts";
import type { ResolvedComboTarget } from "./types.ts";

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Minimum headroom for a sticky connection to be reused.
 * A connection at >85 % utilisation is within one burst of rate-limiting;
 * the cache benefit no longer justifies staying on a degraded connection.
 * Matches the soft-penalty zone used in the broader quota-share engine.
 */
export const STICKINESS_HEADROOM_THRESHOLD = 0.15;

/** TTL aligned with sessionManager.ts SESSION_TTL_MS (15 min). */
const TTL_MS = 15 * 60 * 1000;

/** Cap to prevent unbounded memory growth. */
const MAX_ENTRIES = 500;

// ─── Types ────────────────────────────────────────────────────────────────────

interface StickyEntry {
  connectionId: string;
  createdAt: number;
  lastUsedAt: number;
}

/**
 * Injectable saturation fetcher seam (for unit tests).
 * Returns HeadroomSaturation or undefined when unknown.
 */
export type SaturationFetcher = (
  connectionId: string
) => Promise<HeadroomSaturation | undefined>;

// ─── Saturation fetcher seam ─────────────────────────────────────────────────

/** Overrides the default fetcher for tests; null = use production fetcher. */
let _fetcherOverride: SaturationFetcher | null = null;

/** Test-only: inject the saturation fetcher; pass null to restore default. */
export function __setStickinessHeadroomFetcherForTests(fetcher: SaturationFetcher | null): void {
  _fetcherOverride = fetcher;
}

// ─── Connection terminal-status gate (#6692) ─────────────────────────────────

/** Minimal connection health shape the terminal-status gate needs. */
export interface StickyConnectionHealth {
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
}

/**
 * Injectable connection-health fetcher seam (for unit tests).
 * Returns StickyConnectionHealth or undefined when unknown/lookup failed.
 */
export type ConnectionHealthFetcher = (
  connectionId: string,
  provider: string
) => Promise<StickyConnectionHealth | undefined>;

/** Overrides the default connection-health fetcher for tests; null = use production fetcher. */
let _connectionFetcherOverride: ConnectionHealthFetcher | null = null;

/** Test-only: inject the connection-health fetcher; pass null to restore default. */
export function __setStickinessConnectionFetcherForTests(
  fetcher: ConnectionHealthFetcher | null
): void {
  _connectionFetcherOverride = fetcher;
}

/**
 * Statuses that mean the account is DURABLY dead, not just transiently rate
 * limited — mirrors TERMINAL_PIN_STATUSES used by the LKGP/context-cache pin
 * (combo.ts:558). Duplicated here (rather than imported) so this leaf keeps no
 * static edge into combo.ts, which itself imports this module.
 */
const TERMINAL_STICKY_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * Resolve the sticky-bound connection's health by fetching its provider_connections
 * row. Uses the same dynamic-import pattern as resolveSaturation so this leaf has
 * no static dependency on src/lib/db. Fail-open (undefined) on any error.
 */
async function resolveConnectionHealth(
  connectionId: string,
  provider: string
): Promise<StickyConnectionHealth | undefined> {
  if (_connectionFetcherOverride) return _connectionFetcherOverride(connectionId, provider);

  try {
    const mod = await import("../../../src/lib/db/providers");
    const getProviderConnections = mod.getProviderConnections as (
      filter: Record<string, unknown>
    ) => Promise<StickyConnectionHealth[]>;
    const connections = (await getProviderConnections({
      provider,
      isActive: true,
    })) as Array<StickyConnectionHealth & { id?: string }>;
    return connections.find((c) => c.id === connectionId);
  } catch {
    return undefined;
  }
}

/**
 * Pure: is the sticky-bound connection durably unhealthy right now? Fail-open
 * (false) when the connection is unknown — an unresolved lookup must never drop
 * a healthy pin.
 */
export function isStickyConnectionTerminallyUnhealthy(
  conn: StickyConnectionHealth | undefined,
  now: number
): boolean {
  if (!conn) return false;
  const status = typeof conn.testStatus === "string" ? conn.testStatus : "";
  if (TERMINAL_STICKY_STATUSES.has(status)) return true;
  const rl = conn.rateLimitedUntil ? new Date(String(conn.rateLimitedUntil)).getTime() : 0;
  return Number.isFinite(rl) && rl > now;
}

/**
 * Resolve the HeadroomSaturation for a connection by fetching both the 5h and
 * weekly utilisation signals. Uses the same dynamic-import pattern as
 * orderTargetsByHeadroom so this leaf has no static dependency on src/lib/quota.
 */
async function resolveSaturation(
  connectionId: string,
  provider: string
): Promise<HeadroomSaturation | undefined> {
  if (_fetcherOverride) return _fetcherOverride(connectionId);

  try {
    const mod = await import("../../../src/lib/quota/saturationSignals");
    const getSaturation = mod.getSaturation as (
      connectionId: string,
      provider: string,
      dim: { unit: "percent"; window: "5h" | "weekly" }
    ) => Promise<number>;

    const [util5h, util7d] = await Promise.all([
      getSaturation(connectionId, provider, { unit: "percent", window: "5h" }),
      getSaturation(connectionId, provider, { unit: "percent", window: "weekly" }),
    ]);
    return { util5h, util7d };
  } catch {
    return undefined;
  }
}

// ─── In-memory store ─────────────────────────────────────────────────────────

/** messageHash → sticky entry */
const stickyMap = new Map<string, StickyEntry>();

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Derive a stable 16-hex-char session key from the first user message content.
 * Returns null when the message cannot be extracted (fail-open).
 */
export function deriveMessageHash(
  messages: Array<{ role?: string; content?: unknown }> | null | undefined
): string | null {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const first = messages.find((m) => m?.role === "user");
  if (!first) return null;

  let text: string;
  if (typeof first.content === "string") {
    text = first.content;
  } else if (Array.isArray(first.content)) {
    // Multi-part content: collect all text parts
    text = first.content
      .filter((p): p is { type: string; text: string } => p != null && typeof p === "object")
      .map((p) => (typeof p.text === "string" ? p.text : ""))
      .join("");
  } else {
    return null;
  }

  if (!text) return null;

  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/** Evict expired entries and enforce the hard cap. */
function evict(): void {
  const now = Date.now();
  for (const [key, entry] of stickyMap) {
    if (now - entry.lastUsedAt > TTL_MS) stickyMap.delete(key);
  }
  // Hard cap: remove oldest by lastUsedAt
  while (stickyMap.size > MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    for (const [key, entry] of stickyMap) {
      if (entry.lastUsedAt < oldestTime) {
        oldestTime = entry.lastUsedAt;
        oldestKey = key;
      }
    }
    if (oldestKey === null) break;
    stickyMap.delete(oldestKey);
  }
}

/** Record (or refresh) a sticky binding after a successful request. */
export function recordStickyBinding(messageHash: string, connectionId: string): void {
  const existing = stickyMap.get(messageHash);
  if (existing) {
    existing.connectionId = connectionId;
    existing.lastUsedAt = Date.now();
  } else {
    evict();
    stickyMap.set(messageHash, {
      connectionId,
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
    });
  }
}

/** Remove a binding (e.g. after the connection is confirmed unhealthy). */
export function clearStickyBinding(messageHash: string): void {
  stickyMap.delete(messageHash);
}

/**
 * Read-only peek at the connectionId currently bound to `messageHash`, without
 * mutating the store or checking TTL/health. Lets combo.ts's failure paths
 * confirm a just-failed target is the ACTUAL sticky-bound connection before
 * calling clearStickyBinding (#6692) — clearing on an unrelated target's
 * failure would drop a still-healthy pin.
 */
export function peekStickyConnectionId(messageHash: string): string | null {
  return stickyMap.get(messageHash)?.connectionId ?? null;
}

/** Reset the entire store (for testing). */
export function clearAllStickyBindings(): void {
  stickyMap.clear();
}

/**
 * #6168: resolve the session-stickiness opt-out for a combo request.
 *
 * Precedence (mirrors the `stickyRoundRobinLimit` resolution in combo.ts):
 *   per-combo `config.disableSessionStickiness` (boolean) →
 *   global `settings.disableSessionStickiness` (boolean) →
 *   default `false`.
 *
 * Default `false` preserves the #3825 prompt-cache/504 fix — only an explicit
 * `true` at either level disables stickiness.
 */
export function resolveDisableSessionStickiness(
  config: Record<string, unknown> | null | undefined,
  settings: Record<string, unknown> | null | undefined
): boolean {
  const perCombo = config?.disableSessionStickiness;
  if (typeof perCombo === "boolean") return perCombo;
  return settings?.disableSessionStickiness === true;
}

// ─── Core: apply stickiness to an ordered target list ────────────────────────

export interface ApplyStickinessResult {
  /** Reordered targets (sticky first when applicable). */
  targets: ResolvedComboTarget[];
  /** The message hash derived from the request (null = no stickiness possible). */
  messageHash: string | null;
  /** Whether a sticky connection was successfully applied. */
  stuck: boolean;
}

/**
 * Attempt to promote the sticky connection to the front of `orderedTargets`.
 *
 * Algorithm:
 * 1. Derive the message hash from the first user message.
 * 2. Look up the sticky binding for that hash.
 * 3. If found, fetch saturation AND connection health for that connection.
 * 4. If headroom > threshold AND the connection is not durably unhealthy
 *    (#6692: terminal testStatus / still rate-limited) → move the matching
 *    target to index 0. Otherwise → clear the binding (rebind on next success).
 * 5. On any error → fall through unchanged (fail-open).
 *
 * In production the saturation fetcher is resolved via dynamic import of
 * src/lib/quota/saturationSignals (same pattern as orderTargetsByHeadroom).
 * In tests, inject via __setStickinessHeadroomFetcherForTests.
 *
 * @param orderedTargets  Targets already ordered by the combo strategy.
 * @param messages        Request body.messages.
 * @returns               Result with (possibly reordered) targets.
 */
export async function applySessionStickiness(
  orderedTargets: ResolvedComboTarget[],
  messages: Array<{ role?: string; content?: unknown }> | null | undefined
): Promise<ApplyStickinessResult> {
  const noOp: ApplyStickinessResult = { targets: orderedTargets, messageHash: null, stuck: false };

  try {
    if (orderedTargets.length <= 1) return noOp;

    const messageHash = deriveMessageHash(messages);
    if (!messageHash) return noOp;

    const existing = stickyMap.get(messageHash);
    if (!existing) return { targets: orderedTargets, messageHash, stuck: false };

    // Check TTL
    if (Date.now() - existing.lastUsedAt > TTL_MS) {
      stickyMap.delete(messageHash);
      return { targets: orderedTargets, messageHash, stuck: false };
    }

    const { connectionId } = existing;

    // Find the target that matches the sticky connection
    const stickyIdx = orderedTargets.findIndex((t) => t.connectionId === connectionId);
    if (stickyIdx === -1) {
      // Connection gone from pool — clear binding, fall through
      clearStickyBinding(messageHash);
      return { targets: orderedTargets, messageHash, stuck: false };
    }

    // Gate: headroom must be above threshold AND the connection must not be
    // durably unhealthy (#6692 — credits_exhausted/banned/expired/rate-limited
    // accounts report healthy 5h/weekly utilization, so headroom alone never
    // catches them).
    const stickyTarget = orderedTargets[stickyIdx];
    const [sat, connHealth] = await Promise.all([
      resolveSaturation(connectionId, stickyTarget.provider),
      resolveConnectionHealth(connectionId, stickyTarget.provider),
    ]);
    const headroom = computeHeadroom(sat);

    if (
      headroom <= STICKINESS_HEADROOM_THRESHOLD ||
      isStickyConnectionTerminallyUnhealthy(connHealth, Date.now())
    ) {
      // Connection saturated or durably unhealthy — rebind on next success
      clearStickyBinding(messageHash);
      return { targets: orderedTargets, messageHash, stuck: false };
    }

    // Promote the sticky target to position 0
    const reordered = [
      orderedTargets[stickyIdx],
      ...orderedTargets.slice(0, stickyIdx),
      ...orderedTargets.slice(stickyIdx + 1),
    ];

    // Refresh lastUsedAt
    existing.lastUsedAt = Date.now();

    return { targets: reordered, messageHash, stuck: true };
  } catch {
    // Completely unexpected error — fail-open
    return noOp;
  }
}
