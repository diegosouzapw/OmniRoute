/**
 * `cursor-api` is the API-key sibling of the `cursor` (IDE session) provider:
 * same executor, format and model catalog, its own registry/catalog entry so
 * API-key and IDE-session connections never share renewal or dashboard
 * semantics. The executor swaps the crsr_ key for the exchanged session token
 * before dialing.
 */
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, OAUTH_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");
const { isManagedProviderConnectionId } = await import("../../src/lib/providers/catalog.ts");
const { cursorProvider, cursor_apiProvider } =
  await import("../../open-sse/config/providers/registry/cursor/index.ts");
const { REGISTRY, generateAliasMap, getProviderCategory } =
  await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, hasSpecializedExecutor } =
  await import("../../open-sse/executors/index.ts");
const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
const { __resetCursorApiKeyAuthForTest } =
  await import("../../open-sse/services/cursorApiKeyAuth.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const API_KEY = "crsr_provider_test_key";

function jwt(exp: number): string {
  const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${b64({ alg: "HS256" })}.${b64({ exp })}.sig`;
}

describe("cursor-api provider wiring", () => {
  it("is a distinct API-key registry entry sharing the cursor executor, format and models", () => {
    assert.equal(cursor_apiProvider.id, "cursor-api");
    assert.equal(cursor_apiProvider.authType, "apikey");
    assert.equal(cursor_apiProvider.format, cursorProvider.format);
    assert.equal(cursor_apiProvider.baseUrl, cursorProvider.baseUrl);
    assert.equal(cursor_apiProvider.models, cursorProvider.models);
    assert.equal(REGISTRY["cursor-api"], cursor_apiProvider);
    assert.equal(generateAliasMap()["cursor-api"], "cua");
    assert.equal(getProviderCategory("cursor-api"), "apikey");
  });

  it("leaves the IDE cursor provider OAuth-only", () => {
    assert.equal(cursorProvider.authType, "oauth");
    assert.equal(getProviderCategory("cursor"), "oauth");
    assert.ok(OAUTH_PROVIDERS.cursor);
    assert.ok(!APIKEY_PROVIDERS.cursor);
  });

  it("has its own API-key catalog card admitted by the managed-connection gate", () => {
    assert.ok(APIKEY_PROVIDERS["cursor-api"]);
    assert.equal(APIKEY_PROVIDERS["cursor-api"].alias, "cua");
    assert.ok(!OAUTH_PROVIDERS["cursor-api"]);
    assert.equal(isManagedProviderConnectionId("cursor-api"), true);
  });

  it("routes cursor-api and its alias to a CursorExecutor bound to the cursor-api id", async () => {
    for (const key of ["cursor-api", "cua"]) {
      assert.equal(hasSpecializedExecutor(key), true, key);
      const executor = await getExecutor(key);
      assert.ok(executor instanceof CursorExecutor, key);
      assert.equal(executor.getProvider(), "cursor-api");
    }
    assert.equal((await getExecutor("cursor")).getProvider(), "cursor");
  });
});

describe("CursorExecutor credential resolution", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    __resetCursorApiKeyAuthForTest();
  });

  it("sends the stripped IDE session token for OAuth connections", () => {
    const executor = new CursorExecutor();
    const headers = executor.buildHeaders({
      accessToken: "user_01::ide.session.jwt",
      providerSpecificData: {},
    });
    assert.equal(headers.authorization, "Bearer ide.session.jwt");
    assert.equal(headers["x-cursor-client-type"], "cli");
  });

  it("exchanges a crsr_ key and sends the session JWT, never the raw key", async () => {
    const calls: string[] = [];
    const exp = Math.floor(Date.now() / 1000) + 3600;
    globalThis.fetch = (async (input: string | URL | Request) => {
      calls.push(String(input));
      return new Response(JSON.stringify({ accessToken: jwt(exp), refreshToken: jwt(exp) }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    const executor = new CursorExecutor("cursor-api");
    const resolved = await executor.resolveExecutionCredentials({
      apiKey: API_KEY,
      providerSpecificData: {},
    });
    assert.ok(!(resolved instanceof Response));
    const headers = executor.buildHeaders(resolved);
    assert.equal(headers.authorization, `Bearer ${jwt(exp)}`);
    assert.ok(!headers.authorization.includes(API_KEY));
    assert.equal(calls.length, 1);
    assert.match(calls[0], /\/auth\/exchange_user_api_key$/);
  });

  it("returns a sanitized 401 response when Cursor rejects the key", async () => {
    globalThis.fetch = (async () => new Response("bad key", { status: 401 })) as typeof fetch;
    const executor = new CursorExecutor("cursor-api");
    const resolved = await executor.resolveExecutionCredentials({ apiKey: API_KEY });
    assert.ok(resolved instanceof Response);
    assert.equal(resolved.status, 401);
    const body = (await resolved.json()) as { error: { message: string; type: string } };
    assert.equal(body.error.type, "authentication_error");
    assert.ok(!body.error.message.includes(API_KEY));
    assert.ok(!body.error.message.includes("at /"));
  });

  it("leaves OAuth credentials untouched without calling the exchange endpoint", async () => {
    globalThis.fetch = (async () => {
      throw new Error("exchange must not be called");
    }) as typeof fetch;
    const executor = new CursorExecutor();
    const credentials = { accessToken: "user_01::ide.session.jwt" };
    const resolved = await executor.resolveExecutionCredentials(credentials);
    assert.equal(resolved, credentials);
  });

  it("exchanges a crsr_ key before Agent endpoint discovery", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const sessionToken = jwt(exp);
    const calls: Array<{ url: string; authorization: string }> = [];
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({
        url,
        authorization: new Headers(init?.headers).get("authorization") ?? "",
      });
      if (url.endsWith("/auth/exchange_user_api_key")) {
        return new Response(
          JSON.stringify({ accessToken: sessionToken, refreshToken: sessionToken }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      return new Response(Buffer.alloc(0), { status: 200 });
    }) as typeof fetch;

    const executor = new CursorExecutor("cursor-api");
    const result = await executor.execute({
      model: "auto",
      body: { messages: [] },
      stream: false,
      credentials: { apiKey: API_KEY, connectionId: "cursor-api-test" },
      signal: null,
      log: null,
      upstreamExtraHeaders: null,
    });

    assert.equal(result.response.status, 500);
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /\/auth\/exchange_user_api_key$/);
    assert.match(calls[1].url, /ServerConfigService\/GetServerConfig$/);
    assert.equal(calls[1].authorization, `Bearer ${sessionToken}`);
    assert.ok(!calls[1].authorization.includes(API_KEY));
  });
});

describe("cursor-api connection test", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    __resetCursorApiKeyAuthForTest();
  });

  it("validates by exchanging the key and reports the exchange as the method", async () => {
    let exchangeCalls = 0;
    globalThis.fetch = (async () => {
      exchangeCalls += 1;
      return new Response(JSON.stringify({ accessToken: jwt(1_900_000_000), refreshToken: "r" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    const result = await validateProviderApiKey({ provider: "cursor-api", apiKey: API_KEY });
    assert.equal(result.valid, true);
    assert.equal(result.unsupported, false);
    assert.equal(exchangeCalls, 1);
  });

  it("reports a rejected key as invalid (401), not as unsupported", async () => {
    globalThis.fetch = (async () => new Response("nope", { status: 401 })) as typeof fetch;
    const result = await validateProviderApiKey({ provider: "cursor-api", apiKey: API_KEY });
    assert.equal(result.valid, false);
    assert.equal(result.unsupported, false);
    assert.equal(result.statusCode, 401);
    assert.ok(!String(result.error).includes(API_KEY));
  });

  it("rejects keys without the crsr_ prefix locally", async () => {
    globalThis.fetch = (async () => {
      throw new Error("must not be called");
    }) as typeof fetch;
    const result = await validateProviderApiKey({
      provider: "cursor-api",
      apiKey: "sk-not-cursor",
    });
    assert.equal(result.valid, false);
    assert.equal(result.statusCode, 400);
  });
});
