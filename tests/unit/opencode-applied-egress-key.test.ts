import test from "node:test";
import assert from "node:assert/strict";

// Applied egress key: pool-served proxyless accounts use the egress actually
// applied to the attempt, not the "direct" sentinel. Fakes only — never a real
// AsyncLocalStorage nor a real fetch.

const throttle = await import("../../open-sse/executors/opencodeEgressThrottle.ts");
const rotation = await import("../../open-sse/executors/accountRotation.ts");
const park = await import("../../open-sse/executors/opencodeParkResume.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const KEY_A = "http://@pool-a:8080";
const KEY_B = "http://@pool-b:8080";

test.beforeEach(() => {
  throttle._clearEgressThrottleForTest();
  memory.__resetProxyRefusalMemoryForTesting();
});

test("1. semaphore: B on key B is not throttled by a saturated key A", async () => {
  const cfg = throttle.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: "1" });
  const byPrint = new Map([
    ["fp-a", KEY_A],
    ["fp-b", KEY_B],
  ]);
  const readApplied = (a: { fingerprint?: string }) => byPrint.get(a.fingerprint ?? "") ?? null;
  // Saturate key A (cap 2): two running slots.
  const r1 = await throttle.acquireEgressSlot(KEY_A, cfg, { nowMs: 1000 });
  const r2 = await throttle.acquireEgressSlot(KEY_A, cfg, { nowMs: 1000 });
  assert.ok(r1 && r2);
  // A re-acquire through the applied key of B resolves immediately (key B idle).
  const keyB = throttle.resolveAppliedEgressKey({ proxy: null, fingerprint: "fp-b" }, readApplied);
  assert.equal(keyB, KEY_B);
  const slotB = await throttle.acquireEgressSlot(keyB, cfg, { nowMs: 1000 });
  assert.ok(slotB, "B must not wait on A's saturated gate");
  r1();
  r2();
  slotB();
});

test("2. filter/sticky: a set-aside key A drains A, B is served, fallback serves anyway", () => {
  const byPrint = new Map([
    ["fp-a", KEY_A],
    ["fp-b", KEY_B],
  ]);
  const readApplied = (a: { fingerprint?: string }) => byPrint.get(a.fingerprint ?? "") ?? null;
  const keyOf = (a: { proxy: { host: string; port: number } | null; fingerprint: string }) =>
    a.proxy !== null ? memory.proxyEgressKey(a.proxy) : readApplied(a);
  const accounts = [
    { fingerprint: "fp-a", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
    { fingerprint: "fp-b", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ];
  const state = { nextAccountIdx: 0, lastHealthyFingerprint: "fp-b" };
  const written = memory.noteProxyRefusal(KEY_A, "ip_quota_429");
  assert.ok(written !== null);
  // Filter level: A drained, B eligible.
  const isCandidate = (a: (typeof accounts)[number]) =>
    a.cooldownUntil <= Date.now() && !memory.isProxyAvoided(keyOf(a));
  assert.equal(isCandidate(accounts[0]), false);
  assert.equal(isCandidate(accounts[1]), true);
  const picked = rotation.pickAccount(accounts, state, (a) => isCandidate(a), keyOf);
  assert.equal(picked.fingerprint, "fp-b");
  // Fallback: everything set aside -> still served.
  memory.noteProxyRefusal(KEY_B, "ip_quota_429");
  const picked2 = rotation.pickAccount(accounts, state, (a) => isCandidate(a), keyOf);
  assert.ok(picked2.fingerprint === "fp-a" || picked2.fingerprint === "fp-b");
});

test("3a. dedicated proxy: reader never called, byte-identical keys", () => {
  let calls = 0;
  const spy = () => {
    calls++;
    return KEY_A;
  };
  const key = throttle.resolveAppliedEgressKey({ proxy: { host: "h", port: 8080 } }, spy);
  assert.equal(key, throttle.egressKeyOf({ host: "h", port: 8080 }));
  assert.equal(calls, 0);
});

test("3b. no reader: sentinel, unchanged", () => {
  assert.equal(throttle.resolveAppliedEgressKey({ proxy: null }), "direct");
});

test("3c. fake returning 'direct' never writes to the refusal store", () => {
  const written = throttle.noteRefusedMember(
    { proxy: null, fingerprint: "fp-a" },
    true,
    () => "direct"
  );
  assert.equal(written, null);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("4. key-space guard: no '://'-shaped key in tried-sets after a pool 429", async () => {
  // tried-sets stay in proxyKeyOf space (host:port, null for proxyless);
  // the egress key only ever reaches the refusal memory.
  const { proxyKeyOf } = await import("../../open-sse/executors/opencodeGeoBlock.ts");
  assert.equal(proxyKeyOf(null), null);
  const rateLimitedProxyKeys = new Set<string>();
  const account = { proxy: null };
  const rateKey = proxyKeyOf(account.proxy);
  if (rateKey !== null) rateLimitedProxyKeys.add(rateKey);
  assert.equal(rateLimitedProxyKeys.size, 0);
  for (const k of rateLimitedProxyKeys) assert.ok(!k.includes("://"));
});

test("5. replay: all set aside but cooldown-ready -> non-empty leg (fallback); none ready -> []", () => {
  memory.noteProxyRefusal(KEY_A, "ip_quota_429");
  memory.noteProxyRefusal(KEY_B, "ip_quota_429");
  const byPrint = new Map([
    ["fp-a", KEY_A],
    ["fp-b", KEY_B],
  ]);
  const keyOf = (a: { proxy: null; fingerprint: string }) => byPrint.get(a.fingerprint) ?? null;
  const now = Date.now();
  const accounts = [
    { fingerprint: "fp-a", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
    { fingerprint: "fp-b", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ];
  const leg = park.replayCandidates(accounts, now, keyOf);
  assert.ok(leg.length > 0, "fallback: serve anyway");
  assert.ok(leg.length <= park.PARK_PROBE_MAX);
  const cooling = [
    {
      fingerprint: "fp-a",
      cooldownUntil: now + 60_000,
      consecutiveFails: 1,
      proxy: null,
    },
  ];
  assert.deepEqual(park.replayCandidates(cooling, now, keyOf), []);
});

test("6. URL verdict: NO_PROXY/local target -> sentinel despite pool ambient", async () => {
  const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
  // Local targets always bypass any proxy (host-based proof, no ALS involved).
  const local = resolveProxyForRequest("http://127.0.0.1:11434/v1/chat/completions");
  assert.equal(local.source, "direct");
  assert.equal(local.proxyUrl, null);
});

test("7. functional: real ALS pool scope -> pool key; outside -> sentinel", async () => {
  // Same chain as the opencode.ts reader: resolveProxyForRequest + proxyEgressKey,
  // inside a REAL runWithProxyContext (no fake reader, no fetch).
  const fetchMod = await import("../../open-sse/utils/proxyFetch.ts");
  const poolProxy = { type: "http", host: "pool-a", port: 8080 };
  const readReal = (targetUrl: string): string | null => {
    let r;
    try {
      r = fetchMod.resolveProxyForRequest(targetUrl);
    } catch {
      return null;
    }
    if (r.source !== "context" || !r.proxyUrl) return null;
    return memory.proxyEgressKey(r.proxyUrl);
  };
  const target = "https://opencode.ai/zen/v1/chat/completions";
  const inside = await fetchMod.runWithProxyContext(poolProxy, () => readReal(target));
  assert.equal(inside, KEY_A);
  assert.equal(readReal(target), null);
});

test("8. tracker: memo per iteration, fingerprint history, sentinel never stored", async () => {
  let ambient = KEY_A;
  const tracker = throttle.createAppliedEgressTracker(
    "https://opencode.ai/zen/v1/chat/completions",
    () => ({
      source: "context",
      proxyUrl: ambient,
    })
  );
  const proxyless = (fp: string) => ({ proxy: null, fingerprint: fp });
  // Memo within one iteration: ambient change invisible until reset.
  assert.equal(tracker.readAppliedKey(proxyless("fp-a")), KEY_A);
  ambient = KEY_B;
  assert.equal(tracker.readAppliedKey(proxyless("fp-a")), KEY_A);
  tracker.resetAttempt();
  assert.equal(tracker.readAppliedKey(proxyless("fp-a")), KEY_B);
  // Served key persists per fingerprint across iterations.
  tracker.rememberServed(proxyless("fp-a"));
  ambient = "http://@pool-c:8080";
  tracker.resetAttempt();
  assert.equal(tracker.readAppliedKey(proxyless("fp-a")), KEY_B);
  // Dedicated proxies bypass the reader; sentinel ambient is never stored.
  assert.equal(
    tracker.keyOfMember({ proxy: { host: "h", port: 1 }, fingerprint: "fp-d" }),
    "http://@h:1"
  );
  const ambientNone = throttle.createAppliedEgressTracker(
    "https://opencode.ai/zen/v1/chat/completions",
    () => ({
      source: "direct",
      proxyUrl: null,
    })
  );
  ambientNone.rememberServed(proxyless("fp-e"));
  assert.equal(ambientNone.readAppliedKey(proxyless("fp-e")), null);
});
