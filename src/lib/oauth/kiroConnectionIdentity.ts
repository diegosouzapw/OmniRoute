export type KiroConnectionLike = {
  id?: unknown;
  authType?: unknown;
  name?: unknown;
  email?: unknown;
  providerSpecificData?: unknown;
  [key: string]: unknown;
};

export type KiroConnectionIdentity = {
  authType?: unknown;
  profileArn?: unknown;
  clientId?: unknown;
  email?: unknown;
  name?: unknown;
};

function trimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function folded(value: unknown): string {
  return trimmed(value).toLowerCase();
}

function providerData(connection: KiroConnectionLike): Record<string, unknown> {
  const value = connection.providerSpecificData;
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** Find an existing Kiro account without comparing OAuth tokens or API keys. */
export function findKiroConnectionByIdentity(
  connections: KiroConnectionLike[],
  identity: KiroConnectionIdentity
): KiroConnectionLike | null {
  const authType = folded(identity.authType);
  const candidates = authType
    ? connections.filter((connection) => folded(connection.authType) === authType)
    : connections;

  const profileArn = trimmed(identity.profileArn);
  if (profileArn) {
    const match = candidates.find(
      (connection) => trimmed(providerData(connection).profileArn) === profileArn
    );
    if (match) return match;
  }

  const clientId = trimmed(identity.clientId);
  if (clientId) {
    const match = candidates.find(
      (connection) => trimmed(providerData(connection).clientId) === clientId
    );
    if (match) return match;
  }

  const email = folded(identity.email);
  if (email) {
    const match = candidates.find((connection) => folded(connection.email) === email);
    if (match) return match;
  }

  const name = folded(identity.name);
  if (name) {
    const match = candidates.find((connection) => folded(connection.name) === name);
    if (match) return match;
  }

  return null;
}
