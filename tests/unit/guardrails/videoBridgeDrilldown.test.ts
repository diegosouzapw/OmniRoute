import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import sharp from "sharp";

import {
  VideoDrilldownAbortedError,
  VideoDrilldownCache,
  type VideoDrilldownFrame,
} from "../../../src/lib/guardrails/videoBridgeDrilldown";

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
const noisyPixels = Buffer.alloc(128 * 128 * 3);
let noiseState = 1;
for (let index = 0; index < noisyPixels.length; index += 1) {
  noiseState = (noiseState * 1_664_525 + 1_013_904_223) >>> 0;
  noisyPixels[index] = noiseState >>> 24;
}
const noisyJpeg = await sharp(noisyPixels, {
  raw: { width: 128, height: 128, channels: 3 },
})
  .jpeg({ progressive: false, quality: 90 })
  .toBuffer();

const frames: VideoDrilldownFrame[] = [
  { dataUri: jpegDataUri(320, 180, 0, 1), height: 180, timestampSeconds: 1, width: 320 },
  { dataUri: jpegDataUri(320, 180, 0, 2), height: 180, timestampSeconds: 5, width: 320 },
  { dataUri: jpegDataUri(320, 180, 0, 3), height: 180, timestampSeconds: 9, width: 320 },
];
const derivation = {
  parentContentHash: `sha256:${"a".repeat(64)}`,
  policy: "focused-window",
  version: "video-drilldown/v1",
} as const;

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

function retainedBytes(dataUri: string): number {
  return Buffer.from(dataUri.slice(dataUri.indexOf(",") + 1), "base64").byteLength;
}

function retainFixtureJpeg(data: Buffer): Promise<{ data: Buffer; height: number; width: number }> {
  return Promise.resolve({ data: Buffer.from(data), height: 180, width: 320 });
}

function drilldownValue(inputFrames: readonly VideoDrilldownFrame[]) {
  return { derivation, durationSeconds: 10, frames: inputFrames };
}

test("drill-down cache denies cross-principal reads and deletes", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await cache.put("principal-a", "session", "video", drilldownValue(frames));

  assert.equal(cache.get("principal-b", "session", "video"), null);
  assert.equal(cache.clearSession("principal-b", "session"), 0);
  assert.equal(cache.get("principal-a", "session", "video")?.frames.length, 3);
  assert.equal(cache.clearSession("principal-a", "session"), 1);
  assert.equal(cache.get("principal-a", "session", "video"), null);
});

test("drill-down cache isolates sessions and returns bounded focus slices", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await cache.put("principal", "session-a", "video-a", drilldownValue(frames));
  await cache.put("principal", "session-b", "video-a", drilldownValue([frames[0]]));

  const slice = cache.get("principal", "session-a", "video-a", {
    endSeconds: 6,
    frameCount: 2,
  });
  assert.deepEqual(
    slice?.frames.map(({ height, timestampSeconds, width }) => ({
      height,
      timestampSeconds,
      width,
    })),
    frames.slice(0, 2).map(({ height, timestampSeconds, width }) => ({
      height,
      timestampSeconds,
      width,
    }))
  );
  assert.equal(cache.get("principal", "session-a", "video-b"), null);
  assert.equal(cache.get("principal", "session-b", "video-a")?.frames.length, 1);
});

test("drill-down cache clamps a valid focus and preserves timeline metadata", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await cache.put("principal", "session", "video", drilldownValue(frames));
  const result = cache.get("principal", "session", "video", {
    endSeconds: 100,
    startSeconds: -4,
    frameCount: 16,
  });
  assert.deepEqual(result?.focusWindow, { endSeconds: 10, startSeconds: 0 });
  assert.equal(result?.durationSeconds, 10);
  assert.equal(result?.frames.length, 3);
});

test("drill-down cache rejects invalid and oversized frame payloads", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await assert.rejects(cache.put("principal", "session", "video", drilldownValue([])), /frame/i);
  await assert.rejects(
    cache.put(
      "principal",
      "session",
      "video",
      drilldownValue([
        {
          dataUri: "data:image/png;base64,QQ==",
          height: 180,
          timestampSeconds: 1,
          width: 320,
        },
      ])
    ),
    /JPEG/i
  );
});

test("drill-down cache rejects non-canonical Base64 before quota accounting", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const padded = `${jpegDataUri(320, 180)}${"=".repeat(1024 * 1024)}`;

  await assert.rejects(
    cache.put(
      "principal",
      "session",
      "video",
      drilldownValue([{ dataUri: padded, height: 180, timestampSeconds: 1, width: 320 }])
    ),
    /canonical Base64/i
  );
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down cache rejects non-JPEG bytes disguised by a JPEG data URI", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const mp4 = Buffer.concat([
    Buffer.from([0, 0, 0, 24]),
    Buffer.from("ftypisom", "ascii"),
  ]).toString("base64");

  await assert.rejects(
    cache.put(
      "principal",
      "session",
      "video",
      drilldownValue([
        {
          dataUri: `data:image/jpeg;base64,${mp4}`,
          height: 180,
          timestampSeconds: 1,
          width: 320,
        },
      ])
    ),
    /JPEG/i
  );
});

test("drill-down cache canonicalizes JPEG bytes without retaining a disguised media tail", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const jpeg = validJpegs.get("320x180");
  if (!jpeg) throw new Error("Missing valid JPEG fixture for 320x180");
  const marker = Buffer.from("ftypisom", "ascii");
  const tainted = Buffer.concat([
    jpeg,
    Buffer.from([0, 0, 1, 16]),
    marker,
    Buffer.alloc(256, 0x41),
    Buffer.from([0xff, 0xd9]),
  ]);

  await cache.put(
    "principal",
    "session",
    "video",
    drilldownValue([
      {
        dataUri: `data:image/jpeg;base64,${tainted.toString("base64")}`,
        height: 180,
        timestampSeconds: 1,
        width: 320,
      },
    ])
  );

  const result = cache.get("principal", "session", "video");
  assert.equal(result?.frames.length, 1);
  const retained = Buffer.from(result?.frames[0].dataUri.split(",", 2)[1] ?? "", "base64");
  assert.equal(retained.includes(marker), false);
  assert.ok(retained.byteLength < tainted.byteLength);
  assert.equal(retained.subarray(-2).toString("hex"), "ffd9");
  assert.deepEqual(
    await sharp(retained)
      .metadata()
      .then(({ height, width }) => ({ height, width })),
    {
      height: 180,
      width: 320,
    }
  );
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: retained.byteLength,
    entries: 1,
    totalBytes: retained.byteLength,
    totalEntries: 1,
  });
});

test("drill-down cache rejects a forged SOI/SOF header without a valid scan and EOI", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const forged = "data:image/jpeg;base64,/9hBQkP/wAAHCAABAAE=";

  await assert.rejects(
    cache.put(
      "principal",
      "session",
      "video",
      drilldownValue([{ dataUri: forged, height: 1, timestampSeconds: 1, width: 1 }])
    ),
    /JPEG/i
  );
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down cache rejects a truncated entropy scan even when EOI is reattached", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const truncated = Buffer.concat([
    noisyJpeg.subarray(0, noisyJpeg.byteLength - 34),
    Buffer.from([0xff, 0xd9]),
  ]);

  await assert.rejects(
    cache.put(
      "principal",
      "session",
      "video",
      drilldownValue([
        {
          dataUri: `data:image/jpeg;base64,${truncated.toString("base64")}`,
          height: 128,
          timestampSeconds: 1,
          width: 128,
        },
      ])
    ),
    /JPEG/i
  );
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down cache derives resolution from JPEG bytes instead of caller metadata", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await cache.put(
    "principal",
    "session",
    "video",
    drilldownValue([{ dataUri: jpegDataUri(640, 360), height: 1, timestampSeconds: 1, width: 1 }])
  );

  const result = cache.get("principal", "session", "video");
  assert.deepEqual(result?.derivation.resolution, { height: 360, width: 640 });
  assert.deepEqual(
    result?.frames.map(({ height, width }) => ({ height, width })),
    [{ height: 360, width: 640 }]
  );
});

test("drill-down cache expires entries and evicts the least recently used key", async () => {
  let now = 1000;
  const cache = new VideoDrilldownCache({ now: () => now, ttlMs: 5000, maxEntries: 1 });
  await cache.put("principal", "session-a", "video", drilldownValue(frames));
  await cache.put("principal", "session-b", "video", drilldownValue(frames));
  assert.equal(cache.get("principal", "session-a", "video"), null);
  now = 7000;
  assert.equal(cache.get("principal", "session-b", "video"), null);
});

test("drill-down cache sweeps all expired entries from principal and global usage", async () => {
  let now = 1000;
  const cache = new VideoDrilldownCache({ now: () => now, ttlMs: 5000, maxEntries: 4 });
  await cache.put("principal-a", "session", "video", drilldownValue(frames));
  await cache.put("principal-b", "session", "video", drilldownValue([frames[0]]));
  const principalABytes =
    cache
      .get("principal-a", "session", "video")
      ?.frames.reduce((total, frame) => total + retainedBytes(frame.dataUri), 0) ?? 0;
  const principalBBytes =
    cache
      .get("principal-b", "session", "video")
      ?.frames.reduce((total, frame) => total + retainedBytes(frame.dataUri), 0) ?? 0;
  assert.deepEqual(cache.getUsage("principal-a"), {
    bytes: principalABytes,
    entries: 1,
    totalBytes: principalABytes + principalBBytes,
    totalEntries: 2,
  });

  now = 7000;

  assert.deepEqual(cache.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
  assert.equal(cache.clearSession("principal-b", "session"), 0);
});

test("drill-down cache enforces a global byte budget with LRU eviction", async () => {
  const bigFrame = (fill: string): VideoDrilldownFrame => ({
    dataUri: jpegDataUri(320, 180, 3000, fill.charCodeAt(0)),
    height: 180,
    timestampSeconds: 1,
    width: 320,
  });
  const bigFrameBytes = retainedBytes(bigFrame("A").dataUri);
  const cache = new VideoDrilldownCache({
    now: () => 1000,
    ttlMs: 5000,
    maxEntries: 10,
    maxTotalBytes: bigFrameBytes * 2,
    normalizeJpeg: retainFixtureJpeg,
  });
  await cache.put("principal", "s", "v1", drilldownValue([bigFrame("A")]));
  await cache.put("principal", "s", "v2", drilldownValue([bigFrame("B")]));
  assert.ok(cache.get("principal", "s", "v1"));
  assert.ok(cache.get("principal", "s", "v2"));
  await cache.put("principal", "s", "v3", drilldownValue([bigFrame("C")]));
  assert.equal(
    cache.get("principal", "s", "v1"),
    null,
    "the least recently used entry must be evicted"
  );
  assert.ok(cache.get("principal", "s", "v2"));
  assert.ok(cache.get("principal", "s", "v3"));
  assert.ok(cache.get("principal", "s", "v2"));
  await cache.put("principal", "s", "v4", drilldownValue([bigFrame("D")]));
  assert.equal(
    cache.get("principal", "s", "v3"),
    null,
    "eviction must follow recency, not insertion order"
  );
  assert.ok(cache.get("principal", "s", "v2"));
  assert.ok(cache.get("principal", "s", "v4"));
});

test("drill-down cache enforces each principal quota without charging another principal", async () => {
  const bigFrame = (fill: string): VideoDrilldownFrame => ({
    dataUri: jpegDataUri(320, 180, 3000, fill.charCodeAt(0)),
    height: 180,
    timestampSeconds: 1,
    width: 320,
  });
  const bigFrameBytes = retainedBytes(bigFrame("A").dataUri);
  const cache = new VideoDrilldownCache({
    now: () => 1000,
    ttlMs: 5000,
    maxEntries: 10,
    maxTotalBytes: bigFrameBytes * 6,
    maxBytesPerPrincipal: bigFrameBytes * 2,
    maxEntriesPerPrincipal: 2,
    normalizeJpeg: retainFixtureJpeg,
  });
  await cache.put("principal-a", "s", "v1", drilldownValue([bigFrame("A")]));
  await cache.put("principal-a", "s", "v2", drilldownValue([bigFrame("B")]));
  await cache.put("principal-b", "s", "v1", drilldownValue([bigFrame("C")]));
  await cache.put("principal-b", "s", "v2", drilldownValue([bigFrame("D")]));
  assert.ok(cache.get("principal-a", "s", "v1"));

  await cache.put("principal-a", "s", "v3", drilldownValue([bigFrame("E")]));

  assert.equal(cache.get("principal-a", "s", "v2"), null, "principal A must evict its own LRU");
  assert.ok(cache.get("principal-a", "s", "v1"));
  assert.ok(cache.get("principal-a", "s", "v3"));
  assert.ok(cache.get("principal-b", "s", "v1"), "principal B must keep its independent quota");
  assert.ok(cache.get("principal-b", "s", "v2"));
});

test("drill-down cache returns server-derived audit metadata without retaining the raw parent", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  const parentContentHash = `sha256:${"a".repeat(64)}`;
  await cache.put("principal", "session", "sensitive-parent-ref", {
    derivation: {
      parentContentHash,
      policy: "focused-window",
      version: "video-drilldown/v1",
    },
    durationSeconds: 10,
    frames: [{ ...frames[0], height: 180, width: 320 }],
  });

  const result = cache.get("principal", "session", "sensitive-parent-ref");
  assert.deepEqual(result?.derivation, {
    contentHash: result?.derivation.contentHash,
    createdAt: 1000,
    format: "image/jpeg",
    parent: {
      contentHash: parentContentHash,
      referenceHash: `sha256:${createHash("sha256").update("sensitive-parent-ref").digest("hex")}`,
    },
    policy: "focused-window",
    resolution: { height: 180, width: 320 },
    version: "video-drilldown/v1",
  });
  assert.match(result?.derivation.contentHash ?? "", /^sha256:[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(result).includes("sensitive-parent-ref"), false);
});

test("drill-down cache preserves the prior derivation when a replacement fails validation", async () => {
  const cache = new VideoDrilldownCache({ now: () => 1000, ttlMs: 5000, maxEntries: 4 });
  await cache.put("principal", "session", "video", drilldownValue(frames));
  const before = cache.get("principal", "session", "video");
  const beforeBytes =
    before?.frames.reduce((total, frame) => total + retainedBytes(frame.dataUri), 0) ?? 0;

  await assert.rejects(
    cache.put("principal", "session", "video", {
      derivation: { ...derivation, parentContentHash: "not-a-content-hash" },
      durationSeconds: 10,
      frames,
    }),
    /derivation metadata/i
  );

  assert.deepEqual(cache.get("principal", "session", "video"), before);
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: beforeBytes,
    entries: 1,
    totalBytes: beforeBytes,
    totalEntries: 1,
  });
});

test("drill-down cache aborts during JPEG validation without committing quota", async () => {
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
  const pending = cache.put("principal", "session", "video", drilldownValue([frames[0]]), {
    signal: controller.signal,
  });

  await validationStarted;
  controller.abort();
  releaseValidation();

  await assert.rejects(pending, VideoDrilldownAbortedError);
  assert.deepEqual(cache.getUsage("principal"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("drill-down cache rejects an entry larger than the whole byte budget", async () => {
  const cache = new VideoDrilldownCache({
    now: () => 1000,
    ttlMs: 5000,
    maxEntries: 4,
    maxTotalBytes: 1000,
    normalizeJpeg: retainFixtureJpeg,
  });
  await assert.rejects(
    cache.put("principal", "s", "v1", {
      derivation,
      durationSeconds: 10,
      frames: [
        {
          dataUri: jpegDataUri(320, 180, 4000, 65),
          height: 180,
          timestampSeconds: 1,
          width: 320,
        },
      ],
    }),
    /byte budget/i
  );
  assert.equal(cache.get("principal", "s", "v1"), null);
  assert.throws(
    () => new VideoDrilldownCache({ now: () => 0, ttlMs: 1, maxEntries: 1, maxTotalBytes: 0 }),
    /byte budget/i
  );
});
