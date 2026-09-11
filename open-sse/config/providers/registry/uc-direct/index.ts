import type { RegistryEntry } from "../../shared.ts";

/**
 * UC Direct (uncensored.com Developer API) — the METERED, OpenAI-compatible
 * official REST API at https://api.uncensored.com/api/v1.
 *
 * This is the paid Developer surface, distinct from the un-metered `uc` persona
 * WebSocket provider. It is a straightforward OpenAI-compatible passthrough
 * handled by the default executor:
 *   • Auth: `X-api-key: uai_sk_live_...` (a never-expiring key; NOT Bearer). The
 *     default executor maps authHeader "x-api-key" to the X-API-Key header
 *     (same as pioneer / agentrouter / helixmind).
 *   • `POST /chat/completions` — standard OpenAI body, streaming SSE (`[DONE]`),
 *     native `tools[]` / `tool_calls[]`.
 *   • `GET /models` is public (no auth) for catalog discovery.
 *   • Errors: 402 out-of-funds, 403 moderation/scope, 429 rate-limit
 *     (honors `retry-after` + `x-ratelimit-*`).
 *
 * Models below are the live metered catalog (GET /v1/models). Ids are UC REST
 * SHORTNAMES (no provider prefix), which is exactly what the API expects as
 * `model`. Context windows are enforced by the upstream API per-model; a
 * conservative provider-wide default is set here.
 */
export const ucDirectProvider: RegistryEntry = {
  id: "uc-direct",
  alias: "ucd",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.uncensored.com/api/v1",
  authType: "apikey",
  // UC standardises on X-api-key (never-expiring uai_sk_live_ key), NOT Bearer.
  // The default executor resolves "x-api-key" to the X-API-Key header.
  authHeader: "x-api-key",
  defaultContextLength: 128000,
  models: [
    // Anthropic
    { id: "claude-opus-5", name: "Claude Opus 5", toolCalling: true },
    { id: "claude-opus-5-fast", name: "Claude Opus 5 Fast", toolCalling: true },
    { id: "claude-fable-5", name: "Claude Fable 5", toolCalling: true },
    { id: "claude-opus-4.8", name: "Claude Opus 4.8", toolCalling: true },
    { id: "claude-opus-4.5", name: "Claude Opus 4.5", toolCalling: true },
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", toolCalling: true },
    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", toolCalling: true },
    { id: "claude-opus-4.7", name: "Claude Opus 4.7", toolCalling: true },
    { id: "claude-opus-4.6", name: "Claude Opus 4.6", toolCalling: true },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", toolCalling: true },
    // OpenAI
    { id: "gpt-5.6-sol", name: "GPT 5.6 Sol", toolCalling: true },
    { id: "gpt-5.6-terra", name: "GPT 5.6 Terra", toolCalling: true },
    { id: "gpt-5.6-luna", name: "GPT 5.6 Luna", toolCalling: true },
    { id: "gpt-4o", name: "GPT 4o", toolCalling: true },
    { id: "gpt-4o-mini", name: "GPT 4o Mini", toolCalling: true },
    { id: "gpt-5.2", name: "GPT 5.2", toolCalling: true },
    { id: "gpt-5.2-codex", name: "GPT 5.2 Codex", toolCalling: true },
    { id: "gpt-5.3-codex", name: "GPT 5.3 Codex", toolCalling: true },
    { id: "gpt-5.4", name: "GPT 5.4", toolCalling: true },
    { id: "gpt-5.4-mini", name: "GPT 5.4 Mini", toolCalling: true },
    { id: "gpt-5.4-pro", name: "GPT 5.4 Pro", toolCalling: true },
    { id: "gpt-5.4-nano", name: "GPT 5.4 Nano", toolCalling: true },
    { id: "gpt-5.5", name: "GPT 5.5", toolCalling: true },
    { id: "gpt-5.5-pro", name: "GPT 5.5 Pro", toolCalling: true },
    { id: "gpt-5-mini", name: "GPT 5 Mini", toolCalling: true },
    { id: "gpt-5-nano", name: "GPT 5 Nano", toolCalling: true },
    { id: "openai-gpt-oss-120b", name: "GPT OSS 120b" },
    // Google
    { id: "gemini-3-6-flash", name: "Gemini 3 6 Flash", toolCalling: true },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview", toolCalling: true },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview", toolCalling: true },
    { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite", toolCalling: true },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", toolCalling: true },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", toolCalling: true },
    { id: "gemma-3-27b-it", name: "Gemma 3 27b IT" },
    // xAI
    { id: "grok-4-6", name: "Grok 4 6", toolCalling: true },
    { id: "grok-4.5", name: "Grok 4.5", toolCalling: true },
    { id: "grok-4.20-beta", name: "Grok 4.20 Beta", toolCalling: true },
    { id: "grok-4.3", name: "Grok 4.3", toolCalling: true },
    // DeepSeek
    { id: "deepseek-v4-flash-0731", name: "Deepseek V4 Flash 0731", toolCalling: true },
    { id: "deepseek-v3.2", name: "Deepseek V3.2", toolCalling: true },
    { id: "deepseek-v4-pro", name: "Deepseek V4 Pro", toolCalling: true },
    { id: "deepseek-v4-flash", name: "Deepseek V4 Flash", toolCalling: true },
    { id: "deepseek-r1", name: "Deepseek R1", toolCalling: true },
    // Alibaba
    { id: "qwen-3-8-2-4t-a95b", name: "Qwen 3 8 2 4t A95b", toolCalling: true },
    { id: "qwen-3-8-max", name: "Qwen 3 8 Max", toolCalling: true },
    { id: "qwen-3-6-35b-a3b", name: "Qwen 3 6 35b A3B", toolCalling: true },
    { id: "qwen3-235b-a22b-2507", name: "Qwen3 235b A22b 2507", toolCalling: true },
    {
      id: "qwen3-235b-a22b-thinking-2507",
      name: "Qwen3 235b A22b Thinking 2507",
      toolCalling: true,
    },
    { id: "qwen3.5-397b-a17b", name: "Qwen3.5 397b A17b", toolCalling: true },
    { id: "qwen3.6-27b", name: "Qwen3.6 27b", toolCalling: true },
    { id: "qwen3-30b-a3b", name: "Qwen3 30b A3B", toolCalling: true },
    { id: "qwen3-5-35b-a3b", name: "Qwen3 5 35b A3B", toolCalling: true },
    { id: "qwen3-5-9b", name: "Qwen3 5 9b", toolCalling: true },
    { id: "qwen3-coder", name: "Qwen3 Coder", toolCalling: true },
    { id: "qwen3-next-80b-a3b-instruct", name: "Qwen3 Next 80b A3B Instruct", toolCalling: true },
    { id: "qwen3-vl-235b-a22b-thinking", name: "Qwen3 VL 235b A22b Thinking", toolCalling: true },
    { id: "qwen3-vl-30b-a3b-thinking", name: "Qwen3 VL 30b A3B Thinking", toolCalling: true },
    { id: "qwen3.5-flash", name: "Qwen3.5 Flash", toolCalling: true },
    { id: "qwen3.5-plus", name: "Qwen3.5 Plus", toolCalling: true },
    // Moonshot AI
    { id: "kimi-k3", name: "Kimi K3", toolCalling: true },
    { id: "kimi-k2", name: "Kimi K2", toolCalling: true },
    { id: "kimi-k2.5", name: "Kimi K2.5", toolCalling: true },
    { id: "kimi-k2.6", name: "Kimi K2.6", toolCalling: true },
    { id: "kimi-k2-thinking", name: "Kimi K2 Thinking", toolCalling: true },
    // Z.ai
    { id: "glm-5.2", name: "GLM 5.2", toolCalling: true },
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash", toolCalling: true },
    { id: "glm-5", name: "GLM 5", toolCalling: true },
    { id: "glm-5.1", name: "GLM 5.1", toolCalling: true },
    { id: "glm-4.7", name: "GLM 4.7", toolCalling: true },
    { id: "glm-4.6", name: "GLM 4.6", toolCalling: true },
    // MiniMax
    { id: "minimax-m2.1", name: "MiniMax M2.1", toolCalling: true },
    { id: "minimax-m2.5", name: "MiniMax M2.5", toolCalling: true },
    { id: "minimax-m2.7", name: "MiniMax M2.7", toolCalling: true },
    // Mistral
    { id: "mistral-large", name: "Mistral Large", toolCalling: true },
    {
      id: "mistral-small-3.2-24b-instruct",
      name: "Mistral Small 3.2 24b Instruct",
      toolCalling: true,
    },
    // Meta
    { id: "llama-3.2-3b-instruct", name: "Llama 3.2 3b Instruct", toolCalling: true },
    { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70b Instruct", toolCalling: true },
    // NVIDIA
    { id: "nvidia-nemotron-3-5-lightning-30b-a3b", name: "Nvidia Nemotron 3 5 Lightning 30b A3B" },
    { id: "nvidia-nemotron-3-nano-30b-a3b", name: "Nvidia Nemotron 3 Nano 30b A3B" },
    // Nous Research
    { id: "hermes-3-llama-3.1-405b", name: "Hermes 3 Llama 3.1 405b" },
    // Aion Labs
    { id: "aion-labs.aion-2-0", name: "Aion 2 0" },
    // Thinking Machines
    { id: "inkling", name: "Inkling" },
  ],
};
