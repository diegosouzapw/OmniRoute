import type { RegistryEntry } from "../../shared.ts";

export const typesafeProvider: RegistryEntry = {
  id: "typesafe",
  alias: "jev",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.typesafe.ai",
  chatPath: "/v1/systemone",
  authType: "apikey",
  authHeader: "Authorization",
  // Jev is a decision model, not a text model, so context length is not applicable.
  // We set a default but it may be ignored.
  defaultContextLength: 4096,
  models: [
    {
      id: "jev-latest",
      name: "Jev Latest",
    },
  ],
};
