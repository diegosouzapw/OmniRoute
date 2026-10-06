import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-limits-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-provider-limits-proxy-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function withMockedFetch(fetchImpl: typeof fetch, fn: () => Promise<void>) {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    await fn();
  } finally {
    globalThis.fetch = previousFetch;
  }
}

async function createClaudeOAuthConnection() {
  return providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Claude Provider Limits ${Date.now()} ${Math.random()}`,
    email: `claude-${Date.now()}-${Math.random()}@example.test`,
    accessToken: "claude-access-token",
    refreshToken: "claude-refresh-token",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
}

function claudeUsageResponse() {
  return new Response(
    JSON.stringify({
      tier: "pro",
      five_hour: {
        utilization: 25,
        resets_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
      seven_day: {
        utilization: 50,
        resets_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function claudeBootstrapResponse() {
  return new Response(
    JSON.stringify({
      oauth_account: {
        account_uuid: "account-uuid-test",
        account_email: "claude@example.test",
        organization_uuid: "org-uuid-test",
        organization_name: "Test Org",
        organization_type: "pro",
        organization_rate_limit_tier: "pro",
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Claude provider limits fail closed when an account proxy is unreachable", async () => {
  const connection = await createClaudeOAuthConnection();
  const connectionId = (connection as any).id;
  const directFetchUrls: string[] = [];

  await settingsDb.setProxyForLevel("key", connectionId, {
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });

  await withMockedFetch(
    (async (url) => {
      directFetchUrls.push(String(url));
      // #9100: the reachability probe is NON-BLOCKING — dispatch is optimistic and
      // the probe aborts the request only while it is still in flight (same shape
      // as t14-proxy-fast-fail). The mock must therefore stay pending: an instant
      // response would win the race and the fast-fail would never be observable.
      // Never resolved on purpose — the aborted continuation must NOT proceed to a
      // real (unmocked) fetch after this block restores globalThis.fetch.
      await new Promise(() => {});
      return claudeUsageResponse();
    }) as typeof fetch,
    async () => {
      await assert.rejects(
        () => providerLimits.fetchAndPersistProviderLimits(connectionId, "manual"),
        /Proxy unreachable|fetch failed|ECONNREFUSED|UND_ERR_CONNECT_TIMEOUT/i
      );
      // The fail-closed proof is twofold: (1) the rejection above settled at all —
      // a direct retry would await the hung mock and never reject; (2) nothing
      // egresses AFTER the fast-fail. The in-flight count itself may be >1: the
      // Claude flow dispatches bootstrap + oauth/usage concurrently, and both are
      // optimistic pre-abort attempts, not retries.
      const urlsAtRejection = directFetchUrls.length;
      await new Promise((resolve) => setTimeout(resolve, 50));
      assert.equal(
        directFetchUrls.length,
        urlsAtRejection,
        "account-proxied Claude usage must not egress anything after the fast-fail"
      );
    }
  );
});

test("non-Claude OAuth provider limits fail closed when an account proxy is unreachable", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: `GitHub Provider Limits ${Date.now()} ${Math.random()}`,
    email: `github-${Date.now()}-${Math.random()}@example.test`,
    accessToken: "github-access-token",
    refreshToken: "github-refresh-token",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
  const connectionId = (connection as any).id;
  const directFetchUrls: string[] = [];

  await settingsDb.setProxyForLevel("key", connectionId, {
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });

  await withMockedFetch(
    (async (url) => {
      directFetchUrls.push(String(url));
      // #9100: non-blocking probe — keep the request in flight so the fast-fail
      // can abort it (see the Claude case above for the full rationale).
      await new Promise(() => {});
      return new Response(
        JSON.stringify({
          copilot_plan: "free",
          monthly_quotas: { chat: 500 },
          limited_user_quotas: { chat: 500 },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }) as typeof fetch,
    async () => {
      await assert.rejects(
        () => providerLimits.fetchAndPersistProviderLimits(connectionId, "manual"),
        /Proxy unreachable|fetch failed|ECONNREFUSED|UND_ERR_CONNECT_TIMEOUT/i
      );
    }
  );

  assert.ok(
    directFetchUrls.length <= 1,
    "at most the single optimistic in-flight attempt — account-proxied OAuth usage must never retry direct after the fast-fail"
  );
});

test("Claude provider limits preserve direct retry for non-account proxy failures", async () => {
  const connection = await createClaudeOAuthConnection();
  const connectionId = (connection as any).id;
  const directFetchUrls: string[] = [];

  await settingsDb.setProxyForLevel("provider", "claude", {
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });

  await withMockedFetch(
    (async (url) => {
      const urlText = String(url);
      directFetchUrls.push(urlText);
      if (urlText.includes("/api/claude_cli/bootstrap")) {
        return claudeBootstrapResponse();
      }
      if (urlText.includes("/api/oauth/usage")) {
        return claudeUsageResponse();
      }
      throw new Error(`Unexpected direct fetch: ${urlText}`);
    }) as typeof fetch,
    async () => {
      const result = await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
      assert.equal(result.connection.id, connectionId);
      assert.ok(result.usage.quotas);
      assert.equal(result.cache.source, "manual");
    }
  );

  assert.equal(
    directFetchUrls.some((url) => url.includes("/api/oauth/usage")),
    true,
    "provider-level proxy failures should retain the existing direct retry behavior"
  );
});
