import type { RegistryEntry } from "../../shared.ts";

export const groqProvider: RegistryEntry = {
  id: "groq",
  alias: "groq",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.groq.com/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Non-reasoning Llama models: Groq returns HTTP 400 if reasoning_effort is sent (#3258).
    {
      id: "meta-llama/llama-4-scout-17b-16e-instruct",
      name: "Llama 4 Scout",
      supportsReasoning: false,
    },
    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", supportsReasoning: false },
    { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
    { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B" },
    { id: "qwen/qwen3-32b", name: "Qwen3 32B" },
  ],
};
