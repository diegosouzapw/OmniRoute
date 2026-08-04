/**
 * #5086 / #4389 — model visibility reset after periodic sync.
 *
 * The EYE/visibility toggle hides a model by writing `isHidden:true` into the
 * `modelCompatOverrides` namespace via `mergeModelCompatOverride`. Hidden flags
 * for SYNCED models live there, not in the `customModels` store.
 *
 * Before the fix, `replaceCustomModels` pruned the compat-override list down to
 * only the ids present in the new `customModels` array. The periodic model sync
 * (and manual import) calls `replaceCustomModels` with a list that does NOT
 * contain eye-hidden synced models, so their `isHidden` override was silently
 * wiped — every hidden model turned back on after a sync.
 *
 * This guards that an eye-hidden override survives a `replaceCustomModels` call
 * whose new model list omits that id.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Hermetic DB (see #3782 test): isolate DATA_DIR so override state never leaks
// into the shared dev/CI database between runs.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-replace-custom-hide-"));
process.env.DATA_DIR = tmpDir;

const { replaceCustomModels, mergeModelCompatOverride, getModelIsHidden, getModelCompatOverrides } =
  await import("../../src/lib/localDb.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

before(() => {
  resetDbInstance();
});

after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const PROVIDER = "llama-cpp-5086";

test("an eye-hidden override survives replaceCustomModels when the new list omits it", async () => {
  // Operator hides a SYNCED model "ghost" with the EYE toggle (visibility only).
  mergeModelCompatOverride(PROVIDER, "ghost", { isHidden: true });
  assert.equal(getModelIsHidden(PROVIDER, "ghost"), true, "ghost is eye-hidden before sync");

  // A periodic sync / import replaces the CUSTOM models with a list that does
  // NOT include "ghost" (it lives in the synced store, not customModels).
  await replaceCustomModels(PROVIDER, [
    { id: "keep-1", name: "Keep One" },
    { id: "keep-2", name: "Keep Two" },
  ]);

  // The compat override (and thus the hidden flag) must NOT be wiped.
  assert.equal(
    getModelIsHidden(PROVIDER, "ghost"),
    true,
    "ghost must stay hidden after replaceCustomModels omits it"
  );
  const overrides = getModelCompatOverrides(PROVIDER).map((o) => o.id);
  assert.ok(
    overrides.includes("ghost"),
    "the compat override for ghost must still exist after the sync"
  );
});
