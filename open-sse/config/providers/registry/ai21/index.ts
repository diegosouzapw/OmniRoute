import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const ai21Provider: RegistryEntry = {
  id: "ai21",
  alias: "ai21",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.ai21.com/studio/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.ai21,
};
