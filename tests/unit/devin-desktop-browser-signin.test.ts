import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Devin Desktop browser sign-in: the Devin CLI PKCE flow (app.devin.ai/auth/cli/continue →
// api.devin.ai/auth/cli/token) offered next to the existing import-token path. Every fetch is
// stubbed; nothing here reads a real Devin HOME/config or reaches the network.
import { generateAuthData, exchangeTokens, getProvider } from "@/lib/oauth/providers";
import {
  DEVIN_SESSION_TOKEN_PREFIX,
  normalizeDevinSessionToken,
} from "@/lib/oauth/providers/devin-desktop";
import { buildPkceLoopbackMismatchHint } from "@/lib/oauth/utils/pkceLoopbackWarning";
import { GET as oauthGet } from "@/app/api/oauth/[provider]/[action]/route";

const REDIRECT = "http://127.0.0.1:59653/callback";
const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function stubFetch(handler: (url: string, init: RequestInit) => Response | Promise<Response>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    calls.push({ url, init });
    return handler(url, init);
  }) as typeof fetch;
  return calls;
}

test("normalizeDevinSessionToken applies exactly one devin-session-token$ prefix", () => {
  assert.equal(DEVIN_SESSION_TOKEN_PREFIX, "devin-session-token$");
  assert.equal(normalizeDevinSessionToken("abc"), "devin-session-token$abc");
  assert.equal(normalizeDevinSessionToken("devin-session-token$abc"), "devin-session-token$abc");
  assert.equal(normalizeDevinSessionToken("  abc  "), "devin-session-token$abc");
});

test("devin-desktop exposes a fixed-port browser PKCE login next to import-token", () => {
  const provider = getProvider("devin-desktop");
  assert.equal(provider.supportsBrowserPkce, true);
  assert.equal(provider.fixedPort, 59653);
  assert.equal(provider.callbackPath, "/callback");
  assert.equal(provider.callbackHost, "127.0.0.1");
  assert.equal(typeof provider.validateImportToken, "function");
});

test("generateAuthData builds the Devin CLI authorize URL with S256 + select_account", () => {
  const data = generateAuthData("devin-desktop", REDIRECT);
  assert.equal(typeof data.authUrl, "string");
  assert.notEqual(data.supported, false);
  const url = new URL(data.authUrl as string);
  assert.equal(`${url.origin}${url.pathname}`, "https://app.devin.ai/auth/cli/continue");
  assert.equal(url.searchParams.get("redirect_uri"), REDIRECT);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.get("prompt"), "select_account");
  assert.equal(url.searchParams.get("state"), data.state);
  assert.equal(url.searchParams.get("code_challenge"), data.codeChallenge);
  assert.ok(typeof data.codeVerifier === "string" && data.codeVerifier.length >= 43);
  assert.equal(data.fixedPort, 59653);
  assert.equal(data.callbackHost, "127.0.0.1");
});

test("devin-cli stays import-token only (CLI-owned login)", () => {
  const data = generateAuthData("devin-cli", REDIRECT);
  assert.equal(data.authUrl, undefined);
  assert.equal(data.supported, false);
  assert.equal(getProvider("devin-cli").supportsBrowserPkce, undefined);
});

test("exchangeTokens posts {code, code_verifier} JSON and stores a prefixed session token", async () => {
  const calls = stubFetch(() => Response.json({ token: "minted-session" }));
  const tokens = await exchangeTokens("devin-desktop", "auth-code", REDIRECT, "verifier-1", "st");

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.devin.ai/auth/cli/token");
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    code: "auth-code",
    code_verifier: "verifier-1",
  });
  assert.equal(tokens.accessToken, "devin-session-token$minted-session");
  assert.equal(tokens.refreshToken, null);
  assert.equal(tokens.expiresIn, null);
  assert.equal(tokens.providerSpecificData?.authMethod, "browser");
});

test("exchangeTokens accepts a pasted callback URL and rejects a state mismatch", async () => {
  const calls = stubFetch(() => Response.json({ token: "minted" }));
  const ok = await exchangeTokens(
    "devin-desktop",
    `${REDIRECT}?code=pasted-code&state=st-1`,
    REDIRECT,
    "verifier",
    "st-1"
  );
  assert.equal(ok.accessToken, "devin-session-token$minted");
  assert.equal(JSON.parse(String(calls[0].init.body)).code, "pasted-code");

  await assert.rejects(
    exchangeTokens("devin-desktop", `${REDIRECT}?code=c&state=wrong`, REDIRECT, "v", "st-1"),
    /state mismatch/i
  );
  assert.equal(calls.length, 1, "a state mismatch must not reach the token endpoint");
});

test("exchangeTokens throws when Devin returns no token, without echoing secrets", async () => {
  stubFetch(() => Response.json({}));
  await assert.rejects(
    exchangeTokens("devin-desktop", "code", REDIRECT, "secret-verifier", "s"),
    /returned no token/i
  );

  stubFetch(() => new Response("bad code secret-verifier", { status: 400 }));
  await assert.rejects(
    exchangeTokens("devin-desktop", "code", REDIRECT, "secret-verifier", "s"),
    (error: Error) => {
      assert.match(error.message, /token exchange failed: 400/i);
      assert.doesNotMatch(error.message, /secret-verifier/);
      return true;
    }
  );
});

test("import-token keeps a pasted Devin key verbatim (no prefix added)", () => {
  const mapped = getProvider("devin-desktop").mapTokens({ accessToken: "raw-imported-key-123" });
  assert.equal(mapped.accessToken, "raw-imported-key-123");
  assert.equal(mapped.refreshToken, null);
});

test("OAuth route: devin-desktop/authorize is no longer retired, devin-cli still is", async () => {
  const desktop = await oauthGet(
    new Request("http://localhost:20128/api/oauth/devin-desktop/authorize", { method: "GET" }),
    { params: Promise.resolve({ provider: "devin-desktop", action: "authorize" }) } as never
  );
  assert.notEqual(desktop.status, 410);

  const cli = await oauthGet(
    new Request("http://localhost:20128/api/oauth/devin-cli/authorize", { method: "GET" }),
    { params: Promise.resolve({ provider: "devin-cli", action: "authorize" }) } as never
  );
  assert.equal(cli.status, 410);
});

test("LAN loopback hint knows the Devin callback port", () => {
  const hint = buildPkceLoopbackMismatchHint("devin-desktop", {
    hostname: "192.168.0.15",
    port: "20128",
    protocol: "http:",
  });
  assert.equal(hint.callbackPort, 59653);
  assert.equal(hint.redirectUri, REDIRECT);
  assert.match(hint.tunnelCommand, /-L 59653:127\.0\.0\.1:59653/);
});

test("OAuthModal routes devin-desktop through the callback server with a token fallback", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const modal = readFileSync(resolve(here, "../../src/shared/components/OAuthModal.tsx"), "utf8");
  const extractSet = (name: string) => {
    const match = modal.match(new RegExp(`const ${name} = new Set\\(\\[([^\\]]*)\\]\\)`));
    assert.ok(match, `expected ${name} in OAuthModal.tsx`);
    return match![1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  };
  assert.ok(extractSet("PKCE_CALLBACK_SERVER_PROVIDERS").includes("devin-desktop"));
  assert.ok(extractSet("TOKEN_PASTE_PROVIDERS").includes("devin-desktop"));
  assert.ok(!extractSet("IMPORT_TOKEN_ONLY_PROVIDERS").includes("devin-desktop"));
  assert.match(modal, /redirectUri = "http:\/\/127\.0\.0\.1:59653\/callback"/);
});
