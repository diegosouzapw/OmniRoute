import type { RegistryEntry } from "../../shared.ts";

export const nvidiaProvider: RegistryEntry = {
  id: "nvidia",
  alias: "nvidia",
  format: "openai",
  executor: "default",
  baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  toolNameMaxLength: 64,
  // #6773: NVIDIA multiplexes models from multiple upstream vendors
  // (moonshotai/, deepseek-ai/, nvidia/, meta/, poolside/, google/, openai/)
  // behind ONE connection — mark it passthrough
  // so a single stale/renamed model's 404 locks out only that model instead
  // of cooling down the whole connection (see accountFallback.ts
  // hasPerModelQuota doc comment; matches modelscope/synthetic/kilo-gateway).
  passthroughModels: true,
  models: [
    { id: "moonshotai/kimi-k3", name: "Kimi K3" },
    {
      id: "deepseek-ai/deepseek-v4-pro-0813",
      name: "DeepSeek V4 Pro 0813",
      supportsReasoning: true,
    },
    {
      id: "deepseek-ai/deepseek-v4-flash-0731",
      name: "DeepSeek V4 Flash 0731",
      supportsReasoning: true,
    },
    { id: "meta/muse-glimmer-30b", name: "Muse Glimmer 30B" },
    { id: "poolside/laguna-xs-2.1", name: "Laguna XS 2.1" },
    { id: "google/gemma-4-31b-it", name: "Gemma 4 31B" },
    { id: "google/diffusiongemma-26b-a4b-it", name: "DiffusionGemma 26B A4B IT" },
    { id: "nvidia/nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B A55B" },
    { id: "nvidia/nemotron-3-super-120b-a12b", name: "Nemotron 3 Super 120B A12B" },
    {
      id: "nvidia/nemotron-3.5-lightning-30b-a3b",
      name: "Nemotron 3.5 Lightning 30B A3B",
    },
    {
      id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
      name: "Nemotron 3 Nano Omni 30B A3B Reasoning",
      supportsReasoning: true,
      supportsVision: true,
    },
    { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", toolCalling: false },
  ],
};
