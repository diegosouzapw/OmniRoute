/**
 * Pure-function coverage for the standalone Entra sign-in helper
 * (scripts/cli/omniroute-sso.mjs). The network and filesystem paths are
 * exercised by the live test in docs/security/ENTRA_SSO.md; these are the
 * parts that must be right without a tenant to try them against.
 */
import { describe, it } from "node:test";
import assert from "node:assert";
import { createHash } from "node:crypto";

const { base64url, createPkcePair, buildAuthUrl, isTokenFresh, mergeClaudeSettings } =
  await import("../../scripts/cli/omniroute-sso.mjs");

const CONFIG = {
  tenantId: "tenant-guid",
  clientId: "client-guid",
  audience: "api://omniroute",
  scope: "api://omniroute/.default",
};

describe("omniroute-sso — PKCE", () => {
  it("derives the challenge as base64url(sha256(verifier))", () => {
    const { verifier, challenge } = createPkcePair();
    const expected = base64url(createHash("sha256").update(verifier).digest());
    assert.equal(challenge, expected);
  });

  it("produces URL-safe values with no padding", () => {
    const { verifier, challenge } = createPkcePair();
    for (const value of [verifier, challenge]) {
      assert.match(value, /^[A-Za-z0-9_-]+$/);
    }
  });

  it("generates a fresh verifier each call", () => {
    assert.notEqual(createPkcePair().verifier, createPkcePair().verifier);
  });
});

describe("omniroute-sso — authorization URL", () => {
  it("requests S256 PKCE and offline_access", () => {
    const url = new URL(
      buildAuthUrl(CONFIG, {
        redirectUri: "http://localhost:51234/callback",
        state: "state-value",
        challenge: "challenge-value",
      })
    );

    assert.equal(
      url.origin + url.pathname,
      "https://login.microsoftonline.com/tenant-guid/oauth2/v2.0/authorize"
    );
    assert.equal(url.searchParams.get("code_challenge_method"), "S256");
    assert.equal(url.searchParams.get("code_challenge"), "challenge-value");
    assert.equal(url.searchParams.get("response_type"), "code");
    assert.equal(url.searchParams.get("client_id"), "client-guid");
    assert.equal(url.searchParams.get("redirect_uri"), "http://localhost:51234/callback");
    assert.equal(url.searchParams.get("state"), "state-value");

    // offline_access is what makes silent refresh possible; without it the user
    // re-authenticates in the browser every hour.
    const scope = url.searchParams.get("scope") ?? "";
    assert.ok(scope.includes("offline_access"));
    assert.ok(scope.includes(CONFIG.scope));
  });

  it("never puts a client secret in the URL", () => {
    const url = buildAuthUrl(CONFIG, {
      redirectUri: "http://localhost:1/callback",
      state: "s",
      challenge: "c",
    });
    assert.ok(!url.includes("client_secret"));
  });
});

describe("omniroute-sso — token freshness", () => {
  const now = 1_700_000_000_000;

  it("treats a comfortably valid token as fresh", () => {
    assert.equal(isTokenFresh({ accessToken: "t", expiresAt: now + 3600_000 }, now), true);
  });

  it("treats an expired token as stale", () => {
    assert.equal(isTokenFresh({ accessToken: "t", expiresAt: now - 1 }, now), false);
  });

  it("treats a token inside the 5 minute skew window as stale", () => {
    // Refreshing early matters: apiKeyHelper output is cached by Claude Code,
    // so a token that is valid now but expires mid-cache would start 401ing.
    assert.equal(isTokenFresh({ accessToken: "t", expiresAt: now + 60_000 }, now), false);
  });

  it("rejects malformed or empty cache entries", () => {
    assert.equal(isTokenFresh(null, now), false);
    assert.equal(isTokenFresh({}, now), false);
    assert.equal(isTokenFresh({ accessToken: "", expiresAt: now + 3600_000 }, now), false);
    assert.equal(isTokenFresh({ accessToken: "t" }, now), false);
  });
});

describe("omniroute-sso — Claude Code settings merge", () => {
  const options = {
    baseUrl: "https://omniroute.corp",
    helperCommand: "node /opt/omniroute-sso.mjs token",
    ttlMs: 900000,
  };

  it("sets the helper, base URL and TTL", () => {
    const merged = mergeClaudeSettings({}, options);
    assert.equal(merged.apiKeyHelper, options.helperCommand);
    assert.equal(merged.env.ANTHROPIC_BASE_URL, options.baseUrl);
    assert.equal(merged.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS, "900000");
  });

  it("preserves unrelated settings and unrelated env vars", () => {
    const merged = mergeClaudeSettings(
      { model: "claude-opus-5", env: { HTTP_PROXY: "http://proxy:3128" } },
      options
    );
    assert.equal(merged.model, "claude-opus-5");
    assert.equal(merged.env.HTTP_PROXY, "http://proxy:3128");
  });

  it("does not mutate the object it was given", () => {
    const original = { env: { HTTP_PROXY: "http://proxy:3128" } };
    mergeClaudeSettings(original, options);
    assert.equal(original.apiKeyHelper, undefined);
    assert.equal(original.env.ANTHROPIC_BASE_URL, undefined);
  });

  it("tolerates a settings file with a non-object env", () => {
    const merged = mergeClaudeSettings({ env: "nonsense" }, options);
    assert.equal(merged.env.ANTHROPIC_BASE_URL, options.baseUrl);
  });
});
