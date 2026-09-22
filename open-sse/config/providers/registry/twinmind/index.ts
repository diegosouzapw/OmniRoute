import type { RegistryEntry } from "../../shared.ts";
import { TWINMIND_FALLBACK_MODELS } from "../../../../services/twinmindModels.ts";

export const twinmindProvider: RegistryEntry = {
  id: "twinmind",
  alias: "tm",
  format: "openai",
  executor: "twinmind",
  baseUrl: "https://api2.twinmind.com/api/v3",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  models: TWINMIND_FALLBACK_MODELS.map((model) => ({
    id: model.id,
    name: model.name,
    toolCalling: true,
  })),
};
