import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import sharp from "sharp";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-drilldown-production-flow-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "drilldown-production-flow-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { VideoBridgeGuardrail } = await import("../../src/lib/guardrails/videoBridge.ts");
const { getSharedVideoDrilldownLifecycle } =
  await import("../../src/lib/guardrails/videoBridgeDrilldownStore.ts");
const route = await import("../../src/app/api/v1/video-bridge/drilldown/route.ts");

test.after(() => {
  getSharedVideoDrilldownLifecycle().clearAll();
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function request(handle: string, key: string, method = "GET", variant = "detail") {
  return new Request(
    `http://omniroute.local/api/v1/video-bridge/drilldown?handle=${handle}${method === "GET" ? `&variant=${variant}` : ""}`,
    {
      method,
      headers: { Authorization: `Bearer ${key}` },
    }
  );
}

test("the real producer and authenticated GET/DELETE use the same tenant-bound lifecycle", async () => {
  const { key: owner } = await keys.createApiKey("owner", "test", []);
  const { key: stranger } = await keys.createApiKey("stranger", "test", []);
  const policy = await enforceApiKeyPolicy(request("0".repeat(64), owner), null);
  const jpeg = await sharp({ create: { width: 800, height: 600, channels: 3, background: "blue" } })
    .jpeg()
    .toBuffer();
  const result = await new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeCacheEnabled: false,
        modalityBridgeVideoDrilldownEnabled: true,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [
          { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
        ],
      }),
      callVisionModel: async () => "blue screen",
    },
  }).preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [
            { type: "input_video", video_url: "data:video/mp4;base64,QUJD", drilldown: true },
          ],
        },
      ],
    },
    { apiKeyInfo: policy.apiKeyInfo }
  );
  const [{ handle }] = result.meta!.videoDrilldownHandles as Array<{ handle: string }>;
  assert.match(handle, /^v1\.[A-Za-z0-9_-]{43}$/);
  for (const variant of ["preview", "standard", "detail"]) {
    const response = await route.GET(request(handle, owner, "GET", variant));
    assert.equal(response.status, 200, `production consumer must resolve ${variant}`);
    const body = await response.json();
    assert.equal(body.variant, variant);
    assert.equal(body.frames.length, 1);
  }
  const denied = await route.GET(request(handle, stranger));
  const unknown = await route.GET(request("0".repeat(64), stranger));
  assert.equal(denied.status, 404);
  assert.deepEqual(await denied.json(), await unknown.json());
  await route.DELETE(request(handle, stranger, "DELETE"));
  assert.equal((await route.GET(request(handle, owner))).status, 200);
  await route.DELETE(request(handle, owner, "DELETE"));
  assert.equal((await route.GET(request(handle, owner))).status, 404);
  assert.equal(getSharedVideoDrilldownLifecycle().getUsage(policy.apiKeyInfo!.id).bytes, 0);
});
