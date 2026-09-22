/**
 * Muse Code subscription OAuth integration: device completion tail →
 * persistence → reload → discovery/execution URL and headers → reconnect →
 * disconnect, with credential-redaction assertions throughout.
 *
 * Upstream Meta traffic is stubbed; SQLite runs isolated per test file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-oauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");
const { museCode } = await import("../../src/lib/oauth/providers/muse-code.ts");
const { buildProviderHeaders, buildProviderUrl } =
  await import("../../open-sse/services/provider.ts");

const originalFetch = globalThis.fetch;

const FAKE_ACCOUNT_TOKEN = ["test-device-account-token-", "x".repeat(12)].join("");
const FAKE_API_KEY = ["test-subscription-inference-key-", "y".repeat(12)].join("");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function completeLogin(
  accountId: string,
  apiKey: string = FAKE_API_KEY
): Promise<Record<string, unknown>> {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ api_key: apiKey, user_id: accountId, is_subs_active: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof globalThis.fetch;
  const extra = await museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN });
  return museCode.mapTokens({ access_token: FAKE_ACCOUNT_TOKEN }, extra) as Record<string, unknown>;
}

test("login tail persists a usable subscription connection without the device token", async () => {
  const tokens = await completeLogin("user-123", FAKE_API_KEY);
  const created = (await persistOAuthConnection("muse-code", tokens)) as { id: string };

  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<
    Record<string, unknown>
  >;
  assert.equal(rows.length, 1);
  const row = rows[0] as Record<string, unknown>;
  assert.equal(row.id, created.id);
  assert.equal(row.accessToken, FAKE_API_KEY);
  assert.equal(row.authType, "oauth");

  // Redaction: the device (account) token must appear nowhere in the row.
  const serialized = JSON.stringify(row);
  assert.ok(!serialized.includes(FAKE_ACCOUNT_TOKEN), "device token persisted");
  assert.ok(!Object.keys(row).includes("accountToken"), "accountToken field persisted");
});

test("reloaded connection drives the Responses endpoint with the subscription key", async () => {
  const tokens = await completeLogin("user-123", FAKE_API_KEY);
  await persistOAuthConnection("muse-code", tokens);
  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<
    Record<string, unknown>
  >;
  const credentials = {
    accessToken: rows[0].accessToken,
    providerSpecificData: {},
  };

  assert.equal(
    buildProviderUrl("muse-code", "muse-spark-1.3-contributor", true, {}),
    "https://api.meta.ai/v1/responses"
  );
  const headers = buildProviderHeaders("muse-code", credentials, true) as Record<string, string>;
  assert.equal(headers.Authorization, `Bearer ${FAKE_API_KEY}`);
});

test("reconnect replaces the key in place instead of duplicating the connection", async () => {
  const first = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-123", FAKE_API_KEY)
  )) as { id: string };
  const rotatedKey = `${FAKE_API_KEY}-rotated`;
  const second = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-123", rotatedKey)
  )) as { id: string };

  assert.equal(second.id, first.id, "reconnect must update the same row");
  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<
    Record<string, unknown>
  >;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, rotatedKey);
  assert.ok(!JSON.stringify(rows[0]).includes(FAKE_ACCOUNT_TOKEN));
});

test("a distinct subscription account gets its own connection", async () => {
  const first = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-123", FAKE_API_KEY)
  )) as { id: string };
  const second = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-456", `${FAKE_API_KEY}-other`)
  )) as { id: string };

  assert.notEqual(second.id, first.id);
  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<
    Record<string, unknown>
  >;
  assert.equal(rows.length, 2);
});

test("disconnect removes the subscription connection", async () => {
  const created = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-123", FAKE_API_KEY)
  )) as { id: string };
  const { deleteProviderConnections } = providersDb as unknown as {
    deleteProviderConnections: (ids: string[]) => Promise<unknown>;
  };
  await deleteProviderConnections([created.id]);
  const rows = await providersDb.getProviderConnections({ provider: "muse-code" });
  assert.equal(rows.length, 0);
});

test("credential survives a storage reopen (restart) without the device token", async () => {
  const created = (await persistOAuthConnection(
    "muse-code",
    await completeLogin("user-123", FAKE_API_KEY)
  )) as { id: string };
  // Simulate an application restart: drop all handles, reopen the same files.
  core.resetDbInstance();
  const rows = (await providersDb.getProviderConnections({ provider: "muse-code" })) as Array<
    Record<string, unknown>
  >;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, created.id);
  assert.equal(rows[0].accessToken, FAKE_API_KEY);
  assert.ok(!JSON.stringify(rows[0]).includes(FAKE_ACCOUNT_TOKEN));
});
