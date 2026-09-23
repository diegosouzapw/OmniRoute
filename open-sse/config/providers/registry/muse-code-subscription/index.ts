import type { RegistryEntry } from "../../shared.ts";

/** Separate from muse-code (CLI compatibility), Meta API keys, and Muse Web. */
export const museCodeSubscriptionProvider: RegistryEntry = {
  id: "muse-code-subscription",
  alias: "mcs",
  format: "openai-responses",
  executor: "muse-code-subscription",
  baseUrl: "https://api.meta.ai/v1/responses",
  authType: "oauth",
  authHeader: "bearer",
  reasoningTransport: "opaque",
  forceStream: true,
  // Do not route arbitrary model IDs onto this subscription credential.
  passthroughModels: false,
  models: [
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3 (subscription)",
      targetFormat: "openai-responses",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "muse-spark-1.3-contributor",
      name: "Muse Spark 1.3 Contributor (subscription; data contribution)",
      targetFormat: "openai-responses",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
};
