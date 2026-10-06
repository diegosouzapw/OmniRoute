export interface RadarSetupConnection {
  id: string;
  provider: string;
  isActive?: boolean;
}

/** Reuse the authenticated provider-connections API with a bounded provider filter. */
export function providerConnectionsRequestUrl(provider: string): string {
  return `/api/providers?provider=${encodeURIComponent(provider)}`;
}

/** Link the Radar tour to the provider's existing, validated API-key form. */
export function providerSetupConnectionUrl(provider: string): string {
  return `/dashboard/providers/${encodeURIComponent(provider)}?action=add-api-key`;
}

/**
 * Pick a concrete connection id for the setup test endpoint. Prefer an active
 * connection, then fall back to the first valid connection for the provider.
 */
export function firstProviderConnectionId(
  connections: readonly RadarSetupConnection[],
  provider: string
): string | null {
  const matching = connections.filter(
    (connection) => connection.provider === provider && connection.id.length > 0
  );
  return (
    matching.find((connection) => connection.isActive !== false)?.id ?? matching[0]?.id ?? null
  );
}
