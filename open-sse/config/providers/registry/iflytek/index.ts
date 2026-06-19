import type { RegistryEntry } from "../../shared.ts";

export const iflytekProvider: RegistryEntry = {
  id: "iflytek",
  alias: "iflytek",
  format: "openai",
  executor: "default",
  baseUrl: "https://spark-api.xf-yun.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "generalv3.5", name: "General V3.5" }],
};
