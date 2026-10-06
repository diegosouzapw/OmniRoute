/**
 * Optional API keys on no-auth providers (AI Horde).
 *
 * `getProviderCredentials` short-circuits no-auth providers to a synthetic
 * `connectionId: "noauth"` row so they work with nothing configured. That
 * skipped stored connections, so a registered Horde key could be saved and
 * still never sent. When a no-auth provider also accepts an optional key
 * (`anonymousApiKey` and/or FREE_APIKEY), prefer an active connection that
 * actually has a key, then fall back to the synthetic anonymous path.
 */
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { isAccountUnavailable } from "@omniroute/open-sse/services/accountFallback.ts";
import { createLazyConnectionView } from "@/lib/db/providers/lazyConnectionView";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { getCachedRawProviderConnections } from "@/lib/db/readCache";
import { supportsApiKeyOnFreeProvider } from "@/shared/constants/providers";

export function noAuthProviderAcceptsOptionalApiKey(providerId: string): boolean {
  if (supportsApiKeyOnFreeProvider(providerId)) return true;
  const entry = REGISTRY[providerId] as { anonymousApiKey?: string } | undefined;
  return Boolean(entry?.anonymousApiKey);
}

function hasUsableApiKey(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Terminal statuses stay unavailable until credentials/settings change — an
// operator reset, not a cooldown expiry, clears them (see auth.ts's
// isTerminalConnectionStatus, which this mirrors for the optional-key path).
const TERMINAL_TEST_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * A stored optional key is only usable when it passes the same connection
 * health checks the normal credential-selection path enforces: not in an
 * active rate-limit/cooldown window (`rateLimitedUntil`), and not parked in
 * a terminal or transient-unavailable `testStatus`. Without this, a
 * rate-limited or banned stored Horde key could get selected here — bypassing
 * cooldown entirely — instead of falling back to the anonymous no-auth path
 * or rotating to the next healthy key.
 */
function isConnectionHealthy(connection: ProviderConnectionView): boolean {
  if (isAccountUnavailable(connection.rateLimitedUntil)) return false;
  const status = (connection.testStatus || "").trim().toLowerCase();
  if (TERMINAL_TEST_STATUSES.has(status)) return false;
  if (status === "unavailable") return false;
  return true;
}

export async function loadOptionalNoAuthApiKeyCredentials(
  providerId: string,
  excludedConnectionIds: Set<string>
): Promise<{
  apiKey: string;
  accessToken: null;
  refreshToken: null;
  expiresAt: null;
  projectId: null;
  defaultModel: string | null;
  copilotToken: null;
  providerSpecificData: Record<string, unknown>;
  id: string;
  provider: string;
  connectionId: string;
  testStatus: string | null;
  lastError: null;
  lastErrorType: null;
  lastErrorSource: null;
  errorCode: null;
  rateLimitedUntil: null;
  maxConcurrent: null;
} | null> {
  if (!noAuthProviderAcceptsOptionalApiKey(providerId)) return null;

  let connectionsRaw: unknown;
  try {
    connectionsRaw = await getCachedRawProviderConnections({
      provider: providerId,
      isActive: true,
    });
  } catch {
    return null;
  }

  const connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
    .map(createLazyConnectionView)
    .filter(
      (conn) =>
        conn.id.length > 0 &&
        !excludedConnectionIds.has(conn.id) &&
        conn.isActive !== false &&
        hasUsableApiKey(conn.apiKey)
    )
    .sort((a, b) => (a.priority || 999) - (b.priority || 999));

  // Rotate past unhealthy (cooling-down/terminal) stored keys instead of
  // handing one back regardless of health. If every candidate is unhealthy,
  // fall through to the caller's anonymous/synthetic no-auth fallback.
  const connection = connections.find(isConnectionHealthy);
  if (!connection || !hasUsableApiKey(connection.apiKey)) return null;

  const providerSpecificData =
    connection.providerSpecificData && typeof connection.providerSpecificData === "object"
      ? (connection.providerSpecificData as Record<string, unknown>)
      : {};

  return {
    apiKey: connection.apiKey.trim(),
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    projectId: null,
    defaultModel: connection.defaultModel || null,
    copilotToken: null,
    providerSpecificData,
    id: connection.id,
    provider: connection.provider || providerId,
    connectionId: connection.id,
    testStatus: connection.testStatus ?? "active",
    lastError: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    maxConcurrent: null,
  };
}
