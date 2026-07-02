import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const upstageProvider: RegistryEntry = {
  id: "upstage",
  alias: "upstage",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.upstage.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.upstage,
};
