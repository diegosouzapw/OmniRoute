import type { RegistryEntry } from "../../../shared.ts";

export const kimi_webProvider: RegistryEntry = {
  id: "kimi-web",
  // Distinct alias: the primary "kimi" provider (dedicated KimiExecutor) keeps
  // the short "kimi" alias; this web/cookie variant is addressed by its own id.
  alias: "kimi-web",
  format: "openai",
  executor: "kimi-web",
  // International consumer chat — the legacy `kimi.moonshot.cn` domain now
  // redirects every non-CN visitor to www.kimi.com, which speaks a different
  // Connect-RPC API. See `open-sse/executors/kimi-web.ts` for the wire format.
  baseUrl: "https://www.kimi.com",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    // Model ids are the `key` field from www.kimi.com's
    // `/apiv2/kimi.gateway.config.v1.ConfigService/GetAvailableModels` response.
    // Agent / Agent-Swarm variants (`k2d6-agent`, `k2d6-agent-ultra`) are
    // intentionally NOT exposed — they need a different scenario
    // (`SCENARIO_OK_COMPUTER`) plus `kimiPlusId` / `agentMode` fields, which
    // the executor does not yet shape. Use `kimi-coding` (api.kimi.com) for
    // agentic flows.
    { id: "k2d6", name: "K2.6 Instant" },
    { id: "k2d6-thinking", name: "K2.6 Thinking", supportsReasoning: true },
  ],
};
