import assert from "node:assert/strict";
import test from "node:test";

import {
  proxyFetch,
  runWithTlsTracking,
  setTlsClientForTest,
} from "../../open-sse/utils/proxyFetch.ts";
import type { TlsFetchOptions } from "../../open-sse/utils/tlsClient.ts";

// #12656 — when ENABLE_TLS_FINGERPRINT=true, the wreq-js TLS-fingerprint
// transport used to return the Response as soon as headers resolved, with no
// guard on how long the caller then waited for the body's first byte (the
// only timing control, TlsClient's flat `timeout`, defaults to 600_000ms).
// These tests promote the RED probe from the #12656 plan-file into a
// permanent regression suite for the first-byte watchdog added in
// open-sse/utils/tlsFirstByteWatchdog.ts.

type EnvState = Record<string, string | undefined>;

const ENV_KEYS = [
  "ENABLE_TLS_FINGERPRINT",
  "TLS_FINGERPRINT_PROVIDERS",
  "TLS_FIRST_BYTE_WATCHDOG_MS",
] as const;

async function withEnv(env: EnvState, fn: () => Promise<void> | void): Promise<void> {
  const prior = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENV_KEYS) {
    if (env[key] === undefined) delete process.env[key];
    else process.env[key] = env[key];
  }
  try {
    await fn();
  } finally {
    for (const key of ENV_KEYS) {
      if (prior[key] === undefined) delete process.env[key];
      else process.env[key] = prior[key];
    }
    setTlsClientForTest(null);
  }
}

function fakeTlsClient(fetch: (url: string, options?: TlsFetchOptions) => Promise<Response>) {
  return { available: true, fetch };
}

function neverYieldingBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    pull() {
      // Never enqueue, never close — simulates the reported wreq stall.
    },
  });
}

test("#12656 (a) a stalled wreq body falls back to the direct dispatcher within the watchdog window", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: "true", TLS_FIRST_BYTE_WATCHDOG_MS: "80" }, async () => {
    setTlsClientForTest(
      fakeTlsClient(
        async () =>
          new Response(neverYieldingBody(), {
            status: 200,
            headers: { "content-type": "text/event-stream" },
          })
      )
    );

    let dispatcherCalls = 0;
    const startedAt = Date.now();
    const tracked = await runWithTlsTracking("openai", () =>
      proxyFetch(
        "https://example-provider.test/v1/chat/completions",
        { method: "GET" },
        {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("fallback-body", { status: 200 });
          },
        }
      )
    );
    const elapsedMs = Date.now() - startedAt;

    assert.equal(dispatcherCalls, 1);
    assert.equal(await tracked.result.text(), "fallback-body");
    // Well under the OLD 600_000ms flat TlsClient timeout — proves the
    // watchdog fired instead of riding the default request timeout.
    assert.ok(elapsedMs < 5_000, `expected fast fallback, took ${elapsedMs}ms`);
    // tlsStore.used is flipped back to false on the fallback path in
    // proxyFetch's existing catch block, same as any other TLS failure.
    assert.equal(tracked.tlsFingerprintUsed, false);
  });
});

test("#12656 (b) a healthy/fast wreq body is unaffected by the watchdog", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: "true", TLS_FIRST_BYTE_WATCHDOG_MS: "80" }, async () => {
    setTlsClientForTest(fakeTlsClient(async () => new Response("healthy-body", { status: 200 })));

    let dispatcherCalls = 0;
    const tracked = await runWithTlsTracking("openai", () =>
      proxyFetch(
        "https://example-provider.test/v1/chat/completions",
        { method: "GET" },
        {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("fallback-body", { status: 200 });
          },
        }
      )
    );

    assert.equal(dispatcherCalls, 0);
    assert.equal(await tracked.result.text(), "healthy-body");
    assert.equal(tracked.tlsFingerprintUsed, true);
  });
});

test("#12656 (c) a non-replay-safe POST throws on watchdog timeout instead of silently retrying", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: "true", TLS_FIRST_BYTE_WATCHDOG_MS: "80" }, async () => {
    setTlsClientForTest(
      fakeTlsClient(
        async () =>
          new Response(neverYieldingBody(), {
            status: 200,
            headers: { "content-type": "text/event-stream" },
          })
      )
    );

    let dispatcherCalls = 0;
    await assert.rejects(
      runWithTlsTracking("openai", () =>
        proxyFetch(
          "https://example-provider.test/v1/chat/completions",
          { method: "POST", body: "{}" },
          {
            undiciFetch: async () => {
              dispatcherCalls++;
              return new Response("unexpected", { status: 200 });
            },
          }
        )
      ),
      (error: Error) =>
        error.message === "TLS fingerprint request failed; request is not safe to replay"
    );
    assert.equal(dispatcherCalls, 0);
  });
});
