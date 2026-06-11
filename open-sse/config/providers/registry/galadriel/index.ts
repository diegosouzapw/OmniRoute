import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const galadrielProvider: RegistryEntry = {
  id: "galadriel",
  alias: "galadriel",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.galadriel.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.galadriel,
};
