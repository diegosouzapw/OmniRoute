import type { ImageProviderConfig } from "../../../imageRegistryTypes.ts";

export const XAI_IMAGE_CONFIG = {
  baseUrl: "https://api.x.ai/v1/images/generations",
  authHeader: "bearer",
  format: "xai-image",
  models: [
    { id: "grok-imagine-image-2.0", name: "Grok Imagine Image 2.0" },
    { id: "grok-imagine-image-quality", name: "Grok Imagine Image Quality" },
    { id: "grok-imagine-image", name: "Grok Imagine Image" },
  ],
  supportedSizes: ["1024x1024", "2048x2048", "1536x1024", "1024x1536", "1792x1024", "1024x1792"],
};

export const XAI_API_KEY_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "xai",
  baseUrl: "https://api.x.ai/v1/images/generations",
  authType: "apikey",
  authHeader: "bearer",
  format: "openai",
  models: [
    { id: "grok-imagine-image-quality", name: "Grok Imagine Image Quality" },
    { id: "grok-imagine-image", name: "Grok Imagine Image" },
  ],
  supportedSizes: ["1024x1024", "2048x2048"],
};

export const XAI_SUBSCRIPTION_IMAGE_PROVIDERS: Record<string, ImageProviderConfig> = {
  xai: { ...XAI_IMAGE_CONFIG, id: "xai", authType: "apikey" },
  "xai-oauth": { ...XAI_IMAGE_CONFIG, id: "xai-oauth", alias: "xao", authType: "oauth" },
  "grok-cli": { ...XAI_IMAGE_CONFIG, id: "grok-cli", alias: "gc", authType: "oauth" },
};
