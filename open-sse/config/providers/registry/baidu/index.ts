import type { RegistryEntry } from "../../shared.ts";

export const baiduProvider: RegistryEntry = {
  id: "baidu",
  alias: "baidu",
  format: "openai",
  executor: "default",
  baseUrl: "https://qianfan.baidubce.com/v2/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: refreshed against the official Baidu AI Studio / Qianfan v2
  // model list. ERNIE 5.0 (2026-01-22) and 5.1 (2026-05-09) are the current flagships.
  models: [
    { id: "ernie-5.1", name: "ERNIE 5.1", contextLength: 131072 },
    { id: "ernie-5.0", name: "ERNIE 5.0", contextLength: 131072 },
    { id: "ernie-x1.1", name: "ERNIE X1.1", contextLength: 32768 },
    { id: "ernie-4.5-turbo-128k", name: "ERNIE 4.5 Turbo 128K", contextLength: 131072 },
    { id: "ernie-4.5-turbo-32k", name: "ERNIE 4.5 Turbo 32K", contextLength: 32768 },
    { id: "ernie-4.5-turbo-vl", name: "ERNIE 4.5 Turbo VL", contextLength: 131072 },
    { id: "ernie-4.5-21b-a3b", name: "ERNIE 4.5 21B A3B", contextLength: 131072 },
    { id: "ernie-4.5-0.3b", name: "ERNIE 4.5 0.3B", contextLength: 131072 },
    { id: "ernie-4.0-8k", name: "ERNIE 4.0 8K" },
    { id: "ernie-4.0-turbo-128k", name: "ERNIE 4.0 Turbo 128K", contextLength: 131072 },
    { id: "ernie-4.0-turbo-8k", name: "ERNIE 4.0 Turbo 8K", contextLength: 8192 },
    { id: "ernie-3.5-8k", name: "ERNIE 3.5 8K", contextLength: 8192 },
    { id: "ernie-speed-128k", name: "ERNIE Speed 128K", contextLength: 131072 },
    { id: "ernie-speed-8k", name: "ERNIE Speed 8K", contextLength: 8192 },
    { id: "ernie-lite-8k", name: "ERNIE Lite 8K", contextLength: 8192 },
    { id: "ernie-tiny-8k", name: "ERNIE Tiny 8K", contextLength: 8192 },
  ],
};
