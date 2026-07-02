import type { RegistryEntry } from "../../shared.ts";
export const grok_webProvider: RegistryEntry = {
  id: "grok-web",
  alias: "gw",
  format: "openai",
  executor: "grok-web",
  baseUrl: "https://grok.com/rest/app-chat/conversations/new",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: [
    {
      id: "fast",
      name: "Grok 4.20",
      capabilities: {
        supportsTools: true,
      },
    },
    {
      id: "expert",
      name: "Grok 4.20 Thinking",
      capabilities: {
        supportsTools: true,
      },
    },
    {
      id: "heavy",
      name: "Grok 4.20 Multi Agent",
      capabilities: {
        supportsTools: true,
      },
    },
    {
      id: "grok-420-computer-use-sa",
      name: "Grok 4.3 (Beta)",
      capabilities: {
        supportsTools: true,
      },
    },
  ],
};
