/**
 * Regression: #7620 hidden-model persistence must survive the #10898 compat
 * canonicalization (fixed in this PR by keying the low-level compat store on the
 * RAW providerId and merging overrides across no-auth siblings at resolution).
 *
 * The bug: #10898 canonicalized the compat key via resolveProviderAlias inside
 * readCompatList/writeCompatList. setModelIsHidden / mergeModelCompatOverride
 * writes the isHidden override under the raw no-auth id "opencode", but #10898
 * relocated the write to the canonical APIKEY gateway id "opencode-zen". The
 * hidden-model reader (getHiddenModelsByProvider) still keyed on "opencode", so
 * it read an empty row and a hidden no-auth model reappeared in the auto-combo
 * pool.
 *
 * The fix has two halves, both pinned here:
 *   (1) the low-level compat store keys on the RAW providerId again, so an
 *       override written under "opencode" lands on the "opencode" key and is
 *       NOT visible under the sibling "opencode-zen" key; and
 *   (2) resolution (getNoAuthHydrationProviderIds) merges overrides across the
 *       provider AND its no-auth siblings (requested id first), so a lookup that
 *       resolves the model prefix to "opencode-zen" still finds the override the
 *       operator wrote under "opencode".
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7620-sibling-compat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "compat-sibling-test-secret";

const { mergeModelCompatOverride, getModelCompatOverrides } = await import(
  "../../../src/lib/db/models/compat.ts"
);
const { getNoAuthHydrationProviderIds } = await import(
  "../../../src/sse/services/noAuthProviderSiblings.ts"
);
const { getModelInfo } = await import("../../../src/sse/services/model.ts");

test("#7620: isHidden override written under raw 'opencode' stays on the raw key, not the 'opencode-zen' sibling", () => {
  mergeModelCompatOverride("opencode", "grok-code-fast-1", { isHidden: true });

  const rawOverrides = getModelCompatOverrides("opencode");
  const rawEntry = rawOverrides.find((m) => m.id === "grok-code-fast-1");
  assert.ok(rawEntry, "override must be stored on the raw 'opencode' key");
  assert.equal(rawEntry.isHidden, true);

  // #10898 regression guard: the write must NOT have been canonicalized onto the
  // APIKEY gateway id. If it had, the raw-keyed hidden reader would miss it.
  const siblingOverrides = getModelCompatOverrides("opencode-zen");
  const leaked = siblingOverrides.find((m) => m.id === "grok-code-fast-1");
  assert.equal(
    leaked,
    undefined,
    "override must NOT leak onto the 'opencode-zen' key (that was the #10898 regression)"
  );
});

test("getNoAuthHydrationProviderIds merges the no-auth sibling so 'opencode-zen' resolution reaches 'opencode' overrides", () => {
  // Sibling map contract: opencode-zen (and opencode-go) hydrate from opencode.
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode-zen"), ["opencode-zen", "opencode"]);
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode-go"), ["opencode-go", "opencode"]);
  // A provider with no siblings resolves to just itself (requested id first).
  assert.deepEqual(getNoAuthHydrationProviderIds("opencode"), ["opencode"]);

  // End-to-end: an override written under "opencode" is found when the merged
  // sibling set for the resolved gateway id "opencode-zen" is walked.
  mergeModelCompatOverride("opencode", "claude-sonnet-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    isHidden: true,
  });
  const merged = getNoAuthHydrationProviderIds("opencode-zen").flatMap((id) =>
    getModelCompatOverrides(id)
  );
  const resolved = merged.find((m) => m.id === "claude-sonnet-5");
  assert.ok(resolved, "sibling-merged overrides must include the 'opencode' row");
  assert.equal(resolved.isHidden, true);
  assert.equal(resolved.apiFormat, "responses");
  assert.equal(resolved.targetFormat, "claude");
});

test("#10898 stays fixed: getModelInfo('opencode/<model>') resolves to opencode-zen and reads the sibling override", async () => {
  mergeModelCompatOverride("opencode", "claude-opus-5", {
    apiFormat: "responses",
    targetFormat: "claude",
    supportsVision: true,
  });

  const info = await getModelInfo("opencode/claude-opus-5");

  assert.equal(info.provider, "opencode-zen");
  assert.equal(info.apiFormat, "responses");
  assert.equal(info.targetFormat, "claude");
  assert.equal(info.supportsVision, true);
});
