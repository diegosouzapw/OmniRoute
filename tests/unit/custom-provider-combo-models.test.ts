import test from "node:test";
import assert from "node:assert/strict";

const { getModelCatalogSourceLabel, normalizeModelCatalogSource } = await import(
  "../../src/shared/utils/modelCatalogSearch.ts"
);

// Ported from upstream PR decolua/9router#2018 (Hamsa_M):
// custom (openai-/anthropic-compatible) providers in the combo model-select modal
// now dynamically fetch their model catalog from the provider's upstream `/models`
// endpoint, merge it with alias/fallback/custom models (deduped by id) and tag the
// fetched entries with an "auto" source badge.

test('the "auto" source normalizes to itself and renders the "Auto" badge', () => {
  // Before the port the modal had no way to tag dynamically-fetched models, so an
  // unknown source fell through to "system" / "Built-in", which is misleading.
  assert.equal(normalizeModelCatalogSource("auto"), "auto");
  assert.equal(getModelCatalogSourceLabel("auto"), "Auto");
});

test('"auto" must not collide with the "auto-sync" import alias', () => {
  // `auto-sync` is an existing synced-import alias and must keep mapping to imported.
  assert.equal(normalizeModelCatalogSource("auto-sync"), "imported");
  assert.equal(getModelCatalogSourceLabel("auto-sync"), "Imported");
});

// Mirrors the modal's merge step: alias models win, fetched ("auto") models fill the
// gaps, deduped by id against alias + fallback + custom entries.
function mergeFetchedModels(
  nodePrefix: string,
  nodeModels: Array<{ id: string }>,
  fallbackEntries: Array<{ id: string }>,
  customEntries: Array<{ id: string }>,
  fetched: Array<Record<string, string>>
) {
  const fetchedEntries = fetched
    .map((m) => {
      const id = m.id || m.slug || m.model || m.name;
      return {
        id,
        name: m.name || m.displayName || id,
        value: `${nodePrefix}/${id}`,
        isFetched: true,
        source: "auto",
      };
    })
    .filter(
      (fm) =>
        fm.id &&
        !nodeModels.some((nm) => nm.id === fm.id) &&
        !fallbackEntries.some((fbm) => fbm.id === fm.id) &&
        !customEntries.some((cm) => cm.id === fm.id)
    );
  return [...nodeModels, ...fallbackEntries, ...customEntries, ...fetchedEntries];
}

test("fetched models merge with alias models, deduping by id", () => {
  const nodeModels = [{ id: "gpt-4", name: "GPT-4", value: "p/gpt-4" }];
  const fetched = [
    { id: "gpt-4", name: "GPT-4 Turbo" }, // duplicate of an alias → dropped
    { id: "gpt-3.5", name: "GPT-3.5" }, // new → kept, tagged auto
  ];

  const merged = mergeFetchedModels("p", nodeModels, [], [], fetched) as Array<{
    id: string;
    source?: string;
  }>;

  assert.equal(merged.length, 2);
  assert.deepEqual(
    merged.map((m) => m.id).sort(),
    ["gpt-3.5", "gpt-4"]
  );
  const auto = merged.find((m) => m.id === "gpt-3.5");
  assert.equal(auto?.source, "auto");
  // The pre-existing alias entry keeps its original (non-auto) identity.
  assert.equal(merged.find((m) => m.id === "gpt-4")?.source, undefined);
});

test("fetched ids fall back across id/slug/model/name keys", () => {
  const merged = mergeFetchedModels(
    "p",
    [],
    [],
    [],
    [{ slug: "llama-3" }, { model: "mixtral" }, { name: "qwen" }]
  ) as Array<{ id: string; value: string }>;
  assert.deepEqual(
    merged.map((m) => m.id).sort(),
    ["llama-3", "mixtral", "qwen"]
  );
  assert.equal(merged.find((m) => m.id === "llama-3")?.value, "p/llama-3");
});

test("fetched entries are deduped against fallback and custom models too", () => {
  const merged = mergeFetchedModels(
    "p",
    [],
    [{ id: "fb-model" }],
    [{ id: "custom-model" }],
    [{ id: "fb-model" }, { id: "custom-model" }, { id: "brand-new" }]
  ) as Array<{ id: string; source?: string }>;
  // Only the genuinely-new model survives as an auto entry.
  const autoEntries = merged.filter((m) => m.source === "auto");
  assert.deepEqual(
    autoEntries.map((m) => m.id),
    ["brand-new"]
  );
});
