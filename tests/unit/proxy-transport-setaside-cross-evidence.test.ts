import test from "node:test";
import assert from "node:assert/strict";

// A proxy that repeatedly fails at the transport layer is set aside only with
// cross-evidence: repeated tagged failures through one egress plus a real
// success to the same destination through a different egress. An isolated
// failure, a globally unreachable destination, a single-member pool, an edge
// relay (null key), an expired window, or a disabled opt-in flag never write.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { noteTransportOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");

const EGRESS_A = { type: "http", host: "10.9.0.1", port: 8080 };
const EGRESS_B = { type: "http", host: "10.9.0.2", port: 8080 };
const KEY_A = memory.proxyEgressKey(EGRESS_A);
const KEY_B = memory.proxyEgressKey(EGRESS_B);
const DEST = "api.example.com";
const START = 1_700_000_000_000;

assert.ok(KEY_A && KEY_B && KEY_A !== KEY_B);

const WINDOW = memory.TRANSPORT_EVIDENCE_WINDOW_MS;

function fail(key, dest, t) {
  memory.recordTransportFailure(key, dest, t);
  noteTransportOutcome({ key, destination: dest, nowMs: t });
}

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetTransportEvidenceForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetTransportEvidenceForTesting();
});

test("repeated tagged failures plus cross-egress success set the member aside", () => {
  assert.equal(memory.isProxyAvoided(KEY_A, START), false);
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 2_000), false);
  memory.recordTransportSuccess(DEST, KEY_B, START + 2_500);
  fail(KEY_A, DEST, START + 3_000);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 3_000), true);
});

test("without cross-egress success nothing is set aside", () => {
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  fail(KEY_A, DEST, START + 2_000);
  fail(KEY_A, DEST, START + 3_000);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 4_000), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("an isolated failure or two never set anything aside", () => {
  fail(KEY_A, DEST, START);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 500), false);
  memory.recordTransportSuccess(DEST, KEY_B, START + 600);
  fail(KEY_A, DEST, START + 700);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 800), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("success through the same egress is not cross-evidence", () => {
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  memory.recordTransportSuccess(DEST, KEY_A, START + 1_500);
  fail(KEY_A, DEST, START + 2_000);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 2_500), false);
});

test("an expired window is not evidence", () => {
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  memory.recordTransportSuccess(DEST, KEY_B, START + 2_000);
  fail(KEY_A, DEST, START + WINDOW + 60_000);
  assert.equal(memory.isProxyAvoided(KEY_A, START + WINDOW + 61_000), false);
});

test("a disabled opt-in flag writes nothing", () => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  memory.recordTransportSuccess(DEST, KEY_B, START + 1_500);
  fail(KEY_A, DEST, START + 2_000);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a null key or edge relay writes nothing", () => {
  noteTransportOutcome({ key: null, destination: DEST, nowMs: START });
  noteTransportOutcome({ key: null, destination: DEST, nowMs: START, poolSize: 5 });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a single-member pool writes nothing", () => {
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  memory.recordTransportSuccess(DEST, KEY_B, START + 1_500);
  noteTransportOutcome({ key: KEY_A, destination: DEST, nowMs: START + 2_000, poolSize: 1 });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
  // Without a known size the decision still goes through evidence alone.
  fail(KEY_A, DEST, START + 2_500);
  assert.equal(memory.isProxyAvoided(KEY_A, START + 2_500), true);
});

test("the set-aside uses the transport curve and the doubling still applies", () => {
  fail(KEY_A, DEST, START);
  fail(KEY_A, DEST, START + 1_000);
  memory.recordTransportSuccess(DEST, KEY_B, START + 1_500);
  const first = memory.noteProxyRefusal(KEY_A, "transport", START + 2_000);
  assert.equal(first, 60_000);
  const until = START + 2_000 + 60_000;
  const second = memory.noteProxyRefusal(KEY_A, "transport", until);
  assert.equal(second, 120_000);
});

test("evidence stores stay bounded", () => {
  for (let i = 0; i < 1_050; i++) {
    memory.recordTransportFailure(
      `http://@h:${10_000 + (i % 999)}`,
      `d${i}.example.com`,
      START + i
    );
  }
  assert.ok(memory.__transportEvidenceSizeForTesting().failures <= 1000);
  for (let i = 0; i < 1_050; i++) {
    memory.recordTransportSuccess(`d${i}.example.com`, `http://@h:${20_000 + (i % 999)}`, START);
  }
  assert.ok(memory.__transportEvidenceSizeForTesting().successes <= 1000);
});

test("with the opt-in flag off the dispatcher hooks record no evidence", async () => {
  const { recordFinalTransportOutcome, recordProxiedSuccess } =
    await import("../../open-sse/utils/proxyTransportOutcome.ts");
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  recordProxiedSuccess("http://10.9.0.2:8080", "https://api.example.com/v1/chat");
  await recordFinalTransportOutcome("http://10.9.0.1:8080", "https://api.example.com/v1/chat");
  assert.deepEqual(memory.__transportEvidenceSizeForTesting(), { failures: 0, successes: 0 });
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  recordProxiedSuccess("http://10.9.0.2:8080", "https://api.example.com/v1/chat");
  assert.deepEqual(memory.__transportEvidenceSizeForTesting(), { failures: 0, successes: 1 });
});

test("the open-sse evidence store never reaches into src/sse", async () => {
  const { readFile } = await import("node:fs/promises");
  for (const rel of ["proxyRefusalMemory.ts", "proxyTransportOutcome.ts"]) {
    const src = await readFile(new URL(`../../open-sse/utils/${rel}`, import.meta.url), "utf8");
    assert.equal(/["']@\/sse\//.test(src), false, `${rel} must not import @/sse/*`);
  }
});

test("a transport set-aside is announced to transition listeners as kind transport", async () => {
  const { onProxyTransition } = await import("../../open-sse/utils/proxyTransitionListeners.ts");
  const seen: string[] = [];
  const off = onProxyTransition((t) => seen.push(t.kind));
  try {
    memory.recordTransportSuccess(DEST, KEY_B, START);
    for (let i = 0; i < memory.TRANSPORT_EVIDENCE_THRESHOLD; i++) fail(KEY_A, DEST, START + i);
    assert.deepEqual(seen, ["transport"]);
  } finally {
    off();
  }
});
