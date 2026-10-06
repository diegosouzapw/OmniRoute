export type FusionObservationSource = "audio" | "video";

export interface FusionObservation {
  confidence: number;
  endSeconds: number;
  source: FusionObservationSource;
  startSeconds: number;
  text: string;
}

export interface FusionTrack {
  observations: readonly FusionObservation[];
}

export interface VideoAudioFusionOptions {
  audio: (signal: AbortSignal) => Promise<FusionTrack>;
  signal?: AbortSignal;
  timeoutMs: number;
  video: (signal: AbortSignal) => Promise<FusionTrack>;
}

export interface VideoAudioFusionResult {
  audioAvailable: boolean;
  failures?: Partial<Record<FusionObservationSource, "ABORTED" | "FAILED" | "INVALID">>;
  observations: FusionObservation[];
  partial: boolean;
  videoAvailable: boolean;
}

const MAX_FUSION_OBSERVATIONS = 128;
const MAX_FUSION_TEXT_BYTES = 32 * 1024;

function normalizeTrack(track: FusionTrack, source: FusionObservationSource): FusionObservation[] {
  if (!track || !Array.isArray(track.observations)) {
    throw new Error("Invalid fusion track");
  }
  const observations: FusionObservation[] = [];
  let textBytes = 0;
  for (const observation of track.observations) {
    if (!observation || typeof observation !== "object")
      throw new Error("Invalid fusion observation");
    const text = typeof observation.text === "string" ? observation.text.trim() : "";
    if (
      !text ||
      observation.source !== source ||
      !Number.isFinite(observation.startSeconds) ||
      !Number.isFinite(observation.endSeconds) ||
      observation.startSeconds < 0 ||
      observation.endSeconds <= observation.startSeconds ||
      !Number.isFinite(observation.confidence) ||
      observation.confidence < 0 ||
      observation.confidence > 1
    ) {
      throw new Error("Invalid fusion observation bounds or provenance");
    }
    textBytes += Buffer.byteLength(text, "utf8");
    if (textBytes > MAX_FUSION_TEXT_BYTES || observations.length >= MAX_FUSION_OBSERVATIONS) {
      throw new Error("Fusion observation budget exceeded");
    }
    observations.push({
      confidence: observation.confidence,
      endSeconds: observation.endSeconds,
      source,
      startSeconds: observation.startSeconds,
      text,
    });
  }
  return observations;
}

function mergeObservations(
  video: readonly FusionObservation[],
  audio: readonly FusionObservation[]
): FusionObservation[] {
  const seen = new Set<string>();
  return [...video, ...audio]
    .filter((observation) => {
      const key = JSON.stringify(observation);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort(
      (left, right) =>
        left.startSeconds - right.startSeconds ||
        left.endSeconds - right.endSeconds ||
        left.source.localeCompare(right.source)
    );
}

/**
 * Run optional video and audio analysis under one deadline and cancellation
 * budget. The function never starts a provider itself; callers supply both
 * already-authorized operations and receive explicit partial-failure state.
 */
export async function fuseVideoAndAudio(
  options: VideoAudioFusionOptions
): Promise<VideoAudioFusionResult> {
  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs < 1 || options.timeoutMs > 120_000) {
    throw new Error("Invalid video/audio fusion timeout");
  }
  if (options.signal?.aborted) throw new Error("Video/audio fusion was aborted");
  const controller = new AbortController();
  const parentAbort = () => controller.abort();
  options.signal?.addEventListener("abort", parentAbort, { once: true });
  let deadlineExpired = false;
  const deadline = setTimeout(() => {
    deadlineExpired = true;
    controller.abort();
  }, options.timeoutMs);
  const abortPromise = new Promise<never>((_, reject) => {
    controller.signal.addEventListener("abort", () => reject(new Error("FUSION_ABORTED")), {
      once: true,
    });
  });
  const run = (operation: (signal: AbortSignal) => Promise<FusionTrack>) =>
    Promise.race([operation(controller.signal), abortPromise]);
  const [video, audio] = await Promise.allSettled([run(options.video), run(options.audio)]);
  clearTimeout(deadline);
  options.signal?.removeEventListener("abort", parentAbort);
  if (options.signal?.aborted) throw new Error("Video/audio fusion was aborted");
  if (deadlineExpired) throw new Error("Video/audio fusion timed out");

  const failures: Partial<Record<FusionObservationSource, "ABORTED" | "FAILED" | "INVALID">> = {};
  let videoObservations: FusionObservation[] = [];
  let audioObservations: FusionObservation[] = [];
  if (video.status === "fulfilled") {
    try {
      videoObservations = normalizeTrack(video.value, "video");
    } catch {
      failures.video = "INVALID";
    }
  } else {
    failures.video =
      video.reason instanceof Error && video.reason.message === "FUSION_ABORTED"
        ? "ABORTED"
        : "FAILED";
  }
  if (audio.status === "fulfilled") {
    try {
      audioObservations = normalizeTrack(audio.value, "audio");
    } catch {
      failures.audio = "INVALID";
    }
  } else {
    failures.audio =
      audio.reason instanceof Error && audio.reason.message === "FUSION_ABORTED"
        ? "ABORTED"
        : "FAILED";
  }
  if (Object.keys(failures).length === 2) throw new Error("Video/audio fusion failed");
  return {
    audioAvailable: !failures.audio,
    failures: Object.keys(failures).length > 0 ? failures : undefined,
    observations: mergeObservations(videoObservations, audioObservations),
    partial: Object.keys(failures).length > 0,
    videoAvailable: !failures.video,
  };
}
