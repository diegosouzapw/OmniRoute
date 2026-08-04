import type { RegistryEntry } from "../../../shared.ts";
import { ALIBABA_MODEL_STUDIO_MODELS } from "../index.ts";

export const alibaba_cnProvider: RegistryEntry = {
  id: "alibaba-cn",
  alias: "ali-cn",
  format: "openai",
  executor: "default",
  baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  modelsUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: ALIBABA_MODEL_STUDIO_MODELS,
  passthroughModels: true,
};
