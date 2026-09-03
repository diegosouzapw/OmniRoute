import assert from "node:assert/strict";
import test from "node:test";

import {
  proxyFetch,
  resolveProxyForRequest,
  runWithProxyContext,
  runWithTlsTracking,
  setTlsClientForTest,
} from "../../../open-sse/utils/proxyFetch.ts";
import tlsClient, {
  TlsClient,
  type TlsFetchOptions,
  type WreqSession,
} from "../../../open-sse/utils/tlsClient.ts";
import { httpBackedChat } from "../../../open-sse/services/browserBackedChat.ts";

type EnvState = Record<string, string | undefined>;

const ENV_KEYS = [
  "ENABLE_TLS_FINGERPRINT",
  "TLS_FINGERPRINT_PROVIDERS",
  "HTTPS_PROXY",
  "https_proxy",
  "HTTP_PROXY",
  "http_proxy",
  "ALL_PROXY",
  "all_proxy",
  "NO_PROXY",
  "no_proxy",
  "OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK",
  "PROXY_AUTO_SELECT_ENABLED",
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

function fakeTlsClient(
  fetch: (url: string, options?: TlsFetchOptions) => Promise<Response>,
) {
  return { available: true, fetch };
}

test("explicit direct proxy resolution keeps a session and never rereads the environment", async () => {
  await withEnv({ HTTPS_PROXY: "http://placeholder.proxy:8080" }, async () => {
    const created: Array<Record<string, unknown>> = [];
    const client = new TlsClient(async (options) => {
      created.push(options);
      return {
        close: async () => {},
        fetch: async () => new Response("ok"),
      };
    });

    await client.fetch("https://upstream.example", { proxy: null });
    await client.fetch("https://upstream.example", { proxy: null });
    await client.fetch("https://upstream.example");

    assert.equal(created.length, 2);
    assert.equal(created[0]?.proxy, undefined);
    assert.equal(created[1]?.proxy, "http://placeholder.proxy:8080");
  });
});

test("same proxy is isolated by stable account session scope", async () => {
  const created: Array<Record<string, unknown>> = [];
  const client = new TlsClient(async (options) => {
    created.push(options);
    return {
      close: async () => {},
      fetch: async () => new Response("ok"),
    };
  });

  const proxy = "http://shared.proxy:8080";
  await client.fetch("https://upstream.example", { proxy, sessionScope: "account-a" });
  await client.fetch("https://upstream.example", { proxy, sessionScope: "account-a" });
  await client.fetch("https://upstream.example", { proxy, sessionScope: "account-b" });

  assert.equal(created.length, 2);
});

test("circuit failures are isolated to the exact session scope and proxy", async () => {
  const client = new TlsClient(async (options) => ({
    close: async () => {},
    fetch: async () => {
      if (options.proxy === "http://bad.proxy:8080") throw new Error("bad proxy");
      return new Response("good");
    },
  }));

  for (let attempt = 0; attempt < 3; attempt++) {
    await assert.rejects(
      client.fetch("https://upstream.example", {
        proxy: "http://bad.proxy:8080",
        sessionScope: "bad-account",
      }),
    );
  }

  const response = await client.fetch("https://upstream.example", {
    proxy: "http://good.proxy:8080",
    sessionScope: "good-account",
  });
  assert.equal(await response.text(), "good");
});

test("redirect error semantics are forwarded to wreq unchanged", async () => {
  let redirect: unknown;
  const client = new TlsClient(async () => ({
    close: async () => {},
    fetch: async (_url, options) => {
      redirect = options?.redirect;
      return new Response("ok");
    },
  }));

  await client.fetch("https://upstream.example", { redirect: "error" });
  assert.equal(redirect, "error");
});

test("Request input bypasses wreq without losing method headers or body", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      let tlsCalls = 0;
      let received: Request | null = null;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        }),
      );

      const input = new Request("https://upstream.example/v1", {
        method: "POST",
        headers: { "x-test": "present" },
        body: "payload",
      });
      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch(input, {}, {
          undiciFetch: async (forwarded) => {
            received = forwarded as Request;
            return new Response("dispatcher");
          },
        }),
      );

      assert.equal(tlsCalls, 0);
      assert.equal(received, input);
      assert.equal(received?.method, "POST");
      assert.equal(received?.headers.get("x-test"), "present");
      assert.equal(await received?.text(), "payload");
      assert.equal(tracked.tlsFingerprintUsed, false);
    },
  );
});

test("non-idempotent TLS failures are never replayed", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          throw new Error("post-send transport failure");
        }),
      );

      await assert.rejects(
        runWithTlsTracking("codex", () =>
          proxyFetch(
            "https://upstream.example/v1",
            { method: "POST", body: "{}" },
            {
              undiciFetch: async () => {
                dispatcherCalls++;
                return new Response("unexpected");
              },
            },
          ),
        ),
        (error: Error & { code?: string }) =>
          error.code === "TLS_FINGERPRINT_FAILED" &&
          error.message === "TLS fingerprint request failed; request is not safe to replay",
      );
      assert.equal(dispatcherCalls, 0);
    },
  );
});

test("safe GET TLS failure falls back through the same configured proxy", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
      HTTPS_PROXY: "http://placeholder.proxy:8080",
    },
    async () => {
      setTlsClientForTest(
        fakeTlsClient(async () => {
          throw new Error("transport failed");
        }),
      );
      let dispatcher: unknown;
      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch("https://upstream.example/v1", {}, {
          undiciFetch: async (_input, init) => {
            dispatcher = init?.dispatcher;
            return new Response("fallback");
          },
        }),
      );

      assert.ok(dispatcher);
      assert.equal(await tracked.result.text(), "fallback");
      assert.equal(tracked.tlsFingerprintUsed, false);
    },
  );
});

test("internal TimeoutError is not classified as a caller abort", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      const timeout = new Error("internal timeout");
      timeout.name = "TimeoutError";
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          throw timeout;
        }),
      );

      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch("https://upstream.example/v1", {}, {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("fallback");
          },
        }),
      );

      assert.equal(dispatcherCalls, 1);
      assert.equal(await tracked.result.text(), "fallback");
    },
  );
});

test("control-plane direct fallback bypasses an environment proxy", async () => {
  await withEnv(
    {
      HTTPS_PROXY: "http://placeholder.proxy:8080",
      OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK: "true",
    },
    async () => {
      const result = await runWithProxyContext(
        { type: "http", host: "127.0.0.1", port: "9" },
        () => resolveProxyForRequest("https://upstream.example/v1"),
        { directFallbackOnUnreachable: true },
      );

      assert.deepEqual(result, { source: "direct", proxyUrl: null });
    },
  );
});

test("new proxied TLS transport requires an explicit provider allowlist", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: undefined,
      HTTPS_PROXY: "http://placeholder.proxy:8080",
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        }),
      );

      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch("https://upstream.example/v1", {}, {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("dispatcher");
          },
        }),
      );

      assert.equal(tlsCalls, 0);
      assert.equal(dispatcherCalls, 1);
      assert.equal(await tracked.result.text(), "dispatcher");
    },
  );
});

test("caller abort propagates unchanged and never falls back", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      const controller = new AbortController();
      const abortError = new Error("caller stopped");
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          controller.abort(abortError);
          throw abortError;
        }),
      );

      await assert.rejects(
        runWithTlsTracking("codex", () =>
          proxyFetch(
            "https://upstream.example/v1",
            { signal: controller.signal },
            {
              undiciFetch: async () => {
                dispatcherCalls++;
                return new Response("unexpected");
              },
            },
          ),
        ),
        (error) => error === abortError,
      );
      assert.equal(dispatcherCalls, 0);
    },
  );
});

test("stateful TLS session failures never fall back even for GET", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          const error = new Error("transport failed");
          Object.defineProperty(error, "sessionHadCookies", { value: true });
          throw error;
        }),
      );

      await assert.rejects(
        runWithTlsTracking("codex", () =>
          proxyFetch("https://upstream.example/v1", {}, {
            undiciFetch: async () => {
              dispatcherCalls++;
              return new Response("unexpected");
            },
          }),
        ),
        (error: Error & { code?: string }) =>
          error.code === "TLS_FINGERPRINT_FAILED" &&
          error.message === "TLS fingerprint request failed; stateful session cannot be replayed",
      );
      assert.equal(dispatcherCalls, 0);
    },
  );
});

test("TLS transport failures never expose proxy credentials", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
      HTTPS_PROXY: "http://user:password@placeholder.proxy:8080",
    },
    async () => {
      const warnings: string[] = [];
      const originalWarn = console.warn;
      console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
      try {
        setTlsClientForTest(
          fakeTlsClient(async () => {
            throw new Error(
              "connect failed via http://user:password@placeholder.proxy:8080",
            );
          }),
        );
        const tracked = await runWithTlsTracking("codex", () =>
          proxyFetch("https://upstream.example/v1", {}, {
            undiciFetch: async () => new Response("fallback"),
          }),
        );
        assert.equal(await tracked.result.text(), "fallback");
        assert.equal(warnings.some((line) => line.includes("user:password")), false);
        assert.equal(warnings.some((line) => line.includes("placeholder.proxy")), false);
      } finally {
        console.warn = originalWarn;
      }
    },
  );
});

test("family-pinned proxies retain dispatcher enforcement instead of using wreq", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
      HTTPS_PROXY: "http://placeholder.proxy:8080?family=ipv4",
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        }),
      );

      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch("https://upstream.example/v1", {}, {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("dispatcher");
          },
        }),
      );
      assert.equal(tlsCalls, 0);
      assert.equal(dispatcherCalls, 1);
      assert.equal(await tracked.result.text(), "dispatcher");
    },
  );
});

test("relay contexts never route through wreq", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
    },
    async () => {
      let tlsCalls = 0;
      let relayCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("tls");
        }),
      );

      const tracked = await runWithTlsTracking("codex", () =>
        runWithProxyContext(
          { type: "vercel", host: "relay.example", relayAuth: "test-auth" },
          () =>
            proxyFetch("https://upstream.example/v1", {}, {
              undiciFetch: async () => {
                relayCalls++;
                return new Response("relay");
              },
            }),
        ),
      );
      assert.equal(tlsCalls, 0);
      assert.equal(relayCalls, 1);
      assert.equal(await tracked.result.text(), "relay");
    },
  );
});

test("wreq responses are adapted to the native Response API", async () => {
  const sourceBody = new Response("adapted").body;
  assert.ok(sourceBody);
  const client = new TlsClient(async () => ({
    close: async () => {},
    fetch: async () => ({
      status: 200,
      statusText: "OK",
      headers: new Map([["x-source", "wreq"]]),
      body: sourceBody,
      url: "https://upstream.example/v1",
      redirected: true,
    }),
  }));

  const response = await client.fetch("https://upstream.example/v1", { proxy: null });
  assert.equal(response instanceof Response, true);
  assert.equal(response.headers.get("x-source"), "wreq");
  assert.equal(response.url, "https://upstream.example/v1");
  assert.equal(response.redirected, true);
  assert.equal(await response.text(), "adapted");
});

test("exit waits for pending session creation and closes the late session", async () => {
  type TestSession = {
    close: () => Promise<void>;
    fetch: () => Promise<Response>;
  };
  const sessionGate = Promise.withResolvers<TestSession>();
  const creationStarted = Promise.withResolvers<void>();
  const closeStarted = Promise.withResolvers<void>();
  const closeGate = Promise.withResolvers<void>();
  let closed = 0;
  const client = new TlsClient(() => {
    creationStarted.resolve();
    return sessionGate.promise;
  });
  const request = client.fetch("https://upstream.example/v1", { proxy: null });
  await creationStarted.promise;

  let exitSettled = false;
  const exiting = client.exit().then(() => {
    exitSettled = true;
  });
  sessionGate.resolve({
    close: async () => {
      closed++;
      closeStarted.resolve();
      await closeGate.promise;
    },
    fetch: async () => new Response("unexpected"),
  });
  await closeStarted.promise;
  assert.equal(exitSettled, false);

  closeGate.resolve();
  await assert.rejects(request, /wreq-js transport failed/);
  await exiting;
  assert.equal(closed, 1);
});

test("bounded session cache closes the least-recently-used idle session", async () => {
  const closed: string[] = [];
  const client = new TlsClient(async (options) => {
    const proxy = String(options.proxy);
    return {
      close: async () => {
        closed.push(proxy);
      },
      fetch: async () => new Response("ok"),
    };
  }, 2);

  await client.fetch("https://upstream.example/v1", { proxy: "http://proxy-1:8080" });
  await client.fetch("https://upstream.example/v1", { proxy: "http://proxy-2:8080" });
  await client.fetch("https://upstream.example/v1", { proxy: "http://proxy-3:8080" });

  assert.deepEqual(closed, ["http://proxy-1:8080"]);
  await client.exit();
});

test("direct browser-backed TLS calls isolate sessions by pool key", async () => {
  const originalFetch = tlsClient.fetch.bind(tlsClient);
  let observedScope: string | undefined;
  tlsClient.fetch = async (_url, options) => {
    observedScope = options?.sessionScope;
    return new Response("ok", {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    const result = await httpBackedChat({
      poolKey: "claude-web:account-123",
      chatUrl: "https://claude.ai/api/chat",
      chatPageUrl: "https://claude.ai/new",
      userMessage: "hello",
      chatUrlMatchDomain: "claude.ai",
      inputSelector: "#prompt",
    });
    assert.equal(result.status, 200);
    assert.equal(observedScope, "claude-web:account-123");
  } finally {
    tlsClient.fetch = originalFetch;
  }
});

test("allowlisted proxied TLS receives the exact proxy and account scope", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
      HTTPS_PROXY: "http://placeholder.proxy:8080",
    },
    async () => {
      let observedOptions: TlsFetchOptions | undefined;
      setTlsClientForTest(
        fakeTlsClient(async (_url, options) => {
          observedOptions = options;
          return new Response("tls");
        }),
      );
      const tracked = await runWithTlsTracking(
        { provider: "codex", sessionScope: "connection-123" },
        () =>
          proxyFetch("https://upstream.example/v1", {}, {
            undiciFetch: async () => {
              throw new Error("dispatcher must not run");
            },
          }),
      );

      assert.equal(observedOptions?.proxy, "http://placeholder.proxy:8080");
      assert.equal(observedOptions?.sessionScope, "connection-123");
      assert.equal(tracked.tlsFingerprintUsed, true);
      assert.equal(await tracked.result.text(), "tls");
    },
  );
});

test("proxy dispatcher failures sanitize logs and propagated errors", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "false",
      HTTPS_PROXY: "http://user:password@placeholder.proxy:8080",
    },
    async () => {
      const errors: string[] = [];
      const originalError = console.error;
      console.error = (...args: unknown[]) => errors.push(args.map(String).join(" "));
      try {
        let caught: unknown;
        try {
          await proxyFetch("https://upstream.example/v1", {}, {
            undiciFetch: async () => {
              const error = new Error(
                "connect failed via http://user:password@placeholder.proxy:8080",
              ) as Error & { code?: string };
              error.code = "ECONNREFUSED";
              throw error;
            },
          });
        } catch (error) {
          caught = error;
        }
        assert.ok(caught instanceof Error);
        // #10032: the underlying reason is kept for diagnosability, with the
        // proxy URL (credentials included) redacted before propagation (#9837).
        assert.equal(
          caught.message,
          "Proxy request failed: connect failed via [redacted-proxy]",
        );
        assert.equal(caught.message.includes("user:password"), false);
        assert.equal(caught.message.includes("placeholder.proxy"), false);
        assert.equal("code" in caught ? caught.code : undefined, "PROXY_UNREACHABLE");
        assert.equal(errors.some((line) => line.includes("user:password")), false);
        assert.equal(errors.some((line) => line.includes("placeholder.proxy")), false);
      } finally {
        console.error = originalError;
      }
    },
  );
});

test("half-open circuit admits only one probe for an isolated session key", async () => {
  const originalNow = Date.now;
  const probeStarted = Promise.withResolvers<void>();
  const probeGate = Promise.withResolvers<void>();
  let probeMode = false;
  let fetchCalls = 0;
  const client = new TlsClient(async () => ({
    close: async () => {},
    fetch: async () => {
      fetchCalls++;
      if (!probeMode) throw new Error("upstream unavailable");
      probeStarted.resolve();
      await probeGate.promise;
      return new Response("recovered");
    },
  }));

  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      await assert.rejects(
        client.fetch("https://upstream.example/v1", {
          proxy: null,
          sessionScope: "connection-123",
        }),
        /wreq-js transport failed/,
      );
    }
    probeMode = true;
    const afterCooldown = originalNow() + 31_000;
    Date.now = () => afterCooldown;

    const probe = client.fetch("https://upstream.example/v1", {
      proxy: null,
      sessionScope: "connection-123",
    });
    await probeStarted.promise;
    await assert.rejects(
      client.fetch("https://upstream.example/v1", {
        proxy: null,
        sessionScope: "connection-123",
      }),
      (error: unknown) =>
        error instanceof Error &&
        "code" in error &&
        error.code === "TLS_CIRCUIT_OPEN",
    );
    assert.equal(fetchCalls, 4);
    probeGate.resolve();
    assert.equal(await (await probe).text(), "recovered");
  } finally {
    Date.now = originalNow;
    probeGate.resolve();
    await client.exit();
  }
});

test("circuit invalidation snapshots cookies before closing the failed session", async () => {
  let closed = false;
  const client = new TlsClient(async () => ({
    close: () => {
      closed = true;
    },
    getCookies: () => (closed ? {} : { session: "account-a" }),
    fetch: async () => {
      throw new Error("upstream unavailable");
    },
  }));

  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      await assert.rejects(
        client.fetch("https://upstream.example/v1", {
          proxy: null,
          sessionScope: "connection-123",
        }),
        (error: unknown) =>
          error instanceof Error &&
          "sessionHadCookies" in error &&
          error.sessionHadCookies === true,
      );
    }
    await Promise.resolve();
    assert.equal(closed, true);
    await assert.rejects(
      client.fetch("https://upstream.example/v1", {
        proxy: null,
        sessionScope: "connection-123",
      }),
      (error: unknown) =>
        error instanceof Error &&
        "code" in error &&
        error.code === "TLS_CIRCUIT_OPEN" &&
        "sessionHadCookies" in error &&
        error.sessionHadCookies === true,
    );
  } finally {
    await client.exit();
  }
});

test("pending session creation is bounded per TLS client", async () => {
  const sessionGates = [
    Promise.withResolvers<WreqSession>(),
    Promise.withResolvers<WreqSession>(),
  ];
  let creates = 0;
  const client = new TlsClient(() => {
    const gate = sessionGates[creates++];
    if (!gate) throw new Error("unexpected session creation");
    return gate.promise;
  }, 2);
  const session: WreqSession = {
    close: async () => {},
    fetch: async () => new Response("ok"),
  };

  const first = client.fetch("https://upstream.example/v1", {
    proxy: "http://proxy-1:8080",
    sessionScope: "connection-1",
  });
  const second = client.fetch("https://upstream.example/v1", {
    proxy: "http://proxy-2:8080",
    sessionScope: "connection-2",
  });
  try {
    assert.equal(creates, 2);
    await assert.rejects(
      client.fetch("https://upstream.example/v1", {
        proxy: "http://proxy-3:8080",
        sessionScope: "connection-3",
      }),
      (error: unknown) =>
        error instanceof Error &&
        "code" in error &&
        error.code === "TLS_SESSION_CAPACITY",
    );
    assert.equal(creates, 2);

    for (const gate of sessionGates) gate.resolve(session);
    assert.equal(await (await first).text(), "ok");
    assert.equal(await (await second).text(), "ok");
  } finally {
    for (const gate of sessionGates) gate.resolve(session);
    await Promise.allSettled([first, second]);
    await client.exit();
  }
});

test("direct TLS fallback never auto-selects a different proxy route", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: undefined,
      PROXY_AUTO_SELECT_ENABLED: "true",
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      let autoSelectCalls = 0;
      let nativeCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          throw new Error("wreq transport failed");
        }),
      );

      const response = await proxyFetch("https://upstream.example/v1", {}, {
        undiciFetch: async () => {
          dispatcherCalls++;
          const error = new Error("fetch failed: ECONNREFUSED") as Error & { code?: string };
          error.code = "ECONNREFUSED";
          throw error;
        },
        findWorkingProxy: async () => {
          autoSelectCalls++;
          return "http://unexpected.proxy:8080";
        },
        nativeFetch: async () => {
          nativeCalls++;
          return new Response("native");
        },
      });

      assert.equal(tlsCalls, 1);
      assert.equal(dispatcherCalls, 2);
      assert.equal(autoSelectCalls, 0);
      assert.equal(nativeCalls, 1);
      assert.equal(await response.text(), "native");
    },
  );
});

test("proxied TLS compatibility overload requires an explicit session scope", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      TLS_FINGERPRINT_PROVIDERS: "codex",
      HTTPS_PROXY: "http://placeholder.proxy:8080",
    },
    async () => {
      let tlsCalls = 0;
      let dispatcherCalls = 0;
      setTlsClientForTest(
        fakeTlsClient(async () => {
          tlsCalls++;
          return new Response("unexpected");
        }),
      );

      const tracked = await runWithTlsTracking("codex", () =>
        proxyFetch("https://upstream.example/v1", {}, {
          undiciFetch: async () => {
            dispatcherCalls++;
            return new Response("dispatcher");
          },
        }),
      );

      assert.equal(tlsCalls, 0);
      assert.equal(dispatcherCalls, 1);
      assert.equal(tracked.tlsFingerprintUsed, false);
      assert.equal(await tracked.result.text(), "dispatcher");
    },
  );
});

test("circuit trip defers session close until active response streams release", async () => {
  let first = true;
  let closed = 0;
  const client = new TlsClient(async () => ({
    close: async () => {
      closed++;
    },
    fetch: async () => {
      if (first) {
        first = false;
        return {
          status: 200,
          statusText: "OK",
          headers: [],
          body: new ReadableStream<Uint8Array>({}),
        };
      }
      throw new Error("upstream unavailable");
    },
  }));

  try {
    const activeResponse = await client.fetch("https://upstream.example/v1", {
      proxy: null,
      sessionScope: "connection-123",
    });
    for (let attempt = 0; attempt < 3; attempt++) {
      await assert.rejects(
        client.fetch("https://upstream.example/v1", {
          proxy: null,
          sessionScope: "connection-123",
        }),
        /wreq-js transport failed/,
      );
    }
    assert.equal(closed, 0);

    await activeResponse.body?.cancel();
    await Promise.resolve();
    assert.equal(closed, 1);
  } finally {
    await client.exit();
  }
});

test("streaming wreq body failures are sanitized and counted by the circuit", async () => {
  const secret = "http://user:password@proxy.example:8080";
  const client = new TlsClient(async () => ({
    close: async () => {},
    fetch: async () => ({
      status: 200,
      statusText: "OK",
      headers: [["content-type", "text/plain"]],
      body: new ReadableStream<Uint8Array>({
        pull(controller) {
          const error = new Error(`body failed through ${secret}`) as Error & {
            code?: string;
          };
          error.code = "UND_ERR_SOCKET";
          controller.error(error);
        },
      }),
    }),
  }));

  try {
    const response = await client.fetch("https://upstream.example/v1", {
      proxy: "http://user:password@proxy.example:8080",
      sessionScope: "connection-123",
    });
    await assert.rejects(
      response.text(),
      (error: unknown) =>
        error instanceof Error &&
        error.message === "wreq-js response body failed" &&
        "code" in error &&
        error.code === "UND_ERR_SOCKET" &&
        !String(error).includes("user:password"),
    );
    assert.equal(
      client.getCircuitState(
        "http://user:password@proxy.example:8080",
        "connection-123",
      ).failureCount,
      1,
    );
  } finally {
    await client.exit();
  }
});
