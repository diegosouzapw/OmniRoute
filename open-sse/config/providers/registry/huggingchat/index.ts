import type { RegistryEntry } from "../../shared.ts";

export const huggingchatProvider: RegistryEntry = {
  id: "huggingchat",
  // Distinct alias: "hc" belongs to the hackclub provider; huggingchat is
  // addressed by its own id to avoid the alias collision.
  alias: "huggingchat",
  format: "openai",
  executor: "huggingchat",
  baseUrl: "https://huggingface.co/chat/conversation",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B" },
    { id: "Qwen/Qwen2.5-72B-Instruct", name: "Qwen 2.5 72B" },
    { id: "mistralai/Mistral-Small-24B-Instruct-2501", name: "Mistral Small 24B" },
    { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1" },
  ],
};
