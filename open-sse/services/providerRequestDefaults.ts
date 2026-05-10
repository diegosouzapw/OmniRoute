type JsonRecord = Record<string, unknown>;

export interface ProviderRequestDefaults {
  maxTokens?: number;
  temperature?: number;
  thinkingBudgetTokens?: number;
  thinkingType?: "enabled" | "adaptive";
}

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as JsonRecord;
}

function toPositiveInteger(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const normalized = Math.floor(value);
  return normalized > 0 ? normalized : null;
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function getExistingMaxTokens(body: JsonRecord): number | null {
  return (
    toPositiveInteger(body.max_tokens) ||
    toPositiveInteger(body.max_completion_tokens) ||
    toPositiveInteger(body.max_output_tokens)
  );
}

export function applyProviderRequestDefaults(
  body: unknown,
  defaults?: ProviderRequestDefaults | null
): unknown {
  const record = asRecord(body);
  if (!record || !defaults) return body;

  let changed = false;
  const next: JsonRecord = { ...record };

  const defaultTemperature = toFiniteNumber(defaults.temperature);
  if (next.temperature === undefined && defaultTemperature !== null) {
    next.temperature = defaultTemperature;
    changed = true;
  }

  const defaultMaxTokens = toPositiveInteger(defaults.maxTokens);
  const explicitMaxTokens = getExistingMaxTokens(next);
  let effectiveMaxTokens = explicitMaxTokens;

  if (next.max_tokens === undefined && explicitMaxTokens === null && defaultMaxTokens !== null) {
    next.max_tokens = defaultMaxTokens;
    effectiveMaxTokens = defaultMaxTokens;
    changed = true;
  }

  const defaultThinkingBudget = toPositiveInteger(defaults.thinkingBudgetTokens);
  const thinking = asRecord(next.thinking);
  const thinkingAlreadyEnabled = thinking?.type === "enabled";
  const thinkingBudgetSet = toPositiveInteger(thinking?.budget_tokens) !== null;

  if (defaultThinkingBudget !== null && effectiveMaxTokens !== null && effectiveMaxTokens > 1) {
    const safeBudget = Math.min(defaultThinkingBudget, effectiveMaxTokens - 1);

    if (safeBudget > 0) {
      if (next.thinking === undefined) {
        next.thinking = {
          type: "enabled",
          budget_tokens: safeBudget,
        };
        changed = true;
      } else if (thinkingAlreadyEnabled && !thinkingBudgetSet) {
        next.thinking = {
          ...thinking,
          budget_tokens: safeBudget,
        };
        changed = true;
      }
    }
  }

  return changed ? next : body;
}
