type JsonRecord = Record<string, unknown>;

export const CODEX_REASONING_EFFORT_VALUES = ["none", "low", "medium", "high", "xhigh"] as const;

export type CodexReasoningEffort = (typeof CODEX_REASONING_EFFORT_VALUES)[number];

const CODEX_REASONING_EFFORT_SET = new Set<string>(CODEX_REASONING_EFFORT_VALUES);

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized || undefined;
}

export function normalizeCodexReasoningEffort(value: unknown): CodexReasoningEffort | undefined {
  const normalized = normalizeString(value);
  if (!normalized || !CODEX_REASONING_EFFORT_SET.has(normalized)) {
    return undefined;
  }
  return normalized as CodexReasoningEffort;
}

export function normalizeCodexServiceTier(value: unknown): "priority" | undefined {
  const normalized = normalizeString(value);
  if (!normalized) return undefined;
  if (normalized === "fast" || normalized === "priority") return "priority";
  return undefined;
}

export function normalizeRequestDefaults(
  provider: string | null | undefined,
  value: unknown
): JsonRecord | undefined {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return undefined;

  const normalized: JsonRecord = { ...record };

  if (provider === "codex") {
    const reasoningEffort = normalizeCodexReasoningEffort(record.reasoningEffort);
    if (reasoningEffort) {
      normalized.reasoningEffort = reasoningEffort;
    } else {
      delete normalized.reasoningEffort;
    }

    const serviceTier = normalizeCodexServiceTier(record.serviceTier);
    if (serviceTier) {
      normalized.serviceTier = serviceTier;
    } else {
      delete normalized.serviceTier;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function normalizeProviderSpecificData(
  provider: string | null | undefined,
  value: unknown
): JsonRecord | undefined {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return undefined;

  const normalized: JsonRecord = { ...record };

  if ("requestDefaults" in normalized) {
    const requestDefaults = normalizeRequestDefaults(provider, normalized.requestDefaults);
    if (requestDefaults) {
      normalized.requestDefaults = requestDefaults;
    } else {
      delete normalized.requestDefaults;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function getProviderRequestDefaults(
  provider: string | null | undefined,
  providerSpecificData: unknown
): JsonRecord {
  return normalizeRequestDefaults(provider, asRecord(providerSpecificData).requestDefaults) || {};
}

export function getCodexRequestDefaults(providerSpecificData: unknown): {
  reasoningEffort?: CodexReasoningEffort;
  serviceTier?: "priority";
} {
  const defaults = getProviderRequestDefaults("codex", providerSpecificData);
  const reasoningEffort = normalizeCodexReasoningEffort(defaults.reasoningEffort);
  const serviceTier = normalizeCodexServiceTier(defaults.serviceTier);
  return {
    ...(reasoningEffort ? { reasoningEffort } : {}),
    ...(serviceTier ? { serviceTier } : {}),
  };
}
