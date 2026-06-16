import type { RegistryEntry } from "../../shared.ts";

export const baiduProvider: RegistryEntry = {
  id: "baidu",
  alias: "baidu",
  format: "openai",
  executor: "default",
  baseUrl: "https://qianfan.baidubce.com/v2/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "ernie-4.0-8k", name: "ERNIE 4.0 8K" }],
};
