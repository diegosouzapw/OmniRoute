import { CODEBUDDY_INTL_USER_AGENT } from "../../../providerHeaderProfiles.ts";
import type { RegistryEntry } from "../../shared.ts";

/**
 * CodeBuddy International (codebuddy.ai).
 *
 * Unified OpenAI-compatible gateway behind the CodeBuddy International service.
 * Carries live-probed models (GLM, Kimi, MiniMax, DeepSeek, Hunyuan, GPT, Gemini)
 * and reasons via OpenAI-style `reasoning_effort` (not vendor-native thinking shapes).
 * Streaming is forced by the executor because non-stream requests are rejected
 * with code 11101. The intl gateway publishes no model-catalog endpoint, so
 * this list is curated from live-gateway probes.
 *
 * Short alias "cbai" matches the reserved alias convention.
 */
export const codebuddy_intlProvider: RegistryEntry = {
  id: "codebuddy-intl",
  alias: "cbai",
  format: "openai",
  executor: "codebuddy-intl",
  baseUrl: "https://www.codebuddy.ai/v2/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  headers: {
    "User-Agent": CODEBUDDY_INTL_USER_AGENT,
    "X-Product": "SaaS",
    "X-IDE-Type": "IDE",
    "X-IDE-Name": "IDE",
    "x-requested-with": "XMLHttpRequest",
    "x-codebuddy-request": "1",
  },
  models: [
    {
      id: "hy4-preview",
      name: "Hy4-Preview",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "hy3",
      name: "Hy3",
      contextLength: 192000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "gpt-6-astra",
      name: "GPT 6.0 Astra",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-6-luna",
      name: "GPT-6-Luna",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-6-sol",
      name: "GPT-6-Sol",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-sol",
      name: "GPT-5.6-Sol",
      contextLength: 512000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-terra",
      name: "GPT-5.6-Terra",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-luna",
      name: "GPT-5.6-Luna",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.5",
      name: "GPT-5.5",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.3-codex",
      name: "GPT-5.3-Codex",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gemini-3.5-flash",
      name: "Gemini-3.5-Flash",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "glm-5v-turbo",
      name: "GLM-5v-Turbo",
      contextLength: 200000,
      maxOutputTokens: 38000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "glm-5.3",
      name: "GLM-5.3",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "glm-5.3-flash",
      name: "GLM-5.3-Flash",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "glm-5.1",
      name: "GLM-5.1",
      contextLength: 200000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "minimax-m3",
      name: "MiniMax-M3",
      contextLength: 512000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k3",
      name: "Kimi-K3",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k2.7",
      name: "Kimi-K2.7-Code",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k2.6",
      name: "Kimi-K2.6",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "deepseek-v4.1-flash",
      name: "DeepSeek-V4.1-Flash",
      contextLength: 1000000,
      maxOutputTokens: 50000,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
};

export default codebuddy_intlProvider;
