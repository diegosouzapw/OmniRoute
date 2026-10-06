import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveModelAliasWithSeedFallback } from "../../src/lib/modelAliasResolver";

// Hermetic test: isolate DATA_DIR so the alias lookup reads an EMPTY
// modelAliases namespace (fresh install state) instead of the operator's live
// DB. This is the exact scenario the 401 fix targets — aliases unmapped in
// the DB must fall back to the static seed.
async function withEmptyAliasDb(fn: () => Promise<void>) {
  const prevDataDir = process.env.DATA_DIR;
  const prevKey = process.env.STORAGE_ENCRYPTION_KEY;
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "alias-seed-fallback-"));
  process.env.DATA_DIR = dataDir;
  delete process.env.STORAGE_ENCRYPTION_KEY;

  try {
    // Reset the module-level DB singleton so it binds to the temp dir.
    const { resetDbInstance } = await import("../../src/lib/db/core");
    resetDbInstance?.();
    await fn();
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    const { resetDbInstance } = await import("../../src/lib/db/core");
    resetDbInstance?.();
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    if (prevKey === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = prevKey;
  }
}

test("resolveModelAliasWithSeedFallback: falls back to DEFAULT_MODEL_ALIAS_SEED for unmapped models", async () => {
  await withEmptyAliasDb(async () => {
    const opus = await resolveModelAliasWithSeedFallback("claude-opus-4-6-thinking");
    assert.equal(opus, "agy/claude-opus-4-6-thinking");

    const flash = await resolveModelAliasWithSeedFallback("gemini-3.6-flash-low");
    assert.equal(flash, "agy/gemini-3.6-flash-low");

    const unknown = await resolveModelAliasWithSeedFallback("unknown-custom-model-999");
    assert.equal(unknown, "unknown-custom-model-999");
  });
});

// Regression for the 401 the PR fixes: a client sends a model alias that is
// NOT in the database alias table (empty modelAliases namespace = fresh
// install / wiped aliases) but IS in the static seed. Before the fix the
// alias resolved to itself → upstream rejects with 401 "no such model"; after
// the fix it maps to the seed target (agy/...), which routes to a real model.
test("resolveModelAliasWithSeedFallback: unmapped-but-seeded alias resolves (401 regression)", async () => {
  await withEmptyAliasDb(async () => {
    const resolved = await resolveModelAliasWithSeedFallback("claude-opus-4-6-thinking");
    assert.equal(resolved, "agy/claude-opus-4-6-thinking");
  });
});

// The exported name must not collide with the sync resolveModelAlias in
// modelDeprecation.ts / modelSpecs.ts (maintainer review note on PR #10124).
test("resolveModelAliasWithSeedFallback: export name is distinct from the sync resolveModelAlias", async () => {
  const mod = await import("../../src/lib/modelAliasResolver");
  assert.equal(typeof mod.resolveModelAliasWithSeedFallback, "function");
  assert.equal(mod.resolveModelAlias, undefined, "must not export the colliding sync name");
});

test("resolveModelAliasWithSeedFallback: preserves model name when a combo exists with the same name", async () => {
  await withEmptyAliasDb(async () => {
    const { createCombo } = await import("../../src/lib/db/combos");
    const { setModelAlias } = await import("../../src/lib/db/models/aliases");
    const { invalidateAliasCache } = await import("../../src/lib/modelAliasResolver");

    // Simulate managed alias synced from provider
    await setModelAlias("gemini-3.7-flash", "oc/gemini-3.7-flash");
    invalidateAliasCache();

    // Create a combo named "gemini-3.7-flash"
    await createCombo({
      id: "test-combo-gemini-3-7-flash",
      name: "gemini-3.7-flash",
      models: [
        {
          id: "target-1",
          model: "agy/gemini-3.7-flash-high",
          providerId: "agy",
          weight: 100,
        },
      ],
      strategy: "round-robin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Should NOT be rewritten to "oc/gemini-3.7-flash" because the combo takes precedence
    const resolved = await resolveModelAliasWithSeedFallback("gemini-3.7-flash");
    assert.equal(resolved, "gemini-3.7-flash");

    // Explicit combo/ prefix should also remain unchanged
    const explicitCombo = await resolveModelAliasWithSeedFallback("combo/gemini-3.7-flash");
    assert.equal(explicitCombo, "combo/gemini-3.7-flash");
  });
});

test("resolveModelAliasWithSeedFallback: skips alias when the target model is hidden", async () => {
  await withEmptyAliasDb(async () => {
    const { setModelAlias } = await import("../../src/lib/db/models/aliases");
    const { mergeModelCompatOverride } = await import("../../src/lib/db/models");
    const { invalidateAliasCache } = await import("../../src/lib/modelAliasResolver");

    // Set alias pointing to opencode/glm-5
    await setModelAlias("glm-5", "opencode/glm-5");
    invalidateAliasCache();

    // Before hiding, alias resolves to target
    const beforeHidden = await resolveModelAliasWithSeedFallback("glm-5");
    assert.equal(beforeHidden, "opencode/glm-5");

    // Hide the model
    mergeModelCompatOverride("opencode", "glm-5", { isHidden: true });

    // After hiding, alias should be skipped and return original model name
    const afterHidden = await resolveModelAliasWithSeedFallback("glm-5");
    assert.equal(afterHidden, "glm-5");
  });
});
