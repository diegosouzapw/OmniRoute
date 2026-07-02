type JsonRecord = Record<string, unknown>;
const WARNING_PATTERNS = [
  /\[sanitizer\]/i,
  /prompt injection detected/i,
  /content(?:\s+has\s+been|\s+was)?\s+filtered/i,
  /safety filter/i,
  /policy violation/i,
] as const;
const WARNING_KEY_PATTERN = /warning/i;
const MAX_WARNING_HITS = 5;
const MAX_WARNING_DEPTH = 6;
const MAX_WARNING_LENGTH = 400;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function truncateWarning(value: string) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length > MAX_WARNING_LENGTH
    ? `${compact.slice(0, MAX_WARNING_LENGTH)}...`
    : compact;
}

function matchesProviderWarning(value: string, keyHint?: string) {
  if (!value) return false;
  if (WARNING_PATTERNS.some((pattern) => pattern.test(value))) return true;
  return Boolean(keyHint && WARNING_KEY_PATTERN.test(keyHint));
}

function collectProviderWarnings(value: unknown, hits: Set<string>, keyHint?: string, depth = 0) {
  if (
    hits.size >= MAX_WARNING_HITS ||
    depth >= MAX_WARNING_DEPTH ||
    value === null ||
    value === undefined
  ) {
    return;
  }

  if (typeof value === "string") {
    if (matchesProviderWarning(value, keyHint)) {
      hits.add(truncateWarning(value));
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectProviderWarnings(item, hits, keyHint, depth + 1));
    return;
  }

  if (typeof value !== "object") {
    return;
  }

  for (const [key, entryValue] of Object.entries(value as JsonRecord)) {
    collectProviderWarnings(entryValue, hits, key, depth + 1);
    if (hits.size >= MAX_WARNING_HITS) {
      break;
    }
  }
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

export function extractProviderWarnings(...payloads: unknown[]) {
  const hits = new Set<string>();
  payloads.forEach((payload) => collectProviderWarnings(payload, hits));
  return Array.from(hits);
}
