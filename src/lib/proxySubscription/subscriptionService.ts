/**
 * Proxy subscription service (Karing-style, operator-supplied).
 *
 * A subscription is a URL the operator pastes. We fetch + parse it into a pool
 * of proxy nodes, sync those nodes into `proxy_registry` (source='subscription',
 * subscription_id set), and bind the pool through the EXISTING scope resolution
 * (account/provider/global) — so subscriptions inherit rotation, health checks,
 * and the fail-closed guard for free.
 *
 * Modes:
 *   - 'global': pool bound to the global scope (all provider traffic proxied).
 *   - 'rule':   pool bound only to the selected provider scopes (others direct).
 *
 * Protocol support:
 *   - http/https/socks5 nodes are used directly.
 *   - ss/vmess/vless/trojan/tuic/hysteria/wireguard nodes need a local proxy
 *     core (sing-box/clash) exposing a SOCKS5/HTTP endpoint; supply it via
 *     `localCoreEndpoint` and we bind that single endpoint (the core does the
 *     protocol translation + node selection). Without it, those nodes are
 *     reported but not routed.
 */
import { randomUUID } from "crypto";
import { getDbInstance } from "../db/core";
import { backupDbFile } from "../db/backup";
import {
  addProxiesToScopePool,
  bumpProxyRegistryGeneration,
  deleteProxyById,
  upsertProxy,
} from "../db/proxies";
import { bumpProxyConfigGeneration } from "../db/settings";
import { isSubscriptionDue } from "./due";
import { isLocalCoreEndpointAllowed } from "./coreEndpoint";
import { resolveTargetScopes } from "./scopes";
import {
  isSubscriptionFetchUrlAllowed,
  isIpLiteral,
  isAnyResolvedAddressBlocked,
} from "./fetchGuard";
import { withRetry } from "./fetchRetry";
import { parseSubscription, redactedNodeSummary, type ParsedSubscription } from "./parse";

export type ProxySubscriptionMode = "global" | "rule";
export type ProxySubscriptionStatus = "ok" | "error" | "empty";

/** Stable, language-neutral error codes stored in the subscription `error`
 * column (as JSON) so the dashboard can localize them via i18n instead of
 * showing server-side strings. */
export type ProxySubscriptionErrorCode =
  | "LOCAL_CORE_ENDPOINT_INVALID"
  | "NEEDS_CORE_NOT_CONFIGURED"
  | "NO_USABLE_NODES";

/** Encode a user-facing error as `{ code, detail? }` for i18n on the client. */
export function subscriptionErrorCode(code: ProxySubscriptionErrorCode, detail?: string): string {
  return JSON.stringify(detail ? { code, detail } : { code });
}

export interface ProxySubscriptionRecord {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  mode: ProxySubscriptionMode;
  ruleProviders: string[] | null;
  localCoreEndpoint: string | null;
  updateIntervalMinutes: number;
  lastFetchedAt: string | null;
  status: ProxySubscriptionStatus;
  error: string | null;
  lastNodes: unknown[] | null;
  lastErrorAt: string | null;
  consecutiveFailures: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProxySubscriptionPayload {
  name: string;
  url: string;
  enabled?: boolean;
  mode?: ProxySubscriptionMode;
  ruleProviders?: string[] | null;
  localCoreEndpoint?: string | null;
  updateIntervalMinutes?: number;
}

export interface SyncResult {
  subscriptionId: string;
  nodes: number;
  needsCore: number;
  boundProxies: number;
  status: ProxySubscriptionStatus;
  error: string | null;
  applied: boolean;
}

const SUBSCRIPTION_FETCH_TIMEOUT_MS = 15_000;

// ───────────────────────────── Row mapping ─────────────────────────────

function mapSubscriptionRow(row: unknown): ProxySubscriptionRecord {
  const r = (row && typeof row === "object" ? row : {}) as Record<string, unknown>;
  const parseList = (v: unknown): string[] | null => {
    if (typeof v !== "string" || !v.trim()) return null;
    try {
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : null;
    } catch {
      return null;
    }
  };
  const parseNodes = (v: unknown): unknown[] | null => {
    if (typeof v !== "string" || !v.trim()) return null;
    try {
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr : null;
    } catch {
      return null;
    }
  };
  return {
    id: typeof r.id === "string" ? r.id : "",
    name: typeof r.name === "string" ? r.name : "",
    url: typeof r.url === "string" ? r.url : "",
    enabled: Number(r.enabled) !== 0,
    mode: r.mode === "rule" ? "rule" : "global",
    ruleProviders: parseList(r.rule_providers),
    localCoreEndpoint: typeof r.local_core_endpoint === "string" ? r.local_core_endpoint : null,
    updateIntervalMinutes: Number(r.update_interval_minutes) || 60,
    lastFetchedAt: typeof r.last_fetched_at === "string" ? r.last_fetched_at : null,
    status: (r.status as ProxySubscriptionStatus) || "empty",
    error: typeof r.error === "string" ? r.error : null,
    lastNodes: parseNodes(r.last_nodes),
    lastErrorAt: typeof r.last_error_at === "string" ? r.last_error_at : null,
    consecutiveFailures: Number(r.consecutive_failures) || 0,
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

// ───────────────────────────── CRUD ─────────────────────────────

export async function listSubscriptions(): Promise<ProxySubscriptionRecord[]> {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, last_fetched_at, status, error, last_nodes, last_error_at, consecutive_failures, created_at, updated_at FROM proxy_subscriptions ORDER BY datetime(updated_at) DESC, name ASC"
    )
    .all();
  return rows.map(mapSubscriptionRow);
}

export async function getSubscriptionById(id: string): Promise<ProxySubscriptionRecord | null> {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, last_fetched_at, status, error, last_nodes, last_error_at, consecutive_failures, created_at, updated_at FROM proxy_subscriptions WHERE id = ?"
    )
    .get(id);
  return row ? mapSubscriptionRow(row) : null;
}

export async function createSubscription(
  payload: ProxySubscriptionPayload
): Promise<ProxySubscriptionRecord> {
  const id = randomUUID();
  const now = new Date().toISOString();
  const enabled = payload.enabled === true ? 1 : 0;
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO proxy_subscriptions
      (id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'empty', ?, ?)`
  ).run(
    id,
    payload.name,
    payload.url,
    enabled,
    payload.mode || "global",
    payload.ruleProviders ? JSON.stringify(payload.ruleProviders) : null,
    payload.localCoreEndpoint || null,
    payload.updateIntervalMinutes || 60,
    now,
    now
  );
  const created = (await getSubscriptionById(id))!;
  if (created.enabled) {
    await syncSubscription(id);
  }
  // Re-read so the returned record reflects the post-sync status/error/lastNodes.
  return (await getSubscriptionById(id))!;
}

export async function updateSubscription(
  id: string,
  payload: Partial<ProxySubscriptionPayload>
): Promise<ProxySubscriptionRecord | null> {
  const existing = await getSubscriptionById(id);
  if (!existing) return null;
  const db = getDbInstance();
  const name = payload.name ?? existing.name;
  const url = payload.url ?? existing.url;
  const mode = payload.mode ?? existing.mode;
  const ruleProviders = payload.ruleProviders !== undefined ? payload.ruleProviders : existing.ruleProviders;
  const localCoreEndpoint =
    payload.localCoreEndpoint !== undefined ? payload.localCoreEndpoint : existing.localCoreEndpoint;
  const updateIntervalMinutes = payload.updateIntervalMinutes ?? existing.updateIntervalMinutes;
  const now = new Date().toISOString();

  const enabledChanged = payload.enabled !== undefined && payload.enabled !== existing.enabled;
  const enabled = payload.enabled !== undefined ? (payload.enabled ? 1 : 0) : existing.enabled ? 1 : 0;

  db.prepare(
    `UPDATE proxy_subscriptions
       SET name = ?, url = ?, enabled = ?, mode = ?, rule_providers = ?, local_core_endpoint = ?, update_interval_minutes = ?, updated_at = ?
     WHERE id = ?`
  ).run(
    name,
    url,
    enabled,
    mode,
    ruleProviders ? JSON.stringify(ruleProviders) : null,
    localCoreEndpoint || null,
    updateIntervalMinutes,
    now,
    id
  );

  const updated = (await getSubscriptionById(id))!;

  // Re-evaluate binding.
  if (updated.enabled) {
    if (payload.mode !== undefined || payload.ruleProviders !== undefined) {
      // Routing targets changed: detach from the old scopes first, then
      // re-fetch + bind to the new targets. applySubscription is idempotent per
      // scope, but a global→rule switch must drop the previous global binding.
      await unapplySubscription(id);
      await syncSubscription(id);
    } else if (
      enabledChanged ||
      payload.url !== undefined ||
      payload.localCoreEndpoint !== undefined
    ) {
      // Same scopes: just refresh nodes (re-applies idempotently to same scopes).
      await syncSubscription(id);
    }
  } else {
    // Disabled: detach everything.
    await unapplySubscription(id);
  }
  return getSubscriptionById(id);
}

export async function setSubscriptionEnabled(id: string, enabled: boolean): Promise<ProxySubscriptionRecord | null> {
  return updateSubscription(id, { enabled });
}

export async function deleteSubscription(id: string): Promise<boolean> {
  await unapplySubscription(id);
  // Remove subscription-sourced proxy rows (force-clears their assignments).
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ id: string }>;
  for (const r of rows) {
    try {
      await deleteProxyById(r.id, { force: true });
    } catch {
      // ignore individual failures
    }
  }
  const res = db.prepare("DELETE FROM proxy_subscriptions WHERE id = ?").run(id);
  await recomputeProxyEnabled();
  return res.changes > 0;
}

// ───────────────────────────── Scope resolution ─────────────────────────────

// ───────────────────────────── Sync + apply ─────────────────────────────

/**
 * Refuse to fetch a subscription URL unless it is http/https to a non-internal
 * host. IP literals are checked structurally; hostnames are resolved and the
 * resolved addresses are re-checked (fail closed on resolution errors). This
 * blocks SSRF to internal services / cloud metadata (169.254.169.254).
 */
async function assertSafeFetchTarget(url: string): Promise<void> {
  if (!isSubscriptionFetchUrlAllowed(url)) {
    throw new Error("Subscription URL is not allowed (scheme or host blocked)");
  }
  const host = new URL(url).hostname.toLowerCase();
  const bare = host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
  if (!isIpLiteral(bare)) {
    // Hostname: resolve ALL records and refuse if ANY address is internal
    // (fail closed). A hostname can resolve to multiple records; checking only
    // the first would let an internal IP slip through if a public record also
    // exists. `lookup(..., { all: true })` returns every A/AAAA record.
    try {
      const dns = await import("node:dns");
      const addrs = await dns.promises.lookup(bare, { all: true });
      if (isAnyResolvedAddressBlocked(addrs)) {
        throw new Error("Subscription host resolves to a blocked (internal) address");
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("blocked")) throw e;
      throw new Error(`Subscription host resolution failed: ${e instanceof Error ? e.message : e}`);
    }
  }
}

/**
 * Single fetch attempt: SSRF-validate the target, fetch with manual redirect
 * handling, and re-validate any redirect target. Throws on non-2xx or a
 * blocked target. Each attempt owns its own timeout so a retry after a fast
 * failure isn't killed by the previous attempt's timer.
 */
async function doSafeFetch(url: string, headers: Record<string, string>): Promise<string> {
  await assertSafeFetchTarget(url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBSCRIPTION_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: "manual", signal: controller.signal, headers });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new Error("Subscription fetch redirected without Location");
      // Resolve relative redirects and re-validate the target (SSRF guard).
      const next = new URL(loc, url).toString();
      await assertSafeFetchTarget(next);
      const res2 = await fetch(next, { redirect: "manual", signal: controller.signal, headers });
      if (res2.status >= 300 && res2.status < 400) {
        throw new Error("Subscription fetch: too many redirects");
      }
      if (!res2.ok) {
        throw new Error(`Subscription fetch failed: HTTP ${res2.status}`);
      }
      return await res2.text();
    }
    if (!res.ok) {
      throw new Error(`Subscription fetch failed: HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Classify a fetch error as retryable. Transient (retry): network/timeout/DNS
 * failures, HTTP 5xx, and HTTP 429. Permanent (no retry): 4xx client errors
 * (except 429) and any SSRF-guard block — those will never succeed on retry.
 */
function isSubscriptionFetchRetryable(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg.includes("not allowed") || msg.includes("blocked (internal)")) return false;
  const m = msg.match(/HTTP (\d{3})/);
  if (m) {
    const code = Number(m[1]);
    if (code === 429) return true;
    if (code >= 500 && code < 600) return true;
    return false; // 4xx (except 429) — permanent client error
  }
  return true; // network error / timeout / DNS failure — transient
}

async function fetchSubscriptionContent(url: string): Promise<string> {
  const headers = { "User-Agent": "OmniRoute-ProxySubscription" };
  // Retry transient failures (timeouts, 5xx, 429) with bounded exponential
  // backoff; give up fast on permanent errors (4xx, SSRF block).
  return withRetry(() => doSafeFetch(url, headers), {
    maxAttempts: 3,
    baseDelayMs: 500,
    maxDelayMs: 5000,
    isRetryable: isSubscriptionFetchRetryable,
  });
}

/** Fetch + parse + sync nodes into proxy_registry, then (if enabled) (re)bind. */
async function syncSubscriptionUnsafe(id: string): Promise<SyncResult> {
  const sub = await getSubscriptionById(id);
  if (!sub) {
    return { subscriptionId: id, nodes: 0, needsCore: 0, boundProxies: 0, status: "error", error: "not found", applied: false };
  }

  let body: string;
  try {
    body = await fetchSubscriptionContent(sub.url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const fetchConsec = (sub.consecutiveFailures || 0) + 1;
    await updateSubscriptionStatus(id, "error", `Fetch failed: ${msg}`, null, new Date().toISOString(), fetchConsec);
    return { subscriptionId: id, nodes: 0, needsCore: 0, boundProxies: 0, status: "error", error: msg, applied: false };
  }

  const parsed: ParsedSubscription = parseSubscription(body);
  const db = getDbInstance();

  const keptIds: string[] = [];
  let warning: string | null = null;

  // The upsert loop + stale-removal are the multi-write section. upsertProxy /
  // deleteProxyById each run their own internal db.transaction, so each write
  // is atomic, and a re-sync is idempotent (self-heals partial state). A single
  // outer db.transaction around `await` calls would NOT be atomic under
  // better-sqlite3, so instead we guard against an unexpected DB error so a
  // half-completed sync can never be left flagged "ok".
  try {
  // Directly-usable nodes → upsert into the registry as a pool.
  for (const node of parsed.nodes) {
    const upserted = await upsertProxy({
      name: node.name || `${sub.name} (${node.host}:${node.port})`,
      type: node.type,
      host: node.host,
      port: node.port,
      username: node.username,
      password: node.password,
      source: "subscription",
      subscriptionId: id,
      status: "active",
    });
    if (upserted.proxy?.id) keptIds.push(upserted.proxy.id);
  }

  // needsCore nodes → bind the operator-supplied local core endpoint (single).
  if (parsed.needsCore.length > 0) {
    if (sub.localCoreEndpoint && isLocalCoreEndpointAllowed(sub.localCoreEndpoint)) {
      try {
        const coreUrl = new URL(sub.localCoreEndpoint);
        const coreType = coreUrl.protocol === "https:" ? "https" : coreUrl.protocol === "socks5:" ? "socks5" : "http";
        const upserted = await upsertProxy({
          name: `${sub.name} (local core)`,
          type: coreType,
          host: coreUrl.hostname,
          port: Number(coreUrl.port) || (coreType === "https" ? 443 : 8080),
          username: coreUrl.username ? decodeURIComponent(coreUrl.username) : undefined,
          password: coreUrl.password ? decodeURIComponent(coreUrl.password) : undefined,
          source: "subscription",
          subscriptionId: id,
          status: "active",
        });
        if (upserted.proxy?.id) keptIds.push(upserted.proxy.id);
      } catch {
        warning = subscriptionErrorCode("LOCAL_CORE_ENDPOINT_INVALID");
      }
    } else {
      const nodes = parsed.needsCore
        .map((n) => `${n.rawProtocol}://${n.host ?? ""}${n.port ? ":" + n.port : ""}`)
        .join(", ");
      warning = subscriptionErrorCode("NEEDS_CORE_NOT_CONFIGURED", nodes);
    }
  }

  // Remove stale subscription nodes no longer present in the fetched set.
  if (keptIds.length > 0) {
    const placeholders = keptIds.map(() => "?").join(",");
    const stale = db
      .prepare(`SELECT id FROM proxy_registry WHERE subscription_id = ? AND id NOT IN (${placeholders})`)
      .all(id, ...keptIds) as Array<{ id: string }>;
    for (const r of stale) {
      try {
        await deleteProxyById(r.id, { force: true });
      } catch {
        // ignore
      }
    }
  } else {
    const stale = db
      .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
      .all(id) as Array<{ id: string }>;
    for (const r of stale) {
      try {
        await deleteProxyById(r.id, { force: true });
      } catch {
        // ignore
      }
    }
  }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const writeConsec = (sub.consecutiveFailures || 0) + 1;
    await updateSubscriptionStatus(id, "error", `Sync write failed: ${msg}`, null, new Date().toISOString(), writeConsec);
    return { subscriptionId: id, nodes: 0, needsCore: 0, boundProxies: 0, status: "error", error: msg, applied: false };
  }

  const lastNodes = redactedNodeSummary(parsed);

  // Determine status.
  let status: ProxySubscriptionStatus;
  let error: string | null = warning;
  if (keptIds.length === 0) {
    status = "error";
    error = warning || subscriptionErrorCode("NO_USABLE_NODES");
  } else if (warning) {
    status = "ok";
  } else {
    status = parsed.nodes.length === 0 && parsed.needsCore.length === 0 ? "empty" : "ok";
  }

  // Reset the consecutive-failure counter on a successful (ok/empty) sync; bump
  // it on error. Record the error timestamp only when there is an error.
  const isErr = status === "error";
  const newConsec = isErr ? (sub.consecutiveFailures || 0) + 1 : 0;
  const errAt = isErr ? new Date().toISOString() : null;
  await updateSubscriptionStatus(id, status, error, lastNodes, errAt, newConsec);

  // Bind if enabled.
  let applied = false;
  let boundProxies = 0;
  if (sub.enabled && keptIds.length > 0) {
    await applySubscription(id);
    applied = true;
    boundProxies = keptIds.length;
  }

  // Ensure the background auto-refresh ticker is running once any subscription
  // has actually synced. startSubscriptionScheduler is idempotent and a no-op
  // in the browser and in NODE_ENV=test.
  startSubscriptionScheduler();

  return {
    subscriptionId: id,
    nodes: parsed.nodes.length,
    needsCore: parsed.needsCore.length,
    boundProxies,
    status,
    error,
    applied,
  };
}

// Deduplicate concurrent syncs for the same subscription. A manual refresh and
// the scheduled ticker can otherwise fire `syncSubscription` for the same id at
// the same time and race on the upsert / stale-removal writes.
const syncInFlight = new Map<string, Promise<SyncResult>>();

/** Public entry point: de-dupes concurrent syncs, then runs the unsafe body. */
export async function syncSubscription(id: string): Promise<SyncResult> {
  const existing = syncInFlight.get(id);
  if (existing) return existing;
  const run = syncSubscriptionUnsafe(id).finally(() => {
    syncInFlight.delete(id);
  });
  syncInFlight.set(id, run);
  return run;
}

async function updateSubscriptionStatus(
  id: string,
  status: ProxySubscriptionStatus,
  error: string | null,
  lastNodes: unknown[] | null,
  lastErrorAt: string | null,
  consecutiveFailures: number
): Promise<void> {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE proxy_subscriptions SET status = ?, error = ?, last_nodes = ?, last_fetched_at = ?, last_error_at = ?, consecutive_failures = ?, updated_at = ? WHERE id = ?`
  ).run(
    status,
    error,
    lastNodes ? JSON.stringify(lastNodes) : null,
    now,
    lastErrorAt,
    consecutiveFailures,
    now,
    id
  );
}

/** Bind the subscription's synced proxy pool into the target scope(s). */
export async function applySubscription(id: string): Promise<void> {
  const sub = await getSubscriptionById(id);
  if (!sub || !sub.enabled) return;

  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ? AND status != 'error'")
    .all(id) as Array<{ id: string }>;
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) return;

  const targets = resolveTargetScopes(sub);
  for (const t of targets) {
    // Add the whole subscription pool to this scope in one batched, idempotent
    // write (preserves any manual proxies already in the pool).
    await addProxiesToScopePool(t.scope, t.scopeId, ids);
  }

  await setProxyEnabledFlag(true);
}

/** Remove the subscription's proxies from their bound scope(s). */
export async function unapplySubscription(id: string): Promise<void> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ id: string }>;

  // Detach every subscription proxy from ALL scopes in one batched delete.
  // Replaces the previous per-proxy getProxyWhereUsed + removeProxyFromScopePool
  // loop (N+1 queries) — the subscription's proxies must leave every pool they
  // were added to, regardless of which scope resolved them.
  const ids = rows.map((r) => r.id);
  if (ids.length > 0) {
    const placeholders = ids.map(() => "?").join(",");
    const res = db
      .prepare(`DELETE FROM proxy_assignments WHERE proxy_id IN (${placeholders})`)
      .run(...ids);
    if (res.changes > 0) {
      backupDbFile("pre-write");
      bumpProxyRegistryGeneration();
    }
  }

  await recomputeProxyEnabled();
}

// ───────────────────────────── proxyEnabled flag ─────────────────────────────

async function hasNonSubscriptionGlobalProxy(): Promise<boolean> {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT 1 FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' AND (p.subscription_id IS NULL OR p.subscription_id = '') LIMIT 1"
    )
    .get();
  return !!row;
}

async function recomputeProxyEnabled(): Promise<void> {
  const db = getDbInstance();
  // Must check for an ACTUALLY BOUND subscription proxy, not just an enabled
  // subscription row: unapplySubscription() detaches proxy_assignments without
  // touching `enabled`, so a bare `enabled = 1` check would leave the flag
  // permanently stuck on `true` after an unapply/disable cycle even though
  // nothing is bound anymore (resolveProxyForConnectionFromRegistry correctly
  // returns null, but the operator-facing proxyEnabled flag would lie).
  const enabledSubWithBoundProxy = db
    .prepare(
      `SELECT 1 FROM proxy_subscriptions s
       JOIN proxy_registry p ON p.subscription_id = s.id
       JOIN proxy_assignments a ON a.proxy_id = p.id
       WHERE s.enabled = 1
       LIMIT 1`
    )
    .get();
  const shouldEnable = !!enabledSubWithBoundProxy || (await hasNonSubscriptionGlobalProxy());
  await setProxyEnabledFlag(shouldEnable);
}

async function setProxyEnabledFlag(value: boolean): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'proxyEnabled', ?)"
  ).run(JSON.stringify(value));
  bumpProxyConfigGeneration();
}

// ───────────────────────────── Auto-refresh scheduler ─────────────────────────────

let schedulerStarted = false;
let schedulerTimer: ReturnType<typeof setInterval> | null = null;

/** Start a background ticker that refreshes enabled subscriptions on their interval. */
export function startSubscriptionScheduler(): void {
  if (schedulerStarted) return;
  if (typeof window !== "undefined") return; // never in the browser
  if (process.env.NODE_ENV === "test") return; // no timers during tests
  schedulerStarted = true;

  const tick = async () => {
    try {
      const subs = await listSubscriptions();
      const now = Date.now();
      for (const s of subs) {
        if (!isSubscriptionDue(s, now)) continue;
        try {
          await syncSubscription(s.id);
        } catch (e) {
          console.warn(`[ProxySubscription] refresh failed for ${s.id}: ${e instanceof Error ? e.message : e}`);
        }
      }
    } catch (e) {
      console.warn(`[ProxySubscription] scheduler tick error: ${e instanceof Error ? e.message : e}`);
    }
  };

  // Check every minute; each subscription self-throttles by its interval.
  schedulerTimer = setInterval(tick, 60_000);
  if (typeof schedulerTimer.unref === "function") schedulerTimer.unref();
}

export function stopSubscriptionScheduler(): void {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
  }
  schedulerStarted = false;
}
