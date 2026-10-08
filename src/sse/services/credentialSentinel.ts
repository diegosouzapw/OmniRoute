/**
 * #13945: getProviderCredentials() can return a truthy "diagnostic sentinel"
 * object instead of null or real credentials whenever every connection for a
 * provider is terminally unusable — allExpired, allRateLimited,
 * blockedByKeyPolicy, or leaseConnectionMismatch. The chat path
 * (src/sse/handlers/chatHelpers.ts::handleNoCredentials) checks each of
 * those fields explicitly, but callers outside the chat path have
 * historically tested the return value by plain truthiness
 * (`if (creds) return creds;`), which treats the sentinel as usable
 * credentials.
 *
 * This guard centralizes that check so every non-chat caller can treat a
 * sentinel exactly like `null` instead of duplicating (and potentially
 * missing a field of) the truthiness test.
 */
export function isCredentialDiagnosticSentinel(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return Boolean(
    record.allRateLimited ||
    record.allExpired ||
    record.blockedByKeyPolicy ||
    record.leaseConnectionMismatch
  );
}
