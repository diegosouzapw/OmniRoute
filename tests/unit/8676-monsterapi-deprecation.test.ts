import assert from "node:assert/strict";
import { test } from "node:test";
import { APIKEY_PROVIDERS_INFERENCE } from "../../src/shared/constants/providers/apikey/inference-hosts.ts";

/**
 * #8676 deprecated MonsterAPI after its domain stopped resolving, but wrote the flag
 * as `isDeprecated` — a key no schema declares and no consumer reads. The catalog
 * field the codebase actually consumes is `deprecated`:
 *
 *   src/shared/validation/providerSchema.ts   declares `deprecated`, not `isDeprecated`
 *   ProviderCard.tsx                          `provider.deprecated` (strikethrough + block icon)
 *   ProviderTestSlideOver.tsx                 `provider.deprecated` (warning)
 *   providerOnboardingCatalog.ts              `Boolean(provider.deprecated)` + sorts last
 *   ProviderOnboardingWizard.tsx              `option.deprecated` (badge)
 *   scripts/docs/gen-provider-reference.ts    `p.deprecated` gates the DEPRECATED note
 *
 * Because Zod object schemas ignore undeclared keys, `isDeprecated` never failed
 * validation — it was silently dropped, so the deprecation had no effect anywhere
 * while this test stayed green.
 *
 * Upstream state re-probed 2026-08-13, with paired controls:
 *   GET https://api.monsterapi.ai/v1/chat/completions -> 000 (does not resolve)
 *   GET https://monsterapi.ai                         -> 000 (does not resolve)
 *   GET https://api.openai.com/v1/models              -> 401 (control: reachable)
 *   GET https://<nonexistent-domain>                  -> 000 (control: unreachable)
 */
test("Monster API provider is marked as deprecated (fixes #8676)", () => {
  const monsterEntry = APIKEY_PROVIDERS_INFERENCE.monsterapi as Record<string, unknown>;
  assert.ok(monsterEntry, "monsterapi entry must exist in APIKEY_PROVIDERS_INFERENCE");
  assert.equal(
    monsterEntry.deprecated,
    true,
    "monsterapi must set `deprecated` — the field every consumer and the Zod schema read"
  );
  assert.ok(
    typeof monsterEntry.deprecationReason === "string",
    "monsterapi must specify deprecationReason"
  );
});

test("Monster API deprecation uses no undeclared flag name (#8676)", () => {
  const monsterEntry = APIKEY_PROVIDERS_INFERENCE.monsterapi as Record<string, unknown>;
  assert.equal(
    "isDeprecated" in monsterEntry,
    false,
    "`isDeprecated` is read by nothing and silently dropped by the provider schema — " +
      "the consumed field is `deprecated`"
  );
});

test("Monster API deprecation matches the flag shape of its sibling entries (#8676)", () => {
  // predibase, in this same catalog, is the reference implementation: its `deprecated`
  // flag is what makes the generated PROVIDER_REFERENCE.md render its DEPRECATED note.
  const monsterEntry = APIKEY_PROVIDERS_INFERENCE.monsterapi as Record<string, unknown>;
  const predibaseEntry = APIKEY_PROVIDERS_INFERENCE.predibase as Record<string, unknown>;
  assert.equal(predibaseEntry.deprecated, true, "predibase is the in-file reference for the flag");
  for (const field of ["deprecated", "deprecationReason"]) {
    assert.equal(
      typeof monsterEntry[field],
      typeof predibaseEntry[field],
      `monsterapi must declare ${field} the same way predibase does`
    );
  }
});
