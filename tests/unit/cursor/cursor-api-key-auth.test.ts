/**
 * Cursor API-key exchange (open-sse/services/cursorApiKeyAuth.ts).
 *
 * api2.cursor.sh rejects a raw `crsr_…` key as Bearer; cursor-agent exchanges
 * it at /auth/exchange_user_api_key for a 1h session JWT. These tests pin the
 * exchange request shape, the 401/5xx/malformed-body mapping, the per-key
 * cache (refresh 5 min before exp, in-flight dedupe, invalidation) and the
 * shared bearer resolver used by the executor and the CLI passthrough.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  CURSOR_API_KEY_EXCHANGE_URL,
  CursorApiKeyExchangeError,
  __resetCursorApiKeyAuthForTest,
  exchangeCursorApiKey,
  invalidateCursorSessionToken,
  isCursorApiKey,
  readJwtExpiryMs,
  resolveCursorBearerToken,
  resolveCursorSessionToken,
  stripCursorOAuthTokenPrefix,
} from "@omniroute/open-sse/services/cursorApiKeyAuth.ts";

const API_KEY = "crsr_test_key_0123456789";

function jwtWithExp(expSeconds: number): string {
  const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ exp: expSeconds, type: "api_key_token" })}.sig`;
}

type RecordedCall = { url: string; init: RequestInit | undefined };

function fakeFetch(
  responder: (call: RecordedCall) => Response,
  calls: RecordedCall[] = []
): { fetchImpl: (url: string, init?: RequestInit) => Promise<Response>; calls: RecordedCall[] } {
  return {
    calls,
    fetchImpl: async (url, init) => {
      const call = { url, init };
      calls.push(call);
      return responder(call);
    },
  };
}

function okExchange(expSeconds: number): Response {
  return new Response(
    JSON.stringify({ accessToken: jwtWithExp(expSeconds), refreshToken: jwtWithExp(expSeconds) }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

describe("cursorApiKeyAuth", () => {
  beforeEach(() => {
    __resetCursorApiKeyAuthForTest();
  });

  it("recognises crsr_ keys only", () => {
    assert.equal(isCursorApiKey(API_KEY), true);
    assert.equal(isCursorApiKey("sk-other"), false);
    assert.equal(isCursorApiKey(undefined), false);
  });

  it("reads exp from a JWT and returns null for opaque tokens", () => {
    assert.equal(readJwtExpiryMs(jwtWithExp(1_800_000_000)), 1_800_000_000_000);
    assert.equal(readJwtExpiryMs("opaque"), null);
  });

  it("strips the WorkOS composite prefix from OAuth session tokens only", () => {
    assert.equal(stripCursorOAuthTokenPrefix("user_123::jwt.part.sig"), "jwt.part.sig");
    assert.equal(stripCursorOAuthTokenPrefix("jwt.part.sig"), "jwt.part.sig");
  });

  it("POSTs the key as Bearer to the exchange endpoint and parses the session", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const { fetchImpl, calls } = fakeFetch(() => okExchange(exp));

    const session = await exchangeCursorApiKey(API_KEY, { fetchImpl });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, CURSOR_API_KEY_EXCHANGE_URL);
    assert.equal(calls[0].init?.method, "POST");
    const headers = calls[0].init?.headers as Record<string, string>;
    assert.equal(headers.authorization, `Bearer ${API_KEY}`);
    assert.equal(headers["content-type"], "application/json");
    assert.equal(calls[0].init?.body, "{}");
    assert.equal(session.accessToken, jwtWithExp(exp));
    assert.equal(session.expiresAt, exp * 1000);
  });

  it("rejects non-crsr keys without calling upstream", async () => {
    const { fetchImpl, calls } = fakeFetch(() => okExchange(1));
    await assert.rejects(
      exchangeCursorApiKey("sk-not-cursor", { fetchImpl }),
      (err: unknown) => err instanceof CursorApiKeyExchangeError && err.status === 400
    );
    assert.equal(calls.length, 0);
  });

  it("maps upstream 401/403 to a 401 exchange error", async () => {
    for (const status of [401, 403]) {
      const { fetchImpl } = fakeFetch(() => new Response("nope", { status }));
      await assert.rejects(
        exchangeCursorApiKey(API_KEY, { fetchImpl }),
        (err: unknown) =>
          err instanceof CursorApiKeyExchangeError &&
          err.status === 401 &&
          !err.message.includes(API_KEY)
      );
    }
  });

  it("maps upstream 5xx and malformed bodies to 502", async () => {
    const cases: Array<() => Response> = [
      () => new Response("boom", { status: 503 }),
      () => new Response("not json", { status: 200 }),
      () => new Response(JSON.stringify({ refreshToken: "x" }), { status: 200 }),
    ];
    for (const responder of cases) {
      const { fetchImpl } = fakeFetch(responder);
      await assert.rejects(
        exchangeCursorApiKey(API_KEY, { fetchImpl }),
        (err: unknown) => err instanceof CursorApiKeyExchangeError && err.status === 502
      );
    }
  });

  it("maps network failures to 502", async () => {
    const fetchImpl = async () => {
      throw new Error("ECONNRESET");
    };
    await assert.rejects(
      exchangeCursorApiKey(API_KEY, { fetchImpl }),
      (err: unknown) => err instanceof CursorApiKeyExchangeError && err.status === 502
    );
  });

  it("caches the session per key and re-exchanges 5 minutes before expiry", async () => {
    let nowMs = 1_000_000_000_000;
    const now = () => nowMs;
    const { fetchImpl, calls } = fakeFetch(() => okExchange(Math.floor(now() / 1000) + 3600));

    const first = await resolveCursorSessionToken(API_KEY, { fetchImpl, now });
    const second = await resolveCursorSessionToken(API_KEY, { fetchImpl, now });
    assert.equal(calls.length, 1);
    assert.equal(second.accessToken, first.accessToken);

    nowMs += 54 * 60 * 1000;
    await resolveCursorSessionToken(API_KEY, { fetchImpl, now });
    assert.equal(calls.length, 1, "still fresh at 54 min");

    nowMs += 2 * 60 * 1000;
    const refreshed = await resolveCursorSessionToken(API_KEY, { fetchImpl, now });
    assert.equal(calls.length, 2, "re-exchanged inside the 5 min skew window");
    assert.notEqual(refreshed.accessToken, first.accessToken);
  });

  it("dedupes concurrent exchanges for the same key", async () => {
    let release: (() => void) | null = null;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { fetchImpl, calls } = fakeFetch(() => okExchange(Math.floor(Date.now() / 1000) + 3600));
    const gatedFetch = async (url: string, init?: RequestInit) => {
      await gate;
      return fetchImpl(url, init);
    };

    const pending = Promise.all([
      resolveCursorSessionToken(API_KEY, { fetchImpl: gatedFetch }),
      resolveCursorSessionToken(API_KEY, { fetchImpl: gatedFetch }),
      resolveCursorSessionToken(API_KEY, { fetchImpl: gatedFetch }),
    ]);
    release?.();
    const tokens = await pending;
    assert.equal(calls.length, 1);
    assert.equal(new Set(tokens.map((t) => t.accessToken)).size, 1);
  });

  it("invalidation forces a fresh exchange on the next call", async () => {
    const { fetchImpl, calls } = fakeFetch(() => okExchange(Math.floor(Date.now() / 1000) + 3600));
    await resolveCursorSessionToken(API_KEY, { fetchImpl });
    invalidateCursorSessionToken(API_KEY);
    await resolveCursorSessionToken(API_KEY, { fetchImpl });
    assert.equal(calls.length, 2);
  });

  it("does not cache a failed exchange", async () => {
    let attempt = 0;
    const { fetchImpl } = fakeFetch(() => {
      attempt += 1;
      return attempt === 1
        ? new Response("down", { status: 503 })
        : okExchange(Math.floor(Date.now() / 1000) + 3600);
    });
    await assert.rejects(resolveCursorSessionToken(API_KEY, { fetchImpl }));
    const session = await resolveCursorSessionToken(API_KEY, { fetchImpl });
    assert.ok(session.accessToken.length > 0);
    assert.equal(attempt, 2);
  });

  it("resolveCursorBearerToken prefers the exchanged token for API-key connections", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const { fetchImpl } = fakeFetch(() => okExchange(exp));
    const bearer = await resolveCursorBearerToken(
      { apiKey: API_KEY, accessToken: "user_1::stale" },
      { fetchImpl }
    );
    assert.equal(bearer, jwtWithExp(exp));
  });

  it("resolveCursorBearerToken keeps the OAuth path untouched and rejects empty creds", async () => {
    const { fetchImpl, calls } = fakeFetch(() => okExchange(1));
    assert.equal(
      await resolveCursorBearerToken({ accessToken: "user_1::session.jwt.sig" }, { fetchImpl }),
      "session.jwt.sig"
    );
    assert.equal(calls.length, 0);
    await assert.rejects(
      resolveCursorBearerToken({}, { fetchImpl }),
      (err: unknown) => err instanceof CursorApiKeyExchangeError && err.status === 401
    );
  });
});
