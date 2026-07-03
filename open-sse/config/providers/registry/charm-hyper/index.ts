import type { RegistryEntry } from "../../shared.ts";

export const charmHyperProvider: RegistryEntry = {
  id: "charm-hyper",
  alias: "charm-hyper",
  format: "openai",
  executor: "default",
  baseUrl: "https://hyper.charm.land/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  modelsUrl: "https://hyper.charm.land/v1/models",
  models: [{ id: "hyper/auto", name: "Charm Hyper Auto" }],
  passthroughModels: true,
};
