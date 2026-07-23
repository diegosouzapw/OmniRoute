import type { RegistryEntry } from "../../../shared.ts";
import { GLMT_REQUEST_DEFAULTS, GLMT_TIMEOUT_MS, GLM_SHARED_MODELS } from "../../../shared.ts";

export const glmtProvider: RegistryEntry = {
  id: "glmt",
  alias: "glmt",
  format: "openai",
  executor: "glm",
  baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
  defaultContextLength: 200000,
  authType: "apikey",
  authHeader: "bearer",
  requestDefaults: GLMT_REQUEST_DEFAULTS,
  timeoutMs: GLMT_TIMEOUT_MS,
  models: [...GLM_SHARED_MODELS],
};
