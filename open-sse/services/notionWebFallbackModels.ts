/**
 * Notion Web fallback model catalog (seeded from the live AI picker).
 * Extracted from notionWebModels.ts to keep that module under the 800-line
 * file-size cap; notionWebModels.ts re-exports both symbols for consumers.
 */

export type NotionDiscoveredModel = {
  /**
   * Catalog / OpenAI-compatible model id shown to clients.
   * Prefer the web picker label slug (e.g. `fable-5`, `gpt-5.6-sol`) so users
   * never have to choose Notion's internal food codenames.
   */
  id: string;
  /** Human label from Notion's AI picker (`modelMessage`), e.g. "Fable 5". */
  name: string;
  owned_by: string;
  supportsReasoning?: boolean;
  disabled?: boolean;
  /**
   * Internal Notion `model` codename for `runInferenceTranscript`
   * (e.g. `acai-budino-high`). When omitted, `id` is the codename itself
   * (rare; only when no display label was available).
   */
  notionCodename?: string;
};

/**
 * Offline fallback when getAvailableModels is unreachable (seeded from live picker).
 * Catalog ids use real web-picker labels; `notionCodename` is what the API accepts.
 */
export const NOTION_WEB_FALLBACK_MODELS: NotionDiscoveredModel[] = [
  { id: "notion-ai", name: "Notion AI (default)", owned_by: "notion" },
  {
    id: "gpt-5.6-sol",
    name: "GPT-5.6 Sol",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "orange-mousse",
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "orchid-muffin",
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "olive-jellyroll",
  },
  {
    id: "gpt-5.5",
    name: "GPT-5.5",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "opal-quince-medium",
  },
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "oval-kumquat-medium",
  },
  {
    id: "gpt-5.4-mini",
    name: "GPT-5.4 Mini",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "oregon-grape-medium",
  },
  {
    id: "gpt-5.4-nano",
    name: "GPT-5.4 Nano",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "otaheite-apple-medium",
  },
  {
    id: "gpt-5.2",
    name: "GPT-5.2",
    owned_by: "openai",
    supportsReasoning: true,
    notionCodename: "oatmeal-cookie",
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    owned_by: "gemini",
    supportsReasoning: true,
    notionCodename: "grapefruit-zeppole",
  },
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    owned_by: "gemini",
    supportsReasoning: true,
    notionCodename: "vertex-gemini-3.6-flash",
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    owned_by: "gemini",
    supportsReasoning: true,
    notionCodename: "vertex-gemini-3.5-flash",
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    owned_by: "gemini",
    notionCodename: "gingerbread",
  },
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    owned_by: "gemini",
    supportsReasoning: true,
    notionCodename: "galette-medium-thinking",
  },
  {
    id: "fable-5",
    name: "Claude Fable 5",
    owned_by: "anthropic",
    supportsReasoning: true,
    disabled: true,
    notionCodename: "acai-budino-high",
  },
  {
    id: "opus-5.5",
    name: "Claude Opus 5.5",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "albuquerque-quinn",
  },
  {
    id: "opus-5",
    name: "Claude Opus 5",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "agave-flan",
  },
  {
    id: "opus-4.8",
    name: "Claude Opus 4.8",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "ambrosia-tart-high",
  },
  {
    id: "opus-4.7",
    name: "Claude Opus 4.7",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "apricot-sorbet-high",
  },
  {
    id: "opus-4.6",
    name: "Claude Opus 4.6",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "avocado-froyo-medium",
  },
  {
    id: "sonnet-5.5",
    name: "Claude Sonnet 5.5",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "achira-donut",
  },
  {
    id: "sonnet-5",
    name: "Claude Sonnet 5",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "angel-cake-high",
  },
  {
    id: "sonnet-4.6",
    name: "Claude Sonnet 4.6",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "almond-croissant-low",
  },
  {
    id: "haiku-5.5",
    name: "Claude Haiku 5.5",
    owned_by: "anthropic",
    supportsReasoning: true,
    notionCodename: "amla-jam",
  },
  {
    id: "haiku-4.5",
    name: "Claude Haiku 4.5",
    owned_by: "anthropic",
    notionCodename: "anthropic-haiku-4.5",
  },
  {
    id: "grok-4.6",
    name: "Grok 4.6",
    owned_by: "xai",
    supportsReasoning: true,
    notionCodename: "soursop-shortcake",
  },
  {
    id: "grok-4.5",
    name: "Grok 4.5",
    owned_by: "xai",
    supportsReasoning: true,
    notionCodename: "strawberry-whoopiepie",
  },
  {
    id: "grok-4.3",
    name: "Grok 4.3",
    owned_by: "xai",
    supportsReasoning: true,
    notionCodename: "xigua-mochi-medium",
  },
  {
    id: "grok-build-0.1",
    name: "Grok Build 0.1",
    owned_by: "xai",
    notionCodename: "xinomavro-cake",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "fireworks-kimi-k3",
  },
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code",
    owned_by: "mystery",
    notionCodename: "fireworks-kimi-k2.7",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-deepseek-v4-pro",
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-deepseek-v4-flash",
  },
  {
    id: "deepseek-v4.1-flash",
    name: "DeepSeek V4.1 Flash",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-deepseek-v4.1-flash",
  },
  {
    id: "glm-5.3-flash",
    name: "GLM 5.3 Flash",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-glm-5.3-flash",
  },
  {
    id: "glm-5.3",
    name: "GLM 5.3",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-glm-5.3",
  },
  {
    id: "glm-5.2",
    name: "GLM 5.2",
    owned_by: "mystery",
    supportsReasoning: true,
    notionCodename: "baseten-glm-5.2",
  },
];
