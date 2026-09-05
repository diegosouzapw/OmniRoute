// Shared model catalog and visibility policy for the Google Cloud Code backend used by
// both the `antigravity` and `agy` providers. Provider-facing modules keep their existing
// exports, while this file is the single source of truth for what may appear in discovery.

export const GOOGLE_CLOUD_CODE_PUBLIC_MODELS = Object.freeze([
  // Gemini 3.8 Flash effort variants route through the shared `-tiered` upstream endpoint;
  // generationConfig carries the requested effort.
  {
    id: "gemini-3.8-flash-high",
    name: "Gemini 3.8 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.8-flash-medium",
    name: "Gemini 3.8 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.8-flash-low",
    name: "Gemini 3.8 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.8-flash-tiered",
    name: "Gemini 3.8 Flash (Tiered)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.1 Pro budget tiers. `gemini-3.1-pro-high` is deliberately absent:
  // discovery reports it, but the callable High endpoint is `gemini-pro-agent`.
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
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  // Claude models use upstream IDs directly through the shared backend.
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
  {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  },
]);

// Discovery is intentionally allowlisted. The upstream can retain stale, experimental, or
// account-specific entries; only models deliberately added above become selectable.
const PUBLIC_MODEL_IDS = new Set(GOOGLE_CLOUD_CODE_PUBLIC_MODELS.map((model) => model.id));
const AGGREGATE_QUOTA_BUCKET_IDS = new Set(["credits"]);

export function isDiscoverableGoogleCloudCodeModelId(modelId: string): boolean {
  return PUBLIC_MODEL_IDS.has(modelId.trim());
}

export function isVisibleGoogleCloudCodeQuotaModelId(modelId: string): boolean {
  return PUBLIC_MODEL_IDS.has(modelId) || AGGREGATE_QUOTA_BUCKET_IDS.has(modelId);
}
