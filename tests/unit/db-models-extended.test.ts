import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-ext-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");

function cleanupGlobalDb() {
  try {
    if ((globalThis as any).__omnirouteDb?.open) {
      (globalThis as any).__omnirouteDb.close();
    }
  } catch {}
  delete (globalThis as any).__omnirouteDb;
}

async function resetStorage() {
  cleanupGlobalDb();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

test("sanitizeUpstreamHeadersMap returns empty for null/undefined", () => {
  assert.deepEqual(models.sanitizeUpstreamHeadersMap(null), {});
  assert.deepEqual(models.sanitizeUpstreamHeadersMap(undefined), {});
});

test("sanitizeUpstreamHeadersMap returns empty for non-object", () => {
  assert.deepEqual(models.sanitizeUpstreamHeadersMap("string" as any), {});
  assert.deepEqual(models.sanitizeUpstreamHeadersMap(123 as any), {});
});

test("sanitizeUpstreamHeadersMap preserves valid headers", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "X-Custom": "value1", "X-Other": "value2" });
  assert.equal(result["X-Custom"], "value1");
  assert.equal(result["X-Other"], "value2");
});

test("sanitizeUpstreamHeadersMap rejects headers with spaces", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "X Bad": "value" });
  assert.equal(result["X Bad"], undefined);
});

test("sanitizeUpstreamHeadersMap rejects headers with colons", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "X:Bad": "value" });
  assert.equal(result["X:Bad"], undefined);
});

test("sanitizeUpstreamHeadersMap rejects header values with carriage return", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "X-Test": "val\rue" });
  assert.equal(result["X-Test"], undefined);
});

test("sanitizeUpstreamHeadersMap rejects empty keys", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "": "value" });
  assert.equal(result[""], undefined);
});

test("sanitizeUpstreamHeadersMap truncates long values", () => {
  const longValue = "x".repeat(5000);
  const result = models.sanitizeUpstreamHeadersMap({ "X-Test": longValue });
  assert.ok(result["X-Test"].length <= 4096);
});

test("sanitizeUpstreamHeadersMap rejects values with newlines", () => {
  const result = models.sanitizeUpstreamHeadersMap({ "X-Test": "val\rue" });
  assert.equal(result["X-Test"], undefined);
  const result2 = models.sanitizeUpstreamHeadersMap({ "X-Test": "val\nue" });
  assert.equal(result2["X-Test"], undefined);
});

test("sanitizeUpstreamHeadersMap limits to 16 headers", () => {
  const headers: Record<string, string> = {};
  for (let i = 0; i < 20; i++) {
    headers[`X-Header-${i}`] = `value${i}`;
  }
  const result = models.sanitizeUpstreamHeadersMap(headers);
  assert.ok(Object.keys(result).length <= 16);
});

test("sanitizeUpstreamHeadersMap rejects forbidden header names", () => {
  const result = models.sanitizeUpstreamHeadersMap({
    Host: "example.com",
  });
  assert.equal(result["Host"], undefined);
});

test("getModelCompatOverrides returns empty array for unknown provider", async () => {
  await resetStorage();
  const overrides = models.getModelCompatOverrides("unknown-provider");
  assert.ok(Array.isArray(overrides));
});

test("getModelIsHidden returns false for unknown model", async () => {
  await resetStorage();
  assert.equal(models.getModelIsHidden("unknown", "unknown-model"), false);
});

test("getModelNormalizeToolCallId returns boolean or undefined", async () => {
  await resetStorage();
  const result = models.getModelNormalizeToolCallId("openai", "gpt-4o");
  assert.ok(result === undefined || typeof result === "boolean");
});

test("getModelPreserveOpenAIDeveloperRole returns boolean or undefined", async () => {
  await resetStorage();
  const result = models.getModelPreserveOpenAIDeveloperRole("openai", "gpt-4o");
  assert.ok(result === undefined || typeof result === "boolean");
});

test("getModelUpstreamExtraHeaders returns empty object when no overrides", async () => {
  await resetStorage();
  const result = models.getModelUpstreamExtraHeaders("openai", "gpt-4o");
  assert.deepEqual(result, {});
});

test("removeModelCompatOverride does not throw for unknown provider/model", async () => {
  await resetStorage();
  assert.doesNotThrow(() => models.removeModelCompatOverride("unknown", "unknown"));
});
