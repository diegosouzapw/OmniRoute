/**
 * Operator error rules + catch-all defaults must never weaken the connection
 * cooldown guards in `markAccountUnavailable`:
 *   - a shorter rule cooldown never shortens an active, longer cooldown;
 *   - a rule never overwrites a terminal status (banned / expired / credits_exhausted).
 * Also covers the runtime-settings normalizer that feeds the matcher.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-op-rules-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const { setOperatorProviderErrorRules, setOperatorProviderErrorDefaults } =
  await import("../../open-sse/config/providerErrorRules.ts");
const { buildRuntimeSettingsSnapshot } = await import("../../src/lib/config/runtimeSettings.ts");

test.after(() => {
  setOperatorProviderErrorRules(undefined);
  setOperatorProviderErrorDefaults(undefined);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const HOUR = 3_600_000;

async function createConnection(name: string) {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
  });
  return (conn as { id: string }).id;
}

async function readConnection(id: string) {
  return (await providersDb.getProviderConnectionById(id)) as {
    rateLimitedUntil?: string | null;
    testStatus?: string | null;
  } | null;
}

test("a shorter operator rule never shortens an active longer cooldown", async () => {
  setOperatorProviderErrorRules({
    openai: [{ match: "acme_err_7731", scope: "connection", cooldownMs: 60_000 }],
  });
  setOperatorProviderErrorDefaults({ openai: { cooldownMs: 60_000 } });
  const id = await createConnection("op-rule never shorten");
  const longUntil = new Date(Date.now() + HOUR).toISOString();
  await providersDb.updateProviderConnection(id, { rateLimitedUntil: longUntil });

  await markAccountUnavailable(id, 429, '{"error":{"code":"acme_err_7731"}}', "openai");

  const after = await readConnection(id);
  assert.ok(
    new Date(String(after?.rateLimitedUntil)).getTime() >= new Date(longUntil).getTime() - 1_000,
    `cooldown must not shrink: expected >= ${longUntil}, got ${after?.rateLimitedUntil}`
  );
});

test("an operator rule or default never overwrites a terminal status", async () => {
  setOperatorProviderErrorRules({
    openai: [{ match: "acme_err_7731", scope: "connection", cooldownMs: 60_000 }],
  });
  setOperatorProviderErrorDefaults({ openai: { cooldownMs: 60_000 } });
  for (const terminal of ["banned", "expired", "credits_exhausted"]) {
    const id = await createConnection(`op-rule terminal ${terminal}`);
    await providersDb.updateProviderConnection(id, { testStatus: terminal });

    await markAccountUnavailable(id, 429, '{"error":{"code":"acme_err_7731"}}', "openai");
    await markAccountUnavailable(id, 503, "Service Unavailable", "openai");

    const after = await readConnection(id);
    assert.equal(after?.testStatus, terminal, `${terminal} must survive the operator rule`);
  }
});

test("runtime snapshot keeps match-only / status-only rules and drops malformed ones", () => {
  const snapshot = buildRuntimeSettingsSnapshot({
    providerErrorRules: {
      Acme: [
        { match: "acme_err_7731", scope: "connection" },
        { status: 429, scope: "model" },
        { scope: "model" },
        null,
      ],
    },
    providerErrorDefaults: {
      Acme: { cooldownMs: HOUR, scope: "model" },
      broken: { scope: "model" },
    },
  });
  assert.deepEqual(snapshot.providerErrorRules, {
    acme: [
      { match: "acme_err_7731", scope: "connection" },
      { status: 429, scope: "model" },
    ],
  });
  assert.deepEqual(snapshot.providerErrorDefaults, { acme: { cooldownMs: HOUR, scope: "model" } });
});
