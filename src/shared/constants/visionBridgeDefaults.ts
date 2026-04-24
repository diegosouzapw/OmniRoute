/**
 * Vision Bridge default configuration values.
 */

const NORMALIZED_GPT_MODEL_PATTERN = /^gpt-/i;

export function isVisionBridgeForcedModel(model: string | null | undefined): boolean {
  if (!model) return false;
  const normalizedModel = model.includes("/") ? model.split("/").pop() || model : model;
  return NORMALIZED_GPT_MODEL_PATTERN.test(normalizedModel);
}

export const VISION_BRIDGE_DEFAULTS = {
  enabled: true,
  model: "openai/gpt-4o-mini",
  prompt:
    "Describe this image concisely in 2-3 sentences. Focus on the most relevant visual details.",
  timeoutMs: 30000,
  maxImagesPerRequest: 10,
} as const;

/**
 * Settings keys for Vision Bridge (to be stored in key_value table).
 */
export const VISION_BRIDGE_SETTINGS_KEYS = [
  "visionBridgeEnabled",
  "visionBridgeModel",
  "visionBridgePrompt",
  "visionBridgeTimeout",
  "visionBridgeMaxImages",
] as const;

export type VisionBridgeSettings = {
  visionBridgeEnabled?: boolean;
  visionBridgeModel?: string;
  visionBridgePrompt?: string;
  visionBridgeTimeout?: number;
  visionBridgeMaxImages?: number;
};

export type VisionBridgeConfig = {
  enabled: boolean;
  model: string;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
};

/**
 * Merge settings with defaults to produce a complete config.
 */
export function getVisionBridgeConfig(
  settings: VisionBridgeSettings | undefined | null = {}
): VisionBridgeConfig {
  const s = settings ?? {};
  return {
    enabled: s.visionBridgeEnabled ?? VISION_BRIDGE_DEFAULTS.enabled,
    model: s.visionBridgeModel ?? VISION_BRIDGE_DEFAULTS.model,
    prompt: s.visionBridgePrompt ?? VISION_BRIDGE_DEFAULTS.prompt,
    timeoutMs: s.visionBridgeTimeout ?? VISION_BRIDGE_DEFAULTS.timeoutMs,
    maxImages: s.visionBridgeMaxImages ?? VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
  };
}
