/**
 * Dedicated SSRF guard for the selector-control target.
 *
 * Deliberately distinct from `fetchGuard.ts` (subscription *sources*): that
 * guard's `allowLocal: true` mode permits the whole LAN, which is insufficient
 * when a secret travels in the `Authorization` header. Rule here:
 *
 *   - loopback (`127.0.0.1`, `::1`, `localhost`) over http/https: allowed by
 *     default;
 *   - LAN/private: allowed ONLY when the host figures in the dedicated
 *     allow-list (DB setting wins, env `SELECTOR_CONTROL_ALLOWLIST` fallback,
 *     default empty);
 *   - metadata/link-local/unspecified (`169.254.0.0/16`, `::`, `fe80::/10`,
 *     IPv4-mapped equivalents): blocked UNCONDITIONALLY either way.
 *
 * Structural check (`isSelectorControlUrlAllowed`) runs at create/update;
 * `isSelectorControlUrlAllowedAtFetchTime` re-validates at fetch time,
 * resolving hostnames and refusing when ANY resolved address is blocked
 * (fail closed). Pure except for the DNS lookup in the fetch-time variant.
 */

import { extractIpv4MappedAddress, isIpLiteral, isIpv4Blocked, isIpv6Blocked } from "./fetchGuard";

export type SelectorGuardReason =
  | "ok"
  | "bad-url"
  | "bad-scheme"
  | "blocked-always"
  | "lan-not-allowlisted"
  | "dns-failed"
  | "dns-blocked";

export interface SelectorGuardVerdict {
  allowed: boolean;
  reason: SelectorGuardReason;
}

const ALLOWLIST_ENV = "SELECTOR_CONTROL_ALLOWLIST";

/** Parse a raw allow-list value (comma/space separated, lowercased). */
function parseAllowlist(raw: string): string[] {
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}

/** Parse the env fallback allow-list (comma/space separated, lowercased). */
export function readSelectorAllowlistEnv(): string[] {
  return parseAllowlist(process.env[ALLOWLIST_ENV] ?? "");
}

/**
 * Resolve the effective allow-list: DB setting wins when present and non-empty,
 * env is the fallback, default empty. Never throws (DB down → env-only).
 *
 * Sync variant: takes an optional injected `dbValue` (the raw
 * `feature_flags`/`SELECTOR_CONTROL_ALLOWLIST` setting). When omitted, falls
 * back to env (no sync DB read exists in ESM — server paths use the async
 * `resolveSelectorAllowlist` below). The setting is a free-form `key_value`
 * row, not a registered feature flag (no `setFeatureFlagOverride`).
 */
export function readSelectorAllowlist(dbValue?: string | null): string[] {
  if (typeof dbValue === "string" && dbValue.trim() !== "") {
    return parseAllowlist(dbValue);
  }
  return readSelectorAllowlistEnv();
}

async function loadDb(): Promise<{
  prepare: (sql: string) => {
    get: (...args: string[]) => { value?: string } | undefined;
  };
} | null> {
  try {
    const core = await import("@/lib/db/core");
    return core.getDbInstance() as unknown as {
      prepare: (sql: string) => {
        get: (...args: string[]) => { value?: string } | undefined;
      };
    };
  } catch {
    return null;
  }
}

/** Async DB-first resolver for server paths (trigger, routes). Never throws. */
export async function resolveSelectorAllowlist(): Promise<string[]> {
  try {
    const db = await loadDb();
    const row = db
      ?.prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("feature_flags", ALLOWLIST_ENV) as { value?: string } | undefined;
    if (typeof row?.value === "string" && row.value.trim() !== "") {
      return parseAllowlist(row.value);
    }
  } catch {
    // DB not initialized yet — fall through to env-only.
  }
  return readSelectorAllowlistEnv();
}

function normalizeHost(host: string): string {
  const h = host.toLowerCase();
  return h.startsWith("[") && h.endsWith("]") ? h.slice(1, -1) : h;
}

function unwrapMapped(host: string): string {
  return extractIpv4MappedAddress(host) ?? host;
}

function isAlwaysBlockedIp(host: string): boolean {
  const bare = unwrapMapped(host);
  // Unconditional ranges regardless of allowLocal: check with allowLocal=true
  // (metadata/link-local/unspecified). IPv4-mapped handled inside the fns.
  if (bare.includes(":")) return isIpv6Blocked(bare, { allowLocal: true });
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(bare)) return isIpv4Blocked(bare, { allowLocal: true });
  return false;
}

function isLoopback(host: string): boolean {
  const bare = unwrapMapped(host);
  return bare === "127.0.0.1" || bare === "::1" || bare === "localhost";
}

function isLanIp(host: string): boolean {
  const bare = unwrapMapped(host);
  if (bare.includes(":")) {
    // IPv6 ULA (fc00::/7); loopback/link-local handled elsewhere.
    const h = bare.toLowerCase();
    return h.startsWith("fc") || h.startsWith("fd");
  }
  // IPv4 loopback/private → blocked in strict (public-only) mode.
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(bare)) return false;
  return isIpv4Blocked(bare, { allowLocal: false }) && !isIpv4Blocked(bare, { allowLocal: true });
}

function parseStructuralUrl(url: string): { host: string; protocol: string } | null {
  if (typeof url !== "string" || !url.trim()) return null;
  try {
    const u = new URL(url);
    return { host: normalizeHost(u.hostname), protocol: u.protocol };
  } catch {
    return null;
  }
}

function checkStructuralVerdict(host: string, protocol: string): SelectorGuardVerdict | null {
  if (protocol !== "http:" && protocol !== "https:") {
    return { allowed: false, reason: "bad-scheme" };
  }
  if (!host) return { allowed: false, reason: "bad-url" };
  if (isAlwaysBlockedIp(host)) return { allowed: false, reason: "blocked-always" };
  if (isLoopback(host)) return { allowed: true, reason: "ok" };
  return null;
}

function checkIpVerdict(host: string, allow: Set<string>): SelectorGuardVerdict {
  if (!isLanIp(host)) return { allowed: false, reason: "blocked-always" };
  return allow.has(host)
    ? { allowed: true, reason: "ok" }
    : { allowed: false, reason: "lan-not-allowlisted" };
}
/**
 * Structural check (no DNS). Hostnames pass structurally only when they are
 * `localhost` or explicitly allow-listed — anything else is resolved and
 * re-checked at fetch time (fail closed there).
 */
export function isSelectorControlUrlAllowed(
  url: string,
  opts?: { allowlist?: readonly string[] }
): SelectorGuardVerdict {
  try {
    const parsed = parseStructuralUrl(url);
    if (!parsed) return { allowed: false, reason: "bad-url" };
    const decided = checkStructuralVerdict(parsed.host, parsed.protocol);
    if (decided) return decided;
    const host = parsed.host;
    const allow = new Set((opts?.allowlist ?? readSelectorAllowlist()).map((s) => s.toLowerCase()));
    if (allow.has("*")) {
      // "*" opens LAN/private but never the always-blocked ranges (checked above).
      return { allowed: true, reason: "ok" };
    }
    if (isIpLiteral(host)) return checkIpVerdict(host, allow);
    // Hostname: allow structurally only if explicitly listed or localhost;
    // otherwise the fetch-time DNS re-check decides (fail closed).
    if (host === "localhost" || allow.has(host)) return { allowed: true, reason: "ok" };
    return { allowed: false, reason: "lan-not-allowlisted" };
  } catch {
    return { allowed: false, reason: "bad-url" };
  }
}

async function checkResolvedAddrs(
  addrs: Array<{ address: string }>,
  effectiveAllowlist: readonly string[]
): Promise<SelectorGuardVerdict | null> {
  for (const a of addrs) {
    const addr = normalizeHost(a.address);
    if (isAlwaysBlockedIp(addr)) return { allowed: false, reason: "dns-blocked" };
    if (isLoopback(addr)) continue;
    const allow = new Set(effectiveAllowlist.map((s) => s.toLowerCase()));
    if (!allow.has("*") && !allow.has(addr)) {
      return { allowed: false, reason: "dns-blocked" };
    }
  }
  return null;
}

/**
 * Fetch-time re-validation: structural check first, then resolve hostnames
 * and refuse if ANY address is unconditionally blocked or is a non-loopback
 * address that is not allow-listed. Fail closed on resolution errors.
 */
export async function isSelectorControlUrlAllowedAtFetchTime(
  url: string,
  opts?: { allowlist?: readonly string[] }
): Promise<SelectorGuardVerdict> {
  const structural = isSelectorControlUrlAllowed(url, opts);
  if (!structural.allowed) return structural;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return { allowed: false, reason: "bad-url" };
  }
  const host = normalizeHost(u.hostname);
  if (isIpLiteral(host)) return structural;
  if (host === "localhost" || (opts?.allowlist ?? []).includes(host)) return structural;
  const effectiveAllowlist = opts?.allowlist ?? readSelectorAllowlist();
  try {
    const dns = await import("node:dns");
    const addrs = await dns.promises.lookup(host, { all: true });
    return (await checkResolvedAddrs(addrs, effectiveAllowlist)) ?? { allowed: true, reason: "ok" };
  } catch {
    return { allowed: false, reason: "dns-failed" };
  }
}
