import type { RegistryEntry } from "../../../shared.ts";

export const kimi_webProvider: RegistryEntry = {
  id: "kimi-web",
  // Distinct alias: the primary "kimi" provider (dedicated KimiExecutor) keeps
  // the short "kimi" alias; this web/cookie variant is addressed by its own id.
  alias: "kimi-web",
  format: "openai",
  executor: "kimi-web",
  baseUrl: "https://kimi.moonshot.cn/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "kimi-default", name: "Kimi Default" },
    { id: "kimi-128k", name: "Kimi 128K (Long Context)" },
  ],
};
