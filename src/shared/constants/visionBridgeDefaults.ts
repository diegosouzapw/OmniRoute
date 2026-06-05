/**
 * Vision Bridge default configuration values.
 */

const FORCED_VISION_BRIDGE_MODELS = new Set<string>([
  // opencode-go/opencode-zen providers: synced capabilities overstate vision support
  // (modalities_input includes "image" from provider catalog), but the actual backend
  // models used by these providers do not have native vision. Force Vision Bridge to
  // convert images to text descriptions for these models.
  "opencode-go/deepseek-v4-flash",
  "opencode-go/deepseek-v4-pro",
  "opencode-go/kimi-k2.6",
  "opencode-go/kimi-k2.5",
  "opencode-go/glm-5.1",
  "opencode-go/glm-5",
  "opencode-go/qwen3.6-plus",
  "opencode-go/qwen3.5-plus",
  "opencode-zen/deepseek-v4-flash",
  "opencode-zen/deepseek-v4-pro",
]);

export function isVisionBridgeForcedModel(model: string | null | undefined): boolean {
  if (!model) return false;
  const lowerModel = model.trim().toLowerCase();
  if (FORCED_VISION_BRIDGE_MODELS.has(lowerModel)) return true;
  // Also check just the model name (after /) for backward compatibility
  const normalizedModel = lowerModel.includes("/")
    ? lowerModel.split("/").pop() || lowerModel
    : lowerModel;
  return FORCED_VISION_BRIDGE_MODELS.has(normalizedModel);
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
