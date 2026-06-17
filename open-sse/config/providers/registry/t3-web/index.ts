import type { RegistryEntry } from "../../shared.ts";

export const t3_webProvider: RegistryEntry = {
  id: "t3-web",
  alias: "t3chat",
  format: "openai",
  executor: "t3-web",
  baseUrl: "https://t3.chat/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    // Claude
    { id: "claude-opus-4", name: "Claude Opus 4 (via t3.chat)" },
    { id: "claude-sonnet-4", name: "Claude Sonnet 4 (via t3.chat)" },
    { id: "claude-haiku-4", name: "Claude Haiku 4 (via t3.chat)" },
    { id: "claude-3.7", name: "Claude 3.7 Sonnet (via t3.chat)" },
    // GPT / OpenAI
    { id: "gpt-5", name: "GPT-5 (via t3.chat)" },
    { id: "gpt-4o", name: "GPT-4o (via t3.chat)" },
    { id: "gpt-4.1", name: "GPT-4.1 (via t3.chat)" },
    { id: "o3", name: "o3 (via t3.chat)" },
    { id: "o4-mini", name: "o4-mini (via t3.chat)" },
    // Gemini
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (via t3.chat)" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (via t3.chat)" },
    // DeepSeek
    { id: "deepseek-r1", name: "DeepSeek R1 (via t3.chat)", supportsReasoning: true },
    { id: "deepseek-v3", name: "DeepSeek V3 (via t3.chat)" },
    // Grok
    { id: "grok-3", name: "Grok 3 (via t3.chat)" },
    { id: "grok-3-mini", name: "Grok 3 Mini (via t3.chat)" },
    // Llama / Meta
    { id: "llama-4-maverick", name: "Llama 4 Maverick (via t3.chat)" },
    { id: "llama-4-scout", name: "Llama 4 Scout (via t3.chat)" },
    { id: "llama-3.3-70b", name: "Llama 3.3 70B (via t3.chat)" },
    // Mistral
    { id: "devstral", name: "Devstral (via t3.chat)" },
    { id: "mistral-large", name: "Mistral Large (via t3.chat)" },
    // Qwen
    { id: "qwen3-235b", name: "Qwen3 235B (via t3.chat)", supportsReasoning: true },
    { id: "qwen3-32b", name: "Qwen3 32B (via t3.chat)", supportsReasoning: true },
    // Kimi
    { id: "kimi-k2", name: "Kimi K2 (via t3.chat)" },
  ],
};
