import assert from "node:assert/strict";
import test from "node:test";

import {
  resolveBootRevalidationReason,
  resolveCodexCatalogAppVersion,
  scrubSyncedModelsWithCodexDenylist,
} from "../../src/shared/services/codexCatalogRevalidation.ts";

test("scrubSyncedModelsWithCodexDenylist drops the GPT-5.4 family and keeps others", () => {
  const { kept, removedIds } = scrubSyncedModelsWithCodexDenylist([
    { id: "gpt-5.6-sol", name: "Sol", source: "imported" },
    { id: "gpt-5.4", name: "Retired", source: "imported" },
    { id: "gpt-5.4-mini", name: "Retired Mini", source: "imported" },
    { id: "future-codex-experimental", name: "Future", source: "imported" },
  ] as any);

  assert.deepEqual(
    kept.map((m) => m.id),
    ["gpt-5.6-sol", "future-codex-experimental"]
  );
  assert.deepEqual(removedIds.sort(), ["gpt-5.4", "gpt-5.4-mini"]);
});

test("scrubSyncedModelsWithCodexDenylist is a no-op when nothing is denylisted", () => {
  const input = [
    { id: "gpt-5.6-sol", name: "Sol", source: "imported" },
    { id: "gpt-5.5-low", name: "5.5 Low", source: "imported" },
  ] as any;
  const { kept, removedIds } = scrubSyncedModelsWithCodexDenylist(input);
  assert.equal(removedIds.length, 0);
  assert.equal(kept.length, 2);
});

test("resolveCodexCatalogAppVersion prefers build sha then package version", () => {
  assert.equal(
    resolveCodexCatalogAppVersion({
      OMNIROUTE_BUILD_SHA: "abc123",
      npm_package_version: "9.9.9",
    }),
    "abc123"
  );
  assert.equal(
    resolveCodexCatalogAppVersion({
      npm_package_version: "3.8.47",
    }),
    "3.8.47"
  );
  assert.match(resolveCodexCatalogAppVersion({}), /^(pkg:|unknown)/);
});

test("resolveBootRevalidationReason only fires on first-start or upgrade", () => {
  assert.equal(resolveBootRevalidationReason(null, "v2"), "first-start");
  assert.equal(resolveBootRevalidationReason("", "v2"), "first-start");
  assert.equal(resolveBootRevalidationReason("v1", "v2"), "upgrade");
  assert.equal(resolveBootRevalidationReason("v2", "v2"), null);
});
