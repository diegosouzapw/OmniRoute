import assert from "node:assert/strict";
import test from "node:test";

import {
  parseBoundedWebVtt,
  probeEmbeddedVideoSubtitles,
  resolveVideoSubtitleSubdeadlineMs,
  VIDEO_SUBTITLE_SUBDEADLINE_MS,
} from "../../../src/lib/guardrails/videoBridgeSubtitleProbe.ts";
import { currentVideoBridgeBrokerFingerprint } from "../../../src/lib/guardrails/videoBridgeBrokerAuth.ts";
import type { VideoSubtitleBrokerResponse } from "../../../src/lib/guardrails/videoBridgeBrokerClient.ts";

const VALID_WEBVTT = "WEBVTT\n\n00:00:01.000 --> 00:00:04.000\nHello world\n";

function brokerResponse(
  overrides: Partial<VideoSubtitleBrokerResponse> = {}
): VideoSubtitleBrokerResponse {
  return {
    durationSeconds: 10,
    fingerprint: currentVideoBridgeBrokerFingerprint(),
    formatName: "mp4",
    streams: [{ codecName: "webvtt", streamIndex: 3, webvtt: VALID_WEBVTT }],
    ...overrides,
  };
}

// ─── resolveVideoSubtitleSubdeadlineMs ─────────────────────────────────────

test("the 10s subtitle subdeadline is clamped by the remaining request deadline", () => {
  assert.equal(resolveVideoSubtitleSubdeadlineMs(60_000), VIDEO_SUBTITLE_SUBDEADLINE_MS);
  assert.equal(resolveVideoSubtitleSubdeadlineMs(2_000), 2_000);
  assert.equal(resolveVideoSubtitleSubdeadlineMs(-5), 0);
  assert.equal(resolveVideoSubtitleSubdeadlineMs(Number.NaN), VIDEO_SUBTITLE_SUBDEADLINE_MS);
});

// ─── parseBoundedWebVtt ─────────────────────────────────────────────────────

test("parses a well-formed WebVTT cue, stripping tags and joining wrapped lines", () => {
  const cues = parseBoundedWebVtt(
    "WEBVTT\n\n1\n00:00:01.500 --> 00:00:03.250\n<b>Hello</b>\nworld\n",
    10
  );
  assert.deepEqual(cues, [{ endSeconds: 3.25, startSeconds: 1.5, text: "Hello world" }]);
});

test("returns no cues for text missing the WEBVTT magic header", () => {
  assert.deepEqual(parseBoundedWebVtt("00:00:01.000 --> 00:00:02.000\nnot really vtt\n", 10), []);
});

test("drops a cue whose end does not exceed its start, or whose start is beyond the duration", () => {
  const backwards = parseBoundedWebVtt("WEBVTT\n\n00:00:05.000 --> 00:00:02.000\ntext\n", 10);
  assert.deepEqual(backwards, []);
  const beyondDuration = parseBoundedWebVtt("WEBVTT\n\n00:00:20.000 --> 00:00:22.000\ntext\n", 10);
  assert.deepEqual(beyondDuration, []);
});

test("drops a cue containing the UTF-8 replacement character (invalid encoding)", () => {
  const cues = parseBoundedWebVtt(
    "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\ncorrupted � text\n",
    10
  );
  assert.deepEqual(cues, []);
});

test("drops a cue with an individual line beyond the 4096 code-unit bound", () => {
  const oversizedLine = "a".repeat(4_097);
  const cues = parseBoundedWebVtt(`WEBVTT\n\n00:00:01.000 --> 00:00:02.000\n${oversizedLine}\n`, 10);
  assert.deepEqual(cues, []);
});

test("multiple cues come back sorted by start time regardless of source order", () => {
  const cues = parseBoundedWebVtt(
    "WEBVTT\n\n00:00:05.000 --> 00:00:06.000\nsecond\n\n00:00:01.000 --> 00:00:02.000\nfirst\n",
    10
  );
  assert.deepEqual(
    cues.map((cue) => cue.text),
    ["first", "second"]
  );
});

test("a cue identifier line before the timing line is tolerated", () => {
  const cues = parseBoundedWebVtt("WEBVTT\n\ncue-1\n00:00:01.000 --> 00:00:02.000\ntext\n", 10);
  assert.equal(cues.length, 1);
});

// ─── probeEmbeddedVideoSubtitles: outcome contract ─────────────────────────

test("valid: a single verified stream with usable cues yields a cacheable success outcome", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse() }
  );
  assert.equal(outcome.outcome, "success");
  assert.equal(outcome.cacheable, true);
  if (outcome.outcome === "success") {
    assert.deepEqual(outcome.cues, [
      { confidence: 1, endSeconds: 4, source: "embedded", startSeconds: 1, text: "Hello world" },
    ]);
  }
});

test("absent: the broker finds zero allowlisted subtitle streams", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse({ streams: [] }) }
  );
  assert.deepEqual(outcome, { cacheable: true, outcome: "absent" });
});

test("absent: a structurally read stream that yields zero usable cues after parsing", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    {
      probeBroker: async () =>
        brokerResponse({
          streams: [{ codecName: "subrip", streamIndex: 2, webvtt: "WEBVTT\n\n" }],
        }),
    }
  );
  assert.deepEqual(outcome, { cacheable: true, outcome: "absent" });
});

test("malformed: a single stream whose WebVTT never yields a valid cue is not cacheable success/absent confusion", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    {
      probeBroker: async () =>
        brokerResponse({
          streams: [{ codecName: "webvtt", streamIndex: 1, webvtt: "not webvtt at all" }],
        }),
    }
  );
  // Structurally garbage content is treated the same as "no usable subtitles" (stable fact,
  // safe to cache) rather than a transient/infra failure — it will not resolve on retry.
  assert.deepEqual(outcome, { cacheable: true, outcome: "absent" });
});

test("oversized: a broker response exceeding the client-side WebVTT length bound is a transient failure", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    {
      probeBroker: async () => {
        throw new Error("Video extraction broker returned invalid subtitle metadata");
      },
    }
  );
  assert.equal(outcome.outcome, "transient_failure");
  assert.equal(outcome.cacheable, false);
});

test("invalid encoding: a corrupted cue is dropped but a clean cue in the same stream still succeeds", async () => {
  const webvtt =
    "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\ncorrupted � text\n\n00:00:03.000 --> 00:00:04.000\nclean text\n";
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse({ streams: [{ codecName: "webvtt", streamIndex: 1, webvtt }] }) }
  );
  assert.equal(outcome.outcome, "success");
  if (outcome.outcome === "success") {
    assert.equal(outcome.cues.length, 1);
    assert.equal(outcome.cues[0].text, "clean text");
  }
});

test("timeout: the broker never resolves within the (shrunk) subdeadline, resolving to transient_failure", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 10 },
    {
      // Simulates what extractVideoSubtitlesViaBroker does internally with
      // AbortSignal.timeout(options.timeoutMs): the real transport rejects once its own
      // internal timer elapses, independent of whether the caller's own signal ever fires.
      probeBroker: (_bytes, options) =>
        new Promise((_resolve, reject) => {
          const timer = setTimeout(
            () => reject(new Error("Video extraction request aborted")),
            options.timeoutMs
          );
          options.signal?.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new Error("Video extraction request aborted"));
          });
        }),
    }
  );
  assert.equal(outcome.outcome, "transient_failure");
  assert.equal(outcome.cacheable, false);
});

test("abort: a caller-driven abort propagates as a rejection instead of a resolved outcome", async () => {
  const controller = new AbortController();
  const pending = probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000, signal: controller.signal },
    {
      probeBroker: (_bytes, options) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener("abort", () => reject(new Error("aborted")));
        }),
    }
  );
  controller.abort();
  await assert.rejects(() => pending);
});

test("abort: an already-aborted signal rejects before the broker is ever called", async () => {
  const controller = new AbortController();
  controller.abort();
  let called = false;
  await assert.rejects(() =>
    probeEmbeddedVideoSubtitles(
      Buffer.from("video"),
      { requestDeadlineRemainingMs: 30_000, signal: controller.signal },
      {
        probeBroker: async () => {
          called = true;
          return brokerResponse();
        },
      }
    )
  );
  assert.equal(called, false);
});

test("multi-stream selection: the first stream without usable cues is skipped in favor of the second", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    {
      probeBroker: async () =>
        brokerResponse({
          streams: [
            { codecName: "webvtt", streamIndex: 1, webvtt: "WEBVTT\n\n" },
            {
              codecName: "subrip",
              streamIndex: 4,
              webvtt: "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nsecond stream wins\n",
            },
          ],
        }),
    }
  );
  assert.equal(outcome.outcome, "success");
  if (outcome.outcome === "success") {
    assert.equal(outcome.cues[0].text, "second stream wins");
  }
});

test("broker forgery: a response with a mismatched fingerprint never yields embedded provenance", async () => {
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse({ fingerprint: "00000000-0000-0000-0000-000000000000" }) }
  );
  assert.equal(outcome.outcome, "transient_failure");
  assert.equal(outcome.cacheable, false);
  assert.equal("cues" in outcome, false);
});

test("broker forgery: a response missing the fingerprint field entirely is rejected the same way", async () => {
  const forged = brokerResponse() as unknown as Record<string, unknown>;
  delete forged.fingerprint;
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => forged as unknown as VideoSubtitleBrokerResponse }
  );
  assert.equal(outcome.outcome, "transient_failure");
});

test("cache poisoning guard: every transient_failure carries cacheable:false; success/absent carry true", async () => {
  const success = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse() }
  );
  const absent = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    { probeBroker: async () => brokerResponse({ streams: [] }) }
  );
  const transient = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 30_000 },
    {
      probeBroker: async () => {
        throw new Error("broker unavailable");
      },
    }
  );
  assert.equal(success.cacheable, true);
  assert.equal(absent.cacheable, true);
  assert.equal(transient.cacheable, false);
});

test("deadline already exhausted before the broker is called resolves to a transient failure, not a hang", async () => {
  let called = false;
  const outcome = await probeEmbeddedVideoSubtitles(
    Buffer.from("video"),
    { requestDeadlineRemainingMs: 0 },
    {
      probeBroker: async () => {
        called = true;
        return brokerResponse();
      },
    }
  );
  assert.equal(outcome.outcome, "transient_failure");
  assert.equal(called, false);
});
