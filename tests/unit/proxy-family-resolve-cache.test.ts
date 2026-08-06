import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  assertHostnameSupportsFamily,
  __clearFamilyCheckCacheForTest,
} from "../../open-sse/utils/proxyFamilyResolve.ts";

describe("proxyFamilyResolve DNS family cache (#9158)", () => {
  beforeEach(() => __clearFamilyCheckCacheForTest());

  it("caches a positive family check so repeated calls reuse DNS", async () => {
    let lookupCount = 0;
    const lookupFn = async () => {
      lookupCount += 1;
      return [{ address: "::1", family: 6 }];
    };
    await assertHostnameSupportsFamily("relay.example.test", 6, lookupFn);
    await assertHostnameSupportsFamily("relay.example.test", 6, lookupFn);
    assert.equal(lookupCount, 1, "second call must hit the positive cache");
  });

  it("re-probes after the test hook clears the cache", async () => {
    let lookupCount = 0;
    const lookupFn = async () => {
      lookupCount += 1;
      return [{ address: "::1", family: 6 }];
    };
    await assertHostnameSupportsFamily("relay.example.test", 6, lookupFn);
    __clearFamilyCheckCacheForTest();
    await assertHostnameSupportsFamily("relay.example.test", 6, lookupFn);
    assert.equal(lookupCount, 2, "cleared cache must re-invoke DNS");
  });

  it("caches a negative result without re-invoking DNS", async () => {
    let lookupCount = 0;
    const failingFn = async () => {
      lookupCount += 1;
      throw new Error("boom");
    };
    await assert.rejects(
      assertHostnameSupportsFamily("relay.example.test", 6, failingFn),
      /resolution/i
    );
    await assert.rejects(
      assertHostnameSupportsFamily("relay.example.test", 6, failingFn),
      /resolution/i
    );
    assert.equal(lookupCount, 1, "negative result must be cached");
  });

  it("no-ops for bracketed IPv6 literals without any DNS lookup", async () => {
    const failingFn = async () => {
      throw new Error("must not be called");
    };
    await assertHostnameSupportsFamily("[2001:db8::1]", 6, failingFn);
  });

  it("keys the cache by lookup function so a different resolver re-probes", async () => {
    let countA = 0;
    const fnA = async () => {
      countA += 1;
      return [{ address: "::1", family: 6 }];
    };
    let countB = 0;
    const fnB = async () => {
      countB += 1;
      return [{ address: "::1", family: 6 }];
    };
    await assertHostnameSupportsFamily("relay.example.test", 6, fnA);
    await assertHostnameSupportsFamily("relay.example.test", 6, fnA);
    await assertHostnameSupportsFamily("relay.example.test", 6, fnB);
    assert.equal(countA, 1);
    assert.equal(countB, 1, "different lookupFn must bypass the cached result");
  });
});
