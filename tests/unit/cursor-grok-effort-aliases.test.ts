import assert from "node:assert/strict";
import test from "node:test";

import { enrichCursorCatalog } from "../../src/lib/db/models/activeSyncedCatalog.ts";
import { resolveRequestedModel } from "../../open-sse/utils/cursorAgentProtobuf.ts";

const base = [
  { id: "grok-4.7", name: "Grok 4.7", source: "imported" as const, inputTokenLimit: 200_000 },
];
const tiers = ["low", "medium", "high", "xhigh", "max"];

test("a live Grok 4.7 base exposes selectable verified effort aliases", () => {
  const catalog = enrichCursorCatalog("cursor", base);
  const aliases = catalog.filter((model) => model.id.startsWith("grok-4.7-"));
  assert.deepEqual(
    aliases.map((model) => model.id),
    tiers.map((tier) => `grok-4.7-${tier}`)
  );
  assert.ok(aliases.every((model) => model.inputTokenLimit === 200_000));
  assert.equal(catalog.filter((model) => model.id === "grok-4.7").length, 1);
});

test("wire membership excludes synthetic aliases so a selected alias becomes a ModelParameter", () => {
  const wireIds = new Set(enrichCursorCatalog("cursor", base, false).map((model) => model.id));
  assert.equal(wireIds.has("grok-4.7-low"), false);
  assert.deepEqual(resolveRequestedModel("grok-4.7-low", { liveCatalogIds: wireIds }), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "low" }],
  });
});

test("a provider-declared tier allowlist wins over fallback aliases and avoids duplicates", () => {
  const declared = [{ ...base[0], supportedThinkingEfforts: ["low", "high"] }];
  assert.deepEqual(
    enrichCursorCatalog("cursor", declared)
      .filter((model) => model.id.startsWith("grok-4.7-"))
      .map((model) => model.id),
    ["grok-4.7-low", "grok-4.7-high"]
  );
  const existing = [...declared, { ...base[0], id: "grok-4.7-high", name: "Upstream High" }];
  assert.equal(
    enrichCursorCatalog("cursor", existing).find((model) => model.id === "grok-4.7-high")?.name,
    "Upstream High"
  );
  assert.equal(
    enrichCursorCatalog("openai", base).some((model) => model.id === "grok-4.7-low"),
    false
  );
  assert.deepEqual(enrichCursorCatalog("cursor", []), []);
});
