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
import { createProxyDispatcher, proxyConfigToUrl } from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";

const EGRESS_ECHO_URL = "https://api64.ipify.org?format=json";
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EGRESS_PROBE_TIMEOUT_MS);
  try {
    const dispatcher = proxyUrl ? createProxyDispatcher(proxyUrl) : undefined;
    const res = await undiciRequest(EGRESS_ECHO_URL, {
      method: "GET",
      dispatcher,
      signal: controller.signal,
      headersTimeout: EGRESS_PROBE_TIMEOUT_MS,
      bodyTimeout: EGRESS_PROBE_TIMEOUT_MS,
    });
    const text = await res.body.text();
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
  } finally {
    clearTimeout(timeout);
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
  const cached = egressCache.get(proxyUrl ?? "__direct__");
  if (!cached) return null;
  if (Date.now() - cached.at >= EGRESS_CACHE_TTL_MS) return null;
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

/**
 * Diagnose egress IPs for every OAuth connection: resolve each connection's
 * proxy, probe the real egress IP, and flag same-rotation-group IP sharing.
 */
export async function diagnoseAllEgressIps(deps?: {
  getConnections?: () => Promise<
    Array<{ id: string; provider: string; name?: string; email?: string; authType?: string }>
  >;
  resolveProxy?: (
    connectionId: string
  ) => Promise<{ proxy?: unknown; level?: string } | null>;
}): Promise<EgressDiagnostic> {
  const getConnections =
    deps?.getConnections ??
    (async () => {
      const { getProviderConnections } = await import("./localDb");
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
  newStatus: "active" | "error";
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
    Array<{ id: string; type: string; host: string; port: number | string; username?: string | null; password?: string | null; status?: string | null }>
  >;
  markStatus?: (id: string, status: string, meta: { latencyMs: number; egressIp: string | null }) => Promise<void>;
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
      assignments.push({ connectionId: c.id, account, proxyId: liveProxyIds[i % liveProxyIds.length] });
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
