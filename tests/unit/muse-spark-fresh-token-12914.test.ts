import test from "node:test";
import assert from "node:assert/strict";
import { WebSocket } from "ws";
import {
  MuseSparkWebExecutor,
  __fetchFreshAccessTokenForTesting,
  __resetMuseSparkConversationCacheForTesting,
  __resetMuseSparkTokenCacheForTesting,
  __setMuseSparkBrowserPoolForTesting,
  __setMuseSparkFreshTokenFetcherForTesting,
  __setMuseSparkWebSocketForTesting,
} from "../../open-sse/executors/muse-spark-web.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// #12914 (fix for #10727): hermetic contract tests for the fresh-WS-token path.
//
// What these prove: the executor's own logic — Heisenberg cookie refresh, the
// browserPool hand-off (pool key, cookie, navigation options), accessToken
// extraction, the 4-minute per-cookie cache, error paths (acquire/goto failure,
// navigation timeout, abort) and how execute() picks fresh vs static token.
// Request/response shapes come from the PR's own comments (Heisenberg doc_id +
// `set-cookie: ecto_1_sess=…`, RSC payload `\"accessToken\":\"ecto1:…\"`).
//
// What they CANNOT prove: that meta.ai still serves that JS challenge/payload,
// that Heisenberg still answers with set-cookie, or that the gateway accepts the
// resulting frame. Only a real vendor call can disprove those.

const HEISENBERG_DOC_ID = "954e9b193487fa4af750af87906e4313";
const TTL_MS = 4 * 60 * 1000;

test.after(() => {
  __setMuseSparkBrowserPoolForTesting(undefined);
  __setMuseSparkFreshTokenFetcherForTesting(undefined);
  resetDbInstance();
});

// ─── helpers ────────────────────────────────────────────────────────────────

type FetchCall = { url: string; init: RequestInit };
type PoolCall = { poolKey: string; options: Record<string, unknown> };

/** Page whose HTML embeds the token the way the RSC payload does (escaped quotes). */
function rscHtml(token: string): string {
  return `<script>self.__next_f.push([1,"{\\"accessToken\\":\\"ecto1:${token}\\",\\"x\\":1}"])</script>`;
}

type MockPageOptions = {
  html?: string;
  gotoImpl?: (url: string, opts: Record<string, unknown>) => Promise<void>;
};

function makeMockPage(options: MockPageOptions = {}) {
  const gotoCalls: Array<{ url: string; opts: Record<string, unknown> }> = [];
  const page = {
    closed: 0,
    goto: async (url: string, opts: Record<string, unknown>) => {
      gotoCalls.push({ url, opts });
      if (options.gotoImpl) await options.gotoImpl(url, opts);
    },
    content: async () => options.html ?? "",
    close: async () => {
      page.closed++;
    },
  };
  return { page, gotoCalls };
}

function installPool(pageFactory: () => ReturnType<typeof makeMockPage>["page"]) {
  const acquireCalls: PoolCall[] = [];
  __setMuseSparkBrowserPoolForTesting({
    acquire: async (poolKey: string, options: unknown) => {
      acquireCalls.push({ poolKey, options: options as Record<string, unknown> });
      return {
        id: poolKey,
        context: null,
        warmupPage: null,
        lastUsed: 0,
        isStealth: false,
      } as never;
    },
    openPage: async () => pageFactory() as never,
  });
  return acquireCalls;
}

function installFetch(
  respond: (call: FetchCall) => Response | Promise<Response> = () =>
    new Response("{}", { status: 200 })
) {
  const original = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const call = { url: String(input), init: init ?? {} };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

function setCookieResponse(setCookie: string): Response {
  const res = new Response("{}", { status: 200 });
  // Response() may drop Set-Cookie depending on the runtime's header guard, so
  // pin the header read the executor performs (`headers.get("set-cookie")`).
  Object.defineProperty(res, "headers", {
    value: { get: (name: string) => (name.toLowerCase() === "set-cookie" ? setCookie : null) },
  });
  return res;
}

function cleanup(fetcher: { restore: () => void }) {
  fetcher.restore();
  __setMuseSparkBrowserPoolForTesting(undefined);
  __resetMuseSparkTokenCacheForTesting();
}

// ─── fetchFreshAccessToken: success path + contract with browserPool ─────────

test("#12914: success — Heisenberg POST, pool hand-off, navigation options, token extracted, page closed", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const { page, gotoCalls } = makeMockPage({ html: rscHtml("FRESHabc-_123") });
  const acquireCalls = installPool(() => page);
  const net = installFetch();
  try {
    const cookie = "ecto_1_sess=OLDSESS; datr=xyz";
    const result = await __fetchFreshAccessTokenForTesting(cookie);

    assert.deepEqual(result, { ok: true, token: "ecto1:FRESHabc-_123", updatedCookie: undefined });

    // Heisenberg refresh: POST to the GraphQL endpoint with the doc_id and cookie.
    assert.equal(net.calls.length, 1);
    assert.equal(net.calls[0].url, "https://www.meta.ai/api/graphql");
    assert.equal(net.calls[0].init.method, "POST");
    const headers = net.calls[0].init.headers as Record<string, string>;
    assert.equal(headers.Cookie, cookie);
    assert.equal(headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(String(net.calls[0].init.body)), {
      doc_id: HEISENBERG_DOC_ID,
      variables: {},
    });

    // Pool hand-off: hashed per-cookie key (never the raw cookie), meta.ai domain.
    assert.equal(acquireCalls.length, 1);
    assert.match(acquireCalls[0].poolKey, /^meta-ai-token:[0-9a-f]{16}$/);
    assert.ok(!acquireCalls[0].poolKey.includes("OLDSESS"), "pool key must not leak the cookie");
    assert.equal(acquireCalls[0].options.cookieDomain, ".meta.ai");
    assert.equal(acquireCalls[0].options.cookieString, cookie);
    assert.equal(acquireCalls[0].options.warmupUrl, null);
    assert.match(String(acquireCalls[0].options.userAgent), /Mozilla\/5\.0/);

    // Navigation: the JS challenge needs networkidle and a bounded timeout.
    assert.equal(gotoCalls.length, 1);
    assert.equal(gotoCalls[0].url, "https://www.meta.ai/");
    assert.equal(gotoCalls[0].opts.waitUntil, "networkidle");
    assert.equal(gotoCalls[0].opts.timeout, 30000);
    assert.equal(page.closed, 1, "page must be closed after a successful extraction");
  } finally {
    cleanup(net);
  }
});

test("#12914: the token regex also accepts an unescaped accessToken in the HTML", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const { page } = makeMockPage({ html: '<div>{"accessToken":"ecto1:PLAINtok_9"}</div>' });
  installPool(() => page);
  const net = installFetch();
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=a");
    assert.equal(result.ok && result.token, "ecto1:PLAINtok_9");
  } finally {
    cleanup(net);
  }
});

test("#12914: Heisenberg set-cookie refreshes ecto_1_sess for the browser and is returned", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const { page } = makeMockPage({ html: rscHtml("T1") });
  const acquireCalls = installPool(() => page);
  const net = installFetch(() =>
    setCookieResponse("ecto_1_sess=NEWSESS; Path=/; Secure; HttpOnly")
  );
  try {
    const result = await __fetchFreshAccessTokenForTesting(
      "datr=xyz; ecto_1_sess=OLDSESS; lang=en"
    );
    assert.equal(result.ok, true);
    assert.equal(result.ok && result.updatedCookie, "datr=xyz; ecto_1_sess=NEWSESS; lang=en");
    assert.equal(acquireCalls[0].options.cookieString, "datr=xyz; ecto_1_sess=NEWSESS; lang=en");
  } finally {
    cleanup(net);
  }
});

test("#12914: an empty/absent Heisenberg set-cookie keeps the original cookie and still proceeds", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const { page } = makeMockPage({ html: rscHtml("T2") });
  const acquireCalls = installPool(() => page);
  // Non-2xx without set-cookie: the executor ignores the status and carries on.
  const net = installFetch(() => new Response("nope", { status: 500 }));
  try {
    const cookie = "ecto_1_sess=KEEP";
    const result = await __fetchFreshAccessTokenForTesting(cookie);
    assert.deepEqual(result, { ok: true, token: "ecto1:T2", updatedCookie: undefined });
    assert.equal(acquireCalls[0].options.cookieString, cookie);
  } finally {
    cleanup(net);
  }
});

// ─── cache: reuse vs refresh ─────────────────────────────────────────────────

test("#12914: cache — reuse inside the 4 min TTL, refresh once it elapses", async (t) => {
  __resetMuseSparkTokenCacheForTesting();
  let now = 1_800_000_000_000;
  t.mock.method(Date, "now", () => now);
  let n = 0;
  const acquireCalls = installPool(() => makeMockPage({ html: rscHtml(`TOK${++n}`) }).page);
  const net = installFetch();
  try {
    const cookie = "ecto_1_sess=ttl";
    const first = await __fetchFreshAccessTokenForTesting(cookie);
    assert.equal(first.ok && first.token, "ecto1:TOK1");

    now += TTL_MS - 1;
    const reused = await __fetchFreshAccessTokenForTesting(cookie);
    assert.equal(
      reused.ok && reused.token,
      "ecto1:TOK1",
      "inside the TTL the cached token is returned"
    );
    assert.equal(acquireCalls.length, 1, "no browser launch on a cache hit");
    assert.equal(net.calls.length, 1, "no Heisenberg call on a cache hit");

    now += 2; // total = TTL + 1ms → expired
    const refreshed = await __fetchFreshAccessTokenForTesting(cookie);
    assert.equal(
      refreshed.ok && refreshed.token,
      "ecto1:TOK2",
      "after the TTL a new token is fetched"
    );
    assert.equal(acquireCalls.length, 2);
    assert.equal(net.calls.length, 2);
  } finally {
    cleanup(net);
  }
});

test("#12914: cache is keyed per cookie — two accounts never share a token or a pool key", async () => {
  __resetMuseSparkTokenCacheForTesting();
  let n = 0;
  const acquireCalls = installPool(() => makeMockPage({ html: rscHtml(`ACC${++n}`) }).page);
  const net = installFetch();
  try {
    const a = await __fetchFreshAccessTokenForTesting("ecto_1_sess=accountA");
    const b = await __fetchFreshAccessTokenForTesting("ecto_1_sess=accountB");
    const aAgain = await __fetchFreshAccessTokenForTesting("ecto_1_sess=accountA");
    assert.equal(a.ok && a.token, "ecto1:ACC1");
    assert.equal(b.ok && b.token, "ecto1:ACC2");
    assert.equal(
      aAgain.ok && aAgain.token,
      "ecto1:ACC1",
      "account A still served from its own entry"
    );
    assert.equal(acquireCalls.length, 2);
    assert.notEqual(acquireCalls[0].poolKey, acquireCalls[1].poolKey);
  } finally {
    cleanup(net);
  }
});

// ─── failure / timeout / abort ───────────────────────────────────────────────

test("#12914: navigation timeout → ok:false, sanitized, page closed, nothing cached", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const timeoutErr = new Error(
    "page.goto: Timeout 30000ms exceeded.\n    at /srv/app/node_modules/playwright-core/lib/client/page.js:1:1"
  );
  const pages: Array<ReturnType<typeof makeMockPage>["page"]> = [];
  const acquireCalls = installPool(() => {
    const { page } = makeMockPage({
      gotoImpl: async () => {
        throw timeoutErr;
      },
    });
    pages.push(page);
    return page;
  });
  const net = installFetch();
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=slow");
    assert.equal(result.ok, false);
    assert.ok(!result.ok);
    assert.match(result.error, /^fetchFreshAccessToken failed: /);
    assert.match(result.error, /Timeout 30000ms exceeded/);
    assert.ok(!/node_modules|\n\s+at /.test(result.error), "no stack frames/paths in the error");
    assert.equal(pages[0].closed, 1, "page is closed even though navigation threw");

    // A failure must not poison the cache: the next call tries the browser again.
    await __fetchFreshAccessTokenForTesting("ecto_1_sess=slow");
    assert.equal(acquireCalls.length, 2);
  } finally {
    cleanup(net);
  }
});

test("#12914: caller abort while the page is loading → ok:false and the page is closed", async () => {
  __resetMuseSparkTokenCacheForTesting();
  let gotoStarted: () => void = () => {};
  const started = new Promise<void>((resolve) => (gotoStarted = resolve));
  const pages: Array<ReturnType<typeof makeMockPage>["page"]> = [];
  installPool(() => {
    const { page } = makeMockPage({
      gotoImpl: () => {
        gotoStarted();
        return new Promise<void>(() => {}); // challenge never finishes
      },
    });
    pages.push(page);
    return page;
  });
  const net = installFetch();
  try {
    const controller = new AbortController();
    const pending = __fetchFreshAccessTokenForTesting("ecto_1_sess=abort", controller.signal);
    await started; // deterministic: abort only once navigation is in flight
    controller.abort(new Error("client disconnected"));
    const result = await pending;
    assert.ok(!result.ok);
    assert.match(result.error, /client disconnected/);
    assert.equal(pages[0].closed, 1);
    // the signal reaches the Heisenberg request too
    assert.equal(net.calls[0].init.signal, controller.signal);
  } finally {
    cleanup(net);
  }
});

test("#12914: page without accessToken → ok:false 'accessToken not found', page closed", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const pages: Array<ReturnType<typeof makeMockPage>["page"]> = [];
  installPool(() => {
    const { page } = makeMockPage({ html: "<html>executeChallenge()</html>" });
    pages.push(page);
    return page;
  });
  const net = installFetch();
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=challenge");
    assert.deepEqual(result, {
      ok: false,
      error: "accessToken not found in meta.ai page (browser)",
    });
    assert.equal(pages[0].closed, 1);
  } finally {
    cleanup(net);
  }
});

test("#12914: browserPool acquire rejection → ok:false (no page to close, no throw)", async () => {
  __resetMuseSparkTokenCacheForTesting();
  __setMuseSparkBrowserPoolForTesting({
    acquire: async () => {
      throw new Error("playwright is not installed");
    },
    openPage: async () => {
      throw new Error("must not be reached");
    },
  });
  const net = installFetch();
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=nopw");
    assert.ok(!result.ok);
    assert.match(result.error, /playwright is not installed/);
  } finally {
    cleanup(net);
  }
});

test("#12914: Heisenberg network failure → ok:false before any browser is launched", async () => {
  __resetMuseSparkTokenCacheForTesting();
  const acquireCalls = installPool(() => makeMockPage({ html: rscHtml("X") }).page);
  const net = installFetch(() => {
    throw new Error("ECONNRESET");
  });
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=down");
    assert.ok(!result.ok);
    assert.match(result.error, /ECONNRESET/);
    assert.equal(acquireCalls.length, 0);
  } finally {
    cleanup(net);
  }
});

// ─── execute(): fresh vs static token selection ──────────────────────────────

class CapturingWebSocket {
  static instances: CapturingWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((evt: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((evt: Error) => void) | null = null;
  readyState = WebSocket.CONNECTING;
  url: string;
  headers: Record<string, string>;
  constructor(url: string, options?: { headers?: Record<string, string> }) {
    this.url = url;
    this.headers = options?.headers ?? {};
    CapturingWebSocket.instances.push(this);
    // Fail fast: this test only inspects what the executor handed to the socket.
    queueMicrotask(() => this.onerror?.(new Error("stop")));
  }
  send() {}
  close() {}
}

function executeInput(
  connectionId: string,
  opts: { staticToken?: string } = {}
): Parameters<MuseSparkWebExecutor["execute"]>[0] {
  return {
    model: "muse-spark",
    body: { messages: [{ role: "user", content: "ping" }] },
    stream: false,
    credentials: {
      apiKey: "ecto_1_sess=abc123",
      connectionId,
      providerSpecificData: opts.staticToken ? { authorization: opts.staticToken } : {},
    },
    signal: null,
    log: null,
    upstreamExtraHeaders: undefined,
  } as Parameters<MuseSparkWebExecutor["execute"]>[0];
}

function wsAuthorization(ws: CapturingWebSocket): string | null {
  return new URL(ws.url).searchParams.get("Authorization");
}

test("#12914: execute() prefers the fresh token and the refreshed cookie over the static ones", async () => {
  __resetMuseSparkConversationCacheForTesting();
  CapturingWebSocket.instances = [];
  __setMuseSparkFreshTokenFetcherForTesting(async () => ({
    ok: true as const,
    token: "ecto1:FRESH",
    updatedCookie: "ecto_1_sess=REFRESHED",
  }));
  const net = installFetch();
  const restoreWs = __setMuseSparkWebSocketForTesting(
    CapturingWebSocket as unknown as typeof WebSocket
  );
  try {
    const result = await new MuseSparkWebExecutor().execute(
      executeInput("conn-12914-fresh", { staticToken: "ecto1:STALE" })
    );
    assert.equal(result.response.status, 502); // socket was told to error out
    assert.equal(CapturingWebSocket.instances.length, 1);
    const ws = CapturingWebSocket.instances[0];
    assert.equal(wsAuthorization(ws), "ecto1:FRESH");
    assert.equal(ws.headers.Cookie, "ecto_1_sess=REFRESHED");
    // The GraphQL warmup/mode-switch calls ride on the refreshed cookie as well.
    const gqlCookies = net.calls.map((c) => (c.init.headers as Record<string, string>).Cookie);
    assert.ok(gqlCookies.length >= 2 && gqlCookies.every((c) => c === "ecto_1_sess=REFRESHED"));
  } finally {
    restoreWs();
    net.restore();
    __setMuseSparkFreshTokenFetcherForTesting(undefined);
  }
});

test("#12914: execute() falls back to the static token when the fresh fetch fails", async () => {
  __resetMuseSparkConversationCacheForTesting();
  CapturingWebSocket.instances = [];
  __setMuseSparkFreshTokenFetcherForTesting(async () => ({ ok: false as const, error: "boom" }));
  const net = installFetch();
  const restoreWs = __setMuseSparkWebSocketForTesting(
    CapturingWebSocket as unknown as typeof WebSocket
  );
  try {
    await new MuseSparkWebExecutor().execute(
      executeInput("conn-12914-static", { staticToken: "ecto1:STATIC" })
    );
    const ws = CapturingWebSocket.instances[0];
    assert.equal(wsAuthorization(ws), "ecto1:STATIC");
    assert.equal(ws.headers.Cookie, "ecto_1_sess=abc123", "original cookie is kept");
  } finally {
    restoreWs();
    net.restore();
    __setMuseSparkFreshTokenFetcherForTesting(undefined);
  }
});

test("#12914: execute() with no static token and a failed fresh fetch → 400 missing_authorization", async () => {
  __resetMuseSparkConversationCacheForTesting();
  CapturingWebSocket.instances = [];
  __setMuseSparkFreshTokenFetcherForTesting(async () => ({
    ok: false as const,
    error: "accessToken not found in meta.ai page (browser)",
  }));
  const net = installFetch();
  const restoreWs = __setMuseSparkWebSocketForTesting(
    CapturingWebSocket as unknown as typeof WebSocket
  );
  try {
    const result = await new MuseSparkWebExecutor().execute(executeInput("conn-12914-none"));
    assert.equal(result.response.status, 400);
    const body = await result.response.json();
    assert.match(body.error.message, /Missing Authorization/);
    assert.match(body.error.message, /accessToken not found/);
    assert.ok(!body.error.message.includes("at /"), "no stack trace in the body");
    assert.equal(CapturingWebSocket.instances.length, 0, "no socket is opened without a token");
    assert.equal(net.calls.length, 0, "no GraphQL call is made either");
  } finally {
    restoreWs();
    net.restore();
    __setMuseSparkFreshTokenFetcherForTesting(undefined);
  }
});

test("#12914: execute() with the REAL fetcher (pool seams only) puts the page token in the WS URL", async () => {
  __resetMuseSparkConversationCacheForTesting();
  __resetMuseSparkTokenCacheForTesting();
  CapturingWebSocket.instances = [];
  installPool(() => makeMockPage({ html: rscHtml("FROMPAGE") }).page);
  const net = installFetch((call) =>
    String(call.init.body).includes(HEISENBERG_DOC_ID)
      ? setCookieResponse("ecto_1_sess=ROTATED; Path=/")
      : new Response("{}", { status: 200 })
  );
  const restoreWs = __setMuseSparkWebSocketForTesting(
    CapturingWebSocket as unknown as typeof WebSocket
  );
  try {
    await new MuseSparkWebExecutor().execute(executeInput("conn-12914-e2e"));
    const ws = CapturingWebSocket.instances[0];
    assert.equal(wsAuthorization(ws), "ecto1:FROMPAGE");
    assert.equal(ws.headers.Cookie, "ecto_1_sess=ROTATED");
  } finally {
    restoreWs();
    cleanup(net);
  }
});
