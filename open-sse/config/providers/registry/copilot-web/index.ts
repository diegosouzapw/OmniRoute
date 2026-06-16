import type { RegistryEntry } from "../../shared.ts";

export const copilot_webProvider: RegistryEntry = {
  id: "copilot-web",
  alias: "copilot-web",
  format: "openai",
  executor: "copilot-web",
  baseUrl: "wss://copilot.microsoft.com/c/api/chat?api-version=2",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "copilot-pro", name: "Copilot Pro (web)" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo (via Copilot)" },
    { id: "gpt-4", name: "GPT-4 (via Copilot)" },
  ],
};
