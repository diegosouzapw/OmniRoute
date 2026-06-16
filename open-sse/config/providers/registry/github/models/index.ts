import type { RegistryEntry } from "../../../shared.ts";

export const github_modelsProvider: RegistryEntry = {
  id: "github-models",
  alias: "ghm",
  format: "openai",
  executor: "default",
  baseUrl: "https://models.github.ai/inference/chat/completions",
  modelsUrl: "https://models.github.ai/inference/models",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+json",
  },
  defaultContextLength: 128000,
  models: [
    { id: "openai/gpt-4.1", name: "GPT-4.1 (Free)", contextLength: 1047576 },
    { id: "openai/gpt-4o", name: "GPT-4o (Free)", contextLength: 128000 },
    { id: "openai/gpt-4o-mini", name: "GPT-4o Mini (Free)", contextLength: 128000 },
    { id: "openai/o1", name: "o1 (Free)", contextLength: 200000 },
    { id: "openai/o3", name: "o3 (Free)", contextLength: 200000 },
    { id: "openai/o4-mini", name: "o4-mini (Free)", contextLength: 200000 },
    { id: "deepseek/DeepSeek-R1", name: "DeepSeek R1 (Free)", contextLength: 131072 },
    {
      id: "meta/Llama-4-Maverick-17B-128E-Instruct",
      name: "Llama 4 Maverick (Free)",
      contextLength: 131072,
    },
    { id: "xai/grok-3", name: "Grok 3 (Free)", contextLength: 131072 },
    { id: "mistral-ai/Mistral-Medium-3", name: "Mistral Medium 3 (Free)", contextLength: 128000 },
    { id: "cohere/Cohere-command-a", name: "Cohere Command A (Free)", contextLength: 128000 },
    { id: "microsoft/Phi-4", name: "Phi-4 (Free)", contextLength: 16384 },
    { id: "openai/text-embedding-3-large", name: "Text Embedding 3 Large (Free)" },
    { id: "openai/text-embedding-3-small", name: "Text Embedding 3 Small (Free)" },
  ],
};
