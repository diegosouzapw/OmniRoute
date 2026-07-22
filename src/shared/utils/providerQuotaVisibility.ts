import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";

export interface ProviderQuotaVisibilityConnection {
  quotaVisible?: boolean;
}

export function isProviderQuotaVisible(connection: ProviderQuotaVisibilityConnection): boolean {
  return connection.quotaVisible !== false;
}

export function supportsProviderQuota(providerId: string): boolean {
  return USAGE_SUPPORTED_PROVIDERS.includes(providerId);
}
