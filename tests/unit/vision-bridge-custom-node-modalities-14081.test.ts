/**
 * #14081 — custom OpenAI-compatible node models lose input_modalities, so
 * Vision Bridge reroutes image-capable models as text-only.
 *
 * A custom OpenAI-compatible node's synced model persists a per-connection
 * `supportsVision` boolean on its `syncedAvailableModels` row (see
 * `detectVisionInput` in `src/lib/providerModels/modelDiscovery.ts`).
 * `/v1/models` correctly reads that field through `buildSyncedCapabilities`
 * (`src/app/api/v1/models/syncedCapabilities.ts`) and reports
 * `capabilities.vision: true`.
 *
 * Before this fix, the Vision Bridge guardrail (`src/lib/guardrails/
 * visionBridge.ts`) gated on `getResolvedModelCapabilities(model).
 * supportsVision`, whose `resolveVisionCapability()` had no code path back
 * to `syncedAvailableModels` at all — so it disagreed with the catalog it
 * feeds and rerouted an image request as if the model were text-only.
 *
 * This suite proves the fix both through the on-demand DB read path
 * (`getResolvedModelCapabilities()` called without a snapshot) and through
 * the bulk-loaded `ModelCapabilityResolutionSnapshot` path, and pins the
 * positive-only contract: a row with `supportsVision: false` (or no row at
 * all) must never be upgraded to `true` by this source (#4071 safety).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vision-14081-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "vision-14081-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const snapshotModule = await import("../../src/lib/modelCapabilityResolutionSnapshot.ts");
const syncedCapabilitiesModule = await import("../../src/app/api/v1/models/syncedCapabilities.ts");

const PROVIDER_ID = "custom-node-14081-provider";
const CONNECTION_ID = "custom-node-14081-connection";
// Ids deliberately avoid any substring in VISION_MODEL_ID_FRAGMENTS
// (src/shared/constants/visionModels.ts) -- e.g. "-vision" -- so the last-resort
// model-id heuristic in resolveVisionCapability() can never contaminate these
// assertions; the only source under test is the synced custom-node row.
const VISION_MODEL_ID = "custom-node-14081-alpha-model";
const TEXT_ONLY_MODEL_ID = "custom-node-14081-beta-model";
const ABSENT_MODEL_ID = "custom-node-14081-gamma-model";

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

function seedFixture() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  const db = core.getDbInstance();

  // Exactly what detectVisionInput() persists for a custom OpenAI-compatible
  // node whose upstream /v1/models declared
  // architecture.input_modalities: ["text","image"] (vision model) vs a
  // sibling row that never set the flag (text-only model).
  const rows = [
    {
      id: VISION_MODEL_ID,
      name: VISION_MODEL_ID,
      source: "imported",
      supportsVision: true,
    },
    {
      id: TEXT_ONLY_MODEL_ID,
      name: TEXT_ONLY_MODEL_ID,
      source: "imported",
      supportsVision: false,
    },
  ];

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run(`${PROVIDER_ID}:${CONNECTION_ID}`, JSON.stringify(rows));
}

test("issue #14081: /v1/models catalog and getResolvedModelCapabilities agree on vision:true for a synced custom-node row", () => {
  seedFixture();

  // Sanity: this is the real helper /v1/models uses to build
  // `capabilities.vision` for a synced model row -- not in dispute, matches
  // the issue's own repro of the catalog output.
  const catalogCapabilities = syncedCapabilitiesModule.buildSyncedCapabilities(
    { supportsVision: true },
    PROVIDER_ID
  );
  assert.equal(
    catalogCapabilities?.vision,
    true,
    "sanity: /v1/models catalog reports vision:true for this synced row"
  );

  // On-demand path (no snapshot): the Vision Bridge guardrail's normal
  // per-request call shape.
  const resolvedOnDemand = modelCapabilities.getResolvedModelCapabilities({
    provider: PROVIDER_ID,
    model: VISION_MODEL_ID,
  });
  assert.strictEqual(
    resolvedOnDemand.supportsVision,
    true,
    "BUG #14081: getResolvedModelCapabilities (on-demand) must agree with the " +
      "catalog's vision:true for a synced custom-node row with supportsVision:true"
  );

  // Snapshot-backed path: catalog/build-local generation must see the same
  // verdict as the on-demand path (#9199 parity).
  const snapshot = snapshotModule.createModelCapabilityResolutionSnapshot();
  const resolvedFromSnapshot = modelCapabilities.getResolvedModelCapabilities(
    { provider: PROVIDER_ID, model: VISION_MODEL_ID },
    undefined,
    snapshot
  );
  assert.strictEqual(
    resolvedFromSnapshot.supportsVision,
    true,
    "BUG #14081: getResolvedModelCapabilities (snapshot-backed) must also agree " +
      "with the catalog's vision:true for a synced custom-node row"
  );
});

test("issue #14081: positive-only contract -- a synced row without supportsVision:true is never upgraded", () => {
  seedFixture();

  // A synced row with supportsVision:false must not be flipped to true by
  // this new source (it may still resolve to false/null through other
  // branches of resolveVisionCapability -- this source itself must add
  // nothing here).
  const resolvedTextOnly = modelCapabilities.getResolvedModelCapabilities({
    provider: PROVIDER_ID,
    model: TEXT_ONLY_MODEL_ID,
  });
  assert.notStrictEqual(
    resolvedTextOnly.supportsVision,
    true,
    "positive-only contract violated: a synced row with supportsVision:false " +
      "must never be upgraded to true by the syncedAvailableModels vision source"
  );

  // No synced row at all for this model id -- must not spuriously resolve to
  // true from this source either.
  const resolvedAbsent = modelCapabilities.getResolvedModelCapabilities({
    provider: PROVIDER_ID,
    model: ABSENT_MODEL_ID,
  });
  assert.notStrictEqual(
    resolvedAbsent.supportsVision,
    true,
    "a model id with no syncedAvailableModels row must not resolve to " +
      "supportsVision:true from this source"
  );
});
