import test from "node:test";
import assert from "node:assert/strict";

// Coverage for enterprise / Microsoft Entra "Your organization" (external_idp) Kiro accounts:
//   • public-client refresh_token grant against the org IdP tokenEndpoint (no client secret),
//   • the runtime `TokenType: EXTERNAL_IDP` header the CodeWhisperer service requires to bind
//     the bearer to the Amazon Q Developer profile (without it every call is
//     `ValidationException: Invalid ARN <clientId>`),
//   • tokenEndpoint SSRF allowlist, scope normalization, and JWT identity extraction.

import {
  buildExternalIdpRefreshParams,
  validateExternalIdpTokenEndpoint,
  normalizeScope,
  isExternalIdpAuthMethod,
  emailFromExternalIdpToken,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE,
} from "../../open-sse/services/kiroExternalIdp.ts";
import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

const MS_ENDPOINT = "https://login.microsoftonline.com/9d769d6d-e03a-442a-8ab1-a7da2037a5d4/oauth2/v2.0/token";

function makeJwt(payload: Record<string, unknown>): string {
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  return `${b64({ alg: "none", typ: "JWT" })}.${b64(payload)}.sig`;
}

test("validateExternalIdpTokenEndpoint accepts Microsoft/Okta https, rejects others", () => {
  assert.equal(validateExternalIdpTokenEndpoint(MS_ENDPOINT), MS_ENDPOINT);
  assert.ok(validateExternalIdpTokenEndpoint("https://dev-123.okta.com/oauth2/v1/token"));
  assert.throws(() => validateExternalIdpTokenEndpoint("http://login.microsoftonline.com/x/token"));
  assert.throws(() => validateExternalIdpTokenEndpoint("https://evil.example.com/token"));
  assert.throws(() => validateExternalIdpTokenEndpoint(""));
});

test("normalizeScope handles array and space-delimited string", () => {
  assert.equal(normalizeScope(["a", "b", "offline_access"]), "a b offline_access");
  assert.equal(normalizeScope("a b offline_access"), "a b offline_access");
  assert.equal(normalizeScope([" x ", "", "y"]), "x y");
  assert.equal(normalizeScope(undefined), "");
});

test("isExternalIdpAuthMethod recognizes external_idp (case-insensitive)", () => {
  assert.equal(isExternalIdpAuthMethod("external_idp"), true);
  assert.equal(isExternalIdpAuthMethod("EXTERNAL_IDP"), true);
  assert.equal(isExternalIdpAuthMethod("idc"), false);
  assert.equal(isExternalIdpAuthMethod(undefined), false);
});

test("emailFromExternalIdpToken reads preferred_username / upn / email", () => {
  assert.equal(
    emailFromExternalIdpToken(makeJwt({ preferred_username: "finbar.heslin@mrdevvn.cyou" })),
    "finbar.heslin@mrdevvn.cyou"
  );
  assert.equal(emailFromExternalIdpToken(makeJwt({ upn: "a@b.com" })), "a@b.com");
  assert.equal(emailFromExternalIdpToken(makeJwt({ email: "c@d.com" })), "c@d.com");
  assert.equal(emailFromExternalIdpToken("not-a-jwt"), null);
});

test("buildExternalIdpRefreshParams builds a public-client form body", () => {
  const req = buildExternalIdpRefreshParams("RT-123", {
    clientId: "app-guid",
    tokenEndpoint: MS_ENDPOINT,
    scopes: ["api://app-guid/codewhisperer:conversations", "offline_access"],
  });
  assert.equal(req.tokenEndpoint, MS_ENDPOINT);
  assert.equal(req.body.get("grant_type"), "refresh_token");
  assert.equal(req.body.get("client_id"), "app-guid");
  assert.equal(req.body.get("refresh_token"), "RT-123");
  assert.equal(
    req.body.get("scope"),
    "api://app-guid/codewhisperer:conversations offline_access"
  );
  // Public client: never a secret.
  assert.equal(req.body.get("client_secret"), null);
});

test("buildExternalIdpRefreshParams fails closed on missing fields", () => {
  assert.throws(() => buildExternalIdpRefreshParams("", { clientId: "x", tokenEndpoint: MS_ENDPOINT, scopes: "s" }));
  assert.throws(() => buildExternalIdpRefreshParams("rt", { tokenEndpoint: MS_ENDPOINT, scopes: "s" }));
  assert.throws(() => buildExternalIdpRefreshParams("rt", { clientId: "x", scopes: "s" }));
  assert.throws(() => buildExternalIdpRefreshParams("rt", { clientId: "x", tokenEndpoint: MS_ENDPOINT }));
});

test("KiroService.refreshToken uses the org IdP tokenEndpoint for external_idp", async () => {
  const { KiroService } = await import("../../src/lib/oauth/services/kiro.ts");
  const ORIGINAL_FETCH = globalThis.fetch;
  const calls: { url: string; body: string; contentType: string | null }[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    const body = init?.body instanceof URLSearchParams ? init.body.toString() : String(init?.body ?? "");
    calls.push({ url: u, body, contentType: (init?.headers as Record<string, string>)?.["Content-Type"] ?? null });
    return new Response(
      JSON.stringify({ access_token: "new-at", refresh_token: "rotated-rt", expires_in: 4481 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const svc = new KiroService();
    const res = await svc.refreshToken("RT-old", {
      authMethod: "external_idp",
      clientId: "app-guid",
      tokenEndpoint: MS_ENDPOINT,
      scopes: "codewhisperer:conversations offline_access",
    });
    assert.equal(res.accessToken, "new-at");
    assert.equal(res.refreshToken, "rotated-rt");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, MS_ENDPOINT);
    assert.ok(calls[0].url.includes("login.microsoftonline.com"));
    // Must NOT hit AWS OIDC or the Kiro social endpoint.
    assert.ok(!calls[0].url.includes("amazonaws.com"));
    assert.ok(!calls[0].url.includes("desktop.kiro.dev"));
    assert.ok(calls[0].body.includes("grant_type=refresh_token"));
    assert.ok(calls[0].body.includes("client_id=app-guid"));
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
  }
});

test("KiroExecutor.buildHeaders sends TokenType: EXTERNAL_IDP only for external_idp", () => {
  const exec = new KiroExecutor();
  const idpHeaders = exec.buildHeaders({
    accessToken: "at",
    providerSpecificData: { authMethod: "external_idp" },
  } as never);
  assert.equal(idpHeaders[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER], KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE);

  const idcHeaders = exec.buildHeaders({
    accessToken: "at",
    providerSpecificData: { authMethod: "idc" },
  } as never);
  assert.equal(idcHeaders[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER], undefined);

  const builderIdHeaders = exec.buildHeaders({ accessToken: "at" } as never);
  assert.equal(builderIdHeaders[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER], undefined);
});
