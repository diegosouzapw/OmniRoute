type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function summarizeProviderConnectionForAudit(connection: unknown) {
  const record = toRecord(connection);
  if (Object.keys(record).length === 0) return null;

  const sanitized: JsonRecord = { ...record };
  delete sanitized.apiKey;
  delete sanitized.accessToken;
  delete sanitized.refreshToken;
  delete sanitized.idToken;

  const providerSpecificData = toRecord(record.providerSpecificData);
  if (Object.keys(providerSpecificData).length > 0) {
    const sanitizedProviderSpecificData = { ...providerSpecificData };
    delete sanitizedProviderSpecificData.consoleApiKey;
    sanitized.providerSpecificData = sanitizedProviderSpecificData;
  }

  return sanitized;
}

export function getProviderAuditTarget(connection: unknown) {
  const record = toRecord(connection);
  const provider = typeof record.provider === "string" ? record.provider : null;
  const name = typeof record.name === "string" ? record.name : null;
  const id = typeof record.id === "string" ? record.id : null;

  return [provider, name || id].filter(Boolean).join(":") || "provider-connection";
}
