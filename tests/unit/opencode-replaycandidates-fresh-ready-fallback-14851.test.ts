import test from "node:test";
import assert from "node:assert/strict";

// #14851: replayCandidates' fresh->ready fallback ("serve set-aside accounts
// anyway") must be opt-in. With the flag off the replay leg is empty when every
// cooldown-ready account is set aside (pre-#14750 behavior).

const park = await import("../../open-sse/executors/opencodeParkResume.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const FLAG = "OPENCODE_PARK_REPLAY_SERVE_SETASIDE";
const saved = process.env[FLAG];

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  delete process.env[FLAG];
});

test.after(() => {
  if (saved === undefined) delete process.env[FLAG];
  else process.env[FLAG] = saved;
});

function setAsideAccount() {
  const proxy = { host: "pool-a", port: 8080 };
  const key = memory.proxyEgressKey(proxy);
  assert.ok(key);
  assert.ok(memory.noteProxyRefusal(key, "ip_quota_429") !== null);
  assert.equal(memory.isProxyAvoided(key), true);
  return [{ fingerprint: "fp-a", cooldownUntil: 0, consecutiveFails: 0, proxy }];
}

test("14851: flag unset -> a set-aside dedicated-proxy account is NOT served (default keyOfMember)", () => {
  const leg = park.replayCandidates(setAsideAccount(), Date.now());
  assert.deepEqual(leg, []);
});

test("14851: flag on via env -> set-aside account is served anyway", () => {
  process.env[FLAG] = "true";
  assert.equal(park.replayCandidates(setAsideAccount(), Date.now()).length, 1);
});

test("14851: explicit serveSetAside param overrides env in both directions", () => {
  const accounts = setAsideAccount();
  const keyOf = (a: { proxy: { host: string; port: number } }) => memory.proxyEgressKey(a.proxy);
  assert.equal(park.replayCandidates(accounts, Date.now(), keyOf, true).length, 1);
  process.env[FLAG] = "true";
  assert.deepEqual(park.replayCandidates(accounts, Date.now(), keyOf, false), []);
});

test("14851: fresh accounts are still preferred over set-aside ones regardless of the flag", () => {
  const accounts = [
    ...setAsideAccount(),
    {
      fingerprint: "fp-b",
      cooldownUntil: 0,
      consecutiveFails: 0,
      proxy: { host: "pool-b", port: 8080 },
    },
  ];
  for (const serve of [false, true]) {
    const leg = park.replayCandidates(accounts, Date.now(), undefined, serve);
    assert.deepEqual(
      leg.map((a: { fingerprint: string }) => a.fingerprint),
      ["fp-b"]
    );
  }
});

test("14851: a purely direct account (no proxy) is never excluded, flag off", () => {
  const direct = [{ fingerprint: "fp-d", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
  assert.equal(park.replayCandidates(direct, Date.now()).length, 1);
});
