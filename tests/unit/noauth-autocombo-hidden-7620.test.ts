/**
 * #7620 — hiding a no-auth-provider model with the EYE icon (Dashboard → Models,
 * `isHidden: true` written via setModelIsHidden()/mergeModelCompatOverride()) does
 * remove it from `/v1/models`, but `getNoAuthCandidates()` in
 * `open-sse/services/autoCombo/virtualFactory.ts` never consults
 * `getHiddenModelsByProvider()` at all (unlike the credentialed-connection loop a
 * few lines above it, which does). A hidden no-auth model therefore stays in the
 * `auto/*` candidate pool and can still be selected, causing a 401 when the
 * upstream account for that hidden model is no longer valid/allowed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7620-noauth-hidden-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  // contract changed by #15979 (on top of #15839): `excludeTosAvoid` defaults to on and
  // uncataloged models inherit the provider's curated `tos: "avoid"` verdict, so every opencode
  // model is ToS-filtered out of auto/*. Opt out so this file keeps guarding the #7620
  // hidden-model behaviour; the ToS default is covered by issue-15059-tos-avoid-auto-default.
  await settingsDb.updateSettings({ excludeTosAvoid: false });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("#7620: a no-auth model hidden via the eye icon (isHidden:true) must be ABSENT from the auto-combo candidate pool", async () => {
  modelsDb.setModelIsHidden("opencode", "nemotron-3-ultra-free", true);

  const hiddenMap = modelsDb.getHiddenModelsByProvider();
  const hidden = [...hiddenMap.values()].some((ids) => ids.has("nemotron-3-ultra-free"));
  assert.equal(
    hidden,
    true,
    "sanity: getHiddenModelsByProvider() must report nemotron-3-ultra-free as hidden"
  );

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const modelStrings = combo.models.map((m: { model: string }) => m.model);
  assert.ok(
    !modelStrings.some((model: string) => model.endsWith("/nemotron-3-ultra-free")),
    "BUG #7620: the eye-hidden model 'nemotron-3-ultra-free' must not appear in the auto-combo " +
      `candidate pool, but it did. Pool: ${JSON.stringify(modelStrings)}`
  );
});

test("#7620 baseline: with nothing hidden, opencode/nemotron-3-ultra-free is present in the pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const modelStrings = combo.models.map((m: { model: string }) => m.model);
  assert.ok(
    modelStrings.some((model: string) => model.endsWith("/nemotron-3-ultra-free")),
    `baseline: with nothing hidden, nemotron-3-ultra-free must be present. Pool: ${JSON.stringify(modelStrings)}`
  );
});
