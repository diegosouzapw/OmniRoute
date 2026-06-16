import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const featherless_aiProvider: RegistryEntry = {
  id: "featherless-ai",
  alias: "featherless",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.featherless.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["featherless-ai"],
};
