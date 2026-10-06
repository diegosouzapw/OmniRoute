import type { RegistryEntry } from "../../shared.ts";
import { getAnthropicCompatHeaders } from "../../shared.ts";

export const zaiProvider: RegistryEntry = {
  id: "zai",
  alias: "zai",
  format: "claude",
  executor: "default",
  naiveResetTimezone: "+08:00",
  baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
  urlSuffix: "?beta=true",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  // Real upstream model IDs only. GLM-5.3-family models are tagged for z.ai's
  // OpenAI-compatible Coding Plan endpoint because their documented reasoning
  // selector is `reasoning_effort` (low|high|max) and GLM-5.3-Flash supports
  // native vision there. Older entries stay on the provider's default Anthropic
  // compatibility path to preserve existing behavior.
  models: [
    {
      id: "glm-5.3",
      name: "GLM 5.3",
      contextLength: 1000000,
      maxOutputTokens: 131072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      targetFormat: "openai",
    },
    {
      id: "glm-5.3-flash",
      name: "GLM 5.3 Flash",
      contextLength: 1000000,
      maxOutputTokens: 131072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      supportsVision: true,
      targetFormat: "openai",
    },
    { id: "glm-5.2", name: "GLM 5.2" },
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "glm-5", name: "GLM 5" },
    { id: "glm-5-turbo", name: "GLM 5 Turbo" },
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash" },
    { id: "glm-4.7", name: "GLM 4.7" },
  ],
};
