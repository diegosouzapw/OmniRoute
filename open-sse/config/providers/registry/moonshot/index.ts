import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const moonshotProvider: RegistryEntry = {
  id: "moonshot",
  alias: "moonshot",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.moonshot.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.moonshot,
};
