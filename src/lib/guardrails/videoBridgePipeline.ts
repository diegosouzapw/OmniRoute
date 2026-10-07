// Video Bridge pipeline seam (#11657): the per-video acquisition, sampling,
// dedup, transcript fusion, result-cache, and metrics/abort/cleanup logic that
// used to live inline inside `VideoBridgeGuardrail.preCall` (videoBridge.ts).
//
// `preCall` stays responsible for request traversal, policy (capability
// checks, analysis-mode resolution), aggregation across parts, and building
// the response payload/metadata. Everything about processing ONE video part —
// including its own AbortController/timeout lifecycle — lives here behind
// `processVideoPart`, so preCall's loop body is just "call it, fold the
// result into the running totals."
//
// Explicit ports (durable boundaries the ticket asks for):
//  - `VideoMediaBrokerPort`  — acquiring video bytes and extracting sampled
//    frames (the `/api/modality-bridge/video/extract` broker boundary; see
//    videoBridgeBrokerClient.ts and videoBridgeHelpers.ts::loadVideoPartBytes).
//  - `VideoAudioTranscriptionPort` — the seam that fuses a caller-declared
//    `audioTranscript` with the sampled visual frame captions
//    (videoBridgeHelpers.ts::describeVideoPart already does the fusion
//    internally; this port names that boundary explicitly and is where a
//    real audio-transcription backend would be substituted).
//  - `VideoDrilldownPort` — the frame-zoom persistence boundary
//    (videoBridgeDrilldown.ts::VideoDrilldownCache.put). NOT wired into
//    `processVideoPart` yet: today only the separate
//    `/api/modality-bridge/video/drilldown` route writes drill-down entries.
//    The type lives here so a future extraction step can seed drill-down
//    candidates from a processed part without re-deriving the port shape.
import { createHash } from "node:crypto";

import { fetch as undiciFetch } from "undici";

import type {
  VideoAnalysisMode,
  VisionBridgeRuntimeSettings,
  VideoBridgeRuntimeSettings,
} from "@/shared/constants/modalityBridgeDefaults";

import type { GuardrailContext } from "./base";
import {
  bridgeCacheKey,
  getSharedBridgeCacheFor,
  type BridgeCacheEntry,
  type BridgeCacheStore,
} from "./modalityBridge/bridgeCache";
import { recordBridgeUse } from "./modalityBridge/bridgeStats";
import {
  composeVideoFramePrompt,
  describeVideoPart as defaultDescribeVideoPart,
  loadVideoPartBytes,
  resolveVideoDedupCandidateFrameCount,
  VIDEO_BRIDGE_MAX_BYTES,
  VIDEO_DEDUP_MAX_CANDIDATE_FRAMES,
  VIDEO_DEDUP_POLICY_VERSION,
  VIDEO_DEDUP_THRESHOLD,
  type DescribeVideoDependencies,
  type DescribedVideo,
  type VideoFusionTelemetry,
  type VideoPart,
} from "./videoBridgeHelpers";
import type { VideoSamplingPolicy } from "./videoBridgeRuntime";
import type { VideoDrilldownCache } from "./videoBridgeDrilldown";
import {
  runVideoDownloadSingleflight,
  runVideoResultSingleflight,
  safeDeleteCacheEntry,
  safeGetCacheEntry,
  safeSetCacheEntry,
  videoBridgeAbortError,
} from "./videoBridgeResultCache";
import { callVisionModel as defaultCallVisionModel, type VisionModelConfig } from "./visionBridgeHelpers";

export interface VideoAnalysisContext {
  /** Effective prompt behavior after the no-text fallback. */
  analysisMode: VideoAnalysisMode;
  /** Canonical, bounded user text. This remains untrusted context. */
  focusHint?: string;
  /** SHA-256 of the canonical hint; raw task text is never stored in cache metadata. */
  focusHintFingerprint: string | null;
  requestedAnalysisMode: VideoAnalysisMode;
}

/** Acquisition boundary: turning a request-declared video reference into
 * sampled frames. Backed today by `loadVideoPartBytes` (byte acquisition) and
 * the `/api/modality-bridge/video/extract` broker (`extractFrames`). */
export interface VideoMediaBrokerPort {
  extractFrames?: DescribeVideoDependencies["extractFrames"];
  fetchRemote?: DescribeVideoDependencies["fetchRemote"];
  loadVideoPartBytes: typeof loadVideoPartBytes;
}

/** Boundary for fusing a caller-declared audio transcript with sampled visual
 * frame captions. Backed today by `describeVideoPart`, which fuses
 * `part.audioTranscript` internally (videoBridgeHelpers.ts). */
export interface VideoAudioTranscriptionPort {
  describePart: typeof defaultDescribeVideoPart;
}

/** Frame drill-down persistence boundary (videoBridgeDrilldown.ts). Not yet
 * wired into `processVideoPart` — see the module header note above. */
export interface VideoDrilldownPort {
  put: VideoDrilldownCache["put"];
}

function combineModelIdentities(models: ReadonlySet<string>, fallback: string): string {
  if (models.size === 0) return fallback;
  if (models.size === 1) return models.values().next().value ?? fallback;
  return "mixed";
}

function safeTranscriptFingerprint(value: unknown): string {
  if (value === undefined) return "";
  try {
    return JSON.stringify(value) ?? "";
  } catch {
    return "invalid-transcript";
  }
}

function waitForVideoBridgePromise<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(videoBridgeAbortError());
  return new Promise<T>((resolve, reject) => {
    let completed = false;
    const finish = (callback: () => void): void => {
      if (completed) return;
      completed = true;
      signal.removeEventListener("abort", onAbort);
      callback();
    };
    const onAbort = (): void => finish(() => reject(videoBridgeAbortError()));
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
    promise.then(
      (value) => finish(() => resolve(value)),
      (error: unknown) => finish(() => reject(error))
    );
  });
}

// v5 (#11652): the normalized transcript contract changed (provenance trust
// boundary, budgets, cross-source reconciliation, focus scoping) — bump so a
// cache entry computed under the old, less-restrictive normalization can
// never be served for a request processed under the new contract.
// v6 (#12150): VideoResultCacheMetadata gained `descriptionRedacted` (the
// structured transcript-redaction shadow) — bump so a cache entry written
// before this field existed can never be served with `descriptionRedacted`
// silently undefined, which would read as "no transcript" / mark
// `videoBridgeObserved: false` for a video that does carry one.
const VIDEO_BRIDGE_RESULT_CACHE_VERSION = "v6";
const VIDEO_BRIDGE_RESULT_CACHE_POLICY = "sampling-then-dedup-v2";
const VIDEO_BRIDGE_RESULT_CACHE_KEY_KIND = "video-result-v4";
const VIDEO_BRIDGE_DOWNLOAD_FLIGHT_VERSION = "v1";

function buildVideoDownloadFlightKey(
  part: VideoPart,
  context: GuardrailContext,
  maxBytes: number,
  timeoutMs: number
): string {
  const rawPrincipalId = context.apiKeyInfo?.id;
  const principalId =
    typeof rawPrincipalId === "string" || typeof rawPrincipalId === "number"
      ? String(rawPrincipalId)
      : "local";
  const canonicalIdentity = JSON.stringify({
    container: part.container,
    endpoint: context.endpoint ?? null,
    maxBytes,
    method: context.method ?? null,
    model: context.model ?? null,
    provider: context.provider ?? null,
    ref: part.ref,
    shape: part.shape,
    sourceFormat: context.sourceFormat ?? null,
    targetFormat: context.targetFormat ?? null,
    timeoutMs,
    version: VIDEO_BRIDGE_DOWNLOAD_FLIGHT_VERSION,
  });
  const requestFingerprint = createHash("sha256").update(canonicalIdentity).digest("hex");
  // The authenticated database id is an ephemeral in-memory scope, not a
  // password or persisted credential. Keep it out of cryptographic hashes so
  // password-hash analysis cannot conflate tenant partitioning with storage.
  return `video-download:${JSON.stringify([principalId, requestFingerprint])}`;
}

interface VideoResultCacheMetadata {
  analysisMode: VideoAnalysisMode;
  cacheVersion: string;
  policyVersion: string;
  extractorVersion: string;
  strategy: string;
  model: string;
  prompt: string;
  frameCount: number;
  maxVideos: number;
  dedupCandidateFrameCount: number;
  dedupPolicyVersion: string;
  dedupThreshold: number;
  durationSeconds: number;
  framesRequested: number;
  framesExtracted: number;
  framesUsed: number;
  dedupDropped?: number;
  focusStartSeconds?: number;
  focusEndSeconds?: number;
  focusHintFingerprint: string | null;
  samplingCandidateCount?: number;
  samplingPolicyEffective?: VideoSamplingPolicy;
  samplingPolicyRequested?: VideoSamplingPolicy;
  transcriptCuesApplied?: number;
  contactSheetUsed?: boolean;
  fusion?: VideoFusionTelemetry;
  /** Log-safe redacted shadow of the cached description (see `DescribedVideo.descriptionRedacted`). */
  descriptionRedacted?: string;
  cacheBytes: number;
  modelUsed: string;
}

type VideoResultCacheIdentity = Pick<
  VideoResultCacheMetadata,
  | "analysisMode"
  | "cacheVersion"
  | "dedupCandidateFrameCount"
  | "dedupPolicyVersion"
  | "dedupThreshold"
  | "extractorVersion"
  | "frameCount"
  | "focusHintFingerprint"
  | "maxVideos"
  | "model"
  | "policyVersion"
  | "prompt"
  | "strategy"
>;

const VIDEO_RESULT_CACHE_IDENTITY_KEYS: readonly (keyof VideoResultCacheIdentity)[] = [
  "analysisMode",
  "cacheVersion",
  "dedupCandidateFrameCount",
  "dedupPolicyVersion",
  "dedupThreshold",
  "extractorVersion",
  "frameCount",
  "focusHintFingerprint",
  "maxVideos",
  "model",
  "policyVersion",
  "prompt",
  "strategy",
];

function createVideoResultCacheIdentity(
  runtime: VideoBridgeRuntimeSettings,
  visionRuntime: VisionBridgeRuntimeSettings,
  model: string,
  analysis: VideoAnalysisContext
): VideoResultCacheIdentity {
  return {
    analysisMode: analysis.analysisMode,
    cacheVersion: VIDEO_BRIDGE_RESULT_CACHE_VERSION,
    dedupCandidateFrameCount: resolveVideoDedupCandidateFrameCount(runtime.frameCount),
    dedupPolicyVersion: VIDEO_DEDUP_POLICY_VERSION,
    dedupThreshold: VIDEO_DEDUP_THRESHOLD,
    extractorVersion: VIDEO_BRIDGE_RESULT_CACHE_VERSION,
    frameCount: runtime.frameCount,
    focusHintFingerprint: analysis.focusHintFingerprint,
    maxVideos: runtime.maxVideos,
    model,
    policyVersion: VIDEO_BRIDGE_RESULT_CACHE_POLICY,
    prompt: visionRuntime.prompt,
    strategy: runtime.samplingPolicy,
  };
}

function buildVideoResultCacheKey(
  contentFingerprint: string,
  identity: VideoResultCacheIdentity,
  part: VideoPart
): string {
  return bridgeCacheKey(contentFingerprint, identity.prompt, identity.model, {
    analysisMode: identity.analysisMode,
    kind: VIDEO_BRIDGE_RESULT_CACHE_KEY_KIND,
    dedupCandidateFrameCount: identity.dedupCandidateFrameCount,
    dedupPolicyVersion: identity.dedupPolicyVersion,
    dedupThreshold: identity.dedupThreshold,
    extractorVersion: identity.extractorVersion,
    policyVersion: identity.policyVersion,
    strategy: identity.strategy,
    frameCount: identity.frameCount,
    maxVideos: identity.maxVideos,
    focusEndSeconds: part.focusWindow?.endSeconds ?? null,
    focusHintFingerprint: identity.focusHintFingerprint,
    focusStartSeconds: part.focusWindow?.startSeconds ?? null,
    transcript: safeTranscriptFingerprint(part.transcript),
    audioTranscript: safeTranscriptFingerprint(part.audioTranscript),
    contactSheet: part.contactSheet ?? false,
    version: identity.cacheVersion,
  });
}

function matchesVideoResultCacheIdentity(
  metadata: VideoResultCacheMetadata,
  identity: VideoResultCacheIdentity
): boolean {
  return VIDEO_RESULT_CACHE_IDENTITY_KEYS.every((key) => metadata[key] === identity[key]);
}

function isFusionTelemetry(value: unknown): value is VideoFusionTelemetry {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (
    typeof record.audioAvailable !== "boolean" ||
    typeof record.videoAvailable !== "boolean" ||
    typeof record.partial !== "boolean"
  ) {
    return false;
  }
  if (record.failures === undefined) return true;
  if (!record.failures || typeof record.failures !== "object") return false;
  return Object.entries(record.failures as Record<string, unknown>).every(
    ([source, code]) =>
      (source === "audio" || source === "video") &&
      (code === "ABORTED" || code === "FAILED" || code === "INVALID")
  );
}

function isFiniteNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isFiniteNonNegativeInteger(value: unknown): value is number {
  return isFiniteNonNegativeNumber(value) && Number.isInteger(value);
}

function isVideoResultCacheMetadata(
  value: unknown,
  expectedCacheBytes: number
): value is VideoResultCacheMetadata {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (
    !isFiniteNonNegativeInteger(record.framesRequested) ||
    !isFiniteNonNegativeInteger(record.framesExtracted) ||
    !isFiniteNonNegativeInteger(record.framesUsed) ||
    !isFiniteNonNegativeInteger(record.dedupCandidateFrameCount) ||
    record.dedupCandidateFrameCount < 1 ||
    record.dedupCandidateFrameCount > VIDEO_DEDUP_MAX_CANDIDATE_FRAMES ||
    record.framesExtracted > record.dedupCandidateFrameCount ||
    record.framesUsed > record.framesRequested ||
    record.framesUsed > record.framesExtracted
  ) {
    return false;
  }
  const dedupDropped = record.dedupDropped ?? 0;
  if (
    !isFiniteNonNegativeInteger(dedupDropped) ||
    record.framesUsed + dedupDropped > record.framesExtracted
  ) {
    return false;
  }
  if (
    (record.focusStartSeconds !== undefined &&
      !isFiniteNonNegativeNumber(record.focusStartSeconds)) ||
    (record.focusEndSeconds !== undefined && !isFiniteNonNegativeNumber(record.focusEndSeconds)) ||
    (typeof record.focusStartSeconds === "number" &&
      typeof record.focusEndSeconds === "number" &&
      record.focusStartSeconds > record.focusEndSeconds)
  ) {
    return false;
  }
  return (
    (record.analysisMode === "full" || record.analysisMode === "focused") &&
    ((record.analysisMode === "full" && record.focusHintFingerprint === null) ||
      (record.analysisMode === "focused" &&
        typeof record.focusHintFingerprint === "string" &&
        /^[a-f0-9]{64}$/.test(record.focusHintFingerprint))) &&
    typeof record.cacheVersion === "string" &&
    typeof record.dedupPolicyVersion === "string" &&
    typeof record.dedupThreshold === "number" &&
    Number.isFinite(record.dedupThreshold) &&
    record.dedupThreshold >= 0 &&
    record.dedupThreshold <= 1 &&
    typeof record.policyVersion === "string" &&
    typeof record.extractorVersion === "string" &&
    typeof record.strategy === "string" &&
    typeof record.model === "string" &&
    typeof record.prompt === "string" &&
    isFiniteNonNegativeInteger(record.frameCount) &&
    isFiniteNonNegativeInteger(record.maxVideos) &&
    isFiniteNonNegativeNumber(record.durationSeconds) &&
    isFiniteNonNegativeInteger(record.cacheBytes) &&
    record.cacheBytes === expectedCacheBytes &&
    typeof record.modelUsed === "string" &&
    (record.samplingCandidateCount === undefined ||
      isFiniteNonNegativeInteger(record.samplingCandidateCount)) &&
    (record.samplingPolicyEffective === undefined ||
      record.samplingPolicyEffective === "uniform" ||
      record.samplingPolicyEffective === "scene_aware" ||
      record.samplingPolicyEffective === "segment_aware") &&
    (record.samplingPolicyRequested === undefined ||
      record.samplingPolicyRequested === "uniform" ||
      record.samplingPolicyRequested === "scene_aware" ||
      record.samplingPolicyRequested === "segment_aware") &&
    (record.transcriptCuesApplied === undefined ||
      isFiniteNonNegativeInteger(record.transcriptCuesApplied)) &&
    (record.contactSheetUsed === undefined || typeof record.contactSheetUsed === "boolean") &&
    (record.fusion === undefined || isFusionTelemetry(record.fusion)) &&
    (record.descriptionRedacted === undefined || typeof record.descriptionRedacted === "string")
  );
}

function isVideoResultCacheEntry(
  entry: BridgeCacheEntry
): entry is BridgeCacheEntry & { metadata: VideoResultCacheMetadata; value: string } {
  if (typeof entry.value !== "string") return false;
  return (
    (entry.producerModel === undefined || typeof entry.producerModel === "string") &&
    isVideoResultCacheMetadata(entry.metadata, Buffer.byteLength(entry.value, "utf8"))
  );
}

interface DescribeWithVisionModelDeps {
  broker: VideoMediaBrokerPort;
  transcription: VideoAudioTranscriptionPort;
  callVisionModel?: (
    imageDataUri: string,
    config: VisionModelConfig,
    apiKey?: string
  ) => Promise<string>;
}

async function describeWithVisionModel(
  part: VideoPart,
  runtime: VideoBridgeRuntimeSettings,
  visionRuntime: VisionBridgeRuntimeSettings,
  selectedModel: string | null,
  analysis: VideoAnalysisContext,
  signal: AbortSignal | undefined,
  preloadedBytes: Uint8Array | undefined,
  deps: DescribeWithVisionModelDeps
): Promise<DescribedVideo> {
  if (!selectedModel) {
    throw new Error("No vision-capable provider connected for Video Bridge");
  }
  const cache = runtime.cacheEnabled ? getSharedBridgeCacheFor(runtime) : null;
  const callVisionModel = deps.callVisionModel ?? defaultCallVisionModel;
  let cacheHits = 0;
  const successfulModels = new Set<string>();
  const described = await deps.transcription.describePart(
    part,
    {
      analysisMode: analysis.analysisMode,
      frameCount: runtime.frameCount,
      samplingPolicy: runtime.samplingPolicy,
      focusWindow: part.focusWindow,
      signal,
      timeoutMs: runtime.timeoutMs,
    },
    async (frameDataUri, timestampSeconds, signal) => {
      const prompt = composeVideoFramePrompt(visionRuntime.prompt, timestampSeconds, analysis.focusHint);
      const key = cache
        ? bridgeCacheKey(frameDataUri, `${prompt}@${timestampSeconds.toFixed(3)}`, selectedModel)
        : null;
      const cached = key && cache ? cache.getEntry(key) : undefined;
      if (cached) {
        cacheHits += 1;
        successfulModels.add(cached.producerModel ?? selectedModel);
        return cached.value;
      }
      let producerModel = selectedModel;
      const caption = await callVisionModel(frameDataUri, {
        maxImages: 1,
        model: selectedModel,
        onModelUsed: (model) => {
          producerModel = model;
        },
        prompt,
        routeThroughOmniRoute: true,
        signal,
        timeoutMs: runtime.timeoutMs,
        fetchImpl: undiciFetch as unknown as typeof fetch,
      });
      successfulModels.add(producerModel);
      if (key && cache) cache.setEntry(key, { value: caption, producerModel });
      return caption;
    },
    {
      extractFrames: deps.broker.extractFrames,
      fetchRemote: deps.broker.fetchRemote,
    },
    preloadedBytes
  );
  return {
    ...described,
    cacheHits,
    modelUsed: combineModelIdentities(successfulModels, selectedModel),
  };
}

export interface ProcessVideoPartDeps {
  broker: VideoMediaBrokerPort;
  transcription: VideoAudioTranscriptionPort;
  cache: BridgeCacheStore | null;
  selectVideoModel: () => Promise<string | null>;
  /** Mirrors `VideoBridgeDependencies.describePart` — bypasses the internal
   * vision-model path entirely when supplied (test/override seam). */
  overrideDescribePart?: (part: VideoPart, analysis: VideoAnalysisContext) => Promise<DescribedVideo>;
  callVisionModel?: (
    imageDataUri: string,
    config: VisionModelConfig,
    apiKey?: string
  ) => Promise<string>;
}

export interface ProcessVideoPartParams {
  analysis: VideoAnalysisContext;
  context: GuardrailContext;
  deps: ProcessVideoPartDeps;
  part: VideoPart;
  partIndex: number;
  runtime: VideoBridgeRuntimeSettings;
  visionRuntime: VisionBridgeRuntimeSettings;
}

export type ProcessVideoPartResult =
  | { status: "aborted" }
  | { status: "failed"; error: unknown }
  | {
      status: "processed";
      contactSheetUsed: boolean;
      dedupDropped: number;
      description: string;
      /** Log-safe redacted shadow (see `DescribedVideo.descriptionRedacted`); undefined when no transcript cue was rendered. */
      descriptionRedacted?: string;
      durationSeconds: number;
      framesExtracted: number;
      framesRequested: number;
      framesUsed: number;
      frameCacheHits: number;
      fusion?: VideoFusionTelemetry;
      hasFocusWindow: boolean;
      producerModels: string[];
      samplingCandidateCount: number;
      samplingPolicyEffective: VideoSamplingPolicy;
      transcriptCuesApplied: number;
    };

/**
 * Process exactly one video part: acquire bytes, consult/populate the
 * whole-result cache, describe (fusing any declared audio transcript) via
 * the vision model, and report per-attempt metrics. Owns its own
 * AbortController/timeout lifecycle and never throws for an ordinary
 * per-part failure — callers fold the returned outcome into their own
 * aggregation and decide the response-facing fallback text.
 */
export async function processVideoPart(
  params: ProcessVideoPartParams
): Promise<ProcessVideoPartResult> {
  const { analysis, context, deps, part, partIndex, runtime, visionRuntime } = params;
  if (context.signal?.aborted) return { status: "aborted" };

  const attemptStartedAt = Date.now();
  const timeoutController = new AbortController();
  const attemptTimeout = setTimeout(() => timeoutController.abort(), runtime.timeoutMs);
  const attemptSignal = context.signal
    ? AbortSignal.any([context.signal, timeoutController.signal])
    : timeoutController.signal;
  try {
    const selectedModel = await waitForVideoBridgePromise(deps.selectVideoModel(), attemptSignal);
    if (attemptSignal.aborted) throw videoBridgeAbortError();
    const shouldLoadVideoBytes =
      Boolean(selectedModel) &&
      (Boolean(deps.cache) || (part.ref.startsWith("https://") && !deps.overrideDescribePart));
    const videoBytes = shouldLoadVideoBytes
      ? part.ref.startsWith("https://")
        ? await runVideoDownloadSingleflight(
            buildVideoDownloadFlightKey(part, context, VIDEO_BRIDGE_MAX_BYTES, runtime.timeoutMs),
            attemptSignal,
            (downloadSignal) =>
              deps.broker.loadVideoPartBytes(part, VIDEO_BRIDGE_MAX_BYTES, runtime.timeoutMs, downloadSignal, {
                fetchRemote: deps.broker.fetchRemote,
              })
          )
        : await deps.broker.loadVideoPartBytes(part, VIDEO_BRIDGE_MAX_BYTES, runtime.timeoutMs, attemptSignal, {
            fetchRemote: deps.broker.fetchRemote,
          })
      : null;
    const contentFingerprint =
      deps.cache && videoBytes
        ? `sha256:${createHash("sha256").update(videoBytes).digest("hex")}`
        : part.ref;
    const resultCacheIdentity =
      deps.cache && selectedModel
        ? createVideoResultCacheIdentity(runtime, visionRuntime, selectedModel, analysis)
        : null;
    const resultCacheKey = resultCacheIdentity
      ? buildVideoResultCacheKey(contentFingerprint, resultCacheIdentity, part)
      : null;
    const cachedResult = resultCacheKey
      ? safeGetCacheEntry(deps.cache, resultCacheKey, context.log)
      : null;
    if (cachedResult && isVideoResultCacheEntry(cachedResult)) {
      const meta = cachedResult.metadata;
      const matchPolicy =
        resultCacheIdentity && matchesVideoResultCacheIdentity(meta, resultCacheIdentity);
      if (matchPolicy) {
        const elapsed = Date.now() - attemptStartedAt;
        const producerModels: string[] = [];
        if (cachedResult.producerModel) producerModels.push(cachedResult.producerModel);
        if (meta.modelUsed) producerModels.push(meta.modelUsed);
        recordBridgeUse("video", {
          fusionRun: Boolean(meta.fusion),
          fusionPartial: meta.fusion?.partial ?? false,
          latencyMs: elapsed,
          resultCacheHit: true,
          resultCacheBytes: meta.cacheBytes,
          resultCacheLatencyMs: elapsed,
        });
        return {
          status: "processed",
          contactSheetUsed: meta.contactSheetUsed ?? false,
          dedupDropped: meta.dedupDropped ?? 0,
          description: cachedResult.value,
          descriptionRedacted: meta.descriptionRedacted,
          durationSeconds: meta.durationSeconds,
          framesExtracted: meta.framesExtracted,
          framesRequested: meta.framesRequested,
          framesUsed: meta.framesUsed,
          frameCacheHits: 0,
          fusion: meta.fusion,
          hasFocusWindow:
            typeof meta.focusStartSeconds === "number" || typeof meta.focusEndSeconds === "number",
          producerModels,
          samplingCandidateCount: meta.samplingCandidateCount ?? 0,
          samplingPolicyEffective: meta.samplingPolicyEffective ?? "uniform",
          transcriptCuesApplied: meta.transcriptCuesApplied ?? 0,
        };
      }
      safeDeleteCacheEntry(deps.cache, resultCacheKey, context.log);
    } else if (cachedResult) {
      safeDeleteCacheEntry(deps.cache, resultCacheKey, context.log);
    }

    const describeAndCache = async (processingSignal: AbortSignal): Promise<DescribedVideo> => {
      const described = deps.overrideDescribePart
        ? await deps.overrideDescribePart(part, analysis)
        : await describeWithVisionModel(
            part,
            runtime,
            visionRuntime,
            selectedModel,
            analysis,
            processingSignal,
            videoBytes ?? undefined,
            { broker: deps.broker, transcription: deps.transcription, callVisionModel: deps.callVisionModel }
          );
      if (processingSignal.aborted) throw videoBridgeAbortError();
      const resultCacheBytes = Buffer.byteLength(described.description, "utf8");
      if (resultCacheKey && resultCacheIdentity) {
        safeSetCacheEntry(
          deps.cache,
          resultCacheKey,
          {
            value: described.description,
            producerModel: described.modelUsed ?? resultCacheIdentity.model,
            metadata: {
              ...resultCacheIdentity,
              durationSeconds: described.durationSeconds,
              framesRequested: described.framesRequested,
              framesExtracted: described.framesExtracted ?? described.framesUsed,
              framesUsed: described.framesUsed,
              dedupDropped: described.dedupDropped ?? 0,
              focusEndSeconds: described.focusWindow?.endSeconds,
              focusStartSeconds: described.focusWindow?.startSeconds,
              cacheBytes: resultCacheBytes,
              modelUsed: described.modelUsed ?? resultCacheIdentity.model,
              samplingCandidateCount: described.sampling?.candidateCount ?? 0,
              samplingPolicyEffective: described.sampling?.policyEffective ?? "uniform",
              samplingPolicyRequested: described.sampling?.policyRequested ?? runtime.samplingPolicy,
              transcriptCuesApplied: described.transcriptCues?.length ?? 0,
              contactSheetUsed: described.contactSheetUsed ?? false,
              ...(described.fusion ? { fusion: described.fusion } : {}),
              ...(described.descriptionRedacted
                ? { descriptionRedacted: described.descriptionRedacted }
                : {}),
            },
          },
          context.log
        );
      }
      return described;
    };
    const resolved =
      resultCacheKey && selectedModel
        ? await runVideoResultSingleflight(resultCacheKey, attemptSignal, describeAndCache)
        : { coalesced: false, value: await describeAndCache(attemptSignal) };
    const described = resolved.value;
    const producerModels: string[] = [];
    if (described.modelUsed) producerModels.push(described.modelUsed);
    const videoCacheHits = described.cacheHits ?? 0;
    const processingLatencyMs = Date.now() - attemptStartedAt;
    if (resultCacheKey && selectedModel) {
      recordBridgeUse("video", {
        cacheHits: videoCacheHits,
        fusionRun: Boolean(described.fusion),
        fusionPartial: described.fusion?.partial ?? false,
        latencyMs: processingLatencyMs,
        resultSingleflightCoalesced: resolved.coalesced,
      });
    } else {
      recordBridgeUse("video", {
        cacheHits: videoCacheHits,
        fusionRun: Boolean(described.fusion),
        fusionPartial: described.fusion?.partial ?? false,
        latencyMs: processingLatencyMs,
      });
    }
    return {
      status: "processed",
      contactSheetUsed: described.contactSheetUsed ?? false,
      dedupDropped: described.dedupDropped ?? 0,
      description: described.description,
      descriptionRedacted: described.descriptionRedacted,
      durationSeconds: described.durationSeconds,
      framesExtracted: described.framesExtracted ?? described.framesUsed,
      framesRequested: described.framesRequested,
      framesUsed: described.framesUsed,
      frameCacheHits: videoCacheHits,
      fusion: described.fusion,
      hasFocusWindow: Boolean(described.focusWindow),
      producerModels,
      samplingCandidateCount: described.sampling?.candidateCount ?? 0,
      samplingPolicyEffective: described.sampling?.policyEffective ?? "uniform",
      transcriptCuesApplied: described.transcriptCues?.length ?? 0,
    };
  } catch (error) {
    if (context.signal?.aborted) return { status: "aborted" };
    recordBridgeUse("video", {
      failure: true,
      latencyMs: Date.now() - attemptStartedAt,
    });
    context.log?.warn?.(
      "VIDEO_BRIDGE",
      "Video description failed; applying the capability-safe fallback",
      {
        failureCode:
          error && typeof error === "object" && "code" in error && error.code === "ENOENT"
            ? "RUNTIME_UNAVAILABLE"
            : "DESCRIPTION_FAILED",
        videoIndex: partIndex + 1,
      }
    );
    return { status: "failed", error };
  } finally {
    clearTimeout(attemptTimeout);
  }
}

export { combineModelIdentities };
