import type { RegistryEntry } from "../../shared.ts";

export const qianfanProvider: RegistryEntry = {
  id: "qianfan",
  alias: "qianfan",
  format: "openai",
  executor: "default",
  baseUrl: "https://qianfan.baidubce.com/v2/chat/completions",
  modelsUrl: "https://qianfan.baidubce.com/v2/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "ernie-5.1", name: "ERNIE 5.1" },
    { id: "ernie-5.0-thinking-latest", name: "ERNIE 5.0 Thinking Latest" },
    { id: "ernie-x1.1", name: "ERNIE X1.1", contextLength: 64000 },
  ],
};
