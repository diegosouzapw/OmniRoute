/**
 * Tests for the Google OAuth redirect URI mismatch fix.
 *
 * Validates that:
 * 1. Built-in (default) public credentials are correctly identified as non-custom
 *    so that loopback redirect URIs are preserved.
 * 2. Truly custom credentials trigger the public base URL override.
 * 3. resolvePublicCred() is used dynamically for default ID comparison.
 * 4. The `agy` provider alias inherits antigravity credential detection.
 *
 * All tests run fully offline — no network calls.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveBrowserOAuthRedirectUri } = await import(
  "../../src/lib/oauth/providers.ts"
);
const { resolvePublicCred } = await import(
  "../../open-sse/utils/publicCreds.ts"
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** The default embedded antigravity client ID (decoded at runtime). */
const DEFAULT_ANTIGRAVITY_CLIENT_ID = resolvePublicCred("antigravity_id");
/** The default embedded gemini client ID (decoded at runtime). */
const DEFAULT_GEMINI_CLIENT_ID = resolvePublicCred("gemini_id");

// ---------------------------------------------------------------------------
// resolvePublicCred sanity
// ---------------------------------------------------------------------------

test("resolvePublicCred returns a valid Google client ID for antigravity_id", () => {
  assert.ok(DEFAULT_ANTIGRAVITY_CLIENT_ID.length > 0, "must not be empty");
  assert.ok(
    DEFAULT_ANTIGRAVITY_CLIENT_ID.endsWith(".apps.googleusercontent.com"),
    "must be a Google OAuth client ID"
  );
});

test("resolvePublicCred returns a valid Google client ID for gemini_id", () => {
  assert.ok(DEFAULT_GEMINI_CLIENT_ID.length > 0, "must not be empty");
  assert.ok(
    DEFAULT_GEMINI_CLIENT_ID.endsWith(".apps.googleusercontent.com"),
    "must be a Google OAuth client ID"
  );
});

test("antigravity and gemini default client IDs are different", () => {
  assert.notEqual(
    DEFAULT_ANTIGRAVITY_CLIENT_ID,
    DEFAULT_GEMINI_CLIENT_ID,
    "antigravity and gemini must have distinct client IDs"
  );
});

// ---------------------------------------------------------------------------
// Default (built-in) credentials → loopback preserved
// ---------------------------------------------------------------------------

test("antigravity with default public credentials keeps loopback redirect URI", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: DEFAULT_ANTIGRAVITY_CLIENT_ID,
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "GOCSPX-SomeDefaultSecret",
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "must stay on loopback when using built-in credentials"
  );
});

test("gemini-cli with default public credentials keeps loopback redirect URI", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "gemini-cli",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      GEMINI_CLI_OAUTH_CLIENT_ID: DEFAULT_GEMINI_CLIENT_ID,
      GEMINI_CLI_OAUTH_CLIENT_SECRET: "GOCSPX-SomeDefaultSecret",
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "must stay on loopback when using built-in credentials"
  );
});

test("gemini-cli with default credentials via GEMINI_OAUTH_* fallback env vars keeps loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "gemini-cli",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      // No GEMINI_CLI_* vars → falls back to GEMINI_OAUTH_*
      GEMINI_OAUTH_CLIENT_ID: DEFAULT_GEMINI_CLIENT_ID,
      GEMINI_OAUTH_CLIENT_SECRET: "GOCSPX-SomeDefaultSecret",
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "must stay on loopback when fallback env vars carry the default client ID"
  );
});

test("agy provider with default antigravity credentials keeps loopback redirect URI", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "agy",
    "http://localhost:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: DEFAULT_ANTIGRAVITY_CLIENT_ID,
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "GOCSPX-SomeDefaultSecret",
    }
  );

  assert.equal(
    redirectUri,
    "http://localhost:20128/callback",
    "agy must inherit antigravity default credential detection"
  );
});

// ---------------------------------------------------------------------------
// Custom credentials → redirect overridden to public base URL
// ---------------------------------------------------------------------------

test("antigravity with custom credentials switches loopback to public base URL", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

test("gemini-cli with custom credentials switches loopback to public base URL", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "gemini-cli",
    "http://127.0.0.1:20128/callback",
    {
      OMNIROUTE_PUBLIC_BASE_URL: "https://omniroute.example.com",
      GEMINI_CLI_OAUTH_CLIENT_ID: "custom-gemini.apps.googleusercontent.com",
      GEMINI_CLI_OAUTH_CLIENT_SECRET: "custom-gemini-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

test("agy with custom credentials switches loopback to public base URL", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "agy",
    "http://localhost:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-agy.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-agy-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

// ---------------------------------------------------------------------------
// Edge cases — incomplete / missing credentials
// ---------------------------------------------------------------------------

test("antigravity with only client ID (no secret) keeps loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      // No secret
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "incomplete credentials must not trigger override"
  );
});

test("gemini-cli with only client secret (no ID) keeps loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "gemini-cli",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      GEMINI_CLI_OAUTH_CLIENT_SECRET: "custom-secret",
      // No client ID
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "incomplete credentials must not trigger override"
  );
});

test("antigravity with blank/whitespace client ID keeps loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "   ",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "   ",
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "blank credentials must not trigger override"
  );
});

test("no env object at all keeps loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {}
  );

  assert.equal(redirectUri, "http://127.0.0.1:20128/callback");
});

test("no public base URL configured keeps loopback even with custom credentials", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      // No NEXT_PUBLIC_BASE_URL or OMNIROUTE_PUBLIC_BASE_URL
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(
    redirectUri,
    "http://127.0.0.1:20128/callback",
    "no public base URL means nowhere to redirect — stay on loopback"
  );
});

// ---------------------------------------------------------------------------
// Non-Google providers are not affected
// ---------------------------------------------------------------------------

test("non-Google provider returns redirect URI unchanged regardless of env", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "claude",
    "http://localhost:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "http://localhost:20128/callback");
});

test("unknown provider returns redirect URI unchanged", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "some-unknown-provider",
    "http://localhost:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
    }
  );

  assert.equal(redirectUri, "http://localhost:20128/callback");
});

// ---------------------------------------------------------------------------
// Already-remote redirect URIs are not double-overridden
// ---------------------------------------------------------------------------

test("already-remote redirect URI is not overridden even with custom credentials", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "https://my-deployment.example.com/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(
    redirectUri,
    "https://my-deployment.example.com/callback",
    "non-loopback redirect URIs must not be overridden"
  );
});

// ---------------------------------------------------------------------------
// IPv6 loopback and localhost variants
// ---------------------------------------------------------------------------

test("custom credentials override IPv6 loopback [::1] for antigravity", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://[::1]:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

test("custom credentials override localhost for gemini-cli", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "gemini-cli",
    "http://localhost:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      GEMINI_OAUTH_CLIENT_ID: "custom-gemini.apps.googleusercontent.com",
      GEMINI_OAUTH_CLIENT_SECRET: "custom-gemini-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

// ---------------------------------------------------------------------------
// Path and query string preservation
// ---------------------------------------------------------------------------

test("custom callback path is preserved when overriding loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/auth/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/auth/callback");
});

test("query string is preserved when overriding loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback?source=popup&nonce=abc",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(
    redirectUri,
    "https://omniroute.example.com/callback?source=popup&nonce=abc"
  );
});

test("root path defaults to /callback when overriding loopback", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "https://omniroute.example.com/callback");
});

// ---------------------------------------------------------------------------
// Public base URL trailing slash normalization
// ---------------------------------------------------------------------------

test("trailing slash on NEXT_PUBLIC_BASE_URL is stripped", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      NEXT_PUBLIC_BASE_URL: "https://omniroute.example.com/",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(
    redirectUri,
    "https://omniroute.example.com/callback",
    "no double slash between base URL and path"
  );
});

test("OMNIROUTE_PUBLIC_BASE_URL is used as fallback when NEXT_PUBLIC_BASE_URL is absent", () => {
  const redirectUri = resolveBrowserOAuthRedirectUri(
    "antigravity",
    "http://127.0.0.1:20128/callback",
    {
      OMNIROUTE_PUBLIC_BASE_URL: "https://fallback.example.com",
      ANTIGRAVITY_OAUTH_CLIENT_ID: "custom-id.apps.googleusercontent.com",
      ANTIGRAVITY_OAUTH_CLIENT_SECRET: "custom-secret",
    }
  );

  assert.equal(redirectUri, "https://fallback.example.com/callback");
});
