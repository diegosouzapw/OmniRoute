/**
 * Issue #2901 — OpenCode Free combo entries use the `opencode/` prefix instead
 * of `oc/`.
 *
 * The no-auth OpenCode provider has id "opencode" and alias "oc". The combo
 * builder built `qualifiedModel` from the provider *id* (`opencode/big-pickle`),
 * but `parseModel("opencode/...")` resolves to the **opencode-zen** provider
 * (an api-key tier) via a manual ALIAS_TO_PROVIDER_ID override — not the no-auth
 * "opencode" provider. The user-facing routing alias `oc/` resolves correctly
 * (`oc/big-pickle` → provider "opencode").
 *
 * This test drives the real builder against a fresh DB and asserts that no-auth
 * OpenCode models carry the `oc/` prefix.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-prefix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#2901 no-auth OpenCode combo models use the oc/ prefix (not opencode/)", async () => {
  const payload = await getComboBuilderOptions();
  const opencode = payload.providers.find((p) => p.providerId === "opencode");
  assert.ok(opencode, "no-auth 'opencode' provider must appear in the combo builder");

  const bigPickle = opencode.models.find((m) => m.id === "big-pickle");
  assert.ok(bigPickle, "big-pickle must be listed under the no-auth opencode provider");
  assert.equal(
    bigPickle.qualifiedModel,
    "oc/big-pickle",
    "no-auth opencode/big-pickle combo entry must use the 'oc/' routing alias"
  );

  // Every model under the no-auth provider must use the alias prefix.
  for (const m of opencode.models) {
    assert.ok(
      m.qualifiedModel.startsWith("oc/"),
      `qualifiedModel '${m.qualifiedModel}' must start with 'oc/' (got id-prefix instead)`
    );
  }
});

test("#2901 the oc/ prefix actually resolves back to the no-auth opencode provider", () => {
  // Guards the premise: opencode/ misroutes to opencode-zen, oc/ is correct.
  assert.equal(parseModel("oc/big-pickle").provider, "opencode");
  assert.equal(parseModel("opencode/big-pickle").provider, "opencode-zen");
});
