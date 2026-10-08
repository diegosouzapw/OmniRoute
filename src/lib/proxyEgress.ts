/**
 * Proxy Egress IP visibility.
 *
 * The proxy logs already capture the INBOUND client IP (x-forwarded-for), but
 * NOT the OUTBOUND/egress IP — the address the upstream actually sees. For
 * rotating providers (codex/openai) this is critical: when several accounts
 * egress through the SAME IP at high volume, the provider flags it as anomaly
 * and revokes the tokens ("Your authentication token has been invalidated").
 *
 * This module resolves the real egress IP (via an echo-IP service through the
 * resolved proxy/dispatcher) and detects same-rotation-group accounts sharing
 * an egress IP, so the operator can confirm exactly which IP each account is
 * entering and leaving by.
 */
import { request as undiciRequest } from "undici";
import {
  createProxyDispatcher,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";
import { probeEchoTargets } from "./proxyEchoTarget";

const EGRESS_PROBE_TIMEOUT_MS = 6000;
const EGRESS_CACHE_TTL_MS = 5 * 60 * 1000;

export interface EgressProbeResult {
  ip: string | null;
  latencyMs: number;
  error?: string;
}

export type EgressProbe = (proxyUrl: string | null) => Promise<EgressProbeResult>;

const egressCache = new Map<string, { ip: string | null; at: number }>();

async function defaultEgressProbe(proxyUrl: string | null): Promise<EgressProbeResult> {
  const start = Date.now();
  try {
    const dispatcher = proxyUrl ? createProxyDispatcher(proxyUrl) : undefined;
    // #9694: each echo target gets its own controller, so exhausting the budget
    // on an unreachable IPv6-first target does not abort the IPv4 attempt.
    const { result: text } = await probeEchoTargets(async (url, timeoutMs) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await undiciRequest(url, {
          method: "GET",
          dispatcher,
          signal: controller.signal,
          headersTimeout: timeoutMs,
          bodyTimeout: timeoutMs,
        });
        return await res.body.text();
      } finally {
        clearTimeout(timeout);
      }
    }, EGRESS_PROBE_TIMEOUT_MS);
    let ip: string | null = null;
    try {
      ip = (JSON.parse(text) as { ip?: string }).ip ?? null;
    } catch {
      // non-JSON body — leave ip null
    }
    return { ip, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      ip: null,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

let probe: EgressProbe = defaultEgressProbe;

/** Test seam: override the network probe. */
export function _setEgressProbeForTests(fn: EgressProbe | null): void {
  probe = fn ?? defaultEgressProbe;
}

export function clearEgressCache(): void {
  egressCache.clear();
}

/**
 * Synchronous read of the cached egress IP for a proxy URL (null = direct).
 * Non-blocking — used by the request hot path to log the egress IP without an
 * echo-IP round-trip. Returns null if not yet probed.
 */
export function getCachedEgressIp(proxyUrl: string | null): string | null {
  const key = proxyUrl ?? "__direct__";
  const cached = egressCache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.at >= EGRESS_CACHE_TTL_MS) {
    egressCache.delete(key);
    return null;
  }
  return cached.ip;
}

const warmingInFlight = new Set<string>();

/**
 * Fire-and-forget: populate the egress cache for a proxy URL in the background
 * so subsequent proxy log lines carry the real egress IP. Deduped per URL.
 */
export function warmEgressIp(proxyUrl: string | null): void {
  const key = proxyUrl ?? "__direct__";
  if (warmingInFlight.has(key) || getCachedEgressIp(proxyUrl) !== null) return;
  warmingInFlight.add(key);
  void resolveEgressIp(proxyUrl)
    .catch(() => undefined)
    .finally(() => warmingInFlight.delete(key));
}

/**
 * Resolve the egress IP for a given proxy URL (null = direct/host IP).
 * Cached per proxyUrl to avoid an echo-IP round-trip on every call.
 */
export async function resolveEgressIp(
  proxyUrl: string | null,
  opts: { cacheTtlMs?: number; force?: boolean } = {}
): Promise<EgressProbeResult & { cached: boolean }> {
  const key = proxyUrl ?? "__direct__";
  const ttl = opts.cacheTtlMs ?? EGRESS_CACHE_TTL_MS;
  const cached = egressCache.get(key);
  if (!opts.force && cached && Date.now() - cached.at < ttl) {
    return { ip: cached.ip, latencyMs: 0, cached: true };
  }
  const result = await probe(proxyUrl);
  egressCache.set(key, { ip: result.ip, at: Date.now() });
  return { ...result, cached: false };
}

export interface ConnectionEgress {
  connectionId: string;
  provider: string;
  account: string | null;
  proxyLevel: string;
  proxyHost: string | null;
  egressIp: string | null;
  error?: string;
}

export interface EgressSharingWarning {
  egressIp: string;
  rotationGroup: string;
  connections: string[]; // connectionId/account labels sharing this IP within one rotation group
}

export interface EgressDiagnostic {
  connections: ConnectionEgress[];
  byEgressIp: Record<string, string[]>;
  sharedWithinRotationGroup: EgressSharingWarning[];
}

/**
 * PURE: group egress results by IP and flag IPs shared by ≥2 accounts of the
 * SAME rotation group (codex+openai share one Auth0 family — the exact
 * condition that triggers anomaly revocation). Direct/unknown IPs are reported
 * but only same-group sharing is a warning.
 */
export function analyzeEgressSharing(connections: ConnectionEgress[]): {
  byEgressIp: Record<string, string[]>;
  sharedWithinRotationGroup: EgressSharingWarning[];
} {
  const byEgressIp: Record<string, string[]> = {};
  // ip -> rotationGroup -> labels
  const byIpGroup = new Map<string, Map<string, string[]>>();

  for (const c of connections) {
    if (!c.egressIp) continue;
    const label = c.account || c.connectionId;
    (byEgressIp[c.egressIp] ??= []).push(label);

    const group = rotationGroupFor(c.provider) || `provider:${c.provider}`;
    let groups = byIpGroup.get(c.egressIp);
    if (!groups) {
      groups = new Map();
      byIpGroup.set(c.egressIp, groups);
    }
    const list = groups.get(group) ?? [];
    list.push(label);
    groups.set(group, list);
  }

  const sharedWithinRotationGroup: EgressSharingWarning[] = [];
  for (const [egressIp, groups] of byIpGroup) {
    for (const [rotationGroup, labels] of groups) {
      if (labels.length >= 2) {
        sharedWithinRotationGroup.push({ egressIp, rotationGroup, connections: labels });
      }
    }
  }

  return { byEgressIp, sharedWithinRotationGroup };
}

export const EGRESS_SHARING_WINDOW_MS = 24 * 60 * 60 * 1000;

export interface EgressLogRow {
  provider: string | null;
  account: string | null;
  connectionId: string | null;
  egressIp: string | null;
}

export interface EgressSharingSummary {
  windowStart: string;
  windowEnd: string;
  distinctEgressIps: number;
  sharingByRotationGroup: Array<{
    rotationGroup: string;
    sharedIps: number;
    maxAccountsSharingOneIp: number;
  }>;
  maxAccountsSharingOneIp: number;
}

/**
 * PURE: anonymous egress-IP sharing summary over proxy_logs-shaped rows.
 * Dedupes per connection (proxy_logs holds one row per request, not per
 * connection) — "max accounts behind one IP" therefore counts connections,
 * not distinct accounts, when one account spans several connections. Reuses
 * analyzeEgressSharing's rotation-group semantics and returns counts only —
 * no IP literals, no account identities (#10348).
 */
export function summarizeEgressSharing(
  rows: EgressLogRow[],
  window: { start: string; end: string }
): { summary: EgressSharingSummary; warnings: EgressSharingWarning[] } {
  const byAccount = new Map<string, EgressLogRow>();
  for (const r of rows) {
    if (!r.egressIp) continue;
    const key = r.connectionId ?? r.account;
    if (!key) continue;
    if (!byAccount.has(key)) byAccount.set(key, r);
  }

  const connections = [...byAccount.values()].map((r) => ({
    connectionId: r.connectionId ?? r.account ?? "unknown",
    provider: r.provider ?? "",
    account: r.account ?? r.connectionId,
    proxyLevel: "log",
    proxyHost: null,
    egressIp: r.egressIp,
  }));

  const { byEgressIp, sharedWithinRotationGroup } = analyzeEgressSharing(connections);

  const byGroup = new Map<string, { sharedIps: number; maxAccountsSharingOneIp: number }>();
  let maxAccountsSharingOneIp = 0;
  for (const w of sharedWithinRotationGroup) {
    const g = byGroup.get(w.rotationGroup) ?? { sharedIps: 0, maxAccountsSharingOneIp: 0 };
    g.sharedIps++;
    g.maxAccountsSharingOneIp = Math.max(g.maxAccountsSharingOneIp, w.connections.length);
    byGroup.set(w.rotationGroup, g);
    maxAccountsSharingOneIp = Math.max(maxAccountsSharingOneIp, w.connections.length);
  }

  return {
    summary: {
      windowStart: window.start,
      windowEnd: window.end,
      distinctEgressIps: Object.keys(byEgressIp).length,
      sharingByRotationGroup: [...byGroup.entries()].map(([rotationGroup, v]) => ({
        rotationGroup,
        sharedIps: v.sharedIps,
        maxAccountsSharingOneIp: v.maxAccountsSharingOneIp,
      })),
      maxAccountsSharingOneIp,
    },
    // Raw warnings carry IPs and labels — only ever rendered behind the
    // PROXY_LOG_INCLUDE_IPS opt-in (#10348), never in the summary itself.
    warnings: sharedWithinRotationGroup,
  };
}

/**
 * DB-backed: anonymous egress-sharing summary over the last
 * EGRESS_SHARING_WINDOW_MS of persisted proxy_logs (egress_ip is always
 * persisted even when the process log line is redacted). No live probes.
 * Single place where proxy_logs rows are mapped to EgressLogRow — the sweep
 * and the route both consume this helper. Reads all rows in the window (the
 * existing SELECT * has no LIMIT); bounded by the 24h window.
 */
export async function getRecentEgressSharingSummary(): Promise<{
  summary: EgressSharingSummary;
  warnings: EgressSharingWarning[];
}> {
  const { exportProxyLogsSince } = await import("./db/proxyLogs");
  const end = new Date();
  const start = new Date(end.getTime() - EGRESS_SHARING_WINDOW_MS);
  const rows: EgressLogRow[] = exportProxyLogsSince(start.toISOString()).map((r) => ({
    provider: (r.provider as string | null) ?? null,
    account: (r.account as string | null) ?? null,
    connectionId: (r.connection_id as string | null) ?? null,
    egressIp: (r.egress_ip as string | null) ?? null,
  }));
  return summarizeEgressSharing(rows, { start: start.toISOString(), end: end.toISOString() });
}

/**
 * Diagnose egress IPs for every OAuth connection: resolve each connection's
 * proxy, probe the real egress IP, and flag same-rotation-group IP sharing.
 */
export async function diagnoseAllEgressIps(deps?: {
  getConnections?: () => Promise<
    Array<{ id: string; provider: string; name?: string; email?: string; authType?: string }>
  >;
  resolveProxy?: (connectionId: string) => Promise<{ proxy?: unknown; level?: string } | null>;
}): Promise<EgressDiagnostic> {
  const getConnections =
    deps?.getConnections ??
    (async () => {
      const { getProviderConnections } = await import("@/lib/db/providers");
      return (await getProviderConnections({ authType: "oauth" })) as Array<{
        id: string;
        provider: string;
        name?: string;
        email?: string;
      }>;
    });
  const resolveProxy =
    deps?.resolveProxy ??
    (async (connectionId: string) => {
      const { resolveProxyForConnection } = await import("./db/settings");
      return resolveProxyForConnection(connectionId);
    });

  const conns = await getConnections();
  const results: ConnectionEgress[] = [];

  for (const c of conns) {
    const resolved = await resolveProxy(c.id);
    const proxyObj = (resolved?.proxy ?? null) as {
      type?: string;
      host?: string;
      port?: number | string;
    } | null;
    const proxyUrl = proxyObj ? proxyConfigToUrl(proxyObj) : null;
    const egress = await resolveEgressIp(proxyUrl);
    results.push({
      connectionId: c.id,
      provider: c.provider,
      account: c.email || c.name || c.id.slice(0, 8),
      proxyLevel: resolved?.level || "direct",
      proxyHost: proxyObj?.host ?? null,
      egressIp: egress.ip,
      ...(egress.error ? { error: egress.error } : {}),
    });
  }

  const { byEgressIp, sharedWithinRotationGroup } = analyzeEgressSharing(results);
  return { connections: results, byEgressIp, sharedWithinRotationGroup };
}

export interface ProxyValidationResult {
  proxyId: string;
  host: string;
  port: number | string;
  alive: boolean;
  egressIp: string | null;
  latencyMs: number;
  previousStatus: string | null;
  newStatus: string;
  preserved: boolean;
}

/**
 * Validate every proxy in the registry by probing its real egress IP, and
 * persist the result to `proxy_registry.status` (active/error). Combined with
 * PROXY_ALIVE_PREDICATE in resolution, a dead proxy is automatically taken out
 * of rotation — fixing the "all proxies marked active but actually dead" state
 * that left codex accounts falling back to the shared host /64 IP.
 *
 * Deps are injectable for tests.
 */
export async function validateProxyPool(deps?: {
  listProxies?: () => Promise<
    Array<{
      id: string;
      type: string;
      host: string;
      port: number | string;
      username?: string | null;
      password?: string | null;
      status?: string | null;
    }>
  >;
  markStatus?: (
    id: string,
    status: string,
    meta: { latencyMs: number; egressIp: string | null }
  ) => Promise<void>;
}): Promise<ProxyValidationResult[]> {
  const listProxies =
    deps?.listProxies ??
    (async () => {
      const { listProxies: real } = await import("./db/proxies");
      const result = await real({ includeSecrets: true });
      return result.items as Array<{
        id: string;
        type: string;
        host: string;
        port: number | string;
        username?: string | null;
        password?: string | null;
        status?: string | null;
      }>;
    });
  const markStatus =
    deps?.markStatus ??
    (async (id: string, status: string) => {
      const { updateProxy } = await import("./db/proxies");
      await updateProxy(id, { status });
    });

  const proxies = await listProxies();
  const report: ProxyValidationResult[] = [];

  for (const p of proxies) {
    const url = proxyConfigToUrl({
      type: p.type,
      host: p.host,
      port: p.port,
      username: p.username ?? undefined,
      password: p.password ?? undefined,
    });
    const probe = await resolveEgressIp(url, { force: true });
    const alive = !!probe.ip && !probe.error;
    // Operator/health statuses stay untouched by validation: the probe still
    // ran above, so the report keeps its alive/egressIp signal. The two-value
    // literal mirrors PROXY_ALIVE_PREDICATE in db/proxies/guards.ts; revisit if
    // the status registry is ever derived from a single shared source (part 2).
    const previous = (p.status ?? "").toLowerCase();
    if (previous === "inactive" || previous === "dead") {
      report.push({
        proxyId: p.id,
        host: p.host,
        port: p.port,
        alive,
        egressIp: probe.ip,
        latencyMs: probe.latencyMs,
        previousStatus: p.status ?? null,
        newStatus: p.status as string,
        preserved: true,
      });
      continue;
    }
    const newStatus: "active" | "error" = alive ? "active" : "error";
    await markStatus(p.id, newStatus, { latencyMs: probe.latencyMs, egressIp: probe.ip });
    report.push({
      proxyId: p.id,
      host: p.host,
      port: p.port,
      alive,
      egressIp: probe.ip,
      latencyMs: probe.latencyMs,
      previousStatus: p.status ?? null,
      newStatus,
      preserved: false,
    });
  }

  return report;
}

export interface DistributionPlan {
  assignments: Array<{ connectionId: string; account: string; proxyId: string }>;
  unassigned: Array<{ connectionId: string; account: string }>;
  sharingRisk: boolean;
  note: string;
}

/**
 * PURE: plan a 1-proxy-per-connection assignment so no two accounts of the same
 * rotation group share an egress IP (the codex anomaly trigger). Default is
 * strict 1:1 — extras are left UNASSIGNED (better unrouted than sharing an IP).
 * allowSharing=true round-robins instead, flagging sharingRisk.
 */
export function planProxyDistribution(
  connections: Array<{ id: string; account?: string }>,
  liveProxyIds: string[],
  opts: { allowSharing?: boolean } = {}
): DistributionPlan {
  const assignments: DistributionPlan["assignments"] = [];
  const unassigned: DistributionPlan["unassigned"] = [];
  let sharingRisk = false;

  connections.forEach((c, i) => {
    const account = c.account || c.id.slice(0, 8);
    if (liveProxyIds.length === 0) {
      unassigned.push({ connectionId: c.id, account });
      return;
    }
    if (opts.allowSharing) {
      assignments.push({
        connectionId: c.id,
        account,
        proxyId: liveProxyIds[i % liveProxyIds.length],
      });
    } else if (i < liveProxyIds.length) {
      assignments.push({ connectionId: c.id, account, proxyId: liveProxyIds[i] });
    } else {
      unassigned.push({ connectionId: c.id, account });
    }
  });

  if (opts.allowSharing && liveProxyIds.length < connections.length) sharingRisk = true;

  const note =
    liveProxyIds.length === 0
      ? "No live proxies available — add working proxies before distributing."
      : liveProxyIds.length < connections.length && !opts.allowSharing
        ? `Only ${liveProxyIds.length} live proxies for ${connections.length} accounts — ${unassigned.length} left unassigned (avoid shared-IP anomaly).`
        : "1 distinct proxy per account.";

  return { assignments, unassigned, sharingRisk, note };
}

/**
 * Apply a distribution plan: assign each proxy to its connection (account scope).
 */
export async function applyProxyDistribution(
  plan: DistributionPlan,
  deps?: { assign?: (connectionId: string, proxyId: string) => Promise<void> }
): Promise<{ applied: number }> {
  const assign =
    deps?.assign ??
    (async (connectionId: string, proxyId: string) => {
      const { assignProxyToScope } = await import("./db/proxies");
      await assignProxyToScope("account", connectionId, proxyId);
    });
  let applied = 0;
  for (const a of plan.assignments) {
    await assign(a.connectionId, a.proxyId);
    applied++;
  }
  return { applied };
}
