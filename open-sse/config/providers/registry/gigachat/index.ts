import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const gigachatProvider: RegistryEntry = {
  id: "gigachat",
  alias: "gigachat",
  format: "openai",
  executor: "default",
  baseUrl: "https://gigachat.devices.sberbank.ru/api/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.gigachat,
};
