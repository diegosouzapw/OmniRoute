import type { RegistryEntry } from "../../shared.ts";
import { CONOL_FALLBACK_MODELS } from "../../../../services/conolModels.ts";

// conol.ai — unofficial browser-session chat.
// POST /api/sessions, then cumulative NDJSON from /messages?logDeltas=1.
export const conolWebProvider: RegistryEntry = {
  id: "conol-web",
  alias: "cnl",
  format: "openai",
  executor: "conol-web",
  baseUrl: "https://conol.ai/api/sessions",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: CONOL_FALLBACK_MODELS,
};
