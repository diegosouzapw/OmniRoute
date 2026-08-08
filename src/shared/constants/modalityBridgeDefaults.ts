/**
 * Modality Bridge default configuration values (PR-1).
 *
 * New `modalityBridge*` settings keys supersede the legacy `visionBridge*`
 * keys; the legacy keys stay accepted as a fallback for one release cycle
 * (rollback window) and are resolved here in a single place.
 */
import { VISION_BRIDGE_DEFAULTS } from "./visionBridgeDefaults";

export type VisionBridgeMode = "auto" | "describe" | "reroute";

export const MODALITY_BRIDGE_DEFAULTS = {
  visionMode: "auto" as VisionBridgeMode,
  visionTaskAware: true,
  cacheEnabled: true,
  cacheTtlMinutes: 60,
  cacheMaxEntries: 200,
  audioEnabled: true,
  audioModel: "",
  audioTimeoutMs: 60000,
  audioMaxClips: 3,
} as const;

export interface VisionBridgeRuntimeSettings {
  enabled: boolean;
  mode: VisionBridgeMode;
  model: string;
  taskAware: boolean;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
  cacheEnabled: boolean;
  cacheTtlMinutes: number;
  cacheMaxEntries: number;
}

// Typed candidate pickers: a stored value of the wrong type (e.g. the string
// "off" in a boolean field) is skipped so the next candidate/default wins.
function pickBoolean(...values: unknown[]): boolean | undefined {
  for (const v of values) if (typeof v === "boolean") return v;
  return undefined;
}

function pickNumber(...values: unknown[]): number | undefined {
  for (const v of values) if (typeof v === "number" && Number.isFinite(v)) return v;
  return undefined;
}

function pickString(...values: unknown[]): string | undefined {
  for (const v of values) if (typeof v === "string") return v;
  return undefined;
}

/** New modalityBridge* keys win; legacy visionBridge* keys are a one-cycle fallback. */
export function resolveVisionBridgeRuntimeSettings(
  settings: Record<string, unknown> | null | undefined
): VisionBridgeRuntimeSettings {
  const s = settings ?? {};
  const mode = pickString(s.modalityBridgeVisionMode);
  return {
    enabled:
      pickBoolean(s.modalityBridgeVisionEnabled, s.visionBridgeEnabled) ??
      VISION_BRIDGE_DEFAULTS.enabled,
    mode: mode === "describe" || mode === "reroute" ? mode : MODALITY_BRIDGE_DEFAULTS.visionMode,
    model:
      pickString(s.modalityBridgeVisionModel, s.visionBridgeModel) ?? VISION_BRIDGE_DEFAULTS.model,
    taskAware:
      pickBoolean(s.modalityBridgeVisionTaskAware) ?? MODALITY_BRIDGE_DEFAULTS.visionTaskAware,
    prompt:
      pickString(s.modalityBridgeVisionPrompt, s.visionBridgePrompt) ??
      VISION_BRIDGE_DEFAULTS.prompt,
    timeoutMs:
      pickNumber(s.modalityBridgeVisionTimeout, s.visionBridgeTimeout) ??
      VISION_BRIDGE_DEFAULTS.timeoutMs,
    maxImages:
      pickNumber(s.modalityBridgeVisionMaxImages, s.visionBridgeMaxImages) ??
      VISION_BRIDGE_DEFAULTS.maxImagesPerRequest,
    cacheEnabled:
      pickBoolean(s.modalityBridgeCacheEnabled) ?? MODALITY_BRIDGE_DEFAULTS.cacheEnabled,
    cacheTtlMinutes:
      pickNumber(s.modalityBridgeCacheTtlMinutes) ?? MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes,
    cacheMaxEntries:
      pickNumber(s.modalityBridgeCacheMaxEntries) ?? MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries,
  };
}
