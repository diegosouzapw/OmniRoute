/**
 * #8779 -- an `agy/` request must find the connection the user actually
 * authorized, which is stored under `agy`.
 *
 * The model layer deliberately canonicalizes the `agy/` prefix to
 * `antigravity` (#8013 aligned the official clients and the callable catalog,
 * and DEFAULT_MODEL_ALIAS_SEED ships `gemini-3.1-pro -> agy/gemini-pro-agent`
 * on that assumption). The connections layer does the opposite: the Antigravity
 * CLI card writes its row under `agy`.
 *
 * Those two are individually intentional and jointly broken. An operator whose
 * only Antigravity connections came from the CLI card gets
 * "No credentials for antigravity" on every request. A deployment that also has
 * `antigravity` rows never sees it -- the lookup finds those instead and the
 * `agy` rows simply go unused, which is why this survived in production.
 *
 * Fixed by pairing the two ids in PROVIDER_SEARCH_PAIRS, the mechanism that
 * already exists for exactly this (nvidia/nvidia_nim, #922).
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

test("an agy/ request finds credentials when only agy connections exist", async () => {
  await seedOnly("agy");

  // The real path: parse the model string, then ask for the credentials of
  // whatever provider the parse produced. Before the fix this returned null
  // and logged "No credentials for antigravity".
  const parsed = model.parseModel("agy/gemini-3-pro");
  const creds = await auth.getProviderCredentials(parsed.provider as string);

  assert.ok(
    creds,
    `no credentials for "${parsed.provider}" -- the agy row the CLI card wrote ` +
      `is unreachable, which is #8779`
  );
});

test("the pair works in the other direction too", async () => {
  await seedOnly("antigravity");
  const creds = await auth.getProviderCredentials("agy");
  assert.ok(creds, "an antigravity row must serve an agy lookup");
});

test("each id still finds its own rows", async () => {
  await seedOnly("agy");
  assert.ok(await auth.getProviderCredentials("agy"));

  await seedOnly("antigravity");
  assert.ok(await auth.getProviderCredentials("antigravity"));
});

test("the pair does not make unrelated providers findable", async () => {
  await seedOnly("agy");
  // gemini shares the upstream vendor but not the account; it must stay empty.
  assert.equal(await auth.getProviderCredentials("gemini"), null);
});
