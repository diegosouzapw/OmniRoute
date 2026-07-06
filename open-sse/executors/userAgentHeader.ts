/**
 * User-Agent header cluster (lines 170-193 of executors/base.ts).
 *
 * Lifted out of base.ts so it can be unit-tested in isolation. All three
 * functions are pure (no module state, no I/O) and form a tight cluster:
 *
 *   getCustomUserAgent  ->  applyConfiguredUserAgent  ->  setUserAgentHeader
 *
 *  - `getCustomUserAgent` extracts the provider-specific custom UA from
 *    JsonRecord and returns the trimmed value or null.
 *  - `applyConfiguredUserAgent` is the convenience entry-point: if the
 *    providerSpecificData has a custom UA, it sets it on the headers map.
 *  - `setUserAgentHeader` writes the UA into both the canonical
 *    `User-Agent` key and the lowercase `user-agent` key (some servers
 *    are case-sensitive, some aren't; we set both).
 */

/**
 * Read the `customUserAgent` string from providerSpecificData, trimmed.
 * Returns null if the field is missing, non-string, or whitespace-only.
 */
export function getCustomUserAgent(
  providerSpecificData?: Record<string, unknown> | null,
): string | null {
  const customUserAgent =
    typeof providerSpecificData?.customUserAgent === "string"
      ? providerSpecificData.customUserAgent.trim()
      : "";
  return customUserAgent || null;
}

/**
 * Write a User-Agent string into both the canonical `User-Agent` header
 * AND the lowercase `user-agent` header (some upstreams are case-sensitive
 * on this header). No-op if userAgent is empty.
 */
export function setUserAgentHeader(
  headers: Record<string, string>,
  userAgent: string,
): void {
  const trimmed = typeof userAgent === "string" ? userAgent.trim() : "";
  if (!trimmed) return;

  headers["User-Agent"] = trimmed;
  if ("user-agent" in headers) {
    headers["user-agent"] = trimmed;
  }
}

/**
 * Apply the provider-specific custom UA to the headers map, if one is set.
 * Convenience wrapper around getCustomUserAgent + setUserAgentHeader.
 */
export function applyConfiguredUserAgent(
  headers: Record<string, string>,
  providerSpecificData?: Record<string, unknown> | null,
): void {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (customUserAgent) {
    setUserAgentHeader(headers, customUserAgent);
  }
}
