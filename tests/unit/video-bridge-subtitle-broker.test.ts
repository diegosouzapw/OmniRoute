import assert from "node:assert/strict";
import test from "node:test";

import {
  handleVideoExtractionBrokerRequest,
} from "../../src/app/api/modality-bridge/video/extract/route.ts";
import {
  buildVideoBridgeBrokerHeaders,
  currentVideoBridgeBrokerFingerprint,
} from "../../src/lib/guardrails/videoBridgeBrokerAuth.ts";
import { createVideoExtractionQueue } from "../../src/lib/guardrails/videoBridgeBrokerQueue.ts";
import { extractVideoSubtitlesViaBroker } from "../../src/lib/guardrails/videoBridgeBrokerClient.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers.ts";

const EXTRACT_PATH = "/api/modality-bridge/video/extract";

function trustedSubtitleRequest(signal?: AbortSignal): Request {
  return new Request(`http://localhost${EXTRACT_PATH}?subtitles=1`, {
    method: "POST",
    headers: {
      ...buildVideoBridgeBrokerHeaders(),
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      "Content-Type": "application/octet-stream",
    },
    body: Buffer.from("video"),
    signal,
  });
}

test("subtitle probe route requires the same loopback broker identity as the frame path", async () => {
  const response = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?subtitles=1`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: Buffer.from("video"),
    })
  );
  assert.equal(response.status, 403);
});

test("subtitle probe route rejects any extra query parameter", async () => {
  const response = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?subtitles=1&frames=2`, {
      method: "POST",
      headers: {
        ...buildVideoBridgeBrokerHeaders(),
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from("video"),
    })
  );
  assert.equal(response.status, 400);
});

test("subtitle probe route stamps the shared broker fingerprint on a successful extraction", async () => {
  const response = await handleVideoExtractionBrokerRequest(trustedSubtitleRequest(), {
    extractSubtitles: async () => ({ durationSeconds: 5, formatName: "mp4", streams: [] }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.fingerprint, currentVideoBridgeBrokerFingerprint());
  assert.deepEqual(body.streams, []);
});

test("subtitle probe route maps queue capacity and client-abort to the same statuses as the frame path", async () => {
  const neverExtract = async () => {
    throw new Error("extractor must not run");
  };

  const capacity = await handleVideoExtractionBrokerRequest(trustedSubtitleRequest(), {
    queue: createVideoExtractionQueue({ concurrency: 1, maxPending: 0, maxQueuedBytes: 1 }),
    extractSubtitles: neverExtract,
  });
  assert.equal(capacity.status, 503);
  assert.equal(capacity.headers.get("Retry-After"), "1");

  const clientController = new AbortController();
  clientController.abort();
  const clientAbort = await handleVideoExtractionBrokerRequest(
    trustedSubtitleRequest(clientController.signal),
    { extractSubtitles: neverExtract }
  );
  assert.equal(clientAbort.status, 499);

  const deadline = await handleVideoExtractionBrokerRequest(trustedSubtitleRequest(), {
    deadlineSignal: AbortSignal.abort(),
    extractSubtitles: neverExtract,
  });
  assert.equal(deadline.status, 504);
});

// ─── extractVideoSubtitlesViaBroker: transport + envelope Zod validation ───

test("client broker call sends the subtitles=1 marker and no other query parameters", async () => {
  let requestedUrl = "";
  await extractVideoSubtitlesViaBroker(
    Buffer.from("video"),
    { timeoutMs: 5_000 },
    {
      fetchImpl: async (input) => {
        requestedUrl = String(input);
        return Response.json({
          durationSeconds: 4,
          fingerprint: currentVideoBridgeBrokerFingerprint(),
          formatName: "mp4",
          streams: [],
        });
      },
    }
  );
  const parsed = new URL(requestedUrl);
  assert.equal(parsed.searchParams.get("subtitles"), "1");
  assert.equal([...parsed.searchParams.keys()].length, 1);
});

test("client broker call rejects an envelope with an unsupported codec name", async () => {
  await assert.rejects(
    () =>
      extractVideoSubtitlesViaBroker(
        Buffer.from("video"),
        { timeoutMs: 5_000 },
        {
          fetchImpl: async () =>
            Response.json({
              durationSeconds: 4,
              fingerprint: currentVideoBridgeBrokerFingerprint(),
              formatName: "mp4",
              streams: [{ codecName: "ass", streamIndex: 0, webvtt: "WEBVTT\n\n" }],
            }),
        }
      ),
    /invalid subtitle metadata/
  );
});

test("client broker call rejects a response missing the fingerprint field", async () => {
  await assert.rejects(
    () =>
      extractVideoSubtitlesViaBroker(
        Buffer.from("video"),
        { timeoutMs: 5_000 },
        {
          fetchImpl: async () =>
            Response.json({ durationSeconds: 4, formatName: "mp4", streams: [] }),
        }
      ),
    /invalid subtitle metadata/
  );
});

test("client broker call rejects more than two streams", async () => {
  const streams = Array.from({ length: 3 }, (_unused, index) => ({
    codecName: "webvtt" as const,
    streamIndex: index,
    webvtt: "WEBVTT\n\n",
  }));
  await assert.rejects(
    () =>
      extractVideoSubtitlesViaBroker(
        Buffer.from("video"),
        { timeoutMs: 5_000 },
        {
          fetchImpl: async () =>
            Response.json({
              durationSeconds: 4,
              fingerprint: currentVideoBridgeBrokerFingerprint(),
              formatName: "mp4",
              streams,
            }),
        }
      ),
    /invalid subtitle metadata/
  );
});
