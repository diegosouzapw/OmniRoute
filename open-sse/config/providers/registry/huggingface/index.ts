import type { RegistryEntry } from "../../shared.ts";

export const huggingfaceProvider: RegistryEntry = {
  id: "huggingface",
  alias: "hf",
  format: "openai",
  executor: "default",
  baseUrl: "https://router.huggingface.co/v1/chat/completions",
  modelsUrl: "https://router.huggingface.co/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B" },
    { id: "meta-llama/llama-3.2-11b-instruct", name: "Llama 3.2 11B" },
    { id: "mistralai/mistral-7b-instruct", name: "Mistral 7B" },
    { id: "google/gemma-2-9b-it", name: "Gemma 2 9B" },
    { id: "Qwen/Qwen2.5-7B-Instruct", name: "Qwen 2.5 7B" },
    { id: "deepseek-ai/DeepSeek-V3", name: "DeepSeek V3" },
  ],
};
