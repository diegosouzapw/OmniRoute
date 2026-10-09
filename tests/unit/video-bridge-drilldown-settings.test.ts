import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-drilldown-settings-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const core = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const route = await import("../../src/app/api/v1/video-bridge/drilldown/route.ts");

test.after(() => {
  core.resetDbInstance();
  invalidateDbCache("settings");
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("PATCH preserves both explicit drill-down operator switches and rejects non-booleans", () => {
  for (const enabled of [true, false]) {
    const input = {
      modalityBridgeVideoDrilldownEnabled: enabled,
      modalityBridgeVideoDrilldownRemoteEnabled: enabled,
    };
    assert.deepEqual(updateSettingsSchema.parse(input), input);
    for (const key of Object.keys(input)) {
      assert.equal(updateSettingsSchema.safeParse({ [key]: "true" }).success, false);
    }
  }
});

test("persisted remote consent overrides environment fallback, including explicit revocation", async () => {
  const previous = process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED;
  try {
    process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED = "false";
    await settingsDb.updateSettings({ modalityBridgeVideoDrilldownRemoteEnabled: true });
    const request = () =>
      new Request(`http://omniroute.local/api/v1/video-bridge/drilldown?handle=${"a".repeat(64)}`);
    assert.equal((await route.GET(request())).status, 401, "enabled still requires authentication");
    process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED = "true";
    await settingsDb.updateSettings({ modalityBridgeVideoDrilldownRemoteEnabled: false });
    assert.equal(
      (await route.GET(request())).status,
      403,
      "stored false must revoke remote access"
    );
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED;
    else process.env.OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED = previous;
  }
});
