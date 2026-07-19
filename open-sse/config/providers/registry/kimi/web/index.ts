import type { RegistryEntry } from "../../../shared.ts";

export const KIMI_WEB_STATIC_MODELS = [
  { id: "k3", name: "K3", supportsReasoning: true },
  { id: "k2d6", name: "K2.6", supportsReasoning: true },
];

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
  authHeader: "Authorization",
  // Curated-only catalog. Agent Swarm is excluded because it requires Kimi's
  // parallel-agent tool protocol rather than ordinary chat routing.
  models: KIMI_WEB_STATIC_MODELS,
};
