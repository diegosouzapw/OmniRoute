import { OPENAI_COMPATIBLE_PREFIX, USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { isMoonshotOpenPlatformConnection } from "@omniroute/open-sse/services/usage/moonshotOpenPlatform.ts";

export interface ProviderQuotaVisibilityConnection {
  quotaVisible?: boolean;
  provider?: string;
  providerSpecificData?: unknown;
}

export function isProviderQuotaVisible(connection: ProviderQuotaVisibilityConnection): boolean {
  return connection.quotaVisible !== false;
}

export function supportsProviderQuota(
  providerId: string,
  connection?: { provider?: string; providerSpecificData?: unknown }
): boolean {
  if (USAGE_SUPPORTED_PROVIDERS.includes(providerId)) return true;
  // `openai-compatible-*` ids are minted per connection, so they can never be
  // members of a static list. Such a connection supports quota exactly when it
  // declares where its quota lives (#13616) — the capability is a property of
  // the connection, not of the provider id.
  if (hasOpenAiCompatibleQuotaEndpoint(providerId, connection?.providerSpecificData)) return true;
  return isMoonshotOpenPlatformConnection({
    provider: providerId,
    providerSpecificData: connection?.providerSpecificData,
  });
}

/**
 * True for an `openai-compatible-*` connection carrying a usable
 * `providerSpecificData.quotaEndpoint`: a non-empty `url` and at least one
 * entry in `quotas`. Both halves are required — an endpoint with no mapping
 * can be fetched but never produces a quota, so treating it as supported would
 * put a permanently empty card in Provider Limits.
 */
export function hasOpenAiCompatibleQuotaEndpoint(
  providerId: string,
  providerSpecificData: unknown
): boolean {
  if (typeof providerId !== "string" || !providerId.startsWith(OPENAI_COMPATIBLE_PREFIX)) {
    return false;
  }
  const psd = providerSpecificData as { quotaEndpoint?: unknown } | null | undefined;
  const endpoint = psd?.quotaEndpoint as
    { url?: unknown; quotas?: Record<string, unknown> } | null | undefined;
  if (!endpoint || typeof endpoint.url !== "string" || endpoint.url.length === 0) return false;
  return !!endpoint.quotas && Object.keys(endpoint.quotas).length > 0;
}
