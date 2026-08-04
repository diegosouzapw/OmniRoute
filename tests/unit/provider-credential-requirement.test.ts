import assert from "node:assert/strict";
import test from "node:test";

import {
  NOT_TOKEN_QUANTIFIABLE_BUT_CREDENTIALED,
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
      `Probe the endpoint and fix the registry instead of widening the recorded list.`
  );

  // Stale-allowlist enforcement: a frozen entry that stopped drifting must be
  // removed, otherwise the debt list silently outlives the debt.
  assert.deepEqual(
    report.stale,
    [],
    `These now work without a credential — remove them from the recorded list: ${report.stale.join(", ")}`
  );
});

test("providers that reject anonymous calls are never advertised as key-free", () => {
  // Probed live 2026-07-20 — each returned 401/403 with no credential. They are
  // freeType: "keyless" in the catalog (meaning "not token-quantifiable"), so a
  // UI section built on that field would invite users to call providers that
  // reject them. This is the regression guard for that bug.
  for (const id of ["blackbox", "friendliai", "iflytek", "sparkdesk", "puter", "muse-spark-web"]) {
    assert.equal(
      worksWithoutCredential(getCredentialRequirement(id)),
      false,
      `${id} answers 401/403 without a credential — it must never be listed as key-free`
    );
  }
});

test("pollinations is genuinely key-free", () => {
  // Probed live 2026-07-20: HTTP 200 with real choices and no credential.
  assert.equal(worksWithoutCredential(getCredentialRequirement("pollinations")), true);
});

test("the credentialed-but-unquantifiable list only shrinks", () => {
  // Frozen at 9 on 2026-07-20 (pollinations left it once its registry entry was
  // corrected). Growing this means a mismatch was waved through instead of probed.
  assert.ok(
    NOT_TOKEN_QUANTIFIABLE_BUT_CREDENTIALED.length <= 9,
    `list grew to ${NOT_TOKEN_QUANTIFIABLE_BUT_CREDENTIALED.length} — probe the endpoint and fix the registry instead`
  );
});
