import type { RegistryEntry } from "../../shared.ts";

export const puterProvider: RegistryEntry = {
  id: "puter",
  alias: "pu",
  format: "openai",
  executor: "puter",
  // OpenAI-compatible gateway with 500+ models (GPT, Claude, Gemini, Grok, DeepSeek, Qwen…)
  // Auth: Bearer <puter_auth_token> from puter.com/dashboard → Copy Auth Token
  // Model IDs use provider/model-name format for non-OpenAI models.
  // Only chat completions (incl. streaming) are available via REST.
  // Image gen, TTS, STT, video are puter.js SDK-only (browser).
  baseUrl: "https://api.puter.com/puterai/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // OpenAI — use bare IDs
    { id: "gpt-5.5", name: "GPT-5.5 (Puter)" },
    { id: "gpt-5.4", name: "GPT-5.4 (Puter)" },
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini (Puter)" },
    { id: "gpt-5.4-nano", name: "GPT-5.4 Nano (Puter)" },
    { id: "gpt-4o", name: "GPT-4o (Puter)" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini (🆓 Puter)" },
    { id: "o3", name: "OpenAI o3 (Puter)" },
    // Anthropic Claude — use bare IDs (confirmed working)
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (Puter)" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Puter)" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7 (Puter)" },
    // Google Gemini — use google/ prefix (confirmed working)
    { id: "google/gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite (Puter)" },
    { id: "google/gemini-3-flash", name: "Gemini 3 Flash (Puter)" },
    { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Puter)" },
    // DeepSeek — use deepseek/ prefix (confirmed working)
    {
      id: "deepseek/deepseek-v4-pro",
      name: "DeepSeek V4 Pro (Puter)",
      supportsReasoning: true,
    },
    {
      id: "deepseek/deepseek-v4-flash",
      name: "DeepSeek V4 Flash (Puter)",
      supportsReasoning: true,
    },
    // xAI Grok — use x-ai/ prefix
    { id: "x-ai/grok-4.3", name: "Grok 4.3 (Puter)" },
    { id: "x-ai/grok-4.20", name: "Grok 4.20 (Puter)" },
    // Meta Llama — bare IDs (confirmed ✅)
    { id: "llama-4-scout", name: "Llama 4 Scout (Puter)" },
    { id: "llama-4-maverick", name: "Llama 4 Maverick (Puter)" },
    { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B (Puter)" },
    // Mistral — bare IDs (confirmed ✅)
    { id: "mistral-small-2603", name: "Mistral Small 4 (Puter)" },
    { id: "mistral-medium-3-5", name: "Mistral Medium 3.5 (Puter)" },
    { id: "mistral-large-2512", name: "Mistral Large (Puter)" },
    { id: "devstral-2512", name: "Devstral 2 (Puter)" },
    { id: "codestral-2508", name: "Codestral (Puter)" },
    { id: "mistral-nemo", name: "Mistral Nemo (Puter)" },
    // Qwen — use qwen/ prefix (confirmed ✅)
    { id: "qwen/qwen3.6-plus", name: "Qwen 3.6 Plus (Puter)" },
    { id: "qwen/qwen3.5-397b-a17b", name: "Qwen 3.5 397B (Puter)" },
    // Perplexity Sonar via OpenRouter aliases exposed by Puter
    { id: "perplexity/sonar-deep-research", name: "Perplexity Sonar Deep Research (Puter)" },
    { id: "perplexity/sonar-pro-search", name: "Perplexity Sonar Pro Search (Puter)" },
    { id: "perplexity/sonar-pro", name: "Perplexity Sonar Pro (Puter)" },
    { id: "perplexity/sonar-reasoning-pro", name: "Perplexity Sonar Reasoning Pro (Puter)" },
    { id: "perplexity/sonar", name: "Perplexity Sonar (Puter)" },
  ],
  passthroughModels: true, // 500+ models available — users can type arbitrary Puter model IDs
};
