/**
 * Image Generation Provider Registry
 *
 * Defines providers that support the /v1/images/generations endpoint.
 * Each provider has its own request format and endpoint.
 */

interface ImageModelEntry {
  id: string;
  name: string;
  inputModalities?: string[];
  description?: string;
}

interface ImageProviderConfig {
  id: string;
  baseUrl: string;
  fallbackUrl?: string;
  proUrl?: string;
  statusUrl?: string;
  alias?: string;
  authType: string;
  authHeader: string;
  format: string;
  models: ImageModelEntry[];
  supportedSizes: string[];
}

interface ImageModelAliasEntry {
  provider: string;
  model: string;
  name: string;
  listInCatalog: boolean;
  inputModalities?: string[];
  description?: string;
}

const IMAGE_MODEL_ALIASES: Record<string, ImageModelAliasEntry> = {
  "flux-kontext": {
    provider: "pollinations",
    model: "flux-kontext",
    name: "FLUX Kontext",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-kontext-max": {
    provider: "together",
    model: "black-forest-labs/FLUX.1.1-pro",
    name: "FLUX Kontext Max",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-redux": {
    provider: "together",
    model: "black-forest-labs/FLUX.1-redux",
    name: "FLUX Redux",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-depth": {
    provider: "together",
    model: "black-forest-labs/FLUX.1-depth",
    name: "FLUX Depth",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-canny": {
    provider: "together",
    model: "black-forest-labs/FLUX.1-canny",
    name: "FLUX Canny",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-dev-lora": {
    provider: "together",
    model: "black-forest-labs/FLUX.1-dev-lora",
    name: "FLUX Dev LoRA",
    listInCatalog: true,
  },
  kontext: {
    provider: "pollinations",
    model: "flux-kontext",
    name: "FLUX Kontext",
    listInCatalog: false,
  },
  "pollinations/kontext": {
    provider: "pollinations",
    model: "flux-kontext",
    name: "FLUX Kontext",
    listInCatalog: false,
  },
};

function resolveImageModelAlias(modelStr) {
  const alias = IMAGE_MODEL_ALIASES[modelStr];
  return alias ? { provider: alias.provider, model: alias.model } : null;
}

function findImageModelConfig(providerId, modelId) {
  const provider = IMAGE_PROVIDERS[providerId];
  if (!provider) return null;
  return provider.models.find((model) => model.id === modelId) || null;
}

export const IMAGE_PROVIDERS: Record<string, ImageProviderConfig> = {
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

  // Codex exposes image generation only as a Responses-API hosted tool under
  // ChatGPT OAuth. Incoming DALL-E-style `/v1/images/generations` requests are
  // translated to /responses calls with `tools: [{ type: "image_generation" }]`
  // by handleCodexImageGeneration.
  codex: {
    id: "codex",
    alias: "cx",
    baseUrl: "https://chatgpt.com/backend-api/codex/responses",
    authType: "oauth",
    authHeader: "bearer",
    format: "codex-responses",
    models: [
      { id: "gpt-5.4", name: "GPT 5.4 (Codex Image)" },
      { id: "gpt-5.3-codex", name: "GPT 5.3 Codex (Image)" },
      { id: "gpt-5.1-codex-max", name: "GPT 5.1 Codex Max (Image)" },
    ],
    supportedSizes: ["512x512", "1024x1024", "1024x1536", "1536x1024"],
  },

  "chatgpt-web": {
    id: "chatgpt-web",
    alias: "cgpt-web",
    baseUrl: "https://chatgpt.com/backend-api/f/conversation",
    authType: "apikey",
    authHeader: "cookie",
    format: "chatgpt-web",
    models: [{ id: "gpt-5.3-instant", name: "GPT-5.3 Instant (ChatGPT Web Image)" }],
    supportedSizes: ["1024x1024", "1024x1536", "1536x1024"],
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
      {
        id: "black-forest-labs/FLUX.1.1-pro",
        name: "FLUX 1.1 Pro",
        inputModalities: ["text", "image"],
        description: "Advanced contextual image editing and image-to-image generation",
      },
      { id: "black-forest-labs/FLUX.1-schnell-Free", name: "FLUX 1 Schnell (Free)" },
      { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "SDXL Base 1.0" },
      {
        id: "black-forest-labs/FLUX.1-redux",
        name: "FLUX.1 Redux",
        inputModalities: ["text", "image"],
        description: "Generate prompt-guided variations from an input image",
      },
      {
        id: "black-forest-labs/FLUX.1-depth",
        name: "FLUX.1 Depth",
        inputModalities: ["text", "image"],
        description: "Depth-conditioned image generation from an input image",
      },
      {
        id: "black-forest-labs/FLUX.1-canny",
        name: "FLUX.1 Canny",
        inputModalities: ["text", "image"],
        description: "Canny edge guided image generation from an input image",
      },
      { id: "black-forest-labs/FLUX.1-dev-lora", name: "FLUX.1 Dev LoRA" },
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
    models: [],
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
    statusUrl: "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info",
    authType: "apikey",
    authHeader: "bearer",
    format: "nanobanana", // custom format (async: submit task, then poll)
    models: [
      { id: "nanobanana-flash", name: "NanoBanana Flash (Gemini 2.5 Flash)" },
      { id: "nanobanana-pro", name: "NanoBanana Pro (Gemini 3 Pro)" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1024x1536", "1536x1024", "1280x1024"],
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

  openrouter: {
    id: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "openai/dall-e-3", name: "DALL-E 3 (via OpenRouter)" },
      { id: "openai/gpt-image-1", name: "GPT Image 1 (via OpenRouter)" },
      { id: "google/imagen-3.0-generate-002", name: "Imagen 3 (via OpenRouter)" },
      { id: "black-forest-labs/FLUX.1-schnell", name: "FLUX.1 Schnell (via OpenRouter)" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024", "256x256", "512x512"],
  },

  pollinations: {
    id: "pollinations",
    alias: "pol",
    baseUrl: "https://gen.pollinations.ai/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "flux", name: "Flux Schnell" },
      { id: "zimage", name: "Z-Image Turbo" },
      { id: "klein", name: "FLUX.2 Klein 4B" },
      { id: "gptimage", name: "GPT Image 1 Mini" },
      { id: "qwen-image", name: "Qwen Image Plus" },
      { id: "wan-image", name: "Wan 2.7 Image" },
      {
        id: "flux-kontext",
        name: "FLUX.1 Kontext",
        inputModalities: ["text", "image"],
        description: "Context-aware image editing with optional source image",
      },
      {
        id: "flux-kontext-max",
        name: "FLUX.1 Kontext Max",
        inputModalities: ["text", "image"],
        description: "Higher quality Kontext editing with optional source image",
      },
      { id: "gptimage-large", name: "GPT Image 1.5" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  "fal-ai": {
    id: "fal-ai",
    baseUrl: "https://fal.run",
    authType: "apikey",
    authHeader: "key",
    format: "fal-ai",
    models: [
      { id: "fal-ai/flux-pro/v1.1", name: "FLUX.1 Pro v1.1" },
      { id: "fal-ai/flux-pro/v1.1-ultra", name: "FLUX.1 Pro v1.1 Ultra" },
      { id: "fal-ai/flux/schnell", name: "FLUX.1 Schnell" },
      { id: "bria/text-to-image/3.2", name: "Bria 3.2" },
      { id: "fal-ai/bytedance/seedream/v3/text-to-image", name: "SeeDream V3" },
      { id: "fal-ai/bytedance/dreamina/v3.1/text-to-image", name: "Dreamina V3.1" },
      { id: "fal-ai/ideogram/v3", name: "Ideogram V3" },
      { id: "fal-ai/imagen4/preview", name: "Imagen 4 Preview" },
      { id: "fal-ai/imagen4/preview/fast", name: "Imagen 4 Preview Fast" },
      { id: "fal-ai/imagen4/preview/ultra", name: "Imagen 4 Preview Ultra" },
      { id: "fal-ai/recraft/v3/text-to-image", name: "Recraft V3 via Fal" },
      { id: "fal-ai/stable-diffusion-v35-medium", name: "Stable Diffusion v3.5 Medium" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  "stability-ai": {
    id: "stability-ai",
    baseUrl: "https://api.stability.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "stability-ai",
    models: [
      { id: "sd3", name: "sd3" },
      { id: "sd3-large", name: "sd3-large" },
      { id: "sd3-large-turbo", name: "sd3-large-turbo" },
      { id: "sd3-medium", name: "sd3-medium" },
      { id: "sd3.5-large", name: "sd3.5-large" },
      { id: "sd3.5-large-turbo", name: "sd3.5-large-turbo" },
      { id: "sd3.5-medium", name: "sd3.5-medium" },
      { id: "stable-image-ultra", name: "Stable Image Ultra" },
      { id: "stable-image-core", name: "Stable Image Core" },
      { id: "inpaint", name: "Inpaint", inputModalities: ["text", "image"] },
      { id: "outpaint", name: "Outpaint", inputModalities: ["text", "image"] },
      { id: "erase", name: "Erase", inputModalities: ["image"] },
      { id: "search-and-replace", name: "Search and Replace", inputModalities: ["text", "image"] },
      { id: "search-and-recolor", name: "Search and Recolor", inputModalities: ["text", "image"] },
      { id: "remove-background", name: "Remove Background", inputModalities: ["image"] },
      {
        id: "replace-background-and-relight",
        name: "Replace Background and Relight",
        inputModalities: ["text", "image"],
      },
      { id: "fast", name: "Fast Upscale", inputModalities: ["image"] },
      { id: "conservative", name: "Conservative Upscale", inputModalities: ["image"] },
      { id: "creative", name: "Creative Upscale", inputModalities: ["text", "image"] },
      { id: "sketch", name: "Sketch Control", inputModalities: ["text", "image"] },
      { id: "structure", name: "Structure Control", inputModalities: ["text", "image"] },
      { id: "style", name: "Style Control", inputModalities: ["text", "image"] },
      { id: "style-transfer", name: "Style Transfer", inputModalities: ["text", "image"] },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  "black-forest-labs": {
    id: "black-forest-labs",
    baseUrl: "https://api.bfl.ai",
    authType: "apikey",
    authHeader: "x-key",
    format: "black-forest-labs",
    models: [
      { id: "flux-kontext-pro", name: "flux-kontext-pro", inputModalities: ["text", "image"] },
      { id: "flux-kontext-max", name: "flux-kontext-max", inputModalities: ["text", "image"] },
      { id: "flux-pro-1.0-fill", name: "flux-pro-1.0-fill", inputModalities: ["text", "image"] },
      {
        id: "flux-pro-1.0-expand",
        name: "flux-pro-1.0-expand",
        inputModalities: ["text", "image"],
      },
      { id: "flux-pro-1.1", name: "flux-pro-1.1" },
      { id: "flux-pro-1.1-ultra", name: "flux-pro-1.1-ultra" },
      { id: "flux-dev", name: "flux-dev" },
      { id: "flux-pro", name: "flux-pro" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  recraft: {
    id: "recraft",
    baseUrl: "https://external.api.recraft.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "recraft",
    models: [
      { id: "recraftv2", name: "recraftv2" },
      { id: "recraftv3", name: "recraftv3" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  topaz: {
    id: "topaz",
    baseUrl: "https://api.topazlabs.com",
    authType: "apikey",
    authHeader: "x-api-key",
    format: "topaz",
    models: [{ id: "topaz-enhance", name: "topaz-enhance", inputModalities: ["image"] }],
    supportedSizes: ["1024x1024"],
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

  const directAlias = resolveImageModelAlias(modelStr);
  if (directAlias) {
    return directAlias;
  }

  // Try each provider prefix
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      const model = modelStr.slice(providerId.length + 1);
      const aliased =
        resolveImageModelAlias(`${providerId}/${model}`) || resolveImageModelAlias(model);
      return aliased || { provider: providerId, model };
    }
    // Check alias if available
    if (config.alias && modelStr.startsWith(config.alias + "/")) {
      const model = modelStr.slice(config.alias.length + 1);
      const aliased =
        resolveImageModelAlias(`${providerId}/${model}`) || resolveImageModelAlias(model);
      return aliased || { provider: providerId, model };
    }
  }

  // No provider prefix — try to find the model in every provider
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
        inputModalities: model.inputModalities || ["text"],
        description: model.description || undefined,
      });
    }
  }
  for (const [alias, target] of Object.entries(IMAGE_MODEL_ALIASES)) {
    if (!target.listInCatalog) continue;
    const providerConfig = IMAGE_PROVIDERS[target.provider];
    const modelConfig = findImageModelConfig(target.provider, target.model);
    models.push({
      id: alias,
      name: target.name || modelConfig?.name || alias,
      provider: target.provider,
      supportedSizes: providerConfig?.supportedSizes || [],
      inputModalities: target.inputModalities || modelConfig?.inputModalities || ["text"],
      description: target.description || modelConfig?.description || undefined,
    });
  }
  return models;
}

export function getImageModelAliases() {
  return IMAGE_MODEL_ALIASES;
}

export function getImageModelEntry(modelStr) {
  if (!modelStr) return null;

  const alias = IMAGE_MODEL_ALIASES[modelStr];
  if (alias) {
    const modelConfig = findImageModelConfig(alias.provider, alias.model);
    return {
      provider: alias.provider,
      model: alias.model,
      inputModalities: alias.inputModalities || modelConfig?.inputModalities || ["text"],
      description: alias.description || modelConfig?.description || undefined,
    };
  }

  const { provider, model } = parseImageModel(modelStr);
  if (!provider || !model) return null;

  const modelConfig = findImageModelConfig(provider, model);
  if (!modelConfig) return null;

  return {
    provider,
    model,
    inputModalities: modelConfig.inputModalities || ["text"],
    description: modelConfig.description || undefined,
  };
}
