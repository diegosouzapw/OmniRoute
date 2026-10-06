/**
 * Client-side adapter that legitimately EARNS "embedded" transcript provenance (#11659,
 * FU-05). "Embedded" must mean subtitles the server actually extracted and verified from the
 * real container via the loopback-only Video Bridge broker — never a label the caller
 * asserted. See `videoBridgeHelpers.ts::normalizeVideoTranscript` for the caller-declared
 * transcript path this composes with; the client-forgery boundary and cross-source
 * reconciliation for that seam are #11652/#12009's scope, not this file's.
 *
 * Contract:
 *  - `probeEmbeddedVideoSubtitles` NEVER rejects for an expected failure mode (broker error,
 *    timeout, malformed/oversized/forged response, unusable content) — it always resolves to
 *    one of three explicit outcomes so a subtitle failure can never break the visual
 *    description path (fail-open). It only rejects when the CALLER's own `signal` aborted.
 *  - `outcome: "transient_failure"` always carries `cacheable: false` — callers must not
 *    persist it as a stable "no subtitles" fact (a retry may behave differently).
 *  - `outcome: "success"` is only ever reached after the broker response's fingerprint has
 *    been verified against this process's own broker secret (`videoBridgeBrokerAuth.ts`) —
 *    a forged or unverifiable response can never produce embedded cues.
 */
import { z } from "zod";

import { verifyVideoBridgeBrokerFingerprint } from "./videoBridgeBrokerAuth";
import {
  extractVideoSubtitlesViaBroker,
  type BrokerSubtitleExtractionOptions,
  type VideoSubtitleBrokerResponse,
} from "./videoBridgeBrokerClient";
import type { VideoTranscriptCue } from "./videoBridgeHelpers";

/** Extraction never runs longer than this, regardless of how much request budget remains. */
export const VIDEO_SUBTITLE_SUBDEADLINE_MS = 10_000;
export const VIDEO_SUBTITLE_MAX_LINE_CODE_UNITS = 4096;
const VIDEO_SUBTITLE_MAX_CUES = 4_000;

/** The 10s subtitle subdeadline is itself bounded by whatever remains of the request deadline. */
export function resolveVideoSubtitleSubdeadlineMs(requestDeadlineRemainingMs: number): number {
  if (!Number.isFinite(requestDeadlineRemainingMs)) return VIDEO_SUBTITLE_SUBDEADLINE_MS;
  return Math.max(0, Math.min(VIDEO_SUBTITLE_SUBDEADLINE_MS, requestDeadlineRemainingMs));
}

// ─── Bounded, ReDoS-safe WebVTT parsing ────────────────────────────────────
// Subtitle bytes are fully untrusted. Every regex below uses strictly bounded,
// non-overlapping quantifiers (repo ReDoS rule) and the heavy lifting (block splitting,
// timestamp arithmetic) is plain string/array work, never regex.

const REPLACEMENT_CHARACTER = "�";
// HH:MM:SS.mmm or MM:SS.mmm, each group bounded — no nested unbounded quantifiers.
const TIMESTAMP_LINE_PATTERN =
  /^(\d{1,2}(?::\d{2}){1,2}\.\d{1,3})[ \t]+-->[ \t]+(\d{1,2}(?::\d{2}){1,2}\.\d{1,3})/;
const TAG_PATTERN = /<[^>]{0,200}>/g;

interface CandidateCue {
  endSeconds: number;
  startSeconds: number;
  text: string;
}

function parseWebVttTimestamp(value: string): number | null {
  const segments = value.split(":");
  if (segments.length !== 2 && segments.length !== 3) return null;
  const secondsPart = segments[segments.length - 1];
  const minutesPart = segments[segments.length - 2];
  const hoursPart = segments.length === 3 ? segments[0] : "0";
  const [wholeSecondsRaw, millisRaw = "0"] = secondsPart.split(".");
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);
  const wholeSeconds = Number(wholeSecondsRaw);
  const millis = Number(millisRaw.padEnd(3, "0").slice(0, 3));
  if (
    !Number.isInteger(hours) ||
    hours < 0 ||
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 59 ||
    !Number.isInteger(wholeSeconds) ||
    wholeSeconds < 0 ||
    wholeSeconds > 59 ||
    !Number.isInteger(millis) ||
    millis < 0
  ) {
    return null;
  }
  return hours * 3_600 + minutes * 60 + wholeSeconds + millis / 1_000;
}

function splitIntoBlocks(lines: readonly string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (line.trim().length === 0) {
      if (current.length > 0) blocks.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) blocks.push(current);
  return blocks;
}

function extractTimingLine(block: readonly string[]): { textLines: string[]; timingLine: string } | null {
  if (TIMESTAMP_LINE_PATTERN.test(block[0])) {
    return { textLines: block.slice(1), timingLine: block[0] };
  }
  if (block.length > 1 && TIMESTAMP_LINE_PATTERN.test(block[1])) {
    return { textLines: block.slice(2), timingLine: block[1] };
  }
  return null;
}

function buildCandidateCue(block: readonly string[], durationSeconds: number): CandidateCue | null {
  const extracted = extractTimingLine(block);
  if (!extracted) return null;
  const match = TIMESTAMP_LINE_PATTERN.exec(extracted.timingLine);
  if (!match) return null;
  const startSeconds = parseWebVttTimestamp(match[1]);
  const endSeconds = parseWebVttTimestamp(match[2]);
  if (startSeconds === null || endSeconds === null) return null;
  if (!(endSeconds > startSeconds) || startSeconds > durationSeconds + 1) return null;
  if (extracted.textLines.length === 0) return null;
  for (const line of extracted.textLines) {
    // Individual lines beyond the bound, or containing the UTF-8 replacement character
    // (this content was not valid text), invalidate the whole cue rather than truncating
    // or silently dropping bytes.
    if (line.length > VIDEO_SUBTITLE_MAX_LINE_CODE_UNITS) return null;
    if (line.includes(REPLACEMENT_CHARACTER)) return null;
  }
  const text = extracted.textLines
    .map((line) => line.replace(TAG_PATTERN, "").trim())
    .filter((line) => line.length > 0)
    .join(" ")
    .trim();
  if (!text) return null;
  return { endSeconds, startSeconds, text };
}

/** Bounded WebVTT -> candidate cue list. Never throws; unparseable input yields `[]`. */
export function parseBoundedWebVtt(rawText: string, durationSeconds: number): CandidateCue[] {
  if (typeof rawText !== "string" || rawText.length === 0) return [];
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return [];
  const normalized = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  if (!lines[0]?.trim().startsWith("WEBVTT")) return [];
  const candidates: CandidateCue[] = [];
  for (const block of splitIntoBlocks(lines.slice(1))) {
    if (candidates.length >= VIDEO_SUBTITLE_MAX_CUES) break;
    const candidate = buildCandidateCue(block, durationSeconds);
    if (candidate) candidates.push(candidate);
  }
  return candidates.sort((left, right) => left.startSeconds - right.startSeconds);
}

const CandidateCueSchema = z
  .object({
    endSeconds: z.number().finite().nonnegative(),
    startSeconds: z.number().finite().nonnegative(),
    text: z.string().min(1).max(VIDEO_SUBTITLE_MAX_LINE_CODE_UNITS),
  })
  .strict()
  .refine((cue) => cue.endSeconds > cue.startSeconds, {
    message: "Video subtitle cue end must be after its start",
  });
const CandidateCueListSchema = z.array(CandidateCueSchema).max(VIDEO_SUBTITLE_MAX_CUES);

function selectCuesFromStreams(
  streams: VideoSubtitleBrokerResponse["streams"],
  durationSeconds: number
): VideoTranscriptCue[] | null {
  for (const stream of streams) {
    const candidates = parseBoundedWebVtt(stream.webvtt, durationSeconds);
    const validated = CandidateCueListSchema.safeParse(candidates);
    if (!validated.success || validated.data.length === 0) continue;
    return validated.data.map((cue) => ({
      confidence: 1,
      endSeconds: cue.endSeconds,
      source: "embedded" as const,
      startSeconds: cue.startSeconds,
      text: cue.text,
    }));
  }
  return null;
}

// ─── Outcome contract ───────────────────────────────────────────────────────

export type VideoSubtitleProbeOutcome =
  | { cacheable: true; cues: VideoTranscriptCue[]; outcome: "success" }
  | { cacheable: true; outcome: "absent" }
  | { cacheable: false; outcome: "transient_failure"; reason: string };

export interface VideoSubtitleProbeOptions {
  /** Remaining budget of the overall request; the internal 10s subdeadline is clamped to it. */
  requestDeadlineRemainingMs: number;
  signal?: AbortSignal;
}

export interface VideoSubtitleProbeDependencies {
  probeBroker?: (
    bytes: Uint8Array,
    options: BrokerSubtitleExtractionOptions
  ) => Promise<VideoSubtitleBrokerResponse>;
}

function transientFailure(reason: string): VideoSubtitleProbeOutcome {
  return { cacheable: false, outcome: "transient_failure", reason };
}

/**
 * Probes a video's embedded subtitle streams through the loopback-only broker and returns an
 * explicit success/absent/transient_failure outcome. Resolves for every expected failure mode;
 * only a genuine `options.signal` abort propagates as a rejection.
 */
export async function probeEmbeddedVideoSubtitles(
  bytes: Uint8Array,
  options: VideoSubtitleProbeOptions,
  dependencies: VideoSubtitleProbeDependencies = {}
): Promise<VideoSubtitleProbeOutcome> {
  if (options.signal?.aborted) throw new Error("Video subtitle probe request aborted");
  const subdeadlineMs = resolveVideoSubtitleSubdeadlineMs(options.requestDeadlineRemainingMs);
  if (subdeadlineMs <= 0) {
    return transientFailure("Video subtitle probe deadline already exceeded");
  }
  const probeBroker = dependencies.probeBroker ?? extractVideoSubtitlesViaBroker;
  let response: VideoSubtitleBrokerResponse;
  try {
    response = await probeBroker(bytes, { signal: options.signal, timeoutMs: subdeadlineMs });
  } catch (error) {
    if (options.signal?.aborted) throw error;
    return transientFailure(
      error instanceof Error ? error.message : "Video subtitle probe failed"
    );
  }
  if (!verifyVideoBridgeBrokerFingerprint(response.fingerprint)) {
    return transientFailure("Video subtitle broker response fingerprint mismatch");
  }
  if (response.streams.length === 0) {
    return { cacheable: true, outcome: "absent" };
  }
  const cues = selectCuesFromStreams(response.streams, response.durationSeconds);
  if (!cues) return { cacheable: true, outcome: "absent" };
  return { cacheable: true, cues, outcome: "success" };
}
