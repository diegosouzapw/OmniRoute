import { getProxyById } from "@/lib/db/proxies";

/**
 * #5217 (Gap 1) — Per-account proxy resolution for no-auth providers
 * ("OpenCode Free", MiMoCode, …).
 *
 * The NoAuthAccountCard now stores a proxy *reference* (by id) per account so a
 * single edit to a Proxy Pool entry applies to every account that references it,
 * instead of forcing the operator to retype host/port/credentials per card. A
 * one-off "custom" inline proxy is still supported as an escape hatch.
 *
 * Persisted shape per account (`providerSpecificData.accountProxies[]`):
 *   - by-id reference (Proxy Pool dropdown): `{ fingerprint, proxyId }`
 *   - custom escape hatch (manual inputs):   `{ fingerprint, proxy: {…} }`
 *   - legacy (pre-Gap-1):                     `{ fingerprint, proxy: {…} }`
 *
 * This module resolves those entries into the inline `{ fingerprint, proxy }`
 * shape the executors already consume, so the executor stays unchanged:
 *   - `proxyId` is looked up in the proxy registry and hydrated to its live
 *     `{ type, host, port, username?, password? }` record;
 *   - an inline `proxy` (custom / legacy) passes through unchanged;
 *   - an unknown/deleted `proxyId` (or any read failure) degrades to `proxy: null`
 *     (direct egress) — never throws.
 */

export interface ResolvedAccountProxy {
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export interface AccountProxyEntry {
  fingerprint: string;
  proxy?: Partial<ResolvedAccountProxy> | null;
  proxyId?: string | null;
}

interface ProxyRegistryRecordLike {
  type?: string;
  host?: string;
  port?: number | string;
  username?: string | null;
  password?: string | null;
}

/** Async lookup of a proxy registry record by id (null when absent). */
export type ProxyByIdLookup = (proxyId: string) => Promise<ProxyRegistryRecordLike | null>;

function normalizeRecord(rec: ProxyRegistryRecordLike | Partial<ResolvedAccountProxy>) {
  const host = typeof rec.host === "string" ? rec.host.trim() : "";
  if (!host) return null;
  const username = typeof rec.username === "string" ? rec.username : "";
  const password = typeof rec.password === "string" ? rec.password : "";
  const resolved: ResolvedAccountProxy = {
    type: typeof rec.type === "string" && rec.type ? rec.type : "socks5",
    host,
    port: Number(rec.port) || 0,
    ...(username ? { username } : {}),
    ...(password ? { password } : {}),
  };
  return resolved;
}

/**
 * Resolve raw `accountProxies` entries to inline `{ fingerprint, proxy }`. Pure
 * over the injected `lookup` so it is unit-testable without a database.
 */
export async function resolveAccountProxies(
  entries: unknown,
  lookup: ProxyByIdLookup
): Promise<Array<{ fingerprint: string; proxy: ResolvedAccountProxy | null }>> {
  if (!Array.isArray(entries)) return [];
  const out: Array<{ fingerprint: string; proxy: ResolvedAccountProxy | null }> = [];
  for (const raw of entries) {
    if (!raw || typeof raw !== "object") continue;
    const entry = raw as AccountProxyEntry;
    if (typeof entry.fingerprint !== "string") continue;

    // By-id reference (Proxy Pool): resolve to the live record so a pool edit
    // propagates to every referencing account. Unknown/deleted id → direct.
    if (typeof entry.proxyId === "string" && entry.proxyId) {
      let record: ProxyRegistryRecordLike | null = null;
      try {
        record = await lookup(entry.proxyId);
      } catch {
        record = null;
      }
      out.push({
        fingerprint: entry.fingerprint,
        proxy: record ? normalizeRecord(record) : null,
      });
      continue;
    }

    // Custom escape hatch / legacy inline proxy: pass through unchanged.
    if (entry.proxy && typeof entry.proxy === "object") {
      out.push({ fingerprint: entry.fingerprint, proxy: normalizeRecord(entry.proxy) });
      continue;
    }

    out.push({ fingerprint: entry.fingerprint, proxy: null });
  }
  return out;
}

/** Production binding: resolves by-id references against the proxy registry. */
export async function resolveAccountProxiesFromRegistry(entries: unknown) {
  return resolveAccountProxies(entries, (id) => getProxyById(id, { includeSecrets: true }));
}
