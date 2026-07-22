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
  { id: "gpt-5.6-sol", name: "GPT-5.6 Sol", owned_by: "openai", notionCodename: "orange-mousse" },
  {
    id: "gpt-5.6-terra",
    name: "GPT-5.6 Terra",
    owned_by: "openai",
    notionCodename: "orchid-muffin",
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT-5.6 Luna",
    owned_by: "openai",
    notionCodename: "olive-jellyroll",
  },
  { id: "gpt-5.2", name: "GPT-5.2", owned_by: "openai", notionCodename: "oatmeal-cookie" },
  { id: "gpt-5.4", name: "GPT-5.4", owned_by: "openai", notionCodename: "oval-kumquat-medium" },
  { id: "gpt-5.5", name: "GPT-5.5", owned_by: "openai", notionCodename: "opal-quince-medium" },
  {
    id: "gpt-5.4-mini",
    name: "GPT-5.4 Mini",
    owned_by: "openai",
    notionCodename: "oregon-grape-medium",
  },
  {
    id: "gpt-5.4-nano",
    name: "GPT-5.4 Nano",
    owned_by: "openai",
    notionCodename: "otaheite-apple-medium",
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    owned_by: "gemini",
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
    notionCodename: "galette-medium-thinking",
  },
  {
    id: "sonnet-4.6",
    name: "Sonnet 4.6",
    owned_by: "anthropic",
    notionCodename: "almond-croissant-low",
  },
  { id: "sonnet-5", name: "Sonnet 5", owned_by: "anthropic", notionCodename: "angel-cake-high" },
  {
    id: "opus-4.6",
    name: "Opus 4.6",
    owned_by: "anthropic",
    notionCodename: "avocado-froyo-medium",
  },
  {
    id: "opus-4.7",
    name: "Opus 4.7",
    owned_by: "anthropic",
    notionCodename: "apricot-sorbet-high",
  },
  { id: "opus-4.8", name: "Opus 4.8", owned_by: "anthropic", notionCodename: "ambrosia-tart-high" },
  {
    id: "haiku-4.5",
    name: "Haiku 4.5",
    owned_by: "anthropic",
    notionCodename: "anthropic-haiku-4.5",
  },
  { id: "fable-5", name: "Fable 5", owned_by: "anthropic", notionCodename: "acai-budino-high" },
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6",
    owned_by: "mystery",
    notionCodename: "fireworks-kimi-k2.6",
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
    notionCodename: "baseten-deepseek-v4-pro",
  },
  { id: "glm-5.2", name: "GLM 5.2", owned_by: "mystery", notionCodename: "baseten-glm-5.2" },
  { id: "grok-4.3", name: "Grok 4.3", owned_by: "xai", notionCodename: "xigua-mochi-medium" },
  { id: "grok-4.5", name: "Grok 4.5", owned_by: "xai", notionCodename: "strawberry-whoopiepie" },
  {
    id: "grok-build-0.1",
    name: "Grok Build 0.1",
    owned_by: "xai",
    notionCodename: "xinomavro-cake",
  },
];

