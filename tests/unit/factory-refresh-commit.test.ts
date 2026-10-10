import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-refresh-"));
const directory = path.join(home, ".factory");
fs.mkdirSync(directory);
process.env.HOME = home;
process.env.CLI_CONFIG_HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.API_KEY_SECRET = "factory-refresh-test-secret";

const { encryptPayload, loadFactoryCliCredentials, buildFactoryLocalSyncMarker } =
  await import("../../open-sse/services/factory/localCredentials.ts");
const { getAccessToken } = await import("../../open-sse/services/tokenRefresh.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");
const { getProviderConnectionById, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

function jwt(exp: number): string {
  return `e30.${Buffer.from(
    JSON.stringify({
      external_org_id: "factory-org-a",
      org_id: "org_workos_a",
      email: "synthetic@example.invalid",
      exp,
    })
  ).toString("base64url")}.signature`;
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

test("Factory concurrent refreshes share one rotation and sync only the committed generation", async () => {
  const key = Buffer.alloc(32, 22);
  const oldToken = jwt(Math.floor(Date.now() / 1000) - 300);
  const nextToken = jwt(Math.floor(Date.now() / 1000) + 3600);
  const before = encryptPayload(
    {
      access_token: oldToken,
      refresh_token: "original-refresh",
      active_organization_id: "org_workos_a",
    },
    key
  );
  assert.ok(before);
  fs.writeFileSync(path.join(directory, "auth.v2.key"), key.toString("base64"), { mode: 0o600 });
  fs.writeFileSync(path.join(directory, "auth.v2.file"), before, { mode: 0o600 });

  const connection = await persistOAuthConnection("factory", {
    accessToken: oldToken,
    refreshToken: "original-refresh",
    expiresIn: 1,
    email: "synthetic@example.invalid",
    providerSpecificData: {
      orgId: "factory-org-a",
      workosOrgId: "org_workos_a",
      isLocalCli: true,
      factoryLocalSync: buildFactoryLocalSyncMarker(
        "file",
        "auth.v2.file",
        oldToken,
        "original-refresh"
      ),
    },
  });
  const credentials = {
    connectionId: connection.id,
    accessToken: oldToken,
    refreshToken: "original-refresh",
    providerSpecificData: connection.providerSpecificData,
  };
  let workosCalls = 0;
  let commits = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === "https://api.workos.com/user_management/authenticate") {
      workosCalls++;
      return new Response(
        JSON.stringify({
          access_token: nextToken,
          refresh_token: "rotated-refresh",
          expires_in: 3600,
        }),
        { headers: { "content-type": "application/json" } }
      );
    }
    if (url === "https://api.factory.ai/api/cli/whoami") {
      return new Response(JSON.stringify({ orgId: "factory-org-a", region: "global" }), {
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected external request: ${url}`);
  };
  const logger = { info() {}, warn() {}, error() {} };
  try {
    const persist = async (result: Record<string, unknown>) => {
      const saved = await updateProviderConnection(
        connection.id,
        {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresAt: result.expiresAt,
          tokenExpiresAt: result.expiresAt,
          providerSpecificData: result.providerSpecificData,
        },
        { mergeProviderSpecificData: true }
      );
      assert.ok(saved);
      commits++;
    };
    const [first, second] = await Promise.all([
      getAccessToken("factory", credentials, logger, null, persist),
      getAccessToken("factory", credentials, logger, null, persist),
    ]);
    assert.equal(first?.accessToken, nextToken);
    assert.equal(second?.accessToken, nextToken);
    assert.equal(workosCalls, 1);
    assert.equal(commits, 1);
    assert.equal((await getProviderConnectionById(connection.id))?.refreshToken, "rotated-refresh");
    const local = await loadFactoryCliCredentials(directory, { readKeychainKey: async () => null });
    assert.equal(local?.accessToken, nextToken);
    assert.equal(local?.refreshToken, "rotated-refresh");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Factory rejects a rotated token for another organization before persistence", async () => {
  const { refreshFactoryToken } =
    await import("../../open-sse/services/tokenRefresh/providers/factory.ts");
  const originalFetch = globalThis.fetch;
  let whoamiCalls = 0;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === "https://api.workos.com/user_management/authenticate") {
      return new Response(
        JSON.stringify({
          access_token: `e30.${Buffer.from(JSON.stringify({ external_org_id: "factory-org-b", org_id: "org_workos_b", exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url")}.sig`,
          refresh_token: "rotated-wrong-org",
          expires_in: 3600,
        }),
        { headers: { "content-type": "application/json" } }
      );
    }
    whoamiCalls++;
    throw new Error(`Unexpected request: ${url}`);
  };
  try {
    const result = await refreshFactoryToken("original-wrong-org", {
      providerSpecificData: { orgId: "factory-org-a", workosOrgId: "org_workos_a" },
    });
    assert.deepEqual(result, {
      error: "unrecoverable_refresh_error",
      code: "organization_mismatch",
    });
    assert.equal(whoamiCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Factory retains a rotated grant when whoami returns an invalid region", async () => {
  const { refreshFactoryToken } =
    await import("../../open-sse/services/tokenRefresh/providers/factory.ts");
  const originalFetch = globalThis.fetch;
  let exchanges = 0;
  let whoamiCalls = 0;
  const accessToken = jwt(Math.floor(Date.now() / 1000) + 3600);
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === "https://api.workos.com/user_management/authenticate") {
      exchanges++;
      return new Response(
        JSON.stringify({
          access_token: accessToken,
          refresh_token: "rotated-region-refresh",
          expires_in: 3600,
        }),
        { headers: { "content-type": "application/json" } }
      );
    }
    if (url === "https://api.factory.ai/api/cli/whoami") {
      whoamiCalls++;
      return new Response(
        JSON.stringify({
          orgId: "factory-org-a",
          region: whoamiCalls === 1 ? "https://untrusted.example" : "global",
        }),
        { headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected request: ${url}`);
  };
  try {
    const credentials = {
      providerSpecificData: { orgId: "factory-org-a", workosOrgId: "org_workos_a" },
    };
    const first = await refreshFactoryToken("original-region-refresh", credentials);
    assert.equal(first, null);
    const second = await refreshFactoryToken("original-region-refresh", credentials);
    assert.equal(second?.accessToken, accessToken);
    assert.equal(second?.refreshToken, "rotated-region-refresh");
    assert.equal(exchanges, 1, "the consumed WorkOS refresh token must not be redeemed twice");
    assert.equal(whoamiCalls, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
