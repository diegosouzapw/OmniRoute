import test from "node:test";
import assert from "node:assert/strict";
import { maskKey } from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.ts";
import { maskStoredApiKey } from "../../src/lib/apiKeyExposure.ts";

/**
 * Regression guard for #4671 (stop double-masking already-masked API keys).
 *
 * The keys-list endpoint (`/api/keys`) returns `key` already masked via
 * `maskStoredApiKey` → `slice(0,8) + "****" + slice(-4)`, which preserves the
 * last-4 suffix (e.g. `sk-live-****1002`). The dashboard list used to render that
 * value through `maskKey()` a SECOND time. Before maskKey gained its `"****"`
 * passthrough guard, the second pass truncated the value to `sk-live-...`,
 * dropping the suffix the user relies on to tell keys apart.
 *
 * #4671 drops the redundant `maskKey(key.key)` call and renders `key.key`
 * verbatim. These tests pin the invariant that makes that simplification safe:
 * an already-masked (`"****"`-bearing) value must round-trip unchanged through
 * maskKey, so `key.key` and `maskKey(key.key)` are equivalent for the real
 * server format. (At the pre-guard maskKey the second assertion would fail,
 * which is exactly the historical double-mask bug.)
 */
test("maskKey returns an already-masked (****) value verbatim — no double-mask", () => {
  const serverMasked = maskStoredApiKey("sk-live-abcdefgh-secret-tail-1002");
  assert.ok(serverMasked && serverMasked.includes("****"));
  // The suffix the user identifies the key by must survive.
  assert.ok(serverMasked.endsWith("1002"), "server mask must preserve the last-4 suffix");
  // The dashboard renders key.key directly; that must equal what maskKey would
  // have produced, i.e. the verbatim already-masked value (no truncation).
  assert.equal(maskKey(serverMasked), serverMasked);
});

test("maskKey still masks a fully-revealed key (no '****') — first-pass behavior intact", () => {
  // A genuinely unmasked key (no "****") must still be shortened, so removing the
  // redundant second pass does not weaken masking of truly-revealed values.
  const full = "sk-live-abcdefgh-secret-tail-1002";
  assert.ok(!full.includes("****"));
  assert.equal(maskKey(full), "sk-live-...");
});
