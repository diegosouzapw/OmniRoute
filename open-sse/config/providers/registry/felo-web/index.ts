import type { RegistryEntry } from "../../shared.ts";

export const felo_webProvider: RegistryEntry = {
  id: "felo-web",
  alias: "felo",
  format: "openai",
  executor: "felo-web",
  baseUrl: "https://felo.ai/api-proxy/main/search/threads",
  authType: "none",
  authHeader: "none",
  models: [
    { id: "felo-chat", name: "Felo Chat" },
    { id: "felo-search", name: "Felo Search" },
    { id: "felo-scholar", name: "Felo Scholar" },
    { id: "felo-social", name: "Felo Social" },
    { id: "felo-document", name: "Felo Document" },
  ],
};
