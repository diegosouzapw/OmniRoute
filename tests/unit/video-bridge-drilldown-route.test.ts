import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import {
  handleVideoDrilldownRequest,
  VIDEO_DRILLDOWN_MAX_BODY_BYTES,
} from "../../src/app/api/modality-bridge/video/drilldown/route";
import {
  buildVideoBridgeBrokerHeaders,
  buildVideoBridgeDrilldownHeaders,
  VIDEO_BRIDGE_DRILLDOWN_PRINCIPAL_HEADER,
} from "../../src/lib/guardrails/videoBridgeBrokerAuth";
import {
  VideoDrilldownCache,
  VIDEO_DRILLDOWN_MAX_ENTRY_BYTES,
} from "../../src/lib/guardrails/videoBridgeDrilldown";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard";

const derivation = {
  parentContentHash: `sha256:${"a".repeat(64)}`,
  policy: "focused-window",
  version: "video-drilldown/v1",
};

const validJpegs = new Map<string, Buffer>();
for (const [width, height] of [
  [320, 180],
  [640, 360],
] as const) {
  validJpegs.set(
    `${width}x${height}`,
    await sharp({
      create: { width, height, channels: 3, background: { r: 1, g: 1, b: 1 } },
    })
      .jpeg({ progressive: false })
      .toBuffer()
  );
}

function jpegDataUri(width: number, height: number, payloadBytes = 0, fill = 0): string {
  const base = validJpegs.get(`${width}x${height}`);
  if (!base) throw new Error(`Missing valid JPEG fixture for ${width}x${height}`);
  if (payloadBytes > 65_531) throw new Error("JPEG fixture comment is too large");
  const bytes =
    payloadBytes === 0
      ? base
      : Buffer.concat([
          base.subarray(0, -2),
          Buffer.from([0xff, 0xfe, (payloadBytes + 2) >> 8, (payloadBytes + 2) & 0xff]),
          Buffer.alloc(payloadBytes, fill),
          base.subarray(-2),
        ]);
  return `data:image/jpeg;base64,${bytes.toString("base64")}`;
}

function headers(principalId: string, contentType?: string): Headers {
  return new Headers({
    ...buildVideoBridgeDrilldownHeaders(principalId),
    [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
    ...(contentType ? { "Content-Type": contentType } : {}),
  });
}

test("drill-down JSON body budget can carry the documented decoded entry ceiling", () => {
  const encodedEntryBytes = Math.ceil(VIDEO_DRILLDOWN_MAX_ENTRY_BYTES / 3) * 4;
  assert.ok(VIDEO_DRILLDOWN_MAX_BODY_BYTES >= encodedEntryBytes + 64 * 1024);
});

test("drill-down route is loopback/token protected and has no public fallback", async () => {
  assert.equal(isLocalOnlyPath("/api/modality-bridge/video/drilldown", "GET"), true);
  const response = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown?sessionId=s&videoRef=v")
  );
  assert.equal(response.status, 403);

  const missingPrincipal = new Headers({
    ...buildVideoBridgeBrokerHeaders(),
    [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
  });
  assert.equal(missingPrincipal.has(VIDEO_BRIDGE_DRILLDOWN_PRINCIPAL_HEADER), false);
  const missingPrincipalResponse = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown?sessionId=s&videoRef=v", {
      headers: missingPrincipal,
    })
  );
  assert.equal(missingPrincipalResponse.status, 403);
});

test("drill-down route stores, slices, and deletes an isolated session result", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const post = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [
          {
            dataUri: jpegDataUri(320, 180, 1, 1),
            timestampSeconds: 1,
          },
          {
            dataUri: jpegDataUri(320, 180, 1, 2),
            timestampSeconds: 5,
          },
        ],
        sessionId: "session-a",
        videoRef: "video-a",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
    }),
    { cache }
  );
  assert.equal(post.status, 201);

  const get = await handleVideoDrilldownRequest(
    new Request(
      "http://localhost/api/modality-bridge/video/drilldown?sessionId=session-a&videoRef=video-a&start=2&end=6&frames=1",
      { headers: headers("principal-a") }
    ),
    { cache }
  );
  assert.equal(get.status, 200);
  const getBody = await get.json();
  assert.equal(getBody.frames.length, 1);
  assert.deepEqual(
    getBody.frames.map(
      ({
        height,
        timestampSeconds,
        width,
      }: {
        height: number;
        timestampSeconds: number;
        width: number;
      }) => ({
        height,
        timestampSeconds,
        width,
      })
    ),
    [{ height: 180, timestampSeconds: 5, width: 320 }]
  );
  assert.match(getBody.frames[0].dataUri, /^data:image\/jpeg;base64,/);
  const returnedJpeg = Buffer.from(getBody.frames[0].dataUri.split(",", 2)[1], "base64");
  assert.deepEqual(
    await sharp(returnedJpeg)
      .metadata()
      .then(({ height, width }) => ({ height, width })),
    { height: 180, width: 320 }
  );
  assert.equal(getBody.derivation.createdAt, 1000);
  assert.equal(getBody.derivation.format, "image/jpeg");
  assert.equal(getBody.derivation.parent.contentHash, derivation.parentContentHash);
  assert.deepEqual(getBody.derivation.resolution, { height: 180, width: 320 });
  assert.match(getBody.derivation.contentHash, /^sha256:[a-f0-9]{64}$/);

  const deleted = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown?sessionId=session-a", {
      headers: headers("principal-a"),
      method: "DELETE",
    }),
    { cache }
  );
  assert.deepEqual(await deleted.json(), { removed: 1 });
});

test("drill-down route denies cross-principal reads and deletes without enumerating", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const body = JSON.stringify({
    derivation,
    durationSeconds: 10,
    frames: [
      {
        dataUri: jpegDataUri(320, 180),
        timestampSeconds: 1,
      },
    ],
    sessionId: "shared-session",
    videoRef: "shared-video",
  });
  const stored = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body,
      headers: headers("principal-a", "application/json"),
      method: "POST",
    }),
    { cache }
  );
  assert.equal(stored.status, 201);

  const deniedRead = await handleVideoDrilldownRequest(
    new Request(
      "http://localhost/api/modality-bridge/video/drilldown?sessionId=shared-session&videoRef=shared-video",
      { headers: headers("principal-b") }
    ),
    { cache }
  );
  assert.equal(deniedRead.status, 404);

  const deniedDelete = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown?sessionId=shared-session", {
      headers: headers("principal-b"),
      method: "DELETE",
    }),
    { cache }
  );
  assert.deepEqual(await deniedDelete.json(), { removed: 0 });

  const ownerRead = await handleVideoDrilldownRequest(
    new Request(
      "http://localhost/api/modality-bridge/video/drilldown?sessionId=shared-session&videoRef=shared-video",
      { headers: headers("principal-a") }
    ),
    { cache }
  );
  assert.equal(ownerRead.status, 200);
});

test("drill-down route does not retain a cancelled derivation", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const controller = new AbortController();
  controller.abort();
  const response = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [
          {
            dataUri: jpegDataUri(320, 180),
            timestampSeconds: 1,
          },
        ],
        sessionId: "cancelled-session",
        videoRef: "cancelled-video",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
      signal: controller.signal,
    }),
    { cache }
  );

  assert.equal(response.status, 499);
  assert.deepEqual(cache.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down route cancels an in-flight JPEG validation before cache commit", async () => {
  let markValidationStarted: () => void = () => {};
  let releaseValidation: () => void = () => {};
  const validationStarted = new Promise<void>((resolve) => {
    markValidationStarted = resolve;
  });
  const validationRelease = new Promise<void>((resolve) => {
    releaseValidation = resolve;
  });
  const cache = new VideoDrilldownCache({
    maxEntries: 4,
    now: () => 1000,
    ttlMs: 5000,
    normalizeJpeg: async (data) => {
      markValidationStarted();
      await validationRelease;
      return { data, height: 180, width: 320 };
    },
  });
  const controller = new AbortController();
  const pending = handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [{ dataUri: jpegDataUri(320, 180), timestampSeconds: 1 }],
        sessionId: "cancelled-session",
        videoRef: "cancelled-video",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
      signal: controller.signal,
    }),
    { cache }
  );

  await validationStarted;
  controller.abort();
  releaseValidation();

  const response = await pending;
  assert.equal(response.status, 499);
  assert.deepEqual(cache.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down route rejects raw media instead of silently retaining it", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const response = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [
          {
            dataUri: jpegDataUri(320, 180),
            timestampSeconds: 1,
          },
        ],
        rawMedia: "data:video/mp4;base64,AAAA",
        sessionId: "raw-session",
        videoRef: "raw-video",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
    }),
    { cache }
  );

  assert.equal(response.status, 400);
  assert.equal(cache.getUsage("principal-a").entries, 0);
});

test("drill-down route rejects padded Base64, disguised media, and caller dimensions", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const mp4 = Buffer.concat([
    Buffer.from([0, 0, 0, 24]),
    Buffer.from("ftypisom", "ascii"),
  ]).toString("base64");
  const invalidFrames: Array<Record<string, unknown>> = [
    { dataUri: `${jpegDataUri(320, 180)}${"=".repeat(1024 * 1024)}`, timestampSeconds: 1 },
    { dataUri: `data:image/jpeg;base64,${mp4}`, timestampSeconds: 1 },
    { dataUri: "data:image/jpeg;base64,/9hBQkP/wAAHCAABAAE=", timestampSeconds: 1 },
    { dataUri: jpegDataUri(320, 180), height: 1, timestampSeconds: 1, width: 1 },
  ];

  for (const [index, frame] of invalidFrames.entries()) {
    const response = await handleVideoDrilldownRequest(
      new Request("http://localhost/api/modality-bridge/video/drilldown", {
        body: JSON.stringify({
          derivation,
          durationSeconds: 10,
          frames: [frame],
          sessionId: `invalid-session-${index}`,
          videoRef: `invalid-video-${index}`,
        }),
        headers: headers("principal-a", "application/json"),
        method: "POST",
      }),
      { cache }
    );
    assert.equal(response.status, 400);
  }

  assert.equal(cache.getUsage("principal-a").entries, 0);
});

test("drill-down route rejects non-canonical session and video identifiers consistently", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const post = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [{ dataUri: jpegDataUri(320, 180), timestampSeconds: 1 }],
        sessionId: " session-a ",
        videoRef: " video-a ",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
    }),
    { cache }
  );
  assert.equal(post.status, 400);

  const get = await handleVideoDrilldownRequest(
    new Request(
      "http://localhost/api/modality-bridge/video/drilldown?sessionId=%20session-a%20&videoRef=%20video-a%20",
      { headers: headers("principal-a") }
    ),
    { cache }
  );
  assert.equal(get.status, 400);

  const deleted = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown?sessionId=%20session-a%20", {
      headers: headers("principal-a"),
      method: "DELETE",
    }),
    { cache }
  );
  assert.equal(deleted.status, 400);
  assert.deepEqual(cache.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down route maps unexpected cache failures to a sanitized 500", async () => {
  class FailingCache extends VideoDrilldownCache {
    override async put(..._args: Parameters<VideoDrilldownCache["put"]>): Promise<void> {
      throw new Error("secret failure at /tmp/internal/drilldown.ts:42");
    }
  }
  const cache = new FailingCache({ maxEntries: 4, now: () => 1000, ttlMs: 5000 });
  const response = await handleVideoDrilldownRequest(
    new Request("http://localhost/api/modality-bridge/video/drilldown", {
      body: JSON.stringify({
        derivation,
        durationSeconds: 10,
        frames: [{ dataUri: jpegDataUri(320, 180), timestampSeconds: 1 }],
        sessionId: "session-a",
        videoRef: "video-a",
      }),
      headers: headers("principal-a", "application/json"),
      method: "POST",
    }),
    { cache }
  );

  assert.equal(response.status, 500);
  const text = await response.text();
  assert.doesNotMatch(text, /secret failure|\/tmp\/internal|drilldown\.ts/i);
});
