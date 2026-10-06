/**
 * Modality Bridge default configuration values (PR-1).
 *
 * New `modalityBridge*` settings keys supersede the legacy `visionBridge*`
 * keys; the legacy keys stay accepted as a fallback for one release cycle
 * (rollback window) and are resolved here in a single place.
 */
import { VISION_BRIDGE_DEFAULTS } from "./visionBridgeDefaults";

export type VisionBridgeMode = "auto" | "describe" | "reroute";
export type VideoAnalysisMode = "full" | "focused";
export type VideoSamplingPolicy = "uniform" | "scene_aware" | "segment_aware";

export const VIDEO_BRIDGE_TIMEOUT_MIN_MS = 1_000;
export const VIDEO_BRIDGE_TIMEOUT_MAX_MS = 120_000;

export const MODALITY_BRIDGE_DEFAULTS = {
  visionMode: "auto" as VisionBridgeMode,
  visionTaskAware: true,
  cacheEnabled: true,
  cacheTtlMinutes: 60,
  cacheMaxEntries: 200,
  // 0 = no cap (existing behavior, description is passed through in full).
  visionMaxChars: 0,
  audioEnabled: true,
  audioModel: "",
  audioTimeoutMs: 60000,
  audioMaxClips: 3,
  videoEnabled: false,
  videoModel: "",
  videoAnalysisMode: "full" as VideoAnalysisMode,
  videoFrameCount: 8,
  videoSamplingPolicy: "uniform" as VideoSamplingPolicy,
  videoMaxVideos: 1,
  videoTimeoutMs: 120000,
  // Server-orchestrated Audio Bridge STT over Video Bridge audio extraction
  // (FU-06, #11654) spends provider credit on the operator's behalf, so it
  // stays OFF by default — Hard Rule #20's "never spend by default" spirit.
  // Every transcription attempt additionally requires a per-request opt-in;
  // this flag alone never triggers a call.
  videoAudioTranscriptionEnabled: false,
} as const;

export interface VisionBridgeRuntimeSettings {
  enabled: boolean;
  mode: VisionBridgeMode;
  model: string;
  taskAware: boolean;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
  maxChars: number;
  cacheEnabled: boolean;
  cacheTtlMinutes: number;
  cacheMaxEntries: number;
}

export interface AudioBridgeRuntimeSettings {
  enabled: boolean;
  model: string;
  timeoutMs: number;
  maxClips: number;
  cacheEnabled: boolean;
  cacheTtlMinutes: number;
  cacheMaxEntries: number;
}

export interface VideoAudioTranscriptionRuntimeSettings {
  /** Operator opt-in only — a request still needs its own opt-in (FU-06, #11654). */
  enabled: boolean;
}

export interface VideoBridgeRuntimeSettings {
  enabled: boolean;
  model: string;
  analysisMode: VideoAnalysisMode;
  frameCount: number;
  samplingPolicy: VideoSamplingPolicy;
  maxVideos: number;
  timeoutMs: number;
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
    maxChars: pickNumber(s.modalityBridgeVisionMaxChars) ?? MODALITY_BRIDGE_DEFAULTS.visionMaxChars,
    cacheEnabled:
      pickBoolean(s.modalityBridgeCacheEnabled) ?? MODALITY_BRIDGE_DEFAULTS.cacheEnabled,
    cacheTtlMinutes:
      pickNumber(s.modalityBridgeCacheTtlMinutes) ?? MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes,
    cacheMaxEntries:
      pickNumber(s.modalityBridgeCacheMaxEntries) ?? MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries,
  };
}

/** Resolve persisted Audio Bridge settings with the shared PR-1 defaults. */
export function resolveAudioBridgeRuntimeSettings(
  settings: Record<string, unknown> | null | undefined
): AudioBridgeRuntimeSettings {
  const s = settings ?? {};
  return {
    enabled: pickBoolean(s.modalityBridgeAudioEnabled) ?? MODALITY_BRIDGE_DEFAULTS.audioEnabled,
    model: pickString(s.modalityBridgeAudioModel) ?? MODALITY_BRIDGE_DEFAULTS.audioModel,
    timeoutMs: pickNumber(s.modalityBridgeAudioTimeout) ?? MODALITY_BRIDGE_DEFAULTS.audioTimeoutMs,
    maxClips: pickNumber(s.modalityBridgeAudioMaxClips) ?? MODALITY_BRIDGE_DEFAULTS.audioMaxClips,
    cacheEnabled:
      pickBoolean(s.modalityBridgeCacheEnabled) ?? MODALITY_BRIDGE_DEFAULTS.cacheEnabled,
    cacheTtlMinutes:
      pickNumber(s.modalityBridgeCacheTtlMinutes) ?? MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes,
    cacheMaxEntries:
      pickNumber(s.modalityBridgeCacheMaxEntries) ?? MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries,
  };
}

/**
 * Resolve the operator half of the FU-06 dual opt-in for Video Bridge audio
 * transcription. The request-side opt-in is a separate, per-request signal —
 * this settings flag alone never authorizes a transcription call.
 */
export function resolveVideoAudioTranscriptionRuntimeSettings(
  settings: Record<string, unknown> | null | undefined
): VideoAudioTranscriptionRuntimeSettings {
  const s = settings ?? {};
  return {
    enabled:
      pickBoolean(s.modalityBridgeVideoAudioTranscriptionEnabled) ??
      MODALITY_BRIDGE_DEFAULTS.videoAudioTranscriptionEnabled,
  };
}

/** Resolve persisted Video Bridge settings with safe, bounded defaults. */
export function resolveVideoBridgeRuntimeSettings(
  settings: Record<string, unknown> | null | undefined
): VideoBridgeRuntimeSettings {
  const s = settings ?? {};
  const analysisMode = pickString(s.modalityBridgeVideoAnalysisMode);
  return {
    enabled: pickBoolean(s.modalityBridgeVideoEnabled) ?? MODALITY_BRIDGE_DEFAULTS.videoEnabled,
    model: pickString(s.modalityBridgeVideoModel) ?? MODALITY_BRIDGE_DEFAULTS.videoModel,
    analysisMode:
      analysisMode === "focused" ? analysisMode : MODALITY_BRIDGE_DEFAULTS.videoAnalysisMode,
    frameCount:
      pickNumber(s.modalityBridgeVideoFrameCount) ?? MODALITY_BRIDGE_DEFAULTS.videoFrameCount,
    samplingPolicy:
      pickString(s.modalityBridgeVideoSamplingPolicy) === "scene_aware" ||
      pickString(s.modalityBridgeVideoSamplingPolicy) === "segment_aware"
        ? (pickString(s.modalityBridgeVideoSamplingPolicy) as VideoSamplingPolicy)
        : MODALITY_BRIDGE_DEFAULTS.videoSamplingPolicy,
    maxVideos:
      pickNumber(s.modalityBridgeVideoMaxVideos) ?? MODALITY_BRIDGE_DEFAULTS.videoMaxVideos,
    timeoutMs: Math.min(
      VIDEO_BRIDGE_TIMEOUT_MAX_MS,
      Math.max(
        VIDEO_BRIDGE_TIMEOUT_MIN_MS,
        pickNumber(s.modalityBridgeVideoTimeout) ?? MODALITY_BRIDGE_DEFAULTS.videoTimeoutMs
      )
    ),
    cacheEnabled:
      pickBoolean(s.modalityBridgeCacheEnabled) ?? MODALITY_BRIDGE_DEFAULTS.cacheEnabled,
    cacheTtlMinutes:
      pickNumber(s.modalityBridgeCacheTtlMinutes) ?? MODALITY_BRIDGE_DEFAULTS.cacheTtlMinutes,
    cacheMaxEntries:
      pickNumber(s.modalityBridgeCacheMaxEntries) ?? MODALITY_BRIDGE_DEFAULTS.cacheMaxEntries,
  };
}
