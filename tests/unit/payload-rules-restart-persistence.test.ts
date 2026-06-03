/**
 * Issue #2986 — Payload Rules not persisting across server restart.
 *
 * Rules are written to the DB (key_value `settings.payloadRules`) and mirrored
 * into an in-memory `runtimeOverride`. After a restart, if `runtimeOverride` is
 * null (the boot hook didn't run in this module instance, or a separate bundle
 * instance), `getPayloadRulesConfig` used to fall back to the (usually empty)
 * file config and return no rules.
 *
 * Fix: when there is no in-memory override, read the DB-persisted rules — the
 * source of truth — before the file. This test simulates a restart by clearing
 * the in-memory override and asserting the persisted rules still come back.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-payload-rules-restart-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const payloadRulesService = await import("../../open-sse/services/payloadRules.ts");

test.after(() => {
  payloadRulesService.resetPayloadRulesConfigForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#2986 payload rules survive a restart (DB fallback when override is cleared)", async () => {
  // Persist a rule to the DB (as the Settings UI does via updateSettings).
  await settingsDb.updateSettings({
    payloadRules: {
      default: [{ models: [{ name: "gpt-*" }], params: { temperature: 0.2 } }],
      override: [],
      filter: [],
    },
  });

  // Simulate a server restart: the in-memory override does not exist in a fresh
  // process / module instance.
  payloadRulesService.resetPayloadRulesConfigForTests();

  const config = (await payloadRulesService.getPayloadRulesConfig({ forceRefresh: true })) as {
    default?: unknown[];
  };
  assert.ok(Array.isArray(config.default), "config.default must be an array");
  assert.equal(
    config.default!.length,
    1,
    "the persisted rule must be returned after restart (read from the DB, not the empty file)"
  );
});

test("#2986 explicitly-empty persisted rules return an empty config (no over-broadening)", async () => {
  // The user can save an empty configuration; the DB fallback must reflect that
  // (not fabricate rules). updateSettings invalidates the settings cache.
  await settingsDb.updateSettings({
    payloadRules: { default: [], override: [], filter: [] },
  });
  payloadRulesService.resetPayloadRulesConfigForTests();

  const config = (await payloadRulesService.getPayloadRulesConfig({ forceRefresh: true })) as {
    default?: unknown[];
  };
  assert.deepEqual(config.default, [], "empty DB rules → empty default (neutral config)");
});
