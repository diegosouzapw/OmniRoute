import type { RegistryEntry } from "../../shared.ts";
import { GLM_REQUEST_DEFAULTS, GLM_TIMEOUT_MS, GLM_SHARED_MODELS } from "../../shared.ts";

export const glmProvider: RegistryEntry = {
  id: "glm",
  alias: "glm",
  format: "openai",
  executor: "glm",
  baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
  defaultContextLength: 200000,
  authType: "apikey",
  authHeader: "bearer",
  requestDefaults: GLM_REQUEST_DEFAULTS,
  timeoutMs: GLM_TIMEOUT_MS,
  models: [...GLM_SHARED_MODELS],
};
