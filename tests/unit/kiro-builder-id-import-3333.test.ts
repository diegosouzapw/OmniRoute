import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard for #3333 — Kiro Builder ID token import failed with "Bad
// credentials" because validateImportToken only ever tried the social-auth
// refresh path. Builder ID tokens need the cached AWS SSO clientId/clientSecret
// (~/.aws/sso/cache/*.json) and the OIDC refresh path (authMethod: "builder-id").

const { KiroService } = await import("../../src/lib/oauth/services/kiro.ts");

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_FETCH = globalThis.fetch;
let tmpHome: string;

function makeFakeSsoCache(home: string, creds: { clientId: string; clientSecret: string } | null) {
  const cacheDir = path.join(home, ".aws", "sso", "cache");
  fs.mkdirSync(cacheDir, { recursive: true });
  if (creds) {
    // The OIDC client-registration cache entry also carries unrelated keys.
    fs.writeFileSync(
      path.join(cacheDir, "client-reg.json"),
      JSON.stringify({ ...creds, region: "us-east-1", expiresAt: "2099-01-01T00:00:00Z" })
    );
  }
}

test.beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-3333-"));
  process.env.HOME = tmpHome;
});

test.afterEach(() => {
  process.env.HOME = ORIGINAL_HOME;
  globalThis.fetch = ORIGINAL_FETCH;
  if (tmpHome) fs.rmSync(tmpHome, { recursive: true, force: true });
});

test("validateImportToken uses cached Builder ID client creds + OIDC refresh path", async () => {
  makeFakeSsoCache(tmpHome, { clientId: "cid-cached", clientSecret: "secret-cached" });

  const calledEndpoints: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    calledEndpoints.push(u);
    // Builder ID refresh hits the AWS OIDC token endpoint.
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-builder-id",
          refreshToken: "refreshed-token",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  }) as typeof fetch;

  const svc = new KiroService();
  const result = await svc.validateImportToken("aorAAAAAGtoken-builder-id");

  assert.equal(result.authMethod, "builder-id");
  assert.equal(result.accessToken, "access-builder-id");
  assert.equal(result.clientId, "cid-cached");
  assert.equal(result.clientSecret, "secret-cached");
  // Must have gone through the OIDC token endpoint, NOT the social-auth service.
  assert.ok(
    calledEndpoints.some((u) => u.includes("oidc.") && u.endsWith("/token")),
    "expected OIDC token endpoint to be used for Builder ID refresh"
  );
});

test("validateImportToken falls back to social auth when no cached creds exist", async () => {
  // No ~/.aws/sso/cache → readCachedClientCredentials() returns null.
  makeFakeSsoCache(tmpHome, null);

  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    // Social-auth refresh endpoint.
    if (u.includes("auth.desktop.kiro.dev")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-social",
          refreshToken: "social-rt",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    // registerClient() for the isolated OIDC client (may fail gracefully).
    if (u.includes("oidc.") && u.endsWith("/client/register")) {
      return new Response(JSON.stringify({ clientId: "reg-cid", clientSecret: "reg-secret" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch to ${u}`);
  }) as typeof fetch;

  const svc = new KiroService();
  const result = await svc.validateImportToken("aorAAAAAGtoken-social");

  assert.equal(result.authMethod, "imported");
  assert.equal(result.accessToken, "access-social");
});

// LEDGER-6 (/review-reviews v3.8.14): the Builder ID validation refresh must
// forward the requested region to the OIDC endpoint, not default to us-east-1.
test("validateImportToken forwards the region to the OIDC endpoint (LEDGER-6)", async () => {
  makeFakeSsoCache(tmpHome, { clientId: "cid", clientSecret: "secret" });
  const calledEndpoints: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    calledEndpoints.push(u);
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({ accessToken: "a", refreshToken: "r", expiresIn: 3600 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  }) as typeof fetch;

  const svc = new KiroService();
  await svc.validateImportToken("aorAAAAAGtoken", "eu-west-1");
  assert.ok(
    calledEndpoints.some((u) => u.includes("oidc.eu-west-1.amazonaws.com/token")),
    `expected the eu-west-1 OIDC endpoint, got: ${calledEndpoints.join(", ")}`
  );
  assert.ok(
    !calledEndpoints.some((u) => u.includes("oidc.us-east-1.amazonaws.com/token")),
    "must not fall back to us-east-1 when a region was requested"
  );
});

// LEDGER-8 (/review-reviews v3.8.14): with multiple cached SSO client
// registrations, the one whose region matches the import must be chosen rather
// than whichever readdir returns first.
test("validateImportToken prefers the region-matching cached client (LEDGER-8)", async () => {
  const cacheDir = path.join(tmpHome, ".aws", "sso", "cache");
  fs.mkdirSync(cacheDir, { recursive: true });
  // "a-" sorts first so naive first-match would pick the wrong (us-east-1) pair.
  fs.writeFileSync(
    path.join(cacheDir, "a-useast.json"),
    JSON.stringify({
      clientId: "cid-useast",
      clientSecret: "secret-useast",
      region: "us-east-1",
      expiresAt: "2099-01-01T00:00:00Z",
    })
  );
  fs.writeFileSync(
    path.join(cacheDir, "z-euwest.json"),
    JSON.stringify({
      clientId: "cid-euwest",
      clientSecret: "secret-euwest",
      region: "eu-west-1",
      expiresAt: "2099-01-01T00:00:00Z",
    })
  );

  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({ accessToken: "a", refreshToken: "r", expiresIn: 3600 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch to ${u}`);
  }) as typeof fetch;

  const svc = new KiroService();
  const result = await svc.validateImportToken("aorAAAAAGtoken", "eu-west-1");
  assert.equal(result.clientId, "cid-euwest", "must pick the eu-west-1 registration");
  assert.equal(result.clientSecret, "secret-euwest");
});

test("validateImportToken rejects malformed refresh tokens before touching the cache", async () => {
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  const svc = new KiroService();
  await assert.rejects(() => svc.validateImportToken("not-a-valid-token"), /Invalid token format/);
  assert.equal(fetched, false, "must not attempt any network call for a malformed token");
});
