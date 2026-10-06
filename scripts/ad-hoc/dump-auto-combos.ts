/**
 * One-shot diagnostic: resolve every built-in auto-combo template and dump the
 * resulting candidate pool, weight pack, and config as JSON for inspection.
 *
 * Run from repo root:
 *   node --import tsx/esm scripts/ad-hoc/dump-auto-combos.ts > _tasks/research/auto-combos-snapshot.json
 */

const { AUTO_TEMPLATE_VARIANTS, AUTO_SUFFIX_VARIANTS, AUTO_FAMILY_IDS } =
  await import("@omniroute/open-sse/services/autoCombo/builtinCatalog");
const { createBuiltinAutoCombo, prepareBuiltinAutoComboInputs } =
  await import("@omniroute/open-sse/services/autoCombo/builtinCatalog");

// Prepares the candidate pool once (DB reads: connections, settings, capabilities)
const prepared = await prepareBuiltinAutoComboInputs();

const allTemplates: string[] = [];
allTemplates.push(...Object.keys(AUTO_TEMPLATE_VARIANTS));
allTemplates.push(...AUTO_SUFFIX_VARIANTS);
allTemplates.push(...AUTO_FAMILY_IDS);

const results: Array<{
  template: string;
  candidateCount: number;
  models: string[];
  weightPack: Record<string, number>;
  explorationRate: number;
}> = [];

for (const name of allTemplates) {
  try {
    const suffix = name.slice("auto/".length);
    const combo = await createBuiltinAutoCombo(name, suffix, prepared as never);
    results.push({
      template: name,
      candidateCount: combo.models.length,
      models: combo.models.map((m) => m.model ?? `${m.providerId}/unknown`),
      weightPack: combo.weights ?? {},
      explorationRate: combo.explorationRate,
    });
  } catch (err) {
    results.push({
      template: name,
      candidateCount: 0,
      models: [],
      weightPack: {},
      explorationRate: 0,
    });
  }
}

console.log(JSON.stringify(results, null, 2));
