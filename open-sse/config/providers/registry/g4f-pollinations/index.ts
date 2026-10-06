import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/pollinations — optional-auth remote Pollinations gateway (gpt4free,
// issue #6650). Anonymous requests require proof-of-work cake credits; a member API key
// is the alternative. This remains separate from the direct pollinations.ai entry.
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
