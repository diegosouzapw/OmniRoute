import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { VideoDrilldownCache } from "../../../src/lib/guardrails/videoBridgeDrilldown";
import {
  isVideoBridgeDrilldownProductionEnabled,
  isVideoBridgeDrilldownRemoteAccessEnabled,
  VIDEO_DRILLDOWN_MAX_PAGE_FRAMES,
  VIDEO_DRILLDOWN_VARIANT_PRESETS,
  VideoDrilldownLifecycle,
} from "../../../src/lib/guardrails/videoBridgeDrilldownLifecycle";

const derivation = {
  parentContentHash: `sha256:${"a".repeat(64)}`,
  policy: "focused-window",
  version: "video-drilldown/v1",
} as const;

const jpegFixtures = new Map<string, Buffer>();
async function jpeg(width: number, height: number, fill: number): Promise<Buffer> {
  const key = `${width}x${height}x${fill}`;
  const cached = jpegFixtures.get(key);
  if (cached) return cached;
  const buffer = await sharp({
    create: { width, height, channels: 3, background: { r: fill, g: fill, b: fill } },
  })
    .jpeg({ progressive: false })
    .toBuffer();
  jpegFixtures.set(key, buffer);
  return buffer;
}

async function jpegDataUri(width: number, height: number, fill = 1): Promise<string> {
  const buffer = await jpeg(width, height, fill);
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

function framesInput(
  entries: ReadonlyArray<{ dataUri: string; timestampSeconds: number }>
): { derivation: typeof derivation; durationSeconds: number; frames: typeof entries } {
  return { derivation, durationSeconds: 20, frames: entries };
}

test("video bridge drill-down feature flags default to opt-in / disabled", () => {
  assert.equal(isVideoBridgeDrilldownProductionEnabled({}), false);
  assert.equal(isVideoBridgeDrilldownProductionEnabled({ OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED: "true" }), true);
  assert.equal(isVideoBridgeDrilldownRemoteAccessEnabled({}), false);
  assert.equal(
    isVideoBridgeDrilldownRemoteAccessEnabled({
      OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED: "1",
    }),
    true
  );
});

test("produce mints an opaque hashed handle that reveals no session/video identity", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const { handle, expiresAt } = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(640, 360), timestampSeconds: 1 }])
  );
  assert.match(handle, /^[0-9a-f]{64}$/);
  assert.ok(expiresAt > Date.now());
});

test("resolve returns stored frames to the owning principal by handle only", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const { handle } = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(640, 360), timestampSeconds: 3 }])
  );
  const page = await lifecycle.resolve("principal-a", handle, {});
  assert.ok(page);
  assert.equal(page?.frames.length, 1);
  assert.equal(page?.variant, "detail");
  assert.equal(page?.hasMore, false);
});

test("resolve denies a wrong principal and a nonexistent handle identically (no oracle)", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const { handle } = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(640, 360), timestampSeconds: 3 }])
  );
  const wrongPrincipal = await lifecycle.resolve("principal-b", handle, {});
  const madeUpHandle = await lifecycle.resolve("principal-b", "f".repeat(64), {});
  assert.equal(wrongPrincipal, null);
  assert.equal(madeUpHandle, null);

  const deniedDelete = lifecycle.deleteHandle("principal-b", handle);
  const madeUpDelete = lifecycle.deleteHandle("principal-b", "f".repeat(64));
  assert.equal(deniedDelete, 0);
  assert.equal(madeUpDelete, 0);

  const ownerStillWorks = await lifecycle.resolve("principal-a", handle, {});
  assert.ok(ownerStillWorks);
});

test("delete removes the artifact for its own principal and is idempotent", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const { handle } = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(640, 360), timestampSeconds: 3 }])
  );
  assert.equal(lifecycle.deleteHandle("principal-a", handle), 1);
  assert.equal(await lifecycle.resolve("principal-a", handle, {}), null);
  assert.equal(lifecycle.deleteHandle("principal-a", handle), 0);
});

test("preview and standard variants shrink frames without ever upscaling", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const big = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(1280, 720), timestampSeconds: 1 }])
  );
  const small = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(200, 100), timestampSeconds: 2 }])
  );

  const preview = await lifecycle.resolve("principal-a", big.handle, { variant: "preview" });
  assert.ok(preview);
  for (const frame of preview?.frames ?? []) {
    assert.ok(frame.width <= VIDEO_DRILLDOWN_VARIANT_PRESETS.preview.maxDimension);
    assert.ok(frame.height <= VIDEO_DRILLDOWN_VARIANT_PRESETS.preview.maxDimension);
  }

  // The already-small 200x100 frame must not be upscaled toward the preview ceiling.
  const smallPreview = await lifecycle.resolve("principal-a", small.handle, { variant: "preview" });
  const smallFrame = smallPreview?.frames[0];
  assert.deepEqual(
    smallFrame && { height: smallFrame.height, width: smallFrame.width },
    { height: 100, width: 200 }
  );

  const standard = await lifecycle.resolve("principal-a", big.handle, { variant: "standard" });
  for (const frame of standard?.frames ?? []) {
    assert.ok(frame.width <= VIDEO_DRILLDOWN_VARIANT_PRESETS.standard.maxDimension);
    assert.ok(frame.height <= VIDEO_DRILLDOWN_VARIANT_PRESETS.standard.maxDimension);
  }

  const detail = await lifecycle.resolve("principal-a", big.handle, { variant: "detail" });
  const detailBig = detail?.frames[0];
  assert.deepEqual(
    detailBig && { height: detailBig.height, width: detailBig.width },
    { height: 720, width: 1280 }
  );
});

test("pagination never exceeds the 8-frame page cap and reports hasMore across pages", async () => {
  const lifecycle = new VideoDrilldownLifecycle({ cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }) });
  const entries = [] as Array<{ dataUri: string; timestampSeconds: number }>;
  for (let index = 0; index < 12; index += 1) {
    entries.push({ dataUri: await jpegDataUri(64, 64, (index % 250) + 1), timestampSeconds: index });
  }
  const { handle } = await lifecycle.produce("principal-a", framesInput(entries.slice(0, 16)));

  const firstPage = await lifecycle.resolve("principal-a", handle, { frameCount: 100 });
  assert.ok(firstPage);
  assert.ok((firstPage?.frames.length ?? 0) <= VIDEO_DRILLDOWN_MAX_PAGE_FRAMES);
  assert.equal(firstPage?.hasMore, entries.length > VIDEO_DRILLDOWN_MAX_PAGE_FRAMES);

  const secondPage = await lifecycle.resolve("principal-a", handle, { page: 1 });
  assert.ok(secondPage);
  const seenTimestamps = new Set([
    ...(firstPage?.frames.map((frame) => frame.timestampSeconds) ?? []),
    ...(secondPage?.frames.map((frame) => frame.timestampSeconds) ?? []),
  ]);
  assert.equal(seenTimestamps.size, entries.length);
});

test("a tight page byte budget trims frames instead of exceeding it", async () => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }),
  });
  const frameBytes = (await jpeg(320, 180, 5)).byteLength;
  const { handle } = await lifecycle.produce(
    "principal-a",
    framesInput([
      { dataUri: await jpegDataUri(320, 180, 5), timestampSeconds: 1 },
      { dataUri: await jpegDataUri(320, 180, 5), timestampSeconds: 2 },
      { dataUri: await jpegDataUri(320, 180, 5), timestampSeconds: 3 },
    ])
  );
  const tight = await lifecycle.resolve("principal-a", handle, {
    maxPageBytes: Math.floor(frameBytes * 1.5),
  });
  assert.ok(tight);
  assert.equal(tight?.frames.length, 1);
  assert.equal(tight?.hasMore, true);
});

test("TTL expiry hides the artifact and cleanup reclaims the handle", async () => {
  let now = 1_000;
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 8, now: () => now, ttlMs: 5_000 }),
    now: () => now,
    ttlMs: 5_000,
  });
  const { handle } = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 1 }])
  );
  now += 10_000;
  // cleanup() alone (no prior resolve/delete call) must reclaim the stale handle.
  const removed = lifecycle.cleanup();
  assert.ok(removed >= 1);
  assert.equal(await lifecycle.resolve("principal-a", handle, {}), null);
  assert.equal(lifecycle.deleteHandle("principal-a", handle), 0);
});

test("per-principal and global usage accounting is delegated to the cache substrate", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 });
  const lifecycle = new VideoDrilldownLifecycle({ cache });
  assert.deepEqual(lifecycle.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
  await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 1 }])
  );
  const usage = lifecycle.getUsage("principal-a");
  assert.equal(usage.entries, 1);
  assert.ok(usage.bytes > 0);
  assert.equal(usage.totalEntries, 1);
});

test("aborting mid-production leaves no orphaned handle or cache usage", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 });
  const lifecycle = new VideoDrilldownLifecycle({ cache });
  const controller = new AbortController();
  controller.abort();
  const dataUri = await jpegDataUri(320, 180);
  await assert.rejects(() =>
    lifecycle.produce("principal-a", framesInput([{ dataUri, timestampSeconds: 1 }]), {
      signal: controller.signal,
    })
  );
  assert.deepEqual(lifecycle.getUsage("principal-a"), {
    bytes: 0,
    entries: 0,
    totalBytes: 0,
    totalEntries: 0,
  });
});

test("per-principal handle quota evicts the oldest handle instead of growing without bound", async () => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }),
    maxHandlesPerPrincipal: 2,
  });
  const first = await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 1 }])
  );
  await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 2 }])
  );
  await lifecycle.produce(
    "principal-a",
    framesInput([{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 3 }])
  );
  assert.equal(await lifecycle.resolve("principal-a", first.handle, {}), null);
  assert.equal(lifecycle.getUsage("principal-a").entries, 2);
});
