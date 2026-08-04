import type { RegistryEntry } from "../../shared.ts";

/**
 * Zed Hosted Models — cloud.zed.dev, Zed's own aggregator (fronts
 * Anthropic/OpenAI/Google/xAI depending on the requested model).
 *
 * Distinct from the pre-existing `zed` provider id (Zed IDE local
 * credential-import surface — src/lib/zed-oauth/ + src/mitm/detection/zed.ts).
 * This entry is the new cloud-proxy capability; `zed-hosted` avoids an id clash.
 *
 * `models: []` + `modelsUrl` intentionally — Zed's hosted catalog changes
 * frequently and is fetched live per-connection by the executor
 * (open-sse/shared/zedAuth.ts::resolveZedModels), never hardcoded here.
 * `modelsUrl` also feeds the dashboard's generic models-discovery fallback
 * (src/app/api/providers/[id]/models/discoveryConfig.ts).
 *
 * No `oauth.clientIdEnv/clientSecretEnv` — Zed's native-app sign-in uses a
 * self-generated RSA keypair per login attempt, not a registered OAuth
 * client_id/secret (see open-sse/shared/zedAuth.ts header comment).
 */
export const zed_hostedProvider: RegistryEntry = {
  id: "zed-hosted",
  format: "openai",
  executor: "zed-hosted",
  baseUrl: "https://cloud.zed.dev/completions",
  authType: "oauth",
  authHeader: "bearer",
  timeoutMs: 120000,
  forceStream: true,
  models: [],
  modelsUrl: "https://cloud.zed.dev/models",
  passthroughModels: true,
};

export default zed_hostedProvider;
