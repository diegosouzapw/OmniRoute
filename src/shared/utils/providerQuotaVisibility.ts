export interface ProviderQuotaVisibilityConnection {
  quotaVisible?: boolean;
}

export function isProviderQuotaVisible(connection: ProviderQuotaVisibilityConnection): boolean {
  return connection.quotaVisible !== false;
}
