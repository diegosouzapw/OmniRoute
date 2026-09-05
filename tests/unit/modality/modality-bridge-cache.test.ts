import { test } from "node:test";
import assert from "node:assert";

import {
  BridgeCache,
  bridgeCacheKey,
  getSharedBridgeCacheFor,
} from "../../../src/lib/guardrails/modalityBridge/bridgeCache.ts";
import { resolveVisionBridgeRuntimeSettings } from "../../../src/shared/constants/modalityBridgeDefaults.ts";

test("key is stable sha256 of content+prompt+model", () => {
  const a = bridgeCacheKey("data:image/png;base64,AAA", "describe", "gpt-4o-mini");
  const b = bridgeCacheKey("data:image/png;base64,AAA", "describe", "gpt-4o-mini");
  assert.equal(a, b);
  assert.match(a, /^[a-f0-9]{64}$/);
  assert.notEqual(a, bridgeCacheKey("data:image/png;base64,AAA", "other", "gpt-4o-mini"));
});

test("key framing prevents boundary-shift collisions between fields", () => {
  // Without length-prefix framing ("ab","c") and ("a","bc") would hash the
  // same concatenated bytes.
  assert.notEqual(bridgeCacheKey("ab", "c", "m"), bridgeCacheKey("a", "bc", "m"));
  assert.notEqual(bridgeCacheKey("x", "yz", "m"), bridgeCacheKey("x", "y", "zm"));
});

test("video cache keys change with every visual dedup policy dimension", () => {
  const base = {
    dedupCandidateFrameCount: 16,
    dedupPolicyVersion: "grayscale-16x16-mean-cells-v2",
    dedupThreshold: 0.04,
  };
  const key = bridgeCacheKey("video", "describe", "gpt-4o-mini", base);

  assert.notEqual(
    key,
    bridgeCacheKey("video", "describe", "gpt-4o-mini", {
      ...base,
      dedupPolicyVersion: "grayscale-16x16-mean-cells-v3",
    })
  );
  assert.notEqual(
    key,
    bridgeCacheKey("video", "describe", "gpt-4o-mini", {
      ...base,
      dedupThreshold: 0.05,
    })
  );
  assert.notEqual(
    key,
    bridgeCacheKey("video", "describe", "gpt-4o-mini", {
      ...base,
      dedupCandidateFrameCount: 8,
    })
  );
});

test("get/set roundtrip and TTL expiry", () => {
  let now = 1000;
  const cache = new BridgeCache({ maxEntries: 10, ttlMs: 500, now: () => now });
  cache.set("k1", "desc");
  assert.equal(cache.get("k1"), "desc");
  now = 1600;
  assert.equal(cache.get("k1"), undefined);
});

test("LRU evicts oldest when full", () => {
  const cache = new BridgeCache({ maxEntries: 2, ttlMs: 60000, now: () => 0 });
  cache.set("a", "1");
  cache.set("b", "2");
  cache.get("a");
  cache.set("c", "3");
  assert.equal(cache.get("b"), undefined);
  assert.equal(cache.get("a"), "1");
});

test("getSharedBridgeCacheFor reuses the instance for the same config and recreates on change", () => {
  const base = resolveVisionBridgeRuntimeSettings({});
  const a = getSharedBridgeCacheFor(base);
  const b = getSharedBridgeCacheFor({ ...base });
  assert.equal(a, b);

  const c = getSharedBridgeCacheFor({ ...base, cacheTtlMinutes: base.cacheTtlMinutes + 5 });
  assert.notEqual(c, a);

  const d = getSharedBridgeCacheFor({ ...base, cacheTtlMinutes: base.cacheTtlMinutes + 5 });
  assert.equal(d, c);

  const e = getSharedBridgeCacheFor({
    ...base,
    cacheTtlMinutes: base.cacheTtlMinutes + 5,
    cacheMaxEntries: base.cacheMaxEntries + 1,
  });
  assert.notEqual(e, d);
});
