// Proxy scope pool rotation & alive-pool resolution (#6365).
//
// Extracted from ../proxies.ts (#7046 file-size follow-up): this module holds the
// rotation-strategy bookkeeping (cursor persistence, strategy normalization) and the
// read-only alive-pool resolution used by the registry proxy resolvers. It has no
// dependency back on ../proxies.ts — mutators that also need to bump the registry
// generation counter (addProxyToScopePool, removeProxyFromScopePool,
// setScopeRotationStrategy) stay in ../proxies.ts and import the pure helpers here.
import { randomInt } from "crypto";
import { getDbInstance } from "../core";
import { pickByLatency } from "../proxyLatency";
import {
  hasProxyRefusals,
  isProxyAvoided,
  proxyEgressKey,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";
import { maybeEmitPoolExhausted } from "@/lib/proxyEvents/proxyTransitionBridge";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
import { getCachedProxyHealth } from "@/lib/proxyHealth";
import type { JsonRecord, ProxyScope, ProxyRotationStrategy } from "./types";
import { PROXY_ROTATION_STRATEGIES, DEFAULT_PROXY_ROTATION_STRATEGY } from "./types";
import {
  mapAssignmentRow,
  toRegistryProxyResolution,
  normalizeScope,
  normalizeAssignmentScopeId,
} from "./mappers";

// Rotation state keys off the SAME normalized scope_id as assignments so a global
// pool ('__global__') and a per-scope pool share one deterministic cursor row.
export function normalizeRotationScopeId(scope: ProxyScope, scopeId?: string | null): string {
  return normalizeAssignmentScopeId(scope, scopeId) ?? "";
}

export function clearRotationState(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  normalizedScopeId: string | null
) {
  db.prepare("DELETE FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?").run(
    scope,
    normalizedScopeId ?? ""
  );
}

export function resetRotationCursor(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  normalizedScopeId: string | null
) {
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = 0, rotated_at = NULL, updated_at = ? WHERE scope = ? AND scope_id IS ?"
  ).run(new Date().toISOString(), scope, normalizedScopeId ?? "");
}

export function normalizeRotationStrategy(strategy: unknown): ProxyRotationStrategy {
  return PROXY_ROTATION_STRATEGIES.includes(strategy as ProxyRotationStrategy)
    ? (strategy as ProxyRotationStrategy)
    : DEFAULT_PROXY_ROTATION_STRATEGY;
}

/**
 * List a scope's pool members in rotation order (position ASC). Includes every
 * assigned proxy regardless of alive status — callers that only want serviceable
 * members should filter by proxy status themselves.
 */
export async function getScopeProxyPool(scope: string, scopeId?: string | null) {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const db = getDbInstance();
  return db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ? ORDER BY position ASC, datetime(created_at) ASC, id ASC"
    )
    .all(normalizedScope, normalizedScopeId)
    .map(mapAssignmentRow);
}

/** Read a scope's rotation strategy (#6365). Defaults to `round-robin`. */
export async function getScopeRotationStrategy(
  scope: string,
  scopeId?: string | null
): Promise<ProxyRotationStrategy> {
  const normalizedScope = normalizeScope(scope);
  const rotationScopeId = normalizeRotationScopeId(normalizedScope, scopeId);
  const db = getDbInstance();
  const row = db
    .prepare("SELECT strategy FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?")
    .get(normalizedScope, rotationScopeId) as { strategy?: string } | undefined;
  return normalizeRotationStrategy(row?.strategy);
}

// Read the rotation row for a scope, creating a default one lazily so the
// round-robin cursor has somewhere to live. Best-effort: any write failure leaves
// the caller on the default strategy with an ephemeral cursor.
function getOrCreateRotationRow(
  db: ReturnType<typeof getDbInstance>,
  normalizedScope: string,
  rotationScopeId: string
): {
  strategy: ProxyRotationStrategy;
  cursor: number;
  stickyWindowMinutes: number;
  rotatedAt: string | null;
} {
  const row = db
    .prepare(
      "SELECT strategy, cursor, sticky_window_minutes, rotated_at FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?"
    )
    .get(normalizedScope, rotationScopeId) as
    | {
        strategy?: string;
        cursor?: number;
        sticky_window_minutes?: number;
        rotated_at?: string | null;
      }
    | undefined;

  if (row) {
    return {
      strategy: normalizeRotationStrategy(row.strategy),
      cursor: Number(row.cursor) || 0,
      stickyWindowMinutes: Number(row.sticky_window_minutes) || 30,
      rotatedAt: typeof row.rotated_at === "string" ? row.rotated_at : null,
    };
  }

  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR IGNORE INTO proxy_scope_rotation (scope, scope_id, strategy, cursor, updated_at) VALUES (?, ?, ?, 0, ?)"
  ).run(normalizedScope, rotationScopeId, DEFAULT_PROXY_ROTATION_STRATEGY, now);
  return {
    strategy: DEFAULT_PROXY_ROTATION_STRATEGY,
    cursor: 0,
    stickyWindowMinutes: 30,
    rotatedAt: null,
  };
}

// Indexes of the members not currently set aside by the proxy refusal memory, or null to
// keep the plain behavior: nothing set aside, every member set aside (an all-failed pool
// keeps today's selection and its #6246 fail-closed contract), or PROXY_SKIP_RECENTLY_FAILED
// off. The flag is read last, only when skipping would actually change the pick.
function eligibleMemberIndexes(candidates: unknown[]): number[] | null {
  if (!hasProxyRefusals()) return null;
  const eligible: number[] = [];
  candidates.forEach((row, index) => {
    if (!isProxyAvoided(proxyEgressKey(row))) eligible.push(index);
  });
  if (eligible.length === 0 || eligible.length === candidates.length) return null;
  return isProxySkipRecentlyFailedEnabled() ? eligible : null;
}

// True once the sticky window elapsed (or never started): the held member is due
// for rotation. Shared by the pre-rank bypass (held member served untouched) and
// the sticky branch below (advance on expiry) — same `state`, no extra DB read.
function isStickyExpired(state: { stickyWindowMinutes: number; rotatedAt: string | null }): boolean {
  const lastRotated = state.rotatedAt ? Date.parse(state.rotatedAt) : NaN;
  return !Number.isFinite(lastRotated) || Date.now() - lastRotated >= state.stickyWindowMinutes * 60_000;
}

// First eligible index at or after `start`, going round the pool.
function firstEligibleFrom(start: number, eligible: number[], size: number): number {
  for (let step = 0; step < size; step++) {
    const index = (start + step) % size;
    if (eligible.includes(index)) return index;
  }
  return start;
}

/** Health signals read from short-lived process memory, injectable for tests. */
export interface PoolRankSignals {
  isAvoided: (key: string | null) => boolean;
  probeHealth: (url: string) => boolean | null;
}

const DEFAULT_POOL_RANK_SIGNALS: PoolRankSignals = {
  isAvoided: isProxyAvoided,
  probeHealth: getCachedProxyHealth,
};

// Relay entries carry the relay URL in `host` and no dispatcher: not rankable.
const RELAY_TYPES = new Set(["vercel", "deno", "cloudflare"]);
// Same scheme defaults as proxyConfigToUrl() so the rebuilt URL hits the probe cache key.
const DEFAULT_PORTS: Record<string, string> = { http: "8080", https: "443", socks5: "1080" };

// Rebuild the probe URL for a pool row the way the dispatcher builds it
// (`proxyConfigToUrl`, read-only replica): scheme + encoded auth + host + port,
// with the `?family=` marker when set. Null when the row cannot egress.
function candidateProbeUrl(row: unknown): string | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) return null;
  const record = row as Record<string, unknown>;
  const host = typeof record.host === "string" ? record.host : "";
  if (!host) return null;
  const type = String(record.type || "http").toLowerCase();
  if (RELAY_TYPES.has(type) || !(type in DEFAULT_PORTS)) return null;
  const parsed = Number(record.port);
  const port =
    record.port && Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535
      ? String(parsed)
      : DEFAULT_PORTS[type];
  const bracketed = host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
  const username = typeof record.username === "string" ? record.username : "";
  const password = typeof record.password === "string" ? record.password : "";
  const auth =
    username || password ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : "";
  const family = typeof record.family === "string" ? record.family : "";
  const marker = family === "ipv4" || family === "ipv6" ? `?family=${family}` : "";
  return `${type}://${auth}${bracketed}:${port}${marker}`;
}

/**
 * Order pool candidates by crossed short-memory health signals without removing
 * anyone: a member just set aside ranks last, then a member whose last cached
 * probe verdict was negative. Unknown (no signal, unreconstructible URL) keeps
 * the current position order. Stable: health ties keep their relative order, so
 * an all-clear or all-set-aside pool returns its input order unchanged.
 */
export function rankPoolCandidates<T>(candidates: T[], signals?: Partial<PoolRankSignals>): T[] {
  if (candidates.length < 2) return [...candidates];
  const { isAvoided, probeHealth } = {
    ...DEFAULT_POOL_RANK_SIGNALS,
    isAvoided: signals?.isAvoided ?? DEFAULT_POOL_RANK_SIGNALS.isAvoided,
    probeHealth: signals?.probeHealth ?? DEFAULT_POOL_RANK_SIGNALS.probeHealth,
  };
  const scored = candidates.map((candidate, index) => {
    if (isAvoided(proxyEgressKey(candidate))) return { candidate, index, score: 2 };
    const url = candidateProbeUrl(candidate);
    if (url !== null && probeHealth(url) === false) return { candidate, index, score: 1 };
    return { candidate, index, score: 0 };
  });
  if (scored.every((entry) => entry.score === scored[0].score)) return [...candidates];
  return scored
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.candidate);
}

/**
 * Pick one member from an already-alive candidate list according to the scope's
 * rotation strategy. Assumes `candidates` is non-empty and ordered by position.
 * Round-robin uses (and persists) a monotonic cursor; random uses crypto.randomInt;
 * sticky holds the current member until its window elapses, then advances.
 * Members that just failed (see proxyRefusalMemory) are skipped while another member is
 * eligible; the cursor then advances past the member actually served.
 */
function pickFromCandidates<T>(
  db: ReturnType<typeof getDbInstance>,
  normalizedScope: string,
  rotationScopeId: string,
  candidates: T[]
): T {
  // Pool-exhausted check first: a single-member pool set aside is exhausted
  // too, and this runs before the length-1 early return below. Flag-gated
  // inside (zero cost when off), rebound window shared with the bridge.
  maybeEmitPoolExhausted(
    normalizedScope,
    candidates,
    (row) => proxyEgressKey(row),
    (key) => isProxyAvoided(key)
  );
  if (candidates.length === 1) return candidates[0];

  const state = getOrCreateRotationRow(db, normalizedScope, rotationScopeId);

  if (state.strategy === "sticky") {
    const expired = isStickyExpired(state);
    if (!expired) {
      const idx = ((state.cursor % candidates.length) + candidates.length) % candidates.length;
      const eligible = eligibleMemberIndexes(candidates);
      return candidates[eligible ? firstEligibleFrom(idx, eligible, candidates.length) : idx];
    }
  }

  // Order by crossed short-memory health signals (opt-in, PROXY_SKIP_RECENTLY_FAILED):
  // stops re-serving at the head a proxy that just failed, without removing anyone.
  // Sticky past its window and every other strategy rank normally; a held sticky
  // member returns above, untouched. The eligible-skip below still applies on the
  // ranked list, so a set-aside member stays skipped while another is eligible and
  // the cursor advances past the member actually served.
  // NOTE: ranking changes which member the persisted cursor lands on. After a
  // set-aside, the next pick serves the healthiest member at-or-after the cursor
  // (not the cursor member itself when it was set aside) — the cursor then
  // advances past the member served, preserving rotation without re-serving the
  // failed head first.
  const ranked = isProxySkipRecentlyFailedEnabled()
    ? rankPoolCandidates(candidates)
    : [...candidates];
  const eligible = eligibleMemberIndexes(ranked);

  if (state.strategy === "random") {
    // crypto.randomInt (unbiased, uniform in [0, length)) instead of Math.random —
    // CodeQL js/insecure-randomness flags Math.random flowing into the selected proxy's
    // credentials (a "security context"). Load-balancing selection is not a secret, but
    // crypto.randomInt silences the alert at the source and is unbiased (#6365 follow-up).
    if (eligible) return ranked[eligible[randomInt(eligible.length)]];
    return ranked[randomInt(ranked.length)];
  }

  if (state.strategy === "latency") {
    return pickByLatency(db, eligible ? eligible.map((index) => ranked[index]) : ranked);
  }

  if (state.strategy === "sticky") {
    const expired = isStickyExpired(state);
    let cursor = state.cursor;
    if (expired) {
      cursor = state.cursor + 1;
      db.prepare(
        "UPDATE proxy_scope_rotation SET cursor = ?, rotated_at = ?, updated_at = ? WHERE scope = ? AND scope_id IS ?"
      ).run(
        cursor,
        new Date().toISOString(),
        new Date().toISOString(),
        normalizedScope,
        rotationScopeId
      );
    }
    const idx = ((cursor % ranked.length) + ranked.length) % ranked.length;
    // A held member set aside is replaced for this pick only: no extra write.
    return ranked[eligible ? firstEligibleFrom(idx, eligible, ranked.length) : idx];
  }

  // round-robin (default): pick at the current cursor, then advance it monotonically,
  // past any member skipped so the next pick starts after the one actually served.
  const idx = ((state.cursor % ranked.length) + ranked.length) % ranked.length;
  const served = eligible ? firstEligibleFrom(idx, eligible, ranked.length) : idx;
  const skipped = (served - idx + ranked.length) % ranked.length;
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = ?, updated_at = ? WHERE scope = ? AND scope_id IS ?"
  ).run(state.cursor + skipped + 1, new Date().toISOString(), normalizedScope, rotationScopeId);
  return ranked[served];
}

// Fetch the alive, position-ordered candidate rows for a (scope, scope_id) pool.
// `scope_id` is matched with `IS` (NULL-safe); pass the query-level scope_id
// (connection id / provider / '__global__' / combo id) — global callers pass null
// to match the historical "any global row" behavior.
function fetchAlivePoolRows(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  scopeIdFilter: string | null,
  matchAnyScopeId: boolean
): JsonRecord[] {
  const baseSelect =
    "SELECT p.id, p.name, p.type, p.host, p.port, p.username, p.password, p.notes, p.family, a.position AS __pos, a.id AS __aid " +
    "FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = ? ";
  const order = " ORDER BY a.position ASC, a.id ASC";
  if (matchAnyScopeId) {
    return db
      .prepare(`${baseSelect}AND ${PROXY_ALIVE_PREDICATE}${order}`)
      .all(scope) as JsonRecord[];
  }
  return db
    .prepare(`${baseSelect}AND a.scope_id IS ? AND ${PROXY_ALIVE_PREDICATE}${order}`)
    .all(scope, scopeIdFilter) as JsonRecord[];
}

// A proxy is "alive" for resolution unless it has been explicitly marked dead
// (by an operator or a health check). Conservative: active/null/unknown stay
// usable so a working proxy is never stranded; only known-dead states are
// excluded so a dead proxy stops being handed out (every request would
// otherwise pay the timeout or leak out the host IP).
export const PROXY_ALIVE_PREDICATE =
  "(p.status IS NULL OR LOWER(p.status) NOT IN ('inactive','error','disabled','dead','down'))";

// Resolve one scope's alive pool to a single proxy via its rotation strategy.
// Returns the standard registry resolution shape, or null when the pool is empty
// or every member is dead (preserving the #6246 fail-closed contract — a dead
// pool never falls through to direct egress; the caller's guard blocks it).
function resolveScopePoolInternal(
  db: ReturnType<typeof getDbInstance>,
  scope: ProxyScope,
  levelId: string | null,
  options: { rotationScopeId: string; matchAnyScopeId?: boolean; scopeIdFilter?: string | null }
): ReturnType<typeof toRegistryProxyResolution> | null {
  const rows = fetchAlivePoolRows(
    db,
    scope,
    options.scopeIdFilter ?? null,
    options.matchAnyScopeId === true
  );
  if (rows.length === 0) return null;
  const picked = pickFromCandidates(db, scope, options.rotationScopeId, rows);
  return toRegistryProxyResolution(picked, scope, levelId);
}

export async function resolveProxyForConnectionFromRegistry(connectionId: string) {
  try {
    const db = getDbInstance();

    const account = resolveScopePoolInternal(db, "account", connectionId, {
      rotationScopeId: connectionId,
      scopeIdFilter: connectionId,
    });
    if (account) return account;

    const connection = db
      .prepare("SELECT provider FROM provider_connections WHERE id = ?")
      .get(connectionId) as { provider?: string } | undefined;

    if (connection?.provider) {
      const provider = resolveScopePoolInternal(db, "provider", connection.provider, {
        rotationScopeId: connection.provider,
        scopeIdFilter: connection.provider,
      });
      if (provider) return provider;
    }

    const global = resolveScopePoolInternal(db, "global", null, {
      rotationScopeId: normalizeRotationScopeId("global", null),
      matchAnyScopeId: true,
    });
    if (global) return global;

    return null;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}

export async function resolveProxyForScopeFromRegistry(scope: string, scopeId?: string | null) {
  try {
    const db = getDbInstance();
    const normalizedScope = normalizeScope(scope);

    if (normalizedScope === "global") {
      return resolveScopePoolInternal(db, "global", null, {
        rotationScopeId: normalizeRotationScopeId("global", null),
        matchAnyScopeId: true,
      });
    }

    const normalizedScopeId = scopeId || null;
    if (!normalizedScopeId) return null;

    return resolveScopePoolInternal(db, normalizedScope, normalizedScopeId, {
      rotationScopeId: normalizeRotationScopeId(normalizedScope, normalizedScopeId),
      scopeIdFilter: normalizedScopeId,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}
