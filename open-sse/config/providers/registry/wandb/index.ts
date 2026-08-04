import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const wandbProvider: RegistryEntry = {
  id: "wandb",
  alias: "wandb",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.inference.wandb.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.wandb,
};
