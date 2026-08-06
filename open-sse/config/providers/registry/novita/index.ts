import type { RegistryEntry } from "../../shared.ts";

export const novitaProvider: RegistryEntry = {
  id: "novita",
  alias: "novita",
  format: "openai",
  executor: "default",
  // #5455: OpenAI-compatible endpoint. The legacy /v3 base + the `ai-ai/…` model id both
  // 404 (verified live); /openai/v1 + the `meta-llama/…` id return a clean completion.
  baseUrl: "https://api.novita.ai/openai/v1/chat/completions",
  modelsUrl: "https://api.novita.ai/openai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  // Catalog seeded from a live GET https://api.novita.ai/openai/v1/models, the listing
  // `modelsUrl` already points at. Every id below reports `status: 1` (serving) there, and
  // `contextLength` / `maxOutputTokens` / `supportsReasoning` mirror that response's
  // `context_size`, `max_output_tokens` and `features` fields.
  //
  // `supportsVision` is the exception: it is set from an actual image request per id, not
  // from the listing's `input_modalities`. Those two disagree — `openai/gpt-oss-120b`
  // advertises `input_modalities: ["text","image"]`, accepts an image part with HTTP 200,
  // and then answers that it cannot see the image, so it is listed here without the flag.
  // Models that genuinely lack vision instead fail closed with
  // `400 "model features vision not support"`, so a 200 alone does not confirm the
  // capability — the reply has to be checked. Each flag below was verified by sending a
  // two-colour test image and requiring both colours back.
  //
  // Curated rather than exhaustive: the listing carries 143 entries unauthenticated and 304
  // with an API key (the former is a subset of the latter), including retired
  // generations (`status: 4`, e.g. `meta-llama/llama-3-8b-instruct`) and unnamespaced staging
  // ids (`bunny`, `ai_infer_test_2`, `dev/glm46`) that no caller should be offered. This keeps
  // one entry per serving family/generation, matching the granularity of the other
  // multi-vendor OpenAI-compatible hosts (fireworks, groq, nvidia). `modelsUrl` still drives
  // dashboard discovery for anything not listed here.
  models: [
    // DeepSeek
    {
      id: "deepseek/deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      contextLength: 1048576,
      maxOutputTokens: 393216,
    },
    {
      id: "deepseek/deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      contextLength: 1048576,
      maxOutputTokens: 393216,
    },
    {
      id: "deepseek/deepseek-v3.2",
      name: "DeepSeek V3.2",
      supportsReasoning: true,
      contextLength: 163840,
      maxOutputTokens: 65536,
    },
    // Moonshot Kimi
    {
      id: "moonshotai/kimi-k3",
      name: "Kimi K3",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1048576,
      maxOutputTokens: 1048576,
    },
    {
      id: "moonshotai/kimi-k2.7-code",
      name: "Kimi K2.7 Code",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 262144,
      maxOutputTokens: 262144,
    },
    {
      id: "moonshotai/kimi-k2.6",
      name: "Kimi K2.6",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 262144,
      maxOutputTokens: 262144,
    },
    // Z.ai GLM
    {
      id: "zai-org/glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "zai-org/glm-5.1",
      name: "GLM 5.1",
      supportsReasoning: true,
      contextLength: 204800,
      maxOutputTokens: 131072,
    },
    {
      id: "zai-org/glm-4.7",
      name: "GLM 4.7",
      supportsReasoning: true,
      contextLength: 204800,
      maxOutputTokens: 131072,
    },
    // MiniMax
    {
      id: "minimax/minimax-m3",
      name: "MiniMax M3",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1000000,
      maxOutputTokens: 131072,
    },
    {
      id: "minimax/minimax-m2.7",
      name: "MiniMax M2.7",
      supportsReasoning: true,
      contextLength: 204800,
      maxOutputTokens: 131072,
    },
    // Qwen
    {
      id: "qwen/qwen3.7-max",
      name: "Qwen3.7 Max",
      supportsReasoning: true,
      contextLength: 1000000,
      maxOutputTokens: 65536,
    },
    {
      id: "qwen/qwen3.6-plus",
      name: "Qwen3.6 Plus",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1000000,
      maxOutputTokens: 65536,
    },
    {
      id: "qwen/qwen3.5-397b-a17b",
      name: "Qwen3.5 397B A17B",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 262144,
      maxOutputTokens: 65536,
    },
    {
      id: "qwen/qwen3-coder-480b-a35b-instruct",
      name: "Qwen3 Coder 480B",
      contextLength: 262144,
      maxOutputTokens: 65536,
    },
    // Xiaomi MiMo / OpenAI gpt-oss / Google Gemma
    {
      id: "xiaomimimo/mimo-v2.5-pro",
      name: "MiMo V2.5 Pro",
      supportsReasoning: true,
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      // No `supportsVision`: the listing claims `image` input, but a live image request
      // returns 200 and "I cannot see the image" (retried 4x, data-URI and remote URL).
      // Matches how groq / fireworks / nvidia / siliconflow / cerebras list this id here.
      id: "openai/gpt-oss-120b",
      name: "OpenAI gpt-oss-120b",
      supportsReasoning: true,
      contextLength: 131072,
      maxOutputTokens: 32768,
    },
    {
      id: "google/gemma-4-31b-it",
      name: "Gemma 4 31B",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
    // Pre-existing entry — the id verified live in #5455; kept as the endpoint guard's anchor.
    {
      id: "meta-llama/llama-3.1-8b-instruct",
      name: "Llama 3.1 8B Instruct",
      contextLength: 16384,
      maxOutputTokens: 16384,
    },
  ],
};
