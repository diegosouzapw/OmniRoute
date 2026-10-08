/**
 * #15069: import dialog must show a "warning" phase (not "done"/allModelsAlreadyImported)
 * when the /models endpoint fell back to the local catalog.
 *
 * Tests cover both pure helpers in modelImportWarning.ts:
 *  - extractImportWarning  — detects the warning field
 *  - resolveNoNewModelsPhase — selects "warning" vs "done" based on whether a fallback occurred
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { extractImportWarning, resolveNoNewModelsPhase } from "../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning.ts";

// ── extractImportWarning ──────────────────────────────────────────────────────

test("extractImportWarning returns null when no warning field", () => {
  assert.strictEqual(extractImportWarning({ models: [] }), null);
  assert.strictEqual(extractImportWarning({}), null);
  assert.strictEqual(extractImportWarning(null), null);
});

test("extractImportWarning returns the warning string when present", () => {
  const data = { models: [], warning: "API unavailable — using local catalog" };
  assert.strictEqual(extractImportWarning(data), "API unavailable — using local catalog");
});

test("extractImportWarning ignores blank / whitespace-only warnings", () => {
  assert.strictEqual(extractImportWarning({ warning: "" }), null);
  assert.strictEqual(extractImportWarning({ warning: "   " }), null);
});

// ── resolveNoNewModelsPhase (#15069) ─────────────────────────────────────────

test("#15069: fallback response with all-known models → warning phase, not done", () => {
  const importWarning = "API unavailable — using local catalog";
  const phase = resolveNoNewModelsPhase(importWarning);

  assert.strictEqual(
    phase,
    "warning",
    `expected phase "warning" but got "${phase}" — the dialog would show a false success`
  );
});

test("#15069: fallback warning phase must NOT be 'done'", () => {
  const importWarning = "API unavailable — using local catalog";
  const phase = resolveNoNewModelsPhase(importWarning);

  assert.notStrictEqual(
    phase,
    "done",
    "phase must not be 'done' when the catalog fell back to local"
  );
});

test("#15069: fetched remote catalog with no new models still reaches done (no warning)", () => {
  // No importWarning — the remote catalog was actually fetched.
  const phase = resolveNoNewModelsPhase(null);

  assert.strictEqual(
    phase,
    "done",
    `expected phase "done" for a genuine remote response but got "${phase}"`
  );
});

// ── i18n defects ─────────────────────────────────────────────────────────────

test("#15069: localCatalogFallbackStatus key must be present in messages/en.json", () => {
  const enJsonPath = path.resolve(process.cwd(), "src/i18n/messages/en.json");
  const enJson = JSON.parse(fs.readFileSync(enJsonPath, "utf8"));

  // Check its presence in the specific namespace ("providers" or "providerDetail" if appropriate)
  // Our injection put it as a sibling of "noNewModelsToImport" which exists inside "providers"->"noNewModelsToImport"
  const hasKey = !!enJson.providers?.localCatalogFallbackStatus;

  assert.ok(
    hasKey,
    "The i18n key 'localCatalogFallbackStatus' is missing from 'providers' object in messages/en.json. A missing key breaks the fallback string."
  );
});
