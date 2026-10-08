import test from "node:test";
import assert from "node:assert/strict";

// Observability of the refusal store: one log line per write (kind, period,
// repeat count) with a credential-free label, a readable proof in pool
// visibility (transport evidence plus store instance), and a single warning
// when the module loads twice. Entries come from the production reader
// proxyEgressKey (same order, same fields), never hand-written tables.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const START_MS = 1_800_000_000_000;

function captureWarn() {
  const lines: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map((a) => String(a)).join(" "));
  };
  return { lines, restore: () => void (console.warn = original) };
}

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetTransportEvidenceForTesting();
});

test("a transport write logs one line with kind, period and streak", () => {
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({
      type: "http",
      host: "203.0.113.7",
      port: 8080,
      username: "user",
      password: "s3cret",
    });
    assert.ok(key);
    const period = memory.noteProxyRefusal(key, "transport", START_MS);
    assert.ok(typeof period === "number" && period > 0);
    const writes = cap.lines.filter((l) => l.includes("set aside"));
    assert.equal(writes.length, 1);
    assert.ok(writes[0].includes("kind=transport"));
    assert.ok(writes[0].includes(`periodMs=${period}`));
    assert.ok(writes[0].includes("streak=1"));
    assert.ok(!writes[0].includes("user"));
    assert.ok(!writes[0].includes("s3cret"));
  } finally {
    cap.restore();
  }
});

test("a second write inside the period logs nothing", () => {
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.8", port: 8080 });
    assert.ok(key);
    assert.ok(memory.noteProxyRefusal(key, "transport", START_MS) !== null);
    const afterFirst = cap.lines.filter((l) => l.includes("set aside")).length;
    assert.equal(afterFirst, 1);
    assert.equal(memory.noteProxyRefusal(key, "transport", START_MS + 1000), null);
    assert.equal(cap.lines.filter((l) => l.includes("set aside")).length, 1);
  } finally {
    cap.restore();
  }
});

test("an effective recovery logs one line, a no-op recovery logs nothing", () => {
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.9", port: 8080 });
    assert.ok(key);
    assert.ok(memory.noteProxyRefusal(key, "proxy_unreachable", START_MS) !== null);
    memory.noteProxyRecovered(key, "proxy_unreachable", START_MS + 10_000);
    const recoveries = cap.lines.filter((l) => l.includes("recovered"));
    assert.equal(recoveries.length, 1);
    assert.ok(recoveries[0].includes("kind=proxy_unreachable"));
    const before = cap.lines.length;
    memory.noteProxyRecovered(key, "proxy_unreachable", START_MS + 20_000);
    assert.equal(cap.lines.length, before);
  } finally {
    cap.restore();
  }
});

test("a member write carries the member name", () => {
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.10", port: 8080 });
    assert.ok(key);
    assert.ok(memory.noteProxyMemberRefusal(key, "node-1", "slow", START_MS) !== null);
    const writes = cap.lines.filter((l) => l.includes("set aside"));
    assert.equal(writes.length, 1);
    assert.ok(writes[0].includes("node-1"));
  } finally {
    cap.restore();
  }
});

test("the label keeps scheme, host and port only", () => {
  const cases: Array<[unknown, string]> = [
    ["http://user:s3cret@h:8080", "http://h:8080"],
    ["http://@h:8080", "http://h:8080"],
    ["http://[::1]:8080", "http://[::1]:8080"],
    ["http://h:8080?family=ipv4", "http://h:8080"],
  ];
  for (const [input, label] of cases) {
    const key = memory.proxyEgressKey(input);
    assert.ok(key, String(input));
    assert.equal(memory.describeEgressForLog(key), label);
  }
});

test("transport evidence counts failures and cross successes in the window", () => {
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.11", port: 8080 });
    const other = memory.proxyEgressKey({ type: "http", host: "203.0.113.12", port: 8080 });
    assert.ok(key && other);
    const destination = "example.com";
    memory.recordTransportFailure(key, destination, START_MS);
    memory.recordTransportFailure(key, destination, START_MS + 1000);
    memory.recordTransportFailure(key, destination, START_MS + 2000);
    memory.recordTransportSuccess(destination, other, START_MS + 3000);
    const evidence = memory.countTransportEvidenceFor(key, START_MS + 4000);
    assert.equal(evidence.failures, 3);
    assert.equal(evidence.crossSuccesses, 1);
    const sizeBefore = memory.__transportEvidenceSizeForTesting();
    memory.countTransportEvidenceFor(key, START_MS + 4000);
    assert.deepEqual(memory.__transportEvidenceSizeForTesting(), sizeBefore);
  } finally {
    cap.restore();
  }
});

test("with the flag off the transport caller writes nothing so no line appears", async () => {
  // The store itself never reads PROXY_SKIP_RECENTLY_FAILED (pure by design);
  // the real caller noteTransportOutcome gates on it. Flag off: the gated
  // caller writes nothing, so no log line appears and the memory stays empty.
  const cap = captureWarn();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  try {
    const outcome = await import("../../open-sse/utils/proxyTransportOutcome.ts");
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.14", port: 8080 });
    assert.ok(key);
    const destination = "example.com";
    memory.recordTransportFailure(key, destination, START_MS);
    memory.recordTransportFailure(key, destination, START_MS + 1);
    memory.recordTransportFailure(key, destination, START_MS + 2);
    const peer = memory.proxyEgressKey({ type: "http", host: "203.0.113.15", port: 8080 });
    memory.recordTransportSuccess(destination, peer, START_MS + 3);
    assert.equal(memory.hasTransportCrossEvidence(key, destination, START_MS + 4), true);
    const sizeBefore = memory.__proxyRefusalMemorySizeForTesting();
    const linesBefore = cap.lines.filter((l) => l.includes("set aside")).length;
    outcome.noteTransportOutcome({ key, destination, nowMs: START_MS + 4 });
    assert.equal(memory.__proxyRefusalMemorySizeForTesting(), sizeBefore);
    assert.equal(cap.lines.filter((l) => l.includes("set aside")).length, linesBefore);
  } finally {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    cap.restore();
  }
});

test("the store instance is stable within one load", () => {
  assert.equal(memory.getRefusalStoreInstance(), memory.getRefusalStoreInstance());
  assert.match(memory.getRefusalStoreInstance(), /^[0-9a-f]{8}$/);
});

test("a second module load warns exactly once", async () => {
  // A query-suffixed re-import is a genuinely fresh module copy sharing only
  // globalThis: instance ids must differ, and the duplicate-load warning must
  // fire exactly once (the shared guard suppresses the copy's twin).
  const cap = captureWarn();
  try {
    const fresh: typeof memory =
      await import("../../open-sse/utils/proxyRefusalMemory.ts?reload=observability");
    assert.notEqual(fresh.getRefusalStoreInstance(), memory.getRefusalStoreInstance());
    const warns = cap.lines.filter((l) => l.includes("loaded more than once"));
    assert.equal(warns.length, 1);
    const sizeBefore = memory.__proxyRefusalMemorySizeForTesting();
    fresh.__resetProxyRefusalMemoryForTesting();
    assert.equal(memory.__proxyRefusalMemorySizeForTesting(), sizeBefore);
  } finally {
    cap.restore();
  }
});

test("functional: three transport failures plus a cross success set the egress aside with one log line", () => {
  // Real-world shape: an egress fails transport repeatedly while the same
  // destination answers through another egress. Evidence condemns the member,
  // the write lands, and exactly one journal line appears.
  const cap = captureWarn();
  try {
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.21", port: 8080 });
    const peer = memory.proxyEgressKey({ type: "http", host: "203.0.113.22", port: 8080 });
    assert.ok(key && peer);
    const destination = "example.com";
    memory.recordTransportFailure(key, destination, START_MS);
    memory.recordTransportFailure(key, destination, START_MS + 1000);
    memory.recordTransportFailure(key, destination, START_MS + 2000);
    memory.recordTransportSuccess(destination, peer, START_MS + 3000);
    assert.equal(memory.hasTransportCrossEvidence(key, destination, START_MS + 4000), true);
    const period = memory.noteProxyRefusal(key, "transport", START_MS + 4000);
    assert.ok(typeof period === "number" && period > 0);
    assert.equal(memory.isProxyAvoided(key, START_MS + 4001), true);
    const writes = cap.lines.filter((l) => l.includes("set aside"));
    assert.equal(writes.length, 1);
    assert.ok(writes[0].includes("kind=transport"));
    const evidence = memory.countTransportEvidenceFor(key, START_MS + 4001);
    assert.equal(evidence.failures, 3);
    assert.equal(evidence.crossSuccesses, 1);
  } finally {
    cap.restore();
  }
});

test("the stores return to their starting size after writes", () => {
  const cap = captureWarn();
  try {
    const memoryBefore = memory.__proxyRefusalMemorySizeForTesting();
    const key = memory.proxyEgressKey({ type: "http", host: "203.0.113.13", port: 8080 });
    assert.ok(key);
    memory.noteProxyRefusal(key, "transport", START_MS);
    memory.recordTransportFailure(key, "example.com", START_MS);
    memory.noteProxyServed(key);
    memory.__resetTransportEvidenceForTesting();
    assert.equal(memory.__proxyRefusalMemorySizeForTesting(), memoryBefore);
    assert.deepEqual(memory.__transportEvidenceSizeForTesting(), { failures: 0, successes: 0 });
  } finally {
    cap.restore();
  }
});
