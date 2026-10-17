import {
  QWEN_TOKEN_PLAN_IMAGE_PROVIDER,
  BAILIAN_CODING_PLAN_IMAGE_PROVIDER,
  ALIBABA_IMAGE_PROVIDER,
  QWEN_CLOUD_IMAGE_PROVIDER,
} from "./providers/registry/dashscope/imageModels.ts";
import { LMARENA_DIRECT_IMAGE_MODELS } from "./providers/registry/lmarena/directModels.ts";
import { SEGMIND_IMAGE_PROVIDER } from "./providers/registry/segmind/imageModels.ts";
import { KIE_IMAGE_MODELS } from "./providers/registry/kie/imageModels.ts";
import { MAGNIFIC_IMAGE_PROVIDER } from "./providers/registry/magnific/index.ts";
import { STABILITY_AI_IMAGE_MODELS } from "./providers/registry/stability-ai/imageModels.ts";
import { CHEAPERINFERENCE_IMAGE_PROVIDER } from "./providers/registry/cheaperinference/imageModels.ts";
import {
  ADOBE_FIREFLY_IMAGE_ROUTING_ALIASES,
  toRegistryImageModels,
} from "../services/adobeFireflyModels.ts";
import { AI_HORDE_IMAGE_PROVIDER } from "./providers/registry/aihorde/imageModels.ts";
import { toRegistryImageModels as toSyntxImageModels } from "../services/syntxMediaCatalog.ts";
import { ZENMUX_IMAGE_PROVIDER } from "./providers/registry/zenmux/imageModels.ts";
import { MUSE_CODE_IMAGE_PROVIDER } from "./providers/registry/muse-code/imageModels.ts";

import type { ImageProviderConfig } from "./imageRegistryTypes.ts";
import { CODEX_IMAGE_PROVIDER } from "./providers/registry/codex/imageModels.ts";
import { ANTIGRAVITY_IMAGE_PROVIDER } from "./providers/registry/antigravity/imageModels.ts";
import { XAI_API_KEY_IMAGE_PROVIDER } from "./providers/registry/xai/imageModels.ts";

export const IMAGE_PROVIDERS: Record<string, ImageProviderConfig> = {
  zenmux: ZENMUX_IMAGE_PROVIDER,
  "muse-code": MUSE_CODE_IMAGE_PROVIDER,
  agnes: {
    id: "agnes",
    baseUrl: "https://apihub.agnes-ai.com/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "agnes-image",
    models: [
      {
        id: "agnes-image-2.0-flash",
        name: "Agnes Image 2.0 Flash",
        inputModalities: ["text", "image"],
        description: "Agnes text-to-image, image-to-image, and multi-image composition model",
      },
      {
        id: "agnes-image-2.1-flash",
        name: "Agnes Image 2.1 Flash",
        inputModalities: ["text", "image"],
        description: "Agnes text-to-image, image-to-image, and multi-image composition model",
      },
      {
        id: "agnes-image-2.5-flash",
        name: "Agnes Image 2.5 Flash",
        inputModalities: ["text", "image"],
        description: "Agnes text-to-image, image-to-image, and multi-image composition model",
      },
    ],
    supportedSizes: ["1K", "2K", "3K", "4K"],
  },

  "qwen-cloud-token-plan": QWEN_TOKEN_PLAN_IMAGE_PROVIDER,

  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai", // native OpenAI format
    models: [
      { id: "dall-e-3", name: "DALL·E 3" },
      { id: "gpt-image-2", name: "GPT Image 2" },
      { id: "gpt-image-1.5", name: "GPT Image 1.5" },
      { id: "gpt-image-1-mini", name: "GPT Image 1 Mini" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
  },

  codex: CODEX_IMAGE_PROVIDER,

  // Cursor plan image generation via the Agent CLI native `generateImage` tool.
  // Reuses the same OAuth/API-key connection as chat (`provider: "cursor"`).
  // Requires the `agent` binary (CURSOR_AGENT_BIN) — see cursorAgentImage handler.
  cursor: {
    id: "cursor",
    alias: "cu",
    // Sentinel: execution is local Agent CLI, not an HTTP image API.
    baseUrl: "agent://cursor-agent",
    authType: "oauth",
    authHeader: "bearer",
    format: "cursor-agent-image",
    models: [
      { id: "auto", name: "Cursor Auto (Image)" },
      { id: "composer-2", name: "Composer 2 (Image)" },
      { id: "composer-2.5", name: "Composer 2.5 (Image)" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024", "1024x1536", "1536x1024"],
  },

  maxai: {
    id: "maxai",
    alias: "mx",
    baseUrl: "https://api.maxai.me/gpt/get_image_generate_response",
    authType: "apikey",
    authHeader: "bearer",
    format: "maxai-image",
    models: [
      { id: "gpt-image-1", name: "GPT Image 1 (MaxAI)" },
      { id: "dall-e-3", name: "DALL-E 3 (MaxAI)" },
      { id: "flux-1-schnell", name: "FLUX.1 [schnell] (MaxAI)" },
      { id: "flux-1-dev", name: "FLUX.1 [dev] (MaxAI)" },
      { id: "flux-1-pro", name: "FLUX.1 [pro] (MaxAI)" },
      { id: "sd3-medium", name: "Stable Diffusion 3 Medium (MaxAI)" },
    ],
    // gpt-image-1/dall-e-3 are size-snapped to 1024x1024 by the handler; flux
    // models pass any size through.
    supportedSizes: ["1024x1024", "1024x1536", "1536x1024", "1024x1792", "1792x1024"],
  },

  xai: XAI_API_KEY_IMAGE_PROVIDER,

  "vercel-ai-gateway": {
    id: "vercel-ai-gateway",
    alias: "vag",
    baseUrl: "https://ai-gateway.vercel.sh/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "gpt-image-1", name: "GPT Image 1" },
      { id: "black-forest-labs/flux-1.1-pro", name: "FLUX 1.1 Pro" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      {
        id: "black-forest-labs/FLUX.2-max",
        name: "FLUX.2 Max",
        inputModalities: ["text", "image"],
      },
      {
        id: "black-forest-labs/FLUX.2-pro",
        name: "FLUX.2 Pro",
        inputModalities: ["text", "image"],
      },
      {
        id: "black-forest-labs/FLUX.2-flex",
        name: "FLUX.2 Flex",
        inputModalities: ["text", "image"],
      },
      {
        id: "black-forest-labs/FLUX.2-dev",
        name: "FLUX.2 Dev",
        inputModalities: ["text", "image"],
      },
      { id: "openai/gpt-image-1.5", name: "GPT Image 1.5", inputModalities: ["text", "image"] },
      { id: "Wan-AI/Wan2.6-image", name: "Wan 2.6 Image", inputModalities: ["text", "image"] },
      {
        id: "Qwen/Qwen-Image-2.0-Pro",
        name: "Qwen Image 2.0 Pro",
        inputModalities: ["text", "image"],
      },
      { id: "Qwen/Qwen-Image-2.0", name: "Qwen Image 2.0", inputModalities: ["text", "image"] },
      { id: "google/flash-image-3.1", name: "NanoBanana 2", inputModalities: ["text", "image"] },
      {
        id: "google/gemini-3-pro-image",
        name: "NanoBanana Pro",
        inputModalities: ["text", "image"],
      },
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
      { id: "accounts/fireworks/flux-kontext-max", name: "FLUX Kontext Max" },
      { id: "accounts/fireworks/flux-kontext-pro", name: "FLUX Kontext Pro" },
      { id: "accounts/fireworks/flux-1-schnell-fp8", name: "FLUX.1 schnell" },
      { id: "accounts/fireworks/models/flux-1-dev-fp8", name: "FLUX 1 Dev FP8" },
      { id: "accounts/fireworks/models/stable-diffusion-xl-1024-v1-0", name: "SDXL 1024 v1.0" },
    ],
    supportedSizes: ["1024x1024", "512x512"],
  },

  antigravity: ANTIGRAVITY_IMAGE_PROVIDER,

  //Curruntly no models serving
  nebius: {
    id: "nebius",
    baseUrl: "https://api.tokenfactory.nebius.com/v1/images/generations",
    fallbackUrl: "https://api.studio.nebius.com/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [{ id: "black-forest-labs/flux-schnell", name: "No Model yet" }],
    supportedSizes: ["1024x1024"],
  },

  hyperbolic: {
    id: "hyperbolic",
    baseUrl: "https://api.hyperbolic.xyz/v1/image/generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "hyperbolic", // custom: uses model_name, returns base64 images
    models: [{ id: "SDXL1.0-base", name: "No Model yet" }],
    supportedSizes: ["1024x1024"],
  },
  //Curruntly no models serving

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

  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    statusUrl: "https://api.kie.ai/api/v1/jobs/recordInfo",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-image",
    models: KIE_IMAGE_MODELS,
    supportedSizes: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },

  haiper: {
    id: "haiper",
    baseUrl: "https://api.haiper.ai/v1/jobs/gen2/text2image",
    statusUrl: "https://api.haiper.ai/v1/jobs",
    authType: "apikey",
    authHeader: "HAIPER_KEY",
    format: "haiper-image",
    models: [{ id: "gen2", name: "Gen 2 Image" }],
    supportedSizes: ["16:9", "9:16", "1:1", "4:3", "3:4"],
  },
  // #2482: MiniMax already has entries in musicRegistry/audioRegistry/videoRegistry,
  // but was missing an image provider entirely, so MiniMax image-model requests
  // fell through the format dispatch below to a 400/unmatched-format response.
  minimax: {
    id: "minimax",
    baseUrl: "https://api.minimax.io/v1/image_generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "minimax-image",
    models: [
      { id: "image-01", name: "MiniMax Image-01" },
      { id: "image-01-live", name: "MiniMax Image-01 Live" },
    ],
    supportedSizes: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "1024x1024"],
  },
  leonardo: {
    id: "leonardo",
    baseUrl: "https://cloud.leonardo.ai/api/rest/v1/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "leonardo-image",
    models: [
      { id: "phoenix", name: "Phoenix" },
      { id: "sdxl", name: "SDXL" },
    ],
    supportedSizes: ["1024x1024", "1024x576", "576x1024"],
  },
  ideogram: {
    id: "ideogram",
    baseUrl: "https://api.ideogram.ai/generate",
    authType: "apikey",
    authHeader: "Api-Key",
    format: "ideogram-image",
    models: [
      { id: "V_3", name: "Ideogram V3" },
      { id: "V_2A", name: "Ideogram V2A" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
  },
  magnific: MAGNIFIC_IMAGE_PROVIDER,
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
      { id: "openai/gpt-5.4-image-2", name: "GPT Image 2 (via OpenRouter)" },
      { id: "openai/gpt-5-image-mini", name: "GPT Image 1 Mini (via OpenRouter)" },
      { id: "google/gemini-3.1-flash-image-preview", name: "Nano Banana 2 (via OpenRouter)" },
      { id: "google/gemini-3-pro-image-preview", name: "Nano Banana Pro (via OpenRouter)" },
      { id: "black-forest-labs/flux.2-max", name: "FLUX.2 Max (via OpenRouter)" },
      { id: "black-forest-labs/flux.2-pro", name: "FLUX.2 Pro (via OpenRouter)" },
      { id: "black-forest-labs/flux.2-flex", name: "FLUX.2 Flex (via OpenRouter)" },
      { id: "openai/gpt-image-2.5-sunburst", name: "GPT Image 2.5 Sunburst (via OpenRouter)" },
      { id: "openai/gpt-image-2.5-flare", name: "GPT Image 2.5 Flare (via OpenRouter)" },
      { id: "microsoft/mai-image-2.6", name: "MAI Image 2.6 (via OpenRouter)" },
      { id: "microsoft/mai-image-2.6-flash", name: "MAI Image 2.6 Flash (via OpenRouter)" },
    ],
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
  },

  pollinations: {
    id: "pollinations",
    alias: "pol",
    baseUrl: "https://gen.pollinations.ai/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "klein", name: "FLUX.2 Klein 4B" },
      { id: "flux", name: "Flux Schnell" },
      { id: "zimage", name: "Z-Image Turbo" },
      { id: "qwen-image", name: "Qwen Image Plus" },
      { id: "wan-image", name: "Wan 2.7 Image" },
      { id: "gpt-image-2", name: "GPT Image 2" },
      { id: "gptimage-large", name: "GPT Image 1.5" },
      { id: "gptimage", name: "GPT Image 1 Mini" },
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
      { id: "flux-2-max", name: "FLUX.2 Max" },
      { id: "flux-2-pro", name: "FLUX.2 Pro" },
      { id: "flux-2-flex", name: "FLUX.2 Flex" },
      { id: "bria/text-to-image/3.2", name: "Bria 3.2" },
      { id: "bytedance/seedream/v4.5/text-to-image", name: "SeeDream V4.5" },
      { id: "bytedance/dreamina/v3.1/text-to-image", name: "Dreamina V3.1" },
      { id: "ideogram/v3", name: "Ideogram V3" },
      // Prefix-only on purpose: adobe-firefly owns the bare nano-banana ids
      // (operator decision 2026-07-31, pinned by cheaperinference-image-models
      // guard). The dispatch path tolerates the fal-ai/ prefix (fal.ts).
      { id: "fal-ai/nano-banana-pro", name: "Nano Banana Pro" },
      { id: "fal-ai/nano-banana-2", name: "Nano Banana 2" },
      { id: "recraft/v4/pro/text-to-image", name: "Recraft V4 Pro via Fal" },
      { id: "recraft/v4/text-to-image", name: "Recraft V4 via Fal" },
      { id: "stable-diffusion-v35-medium", name: "Stable Diffusion v3.5 Medium" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  "stability-ai": {
    id: "stability-ai",
    baseUrl: "https://api.stability.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "stability-ai",
    models: STABILITY_AI_IMAGE_MODELS,
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  "black-forest-labs": {
    id: "black-forest-labs",
    baseUrl: "https://api.bfl.ai",
    authType: "apikey",
    authHeader: "x-key",
    format: "black-forest-labs",
    models: [
      { id: "flux-2-max", name: "FLUX.2 Max" },
      { id: "flux-2-pro", name: "FLUX.2 Pro" },
      { id: "flux-2-flex", name: "FLUX.2 Flex" },
      { id: "flux-pro-1.1-ultra", name: "flux-pro-1.1-ultra" },
      { id: "flux-pro-1.1", name: "flux-pro-1.1" },
      { id: "flux-2-klein-9b", name: "flux 2 Klein 9B" },
      { id: "flux-2-klein-4b", name: "flux 2 Klein 4B" },
      { id: "flux-kontext-max", name: "flux-kontext-max", inputModalities: ["text", "image"] },
      { id: "flux-kontext-pro", name: "flux-kontext-pro", inputModalities: ["text", "image"] },
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
      { id: "recraftv4_pro", name: "Recraft V4 Pro" },
      { id: "recraftv4", name: "Recraft V4" },
      { id: "recraftv3", name: "Recraft V3" },
      { id: "recraftv2", name: "Recraft V2" },
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

  // Segmind (#6656): 200+ models, `POST /v1/{model}`, x-api-key, raw image bytes.
  segmind: SEGMIND_IMAGE_PROVIDER,
  nanogpt: {
    id: "nanogpt",
    baseUrl: "https://nano-gpt.com/api/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "qwen-image", name: "Qwen Image", inputModalities: ["text", "image"] },
      { id: "z-image-turbo", name: "Z Image Turbo" },
      { id: "chroma", name: "Chroma" },
      { id: "hidream", name: "Hidream I1 Full" },
    ],
    supportedSizes: ["1024x1024", "1024x1280", "1280x1024"],
  },

  // NaN.Builders — OpenAI-compatible image generation.
  nan: {
    id: "nan",
    baseUrl: "https://api.nan.builders/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "flux-2-klein", name: "FLUX.2 Klein" },
      { id: "qwen-image-2.1", name: "Qwen Image 2.1" },
    ],
    supportedSizes: ["1024x1024"],
  },

  // NVIDIA NIM image generation (FLUX models). Distinct from the NVIDIA *chat* entry
  // (open-sse/config/providers/registry/nvidia/index.ts, host integrate.api.nvidia.com,
  // OpenAI-compatible) — image generation lives on ai.api.nvidia.com/v1/genai/<model>
  // with a native NIM body per model, so it gets a dedicated `nvidia-nim` format/handler
  // (handleNvidiaNimImageGeneration) rather than reusing the OpenAI image path.
  // Ported from upstream 9router#1195.
  nvidia: {
    id: "nvidia",
    baseUrl: "https://ai.api.nvidia.com/v1/genai",
    authType: "apikey",
    authHeader: "bearer",
    format: "nvidia-nim",
    models: [
      {
        id: "black-forest-labs/flux.1-dev",
        name: "FLUX.1 Dev",
        inputModalities: ["text", "image"],
      },
      { id: "black-forest-labs/flux.1-schnell", name: "FLUX.1 Schnell" },
      {
        id: "black-forest-labs/flux.1-kontext-dev",
        name: "FLUX.1 Kontext Dev (Edit)",
        inputModalities: ["text", "image"],
      },
      {
        id: "black-forest-labs/flux.2-klein-4b",
        name: "FLUX.2 Klein 4B",
        inputModalities: ["text", "image"],
      },
    ],
    supportedSizes: ["1024x1024", "768x1344", "512x512"],
  },

  // SenseNova (商汤日日新) Text-to-Image on the free Token Plan. OpenAI-compatible
  // `/v1/images/generations`, so the generic OpenAI image handler routes it — same
  // SenseNova api-key/connection as the chat provider. (9router#2233)
  sensenova: {
    id: "sensenova",
    baseUrl: "https://api.sensenova.cn/v1/images/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [{ id: "sensenova-u1-fast", name: "SenseNova U1 Fast" }],
    supportedSizes: ["1024x1024"],
  },

  // HuggingFace Hub Inference API text-to-image task. Returns raw image bytes
  // (not JSON), so it uses a dedicated "huggingface-image" format handled by
  // handleHuggingFaceImageGeneration. Same base URL convention as the HF
  // STT/TTS entries in audioRegistry.ts. Model list is deliberately small —
  // the dashboard's "suggested models" chip row (GET
  // /api/v1/providers/suggested-models) surfaces additional HF Hub models
  // beyond this seed list.
  huggingface: {
    id: "huggingface",
    // HF retired api-inference.huggingface.co; text-to-image now routes through
    // router.huggingface.co with the hf-inference provider pinned in the path.
    baseUrl: "https://router.huggingface.co/hf-inference/models",
    authType: "apikey",
    authHeader: "bearer",
    format: "huggingface-image",
    models: [
      { id: "black-forest-labs/FLUX.1-dev", name: "FLUX.1 Dev (HF)" },
      { id: "black-forest-labs/FLUX.1-schnell", name: "FLUX.1 Schnell (HF)" },
      { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "Stable Diffusion XL (HF)" },
    ],
    supportedSizes: ["1024x1024"],
  },

  // Arena (formerly LMArena) Direct-chat Image category (static scrape 2026-07-09).
  // Not listed in the chat registry — image catalog only. Generation path still
  // uses cookie session auth via the lmarena provider connection (stable wire id).
  lmarena: {
    id: "lmarena",
    alias: "lma",
    baseUrl: "https://arena.ai/nextjs-api/stream/create-evaluation",
    authType: "apikey",
    authHeader: "cookie",
    format: "openai",
    models: LMARENA_DIRECT_IMAGE_MODELS,
    supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
  },

  // Adobe Firefly (unofficial) — IMS access_token (clio-playground-web) or browser
  // Cookie from firefly.adobe.com. Async 3P image generate + poll.
  // Model list = static fallback from models/discovery capture; live discovery
  // refreshes via resolveAdobeFireflyCatalog when credentials work.
  "adobe-firefly": {
    id: "adobe-firefly",
    alias: "firefly",
    baseUrl: "https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async",
    authType: "apikey",
    authHeader: "bearer",
    format: "adobe-firefly-image",
    models: toRegistryImageModels(),
    routingAliases: ADOBE_FIREFLY_IMAGE_ROUTING_ALIASES,
    supportedSizes: [],
  },

  // Cheaper Inference (OSS-sponsor gateway). Declared AFTER adobe-firefly on
  // purpose: it shares the nano-banana-pro / nano-banana-2 ids, and parseImageModel
  // resolves a bare id by first-match over this object's iteration order, so
  // Firefly keeps the bare ids and these are prefix-only. See the module for the
  // full collision note.
  cheaperinference: CHEAPERINFERENCE_IMAGE_PROVIDER,

  // Keep Bailian Coding Plan after existing duplicate model owners so adding
  // explicit `bailian-coding-plan/` and `bcp/` routes does not change
  // historical bare-model routing.
  "bailian-coding-plan": BAILIAN_CODING_PLAN_IMAGE_PROVIDER,

  // Keep Alibaba after existing duplicate model owners so adding explicit
  // `alibaba/` and `ali/` routes does not change historical bare-model routing.
  alibaba: ALIBABA_IMAGE_PROVIDER,

  // Keep regular Qwen Cloud isolated from Alibaba, Bailian Coding Plan, and
  // Qwen Cloud Token Plan. Explicit `qwen-cloud/` or `qwc/` routes use only
  // the regular Qwen Cloud connection and its regional DashScope endpoint.
  "qwen-cloud": QWEN_CLOUD_IMAGE_PROVIDER,
  aihorde: AI_HORDE_IMAGE_PROVIDER,

  // Keep UC after every existing image provider because parseImageModel() resolves
  // bare duplicate ids by first match. Explicit `uc/` routes remain available while
  // historical owners retain bare ids such as nano-banana and z-image-turbo.
  uc: {
    id: "uc",
    baseUrl: "https://internal.chatuncensored.ai/v2/image-gen",
    authType: "apikey",
    authHeader: "bearer",
    format: "uc-image",
    models: [
      { id: "model-dev", name: "Flux Dev (UC)" },
      { id: "model-pro", name: "Flux Pro (UC)" },
      { id: "model-1.1", name: "Flux Pro 1.1 (UC)" },
      { id: "model-1.2", name: "Wan 2.2 (UC)" },
      { id: "seedream-v4.5", name: "Seedream v4.5 (UC)" },
      { id: "seedream-v5", name: "Seedream v5 (UC)" },
      { id: "flux-2", name: "FLUX.2 (UC)" },
      { id: "flux-2-pro", name: "FLUX.2 Pro (UC)" },
      { id: "lustify-v7", name: "Lustify v7 (UC)" },
      { id: "nano-banana", name: "Nano Banana (UC)" },
      { id: "nano-banana-2", name: "Nano Banana 2 (UC)" },
      { id: "nano-banana-pro", name: "Nano Banana Pro (UC)" },
      { id: "nano-banana-ultra", name: "Nano Banana Ultra (UC)" },
      { id: "gpt-image", name: "GPT Image (UC)" },
      { id: "gpt-image-2", name: "GPT Image 2 (UC)" },
      { id: "realism", name: "Realism (UC)" },
      { id: "realism-2", name: "Realism 2 (UC)" },
      { id: "z-image-turbo", name: "Z-Image Turbo (UC)" },
      { id: "prefect-pony-xl", name: "Prefect Pony XL (UC)" },
      { id: "wan-2.6", name: "Wan 2.6 (UC)" },
      { id: "wan-2.7-text-to-image", name: "Wan 2.7 Text-to-Image (UC)" },
      { id: "wan-2.7-text-to-image-pro", name: "Wan 2.7 Text-to-Image Pro (UC)" },
    ],
    // Persona web derives imageWidth/imageHeight from an aspect ratio; uc-direct
    // passes any OpenAI-style size through. These are the aspect buckets.
    supportedSizes: ["1024x1024", "1024x576", "576x1024", "1024x768", "768x1024"],
  },
  syntx: {
    id: "syntx",
    alias: "stx",
    baseUrl: "https://api.syntx.ai/api/v1/design/generate",
    authType: "apikey",
    authHeader: "bearer",
    format: "syntx-image",
    models: toSyntxImageModels(),
    supportedSizes: [],
  },

  // Cloudflare Workers AI image generation (FLUX.1 Schnell). Reuses the same
  // Account ID + API Token connection as the existing `cloudflare-ai` chat
  // provider (apikey/enterprise-cloud.ts, open-sse/executors/cloudflare-ai.ts).
  // Not OpenAI-compatible (dynamic per-account URL, base64-in-JSON response),
  // so it gets its own `cloudflare-ai-image` format/handler
  // (handleCloudflareAiImageGeneration) rather than the generic OpenAI path.
  "cloudflare-ai": {
    id: "cloudflare-ai",
    alias: "cf",
    // Documentation only — the real URL is built per-account in the handler:
    // https://api.cloudflare.com/client/v4/accounts/<accountId>/ai/run/<model>
    baseUrl: "https://api.cloudflare.com/client/v4/accounts",
    authType: "apikey",
    authHeader: "bearer",
    format: "cloudflare-ai-image",
    models: [{ id: "@cf/black-forest-labs/flux-1-schnell", name: "FLUX.1 Schnell (Workers AI)" }],
    supportedSizes: ["1024x1024", "768x768", "512x512"],
  },
};
