import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * CloudCode.ONE - OpenAI-compatible API with published free model aliases.
 *
 * The Anthropic-compatible endpoint is documented separately; this registry
 * covers the OpenAI-compatible API surface audited for this migration.
 */
export const cloudcodeOneProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "cloudcode-one",
  alias: "cloudcode-one",
  baseUrl: "https://api.cloudcode.one/v1/chat/completions",
  modelsUrl: "https://api.cloudcode.one/v1/models",
  models: [
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash" },
    { id: "glm-4.6v-flash", name: "GLM 4.6V Flash" },
  ],
  passthroughModels: true,
});
