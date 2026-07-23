import type { RegistryEntry } from "../../shared.ts";

export const theoldllmProvider: RegistryEntry = {
  id: "theoldllm",
  alias: "tllm",
  format: "openai",
  executor: "theoldllm",
  // Playwright-backed executor — no standard auth; uses embedded browser for token generation
  baseUrl: "https://theoldllm.vercel.app/api/chatgpt",
  baseUrls: ["https://theoldllm.vercel.app/api/chatgpt"],
  authType: "none",
  authHeader: "none",
  defaultContextLength: 200000,
  // Catalog seed. `passthroughModels: true` means live /api/chatgpt discovery is
  // authoritative; this list is the curated display/fallback set. The upstream IDs
  // (GPT_5_*, gemini_*, CLAUDE_4_*, openrouter_*, etc.) mirror the site's free
  // "chatgpt" tier and MUST match `CHATGPT_UPSTREAM_MODELS` in the executor so they
  // route unchanged. Legacy alias IDs (GPT_4o, claude_opus_4, …) are kept for
  // backward compatibility with saved model preferences (mapped in the executor).
  models: [
    // ── Current free tier (refreshed for #5181) ──
    { id: "GPT_5_4", name: "GPT-5.4 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_5_3", name: "GPT-5.3 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_5_2", name: "GPT-5.2 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_5_1", name: "GPT-5.1 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_5", name: "GPT-5 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_o4_mini", name: "o4-mini (The Old LLM 🆓)" },
    { id: "GPT_o3_mini", name: "o3-mini (The Old LLM 🆓)" },
    { id: "gemini_3_pro", name: "Gemini 3 Pro (The Old LLM 🆓)", contextLength: 1000000 },
    { id: "gemini_2_5_pro", name: "Gemini 2.5 Pro (The Old LLM 🆓)", contextLength: 1000000 },
    { id: "gemini_2_0_flash", name: "Gemini 2.0 Flash (The Old LLM 🆓)", contextLength: 1000000 },
    { id: "gemini_1_5_flash", name: "Gemini 1.5 Flash (The Old LLM 🆓)", contextLength: 1000000 },
    { id: "CLAUDE_4_6_OPUS", name: "Claude 4.6 Opus (The Old LLM 🆓)", contextLength: 200000 },
    { id: "CLAUDE_4_6_SONNET", name: "Claude 4.6 Sonnet (The Old LLM 🆓)", contextLength: 200000 },
    { id: "CLAUDE_4_5_HAIKU", name: "Claude 4.5 Haiku (The Old LLM 🆓)", contextLength: 200000 },
    { id: "openrouter_gpt_4_o", name: "GPT-4o (The Old LLM 🆓)" },
    { id: "openrouter_gpt_4_o_mini", name: "GPT-4o mini (The Old LLM 🆓)" },
    { id: "openrouter_grok_4", name: "Grok 4 (The Old LLM 🆓)" },
    { id: "together_deepseek_v3", name: "DeepSeek V3 (The Old LLM 🆓)" },
    { id: "openrouter_deepseek_r1", name: "DeepSeek R1 (The Old LLM 🆓)" },
    { id: "sonar-pro", name: "Sonar Pro (The Old LLM 🆓)" },
    // ── Legacy alias IDs (kept for saved-preference backward compatibility) ──
    { id: "GPT_4o", name: "GPT-4o (The Old LLM 🆓)" },
    { id: "claude_opus_4", name: "Claude Opus 4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "claude_sonnet_4", name: "Claude Sonnet 4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "claude_haiku_3_5", name: "Claude Haiku 3.5 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "deepseek_v4", name: "DeepSeek V4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "gemini_3_flash", name: "Gemini 3 Flash (The Old LLM 🆓)", contextLength: 1000000 },
  ],
  passthroughModels: true,
};
