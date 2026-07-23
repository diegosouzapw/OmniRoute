// Antigravity CLI (`agy`) model catalog.
//
// These models are pinned from the live `:fetchAvailableModels` endpoint
// (https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels) using a
// real `agy` consumer-OAuth token. The public catalog exposes the upstream Gemini 3.6
// and 3.5 Flash ids verbatim; the shared Antigravity executor dispatches them unchanged.
//
// The `agy` provider reuses the `antigravity` executor/translator (identical backend),
// but keeps its own catalog so the CLI and IDE model surfaces can evolve independently.
// Both currently expose the same callable Claude/Gemini/GPT set. Tab-completion models
// (`tab_flash_lite_preview`, `tab_jump_flash_lite_preview`) are intentionally excluded —
// they are not chat-callable.

export const AGY_PUBLIC_MODELS = Object.freeze([
  // Gemini 3.6 Flash tiers. The live endpoint selects High by default and advertises
  // all three ids to both the IDE 2.1.1 and CLI 1.1.x clients.
  {
    id: "gemini-3.6-flash-high",
    name: "Gemini 3.6 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.6-flash-medium",
    name: "Gemini 3.6 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.6-flash-low",
    name: "Gemini 3.6 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Claude (Antigravity backend).
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.1 Pro
  {
    id: "gemini-pro-agent",
    name: "Gemini 3.1 Pro (High)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro-low",
    name: "Gemini 3.1 Pro (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-flash-agent",
    name: "Gemini 3.5 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-low",
    name: "Gemini 3.5 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-extra-low",
    name: "Gemini 3.5 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  // Gemini 2.5
  {
    id: "gemini-2.5-flash-thinking",
    name: "Gemini 2.5 Flash Thinking",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  // GPT-OSS
  {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  },
]);

const AGY_PUBLIC_MODEL_IDS = new Set(AGY_PUBLIC_MODELS.map((model) => model.id));
const AGY_NON_CHAT_MODEL_IDS = new Set(["tab_flash_lite_preview", "tab_jump_flash_lite_preview"]);

const AGY_CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  AGY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function getClientVisibleAgyModelName(modelId: string, fallbackName?: string): string {
  return AGY_CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export function isUserCallableAgyModelId(modelId: string): boolean {
  return !!modelId && AGY_PUBLIC_MODEL_IDS.has(modelId);
}

export function isDiscoverableAgyModelId(modelId: string): boolean {
  return !!modelId && !AGY_NON_CHAT_MODEL_IDS.has(modelId);
}
