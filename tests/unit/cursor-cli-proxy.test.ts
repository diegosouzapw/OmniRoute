/**
 * Cursor CLI passthrough handler (open-sse/handlers/cursorCliProxy.ts).
 *
 * The handler is exercised through its dependency seam so no SQLite, no
 * network and no JWT_SECRET env are needed: every collaborator (API-key
 * validation, connection listing, bearer resolution, upstream fetch, call
 * logging) is injected per test.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SignJWT, decodeJwt } from "jose";

import {
  CURSOR_CLI_PROXY_PREFIX,
  CURSOR_CLI_REQUEST_TYPE,
  CURSOR_CLI_SESSION_AUDIENCE,
  CURSOR_CLI_SESSION_ISSUER,
  CURSOR_CLI_SESSION_TTL_SECONDS,
  handleCursorCliProxy,
  mintCursorCliSessionToken,
  normalizeCursorCliPath,
  type CursorCliProxyDeps,
} from "@omniroute/open-sse/handlers/cursorCliProxy.ts";
import { CursorApiKeyExchangeError } from "@omniroute/open-sse/services/cursorApiKeyAuth.ts";

const SECRET = "unit-test-jwt-secret-with-enough-entropy-0123456789";
const OMNI_KEY = "sk-omniroute-unit-key";
const CURSOR_KEY = "crsr_unit_cursor_key";
const UPSTREAM = "https://upstream.example";
const NOW = 1_800_000_000_000;

type UpstreamCall = { url: string; init: RequestInit };

function makeDeps(overrides: Partial<CursorCliProxyDeps> = {}): {
  deps: Partial<CursorCliProxyDeps>;
  upstreamCalls: UpstreamCall[];
  logs: Record<string, unknown>[];
} {
  const upstreamCalls: UpstreamCall[] = [];
  const logs: Record<string, unknown>[] = [];
  const deps: Partial<CursorCliProxyDeps> = {
    fetchImpl: (async (url: string, init: RequestInit) => {
      upstreamCalls.push({ url, init });
      return new Response("upstream-ok", {
        status: 200,
        headers: { "content-type": "application/proto", "content-encoding": "identity" },
      });
    }) as unknown as typeof fetch,
    now: () => NOW,
    getSecret: () => SECRET,
    validateApiKey: async (key) => key === OMNI_KEY,
    getApiKeyMetadata: async (key) => (key === OMNI_KEY ? { id: "key-1", name: "unit key" } : null),
    getApiKeyById: async (id) => (id === "key-1" ? { isActive: true, revokedAt: null } : null),
    requireApiKey: () => true,
    listCursorConnections: async () => [{ id: "conn-1", apiKey: CURSOR_KEY, priority: 1 }],
    resolveBearer: async ({ apiKey }) =>
      apiKey === CURSOR_KEY ? "cursor-session-jwt" : "oauth-jwt",
    invalidateBearer: () => undefined,
    saveCallLog: async (entry) => {
      logs.push(entry);
    },
    upstreamBaseUrl: UPSTREAM,
    ...overrides,
  };
  return { deps, upstreamCalls, logs };
}

function exchangeRequest(bearer: string | null, body = "{}"): Request {
  return new Request("http://omniroute.local/api/cursor-cli/auth/exchange_user_api_key", {
    method: "POST",
    headers: {
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
      "content-type": "application/json",
    },
    body,
  });
}

function rpcRequest(
  bearer: string | null,
  path = "/aiserver.v1.DashboardService/GetMe",
  body: BodyInit | null = new Uint8Array([0, 0, 0, 0, 0])
): Request {
  return new Request(`http://omniroute.local/api/cursor-cli${path}?x=1`, {
    method: "POST",
    headers: {
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
      "content-type": "application/proto",
      "connect-protocol-version": "1",
      host: "omniroute.local",
      "accept-encoding": "gzip,br",
      cookie: "auth_token=dashboard",
    },
    body,
  });
}

async function mintedToken(): Promise<string> {
  return mintCursorCliSessionToken({ apiKeyId: "key-1", apiKeyName: "unit key" }, SECRET, NOW);
}

async function flushLogs(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("cursorCliProxy: path normalisation", () => {
  it("joins catch-all segments into the upstream RPC path", () => {
    assert.equal(
      normalizeCursorCliPath(["aiserver.v1.DashboardService", "GetMe"]),
      "/aiserver.v1.DashboardService/GetMe"
    );
    assert.equal(
      normalizeCursorCliPath(["auth", "exchange_user_api_key"]),
      "/auth/exchange_user_api_key"
    );
    assert.equal(normalizeCursorCliPath(["v1", "traces"]), "/v1/traces");
  });

  it("re-encodes segments so encoded slashes and spaces cannot smuggle extra path", () => {
    assert.equal(normalizeCursorCliPath(["%2Fetc", "x y"]), "/%2Fetc/x%20y");
    assert.equal(normalizeCursorCliPath(["a%2Fb"]), "/a%2Fb");
  });
});

describe("cursorCliProxy: /auth/exchange_user_api_key", () => {
  it("mints a 1h OmniRoute session JWT for a valid OmniRoute API key", async () => {
    const { deps, logs } = makeDeps();
    const res = await handleCursorCliProxy(
      exchangeRequest(OMNI_KEY),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as { accessToken: string; refreshToken: string };
    assert.equal(body.refreshToken, body.accessToken);
    const claims = decodeJwt(body.accessToken);
    assert.equal(claims.iss, CURSOR_CLI_SESSION_ISSUER);
    assert.equal(claims.aud, CURSOR_CLI_SESSION_AUDIENCE);
    assert.equal(claims.sub, "key-1");
    assert.equal(claims.exp, Math.floor(NOW / 1000) + CURSOR_CLI_SESSION_TTL_SECONDS);
    assert.ok(!body.accessToken.includes(OMNI_KEY));
    await flushLogs();
    assert.equal(logs.length, 1);
    assert.equal(logs[0].path, `${CURSOR_CLI_PROXY_PREFIX}/auth/exchange_user_api_key`);
    assert.equal(logs[0].requestType, CURSOR_CLI_REQUEST_TYPE);
    assert.equal(logs[0].apiKeyId, "key-1");
  });

  it("rejects an unknown key with 401 when OmniRoute requires API keys", async () => {
    const { deps } = makeDeps();
    const res = await handleCursorCliProxy(
      exchangeRequest("sk-wrong"),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(res.status, 401);
    const body = (await res.json()) as { code: string; message: string };
    assert.equal(body.code, "unauthenticated");
    assert.ok(!body.message.includes("at /"));
  });

  it("falls back to an anonymous session when REQUIRE_API_KEY is off", async () => {
    const { deps } = makeDeps({ requireApiKey: () => false });
    const res = await handleCursorCliProxy(
      exchangeRequest("anything"),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as { accessToken: string };
    assert.equal(decodeJwt(body.accessToken).sub, "anonymous");
  });

  it("returns 503 without minting when JWT_SECRET is missing", async () => {
    const { deps } = makeDeps({ getSecret: () => undefined });
    const res = await handleCursorCliProxy(
      exchangeRequest(OMNI_KEY),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(res.status, 503);
  });

  it("rejects non-JSON and non-POST exchange calls", async () => {
    const { deps } = makeDeps();
    const bad = await handleCursorCliProxy(
      exchangeRequest(OMNI_KEY, "not-json"),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(bad.status, 400);
    const get = await handleCursorCliProxy(
      new Request("http://omniroute.local/api/cursor-cli/auth/exchange_user_api_key", {
        method: "GET",
      }),
      ["auth", "exchange_user_api_key"],
      deps
    );
    assert.equal(get.status, 405);
  });
});

describe("cursorCliProxy: forwarded RPCs", () => {
  it("swaps the OmniRoute session token for the Cursor bearer and strips hop headers", async () => {
    const { deps, upstreamCalls, logs } = makeDeps();
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 200);
    assert.equal(await res.text(), "upstream-ok");
    assert.equal(res.headers.get("content-type"), "application/proto");
    assert.equal(res.headers.get("content-encoding"), null);

    assert.equal(upstreamCalls.length, 1);
    assert.equal(upstreamCalls[0].url, `${UPSTREAM}/aiserver.v1.DashboardService/GetMe?x=1`);
    const headers = upstreamCalls[0].init.headers as Headers;
    assert.equal(headers.get("authorization"), "Bearer cursor-session-jwt");
    assert.equal(headers.get("connect-protocol-version"), "1");
    assert.equal(headers.get("host"), null);
    assert.equal(headers.get("cookie"), null);
    assert.equal(headers.get("accept-encoding"), null);
    assert.equal(upstreamCalls[0].init.method, "POST");

    await flushLogs();
    assert.equal(logs.length, 1);
    assert.equal(logs[0].path, `${CURSOR_CLI_PROXY_PREFIX}/aiserver.v1.DashboardService/GetMe`);
    assert.equal(logs[0].provider, "cursor-api");
    assert.equal(logs[0].connectionId, "conn-1");
    assert.equal(logs[0].status, 200);
    assert.equal(logs[0].apiKeyId, "key-1");
  });

  it("rejects a raw OmniRoute API key on RPC paths so the CLI exchanges first", async () => {
    const { deps, upstreamCalls } = makeDeps();
    const res = await handleCursorCliProxy(
      rpcRequest(OMNI_KEY),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 401);
    assert.equal(upstreamCalls.length, 0);
  });

  it("rejects missing, expired, foreign-audience and tampered tokens with 401", async () => {
    const { deps, upstreamCalls } = makeDeps();
    const expired = await mintCursorCliSessionToken(
      { apiKeyId: "key-1", apiKeyName: null },
      SECRET,
      NOW - (CURSOR_CLI_SESSION_TTL_SECONDS + 60) * 1000
    );
    const foreign = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer(CURSOR_CLI_SESSION_ISSUER)
      .setAudience("dashboard")
      .setSubject("key-1")
      .setExpirationTime(Math.floor(NOW / 1000) + 600)
      .sign(new TextEncoder().encode(SECRET));
    const tampered = (await mintedToken()).slice(0, -4) + "AAAA";
    for (const token of [null, expired, foreign, tampered]) {
      const res = await handleCursorCliProxy(
        rpcRequest(token),
        ["aiserver.v1.DashboardService", "GetMe"],
        deps
      );
      assert.equal(res.status, 401, `token=${token === null ? "none" : token.slice(0, 12)}`);
    }
    assert.equal(upstreamCalls.length, 0);
  });

  it("rejects a session whose OmniRoute API key was revoked or deactivated", async () => {
    const revoked = makeDeps({
      getApiKeyById: async () => ({ isActive: true, revokedAt: "2026-01-01T00:00:00Z" }),
    });
    const deactivated = makeDeps({
      getApiKeyById: async () => ({ isActive: false, revokedAt: null }),
    });
    const gone = makeDeps({ getApiKeyById: async () => null });
    for (const { deps } of [revoked, deactivated, gone]) {
      const res = await handleCursorCliProxy(
        rpcRequest(await mintedToken()),
        ["aiserver.v1.DashboardService", "GetMe"],
        deps
      );
      assert.equal(res.status, 401);
    }
  });

  it("returns 503 when no active Cursor connection exists", async () => {
    const { deps, logs } = makeDeps({ listCursorConnections: async () => [] });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 503);
    const body = (await res.json()) as { code: string; message: string };
    assert.equal(body.code, "unavailable");
    assert.ok(!body.message.includes("at /"));
    await flushLogs();
    assert.equal(logs[0].status, 503);
  });

  it("skips cooling-down connections and falls through when a key cannot be exchanged", async () => {
    const { deps, upstreamCalls } = makeDeps({
      listCursorConnections: async () => [
        {
          id: "cooling",
          apiKey: "crsr_cooling",
          priority: 0,
          rateLimitedUntil: new Date(NOW + 60_000).toISOString(),
        },
        { id: "broken", apiKey: "crsr_broken", priority: 1 },
        { id: "oauth", accessToken: "user::session", priority: 2 },
      ],
      resolveBearer: async ({ apiKey, accessToken }) => {
        if (apiKey === "crsr_broken")
          throw new CursorApiKeyExchangeError("Cursor rejected the API key", 401);
        if (apiKey === "crsr_cooling") throw new Error("must not be used");
        return accessToken === "user::session" ? "oauth-jwt" : "unexpected";
      },
    });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 200);
    assert.equal(
      (upstreamCalls[0].init.headers as Headers).get("authorization"),
      "Bearer oauth-jwt"
    );
  });

  it("surfaces an exchange failure as 401 when no connection resolves", async () => {
    const { deps } = makeDeps({
      resolveBearer: async () => {
        throw new CursorApiKeyExchangeError("Cursor rejected the API key", 401);
      },
    });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 401);
    const body = (await res.json()) as { code: string };
    assert.equal(body.code, "unauthenticated");
  });

  it("invalidates the cached Cursor session when upstream answers 401", async () => {
    const invalidated: string[] = [];
    const { deps } = makeDeps({
      fetchImpl: (async () => new Response("expired", { status: 401 })) as unknown as typeof fetch,
      invalidateBearer: (key) => {
        invalidated.push(key);
      },
    });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 401);
    assert.deepEqual(invalidated, [CURSOR_KEY]);
  });

  it("streams SSE bodies through and logs once when the stream completes", async () => {
    const encoder = new TextEncoder();
    const upstreamBody = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("event: a\ndata: 1\n\n"));
        controller.enqueue(encoder.encode("event: b\ndata: 2\n\n"));
        controller.close();
      },
    });
    const { deps, logs } = makeDeps({
      fetchImpl: (async () =>
        new Response(upstreamBody, {
          status: 200,
          headers: { "content-type": "text/event-stream", "transfer-encoding": "chunked" },
        })) as unknown as typeof fetch,
    });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken(), "/agent.v1.AgentService/RunSSE"),
      ["agent.v1.AgentService", "RunSSE"],
      deps
    );
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "text/event-stream");
    assert.equal(res.headers.get("transfer-encoding"), null);
    assert.equal(await res.text(), "event: a\ndata: 1\n\nevent: b\ndata: 2\n\n");
    await flushLogs();
    assert.equal(logs.length, 1);
    assert.equal(logs[0].path, `${CURSOR_CLI_PROXY_PREFIX}/agent.v1.AgentService/RunSSE`);
    assert.equal(logs[0].status, 200);
  });

  it("maps upstream network failures to a sanitized 502", async () => {
    const { deps, logs } = makeDeps({
      fetchImpl: (async () => {
        throw new Error("connect ECONNREFUSED at /home/user/OmniRoute/open-sse/x.ts:1:1");
      }) as unknown as typeof fetch,
    });
    const res = await handleCursorCliProxy(
      rpcRequest(await mintedToken()),
      ["aiserver.v1.DashboardService", "GetMe"],
      deps
    );
    assert.equal(res.status, 502);
    const body = (await res.json()) as { message: string };
    assert.ok(!body.message.includes("at /"), body.message);
    await flushLogs();
    assert.equal(logs[0].status, 502);
  });
});
