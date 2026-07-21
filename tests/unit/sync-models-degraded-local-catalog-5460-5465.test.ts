import test from "node:test";
import assert from "node:assert/strict";

// #5460 (Reka) + #5465 (t3.chat): the model-sync route used to 502 on ANY
// `local_catalog` source, so providers whose local catalog is their ONLY
// discovery source (reka, embedding/rerank + web-cookie providers)
// failed Import/Sync every time. The route now imports those (flagged
// `intentional: true` by the models route) and only 502s a genuinely degraded
// remote-fetch fallback.
const { isDegradedLocalCatalog } =
  await import("../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts");

test("isDegradedLocalCatalog: intentional local-only catalog is NOT a degraded failure (#5460/#5465)", () => {
  // reka / voyage-ai / t3-web etc. — the models route tags these intentional.
  assert.equal(
    isDegradedLocalCatalog({ source: "local_catalog", intentional: true }),
    false,
    "intentional local-catalog-only providers must import, not 502"
  );
  // Case-insensitive on source.
  assert.equal(isDegradedLocalCatalog({ source: "LOCAL_CATALOG", intentional: true }), false);
  assert.equal(
    isDegradedLocalCatalog({
      source: "local_catalog",
      intentional: true,
      warning: "Codex live and GitHub catalogs unavailable — using local catalog",
    }),
    false,
    "Codex's intentional local fallback must import normally"
  );
});

test("isDegradedLocalCatalog: a degraded remote-fetch fallback IS a failure (502)", () => {
  // Provider that normally discovers remotely but the fetch failed → no flag.
  assert.equal(
    isDegradedLocalCatalog({
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
    }),
    true,
    "unflagged local_catalog is a degraded fallback and must 502"
  );
  assert.equal(isDegradedLocalCatalog({ source: "local_catalog", intentional: false }), true);
});

test("isDegradedLocalCatalog: non-local sources are never degraded-local failures", () => {
  assert.equal(isDegradedLocalCatalog({ source: "api" }), false);
  assert.equal(isDegradedLocalCatalog({ source: "cache", intentional: false }), false);
  assert.equal(isDegradedLocalCatalog({}), false);
  assert.equal(isDegradedLocalCatalog({ source: "" }), false);
});
