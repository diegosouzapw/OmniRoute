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

test("cancelling an in-flight preview rejects without corrupting the retained source", async (t) => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 }),
  });
  t.after(() => lifecycle.clearAll());
  const { handle } = await lifecycle.produce("owner", await payload());
  const controller = new AbortController();
  // The 640px source must enter asynchronous resizing for a 320px preview.
  const pending = lifecycle.resolve("owner", handle, {
    signal: controller.signal,
    variant: "preview",
  });
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
  const source = await lifecycle.resolve("owner", handle, {});
  assert.equal(source?.frames[0].width, 640);
});

test("deleting a handle while preview resizing is in flight revokes the pending response", async (t) => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 }),
  });
  t.after(() => lifecycle.clearAll());
  const { handle } = await lifecycle.produce("owner", await payload());
  const pending = lifecycle.resolve("owner", handle, { variant: "preview" });
  assert.equal(lifecycle.deleteHandle("owner", handle), 1);
  assert.equal(await pending, null);
  assert.equal(lifecycle.getUsage("owner").totalBytes, 0);
});

test("an empty focused read still releases idle retained bytes at the handle deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 1_000 });
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 }),
    ttlMs: 1_000,
  });
  t.after(() => lifecycle.clearAll());
  const { handle } = await lifecycle.produce("owner", await payload());
  assert.equal(await lifecycle.resolve("owner", handle, { startSeconds: 3, endSeconds: 4 }), null);
  assert.ok(lifecycle.getUsage("owner").totalBytes > 0);
  // No later read, deletion or explicit cleanup drives this expiry.
  t.mock.timers.tick(1_001);
  assert.equal(lifecycle.getUsage("owner").totalBytes, 0);
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
