import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/pollinations — no-key reverse proxy to Pollinations (gpt4free project,
// issue #6650). Separate route from the existing direct pollinations.ai entry; same
// OpenAI-compatible shape as the other no-key gateways.
export const g4f_pollinationsProvider: RegistryEntry = {
  id: "g4f-pollinations",
  alias: "g4fpol",
  format: "openai",
  executor: "default",
  baseUrl: "https://g4f.space/api/pollinations/v1/chat/completions",
  modelsUrl: "https://g4f.space/api/pollinations/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    { id: "openai", name: "OpenAI (g4f/Pollinations)" },
    { id: "openai-fast", name: "OpenAI Fast (g4f/Pollinations)" },
  ],
};
