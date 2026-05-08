import { getCodexRequestDefaults, normalizeCodexServiceTier } from "./requestDefaults";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function isCodexGlobalFastServiceTierEnabled(settings: unknown): boolean {
  const record = asRecord(settings);
  const codexServiceTier = record.codexServiceTier;

  if (typeof codexServiceTier === "boolean") {
    return codexServiceTier;
  }

  const codexServiceTierRecord = asRecord(codexServiceTier);
  if (codexServiceTierRecord.enabled === true) {
    return true;
  }

  return record.codexFastServiceTier === true;
}

export function getCodexEffectiveFastServiceTier(
  providerSpecificData: unknown,
  globalFastServiceTierEnabled: boolean
): boolean {
  return (
    globalFastServiceTierEnabled ||
    getCodexRequestDefaults(providerSpecificData).serviceTier === "priority"
  );
}

export function applyCodexGlobalFastServiceTier<T extends JsonRecord | null | undefined>(
  provider: string | null | undefined,
  credentials: T,
  settings: unknown
): T {
  if (provider !== "codex" || !isCodexGlobalFastServiceTierEnabled(settings)) {
    return credentials;
  }

  if (!credentials || typeof credentials !== "object" || Array.isArray(credentials)) {
    return credentials;
  }

  const providerSpecificData = asRecord(credentials.providerSpecificData);
  const requestDefaults = asRecord(providerSpecificData.requestDefaults);

  if (normalizeCodexServiceTier(requestDefaults.serviceTier)) {
    return credentials;
  }

  return {
    ...credentials,
    providerSpecificData: {
      ...providerSpecificData,
      requestDefaults: {
        ...requestDefaults,
        serviceTier: "priority",
      },
    },
  } as T;
}
