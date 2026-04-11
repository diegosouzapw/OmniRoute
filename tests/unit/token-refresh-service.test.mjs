import test from "node:test";
import assert from "node:assert/strict";

const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const { PROVIDERS, OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");

const {
  TOKEN_EXPIRY_BUFFER_MS,
  refreshAccessToken,
  refreshClineToken,
  refreshKimiCodingToken,
  refreshClaudeOAuthToken,
  refreshGoogleToken,
  refreshQwenToken,
  refreshCodexToken,
  refreshKiroToken,
  refreshIflowToken,
  refreshGitHubToken,
  refreshCopilotToken,
  supportsTokenRefresh,
  isUnrecoverableRefreshError,
  getAccessToken,
  formatProviderCredentials,
  getAllAccessTokens,
  isProviderBlocked,
  getCircuitBreakerStatus,
  refreshWithRetry,
} = tokenRefresh;

function createLog() {
  const entries = [];
  const push = (level, args) => {
    const [scope, message, meta] = args;
    entries.push({ level, scope, message, meta });
  };

  return {
    entries,
    debug: (...args) => push("debug", args),
    info: (...args) => push("info", args),
    warn: (...args) => push("warn", args),
    error: (...args) => push("error", args),
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function textResponse(text, status = 400) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain" },
  });
}

function bodyToString(body) {
  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  return String(body ?? "");
}

async function withMockedFetch(fetchImpl, fn) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function withMockedNow(now, fn) {
  const originalNow = Date.now;
  Date.now = () => now;
  try {
    return await fn();
  } finally {
    Date.now = originalNow;
  }
}

async function withPatchedProperties(target, patch, fn) {
  const previous = new Map();
  for (const [key, value] of Object.entries(patch)) {
    previous.set(key, Object.prototype.hasOwnProperty.call(target, key) ? target[key] : undefined);
    target[key] = value;
  }

  try {
    return await fn();
  } finally {
    for (const [key] of Object.entries(patch)) {
      const prior = previous.get(key);
      if (prior === undefined) {
        delete target[key];
      } else {
        target[key] = prior;
      }
    }
  }
}

async function withFastRetryTimers(fn) {
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = (callback, delay = 0, ...args) =>
    originalSetTimeout(callback, delay === 30_000 ? delay : 0, ...args);
  try {
    return await fn();
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("TOKEN_EXPIRY_BUFFER_MS stays at five minutes", () => {
  assert.equal(TOKEN_EXPIRY_BUFFER_MS, 5 * 60 * 1000);
});

test("refreshAccessToken returns null when no provider refresh endpoint exists", async () => {
  const log = createLog();
  const result = await refreshAccessToken("qoder", "refresh-token", {}, log);
  assert.equal(result, null);
  assert.equal(
    log.entries.some((entry) => entry.level === "warn"),
    true
  );
});

test("refreshAccessToken returns null when refresh token is missing", async () => {
  const log = createLog();

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      const result = await refreshAccessToken("custom-oauth-task-207", null, {}, log);
      assert.equal(result, null);
    }
  );
});

test("refreshAccessToken posts form data and returns rotated tokens", async () => {
  const log = createLog();
  const calls = [];

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": {
        refreshUrl: "https://auth.example.com/token",
        clientId: "client-id",
        clientSecret: "client-secret",
      },
    },
    async () => {
      await withMockedFetch(
        async (url, options = {}) => {
          calls.push({ url, options });
          return jsonResponse({
            access_token: "new-access",
            refresh_token: "new-refresh",
            expires_in: 3600,
          });
        },
        async () => {
          const result = await refreshAccessToken("custom-oauth-task-207", "refresh-123", {}, log);

          assert.deepEqual(result, {
            accessToken: "new-access",
            refreshToken: "new-refresh",
            expiresIn: 3600,
          });
        }
      );
    }
  );

  assert.equal(calls[0].url, "https://auth.example.com/token");
  assert.equal(
    bodyToString(calls[0].options.body),
    "grant_type=refresh_token&refresh_token=refresh-123&client_id=client-id&client_secret=client-secret"
  );
});

test("refreshAccessToken returns null on upstream refresh failure", async () => {
  const log = createLog();

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      await withMockedFetch(
        async () => textResponse("rate limited", 429),
        async () => {
          const result = await refreshAccessToken("custom-oauth-task-207", "refresh-123", {}, log);

          assert.equal(result, null);
          assert.equal(
            log.entries.some((entry) => entry.level === "error"),
            true
          );
        }
      );
    }
  );
});

test("refreshClineToken handles nested payloads and computes expiresIn", async () => {
  const log = createLog();
  const calls = [];

  await withMockedNow(1_700_000_000_000, async () => {
    await withMockedFetch(
      async (url, options = {}) => {
        calls.push({ url, options });
        return jsonResponse({
          data: {
            accessToken: "cline-access",
            refreshToken: "cline-refresh",
            expiresAt: new Date(Date.now() + 95_000).toISOString(),
          },
        });
      },
      async () => {
        const result = await refreshClineToken("refresh-cline", log);
        assert.equal(result.accessToken, "cline-access");
        assert.equal(result.refreshToken, "cline-refresh");
        assert.equal(result.expiresIn, 95);
      }
    );
  });

  assert.equal(calls[0].url, PROVIDERS.cline.refreshUrl);
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    refreshToken: "refresh-cline",
    grantType: "refresh_token",
    clientType: "extension",
  });
});

test("refreshKimiCodingToken adds provider-specific headers and fields", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        access_token: "kimi-access",
        refresh_token: "kimi-refresh-next",
        expires_in: 7200,
        token_type: "Bearer",
        scope: "coding offline_access",
      });
    },
    async () => {
      const result = await refreshKimiCodingToken("kimi-refresh", log);
      assert.deepEqual(result, {
        accessToken: "kimi-access",
        refreshToken: "kimi-refresh-next",
        expiresIn: 7200,
        tokenType: "Bearer",
        scope: "coding offline_access",
      });
    }
  );

  assert.equal(calls[0].url, PROVIDERS["kimi-coding"].refreshUrl);
  assert.equal(calls[0].options.headers["X-Msh-Platform"], "omniroute");
  assert.equal(calls[0].options.headers["X-Msh-Version"], "2.1.2");
  assert.match(calls[0].options.headers["X-Msh-Device-Id"], /^kimi-refresh-/);
  assert.match(bodyToString(calls[0].options.body), /grant_type=refresh_token/);
});

test("refreshClaudeOAuthToken first matches Claude auth exchange token contract", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        access_token: "claude-access",
        refresh_token: "claude-refresh-next",
        expires_in: 1800,
      });
    },
    async () => {
      const result = await refreshClaudeOAuthToken("claude-refresh", log);
      assert.deepEqual(result, {
        accessToken: "claude-access",
        refreshToken: "claude-refresh-next",
        expiresIn: 1800,
      });
    }
  );

  assert.equal(calls[0].url, OAUTH_ENDPOINTS.anthropic.token);
  assert.equal(calls[0].options.headers["Content-Type"], "application/json");
  assert.equal(calls[0].options.headers["User-Agent"], undefined);
  assert.equal(calls[0].options.headers["anthropic-beta"], undefined);
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    grant_type: "refresh_token",
    refresh_token: "claude-refresh",
    client_id: PROVIDERS.claude.clientId,
  });
});

test("refreshClaudeOAuthToken retries with user-agent JSON then form when format is rejected", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      if (calls.length <= 2) {
        return textResponse(
          JSON.stringify({
            type: "error",
            error: { type: "invalid_request_error", message: "Invalid request format" },
          }),
          400
        );
      }

      return jsonResponse({
        access_token: "claude-access-form",
        refresh_token: "claude-refresh-form",
        expires_in: 900,
      });
    },
    async () => {
      const result = await refreshClaudeOAuthToken("claude-refresh", log);
      assert.deepEqual(result, {
        accessToken: "claude-access-form",
        refreshToken: "claude-refresh-form",
        expiresIn: 900,
      });
    }
  );

  assert.equal(calls.length, 3);
  assert.equal(calls[1].options.headers["Content-Type"], "application/json");
  assert.equal(calls[1].options.headers["User-Agent"], "anthropic");
  assert.equal(calls[2].options.headers["Content-Type"], "application/x-www-form-urlencoded");
  assert.match(calls[2].options.body, /grant_type=refresh_token/);
  assert.match(calls[2].options.body, /client_id=/);
});

test("refreshGoogleToken exchanges refresh tokens against the shared google endpoint", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        access_token: "google-access",
        refresh_token: "google-refresh-next",
        expires_in: 3600,
      });
    },
    async () => {
      const result = await refreshGoogleToken("google-refresh", "gid", "gsecret", log);
      assert.deepEqual(result, {
        accessToken: "google-access",
        refreshToken: "google-refresh-next",
        expiresIn: 3600,
      });
    }
  );

  assert.equal(calls[0].url, OAUTH_ENDPOINTS.google.token);
  assert.equal(
    bodyToString(calls[0].options.body),
    "grant_type=refresh_token&refresh_token=google-refresh&client_id=gid&client_secret=gsecret"
  );
});

test("refreshQwenToken maps resource_url into providerSpecificData", async () => {
  const log = createLog();

  await withMockedFetch(
    async () =>
      jsonResponse({
        access_token: "qwen-access",
        refresh_token: "qwen-refresh-next",
        expires_in: 1500,
        resource_url: "https://chat.qwen.ai/workspace/resource",
      }),
    async () => {
      const result = await refreshQwenToken("qwen-refresh", log);
      assert.deepEqual(result, {
        accessToken: "qwen-access",
        refreshToken: "qwen-refresh-next",
        expiresIn: 1500,
        providerSpecificData: {
          resourceUrl: "https://chat.qwen.ai/workspace/resource",
        },
      });
    }
  );
});

test("refreshQwenToken surfaces invalid_request as unrecoverable", async () => {
  const log = createLog();

  await withMockedFetch(
    async () => textResponse(JSON.stringify({ error: "invalid_request" }), 400),
    async () => {
      const result = await refreshQwenToken("qwen-refresh", log);
      assert.deepEqual(result, { error: "invalid_request" });
    }
  );
});

test("refreshCodexToken recognizes refresh_token_reused responses", async () => {
  const log = createLog();

  await withMockedFetch(
    async () => textResponse(JSON.stringify({ error: { code: "refresh_token_reused" } }), 400),
    async () => {
      const result = await refreshCodexToken("codex-refresh", log);
      assert.deepEqual(result, { error: "refresh_token_reused" });
    }
  );
});

test("refreshKiroToken uses the AWS OIDC flow when client credentials are present", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        accessToken: "kiro-aws-access",
        refreshToken: "kiro-aws-refresh-next",
        expiresIn: 900,
      });
    },
    async () => {
      const result = await refreshKiroToken(
        "kiro-refresh",
        {
          authMethod: "idc",
          clientId: "aws-client",
          clientSecret: "aws-secret",
          region: "eu-west-1",
        },
        log
      );

      assert.deepEqual(result, {
        accessToken: "kiro-aws-access",
        refreshToken: "kiro-aws-refresh-next",
        expiresIn: 900,
      });
    }
  );

  assert.equal(calls[0].url, "https://oidc.eu-west-1.amazonaws.com/token");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    clientId: "aws-client",
    clientSecret: "aws-secret",
    refreshToken: "kiro-refresh",
    grantType: "refresh_token",
  });
});

test("refreshKiroToken falls back to the social-auth refresh endpoint", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        accessToken: "kiro-social-access",
        refreshToken: "kiro-social-refresh-next",
        expiresIn: 1200,
      });
    },
    async () => {
      const result = await refreshKiroToken("kiro-refresh", null, log);
      assert.deepEqual(result, {
        accessToken: "kiro-social-access",
        refreshToken: "kiro-social-refresh-next",
        expiresIn: 1200,
      });
    }
  );

  assert.equal(calls[0].url, PROVIDERS.kiro.tokenUrl);
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    refreshToken: "kiro-refresh",
  });
});

test("refreshIflowToken uses basic auth once qoder oauth settings are configured", async () => {
  const log = createLog();
  const calls = [];

  await withPatchedProperties(
    PROVIDERS.qoder,
    {
      clientId: "qoder-client",
      clientSecret: "qoder-secret",
    },
    async () => {
      await withPatchedProperties(
        OAUTH_ENDPOINTS.qoder,
        {
          token: "https://qoder.example.com/oauth/token",
        },
        async () => {
          await withMockedFetch(
            async (url, options = {}) => {
              calls.push({ url, options });
              return jsonResponse({
                access_token: "qoder-access",
                refresh_token: "qoder-refresh-next",
                expires_in: 2400,
              });
            },
            async () => {
              const result = await refreshIflowToken("qoder-refresh", log);
              assert.deepEqual(result, {
                accessToken: "qoder-access",
                refreshToken: "qoder-refresh-next",
                expiresIn: 2400,
              });
            }
          );
        }
      );
    }
  );

  assert.equal(calls[0].url, "https://qoder.example.com/oauth/token");
  assert.match(calls[0].options.headers.Authorization, /^Basic /);
});

test("refreshGitHubToken exchanges the refresh token with github oauth", async () => {
  const log = createLog();
  const calls = [];

  await withPatchedProperties(
    PROVIDERS.github,
    {
      clientId: "github-client",
      clientSecret: "github-secret",
    },
    async () => {
      await withMockedFetch(
        async (url, options = {}) => {
          calls.push({ url, options });
          return jsonResponse({
            access_token: "github-access",
            refresh_token: "github-refresh-next",
            expires_in: 3600,
          });
        },
        async () => {
          const result = await refreshGitHubToken("github-refresh", log);
          assert.deepEqual(result, {
            accessToken: "github-access",
            refreshToken: "github-refresh-next",
            expiresIn: 3600,
          });
        }
      );
    }
  );

  assert.equal(calls[0].url, OAUTH_ENDPOINTS.github.token);
  assert.match(bodyToString(calls[0].options.body), /client_id=github-client/);
});

test("refreshCopilotToken returns the short-lived copilot token", async () => {
  const log = createLog();
  const calls = [];

  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url, options });
      return jsonResponse({
        token: "copilot-session-token",
        expires_at: "2026-01-01T00:00:00.000Z",
      });
    },
    async () => {
      const result = await refreshCopilotToken("github-access-token", log);
      assert.deepEqual(result, {
        token: "copilot-session-token",
        expiresAt: "2026-01-01T00:00:00.000Z",
      });
    }
  );

  assert.equal(calls[0].url, "https://api.github.com/copilot_internal/v2/token");
  assert.equal(calls[0].options.headers.Authorization, "token github-access-token");
});

test("supportsTokenRefresh, isUnrecoverableRefreshError and formatProviderCredentials cover provider helpers", async () => {
  const log = createLog();

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      assert.equal(supportsTokenRefresh("claude"), true);
      assert.equal(supportsTokenRefresh("custom-oauth-task-207"), true);
      assert.equal(supportsTokenRefresh("missing-provider"), false);
    }
  );

  assert.equal(isUnrecoverableRefreshError({ error: "refresh_token_reused" }), true);
  assert.equal(isUnrecoverableRefreshError({ error: "invalid_request" }), true);
  assert.equal(isUnrecoverableRefreshError({ error: "temporary_failure" }), false);

  assert.deepEqual(
    formatProviderCredentials(
      "gemini",
      {
        apiKey: "gemini-key",
        accessToken: "gemini-access",
        projectId: "project-1",
        refreshToken: "ignored",
      },
      log
    ),
    {
      apiKey: "gemini-key",
      accessToken: "gemini-access",
      projectId: "project-1",
    }
  );

  assert.deepEqual(
    formatProviderCredentials(
      "antigravity",
      {
        accessToken: "google-access",
        refreshToken: "google-refresh",
      },
      log
    ),
    {
      accessToken: "google-access",
      refreshToken: "google-refresh",
    }
  );

  assert.equal(formatProviderCredentials("missing-provider", {}, log), null);
});

test("getAccessToken deduplicates concurrent refreshes for the same provider and token", async () => {
  const log = createLog();
  let fetchCount = 0;

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      await withMockedFetch(
        async () => {
          fetchCount += 1;
          return jsonResponse({
            access_token: "shared-access",
            refresh_token: "shared-refresh-next",
            expires_in: 600,
          });
        },
        async () => {
          const [first, second] = await Promise.all([
            getAccessToken("custom-oauth-task-207", { refreshToken: "same-refresh" }, log),
            getAccessToken("custom-oauth-task-207", { refreshToken: "same-refresh" }, log),
          ]);

          assert.equal(fetchCount, 1);
          assert.strictEqual(first, second);
          assert.equal(first.accessToken, "shared-access");
        }
      );
    }
  );
});

test("getAccessToken cleans the in-flight cache after resolve and separates different tokens", async () => {
  const log = createLog();
  let fetchCount = 0;

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      await withMockedFetch(
        async (_url, options = {}) => {
          fetchCount += 1;
          const refreshToken = new URLSearchParams(bodyToString(options.body)).get("refresh_token");
          return jsonResponse({
            access_token: `access-${refreshToken}`,
            refresh_token: `next-${refreshToken}`,
            expires_in: 600,
          });
        },
        async () => {
          const first = await getAccessToken(
            "custom-oauth-task-207",
            { refreshToken: "refresh-a" },
            log
          );
          const second = await getAccessToken(
            "custom-oauth-task-207",
            { refreshToken: "refresh-a" },
            log
          );
          const third = await getAccessToken(
            "custom-oauth-task-207",
            { refreshToken: "refresh-b" },
            log
          );

          assert.equal(fetchCount, 3);
          assert.equal(first.accessToken, "access-refresh-a");
          assert.equal(second.accessToken, "access-refresh-a");
          assert.equal(third.accessToken, "access-refresh-b");
        }
      );
    }
  );
});

test("getAccessToken returns null for invalid refresh token input", async () => {
  const log = createLog();
  const result = await getAccessToken("codex", { refreshToken: null }, log);
  assert.equal(result, null);
});

test("getAllAccessTokens refreshes only active connections with providers", async () => {
  const log = createLog();
  let fetchCount = 0;

  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-207": { tokenUrl: "https://auth.example.com/token" },
    },
    async () => {
      await withMockedFetch(
        async (_url, options = {}) => {
          fetchCount += 1;
          const refreshToken = new URLSearchParams(bodyToString(options.body)).get("refresh_token");
          return jsonResponse({
            access_token: `access-${refreshToken}`,
            refresh_token: `next-${refreshToken}`,
            expires_in: 900,
          });
        },
        async () => {
          const tokens = await getAllAccessTokens(
            {
              connections: [
                {
                  provider: "custom-oauth-task-207",
                  refreshToken: "active-one",
                  isActive: true,
                },
                {
                  provider: "custom-oauth-task-207",
                  refreshToken: "inactive-one",
                  isActive: false,
                },
                {
                  provider: null,
                  refreshToken: "missing-provider",
                  isActive: true,
                },
              ],
            },
            log
          );

          assert.equal(fetchCount, 1);
          assert.deepEqual(tokens, {
            "custom-oauth-task-207": {
              accessToken: "access-active-one",
              refreshToken: "next-active-one",
              expiresIn: 900,
            },
          });
        }
      );
    }
  );
});

test("refreshWithRetry retries to success and clears prior circuit-breaker state", async () => {
  const provider = `retry-success-${Date.now()}`;
  const log = createLog();

  await refreshWithRetry(async () => null, 1, log, provider);
  assert.equal(getCircuitBreakerStatus()[provider].failures, 1);

  await withFastRetryTimers(async () => {
    let attempts = 0;
    const result = await refreshWithRetry(
      async () => {
        attempts += 1;
        return attempts === 2 ? { accessToken: "recovered" } : null;
      },
      3,
      log,
      provider
    );

    assert.deepEqual(result, { accessToken: "recovered" });
    assert.equal(attempts, 2);
    assert.equal(getCircuitBreakerStatus()[provider], undefined);
  });
});

test("refreshWithRetry trips the circuit breaker after repeated failures and blocks new calls", async () => {
  const provider = `retry-blocked-${Date.now()}`;
  const log = createLog();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const result = await refreshWithRetry(async () => null, 1, log, provider);
    assert.equal(result, null);
  }

  assert.equal(isProviderBlocked(provider), true);
  assert.equal(getCircuitBreakerStatus()[provider].blocked, true);

  let called = false;
  const blockedResult = await refreshWithRetry(
    async () => {
      called = true;
      return { accessToken: "should-not-run" };
    },
    1,
    log,
    provider
  );

  assert.equal(blockedResult, null);
  assert.equal(called, false);
});

test("isProviderBlocked clears expired circuit-breaker entries once cooldown passes", async () => {
  const provider = `retry-expiry-${Date.now()}`;
  const log = createLog();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await refreshWithRetry(async () => null, 1, log, provider);
  }

  const blockedUntil = Date.parse(getCircuitBreakerStatus()[provider].blockedUntil);

  await withMockedNow(blockedUntil + 1, async () => {
    assert.equal(isProviderBlocked(provider), false);
    assert.equal(getCircuitBreakerStatus()[provider], undefined);
  });
});
