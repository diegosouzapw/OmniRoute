export const CODEX_EFFORT_ORDER = [
  "none",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
] as const;
export type CodexEffortLevel = (typeof CODEX_EFFORT_ORDER)[number];
export const CODEX_MAX_ALIAS_MODELS = new Set([
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-6-astra",
]);
export const CODEX_ULTRA_ALIAS_MODELS = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-6-astra"]);

export function splitCodexReasoningSuffix(model: unknown): {
  baseModel: string;
  effort: CodexEffortLevel | null;
} {
  const modelId = typeof model === "string" ? model : "";
  const maxTierMatch = /^(.+?)(?:-(max|ultra)|\((max|ultra)\))$/.exec(modelId);
  if (maxTierMatch) {
    const [, baseModel, hyphenEffort, parenthesizedEffort] = maxTierMatch;
    const effort = hyphenEffort ?? parenthesizedEffort;
    const supportedModels = parenthesizedEffort
      ? CODEX_MAX_ALIAS_MODELS
      : effort === "ultra"
        ? CODEX_ULTRA_ALIAS_MODELS
        : CODEX_MAX_ALIAS_MODELS;
    if (supportedModels.has(baseModel)) {
      return { baseModel, effort: effort as CodexEffortLevel };
    }
  }

  for (const effort of ["none", "low", "medium", "high", "xhigh"] as const) {
    if (modelId.endsWith(`-${effort}`)) {
      return { baseModel: modelId.slice(0, -`-${effort}`.length), effort };
    }
  }
  return { baseModel: modelId, effort: null };
}
