/**
 * Short-lived, per-process memory of proxies that just failed, shared by both places that
 * pick a proxy: registry pools (#6365) and the per-account rotation of noauth executors.
 * A failed proxy is set aside for a period that doubles on each repeat, up to a cap, then
 * comes back. Nothing is persisted and no proxy status is written: only the order in which
 * candidates are tried changes. Keys are entry points (scheme, username, host, port),
 * never passwords.
 *
 * This module is a pure store: it never reads the PROXY_SKIP_RECENTLY_FAILED feature flag
 * (callers gate writes and decisions on it) and it stays free of the proxy dispatcher, so
 * the DB layer can consult it without loading undici or the SOCKS connector.
 */
import { COOLDOWN_MS } from "../config/errorConfig.ts";
import { stripIpv6Brackets } from "./proxyFamily.ts";

const DEFAULT_QUOTA_429_BASE_MS = COOLDOWN_MS.rateLimit;
const DEFAULT_QUOTA_429_MAX_MS = 3_600_000;
const MIN_QUOTA_429_MS = 1_000;
const MAX_QUOTA_429_MS = 3_600_000;

// Number() idiom (cf. readTimeoutMs): accepts hex/exponents/whitespace, then floored and bounded.
function readBoundedMs(name: string, def: number, min: number, max: number): number {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return def;
  const parsed = Math.floor(Number(raw));
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    console.warn(`[ProxyRefusalMemory] Invalid ${name}="${raw}". Using default ${def}ms.`);
    return def;
  }
  return parsed;
}

type RefusalPolicy = { baseMs: number; maxMs: number };

const quota429BaseMs = readBoundedMs(
  "PROXY_QUOTA_429_BASE_MS",
  DEFAULT_QUOTA_429_BASE_MS,
  MIN_QUOTA_429_MS,
  MAX_QUOTA_429_MS
);
let quota429MaxMs = readBoundedMs(
  "PROXY_QUOTA_429_MAX_MS",
  DEFAULT_QUOTA_429_MAX_MS,
  MIN_QUOTA_429_MS,
  MAX_QUOTA_429_MS
);
// When max < base the curve would start at max, so fall back to the default cap instead.
if (quota429MaxMs < quota429BaseMs) {
  console.warn(
    `[ProxyRefusalMemory] Invalid PROXY_QUOTA_429_MAX_MS="${process.env.PROXY_QUOTA_429_MAX_MS}": below PROXY_QUOTA_429_BASE_MS. Using default ${DEFAULT_QUOTA_429_MAX_MS}ms.`
  );
  quota429MaxMs = DEFAULT_QUOTA_429_MAX_MS;
}

export const REFUSAL_POLICIES: {
  proxy_unreachable: { baseMs: 60_000; maxMs: 600_000 };
  ip_quota_429: RefusalPolicy;
} = {
  /** The TCP probe could not open a connection to the proxy. */
  proxy_unreachable: { baseMs: 60_000, maxMs: 600_000 },
  /** The provider refused through this proxy; the member is set aside for a cooldown. */
  ip_quota_429: { baseMs: quota429BaseMs, maxMs: quota429MaxMs },
};

export type ProxyRefusalKind = keyof typeof REFUSAL_POLICIES;

// `seq` orders set-aside events so a cache can tell whether it already saw this one.
type RefusalState = { streak: number; until: number; seq: number };

const MAX_ENTRIES = 1000;
const REFUSAL_KINDS = Object.keys(REFUSAL_POLICIES) as ProxyRefusalKind[];
// Same protocol set and default ports as proxyConfigToUrl() in proxyDispatcher.ts.
const DEFAULT_PORTS: Record<string, string> = { http: "8080", https: "443", socks5: "1080" };
const RELAY_TYPES = new Set(["vercel", "deno", "cloudflare"]);
const FAMILY_MARKER = /\?family=(ipv4|ipv6)$/;

const memory = new Map<string, RefusalState>();
let refusalSeq = 0;

const textField = (value: unknown): string => (typeof value === "string" ? value : "");

// The port as proxyConfigToUrl() normalizes it: the scheme default when unset, null if invalid.
function configPort(port: unknown, type: string): string | null {
  if (!port) return DEFAULT_PORTS[type] ?? "";
  const parsed = Number(port);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535 ? String(parsed) : null;
}

// A config object as the URL proxyConfigToUrl() would build from it; null when unusable.
function configObjectToUrl(proxy: Record<string, unknown>): string | null {
  const host = textField(proxy.host);
  const type = String(proxy.type || "http").toLowerCase();
  const port = configPort(proxy.port, type);
  if (!host || RELAY_TYPES.has(type) || port === null) return null;
  const bracketed = host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
  const username = textField(proxy.username);
  const password = textField(proxy.password);
  const auth =
    username || password ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : "";
  return `${type}://${auth}${bracketed}:${port}`;
}

// The port written in the authority, which `new URL()` drops when it is the scheme default.
function explicitPortOf(url: string): string | null {
  const start = url.indexOf("://");
  if (start === -1) return null;
  const rest = url.slice(start + 3);
  const slash = rest.indexOf("/");
  const authority = slash === -1 ? rest : rest.slice(0, slash);
  const colon = authority.lastIndexOf(":");
  if (colon === -1 || colon < authority.lastIndexOf("@") || colon < authority.lastIndexOf("]")) {
    return null;
  }
  const port = Number(authority.slice(colon + 1));
  return /^\d+$/.test(authority.slice(colon + 1)) && port >= 1 && port <= 65535
    ? String(port)
    : null;
}

/**
 * One key per proxy entry point, whether the proxy comes as a config object, a URL or a
 * legacy string: scheme, decoded username, lower-case host without IPv6 brackets, port as
 * normalization writes it. Password and ?family= are ignored. Anything unusable, and edge
 * relays, give null, which never sets anything aside.
 */
export function proxyEgressKey(proxy: unknown): string | null {
  try {
    let url: string | null = null;
    if (typeof proxy === "string") url = proxy.trim();
    else if (proxy && typeof proxy === "object" && !Array.isArray(proxy)) {
      url = configObjectToUrl(proxy as Record<string, unknown>);
    }
    if (!url) return null;
    url = url.replace(FAMILY_MARKER, "");
    const parsed = new URL(url);
    const scheme = parsed.protocol.replace(/:$/, "").toLowerCase();
    const defaultPort = DEFAULT_PORTS[scheme];
    if (!defaultPort || !parsed.hostname) return null;
    const port = explicitPortOf(url) || parsed.port || defaultPort;
    const user = parsed.username ? decodeURIComponent(parsed.username) : "";
    return `${scheme}://${user}@${stripIpv6Brackets(parsed.hostname).toLowerCase()}:${port}`;
  } catch {
    return null;
  }
}

function entryId(key: string, kind: ProxyRefusalKind): string {
  return `${kind} ${key}`;
}

// Read one (key, kind) state, dropping it once its period ended more than 2 x maxMs ago.
function readState(key: string, kind: ProxyRefusalKind, nowMs: number): RefusalState | undefined {
  const id = entryId(key, kind);
  const state = memory.get(id);
  if (state && nowMs - state.until >= 2 * REFUSAL_POLICIES[kind].maxMs) {
    memory.delete(id);
    return undefined;
  }
  return state;
}

/** Set a proxy aside for `kind`. Returns the new period in ms, or null if nothing changed. */
export function noteProxyRefusal(
  key: string | null,
  kind: ProxyRefusalKind,
  nowMs: number = Date.now()
): number | null {
  if (key === null) return null;
  const state = readState(key, kind, nowMs);
  if (state && state.until > nowMs) return null;
  const policy = REFUSAL_POLICIES[kind];
  const streak = (state?.streak ?? 0) + 1;
  const periodMs = Math.min(policy.baseMs * 2 ** (streak - 1), policy.maxMs);
  const id = entryId(key, kind);
  memory.delete(id);
  memory.set(id, { streak, until: nowMs + periodMs, seq: ++refusalSeq });
  if (memory.size > MAX_ENTRIES) {
    const oldest = memory.keys().next().value;
    if (oldest !== undefined) memory.delete(oldest);
  }
  return periodMs;
}

/** The proxy answered again: end its period now, keep the streak so a repeat doubles. */
export function noteProxyRecovered(
  key: string | null,
  kind: ProxyRefusalKind,
  nowMs: number = Date.now()
): void {
  if (key === null) return;
  const state = readState(key, kind, nowMs);
  if (state && state.until > nowMs) state.until = nowMs;
}

/** A response came back through this proxy: forget every refusal kind for it. */
export function noteProxyServed(key: string | null): void {
  if (key === null) return;
  for (const kind of REFUSAL_KINDS) memory.delete(entryId(key, kind));
}

export function isProxyAvoided(key: string | null, nowMs: number = Date.now()): boolean {
  return proxySetAsideSeq(key, nowMs) !== null;
}

/**
 * Sequence number of the most recent set-aside event still in force for this proxy, or
 * null when it is not set aside. Compare with getProxyRefusalSeq() captured earlier to
 * know whether the event happened after that point.
 */
export function proxySetAsideSeq(key: string | null, nowMs: number = Date.now()): number | null {
  if (key === null || memory.size === 0) return null;
  let latest: number | null = null;
  for (const kind of REFUSAL_KINDS) {
    const state = readState(key, kind, nowMs);
    if (state && state.until > nowMs && (latest === null || state.seq > latest)) {
      latest = state.seq;
    }
  }
  return latest;
}

/** Sequence number of the last set-aside event recorded in this process (0 = none yet). */
export function getProxyRefusalSeq(): number {
  return refusalSeq;
}

/** True when anything is held at all: lets hot paths skip key computation and flag reads. */
export function hasProxyRefusals(): boolean {
  return memory.size > 0;
}

/** Test-only: forget everything. */
export function __resetProxyRefusalMemoryForTesting(): void {
  memory.clear();
}

/** Test-only: number of (key, kind) entries held. */
export function __proxyRefusalMemorySizeForTesting(): number {
  return memory.size;
}
