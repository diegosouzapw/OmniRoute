/**
 * #8779 -- an `agy/` request must find the connection the user actually
 * authorized.
 *
 * The `agy` provider was consolidated into `antigravity`: the model layer keeps
 * canonicalizing the `agy/` prefix to `antigravity` (#8013, and
 * DEFAULT_MODEL_ALIAS_SEED ships `gemini-3.1-pro -> agy/gemini-pro-agent`), and
 * the connections layer now stores every Antigravity connection under
 * `antigravity` as well. Same account, same Cloud Code backend.
 *
 * This suite guards the two halves of that contract: `agy/` parses to
 * `antigravity`, and the credential lookup for either spelling reaches the
 * consolidated `antigravity` pool. A regression here brings back the "No
 * credentials for antigravity" failure the operator saw in #8779.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8779-agy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const model = await import("../../open-sse/services/model.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOnly(provider: string) {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    email: `${provider}@example.test`,
    accessToken: `tok-${provider}`,
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the agy/ prefix still canonicalizes to antigravity (#8013 unchanged)", () => {
  const parsed = model.parseModel("agy/gemini-3-pro");
  assert.equal(parsed.provider, "antigravity");
  assert.equal(parsed.providerAlias, "agy");
});

test("an agy/ request finds credentials for the consolidated antigravity connection", async () => {
  await seedOnly("antigravity");

  // The real path: parse the model string, then ask for the credentials of
  // whatever provider the parse produced.
  const parsed = model.parseModel("agy/gemini-3-pro");
  const creds = await auth.getProviderCredentials(parsed.provider as string);

  assert.ok(
    creds,
    `no credentials for "${parsed.provider}" -- the connection the Antigravity card ` +
      `wrote is unreachable, which is #8779`
  );
});

test("the legacy agy lookup spelling resolves to the same antigravity pool", async () => {
  await seedOnly("antigravity");
  const creds = await auth.getProviderCredentials("agy");
  assert.ok(creds, "an antigravity row must serve a legacy agy lookup");
});

test("the canonical id still finds its own rows", async () => {
  await seedOnly("antigravity");
  assert.ok(await auth.getProviderCredentials("antigravity"));
});

test("the consolidated provider does not make unrelated providers findable", async () => {
  await seedOnly("antigravity");
  // gemini shares the upstream vendor but not the account; it must stay empty.
  assert.equal(await auth.getProviderCredentials("gemini"), null);
});
