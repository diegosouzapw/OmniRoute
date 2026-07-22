// Issue #7253 — the "release branch not green" bot tracker for release/v3.8.49
// found the branch genuinely red for `check:fabricated-docs --strict`: two doc
// files referenced a migration file / API route that no longer exist under
// those names (docs went stale after src/ moved on):
//   - docs/routing/REASONING_ROUTING.md:67  -> migration renumbered 125 -> 126
//   - docs/INCIDENT_RESPONSE.md / docs/PERF_BUDGETS.md -> `/api/version` route
//     was renamed to `/api/system/version`
//
// This runs the real doc-accuracy checker against the live repo tree (no
// fixture root override) so it keeps guarding against future doc drift, not
// just the two specific lines fixed here.
import test from "node:test";
import assert from "node:assert/strict";

import { runFabricatedDocsCheck, formatHumanReport } from "../../scripts/check/check-fabricated-docs.mjs";

test("#7253 release-green: docs contain zero fabricated API/file-ref drift", () => {
  const result = runFabricatedDocsCheck();
  if (result.totalFindings > 0) {
    assert.fail(`fabricated-docs drift found:\n${formatHumanReport(result)}`);
  }
  assert.equal(result.totalFindings, 0);
});

test("#7253: REASONING_ROUTING.md references the current migration filename (126, not 125)", () => {
  const result = runFabricatedDocsCheck();
  const hit = result.files
    .flatMap((f) => f.findings.map((finding) => ({ file: f.rel, ...finding })))
    .find((f) => f.value === "src/lib/db/migrations/125_reasoning_routing_rules.sql");
  assert.equal(hit, undefined, "stale migration-125 reference must not resurface");
});

test("#7253: INCIDENT_RESPONSE.md / PERF_BUDGETS.md reference /api/system/version, not the removed /api/version", () => {
  const result = runFabricatedDocsCheck();
  const hit = result.files
    .flatMap((f) => f.findings.map((finding) => ({ file: f.rel, ...finding })))
    .find((f) => f.value === "/api/version");
  assert.equal(hit, undefined, "stale /api/version reference must not resurface");
});
