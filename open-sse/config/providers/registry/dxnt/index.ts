import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * DXNT - OpenAI-compatible API with a free account quota.
 *
 * Models are discovered from the provider's authenticated catalog rather than
 * copied into a static list, so account-specific availability remains intact.
 */
export const dxntProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "dxnt",
  alias: "dxnt",
  baseUrl: "https://www.dxnt.com/v1/chat/completions",
  modelsUrl: "https://www.dxnt.com/v1/models",
  models: [],
  passthroughModels: true,
});
