import type { RegistryEntry } from "../../shared.ts";

// ClinePass — Cline's $9.99/mo BYOK API-key gateway (https://cline.bot). Distinct
// from the OAuth `cline` provider: same host (api.cline.bot) but a plain Bearer
// API key and the `cline-pass/*` model namespace. Responses are wrapped in a
// {success, data} envelope — unwrapped by open-sse/utils/clinepassEnvelope.ts.
export const clinepassProvider: RegistryEntry = {
  id: "clinepass",
  alias: "clinepass",
  format: "openai",
  executor: "default",
  // ClinePass shares Cline's streaming-only API — a non-streaming request returns
  // "generateText is not implemented" / an empty body. Force upstream streaming;
  // chatCore accumulates the SSE and converts it back to JSON for stream:false
  // clients. (Same as the sibling `cline` provider.)
  forceStream: true,
  baseUrl: "https://api.cline.bot/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  extraHeaders: {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
  },
  models: [
    { id: "cline-pass/glm-5.2", name: "GLM-5.2 (ClinePass)" },
    { id: "cline-pass/kimi-k2.7-code", name: "Kimi K2.7 Code (ClinePass)" },
    { id: "cline-pass/kimi-k2.6", name: "Kimi K2.6 (ClinePass)" },
    {
      id: "cline-pass/deepseek-v4-pro",
      name: "DeepSeek V4 Pro (ClinePass)",
      supportsReasoning: true,
      maxOutputTokens: 50000,
    },
    {
      id: "cline-pass/deepseek-v4-flash",
      name: "DeepSeek V4 Flash (ClinePass)",
      supportsReasoning: true,
      maxOutputTokens: 50000,
    },
    { id: "cline-pass/mimo-v2.5", name: "MiMo-V2.5 (ClinePass)" },
    { id: "cline-pass/mimo-v2.5-pro", name: "MiMo-V2.5-Pro (ClinePass)" },
    { id: "cline-pass/minimax-m3", name: "MiniMax M3 (ClinePass)", supportsVision: true },
    { id: "cline-pass/qwen3.7-max", name: "Qwen3.7 Max (ClinePass)" },
    { id: "cline-pass/qwen3.7-plus", name: "Qwen3.7 Plus (ClinePass)" },
  ],
  passthroughModels: true,
};
