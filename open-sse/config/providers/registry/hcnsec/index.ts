import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const hcnsecProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "hcnsec",
  alias: "hcnsec",
  baseUrl: "https://api.hcnsec.cn/v1/chat/completions",
  modelsUrl: "https://api.hcnsec.cn/v1/models",
  models: [],
  passthroughModels: true,
});
