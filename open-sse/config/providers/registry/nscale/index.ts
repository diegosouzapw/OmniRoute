import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const nscaleProvider: RegistryEntry = {
  id: "nscale",
  alias: "nscale",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference.api.nscale.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.nscale,
};
