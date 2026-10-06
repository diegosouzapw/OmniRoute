import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateFrameTimestamps,
  calculateSamplingDecision,
  resolveVideoFocusWindow,
} from "../../../src/lib/guardrails/videoBridgeRuntime.ts";
import {
  describeVideoPart,
  extractVideoParts,
} from "../../../src/lib/guardrails/videoBridgeHelpers.ts";

test("focus windows are optional and do not change the default uniform sampler", () => {
  assert.equal(resolveVideoFocusWindow(10, {}), null);
  assert.deepEqual(calculateFrameTimestamps(10, 2), [2.5, 7.5]);
  assert.deepEqual(calculateSamplingDecision(10, 2, "uniform").timestamps, [2.5, 7.5]);
});

test("focus windows clamp finite bounds to the validated duration", () => {
  assert.deepEqual(resolveVideoFocusWindow(10, { startSeconds: -2, endSeconds: 14 }), {
    endSeconds: 10,
    startSeconds: 0,
  });
});

test("focus windows reject non-finite and reversed bounds", () => {
  assert.throws(() => resolveVideoFocusWindow(10, { startSeconds: Number.NaN }), /focus window/i);
  assert.throws(
    () => resolveVideoFocusWindow(10, { startSeconds: 8, endSeconds: 2 }),
    /focus window/i
  );
  assert.throws(
    () => resolveVideoFocusWindow(10, { startSeconds: 4, endSeconds: 4 }),
    /focus window/i
  );
});

test("focused sampling stays inside the requested interval", () => {
  const focus = resolveVideoFocusWindow(10, { startSeconds: 2, endSeconds: 8 });
  assert.ok(focus);
  const decision = calculateSamplingDecision(10, 4, "uniform", [], focus);
  assert.deepEqual(decision.timestamps, [2.75, 4.25, 5.75, 7.25]);
  assert.ok(decision.timestamps.every((timestamp) => timestamp >= 2 && timestamp < 8));
});

test("focus metadata is read from a video URL object and marked in the description", async () => {
  const parts = extractVideoParts({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "video_url",
            video_url: { end: 8, start: 2, url: "https://cdn.example/video.mp4" },
          },
        ],
      },
    ],
  });
  assert.deepEqual(parts[0].focusWindow, { endSeconds: 8, startSeconds: 2 });

  let receivedFocus: unknown;
  const described = await describeVideoPart(
    parts[0],
    { frameCount: 2, focusWindow: parts[0].focusWindow, timeoutMs: 5_000 },
    async () => "a focused frame",
    {
      fetchRemote: async () => ({
        buffer: Buffer.from("video"),
        contentType: "video/mp4",
        url: "https://cdn.example/video.mp4",
      }),
      extractFrames: async (_bytes, options) => {
        receivedFocus = options.focusWindow;
        return {
          durationSeconds: 10,
          frames: [{ timestampSeconds: 3, dataUri: "data:image/jpeg;base64,QQ==" }],
        };
      },
    }
  );

  assert.deepEqual(receivedFocus, { endSeconds: 8, startSeconds: 2 });
  assert.deepEqual(described.focusWindow, { endSeconds: 8, startSeconds: 2 });
  assert.match(described.description, /focus=00:02\.000-00:08\.000/);
});
