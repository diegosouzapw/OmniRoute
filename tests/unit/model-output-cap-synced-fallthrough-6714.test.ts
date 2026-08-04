/**
 * #6714 follow-up — `getExplicitModelOutputCap` must fall through to the
 * registry/spec output cap when a `synced` capability row exists but its
 * `limit_output` is not a number.
 *
 * Root cause: the function used to short-circuit to `null` on ANY truthy
 * `synced` row:
 *
 *   if (synced) return typeof synced.limit_output === "number" ? synced.limit_output : null;
 *
 * models.dev rows commonly omit `limit_output` (it stays `null`) even when
 * the model itself has a well-known output cap registered in
 * `providerRegistry.ts`. In that case the old code returned `null` instead
 * of falling through — silently disabling the reasoning-token-buffer
 * clamp added by #6714 (`clampReasoningTokensToOutputCap` in
 * open-sse/services/combo.ts) for any model that happens to have a synced
 * row without an output limit.
 *
 * The fix mirrors the `??`-chain precedence already used by
 * `getResolvedModelCapabilities().maxOutputTokens`:
 *
 *   synced?.limit_output ?? registryModel?.maxOutputTokens ?? spec?.maxOutputTokens ?? null
 *
 * i.e. only return the synced value when it actually IS a number; otherwise
 * fall through to the registry cap, then the static spec cap.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-cap-synced-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

// Pick a real registry model that has a known, positive maxOutputTokens so the
// test proves the fallthrough resolves an ACTUAL registry cap, not a fixture.
function findRegistryModelWithOutputCap() {
  for (const [provider, models] of Object.entries(PROVIDER_MODELS)) {
    for (const model of models as Array<{ id: string; maxOutputTokens?: number | null }>) {
      if (typeof model.maxOutputTokens === "number" && model.maxOutputTokens > 0) {
        return { provider, modelId: model.id, maxOutputTokens: model.maxOutputTokens };
      }
    }
  }
  throw new Error("no registry model with maxOutputTokens found — fixture assumption broke");
}

const { provider, modelId, maxOutputTokens } = findRegistryModelWithOutputCap();

function buildCapability(overrides: Record<string, unknown> = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // The synced-capabilities module keeps an in-memory cache across DB resets
  // (`cachedCapabilitiesLoadedAll`) — clear it too so each test starts from a
  // truly empty synced-capability set instead of leaking the previous test's row.
  modelsDevSync.clearModelsDevCapabilities();
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6714 synced row present but limit_output missing falls through to the registry output cap", () => {
  // Seed a synced capability row for this exact provider/model with
  // limit_output left null (mirrors real models.dev rows that omit it).
  modelsDevSync.saveModelsDevCapabilities({
    [provider]: {
      [modelId]: buildCapability({ limit_output: null, status: "stable" }),
    },
  });

  const cap = modelCapabilities.getExplicitModelOutputCap(`${provider}/${modelId}`);
  assert.equal(
    cap,
    maxOutputTokens,
    "must fall through to the registry maxOutputTokens, not short-circuit to null"
  );
});

test("#6714 synced row with a real numeric limit_output still wins over the registry cap", () => {
  const syncedOutputCap = maxOutputTokens + 1234;
  modelsDevSync.saveModelsDevCapabilities({
    [provider]: {
      [modelId]: buildCapability({ limit_output: syncedOutputCap, status: "stable" }),
    },
  });

  const cap = modelCapabilities.getExplicitModelOutputCap(`${provider}/${modelId}`);
  assert.equal(cap, syncedOutputCap, "a real numeric synced limit_output must take precedence");
});

test("#6714 no synced row at all still resolves the registry output cap (no regression)", () => {
  const cap = modelCapabilities.getExplicitModelOutputCap(`${provider}/${modelId}`);
  assert.equal(cap, maxOutputTokens);
});
