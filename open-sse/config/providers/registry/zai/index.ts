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
  models: [
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "glm-5", name: "GLM 5" },
    { id: "glm-5-turbo", name: "GLM 5 Turbo" },
  ],
};
