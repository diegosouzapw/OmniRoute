// tests/unit/canonical-provider-order.test.ts
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CANONICAL_PROVIDER_ORDER,
  COMBO_GROUP,
  groupSortPriority,
  providerRank,
} from "@/shared/constants/canonicalProviderOrder";
import { OAUTH_PROVIDERS } from "@/shared/constants/providers/oauth";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers/noauth";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers/apikey";
import { PROVIDER_ORDER } from "@/lib/combos/comboSort";

describe("canonical provider order", () => {
  it("matches the registry derivation OAUTH -> NOAUTH -> APIKEY", () => {
    assert.deepEqual([...CANONICAL_PROVIDER_ORDER], [
      ...Object.keys(OAUTH_PROVIDERS),
      ...Object.keys(NOAUTH_PROVIDERS),
      ...Object.keys(APIKEY_PROVIDERS),
    ]);
  });

  it("resolves the xao alias to the xai-oauth rank", () => {
    assert.ok(CANONICAL_PROVIDER_ORDER.includes("xai-oauth"));
    assert.equal(providerRank("xao"), providerRank("xai-oauth"));
  });

  it("keeps the catalog unknown contract (Infinity, combo first)", () => {
    assert.equal(groupSortPriority(COMBO_GROUP), -1);
    assert.equal(groupSortPriority("zzz-no-such-provider"), Infinity);
  });

  it("keeps the combos unknown contract (length)", () => {
    assert.equal(providerRank("zzz-no-such-provider"), CANONICAL_PROVIDER_ORDER.length);
  });

  it("is shared by reference with comboSort", () => {
    assert.equal(PROVIDER_ORDER, CANONICAL_PROVIDER_ORDER);
  });

  it("resolves every declared alias to its canonical rank", () => {
    const seen = new Set<string>();
    for (const def of Object.values({
      ...OAUTH_PROVIDERS,
      ...NOAUTH_PROVIDERS,
      ...APIKEY_PROVIDERS,
    }) as { id: string; alias?: string }[]) {
      if (typeof def.alias === "string" && def.alias.length > 0 && !seen.has(def.alias)) {
        seen.add(def.alias);
        assert.equal(providerRank(def.alias), providerRank(def.id));
      }
    }
    assert.ok(seen.size > 0);
  });
});
