/**
 * #13917 / #14074 — the proxy bulk-import limit must be WRITABLE through the settings API.
 *
 * The route and the dashboard both read `proxyBulkImportLimit`, but PATCH /api/settings
 * validates the body with `updateSettingsSchema` (a stripping z.object) and then spreads
 * `validation.data` into `updateSettings()`. A key the schema does not declare is dropped
 * silently (200 OK, nothing saved), so the "operator-configurable" limit could only be set
 * by editing the database by hand.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13917-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { PROXY_BULK_IMPORT_LIMIT_MAX, PROXY_BULK_IMPORT_LIMIT_MIN, resolveProxyBulkImportLimit } =
  await import("../../src/shared/constants/proxyBulkImport.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

test("PATCH /api/settings schema keeps proxyBulkImportLimit instead of stripping it", () => {
  const parsed = updateSettingsSchema.safeParse({ proxyBulkImportLimit: 500, requestRetry: 4 });
  assert.equal(parsed.success, true);
  assert.equal((parsed.data as Record<string, unknown>).proxyBulkImportLimit, 500);
});

test("PATCH /api/settings schema enforces the same bounds as the resolver", () => {
  for (const ok of [PROXY_BULK_IMPORT_LIMIT_MIN, 100, PROXY_BULK_IMPORT_LIMIT_MAX]) {
    assert.equal(
      updateSettingsSchema.safeParse({ proxyBulkImportLimit: ok }).success,
      true,
      `${ok}`
    );
  }
  for (const bad of [0, -1, PROXY_BULK_IMPORT_LIMIT_MAX + 1, 1.5, "500"]) {
    assert.equal(
      updateSettingsSchema.safeParse({ proxyBulkImportLimit: bad }).success,
      false,
      `expected rejection for ${JSON.stringify(bad)}`
    );
  }
});

test("a validated settings write persists the limit and reads back through the resolver", async () => {
  const parsed = updateSettingsSchema.parse({ proxyBulkImportLimit: 750 });
  await settingsDb.updateSettings({ ...parsed });
  const settings = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(settings.proxyBulkImportLimit, 750);
  assert.equal(resolveProxyBulkImportLimit(settings.proxyBulkImportLimit), 750);
});
