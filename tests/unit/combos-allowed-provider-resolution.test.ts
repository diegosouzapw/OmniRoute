import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveProviderAlias } from "@omniroute/open-sse/services/providerAlias.ts";
import { resolveCanonicalProviderModel } from "@omniroute/open-sse/services/model.ts";

/**
 * The combos page only reads `.provider` from `resolveCanonicalProviderModel()`,
 * which is literally `resolveProviderAlias()` of the first path segment — so
 * resolving the alias directly must be behavior-identical for every input the
 * page can pass (always a non-empty string: guarded by the `typeof`/`includes`
 * checks upstream of the call site).
 */
test("alias resolution matches the canonical provider field for known and unknown inputs", () => {
  for (const alias of ["openai", "agy", "llamacpp", "xiaomi", "opencode"]) {
    assert.equal(
      resolveProviderAlias(alias),
      resolveCanonicalProviderModel(alias, "some-model").provider,
      alias
    );
  }
  // Unknown prefixes fall through to identity in both paths — never null.
  assert.equal(resolveProviderAlias("unknown-xyz"), "unknown-xyz");
  assert.equal(resolveCanonicalProviderModel("unknown-xyz", "some-model").provider, "unknown-xyz");
  // Non-string inputs resolve to null, which the page's `|| ""` normalizes.
  assert.equal(resolveProviderAlias(null), null);
  assert.equal(resolveProviderAlias(undefined), null);
  assert.equal(resolveCanonicalProviderModel(null, "some-model").provider, null);
});
