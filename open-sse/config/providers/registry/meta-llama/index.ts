import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const meta_llamaProvider: RegistryEntry = {
  id: "meta-llama",
  alias: "meta",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.llama.com/compat/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["meta-llama"],
};
