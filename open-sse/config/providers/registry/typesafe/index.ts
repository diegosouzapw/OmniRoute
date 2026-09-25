import type { RegistryEntry } from "../../shared.ts";

/**
 * TypeSafe AI — System One / Jev. Not a chat-completions provider.
 * Requests go through POST /v1/systemone (passthrough). Versioned `jev-*`
 * ids are accepted even when GET /v1/models only lists aliases.
 */
export const typesafeProvider: RegistryEntry = {
  id: "typesafe",
  alias: "typesafe",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.typesafe.ai/v1/systemone",
  modelsUrl: "https://api.typesafe.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  liveCatalogAuthoritative: false,
  models: [
    { id: "jev-latest", name: "Jev (latest stable)" },
    { id: "jev-preview", name: "Jev (preview)" },
  ],
};
