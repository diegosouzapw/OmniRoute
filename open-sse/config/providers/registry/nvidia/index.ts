import type { RegistryEntry } from "../../shared.ts";

export const nvidiaProvider: RegistryEntry = {
  id: "nvidia",
  alias: "nvidia",
  format: "openai",
  executor: "default",
  baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // #6773: nvidia multiplexes 17 models from 9 different upstream vendors
  // (z-ai/, minimaxai/, deepseek-ai/, qwen/, mistralai/, stepfun-ai/,
  // moonshotai/, openai/, nvidia/) behind ONE connection — mark it passthrough
  // so a single stale/renamed model's 404 locks out only that model instead
  // of cooling down the whole connection (see accountFallback.ts
  // hasPerModelQuota doc comment; matches modelscope/synthetic/kilo-gateway).
  passthroughModels: true,
  models: [
    // #6108: z-ai/glm-5.1 EOL'd 2026-07-02 (direct probe returns 410) — dropped.
    { id: "z-ai/glm-5.2", name: "GLM 5.2" },
    // #3329/#6108: minimaxai/minimax-m3 stays excluded from the nvidia tier — it
    // still 404s here for most callers; the single 200 probe in #6108 was not
    // reproducible enough to override the #3329 guard. Re-add only once NVIDIA
    // reliably serves it (and flip nvidia-minimax-m3-removed-3329.test.ts then).
    { id: "minimaxai/minimax-m2.7", name: "MiniMax M2.7" },
    { id: "google/gemma-4-31b-it", name: "Gemma 4 31B" },
    { id: "mistralai/mistral-small-4-119b-2603", name: "Mistral Small 4 2603" },
    { id: "mistralai/mistral-large-3-675b-instruct-2512", name: "Mistral Large 3 675B" },
    { id: "mistralai/devstral-2-123b-instruct-2512", name: "Devstral 2 123B" },
    { id: "qwen/qwen3.5-397b-a17b", name: "Qwen3.5-397B-A17B" },
    { id: "qwen/qwen3.5-122b-a10b", name: "Qwen3.5-122B-A10B" },
    { id: "stepfun-ai/step-3.5-flash", name: "Step 3.5 Flash" },
    { id: "stepfun-ai/step-3.7-flash", name: "Step 3.7 Flash" },
    { id: "deepseek-ai/deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "deepseek-ai/deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
    // Sweep 2026-06-19: verified present in the live NVIDIA NIM /v1/models catalog.
    { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6" },
    { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", toolCalling: false },
    { id: "openai/gpt-oss-20b", name: "GPT OSS 20B", toolCalling: false },
    { id: "nvidia/nemotron-3-super-120b-a12b", name: "Nemotron 3 Super 120B A12B" },
    { id: "nvidia/nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B" },
    // Port of decolua/9router#2373 ("fix(nvidia): expand NIM chat model catalog"):
    // additional live-catalog models observed to serve /v1/chat/completions.
    // `minimaxai/minimax-m3` from that PR is intentionally NOT re-added — it stays
    // excluded per the #3329 guard (nvidia-minimax-m3-removed-3329.test.ts).
    // Non-chat entries from the same PR (nvidia/gliner-pii — NER tagger, not a chat
    // model; google/diffusiongemma-26b-a4b-it — diffusion model) are dropped for the
    // same reason: this registry only models the /v1/chat/completions surface.
    { id: "abacusai/dracarys-llama-3.1-70b-instruct", name: "Dracarys Llama 3.1 70B Instruct" },
    { id: "google/gemma-2-2b-it", name: "Gemma 2 2B IT" },
    { id: "google/gemma-3n-e2b-it", name: "Gemma 3n E2B IT" },
    { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct", toolCalling: false },
    {
      id: "meta/llama-3.2-11b-vision-instruct",
      name: "Llama 3.2 11B Vision Instruct",
      supportsVision: true,
    },
    { id: "meta/llama-3.2-1b-instruct", name: "Llama 3.2 1B Instruct" },
    { id: "meta/llama-3.2-3b-instruct", name: "Llama 3.2 3B Instruct", toolCalling: false },
    {
      id: "meta/llama-3.2-90b-vision-instruct",
      name: "Llama 3.2 90B Vision Instruct",
      supportsVision: true,
    },
    { id: "meta/llama-4-maverick-17b-128e-instruct", name: "Llama 4 Maverick 17B 128E Instruct" },
    { id: "meta/llama-guard-4-12b", name: "Llama Guard 4 12B", toolCalling: false },
    { id: "mistralai/ministral-14b-instruct-2512", name: "Ministral 14B Instruct 2512" },
    { id: "mistralai/mistral-medium-3.5-128b", name: "Mistral Medium 3.5 128B" },
    { id: "mistralai/mistral-nemotron", name: "Mistral Nemotron" },
    { id: "mistralai/mixtral-8x7b-instruct-v0.1", name: "Mixtral 8x7B Instruct v0.1" },
    {
      id: "nvidia/ising-calibration-1-35b-a3b",
      name: "Ising Calibration 1 35B A3B",
      supportsReasoning: true,
    },
    {
      id: "nvidia/llama-3.1-nemoguard-8b-content-safety",
      name: "Llama 3.1 Nemoguard 8B Content Safety",
    },
    {
      id: "nvidia/llama-3.1-nemoguard-8b-topic-control",
      name: "Llama 3.1 Nemoguard 8B Topic Control",
    },
    { id: "nvidia/llama-3.1-nemotron-nano-8b-v1", name: "Llama 3.1 Nemotron Nano 8B v1" },
    {
      id: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1",
      name: "Llama 3.1 Nemotron Nano VL 8B v1",
      supportsVision: true,
    },
    {
      id: "nvidia/llama-3.1-nemotron-safety-guard-8b-v3",
      name: "Llama 3.1 Nemotron Safety Guard 8B v3",
    },
    { id: "nvidia/llama-3.3-nemotron-super-49b-v1", name: "Llama 3.3 Nemotron Super 49B v1" },
    { id: "nvidia/llama-3.3-nemotron-super-49b-v1.5", name: "Llama 3.3 Nemotron Super 49B v1.5" },
    { id: "nvidia/nemotron-3-content-safety", name: "Nemotron 3 Content Safety" },
    {
      id: "nvidia/nemotron-3-nano-30b-a3b",
      name: "Nemotron 3 Nano 30B A3B",
      supportsReasoning: true,
    },
    {
      id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
      name: "Nemotron 3 Nano Omni 30B A3B Reasoning",
      supportsReasoning: true,
      supportsVision: true,
    },
    { id: "nvidia/nemotron-3.5-content-safety", name: "Nemotron 3.5 Content Safety" },
    { id: "nvidia/nemotron-mini-4b-instruct", name: "Nemotron Mini 4B Instruct" },
    {
      id: "nvidia/nemotron-nano-12b-v2-vl",
      name: "Nemotron Nano 12B v2 VL",
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "nvidia/nvidia-nemotron-nano-9b-v2",
      name: "NVIDIA Nemotron Nano 9B v2",
      supportsReasoning: true,
    },
    { id: "nvidia/riva-translate-4b-instruct-v1.1", name: "Riva Translate 4B Instruct v1.1" },
    {
      id: "qwen/qwen3-next-80b-a3b-instruct",
      name: "Qwen3 Next 80B A3B Instruct",
      supportsReasoning: true,
    },
    { id: "sarvamai/sarvam-m", name: "Sarvam M" },
    { id: "stockmark/stockmark-2-100b-instruct", name: "Stockmark 2 100B Instruct" },
    { id: "upstage/solar-10.7b-instruct", name: "Solar 10.7B Instruct" },
  ],
};
