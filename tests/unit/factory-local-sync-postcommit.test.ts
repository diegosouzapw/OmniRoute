import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-postcommit-"));
const directory = path.join(home, ".factory");
fs.mkdirSync(directory);
process.env.HOME = home;
process.env.CLI_CONFIG_HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.API_KEY_SECRET = "factory-postcommit-secret";

const { buildFactoryLocalSyncMarker, encryptPayload, loadFactoryCliCredentials } =
  await import("../../open-sse/services/factory/localCredentials.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");
const { syncFactoryCliSessionAfterPersist } =
  await import("../../src/lib/oauth/factoryLocalSync.ts");
const { getProviderConnectionById, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

test("Factory writes a rotated session only after the matching DB generation commits", async () => {
  const key = Buffer.alloc(32, 31);
  fs.writeFileSync(path.join(directory, "auth.v2.key"), key.toString("base64"), { mode: 0o600 });
  const storePath = path.join(directory, "auth.v2.file");
  const original = encryptPayload(
    {
      access_token: "before-access",
      refresh_token: "before-refresh",
      active_organization_id: "org_factory_a",
      extra: "keep",
    },
    key
  );
  assert.ok(original);
  fs.writeFileSync(storePath, original, { mode: 0o600 });

  const conn = await persistOAuthConnection("factory", {
    accessToken: "before-access",
    refreshToken: "before-refresh",
    email: "synthetic@example.invalid",
    expiresIn: 3600,
    providerSpecificData: {
      orgId: "org_factory_a",
      workosOrgId: "org_factory_a",
      isLocalCli: true,
      factoryLocalSync: buildFactoryLocalSyncMarker(
        "file",
        "auth.v2.file",
        "before-access",
        "before-refresh"
      ),
    },
  });
  const credentials = {
    connectionId: conn.id,
    accessToken: "before-access",
    refreshToken: "before-refresh",
    providerSpecificData: { isLocalCli: true },
  };
  const rotated = { accessToken: "after-access", refreshToken: "after-refresh" };
  await syncFactoryCliSessionAfterPersist(credentials, rotated);
  assert.equal(
    fs.readFileSync(storePath, "utf8"),
    original,
    "uncommitted tokens must not reach the CLI"
  );

  await updateProviderConnection(conn.id, rotated);
  await syncFactoryCliSessionAfterPersist(credentials, rotated);
  const read = await loadFactoryCliCredentials(directory, { readKeychainKey: async () => null });
  assert.equal(read?.accessToken, "after-access");
  assert.equal(read?.refreshToken, "after-refresh");
  assert.equal(read?.rawPayload?.extra, "keep");
  const committed = await getProviderConnectionById(conn.id);
  assert.equal(
    committed?.providerSpecificData?.factoryLocalSync?.tokenFingerprint,
    buildFactoryLocalSyncMarker("file", "auth.v2.file", "after-access", "after-refresh")
      .tokenFingerprint
  );

  const beforeStale = fs.readFileSync(storePath);
  await syncFactoryCliSessionAfterPersist(credentials, {
    accessToken: "stale-access",
    refreshToken: "stale-refresh",
  });
  assert.deepEqual(
    fs.readFileSync(storePath),
    beforeStale,
    "a superseded result must not overwrite the CLI store"
  );
});
