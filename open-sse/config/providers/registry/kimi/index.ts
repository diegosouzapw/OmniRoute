import type { RegistryEntry } from "../../shared.ts";
import { MOONSHOT_KIMI_MODELS } from "../moonshot/index.ts";

export const kimiProvider: RegistryEntry = {
  id: "kimi",
  alias: "kimi",
  format: "openai",
  executor: "moonshot",
  baseUrl: "https://api.moonshot.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: MOONSHOT_KIMI_MODELS,
};
