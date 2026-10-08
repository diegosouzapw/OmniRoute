import test from "node:test";
import assert from "node:assert/strict";

// Simulated traffic through the real proxyFetch proxy path: repeated transport
// failures through one egress plus a success to the same destination through a
// different egress set the failing egress aside; without cross-egress success,
// or with a single-member pool, the member keeps serving.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { proxyFetch, runWithProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
const health = await import("../../src/lib/proxyHealth.ts");

const EGRESS_A = { type: "http", host: "127.0.0.1", port: 18081 };
const EGRESS_B = { type: "http", host: "127.0.0.1", port: 18082 };
const KEY_A = memory.proxyEgressKey(EGRESS_A);
const KEY_B = memory.proxyEgressKey(EGRESS_B);

assert.ok(KEY_A && KEY_B && KEY_A !== KEY_B);

function transportError() {
  const err = new Error("fetch failed") as Error & { code?: string };
  err.code = "UND_ERR_SOCKET";
  return err;
}

function failingUndici() {
  return async () => {
    throw transportError();
  };
}

function okUndici(body: string) {
  return async () => new Response(body, { status: 200 });
}

function withEnv(overrides, fn) {
  const previous = new Map();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return (async () => {
    try {
      return await fn();
    } finally {
      for (const [key, value] of previous.entries()) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  })();
}

// Distribution of final tagged transport failures by egress port, plus how
// often a success through another egress coincided (the gate input).
const gateLog: { port: number; coincided: boolean }[] = [];

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetTransportEvidenceForTesting();
  gateLog.length = 0;
  // The background reachability probe races every proxied request: pin it
  // healthy so only the injected transport outcome drives the evidence.
  // Cause logged: non-blocking fast-fail probe would otherwise condemn the
  // fake 127.0.0.1 egresses before the mock dispatcher settles.
  health.__setProxyHealthTcpCheckForTesting(async () => true);
});

test.afterEach(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  delete process.env.OMNIROUTE_RETRY_BACKOFF_MS;
  health.__setProxyHealthTcpCheckForTesting(null);
  memory.__resetTransportEvidenceForTesting();
});

async function failingAttempt() {
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true", OMNIROUTE_RETRY_BACKOFF_MS: "0" }, () =>
    runWithProxyContext(EGRESS_A, () =>
      assert.rejects(
        proxyFetch(
          "http://api.example.com/v1/chat",
          {},
          {
            undiciFetch: failingUndici(),
          }
        )
      )
    )
  );
  const port = Number(KEY_A.split(":").pop());
  gateLog.push({ port, coincided: memory.__transportEvidenceSizeForTesting().successes > 0 });
  health.invalidateProxyHealth(`http://${EGRESS_A.host}:${EGRESS_A.port}`);
}

async function succeedingAttempt() {
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true" }, () =>
    runWithProxyContext(EGRESS_B, () =>
      proxyFetch("http://api.example.com/v1/chat", {}, { undiciFetch: okUndici("ok") })
    )
  );
  health.invalidateProxyHealth(`http://${EGRESS_B.host}:${EGRESS_B.port}`);
}

test("simulated traffic: failing egress is set aside only with cross-egress success", async () => {
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true" }, async () => {
    await failingAttempt();
    await failingAttempt();
    assert.equal(memory.isProxyAvoided(KEY_A), false, "isolated failures never condemn");
    await succeedingAttempt();
    await failingAttempt();
    assert.equal(memory.isProxyAvoided(KEY_A), true, "k failures + cross success condemn A");
    assert.equal(memory.isProxyAvoided(KEY_B), false, "healthy egress keeps serving");
  });

  const byPort = new Map<number, number>();
  for (const entry of gateLog) byPort.set(entry.port, (byPort.get(entry.port) ?? 0) + 1);
  const coincided = gateLog.filter((e) => e.coincided).length;
  console.log(
    `[gate] final tagged failures by port: ${JSON.stringify([...byPort])}; ` +
      `attempts with cross-egress success present: ${coincided}/${gateLog.length}`
  );
});

test("simulated traffic: global outage never condemns anyone", async () => {
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true" }, async () => {
    await failingAttempt();
    await failingAttempt();
    await failingAttempt();
    await failingAttempt();
    assert.equal(memory.isProxyAvoided(KEY_A), false);
    assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
  });
});

test("simulated traffic: a retried-then-recovered attempt records one success, no failure", async () => {
  let calls = 0;
  const flaky = async () => {
    calls++;
    if (calls === 1) throw transportError();
    return new Response("recovered", { status: 200 });
  };
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true", OMNIROUTE_RETRY_BACKOFF_MS: "0" }, () =>
    runWithProxyContext(EGRESS_A, () =>
      proxyFetch("http://api.example.com/v1/chat", {}, { undiciFetch: flaky })
    )
  );
  assert.equal(calls, 2, "attempt 0 retried once on a fresh dispatcher");
  const sizes = memory.__transportEvidenceSizeForTesting();
  assert.equal(sizes.failures, 0, "a recovered retry records no failure");
  assert.equal(sizes.successes, 1, "the recovered retry records one success");
});

test("simulated traffic: non-replayable body failure counts as one final failure", async () => {
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(new Uint8Array([1]));
      c.close();
    },
  });
  await withEnv({ PROXY_SKIP_RECENTLY_FAILED: "true", OMNIROUTE_RETRY_BACKOFF_MS: "0" }, () =>
    runWithProxyContext(EGRESS_A, () =>
      assert.rejects(
        proxyFetch(
          "http://api.example.com/v1/chat",
          { method: "POST", body: stream, duplex: "half" },
          { undiciFetch: failingUndici() }
        )
      )
    )
  );
  assert.equal(memory.__transportEvidenceSizeForTesting().failures, 1);
});
