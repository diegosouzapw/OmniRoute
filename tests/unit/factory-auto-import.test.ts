import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-import-"));
const factoryDir = path.join(home, ".factory");
fs.mkdirSync(factoryDir);
process.env.HOME = home;
process.env.CLI_CONFIG_HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.API_KEY_SECRET = "factory-import-test-secret";
process.env.INITIAL_PASSWORD = "factory-import-test-password";
process.env.JWT_SECRET = "factory-import-test-jwt";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const { encryptPayload } = await import("../../open-sse/services/factory/localCredentials.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providerDb = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/oauth/factory/auto-import/route.ts");

function jwt(claims: Record<string, unknown>): string {
  return `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
}

function request(method: "GET" | "POST", key: string): Request {
  return new Request("http://localhost/api/oauth/factory/auto-import", {
    method,
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    ...(method === "POST" ? { body: "{}" } : {}),
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

test("Factory import verifies org identity before persisting and never returns tokens", async () => {
  await settingsDb.updateSettings({ requireLogin: true });
  const manage = await apiKeysDb.createApiKey("factory-import", "factory-import", ["manage"]);
  const key = Buffer.alloc(32, 19);
  const accessToken = jwt({
    external_org_id: "factory-org-a",
    org_id: "org_workos_a",
    email: "synthetic@example.invalid",
    exp: Math.floor(Date.now() / 1000) + 3600,
  });
  const encrypted = encryptPayload(
    {
      access_token: accessToken,
      refresh_token: "synthetic-rotating-refresh",
      active_organization_id: "org_workos_a",
    },
    key
  );
  assert.ok(encrypted);
  fs.writeFileSync(path.join(factoryDir, "auth.v2.key"), key.toString("base64"), { mode: 0o600 });
  fs.writeFileSync(path.join(factoryDir, "auth.v2.file"), encrypted, { mode: 0o600 });

  const originalFetch = globalThis.fetch;
  const seen: string[] = [];
  const rotatedToken = jwt({
    external_org_id: "factory-org-a",
    org_id: "org_workos_a",
    email: "synthetic@example.invalid",
    exp: Math.floor(Date.now() / 1000) + 5400,
    nonce: "rotated",
  });
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    seen.push(url);
    if (url === "https://api.workos.com/user_management/authenticate") {
      return new Response(
        JSON.stringify({
          access_token: rotatedToken,
          refresh_token: "rotated-local-refresh",
          expires_in: 5400,
        }),
        { headers: { "content-type": "application/json" } }
      );
    }
    if (url === "https://api.factory.ai/api/cli/whoami") {
      return new Response(
        JSON.stringify({ orgId: "factory-org-a", region: "global", userId: "user-a" }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }
    throw new Error(`Unexpected external request: ${url}`);
  };
  try {
    const preview = await route.GET(request("GET", manage.key));
    assert.equal(preview.status, 200);
    const previewBody = await preview.json();
    assert.equal(previewBody.found, true);
    assert.equal(previewBody.orgId, "factory-org-a");
    assert.equal(previewBody.hasRefreshToken, true);
    assert.equal(JSON.stringify(previewBody).includes(accessToken), false);
    assert.equal(JSON.stringify(previewBody).includes("synthetic-rotating-refresh"), false);

    const imported = await route.POST(request("POST", manage.key));
    assert.equal(imported.status, 200);
    const result = await imported.json();
    assert.equal(result.success, true);
    assert.equal(result.connection.provider, "factory");
    assert.equal(JSON.stringify(result).includes(accessToken), false);
    assert.equal(JSON.stringify(result).includes("synthetic-rotating-refresh"), false);
    const stored = await providerDb.getProviderConnectionById(result.connection.id);
    assert.equal(stored?.accessToken, accessToken);
    assert.equal(stored?.providerSpecificData?.orgId, "factory-org-a");
    assert.equal(stored?.providerSpecificData?.workosOrgId, "org_workos_a");
    assert.equal(stored?.providerSpecificData?.isLocalCli, true);
    assert.equal(stored?.providerSpecificData?.factoryLocalSync?.backend, "file");
    assert.deepEqual(seen, [
      "https://api.factory.ai/api/cli/whoami",
      "https://api.factory.ai/api/cli/whoami",
    ]);

    const expiredToken = jwt({
      external_org_id: "factory-org-a",
      org_id: "org_workos_a",
      email: "synthetic@example.invalid",
      exp: Math.floor(Date.now() / 1000) - 120,
    });
    const expiredStore = encryptPayload(
      {
        access_token: expiredToken,
        refresh_token: "expired-local-refresh",
        active_organization_id: "org_workos_a",
      },
      key
    );
    assert.ok(expiredStore);
    fs.writeFileSync(path.join(factoryDir, "auth.v2.file"), expiredStore, { mode: 0o600 });
    const refreshed = await route.POST(
      new Request("http://localhost/api/oauth/factory/auto-import", {
        method: "POST",
        headers: { authorization: `Bearer ${manage.key}`, "content-type": "application/json" },
        body: JSON.stringify({ connectionId: result.connection.id }),
      })
    );
    assert.equal(refreshed.status, 200);
    assert.equal(JSON.stringify(await refreshed.json()).includes(rotatedToken), false);
    assert.equal(
      (await providerDb.getProviderConnectionById(result.connection.id))?.accessToken,
      rotatedToken
    );
    const localAfterRefresh = await (
      await import("../../open-sse/services/factory/localCredentials.ts")
    ).loadFactoryCliCredentials(factoryDir, { readKeychainKey: async () => null });
    assert.equal(localAfterRefresh?.accessToken, rotatedToken);
    assert.equal(localAfterRefresh?.refreshToken, "rotated-local-refresh");

    const foreignToken = jwt({
      external_org_id: "factory-org-other",
      org_id: "org_workos_other",
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
    const foreignStore = encryptPayload(
      {
        access_token: foreignToken,
        refresh_token: "foreign-refresh",
        active_organization_id: "org_workos_other",
      },
      key
    );
    assert.ok(foreignStore);
    fs.writeFileSync(path.join(factoryDir, "auth.v2.file"), foreignStore, { mode: 0o600 });
    const foreignImport = await route.POST(
      new Request("http://localhost/api/oauth/factory/auto-import", {
        method: "POST",
        headers: { authorization: `Bearer ${manage.key}`, "content-type": "application/json" },
        body: JSON.stringify({ connectionId: result.connection.id }),
      })
    );
    assert.equal(foreignImport.status, 400);
    assert.equal(
      (await providerDb.getProviderConnectionById(result.connection.id))?.accessToken,
      rotatedToken
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
