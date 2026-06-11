import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const codestralProvider: RegistryEntry = {
  id: "codestral",
  alias: "codestral",
  format: "openai",
  executor: "default",
  baseUrl: "https://codestral.mistral.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.codestral,
};
