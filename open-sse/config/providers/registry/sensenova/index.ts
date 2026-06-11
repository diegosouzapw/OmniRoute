import type { RegistryEntry } from "../../shared.ts";

export const sensenovaProvider: RegistryEntry = {
  id: "sensenova",
  alias: "sensenova",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.sensenova.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "sensechat", name: "SenseChat" }],
};
