import type { RegistryEntry } from "../../shared.ts";

export const sparkdeskProvider: RegistryEntry = {
  id: "sparkdesk",
  alias: "sparkdesk",
  format: "openai",
  executor: "default",
  baseUrl: "https://spark-api.xf-yun.com/v3.1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: confirmed exact HTTP `domain` values against the official
  // xfyun.cn Spark docs. `spark-x` was rejected — it lives on a separate /v2 (X1.5) /
  // /x2 (X2) endpoint and would 404 on this /v3.1 base.
  models: [
    { id: "4.0Ultra", name: "Spark 4.0 Ultra", contextLength: 32768 },
    { id: "generalv3", name: "Spark Pro", contextLength: 8192 },
    { id: "pro-128k", name: "Spark Pro 128K", contextLength: 131072 },
    { id: "general", name: "General" },
  ],
};
