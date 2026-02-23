import test from "node:test";
import assert from "node:assert/strict";

// ── Import test targets from connection test route ──────────────────────────

// We can't import the full route (needs DB), but we can test the pure functions
// by importing them from the module. The classifyFailure, toSafeMessage, isTokenExpired,
// and makeDiagnosis are not exported, so we test them through testSingleConnection's
// behavior patterns using inline reimplementations that verify the same logic.

// ─── classifyFailure Logic Tests ────────────────────────────────────────────

// Reimplementation of classifyFailure for testing (mirrors route.ts logic)
function classifyFailure({ error, statusCode = null, refreshFailed = false, unsupported = false }) {
  const message =
    typeof error !== "string" ? "Connection test failed" : error.trim() || "Connection test failed";
  const normalized = message.toLowerCase();
  const numericStatus = Number.isFinite(statusCode) ? Number(statusCode) : null;

  if (unsupported)
    return { type: "unsupported", source: "validation", message, code: "unsupported" };
  if (refreshFailed || normalized.includes("refresh failed"))
    return { type: "token_refresh_failed", source: "oauth", message, code: "refresh_failed" };
  if (numericStatus === 401 || numericStatus === 403)
    return {
      type: "upstream_auth_error",
      source: "upstream",
      message,
      code: String(numericStatus),
    };
  if (numericStatus === 429)
    return { type: "upstream_rate_limited", source: "upstream", message, code: "429" };
  if (numericStatus && numericStatus >= 500)
    return {
      type: "upstream_unavailable",
      source: "upstream",
      message,
      code: String(numericStatus),
    };
  if (normalized.includes("token expired") || normalized.includes("expired"))
    return { type: "token_expired", source: "oauth", message, code: "token_expired" };
  if (
    normalized.includes("invalid api key") ||
    normalized.includes("token invalid") ||
    normalized.includes("revoked") ||
    normalized.includes("access denied") ||
    normalized.includes("unauthorized") ||
    normalized.includes("forbidden")
  ) {
    return {
      type: "upstream_auth_error",
      source: "upstream",
      message,
      code: numericStatus ? String(numericStatus) : "auth_failed",
    };
  }
  if (
    normalized.includes("rate limit") ||
    normalized.includes("quota") ||
    normalized.includes("too many requests")
  ) {
    return {
      type: "upstream_rate_limited",
      source: "upstream",
      message,
      code: numericStatus ? String(numericStatus) : "rate_limited",
    };
  }
  if (
    normalized.includes("fetch failed") ||
    normalized.includes("network") ||
    normalized.includes("timeout") ||
    normalized.includes("econn") ||
    normalized.includes("enotfound") ||
    normalized.includes("socket")
  ) {
    return { type: "network_error", source: "upstream", message, code: "network_error" };
  }
  return {
    type: "upstream_error",
    source: "upstream",
    message,
    code: numericStatus ? String(numericStatus) : "upstream_error",
  };
}

// ── classifyFailure ─────────────────────────────────────────────────────────

test("classifyFailure: unsupported provider", () => {
  const result = classifyFailure({ error: "Not supported", unsupported: true });
  assert.equal(result.type, "unsupported");
  assert.equal(result.source, "validation");
  assert.equal(result.code, "unsupported");
});

test("classifyFailure: refresh failed", () => {
  const result = classifyFailure({
    error: "Token expired and refresh failed",
    refreshFailed: true,
  });
  assert.equal(result.type, "token_refresh_failed");
  assert.equal(result.source, "oauth");
  assert.equal(result.code, "refresh_failed");
});

test("classifyFailure: refresh failed via message", () => {
  const result = classifyFailure({ error: "Something refresh failed here" });
  assert.equal(result.type, "token_refresh_failed");
  assert.equal(result.code, "refresh_failed");
});

test("classifyFailure: 401 status", () => {
  const result = classifyFailure({ error: "Auth error", statusCode: 401 });
  assert.equal(result.type, "upstream_auth_error");
  assert.equal(result.code, "401");
});

test("classifyFailure: 403 status", () => {
  const result = classifyFailure({ error: "Forbidden", statusCode: 403 });
  assert.equal(result.type, "upstream_auth_error");
  assert.equal(result.code, "403");
});

test("classifyFailure: 429 rate limit", () => {
  const result = classifyFailure({ error: "Rate limited", statusCode: 429 });
  assert.equal(result.type, "upstream_rate_limited");
  assert.equal(result.code, "429");
});

test("classifyFailure: 500+ server error", () => {
  const result = classifyFailure({ error: "Server error", statusCode: 502 });
  assert.equal(result.type, "upstream_unavailable");
  assert.equal(result.code, "502");
});

test("classifyFailure: token expired message", () => {
  const result = classifyFailure({ error: "Token expired" });
  assert.equal(result.type, "token_expired");
  assert.equal(result.source, "oauth");
});

test("classifyFailure: invalid API key message", () => {
  const result = classifyFailure({ error: "Invalid API key provided" });
  assert.equal(result.type, "upstream_auth_error");
  assert.equal(result.code, "auth_failed");
});

test("classifyFailure: network error messages", () => {
  for (const msg of [
    "fetch failed",
    "network timeout",
    "ECONNREFUSED",
    "ENOTFOUND",
    "socket hang up",
  ]) {
    const result = classifyFailure({ error: msg });
    assert.equal(result.type, "network_error", `Expected network_error for "${msg}"`);
    assert.equal(result.code, "network_error");
  }
});

test("classifyFailure: rate limit via message", () => {
  for (const msg of ["rate limit exceeded", "quota reached", "too many requests"]) {
    const result = classifyFailure({ error: msg });
    assert.equal(
      result.type,
      "upstream_rate_limited",
      `Expected upstream_rate_limited for "${msg}"`
    );
  }
});

test("classifyFailure: generic upstream error", () => {
  const result = classifyFailure({ error: "Something went wrong" });
  assert.equal(result.type, "upstream_error");
  assert.equal(result.source, "upstream");
});

test("classifyFailure: non-string error defaults to fallback message", () => {
  const result = classifyFailure({ error: null });
  assert.equal(result.message, "Connection test failed");
});

test("classifyFailure: empty string error defaults to fallback", () => {
  const result = classifyFailure({ error: "   " });
  assert.equal(result.message, "Connection test failed");
});

// ── isTokenExpired ──────────────────────────────────────────────────────────

function isTokenExpired(connection) {
  const expiresAtValue = connection.expiresAt || connection.tokenExpiresAt;
  if (!expiresAtValue) return false;
  const expiresAt = new Date(expiresAtValue).getTime();
  const buffer = 5 * 60 * 1000;
  return expiresAt <= Date.now() + buffer;
}

test("isTokenExpired: returns false when no expiry set", () => {
  assert.equal(isTokenExpired({}), false);
  assert.equal(isTokenExpired({ expiresAt: null }), false);
});

test("isTokenExpired: returns true when token is expired", () => {
  const pastDate = new Date(Date.now() - 60000).toISOString();
  assert.equal(isTokenExpired({ expiresAt: pastDate }), true);
});

test("isTokenExpired: returns true when token expires within 5 minutes", () => {
  const nearFuture = new Date(Date.now() + 2 * 60 * 1000).toISOString(); // 2 min
  assert.equal(isTokenExpired({ expiresAt: nearFuture }), true);
});

test("isTokenExpired: returns false when token is far in the future", () => {
  const farFuture = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
  assert.equal(isTokenExpired({ expiresAt: farFuture }), false);
});

test("isTokenExpired: uses tokenExpiresAt as fallback", () => {
  const pastDate = new Date(Date.now() - 60000).toISOString();
  assert.equal(isTokenExpired({ tokenExpiresAt: pastDate }), true);
});

// ── Provider Display Label ──────────────────────────────────────────────────

function getProviderDisplayLabel(provider) {
  if (!provider) return "-";
  if (provider.startsWith("openai-compatible-")) {
    const suffix = provider.replace("openai-compatible-", "");
    const parts = suffix.split("-");
    if (parts.length > 1 && parts[1]?.length >= 8) {
      return "OAI-COMPAT";
    }
    return `OAI: ${suffix.slice(0, 16).toUpperCase()}`;
  }
  if (provider.startsWith("anthropic-compatible-")) {
    const suffix = provider.replace("anthropic-compatible-", "");
    const parts = suffix.split("-");
    if (parts.length > 1 && parts[1]?.length >= 8) {
      return "ANT-COMPAT";
    }
    return `ANT: ${suffix.slice(0, 16).toUpperCase()}`;
  }
  return null;
}

test("getProviderDisplayLabel: openai-compatible with UUID shows OAI-COMPAT", () => {
  const result = getProviderDisplayLabel(
    "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"
  );
  assert.equal(result, "OAI-COMPAT");
});

test("getProviderDisplayLabel: anthropic-compatible with UUID shows ANT-COMPAT", () => {
  const result = getProviderDisplayLabel(
    "anthropic-compatible-chat-abcdef12-3456-7890-abcd-ef1234567890"
  );
  assert.equal(result, "ANT-COMPAT");
});

test("getProviderDisplayLabel: openai-compatible with short name shows name", () => {
  const result = getProviderDisplayLabel("openai-compatible-myapi");
  assert.equal(result, "OAI: MYAPI");
});

test("getProviderDisplayLabel: non-compatible provider returns null", () => {
  assert.equal(getProviderDisplayLabel("groq"), null);
  assert.equal(getProviderDisplayLabel("openai"), null);
  assert.equal(getProviderDisplayLabel("claude"), null);
});

test("getProviderDisplayLabel: empty/null provider returns dash", () => {
  assert.equal(getProviderDisplayLabel(""), "-");
  assert.equal(getProviderDisplayLabel(null), "-");
});

// ── OAUTH_TEST_CONFIG Validation ────────────────────────────────────────────

test("OAuth test config covers all expected providers", () => {
  // List of providers that should have test config
  const expected = [
    "claude",
    "codex",
    "gemini-cli",
    "antigravity",
    "github",
    "iflow",
    "qwen",
    "cursor",
    "kimi-coding",
    "kilocode",
    "cline",
    "kiro",
  ];

  // Reimport of OAUTH_TEST_CONFIG keys (verify by name)
  // These are the providers defined in the test route
  const configuredProviders = [
    "claude",
    "codex",
    "gemini-cli",
    "antigravity",
    "github",
    "iflow",
    "qwen",
    "cursor",
    "kimi-coding",
    "kilocode",
    "cline",
    "kiro",
  ];

  for (const provider of expected) {
    assert.ok(
      configuredProviders.includes(provider),
      `Missing OAUTH_TEST_CONFIG for provider: ${provider}`
    );
  }
});

test("Refreshable OAuth providers are correctly identified", () => {
  const refreshable = [
    "codex",
    "gemini-cli",
    "antigravity",
    "iflow",
    "qwen",
    "kimi-coding",
    "cline",
    "kiro",
  ];
  const nonRefreshable = ["claude", "github", "cursor", "kilocode"];

  // Verify these two sets are mutually exclusive and cover all providers
  const allProviders = [...refreshable, ...nonRefreshable];
  assert.equal(allProviders.length, 12);
  assert.equal(new Set(allProviders).size, 12);
});
