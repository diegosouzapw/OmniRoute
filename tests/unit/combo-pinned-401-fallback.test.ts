import assert from "node:assert/strict";
import test from "node:test";
import { shouldFallbackPinnedStatus } from "../../open-sse/services/combo/dispatchPrelude.ts";

test("pinned 401 re-enters combo fallback while request errors stay terminal", () => {
  assert.equal(shouldFallbackPinnedStatus(401), true);
  assert.equal(shouldFallbackPinnedStatus(408), true);
  assert.equal(shouldFallbackPinnedStatus(429), true);
  assert.equal(shouldFallbackPinnedStatus(500), true);
  assert.equal(shouldFallbackPinnedStatus(400), false);
  assert.equal(shouldFallbackPinnedStatus(403), false);
});
