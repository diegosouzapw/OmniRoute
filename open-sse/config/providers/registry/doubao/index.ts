import type { RegistryEntry } from "../../shared.ts";

export const doubaoProvider: RegistryEntry = {
  id: "doubao",
  alias: "doubao",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: refreshed against the Volcano Ark catalog. Seed 2.0 (260215 =
  // 2026-02-14 GA) is the current family; Ark addresses models by dated snapshot id.
  models: [
    { id: "doubao-seed-2-0-pro-260215", name: "Doubao Seed 2.0 Pro", contextLength: 262144 },
    { id: "doubao-seed-2-0-lite-260215", name: "Doubao Seed 2.0 Lite", contextLength: 262144 },
    { id: "doubao-seed-2-0-mini-260215", name: "Doubao Seed 2.0 Mini", contextLength: 262144 },
    {
      id: "doubao-seed-2-0-code-preview-260215",
      name: "Doubao Seed 2.0 Code",
      contextLength: 262144,
    },
    { id: "doubao-seed-1-8-251228", name: "Doubao Seed 1.8", contextLength: 262144 },
    { id: "doubao-seed-1-6-251015", name: "Doubao Seed 1.6", contextLength: 262144 },
    { id: "doubao-seed-1-6-flash-250828", name: "Doubao Seed 1.6 Flash", contextLength: 262144 },
    { id: "doubao-1-5-pro-32k-250115", name: "Doubao 1.5 Pro 32K", contextLength: 32768 },
    { id: "doubao-pro-32k", name: "Doubao Pro 32K" },
  ],
};
