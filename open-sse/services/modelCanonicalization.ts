import { resolveProviderAlias } from "./providerAlias.ts";

type ProviderModelAliasMap = Record<string, Record<string, string>>;

// Provider-scoped legacy model aliases. Kept in a client-safe leaf so dashboard
// components can canonicalize combo targets without importing the server-only
// routing and credential graph from services/model.ts.
const PROVIDER_MODEL_ALIASES: ProviderModelAliasMap = {
  openai: {
    "gpt-4o-mini": "gpt-4o-mini",
  },
  github: {
    "claude-4.5-opus": "claude-opus-4-5-20251101",
    "claude-opus-4.5": "claude-opus-4-5-20251101",
    "gemini-3-pro": "gemini-3.1-pro-preview",
    "gemini-3-pro-preview": "gemini-3.1-pro-preview",
    "gemini-3-flash": "gemini-3-flash-preview",
    "raptor-mini": "oswe-vscode-prime",
  },
  gemini: {
    "gemini-3.1-pro": "gemini-3.1-pro-preview",
    "gemini-3-1-pro": "gemini-3.1-pro-preview",
  },
  nvidia: {
    "gpt-oss-120b": "openai/gpt-oss-120b",
    "nvidia/gpt-oss-120b": "openai/gpt-oss-120b",
    "gpt-oss-20b": "openai/gpt-oss-20b",
    "nvidia/gpt-oss-20b": "openai/gpt-oss-20b",
  },
  synthetic: {
    "syn:gpt-oss-120b": "hf:openai/gpt-oss-120b",
    "syn:large:text": "hf:zai-org/GLM-5.2",
    "syn:large:vision": "hf:moonshotai/Kimi-K2.7-Code",
    "syn:small:vision": "hf:Qwen/Qwen3.6-27B",
    "syn:minimax-m3": "hf:MiniMaxAI/MiniMax-M3",
    "syn:small:text": "hf:zai-org/GLM-4.7-Flash",
    "syn:nemotron-3-super": "hf:nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4",
  },
  antigravity: {},
  kiro: {
    "claude-opus-4-7": "claude-opus-4.7",
    "claude-opus-4-6": "claude-opus-4.6",
    "claude-sonnet-4-6": "claude-sonnet-4.6",
    "claude-sonnet-4-5": "claude-sonnet-4.5",
    "claude-haiku-4-5": "claude-haiku-4.5",
  },
  "zed-hosted": {
    "claude-haiku-4-5": "claude-haiku-4.5",
  },
};

export function hasProviderModelAlias(providerId: string, modelId: string): boolean {
  const aliases = PROVIDER_MODEL_ALIASES[providerId];
  return !!aliases && Object.prototype.hasOwnProperty.call(aliases, modelId);
}

export function resolveProviderModelAlias(
  providerOrAlias: string | null | undefined,
  modelId: string | null | undefined
) {
  if (!modelId || typeof modelId !== "string") return modelId;
  const providerId = resolveProviderAlias(providerOrAlias);
  if (typeof providerId !== "string") return modelId;
  const aliases = PROVIDER_MODEL_ALIASES[providerId];
  return aliases?.[modelId] || modelId;
}

export function resolveCanonicalProviderModel(
  providerOrAlias: string | null | undefined,
  modelId: string | null | undefined
) {
  if (!modelId || typeof modelId !== "string") {
    return {
      provider: resolveProviderAlias(providerOrAlias),
      model: modelId || null,
    };
  }

  const provider = resolveProviderAlias(providerOrAlias);
  return {
    provider,
    model: resolveProviderModelAlias(provider, modelId),
  };
}
