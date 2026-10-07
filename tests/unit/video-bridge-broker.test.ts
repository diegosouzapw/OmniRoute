import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";

import {
  VIDEO_BRIDGE_BROKER_PATH,
  buildVideoBridgeBrokerHeaders,
  extractVideoAudioViaBroker,
  extractVideoFramesViaBroker,
  isVideoBridgeBrokerInternalRequest,
  resolveVideoBridgeBrokerBaseUrl,
} from "../../src/lib/guardrails/videoBridgeBrokerClient.ts";
import { createVideoExtractionQueue } from "../../src/lib/guardrails/videoBridgeBrokerQueue.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers.ts";
import {
  BROKER_TIMEOUT_MS,
  handleVideoExtractionBrokerRequest,
} from "../../src/app/api/modality-bridge/video/extract/route.ts";

const EXTRACT_PATH = "/api/modality-bridge/video/extract";

test("broker origin is pinned to the active loopback listener and ignores client-controlled origins", () => {
  const previousPort = process.env.PORT;
  const previousScheme = process.env.OMNIROUTE_INTERNAL_SCHEME;
  process.env.PORT = "21128";
  delete process.env.OMNIROUTE_INTERNAL_SCHEME;
  try {
    assert.equal(
      resolveVideoBridgeBrokerBaseUrl("https://attacker.example/v1"),
      "http://127.0.0.1:21128"
    );
  } finally {
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
    if (previousScheme === undefined) delete process.env.OMNIROUTE_INTERNAL_SCHEME;
    else process.env.OMNIROUTE_INTERNAL_SCHEME = previousScheme;
  }
});

test("broker authentication is exact-path, token-bound, and trusted-loopback only", () => {
  const headers = new Headers({
    ...buildVideoBridgeBrokerHeaders(),
    [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
  });
  const trusted = new Request(`http://localhost${VIDEO_BRIDGE_BROKER_PATH}`, {
    method: "POST",
    headers,
  });
  assert.equal(isVideoBridgeBrokerInternalRequest(trusted, VIDEO_BRIDGE_BROKER_PATH), true);

  const remote = new Request(`http://localhost${VIDEO_BRIDGE_BROKER_PATH}`, {
    method: "POST",
    headers: buildVideoBridgeBrokerHeaders(),
  });
  assert.equal(isVideoBridgeBrokerInternalRequest(remote, VIDEO_BRIDGE_BROKER_PATH), false);
  assert.equal(
    isVideoBridgeBrokerInternalRequest(trusted, "/api/modality-bridge/video/runtime"),
    false
  );
});

test("broker client sends only bounded bytes and fixed parameters to the pinned route", async () => {
  let requestedUrl = "";
  let requestedInit: RequestInit | undefined;
  const response = await extractVideoFramesViaBroker(
    Buffer.from("safe-video"),
    { frameCount: 2, timeoutMs: 5_000 },
    {
      fetchImpl: async (input, init) => {
        requestedUrl = String(input);
        requestedInit = init;
        return Response.json({
          durationSeconds: 4,
          frames: [
            { timestampSeconds: 1, dataUri: "data:image/jpeg;base64,QQ==" },
            { timestampSeconds: 3, dataUri: "data:image/jpeg;base64,Qg==" },
          ],
        });
      },
    }
  );

  assert.match(requestedUrl, /\/api\/modality-bridge\/video\/extract\?frames=2$/);
  assert.equal(new URL(requestedUrl).hostname, "127.0.0.1");
  assert.equal(requestedInit?.method, "POST");
  assert.equal(
    (requestedInit?.headers as Record<string, string>)["Content-Type"],
    "application/octet-stream"
  );
  assert.equal(
    (requestedInit?.headers as Record<string, string>)["Content-Length"],
    undefined,
    "the Fetch implementation must calculate Content-Length for the Buffer body"
  );
  assert.deepEqual(Buffer.from(requestedInit?.body as Uint8Array), Buffer.from("safe-video"));
  assert.equal(response.frames.length, 2);
});

test("broker carries the explicit scene-aware policy and preserves effective fallback metadata", async () => {
  let requestedUrl = "";
  const response = await extractVideoFramesViaBroker(
    Buffer.from("safe-video"),
    {
      focusWindow: { endSeconds: 8, startSeconds: 2 },
      frameCount: 2,
      samplingPolicy: "scene_aware",
      timeoutMs: 5_000,
    },
    {
      fetchImpl: async (input) => {
        requestedUrl = String(input);
        return Response.json({
          durationSeconds: 4,
          frames: [{ timestampSeconds: 1, dataUri: "data:image/jpeg;base64,QQ==" }],
          sampling: {
            candidateCount: 0,
            policyEffective: "uniform",
            policyRequested: "scene_aware",
          },
        });
      },
    }
  );

  assert.equal(new URL(requestedUrl).searchParams.get("samplingPolicy"), "scene_aware");
  assert.equal(new URL(requestedUrl).searchParams.get("start"), "2");
  assert.equal(new URL(requestedUrl).searchParams.get("end"), "8");
  assert.deepEqual(response.sampling, {
    candidateCount: 0,
    policyEffective: "uniform",
    policyRequested: "scene_aware",
  });
});

test("default broker transport lets Node calculate the Buffer content length", async () => {
  const previousPort = process.env.PORT;
  const previousOmniRoutePort = process.env.OMNIROUTE_PORT;
  const previousDashboardPort = process.env.DASHBOARD_PORT;
  const videoBytes = Buffer.from("safe-video");
  let receivedBody = Buffer.alloc(0);
  let receivedLength = "";
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      receivedBody = Buffer.concat(chunks);
      receivedLength = request.headers["content-length"] ?? "";
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({
          durationSeconds: 1,
          frames: [{ timestampSeconds: 0.5, dataUri: "data:image/jpeg;base64,QQ==" }],
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  delete process.env.OMNIROUTE_PORT;
  delete process.env.DASHBOARD_PORT;
  process.env.PORT = String(address.port);

  try {
    const result = await extractVideoFramesViaBroker(videoBytes, {
      frameCount: 1,
      timeoutMs: 5_000,
    });
    assert.equal(result.frames.length, 1);
    assert.deepEqual(receivedBody, videoBytes);
    assert.equal(receivedLength, String(videoBytes.byteLength));
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
    if (previousOmniRoutePort === undefined) delete process.env.OMNIROUTE_PORT;
    else process.env.OMNIROUTE_PORT = previousOmniRoutePort;
    if (previousDashboardPort === undefined) delete process.env.DASHBOARD_PORT;
    else process.env.DASHBOARD_PORT = previousDashboardPort;
  }
});

test("broker client cancels an unbounded response stream before it can exceed the cap", async () => {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(Buffer.from("1234"));
      controller.enqueue(Buffer.from("5"));
    },
    cancel() {
      cancelled = true;
    },
  });
  await assert.rejects(
    () =>
      extractVideoFramesViaBroker(
        Buffer.from("safe-video"),
        { frameCount: 1, timeoutMs: 5_000 },
        {
          fetchImpl: async () => new Response(body),
          maxResponseBytes: 4,
        }
      ),
    /response exceeded its byte limit/
  );
  assert.equal(cancelled, true);
});

test("broker queue bounds pending jobs and queued bytes", async () => {
  const queue = createVideoExtractionQueue({ concurrency: 1, maxPending: 1, maxQueuedBytes: 8 });
  let release!: () => void;
  const active = queue.run(4, () => new Promise<void>((resolve) => (release = resolve)));
  const pending = queue.run(8, async () => undefined);
  await assert.rejects(() => queue.run(1, async () => undefined), /queue capacity/);
  release();
  await Promise.all([active, pending]);
});

test("audio broker client requests mode=audio on the exact same pinned route", async () => {
  let requestedUrl = "";
  let requestedInit: RequestInit | undefined;
  const response = await extractVideoAudioViaBroker(
    Buffer.from("safe-video"),
    { timeoutMs: 5_000 },
    {
      fetchImpl: async (input, init) => {
        requestedUrl = String(input);
        requestedInit = init;
        return Response.json({
          audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
          durationSeconds: 4,
        });
      },
    }
  );

  assert.match(requestedUrl, /\/api\/modality-bridge\/video\/extract\?mode=audio$/);
  assert.equal(new URL(requestedUrl).hostname, "127.0.0.1");
  assert.equal(requestedInit?.method, "POST");
  assert.deepEqual(Buffer.from(requestedInit?.body as Uint8Array), Buffer.from("safe-video"));
  assert.equal(response.durationSeconds, 4);
  assert.deepEqual(response.audio, {
    channels: 1,
    dataUri: "data:audio/wav;base64,UklGRg==",
    sampleRateHz: 16000,
  });
});

test("audio broker client rejects a malformed or non-WAV response instead of trusting it", async () => {
  await assert.rejects(
    () =>
      extractVideoAudioViaBroker(
        Buffer.from("safe-video"),
        { timeoutMs: 5_000 },
        {
          fetchImpl: async () =>
            Response.json({
              audio: { channels: 1, dataUri: "data:image/jpeg;base64,QQ==", sampleRateHz: 16000 },
              durationSeconds: 4,
            }),
        }
      ),
    /invalid metadata/
  );
});

test("broker route enforces the exact same queue-capacity contract for the audio operation as for frames", async () => {
  // maxPending: 0 rejects every run() as capacity-exceeded from the first call —
  // this is the identical VideoExtractionQueueError path frames already relies on
  // (see "broker route maps queue capacity..." above), now exercised for mode=audio.
  const queue = createVideoExtractionQueue({ concurrency: 1, maxPending: 0, maxQueuedBytes: 100 });

  const audioResponse = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?mode=audio`, {
      method: "POST",
      headers: {
        ...buildVideoBridgeBrokerHeaders(),
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from("video"),
    }),
    {
      queue,
      extractAudio: async () => {
        throw new Error("audio extractor must not run once the shared queue reports capacity");
      },
    }
  );

  assert.equal(audioResponse.status, 503);
  assert.equal(audioResponse.headers.get("Retry-After"), "1");
});

test("the module-level broker singleton queue is the same object for every dispatch branch", async () => {
  // Neither branch of the route is given a `queue` dependency here, so all
  // three must fall back to the identical `extractionQueue` singleton —
  // proving production traffic for frames, audio, and subtitles (#11659,
  // merged alongside #11654 in the same /merge-batch) shares one process
  // queue instead of each operation racing its own.
  const routeSource = await import("node:fs/promises").then((fs) =>
    fs.readFile(
      new URL("../../src/app/api/modality-bridge/video/extract/route.ts", import.meta.url),
      "utf8"
    )
  );
  const queueReferences = routeSource.match(/dependencies\.queue \?\? extractionQueue/g) ?? [];
  assert.equal(
    queueReferences.length,
    3,
    "the frame, audio, and subtitle branches must all default to the one extractionQueue singleton"
  );
});

test("broker route rejects frame-only parameters when mode=audio", async () => {
  const response = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?mode=audio&frames=2`, {
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

test("broker route runs the injected audio extractor with the shared deadline and byte budget", async () => {
  let receivedTimeoutMs = 0;
  let receivedByteLength = 0;
  const response = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?mode=audio`, {
      method: "POST",
      headers: {
        ...buildVideoBridgeBrokerHeaders(),
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from("video-bytes"),
    }),
    {
      extractAudio: async (bytes, options) => {
        receivedByteLength = bytes.byteLength;
        receivedTimeoutMs = options.timeoutMs;
        return {
          channels: 1,
          dataUri: "data:audio/wav;base64,UklGRg==",
          durationSeconds: 3,
          sampleRateHz: 16000,
        };
      },
    }
  );

  assert.equal(response.status, 200);
  assert.equal(receivedByteLength, Buffer.from("video-bytes").byteLength);
  assert.equal(receivedTimeoutMs, BROKER_TIMEOUT_MS);
  const body = (await response.json()) as { audio: { dataUri: string }; durationSeconds: number };
  assert.equal(body.durationSeconds, 3);
  assert.equal(body.audio.dataUri, "data:audio/wav;base64,UklGRg==");
});

test("broker queue removes an aborted pending item and never executes it", async () => {
  const queue = createVideoExtractionQueue({ concurrency: 1, maxPending: 2, maxQueuedBytes: 16 });
  let release!: () => void;
  const active = queue.run(4, () => new Promise<void>((resolve) => (release = resolve)));
  const controller = new AbortController();
  let executed = false;
  const pending = queue.run(
    4,
    async () => {
      executed = true;
    },
    controller.signal
  );
  controller.abort();
  await assert.rejects(() => pending, /aborted/);
  release();
  await active;
  assert.equal(executed, false);
});
