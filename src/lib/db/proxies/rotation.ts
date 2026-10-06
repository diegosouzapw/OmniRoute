// Proxy scope pool rotation & alive-pool resolution (#6365).
//
// Extracted from ../proxies.ts (#7046 file-size follow-up): this module holds the
// rotation-strategy bookkeeping (cursor persistence, strategy normalization) and the
// read-only alive-pool resolution used by the registry proxy resolvers. It has no
// dependency back on ../proxies.ts — mutators that also need to bump the registry
// generation counter (addProxyToScopePool, removeProxyFromScopePool,
// setScopeRotationStrategy) stay in ../proxies.ts and import the pure helpers here.
import { isIP } from "node:net";
import { randomInt } from "crypto";
import { getDbInstance } from "../core";
import { pickByLatency } from "../proxyLatency";
import {
  hasProxyRefusals,
  isProxyAvoided,
  proxyEgressKey,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";
import { isEgressBucketedLockScope } from "@omniroute/open-sse/config/providerErrorRules.ts";
import { maybeEmitPoolExhausted } from "@/lib/proxyEvents/proxyTransitionBridge";
import {
  isProxySkipRecentlyFailedEnabled,
  isProxyPoolSharedEgressOrderEnabled,
} from "@/shared/utils/featureFlags";
import { getCachedProxyHealth } from "@/lib/proxyHealth";
import { getRecentEgressIpsForProxy } from "../proxyLogs";
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
function isStickyExpired(state: {
  stickyWindowMinutes: number;
  rotatedAt: string | null;
}): boolean {
  const lastRotated = state.rotatedAt ? Date.parse(state.rotatedAt) : NaN;
  return (
    !Number.isFinite(lastRotated) || Date.now() - lastRotated >= state.stickyWindowMinutes * 60_000
  );
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
  sharesHotEgress?: (candidate: unknown) => boolean;
}

const DEFAULT_POOL_RANK_SIGNALS: PoolRankSignals = {
  isAvoided: isProxyAvoided,
  probeHealth: getCachedProxyHealth,
};

// Relay entries carry the relay URL in `host` and no dispatcher: not rankable.
const RELAY_TYPES = new Set(["vercel", "deno", "cloudflare"]);
// Same scheme defaults as proxyConfigToUrl() so the rebuilt URL hits the probe cache key.
const DEFAULT_PORTS: Record<string, string> = { http: "8080", https: "443", socks5: "1080" };

function isRankableProxyType(type: string): boolean {
  return !RELAY_TYPES.has(type) && type in DEFAULT_PORTS;
}

function probePortForType(record: Record<string, unknown>, type: string): string {
  const parsed = Number(record.port);
  if (record.port && Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535) {
    return String(parsed);
  }
  return DEFAULT_PORTS[type];
}

function probeAuthPart(record: Record<string, unknown>): string {
  const username = typeof record.username === "string" ? record.username : "";
  const password = typeof record.password === "string" ? record.password : "";
  if (!username && !password) return "";
  return `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
}

function probeFamilyMarker(record: Record<string, unknown>): string {
  const family = typeof record.family === "string" ? record.family : "";
  return family === "ipv4" || family === "ipv6" ? `?family=${family}` : "";
}

function bracketIpv6Host(host: string): string {
  return host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
}

// Rebuild the probe URL for a pool row the way the dispatcher builds it
// (`proxyConfigToUrl`, read-only replica): scheme + encoded auth + host + port,
// with the `?family=` marker when set. Null when the row cannot egress.
function candidateProbeUrl(row: unknown): string | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) return null;
  const record = row as Record<string, unknown>;
  const host = typeof record.host === "string" ? record.host : "";
  if (!host) return null;
  const type = String(record.type || "http").toLowerCase();
  if (!isRankableProxyType(type)) return null;
  const port = probePortForType(record, type);
  const auth = probeAuthPart(record);
  const marker = probeFamilyMarker(record);
  return `${type}://${auth}${bracketIpv6Host(host)}:${port}${marker}`;
}

// Expand an IPv6 literal to its eight 16-bit groups, or null when malformed.
// `::` supplies the missing zero groups; anything else must list all eight.
function expandIpv6ToGroups(text: string): number[] | null {
  const halves = text.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves[1] ? halves[1].split(":") : [];
  if (halves.length === 1 && head.length !== 8) return null;
  if (halves.length === 2 && head.length + tail.length > 7) return null;
  if ([...head, ...tail].some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return null;
  const groups = [
    ...head.map((part) => parseInt(part, 16)),
    ...new Array(halves.length === 2 ? 8 - head.length - tail.length : 0).fill(0),
    ...tail.map((part) => parseInt(part, 16)),
  ];
  if (groups.length !== 8 || groups.some((group) => !Number.isInteger(group))) return null;
  return groups;
}

/**
 * Normalize an observed egress address for pool ranking: a whole IPv4 address
 * (`203.0.113.7`), an IPv4-mapped IPv6 form demapped to IPv4
 * (`::ffff:203.0.113.7`), or an IPv6 /64 prefix (`v6:2001:db8:1:0`) — members
 * behind one shared /64 consume one quota. Anything else (zone ids
 * `fe80::1%eth0`, unparseable input) gives null so the caller falls back to
 * today's order instead of guessing.
 */
export function normalizeEgressAddressForRanking(ip: unknown): string | null {
  if (typeof ip !== "string") return null;
  const text = ip.trim().toLowerCase();
  if (!text || text.includes("%")) return null;
  const mapped = text.startsWith("::ffff:") ? text.slice("::ffff:".length) : text;
  if (isIP(mapped) === 4) return mapped;
  if (isIP(text) !== 6) return null;
  const groups = expandIpv6ToGroups(text);
  if (groups === null) return null;
  return `v6:${groups
    .slice(0, 4)
    .map((group) => group.toString(16))
    .join(":")}`;
}

// Short-lived cache of the last observed egress address per pool entry point
// (same 30 s / 200-entry regime as the pool observation panel): keeps repeated
// picks from re-reading the journal row by row.
const HOT_EGRESS_CACHE_TTL_MS = 30_000;
const HOT_EGRESS_CACHE_MAX_ENTRIES = 200;

const hotEgressCache = new Map<string, { at: number; value: string | null }>();

function readHotEgressCache(key: string, nowMs: number): { hit: boolean; value: string | null } {
  const hit = hotEgressCache.get(key);
  if (!hit || nowMs - hit.at >= HOT_EGRESS_CACHE_TTL_MS) return { hit: false, value: null };
  return { hit: true, value: hit.value };
}

function writeHotEgressCache(key: string, value: string | null, nowMs: number): void {
  if (!hotEgressCache.has(key) && hotEgressCache.size >= HOT_EGRESS_CACHE_MAX_ENTRIES) {
    const oldest = hotEgressCache.keys().next().value;
    if (oldest !== undefined) hotEgressCache.delete(oldest);
  }
  hotEgressCache.set(key, { at: nowMs, value });
}

/** Test-only: forget the cached egress observations. */
export function __resetHotEgressCacheForTesting(): void {
  hotEgressCache.clear();
}

// Key a (host, port) couple exactly the way the journal reader does: trimmed,
// unbracketed, lower-cased host plus the validated port. Anything unusable maps
// to null so the reader below falls back to today's behavior.
function hotEgressCacheKey(row: unknown): string | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) return null;
  const record = row as Record<string, unknown>;
  const host = typeof record.host === "string" ? record.host.trim() : "";
  if (!host) return null;
  const unbracketed =
    host.startsWith("[") && host.endsWith("]") && host.length > 2 ? host.slice(1, -1).trim() : host;
  if (!unbracketed) return null;
  const port = Number(record.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
  return `${unbracketed.toLowerCase()}:${port}`;
}

// Observation window for the shared-egress ranking signal: an entry that
// showed two or more distinct egress addresses within the window is opaque
// (a gateway or core switching behind one port) and reads as unknown.
const EGRESS_RANKING_WINDOW_MS = 30 * 60_000;

// Last normalized egress address observed through a pool entry point, or null.
// Best-effort by design: a cold probe cache yields no observation and the caller
// keeps today's order. An entry that showed two or more distinct egress
// addresses within the window is opaque (a gateway or core switching behind
// one port): treated as unknown, never ranked.
function readNormalizedEgressForMember(row: unknown, nowMs: number): string | null {
  const record = row as Record<string, unknown>;
  const host = typeof record.host === "string" ? record.host : "";
  const port = Number(record.port);
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  const key = hotEgressCacheKey(row);
  if (key === null) return null;
  const cached = readHotEgressCache(key, nowMs);
  if (cached.hit) return cached.value;
  let value: string | null = null;
  try {
    const sinceIso = new Date(nowMs - EGRESS_RANKING_WINDOW_MS).toISOString();
    const observed = getRecentEgressIpsForProxy(host, port, sinceIso, 3);
    const distinct = new Set<string>();
    for (const ip of observed) {
      const normalized = normalizeEgressAddressForRanking(ip);
      if (normalized !== null) distinct.add(normalized);
    }
    // One value: that value. Zero or two-or-more: null — an entry that
    // showed two or more distinct egress addresses within the window is
    // opaque (a gateway or core switching behind one port): treated as
    // unknown, never ranked.
    value = distinct.size === 1 ? [...distinct][0] : null;
  } catch {
    value = null;
  }
  writeHotEgressCache(key, value, nowMs);
  return value;
}

/**
 * Predicate over pool candidates sharing a recently refused egress address,
 * for a provider whose quota is bucketed by egress address. Seeded only from
 * members the refusal memory currently sets aside (a refused member's observed
 * address is the hot one); an empty hot set, a provider outside the list, or
 * any read failure yields a predicate that is false for every candidate, so
 * the pool keeps today's order (order only, never exclude).
 */
export function buildHotEgressPredicate(
  provider: string | null | undefined,
  candidates: unknown[],
  signals?: Partial<PoolRankSignals>,
  nowMs: number = Date.now()
): (candidate: unknown) => boolean {
  const none = () => false;
  if (!isProxySkipRecentlyFailedEnabled()) return none;
  if (!isProxyPoolSharedEgressOrderEnabled()) return none;
  if (!isEgressBucketedLockScope(provider)) return none;
  if (!hasProxyRefusals()) return none;
  const isAvoided = signals?.isAvoided ?? DEFAULT_POOL_RANK_SIGNALS.isAvoided;
  const hot = new Set<string>();
  for (const row of candidates) {
    if (!isAvoided(proxyEgressKey(row))) continue;
    const egress = readNormalizedEgressForMember(row, nowMs);
    if (egress !== null) hot.add(egress);
  }
  if (hot.size === 0) return none;
  return (candidate: unknown) => {
    const egress = readNormalizedEgressForMember(candidate, nowMs);
    return egress !== null && hot.has(egress);
  };
}

/**
 * Order pool candidates by crossed short-memory health signals without removing
 * anyone: a member just set aside ranks last, then a member sharing a recently
 * refused egress address (per-address-quota providers only), then a member
 * whose last cached probe verdict was negative. Unknown (no signal,
 * unreconstructible URL) keeps the current position order. Stable: health ties
 * keep their relative order, so an all-clear or all-set-aside pool returns its
 * input order unchanged.
 */
export function rankPoolCandidates<T>(candidates: T[], signals?: Partial<PoolRankSignals>): T[] {
  if (candidates.length < 2) return [...candidates];
  const { isAvoided, probeHealth, sharesHotEgress } = {
    ...DEFAULT_POOL_RANK_SIGNALS,
    isAvoided: signals?.isAvoided ?? DEFAULT_POOL_RANK_SIGNALS.isAvoided,
    probeHealth: signals?.probeHealth ?? DEFAULT_POOL_RANK_SIGNALS.probeHealth,
    sharesHotEgress: signals?.sharesHotEgress ?? DEFAULT_POOL_RANK_SIGNALS.sharesHotEgress,
  };
  const scored = candidates.map((candidate, index) => {
    if (isAvoided(proxyEgressKey(candidate))) return { candidate, index, score: 3 };
    if (sharesHotEgress?.(candidate) === true) return { candidate, index, score: 2 };
    const url = candidateProbeUrl(candidate);
    if (url !== null && probeHealth(url) === false) return { candidate, index, score: 1 };
    return { candidate, index, score: 0 };
  });
  if (scored.every((entry) => entry.score === scored[0].score)) return [...candidates];
  return scored
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.candidate);
}

type RotationPickState = {
  strategy: ProxyRotationStrategy;
  cursor: number;
  stickyWindowMinutes: number;
  rotatedAt: string | null;
};

// A held sticky member is served untouched (replaced for this pick only when set
// aside): no extra write, no ranking. Returns undefined when not held.
function pickHeldStickyMember<T>(state: RotationPickState, candidates: T[]): T | undefined {
  if (state.strategy !== "sticky" || isStickyExpired(state)) return undefined;
  const idx = ((state.cursor % candidates.length) + candidates.length) % candidates.length;
  const eligible = eligibleMemberIndexes(candidates);
  return candidates[eligible ? firstEligibleFrom(idx, eligible, candidates.length) : idx];
}

// Order by crossed short-memory health signals (PROXY_SKIP_RECENTLY_FAILED, default on):
// stops re-serving at the head a proxy that just failed, without removing anyone.
// For providers whose quota is bucketed by egress address, a member sharing the
// refused member's observed address ranks just below healthy members (order only,
// never excluded).
// NOTE: ranking changes which member the persisted cursor lands on. After a
// set-aside, the next pick serves the healthiest member at-or-after the cursor
// (not the cursor member itself when it was set aside) — the cursor then
// advances past the member served, preserving rotation without re-serving the
// failed head first.
function rankCandidatesForPick<T>(candidates: T[], provider?: string | null): T[] {
  if (!isProxySkipRecentlyFailedEnabled()) return [...candidates];
  if (provider == null) return rankPoolCandidates(candidates);
  return rankPoolCandidates(candidates, {
    sharesHotEgress: buildHotEgressPredicate(provider, candidates),
  });
}

function pickRandomCandidate<T>(ranked: T[], eligible: number[] | null): T {
  // crypto.randomInt (unbiased, uniform in [0, length)) instead of Math.random —
  // CodeQL js/insecure-randomness flags Math.random flowing into the selected proxy's
  // credentials (a "security context"). Load-balancing selection is not a secret, but
  // crypto.randomInt silences the alert at the source and is unbiased (#6365 follow-up).
  if (eligible) return ranked[eligible[randomInt(eligible.length)]];
  return ranked[randomInt(ranked.length)];
}

function pickLatencyCandidate<T>(
  db: ReturnType<typeof getDbInstance>,
  ranked: T[],
  eligible: number[] | null
): T {
  return pickByLatency(db, eligible ? eligible.map((index) => ranked[index]) : ranked);
}

function pickStickyCandidate<T>(
  db: ReturnType<typeof getDbInstance>,
  state: RotationPickState,
  normalizedScope: string,
  rotationScopeId: string,
  ranked: T[],
  eligible: number[] | null
): T {
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
function pickRoundRobinCandidate<T>(
  db: ReturnType<typeof getDbInstance>,
  state: RotationPickState,
  normalizedScope: string,
  rotationScopeId: string,
  ranked: T[],
  eligible: number[] | null
): T {
  const idx = ((state.cursor % ranked.length) + ranked.length) % ranked.length;
  const served = eligible ? firstEligibleFrom(idx, eligible, ranked.length) : idx;
  const skipped = (served - idx + ranked.length) % ranked.length;
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = ?, updated_at = ? WHERE scope = ? AND scope_id IS ?"
  ).run(state.cursor + skipped + 1, new Date().toISOString(), normalizedScope, rotationScopeId);
  return ranked[served];
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
  candidates: T[],
  provider?: string | null
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

  const held = pickHeldStickyMember(state, candidates);
  if (held !== undefined) return held;

  // Sticky past its window and every other strategy rank normally; a held sticky
  // member returns above, untouched. The eligible-skip below still applies on the
  // ranked list, so a set-aside member stays skipped while another is eligible and
  // the cursor advances past the member actually served.
  const ranked = rankCandidatesForPick(candidates, provider);
  const eligible = eligibleMemberIndexes(ranked);

  if (state.strategy === "random") return pickRandomCandidate(ranked, eligible);
  if (state.strategy === "latency") return pickLatencyCandidate(db, ranked, eligible);
  if (state.strategy === "sticky") {
    return pickStickyCandidate(db, state, normalizedScope, rotationScopeId, ranked, eligible);
  }
  return pickRoundRobinCandidate(db, state, normalizedScope, rotationScopeId, ranked, eligible);
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

// Read-only view of a scope pool's alive candidate rows (same joined source as the
// selection path above): registry fields joined to assignments, alive-predicate
// applied, position order. Lets a read-only status screen rank the same rows the
// selector ranks, without embedding SQL in a route (Hard Rule #5).
export function getScopePoolEgressRows(scope: string, scopeIdFilter: string | null): JsonRecord[] {
  const db = getDbInstance();
  return fetchAlivePoolRows(db, scope, scopeIdFilter, scopeIdFilter === null);
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
  const picked = pickFromCandidates(
    db,
    scope,
    options.rotationScopeId,
    rows,
    resolvePoolProvider(db, scope, levelId, options)
  );
  return toRegistryProxyResolution(picked, scope, levelId);
}

// Which provider a pool pick serves, for the egress-aware ranking signal only.
// Provider scope already knows it; an account pool resolves its connection's
// provider with one bounded row (only reached when the signal guards already
// passed); combo and global pools serve several providers, so they abstain.
function resolvePoolProvider(
  db: ReturnType<typeof getDbInstance>,
  scope: ProxyScope,
  levelId: string | null,
  options: { rotationScopeId: string; matchAnyScopeId?: boolean; scopeIdFilter?: string | null }
): string | null {
  if (scope === "provider") return levelId;
  if (scope !== "account" || !options.scopeIdFilter) return null;
  if (
    !isProxySkipRecentlyFailedEnabled() ||
    !isProxyPoolSharedEgressOrderEnabled() ||
    !hasProxyRefusals()
  )
    return null;
  try {
    const row = db
      .prepare("SELECT provider FROM provider_connections WHERE id = ?")
      .get(options.scopeIdFilter) as { provider?: string } | undefined;
    return typeof row?.provider === "string" && row.provider ? row.provider : null;
  } catch {
    return null;
  }
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
