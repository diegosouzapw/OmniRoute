import type { RegistryEntry } from "../../shared.ts";

export const hackclubProvider: RegistryEntry = {
  id: "hackclub",
  alias: "hc",
  format: "openai",
  executor: "default",
  baseUrl: "https://ai.hackclub.com/proxy/v1/chat/completions",
  modelsUrl: "https://ai.hackclub.com/proxy/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  defaultContextLength: 128000,
  models: [
    { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B" },
    { id: "mistralai/mistral-7b-instruct", name: "Mistral 7B" },
    { id: "deepseek-ai/deepseek-coder-33b", name: "DeepSeek Coder 33B" },
  ],
};
