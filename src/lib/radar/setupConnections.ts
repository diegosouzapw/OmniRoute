export interface RadarSetupConnection {
  id: string;
  provider: string;
  isActive?: boolean;
}

/** Reuse the authenticated provider-connections API with a bounded provider filter. */
export function providerConnectionsRequestUrl(provider: string): string {
  return `/api/providers?provider=${encodeURIComponent(provider)}`;
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
