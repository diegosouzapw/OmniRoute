type JsonRecord = Record<string, unknown>;

type CodexConnectionIdentity = {
  workspaceId: string | null;
  userId: string | null;
  email: string | null;
};

function toRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as JsonRecord;
  if (typeof value !== "string" || !value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonRecord)
      : {};
  } catch {
    return {};
  }
}

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readIdentity(connection: JsonRecord): CodexConnectionIdentity {
  const providerSpecificData = toRecord(
    connection.providerSpecificData ?? connection.provider_specific_data
  );
  return {
    workspaceId: nonEmptyString(providerSpecificData.workspaceId),
    userId: nonEmptyString(providerSpecificData.chatgptUserId),
    email: nonEmptyString(connection.email),
  };
}

/** Select the existing Codex row that may represent an incoming strong user identity. */
export function pickCodexConnectionForUser(
  workspaceMatches: JsonRecord[],
  userId: string,
  email: string | null
): JsonRecord | null {
  const identities = workspaceMatches.map((connection) => ({
    connection,
    identity: readIdentity(connection),
  }));
  const exact = identities.find(({ identity }) => identity.userId === userId);
  if (exact) return exact.connection;
  if (identities.some(({ identity }) => identity.userId !== null)) return null;

  const normalizedEmail = nonEmptyString(email);
  const compatibleEmail = normalizedEmail
    ? identities.find(({ identity }) => identity.email === normalizedEmail)
    : null;
  return (
    compatibleEmail?.connection ||
    identities.find(({ identity }) => identity.email === null)?.connection ||
    null
  );
}
