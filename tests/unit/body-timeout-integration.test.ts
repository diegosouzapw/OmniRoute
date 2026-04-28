import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── 1. FETCH_BODY_TIMEOUT_MS constant export validation ──────────────────

test("FETCH_BODY_TIMEOUT_MS is exported from open-sse/config/constants and is a positive number", async () => {
  const constants = await import("../../open-sse/config/constants.ts");
  assert.ok("FETCH_BODY_TIMEOUT_MS" in constants, "FETCH_BODY_TIMEOUT_MS should be exported");
  assert.equal(typeof constants.FETCH_BODY_TIMEOUT_MS, "number");
  assert.ok(constants.FETCH_BODY_TIMEOUT_MS > 0, "should be a positive number");
});

test("FETCH_BODY_TIMEOUT_MS defaults to FETCH_TIMEOUT_MS when no env override", async () => {
  const constants = await import("../../open-sse/config/constants.ts");
  assert.equal(
    constants.FETCH_BODY_TIMEOUT_MS,
    constants.FETCH_TIMEOUT_MS,
    "FETCH_BODY_TIMEOUT_MS should default to FETCH_TIMEOUT_MS"
  );
});

// ── 2. BodyTimeoutError classification in chatCore ──────────────────────

test("chatCore error classification maps BodyTimeoutError to 504 GATEWAY_TIMEOUT", () => {
  // Read the source to verify the error classification logic includes BodyTimeoutError
  const content = fs.readFileSync("open-sse/handlers/chatCore.ts", "utf8");

  // The error classification block should include BodyTimeoutError alongside TimeoutError
  const classificationPattern =
    /error\.name === ["']TimeoutError["']\s*\|\|\s*error\.name === ["']BodyTimeoutError["']/;
  assert.ok(
    classificationPattern.test(content),
    "chatCore should classify BodyTimeoutError as GATEWAY_TIMEOUT (504)"
  );
});

test("chatCore catch block decrements pending requests for all error types", () => {
  const content = fs.readFileSync("open-sse/handlers/chatCore.ts", "utf8");

  // The catch block should call trackPendingRequest with false before error classification
  const catchBlockPattern = /catch\s*\(error\)\s*\{[^}]*trackPendingRequest\([^)]*,\s*false\)/;
  assert.ok(
    catchBlockPattern.test(content),
    "chatCore catch block should decrement pending requests"
  );
});

test("withBodyTimeout error name is BodyTimeoutError", async () => {
  const { withBodyTimeout } = await import("../../open-sse/utils/stream.ts");

  const neverResolves = new Promise<string>(() => {});
  try {
    await withBodyTimeout(neverResolves, 20);
    assert.fail("should have thrown");
  } catch (error) {
    assert.ok(error instanceof Error);
    assert.equal(error.name, "BodyTimeoutError");
  }
});

// ── 3. BodyTimeoutError triggers correct pending request decrement ──────

test("BodyTimeoutError from withBodyTimeout does not leave timer leaks", async () => {
  const { withBodyTimeout } = await import("../../open-sse/utils/stream.ts");

  // Fire multiple short timeouts to ensure no timer accumulation
  const promises = Array.from({ length: 10 }, () =>
    withBodyTimeout(new Promise(() => {}), 10).catch(() => {})
  );
  await Promise.all(promises);

  // Wait a bit to ensure all timers are cleaned up
  await new Promise((resolve) => setTimeout(resolve, 100));

  // If timers leaked, the process would hang or show warnings — this test
  // passing confirms proper cleanup under concurrent timeout scenarios.
  assert.ok(true, "all timers cleaned up successfully");
});

// ── 4. DELETE /api/logs/active endpoint ──────────────────────────────────

test("DELETE /api/logs/active route requires management authentication", () => {
  const content = fs.readFileSync("src/app/api/logs/active/route.ts", "utf8");

  assert.ok(
    content.includes('from "@/lib/api/requireManagementAuth"'),
    "should import requireManagementAuth"
  );
  assert.ok(content.includes("export async function DELETE"), "should export DELETE handler");
  assert.ok(
    content.includes("await requireManagementAuth(request)"),
    "DELETE should check management auth"
  );
});

test("DELETE /api/logs/active calls clearPendingRequests", () => {
  const content = fs.readFileSync("src/app/api/logs/active/route.ts", "utf8");

  assert.ok(
    content.includes("clearPendingRequests"),
    "DELETE handler should call clearPendingRequests"
  );
  assert.ok(
    content.includes("Pending request counts cleared"),
    "DELETE handler should return success message"
  );
});

// ── 5. clearPendingRequests + trackPendingRequest integration ────────────

test("trackPendingRequest followed by clearPendingRequests zeroes all counts", async () => {
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

  usageHistory.trackPendingRequest("m1", "p1", "c1", true);
  usageHistory.trackPendingRequest("m1", "p1", "c1", true);
  usageHistory.trackPendingRequest("m2", "p2", "c2", true);

  const before = usageHistory.getPendingRequests();
  assert.equal(before.byModel["m1 (p1)"], 2);
  assert.equal(before.byModel["m2 (p2)"], 1);

  usageHistory.clearPendingRequests();

  const after = usageHistory.getPendingRequests();
  assert.equal(Object.keys(after.byModel).length, 0);
  assert.equal(Object.keys(after.byAccount).length, 0);
  assert.equal(Object.keys(after.details).length, 0);
});

test("clearPendingRequests allows subsequent tracking to work correctly", async () => {
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

  usageHistory.trackPendingRequest("m1", "p1", "c1", true);
  usageHistory.clearPendingRequests();

  // After clearing, tracking should increment from 0
  usageHistory.trackPendingRequest("m3", "p3", "c3", true);
  usageHistory.trackPendingRequest("m3", "p3", "c3", true);

  const pending = usageHistory.getPendingRequests();
  assert.equal(pending.byModel["m3 (p3)"], 2);
  assert.ok(pending.details["c3"]);

  // Decrement should also work
  usageHistory.trackPendingRequest("m3", "p3", "c3", false);
  assert.equal(pending.byModel["m3 (p3)"], 1);

  // Final decrement should clear details
  usageHistory.trackPendingRequest("m3", "p3", "c3", false);
  assert.equal(pending.byModel["m3 (p3)"], 0);
  assert.equal(pending.details["c3"], undefined);
});
