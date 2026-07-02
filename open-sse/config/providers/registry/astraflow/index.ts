import type { RegistryEntry } from "../../shared.ts";

// Astraflow (UCloud) — OpenAI-compatible platform, global endpoint.
// Base URL is the vendor's inference domain (behind UCloud's edge WAF), not the
// astraflow.ucloud-global.com marketing site — verify at first use if it changes.
export const astraflowProvider: RegistryEntry = {
  id: "astraflow",
  alias: "astraflow",
  format: "openai",
  executor: "default",
  baseUrl: "https://api-us-ca.umodelverse.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [],
  passthroughModels: true,
};
