import assert from "node:assert/strict";
import test from "node:test";

import {
  KEYLESS_CATALOG_DRIFT,
  checkKeylessCatalogConsistency,
  getCredentialRequirement,
  listNoCredentialProviders,
  worksWithoutCredential,
} from "@/shared/utils/providerCredentialRequirement.ts";
import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";

test("classifies each credential model from the real registries", () => {
  // noAuth: the connect form never asks for a key.
  assert.equal(getCredentialRequirement("opencode"), "none");
  // Literal anonymous token: routable with no user credential, key still honoured.
  assert.equal(getCredentialRequirement("aihorde"), "optional");
  assert.equal(getCredentialRequirement("kilocode"), "optional");
  // Verified live 2026-07-20: answers with no Authorization header, 403s on a bad key.
  assert.equal(getCredentialRequirement("ovhcloud"), "optional");
  // OAuth: nothing to paste, but the user still signs in.
  assert.equal(getCredentialRequirement("agy"), "oauth");
  // Ordinary key-gated provider.
  assert.equal(getCredentialRequirement("groq"), "required");
  // Unknown ids must fail closed, never be advertised as free access.
  assert.equal(getCredentialRequirement("definitely-not-a-provider"), "required");
});

test("worksWithoutCredential excludes oauth — signing in is still a barrier", () => {
  assert.equal(worksWithoutCredential("none"), true);
  assert.equal(worksWithoutCredential("optional"), true);
  assert.equal(worksWithoutCredential("oauth"), false);
  assert.equal(worksWithoutCredential("required"), false);
});

test("listNoCredentialProviders is derived, not a hand-kept list", () => {
  const ids = listNoCredentialProviders();
  assert.ok(ids.length > 0);
  assert.ok(ids.includes("opencode"));
  assert.ok(ids.includes("ovhcloud"));
  assert.ok(ids.includes("aihorde"));
  assert.ok(!ids.includes("groq"), "key-gated providers must never be listed");
  assert.deepEqual(ids, [...ids].sort(), "output must be stable for snapshotting");
});

test("free catalog's keyless label matches real routing behaviour", () => {
  const report = checkKeylessCatalogConsistency(FREE_MODEL_BUDGETS);

  assert.deepEqual(
    report.unexpected,
    [],
    `these providers are labelled keyless but routing demands a credential: ${report.unexpected.join(", ")}. ` +
      `Fix the registry (or the catalog entry) instead of widening KEYLESS_CATALOG_DRIFT.`
  );

  // Stale-allowlist enforcement: a frozen entry that stopped drifting must be
  // removed, otherwise the debt list silently outlives the debt.
  assert.deepEqual(
    report.stale,
    [],
    `KEYLESS_CATALOG_DRIFT lists providers that no longer drift: ${report.stale.join(", ")}. Remove them.`
  );
});

test("the drift allowlist only shrinks", () => {
  // Frozen at 10 on 2026-07-20. Lowering this is the goal; raising it means a
  // new inconsistency was waved through instead of fixed.
  assert.ok(
    KEYLESS_CATALOG_DRIFT.length <= 10,
    `drift allowlist grew to ${KEYLESS_CATALOG_DRIFT.length} — fix the provider instead of adding to it`
  );
});
