import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

// NOTE: Dynamic imports below are used (with comment) solely because the modules read process.env at evaluation time.
// The specifiers are literals. This is the established pattern in this repo's auth tests for env-controlled DB setup.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-callback-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-oidc-callback";

// @ts-ignore - intentional for test harness timing (see note at top)
const core = await import("../../src/lib/db/core.ts");
// @ts-ignore - intentional for test harness timing
const localDb = await import("../../src/lib/localDb.ts");
// @ts-ignore - intentional for test harness timing
const callbackRoute = await import("../../src/app/api/auth/oidc/callback/route.ts");

import type { default as CookieStore } from "next/headers"; // not really, just for shape

interface CapturedCookie {
  value: string;
  options?: Record<string, unknown>;
}

const originalGetCookieStore = callbackRoute.oidcCallbackInternals.getCookieStore;

let capturedCookies: Record<string, CapturedCookie> = {};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  capturedCookies = {};
}

function makeTestCookieStore() {
  return {
    get(name: string) {
      const c = capturedCookies[name];
      return c ? { value: c.value } : undefined;
    },
    set(name: string, value: string, options?: Record<string, unknown>) {
      capturedCookies[name] = { value, options };
    },
  };
}

test.beforeEach(async () => {
  await resetStorage();
  callbackRoute.oidcCallbackInternals.clearJwksCache?.();
  callbackRoute.oidcCallbackInternals.getCookieStore = async () => makeTestCookieStore();
});

test.afterEach(() => {
  callbackRoute.oidcCallbackInternals.getCookieStore = originalGetCookieStore;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.JWT_SECRET;
});

async function setupFullOidcSettings() {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "client-oidc-test",
    oidcClientSecret: "secret-oidc-test",
    oidcRedirectPath: "/api/auth/oidc/callback",
    oidcAllowedSubjects: [],
  });
}

async function createSignedIdToken(claims: Record<string, unknown>) {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const idToken = await new SignJWT(claims)
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);

  const jwk = await exportJWK(publicKey);
  const jwkWithKid = { ...jwk, kid: "test-key-1" };

  const jwks = { keys: [jwkWithKid] };

  return { idToken, jwks };
}

test("OIDC callback happy path: exchanges code, validates ID token, mints identical auth_token JWT, sets cookie, redirects to dashboard", async () => {
  await setupFullOidcSettings();

  const { idToken, jwks } = await createSignedIdToken({
    iss: "https://idp.test",
    aud: "client-oidc-test",
    sub: "user-123",
    email: "admin@example.com",
  });

  const testState = "test-oidc-state-xyz";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : (input as URL).toString();

    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }

    if (url.includes("/token")) {
      return new Response(JSON.stringify({ id_token: idToken }), { status: 200 });
    }

    if (url.includes("/jwks")) {
      return new Response(JSON.stringify(jwks), { status: 200 });
    }

    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=auth-code-123&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, {
        headers: { "x-forwarded-proto": "http" },
      })
    );

    assert.equal(response.status, 307);
    const location = response.headers.get("location");
    assert.ok(location && location.endsWith("/dashboard"));

    const authCookie = capturedCookies["auth_token"];
    assert.ok(authCookie, "auth_token cookie must be set");
    assert.equal(typeof authCookie.value, "string");
    assert.ok(authCookie.value.length > 20);

    // Same attributes as password login path
    assert.equal(authCookie.options?.httpOnly, true);
    assert.equal(authCookie.options?.sameSite, "lax");
    assert.equal(authCookie.options?.path, "/");
    assert.equal(authCookie.options?.maxAge, 60 * 60 * 24 * 30);

    const parts = authCookie.value.split(".");
    assert.equal(parts.length, 3);

    // State cookie must be cleared on success (CSRF hygiene)
    const clearedState = capturedCookies["oidc_state"];
    assert.ok(clearedState, "oidc_state should have been touched");
    assert.equal(clearedState.value, "", "oidc_state must be cleared (empty value + maxAge 0)");
    assert.equal(clearedState.options?.maxAge, 0);

    // Pure OIDC bootstrap: setupComplete must be marked true so login page
    // does not show "no password / onboarding" screens.
    const { getSettings } = await import("../../src/lib/db/settings.ts");
    const after = await getSettings();
    assert.equal(after.setupComplete, true, "OIDC login must mark setupComplete");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC callback rejects invalid state", async () => {
  await setupFullOidcSettings();

  const response = await callbackRoute.GET(
    new Request("http://localhost/api/auth/oidc/callback?code=some-code&state=wrong-state")
  );

  assert.equal(response.status, 307);
  const loc = response.headers.get("location") || "";
  assert.ok(loc.includes("login"));
  assert.ok(loc.includes("invalid_state"));
});
test("OIDC callback rejects subject not in allowed list (subject_not_allowed)", async () => {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "client-oidc-test",
    oidcClientSecret: "secret-oidc-test",
    oidcRedirectPath: "/api/auth/oidc/callback",
    oidcAllowedSubjects: ["user-123", "admin@example.com"],
  });

  // Sign a token whose sub/email is NOT in the allowlist
  const { idToken, jwks } = await createSignedIdToken({
    iss: "https://idp.test",
    aud: "client-oidc-test",
    sub: "evil-999",
    email: "attacker@evil.com",
  });

  const testState = "state-for-whitelist-test";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }
    if (url.includes("/token")) {
      return new Response(JSON.stringify({ id_token: idToken }), { status: 200 });
    }
    if (url.includes("/jwks")) {
      return new Response(JSON.stringify(jwks), { status: 200 });
    }
    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=code-whitelist&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, { headers: { "x-forwarded-proto": "http" } })
    );

    assert.equal(response.status, 307);
    const loc = response.headers.get("location") || "";
    assert.ok(loc.includes("login"));
    assert.ok(loc.includes("subject_not_allowed"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC callback rejects allowlisted email when email_verified is not asserted", async () => {
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "client-oidc-test",
    oidcClientSecret: "secret-oidc-test",
    oidcRedirectPath: "/api/auth/oidc/callback",
    oidcAllowedSubjects: ["admin@example.com"],
  });

  // sub is NOT allowlisted; email matches the allowlist but the IdP did not assert
  // email_verified — the gate must not honor the email claim (security regression guard).
  const { idToken, jwks } = await createSignedIdToken({
    iss: "https://idp.test",
    aud: "client-oidc-test",
    sub: "attacker-sub",
    email: "admin@example.com",
    // email_verified intentionally omitted
  });

  const testState = "state-for-unverified-email";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }
    if (url.includes("/token")) {
      return new Response(JSON.stringify({ id_token: idToken }), { status: 200 });
    }
    if (url.includes("/jwks")) {
      return new Response(JSON.stringify(jwks), { status: 200 });
    }
    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=code-unverified&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, { headers: { "x-forwarded-proto": "http" } })
    );
    assert.equal(response.status, 307);
    const loc = response.headers.get("location") || "";
    assert.ok(loc.includes("subject_not_allowed"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC callback rejects partial/misconfigured OIDC settings (not_configured)", async () => {
  // Partial config (enabled but missing issuer/clientId/secret) should hit the config guard.
  // We must set a matching oidc_state cookie first, otherwise we hit invalid_state.
  await localDb.updateSettings({
    requireLogin: true,
    password: "",
    oidcEnabled: true,
    oidcIssuer: "",
    oidcClientId: "",
    oidcClientSecret: "",
  });

  const testState = "partial-config-state-xyz";
  capturedCookies["oidc_state"] = { value: testState };

  const response = await callbackRoute.GET(
    new Request(`http://localhost/api/auth/oidc/callback?code=foo&state=${testState}`)
  );

  assert.equal(response.status, 307);
  const loc = response.headers.get("location") || "";
  assert.ok(loc.includes("login"));
  assert.ok(loc.includes("not_configured"));
});
test("OIDC callback rejects token exchange failure (token_exchange)", async () => {
  await setupFullOidcSettings();

  const testState = "state-token-exchange";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }
    if (url.includes("/token")) {
      return new Response("bad request", { status: 400 });
    }
    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=bad-code&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, { headers: { "x-forwarded-proto": "http" } })
    );

    assert.equal(response.status, 307);
    const loc = response.headers.get("location") || "";
    assert.ok(loc.includes("login"));
    assert.ok(loc.includes("token_exchange"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC callback rejects invalid ID token signature (id_token_invalid)", async () => {
  await setupFullOidcSettings();

  // Sign token with a completely different key so verification fails
  const { privateKey: wrongKey } = await generateKeyPair("RS256");
  const badIdToken = await new SignJWT({
    iss: "https://idp.test",
    aud: "client-oidc-test",
    sub: "user-123",
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(wrongKey);

  const testState = "state-bad-id-token";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }
    if (url.includes("/token")) {
      return new Response(JSON.stringify({ id_token: badIdToken }), { status: 200 });
    }
    // Return some unrelated JWKS so verification definitely fails
    return new Response(JSON.stringify({ keys: [] }), { status: 200 });
  }) as unknown as typeof fetch;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=code-bad-token&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, { headers: { "x-forwarded-proto": "http" } })
    );

    assert.equal(response.status, 307);
    const loc = response.headers.get("location") || "";
    assert.ok(loc.includes("login"));
    assert.ok(loc.includes("id_token_invalid"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OIDC callback rejects missing code or state (missing_code)", async () => {
  await setupFullOidcSettings();

  // No code and no state
  const response = await callbackRoute.GET(new Request("http://localhost/api/auth/oidc/callback"));

  assert.equal(response.status, 307);
  const loc = response.headers.get("location") || "";
  assert.ok(loc.includes("login"));
  assert.ok(loc.includes("missing_code"));
});

test("OIDC callback rejects missing JWT_SECRET at mint time (server_misconfigured)", async () => {
  await setupFullOidcSettings();

  const { idToken, jwks } = await createSignedIdToken({
    iss: "https://idp.test",
    aud: "client-oidc-test",
    sub: "user-123",
  });

  const testState = "state-no-jwt-secret";
  capturedCookies["oidc_state"] = { value: testState };

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    if (url.includes("/.well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({
          token_endpoint: "https://idp.test/token",
          jwks_uri: "https://idp.test/jwks",
        }),
        { status: 200 }
      );
    }
    if (url.includes("/token")) {
      return new Response(JSON.stringify({ id_token: idToken }), { status: 200 });
    }
    if (url.includes("/jwks")) {
      return new Response(JSON.stringify(jwks), { status: 200 });
    }
    return new Response("not mocked", { status: 404 });
  }) as unknown as typeof fetch;

  const originalJwtSecret = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  try {
    const reqUrl = `http://localhost/api/auth/oidc/callback?code=code-no-secret&state=${testState}`;
    const response = await callbackRoute.GET(
      new Request(reqUrl, { headers: { "x-forwarded-proto": "http" } })
    );

    assert.equal(response.status, 307);
    const loc = response.headers.get("location") || "";
    assert.ok(loc.includes("login"));
    assert.ok(loc.includes("server_misconfigured"));
  } finally {
    if (originalJwtSecret !== undefined) {
      process.env.JWT_SECRET = originalJwtSecret;
    }
    globalThis.fetch = originalFetch;
  }
});
