/**
 * The dashboard login password must never be storable as a provider API key.
 *
 * A browser autofilling the management password into the API-key field created
 * connections that 401 every request routed through them, and the same autofill
 * fired again while the connection was being repaired by hand. These assert the
 * refusal sits on the write path rather than in any one form.
 */

import { after, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const mgmt = await import("../../src/lib/auth/managementPassword.ts");

const DASHBOARD_PASSWORD = "correct-horse-battery-staple";

/** getStoredManagementPassword reads `settings.password`, holding a bcrypt hash. */
async function storeDashboardPassword(plaintext: string) {
  await settingsDb.updateSettings({ password: await mgmt.hashManagementPassword(plaintext) });
}

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("management password as a provider credential", () => {
  it("create is refused when the apiKey is the dashboard password", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    await assert.rejects(
      () =>
        providersDb.createProviderConnection({
          provider: "openai",
          authType: "apikey",
          name: "autofilled",
          apiKey: DASHBOARD_PASSWORD,
          isActive: true,
        }),
      (err: Error) => {
        assert.equal(err.name, "ManagementPasswordAsCredentialError");
        assert.ok(
          !err.message.includes(DASHBOARD_PASSWORD),
          "the refusal must not echo the password back"
        );
        return true;
      }
    );

    const rows = await providersDb.getProviderConnections({ provider: "openai" });
    assert.equal(rows.length, 0, "nothing may be persisted when the guard fires");
  });

  it("create is refused on surrounding whitespace, which a paste carries", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    await assert.rejects(
      () =>
        providersDb.createProviderConnection({
          provider: "openai",
          authType: "apikey",
          name: "pasted",
          apiKey: `  ${DASHBOARD_PASSWORD}  `,
          isActive: true,
        }),
      /dashboard login password/
    );
  });

  it("a real API key is stored normally", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "genuine",
      apiKey: "sk-a-real-provider-key",
      isActive: true,
    });
    assert.ok(conn?.id);
  });

  it("update is refused too, which is where the repair attempt gets re-infected", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "genuine",
      apiKey: "sk-a-real-provider-key",
      isActive: true,
    });
    assert.ok(conn?.id);

    await assert.rejects(
      () => providersDb.updateProviderConnection(conn.id as string, { apiKey: DASHBOARD_PASSWORD }),
      /dashboard login password/
    );

    const stored = await providersDb.getProviderConnectionById(conn.id as string);
    assert.equal(stored?.apiKey, "sk-a-real-provider-key", "the good key must survive the refusal");
  });

  it("an update that does not carry an apiKey is untouched by the guard", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "before",
      apiKey: "sk-a-real-provider-key",
      isActive: true,
    });
    assert.ok(conn?.id);

    const updated = await providersDb.updateProviderConnection(conn.id as string, {
      name: "after",
    });
    assert.equal(updated?.name, "after");
  });

  it("a connection already holding the password stays editable, so it can be repaired", async () => {
    // Seed the bad state the way the incident produced it: the password was
    // stored before the guard existed. Write it with no dashboard password
    // configured, then configure one.
    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "poisoned",
      apiKey: DASHBOARD_PASSWORD,
      isActive: true,
    });
    assert.ok(conn?.id, "no dashboard password configured yet, so the write goes through");
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    const repaired = await providersDb.updateProviderConnection(conn.id as string, {
      apiKey: "sk-the-actual-key",
    });
    assert.equal(repaired?.apiKey, "sk-the-actual-key");
  });

  it("no dashboard password configured means nothing to collide with", async () => {
    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "fresh install",
      apiKey: DASHBOARD_PASSWORD,
      isActive: true,
    });
    assert.ok(conn?.id);
  });

  it("an OAuth connection carrying no apiKey never reaches the bcrypt round", async () => {
    await storeDashboardPassword(DASHBOARD_PASSWORD);

    const conn = await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "oauth",
      accessToken: DASHBOARD_PASSWORD,
      isActive: true,
    });
    assert.ok(conn?.id, "the guard covers apiKey only; OAuth tokens are not operator-typed");
  });
});
