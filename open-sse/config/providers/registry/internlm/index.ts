import type { RegistryEntry } from "../../shared.ts";

export const internlmProvider: RegistryEntry = {
  id: "internlm",
  alias: "internlm",
  format: "openai",
  executor: "default",
  baseUrl: "https://chat.intern-ai.org.cn/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // intern-s1-pro stays first so it remains the provider default (1T MoE flagship).
    { id: "intern-s1-pro", name: "Intern-S1 Pro" },
    { id: "intern-s1", name: "Intern-S1" },
    { id: "intern-s1-mini", name: "Intern-S1 Mini" },
    { id: "internvl3.5-latest", name: "InternVL3.5 Latest" },
    { id: "intern-latest", name: "Intern Latest" },
  ],
};
