/**
 * Zero-import leaf. `src/lib/db/proxyLogs.ts` needs this helper; importing it from
 * `proxyLogger.ts` loaded that module's import-time `loadFromDb()` hydration into every
 * DB module that reaches proxyLogs (settings → proxies → proxies/rotation → proxyLogs),
 * so a cold `getPricingForModel()` paid two extra proxy_logs queries
 * (tests/unit/pricing-for-model-cached-13891.test.ts).
 */

/**
 * Canonical host normalization for proxy log writes and (host, port) lookups:
 * trim, strip exactly one pair of surrounding brackets from IPv6 literals
 * ("[2001:db8::1]"), re-trim, lowercase. Anything that is not a non-empty
 * string normalizes to null so readers can fall back to today's behavior.
 */
export function normalizeProxyHostForLog(host: unknown): string | null {
  if (typeof host !== "string") return null;
  const trimmed = host.trim();
  if (!trimmed) return null;
  const unbracketed =
    trimmed.startsWith("[") && trimmed.endsWith("]") && trimmed.length > 2
      ? trimmed.slice(1, -1).trim()
      : trimmed;
  if (!unbracketed) return null;
  return unbracketed.toLowerCase();
}
