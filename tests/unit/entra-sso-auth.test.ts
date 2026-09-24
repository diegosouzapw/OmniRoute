/**
 * Entra ID SSO on the client API (/v1/*).
 *
 * Covers token verification, Entra-group → key-group mapping, just-in-time
 * shadow-key provisioning, and the auth→policy bridge.
 *
 * No network: a locally generated RSA key pair signs the tokens and a stubbed
 * global `fetch` serves the JWKS, so this exercises the real jose verification
 * path (including `createRemoteJWKSet`) without touching login.microsoftonline.com.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads, so this file never touches ~/.omniroute.
 */
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT, exportJWK, generateKeyPair, type CryptoKey } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "entra-sso-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "entra-sso-test-secret";

const TENANT_ID = "11111111-2222-3333-4444-555555555555";
const OTHER_TENANT_ID = "99999999-8888-7777-6666-555555555555";
const CLIENT_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const AUDIENCE = "api://omniroute-test";
const ISSUER = `https://login.microsoftonline.com/${TENANT_ID}/v2.0`;
const JWKS_URI = `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`;
const KID = "test-signing-key";

const ENTRA_GROUP_ENGINEERING = "group-eng-0000-0000-000000000001";
const ENTRA_GROUP_CONTRACTORS = "group-con-0000-0000-000000000002";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { createKeyGroup, getKeyGroupsForApiKey } = await import("../../src/lib/db/apiKeyGroups.ts");
const { getSsoIdentity, getSsoShadowSecret, setSsoKeyActive } =
  await import("../../src/lib/db/ssoIdentities.ts");
const { clientApiPolicy } = await import("../../src/server/authz/policies/clientApi.ts");
const { resetSsoResolutionCache } = await import("../../src/server/authz/entra/evaluate.ts");
const { resetEntraJwksCache, looksLikeEntraJwt } =
  await import("../../src/server/authz/entra/verifyToken.ts");
const { resetEntraGroupCache } = await import("../../src/server/authz/entra/resolveGroups.ts");
const { AUTHZ_HEADER_AUTH_ID, AUTHZ_HEADER_AUTH_KIND } =
  await import("../../src/server/authz/headers.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");

let privateKey: CryptoKey;
let publicJwk: Record<string, unknown>;
let engineeringKeyGroupId: string;
let contractorKeyGroupId: string;

const realFetch = globalThis.fetch;

/** Graph responses the stubbed fetch should serve, keyed by user oid. */
let graphMemberGroups: Record<string, string[]> = {};
let graphShouldFail = false;

function installFetchStub(): void {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    if (url === JWKS_URI) {
      return new Response(JSON.stringify({ keys: [publicJwk] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Graph client-credentials token
    if (url.includes("/oauth2/v2.0/token")) {
      if (graphShouldFail) return new Response("nope", { status: 500 });
      return new Response(JSON.stringify({ access_token: "graph-app-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Graph getMemberGroups
    const graphMatch = /\/v1\.0\/users\/([^/]+)\/getMemberGroups/.exec(url);
    if (graphMatch) {
      if (graphShouldFail) return new Response("nope", { status: 500 });
      const oid = decodeURIComponent(graphMatch[1]);
      return new Response(JSON.stringify({ value: graphMemberGroups[oid] ?? [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    throw new Error(`Unexpected fetch in test: ${url}`);
  }) as typeof fetch;
}

interface TokenOverrides {
  audience?: string;
  issuer?: string;
  tid?: string;
  oid?: string | null;
  groups?: string[];
  expiresAt?: number;
  claimNamesOverage?: boolean;
  signWithWrongKey?: boolean;
  upn?: string;
}

async function mintToken(overrides: TokenOverrides = {}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: Record<string, unknown> = {
    tid: overrides.tid ?? TENANT_ID,
    preferred_username: overrides.upn ?? "ada@corp.example",
    name: "Ada Lovelace",
  };
  if (overrides.oid !== null) payload.oid = overrides.oid ?? "user-oid-0001";
  if (overrides.claimNamesOverage) {
    payload._claim_names = { groups: "src1" };
    payload._claim_sources = { src1: { endpoint: "https://graph.microsoft.com/…" } };
  } else {
    payload.groups = overrides.groups ?? [ENTRA_GROUP_ENGINEERING];
  }

  let signingKey = privateKey;
  if (overrides.signWithWrongKey) {
    const other = await generateKeyPair("RS256", { extractable: true });
    signingKey = other.privateKey;
  }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256", kid: KID })
    .setIssuedAt(now)
    .setIssuer(overrides.issuer ?? ISSUER)
    .setAudience(overrides.audience ?? AUDIENCE)
    .setExpirationTime(overrides.expiresAt ?? now + 3600)
    .sign(signingKey);
}

function ssoRequest(token: string, opts: { via?: "bearer" | "x-api-key" | "both" } = {}) {
  const via = opts.via ?? "bearer";
  const headers = new Headers();
  if (via === "bearer" || via === "both") headers.set("Authorization", `Bearer ${token}`);
  if (via === "x-api-key" || via === "both") headers.set("x-api-key", token);
  return new Request("http://localhost/api/v1/chat/completions", { method: "POST", headers });
}

function policyContext(request: Request) {
  return {
    request,
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath: "/api/v1/chat/completions",
    },
    requestId: "test-request",
  };
}

async function configureSso(overrides: Record<string, unknown> = {}): Promise<void> {
  await updateSettings({
    entraSsoEnabled: true,
    entraTenantId: TENANT_ID,
    entraClientId: CLIENT_ID,
    entraApiAudience: AUDIENCE,
    entraGroupMappings: [{ groupId: ENTRA_GROUP_ENGINEERING, keyGroupId: engineeringKeyGroupId }],
    entraDefaultKeyGroupId: null,
    entraGraphFallbackEnabled: false,
    entraGraphClientSecret: "graph-secret",
    ...overrides,
  });
  invalidateDbCache("settings");
}

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  privateKey = pair.privateKey;
  publicJwk = { ...(await exportJWK(pair.publicKey)), kid: KID, alg: "RS256", use: "sig" };
  installFetchStub();

  engineeringKeyGroupId = createKeyGroup("Engineering", "mapped from Entra").id;
  contractorKeyGroupId = createKeyGroup("Contractors", "default group").id;
});

beforeEach(() => {
  resetSsoResolutionCache();
  resetEntraJwksCache();
  resetEntraGroupCache();
  graphMemberGroups = {};
  graphShouldFail = false;
});

after(() => {
  globalThis.fetch = realFetch;
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("looksLikeEntraJwt — the coexist pre-filter", () => {
  it("rejects an OmniRoute API key so static keys never pay for verification", () => {
    assert.equal(looksLikeEntraJwt("sk-1234567890abcdef-abc123-deadbeef"), false);
  });

  it("rejects an HS256 token (dashboard session / cursor-cli passthrough)", async () => {
    const hs = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4In0.c2ln";
    assert.equal(looksLikeEntraJwt(hs), false);
  });

  it("accepts a real RS256 Entra-shaped token", async () => {
    assert.equal(looksLikeEntraJwt(await mintToken()), true);
  });
});

describe("Entra SSO — authority host", () => {
  it("defaults to the commercial cloud when unset or unparseable", async () => {
    const { resolveAuthorityHost, ENTRA_LOGIN_HOST } =
      await import("../../src/server/authz/entra/config.ts");
    for (const input of ["", "   ", undefined, null, 42, "not a url"]) {
      assert.equal(resolveAuthorityHost(input), ENTRA_LOGIN_HOST);
    }
  });

  it("accepts sovereign-cloud https authorities", async () => {
    const { resolveAuthorityHost } = await import("../../src/server/authz/entra/config.ts");
    assert.equal(
      resolveAuthorityHost("https://login.microsoftonline.us"),
      "https://login.microsoftonline.us"
    );
    assert.equal(
      resolveAuthorityHost("https://login.partner.microsoftonline.cn/"),
      "https://login.partner.microsoftonline.cn"
    );
  });

  it("refuses a plaintext authority off-loopback but allows it on loopback", async () => {
    const { resolveAuthorityHost, ENTRA_LOGIN_HOST } =
      await import("../../src/server/authz/entra/config.ts");
    // The authority decides which keys sign the tokens we trust, so an http
    // authority reachable over the network would let anyone on the path mint
    // identities this gateway accepts.
    assert.equal(resolveAuthorityHost("http://evil.example"), ENTRA_LOGIN_HOST);
    assert.equal(resolveAuthorityHost("http://10.0.0.5:8080"), ENTRA_LOGIN_HOST);
    assert.equal(resolveAuthorityHost("http://127.0.0.1:8080"), "http://127.0.0.1:8080");
    assert.equal(resolveAuthorityHost("http://localhost:3000"), "http://localhost:3000");
  });
});

describe("Entra SSO — token verification", () => {
  it("accepts a valid token and reports an sso_user subject", async () => {
    await configureSso();
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(await mintToken())));

    assert.equal(outcome.allow, true);
    if (!outcome.allow) return;
    assert.equal(outcome.subject.kind, "sso_user");
    assert.equal(outcome.subject.id, "user-oid-0001");
    assert.equal(outcome.subject.label, "ada@corp.example");
  });

  it("rejects a token minted for a different audience", async () => {
    await configureSso();
    const token = await mintToken({ audience: "api://some-other-app" });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 401);
  });

  it("rejects a token from another tenant even when the audience matches", async () => {
    await configureSso();
    // Same audience, same signing key, different tid claim: only the explicit
    // tenant assertion catches this.
    const token = await mintToken({ tid: OTHER_TENANT_ID });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 401);
    assert.equal(outcome.code, "AUTH_SSO_TENANT");
  });

  it("rejects an expired token", async () => {
    await configureSso();
    const token = await mintToken({ expiresAt: Math.floor(Date.now() / 1000) - 600 });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 401);
    assert.equal(outcome.code, "AUTH_SSO_EXPIRED");
  });

  it("rejects a token signed by a key that is not in the tenant JWKS", async () => {
    await configureSso();
    const token = await mintToken({ signWithWrongKey: true });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 401);
  });

  it("rejects a token with no oid claim", async () => {
    await configureSso();
    const token = await mintToken({ oid: null });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.code, "AUTH_SSO_NO_SUBJECT");
  });
});

describe("Entra SSO — group mapping", () => {
  it("joins the shadow key to the key group mapped from the Entra group", async () => {
    await configureSso();
    const outcome = await clientApiPolicy.evaluate(
      policyContext(ssoRequest(await mintToken({ oid: "user-oid-groups" })))
    );
    assert.equal(outcome.allow, true);

    const identity = getSsoIdentity("user-oid-groups");
    assert.ok(identity, "identity should be provisioned");
    const groups = getKeyGroupsForApiKey(identity.apiKeyId);
    assert.deepEqual(
      groups.map((g) => g.id),
      [engineeringKeyGroupId]
    );
  });

  it("denies a user whose groups match nothing when no default is configured", async () => {
    await configureSso();
    const token = await mintToken({ oid: "user-oid-nogroup", groups: ["group-unmapped"] });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 403);
    assert.equal(outcome.code, "AUTH_SSO_NO_GROUP");
  });

  it("falls back to the default key group when one is configured", async () => {
    await configureSso({ entraDefaultKeyGroupId: contractorKeyGroupId });
    const token = await mintToken({ oid: "user-oid-default", groups: ["group-unmapped"] });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, true);
    const identity = getSsoIdentity("user-oid-default");
    assert.ok(identity);
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id),
      [contractorKeyGroupId]
    );
  });

  it("reconciles membership when the user's Entra groups change", async () => {
    await configureSso({
      entraGroupMappings: [
        { groupId: ENTRA_GROUP_ENGINEERING, keyGroupId: engineeringKeyGroupId },
        { groupId: ENTRA_GROUP_CONTRACTORS, keyGroupId: contractorKeyGroupId },
      ],
    });

    const oid = "user-oid-drift";
    await clientApiPolicy.evaluate(
      policyContext(ssoRequest(await mintToken({ oid, groups: [ENTRA_GROUP_ENGINEERING] })))
    );
    const identity = getSsoIdentity(oid);
    assert.ok(identity);
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id),
      [engineeringKeyGroupId]
    );

    // The user moves to Contractors in Entra. A fresh token (new cache key)
    // must move their key group too, not keep the stale one.
    resetSsoResolutionCache();
    await clientApiPolicy.evaluate(
      policyContext(ssoRequest(await mintToken({ oid, groups: [ENTRA_GROUP_CONTRACTORS] })))
    );
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id),
      [contractorKeyGroupId]
    );
  });
});

describe("Entra SSO — group claim overage (>150 groups)", () => {
  it("fails closed with an explicit error when the Graph fallback is disabled", async () => {
    await configureSso({ entraGraphFallbackEnabled: false });
    const token = await mintToken({ oid: "user-oid-overage-a", claimNamesOverage: true });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 403);
    assert.equal(outcome.code, "AUTH_SSO_GROUP_OVERAGE");
  });

  it("resolves membership through Graph when the fallback is enabled", async () => {
    await configureSso({ entraGraphFallbackEnabled: true });
    graphMemberGroups["user-oid-overage-b"] = [ENTRA_GROUP_ENGINEERING];

    const token = await mintToken({ oid: "user-oid-overage-b", claimNamesOverage: true });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, true);
    const identity = getSsoIdentity("user-oid-overage-b");
    assert.ok(identity);
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id),
      [engineeringKeyGroupId]
    );
  });

  it("returns 503, not 403, when Graph itself is unreachable", async () => {
    await configureSso({ entraGraphFallbackEnabled: true });
    graphShouldFail = true;

    const token = await mintToken({ oid: "user-oid-overage-c", claimNamesOverage: true });
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.status, 503);
  });
});

describe("Entra SSO — just-in-time provisioning", () => {
  it("creates exactly one shadow key when two requests race for a new user", async () => {
    await configureSso();
    const oid = "user-oid-race";
    const upn = "race-only@corp.example";
    const token = await mintToken({ oid, upn });

    // Distinct tokens so neither request can be served from the resolution cache.
    const second = await mintToken({
      oid,
      upn,
      expiresAt: Math.floor(Date.now() / 1000) + 7200,
    });

    const [a, b] = await Promise.all([
      clientApiPolicy.evaluate(policyContext(ssoRequest(token))),
      clientApiPolicy.evaluate(policyContext(ssoRequest(second))),
    ]);

    assert.equal(a.allow, true);
    assert.equal(b.allow, true);

    const identity = getSsoIdentity(oid);
    assert.ok(identity);

    const { getApiKeys } = await import("../../src/lib/db/apiKeys.ts");
    const all = (await getApiKeys()) as Array<{ name?: string }>;
    const shadows = all.filter((k) => k.name === `sso:${upn}`);
    assert.equal(shadows.length, 1, "the provisioning race must not leave an orphaned key");
  });

  it("stops authenticating immediately when the shadow key is deactivated", async () => {
    await configureSso();
    const oid = "user-oid-kill";
    const token = await mintToken({ oid });

    assert.equal((await clientApiPolicy.evaluate(policyContext(ssoRequest(token)))).allow, true);

    const identity = getSsoIdentity(oid);
    assert.ok(identity);
    setSsoKeyActive(identity.apiKeyId, false);

    // Same token, still within the resolution-cache TTL: deactivation must win
    // anyway, because that is the instant kill-switch for a user whose Entra
    // token has not expired yet.
    const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));
    assert.equal(outcome.allow, false);
    if (outcome.allow) return;
    assert.equal(outcome.code, "AUTH_SSO_DEACTIVATED");
  });
});

describe("Entra SSO — shadow key secrets never leave the DB layer", () => {
  it("redacts the secret in the key list and by-id read, but still resolves it internally", async () => {
    await configureSso();
    const oid = "user-oid-redaction";
    await clientApiPolicy.evaluate(
      policyContext(ssoRequest(await mintToken({ oid, upn: "redact@corp.example" })))
    );

    const identity = getSsoIdentity(oid);
    assert.ok(identity);

    const { getApiKeys, getApiKeyById } = await import("../../src/lib/db/apiKeys.ts");
    const listed = ((await getApiKeys()) as Array<{ id?: string; key?: string }>).find(
      (k) => k.id === identity.apiKeyId
    );
    assert.ok(listed, "the shadow key should still be listed");
    assert.equal(listed.key, "", "the shadow key secret must never be exposed");

    const byId = (await getApiKeyById(identity.apiKeyId)) as { key?: string } | null;
    assert.equal(byId?.key, "");

    // Exposing it would create a permanent static credential that bypasses SSO,
    // but the policy layer still needs it internally.
    assert.ok((getSsoShadowSecret(oid) ?? "").length > 0);
  });

  it("refuses the reveal endpoint for an SSO key while still revealing a normal one", async () => {
    await configureSso();
    const oid = "user-oid-reveal";
    await clientApiPolicy.evaluate(
      policyContext(ssoRequest(await mintToken({ oid, upn: "reveal@corp.example" })))
    );
    const identity = getSsoIdentity(oid);
    assert.ok(identity);

    const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");
    const reveal = (id: string) =>
      revealRoute.GET(new Request(`http://localhost/api/keys/${id}/reveal`), {
        params: Promise.resolve({ id }),
      });

    // Reveal is feature-gated and returns 403 when disabled, which would make
    // the SSO assertion below pass for the wrong reason. Turn it on so the two
    // cases genuinely differ.
    const previous = process.env.ALLOW_API_KEY_REVEAL;
    process.env.ALLOW_API_KEY_REVEAL = "true";
    try {
      const normal = await createApiKey("reveal-normal", "machine-entra-0003", []);
      const normalResponse = await reveal(normal.id);
      assert.equal(normalResponse.status, 200, "a normal key must still be revealable");
      assert.equal((await normalResponse.json()).key, normal.key);

      const ssoResponse = await reveal(identity.apiKeyId);
      assert.equal(ssoResponse.status, 403);
      const body = await ssoResponse.json();
      assert.ok(!("key" in body), "the response must not carry a key field at all");
    } finally {
      if (previous === undefined) delete process.env.ALLOW_API_KEY_REVEAL;
      else process.env.ALLOW_API_KEY_REVEAL = previous;
    }
  });

  it("leaves a normal operator-created key's secret readable", async () => {
    const created = await createApiKey("manual-not-redacted", "machine-entra-0002", []);
    const { getApiKeyById } = await import("../../src/lib/db/apiKeys.ts");
    const byId = (await getApiKeyById(created.id)) as { key?: string } | null;
    assert.equal(byId?.key, created.key);
  });
});

describe("Entra SSO — coexistence with static API keys", () => {
  it("still authenticates a plain OmniRoute API key while SSO is enabled", async () => {
    await configureSso();
    const created = await createApiKey("static-coexist", "machine-entra-0001", []);

    const request = new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${created.key}` },
    });
    const outcome = await clientApiPolicy.evaluate(policyContext(request));

    assert.equal(outcome.allow, true);
    if (!outcome.allow) return;
    assert.equal(outcome.subject.kind, "client_api_key");
  });

  it("leaves an unrelated JWT bearer alone while SSO is disabled", async () => {
    // A client may send its own RS256 JWT in Authorization — the extractBearer
    // comment in clientApi.ts cites VS Code Copilot doing exactly that. With SSO
    // off, claiming that bearer would replace the pre-SSO degrade-to-anonymous
    // behavior with a hard 401 on a deployment that never configured Entra.
    await updateSettings({ entraSsoEnabled: false });
    invalidateDbCache("settings");

    const previous = process.env.REQUIRE_API_KEY;
    process.env.REQUIRE_API_KEY = "false";
    try {
      const token = await mintToken({ oid: "user-oid-sso-off" });
      const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

      assert.equal(outcome.allow, true, "SSO must not claim a bearer while it is disabled");
      if (!outcome.allow) return;
      assert.equal(outcome.subject.kind, "anonymous");
    } finally {
      if (previous === undefined) delete process.env.REQUIRE_API_KEY;
      else process.env.REQUIRE_API_KEY = previous;
      await configureSso();
    }
  });

  it("does not degrade a failed SSO token to anonymous when REQUIRE_API_KEY is off", async () => {
    await configureSso();
    const previous = process.env.REQUIRE_API_KEY;
    process.env.REQUIRE_API_KEY = "false";
    try {
      const token = await mintToken({ signWithWrongKey: true });
      const outcome = await clientApiPolicy.evaluate(policyContext(ssoRequest(token)));

      // The degrade-to-anonymous path exists for stale API keys. Applying it to
      // a failed Entra token would turn an identity-provider outage into open
      // access for everyone.
      assert.equal(outcome.allow, false);
    } finally {
      if (previous === undefined) delete process.env.REQUIRE_API_KEY;
      else process.env.REQUIRE_API_KEY = previous;
    }
  });
});

describe("Entra SSO — auth→policy bridge (GHSA-2phc-xp22-9f56 class)", () => {
  it("resolves the shadow key's policy from the trusted subject stamp", async () => {
    await configureSso();
    const oid = "user-oid-bridge";
    await clientApiPolicy.evaluate(policyContext(ssoRequest(await mintToken({ oid }))));

    const identity = getSsoIdentity(oid);
    assert.ok(identity);

    const stamped = new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: oid,
      },
    });

    const result = await enforceApiKeyPolicy(stamped, "gpt-4o-mini");
    assert.equal(result.apiKey, getSsoShadowSecret(oid));
    assert.ok(result.apiKeyInfo, "the SSO request must carry the shadow key's policy");
    assert.equal(result.apiKeyInfo?.id, identity.apiKeyId);
  });

  it("uses the shadow key even when the raw JWT also arrives in x-api-key", async () => {
    // Claude Code's apiKeyHelper sends the credential in BOTH Authorization and
    // x-api-key. Without the SSO branch winning, extractUngatedClientApiKey
    // would hand the raw JWT to the policy layer, which resolves to no key and
    // silently drops every limit the user is supposed to be under.
    await configureSso();
    const oid = "user-oid-bridge-xapikey";
    const token = await mintToken({ oid });
    await clientApiPolicy.evaluate(policyContext(ssoRequest(token, { via: "both" })));

    const identity = getSsoIdentity(oid);
    assert.ok(identity);

    const stamped = new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": token,
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: oid,
      },
    });

    const result = await enforceApiKeyPolicy(stamped, "gpt-4o-mini");
    assert.notEqual(result.apiKey, token, "the raw Entra JWT must never be used as the API key");
    assert.equal(result.apiKey, getSsoShadowSecret(oid));
    assert.equal(result.apiKeyInfo?.id, identity.apiKeyId);
  });

  it("ignores an sso_user stamp for an oid that was never provisioned", async () => {
    await configureSso();
    const stamped = new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: "user-oid-never-seen",
      },
    });

    const result = await enforceApiKeyPolicy(stamped, "gpt-4o-mini");
    assert.equal(result.apiKey, null);
    assert.equal(result.apiKeyInfo, null);
  });
});
