/**
 * noAuthProxyHelper.ts
 *
 * #7993 — No-auth providers whose executors do NOT implement
 * `syncAccountsFromCredentials` (duckduckgo-web, theoldllm, chipotle,
 * veoaifree-web, auggie) were silently ignoring proxies assigned via the
 * NoAuthAccountCard UI.  The UI persists `{ fingerprint, proxyId }` entries
 * under `providerSpecificData.accountProxies`, and auth.ts hydrates them to
 * inline proxy records before dispatch — but only opencode/mimicode executors
 * consumed that data.
 *
 * This helper bridges the gap: it reads the resolved `accountProxies` from the
 * credentials' `providerSpecificData` and picks a proxy to apply, so every
 * no-auth executor can honour per-account proxies without duplicating the
 * rotation/cooldown machinery.
 */

/** Shape of a single entry in providerSpecificData.accountProxies (post-hydration). */
interface AccountProxyEntry {
  fingerprint: string;
  proxy: {
    type: string;
    host: string;
    port: number;
    username?: string;
    password?: string;
  } | null;
}

/**
 * Extract the first usable proxy from `providerSpecificData.accountProxies`.
 * Returns null when the PSD carries no proxies or every entry has `proxy: null`.
 *
 * Unlike opencode/mimicode which implement round-robin + cooldown, this helper
 * uses a simple "first available" strategy — sufficient for executors that
 * operate a single anonymous account.
 */
export function pickNoAuthAccountProxy(
  credentials: { providerSpecificData?: Record<string, unknown> } | null | undefined
): AccountProxyEntry["proxy"] | null {
  if (!credentials) return null;
  const psd = credentials.providerSpecificData;
  if (!psd || typeof psd !== "object") return null;
  const entries = psd.accountProxies;
  if (!Array.isArray(entries) || entries.length === 0) return null;
  for (const entry of entries) {
    if (
      entry &&
      typeof entry === "object" &&
      typeof (entry as AccountProxyEntry).fingerprint === "string" &&
      (entry as AccountProxyEntry).proxy?.host
    ) {
      return (entry as AccountProxyEntry).proxy;
    }
  }
  return null;
}
