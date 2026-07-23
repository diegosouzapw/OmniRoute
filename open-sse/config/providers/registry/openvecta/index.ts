import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * OpenVecta — OpenAI-compatible AI inference gateway (https://openvecta.com/).
 *
 * `GET /v1/models` returns the live catalog (LLMs + text-embedding-* models) and
 * is the source of truth at runtime via NAMED_OPENAI_STYLE_PROVIDERS. The seed
 * models below cover the most-used LLMs as the offline fallback when the live
 * fetch fails (network/auth) — same pattern as Together AI / Cerebras / NVIDIA NIM.
 *
 * `contextLength` is taken from the upstream `context_length` field per model
 * (verified live via the OpenVecta /v1/models endpoint, 2026-07-11).
 */
export const openvectaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "openvecta",
  alias: "openvecta",
  baseUrl: "https://api.openvecta.com/v1/chat/completions",
  models: [
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash", contextLength: 131072 },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 1000000 },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", contextLength: 131072 },
    { id: "gpt-oss-120b", name: "GPT OSS 120B", contextLength: 131072 },
    { id: "gemma-4-31b", name: "Gemma 4 31B", contextLength: 262144 },
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 200000 },
    { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B Instruct", contextLength: 131072 },
    { id: "llama-4-maverick", name: "Llama 4 Maverick", contextLength: 1048576 },
    { id: "nemotron-3-super-120b", name: "Nemotron 3 Super 120B", contextLength: 262144 },
  ],
});