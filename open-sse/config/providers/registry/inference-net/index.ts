import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const inference_netProvider: RegistryEntry = {
  id: "inference-net",
  alias: "inet",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.inference.net/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["inference-net"],
};
