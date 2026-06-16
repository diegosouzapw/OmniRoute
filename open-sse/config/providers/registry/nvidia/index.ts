import type { RegistryEntry } from "../../shared.ts";

export const nvidiaProvider: RegistryEntry = {
  id: "nvidia",
  alias: "nvidia",
  format: "openai",
  executor: "default",
  baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "z-ai/glm-5.1", name: "GLM 5.1" },
    // #3329: minimaxai/minimax-m3 removed — NVIDIA NIM does not host it yet
    // (every request 404s), while minimax-m2.7 on the same provider works.
    // Re-add only once NVIDIA actually serves it.
    { id: "minimaxai/minimax-m2.7", name: "MiniMax M2.7" },
    { id: "google/gemma-4-31b-it", name: "Gemma 4 31B" },
    { id: "mistralai/mistral-small-4-119b-2603", name: "Mistral Small 4 2603" },
    { id: "mistralai/mistral-large-3-675b-instruct-2512", name: "Mistral Large 3 675B" },
    { id: "mistralai/devstral-2-123b-instruct-2512", name: "Devstral 2 123B" },
    { id: "qwen/qwen3.5-397b-a17b", name: "Qwen3.5-397B-A17B" },
    { id: "qwen/qwen3.5-122b-a10b", name: "Qwen3.5-122B-A10B" },
    { id: "stepfun-ai/step-3.5-flash", name: "Step 3.5 Flash" },
    { id: "deepseek-ai/deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", toolCalling: false },
    { id: "openai/gpt-oss-20b", name: "GPT OSS 20B", toolCalling: false },
    { id: "nvidia/nemotron-3-super-120b-a12b", name: "Nemotron 3 Super 120B A12B" },
  ],
};
