import type { RegistryEntry } from "../../../shared.ts";

export const doubao_webProvider: RegistryEntry = {
  id: "doubao-web",
  alias: "db",
  format: "openai",
  executor: "doubao-web",
  baseUrl: "https://www.doubao.com/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "doubao-default", name: "Doubao Default" },
    { id: "doubao-pro", name: "Doubao Pro" },
  ],
};
