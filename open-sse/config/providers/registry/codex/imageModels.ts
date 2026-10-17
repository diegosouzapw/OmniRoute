import type { ImageProviderConfig } from "../../../imageRegistryTypes.ts";

// Hosted orchestration models and explicitly requested image engines are distinct.
// Catalog admission does not establish the served engine or account entitlement.
export const CODEX_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "codex",
  alias: "cx",
  baseUrl: "https://chatgpt.com/backend-api/codex/responses",
  authType: "oauth",
  authHeader: "bearer",
  format: "codex-responses",
  models: [
    {
      id: "gpt-5.6-sol",
      catalogId: "gpt-5.6-sol-image",
      name: "GPT 5.6 Sol (Codex Image)",
    },
    {
      id: "gpt-5.6-terra",
      catalogId: "gpt-5.6-terra-image",
      name: "GPT 5.6 Terra (Codex Image)",
    },
    {
      id: "gpt-5.6-luna",
      catalogId: "gpt-5.6-luna-image",
      name: "GPT 5.6 Luna (Codex Image)",
    },
    {
      id: "gpt-6.1-sol",
      catalogId: "gpt-6.1-sol-image",
      name: "GPT 6.1 Sol (Codex Image)",
    },
    {
      id: "gpt-image-2",
      name: "GPT Image 2 (Codex requested engine)",
      inputModalities: ["text", "image"],
      description:
        "Dedicated Codex Images request; served engine, account access and actual dimensions remain unverified.",
    },
    {
      id: "gpt-image-2.5-sunburst",
      name: "GPT Image 2.5 Sunburst (Codex requested engine)",
      inputModalities: ["text", "image"],
      description:
        "Explicit Sunburst request through Codex Images; OAuth entitlement and served engine are unknown.",
    },
    {
      id: "gpt-image-2.5-flare",
      name: "GPT Image 2.5 Flare (Codex)",
      inputModalities: ["text", "image"],
    },
  ],
  supportedSizes: ["1024x1024", "1024x1536", "1536x1024"],
};
