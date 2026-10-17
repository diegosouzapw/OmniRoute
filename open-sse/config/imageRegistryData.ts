/** Client-safe image aliases and subscription configuration; no feature-flag or database imports. */
export type { ImageModelEntry, ImageProviderConfig } from "./imageRegistryTypes.ts";
export { IMAGE_PROVIDERS } from "./imageProviderCatalog.ts";

export interface ImageModelAliasEntry {
  provider: string;
  model: string;
  name: string;
  listInCatalog: boolean;
  inputModalities?: string[];
  imageRequired?: boolean;
  description?: string;
  mediaCapabilities?: Record<string, unknown>;
}

export interface ImageCatalogModelEntry {
  id: string;
  name: string;
  provider: string;
  supportedSizes: string[];
  inputModalities: string[];
  description?: string;
  mediaCapabilities?: Record<string, unknown>;
}

export {
  XAI_IMAGE_CONFIG,
  XAI_API_KEY_IMAGE_PROVIDER,
  XAI_SUBSCRIPTION_IMAGE_PROVIDERS,
} from "./providers/registry/xai/imageModels.ts";

export const IMAGE_MODEL_ALIASES: Record<string, ImageModelAliasEntry> = {
  "gemini-3-pro-image-preview": {
    provider: "antigravity",
    model: "gemini-3-pro-image",
    name: "Gemini 3 Pro Image",
    listInCatalog: false,
  },
  "gemini-3.1-flash-image-preview": {
    provider: "antigravity",
    model: "gemini-3.1-flash-image",
    name: "Gemini 3.1 Flash Image",
    listInCatalog: false,
  },
  "flux-kontext": {
    provider: "black-forest-labs",
    model: "flux-kontext-pro",
    name: "FLUX Kontext Pro",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-kontext-max": {
    provider: "black-forest-labs",
    model: "flux-kontext-max",
    name: "FLUX Kontext Max",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-2-max": {
    provider: "black-forest-labs",
    model: "flux-2-max",
    name: "FLUX.2 Max",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-2-pro": {
    provider: "black-forest-labs",
    model: "flux-2-pro",
    name: "FLUX.2 Pro",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-2-flex": {
    provider: "black-forest-labs",
    model: "flux-2-flex",
    name: "FLUX.2 Flex",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  "flux-2-dev": {
    provider: "together",
    model: "black-forest-labs/FLUX.2-dev",
    name: "FLUX.2 Dev",
    listInCatalog: true,
    inputModalities: ["text", "image"],
  },
  kontext: {
    provider: "black-forest-labs",
    model: "flux-kontext-pro",
    name: "FLUX Kontext Pro",
    listInCatalog: false,
    inputModalities: ["text", "image"],
  },
  "pollinations/kontext": {
    provider: "black-forest-labs",
    model: "flux-kontext-pro",
    name: "FLUX Kontext Pro",
    listInCatalog: false,
    inputModalities: ["text", "image"],
  },
};
