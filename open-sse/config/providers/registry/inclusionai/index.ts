import type { RegistryEntry } from "../../shared.ts";

export const inclusionaiProvider: RegistryEntry = {
  id: "inclusionai",
  alias: "inclusionai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.inclusionai.tech/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "inclusion-model", name: "Inclusion Model" }],
};
