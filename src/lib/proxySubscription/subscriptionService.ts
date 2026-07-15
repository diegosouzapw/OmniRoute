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
import {
  addProxyToScopePool,
  assignProxyToScope,
  deleteProxyById,
  getProxyWhereUsed,
  removeProxyFromScopePool,
  upsertProxy,
} from "../db/proxies";
import { bumpProxyConfigGeneration } from "../db/settings";
import { isSubscriptionDue } from "./due";
import { isLocalCoreEndpointAllowed } from "./coreEndpoint";
import { resolveTargetScopes } from "./scopes";
import {
  isSubscriptionFetchUrlAllowed,
  isIpv4Blocked,
  isIpv6Blocked,
  isIpLiteral,
} from "./fetchGuard";
import { parseSubscription, redactedNodeSummary, type ParsedSubscription } from "./parse";

export type ProxySubscriptionMode = "global" | "rule";
export type ProxySubscriptionStatus = "ok" | "error" | "empty";

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
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

// ───────────────────────────── CRUD ─────────────────────────────

export async function listSubscriptions(): Promise<ProxySubscriptionRecord[]> {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, last_fetched_at, status, error, last_nodes, created_at, updated_at FROM proxy_subscriptions ORDER BY datetime(updated_at) DESC, name ASC"
    )
    .all();
  return rows.map(mapSubscriptionRow);
}

export async function getSubscriptionById(id: string): Promise<ProxySubscriptionRecord | null> {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, last_fetched_at, status, error, last_nodes, created_at, updated_at FROM proxy_subscriptions WHERE id = ?"
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
    // Hostname: resolve and refuse if any address is internal (fail closed).
    try {
      const dns = await import("node:dns");
      const { address, family } = await dns.promises.lookup(bare);
      const blocked = family === 6 ? isIpv6Blocked(address) : isIpv4Blocked(address);
      if (blocked) throw new Error("Subscription host resolves to a blocked (internal) address");
    } catch (e) {
      if (e instanceof Error && e.message.includes("blocked")) throw e;
      throw new Error(`Subscription host resolution failed: ${e instanceof Error ? e.message : e}`);
    }
  }
}

async function fetchSubscriptionContent(url: string): Promise<string> {
  await assertSafeFetchTarget(url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBSCRIPTION_FETCH_TIMEOUT_MS);
  try {
    const headers = { "User-Agent": "OmniRoute-ProxySubscription" };
    const res = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers,
    });
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
    await updateSubscriptionStatus(id, "error", `Fetch failed: ${msg}`, null);
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
        warning = "本地内核端点格式无效，已忽略 SS/VMess/Trojan/VLESS 节点。";
      }
    } else {
      warning = parsed.needsCore
        .map((n) => `${n.rawProtocol}://${n.host ?? ""}${n.port ? ":" + n.port : ""}`)
        .join(", ");
      warning = `订阅包含需本地内核的节点（${warning}）。配置“本地内核 SOCKS5 端点”后即可使用，当前这些节点未被路由。`;
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
    await updateSubscriptionStatus(id, "error", `Sync write failed: ${msg}`, null);
    return { subscriptionId: id, nodes: 0, needsCore: 0, boundProxies: 0, status: "error", error: msg, applied: false };
  }

  const lastNodes = redactedNodeSummary(parsed);

  // Determine status.
  let status: ProxySubscriptionStatus;
  let error: string | null = warning;
  if (keptIds.length === 0) {
    status = "error";
    error = warning || "订阅未解析出任何可用节点（http/https/socks5 或带本地内核端点的 SS/VMess 等）。";
  } else if (warning) {
    status = "ok";
  } else {
    status = parsed.nodes.length === 0 && parsed.needsCore.length === 0 ? "empty" : "ok";
  }

  await updateSubscriptionStatus(id, status, error, lastNodes);

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
  lastNodes: unknown[] | null
): Promise<void> {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE proxy_subscriptions SET status = ?, error = ?, last_nodes = ?, last_fetched_at = ?, updated_at = ? WHERE id = ?`
  ).run(status, error, lastNodes ? JSON.stringify(lastNodes) : null, now, now, id);
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
    // Add each subscription proxy to the existing pool (preserves manual proxies).
    for (const pid of ids) {
      await addProxyToScopePool(t.scope, t.scopeId, pid);
    }
  }

  await setProxyEnabledFlag(true);
}

/** Remove the subscription's proxies from their bound scope(s). */
export async function unapplySubscription(id: string): Promise<void> {
  const sub = await getSubscriptionById(id);
  const targets = sub ? resolveTargetScopes(sub) : [];

  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ id: string }>;

  for (const r of rows) {
    // Remove from every scope this proxy is assigned to.
    const used = await getProxyWhereUsed(r.id);
    for (const a of used.assignments) {
      await removeProxyFromScopePool(a.scope, a.scopeId, r.id);
    }
    // Also clear from target scopes (in case getProxyWhereUsed missed anything).
    for (const t of targets) {
      try {
        await removeProxyFromScopePool(t.scope, t.scopeId, r.id);
      } catch {
        // ignore
      }
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
  const enabledSubs = db
    .prepare("SELECT 1 FROM proxy_subscriptions WHERE enabled = 1 LIMIT 1")
    .get();
  const shouldEnable = !!enabledSubs || (await hasNonSubscriptionGlobalProxy());
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
