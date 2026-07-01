export type ProviderModelCapabilityBoolean = boolean | null;
export type ProviderModelCapabilityNumber = number | null;
export type ProviderModelCapabilityText = string | null;

export interface ProviderModelCapabilities {
  contextWindow?: ProviderModelCapabilityNumber;
  maxInputTokens?: ProviderModelCapabilityNumber;
  maxOutputTokens?: ProviderModelCapabilityNumber;
  supportsVision?: ProviderModelCapabilityBoolean;
  supportsTools?: ProviderModelCapabilityBoolean;
  supportsReasoning?: ProviderModelCapabilityBoolean;
  supportsXHighEffort?: ProviderModelCapabilityBoolean;
  supportsMaxEffort?: ProviderModelCapabilityBoolean;
  defaultThinkingBudget?: ProviderModelCapabilityNumber;
  thinkingBudgetCap?: ProviderModelCapabilityNumber;
  thinkingOverhead?: ProviderModelCapabilityNumber;
  adaptiveMaxTokens?: ProviderModelCapabilityNumber;
  interleavedField?: ProviderModelCapabilityText;
}

export type ProviderModelCapabilitiesPatch = Partial<ProviderModelCapabilities>;

export type LegacyProviderModelCapabilitiesInput = ProviderModelCapabilitiesPatch & {
  supportsThinking?: boolean | null;
  contextLength?: number | null;
  inputTokenLimit?: number | null;
  outputTokenLimit?: number | null;
  toolCalling?: boolean | null;
  maxThinkingBudget?: number | null;
};

export type ModelCompatProtocolConfig = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
};

export type ModelCompatByProtocol = Partial<
  Record<"openai" | "openai-responses" | "claude", ModelCompatProtocolConfig>
>;

export interface ProviderModelCompatConfig {
  targetFormat?: string;
  unsupportedParams?: readonly string[];
  strip?: readonly string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: ModelCompatByProtocol;
}

export interface ProviderModelConfig {
  capabilities?: ProviderModelCapabilities;
  capabilityOverrides?: ProviderModelCapabilitiesPatch;
  compat?: ProviderModelCompatConfig;
}
