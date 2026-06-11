import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const predibaseProvider: RegistryEntry = {
  id: "predibase",
  alias: "predibase",
  format: "openai",
  executor: "default",
  baseUrl: "https://serving.app.predibase.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.predibase,
};
