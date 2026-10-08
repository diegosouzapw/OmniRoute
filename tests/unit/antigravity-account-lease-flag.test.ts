import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-lease-flag-"));

const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");
const { isAntigravityAccountLeaseEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const chat = await import("../../src/sse/services/antigravityLeaseLifecycle.ts");
const { buildErrorBody } = await import("../../open-sse/utils/error.ts");

test("ANTIGRAVITY_ACCOUNT_LEASE_ENABLED is a runtime boolean flag that defaults to OFF", () => {
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "ANTIGRAVITY_ACCOUNT_LEASE_ENABLED");
  assert.ok(def, "ANTIGRAVITY_ACCOUNT_LEASE_ENABLED should exist");
  assert.equal(def.category, "runtime");
  assert.equal(def.type, "boolean");
  assert.equal(def.defaultValue, "false");
  assert.equal(def.requiresRestart, false);
  assert.equal(def.descriptionI18nKey, "featureFlagAntigravityAccountLeaseEnabledDescription");
});

test("the flag reader is off by default and fails closed", () => {
  assert.equal(
    isAntigravityAccountLeaseEnabled(() => false),
    false
  );
  assert.equal(
    isAntigravityAccountLeaseEnabled(() => true),
    true
  );

  const logs: unknown[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => logs.push(args);
  try {
    const result = isAntigravityAccountLeaseEnabled(() => {
      throw new Error("flag store unavailable");
    });
    assert.equal(result, false);
    assert.ok(
      logs.some((args) =>
        String(args).includes("Failed to resolve ANTIGRAVITY_ACCOUNT_LEASE_ENABLED")
      ),
      "the failure should be logged with the flag key"
    );
  } finally {
    console.error = original;
  }
});

test("POOL_BUSY is a structured, sanitized 503 with a bounded positive Retry-After", async () => {
  const response = chat.buildAntigravityPoolBusyResponse(Date.now() + 1_250);
  assert.equal(response.status, 503);
  const retryAfter = Number(response.headers.get("Retry-After"));
  assert.ok(Number.isInteger(retryAfter) && retryAfter >= 1, `Retry-After was ${retryAfter}`);

  const body = await response.json();
  assert.equal(body.error.code, "antigravity_pool_busy");
  assert.equal(body.error.type, "server_error");
  assert.ok(!String(body.error.message).includes("at /"), "must not leak a stack trace");

  // A hint already in the past must still produce a usable Retry-After, never 0 or negative.
  assert.equal(
    Number(chat.buildAntigravityPoolBusyResponse(Date.now() - 60_000).headers.get("Retry-After")),
    1
  );
});

test("antigravity_pool_busy survives the public error-identifier projection", () => {
  // buildErrorBody projects any code outside SAFE_PUBLIC_ERROR_IDENTIFIERS onto the
  // status fallback, which would silently turn POOL_BUSY into a generic
  // service_unavailable and make the condition indistinguishable from an upstream 503.
  const body = buildErrorBody(503, "pool busy", undefined, {
    type: "server_error",
    code: "antigravity_pool_busy",
  });
  assert.equal(body.error.code, "antigravity_pool_busy");
  assert.notEqual(body.error.code, "service_unavailable");
});
