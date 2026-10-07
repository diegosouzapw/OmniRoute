/**
 * FU-05 transcript contract: deterministic budgets, a structural provenance
 * trust boundary, and cross-source reconciliation for Video Bridge
 * transcripts. Extracted from videoBridgeHelpers.ts so the frozen-adjacent
 * helper file only grows by a thin delegation (see #11652).
 *
 * Trust boundary: `normalizeVideoTranscript`'s only public entry point is
 * `buildNormalizedVideoTranscript`. A caller-supplied cue can only ever
 * declare `source: "client"` — declaring "embedded" or "audio-bridge" is
 * self-asserted provenance and is silently reclassified to "client" because
 * there is no way for the server to verify it came from an embedded-subtitle
 * extractor or the audio-bridge pipeline. The ONLY way to obtain a trusted
 * "embedded"/"audio-bridge" cue is for server-owned code to pass
 * `options.trustedSource` explicitly — that option can never be reached by
 * deserializing request-body JSON (it is a second, code-only argument), so
 * the trust decision is structural rather than a flag the caller can flip.
 */

export type VideoTranscriptSource = "audio-bridge" | "client" | "embedded";

export interface VideoTranscriptCue {
  confidence: number;
  endSeconds: number;
  source: VideoTranscriptSource;
  startSeconds: number;
  text: string;
  /**
   * Present only when reconciliation merged cues declaring 2+ distinct
   * sources into one cue (see `reconcileVideoTranscriptCues`). Absent for
   * the common single-source case so existing exact-shape assertions are
   * unaffected.
   */
  contributingSources?: VideoTranscriptSource[];
}

export interface VideoTranscriptFocusWindow {
  endSeconds: number;
  startSeconds: number;
}

export interface NormalizeVideoTranscriptOptions {
  /** Structural trust seam — server-owned adapters only, never derived from request JSON. */
  trustedSource?: VideoTranscriptSource;
  /** Scope (filter + clip) the resulting cues to this window; `null`/omitted keeps everything. */
  focusWindow?: VideoTranscriptFocusWindow | null;
}

const VIDEO_TRANSCRIPT_SOURCES: ReadonlySet<VideoTranscriptSource> = new Set([
  "audio-bridge",
  "client",
  "embedded",
]);

export const VIDEO_TRANSCRIPT_MAX_CUES = 256;
export const VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS = 4096;
export const VIDEO_TRANSCRIPT_MAX_CUE_UTF8_BYTES = 4 * 1024;
export const VIDEO_TRANSCRIPT_MAX_TOTAL_UTF8_BYTES = 64 * 1024;

// Bounded (no unbounded quantifiers) — matches an unpaired high surrogate not
// followed by a low surrogate, or an unpaired low surrogate not preceded by a
// high surrogate. Safe against catastrophic backtracking per AGENTS.md ReDoS rule.
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

const SOURCE_PRIORITY: Record<VideoTranscriptSource, number> = {
  client: 0,
  "audio-bridge": 1,
  embedded: 2,
};

function extractRawCues(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (
    value &&
    typeof value === "object" &&
    Array.isArray((value as Record<string, unknown>).cues)
  ) {
    return (value as Record<string, unknown>).cues as unknown[];
  }
  throw new Error("Invalid video transcript: expected a cues array");
}

function extractCueText(record: Record<string, unknown>): string {
  const raw = record.text;
  if (typeof raw !== "string") throw new Error("Invalid video transcript cue text");
  if (raw.length > VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS) {
    throw new Error(
      `Video transcript cue exceeds the maximum of ${VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS} input code units`
    );
  }
  if (LONE_SURROGATE.test(raw)) {
    throw new Error("Invalid video transcript cue text encoding");
  }
  const text = raw.normalize("NFC").trim();
  if (!text) throw new Error("Invalid video transcript cue text");
  if (Buffer.byteLength(text, "utf8") > VIDEO_TRANSCRIPT_MAX_CUE_UTF8_BYTES) {
    throw new Error(
      `Video transcript cue exceeds the maximum of ${VIDEO_TRANSCRIPT_MAX_CUE_UTF8_BYTES} UTF-8 bytes`
    );
  }
  return text;
}

function resolveCueSource(
  record: Record<string, unknown>,
  trustedSource: VideoTranscriptSource | undefined
): VideoTranscriptSource {
  if (trustedSource) return trustedSource;
  const declared = record.source;
  if (
    typeof declared !== "string" ||
    !VIDEO_TRANSCRIPT_SOURCES.has(declared as VideoTranscriptSource)
  ) {
    throw new Error("Invalid video transcript source or provenance");
  }
  // Only a server-owned adapter may assign "embedded"/"audio-bridge" via the
  // trustedSource seam above; any caller-declared value collapses to "client".
  return "client";
}

function resolveCueTimestamps(record: Record<string, unknown>): {
  startSeconds: number;
  endSeconds: number;
} {
  const startSeconds =
    typeof record.startSeconds === "number"
      ? record.startSeconds
      : typeof record.start === "number"
        ? record.start
        : Number.NaN;
  const endSeconds =
    typeof record.endSeconds === "number"
      ? record.endSeconds
      : typeof record.end === "number"
        ? record.end
        : Number.NaN;
  return { startSeconds, endSeconds };
}

function assertValidCueBounds(
  startSeconds: number,
  endSeconds: number,
  confidence: unknown,
  durationSeconds: number
): void {
  if (
    !Number.isFinite(startSeconds) ||
    !Number.isFinite(endSeconds) ||
    !Number.isFinite(confidence as number) ||
    (confidence as number) < 0 ||
    (confidence as number) > 1 ||
    startSeconds < 0 ||
    endSeconds > durationSeconds ||
    endSeconds <= startSeconds
  ) {
    throw new Error("Invalid video transcript timestamp or confidence range");
  }
}

function parseVideoTranscriptCue(
  cue: unknown,
  durationSeconds: number,
  trustedSource: VideoTranscriptSource | undefined
): VideoTranscriptCue {
  if (!cue || typeof cue !== "object") throw new Error("Invalid video transcript cue");
  const record = cue as Record<string, unknown>;
  const text = extractCueText(record);
  const source = resolveCueSource(record, trustedSource);
  const { startSeconds, endSeconds } = resolveCueTimestamps(record);
  const confidence = record.confidence === undefined ? 1 : record.confidence;
  assertValidCueBounds(startSeconds, endSeconds, confidence, durationSeconds);
  return { confidence: confidence as number, endSeconds, source, startSeconds, text };
}

interface VideoTranscriptCluster {
  startSeconds: number;
  endSeconds: number;
  text: string;
  members: VideoTranscriptCue[];
}

function findOverlappingCluster(
  clusters: readonly VideoTranscriptCluster[],
  cue: VideoTranscriptCue
): VideoTranscriptCluster | undefined {
  return clusters.find(
    (cluster) =>
      cluster.text === cue.text &&
      cue.startSeconds < cluster.endSeconds &&
      cue.endSeconds > cluster.startSeconds
  );
}

function mergeVideoTranscriptCluster(cluster: VideoTranscriptCluster): VideoTranscriptCue {
  const { members } = cluster;
  const distinctSources = Array.from(new Set(members.map((member) => member.source))).sort(
    (left, right) => SOURCE_PRIORITY[left] - SOURCE_PRIORITY[right]
  );
  const winningSource = distinctSources[distinctSources.length - 1];
  return {
    confidence: Math.max(...members.map((member) => member.confidence)),
    endSeconds: Math.max(...members.map((member) => member.endSeconds)),
    source: winningSource,
    startSeconds: Math.min(...members.map((member) => member.startSeconds)),
    text: cluster.text,
    ...(distinctSources.length > 1 ? { contributingSources: distinctSources } : {}),
  };
}

/**
 * Reconcile duplicate and time-overlapping cues sharing identical text —
 * possibly contributed by different sources/calls — into one deterministic
 * cue per cluster, preserving which sources contributed when more than one
 * did. Replaces naive exact-match deduplication, which silently discarded
 * the losing source's identity.
 */
export function reconcileVideoTranscriptCues(
  cues: readonly VideoTranscriptCue[]
): VideoTranscriptCue[] {
  const sorted = [...cues].sort(
    (left, right) =>
      left.startSeconds - right.startSeconds ||
      left.endSeconds - right.endSeconds ||
      left.text.localeCompare(right.text) ||
      SOURCE_PRIORITY[left.source] - SOURCE_PRIORITY[right.source]
  );
  const clusters: VideoTranscriptCluster[] = [];
  for (const cue of sorted) {
    const cluster = findOverlappingCluster(clusters, cue);
    if (cluster) {
      cluster.members.push(cue);
      cluster.startSeconds = Math.min(cluster.startSeconds, cue.startSeconds);
      cluster.endSeconds = Math.max(cluster.endSeconds, cue.endSeconds);
    } else {
      clusters.push({
        endSeconds: cue.endSeconds,
        members: [cue],
        startSeconds: cue.startSeconds,
        text: cue.text,
      });
    }
  }
  return clusters
    .map(mergeVideoTranscriptCluster)
    .sort((left, right) => left.startSeconds - right.startSeconds || left.endSeconds - right.endSeconds);
}

/** Filter cues to those overlapping `focusWindow`, clipping their bounds to it. */
export function scopeVideoTranscriptCuesToFocusWindow(
  cues: readonly VideoTranscriptCue[],
  focusWindow: VideoTranscriptFocusWindow | null | undefined
): VideoTranscriptCue[] {
  if (!focusWindow) return [...cues];
  return cues
    .filter(
      (cue) => cue.startSeconds < focusWindow.endSeconds && cue.endSeconds > focusWindow.startSeconds
    )
    .map((cue) => ({
      ...cue,
      endSeconds: Math.min(cue.endSeconds, focusWindow.endSeconds),
      startSeconds: Math.max(cue.startSeconds, focusWindow.startSeconds),
    }));
}

/**
 * Validate optional transcript metadata without ever invoking a transcription
 * provider. Enforces the FU-05 budgets (256 cues, 4096 input code units/cue,
 * 4 KiB UTF-8/cue, 64 KiB total), the provenance trust boundary described at
 * the top of this file, cross-source reconciliation, and focus-window scoping.
 */
export function buildNormalizedVideoTranscript(
  value: unknown,
  durationSeconds: number,
  options: NormalizeVideoTranscriptOptions = {}
): VideoTranscriptCue[] {
  if (value === undefined || value === null) return [];
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Invalid video transcript duration");
  }
  const rawCues = extractRawCues(value);
  if (rawCues.length > VIDEO_TRANSCRIPT_MAX_CUES) {
    throw new Error(`Video transcript exceeds the maximum of ${VIDEO_TRANSCRIPT_MAX_CUES} cues`);
  }
  const parsed: VideoTranscriptCue[] = [];
  let totalBytes = 0;
  for (const rawCue of rawCues) {
    const cue = parseVideoTranscriptCue(rawCue, durationSeconds, options.trustedSource);
    totalBytes += Buffer.byteLength(cue.text, "utf8");
    if (totalBytes > VIDEO_TRANSCRIPT_MAX_TOTAL_UTF8_BYTES) {
      throw new Error(
        `Video transcript exceeds the maximum total of ${VIDEO_TRANSCRIPT_MAX_TOTAL_UTF8_BYTES} UTF-8 bytes`
      );
    }
    parsed.push(cue);
  }
  const reconciled = reconcileVideoTranscriptCues(parsed);
  return scopeVideoTranscriptCuesToFocusWindow(reconciled, options.focusWindow ?? null);
}
