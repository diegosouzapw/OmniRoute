/**
 * Repro for #6957 — combo builder "2. Model" dropdown shows visually duplicated
 * "imported" rows and appears to be missing the "-latest" aliases for a native
 * Mistral provider with 2 API-key connections.
 *
 * Root cause (confirmed against the reporter's actual `GET /api/combos/builder/options`
 * payload, issue #6957): there is NO literal `model.id` collision — every synced
 * model id is already unique after `buildModelOptions()`/`getAllSyncedAvailableModels()`
 * dedup. The bug is that `ComboBuilderModelOption.name` (the text rendered in the
 * `<option>` in `src/app/(dashboard)/dashboard/combos/page.tsx:3217-3220`) is
 * populated straight from the upstream-synced `model.name`, which Mistral's own
 * /v1/models catalog resolves to a shared "canonical" display name for every alias
 * in a model family. So `codestral-2508`, `codestral-latest`,
 * `mistral-code-fim-latest` and `mistral-code-latest` are 4 DISTINCT ids that all
 * render as the literal text "codestral-2508 · imported" — indistinguishable in the
 * picker — and the `-latest` alias (e.g. `mistral-large-latest`) is present in the
 * payload but invisible/unfindable because it displays under its base model's name
 * instead of its own.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-6957-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// A trimmed slice of the reporter's actual payload (issue #6957 comment attachment
// Untitled-1.json): 4 distinct ids in the "codestral" family that all resolve to
// the same upstream display name, plus the "mistral-large" base/-latest pair.
const MISTRAL_FAMILY_SLICE = [
  { id: "codestral-2508", name: "codestral-2508" },
  { id: "codestral-latest", name: "codestral-2508" },
  { id: "mistral-code-fim-latest", name: "codestral-2508" },
  { id: "mistral-code-latest", name: "codestral-2508" },
  { id: "mistral-large-2512", name: "mistral-large-2512" },
  { id: "mistral-large-latest", name: "mistral-large-2512" },
];

test("#6957 native Mistral provider with 2 connections: synced models produce a unique id per model but ambiguous/colliding display names", async () => {
  // Native Mistral provider, 2 API-key connections — mirrors the reporter's setup
  // (providerId "mistral", connectionCount 2, both accounts auto-syncing the same
  // upstream catalog).
  const conn1 = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "ac1",
    apiKey: "sk-mistral-ac1",
  });
  const conn2 = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "ac2",
    apiKey: "sk-mistral-ac2",
  });

  // Both connections sync the identical upstream catalog slice (same account
  // family just imported twice, matching "connectionCount: 2" in the reporter's
  // JSON — this is what produces the appearance of duplicates in the builder).
  for (const conn of [conn1, conn2]) {
    await modelsDb.replaceSyncedAvailableModelsForConnection(
      "mistral",
      conn.id,
      MISTRAL_FAMILY_SLICE.map((m) => ({ id: m.id, name: m.name, source: "imported" }))
    );
  }

  const payload = await getComboBuilderOptions();
  const mistral = payload.providers.find((p) => p.providerId === "mistral");
  assert.ok(mistral, "mistral provider must appear in the combo builder output");
  assert.equal(mistral!.connectionCount, 2, "sanity: 2 connections, matching the reporter's setup");

  const models = mistral!.models.filter((m) => MISTRAL_FAMILY_SLICE.some((f) => f.id === m.id));

  // No literal id duplicates — confirms the earlier needs-info hypothesis (a
  // per-connection modelMap dedup gap) was WRONG; every id is already unique.
  const ids = models.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length, "sanity: model ids are already unique");
  assert.equal(models.length, MISTRAL_FAMILY_SLICE.length, "all 6 distinct models must be present");

  // THE BUG: the picker renders `model.name` as the visible label
  // (page.tsx:3217-3220 `{model.name}{model.source ? ... : ""}`). Today,
  // `buildModelOptions()`/`addModelOption()` (builderOptions.ts) passes the
  // upstream-synced name straight through with no disambiguation, so 4 distinct
  // models render identical text and the "-latest" alias is indistinguishable
  // from its base model — reproducing both reported symptoms at once.
  const codestralLatest = models.find((m) => m.id === "codestral-latest")!;
  const codestralBase = models.find((m) => m.id === "codestral-2508")!;
  assert.notEqual(
    codestralLatest.name,
    codestralBase.name,
    "RED: 'codestral-latest' must render a distinguishable label from its base 'codestral-2508' " +
      "model — today both literally render 'codestral-2508 · imported', which is exactly the " +
      "visually-duplicated rows + invisible '-latest' alias reported in #6957"
  );

  const mistralLargeLatest = models.find((m) => m.id === "mistral-large-latest")!;
  const mistralLargeBase = models.find((m) => m.id === "mistral-large-2512")!;
  assert.notEqual(
    mistralLargeLatest.name,
    mistralLargeBase.name,
    "RED: 'mistral-large-latest' must render a distinguishable label from its base " +
      "'mistral-large-2512' model"
  );

  // Provider-wide: no two distinct model ids should ever render the same option text.
  const nameCollisions = new Map<string, string[]>();
  for (const model of models) {
    const bucket = nameCollisions.get(model.name) || [];
    bucket.push(model.id);
    nameCollisions.set(model.name, bucket);
  }
  const collidingNames = Array.from(nameCollisions.entries()).filter(([, ids]) => ids.length > 1);
  assert.equal(
    collidingNames.length,
    0,
    `RED: distinct model ids must not share an identical display name (collisions: ${JSON.stringify(collidingNames)})`
  );
});
