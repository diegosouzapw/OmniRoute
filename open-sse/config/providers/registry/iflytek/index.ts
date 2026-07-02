import type { RegistryEntry } from "../../shared.ts";

export const iflytekProvider: RegistryEntry = {
  id: "iflytek",
  alias: "iflytek",
  format: "openai",
  executor: "default",
  baseUrl: "https://spark-api.xf-yun.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: confirmed exact HTTP `domain` values against the official
  // xfyun.cn Spark docs. generalv3.5 = Max (current); 4.0Ultra is case-sensitive.
  models: [
    { id: "4.0Ultra", name: "Spark 4.0 Ultra", contextLength: 32768 },
    { id: "generalv3.5", name: "Spark Max (V3.5)" },
    { id: "max-32k", name: "Spark Max 32K", contextLength: 32768 },
    { id: "generalv3", name: "Spark Pro", contextLength: 8192 },
    { id: "pro-128k", name: "Spark Pro 128K", contextLength: 131072 },
    { id: "lite", name: "Spark Lite", contextLength: 4096 },
  ],
};
