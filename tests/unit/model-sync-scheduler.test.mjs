import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("modelSyncScheduler: internal auth headers validate only for scheduler requests", async () => {
  const {
    buildModelSyncInternalHeaders,
    getModelSyncInternalAuthHeaderName,
    isModelSyncInternalRequest,
  } = await import("../../src/shared/services/modelSyncScheduler.ts");

  const internalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: buildModelSyncInternalHeaders(),
  });
  assert.equal(isModelSyncInternalRequest(internalRequest), true);

  const externalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: { [getModelSyncInternalAuthHeaderName()]: "invalid-token" },
  });
  assert.equal(isModelSyncInternalRequest(externalRequest), false);
});

test("initCloudSync: startup initialization also starts model sync scheduler", () => {
  const filePath = path.join(process.cwd(), "src/lib/initCloudSync.ts");
  const source = fs.readFileSync(filePath, "utf8");

  assert.match(source, /startModelSyncScheduler\s*\(/);
});

test("proxy: internal model sync token is only allowed for provider model sync routes", () => {
  const filePath = path.join(process.cwd(), "src/proxy.ts");
  const source = fs.readFileSync(filePath, "utf8");

  assert.match(source, /isModelSyncInternalRequest/);
  assert.match(source, /sync-models\|models/);
});
