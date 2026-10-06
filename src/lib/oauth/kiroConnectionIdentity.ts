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

/** True when the identity carries something that identifies the ACCOUNT (not the profile). */
function hasAccountIdentifier(identity: KiroConnectionIdentity): boolean {
  return Boolean(folded(identity.email) || trimmed(identity.clientId));
}

/** True when a shared field is present on both sides and disagrees — different accounts. */
function contradictsAccount(
  connection: KiroConnectionLike,
  identity: KiroConnectionIdentity
): boolean {
  const email = folded(identity.email);
  const existingEmail = folded(connection.email);
  if (email && existingEmail && email !== existingEmail) return true;

  const clientId = trimmed(identity.clientId);
  const existingClientId = trimmed(providerData(connection).clientId);
  if (clientId && existingClientId && clientId !== existingClientId) return true;

  return false;
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
    // A profile ARN identifies the CodeWhisperer PROFILE, not the account: distinct
    // Builder ID accounts (Google/GitHub social login) share the same ARN. Accepting it
    // as identity made a second social login overwrite the first connection (#10815).
    // Only trust the ARN when the incoming identity carries an account-level identifier
    // that does not contradict the stored one.
    if (match && hasAccountIdentifier(identity) && !contradictsAccount(match, identity)) {
      return match;
    }
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
