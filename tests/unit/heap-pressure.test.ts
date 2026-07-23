import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkHeapPressureGuard,
  computeHeapPressureThresholdMb,
} from "../../open-sse/utils/heapPressure.ts";

// Regression guard for the v3.8.8 "Service temporarily unavailable due to resource
// pressure" outage: a fixed 200MB threshold sat below the app's ~260MB working set,
// so the chatCore heap guard rejected every request. The threshold must now track
// the real V8 heap ceiling so it stays above the baseline on every VPS tier.
describe("computeHeapPressureThresholdMb", () => {
  it("sheds at 85% of a no-cap heap ceiling (2240MB → 1904)", () => {
    assert.equal(computeHeapPressureThresholdMb(2240), 1904);
  });

  it("tracks the default 512MB cap (heap_limit ~704 → 598), clearing the ~260MB baseline", () => {
    const t = computeHeapPressureThresholdMb(704);
    assert.equal(t, 598);
    assert.ok(t > 260, "threshold must stay above the ~260MB app baseline");
  });

  it("tracks a 1 GB-box 640MB cap (heap_limit 832 → 707)", () => {
    assert.equal(computeHeapPressureThresholdMb(832), 707);
  });

  it("tracks a 2 GB-box 1536MB cap (heap_limit 1728 → 1469)", () => {
    assert.equal(computeHeapPressureThresholdMb(1728), 1469);
  });

  it("floors at 400MB so a tiny/undersized heap never rejects all traffic", () => {
    // 85% of 300 = 255, which would sit below the baseline — the floor wins.
    assert.equal(computeHeapPressureThresholdMb(300), 400);
  });

  it("honors a positive explicit override (string or number)", () => {
    assert.equal(computeHeapPressureThresholdMb(2240, "1024"), 1024);
    assert.equal(computeHeapPressureThresholdMb(2240, 800), 800);
    assert.equal(computeHeapPressureThresholdMb(2240, "1500.9"), 1500);
  });

  it("ignores invalid/zero/negative overrides and auto-calibrates", () => {
    for (const bad of ["", "0", "-5", "abc", null, undefined]) {
      assert.equal(
        computeHeapPressureThresholdMb(2240, bad as string | number | null | undefined),
        1904,
        `override ${JSON.stringify(bad)} must fall back to auto-calibration`
      );
    }
  });
});

// Extracted from chatCore's handleChatCore (god-file decomposition, first leaf). The SET of
// behaviours below is byte-identical to the previous inline guard.
describe("checkHeapPressureGuard", () => {
  it("returns null (proceed) when heap usage is at or below the threshold", () => {
    assert.equal(checkHeapPressureGuard(100, 256), null);
    assert.equal(checkHeapPressureGuard(256, 256), null, "boundary: == threshold proceeds");
  });

  it("returns a 503 shed result when heap usage exceeds the threshold", async () => {
    const guard = checkHeapPressureGuard(300, 256);
    assert.ok(guard, "must shed above threshold");
    assert.equal(guard.success, false);
    assert.equal(guard.status, 503);
    assert.equal(guard.response.status, 503);
    assert.equal(guard.response.headers.get("Retry-After"), "5");
    assert.equal(guard.response.headers.get("Content-Type"), "application/json");
    const payload = await guard.response.json();
    assert.equal(payload.error.code, "heap_pressure");
    assert.equal(payload.error.type, "server_error");
  });

  it("never leaks the heap figure to the client response (Hard Rule #12)", async () => {
    const guard = checkHeapPressureGuard(987, 256);
    assert.ok(guard);
    const text = JSON.stringify(await guard.response.clone().json()) + (guard.error ?? "");
    assert.ok(!text.includes("987"), "the measured heap MB must not appear in the client payload");
    assert.ok(!/\bMB\b/.test(text), "no heap-size detail should reach the client");
  });
});
