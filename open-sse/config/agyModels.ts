// Antigravity CLI (`agy`) model catalog.
//
// These IDs were pinned directly from the live `:fetchAvailableModels` endpoint
// (https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels) using a
// real `agy` consumer-OAuth token on 2026-05-29. They are the exact upstream model IDs
// the Antigravity backend accepts — no alias remapping is required (unlike the
// `antigravity` provider, whose catalog used display IDs that needed remapping).
//
// The `agy` provider reuses the `antigravity` executor/translator (identical backend),
// but ships its OWN catalog so it can expose models the `antigravity` provider's static
// list omits — notably the Claude models (`claude-opus-4-6-thinking`, `claude-sonnet-4-6`),
// which `:fetchAvailableModels` reports as user-callable with quota even though the
// `antigravity` catalog comment assumes they 404. Tab-completion models
// (`tab_flash_lite_preview`, `tab_jump_flash_lite_preview`) are intentionally excluded —
// they are not chat-callable.

export const AGY_PUBLIC_MODELS = Object.freeze([
  // Claude (Antigravity backend) — the headline differentiator for this provider.
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.x
  {
    id: "gemini-3.1-pro-high",
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
    id: "gemini-pro-agent",
    name: "Gemini 3.1 Pro (Agent)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-flash-agent",
    name: "Gemini 3.5 Flash (Agent)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-low",
    name: "Gemini 3.5 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.5-flash-extra-low",
    name: "Gemini 3.5 Flash (Extra Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
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
  { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image" },
  // Gemini 2.5
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
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
    id: "gemini-2.5-flash-thinking",
    name: "Gemini 2.5 Flash Thinking",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
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
