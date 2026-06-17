import type { RegistryEntry } from "../../shared.ts";

export const pi_webProvider: RegistryEntry = {
  id: "pi-web",
  alias: "pi",
  format: "openai",
  executor: "pi-web",
  baseUrl: "https://pi.ai/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [{ id: "pi-default", name: "Pi Default (Inflection)" }],
};
