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
    { id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", name: "DeepSeek R1 Distill 32B (🆓)" },
  ],
};
