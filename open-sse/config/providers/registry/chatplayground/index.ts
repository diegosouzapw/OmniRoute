import type { RegistryEntry } from "../../shared.ts";
import {
  CHATPLAYGROUND_DEFAULT_CONTEXT,
  CHATPLAYGROUND_FALLBACK_MODELS,
} from "../../../../services/chatplaygroundModels.ts";

export const chatplaygroundProvider: RegistryEntry = {
  id: "chatplayground",
  alias: "cpl",
  format: "openai",
  executor: "chatplayground",
  baseUrl: "https://app.chatplayground.ai/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  defaultContextLength: CHATPLAYGROUND_DEFAULT_CONTEXT,
  models: CHATPLAYGROUND_FALLBACK_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    contextLength: m.contextLength || CHATPLAYGROUND_DEFAULT_CONTEXT,
  })),
};
