/**
 * Selector switch trigger.
 *
 * Called fire-and-forget from `noteProxyOutcome` when a proxy member is newly
 * set aside (429). Never throws, never blocks the request path.
 *
 * Pre-DB guards (two-stage, synchronous, zero I/O when opted out):
 *   1. `isProxySkipRecentlyFailedEnabled()` OFF → return, nothing touched.
 *   2. process cache `anyControlUrlConfigured === false` → return, no DB read,
 *      no log, no fetch.
 *
 * Resolution: registry rows with a non-null `subscription_id` whose aligned
 * key equals the set-aside key, joined to subscriptions with a non-null
 * `control_url` → (subscriptionId, selector tag) pairs via re-parse of the
 * stored lines. No pair → `unmapped`. Shared entries across subscriptions
 * tie-break deterministically: `updated_at DESC, id ASC`, first pair served.
 *
 * Throttle: at most one switch per (subscriptionId, selector) per
 * `selector_min_gap_seconds` (clamped [0, 3600], default 60); excess events
 * return `throttled` silently.
 *
 * Cache freshness: `anyControlUrlConfigured` is maintained by the CRUD paths
 * that write `control_url` (`createSubscription`, `updateSubscription`,
 * `deleteSubscription`) and refreshed lazily (one read, then memoized until
 * the next CRUD write). DURABLE RULE for future writers: any new code path
 * that writes `control_url` MUST update this cache (or reset it to null so
 * the next trigger re-reads); direct SQL outside CRUD leaves a stale cache
 * until the next CRUD write or process restart — same philosophy as the
 * in-process refusal memory (not persisted). `syncSubscriptionUnsafe` (the
 * private body behind the public `syncSubscription` wrapper) never writes
 * `control_url`, so it is excluded.
 */

import { getDbInstance } from "../db/core";
import { decrypt } from "../db/encryption";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
import { parseSelectorTag } from "./selectorEndpoint";
import { getGroupMembers, switchSelector, type SelectorSwitchReason } from "./selectorClient";
import { isSelectorControlUrlAllowedAtFetchTime, resolveSelectorAllowlist } from "./selectorGuard";
import { recordSelectorSwitchOutcome } from "./subscriptionService";

export interface SelectorTriggerResult {
  switched: boolean;
  reason:
    | SelectorSwitchReason
    | "flag-off"
    | "no-control"
    | "throttled"
    | "unmapped"
    | "blocked"
    | "incomplete";
}

export const SELECTOR_MIN_GAP_DEFAULT_SECONDS = 60;
export const SELECTOR_MIN_GAP_MAX_SECONDS = 3600;

/** Clamp a gap value to [0, 3600]; null/undefined/""/NaN → 60. Never throws. */
export function clampSelectorGapSeconds(v: unknown): number {
  if (v === null || v === undefined || (typeof v === "string" && v.trim() === "")) {
    return SELECTOR_MIN_GAP_DEFAULT_SECONDS;
  }
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return SELECTOR_MIN_GAP_DEFAULT_SECONDS;
  return Math.min(SELECTOR_MIN_GAP_MAX_SECONDS, Math.max(0, Math.floor(n)));
}

export interface RegistryRowLike {
  type?: unknown;
  host?: unknown;
  port?: unknown;
  username?: unknown;
}

interface SelectorGuardResult {
  pass: boolean;
  reason?: "blocked";
}

/**
 * Align a `proxy_registry` row to the `proxyEgressKey` key space:
 * `scheme://user@lower(host-without-brackets):port` where a missing/invalid
 * port follows the upsert rule (https→443, else 8080) — NOT the probe default
 * (socks5→1080). `user` is the decoded username, password excluded — same as
 * the refusal memory. Returns null for unusable rows. Never throws.
 */
function decodeRowUser(rawUser: unknown): string {
  const s = String(rawUser ?? "");
  if (!s) return "";
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function resolveRegPort(port: unknown, scheme: string): number {
  const portNum = Number(port);
  if (Number.isFinite(portNum) && portNum > 0 && portNum <= 65535) return Math.floor(portNum);
  return scheme === "https" ? 443 : 8080;
}

function readRegistryParts(row: RegistryRowLike): { scheme: string; host: string } | null {
  const scheme = String((row as { type?: unknown }).type ?? "").toLowerCase();
  if (scheme !== "http" && scheme !== "https" && scheme !== "socks5") return null;
  const rawHost = String((row as { host?: unknown }).host ?? "").trim();
  if (!rawHost) return null;
  const bare = rawHost.startsWith("[") && rawHost.endsWith("]") ? rawHost.slice(1, -1) : rawHost;
  const host = bare.toLowerCase();
  if (!host) return null;
  return { scheme, host };
}

export function selectorRegistryKey(row: RegistryRowLike | null | undefined): string | null {
  try {
    if (!row || typeof row !== "object") return null;
    const parts = readRegistryParts(row);
    if (!parts) return null;
    const port = resolveRegPort((row as { port?: unknown }).port, parts.scheme);
    const user = decodeRowUser((row as { username?: unknown }).username);
    return `${parts.scheme}://${user}@${parts.host}:${port}`;
  } catch {
    return null;
  }
}

// ── process caches ──────────────────────────────────────────────

// null = unknown (lazy refresh on next trigger); true/false = memoized.
let anyControlUrlConfigured: boolean | null = null;
const lastSwitch = new Map<string, number>();

/** CRUD writers call this after changing `control_url` (add → true, remove → recompute). */
export function setAnyControlUrlConfigured(v: boolean | null): void {
  anyControlUrlConfigured = v;
}

/** Test-only reset (caches + throttle). */
export function __resetSelectorTriggerForTesting(): void {
  anyControlUrlConfigured = null;
  lastSwitch.clear();
}

/** Test-only cache seeding (avoids DB in unit tests). */
export function __setAnyControlUrlConfiguredForTesting(v: boolean | null): void {
  anyControlUrlConfigured = v;
}

function refreshControlUrlCache(): boolean {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT 1 AS hit FROM proxy_subscriptions WHERE control_url IS NOT NULL LIMIT 1")
      .get() as { hit?: unknown } | undefined;
    anyControlUrlConfigured = !!row;
    return anyControlUrlConfigured;
  } catch {
    return false;
  }
}

interface ResolveHit {
  subscriptionId: string;
  selector: string;
  controlUrl: string;
  secretEnc: string | null;
  gapSeconds: number;
}

function resolvePairs(setAsideKey: string): ResolveHit[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT p.id AS rid, p.type AS type, p.host AS host, p.port AS port, p.username AS username,
              p.subscription_id AS subscription_id, p.updated_at AS updated_at,
              s.control_url AS control_url, s.control_secret_enc AS control_secret_enc,
              s.selector_min_gap_seconds AS selector_min_gap_seconds,
              s.local_core_endpoint AS local_core_endpoint
         FROM proxy_registry p
         JOIN proxy_subscriptions s ON s.id = p.subscription_id
        WHERE p.subscription_id IS NOT NULL AND s.control_url IS NOT NULL
        ORDER BY datetime(p.updated_at) DESC, p.id ASC`
    )
    .all() as Array<Record<string, unknown>>;
  const hits: ResolveHit[] = [];
  for (const r of rows) {
    const key = selectorRegistryKey({
      type: r.type,
      host: r.host,
      port: r.port,
      username: r.username,
    });
    if (key !== setAsideKey) continue;
    const endpoint = typeof r.local_core_endpoint === "string" ? r.local_core_endpoint : null;
    if (!endpoint) continue;
    const want = normalizeRowTarget(r.host, r.port);
    if (!want) continue;
    const tag = findTagForRow(endpoint, want.host, want.port);
    if (!tag) continue; // pinned (no/invalid tag) → never switched
    hits.push({
      subscriptionId: String(r.subscription_id),
      selector: tag,
      controlUrl: String(r.control_url),
      secretEnc: typeof r.control_secret_enc === "string" ? r.control_secret_enc : null,
      gapSeconds: clampSelectorGapSeconds(r.selector_min_gap_seconds),
    });
  }
  return hits;
}

async function currentSelectorChoice(
  controlUrl: string,
  secret: string | null,
  selector: string
): Promise<string | null> {
  if (!secret) return null;
  try {
    const { current, reason } = await getGroupMembers(controlUrl, selector, { secret });
    return reason === "ok" ? current : null;
  } catch {
    return null;
  }
}

/**
 * Normalize a registry row's (host, port) to the same space as the parsed
 * endpoint lines: brackets stripped, host lowercased, missing/invalid port via
 * the upsert default for port-less entries (8080 — the upsert rule
 * `Number(coreUrl.port) || (https ? 443 : 8080)` for the only scheme that can
 * arrive port-less here, since `coreEndpoint` gates to loopback http/https/
 * socks5 and https loopback lines virtually always carry a port).
 * Symmetric with the line parser's `Number(u.port) || (https ? 443 : 8080)`
 * so a port-less line matches its row instead of NaN. Never throws.
 */
function normalizeRowTarget(host: unknown, port: unknown): { host: string; port: number } | null {
  try {
    const rawHost = String(host ?? "").trim();
    if (!rawHost) return null;
    const bare = rawHost.startsWith("[") && rawHost.endsWith("]") ? rawHost.slice(1, -1) : rawHost;
    const normHost = bare.toLowerCase();
    if (!normHost) return null;
    const portNum = Number(port);
    // NaN (NULL port) → upsert default 8080, symmetric with the line parser's
    // `Number(u.port) || (https ? 443 : 8080)` for port-less entries.
    const normPort =
      Number.isFinite(portNum) && portNum > 0 && portNum <= 65535 ? Math.floor(portNum) : 8080;
    return { host: normHost, port: normPort };
  } catch {
    return null;
  }
}

function findTagForRow(endpoint: string, wantHost: string, wantPort: number): string | null {
  const lines = endpoint
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  for (const line of lines) {
    const tag = parseSelectorTag(line);
    if (!tag) continue;
    const bare = line.replace(/[ \t]+selector=[^\s]+[ \t]*$/, "");
    try {
      const u = new URL(bare);
      const port = Number(u.port) || (u.protocol === "https:" ? 443 : 8080);
      if (u.hostname.toLowerCase() === wantHost && port === wantPort) return tag;
    } catch {
      continue;
    }
  }
  return null;
}

function isThrottled(
  hit: { subscriptionId: string; selector: string; gapSeconds: number },
  now: number
): boolean {
  const throttleKey = `${hit.subscriptionId} ${hit.selector}`;
  const last = lastSwitch.get(throttleKey);
  return typeof last === "number" && now - last < hit.gapSeconds * 1000;
}

async function passFetchTimeGuard(controlUrl: string): Promise<SelectorGuardResult> {
  const guard = await isSelectorControlUrlAllowedAtFetchTime(controlUrl, {
    allowlist: await resolveSelectorAllowlist(),
  });
  if (!guard.allowed) {
    console.warn(`[SelectorControl] control target blocked (${guard.reason})`);
    return { pass: false, reason: "blocked" };
  }
  return { pass: true };
}

function readSwitchSecret(secretEnc: string | null): string | null {
  try {
    const dec = decrypt(secretEnc);
    return typeof dec === "string" && dec.length > 0 ? dec : null;
  } catch {
    return null;
  }
}

async function runSwitch(
  hit: { controlUrl: string; selector: string; secretEnc: string | null; subscriptionId: string },
  setAsideKey: string,
  now: number
): Promise<SelectorTriggerResult> {
  const throttleKey = `${hit.subscriptionId} ${hit.selector}`;
  // Reserve the slot BEFORE the await: two concurrent triggers for the same
  // selector must collapse to a single control call (the loser reads the
  // reservation at the throttle check above). On failure the slot is handed
  // back so a later retry is not starved by a dead reservation.
  const prevSlot = lastSwitch.get(throttleKey);
  lastSwitch.set(throttleKey, now);
  const guarded = await passFetchTimeGuard(hit.controlUrl);
  if (!guarded.pass) {
    restoreSlot(throttleKey, prevSlot);
    await recordSelectorSwitchOutcome({
      subscriptionId: hit.subscriptionId,
      result: guarded.reason ?? "blocked",
    });
    return { switched: false, reason: guarded.reason };
  }
  // Single decrypt: the clear secret feeds both the live-choice read and the
  // switch below (no divergent state between two decrypt calls).
  const secret = readSwitchSecret(hit.secretEnc);
  if (!secret) {
    console.warn("[SelectorControl] no usable control secret; skipping switch");
    restoreSlot(throttleKey, prevSlot);
    await recordSelectorSwitchOutcome({
      subscriptionId: hit.subscriptionId,
      result: "incomplete",
    });
    return { switched: false, reason: "incomplete" };
  }
  // Avoid the live choice: the switch steers away from whichever member the
  // core currently serves (the set-aside member when it was current) and
  // still moves when names are opaque — the client excludes both the avoided
  // name and the current choice.
  const currentName = await currentSelectorChoice(hit.controlUrl, secret, hit.selector);
  const res = await switchSelector(
    {
      controlUrl: hit.controlUrl,
      secret,
      selector: hit.selector,
      avoidName: currentName ?? setAsideKey,
    },
    undefined
  );
  if (!res.switched) {
    console.warn(`[SelectorControl] switch skipped (${res.reason})`);
    restoreSlot(throttleKey, prevSlot);
    await recordSelectorSwitchOutcome({
      subscriptionId: hit.subscriptionId,
      result: res.reason,
    });
    return { switched: false, reason: res.reason };
  }
  await recordSelectorSwitchOutcome({
    subscriptionId: hit.subscriptionId,
    result: "ok",
    member: res.target ?? null,
  });
  return { switched: true, reason: "ok" };
}

/** Hand back a pre-reserved throttle slot after a failed switch attempt. */
function restoreSlot(throttleKey: string, prev: number | undefined): void {
  if (prev === undefined) lastSwitch.delete(throttleKey);
  else lastSwitch.set(throttleKey, prev);
}
/**
 * Maybe switch a selector group after a set-aside. Fire-and-forget entry:
 * never throws, never blocks. Guard 1 (flag) and guard 2 (cache) run before
 * any DB read.
 */
export async function maybeSwitchOnSetAside(
  setAsideKey: string,
  opts?: { nowMs?: number }
): Promise<SelectorTriggerResult> {
  try {
    if (!isProxySkipRecentlyFailedEnabled()) return { switched: false, reason: "flag-off" };
    if (anyControlUrlConfigured === false) {
      return { switched: false, reason: "no-control" };
    }
    if (anyControlUrlConfigured === null && !refreshControlUrlCache()) {
      return { switched: false, reason: "no-control" };
    }
    const pairs = resolvePairs(setAsideKey);
    if (pairs.length === 0) return { switched: false, reason: "unmapped" };
    // Deterministic tie-break: first pair in (updated_at DESC, id ASC) order.
    const hit = pairs[0]!;
    const now = typeof opts?.nowMs === "number" ? opts.nowMs : Date.now();
    if (isThrottled(hit, now)) {
      return { switched: false, reason: "throttled" };
    }
    return runSwitch(hit, setAsideKey, now);
  } catch {
    return { switched: false, reason: "network-error" };
  }
}
