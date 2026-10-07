import type { RegistryEntry } from "../../shared.ts";

/**
 * TinyCMS — session-cookie free-tier and subscription gateway.
 *
 * Users get a device UUID starting with "R" from site.tinycms.xyz (stored in localStorage
 * as app-config-uuid) and paste it as the credential.
 *
 * Emulates the cryptographic signatures (WASM signer) and Proof of Work expected
 * by the TinyCMS server.
 */
export const tinycmsProvider: RegistryEntry = {
  id: "tinycms-web",
  alias: "tcw",
  format: "openai",
  executor: "tinycms-web",
  baseUrl: "https://gov.freegpt.win/api/openai/oneapi/v1/chat/completions",
  authType: "apikey",
  authHeader: "uuid",
  models: [
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    },
    { id: "claude-opus-5", name: "Claude Opus 5" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "gpt-5.6-sol", name: "GPT 5.6 Sol" },
    { id: "gpt-5.6-luna", name: "GPT 5.6 Luna" },
    { id: "gpt-5.5", name: "GPT 5.5" },
    { id: "gpt-5.4-mini", name: "GPT 5.4 Mini" },
    { id: "gpt-5.4-nano", name: "GPT 5.4 Nano" },
    { id: "gpt-5.3-thinking-free", name: "GPT 5.3 Thinking Free", supportsReasoning: true },
    { id: "gpt-5.3-free", name: "GPT 5.3 Free (Multimodal/Vision)" },
    { id: "gpt-oss-120b", name: "GPT-OSS 120B" },
    { id: "gemini-3.6-flash", name: "Gemini 3.6 Flash" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
    { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite" },
    { id: "grok-4.5", name: "Grok 4.5" },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    { id: "kimi-k3", name: "Kimi K3" },
    { id: "glm-5.2", name: "GLM 5.2" },
    { id: "qwen3.6-plus", name: "Qwen 3.6 Plus" },
    { id: "mimo-v2.5-pro", name: "Mimo V2.5 Pro" },
    { id: "mimo-v2.5", name: "Mimo V2.5" },
  ],
};

export default tinycmsProvider;
