import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-refresh-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const tokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");
const { PROVIDERS, OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

async function withHttpServer(handler, fn) {
  const server = http.createServer(handler);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");

  try {
    return await fn({
      host: "127.0.0.1",
      port: address.port,
      url: `http://127.0.0.1:${address.port}`,
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

async function withConnectProxyServer(fn, options = {}) {
  const connectRequests = [];
  const server = http.createServer((_req, res) => {
    res.writeHead(501);
    res.end("CONNECT only");
  });

  server.on("connect", (req, clientSocket, head) => {
    connectRequests.push(String(req.url || ""));
    const [host, portText] = String(req.url || "").split(":");
    const targetHost = options.targetHost || host;
    const targetPort = Number(options.targetPort || portText || 80);
    const upstreamSocket = net.connect(targetPort, targetHost, () => {
      clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      if (head && head.length > 0) {
        upstreamSocket.write(head);
      }
      upstreamSocket.pipe(clientSocket);
      clientSocket.pipe(upstreamSocket);
    });

    const closeSockets = () => {
      upstreamSocket.destroy();
      clientSocket.destroy();
    };

    upstreamSocket.on("error", closeSockets);
    clientSocket.on("error", closeSockets);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");

  try {
    return await fn({
      host: "127.0.0.1",
      port: address.port,
      url: `http://127.0.0.1:${address.port}`,
      connectRequests,
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

async function withPatchedProvider(providerId, config, fn) {
  const hadOwnConfig = Object.prototype.hasOwnProperty.call(PROVIDERS, providerId);
  const previousConfig = hadOwnConfig ? PROVIDERS[providerId] : undefined;
  PROVIDERS[providerId] = config;

  try {
    return await fn();
  } finally {
    if (hadOwnConfig) {
      PROVIDERS[providerId] = previousConfig;
    } else {
      delete PROVIDERS[providerId];
    }
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  delete PROVIDERS["custom-oauth-local-608"];
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("token refresh wrapper delegates provider-specific refresh helpers and formatter utilities", async () => {
  PROVIDERS["custom-oauth-local-608"] = {
    refreshUrl: "https://auth.example.com/token",
    clientId: "client-id",
    clientSecret: "client-secret",
  };

  const calls = [];
  await withMockedFetch(
    async (url, options = {}) => {
      calls.push({ url: String(url), options });
      switch (String(url)) {
        case "https://auth.example.com/token":
          return jsonResponse({
            access_token: "generic-access",
            refresh_token: "generic-refresh-next",
            expires_in: 1800,
          });
        case OAUTH_ENDPOINTS.anthropic.token:
          return jsonResponse({
            access_token: "claude-access",
            refresh_token: "claude-refresh-next",
            expires_in: 1200,
          });
        case OAUTH_ENDPOINTS.google.token:
          return jsonResponse({
            access_token: "google-access",
            refresh_token: "google-refresh-next",
            expires_in: 3600,
          });
        case OAUTH_ENDPOINTS.openai.token:
          return jsonResponse({
            access_token: "codex-access",
            refresh_token: "codex-refresh-next",
            expires_in: 2400,
          });
        case OAUTH_ENDPOINTS.github.token:
          return jsonResponse({
            access_token: "github-access",
            refresh_token: "github-refresh-next",
            expires_in: 3000,
          });
        case "https://api.github.com/copilot_internal/v2/token":
          return jsonResponse({
            token: "copilot-access",
            expires_at: 1_700_000_900,
          });
        default:
          throw new Error(`Unexpected URL: ${String(url)}`);
      }
    },
    async () => {
      const generic = await tokenRefresh.refreshAccessToken(
        "custom-oauth-local-608",
        "refresh-generic",
        {}
      );
      const claude = await tokenRefresh.refreshClaudeOAuthToken("refresh-claude");
      const google = await tokenRefresh.refreshGoogleToken(
        "refresh-google",
        "override-client-id",
        "override-client-secret"
      );
      const codex = await tokenRefresh.refreshCodexToken("refresh-codex");
      const qoder = await tokenRefresh.refreshQoderToken("refresh-qoder");
      const github = await tokenRefresh.refreshGitHubToken("refresh-github");
      const copilot = await tokenRefresh.refreshCopilotToken("github-access");
      const access = await tokenRefresh.getAccessToken("github", {
        refreshToken: "refresh-github-direct",
      });
      const alias = await tokenRefresh.refreshTokenByProvider("claude", {
        refreshToken: "refresh-claude-direct",
      });
      const formatted = tokenRefresh.formatProviderCredentials("github", {
        apiKey: "sk-test",
        accessToken: "github-access",
        refreshToken: "refresh-github",
      });
      const allTokens = await tokenRefresh.getAllAccessTokens({
        connections: [{ provider: "github", refreshToken: "refresh-github-all", isActive: true }],
      });

      assert.equal(tokenRefresh.TOKEN_EXPIRY_BUFFER_MS, 5 * 60 * 1000);
      assert.deepEqual(generic, {
        accessToken: "generic-access",
        refreshToken: "generic-refresh-next",
        expiresIn: 1800,
      });
      assert.equal(claude.accessToken, "claude-access");
      assert.equal(google.accessToken, "google-access");
      assert.equal(codex.accessToken, "codex-access");
      assert.equal(qoder, null);
      assert.equal(github.refreshToken, "github-refresh-next");
      assert.equal(copilot.token, "copilot-access");
      assert.equal(access.accessToken, "github-access");
      assert.equal(alias.accessToken, "claude-access");
      assert.deepEqual(formatted, {
        apiKey: "sk-test",
        accessToken: "github-access",
        refreshToken: "refresh-github",
      });
      assert.equal(allTokens.github.accessToken, "github-access");
    }
  );

  assert.equal(calls.length >= 7, true);
  delete PROVIDERS["custom-oauth-local-608"];
});

test("updateProviderCredentials persists rotated tokens and returns false for missing rows", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Refresh Target",
    accessToken: "access-old",
    refreshToken: "refresh-old",
  });

  const updated = await tokenRefresh.updateProviderCredentials((connection as any).id, {
    accessToken: "access-new",
    refreshToken: "refresh-new",
    expiresIn: 600,
    providerSpecificData: { tenant: "team-a" },
  });
  const stored = await providersDb.getProviderConnectionById((connection as any).id);
  const missing = await tokenRefresh.updateProviderCredentials("missing", { accessToken: "nope" });

  assert.equal(updated, true);
  assert.equal(stored.accessToken, "access-new");
  assert.equal(stored.refreshToken, "refresh-new");
  assert.equal(stored.expiresIn, 600);
  assert.equal(typeof stored.expiresAt, "string");
  assert.equal(typeof stored.tokenExpiresAt, "string");
  assert.equal(stored.expiresAt, stored.tokenExpiresAt);
  assert.deepEqual(stored.providerSpecificData, { tenant: "team-a" });
  assert.equal(missing, false);
});

test("OAuth refresh prefers connection proxy over provider proxy", async () => {
  const providerId = "custom-oauth-connection-proxy";
  const refreshRequests = [];

  await withHttpServer(
    (req, res) => {
      refreshRequests.push({ method: req.method, url: req.url });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          access_token: "connection-proxy-access",
          refresh_token: "connection-proxy-refresh",
          expires_in: 1800,
        })
      );
    },
    async (tokenServer) => {
      await withConnectProxyServer(
        async (accountProxy) => {
          await withPatchedProvider(
            providerId,
            {
              tokenUrl: `http://oauth-refresh.example.test:${tokenServer.port}/token`,
              clientId: "connection-proxy-client-id",
              clientSecret: "connection-proxy-client-secret",
            },
            async () => {
              const connection = await providersDb.createProviderConnection({
                provider: providerId,
                authType: "oauth",
                name: "Connection Proxy OAuth",
                accessToken: "old-access",
                refreshToken: "refresh-via-account-proxy",
              });

              try {
                await settingsDb.setProxyForLevel("provider", providerId, {
                  type: "http",
                  host: "provider-proxy.invalid",
                  port: 8080,
                });
                await settingsDb.setProxyForLevel("key", (connection as any).id, {
                  type: "http",
                  host: accountProxy.host,
                  port: accountProxy.port,
                });

                const result = await tokenRefresh.getAccessToken(providerId, {
                  connectionId: (connection as any).id,
                  refreshToken: "refresh-via-account-proxy",
                });

                assert.equal(result.accessToken, "connection-proxy-access");
                assert.equal(refreshRequests.length, 1);
                assert.deepEqual(refreshRequests[0], { method: "POST", url: "/token" });
                assert.deepEqual(accountProxy.connectRequests, [
                  `oauth-refresh.example.test:${tokenServer.port}`,
                ]);
              } finally {
                await settingsDb.deleteProxyForLevel("provider", providerId);
                await settingsDb.deleteProxyForLevel("key", (connection as any).id);
              }
            }
          );
        },
        { targetHost: tokenServer.host, targetPort: tokenServer.port }
      );
    }
  );
});

test("provider-specific refresh helper accepts connection proxy context", async () => {
  const refreshRequests = [];

  await withHttpServer(
    (req, res) => {
      refreshRequests.push({ method: req.method, url: req.url });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          access_token: "claude-connection-proxy-access",
          refresh_token: "claude-connection-proxy-refresh",
          expires_in: 1200,
        })
      );
    },
    async (tokenServer) => {
      await withConnectProxyServer(async (accountProxy) => {
        const originalAnthropicTokenUrl = OAUTH_ENDPOINTS.anthropic.token;
        OAUTH_ENDPOINTS.anthropic.token = `${tokenServer.url}/token`;
        let connectionId: string | undefined;
        try {
          const connection = await providersDb.createProviderConnection({
            provider: "claude",
            authType: "oauth",
            name: "Claude Connection Proxy OAuth",
            accessToken: "old-access",
            refreshToken: "refresh-claude-via-account-proxy",
          });
          connectionId = (connection as any).id;

          await settingsDb.setProxyForLevel("key", connectionId, {
            type: "http",
            host: accountProxy.host,
            port: accountProxy.port,
          });

          const result = await tokenRefresh.refreshClaudeOAuthToken(
            "refresh-claude-via-account-proxy",
            { connectionId }
          );

          assert.equal(result.accessToken, "claude-connection-proxy-access");
          assert.equal(refreshRequests.length, 1);
          assert.deepEqual(refreshRequests[0], { method: "POST", url: "/token" });
        } finally {
          if (connectionId) {
            await settingsDb.deleteProxyForLevel("key", connectionId);
          }
          OAUTH_ENDPOINTS.anthropic.token = originalAnthropicTokenUrl;
        }
      });
    }
  );
});

test("checkAndRefreshToken refreshes expiring OAuth access tokens and updates the connection", async () => {
  const now = 1_700_000_000_000;
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Claude OAuth",
    accessToken: "claude-old-access",
    refreshToken: "claude-refresh-old",
    expiresAt: new Date(now + tokenRefresh.TOKEN_EXPIRY_BUFFER_MS - 1_000).toISOString(),
  });

  await withMockedNow(now, async () => {
    await withMockedFetch(
      async (url) => {
        assert.equal(String(url), OAUTH_ENDPOINTS.anthropic.token);
        return jsonResponse({
          access_token: "claude-access-fresh",
          refresh_token: "claude-refresh-fresh",
          expires_in: 900,
        });
      },
      async () => {
        const refreshed = await tokenRefresh.checkAndRefreshToken("claude", {
          ...connection,
          connectionId: connection.id,
        });
        const stored = await providersDb.getProviderConnectionById((connection as any).id);

        assert.equal(refreshed.accessToken, "claude-access-fresh");
        assert.equal(refreshed.refreshToken, "claude-refresh-fresh");
        assert.equal(stored.accessToken, "claude-access-fresh");
        assert.equal(stored.refreshToken, "claude-refresh-fresh");
        assert.equal(stored.expiresIn, 900);
        assert.equal(typeof stored.expiresAt, "string");
      }
    );
  });
});

test("checkAndRefreshToken refreshes expiring GitHub copilot tokens and syncs the top-level token", async () => {
  const now = 1_700_000_100_000;
  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "GitHub OAuth",
    accessToken: "github-access-old",
    refreshToken: "github-refresh-old",
    expiresAt: new Date(now + tokenRefresh.TOKEN_EXPIRY_BUFFER_MS + 60_000).toISOString(),
    providerSpecificData: {
      copilotToken: "copilot-old",
      copilotTokenExpiresAt: Math.floor((now + tokenRefresh.TOKEN_EXPIRY_BUFFER_MS - 1_000) / 1000),
    },
  });

  await withMockedNow(now, async () => {
    await withMockedFetch(
      async (url, options = {}) => {
        assert.equal(String(url), "https://api.github.com/copilot_internal/v2/token");
        assert.equal(options.headers.Authorization, "token github-access-old");
        return jsonResponse({
          token: "copilot-fresh",
          expires_at: 1_700_001_000,
        });
      },
      async () => {
        const refreshed = await tokenRefresh.checkAndRefreshToken("github", {
          ...connection,
          connectionId: connection.id,
        });
        const stored = await providersDb.getProviderConnectionById((connection as any).id);

        assert.equal(refreshed.copilotToken, "copilot-fresh");
        assert.equal(refreshed.providerSpecificData.copilotToken, "copilot-fresh");
        assert.equal((stored as any).providerSpecificData.copilotToken, "copilot-fresh");
        assert.equal((stored as any).providerSpecificData.copilotTokenExpiresAt, 1_700_001_000);
      }
    );
  });
});

test("refreshGitHubAndCopilotTokens composes GitHub and Copilot refresh responses", async () => {
  await withMockedFetch(
    async (url) => {
      if (String(url) === OAUTH_ENDPOINTS.github.token) {
        return jsonResponse({
          access_token: "github-composed-access",
          refresh_token: "github-composed-refresh",
          expires_in: 1800,
        });
      }

      assert.equal(String(url), "https://api.github.com/copilot_internal/v2/token");
      return jsonResponse({
        token: "copilot-composed",
        expires_at: 1_700_001_500,
      });
    },
    async () => {
      const refreshed = await tokenRefresh.refreshGitHubAndCopilotTokens({
        refreshToken: "github-compose-refresh",
      });

      assert.deepEqual(refreshed, {
        accessToken: "github-composed-access",
        refreshToken: "github-composed-refresh",
        expiresIn: 1800,
        providerSpecificData: {
          copilotToken: "copilot-composed",
          copilotTokenExpiresAt: 1_700_001_500,
        },
      });
    }
  );
});

test("checkAndRefreshToken leaves credentials untouched when nothing is close to expiry", async () => {
  const now = 1_700_000_200_000;
  const credentials = {
    connectionId: "conn-stable",
    accessToken: "stable-access",
    refreshToken: "stable-refresh",
    expiresAt: new Date(now + tokenRefresh.TOKEN_EXPIRY_BUFFER_MS + 60_000).toISOString(),
    providerSpecificData: {
      copilotToken: "copilot-stable",
      copilotTokenExpiresAt: Math.floor(
        (now + tokenRefresh.TOKEN_EXPIRY_BUFFER_MS + 60_000) / 1000
      ),
    },
  };

  await withMockedNow(now, async () => {
    await withMockedFetch(
      async () => {
        throw new Error("fetch should not be called");
      },
      async () => {
        const refreshed = await tokenRefresh.checkAndRefreshToken("github", credentials);
        assert.deepEqual(refreshed, credentials);
      }
    );
  });
});

test("refreshGitHubAndCopilotTokens returns refreshed GitHub credentials when Copilot refresh fails", async () => {
  await withMockedFetch(
    async (url) => {
      if (String(url) === OAUTH_ENDPOINTS.github.token) {
        return jsonResponse({
          access_token: "github-only-access",
          refresh_token: "github-only-refresh",
          expires_in: 1200,
        });
      }

      assert.equal(String(url), "https://api.github.com/copilot_internal/v2/token");
      return new Response("copilot unavailable", { status: 503 });
    },
    async () => {
      const refreshed = await tokenRefresh.refreshGitHubAndCopilotTokens({
        refreshToken: "github-refresh-only",
      });

      assert.deepEqual(refreshed, {
        accessToken: "github-only-access",
        refreshToken: "github-only-refresh",
        expiresIn: 1200,
      });
    }
  );
});
