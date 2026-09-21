import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

// End to end through the real patched fetch: the status of a provider dispatch reaches
// the applied-proxy sink, whichever fetch path serves it, while a side fetch made later in
// the same request does not overwrite it.

const proxyFetchModule = await import("../../open-sse/utils/proxyFetch.ts");
const { runWithCapture } = await import("../../open-sse/utils/providerRequestLogging.ts");

const capture = { capture: () => {}, body: (fallback: unknown) => fallback };
let server: http.Server;
let baseUrl = "";

test.before(async () => {
  server = http.createServer((req, res) => {
    const params = new URL(req.url ?? "/", "http://local").searchParams;
    setTimeout(
      () => {
        res.writeHead(Number(params.get("code") ?? 200), { "content-type": "application/json" });
        res.end("{}");
      },
      Number(params.get("delay") ?? 0)
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

type Sink = { proxy: unknown; upstreamStatus?: number };

function inRequest(sink: Sink, fn: () => Promise<void>) {
  return proxyFetchModule.runWithAppliedProxyCapture(sink, fn);
}

async function dispatch(fn: () => Promise<Response>) {
  await runWithCapture(capture, async () => {
    const res = await fn();
    await res.text();
  });
}

test("a provider dispatch records the received status", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, () => dispatch(() => fetch(`${baseUrl}/v1?code=429`)));
  assert.equal(sink.upstreamStatus, 429);
});

test("the last response received during the dispatch wins", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, () =>
    dispatch(async () => {
      await (await fetch(`${baseUrl}/v1?code=200`)).text();
      return fetch(`${baseUrl}/v1?code=500`);
    })
  );
  assert.equal(sink.upstreamStatus, 500);
});

test("a fetch still running when the dispatch returns does not change the status", async () => {
  const sink: Sink = { proxy: null };
  let background: Promise<unknown> = Promise.resolve();
  await inRequest(sink, async () => {
    await dispatch(async () => {
      const res = await fetch(`${baseUrl}/v1?code=429`);
      background = Promise.all([
        fetch(`${baseUrl}/finish?code=200&delay=50`).then((r) => r.text()),
        fetch("http://127.0.0.1:1/finish").catch(() => null),
      ]);
      return res;
    });
    await background;
  });
  assert.equal(sink.upstreamStatus, 429);
});

test("a side fetch after the dispatch keeps the provider status", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, async () => {
    await dispatch(() => fetch(`${baseUrl}/v1?code=429`));
    const side = await fetch(`${baseUrl}/usage?code=500`);
    await side.text();
  });
  assert.equal(sink.upstreamStatus, 429);
});

test("a second dispatch without any fetch leaves nothing stale behind", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, async () => {
    await dispatch(() => fetch(`${baseUrl}/v1?code=429`));
    assert.equal(sink.upstreamStatus, 429);
    await runWithCapture(capture, async () => {});
  });
  assert.equal(sink.upstreamStatus, undefined);
});

test("a network error on the next dispatch clears the earlier status", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, async () => {
    await dispatch(() => fetch(`${baseUrl}/v1?code=429`));
    await assert.rejects(dispatch(() => fetch("http://127.0.0.1:1/v1")));
  });
  assert.equal(sink.upstreamStatus, undefined);
});

test("the explicit-dispatcher path is captured", async () => {
  const sink: Sink = { proxy: null };
  const undiciFetch = async () => new Response(null, { status: 502 });
  await inRequest(sink, () =>
    dispatch(() =>
      proxyFetchModule.proxyFetch(`${baseUrl}/v1`, { dispatcher: {} } as RequestInit, {
        undiciFetch,
      })
    )
  );
  assert.equal(sink.upstreamStatus, 502);
});

test("the explicit direct-context path is captured", async () => {
  const sink: Sink = { proxy: null };
  await inRequest(sink, () =>
    dispatch(() =>
      proxyFetchModule.runWithDirectFetchContext(() => fetch(`${baseUrl}/v1?code=403`))
    )
  );
  assert.equal(sink.upstreamStatus, 403);
});

test("a dispatch without any sink in scope still works", async () => {
  let status = 0;
  await runWithCapture(capture, async () => {
    const res = await fetch(`${baseUrl}/v1?code=200`);
    status = res.status;
    await res.text();
  });
  assert.equal(status, 200);
});
