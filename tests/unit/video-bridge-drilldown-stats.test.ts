import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-drilldown-stats-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { getSharedVideoDrilldownLifecycle } =
  await import("../../src/lib/guardrails/videoBridgeDrilldownStore.ts");
const route = await import("../../src/app/api/modality-bridge/stats/route.ts");

test.after(() => {
  getSharedVideoDrilldownLifecycle().clearAll();
  core.resetDbInstance();
  invalidateDbCache("settings");
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("management stats report effective consent and bounded retained usage, never handles or media", async () => {
  const lifecycle = getSharedVideoDrilldownLifecycle();
  lifecycle.clearAll();
  await settingsDb.updateSettings({
    modalityBridgeVideoDrilldownEnabled: true,
    modalityBridgeVideoDrilldownRemoteEnabled: false,
    modalityBridgeVideoModel: "openai/gpt-4o-mini",
  });
  const jpeg = await sharp({ create: { width: 48, height: 32, channels: 3, background: "blue" } })
    .jpeg()
    .toBuffer();
  const { handle } = await lifecycle.produce("private-principal", {
    durationSeconds: 5,
    frames: [{ dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 }],
    derivation: {
      parentContentHash: `sha256:${"a".repeat(64)}`,
      policy: "uniform",
      version: "video-drilldown/v1",
    },
  });
  // Trusted in-process management call; real HTTP requests still pass the auth guard.
  const response = await route.GET(undefined!);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.video.drilldown.retainedEntries, 1);
  assert.ok(body.video.drilldown.retainedBytes > 0);
  assert.equal(body.video.drilldown.enabled, true);
  assert.equal(body.video.drilldown.remoteEnabled, false);
  assert.deepEqual(body.video.promotion, {
    model: "openai/gpt-4o-mini",
    segmentAware: "hold",
    contactSheet: "hold",
    contextVerified: false,
  });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.ok(!JSON.stringify(body).includes(handle));
  assert.ok(!JSON.stringify(body).includes("data:image"));
  assert.ok(!JSON.stringify(body).includes("private-principal"));
});
