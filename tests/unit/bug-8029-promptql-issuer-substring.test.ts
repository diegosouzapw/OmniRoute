// Regression test for #8029 — PromptQL issuer checks used a bare `String.includes()`
// against the JWT `iss` claim, which is an incomplete-url-substring-sanitization bug
// (CodeQL js/incomplete-url-substring-sanitization). A spoofed issuer such as
// `https://auth.pro.hasura.io.evil.com/ddn/token` satisfied `.includes("auth.pro.hasura.io")`
// even though its actual host is `auth.pro.hasura.io.evil.com`, not `auth.pro.hasura.io`.
//
// Two call sites shared the same flawed predicate (copy-pasted):
//   - open-sse/services/promptql/jwt.ts::isDdnProjectPromptQlToken()
//   - open-sse/services/usage/promptql.ts::isLikelyDdnToken()
//
// The fix replaces both with a shared `issuerHostIsTrusted()` helper that parses the
// issuer with `new URL()` and compares the hostname (exact match or a `.`-delimited
// subdomain of a trusted host), never a raw substring check.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const jwtMod = await import("../../open-sse/services/promptql/jwt.ts");
const usageMod = await import("../../open-sse/services/usage/promptql.ts");

function makeFakeJwt(claims: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

const NON_UUID_AUD = "not-a-project-uuid";

const spoofedDdnJwt = makeFakeJwt({
  iss: "https://auth.pro.hasura.io.evil.com/ddn/token",
  aud: NON_UUID_AUD,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

const spoofedQlAppJwt = makeFakeJwt({
  iss: "https://auth.pro.ql.app.evil.com/ddn/token",
  aud: NON_UUID_AUD,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

const legitimateDdnJwt = makeFakeJwt({
  iss: "https://auth.pro.hasura.io/ddn/token",
  aud: NON_UUID_AUD,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

const legitimateSubdomainJwt = makeFakeJwt({
  iss: "https://eu.auth.pro.hasura.io/ddn/token",
  aud: NON_UUID_AUD,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

const garbageIssuerJwt = makeFakeJwt({
  iss: "not a url at all",
  aud: NON_UUID_AUD,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

describe("BUG #8029 — PromptQL issuer host check (js/incomplete-url-substring-sanitization)", () => {
  it("jwt.ts::isDdnProjectPromptQlToken rejects a spoofed host that merely CONTAINS the trusted substring", () => {
    assert.equal(jwtMod.isDdnProjectPromptQlToken(spoofedDdnJwt), false);
    assert.equal(jwtMod.isDdnProjectPromptQlToken(spoofedQlAppJwt), false);
  });

  it("jwt.ts::isDdnProjectPromptQlToken still accepts the real trusted host and its subdomains", () => {
    assert.equal(jwtMod.isDdnProjectPromptQlToken(legitimateDdnJwt), true);
    assert.equal(jwtMod.isDdnProjectPromptQlToken(legitimateSubdomainJwt), true);
  });

  it("jwt.ts::isDdnProjectPromptQlToken rejects a non-URL issuer instead of throwing", () => {
    assert.equal(jwtMod.isDdnProjectPromptQlToken(garbageIssuerJwt), false);
  });

  it("jwt.ts::issuerHostIsTrusted is exported and shared", () => {
    assert.equal(typeof jwtMod.issuerHostIsTrusted, "function");
    assert.equal(jwtMod.issuerHostIsTrusted("https://auth.pro.hasura.io.evil.com/x"), false);
    assert.equal(jwtMod.issuerHostIsTrusted("https://auth.pro.hasura.io/x"), true);
    assert.equal(jwtMod.issuerHostIsTrusted("https://eu.auth.pro.hasura.io/x"), true);
    assert.equal(jwtMod.issuerHostIsTrusted("https://auth.pro.ql.app/x"), true);
    assert.equal(jwtMod.issuerHostIsTrusted("garbage"), false);
  });

  it("usage/promptql.ts collectCreditsTokens sorts a spoofed-issuer token as non-DDN (via getPromptQlUsage token ordering)", async () => {
    // isLikelyDdnToken is not exported directly; exercise it indirectly through
    // getPromptQlUsage's "onlyEnrich" fallback message, which flips to the DDN-required
    // message only when at least one token is classified as DDN-shaped.
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ errors: [{ message: "access-denied" }] }), {
        status: 200,
      })) as typeof fetch;
    try {
      const result = await usageMod.getPromptQlUsage(spoofedDdnJwt, {
        projectId: "01a0fe61-baf4-4e31-9311-8cc0bb3eba91",
      });
      // A spoofed-host token must NOT be treated as DDN-shaped, so the fallback
      // "onlyEnrich" branch (which requires isLikelyDdnToken to be false for every
      // token) is taken and the DDN-specific instructional message is returned.
      assert.ok("message" in result);
      assert.match(String(result.message), /DDN\/project JWT/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
