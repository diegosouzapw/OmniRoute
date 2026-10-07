/**
 * Regression: the `idempotencyWindowMs` setting (Settings → Cache) must reach the
 * idempotency store. It was persisted and echoed back by /api/cache, but the only save
 * site never passed it, so the store always used the 5s default.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-idempotency-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const layer = await import("../../src/lib/idempotencyLayer.ts");

test.after(() => {
  core.resetDbInstance?.();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("window falls back to 5000ms when the setting is unset", async () => {
  assert.equal(await layer.getIdempotencyWindowMs(), 5000);
});

test("window follows idempotencyWindowMs once configured", async () => {
  await settings.updateSettings({ idempotencyWindowMs: 60_000 });
  assert.equal(await layer.getIdempotencyWindowMs(), 60_000);
  assert.equal((await layer.getIdempotencyStats()).windowMs, 60_000);
});

test("an invalid configured window falls back to the default", async () => {
  await settings.updateSettings({ idempotencyWindowMs: -1 });
  assert.equal(await layer.getIdempotencyWindowMs(), 5000);
});

test("a saved entry honors the passed window and expires after it", async () => {
  layer.clearIdempotency();
  layer.saveIdempotency("k-short", { ok: true }, 200, 20);
  layer.saveIdempotency("k-long", { ok: true }, 200, 60_000);
  assert.ok(layer.checkIdempotency("k-short"));
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(layer.checkIdempotency("k-short"), null);
  assert.ok(layer.checkIdempotency("k-long"));
  layer.clearIdempotency();
});

test("saveIdempotencyWithConfiguredWindow stores with the configured window", async () => {
  layer.clearIdempotency();
  await settings.updateSettings({ idempotencyWindowMs: 20 });
  await layer.saveIdempotencyWithConfiguredWindow("k-cfg", { ok: true }, 200);
  assert.ok(layer.checkIdempotency("k-cfg"));
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(layer.checkIdempotency("k-cfg"), null);

  await settings.updateSettings({ idempotencyWindowMs: 60_000 });
  await layer.saveIdempotencyWithConfiguredWindow("k-cfg-long", { ok: true }, 200);
  await new Promise((r) => setTimeout(r, 40));
  assert.ok(layer.checkIdempotency("k-cfg-long"));
  layer.clearIdempotency();
});

test("saveIdempotencyWithConfiguredWindow ignores a missing key", async () => {
  layer.clearIdempotency();
  await layer.saveIdempotencyWithConfiguredWindow(null, { ok: true }, 200);
  assert.equal((await layer.getIdempotencyStats()).activeKeys, 0);
});

test("chatCore saves idempotency through the configured-window helper", () => {
  // The non-streaming save moved into runNonStreamingResponse. chatCore must hand it
  // the configured-window helper, and that helper must be awaited at the save site.
  const chatCore = fs.readFileSync(
    path.join(import.meta.dirname, "../../open-sse/handlers/chatCore.ts"),
    "utf8"
  );
  const nonStreaming = fs.readFileSync(
    path.join(import.meta.dirname, "../../open-sse/handlers/chatCore/nonStreamingResponse.ts"),
    "utf8"
  );
  assert.match(chatCore, /saveIdempotency:\s*saveIdempotencyWithConfiguredWindow/);
  assert.doesNotMatch(chatCore, /[^\w]saveIdempotency\(/);
  assert.match(nonStreaming, /await saveIdempotency\(idempotencyKey, translatedResponse, 200\)/);
});
