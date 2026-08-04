import type { RegistryEntry } from "../../shared.ts";
import { MOONSHOT_KIMI_MODELS } from "../moonshot/index.ts";

export const kimiProvider: RegistryEntry = {
  id: "kimi",
  alias: "kimi",
  format: "openai",
  executor: "moonshot",
  baseUrl: "https://api.moonshot.ai/v1/chat/completions",
  // Moonshot's Kimi route requires upstream SSE; chatCore buffers it back to JSON
  // when the client requests stream:false.
  forceStream: true,
  authType: "apikey",
  authHeader: "bearer",
  models: MOONSHOT_KIMI_MODELS,
};
