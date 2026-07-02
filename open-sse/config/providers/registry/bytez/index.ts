import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const bytezProvider: RegistryEntry = {
  id: "bytez",
  alias: "bytez",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.bytez.com/models/v2",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.bytez,
};
