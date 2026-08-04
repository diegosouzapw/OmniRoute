const REASONING_EFFORT_PREFIX = "REASONING_EFFORT_";
const CONTEXT_LENGTH_PREFIX = "CONTEXT_LENGTH_";

export interface KimiWebModelConfig {
  scenario: string;
  kimiPlusId?: string;
  supportedReasoningEfforts: string[];
  defaultReasoningEffort?: string;
  supportedContextLengths: string[];
  defaultContextLength?: string;
}

const STATIC_MODEL_CONFIGS: Record<string, KimiWebModelConfig> = {
  k3: {
    scenario: "SCENARIO_OK_COMPUTER",
    kimiPlusId: "ok-computer",
    supportedReasoningEfforts: [
      "REASONING_EFFORT_LOW",
      "REASONING_EFFORT_HIGH",
      "REASONING_EFFORT_MAX",
    ],
    defaultReasoningEffort: "REASONING_EFFORT_MAX",
    supportedContextLengths: ["CONTEXT_LENGTH_L", "CONTEXT_LENGTH_XL"],
    defaultContextLength: "CONTEXT_LENGTH_L",
  },
  k2d6: {
    scenario: "SCENARIO_K2D5",
    supportedReasoningEfforts: ["REASONING_EFFORT_NONE", "REASONING_EFFORT_LOW"],
    defaultReasoningEffort: "REASONING_EFFORT_NONE",
    supportedContextLengths: [],
  },
};

function toNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function resolveKimiWebModelConfig(modelId: string): KimiWebModelConfig | null {
  return STATIC_MODEL_CONFIGS[modelId] || null;
}

export function resolveKimiWebReasoningEffort(
  value: unknown,
  config: KimiWebModelConfig
): string | undefined {
  const requested = toNonEmptyString(value);
  const normalized = requested
    ? requested.startsWith(REASONING_EFFORT_PREFIX)
      ? requested.toUpperCase()
      : `${REASONING_EFFORT_PREFIX}${requested.toUpperCase()}`
    : config.defaultReasoningEffort;

  if (!normalized) return undefined;
  if (!config.supportedReasoningEfforts.includes(normalized)) {
    throw new Error(`Kimi Web model does not support reasoning_effort=${requested || normalized}`);
  }
  return normalized;
}

export function resolveKimiWebContextLength(
  value: unknown,
  config: KimiWebModelConfig
): string | undefined {
  const requested = toNonEmptyString(value);
  const normalized = requested
    ? requested.startsWith(CONTEXT_LENGTH_PREFIX)
      ? requested.toUpperCase()
      : `${CONTEXT_LENGTH_PREFIX}${requested.toUpperCase()}`
    : config.defaultContextLength;

  if (!normalized) return undefined;
  if (!config.supportedContextLengths.includes(normalized)) {
    throw new Error(`Kimi Web model does not support context_length=${requested || normalized}`);
  }
  return normalized;
}
