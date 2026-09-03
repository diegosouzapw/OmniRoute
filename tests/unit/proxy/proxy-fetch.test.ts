import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import proxyFetch, {
  runWithProxyContext,
  runWithProxyContextOrDirect,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "../../../open-sse/utils/proxyFetch.ts";
import { getDefaultDispatcher } from "../../../open-sse/utils/proxyDispatcher.ts";
import tlsClient from "../../../open-sse/utils/tlsClient.ts";

async function withEnv(overrides, fn) {
  const previous = new Map();

  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

async function withHttpServer(handler, fn) {
  const server = http.createServer(handler);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");

  try {
    return await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

const originalTlsFetch = tlsClient.fetch.bind(tlsClient);

// #3323 made `tlsClient.available` a computed getter (library availability +
// circuit breaker), so it can no longer be assigned. Tests stub it by shadowing
// the prototype getter with an own data property, then `delete` to restore.
function setTlsAvailable(value: boolean) {
  Object.defineProperty(tlsClient, "available", { value, configurable: true, writable: true });
}

test.afterEach(() => {
  delete (tlsClient as unknown as { available?: boolean }).available;
  tlsClient.fetch = originalTlsFetch;
});

test("proxy fetch bypasses invalid environment proxies for local addresses", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("local-bypass-ok");
    },
    async (url) => {
      await withEnv(
        {
          HTTP_PROXY: "http://127.0.0.1:9",
          HTTPS_PROXY: undefined,
          ALL_PROXY: undefined,
          NO_PROXY: undefined,
        },
        async () => {
          const response = await proxyFetch(url);

          assert.equal(response.status, 200);
          assert.equal(await response.text(), "local-bypass-ok");
        }
      );
    }
  );
});

test("runWithProxyContext requires a callback function", async () => {
  await assert.rejects(
    runWithProxyContext(null, null),
    /runWithProxyContext requires a callback function/
  );
});

test("runWithTlsTracking reports direct executions without TLS fingerprint usage", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: undefined }, async () => {
    const tracked = await runWithTlsTracking(async () => "ok");

    assert.deepEqual(tracked, {
      result: "ok",
      tlsFingerprintUsed: false,
    });
    assert.equal(isTlsFingerprintActive(), false);
  });
});

test("proxy fetch uses TLS fingerprint transport when enabled and available", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      HTTP_PROXY: undefined,
      HTTPS_PROXY: undefined,
      ALL_PROXY: undefined,
      NO_PROXY: undefined,
    },
    async () => {
      setTlsAvailable(true);
      tlsClient.fetch = async (url, options = {}) => {
        assert.equal(url, "https://omniroute.example.test/hello");
        assert.equal(options.method, "POST");
        return Response.json({ via: "tls-client" });
      };

      const tracked = await runWithTlsTracking(() =>
        proxyFetch("https://omniroute.example.test/hello", {
          method: "POST",
          headers: { "x-test": "1" },
        })
      );

      assert.equal(isTlsFingerprintActive(), true);
      assert.equal(tracked.tlsFingerprintUsed, true);
      assert.deepEqual(await (tracked.result as any).json(), { via: "tls-client" });
    }
  );
});

test("runWithProxyContext accepts reachable HTTP proxy endpoints and returns callback result", async () => {
  await withHttpServer(
    (_req, res) => res.end("proxy-ok"),
    async (url) => {
      const parsed = new URL(url);
      const result = await runWithProxyContext(
        {
          type: "http",
          host: parsed.hostname,
          port: parsed.port,
        },
        async () => "ok"
      );

      assert.equal(result, "ok");
    }
  );
});

test("runWithProxyContext throws PROXY_UNREACHABLE for an unreachable proxy by default", async () => {
  // 127.0.0.1:9 (discard) refuses connections — the proxy is unreachable.
  // #9100: the T14 probe is non-blocking, so the request must stay in flight
  // long enough for the probe to resolve unreachable and abort it (an
  // instantly-resolving callback would simply win the race and return).
  let releaseRequest: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });

  const pending = runWithProxyContext({ type: "http", host: "127.0.0.1", port: "9" }, async () => {
    await gate;
    return "unreachable";
  });

  await assert.rejects(pending, (err: Error & { code?: string; errorCode?: string }) => {
    assert.equal(err.code, "PROXY_UNREACHABLE");
    assert.equal(err.errorCode, "proxy_unreachable");
    return true;
  });
  releaseRequest();
});

test("runWithProxyContext degrades to a direct connection when directFallbackOnUnreachable is set", async () => {
  await withEnv({ OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK: "true" }, async () => {
    let ran = false;
    const result = await runWithProxyContext(
      { type: "http", host: "127.0.0.1", port: "9" },
      async () => {
        ran = true;
        return "direct-ok";
      },
      { directFallbackOnUnreachable: true }
    );

    assert.equal(ran, true, "callback must still run via a direct connection");
    assert.equal(result, "direct-ok");
  });
});

test("runWithProxyContext keeps strict pinning when the direct fallback feature flag is off", async () => {
  await withEnv({ OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK: "false" }, async () => {
    // #9100: with the flag off the request goes through the non-blocking T14
    // probe; keep it in flight so the unreachable probe aborts it (strict
    // pinning — no direct fallback — still applies).
    let releaseRequest: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      releaseRequest = resolve;
    });

    const pending = runWithProxyContext(
      { type: "http", host: "127.0.0.1", port: "9" },
      async () => {
        await gate;
        return "unreachable";
      },
      { directFallbackOnUnreachable: true }
    );

    await assert.rejects(pending, /Proxy unreachable/);
    releaseRequest();
  });
});

test("runWithProxyContextOrDirect runs the callback directly when the proxy is unreachable", async () => {
  await withEnv({ OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK: "true" }, async () => {
    let ran = false;
    const result = await runWithProxyContextOrDirect(
      { type: "http", host: "127.0.0.1", port: "9" },
      async () => {
        ran = true;
        return "ok";
      }
    );

    assert.equal(ran, true);
    assert.equal(result, "ok");
  });
});
