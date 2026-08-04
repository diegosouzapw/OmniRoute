import type { RegistryEntry } from "../../shared.ts";

export const baichuanProvider: RegistryEntry = {
  id: "baichuan",
  alias: "baichuan",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.baichuan-ai.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: confirmed against the official platform.baichuan-ai.com pricing
  // page. Baichuan4-Turbo is the current general-purpose flagship (no Baichuan5 yet).
  models: [
    { id: "Baichuan4-Turbo", name: "Baichuan 4 Turbo", contextLength: 32768 },
    { id: "Baichuan4-Air", name: "Baichuan 4 Air", contextLength: 32768 },
    { id: "Baichuan4", name: "Baichuan 4" },
    { id: "Baichuan3-Turbo", name: "Baichuan 3 Turbo", contextLength: 32768 },
    { id: "Baichuan3-Turbo-128k", name: "Baichuan 3 Turbo 128k", contextLength: 131072 },
  ],
};
