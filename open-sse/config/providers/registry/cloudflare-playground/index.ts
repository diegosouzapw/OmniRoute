/**
 * Cloudflare AI Playground — No Auth provider registry entry.
 *
 * Free, anonymous access to the Cloudflare AI Playground
 * (https://playground.ai.cloudflare.com) — no account, no API key, no cookies.
 * Chat runs over a PartySocket WebSocket speaking Cloudflare's `cf_agent`
 * protocol; the only gate is a browser-grade TLS fingerprint on the WS upgrade,
 * which the `cloudflare-playground` executor satisfies by driving a headless
 * Chromium via Playwright (see executors/cloudflare-playground.ts).
 *
 * Model catalog captured from the playground's live `getModels` RPC
 * (2026-08-15, 63 models total; the 20 chat/text-generation entries are listed
 * here). Model IDs use the playground's `org/model` slug form — the executor
 * prefixes them with `@cf/` when talking to the upstream.
 */
import type { RegistryEntry } from "../../shared.ts";

export const cloudflarePlaygroundProvider: RegistryEntry = {
  id: "cloudflare-playground",
  alias: "cfp",
  format: "openai",
  executor: "cloudflare-playground",
  baseUrl: "https://playground.ai.cloudflare.com",
  authType: "none",
  authHeader: "none",
  models: [
    // Frontier/open-weight flagships first.
    { id: "zai-org/glm-5.2", name: "GLM 5.2 (Z.ai)", supportsReasoning: true },
    { id: "moonshotai/kimi-k2.7-code", name: "Kimi K2.7 Code (Moonshot)", supportsReasoning: true },
    { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6 (Moonshot)", supportsReasoning: true },
    {
      id: "deepseek-ai/deepseek-v4-pro-0813",
      name: "DeepSeek V4 Pro (DeepSeek)",
      supportsReasoning: true,
    },
    { id: "deepseek-ai/deepseek-v4-flash-0731", name: "DeepSeek V4 Flash (DeepSeek)" },
    { id: "zai-org/glm-4.7-flash", name: "GLM 4.7 Flash (Z.ai)", supportsReasoning: true },
    { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B (OpenAI)" },
    { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B (OpenAI)" },
    { id: "meta-llama/llama-3.3-70b-instruct-fp8-fast", name: "Llama 3.3 70B Instruct (Meta)" },
    { id: "meta/llama-3.1-8b-instruct-fp8", name: "Llama 3.1 8B Instruct (Meta)" },
    { id: "meta/llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B (Meta)" },
    { id: "nvidia/nemotron-3-120b-a12b", name: "Nemotron 3 120B (NVIDIA)" },
    { id: "qwen/qwen2.5-coder-32b-instruct", name: "Qwen2.5 Coder 32B (Qwen)" },
    { id: "qwen/qwen3-30b-a3b-fp8", name: "Qwen3 30B A3B (Qwen)" },
    { id: "qwen/qwq-32b", name: "QwQ 32B (Qwen)", supportsReasoning: true },
    {
      id: "deepseek-ai/deepseek-r1-distill-qwen-32b",
      name: "DeepSeek R1 Distill Qwen 32B",
      supportsReasoning: true,
    },
    { id: "google/gemma-4-26b-a4b-it", name: "Gemma 4 26B A4B (Google)" },
    { id: "mistralai/mistral-small-3.1-24b-instruct", name: "Mistral Small 3.1 24B" },
    { id: "ibm-granite/granite-4.0-h-micro", name: "Granite 4.0 H Micro (IBM)" },
    { id: "aisingapore/gemma-sea-lion-v4-27b-it", name: "Gemma SEA-LION V4 27B (AI Singapore)" },
  ],
};
