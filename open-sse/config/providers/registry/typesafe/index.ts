import type { RegistryEntry } from "../../shared.ts";

/**
 * TypeSafe is registered for credentials and model discovery only. Jev is not
 * chat-shaped; dispatch is exclusively through POST /v1/systemone.
 */
export const typesafeProvider: RegistryEntry = {
  id: "typesafe",
  alias: "typesafe",
  format: "systemone",
  executor: "none",
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
