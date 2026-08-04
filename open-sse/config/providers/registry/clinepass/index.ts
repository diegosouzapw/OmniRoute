import type { RegistryEntry } from "../../shared.ts";

// ClinePass — Cline's $9.99/mo gateway (https://cline.bot). Dual-auth: sign in
// with a Cline account (OAuth, reusing the `cline` WorkOS flow) OR paste a direct
// BYOK API key. Same host (api.cline.bot) as the OAuth `cline` provider; the
// `cline-pass/*` model namespace. The current API uses OpenAI-compatible SSE;
// the response path also tolerates the legacy {success, data} JSON envelope.
export const clinepassProvider: RegistryEntry = {
  id: "clinepass",
  // MUST match the OAUTH_PROVIDERS catalog alias (src/shared/constants/providers/oauth.ts).
  // The dashboard sends models as `<catalogAlias>/<modelId>` (e.g. "cp/cline-pass/glm-5.2"),
  // and routing resolves the prefix via ALIAS_TO_PROVIDER_ID (built from this field). If the
  // registry alias drifts from the catalog alias, the prefix won't resolve, the executor falls
  // back to PROVIDERS.openai, and requests hit api.openai.com with the ClinePass key → 401.
  alias: "cp",
  format: "openai",
  executor: "default",
  // ClinePass shares Cline's streaming-only API — a non-streaming request returns
  // "generateText is not implemented" / an empty body. Force upstream streaming;
  // chatCore accumulates the SSE and converts it back to JSON for stream:false
  // clients. (Same as the sibling `cline` provider. #6165.)
  forceStream: true,
  baseUrl: "https://api.cline.bot/api/v1/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  oauth: {
    tokenUrl: "https://api.cline.bot/api/v1/auth/token",
    refreshUrl: "https://api.cline.bot/api/v1/auth/refresh",
    authUrl: "https://api.cline.bot/api/v1/auth/authorize",
  },
  extraHeaders: {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
  },
  // Offline fallback copied from Cline CLI 3.0.46's generated catalog. Live
  // discovery replaces it with the authored recommended-models order.
  models: [
    {
      id: "cline-pass/glm-5.2",
      name: "GLM-5.2",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "cline-pass/minimax-m3",
      name: "MiniMax-M3",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 512000,
    },
    {
      id: "cline-pass/deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 384000,
    },
    {
      id: "cline-pass/deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 65536,
    },
    {
      id: "cline-pass/kimi-k3",
      name: "Kimi K3",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 1048576,
    },
    {
      id: "cline-pass/kimi-k2.7-code",
      name: "Kimi K2.7 Code",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 262144,
      maxInputTokens: 262144,
      maxOutputTokens: 262144,
    },
    {
      id: "cline-pass/mimo-v2.5-pro",
      name: "MiMo-V2.5-Pro",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "cline-pass/mimo-v2.5",
      name: "MiMo-V2.5",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1048576,
      maxInputTokens: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "cline-pass/qwen3.7-max",
      name: "Qwen3.7 Max",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1000000,
      maxInputTokens: 1000000,
      maxOutputTokens: 65536,
    },
    {
      id: "cline-pass/qwen3.7-plus",
      name: "Qwen3.7 Plus",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1000000,
      maxInputTokens: 1000000,
      maxOutputTokens: 65536,
    },
  ],
  passthroughModels: true,
};
