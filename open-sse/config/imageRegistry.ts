/**
 * Image Generation Provider Registry
 *
 * Defines providers that support the /v1/images/generations endpoint.
 * Each provider has its own request format and endpoint.
 */

export const IMAGE_PROVIDERS = {
  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai", // native OpenAI format
    models: [
      { id: "gpt-image-1", name: "GPT Image 1" },
      { id: "dall-e-3", name: "DALL-E 3" },
      { id: "dall-e-2", name: "DALL-E 2" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024", "256x256", "512x512"],
  },

  xai: {
    id: "xai",
    baseUrl: "https://api.x.ai/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [{ id: "grok-2-image-1212", name: "Grok 2 Image" }],
    supportedSizes: ["1024x1024"],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "black-forest-labs/FLUX.1.1-pro", name: "FLUX 1.1 Pro" },
      { id: "black-forest-labs/FLUX.1-schnell-Free", name: "FLUX 1 Schnell (Free)" },
      { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "SDXL Base 1.0" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  fireworks: {
    id: "fireworks",
    baseUrl: "https://api.fireworks.ai/inference/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "accounts/fireworks/models/flux-1-dev-fp8", name: "FLUX 1 Dev FP8" },
      { id: "accounts/fireworks/models/stable-diffusion-xl-1024-v1-0", name: "SDXL 1024 v1.0" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  antigravity: {
    id: "antigravity",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    authType: "oauth",
    authHeader: "bearer",
    format: "gemini-image", // Special format: uses Gemini generateContent API
    models: [{ id: "gemini-2.5-flash-preview-image-generation", name: "Nano Banana" }],
    supportedSizes: ["1024x1024"],
  },

  nebius: {
    id: "nebius",
    baseUrl: "https://api.tokenfactory.nebius.com/v1/images/generations",
    fallbackUrl: "https://api.studio.nebius.com/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "black-forest-labs/flux-schnell", name: "FLUX.1 Schnell" },
      { id: "black-forest-labs/flux-dev", name: "FLUX.1 Dev" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  hyperbolic: {
    id: "hyperbolic",
    baseUrl: "https://api.hyperbolic.xyz/v1/image/generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "hyperbolic", // custom: uses model_name, returns base64 images
    models: [
      { id: "SDXL1.0-base", name: "SDXL 1.0 Base" },
      { id: "SD2", name: "Stable Diffusion 2" },
      { id: "FLUX.1-dev", name: "FLUX.1 Dev" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  nanobanana: {
    id: "nanobanana",
    baseUrl: "https://api.nanobananaapi.ai/api/v1/nanobanana/generate",
    proUrl: "https://api.nanobananaapi.ai/api/v1/nanobanana/generate-pro",
    authType: "apikey",
    authHeader: "bearer",
    format: "nanobanana", // custom format
    models: [
      { id: "nanobanana-flash", name: "NanoBanana Flash (Gemini 2.5 Flash)" },
      { id: "nanobanana-pro", name: "NanoBanana Pro (Gemini 3 Pro)" },
    ],
    supportedSizes: ["1024x1024"],
  },

  sdwebui: {
    id: "sdwebui",
    baseUrl: "http://localhost:7860/sdapi/v1/txt2img",
    authType: "none",
    authHeader: "none",
    format: "sdwebui",
    models: [
      { id: "stable-diffusion-v1-5", name: "Stable Diffusion v1.5" },
      { id: "sdxl-base-1.0", name: "SDXL Base 1.0" },
    ],
    supportedSizes: ["512x512", "768x768", "1024x1024"],
  },

  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    format: "comfyui",
    models: [
      { id: "flux-dev", name: "FLUX Dev" },
      { id: "sdxl", name: "SDXL" },
    ],
    supportedSizes: ["512x512", "768x768", "1024x1024"],
  },
};

/**
 * Get image provider config by ID
 */
export function getImageProvider(providerId) {
  return IMAGE_PROVIDERS[providerId] || null;
}

/**
 * Parse image model string (format: "provider/model")
 * Returns { provider, model }
 */
export function parseImageModel(modelStr) {
  if (!modelStr) return { provider: null, model: null };

  // Try each provider prefix
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  // No provider prefix — try to find the model in any provider
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all image models as a flat list
 */
export function getAllImageModels() {
  const models = [];
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        supportedSizes: config.supportedSizes,
      });
    }
  }
  return models;
}
