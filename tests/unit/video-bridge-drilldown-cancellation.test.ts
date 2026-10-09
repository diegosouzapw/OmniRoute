import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";

import { VideoDrilldownCache } from "../../src/lib/guardrails/videoBridgeDrilldown.ts";
import { VideoDrilldownLifecycle } from "../../src/lib/guardrails/videoBridgeDrilldownLifecycle.ts";
import { handleVideoBridgeDrilldownConsumerRequest } from "../../src/app/api/v1/video-bridge/drilldown/route.ts";

async function payload() {
  const jpeg = await sharp({ create: { width: 640, height: 360, channels: 3, background: "blue" } })
    .jpeg()
    .toBuffer();
  return {
    durationSeconds: 10,
    frames: [{ dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 2 }],
    derivation: {
      parentContentHash: `sha256:${"a".repeat(64)}`,
      policy: "uniform",
      version: "video-drilldown/v1",
    },
  };
}

test("a cancelled read does not derive or return any frame", async () => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 }),
  });
  const { handle } = await lifecycle.produce("owner", await payload());
  const signal = AbortSignal.abort();
  await assert.rejects(lifecycle.resolve("owner", handle, { signal, variant: "preview" }), {
    name: "AbortError",
  });
  assert.ok(
    await lifecycle.resolve("owner", handle, {}),
    "cancellation must not corrupt the source"
  );
});

test("handle TTL sweep releases retained bytes even when cache TTL is longer", async () => {
  let now = 1_000;
  const cache = new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000, now: () => now });
  const lifecycle = new VideoDrilldownLifecycle({ cache, ttlMs: 1_000, now: () => now });
  await lifecycle.produce("owner", await payload());
  now += 2_000;
  assert.equal(lifecycle.cleanup(), 1);
  assert.equal(lifecycle.getUsage("owner").totalBytes, 0);
});

test("idle handles release retained bytes at TTL without waiting for another request", async () => {
  const cache = new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 });
  const lifecycle = new VideoDrilldownLifecycle({ cache, ttlMs: 50 });
  await lifecycle.produce("owner", await payload());
  await new Promise((resolve) => setTimeout(resolve, 180));
  assert.equal(
    cache.getUsage("owner").totalBytes,
    0,
    "an idle process must not retain expired JPEGs"
  );
  lifecycle.clearAll();
});

test("remote configuration failures and cancellation are sanitized HTTP responses", async () => {
  const request = (signal?: AbortSignal) =>
    new Request(`http://omniroute.local/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}`, {
      signal,
    });
  const failure = await handleVideoBridgeDrilldownConsumerRequest(request(), {
    isRemoteAccessEnabled: async () => {
      throw new Error("private-provider-secret\nat /private/source.ts:12");
    },
  });
  assert.equal(failure.status, 503);
  const message = (await failure.json()).error.message;
  assert.ok(!message.includes("private-provider-secret"));
  assert.ok(!message.includes("at /"));
  const cancelled = await handleVideoBridgeDrilldownConsumerRequest(request(AbortSignal.abort()), {
    isRemoteAccessEnabled: () => true,
  });
  assert.equal(cancelled.status, 499);
});
