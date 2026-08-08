import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildSyncedModelIdsByCanonicalProvider,
  shouldSuppressStaticModelBySyncedCoverage,
} from "../../src/app/api/v1/models/catalogSyncedCoverage.ts";
import type { SyncedAvailableModel } from "../../src/lib/db/models/synced.ts";

test("static model covered by synced list IS suppressed (current behavior kept)", () => {
  assert.equal(
    shouldSuppressStaticModelBySyncedCoverage({
      providerHasSynced: true,
      staticModelId: "gpt-5.6-luna",
      syncedModelIds: ["gpt-5.6-luna", "moonshotai/Kimi-K3"],
    }),
    true
  );
});

test("static model NOT covered by synced list is preserved (the bug fix)", () => {
  assert.equal(
    shouldSuppressStaticModelBySyncedCoverage({
      providerHasSynced: true,
      staticModelId: "deepseek/deepseek-v4-flash",
      syncedModelIds: ["gpt-5.6-luna", "moonshotai/Kimi-K3"],
    }),
    false
  );
});

test("static model covered by synced list with prefix normalization IS suppressed", () => {
  assert.equal(
    shouldSuppressStaticModelBySyncedCoverage({
      providerHasSynced: true,
      staticModelId: "deepseek/deepseek-v4-flash",
      syncedModelIds: ["deepseek/deepseek-v4-flash", "gpt-5.6-luna"],
    }),
    true
  );
});

test("no synced models -> nothing suppressed", () => {
  assert.equal(
    shouldSuppressStaticModelBySyncedCoverage({
      providerHasSynced: false,
      staticModelId: "deepseek/deepseek-v4-flash",
      syncedModelIds: [],
    }),
    false
  );
});

test("buildSyncedModelIdsByCanonicalProvider groups synced ids by canonical provider", () => {
  const syncedModels: Record<string, SyncedAvailableModel[]> = {
    "command-code": [
      { id: "gpt-5.6-luna", name: "Luna", source: "imported" },
      { id: "moonshotai/Kimi-K3", name: "Kimi K3", source: "imported" },
      { id: "", name: "Invalid", source: "imported" },
    ],
    deepseek: [{ id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", source: "imported" }],
  };
  const byCanonical = buildSyncedModelIdsByCanonicalProvider(
    syncedModels,
    (aliasOrId, fallback) => (aliasOrId === "cmd" ? "command-code" : fallback || aliasOrId),
    {},
    { "command-code": "cmd" }
  );
  const cmd = byCanonical.get("command-code");
  assert.ok(cmd);
  assert.ok(cmd.has("gpt-5.6-luna"));
  assert.ok(cmd.has("moonshotai/Kimi-K3"));
  assert.equal(cmd.has(""), false);
  const ds = byCanonical.get("deepseek");
  assert.ok(ds);
  assert.ok(ds.has("deepseek-v4-flash"));
});
