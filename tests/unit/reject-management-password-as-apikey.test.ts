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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

  it("a password that carries its own whitespace is caught too", async () => {
    // Neither the login route nor the set-password route trims, so this is a
    // password an operator can really have. Comparing only the trimmed value
    // would miss it and store the password the guard exists to reject.
    const padded = `  ${DASHBOARD_PASSWORD}  `;
    await storeDashboardPassword(padded);

    await assert.rejects(
      () =>
        providersDb.createProviderConnection({
          provider: "openai",
          authType: "apikey",
          name: "autofilled",
          apiKey: padded,
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
    // Storing a hash bcrypt cannot parse turns the expensive path into an
    // observable one: reaching it throws and the catch logs. Silence is then
    // proof the guard returned before touching settings at all, which is what
    // keeps a token renewal -- a write that carries tokens but no apiKey --
    // from paying for a database read and a bcrypt round on every renewal.
    await settingsDb.updateSettings({ password: `$2a$99$${"a".repeat(53)}` });

    const warnings: string[] = [];
    const realWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map((a) => String(a)).join(" "));
    };

    try {
      const conn = await providersDb.createProviderConnection({
        provider: "claude",
        authType: "oauth",
        name: "oauth",
        accessToken: DASHBOARD_PASSWORD,
        isActive: true,
      });
      assert.ok(conn?.id, "the guard covers apiKey only");
    } finally {
      console.warn = realWarn;
    }

    assert.equal(
      warnings.filter((w) => w.includes("could not check the credential")).length,
      0,
      "a write carrying no apiKey must not reach settings or bcrypt"
    );
  });

  it("a check that cannot complete allows the write instead of blocking it", async () => {
    // isBcryptHash validates shape, not semantics, so a stored hash carrying an
    // impossible cost factor passes it and then makes bcrypt.compare throw. That
    // reaches the same branch as an unreadable settings row, without a mock.
    const unparseable = `$2a$99$${"a".repeat(53)}`;

    // Asserted rather than assumed. Should bcrypt ever resolve instead of
    // throwing here, the guard would take its no-match return and this test
    // would quietly stop covering the catch branch, so name the reason first.
    await assert.rejects(() => mgmt.verifyManagementPassword("anything", unparseable));

    await settingsDb.updateSettings({ password: unparseable });

    const warnings: string[] = [];
    const realWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map((a) => String(a)).join(" "));
    };

    try {
      const conn = await providersDb.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        name: "unverifiable",
        apiKey: DASHBOARD_PASSWORD,
        isActive: true,
      });
      assert.ok(conn?.id, "one broken settings row must not block every connection write");
    } finally {
      console.warn = realWarn;
    }

    assert.ok(
      warnings.some((w) => w.includes("could not check the credential")),
      "failing open silently would hide that the guard stopped guarding"
    );
  });
});
