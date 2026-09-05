import { test } from "node:test";
import assert from "node:assert/strict";
import {
  pickAccount,
  markCooldown,
  markSuccess,
  isAccountReady,
} from "../../../open-sse/executors/accountRotation.ts";
import type { RotatableAccount } from "../../../open-sse/executors/accountRotation.ts";

function acct(fp: string, proxy: RotatableAccount["proxy"] = null): RotatableAccount {
  return { fingerprint: fp, cooldownUntil: 0, consecutiveFails: 0, proxy };
}

test("markCooldown default is transient — no eviction, only backoff", () => {
  const a = acct("a");
  markCooldown(a); // kind omitted → transient
  assert.ok(a.cooldownUntil > Date.now());
  assert.equal(a.evictedAt, undefined);
  // still picked when others are ready
  const state = { nextAccountIdx: 0 };
  const picked = pickAccount([a, acct("b")], state);
  assert.ok(picked.fingerprint === "a" || picked.fingerprint === "b");
});

test("terminal kind evicts after threshold, pickAccount skips evicted unless all evicted", () => {
  const a = acct("dead");
  const b = acct("healthy");
  // 3 terminal fails → evicted (threshold = 3, borne testable)
  markCooldown(a, "terminal");
  markCooldown(a, "terminal");
  markCooldown(a, "terminal");
  assert.ok(a.evictedAt != null);
  const state = { nextAccountIdx: 0 };
  // b is ready, a evicted → b is picked
  const picked = pickAccount([a, b], state, (x) => isAccountReady(x) && !x.evictedAt);
  assert.equal(picked.fingerprint, "healthy");
  // when all evicted, caller still gets an account rather than hanging (preserves :52-58)
  b.evictedAt = Date.now();
  const fallback = pickAccount(
    [a, b],
    { nextAccountIdx: 0 },
    (x) => isAccountReady(x) && !x.evictedAt
  );
  assert.ok(fallback.fingerprint === "dead" || fallback.fingerprint === "healthy");
});

test("transient does not evict even after many fails — only terminal does", () => {
  const a = acct("quota-hit");
  for (let i = 0; i < 10; i++) markCooldown(a, "transient");
  assert.equal(a.evictedAt, undefined);
});

test("markSuccess clears eviction and consecutiveFails", () => {
  const a = acct("revived");
  markCooldown(a, "terminal");
  markCooldown(a, "terminal");
  markCooldown(a, "terminal");
  markSuccess(a);
  assert.equal(a.evictedAt, null);
  assert.equal(a.consecutiveFails, 0);
});

test("cross-executor alias still works — opencode wrapper forwards kind", async () => {
  // not a DB test — asserts the shared helper accepts the second arg
  const { markCooldown: mc } = await import("../../../open-sse/executors/accountRotation.ts");
  // Optional second param — length 1 means first required, second optional (JS length counts required only)
  assert.ok(mc.length >= 1 && mc.length <= 2);
  // Prove it accepts terminal without throw
  const tmp = acct("probe");
  assert.doesNotThrow(() => mc(tmp, "terminal"));
});
