import type { RegistryEntry } from "../../../shared.ts";
import {
  GLM_REQUEST_DEFAULTS,
  GLM_TIMEOUT_MS,
  GLM_SHARED_MODELS
} from "../../../shared.ts";

export const glm_cnProvider: RegistryEntry = {
  id: "glm-cn",
  alias: "glmcn",
  format: "openai",
  executor: "glm",
  baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 200000,
  requestDefaults: GLM_REQUEST_DEFAULTS,
  timeoutMs: GLM_TIMEOUT_MS,
  models: [...GLM_SHARED_MODELS],
  passthroughModels: true,
};
