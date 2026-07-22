import type { RegistryEntry } from "../../shared.ts";

export const ant_lingProvider: RegistryEntry = {
  id: "ant-ling",
  alias: "ling",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.ant-ling.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Ling-2.6-1T (non-reasoning, 262K ctx) stays first as the provider default;
    // Ring-2.6-1T is the reasoning variant. Both ids are BEST-EFFORT per
    // inclusionAI/Ant Group's public docs — developer.ant-ling.com is the only
    // documented onboarding portal, and this baseUrl was found via smoke test
    // (not published in the public docs). NOT verified against a live
    // /v1/models response (requires an API key we don't have). Correct these
    // ids via live model discovery once a real key is available.
    { id: "Ling-2.6-1T", name: "Ling 2.6 1T" },
    { id: "Ring-2.6-1T", name: "Ring 2.6 1T" },
  ],
};
