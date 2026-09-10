import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";

const here = path.dirname(fileURLToPath(import.meta.url));

// The reference page used to advertise a per-row confidence tag. No entry carries
// one, so the claim was removed. This file is the other half of that removal: the
// day an entry does carry confidence, the page has to be revisited, and a red test
// is how that gets noticed. Both halves are needed — one watches the data, the
// other watches the prose, and separately either can stay green while the other drifts.
// Naming the allowed keys rather than banning the word "confidence": the claim
// the page makes is that no entry carries a per-row quality rating at all, and a
// field called `verified`, `sourceQuality` or `trust` would reintroduce exactly
// that under a different name while a substring check stayed green.
const CATALOG_ENTRY_KEYS = [
  "creditTokens",
  "displayName",
  // Who may claim a quota (e.g. a regional identity check), not how much the row can
  // be trusted — the totals split it into its own gated bucket instead of rating it.
  "eligibilityGate",
  "freeType",
  "hardStopGuaranteed",
  "modelId",
  "monthlyTokens",
  "poolKey",
  "provider",
  "tos",
  "trainsOnPrompts",
];

test("no catalog entry carries a per-row quality rating, under any name", () => {
  const allowed = new Set(CATALOG_ENTRY_KEYS);
  const unexpected = [
    ...new Set(
      FREE_MODEL_BUDGETS.flatMap((entry) => Object.keys(entry)).filter((key) => !allowed.has(key))
    ),
  ].sort();
  assert.deepEqual(
    unexpected,
    [],
    "a new field appeared on catalog entries: " +
      `${unexpected.join(", ")}. If it rates how much a row can be trusted, ` +
      "docs/reference/FREE_TIERS.md says the opposite and must be revisited; " +
      "if it does not, add it to CATALOG_ENTRY_KEYS."
  );
});

test("the reference page does not promise a per-row confidence tag", () => {
  const page = fs.readFileSync(path.resolve(here, "../../docs/reference/FREE_TIERS.md"), "utf8");
  assert.ok(
    !/confidence tagged per row/i.test(page),
    "the page promises a per-row confidence tag; no catalog entry carries one"
  );
});
