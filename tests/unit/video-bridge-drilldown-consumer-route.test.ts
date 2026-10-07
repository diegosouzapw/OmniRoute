import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import sharp from "sharp";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-video-drilldown-consumer-route-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "video-drilldown-consumer-route-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/v1/video-bridge/drilldown/route.ts");
const { VideoDrilldownLifecycle } = await import(
  "../../src/lib/guardrails/videoBridgeDrilldownLifecycle.ts"
);
const { VideoDrilldownCache } = await import("../../src/lib/guardrails/videoBridgeDrilldown.ts");
const { isLocalOnlyPath } = await import("../../src/server/authz/routeGuard.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedKey(): Promise<{ key: string }> {
  return apiKeysDb.createApiKey("video-drilldown-route-key", "test", []);
}

function newLifecycle() {
  return new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 8, ttlMs: 60_000 }),
  });
}

async function jpegDataUri(width: number, height: number, fill = 1): Promise<string> {
  const buffer = await sharp({
    create: { width, height, channels: 3, background: { r: fill, g: fill, b: fill } },
  })
    .jpeg({ progressive: false })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

const derivation = {
  parentContentHash: `sha256:${"a".repeat(64)}`,
  policy: "focused-window",
  version: "video-drilldown/v1",
} as const;

function get(url: string, key?: string): Request {
  return new Request(`http://omniroute.local${url}`, {
    headers: key ? { Authorization: `Bearer ${key}` } : {},
  });
}

function del(url: string, key?: string): Request {
  return new Request(`http://omniroute.local${url}`, {
    headers: key ? { Authorization: `Bearer ${key}` } : {},
    method: "DELETE",
  });
}

test("consumer route requires remote access to be explicitly enabled", async () => {
  const { key } = await seedKey();
  const response = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}`, key),
    { isRemoteAccessEnabled: () => false }
  );
  assert.equal(response.status, 403);
});

test("consumer route requires an authenticated API key", async () => {
  const noKey = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}`),
    { isRemoteAccessEnabled: () => true }
  );
  assert.equal(noKey.status, 401);

  const invalidKey = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}`, "not-a-real-key"),
    { isRemoteAccessEnabled: () => true }
  );
  assert.equal(invalidKey.status, 401);
});

test("consumer route resolves a produced handle for its own API key and paginates/variant-shapes it", async () => {
  const { key } = await seedKey();
  const lifecycle = newLifecycle();
  const policyModule = await import("../../src/shared/utils/apiKeyPolicy.ts");
  const policy = await policyModule.enforceApiKeyPolicy(get("/x", key), null);
  const principalId = policy.apiKeyInfo!.id;
  const { handle } = await lifecycle.produce(principalId, {
    derivation,
    durationSeconds: 10,
    frames: [
      { dataUri: await jpegDataUri(640, 360), timestampSeconds: 1 },
      { dataUri: await jpegDataUri(640, 360), timestampSeconds: 2 },
    ],
  });

  const response = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${handle}&variant=preview`, key),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.variant, "preview");
  assert.equal(body.frames.length, 2);
  for (const frame of body.frames) {
    assert.ok(frame.width <= 320);
    assert.ok(frame.height <= 320);
  }
});

test("consumer route denies a different API key's handle with the same 404 as a made-up handle", async () => {
  const { key: ownerKey } = await seedKey();
  const { key: strangerKey } = await seedKey();
  const lifecycle = newLifecycle();
  const policyModule = await import("../../src/shared/utils/apiKeyPolicy.ts");
  const ownerPolicy = await policyModule.enforceApiKeyPolicy(get("/x", ownerKey), null);
  const { handle } = await lifecycle.produce(ownerPolicy.apiKeyInfo!.id, {
    derivation,
    durationSeconds: 10,
    frames: [{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 1 }],
  });

  const strangerRead = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${handle}`, strangerKey),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  const madeUpRead = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"0".repeat(64)}`, strangerKey),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.equal(strangerRead.status, 404);
  assert.equal(madeUpRead.status, 404);
  assert.deepEqual(await strangerRead.json(), await madeUpRead.json());

  const strangerDelete = await route.handleVideoBridgeDrilldownConsumerRequest(
    del(`/api/v1/video-bridge/drilldown?handle=${handle}`, strangerKey),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.equal(strangerDelete.status, 200);
  assert.deepEqual(await strangerDelete.json(), { removed: 0 });

  const ownerRead = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${handle}`, ownerKey),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.equal(ownerRead.status, 200);
});

test("consumer route deletes an owner's handle and it becomes unresolvable afterward", async () => {
  const { key } = await seedKey();
  const lifecycle = newLifecycle();
  const policyModule = await import("../../src/shared/utils/apiKeyPolicy.ts");
  const policy = await policyModule.enforceApiKeyPolicy(get("/x", key), null);
  const { handle } = await lifecycle.produce(policy.apiKeyInfo!.id, {
    derivation,
    durationSeconds: 10,
    frames: [{ dataUri: await jpegDataUri(320, 180), timestampSeconds: 1 }],
  });

  const deleted = await route.handleVideoBridgeDrilldownConsumerRequest(
    del(`/api/v1/video-bridge/drilldown?handle=${handle}`, key),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.deepEqual(await deleted.json(), { removed: 1 });

  const afterDelete = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${handle}`, key),
    { isRemoteAccessEnabled: () => true, lifecycle }
  );
  assert.equal(afterDelete.status, 404);
});

test("consumer route rejects malformed handles and out-of-range pagination before touching the lifecycle", async () => {
  const { key } = await seedKey();
  const badHandle = await route.handleVideoBridgeDrilldownConsumerRequest(
    get("/api/v1/video-bridge/drilldown?handle=not-hex", key),
    { isRemoteAccessEnabled: () => true }
  );
  assert.equal(badHandle.status, 400);

  const tooManyFrames = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}&frames=9`, key),
    { isRemoteAccessEnabled: () => true }
  );
  assert.equal(tooManyFrames.status, 400);

  const badVariant = await route.handleVideoBridgeDrilldownConsumerRequest(
    get(`/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}&variant=ultra`, key),
    { isRemoteAccessEnabled: () => true }
  );
  assert.equal(badVariant.status, 400);
});

test("consumer route is not classified local-only — it is a real remote-authenticated surface, gated by settings instead", () => {
  assert.equal(isLocalOnlyPath("/api/v1/video-bridge/drilldown", "GET"), false);
});
