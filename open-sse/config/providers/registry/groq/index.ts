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
    // Same class (#12134): compound and ALLaM are not reasoning models on Groq either, so
    // declare it here — undeclared models default to reasoning-capable via the heuristic.
    { id: "groq/compound", name: "Groq Compound", supportsReasoning: false },
    { id: "allam-2-7b", name: "ALLaM 2 7B", supportsReasoning: false },
    { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
    { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B" },
    { id: "qwen/qwen3-32b", name: "Qwen3 32B" },
    { id: "qwen/qwen3.6-27b", name: "Qwen3.6 27B" },
    { id: "qwen/qwen3.8-27b", name: "Qwen3.8 27B" },
    { id: "openai/gpt-oss-safeguard-20b", name: "GPT-OSS Safeguard 20B" },
  ],
};
