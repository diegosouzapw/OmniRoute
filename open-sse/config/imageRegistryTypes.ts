export interface ImageModelEntry {
  id: string;
  /** Public catalog id when the callable upstream id would collide with another model surface. */
  catalogId?: string;
  name: string;
  inputModalities?: string[];
  // See STABILITY_AI_IMAGE_MODELS for why this exists: some models accept "text"
  // but mechanically require an image regardless.
  imageRequired?: boolean;
  description?: string;
  isMarket?: boolean;
  kieFluxKontextModel?: "flux-kontext-pro" | "flux-kontext-max";
  supportedSizes?: string[];
  mediaCapabilities?: Record<string, unknown>;
}

export interface ImageProviderConfig {
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
  routingAliases?: readonly string[];
  supportedSizes: string[];
}
