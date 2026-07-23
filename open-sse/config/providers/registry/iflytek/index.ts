import type { RegistryEntry } from "../../shared.ts";

export const iflytekProvider: RegistryEntry = {
  id: "iflytek",
  alias: "iflytek",
  format: "openai",
  executor: "default",
  baseUrl: "https://spark-api-open.xf-yun.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // `spark-api-open.xf-yun.com` is Spark's OpenAI-compatible HTTP endpoint (Bearer
  // APIPassword). `spark-api.xf-yun.com` is the WebSocket host — `wss://.../v3.1/chat`
  // etc., authenticated with an HMAC-SHA256 signature, not a bearer token — so it
  // cannot serve this `format: "openai"` / `authHeader: "bearer"` entry.
  // Model ids are the `domain` values accepted by the HTTP endpoint:
  // generalv3.5 = Max (current); 4.0Ultra is case-sensitive.
  models: [
    { id: "4.0Ultra", name: "Spark 4.0 Ultra", contextLength: 32768 },
    { id: "generalv3.5", name: "Spark Max (V3.5)" },
    { id: "max-32k", name: "Spark Max 32K", contextLength: 32768 },
    { id: "generalv3", name: "Spark Pro", contextLength: 8192 },
    { id: "pro-128k", name: "Spark Pro 128K", contextLength: 131072 },
    { id: "lite", name: "Spark Lite", contextLength: 4096 },
  ],
};
