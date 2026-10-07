// ZenMux protocol contracts: docs.zenmux.ai/api/vertexai/generate-images
// and docs.zenmux.ai/api/openai/generate-an-image.
export const ZENMUX_IMAGE_PROVIDER = {
  id: "zenmux",
  alias: "zm",
  baseUrl: "https://zenmux.ai/api/vertex-ai/v1",
  authType: "apikey",
  authHeader: "bearer",
  format: "zenmux-image",
  models: [
    {
      id: "inclusionai/ming-image-0.1-design",
      name: "Ming Image 0.1 Design (ZenMux)",
      supportedSizes: [],
      description: "Text-to-image only. Dimensions are model-selected; omit size and aspect ratio.",
    },
    { id: "z-ai/glm-image", name: "GLM Image (ZenMux)" },
    { id: "x-ai/grok-imagine-image-2.0", name: "Grok Imagine Image 2.0 (ZenMux)" },
    { id: "meta/muse-image-1.0", name: "Muse Image 1.0 (ZenMux)" },
    { id: "openai/gpt-image-2", name: "GPT Image 2 (ZenMux)" },
    { id: "openai/gpt-image-1.5", name: "GPT Image 1.5 (ZenMux)" },
  ],
  // Size support varies by model; do not advertise a provider-wide guarantee.
  supportedSizes: [],
};
