/**
 * Client-side fetch helpers the Traffic Inspector uses to drive the TPROXY
 * decrypt capture route (#4211). Pure integration logic — no DOM — so it is
 * unit-testable by stubbing global.fetch: each helper must hit the right
 * method/URL, unwrap the status, and surface the sanitized server error on
 * !res.ok (with an HTTP-status fallback when the body has no message).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { fetchTproxyStatus, startTproxyCaptureMode, stopTproxyCaptureMode } = await import(
  "../../src/lib/inspector/tproxyCaptureApi.ts"
);

type FetchCall = { url: string; init?: RequestInit };

function stubFetch(handler: (call: FetchCall) => { ok: boolean; status?: number; body: unknown }) {
  const calls: FetchCall[] = [];
  const original = global.fetch;
  global.fetch = (async (url: string, init?: RequestInit) => {
    const call = { url: String(url), init };
    calls.push(call);
    const { ok, status = ok ? 200 : 500, body } = handler(call);
    return { ok, status, json: async () => body } as unknown as Response;
  }) as typeof fetch;
  return {
    calls,
    restore() {
      global.fetch = original;
    },
  };
}

const ROUTE = "/api/tools/agent-bridge/tproxy";

test("fetchTproxyStatus GETs the route and returns the status", async () => {
  const status = { running: true, available: true, interceptCount: 3, onPort: 8443 };
  const f = stubFetch(() => ({ ok: true, body: status }));
  try {
    const result = await fetchTproxyStatus();
    assert.equal(result.running, true);
    assert.equal(result.interceptCount, 3);
    assert.equal(f.calls[0].url, ROUTE);
    assert.equal(f.calls[0].init, undefined, "status is a plain GET");
  } finally {
    f.restore();
  }
});

test("startTproxyCaptureMode POSTs options and unwraps the resulting status", async () => {
  const f = stubFetch(() => ({
    ok: true,
    body: { ok: true, status: { running: true, available: true, onPort: 9443 } },
  }));
  try {
    const result = await startTproxyCaptureMode({ onPort: 9443, sudoPassword: "secret" });
    assert.equal(result.running, true);
    assert.equal(result.onPort, 9443);
    assert.equal(f.calls[0].url, ROUTE);
    assert.equal(f.calls[0].init?.method, "POST");
    assert.equal(JSON.parse(String(f.calls[0].init?.body)).onPort, 9443);
  } finally {
    f.restore();
  }
});

test("stopTproxyCaptureMode DELETEs and unwraps the resulting status", async () => {
  const f = stubFetch(() => ({ ok: true, body: { ok: true, status: { running: false, available: true } } }));
  try {
    const result = await stopTproxyCaptureMode();
    assert.equal(result.running, false);
    assert.equal(f.calls[0].url, ROUTE);
    assert.equal(f.calls[0].init?.method, "DELETE");
  } finally {
    f.restore();
  }
});

test("a helper surfaces the sanitized server error message on !res.ok", async () => {
  const f = stubFetch(() => ({
    ok: false,
    status: 500,
    body: { error: { message: "TPROXY capture mode requires the native addon" } },
  }));
  try {
    await assert.rejects(() => startTproxyCaptureMode(), /requires the native addon/);
  } finally {
    f.restore();
  }
});

test("a helper falls back to the HTTP status when the error body has no message", async () => {
  const f = stubFetch(() => ({ ok: false, status: 503, body: null }));
  try {
    await assert.rejects(() => fetchTproxyStatus(), /HTTP 503/);
  } finally {
    f.restore();
  }
});
