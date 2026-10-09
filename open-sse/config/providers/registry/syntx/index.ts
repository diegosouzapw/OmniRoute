import type { RegistryEntry } from "../../shared.ts";
import { SYNTX_FALLBACK_MODELS } from "../../../../services/syntxModels.ts";

export const syntxProvider: RegistryEntry = {
  id: "syntx",
  alias: "stx",
  format: "openai",
  executor: "syntx",
  baseUrl: "https://api.syntx.ai/api/v1",
  authType: "apikey",
  authHeader: "bearer",
  timeoutMs: 600_000,
  passthroughModels: true,
  models: SYNTX_FALLBACK_MODELS.map((model) => ({
    id: model.id,
    name: model.name,
    toolCalling: true,
    supportsVision: model.vision === true,
  })),
};
