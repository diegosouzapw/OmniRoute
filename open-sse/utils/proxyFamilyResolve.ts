import dns from "node:dns/promises";
import { detectIpLiteralFamily, stripIpv6Brackets } from "./proxyFamily.ts";

export type FamilyLookupFn = (
  hostname: string
) => Promise<Array<{ address: string; family: number }>>;

const defaultLookup: FamilyLookupFn = (hostname) => dns.lookup(hostname, { all: true });

/** Positive family checks are trusted for 5 minutes (DNS TTLs are typically short). */
const FAMILY_CHECK_POSITIVE_TTL_MS = 300_000;
/** Negative results change fast (DNS provisioning) — only 2 seconds. */
const FAMILY_CHECK_NEGATIVE_TTL_MS = 2_000;

interface FamilyCheckCacheEntry {
  lookupFn: FamilyLookupFn;
  checkedAt: number;
  ok: boolean;
  message?: string;
}

/** Cached family-check results keyed by `${host}:${family}`. */
const familyCheckCache = new Map<string, FamilyCheckCacheEntry>();
/** In-flight family checks keyed by `${host}:${family}` — dedupes concurrent probes. */
const familyCheckInflight = new Map<string, Promise<void>>();

/**
 * Fail-closed guarantee for an IPv6-only (or IPv4-only) proxy given as a hostname:
 * refuse early if the hostname has no record in the required family. No-op for IP
 * literals (their family is intrinsic). Results are cached per (host, family,
 * lookupFn) and concurrent checks for the same key are single-flighted.
 */
export async function assertHostnameSupportsFamily(
  host: string,
  family: 4 | 6,
  lookupFn: FamilyLookupFn = defaultLookup
): Promise<void> {
  if (detectIpLiteralFamily(host) !== null) return;
  const cacheKey = `${host}:${family}`;
  const cached = familyCheckCache.get(cacheKey);
  if (cached && cached.lookupFn === lookupFn) {
    const ttl = cached.ok ? FAMILY_CHECK_POSITIVE_TTL_MS : FAMILY_CHECK_NEGATIVE_TTL_MS;
    if (Date.now() - cached.checkedAt < ttl) {
      if (!cached.ok) throw new Error(cached.message);
      return;
    }
    familyCheckCache.delete(cacheKey);
  }

  const inflight = familyCheckInflight.get(cacheKey);
  if (inflight) {
    await inflight;
    return;
  }

  const probe = (async () => {
    let records: Array<{ address: string; family: number }>;
    try {
      records = await lookupFn(stripIpv6Brackets(host));
    } catch (err) {
      const message = `[ProxyFamily] DNS resolution failed for ${host}; refusing to egress (fail-closed): ${
        err instanceof Error ? err.message : String(err)
      }`;
      familyCheckCache.set(cacheKey, { lookupFn, checkedAt: Date.now(), ok: false, message });
      throw new Error(message);
    }
    const hasFamily = records.some((r) => r.family === family);
    if (!hasFamily) {
      const message = `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; refusing ${
        family === 6 ? "IPv6" : "IPv4"
      }-only egress (fail-closed)`;
      familyCheckCache.set(cacheKey, { lookupFn, checkedAt: Date.now(), ok: false, message });
      throw new Error(message);
    }
    familyCheckCache.set(cacheKey, { lookupFn, checkedAt: Date.now(), ok: true });
  })();

  familyCheckInflight.set(cacheKey, probe);
  try {
    await probe;
  } finally {
    if (familyCheckInflight.get(cacheKey) === probe) {
      familyCheckInflight.delete(cacheKey);
    }
  }
}

/** Test hook: drop all cached and in-flight family checks. */
export function __clearFamilyCheckCacheForTest(): void {
  familyCheckCache.clear();
  familyCheckInflight.clear();
}
