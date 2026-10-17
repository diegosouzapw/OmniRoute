import type { ImageProviderConfig } from "../../../imageRegistryTypes.ts";

export const QWEN_TOKEN_PLAN_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "qwen-cloud-token-plan",
  alias: "qct",
  baseUrl:
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
  authType: "apikey",
  authHeader: "bearer",
  format: "qwen-token-plan-image",
  models: [
    {
      id: "wan2.7-image",
      name: "Wan 2.7 Image",
      inputModalities: ["text", "image"],
    },
    {
      id: "wan2.7-image-pro",
      name: "Wan 2.7 Image Pro",
      inputModalities: ["text", "image"],
    },
  ],
  // Both models share 1K/2K support. The Pro model also accepts explicit 4K
  // dimensions, which callers can still pass through the permissive request schema.
  supportedSizes: ["1024x1024", "2048x2048"],
};

export const BAILIAN_CODING_PLAN_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "bailian-coding-plan",
  alias: "bcp",
  baseUrl:
    "https://coding-intl.dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
  authType: "apikey",
  authHeader: "bearer",
  format: "bailian-coding-plan-image",
  models: [
    {
      id: "wan2.7-image",
      name: "Wan 2.7 Image",
      inputModalities: ["text", "image"],
    },
    {
      id: "wan2.7-image-pro",
      name: "Wan 2.7 Image Pro",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0",
      name: "Qwen Image 2.0",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0-pro",
      name: "Qwen Image 2.0 Pro",
      inputModalities: ["text", "image"],
    },
  ],
  supportedSizes: ["1024x1024", "2048x2048"],
};

export const ALIBABA_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "alibaba",
  alias: "ali",
  baseUrl:
    "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
  authType: "apikey",
  authHeader: "bearer",
  format: "alibaba-image",
  models: [
    {
      id: "qwen-image-3.0-pro",
      name: "Qwen Image 3.0 Pro",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0-pro-2026-06-22",
      name: "Qwen Image 2.0 Pro (2026-06-22)",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0",
      name: "Qwen Image 2.0",
      inputModalities: ["text", "image"],
    },
    { id: "z-image-turbo", name: "Z-Image Turbo" },
    { id: "wan2.6-t2i", name: "Wan 2.6 T2I" },
  ],
  supportedSizes: ["1024x1024", "1280x1280", "2048x2048"],
};

export const QWEN_CLOUD_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "qwen-cloud",
  alias: "qwc",
  baseUrl:
    "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
  authType: "apikey",
  authHeader: "bearer",
  format: "qwen-cloud-image",
  models: [
    {
      id: "wan2.7-image-pro",
      name: "Wan 2.7 Image Pro",
      inputModalities: ["text", "image"],
    },
    {
      id: "wan2.7-image",
      name: "Wan 2.7 Image",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-3.0-pro",
      name: "Qwen Image 3.0 Pro",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0-pro-2026-06-22",
      name: "Qwen Image 2.0 Pro (2026-06-22)",
      inputModalities: ["text", "image"],
    },
    {
      id: "qwen-image-2.0-2026-03-03",
      name: "Qwen Image 2.0 (2026-03-03)",
      inputModalities: ["text", "image"],
    },
    { id: "z-image-turbo", name: "Z-Image Turbo" },
  ],
  // 1K/2K are shared by the whole catalog. Wan 2.7 Image Pro callers can
  // still pass supported 4K dimensions through the permissive request schema.
  supportedSizes: ["1024x1024", "2048x2048"],
};
