import type { RegistryEntry } from "../../shared.ts";
import { GLM_SHARED_MODELS } from "../../../glmProvider.ts";

const GLM_EXECUTOR_EFFORT_ALIASES = new Set([
  "glm-5.3-high",
  "glm-5.3-low",
  "glm-5.3-flash-high",
  "glm-5.3-flash-low",
  "glm-5.3-flash-max",
  "glm-5.2-high",
  "glm-5.2-max",
]);

export const ZCODE_MODELS = GLM_SHARED_MODELS.filter(
  (model) => !GLM_EXECUTOR_EFFORT_ALIASES.has(model.id)
).map((model) => ({ ...model, supportedThinkingEfforts: [] }));

/**
 * Local ZCode app-server backend. Authentication remains in the user's local
 * ZCode profile (`builtin:zai-coding-plan`); OmniRoute does not receive or
 * persist the Z.ai credential.
 */
export const zcodeProvider: RegistryEntry = {
  id: "zcode",
  alias: "zc",
  format: "openai",
  executor: "zcode",
  baseUrl: "zcode://app-server/stdio",
  authType: "none",
  authHeader: "none",
  // ZCode's app-server transport does not consume reasoning_effort; keep thinking
  // capability metadata without advertising aliases or tiers that it would ignore.
  models: ZCODE_MODELS,
};
