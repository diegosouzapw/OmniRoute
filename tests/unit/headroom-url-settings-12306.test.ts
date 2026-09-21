/**
 * #12306: settings.headroomUrl must survive PATCH /api/settings.
 *
 * Status/start already READ settings.headroomUrl. Without the schema
 * field Zod strips the key and the write path is a no-op.
 */
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-12306-headroom-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = testDataDir;

const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const coreDb = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

after(() => {
  coreDb.resetDbInstance();
  if (fs.existsSync(testDataDir)) {
    fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("updateSettingsSchema keeps a valid headroomUrl", () => {
  const parsed = updateSettingsSchema.parse({
    headroomUrl: "http://127.0.0.1:8787",
  });
  assert.equal(parsed.headroomUrl, "http://127.0.0.1:8787");
});

test("updateSettingsSchema accepts an empty headroomUrl to fall back to HEADROOM_URL", () => {
  const parsed = updateSettingsSchema.parse({ headroomUrl: "" });
  assert.equal(parsed.headroomUrl, "");
});

test("updateSettingsSchema trims a padded headroomUrl before validating", () => {
  const parsed = updateSettingsSchema.parse({
    headroomUrl: "  http://headroom.internal:9090  ",
  });
  assert.equal(parsed.headroomUrl, "http://headroom.internal:9090");
});

test("updateSettingsSchema treats whitespace-only headroomUrl as empty", () => {
  const parsed = updateSettingsSchema.parse({ headroomUrl: "   " });
  assert.equal(parsed.headroomUrl, "");
});

test("updateSettingsSchema rejects a non-URL headroomUrl", () => {
  const result = updateSettingsSchema.safeParse({ headroomUrl: "not-a-url" });
  assert.equal(result.success, false);
});

test("updateSettingsSchema rejects non-http(s) headroomUrl schemes", () => {
  for (const url of [
    "javascript:alert(1)",
    "ftp://x",
    "data:text/html,x",
    "file:///etc/passwd",
    "http://",
    "http://[",
    "http:",
  ]) {
    const result = updateSettingsSchema.safeParse({ headroomUrl: url });
    assert.equal(result.success, false, url);
  }
});

test("updateSettingsSchema rejects a headroomUrl over 500 chars", () => {
  const result = updateSettingsSchema.safeParse({
    headroomUrl: `http://example.com/${"x".repeat(500)}`,
  });
  assert.equal(result.success, false);
});

test("updateSettings round-trips a validated headroomUrl", async () => {
  await coreDb.ensureDbInitialized();
  const parsed = updateSettingsSchema.parse({
    headroomUrl: "http://headroom.internal:9090",
  });
  await settingsDb.updateSettings(parsed);
  const stored = await settingsDb.getSettings();
  assert.equal(stored.headroomUrl, "http://headroom.internal:9090");
});

test("updateSettings round-trips an empty headroomUrl without dropping the key", async () => {
  await coreDb.ensureDbInitialized();
  await settingsDb.updateSettings(
    updateSettingsSchema.parse({ headroomUrl: "http://headroom.internal:9090" })
  );
  await settingsDb.updateSettings(updateSettingsSchema.parse({ headroomUrl: "" }));
  const stored = await settingsDb.getSettings();
  assert.equal(stored.headroomUrl, "");
});

test("advanced settings page mounts the Headroom proxy card", async () => {
  const src = fs.readFileSync(
    path.join(import.meta.dirname, "../../src/app/(dashboard)/dashboard/settings/advanced/page.tsx"),
    "utf8"
  );
  assert.match(src, /HeadroomProxyCard/);
});

test("after() restores DATA_DIR so later files in the same process keep their own dir", () => {
  const src = fs.readFileSync(new URL(import.meta.url), "utf8");
  assert.match(src, /const originalDataDir = process\.env\.DATA_DIR/);
  assert.match(src, /if \(originalDataDir === undefined\) delete process\.env\.DATA_DIR/);
});

test("save reads PATCH validation details instead of a generic HTTP status", () => {
  const src = fs.readFileSync(
    path.join(
      import.meta.dirname,
      "../../src/app/(dashboard)/dashboard/settings/components/HeadroomProxyCard.tsx"
    ),
    "utf8"
  );
  assert.match(src, /throw new Error\(settingsErrorText\(body, `HTTP \$\{res\.status\}`\)\)/);
  assert.equal(
    (src.match(/throw new Error\(settingsErrorText\(body, `HTTP \$\{res\.status\}`\)\)/g) || []).length,
    2
  );
  assert.match(src, /body\.error\?\.details/);
  assert.match(src, /isHttpUrl/);
  assert.match(src, /const HEADROOM_URL_MAX = 500/);
  assert.match(src, /setUrl\(trimmed\)/);
  assert.match(src, /const saveAc = useRef<AbortController \| null>\(null\)/);
  assert.match(src, /const lifecycleAc = useRef<AbortController \| null>\(null\)/);
  assert.match(src, /saveAc\.current = ac/);
  assert.match(src, /lifecycleAc\.current = ac/);
  assert.match(src, /await fetch\(path, \{ method: "POST", signal \}\)/);
  assert.match(src, /body: JSON.stringify\(\{ headroomUrl: trimmed \}\),\s*signal,/s);
  assert.match(src, /\/\/ start\/stop already succeeded; status is best-effort\./);
  // Busy flags: clear only if this invocation still owns the controller.
  // A second click replaces the ref; the first finally must not unlock.
  assert.match(src, /if \(saveAc\.current === ac\) setSaving\(false\)/);
  assert.match(src, /if \(lifecycleAc\.current === ac\) setActing\(false\)/);
  assert.doesNotMatch(src, /if \(!signal\.aborted\) setSaving\(false\)/);
  assert.doesNotMatch(src, /if \(!signal\.aborted\) setActing\(false\)/);
  assert.match(
    src,
    /return \(\) => \{\s*ac\.abort\(\);\s*saveAc\.current\?\.abort\(\);\s*lifecycleAc\.current\?\.abort\(\);/s
  );
  assert.match(src, /const busy = saving \|\| acting;/);
  assert.match(src, /disabled=\{busy\}/);
  assert.match(src, /disabled=\{busy \|\| !canStart\}/);
  assert.match(src, /disabled=\{busy \|\| !running\}/);
});
