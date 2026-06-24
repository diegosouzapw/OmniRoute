import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { syncToCloudIfEnabled } from "@/lib/cloudSync";

describe("syncToCloudIfEnabled", () => {
  test("resolves without throwing when cloud is disabled (default test env)", async () => {
    // In the test env, isCloudEnabled() returns false (no CLOUD_URL),
    // so the helper short-circuits immediately and does no work.
    await assert.doesNotReject(syncToCloudIfEnabled());
  });

  test("returns a Promise (callable without await)", () => {
    // Fire-and-forget pattern: callers can do `void syncToCloudIfEnabled()`.
    const ret = syncToCloudIfEnabled();
    assert.ok(ret instanceof Promise, "syncToCloudIfEnabled should return a Promise");
    // Don't await — the test is checking the call shape, not the result.
    void ret;
  });
});
