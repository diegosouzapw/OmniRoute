import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// Every model /v1/models lists is a text-output chat model (image and video
// generation use a separate Atlas Cloud API), so no category filter is needed.
export const atlascloudProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "atlascloud",
  alias: "atlascloud",
  baseUrl: "https://api.atlascloud.ai/v1/chat/completions",
  modelsUrl: "https://api.atlascloud.ai/v1/models",
  models: [],
  passthroughModels: true,
});
