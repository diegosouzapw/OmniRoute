import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const nebiusProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "nebius",
  alias: "nebius",
  baseUrl: "https://api.tokenfactory.nebius.com/v1/chat/completions",
  models: [{ id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B Instruct" }],
});
