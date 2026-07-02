import type { RegistryEntry } from "../../shared.ts";

// Astraflow (UCloud) — OpenAI-compatible platform, China endpoint.
// Base URL is the vendor's inference domain (behind UCloud's edge WAF), not the
// astraflow.ucloud.cn marketing site — verify at first use if it changes.
export const astraflow_cnProvider: RegistryEntry = {
  id: "astraflow-cn",
  alias: "astraflow-cn",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.modelverse.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [],
  passthroughModels: true,
};
