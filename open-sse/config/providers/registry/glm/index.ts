import type { RegistryEntry } from "../../shared.ts";
import { GLM_REQUEST_DEFAULTS, GLM_TIMEOUT_MS, GLM_SHARED_MODELS } from "../../shared.ts";

export const glmProvider: RegistryEntry = {
  id: "glm",
  alias: "glm",
  format: "openai",
  executor: "glm",
  naiveResetTimezone: "+08:00",
  baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
  defaultContextLength: 200000,
  authType: "apikey",
  authHeader: "bearer",
  requestDefaults: GLM_REQUEST_DEFAULTS,
  timeoutMs: GLM_TIMEOUT_MS,
  // #14779: bare "glm" has no live-discovery endpoint; its synced catalog is only a
  // point-in-time copy of this registry (local_catalog), so it must not veto
  // registry models added after the snapshot was taken.
  liveCatalogAuthoritative: false,
  models: [...GLM_SHARED_MODELS],
};
