/**
 * Video Bridge — Audio Bridge STT orchestration (FU-06, #11654).
 *
 * Composes three already-independent seams behind one dual opt-in gate:
 *  - the SAME video bytes the frame path already downloaded — this module
 *    has no download path of its own, so it structurally cannot fetch the
 *    video a second time;
 *  - the loopback-only broker's bounded mono 16 kHz WAV operation
 *    ({@link extractVideoAudioViaBroker}), which shares the frame path's
 *    process queue, deadline, AbortSignal, and byte budgets because it is
 *    the exact same broker route (`mode=audio` on the frame route);
 *  - the existing Audio Bridge transcription boundary
 *    ({@link callAudioTranscriptionTimed}) — no new STT client.
 *
 * "No paid transcription without dual opt-in" is enforced by two early
 * returns, both before the broker or the transcription boundary is ever
 * touched. Every failure path returns `track: null` instead of throwing, so
 * a caller can always fall back to a visual-only description.
 */
import {
  callAudioTranscriptionTimed,
  selectAudioBridgeModel,
  type AudioCredentialCheck,
  type AudioPart,
  type AudioTranscriptionTimedResult,
} from "./audioBridgeHelpers";
import { bridgeCacheKey, type BridgeCacheStore } from "./modalityBridge/bridgeCache";
import type { FusionObservation, FusionTrack } from "./videoAudioFusion";
import {
  extractVideoAudioViaBroker,
  type BrokerAudioExtractionResult,
} from "./videoBridgeBrokerClient";

export type VideoAudioOrchestrationReason =
  | "ABORTED"
  | "EXTRACTION_FAILED"
  | "OPERATOR_OPT_OUT"
  | "PROVIDER_UNAVAILABLE"
  | "REQUEST_OPT_OUT"
  | "TIMEOUT"
  | "TRANSCRIPTION_FAILED";

export interface VideoAudioOrchestrationOptions {
  /** Result cache; omit (or omit `cacheKeyRef`) to skip caching entirely. */
  cache?: BridgeCacheStore | null;
  /** Stable identity for the ORIGINAL video part `ref` — never the raw bytes. */
  cacheKeyRef?: string;
  extractAudio?: typeof extractVideoAudioViaBroker;
  hasUsableCredentials?: AudioCredentialCheck;
  /** Configured STT model — `"auto"` or a fixed `provider/model` string. */
  model: string;
  /** Operator half of the dual opt-in (settings). */
  operatorOptIn: boolean;
  /** Request half of the dual opt-in (a per-request signal from the caller). */
  requestOptIn: boolean;
  selectModel?: typeof selectAudioBridgeModel;
  signal?: AbortSignal;
  /** The SAME budget the sibling frame extraction for this video used. */
  timeoutMs: number;
  transcribe?: typeof callAudioTranscriptionTimed;
  /** The SAME already-downloaded video bytes used for frame extraction. */
  videoBytes: Uint8Array;
}

export interface VideoAudioOrchestrationResult {
  /** False only for the two opt-out reasons — nothing was attempted at all. */
  attempted: boolean;
  reason?: VideoAudioOrchestrationReason;
  sttModel: string | null;
  /** "coarse" means the provider gave no segment timing (whole-clip span only). */
  timingPrecision?: "coarse" | "exact";
  track: FusionTrack | null;
}

interface CachedOrchestration {
  timingPrecision: "coarse" | "exact";
  track: FusionTrack;
}

type StepOutcome<T> = { ok: true; value: T } | { ok: false; result: VideoAudioOrchestrationResult };

function optedOut(reason: "OPERATOR_OPT_OUT" | "REQUEST_OPT_OUT"): VideoAudioOrchestrationResult {
  return { attempted: false, reason, sttModel: null, track: null };
}

function failed(
  reason: Exclude<VideoAudioOrchestrationReason, "OPERATOR_OPT_OUT" | "REQUEST_OPT_OUT">,
  sttModel: string | null
): VideoAudioOrchestrationResult {
  return { attempted: true, reason, sttModel, track: null };
}

/** Caller-signal cancellation always wins; else a timeout-shaped message is a shared-budget timeout. */
function classifyStepFailure(
  error: unknown,
  signal: AbortSignal | undefined,
  timeoutPattern: RegExp
): "ABORTED" | "TIMEOUT" | "FAILED" {
  if (signal?.aborted) return "ABORTED";
  if (error instanceof Error && timeoutPattern.test(error.message)) return "TIMEOUT";
  return "FAILED";
}

function cacheKeyFor(ref: string, sttModel: string): string {
  return bridgeCacheKey(ref, "video-audio-transcription", sttModel);
}

function readCache(
  options: VideoAudioOrchestrationOptions,
  sttModel: string
): CachedOrchestration | null {
  if (!options.cache || !options.cacheKeyRef) return null;
  const entry = options.cache.getEntry(cacheKeyFor(options.cacheKeyRef, sttModel));
  if (!entry) return null;
  try {
    const parsed = JSON.parse(entry.value) as Partial<CachedOrchestration>;
    if (!parsed.track || !Array.isArray(parsed.track.observations)) return null;
    if (parsed.timingPrecision !== "coarse" && parsed.timingPrecision !== "exact") return null;
    return { timingPrecision: parsed.timingPrecision, track: parsed.track };
  } catch {
    return null;
  }
}

function writeCache(
  options: VideoAudioOrchestrationOptions,
  sttModel: string,
  value: CachedOrchestration
): void {
  if (!options.cache || !options.cacheKeyRef) return;
  options.cache.setEntry(cacheKeyFor(options.cacheKeyRef, sttModel), {
    value: JSON.stringify(value),
  });
}

async function runExtraction(
  options: VideoAudioOrchestrationOptions,
  sttModel: string
): Promise<StepOutcome<BrokerAudioExtractionResult>> {
  const extractAudio = options.extractAudio ?? extractVideoAudioViaBroker;
  try {
    const value = await extractAudio(options.videoBytes, {
      signal: options.signal,
      timeoutMs: options.timeoutMs,
    });
    return { ok: true, value };
  } catch (error) {
    const outcome = classifyStepFailure(error, options.signal, /abort|timed out/i);
    return {
      ok: false,
      result: failed(outcome === "FAILED" ? "EXTRACTION_FAILED" : outcome, sttModel),
    };
  }
}

async function runTranscription(
  options: VideoAudioOrchestrationOptions,
  sttModel: string,
  extraction: BrokerAudioExtractionResult
): Promise<StepOutcome<AudioTranscriptionTimedResult>> {
  const transcribe = options.transcribe ?? callAudioTranscriptionTimed;
  const audioPart: AudioPart = {
    format: "wav",
    messageIndex: -1,
    partIndex: -1,
    ref: extraction.audio.dataUri,
    shape: "input_audio",
  };
  try {
    const value = await transcribe(audioPart, { model: sttModel, timeoutMs: options.timeoutMs });
    return { ok: true, value };
  } catch (error) {
    const outcome = classifyStepFailure(error, options.signal, /timed out/i);
    return {
      ok: false,
      result: failed(outcome === "FAILED" ? "TRANSCRIPTION_FAILED" : outcome, sttModel),
    };
  }
}

/** Server-minted observations only — never trusts a caller-declared source. */
function buildObservations(
  extraction: BrokerAudioExtractionResult,
  transcription: AudioTranscriptionTimedResult
): { observations: FusionObservation[]; timingPrecision: "coarse" | "exact" } {
  if (transcription.segments && transcription.segments.length > 0) {
    return {
      observations: transcription.segments.map((segment) => ({
        confidence: segment.confidence ?? 1,
        endSeconds: segment.endSeconds,
        source: "audio",
        startSeconds: segment.startSeconds,
        text: segment.text,
      })),
      timingPrecision: "exact",
    };
  }
  const text = transcription.text.trim();
  if (!text) return { observations: [], timingPrecision: "coarse" };
  return {
    observations: [
      {
        confidence: 1,
        endSeconds: Math.max(extraction.durationSeconds, 0.001),
        source: "audio",
        startSeconds: 0,
        text,
      },
    ],
    timingPrecision: "coarse",
  };
}

/**
 * Orchestrate server-side Video Bridge audio extraction + Audio Bridge STT,
 * gated on BOTH the operator and the request opt-in. Never throws: every
 * outcome — opt-out, no provider, extraction/transcription failure, timeout,
 * abort — comes back as `track: null` so the caller's visual-only fallback
 * always has a well-defined result to check against.
 */
export async function orchestrateVideoAudioTranscription(
  options: VideoAudioOrchestrationOptions
): Promise<VideoAudioOrchestrationResult> {
  if (!options.operatorOptIn) return optedOut("OPERATOR_OPT_OUT");
  if (!options.requestOptIn) return optedOut("REQUEST_OPT_OUT");

  const selectModel = options.selectModel ?? selectAudioBridgeModel;
  const sttModel = await selectModel(options.model, options.hasUsableCredentials);
  if (!sttModel) return failed("PROVIDER_UNAVAILABLE", null);

  const cached = readCache(options, sttModel);
  if (cached) {
    return { attempted: true, sttModel, timingPrecision: cached.timingPrecision, track: cached.track };
  }

  const extraction = await runExtraction(options, sttModel);
  if (!extraction.ok) return extraction.result;

  const transcription = await runTranscription(options, sttModel, extraction.value);
  if (!transcription.ok) return transcription.result;

  const { observations, timingPrecision } = buildObservations(extraction.value, transcription.value);
  const track: FusionTrack = { observations };
  writeCache(options, sttModel, { timingPrecision, track });
  return { attempted: true, sttModel, timingPrecision, track };
}
