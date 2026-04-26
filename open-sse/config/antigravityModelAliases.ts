export const ANTIGRAVITY_PUBLIC_MODELS = Object.freeze([
  { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro (High)" },
  { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro (Low)" },
  { id: "gemini-3-flash", name: "Gemini 3 Flash" },
  { id: "claude-opus-4-6-thinking", name: "Claude Opus 4.6 Thinking (Gemini Route)" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 Thinking (Gemini Route)" },
  { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium" },
  { id: "gemini-3-pro-image", name: "Gemini 3 Pro Image" },
  { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image" },
  {
    id: "gemini-2.5-computer-use-preview-10-2025",
    name: "Gemini 2.5 Computer Use Preview (10/2025)",
  },
]);

export const ANTIGRAVITY_MODEL_ALIASES = Object.freeze({
  "gemini-2.5-computer-use-preview-10-2025": "rev19-uic3-1p",
});

type AntigravityModelAliasMap = Record<string, string>;

export const ANTIGRAVITY_REVERSE_MODEL_ALIASES = Object.freeze(
  Object.entries(ANTIGRAVITY_MODEL_ALIASES).reduce<Record<string, string>>(
    (acc, [alias, target]) => {
      if (!acc[target]) {
        acc[target] = alias;
      }
      return acc;
    },
    {}
  )
);

const CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  ANTIGRAVITY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function resolveAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return (ANTIGRAVITY_MODEL_ALIASES as AntigravityModelAliasMap)[modelId] || modelId;
}

export function toClientAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_REVERSE_MODEL_ALIASES[modelId] || modelId;
}

export function getClientVisibleAntigravityModelName(
  modelId: string,
  fallbackName?: string
): string {
  return CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}
