import type { RegistryEntry } from "../../shared.ts";

export const tencentProvider: RegistryEntry = {
  id: "tencent",
  alias: "tencent",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.hunyuan.cloud.tencent.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "hunyuan-pro", name: "Hunyuan Pro" }],
};
