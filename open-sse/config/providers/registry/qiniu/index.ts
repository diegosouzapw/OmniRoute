import type { RegistryEntry } from "../../shared.ts";

export const qiniuProvider: RegistryEntry = {
  id: "qiniu",
  alias: "qiniu",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.qnaigc.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://api.qnaigc.com/v1/models",
  defaultContextLength: 128000,
  models: [],
  passthroughModels: true,
};
