import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const regoloProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "regolo",
  alias: "regolo",
  // #14996: the entry pointed at the bare host, so DefaultExecutor POSTed chat
  // requests to https://api.regolo.ai instead of /v1/chat/completions, and with
  // no modelsUrl discovery could never populate the catalog (the two static ids
  // were placeholders that exist in no Regolo catalog). Point both URLs at the
  // documented /v1 endpoints and rely on modelsUrl discovery + passthroughModels
  // for real ids (e.g. regolo/gpt-oss-120b).
  baseUrl: "https://api.regolo.ai/v1/chat/completions",
  modelsUrl: "https://api.regolo.ai/v1/models",
  models: [],
  passthroughModels: true,
});
