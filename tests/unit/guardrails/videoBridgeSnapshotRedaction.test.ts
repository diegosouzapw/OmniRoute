// #12150 P2 surface 1 (the dominant transcript-retention leak): pure-helper coverage for
// redactVideoTranscriptFieldsForLog — the structured redaction applied to the RAW
// client-request snapshot (clientRawRequest.body) before it is persisted by
// reqLogger.logClientRawRequest (open-sse/handlers/chatCore.ts). See
// src/lib/guardrails/videoBridgeSnapshotRedaction.ts for the full design rationale
// (deliberately dependency-light; field-presence match rather than a shape allowlist).
import assert from "node:assert/strict";
import test from "node:test";

import {
  redactVideoTranscriptFieldsForLog,
  redactPendingBody,
} from "../../../src/lib/guardrails/videoBridgeSnapshotRedaction.ts";
// Heavy import is fine here (test only, never in the production module under test) — used
// solely to prove the local placeholder literal never drifts from the canonical P1 constant.
import { VIDEO_TRANSCRIPT_REDACTION_PLACEHOLDER } from "../../../src/lib/guardrails/videoBridgeHelpers.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value as JsonRecord;
}

function contentAt(
  body: unknown,
  container: "messages" | "input",
  messageIndex: number
): JsonRecord[] {
  const messages = asRecord(body)[container] as JsonRecord[];
  return messages[messageIndex].content as JsonRecord[];
}

test("redacts transcript and audioTranscript directly on a video part (messages container)", () => {
  const body = {
    model: "gpt-x",
    messages: [
      { role: "system", content: "sys" },
      {
        role: "user",
        content: [
          { type: "text", text: "look at this video" },
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: "secret words", startSeconds: 0, endSeconds: 2 }] },
            audioTranscript: { cues: [{ text: "audio secret", startSeconds: 0, endSeconds: 1 }] },
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  assert.notEqual(result, body, "must return a new structure, not the same reference");

  const videoPart = contentAt(result, "messages", 1)[1];
  assert.equal(videoPart.transcript, "[redacted-video-transcript]");
  assert.equal(videoPart.audioTranscript, "[redacted-video-transcript]");
  // The video ref itself and the sibling non-video part must survive untouched.
  assert.equal(videoPart.video_url, "https://example.com/clip.mp4");
  assert.equal(contentAt(result, "messages", 1)[0].text, "look at this video");
  assert.equal(asRecord(result).messages, asRecord(result).messages); // sanity: still an array

  const serialized = JSON.stringify(result);
  assert.ok(!serialized.includes("secret words"), "raw video transcript must not survive");
  assert.ok(!serialized.includes("audio secret"), "raw audio transcript must not survive");
});

test("redacts a transcript nested under the video_url sub-object", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "video_url",
            video_url: {
              url: "https://example.com/nested.mp4",
              transcript: { cues: [{ text: "nested secret" }] },
            },
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  const part = contentAt(result, "messages", 0)[0];
  const videoUrl = part.video_url as JsonRecord;
  assert.equal(videoUrl.transcript, "[redacted-video-transcript]");
  assert.equal(videoUrl.url, "https://example.com/nested.mp4");
  assert.ok(!JSON.stringify(result).includes("nested secret"));
});

test("redacts a transcript nested under the source sub-object (video_source shape)", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "video_source",
            source: {
              type: "url",
              url: "https://example.com/source.mp4",
              audioTranscript: { cues: [{ text: "source secret" }] },
            },
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  const part = contentAt(result, "messages", 0)[0];
  const source = part.source as JsonRecord;
  assert.equal(source.audioTranscript, "[redacted-video-transcript]");
  assert.equal(source.url, "https://example.com/source.mp4");
  assert.ok(!JSON.stringify(result).includes("source secret"));
});

test("covers the input container (Responses API shape)", () => {
  const body = {
    model: "gpt-x",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "https://example.com/input.mp4",
            transcript: { cues: [{ text: "input secret" }] },
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  const part = contentAt(result, "input", 0)[0];
  assert.equal(part.transcript, "[redacted-video-transcript]");
  assert.ok(!JSON.stringify(result).includes("input secret"));
});

test("does not mutate the input", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: "secret words" }] },
            audioTranscript: { cues: [{ text: "audio secret" }] },
          },
        ],
      },
    ],
  };
  const before = JSON.parse(JSON.stringify(body));

  redactVideoTranscriptFieldsForLog(body);

  assert.deepEqual(body, before, "input object must be byte-identical after the call");
});

test("a non-video body is returned unchanged", () => {
  const body = {
    model: "gpt-x",
    messages: [
      { role: "system", content: "sys" },
      { role: "user", content: "hello, no video here" },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  assert.deepEqual(result, body);
});

test("a body with a video part but no transcript field is unchanged", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: "https://example.com/no-transcript.mp4" }],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  assert.deepEqual(result, body);
});

test("the redaction placeholder matches the canonical P1 constant (no drift)", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "input_video", video_url: "https://example.com/clip.mp4", transcript: "raw" },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  const part = contentAt(result, "messages", 0)[0];
  assert.equal(part.transcript, VIDEO_TRANSCRIPT_REDACTION_PLACEHOLDER);
});

// #12430 item 6 (P2c): the sibling in-memory leak. `trackPendingRequest`
// (open-sse/handlers/chatCore.ts) stores the same raw client body under
// `clientRequest`, live-exposed via /api/usage/call-logs (pendingDetails),
// /api/logs/[id] and /api/conversations while the request is in-flight. This
// helper is the guarded call-site wrapper chatCore.ts uses, mirroring
// logClientRawRequestRedacted's observed/non-observed branching.
test("redactPendingBody: observed=true delegates to redactVideoTranscriptFieldsForLog", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: "pending secret" }] },
          },
        ],
      },
    ],
  };

  const result = redactPendingBody(body, true);
  assert.notEqual(
    result,
    body,
    "observed path must return a new structure, not the same reference"
  );
  const part = contentAt(result, "messages", 0)[0];
  assert.equal(part.transcript, VIDEO_TRANSCRIPT_REDACTION_PLACEHOLDER);
  assert.ok(!JSON.stringify(result).includes("pending secret"));
  assert.deepEqual(result, redactVideoTranscriptFieldsForLog(body));
});

test("redactPendingBody: observed=false returns the SAME reference unchanged", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: "not observed" }] },
          },
        ],
      },
    ],
  };

  const result = redactPendingBody(body, false);
  assert.equal(result, body, "non-observed path must return the exact same reference");
});
