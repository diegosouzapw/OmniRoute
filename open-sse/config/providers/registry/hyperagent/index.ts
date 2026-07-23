import type { RegistryEntry } from "../../shared.ts";
import { HYPERAGENT_FALLBACK_MODELS } from "../../../../services/hyperagentModels.ts";

// HyperAgent (hyperagent.com) — unofficial reverse-engineered web session.
// Auth: browser Cookie header. Chat: POST /api/threads/{id}/chat (SSE).
// Credits: GET /api/settings/billing/usage → creditData.creditBlocks.
export const hyperagentProvider: RegistryEntry = {
  id: "hyperagent",
  alias: "ha",
  format: "openai",
  executor: "hyperagent",
  baseUrl: "https://hyperagent.com/api/threads",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: HYPERAGENT_FALLBACK_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
  })),
};
