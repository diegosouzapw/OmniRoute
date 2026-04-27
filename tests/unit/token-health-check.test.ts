import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-healthcheck-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

async function withConnectProxyServer(fn) {
  const server = http.createServer((_req, res) => {
    res.writeHead(501);
    res.end("CONNECT only");
  });

  server.on("connect", (req, clientSocket, head) => {
    const [host, portText] = String(req.url || "").split(":");
    const targetPort = Number(portText || 80);
    const upstreamSocket = net.connect(targetPort, host, () => {
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

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("extractResolvedProxyConfig unwraps proxy resolution metadata", () => {
  const proxy = {
    type: "http",
    host: "proxy.example.test",
    port: 8080,
  };

  assert.deepEqual(
    tokenHealthCheck.extractResolvedProxyConfig({
      proxy,
      level: "account",
      levelId: "conn-123",
      source: "registry",
    }),
    proxy
  );
  assert.deepEqual(tokenHealthCheck.extractResolvedProxyConfig(proxy), proxy);
  assert.equal(
    tokenHealthCheck.extractResolvedProxyConfig({
      proxy: null,
      level: "direct",
    }),
    null
  );
  assert.equal(tokenHealthCheck.extractResolvedProxyConfig(null), null);
});

test("buildRefreshFailureUpdate keeps active connections routable after refresh failure", () => {
  const now = "2026-04-09T04:40:00.000Z";

  const update = tokenHealthCheck.buildRefreshFailureUpdate(
    {
      testStatus: "active",
      expiredRetryCount: 2,
    },
    now
  );

  assert.equal(update.testStatus, "active");
  assert.equal(update.lastError, "Health check: token refresh failed");
  assert.equal(update.lastErrorType, "token_refresh_failed");
  assert.equal(update.lastErrorSource, "oauth");
  assert.equal(update.errorCode, "refresh_failed");
  assert.equal(update.lastHealthCheckAt, now);
  assert.equal("expiredRetryCount" in update, false);
  assert.equal("expiredRetryAt" in update, false);
});

test("buildRefreshFailureUpdate preserves expired retry tracking", () => {
  const now = "2026-04-09T04:41:00.000Z";

  const update = tokenHealthCheck.buildRefreshFailureUpdate(
    {
      testStatus: "expired",
      expiredRetryCount: 2,
    },
    now
  );

  assert.equal(update.testStatus, "expired");
  assert.equal(update.expiredRetryCount, 3);
  assert.equal(update.expiredRetryAt, now);
});

test("checkConnection uses the resolved proxy payload when refreshing tokens", async () => {
  await resetStorage();

  const providerId = "custom-oauth-healthcheck";
  const refreshRequests = [];

  await withHttpServer(
    (req, res) => {
      let body = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        refreshRequests.push({
          method: req.method,
          url: req.url,
          headers: req.headers,
          body,
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            access_token: "new-access-token",
            refresh_token: "new-refresh-token",
            expires_in: 3600,
          })
        );
      });
    },
    async (tokenServer) => {
      await withConnectProxyServer(async (proxy) => {
        await withPatchedProvider(
          providerId,
          {
            tokenUrl: `${tokenServer.url}/token`,
            clientId: "healthcheck-client-id",
            clientSecret: "healthcheck-client-secret",
          },
          async () => {
            const connection = await providersDb.createProviderConnection({
              provider: providerId,
              authType: "oauth",
              name: "Healthcheck Proxy Account",
              email: "healthcheck@example.com",
              accessToken: "stale-access-token",
              refreshToken: "refresh-token-123",
              isActive: true,
            });

            await settingsDb.setProxyForLevel("key", (connection as any).id, {
              type: "http",
              host: proxy.host,
              port: proxy.port,
            });

            await tokenHealthCheck.checkConnection(connection);

            const updated = await providersDb.getProviderConnectionById((connection as any).id);

            assert.equal(refreshRequests.length, 1);
            assert.equal(refreshRequests[0].method, "POST");
            assert.equal(refreshRequests[0].url, "/token");
            assert.match(refreshRequests[0].body, /grant_type=refresh_token/);
            assert.match(refreshRequests[0].body, /refresh_token=refresh-token-123/);
            assert.equal(updated?.accessToken, "new-access-token");
            assert.equal(updated?.refreshToken, "new-refresh-token");
            assert.equal(updated?.testStatus, "active");
            assert.equal(updated?.lastError ?? null, null);
            assert.ok(updated?.tokenExpiresAt);
            assert.ok(updated?.expiresAt);
            assert.equal(updated?.expiresAt, updated?.tokenExpiresAt);
          }
        );
      });
    }
  );
});

test("checkConnection uses the latest stored refresh token instead of a stale sweep snapshot", async () => {
  await resetStorage();

  const providerId = "custom-oauth-stale-snapshot";
  const refreshRequests: string[] = [];

  await withHttpServer(
    (req, res) => {
      let body = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        refreshRequests.push(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            access_token: "snapshot-access-next",
            refresh_token: "snapshot-refresh-next",
            expires_in: 3600,
          })
        );
      });
    },
    async (tokenServer) => {
      await withPatchedProvider(
        providerId,
        {
          tokenUrl: `${tokenServer.url}/token`,
          clientId: "snapshot-client-id",
          clientSecret: "snapshot-client-secret",
        },
        async () => {
          const connection = await providersDb.createProviderConnection({
            provider: providerId,
            authType: "oauth",
            name: "Snapshot Account",
            email: "snapshot@example.com",
            accessToken: "snapshot-access-old",
            refreshToken: "snapshot-refresh-old",
            isActive: true,
          });

          const staleCheckTime = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
          await providersDb.updateProviderConnection((connection as any).id, {
            refreshToken: "snapshot-refresh-current",
            lastHealthCheckAt: staleCheckTime,
          });

          await tokenHealthCheck.checkConnection(connection);

          const updated = await providersDb.getProviderConnectionById((connection as any).id);
          assert.equal(refreshRequests.length, 1);
          assert.match(refreshRequests[0], /refresh_token=snapshot-refresh-current/);
          assert.equal(updated?.refreshToken, "snapshot-refresh-next");
          assert.equal(updated?.accessToken, "snapshot-access-next");
        }
      );
    }
  );
});

test("checkConnection skips interval refresh when token expiry is known and still far away", async () => {
  await resetStorage();

  const providerId = "custom-oauth-known-expiry";
  let refreshCount = 0;

  await withHttpServer(
    (_req, res) => {
      refreshCount += 1;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          access_token: "should-not-refresh",
          refresh_token: "should-not-refresh",
          expires_in: 3600,
        })
      );
    },
    async (tokenServer) => {
      await withPatchedProvider(
        providerId,
        {
          tokenUrl: `${tokenServer.url}/token`,
          clientId: "known-expiry-client-id",
          clientSecret: "known-expiry-client-secret",
        },
        async () => {
          const connection = await providersDb.createProviderConnection({
            provider: providerId,
            authType: "oauth",
            name: "Known Expiry Account",
            email: "known-expiry@example.com",
            accessToken: "known-expiry-access",
            refreshToken: "known-expiry-refresh",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
          });

          const staleCheckTime = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
          await providersDb.updateProviderConnection((connection as any).id, {
            lastHealthCheckAt: staleCheckTime,
          });

          await tokenHealthCheck.checkConnection(connection);

          const updated = await providersDb.getProviderConnectionById((connection as any).id);
          assert.equal(refreshCount, 0);
          assert.equal(updated?.accessToken, "known-expiry-access");
          assert.equal(updated?.refreshToken, "known-expiry-refresh");
          assert.equal(updated?.lastHealthCheckAt, staleCheckTime);
        }
      );
    }
  );
});
