import type { RegistryEntry } from "../../shared.ts";

export const sensenovaProvider: RegistryEntry = {
  id: "sensenova",
  alias: "sensenova",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.sensenova.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: refreshed against the official SenseCore compatible-mode catalog.
  // V6.5-Pro is the heavyweight flagship; the 6.7 generation so far ships only flash-lite.
  // Note the casing split: V6.5 models are PascalCase-dotted, 6.7 is lowercase-dotted.
  models: [
    { id: "SenseNova-V6.5-Pro", name: "SenseNova V6.5 Pro", contextLength: 131072 },
    { id: "SenseNova-V6.5-Turbo", name: "SenseNova V6.5 Turbo", contextLength: 131072 },
    { id: "sensenova-6.7-flash-lite", name: "SenseNova 6.7 Flash-Lite" },
    { id: "SenseChat-5", name: "SenseChat 5", contextLength: 131072 },
    { id: "SenseChat-5-Cantonese", name: "SenseChat 5 Cantonese", contextLength: 32768 },
    { id: "SenseChat-Turbo", name: "SenseChat Turbo", contextLength: 4096 },
    { id: "SenseChat-Vision", name: "SenseChat Vision", contextLength: 4096 },
    { id: "SenseChat-Character", name: "SenseChat Character", contextLength: 8192 },
    { id: "sensechat", name: "SenseChat" },
  ],
};
