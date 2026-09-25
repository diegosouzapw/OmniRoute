import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

// Two module copies share the applied-proxy capture: a fetch installed by copy A
// must see the capture sink opened by copy B. This mirrors production, where the
// module is bundled once per server chunk, so a provider dispatch served by any
// copy records its received status on whichever copy opened the capture.
// Single-copy coverage alone cannot catch this: it passes before and after.
// Note: serverless runtimes skip the global patch, so there is no capture there
// by design; this test only covers the patched path.

const MODULE_PATH = "../../open-sse/utils/proxyFetch.ts";
const { runWithCapture } = await import("../../open-sse/utils/providerRequestLogging.ts");

const capture = { capture: () => {}, body: (fallback: unknown) => fallback };
let server: http.Server;
let baseUrl = "";

test.before(async () => {
  server = http.createServer((req, res) => {
    const params = new URL(req.url ?? "/", "http://local").searchParams;
    res.writeHead(Number(params.get("code") ?? 200), { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

type Sink = { proxy: unknown; upstreamStatus?: number };

async function dispatch(fn: () => Promise<Response>) {
  await runWithCapture(capture, async () => {
    const res = await fn();
    await res.text();
  });
}

test("a single copy records the received status", async () => {
  const solo = await import(`${MODULE_PATH}?graph=solo`);
  const sink: Sink = { proxy: null };
  await solo.runWithAppliedProxyCapture(sink, () =>
    dispatch(() => fetch(`${baseUrl}/v1?code=429`))
  );
  assert.equal(sink.upstreamStatus, 429);
});

test("a fetch from copy A records the status on a sink opened by copy B", async () => {
  // Distinct specifiers → two genuinely separate module records.
  const copyA = await import(`${MODULE_PATH}?graph=a`);
  const copyB = await import(`${MODULE_PATH}?graph=b`);
  const sink: Sink = { proxy: null };
  await copyB.runWithAppliedProxyCapture(sink, () =>
    dispatch(() => copyA.proxyFetch(`${baseUrl}/v1?code=429`))
  );
  assert.equal(sink.upstreamStatus, 429);
});

test("sequential captures keep their own status, a failed fetch leaves none", async () => {
  const copyA = await import(`${MODULE_PATH}?graph=c`);
  const copyB = await import(`${MODULE_PATH}?graph=d`);
  const first: Sink = { proxy: null };
  await copyB.runWithAppliedProxyCapture(first, () =>
    dispatch(() => copyA.proxyFetch(`${baseUrl}/v1?code=429`))
  );
  assert.equal(first.upstreamStatus, 429);

  const second: Sink = { proxy: null };
  await copyB.runWithAppliedProxyCapture(second, () =>
    dispatch(() => copyA.proxyFetch(`${baseUrl}/v1?code=200`))
  );
  assert.equal(second.upstreamStatus, 200);

  const failed: Sink = { proxy: null };
  await copyB
    .runWithAppliedProxyCapture(failed, () =>
      dispatch(() => copyA.proxyFetch("http://127.0.0.1:1/v1"))
    )
    .catch(() => {});
  assert.equal(failed.upstreamStatus, undefined);
});
