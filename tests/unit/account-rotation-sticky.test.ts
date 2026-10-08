import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  pickAccount,
  markSuccess,
  type RotatableAccount,
} from "../../open-sse/executors/accountRotation.ts";
import {
  noteProxyRefusal,
  noteProxyServed,
  proxyEgressKey,
  __resetProxyRefusalMemoryForTesting,
} from "../../open-sse/utils/proxyRefusalMemory.ts";

type Fleet = RotatableAccount[];

function proxy(port: number): RotatableAccount["proxy"] {
  return { type: "http", host: "127.0.0.1", port };
}

function fleet(): Fleet {
  return [
    { fingerprint: "m0", cooldownUntil: 0, consecutiveFails: 0, proxy: proxy(9001) },
    { fingerprint: "m1", cooldownUntil: 0, consecutiveFails: 0, proxy: proxy(9002) },
    { fingerprint: "m2", cooldownUntil: 0, consecutiveFails: 0, proxy: proxy(9003) },
  ];
}

// RED-first (E1): R2 (sticky) and R3 (store drain) MUST fail on the blind head.
// R1 documents the shared-cursor dispersion (passes already — non-regression guard).
// R4 is the #13153-like flag-off terminal: order byte-identical to the blind head
// even with store history present.

describe("account-rotation sticky head (flag-gated)", () => {
  beforeEach(() => {
    __resetProxyRefusalMemoryForTesting();
    process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  });

  afterEach(() => {
    __resetProxyRefusalMemoryForTesting();
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  });

  it("R1: two sequential picks on the shared cursor yield distinct members", () => {
    const accounts = fleet();
    const state = { nextAccountIdx: 0 };
    const first = pickAccount(accounts, state);
    const second = pickAccount(accounts, state);
    assert.notEqual(
      second.fingerprint,
      first.fingerprint,
      "shared cursor must disperse sequential picks (2 cids model)"
    );
  });

  it("R2: memorized member is re-served without blind re-scan when cursor is stuck", () => {
    const accounts = fleet();
    const state = { nextAccountIdx: 0 };
    const first = pickAccount(accounts, state);
    assert.equal(
      (state as { lastHealthyFingerprint?: string }).lastHealthyFingerprint,
      first.fingerprint,
      "head must memorize the last healthy fingerprint on serve"
    );
    // Refusal on m1 happens through the shared store (the executor writes it on
    // 429): cursor now points at the drained m1 — sticky m0 must win over a
    // blind scan (which would land on m2), without re-scanning.
    const key1 = proxyEgressKey(accounts[1].proxy);
    assert.ok(key1);
    assert.ok(noteProxyRefusal(key1, "ip_quota_429") !== null);
    const second = pickAccount(accounts, state);
    assert.equal(second.fingerprint, first.fingerprint);
  });

  it("R2b: sticky yields when the memorized member is no longer ready", () => {
    const accounts = fleet();
    const state = { nextAccountIdx: 0 };
    const first = pickAccount(accounts, state);
    const memorized = (state as { lastHealthyFingerprint?: string }).lastHealthyFingerprint;
    assert.equal(memorized, first.fingerprint);
    first.cooldownUntil = Date.now() + 60_000;
    const second = pickAccount(accounts, state);
    assert.notEqual(second.fingerprint, first.fingerprint);
  });

  it("R3: store-refused member is skipped while a healthy member exists", () => {
    const accounts = fleet();
    const state = { nextAccountIdx: 0 };
    const key0 = proxyEgressKey(accounts[0].proxy);
    assert.ok(key0, "proxied member must have an egress key");
    assert.ok(noteProxyRefusal(key0, "ip_quota_429") !== null);
    const picked = pickAccount(accounts, state);
    assert.notEqual(picked.fingerprint, "m0", "set-aside member must be drained");
  });

  it("R3b: direct account (null proxy) is never set aside", () => {
    const accounts: Fleet = [
      { fingerprint: "", cooldownUntil: 0, consecutiveFails: 3, proxy: null },
      { fingerprint: "m1", cooldownUntil: 0, consecutiveFails: 0, proxy: proxy(9002) },
    ];
    const state = { nextAccountIdx: 0 };
    assert.equal(proxyEgressKey(accounts[0].proxy), null);
    const picked = pickAccount(accounts, state);
    assert.equal(picked.fingerprint, "", "direct member points first and is never drained");
    const state2 = { nextAccountIdx: 0 };
    noteProxyRefusal(proxyEgressKey(accounts[1].proxy), "ip_quota_429");
    const picked2 = pickAccount(accounts, state2);
    assert.equal(picked2.fingerprint, "", "only non-set-aside left is served");
  });

  it("opt-out: order is byte-identical to the blind head", () => {
    // Store history present, but the flag is opted out: plain rotation, no drain, no sticky.
    const accounts = fleet();
    const key0 = proxyEgressKey(accounts[0].proxy);
    assert.ok(key0);
    assert.ok(noteProxyRefusal(key0, "ip_quota_429") !== null);
    process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
    const state = { nextAccountIdx: 0 };
    const first = pickAccount(accounts, state);
    const second = pickAccount(accounts, state);
    assert.equal(first.fingerprint, "m0", "flag-off: refused member is re-picked (no drain)");
    assert.equal(second.fingerprint, "m1");
    assert.equal(
      (state as { lastHealthyFingerprint?: string }).lastHealthyFingerprint,
      undefined,
      "flag-off: no sticky memory written"
    );
  });

  it("E3a: saturation (all set aside) still serves instead of hanging", () => {
    const accounts = fleet();
    for (const a of accounts) {
      const k = proxyEgressKey(a.proxy);
      assert.ok(k);
      assert.ok(noteProxyRefusal(k, "ip_quota_429") !== null);
    }
    const picked = pickAccount(accounts, { nextAccountIdx: 0 });
    assert.ok(["m0", "m1", "m2"].includes(picked.fingerprint));
  });

  it("E3b: terminal-evicted but store-clean member is served as before (no accidental drain)", () => {
    const accounts = fleet();
    accounts[0].evictedAt = Date.now();
    accounts[0].consecutiveFails = 3;
    const picked = pickAccount(accounts, { nextAccountIdx: 0 });
    assert.equal(picked.fingerprint, "m0", "store holds nothing: head must not invent a drain");
  });

  it("E3c: markSuccess does not free the store, noteProxyServed does (m6)", () => {
    const accounts = fleet();
    const key0 = proxyEgressKey(accounts[0].proxy);
    assert.ok(key0);
    assert.ok(noteProxyRefusal(key0, "ip_quota_429") !== null);
    markSuccess(accounts[0]);
    assert.equal(
      pickAccount(accounts, { nextAccountIdx: 0 }).fingerprint,
      "m1",
      "head success must not free the store set-aside"
    );
    noteProxyServed(key0);
    assert.equal(
      pickAccount(accounts, { nextAccountIdx: 0 }).fingerprint,
      "m0",
      "proxy served frees the store"
    );
  });

  it("E3d: custom isReady=false is never served, sticky or not (m4)", () => {
    const accounts = fleet();
    const state = { nextAccountIdx: 0 };
    pickAccount(accounts, state); // memorizes m0
    assert.equal(
      (state as { lastHealthyFingerprint?: string }).lastHealthyFingerprint,
      "m0"
    );
    const picked = pickAccount(accounts, state, (a) => a.fingerprint !== "m0");
    assert.notEqual(picked.fingerprint, "m0");
  });

  it("E3e: 15-slot refused wave re-picks dispersed, never in sync (functional)", () => {
    const mk = (i: number): RotatableAccount => ({
      fingerprint: `slot-${i}`,
      cooldownUntil: 0,
      consecutiveFails: 0,
      proxy: { type: "http", host: "127.0.0.1", port: 9100 + i },
    });
    const wave1: Fleet = Array.from({ length: 15 }, (_, i) => mk(i));
    const wave2: Fleet = Array.from({ length: 15 }, (_, i) => mk(i));
    // Same refusal hits slot-0 on both waves.
    for (const w of [wave1, wave2]) {
      const k = proxyEgressKey(w[0].proxy);
      assert.ok(k);
    }
    __resetProxyRefusalMemoryForTesting();
    assert.ok(noteProxyRefusal(proxyEgressKey(wave1[0].proxy), "ip_quota_429") !== null);
    // Two cids sharing one cursor (P2/P3: same instance) disperse the 1st pick.
    const shared = { nextAccountIdx: 0 };
    const c1 = pickAccount(wave1, shared);
    const c2 = pickAccount(wave2, shared);
    assert.notEqual(c1.fingerprint, c2.fingerprint);
    assert.notEqual(c1.fingerprint, "slot-0", "refused slot drained");
  });
});
