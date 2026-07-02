import type { RegistryEntry } from "../../shared.ts";

export const cloudflare_aiProvider: RegistryEntry = {
  id: "cloudflare-ai",
  alias: "cf",
  format: "openai",
  executor: "cloudflare-ai",
  // URL is dynamic: uses accountId from credentials. The executor builds it.
  baseUrl: "https://api.cloudflare.com/client/v4/accounts",
  authType: "apikey",
  authHeader: "bearer",
  // 10K Neurons/day free: ~150 LLM responses or 500s Whisper audio — global edge
  models: [
    { id: "@cf/meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B (🆓 ~150 resp/day)" },
    { id: "@cf/meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B (🆓)" },
    { id: "@cf/google/gemma-3-12b-it", name: "Gemma 3 12B (🆓)" },
    { id: "@cf/mistral/mistral-7b-instruct-v0.2-lora", name: "Mistral 7B (🆓)" },
    { id: "@cf/qwen/qwen2.5-coder-15b-instruct", name: "Qwen 2.5 Coder 15B (🆓)" },
    { id: "@cf/qwen/qwen2.5-coder-32b-instruct", name: "Qwen 2.5 Coder 32B (🆓)" },
    { id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", name: "DeepSeek R1 Distill 32B (🆓)" },
    // Sweep 2026-06-19: + current Workers AI catalog ids (developers.cloudflare.com/workers-ai/models).
    { id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", name: "Llama 3.3 70B (FP8 Fast 🆓)" },
    { id: "@cf/meta/llama-3.2-3b-instruct", name: "Llama 3.2 3B (🆓)" },
    { id: "@cf/qwen/qwq-32b", name: "QwQ 32B (🆓)" },
    {
      id: "@cf/zai-org/glm-4.7-flash",
      name: "GLM 4.7 Flash (🆓)",
      contextLength: 131072,
    },
    { id: "@cf/moonshotai/kimi-k2.6", name: "Kimi K2.6 (🆓)", contextLength: 262144 },
    { id: "@cf/google/gemma-4-26b-a4b-it", name: "Gemma 4 26B (🆓)", contextLength: 262144 },
  ],
};
