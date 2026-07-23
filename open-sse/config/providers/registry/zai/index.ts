import type { RegistryEntry } from "../../shared.ts";
import { getAnthropicCompatHeaders, ANTHROPIC_VERSION_HEADER } from "../../shared.ts";

export const zaiProvider: RegistryEntry = {
  id: "zai",
  alias: "zai",
  format: "claude",
  executor: "default",
  baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
  urlSuffix: "?beta=true",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  // Real upstream model IDs only. The effort tiers (glm-5.2-high / glm-5.2-max)
  // are intentionally NOT listed here: they are OmniRoute aliases resolved by the
  // GlmExecutor (parseGlm52Effort → base "glm-5.2" + effort field). This provider
  // uses the DefaultExecutor, which sends the model ID verbatim, so the aliases
  // would reach z.ai's Anthropic endpoint as unknown IDs. Use the `glm` provider
  // for effort tiers. Vision models are likewise omitted (handled elsewhere).
  models: [
    { id: "glm-5.2", name: "GLM 5.2" },
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "glm-5", name: "GLM 5" },
    { id: "glm-5-turbo", name: "GLM 5 Turbo" },
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash" },
    { id: "glm-4.7", name: "GLM 4.7" },
  ],
};
