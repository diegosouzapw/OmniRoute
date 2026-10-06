import assert from "node:assert/strict";
import test from "node:test";

import { containsMediaKind, detectMediaParts } from "../../open-sse/utils/mediaParts.ts";

const messages = (content: unknown) => [{ role: "user", content }];

test("detects supported Chat and Responses video blocks without treating plain text as video", () => {
  const detected = detectMediaParts(
    messages([
      { type: "input_video", video_url: "https://media.example/input.mp4" },
      { type: "video_url", video_url: { url: "https://media.example/url.webm" } },
      {
        type: "video_source",
        source: { type: "base64", media_type: "video/mp4", data: "QUJD" },
      },
      { type: "input_text", text: "Please inspect demo.mp4 but do not fetch it." },
    ])
  );

  assert.deepEqual(
    detected.map(({ kind, ref, shape, nested }) => ({ kind, ref, shape, nested })),
    [
      {
        kind: "video",
        ref: "https://media.example/input.mp4",
        shape: "input_video",
        nested: false,
      },
      {
        kind: "video",
        ref: "https://media.example/url.webm",
        shape: "video_url",
        nested: false,
      },
      {
        kind: "video",
        ref: "data:video/mp4;base64,QUJD",
        shape: "video_source",
        nested: false,
      },
    ]
  );
  assert.equal(
    containsMediaKind(messages([{ type: "input_text", text: "demo.mp4" }]), "video"),
    false
  );
  assert.equal(
    containsMediaKind(
      messages([{ type: "input_video", video_url: "data:video/mp4;base64,QUJD" }]),
      "video"
    ),
    true
  );
});
