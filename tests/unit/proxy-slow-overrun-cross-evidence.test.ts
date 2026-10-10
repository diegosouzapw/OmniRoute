import test from "node:test";
import assert from "node:assert/strict";

// A slow egress is set aside only with cross-egress proof: three settled
// headers-wait overruns through the same key inside five minutes PLUS another
// egress serving the same destination in time inside the window. When every
// egress is slow the destination itself is suspect, so nothing is set aside;
// with no other egress active the repetition alone still decides.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const outcome = await import("../../open-sse/utils/proxyTransportOutcome.ts");
const throttle = await import("../../open-sse/executors/opencodeEgressThrottle.ts");

const KEY = "http://@slow:8080";
const OTHER = "http://@other:8080";
const DEST = "target.example";
const OTHER_DEST = "elsewhere.example";
const START = 1_800_000_000_000;

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetSlowOverrunsForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
});

test.afterEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetSlowOverrunsForTesting();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetSlowOverrunsForTesting();
});

function threeOverruns(key: string, at: number): void {
  memory.recordSlowOverrun(key, at);
  memory.recordSlowOverrun(key, at + 1_000);
  memory.recordSlowOverrun(key, at + 2_000);
}

test("a witness serve to the same destination keeps the set-aside", () => {
  threeOverruns(KEY, START);
  memory.recordSlowServe(OTHER, DEST, START + 3_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, DEST, START + 4_000), true);
});

test("slow peers with no witness serve block the set-aside", () => {
  threeOverruns(KEY, START);
  threeOverruns(OTHER, START);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, DEST, START + 4_000), false);
  assert.equal(memory.hasSlowOverrunEvidence(OTHER, DEST, START + 4_000), false);
});

test("no other egress active keeps the repetition rule", () => {
  threeOverruns(KEY, START);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, DEST, START + 4_000), true);
});

test("a witness serve to another destination does not count", () => {
  threeOverruns(KEY, START);
  memory.recordSlowServe(OTHER, OTHER_DEST, START + 3_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, DEST, START + 4_000), false);
});

test("the witness must be another egress, never the accused one", () => {
  threeOverruns(KEY, START);
  memory.recordSlowServe(KEY, DEST, START + 3_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, DEST, START + 4_000), true);
});

test("a null destination keeps the repetition rule", () => {
  threeOverruns(KEY, START);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, null, START + 4_000), true);
});

test("the slow-serve store is bounded and shared with the slow purge", () => {
  for (let i = 0; i < 1005; i++) {
    memory.recordSlowServe(`http://@h:${10000 + i}`, DEST, START + i);
  }
  assert.equal(memory.__slowServeSizeForTesting(), 1000);
  memory.recordSlowOverrun(KEY, START + 2 * (300_000 + 2 * 600_000) + 2);
  assert.equal(memory.__slowServeSizeForTesting(), 0);
  assert.equal(memory.__slowOverrunSizeForTesting(), 1);
});

test("the direct sentinel is never recorded as a witness", () => {
  outcome.__noteSlowServeOutcomeForTesting("direct", DEST, START);
  outcome.__noteSlowServeOutcomeForTesting(null, DEST, START);
  outcome.__noteSlowServeOutcomeForTesting(OTHER, null, START);
  outcome.__noteSlowServeOutcomeForTesting(OTHER, "", START);
  assert.equal(memory.__slowServeSizeForTesting(), 0);
  outcome.__noteSlowServeOutcomeForTesting(OTHER, DEST, START);
  assert.equal(memory.__slowServeSizeForTesting(), 1);
  assert.equal(memory.hasSlowServeCrossEvidence(KEY, DEST, START + 1), true);
});

test("the slow note threads the destination through to the memory", () => {
  threeOverruns(KEY, START);
  const proxy = { host: "slow", port: 8080 };
  const key = memory.proxyEgressKey(proxy);
  assert.ok(key);
  memory.recordSlowServe(OTHER, DEST, START + 3_000);
  const period = throttle.noteSlowOverrun(
    { proxy, fingerprint: "fp-x" },
    true,
    null,
    START + 4_000,
    {
      destination: DEST,
    }
  );
  assert.equal(period, 60_000);
  assert.equal(memory.isProxyAvoided(key, START + 5_000), true);
});

test("the served tracker records a witness on a won headers race", () => {
  const tracker = throttle.createAppliedEgressTracker(
    "https://target.example/chat/completions",
    () => ({ source: "context", proxyUrl: "http://pool-x:8080" })
  );
  const served = tracker.noteServed(
    { proxy: null, fingerprint: "w-1" },
    { ok: true },
    30_000,
    true
  );
  assert.deepEqual(served, { ok: true });
  assert.equal(memory.__slowServeSizeForTesting(), 1);
  assert.equal(
    memory.hasSlowServeCrossEvidence("http://@pool-y:8080", "target.example", Date.now()),
    true
  );
});

test("the served tracker passes its input through untouched when off", () => {
  const tracker = throttle.createAppliedEgressTracker(
    "https://target.example/chat/completions",
    () => ({ source: "context", proxyUrl: "http://pool-x:8080" })
  );
  const result = { answer: 42 };
  assert.equal(
    tracker.noteServed({ proxy: null, fingerprint: "w-2" }, result, 30_000, false),
    result
  );
  assert.equal(tracker.noteServed({ proxy: null, fingerprint: "w-3" }, result, 0, true), result);
  assert.equal(memory.__slowServeSizeForTesting(), 0);
});
