import type { RegistryEntry } from "../../shared.ts";
import { ALIBABA_DASHSCOPE_MODELS } from "../../shared.ts";

export const alibabaProvider: RegistryEntry = {
  id: "alibaba",
  alias: "ali",
  format: "openai",
  executor: "default",
  baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
  modelsUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: ALIBABA_DASHSCOPE_MODELS,
  passthroughModels: true,
};
