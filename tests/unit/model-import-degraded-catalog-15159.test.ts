// Regression guard for audit #15159 — B-03.
//
// The dashboard's Import button reported success while model discovery had
// actually failed. `handleImportModels`
// (src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelImportHandlers.ts)
// fetches `/api/providers/<id>/models?refresh=true`, and the server flags a
// degraded response with `source` + `warning` — `local_catalog` when remote
// discovery failed, `cache` with a warning, `github_catalog` with a warning.
//
// The client read `data.warning` and pushed it into the modal's `logs` array, but
// left `status` as `t("allModelsAlreadyImported")`. So the headline the operator
// reads is "All models already imported" while the only trace of the real cause is
// a log line lower down — and `isDegradedDiscovery` from
// `src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts` (the server
// module that defines exactly this condition) was never consulted from the
// dashboard at all.
//
// Consequence: an operator whose provider silently fell back to a local catalog
// concludes there is nothing to import, and the missing models stay missing.
//
// The decision is extracted into a pure function so it is testable without
// mounting the hook — the same pattern this file already uses for
// `extractImportWarning` in `modelImportWarning.ts`.
import assert from "node:assert/strict";
import { test } from "node:test";

import { isDegradedDiscovery } from "../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts";
import {
  classifyModelImport,
  type ClassifyModelImportInput,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning.ts";

function input(overrides: Partial<ClassifyModelImportInput> = {}): ClassifyModelImportInput {
  return {
    modelsData: { models: [{ id: "a" }] },
    fetchedModels: [{ id: "a" }],
    isKnownModel: () => true,
    ...overrides,
  };
}

test("B-03: a degraded catalog is never reported as 'nothing new to import'", () => {
  const result = classifyModelImport(
    input({
      modelsData: {
        models: [{ id: "a" }],
        source: "local_catalog",
        warning: "No remote models discovered — using local catalog",
      },
    })
  );

  assert.equal(result.outcome, "nothing-new");
  assert.equal(
    result.degraded,
    true,
    "a local_catalog response with a warning must be flagged as degraded"
  );
  assert.equal(result.warning, "No remote models discovered — using local catalog");
});

test("B-03: a degraded catalog that returns zero models is also flagged", () => {
  // Same class of lie: "No models found" reads as an authoritative answer when
  // discovery never actually ran against the upstream.
  const result = classifyModelImport(
    input({
      modelsData: { models: [], source: "local_catalog", warning: "Auto-fetch disabled" },
      fetchedModels: [],
    })
  );

  assert.equal(result.outcome, "no-models");
  assert.equal(result.degraded, true);
  assert.equal(result.warning, "Auto-fetch disabled");
});

test("B-03: an intentional local_catalog is NOT treated as degraded", () => {
  // reka / voyage-ai / t3-web: local_catalog is their INTENDED and only source.
  // Treating that as a failure would break Import for them — the guard exists in
  // the server module precisely for this (#5460 / #5465).
  const result = classifyModelImport(
    input({
      modelsData: { models: [{ id: "a" }], source: "local_catalog", intentional: true },
    })
  );

  assert.equal(result.degraded, false);
});

test("B-03: a live 'api' discovery is not degraded and still imports", () => {
  const result = classifyModelImport(
    input({
      modelsData: { models: [{ id: "a" }, { id: "b" }], source: "api" },
      fetchedModels: [{ id: "a" }, { id: "b" }],
      isKnownModel: (id) => id === "a",
    })
  );

  assert.equal(result.outcome, "import");
  assert.equal(result.degraded, false);
  assert.equal(result.newCount, 1);
  assert.equal(result.total, 2);
});

test("B-03: a clean catalog with nothing new is reported as a true success", () => {
  // The control: the normal "already imported" path must keep working. If this
  // case were misclassified as degraded the fix would be worse than the bug.
  const result = classifyModelImport(
    input({ modelsData: { models: [{ id: "a" }], source: "api" } })
  );

  assert.equal(result.outcome, "nothing-new");
  assert.equal(result.degraded, false);
  assert.equal(result.warning, null);
});

test("B-03: a degraded github_catalog / cached catalog is flagged too", () => {
  for (const source of ["github_catalog", "cache"]) {
    const result = classifyModelImport(
      input({
        modelsData: { models: [{ id: "a" }], source, warning: "stale upstream" },
      })
    );
    assert.equal(result.degraded, true, `${source} with a warning must be degraded`);
    assert.equal(result.warning, "stale upstream");
  }
});

test("B-03: the dashboard classifier agrees with the server's own definition", () => {
  // The dashboard must not invent its own notion of "degraded". If the server's
  // rule changes, this fails and the two cannot silently disagree again.
  const samples: Array<Record<string, unknown>> = [
    { source: "local_catalog" },
    { source: "local_catalog", intentional: true },
    { source: "local_catalog", warning: "w" },
    { source: "cache" },
    { source: "cache", warning: "w" },
    { source: "github_catalog", warning: "w" },
    { source: "api" },
    { source: "api", warning: "ignored" },
    {},
  ];

  for (const modelsData of samples) {
    const result = classifyModelImport(
      input({
        modelsData: { models: [{ id: "a" }], ...modelsData },
        isKnownModel: () => true,
      })
    );
    assert.equal(
      result.degraded,
      isDegradedDiscovery(modelsData),
      `classification diverged from the server rule for ${JSON.stringify(modelsData)}`
    );
  }
});
