import { test } from "node:test";
import assert from "node:assert/strict";

import {
  acquireProviderDefaultSlot,
  __setProviderDefaultRateLimitsForTests,
} from "../../open-sse/services/providerDefaultRateLimit.ts";

test("acquireProviderDefaultSlot enforces the configured per-provider cap (N+1 blocks)", () => {
  __setProviderDefaultRateLimitsForTests({ "test-provider": { requests: 2, windowMs: 60000 } });
  try {
    assert.equal(acquireProviderDefaultSlot("test-provider", "conn-1"), 0, "1st request proceeds");
    assert.equal(acquireProviderDefaultSlot("test-provider", "conn-1"), 0, "2nd request proceeds");
    const wait = acquireProviderDefaultSlot("test-provider", "conn-1");
    assert.ok(wait > 0, "3rd request in a 2/60s window is told to wait");
    assert.ok(wait <= 60000, "wait never exceeds the window");
  } finally {
    __setProviderDefaultRateLimitsForTests(null);
  }
});

test("acquireProviderDefaultSlot is a no-op (0) when the provider has no configured default", () => {
  __setProviderDefaultRateLimitsForTests(null);
  assert.equal(acquireProviderDefaultSlot("unconfigured-provider", "c"), 0);
});

test("acquireProviderDefaultSlot isolates connections of the same provider", () => {
  __setProviderDefaultRateLimitsForTests({ p: { requests: 1, windowMs: 60000 } });
  try {
    assert.equal(acquireProviderDefaultSlot("p", "a"), 0);
    assert.equal(acquireProviderDefaultSlot("p", "b"), 0, "a different connection has its own window");
    assert.ok(acquireProviderDefaultSlot("p", "a") > 0, "the first connection is now saturated");
  } finally {
    __setProviderDefaultRateLimitsForTests(null);
  }
});
