/**
 * Clash/Mihomo external-controller client.
 *
 * Surface (verified 2026-09-24 against the Clash RESTful API docs + two
 * dashboard clients: zashboard `src/api/clash.ts`, clash-verge-rev-lite
 * `src/services/api.ts`):
 *   GET  /proxies            → `{ proxies: { [name]: { type, now?, all? } } }`
 *   PUT  /proxies/:selector  → body `{ "name": "<target>" }`, 204 on success
 *   Auth: `Authorization: Bearer <secret>` header (never in URL or logs).
 *
 * Transport: `safeOutboundFetch` with `bypassProxyPatch: true` (avoids routing
 * the control call through the dispatcher we are steering), `allowRedirect:
 * false`, `timeoutMs: 5000`. Fetch is injectable for tests. Never throws:
 * every failure maps to `{ switched: false, reason }`.
 */

import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";

/** Bounded control-call budget (fixed unless measured otherwise). */
export const SELECTOR_CONTROL_TIMEOUT_MS = 5000;

export type SelectorSwitchReason =
  | "auth-failed"
  | "bad-request"
  | "blocked"
  | "http-error"
  | "missing-secret"
  | "network-error"
  | "no-target"
  | "not-found"
  | "not-selector"
  | "ok"
  | "timeout"
  | "unmapped";

export interface SelectorSwitchResult {
  switched: boolean;
  reason: SelectorSwitchReason;
  target?: string;
}

export interface SelectorSwitchInput {
  controlUrl: string;
  secret: string | null | undefined;
  selector: string;
  avoidName: string;
}

type FetchLike = (
  url: string,
  init?: Record<string, unknown>
) => Promise<{ status: number; json: () => Promise<unknown> }>;

function baseFetch(url: string, init?: Record<string, unknown>) {
  return safeOutboundFetch(url, {
    ...(init as object),
    bypassProxyPatch: true,
    allowRedirect: false,
    timeoutMs: SELECTOR_CONTROL_TIMEOUT_MS,
    retry: false,
  }) as unknown as Promise<{ status: number; json: () => Promise<unknown> }>;
}

function joinUrl(base: string, path: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${b}${path}`;
}

function isTimeout(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return /timeout|aborted|abort/i.test(msg);
}

function classifyStatus(status: number): SelectorSwitchReason {
  if (status === 401 || status === 403) return "auth-failed";
  if (status === 404) return "not-found";
  return status >= 400 && status < 500 ? "bad-request" : "http-error";
}

function readSelectorGroup(
  body: unknown,
  selector: string
): { members: string[]; current: string | null; reason: SelectorSwitchReason } | null {
  const group = (
    body as { proxies?: Record<string, { type?: string; now?: string; all?: string[] }> }
  )?.proxies?.[selector];
  if (!group) return { members: [], current: null, reason: "not-found" };
  if (group.type !== "Selector" || !Array.isArray(group.all)) {
    return { members: [], current: null, reason: "not-selector" };
  }
  const members = group.all.filter((m) => typeof m === "string");
  const current = typeof group.now === "string" ? group.now : null;
  return { members, current, reason: "ok" };
}

/**
 * Read one selector group's members + current choice. Never throws: transport
 * failures surface as `{ members: [], current: null, reason }`.
 */
export async function getGroupMembers(
  controlUrl: string,
  selector: string,
  opts?: {
    secret?: string | null;
    fetchFn?: FetchLike;
  }
): Promise<{ members: string[]; current: string | null; reason: SelectorSwitchReason }> {
  const fetchFn = opts?.fetchFn ?? baseFetch;
  const headers: Record<string, string> = {};
  if (opts?.secret) headers.Authorization = `Bearer ${opts.secret}`;
  try {
    const res = await fetchFn(joinUrl(controlUrl, "/proxies"), {
      method: "GET",
      headers,
      bypassProxyPatch: true,
      allowRedirect: false,
      timeoutMs: SELECTOR_CONTROL_TIMEOUT_MS,
      retry: false,
    } as Record<string, unknown>);
    if (res.status === 401 || res.status === 403) {
      return { members: [], current: null, reason: "auth-failed" };
    }
    if (res.status === 404) return { members: [], current: null, reason: "not-found" };
    if (res.status < 200 || res.status >= 300) {
      return { members: [], current: null, reason: classifyStatus(res.status) };
    }
    const body = (await res.json()) as {
      proxies?: Record<string, { type?: string; now?: string; all?: string[] }>;
    };
    return readSelectorGroup(body, selector) ?? { members: [], current: null, reason: "not-found" };
  } catch (e) {
    return { members: [], current: null, reason: isTimeout(e) ? "timeout" : "network-error" };
  }
}

function pickTarget(members: string[], avoidName: string, current: string | null): string | null {
  // Target: first member that is neither the avoided member nor the current
  // choice. `avoidName` carries the set-aside entry's NAME when known (hook
  // path passes the egress key, which doubles as the match anchor) — the
  // current-choice exclusion guarantees progress even when names differ.
  const avoid = new Set([avoidName, current].filter((x): x is string => !!x));
  return members.find((m) => !avoid.has(m)) ?? null;
}

async function putSelectorChoice(
  fetchFn: FetchLike,
  controlUrl: string,
  selector: string,
  secret: string,
  target: string
): Promise<SelectorSwitchResult> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${secret}`,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetchFn(joinUrl(controlUrl, `/proxies/${encodeURIComponent(selector)}`), {
      method: "PUT",
      headers,
      body: JSON.stringify({ name: target }),
      bypassProxyPatch: true,
      allowRedirect: false,
      timeoutMs: SELECTOR_CONTROL_TIMEOUT_MS,
      retry: false,
    } as Record<string, unknown>);
    if (res.status >= 200 && res.status < 300) return { switched: true, reason: "ok", target };
    return { switched: false, reason: classifyStatus(res.status) };
  } catch (e) {
    return { switched: false, reason: isTimeout(e) ? "timeout" : "network-error" };
  }
}
/**
 * Switch a selector group away from `avoidName` to the first member that is
 * neither the current choice nor the avoided one. Never throws.
 */
export async function switchSelector(
  input: SelectorSwitchInput,
  opts?: { fetchFn?: FetchLike }
): Promise<SelectorSwitchResult> {
  if (!input.secret) return { switched: false, reason: "missing-secret" };
  const fetchFn = opts?.fetchFn ?? baseFetch;
  const { members, current, reason } = await getGroupMembers(input.controlUrl, input.selector, {
    secret: input.secret,
    fetchFn,
  });
  if (reason !== "ok") return { switched: false, reason };
  const target = pickTarget(members, input.avoidName, current);
  if (!target) return { switched: false, reason: "no-target" };
  return putSelectorChoice(fetchFn, input.controlUrl, input.selector, input.secret, target);
}
