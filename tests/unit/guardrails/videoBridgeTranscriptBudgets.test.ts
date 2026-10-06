import assert from "node:assert/strict";
import test from "node:test";

import {
  describeVideoPart,
  normalizeVideoTranscript,
  type VideoCaptionFrame,
} from "../../../src/lib/guardrails/videoBridgeHelpers";
import {
  VIDEO_TRANSCRIPT_MAX_CUES,
  VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS,
  VIDEO_TRANSCRIPT_MAX_CUE_UTF8_BYTES,
  VIDEO_TRANSCRIPT_MAX_TOTAL_UTF8_BYTES,
} from "../../../src/lib/guardrails/videoBridgeTranscriptContract";

function cue(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return { text: "cue", start: 0, end: 1, source: "client", ...overrides };
}

// ---------------------------------------------------------------------------
// Budgets (#11652 scope): 256 cues, 4096 input code units/cue, 4 KiB UTF-8/cue,
// 64 KiB total text. All enforced deterministically with a clear error.
// ---------------------------------------------------------------------------

test("accepts exactly the maximum cue count and rejects one more", () => {
  const atLimit = Array.from({ length: VIDEO_TRANSCRIPT_MAX_CUES }, (_unused, index) =>
    cue({ text: `cue-${index}`, start: index, end: index + 0.5 })
  );
  assert.equal(normalizeVideoTranscript({ cues: atLimit }, VIDEO_TRANSCRIPT_MAX_CUES + 1).length, VIDEO_TRANSCRIPT_MAX_CUES);

  const overLimit = [...atLimit, cue({ text: "one-too-many", start: VIDEO_TRANSCRIPT_MAX_CUES })];
  assert.throws(
    () => normalizeVideoTranscript({ cues: overLimit }, VIDEO_TRANSCRIPT_MAX_CUES + 2),
    /256 cues/
  );
});

test("rejects a cue whose raw text exceeds the maximum input code units", () => {
  const tooLong = "a".repeat(VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS + 1);
  assert.throws(
    () => normalizeVideoTranscript({ cues: [cue({ text: tooLong })] }, 10),
    /input code units/
  );
  // Exactly at the limit is accepted.
  const atLimit = "a".repeat(VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS);
  assert.equal(normalizeVideoTranscript({ cues: [cue({ text: atLimit })] }, 10)[0]?.text.length, VIDEO_TRANSCRIPT_MAX_CUE_CODE_UNITS);
});

test("rejects a cue whose UTF-8 encoding exceeds the maximum per-cue size", () => {
  // Each "é" (U+00E9) is 1 code unit but 2 UTF-8 bytes, so this trips the byte
  // budget while staying well under the code-unit budget.
  const wideText = "é".repeat(VIDEO_TRANSCRIPT_MAX_CUE_UTF8_BYTES / 2 + 1);
  assert.throws(
    () => normalizeVideoTranscript({ cues: [cue({ text: wideText })] }, 10),
    /UTF-8/
  );
});

test("rejects a transcript whose combined UTF-8 text exceeds the total budget", () => {
  const perCueBytes = 1024;
  const cueCount = Math.ceil(VIDEO_TRANSCRIPT_MAX_TOTAL_UTF8_BYTES / perCueBytes) + 1;
  const cues = Array.from({ length: cueCount }, (_unused, index) =>
    cue({ text: "b".repeat(perCueBytes), start: index, end: index + 0.5 })
  );
  assert.throws(
    () => normalizeVideoTranscript({ cues }, cueCount + 1),
    /total.*UTF-8|maximum total/i
  );
});

// ---------------------------------------------------------------------------
// Malformed Unicode
// ---------------------------------------------------------------------------

test("rejects cue text containing an unpaired surrogate", () => {
  assert.throws(
    () => normalizeVideoTranscript({ cues: [cue({ text: "abc\uD800def" })] }, 10),
    /encoding/i
  );
  assert.throws(
    () => normalizeVideoTranscript({ cues: [cue({ text: "abc\uDC00def" })] }, 10),
    /encoding/i
  );
});

test("accepts well-formed surrogate pairs (astral text)", () => {
  const cues = normalizeVideoTranscript({ cues: [cue({ text: "hello \u{1F600}" })] }, 10);
  assert.equal(cues[0]?.text, "hello \u{1F600}");
});

// ---------------------------------------------------------------------------
// Provenance forgery (structural trust boundary)
// ---------------------------------------------------------------------------

test("a forged embedded source from request-body JSON is reclassified to client", () => {
  const cues = normalizeVideoTranscript({ cues: [cue({ source: "embedded" })] }, 10);
  assert.equal(cues[0]?.source, "client");
});

test("a forged audio-bridge source from request-body JSON is reclassified to client", () => {
  const cues = normalizeVideoTranscript({ cues: [cue({ source: "audio-bridge" })] }, 10);
  assert.equal(cues[0]?.source, "client");
});

test("the trustedSource option is a code-only seam that overrides any caller-declared source", () => {
  const embeddedCues = normalizeVideoTranscript(
    { cues: [cue({ source: "client" })] },
    10,
    { trustedSource: "embedded" }
  );
  assert.equal(embeddedCues[0]?.source, "embedded");

  const audioBridgeCues = normalizeVideoTranscript(
    { cues: [cue({ source: "unknown-junk" })] },
    10,
    { trustedSource: "audio-bridge" }
  );
  assert.equal(audioBridgeCues[0]?.source, "audio-bridge");
});

// ---------------------------------------------------------------------------
// Focus scoping
// ---------------------------------------------------------------------------

test("normalizeVideoTranscript scopes cues to the focus window, dropping non-overlapping cues", () => {
  const cues = normalizeVideoTranscript(
    {
      cues: [
        cue({ text: "before", start: 0, end: 1 }),
        cue({ text: "inside", start: 4, end: 6 }),
        cue({ text: "spanning", start: 7, end: 12 }),
        cue({ text: "after", start: 20, end: 21 }),
      ],
    },
    30,
    { focusWindow: { startSeconds: 3, endSeconds: 10 } }
  );

  assert.deepEqual(
    cues.map((entry) => entry.text),
    ["inside", "spanning"]
  );
  const spanning = cues.find((entry) => entry.text === "spanning");
  assert.equal(spanning?.startSeconds, 7);
  assert.equal(spanning?.endSeconds, 10, "clipped to the focus window end");
});

test("describeVideoPart scopes transcript cues to the effective focus window end-to-end", async () => {
  const frames: VideoCaptionFrame[] = [
    { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 5 },
  ];
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      transcript: {
        cues: [
          { text: "outside focus", start: 0, end: 1, source: "client" },
          { text: "inside focus", start: 4, end: 6, source: "client" },
        ],
      },
    },
    { frameCount: 1, focusWindow: { startSeconds: 3, endSeconds: 10 }, timeoutMs: 1000 },
    async () => "a scene",
    { extractFrames: async () => ({ durationSeconds: 20, frames }) }
  );

  assert.deepEqual(
    described.transcriptCues?.map((entry) => entry.text),
    ["inside focus"]
  );
  assert.doesNotMatch(described.description, /outside focus/);
});

// ---------------------------------------------------------------------------
// Cross-source / within-call reconciliation
// ---------------------------------------------------------------------------

test("reconciles overlapping same-text cues within a single normalizeVideoTranscript call", () => {
  const cues = normalizeVideoTranscript(
    {
      cues: [
        cue({ text: "same words", start: 1, end: 3, confidence: 0.4 }),
        cue({ text: "same words", start: 2, end: 4, confidence: 0.9 }),
      ],
    },
    10
  );

  assert.equal(cues.length, 1);
  assert.equal(cues[0]?.startSeconds, 1);
  assert.equal(cues[0]?.endSeconds, 4);
  assert.equal(cues[0]?.confidence, 0.9, "keeps the higher-confidence reading");
  assert.equal(cues[0]?.contributingSources, undefined, "single-source merges add no metadata");
});

test("non-overlapping cues with identical text are kept distinct", () => {
  const cues = normalizeVideoTranscript(
    {
      cues: [
        cue({ text: "repeated line", start: 1, end: 2 }),
        cue({ text: "repeated line", start: 8, end: 9 }),
      ],
    },
    10
  );
  assert.equal(cues.length, 2);
});
