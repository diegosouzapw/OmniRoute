import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import {
  describeVideoPart,
  normalizeVideoTranscript,
  type VideoCaptionFrame,
} from "../../../src/lib/guardrails/videoBridgeHelpers";

async function jpegFrame(color: string, timestampSeconds: number): Promise<VideoCaptionFrame> {
  const bytes = await sharp({
    create: { background: color, channels: 3, height: 24, width: 32 },
  })
    .jpeg()
    .toBuffer();
  return { dataUri: `data:image/jpeg;base64,${bytes.toString("base64")}`, timestampSeconds };
}

// #11652: the untrusted (default, no `trustedSource` option) path is the
// ONLY entry point request-body JSON can reach. A caller cannot verify their
// own claim of "audio-bridge"/"embedded" provenance, so both self-asserted
// values are reclassified to "client" — only a server-owned adapter passing
// `trustedSource` explicitly (a seam request JSON cannot reach) can produce
// them. This intentionally changes the pre-#11652 behavior, which accepted
// a caller-declared "audio-bridge" source verbatim.
test("accepts only provenance-bearing transcript cues, reclassifies forged provenance, and deduplicates exact repeats", () => {
  const cues = normalizeVideoTranscript(
    {
      cues: [
        { text: "hello", start: 1, end: 3, source: "client", confidence: 0.8 },
        { text: "hello", start: 1, end: 3, source: "client", confidence: 0.8 },
        { text: "world", startSeconds: 3, endSeconds: 5, source: "audio-bridge" },
      ],
    },
    10
  );

  assert.deepEqual(cues, [
    { text: "hello", startSeconds: 1, endSeconds: 3, source: "client", confidence: 0.8 },
    { text: "world", startSeconds: 3, endSeconds: 5, source: "client", confidence: 1 },
  ]);
});

test("rejects untrusted sources, malformed cues, and out-of-range timestamps", () => {
  assert.throws(
    () =>
      normalizeVideoTranscript({ cues: [{ text: "x", start: 1, end: 2, source: "unknown" }] }, 10),
    /source/i
  );
  assert.throws(
    () =>
      normalizeVideoTranscript({ cues: [{ text: "x", start: -1, end: 2, source: "client" }] }, 10),
    /timestamp|range/i
  );
  assert.throws(
    () =>
      normalizeVideoTranscript({ cues: [{ text: "x", start: 4, end: 4, source: "embedded" }] }, 10),
    /timestamp|range/i
  );
  assert.throws(
    () =>
      normalizeVideoTranscript(
        { cues: [{ text: "x", start: 9, end: 11, source: "embedded" }] },
        10
      ),
    /timestamp|range/i
  );
});

// #11652: `part.transcript` is the generic, fully caller-controlled field —
// a cue declaring source: "audio-bridge" there is forged provenance (that
// label is reserved for the dedicated audioTranscript fusion field) and is
// reclassified to "client". Pre-#11652 this asserted the forged label was
// preserved verbatim; that was the exact bug this ticket closes.
test("keeps transcript metadata attached, reclassifies a forged source, and renders a log-safe redacted shadow", async () => {
  const frames: VideoCaptionFrame[] = [
    { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 2 },
    { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 8 },
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
          {
            text: "my secret spoken words",
            start: 1,
            end: 3,
            source: "audio-bridge",
            confidence: 0.9,
          },
        ],
      },
    },
    { frameCount: 2, timeoutMs: 1000 },
    async () => "a scene",
    {
      extractFrames: async () => ({ durationSeconds: 10, frames }),
    }
  );

  assert.equal(described.transcriptCues?.length, 1);
  assert.equal(described.transcriptCues?.[0]?.source, "client");
  assert.match(described.description, /transcript\[source=client;confidence=0\.90/);
  assert.match(described.description, /my secret spoken words/);

  // #12150 P1a: the redacted shadow keeps the cue header (provenance,
  // confidence, interval) and the visual caption, but the cue text itself
  // must never survive — it is a structured-field substitution, not a scan
  // of the flattened text.
  const redacted = described.descriptionRedacted;
  assert.ok(redacted, "expected a redacted shadow when a transcript cue exists");
  assert.match(redacted ?? "", /transcript\[source=client;confidence=0\.90;interval=/);
  assert.match(redacted ?? "", /\[redacted-video-transcript\]/);
  assert.doesNotMatch(redacted ?? "", /my secret spoken words/);
  assert.match(redacted ?? "", /a scene/);
});

test("fuses an explicitly supplied audio-bridge track without starting STT", async () => {
  let captionCalls = 0;
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "audio cue", start: 1, end: 3, source: "audio-bridge" }],
      },
    },
    { frameCount: 1, timeoutMs: 1000 },
    async () => {
      captionCalls += 1;
      return "visual cue";
    },
    {
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [{ dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 2 }],
      }),
    }
  );

  assert.equal(captionCalls, 1);
  assert.equal(described.transcriptCues?.[0]?.source, "audio-bridge");
  assert.match(described.description, /audio cue/);
  assert.deepEqual(described.fusion, {
    audioAvailable: true,
    videoAvailable: true,
    partial: false,
  });
});

test("renders fused video and audio observations in chronological order", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "middle audio", start: 3, end: 4, source: "audio-bridge" }],
      },
    },
    { frameCount: 2, timeoutMs: 1000 },
    async (_frame, timestampSeconds) => `visual at ${timestampSeconds}`,
    {
      extractFrames: async () => ({
        durationSeconds: 6,
        frames: [
          { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 1 },
          { dataUri: "data:image/jpeg;base64,AQ==", timestampSeconds: 5 },
        ],
      }),
    }
  );

  const firstVisual = described.description.indexOf("frame@t=00:01.000 visual at 1");
  const audio = described.description.indexOf("middle audio");
  const secondVisual = described.description.indexOf("frame@t=00:05.000 visual at 5");
  assert.ok(firstVisual >= 0);
  assert.ok(audio > firstVisual);
  assert.ok(secondVisual > audio);
  assert.equal(described.transcriptCues?.[0]?.text, "middle audio");
  assert.deepEqual(described.fusion, {
    audioAvailable: true,
    videoAvailable: true,
    partial: false,
  });
});

// #12150 P1a: the fusion path interleaves transcript cues into
// `renderedObservations` (never the trailing blob), so the redaction must be
// verified separately from the non-fusion trailing-blob path above.
test("redacts a fused audio-transcript cue in the interleaved shadow without disturbing the model-bound description or chronology", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "top secret fused audio", start: 3, end: 4, source: "audio-bridge" }],
      },
    },
    { frameCount: 2, timeoutMs: 1000 },
    async (_frame, timestampSeconds) => `visual at ${timestampSeconds}`,
    {
      extractFrames: async () => ({
        durationSeconds: 6,
        frames: [
          { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 1 },
          { dataUri: "data:image/jpeg;base64,AQ==", timestampSeconds: 5 },
        ],
      }),
    }
  );

  assert.match(described.description, /top secret fused audio/);

  const redacted = described.descriptionRedacted;
  assert.ok(redacted, "expected a redacted shadow when a fused audio cue exists");
  assert.doesNotMatch(redacted ?? "", /top secret fused audio/);
  assert.match(redacted ?? "", /\[redacted-video-transcript\]/);
  // Visual captions must survive untouched in the redacted shadow too.
  assert.match(redacted ?? "", /visual at 1/);
  assert.match(redacted ?? "", /visual at 5/);
  // The redacted render must preserve the exact same chronological
  // interleaving as the model-bound description (same cues, same sort).
  const firstVisual = redacted?.indexOf("visual at 1") ?? -1;
  const placeholder = redacted?.indexOf("[redacted-video-transcript]") ?? -1;
  const secondVisual = redacted?.indexOf("visual at 5") ?? -1;
  assert.ok(firstVisual >= 0);
  assert.ok(placeholder > firstVisual);
  assert.ok(secondVisual > placeholder);
});

test("preserves provided and fused transcript cues without rendering either twice", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      transcript: {
        cues: [
          { text: "provided cue", start: 0.25, end: 0.75, source: "client" },
          { text: "late client cue", start: 4, end: 4.5, source: "client" },
        ],
      },
      audioTranscript: {
        cues: [{ text: "fused cue", start: 2, end: 3, source: "audio-bridge" }],
      },
    },
    { frameCount: 1, timeoutMs: 1000 },
    async () => "visual cue",
    {
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [{ dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 1 }],
      }),
    }
  );

  assert.deepEqual(
    described.transcriptCues?.map((cue) => cue.text),
    ["provided cue", "fused cue", "late client cue"]
  );
  assert.equal(described.description.split("provided cue").length - 1, 1);
  assert.equal(described.description.split("fused cue").length - 1, 1);
  assert.equal(described.description.split("late client cue").length - 1, 1);
  const provided = described.description.indexOf("provided cue");
  const visual = described.description.indexOf("frame@t=00:01.000 visual cue");
  const fused = described.description.indexOf("fused cue");
  const lateProvided = described.description.indexOf("late client cue");
  assert.ok(provided >= 0);
  assert.ok(visual > provided);
  assert.ok(fused > visual);
  assert.ok(lateProvided > fused);
  assert.deepEqual(described.fusion, {
    audioAvailable: true,
    videoAvailable: true,
    partial: false,
  });
});

test("deduplicates an exact cue shared by provided and fused transcript tracks", async () => {
  const sharedCue = {
    confidence: 0.8,
    end: 3,
    source: "audio-bridge" as const,
    start: 2,
    text: "shared audio cue",
  };
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      transcript: { cues: [sharedCue] },
      audioTranscript: { cues: [sharedCue] },
    },
    { frameCount: 1, timeoutMs: 1000 },
    async () => "visual cue",
    {
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [{ dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 1 }],
      }),
    }
  );

  assert.equal(described.transcriptCues?.length, 1);
  assert.equal(described.description.split("shared audio cue").length - 1, 1);
});

// #11652: pre-#11652 this test proved a caller-declared "embedded" source
// survived verbatim from `part.transcript` — exactly the forgery this ticket
// closes. Rewritten to prove the new contract instead: the generic
// `transcript` field always reclassifies a declared "embedded"/"audio-bridge"
// source to "client" (no way to verify the claim), the dedicated
// `audioTranscript` fusion field always forces "audio-bridge" regardless of
// what the caller declared there, and cues that end up overlapping in time
// with identical text across the two channels are reconciled into one cue
// that keeps every contributing source instead of silently dropping one.
test("labels transcript cues by channel and reconciles overlapping cross-channel duplicates with contributing-source metadata", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      transcript: {
        cues: [
          { confidence: 0.8, end: 2, source: "client" as const, start: 1, text: "client-only cue" },
          { confidence: 0.7, end: 4, source: "embedded" as const, start: 3, text: "shared cue" },
        ],
      },
      audioTranscript: {
        cues: [{ confidence: 0.9, end: 4, source: "client" as const, start: 3, text: "shared cue" }],
      },
    },
    { frameCount: 1, timeoutMs: 1000 },
    async () => "visual cue",
    {
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [{ dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 0.5 }],
      }),
    }
  );

  const cues = described.transcriptCues ?? [];
  const clientOnly = cues.find((cue) => cue.text === "client-only cue");
  const shared = cues.find((cue) => cue.text === "shared cue");

  assert.equal(cues.length, 2);
  assert.equal(clientOnly?.source, "client");
  assert.equal(clientOnly?.contributingSources, undefined);
  assert.equal(shared?.source, "audio-bridge");
  assert.deepEqual(shared?.contributingSources, ["client", "audio-bridge"]);
  assert.equal(described.description.split("shared cue").length - 1, 1);
});

test("keeps each successful caption attached to its source-frame timestamp", async (t) => {
  for (const omittedCaption of ["failed", "empty"] as const) {
    await t.test(omittedCaption, async () => {
      const described = await describeVideoPart(
        {
          container: "messages",
          messageIndex: 0,
          partIndex: 0,
          ref: "data:video/mp4;base64,AA==",
          shape: "data_uri_string",
          audioTranscript: {
            cues: [{ text: "audio before last frame", start: 4, end: 4.5, source: "audio-bridge" }],
          },
        },
        { frameCount: 3, timeoutMs: 20_000 },
        async (_frame, timestampSeconds) => {
          if (timestampSeconds === 3) {
            if (omittedCaption === "failed") throw new Error("caption unavailable");
            return "   ";
          }
          return timestampSeconds === 1 ? "first visual" : "last visual";
        },
        {
          extractFrames: async () => ({
            durationSeconds: 6,
            frames: [
              { dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 1 },
              { dataUri: "data:image/jpeg;base64,AQ==", timestampSeconds: 3 },
              { dataUri: "data:image/jpeg;base64,Ag==", timestampSeconds: 5 },
            ],
          }),
        }
      );

      const firstVisual = described.description.indexOf("frame@t=00:01.000 first visual");
      const audio = described.description.indexOf("audio before last frame");
      const lastVisual = described.description.indexOf("frame@t=00:05.000 last visual");
      assert.ok(firstVisual >= 0);
      assert.ok(audio > firstVisual);
      assert.ok(lastVisual > audio);
      assert.equal(described.framesUsed, 2);
    });
  }
});

test("uses the full contact-sheet timestamp range for fusion ordering", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      contactSheet: true,
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "shorter audio", start: 1, end: 7, source: "audio-bridge" }],
      },
    },
    { frameCount: 3, timeoutMs: 20_000 },
    async () => "whole contact sheet",
    {
      extractFrames: async () => ({
        durationSeconds: 10,
        frames: [
          await jpegFrame("red", 1),
          await jpegFrame("green", 5),
          await jpegFrame("blue", 9),
        ],
      }),
    }
  );

  assert.equal(described.contactSheetUsed, true);
  const audio = described.description.indexOf("shorter audio");
  const contactSheet = described.description.indexOf("whole contact sheet");
  assert.ok(audio >= 0);
  assert.ok(contactSheet > audio);
});

test("derives the contact-sheet interval from minimum and maximum timestamps", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      contactSheet: true,
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "late audio", start: 8, end: 8.5, source: "audio-bridge" }],
      },
    },
    { frameCount: 3, timeoutMs: 20_000 },
    async () => "unordered contact sheet",
    {
      extractFrames: async () => ({
        durationSeconds: 10,
        frames: [
          await jpegFrame("blue", 9),
          await jpegFrame("red", 1),
          await jpegFrame("green", 5),
        ],
      }),
    }
  );

  assert.equal(described.contactSheetUsed, true);
  const contactSheet = described.description.indexOf("unordered contact sheet");
  const audio = described.description.indexOf("late audio");
  assert.ok(contactSheet >= 0);
  assert.ok(audio > contactSheet);
});

test("an invalid audioTranscript degrades to a partial fusion and keeps the visual description", async () => {
  const described = await describeVideoPart(
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
      audioTranscript: {
        cues: [{ text: "late cue", start: 1, end: 99, source: "audio-bridge" }],
      },
    },
    { frameCount: 1, timeoutMs: 1000 },
    async () => "visual cue",
    {
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [{ dataUri: "data:image/jpeg;base64,AA==", timestampSeconds: 2 }],
      }),
    }
  );

  assert.match(described.description, /visual cue/);
  assert.equal(described.transcriptCues, undefined, "invalid audio must not add transcript cues");
  assert.deepEqual(described.fusion, {
    audioAvailable: false,
    videoAvailable: true,
    partial: true,
    failures: { audio: "FAILED" },
  });
});
