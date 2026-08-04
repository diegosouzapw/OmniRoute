import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const morphProvider: RegistryEntry = {
  id: "morph",
  alias: "morph",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.morphllm.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.morph,
};
