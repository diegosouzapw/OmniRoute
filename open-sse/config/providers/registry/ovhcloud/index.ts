import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const ovhcloudProvider: RegistryEntry = {
  id: "ovhcloud",
  alias: "ovh",
  format: "openai",
  executor: "default",
  baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.ovhcloud,
};
