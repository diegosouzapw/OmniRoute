import type { RegistryEntry } from "../../shared.ts";
import { LMARENA_DIRECT_MODELS } from "./directModels.ts";

/**
 * Arena (formerly LMArena) web-session provider — arena.ai.
 * Wire id remains `lmarena`. Model list is a static Direct-chat allowlist
 * (no live arena.ai HTML scrape).
 */
export const lmarenaProvider: RegistryEntry = {
  id: "lmarena",
  alias: "lma",
  format: "openai",
  executor: "lmarena",
  baseUrl: "https://arena.ai/nextjs-api/stream/create-evaluation",
  authType: "apikey",
  authHeader: "cookie",
  models: LMARENA_DIRECT_MODELS,
};
