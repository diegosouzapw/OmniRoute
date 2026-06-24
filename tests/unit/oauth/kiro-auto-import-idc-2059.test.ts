/**
 * TDD for PR #2059 — Kiro IDC (organization) token import support.
 *
 * When the ~/.aws/sso/cache token file includes a `clientIdHash` field the
 * auto-import path should:
 *   (a) read `${clientIdHash}.json` from the same cache dir to obtain
 *       `clientId` / `clientSecret`;
 *   (b) probe Kiro IDE's `profile.json` (Windows + Linux paths) for `arn` and
 *       normalize the ARN region to `us-east-1`;
 *   (c) include all IDC fields in the returned JSON so the import UI can pass
 *       them along to /api/oauth/kiro/import.
 *
 * When `clientIdHash` is absent the fallback path must still work (backward
 * compat).
 *
 * The import schema (`kiroImportSchema`) must accept the new optional IDC
 * fields and reject invalid types.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Hermetic DATA_DIR so DB setup / requireLogin does not hit real disk ──────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-idc-2059-data-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-idc-2059";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-api-key-secret-idc-2059";

const core = await import("../../../src/lib/db/core.ts");

// Import route module once (DB is initialized on first import).
const { GET } = await import("../../../src/app/api/oauth/kiro/auto-import/route.ts");

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_APPDATA = process.env.APPDATA;
const ORIGINAL_FETCH = globalThis.fetch;

let tmpHome: string;

test.beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-idc-2059-"));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.HOME = tmpHome;
  delete process.env.APPDATA;
  // Reset fetch so tests with mocks don't bleed into each other.
  globalThis.fetch = ORIGINAL_FETCH;
});

test.afterEach(() => {
  process.env.HOME = ORIGINAL_HOME;
  if (ORIGINAL_APPDATA !== undefined) {
    process.env.APPDATA = ORIGINAL_APPDATA;
  } else {
    delete process.env.APPDATA;
  }
  globalThis.fetch = ORIGINAL_FETCH;
  if (tmpHome) fs.rmSync(tmpHome, { recursive: true, force: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Writes the standard AWS SSO cache layout under tmpHome. */
function writeAwsSsoCache(opts: {
  tokenFile?: string;
  tokenData: Record<string, unknown>;
  clientIdHash?: string;
  clientData?: Record<string, unknown>;
}) {
  const cacheDir = path.join(tmpHome, ".aws/sso/cache");
  fs.mkdirSync(cacheDir, { recursive: true });

  const tokenFile = opts.tokenFile ?? "kiro-auth-token.json";
  fs.writeFileSync(path.join(cacheDir, tokenFile), JSON.stringify(opts.tokenData));

  if (opts.clientIdHash && opts.clientData) {
    fs.writeFileSync(
      path.join(cacheDir, `${opts.clientIdHash}.json`),
      JSON.stringify(opts.clientData)
    );
  }
}

/** Writes profile.json at the Linux globalStorage path. */
function writeKiroProfileJson(arn: string) {
  const profileDir = path.join(tmpHome, ".config/Kiro/User/globalStorage/kiro.kiroagent");
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(path.join(profileDir, "profile.json"), JSON.stringify({ arn }));
}

/** Stubs globalThis.fetch so that no real network calls are made.
 *  Returns a minimal Kiro OIDC refresh response for all Kiro endpoints. */
function stubFetchForRefresh() {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const u = String(input);
    // OIDC client registration
    if (u.includes("oidc.") && u.endsWith("/client/register")) {
      return new Response(
        JSON.stringify({ clientId: "reg-cid", clientSecret: "reg-secret", expiresIn: 86400 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    // OIDC token refresh (IDC / Builder ID path)
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-refreshed",
          refreshToken: "aorAAAAAGrefreshed",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    // Social/Builder-ID token refresh (prod.*.auth.desktop.kiro.dev/refreshToken)
    if (u.includes("kiro.dev") && u.endsWith("/refreshToken")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-social-refreshed",
          refreshToken: "aorAAAAAGsocial-refreshed",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`[kiro-idc-2059 test] unexpected fetch to ${u}`);
  }) as typeof fetch;
}

async function callGet(): Promise<{ status: number; body: Record<string, unknown> }> {
  const request = new Request("http://localhost/api/oauth/kiro/auto-import");
  const response = await GET(request);
  const body = (await response.json()) as Record<string, unknown>;
  return { status: response.status, body };
}

// ── Tests: IDC path (clientIdHash present) ───────────────────────────────────

test("auto-import: when clientIdHash is present, reads client registration file and uses OIDC endpoint for refresh", async () => {
  const CLIENT_ID_HASH = "abc123def456";

  writeAwsSsoCache({
    tokenData: {
      refreshToken: "aorAAAAAGidc-refresh-token",
      clientIdHash: CLIENT_ID_HASH,
      region: "us-east-1",
      authMethod: "idc",
    },
    clientIdHash: CLIENT_ID_HASH,
    clientData: {
      clientId: "idc-client-id-value",
      clientSecret: "idc-client-secret-value",
    },
  });

  // Track which URLs were fetched to verify the OIDC path (not social path) was used
  const fetchedUrls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const u = String(input);
    fetchedUrls.push(u);
    if (u.includes("oidc.") && u.endsWith("/client/register")) {
      return new Response(
        JSON.stringify({ clientId: "reg-cid", clientSecret: "reg-secret", expiresIn: 86400 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-refreshed",
          refreshToken: "aorAAAAAGrefreshed",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (u.includes("kiro.dev") && u.endsWith("/refreshToken")) {
      return new Response(
        JSON.stringify({
          accessToken: "social-access",
          refreshToken: "aorAAAAAGsocial",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`[kiro-idc-2059 test] unexpected fetch to ${u}`);
  }) as typeof fetch;

  const { body } = await callGet();

  assert.equal(body.found, true, `expected found:true, got: ${JSON.stringify(body)}`);

  // Verify that the OIDC /token endpoint was called (IDC path), not the social
  // kiro.dev/refreshToken endpoint. This proves the registration file was read
  // and the IDC credentials were used for token refresh.
  const usedOidcTokenEndpoint = fetchedUrls.some(
    (u) => u.includes("oidc.") && u.endsWith("/token")
  );
  assert.ok(
    usedOidcTokenEndpoint,
    `expected OIDC /token endpoint to be called for IDC refresh, fetched URLs: ${JSON.stringify(fetchedUrls)}`
  );
  const usedSocialEndpoint = fetchedUrls.some(
    (u) => u.includes("kiro.dev") && u.endsWith("/refreshToken")
  );
  assert.equal(
    usedSocialEndpoint,
    false,
    `social kiro.dev/refreshToken must NOT be called for IDC tokens, fetched URLs: ${JSON.stringify(fetchedUrls)}`
  );
});

test("auto-import: when clientIdHash is present and profile.json exists, returns normalized ARN with us-east-1", async () => {
  const CLIENT_ID_HASH = "hash999";

  writeAwsSsoCache({
    tokenData: {
      refreshToken: "aorAAAAAGidc-arn-test",
      clientIdHash: CLIENT_ID_HASH,
      region: "ap-southeast-1",
      authMethod: "idc",
    },
    clientIdHash: CLIENT_ID_HASH,
    clientData: { clientId: "cid", clientSecret: "csec" },
  });

  // Write profile.json with a non-us-east-1 region in the ARN.
  writeKiroProfileJson("arn:aws:codewhisperer:ap-southeast-1:123456789012:profile/MyProfile");

  stubFetchForRefresh();

  const { body } = await callGet();

  assert.equal(body.found, true, `expected found:true, got: ${JSON.stringify(body)}`);
  assert.ok(
    typeof body.profileArn === "string" && body.profileArn.includes("us-east-1"),
    `profileArn should be normalized to us-east-1, got: ${body.profileArn}`
  );
  assert.ok(
    !(body.profileArn as string).includes("ap-southeast-1"),
    `normalized profileArn must not contain original region ap-southeast-1, got: ${body.profileArn}`
  );
});

test("auto-import: without clientIdHash, fallback still works and clientId/clientSecret are absent or null", async () => {
  // No clientIdHash — standard non-IDC token
  writeAwsSsoCache({
    tokenData: {
      refreshToken: "aorAAAAAGstandard-token",
    },
  });

  stubFetchForRefresh();

  const { body } = await callGet();

  assert.equal(body.found, true, `expected found:true, got: ${JSON.stringify(body)}`);
  // clientId/clientSecret should be null or undefined (not set from non-IDC cache)
  assert.ok(
    body.clientId === null || body.clientId === undefined,
    `clientId must be null/undefined when no clientIdHash, got: ${body.clientId}`
  );
  assert.ok(
    body.clientSecret === null || body.clientSecret === undefined,
    `clientSecret must be null/undefined when no clientIdHash, got: ${body.clientSecret}`
  );
});

test("auto-import: clientIdHash present but registration file missing — gracefully continues without clientId", async () => {
  // clientIdHash in token but NO corresponding file on disk
  writeAwsSsoCache({
    tokenData: {
      refreshToken: "aorAAAAAGidc-no-reg-file",
      clientIdHash: "nonexistent-hash",
      region: "us-east-1",
    },
    // No clientData written — file will not exist
  });

  stubFetchForRefresh();

  const { body } = await callGet();

  // Should still succeed (graceful degradation)
  assert.equal(body.found, true, `expected found:true, got: ${JSON.stringify(body)}`);
  // clientId must be null — file not found
  assert.ok(
    body.clientId === null || body.clientId === undefined,
    `clientId must be null when registration file is missing, got: ${body.clientId}`
  );
});

// ── Tests: schema ─────────────────────────────────────────────────────────────

test("kiroImportSchema: accepts optional IDC fields (clientId, clientSecret, authMethod, profileArn)", async () => {
  const { kiroImportSchema } = await import("../../../src/shared/validation/schemas/auth.ts");

  const result = kiroImportSchema.safeParse({
    refreshToken: "aorAAAAAGsome-token",
    region: "us-east-1",
    clientId: "idc-client-id",
    clientSecret: "idc-client-secret",
    authMethod: "idc",
    profileArn: "arn:aws:codewhisperer:us-east-1:123456789012:profile/MyProfile",
  });

  assert.equal(
    result.success,
    true,
    `schema must accept IDC fields, errors: ${JSON.stringify(result.error?.errors)}`
  );
  if (result.success) {
    assert.equal(result.data.clientId, "idc-client-id");
    assert.equal(result.data.clientSecret, "idc-client-secret");
    assert.equal(result.data.authMethod, "idc");
    assert.equal(
      result.data.profileArn,
      "arn:aws:codewhisperer:us-east-1:123456789012:profile/MyProfile"
    );
  }
});

test("kiroImportSchema: still valid without IDC fields (backward compat)", async () => {
  const { kiroImportSchema } = await import("../../../src/shared/validation/schemas/auth.ts");

  const result = kiroImportSchema.safeParse({
    refreshToken: "aorAAAAAGsome-token",
  });

  assert.equal(
    result.success,
    true,
    `schema must be valid without IDC fields, errors: ${JSON.stringify(result.error?.errors)}`
  );
});

test("kiroImportSchema: rejects non-string clientId", async () => {
  const { kiroImportSchema } = await import("../../../src/shared/validation/schemas/auth.ts");

  const result = kiroImportSchema.safeParse({
    refreshToken: "aorAAAAAGsome-token",
    clientId: 12345, // bad type
  });

  assert.equal(result.success, false, "schema must reject numeric clientId");
});
