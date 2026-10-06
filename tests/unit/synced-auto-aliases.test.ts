/**
 * Auto-aliases derived from synced Antigravity-family discovery: bare base
 * names map onto the default tier (high > medium > low) at the lowest alias
 * precedence, so freshly shipped tiered models resolve without hand-written
 * aliases (Gemini 3.7 Flash shipped with none).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-aliases-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { deriveSyncedTierAliases, getSyncedAutoAliases } =
  await import("../../src/lib/providerModels/syncedAutoAliases.ts");
const { normalizeAntigravityModelsResponse, mapAntigravityModelForClient } =
  await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");

test("tiered group aliases the bare base onto the high tier", () => {
  const aliases = deriveSyncedTierAliases({
    agy: ["gemini-3.7-flash-high", "gemini-3.7-flash-medium", "gemini-3.7-flash-low"],
  });
  assert.deepEqual(aliases, { "gemini-3.7-flash": "agy/gemini-3.7-flash-high" });
});

test("missing high tier falls back to medium, then low", () => {
  assert.deepEqual(deriveSyncedTierAliases({ agy: ["x-model-medium", "x-model-low"] }), {
    "x-model": "agy/x-model-medium",
  });
  assert.deepEqual(deriveSyncedTierAliases({ agy: ["y-model-low"] }), {
    "y-model": "agy/y-model-low",
  });
});

test("a callable bare base gets no alias", () => {
  const aliases = deriveSyncedTierAliases({
    agy: ["gemini-3.7-flash", "gemini-3.7-flash-high", "gemini-3.7-flash-low"],
  });
  assert.equal(aliases["gemini-3.7-flash"], undefined);
});

test("non-tiered model ids are ignored", () => {
  assert.deepEqual(deriveSyncedTierAliases({ agy: ["gemini-pro-agent", "claude-sonnet-4-6"] }), {});
});

test("agy provider wins over antigravity for the same base", () => {
  const aliases = deriveSyncedTierAliases({
    antigravity: ["gemini-3.7-flash-high"],
    agy: ["gemini-3.7-flash-medium"],
  });
  assert.deepEqual(aliases, { "gemini-3.7-flash": "agy/gemini-3.7-flash-medium" });
});

test("empty or unknown providers produce nothing", () => {
  assert.deepEqual(deriveSyncedTierAliases({}), {});
  assert.deepEqual(deriveSyncedTierAliases({ openai: ["gpt-x-high"] }), {});
  assert.deepEqual(deriveSyncedTierAliases({ agy: [] }), {});
});

test("discovery normalization carries numeric token limits when present", () => {
  const models = normalizeAntigravityModelsResponse({
    models: {
      "gemini-3.7-flash-high": {
        displayName: "Gemini 3.7 Flash (High)",
        inputTokenLimit: 1048576,
        outputTokenLimit: 65536,
      },
    },
  });
  assert.equal(models.length, 1);
  assert.equal(models[0].inputTokenLimit, 1048576);
  assert.equal(models[0].outputTokenLimit, 65536);
});

test("normalization accepts contextWindow/maxOutputTokens spellings and drops junk", () => {
  const models = normalizeAntigravityModelsResponse({
    models: {
      "model-a": { displayName: "A", contextWindow: 262144, maxOutputTokens: 32768 },
      "model-b": { displayName: "B", inputTokenLimit: "huge", outputTokenLimit: -1 },
      "model-c": { displayName: "C" },
    },
  });
  const byId = Object.fromEntries(models.map((m) => [m.id, m]));
  assert.equal(byId["model-a"].inputTokenLimit, 262144);
  assert.equal(byId["model-a"].outputTokenLimit, 32768);
  assert.equal(byId["model-b"].inputTokenLimit, undefined);
  assert.equal(byId["model-b"].outputTokenLimit, undefined);
  assert.equal(byId["model-c"].inputTokenLimit, undefined);
});

test("client mapping preserves token limits", () => {
  const mapped = mapAntigravityModelForClient(
    { id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash (High)", inputTokenLimit: 1048576 },
    "agy"
  );
  assert.equal(mapped.inputTokenLimit, 1048576);
  assert.equal(typeof mapped.id, "string");
});

test("getSyncedAutoAliases reads the live synced catalog", async () => {
  const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models");
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();

  // Only ACTIVE connections' synced rows count — seed a real agy connection.
  const connection = await createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "auto-alias-fixture",
    accessToken: "fixture-access-token",
    refreshToken: "fixture-refresh-token",
    isActive: true,
    testStatus: "active",
  });
  const connectionId = String((connection as Record<string, unknown>).id);

  await replaceSyncedAvailableModelsForConnection("agy", connectionId, [
    { id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash (High)" },
    { id: "gemini-3.7-flash-medium", name: "Gemini 3.7 Flash (Medium)" },
  ]);

  const aliases = await getSyncedAutoAliases();
  assert.equal(aliases["gemini-3.7-flash"], "agy/gemini-3.7-flash-high");
});
