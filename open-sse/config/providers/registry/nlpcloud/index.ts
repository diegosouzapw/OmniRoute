import type { RegistryEntry } from "../../shared.ts";

export const nlpcloudProvider: RegistryEntry = {
  id: "nlpcloud",
  alias: "nlpc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.nlpcloud.io/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: NLP Cloud's branded chat models + larger Llama tiers.
  models: [
    { id: "chatdolphin", name: "ChatDolphin", contextLength: 8192 },
    { id: "dolphin", name: "Dolphin", contextLength: 16384 },
    { id: "finetuned-llama-3-70b", name: "Fine-tuned LLaMA 3.3 70B" },
    { id: "llama-3-1-405b", name: "LLaMA 3.1 405B" },
    { id: "llama-3-8b-instruct", name: "Llama 3 8B" },
  ],
};
