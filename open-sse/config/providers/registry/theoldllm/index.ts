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
  models: [
    { id: "GPT_5_4", name: "GPT-5.4 (The Old LLM 🆓)", contextLength: 400000 },
    { id: "GPT_4o", name: "GPT-4o (The Old LLM 🆓)" },
    { id: "claude_opus_4", name: "Claude Opus 4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "claude_sonnet_4", name: "Claude Sonnet 4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "claude_haiku_3_5", name: "Claude Haiku 3.5 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "deepseek_v4", name: "DeepSeek V4 (The Old LLM 🆓)", contextLength: 200000 },
    { id: "gemini_3_flash", name: "Gemini 3 Flash (The Old LLM 🆓)", contextLength: 1000000 },
    { id: "gemini_3_pro", name: "Gemini 3 Pro (The Old LLM 🆓)", contextLength: 1000000 },
  ],
  passthroughModels: true,
};
