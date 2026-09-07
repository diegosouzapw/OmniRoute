import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
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
  connection?: { provider?: string; providerSpecificData?: unknown },
): boolean {
  if (USAGE_SUPPORTED_PROVIDERS.includes(providerId)) return true;
  return isMoonshotOpenPlatformConnection({
    provider: providerId,
    providerSpecificData: connection?.providerSpecificData,
  });
}
