import type { RegistryEntry } from "../../../shared.ts";

export const doubao_webProvider: RegistryEntry = {
  id: "doubao-web",
  alias: "db",
  format: "openai",
  executor: "doubao-web",
  baseUrl: "https://www.dola.com/chat/completion",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "dola-speed", name: "Dola Speed" },
    { id: "dola-pro", name: "Dola Pro" },
  ],
};
