import { createHash } from "node:crypto";

import { getSettings as defaultGetSettings } from "@/lib/db/settings";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  resolveVideoBridgeRuntimeSettings,
  resolveVisionBridgeRuntimeSettings,
  type VideoAnalysisMode,
} from "@/shared/constants/modalityBridgeDefaults";

import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import type { BridgeCacheStore } from "./modalityBridge/bridgeCache";
import {
  describeVideoPart as defaultDescribeVideoPart,
  extractVideoFocusHint,
  extractVideoParts,
  loadVideoPartBytes,
  replaceVideoParts,
  type DescribeVideoDependencies,
  type DescribedVideo,
  type VideoFusionTelemetry,
  type VideoPart,
} from "./videoBridgeHelpers";
import {
  combineModelIdentities,
  processVideoPart,
  type ProcessVideoPartDeps,
  type VideoAnalysisContext,
} from "./videoBridgePipeline";
import { getSharedVideoResultCacheFor } from "./videoBridgeResultCache";
import { type VisionModelConfig } from "./visionBridgeHelpers";
import { getBestVisionModel } from "./visionBridgeRouter";

export type { VideoAnalysisContext } from "./videoBridgePipeline";

/**
 * One replaced video part whose rendered text carried a transcript cue.
 * `redactedText` is the structured-redaction shadow (see
 * `DescribedVideo.descriptionRedacted`) for that same part — never derived
 * from the model-bound text, so it cannot be bypassed by cue content.
 *
 * #12150 fix round 1 (adversarial review): the downstream log-redaction
 * consumer (`applyVideoBridgeLogRedaction`, chatCore/attemptLogging.ts)
 * matches by CONTENT (`fullText`), not by `messageIndex`/`partIndex`.
 * Between this guardrail's preCall and the eventual log write, other
 * request-mutation stages (system-prompt injection when no existing system
 * message is found, context-relay handoff injection, reasoning-rule body
 * rewrites) can prepend/splice messages, silently invalidating any
 * positional index. `messageIndex`/`partIndex` are kept as advisory/
 * debugging metadata only — never used for matching.
 */
export interface VideoBridgeLogRedactionEntry {
  container: "messages" | "input";
  /** Advisory only (see interface doc) — may be stale by the time the log is written. */
  messageIndex: number;
  /** Advisory only (see interface doc) — may be stale by the time the log is written. */
  partIndex: number;
  /**
   * The exact, unredacted text placed into the replaced part
   * (`descriptions[i]`, identical to what `replaceVideoParts` writes to
   * `content[partIndex].text`). The downstream consumer matches parts by
   * `part.text === fullText`, so it finds the video part wherever a later
   * stage moved it, and never touches a part whose text differs.
   */
  fullText: string;
  redactedText: string;
}

/**
 * #12150 P1 final-review fix: re-anchor each redaction entry's `fullText` from
 * the FINAL pre-call guardrail payload. The video-bridge guardrail runs at
 * priority 7, but the PII masker (10) and credential masker (95) rewrite the
 * SAME chained payload afterward, in place — so by the end of the chain the
 * replaced part's text may differ from what video-bridge recorded, and the log
 * sink's content-match (`part.text === fullText`) would miss (fail open). Chain
 * guardrails only rewrite text in place — they never splice the message array —
 * so the advisory `(container, messageIndex, partIndex)` still resolves inside
 * the finished chain payload; reading the part text there yields the true
 * post-chain text the log sink will see. Falls back to the original `fullText`
 * when the index no longer resolves. Returns new entries; never mutates the
 * shared guardrail `meta` array. `redactedText` is unchanged (it is rendered
 * from the structured cues, independent of any masker rewrite).
 */
export function reanchorVideoBridgeRedaction(
  entries: readonly VideoBridgeLogRedactionEntry[],
  finalBody: unknown
): VideoBridgeLogRedactionEntry[] {
  const body = finalBody as Record<string, unknown> | null | undefined;
  return entries.map((entry) => {
    const container = body?.[entry.container];
    if (!Array.isArray(container)) return { ...entry };
    const message = container[entry.messageIndex] as { content?: unknown } | undefined;
    const content = message?.content;
    if (!Array.isArray(content)) return { ...entry };
    const part = content[entry.partIndex] as { text?: unknown } | undefined;
    if (!part || typeof part.text !== "string") return { ...entry };
    return { ...entry, fullText: part.text };
  });
}

type VideoBridgeBody = {
  model?: string;
  messages?: Array<{ role?: string; content?: unknown }>;
  input?: Array<{ role?: string; content?: unknown }>;
  [key: string]: unknown;
};

export interface VideoBridgeDependencies {
  getSettings?: () => Promise<Record<string, unknown>>;
  getCapabilities?: (model: string) => { supportsVideo: boolean | null };
  describePart?: (part: VideoPart, analysis: VideoAnalysisContext) => Promise<DescribedVideo>;
  extractFrames?: DescribeVideoDependencies["extractFrames"];
  fetchRemote?: DescribeVideoDependencies["fetchRemote"];
  resultCache?: BridgeCacheStore;
  selectVisionModel?: (fixedModel?: string) => Promise<string | null>;
  callVisionModel?: (
    imageDataUri: string,
    config: VisionModelConfig,
    apiKey?: string
  ) => Promise<string>;
}

function resolveVideoAnalysisContext(
  body: VideoBridgeBody,
  requestedAnalysisMode: VideoAnalysisMode
): VideoAnalysisContext {
  const focusHint = requestedAnalysisMode === "focused" ? extractVideoFocusHint(body) : undefined;
  return {
    analysisMode: focusHint ? "focused" : "full",
    ...(focusHint ? { focusHint } : {}),
    focusHintFingerprint: focusHint ? createHash("sha256").update(focusHint).digest("hex") : null,
    requestedAnalysisMode,
  };
}

export class VideoBridgeGuardrail extends BaseGuardrail {
  name = "video-bridge";
  priority = 7;

  private readonly deps: VideoBridgeDependencies;

  constructor(options?: { enabled?: boolean; deps?: VideoBridgeDependencies }) {
    super("video-bridge", { priority: 7, enabled: options?.enabled });
    this.deps = options?.deps ?? {};
  }

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    if (!this.enabled || context.disabledGuardrails?.includes("video-bridge")) {
      return { block: false };
    }

    if (context.signal?.aborted) throw new Error("Video Bridge processing was aborted");

    const body = payload as VideoBridgeBody;
    const model = context.model || body.model;
    if (!model) return { block: false };

    const getSettings = this.deps.getSettings ?? defaultGetSettings;
    let persisted: Record<string, unknown> = {};
    try {
      persisted = await getSettings();
    } catch {
      // Early boot can run before the settings database is ready; defaults are safe.
    }
    const runtime = resolveVideoBridgeRuntimeSettings(persisted);
    if (!runtime.enabled) return { block: false };

    const parts = extractVideoParts(body);
    if (parts.length === 0) return { block: false };

    const capabilities = (this.deps.getCapabilities ?? getResolvedModelCapabilities)(model);
    if (capabilities.supportsVideo === true) return { block: false };

    const analysis = resolveVideoAnalysisContext(body, runtime.analysisMode);
    const visionRuntime = resolveVisionBridgeRuntimeSettings(persisted);
    const configuredModel = runtime.model.trim() || visionRuntime.model.trim();
    const routingPlanModel = configuredModel || "auto";
    const cache = runtime.cacheEnabled
      ? (this.deps.resultCache ?? getSharedVideoResultCacheFor(runtime))
      : null;
    const successfulModels = new Set<string>();
    let selectedModelPromise: Promise<string | null> | null = null;
    const selectVideoModel = (): Promise<string | null> => {
      if (!selectedModelPromise) {
        const select =
          this.deps.selectVisionModel ??
          ((fixedModel?: string) => getBestVisionModel({ fixedModel }));
        selectedModelPromise = select(configuredModel || undefined);
      }
      return selectedModelPromise;
    };
    const pipelineDeps: ProcessVideoPartDeps = {
      broker: {
        loadVideoPartBytes,
        extractFrames: this.deps.extractFrames,
        fetchRemote: this.deps.fetchRemote,
      },
      transcription: { describePart: defaultDescribeVideoPart },
      cache,
      selectVideoModel,
      overrideDescribePart: this.deps.describePart,
      callVisionModel: this.deps.callVisionModel,
    };

    const startedAt = Date.now();
    const descriptions: Array<string | null> = [];
    let totalFramesRequested = 0;
    let totalFramesExtracted = 0;
    let totalFramesUsed = 0;
    let totalDurationSeconds = 0;
    let totalCacheHits = 0;
    let totalSamplingCandidateCount = 0;
    let totalDedupDropped = 0;
    let focusWindowsApplied = 0;
    let focusHintsApplied = 0;
    let transcriptCuesApplied = 0;
    let contactSheetsUsed = 0;
    let audioFusionRuns = 0;
    let audioFusionPartials = 0;
    const audioFusionFailureCodes = new Set<string>();
    const recordFusionTelemetry = (fusion?: VideoFusionTelemetry): void => {
      if (!fusion) return;
      audioFusionRuns += 1;
      if (fusion.partial) audioFusionPartials += 1;
      for (const [source, code] of Object.entries(fusion.failures ?? {})) {
        audioFusionFailureCodes.add(`${source}:${code}`);
      }
    };
    let samplingPolicyEffective: "uniform" | "scene_aware" | "segment_aware" = "uniform";
    let failures = 0;
    const logRedactionEntries: VideoBridgeLogRedactionEntry[] = [];

    const attemptedParts = parts.slice(0, runtime.maxVideos);
    for (let index = 0; index < attemptedParts.length; index++) {
      const part = attemptedParts[index];
      const result = await processVideoPart({
        analysis,
        context,
        deps: pipelineDeps,
        part,
        partIndex: index,
        runtime,
        visionRuntime,
      });

      if (result.status === "aborted") {
        throw new Error("Video Bridge processing was aborted");
      }
      if (result.status === "failed") {
        failures += 1;
        descriptions.push(
          capabilities.supportsVideo === false
            ? `[Video ${index + 1}]: (unavailable — video could not be described)`
            : null
        );
        continue;
      }

      descriptions.push(result.description);
      if (result.descriptionRedacted !== undefined) {
        logRedactionEntries.push({
          container: part.container,
          messageIndex: part.messageIndex,
          partIndex: part.partIndex,
          // The exact text `replaceVideoParts` is about to write into
          // content[partIndex].text (same `result.description` value pushed
          // to `descriptions` just above) — the content-address key the
          // downstream consumer matches on. See the interface doc.
          fullText: result.description,
          redactedText: result.descriptionRedacted,
        });
      }
      totalFramesRequested += result.framesRequested;
      totalFramesExtracted += result.framesExtracted;
      totalFramesUsed += result.framesUsed;
      totalDedupDropped += result.dedupDropped;
      if (result.hasFocusWindow) focusWindowsApplied += 1;
      if (analysis.analysisMode === "focused") focusHintsApplied += 1;
      totalDurationSeconds += result.durationSeconds;
      totalSamplingCandidateCount += result.samplingCandidateCount;
      transcriptCuesApplied += result.transcriptCuesApplied;
      if (result.contactSheetUsed) contactSheetsUsed += 1;
      recordFusionTelemetry(result.fusion);
      if (result.samplingPolicyEffective !== "uniform") {
        samplingPolicyEffective = result.samplingPolicyEffective;
      }
      for (const producerModel of result.producerModels) successfulModels.add(producerModel);
      totalCacheHits += result.frameCacheHits;
    }

    for (let index = attemptedParts.length; index < parts.length; index++) {
      descriptions.push(
        capabilities.supportsVideo === false
          ? `[Video ${index + 1}]: (not processed because the per-request video limit was reached)`
          : null
      );
    }

    const videosProcessed = attemptedParts.length - failures;
    const videosReplaced = descriptions.filter((description) => description !== null).length;
    if (videosReplaced === 0) return { block: false };

    return {
      block: false,
      modifiedPayload: replaceVideoParts(body, parts, descriptions),
      meta: {
        analysisMode: analysis.analysisMode,
        analysisModeRequested: analysis.requestedAnalysisMode,
        cacheHits: totalCacheHits,
        durationSeconds: totalDurationSeconds,
        failures,
        framesExtracted: totalFramesExtracted,
        framesRequested: totalFramesRequested,
        framesUsed: totalFramesUsed,
        dedupDropped: totalDedupDropped,
        focusWindowsApplied,
        focusHintsApplied,
        transcriptCuesApplied,
        // True iff at least one transcript cue (declared transcript OR fused
        // audio) was rendered into a replaced part — i.e. there is a redacted
        // shadow for a downstream log/Memory consumer to prefer. Explicitly
        // `false` (never omitted) for a video with frames but no transcript,
        // so plain-video logging/Memory stays unaffected.
        videoBridgeObserved: logRedactionEntries.length > 0,
        ...(logRedactionEntries.length > 0 ? { videoBridgeLogRedaction: logRedactionEntries } : {}),
        contactSheetsUsed,
        audioFusionRuns,
        audioFusionPartials,
        audioFusionFailureCodes: [...audioFusionFailureCodes].sort(),
        samplingCandidateCount: totalSamplingCandidateCount,
        samplingPolicyEffective,
        samplingPolicyRequested: runtime.samplingPolicy,
        processingTimeMs: Date.now() - startedAt,
        attempts: attemptedParts.length,
        videoModel: combineModelIdentities(successfulModels, routingPlanModel),
        videosProcessed,
        videosReplaced,
      },
    };
  }
}
