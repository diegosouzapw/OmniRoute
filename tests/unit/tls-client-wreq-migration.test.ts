import assert from "node:assert/strict";
import test from "node:test";

import { createTlsClientModule } from "../../open-sse/services/tlsClientBase.ts";
import {
  TlsClient,
  createWreqTransportClient,
  type WreqTransportResponseLike,
} from "../../open-sse/utils/tlsClient.ts";

const encoder = new TextEncoder();

type LeaseRequest = Promise<WreqTransportResponseLike> & {
  invalidateTransport: () => void;
  releaseTransport: () => void;
};

type TlsUtilsWithLifecycleTestSeam = typeof import("../../open-sse/utils/tlsClient.ts") & {
  __closeWreqLifecycleResourcesForTesting?: () => Promise<void>;
};

async function waitForCondition(condition: () => boolean): Promise<void> {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (condition()) return;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  assert.fail("condition did not become true");
}

test("stream EOF filtering recognizes a sentinel fragmented across native chunks", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      const chunks = ['{"answer":"ok"}\n[DO', "NE]ignored"];
      return new Response(
        new ReadableStream<Uint8Array>({
          async pull(controller) {
            const next = chunks.shift();
            if (next === undefined) {
              controller.close();
              return;
            }
            if (chunks.length === 0) await new Promise((resolve) => setTimeout(resolve, 25));
            controller.enqueue(encoder.encode(next));
          },
        }),
        { status: 200 }
      );
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    1_000,
    1_000
  );

  assert.ok(result.body);
  assert.equal(await new Response(result.body).text(), '{"answer":"ok"}\n');
});

test("stream EOF filtering recognizes a fragmented sentinel after an isolated CR", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      const chunks = ['{"answer":"ok"}\r[DO', "NE]ignored"];
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) controller.close();
            else controller.enqueue(encoder.encode(next));
          },
        }),
        { status: 200 }
      );
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    1_000,
    1_000
  );

  assert.ok(result.body);
  assert.equal(await new Response(result.body).text(), '{"answer":"ok"}\r');
});

test("wreq transports are isolated by browser, OS, and resolved proxy without a cookie jar", async () => {
  const transportOptions: Array<Record<string, unknown>> = [];
  const transports: Array<{ id: number; close(): Promise<void> }> = [];
  const fetchCalls: Array<{ url: string; options: Record<string, unknown> }> = [];
  const runtime = {
    async createTransport(options: Record<string, unknown>) {
      transportOptions.push(options);
      const transport = { id: transports.length + 1, async close() {} };
      transports.push(transport);
      return transport;
    },
    async fetch(url: string, options: Record<string, unknown>) {
      fetchCalls.push({ url, options });
      return new Response("ok", {
        status: 200,
        headers: [["set-cookie", "upstream=one; Path=/"]],
      });
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    emulationOs: "linux",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => runtime,
  });

  const first = await module.tlsFetch("https://example.test/one", {
    proxyUrl: "http://proxy-a.test:8080",
  });
  const second = await module.tlsFetch("https://example.test/two", {
    proxyUrl: "http://proxy-a.test:8080",
  });
  await module.tlsFetch("https://example.test/three", {
    proxyUrl: "http://proxy-b.test:8080",
  });

  assert.equal(first.text, "ok");
  assert.equal(second.text, "ok");
  assert.deepEqual(transportOptions, [
    { browser: "chrome_146", os: "linux", proxy: "http://proxy-a.test:8080" },
    { browser: "chrome_146", os: "linux", proxy: "http://proxy-b.test:8080" },
  ]);
  assert.equal(fetchCalls[0]?.options.transport, transports[0]);
  assert.equal(fetchCalls[1]?.options.transport, transports[0]);
  assert.equal(fetchCalls[2]?.options.transport, transports[1]);
  assert.equal(fetchCalls[0]?.options.cookieMode, "ephemeral");
  assert.equal("session" in (fetchCalls[0]?.options ?? {}), false);
  assert.equal("sessionId" in (fetchCalls[0]?.options ?? {}), false);
});

test("a stale request lease cannot invalidate a healthy replacement transport", async () => {
  const transports: Array<{ id: number; closed: boolean; close(): Promise<void> }> = [];
  const fetchTransports: number[] = [];
  const runtime = {
    async createTransport() {
      const transport = {
        id: transports.length + 1,
        closed: false,
        async close() {
          this.closed = true;
        },
      };
      transports.push(transport);
      return transport;
    },
    async fetch(url: string, options: Record<string, unknown>) {
      fetchTransports.push((options.transport as { id: number }).id);
      if (url.endsWith("/replacement")) return new Response("healthy");
      return new Promise<never>(() => {});
    },
  };
  const client = createWreqTransportClient({
    browser: "chrome_146",
    os: "linux",
    runtimeLoader: async () => runtime,
  });
  const optionsA = { proxyUrl: "http://shared.proxy.test:8080" };
  const optionsB = { proxyUrl: "http://shared.proxy.test:8080" };
  const requestA = client.request("https://example.test/a", optionsA) as LeaseRequest;
  const requestB = client.request("https://example.test/b", optionsB) as LeaseRequest;

  assert.equal(typeof requestA.invalidateTransport, "function");
  assert.equal(typeof requestB.invalidateTransport, "function");
  await waitForCondition(() => fetchTransports.length === 2);
  assert.deepEqual(fetchTransports, [1, 1]);

  requestA.invalidateTransport();
  await waitForCondition(() => transports[0]?.closed === true);

  const replacement = client.request("https://example.test/replacement", {
    proxyUrl: "http://shared.proxy.test:8080",
  }) as LeaseRequest;
  const replacementResponse = await replacement;
  assert.equal(await new Response(replacementResponse.body).text(), "healthy");
  assert.equal(fetchTransports.at(-1), 2);
  assert.equal(transports[1]?.closed, false);

  requestB.invalidateTransport();
  await new Promise((resolve) => setTimeout(resolve, 1));
  assert.equal(transports[1]?.closed, false, "stale generation must not close replacement");
  replacement.releaseTransport();
});

test("the transport pool evicts the least-recently-used idle proxy at its configured cap", async () => {
  const transports: Array<{ id: number; closed: boolean; close(): Promise<void> }> = [];
  const runtime = {
    async createTransport() {
      const transport = {
        id: transports.length + 1,
        closed: false,
        async close() {
          this.closed = true;
        },
      };
      transports.push(transport);
      return transport;
    },
    async fetch() {
      return new Response("ok");
    },
  };
  const client = createWreqTransportClient({
    browser: "chrome_146",
    os: "linux",
    runtimeLoader: async () => runtime,
    maxTransports: 2,
  });

  const request = async (proxyUrl: string): Promise<void> => {
    const pending = client.request("https://example.test", { proxyUrl }) as LeaseRequest;
    await pending;
    pending.releaseTransport();
  };

  await request("http://proxy-a.test:8080");
  await request("http://proxy-b.test:8080");
  await request("http://proxy-a.test:8080");
  await request("http://proxy-c.test:8080");
  await waitForCondition(() => transports[1]?.closed === true);

  assert.equal(transports.length, 3);
  assert.equal(transports[0]?.closed, false, "recently reused proxy A stays pooled");
  assert.equal(transports[1]?.closed, true, "least-recently-used proxy B is evicted");
  assert.equal(transports[2]?.closed, false, "new proxy C stays pooled");
});

test("a closing native transport still consumes capacity until close settles", async () => {
  let releaseClose = (): void => {};
  const closeGate = new Promise<void>((resolve) => {
    releaseClose = resolve;
  });
  const transports: Array<{ id: number; close(): Promise<void> }> = [];
  const runtime = {
    async createTransport() {
      const transport = {
        id: transports.length + 1,
        async close() {
          if (this.id === 1) await closeGate;
        },
      };
      transports.push(transport);
      return transport;
    },
    async fetch() {
      return new Response("ok");
    },
  };
  const client = createWreqTransportClient({
    browser: "chrome_146",
    os: "linux",
    runtimeLoader: async () => runtime,
    maxTransports: 1,
  });

  const first = client.request("https://example.test", {
    proxyUrl: "http://proxy-a.test:8080",
  }) as LeaseRequest;
  await first;
  first.releaseTransport();

  const replacement = client.request("https://example.test", {
    proxyUrl: "http://proxy-b.test:8080",
  }) as LeaseRequest;
  const beforeClose = await Promise.race([
    replacement.then(() => "resolved" as const),
    new Promise<"pending">((resolve) => setTimeout(() => resolve("pending"), 20)),
  ]);
  assert.equal(beforeClose, "pending");
  assert.equal(transports.length, 1, "no replacement is created while native close is pending");

  const overCapacity = client.request("https://example.test", {
    proxyUrl: "http://proxy-c.test:8080",
  }) as LeaseRequest;
  await assert.rejects(overCapacity, (error: unknown) => {
    assert.equal((error as Error & { code?: string }).code, "TLS_SESSION_CAPACITY");
    return true;
  });
  assert.equal(transports.length, 1);

  releaseClose();
  await replacement;
  replacement.releaseTransport();
  assert.equal(transports.length, 2);
});

test("first-use fan-out cannot reserve more native transports than the hard cap", async () => {
  let created = 0;
  const runtime = {
    async createTransport() {
      created += 1;
      return { async close() {} };
    },
    async fetch() {
      return new Response("ok");
    },
  };
  const client = createWreqTransportClient({
    browser: "chrome_146",
    os: "linux",
    runtimeLoader: async () => runtime,
    maxTransports: 1,
  });
  const requests = [
    client.request("https://example.test/a", {
      proxyUrl: "http://proxy-a.test:8080",
    }) as LeaseRequest,
    client.request("https://example.test/b", {
      proxyUrl: "http://proxy-b.test:8080",
    }) as LeaseRequest,
  ];

  const results = await Promise.allSettled(requests);
  assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
  assert.equal(results.filter((result) => result.status === "rejected").length, 1);
  const rejection = results.find((result) => result.status === "rejected");
  assert.equal(
    rejection?.status === "rejected"
      ? (rejection.reason as Error & { code?: string }).code
      : undefined,
    "TLS_SESSION_CAPACITY"
  );
  assert.equal(created, 1);
  requests.forEach((request) => request.releaseTransport());
});

test("one lifecycle cleanup closes persistent sessions and ephemeral transports", async () => {
  let sessionClosed = false;
  let transportClosed = false;
  const persistentClient = Reflect.construct(TlsClient, [
    async () => ({
      async fetch() {
        return {
          status: 200,
          statusText: "OK",
          headers: new Headers(),
          body: null,
        };
      },
      async close() {
        sessionClosed = true;
      },
    }),
    128,
    true,
  ]) as TlsClient;
  const transportClient = createWreqTransportClient({
    browser: "chrome_146",
    os: "linux",
    runtimeLoader: async () => ({
      async createTransport() {
        return {
          async close() {
            transportClosed = true;
          },
        };
      },
      async fetch() {
        return new Response("ok");
      },
    }),
  });

  await persistentClient.fetch("https://example.test", { proxy: null });
  const transportRequest = transportClient.request("https://example.test", {}) as LeaseRequest;
  await transportRequest;
  transportRequest.releaseTransport();

  const tlsUtils =
    (await import("../../open-sse/utils/tlsClient.ts")) as TlsUtilsWithLifecycleTestSeam;
  assert.equal(typeof tlsUtils.__closeWreqLifecycleResourcesForTesting, "function");
  await tlsUtils.__closeWreqLifecycleResourcesForTesting?.();

  assert.equal(sessionClosed, true);
  assert.equal(transportClosed, true);
});

test("a synchronous session close error does not consume capacity permanently", async () => {
  let sessionsCreated = 0;
  const client = new TlsClient(async () => {
    sessionsCreated += 1;
    return {
      async fetch() {
        return {
          status: 200,
          statusText: "OK",
          headers: new Headers(),
          body: null,
        };
      },
      close() {
        throw new Error("synchronous native close failure");
      },
    };
  }, 1);

  await client.fetch("https://example.test", { proxy: null });
  await client.exit();
  await client.fetch("https://example.test", { proxy: null });

  assert.equal(sessionsCreated, 2);
  await client.exit();
});

test("wreq response streaming validates a fragmented SSE prefix and filters a fragmented EOF", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      const chunks = ["da", 'ta: {"answer":"ok"}\n[D', "ONE]ignored"];
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) {
              controller.close();
            } else {
              controller.enqueue(encoder.encode(next));
            }
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "firefox_148",
    emulationOs: "macos",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/stream", {
    method: "POST",
    stream: true,
    streamEofSymbol: "[DONE]",
  });

  assert.ok(result.body, "a valid SSE response must stay streaming");
  assert.equal(result.text, null);
  assert.equal(await new Response(result.body).text(), 'data: {"answer":"ok"}\n');
});

test("byteResponse preserves arbitrary bytes as a content-typed data URL", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return {
        status: 200,
        headers: new Headers({ "content-type": "image/png; charset=binary" }),
        body: null,
        async bytes() {
          return new Uint8Array([0, 255, 1, 254]);
        },
        async text(): Promise<string> {
          throw new Error("binary response must not be decoded as UTF-8");
        },
      };
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "firefox_148",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/image", {
    byteResponse: true,
  });

  assert.equal(result.text, "data:image/png;base64,AP8B/g==");
});

test("a response that misses the first-byte deadline falls back to a buffered body", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      let sent = false;
      return new Response(
        new ReadableStream<Uint8Array>({
          async pull(controller) {
            if (sent) {
              controller.close();
              return;
            }
            sent = true;
            await new Promise((resolve) => setTimeout(resolve, 60));
            controller.enqueue(encoder.encode('data: {"late":true}\n\n[DONE]'));
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    firstByteTimeoutMs: 10,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/stream", {
    stream: true,
    timeoutMs: 500,
  });

  assert.equal(result.body, null);
  assert.equal(result.text, 'data: {"late":true}\n\n[DONE]');
});

test("an empty native chunk does not satisfy the first-byte deadline", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      let pullCount = 0;
      return new Response(
        new ReadableStream<Uint8Array>({
          async pull(controller) {
            pullCount += 1;
            if (pullCount === 1) {
              controller.enqueue(new Uint8Array(0));
              return;
            }
            if (pullCount === 2) {
              await new Promise((resolve) => setTimeout(resolve, 60));
              controller.enqueue(encoder.encode('data: {"late":true}\n\n[DONE]'));
              return;
            }
            controller.close();
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    firstByteTimeoutMs: 10,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/stream", {
    stream: true,
    timeoutMs: 500,
  });

  assert.equal(result.body, null);
  assert.equal(result.text, 'data: {"late":true}\n\n[DONE]');
});

test("the first-byte deadline includes request and response-header latency", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      await new Promise((resolve) => setTimeout(resolve, 40));
      return new Response('data: {"lateHeaders":true}\n\n[DONE]', {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    1_000,
    10
  );

  assert.equal(result.body, null);
  assert.equal(result.text, 'data: {"lateHeaders":true}\n\n[DONE]');
});

test("the hard timeout also bounds a wreq body that never produces its first byte", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          pull() {
            return new Promise<void>(() => {});
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 20,
    hardTimeoutGraceMs: 10,
    firstByteTimeoutMs: Number.POSITIVE_INFINITY,
    wreqRuntimeLoader: async () => runtime,
  });

  const outcome = await Promise.race([
    module.tlsFetch("https://example.test/stream", { stream: true }).then(
      () => ({ kind: "resolved" as const }),
      (error: unknown) => ({ kind: "rejected" as const, error })
    ),
    new Promise<{ kind: "hung" }>((resolve) => setTimeout(() => resolve({ kind: "hung" }), 250)),
  ]);

  assert.notEqual(outcome.kind, "hung", "the body read must remain bounded");
  assert.equal(outcome.kind, "rejected");
  if (outcome.kind === "rejected") {
    assert.equal((outcome.error as Error).name, "TlsClientHangError");
  }
});

test("the hard timeout remains active after streaming headers and the first chunk", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      let first = true;
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            if (first) {
              first = false;
              controller.enqueue(encoder.encode('data: {"partial":true}\n\n'));
              return;
            }
            return new Promise<void>(() => {});
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 300,
    hardTimeoutGraceMs: 200,
    firstByteTimeoutMs: Number.POSITIVE_INFINITY,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/stream", { stream: true });
  assert.ok(result.body);
  const reader = result.body.getReader();
  const first = await reader.read();
  assert.equal(first.done, false);
  const outcome = await Promise.race([
    reader.read().then(
      () => ({ kind: "resolved" as const }),
      (error: unknown) => ({ kind: "rejected" as const, error })
    ),
    new Promise<{ kind: "hung" }>((resolve) => setTimeout(() => resolve({ kind: "hung" }), 2_000)),
  ]);

  assert.equal(outcome.kind, "rejected");
  if (outcome.kind === "rejected") {
    assert.equal((outcome.error as Error).name, "TlsClientHangError");
  }
});

test("an empty native stream preserves the upstream error status instead of becoming 200", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new Uint8Array(0));
            controller.close();
          },
        }),
        { status: 403, headers: { "x-upstream": "preserved" } }
      );
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "",
    null,
    1_000,
    1_000
  );

  assert.equal(result.status, 403);
  assert.equal(result.headers.get("x-upstream"), "preserved");
  assert.equal(result.text, "");
  assert.equal(result.body, null);
});

test("Cloudflare detection peeks across fragmented wreq chunks before exposing a stream", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      const chunks = [
        "<!DOCTYPE html><html><title>Ju",
        "st a moment...</title><script>window._cf_chl_opt={}</script>",
      ];
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) controller.close();
            else controller.enqueue(encoder.encode(next));
          },
        }),
        { status: 200, headers: { "content-type": "text/html" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "cf",
    exportCloudflareCheck: true,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/stream", { stream: true });

  assert.equal(result.status, 403);
  assert.equal(result.body, null);
  assert.match(result.text ?? "", /just a moment/i);
});

test("a non-success native response is buffered without rewriting its status to 200", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      const chunks = ['{"error":"rate ', 'limited"}'];
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) controller.close();
            else controller.enqueue(encoder.encode(next));
          },
        }),
        { status: 429, headers: { "retry-after": "30" } }
      );
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "",
    null,
    1_000,
    1_000
  );

  assert.equal(result.status, 429);
  assert.equal(result.headers.get("retry-after"), "30");
  assert.equal(result.text, '{"error":"rate limited"}');
  assert.equal(result.body, null);
});

test("a non-success HTML response keeps the generic HTML classification", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      return new Response("<html><title>Service unavailable</title></html>", {
        status: 503,
        headers: { "content-type": "text/html" },
      });
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "",
    null,
    1_000,
    1_000
  );

  assert.equal(result.status, 502);
  assert.match(result.text ?? "", /service unavailable/i);
  assert.equal(result.body, null);
});

test("SSE validation tolerates a UTF-8 BOM fragmented across native chunks", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const payload = encoder.encode('data: {"answer":"ok"}\n\n[DONE]');
  const chunks = [
    new Uint8Array([0xef]),
    new Uint8Array([0xbb]),
    new Uint8Array([0xbf, ...payload]),
  ];
  const client = {
    async request() {
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) controller.close();
            else controller.enqueue(next);
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    1_000,
    1_000
  );

  assert.ok(result.body);
  assert.equal(await new Response(result.body).text(), 'data: {"answer":"ok"}\n\n');
});

test("EOF filtering ignores a sentinel literal inside an SSE data frame", async () => {
  const module = createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "exclude",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const expected = 'data: {"content":"literal [DONE] survives"}\n\n';
  const client = {
    async request() {
      return new Response(`${expected}data: [DONE]ignored`, {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    1_000,
    1_000
  );

  assert.ok(result.body);
  assert.equal(await new Response(result.body).text(), expected);
});

test("the include policy preserves a fragmented Perplexity end_of_stream marker", async () => {
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      const chunks = ['data: {"answer":"ok"}\n\nev', "ent: end_of_", "stream\nignored"];
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            const next = chunks.shift();
            if (next === undefined) controller.close();
            else controller.enqueue(encoder.encode(next));
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Perplexity",
    tlsProfile: "firefox_148",
    emulationOs: "macos",
    domain: "https://www.perplexity.ai",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: true,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://www.perplexity.ai/rest/sse/perplexity_ask", {
    stream: true,
    streamEofSymbol: "event: end_of_stream",
  });

  assert.ok(result.body);
  assert.equal(
    await new Response(result.body).text(),
    'data: {"answer":"ok"}\n\nevent: end_of_stream'
  );
});

test("the no-sentinel policy leaves an LMArena stream untouched through native EOF", async () => {
  const payload = '{"text":"[DONE] is data"}\n[DONE]still-data';
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode(payload));
            controller.close();
          },
        }),
        { status: 200, headers: { "content-type": "application/x-ndjson" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "LMArena",
    tlsProfile: "chrome_146",
    emulationOs: "windows",
    domain: "https://lmarena.ai",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: true,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://arena.ai/api/stream", {
    stream: true,
    streamEofSymbol: "[DONE]",
  });

  assert.ok(result.body);
  assert.equal(await new Response(result.body).text(), payload);
});

test("duplicate response headers and Set-Cookie values survive the adapter", async () => {
  const rawHeaders = {
    *[Symbol.iterator](): IterableIterator<[string, string]> {
      yield ["x-trace", "one"];
      yield ["x-trace", "two"];
      yield ["set-cookie", "collapsed-value-must-not-win"];
    },
    getSetCookie() {
      return ["session=one; Path=/; HttpOnly", "affinity=two; Path=/"];
    },
  };
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return { status: 202, headers: rawHeaders, body: "accepted" };
    },
  };
  const module = createTlsClientModule({
    providerName: "Headers",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => runtime,
  });

  const result = await module.tlsFetch("https://example.test/headers");

  assert.equal(result.status, 202);
  assert.equal(result.headers.get("x-trace"), "one, two");
  assert.deepEqual(result.headers.getSetCookie(), [
    "session=one; Path=/; HttpOnly",
    "affinity=two; Path=/",
  ]);
});

test("caller abort errors the exposed stream and cancels the native reader", async () => {
  let cancelReason: unknown;
  let first = true;
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            if (first) {
              first = false;
              controller.enqueue(encoder.encode('data: {"partial":true}\n\n'));
              return;
            }
            return new Promise<void>(() => {});
          },
          cancel(reason) {
            cancelReason = reason;
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Abort",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 1_000,
    hardTimeoutGraceMs: 1_000,
    wreqRuntimeLoader: async () => runtime,
  });
  const abort = new AbortController();
  const result = await module.tlsFetch("https://example.test/stream", {
    stream: true,
    signal: abort.signal,
  });
  assert.ok(result.body);
  const reader = result.body.getReader();
  assert.equal((await reader.read()).done, false);

  abort.abort();
  await assert.rejects(reader.read(), (error: unknown) => (error as Error).name === "AbortError");
  assert.equal((cancelReason as Error).name, "AbortError");
});

test("caller abort cancels a native reader while a non-stream response is buffering", async () => {
  let cancelReason: unknown;
  let pullCount = 0;
  let notifySecondPull!: () => void;
  const secondPullStarted = new Promise<void>((resolve) => {
    notifySecondPull = resolve;
  });
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          pull(controller) {
            pullCount += 1;
            if (pullCount === 1) {
              controller.enqueue(encoder.encode("partial"));
              return;
            }
            notifySecondPull();
            return new Promise<void>(() => {});
          },
          cancel(reason) {
            cancelReason = reason;
          },
        }),
        { status: 200 }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Abort",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 1_000,
    hardTimeoutGraceMs: 1_000,
    wreqRuntimeLoader: async () => runtime,
  });
  const abort = new AbortController();
  const pending = module.tlsFetch("https://example.test/buffer", { signal: abort.signal });

  await secondPullStarted;
  abort.abort();

  await assert.rejects(pending, (error: unknown) => (error as Error).name === "AbortError");
  assert.equal((cancelReason as Error | undefined)?.name, "AbortError");
});

test("caller abort cancels an exposed stream even without another consumer read", async () => {
  let cancelReason: unknown;
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode('{"partial":true}\n'));
          },
          cancel(reason) {
            cancelReason = reason;
          },
        }),
        { status: 200, headers: { "content-type": "application/x-ndjson" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Abort",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 1_000,
    hardTimeoutGraceMs: 1_000,
    wreqRuntimeLoader: async () => runtime,
  });
  const abort = new AbortController();
  const result = await module.tlsFetch("https://example.test/stream", {
    stream: true,
    signal: abort.signal,
  });
  assert.ok(result.body);

  abort.abort();
  await new Promise((resolve) => setTimeout(resolve, 20));

  assert.equal((cancelReason as Error | undefined)?.name, "AbortError");
});

test("the absolute hard deadline cancels an exposed stream under consumer backpressure", async () => {
  let cancelReason: unknown;
  let invalidated = false;
  const module = createTlsClientModule({
    providerName: "Deadline",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "cf",
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
  const client = {
    async request() {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode('{"partial":true}\n'));
          },
          cancel(reason) {
            cancelReason = reason;
          },
        }),
        { status: 200 }
      );
    },
    invalidateTransport() {
      invalidated = true;
    },
  };

  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "",
    null,
    40,
    1_000
  );
  assert.ok(result.body);

  await new Promise((resolve) => setTimeout(resolve, 80));

  assert.equal((cancelReason as Error | undefined)?.name, "TlsClientHangError");
  assert.equal(invalidated, true);
});

test("consumer cancellation propagates to the native wreq response reader", async () => {
  let cancelReason: unknown;
  const runtime = {
    async createTransport() {
      return { async close() {} };
    },
    async fetch() {
      return new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode('data: {"partial":true}\n\n'));
          },
          cancel(reason) {
            cancelReason = reason;
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    },
  };
  const module = createTlsClientModule({
    providerName: "Cancel",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => runtime,
  });
  const result = await module.tlsFetch("https://example.test/stream", { stream: true });
  assert.ok(result.body);

  await result.body.cancel("consumer stopped");

  assert.equal(cancelReason, "consumer stopped");
});

test("a hard timeout evicts and closes only the affected pooled transport", async () => {
  const created: Array<{ id: number; closed: boolean }> = [];
  let requestCount = 0;
  const runtime = {
    async createTransport() {
      const state = { id: created.length + 1, closed: false };
      created.push(state);
      return {
        async close() {
          state.closed = true;
        },
      };
    },
    async fetch() {
      requestCount += 1;
      if (requestCount === 1) return new Promise<Response>(() => {});
      return new Response("recovered", { status: 200 });
    },
  };
  const module = createTlsClientModule({
    providerName: "Reset",
    tlsProfile: "chrome_146",
    emulationOs: "linux",
    domain: "https://example.test",
    streamEofPolicy: "include",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    defaultTimeoutMs: 10,
    hardTimeoutGraceMs: 10,
    wreqRuntimeLoader: async () => runtime,
  });

  await assert.rejects(
    module.tlsFetch("https://example.test/hang", { proxyUrl: "http://proxy.test:8080" }),
    (error: unknown) => (error as Error).name === "TlsClientHangError"
  );
  const recovered = await module.tlsFetch("https://example.test/recovered", {
    proxyUrl: "http://proxy.test:8080",
    timeoutMs: 100,
  });

  assert.equal(recovered.text, "recovered");
  assert.equal(created.length, 2);
  assert.equal(created[0]?.closed, true);
  assert.equal(created[1]?.closed, false);
});
