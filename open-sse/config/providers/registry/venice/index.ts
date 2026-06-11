import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const veniceProvider: RegistryEntry = {
  id: "venice",
  alias: "venice",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.venice.ai/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.venice,
};
