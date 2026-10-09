import type { RegistryEntry } from "../../shared.ts";
import { CHATPLAYGROUND_DEFAULT_CONTEXT } from "../../../../services/chatplaygroundModels.ts";

export const chatplaygroundProvider: RegistryEntry = {
  id: "chatplayground",
  alias: "cpl",
  format: "openai",
  executor: "chatplayground",
  baseUrl: "https://app.chatplayground.ai/api/chat",
  modelsUrl: "https://app.chatplayground.ai/api/models",
  authType: "apikey",
  authHeader: "cookie",
  defaultContextLength: CHATPLAYGROUND_DEFAULT_CONTEXT,
  models: [],
};
