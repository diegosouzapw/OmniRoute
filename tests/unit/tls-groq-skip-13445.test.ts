// Restored from #13445 (lost in the #13717 squash, see #14062): Groq is excluded from
// Chrome TLS impersonation because Cloudflare answers it with 1010 browser_signature_banned.
import assert from "node:assert/strict";
import test from "node:test";

import {
  proxyFetch,
  runWithTlsTracking,
  isTlsFingerprintActive,
  setTlsClientForTest,
} from "../../open-sse/utils/proxyFetch.ts";
import type { TlsFetchOptions } from "../../open-sse/utils/tlsClient.ts";

type EnvState = Record<string, string | undefined>;
const ENV_KEYS = ["ENABLE_TLS_FINGERPRINT", "TLS_FINGERPRINT_PROVIDERS"];

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

test("explicit allowlisting groq still never enables TLS fingerprint (#14062)", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: "true", TLS_FINGERPRINT_PROVIDERS: "groq" }, () => {
    setTlsClientForTest(fakeTlsClient(async () => new Response(null)));
    assert.equal(isTlsFingerprintActive("groq", false), false);
    assert.equal(isTlsFingerprintActive("groq", true), false);
  });
});

test("direct TLS fingerprint skips Groq even when the provider allowlist is unset", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: undefined,
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        })
      );

      const tracked = await runWithTlsTracking("groq", () =>
        proxyFetch(
          "https://api.groq.com/openai/v1/models",
          {},
          {
            undiciFetch: async () => {
              dispatcherCalls++;
              return new Response("dispatcher");
            },
          }
        )
      );

      assert.equal(tlsCalls, 0);
      assert.equal(dispatcherCalls, 1);
      assert.equal(await tracked.result.text(), "dispatcher");
      assert.equal(tracked.tlsFingerprintUsed, false);
      assert.equal(isTlsFingerprintActive("groq"), false);
    }
  );
});

test("direct TLS fingerprint skips api.groq.com when the tracking store has no provider", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: undefined,
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        })
      );

      const tracked = await runWithTlsTracking(async () =>
        proxyFetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            body: "{}",
          },
          {
            undiciFetch: async () => {
              dispatcherCalls++;
              return new Response("dispatcher");
            },
          }
        )
      );

      assert.equal(tlsCalls, 0);
      assert.equal(dispatcherCalls, 1);
      assert.equal(await tracked.result.text(), "dispatcher");
      assert.equal(tracked.tlsFingerprintUsed, false);
    }
  );
});

test("direct TLS fingerprint still spoofs non-Groq hosts when the allowlist is unset", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: undefined,
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        })
      );

      const tracked = await runWithTlsTracking("openai", () =>
        proxyFetch(
          "https://api.openai.com/v1/models",
          {},
          {
            undiciFetch: async () => {
              dispatcherCalls++;
              return new Response("dispatcher");
            },
          }
        )
      );

      assert.equal(tlsCalls, 1);
      assert.equal(dispatcherCalls, 0);
      assert.equal(await tracked.result.text(), "tls");
      assert.equal(tracked.tlsFingerprintUsed, true);
    }
  );
});
