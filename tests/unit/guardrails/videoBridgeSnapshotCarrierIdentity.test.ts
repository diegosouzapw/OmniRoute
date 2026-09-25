import assert from "node:assert/strict";
import test from "node:test";

import { redactVideoTranscriptFieldsForLog } from "../../../src/lib/guardrails/videoBridgeSnapshotRedaction.ts";

test("snapshot redaction preserves generic transcript fields beside a recognized video", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "https://example.com/clip.mp4",
            transcript: { cues: [{ text: "video-private-sentinel" }] },
          },
          {
            type: "text",
            text: "ordinary metadata",
            transcript: "generic-text-sentinel",
            audioTranscript: "generic-audio-sentinel",
            source: { transcript: "generic-source-sentinel" },
          },
          {
            type: "input_audio",
            input_audio: { data: "audio-payload" },
            transcript: "generic-audio-part-sentinel",
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body);
  const content = (result as typeof body).messages[0].content;
  assert.equal(content[0].transcript, "[redacted-video-transcript]");
  assert.equal(content[1].transcript, "generic-text-sentinel");
  assert.equal(content[1].audioTranscript, "generic-audio-sentinel");
  assert.equal(content[1].source.transcript, "generic-source-sentinel");
  assert.equal(content[2].transcript, "generic-audio-part-sentinel");
  assert.equal(body.messages[0].content[0].transcript.cues[0].text, "video-private-sentinel");
});

test("snapshot redaction keeps explicit malformed video cues protected", () => {
  const body = {
    input: [
      {
        role: "user",
        content: [
          { type: "input_video", video_url: "", transcript: "malformed-video-sentinel" },
          { type: "text", transcript: "unrelated-sentinel" },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body) as typeof body;
  assert.equal(result.input[0].content[0].transcript, "[redacted-video-transcript]");
  assert.equal(result.input[0].content[1].transcript, "unrelated-sentinel");
});

test("snapshot redaction protects an implicit video-source MIME carrier", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            source: {
              media_type: "video/mp4",
              data: "video-payload",
              transcript: "source-video-sentinel",
            },
            transcript: "outer-video-sentinel",
          },
        ],
      },
    ],
  };

  const result = redactVideoTranscriptFieldsForLog(body) as typeof body;
  const part = result.messages[0].content[0];
  assert.equal(part.transcript, "[redacted-video-transcript]");
  assert.equal(part.source.transcript, "[redacted-video-transcript]");
  assert.equal(part.source.media_type, "video/mp4");
});
