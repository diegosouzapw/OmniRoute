/**
 * Antigravity-family connections default to model auto-sync on (#488).
 *
 * The Antigravity backend ships new models faster than the pinned catalog can
 * be re-frozen by hand (Gemini 3.7 Flash tiers existed upstream while the
 * catalog still stopped at 3.6, leaving /v1/models blind to them). Discovery
 * and the 24h model-sync scheduler already exist — the missing piece was the
 * opt-in trigger. New agy/antigravity connections now ship with
 * providerSpecificData.autoSync = true so live discovery lands in the synced
 * catalog automatically; an explicit operator choice must survive re-import.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type Row = Record<string, unknown>;

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-autosync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { agy } = await import("../../../src/lib/oauth/providers/agy.ts");
const { antigravity } = await import("../../../src/lib/oauth/providers/antigravity.ts");
const providers = { agy, antigravity };
const { createConnectionFromAgyToken } = await import("../../../src/lib/oauth/utils/agyAuthImport.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const core = await import("../../../src/lib/db/core.ts");

const TOKENS = {
  access_token: "agy-access-token-fixture",
  refresh_token: "agy-refresh-token-fixture",
  expires_in: 3600,
  scope: "https://www.googleapis.com/auth/cloud-platform",
};
const POST_EXCHANGE = {
  projectId: "fixture-project",
  tierId: "free_tier",
  userInfo: { email: "fixture@example.com" },
};

function asRecord(value: unknown): Row {
  return value && typeof value === "object" ? (value as Row) : {};
}

function enrichedAuth(overrides: Partial<Row> = {}): Row {
  return {
    accessToken: TOKENS.access_token,
    refreshToken: TOKENS.refresh_token,
    expiresAt: null,
    projectId: null,
    tier: null,
    tokenType: "Bearer",
    authMethod: "consumer",
    ...overrides,
  };
}

async function findRowByEmail(email: string): Promise<Row | undefined> {
  const rows = (await providersDb.getProviderConnections({ provider: "agy" })) as Row[];
  return rows.find((row) => row.email === email);
}

test("agy OAuth mapTokens defaults providerSpecificData.autoSync to true", () => {
  const mapped = providers.agy.mapTokens(TOKENS, POST_EXCHANGE) as Row;
  assert.equal(asRecord(mapped.providerSpecificData).autoSync, true);
  assert.equal(asRecord(mapped.providerSpecificData).clientProfile, "cli");
});

test("antigravity OAuth mapTokens defaults providerSpecificData.autoSync to true", () => {
  const mapped = providers.antigravity.mapTokens(TOKENS, POST_EXCHANGE) as Row;
  assert.equal(asRecord(mapped.providerSpecificData).autoSync, true);
  assert.equal(asRecord(mapped.providerSpecificData).clientProfile, "ide");
});

test("new agy CLI token import persists autoSync: true", async () => {
  core.resetDbInstance();
  const email = "import-autosync@example.com";
  const { connection, created } = await createConnectionFromAgyToken(
    enrichedAuth({ email }) as never,
    {}
  );
  assert.equal(created, true);
  const row = (await providersDb.getProviderConnections({ provider: "agy" })) as Row[];
  const match = row.find((candidate) => candidate.id === (connection as Row).id);
  assert.equal(asRecord(match?.providerSpecificData).autoSync, true);
});

test("re-import keeps an explicit autoSync: false choice", async () => {
  core.resetDbInstance();
  const email = "import-optout@example.com";
  const { connection } = await createConnectionFromAgyToken(enrichedAuth({ email }) as never, {});
  await providersDb.updateProviderConnection(String((connection as Row).id), {
    providerSpecificData: {
      ...asRecord((connection as Row).providerSpecificData),
      autoSync: false,
    },
  });

  const { created } = await createConnectionFromAgyToken(
    enrichedAuth({
      email,
      accessToken: "refreshed-access-token-fixture",
      refreshToken: "refreshed-refresh-token-fixture",
    }) as never,
    { overwriteExisting: true }
  );
  assert.equal(created, false);
  assert.equal(asRecord((await findRowByEmail(email))?.providerSpecificData).autoSync, false);
});

test("re-import enables autoSync when the existing row never had it", async () => {
  core.resetDbInstance();
  const email = "import-legacy@example.com";
  const { connection } = await createConnectionFromAgyToken(enrichedAuth({ email }) as never, {});
  // Simulate a pre-default row: strip autoSync entirely.
  await providersDb.updateProviderConnection(String((connection as Row).id), {
    providerSpecificData: { clientProfile: "cli" },
  });

  await createConnectionFromAgyToken(
    enrichedAuth({
      email,
      accessToken: "refreshed-access-token-fixture",
      refreshToken: "refreshed-refresh-token-fixture",
    }) as never,
    { overwriteExisting: true }
  );

  assert.equal(asRecord((await findRowByEmail(email))?.providerSpecificData).autoSync, true);
});
