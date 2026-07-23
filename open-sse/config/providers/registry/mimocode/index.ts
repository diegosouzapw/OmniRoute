import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

// Mimocode (Xiaomi MiMo free OpenAI-compatible gateway) — no-auth, custom executor.
// Re-added after the registry modularization (#3993) dropped it; restores #3837.
export const mimocodeProvider: RegistryEntry = {
  id: "mimocode",
  alias: "mcode",
  format: "openai",
  executor: "mimocode",
  baseUrl: "https://api.xiaomimimo.com",
  chatPath: "/api/free-ai/openai/chat",
  authType: "none",
  authHeader: "none",
  models: CHAT_OPENAI_COMPAT_MODELS["mimocode"],
};
