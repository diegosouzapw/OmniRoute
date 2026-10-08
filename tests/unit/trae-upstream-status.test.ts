import test from "node:test";
import assert from "node:assert/strict";

// Import the executor directly (not via executors/index.ts) — index pulls in
// the entire provider registry and DB layer which is slow and unnecessary for
// the unit-level behavior we want to exercise here.
const { TraeExecutor } = await import("../../open-sse/executors/trae.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Build a Response whose body streams the given SSE frames (event/data pairs). */
function sseResponse(frames: Array<{ event: string; data: unknown }>): Response {
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const f of frames) {
        controller.enqueue(enc.encode(`event: ${f.event}\n`));
        controller.enqueue(enc.encode(`data: ${JSON.stringify(f.data)}\n\n`));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function jsonResponse(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Install a mock fetch dispatching by URL:
 *   POST /chat_sessions          → session create (forced status via sessionStatus)
 *   GET  /chat_sessions/{}/events → SSE frames, forced status, or null body
 *   POST .../ExchangeToken        → token refresh payload
 * Returns { restore }.
 */
function installMockFetch({
  sessionBody,
  frames,
  sessionStatus = 200,
  eventsStatus = 200,
  eventsBodyNull = false,
  exchangeStatus = 200,
}: {
  sessionBody?: unknown;
  frames?: Array<{ event: string; data: unknown }>;
  sessionStatus?: number;
  eventsStatus?: number;
  eventsBodyNull?: boolean;
  exchangeStatus?: number;
} = {}) {
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.url;
    void init;
    if (url.includes("/ExchangeToken")) {
      return jsonResponse(
        { ResponseMetadata: {}, Result: { Token: "NEW", RefreshToken: "NEW_REFRESH" } },
        exchangeStatus
      );
    }
    if (url.includes("/chat_sessions") && url.includes("/events")) {
      if (eventsBodyNull) return new Response(null, { status: eventsStatus });
      if (eventsStatus !== 200)
        return new Response(`upstream refused with ${eventsStatus}`, {
          status: eventsStatus,
          headers: { "Content-Type": "text/plain" },
        });
      return sseResponse(frames ?? [{ event: "done", data: { status: "completed" } }]);
    }
    if (url.endsWith("/chat_sessions")) {
      const textBody =
        sessionBody !== undefined
          ? String(sessionBody)
          : JSON.stringify({
              code: 0,
              data: { chat_session_id: "sess1", status: 2, message_id: "msg1" },
              message: "success",
            });
      return new Response(textBody, {
        status: sessionStatus,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
  return { restore: () => (globalThis.fetch = original) };
}

const CREDS = {
  accessToken: "JWT.test.token",
  providerSpecificData: {
    webId: "WID",
    bizUserId: "BUID",
    userUniqueId: "UUID",
    scope: "marscode-us",
    tenant: "marscode",
    region: "US-East",
  },
};

function executeInput() {
  return {
    model: "auto",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: CREDS,
  };
}

// ─── Upstream status on session errors ──────────────────────────────────────

test("session create rate limit records the upstream status on the sink", async () => {
  const { restore } = installMockFetch({ sessionBody: "limited", sessionStatus: 429 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new TraeExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 502);
    assert.match(await response.text(), /\[429\]/);
  } finally {
    restore();
  }
});

test("session create outage records the upstream status on the sink", async () => {
  const { restore } = installMockFetch({ sessionBody: "down", sessionStatus: 503 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new TraeExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 503);
    assert.equal(response.status, 502);
    assert.match(await response.text(), /\[503\]/);
  } finally {
    restore();
  }
});

// ─── Upstream status on event stream errors ─────────────────────────────────

test("event stream outage records the upstream status on the sink", async () => {
  const { restore } = installMockFetch({ eventsStatus: 503 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new TraeExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 503);
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});

test("event stream 2xx without a body is not an upstream failure status", async () => {
  const { restore } = installMockFetch({ eventsStatus: 200, eventsBodyNull: true });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new TraeExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});

// ─── Token refresh stays outside dispatch accounting ────────────────────────

test("token refresh failure leaves the sink untouched", async () => {
  const { restore } = installMockFetch({ exchangeStatus: 429 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const ex = new TraeExecutor();
    await assert.rejects(
      runWithAppliedProxyCapture(sink, () =>
        ex.refreshCredentials({ ...CREDS, refreshToken: "OLD_REFRESH" })
      )
    );
    assert.equal(sink.upstreamStatus, undefined);
  } finally {
    restore();
  }
});
