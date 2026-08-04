import type { RegistryEntry } from "../../shared.ts";
import { PROMPTQL_FALLBACK_MODELS } from "../../../../services/promptqlModels.ts";

// PromptQL playground agent (prompt.ql.app) — unofficial reverse-engineered session.
// Live catalog: GraphQL FetchLlmConfigs; seed below is offline fallback.
export const promptqlProvider: RegistryEntry = {
  id: "promptql",
  alias: "pql",
  format: "openai",
  executor: "promptql",
  baseUrl: "https://data.prompt.ql.app/promptql/playground-v2-hge/v1/graphql",
  authType: "apikey",
  authHeader: "authorization",
  passthroughModels: true,
  models: PROMPTQL_FALLBACK_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    ...(m.supportsVision ? { supportsVision: true } : {}),
  })),
};
