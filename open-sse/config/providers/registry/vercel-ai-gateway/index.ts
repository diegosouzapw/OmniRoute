import type { RegistryEntry } from "../../shared.ts";
import {
  CHAT_OPENAI_COMPAT_MODELS
} from "../../shared.ts";

export const vercel_ai_gatewayProvider: RegistryEntry = {
  id: "vercel-ai-gateway",
  alias: "vag",
  format: "openai",
  executor: "default",
  baseUrl: "https://ai-gateway.vercel.sh/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["vercel-ai-gateway"],
};
