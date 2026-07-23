import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

/**
 * OVHcloud AI Endpoints.
 *
 * The key is genuinely optional: the anonymous tier answers /chat/completions
 * with no Authorization header at all (2 req/min per IP per model, verified
 * live 2026-07-20), while an OVHcloud key raises that to 400 req/min. Sending a
 * BAD key is worse than sending none — upstream replies 403 instead of falling
 * back — so authType stays "optional" and the executor only attaches the header
 * when a real credential exists.
 */
export const ovhcloudProvider: RegistryEntry = {
  id: "ovhcloud",
  alias: "ovh",
  format: "openai",
  executor: "default",
  baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions",
  modelsUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/models",
  authType: "optional",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.ovhcloud,
};
