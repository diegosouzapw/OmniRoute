#!/usr/bin/env node
// scripts/check/check-model-lifecycle.mjs
// Gate anti-drift (#11503): as três tabelas mantidas à mão que decidem roteamento —
// FITNESS_TABLE (open-sse/services/autoCombo/taskFitness.ts, camada 4 do task fitness) e
// BUILT_IN_ALIASES (open-sse/services/modelDeprecation.ts, reescreve `body.model` em toda
// request), além de DEFAULT_DEGRADATION_MAP (backgroundTaskDetector.ts) — apodrecem em
// silêncio quando o fornecedor aposenta um modelo. Em
// release/v3.8.51 o resultado foi uma inversão de ranking (modelo morto 0.98 vs flagship
// vivo 0.50) e aliases apontando para ids obsoletos. Este gate compara as três contra o snapshot de
// ciclo de vida em config/quality/model-lifecycle.json (sem rede; regenerar com
// `npm run quality:refresh-model-lifecycle`).
//
// Quatro checagens, todas somadas antes do exit — nenhuma aborta as outras:
//   (a) nenhum padrão do FITNESS_TABLE pontua um id aposentado que o catálogo roteia;
//   (b) nenhum alvo de BUILT_IN_ALIASES está aposentado ou ausente do catálogo;
//   (c) todo id aposentado ainda presente no REGISTRY tem encaminhamento em
//       BUILT_IN_ALIASES ou consta em `allowedRetiredInCatalog` (a catraca a queimar);
//   (d) nenhuma linha de DEFAULT_DEGRADATION_MAP (open-sse/services/backgroundTaskDetector.ts)
//       tem origem ou destino aposentado. A origem aposentada é linha morta: checkLifecycle
//       devolve 410 antes de resolveBackgroundTaskRedirect rodar. O destino aposentado é o
//       normalmente rejeitado com 410 quando o ciclo de vida é validado novamente após o
//       redirecionamento; a resolução de alias ainda pode convertê-lo em um id aceito.
//
// (a) é deliberadamente restrita aos ids ROTEÁVEIS: linhas versionadas legítimas como
// `gpt-4o` também casam com ids aposentados que o catálogo nunca serviu
// (`gpt-4o-audio-preview`), e esses não podem inverter decisão de roteamento nenhuma.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const SNAPSHOT_PATH = path.join(ROOT, "config/quality/model-lifecycle.json");
const TASK_TYPES = ["coding", "review", "planning", "analysis", "debugging", "documentation"];

/** Ids de modelo que o catálogo consegue rotear (id + aliases de cada modelo). */
export function collectCatalogIds(registry) {
  const ids = new Set();
  for (const entry of Object.values(registry ?? {})) {
    for (const model of entry?.models ?? []) {
      if (typeof model?.id === "string") ids.add(model.id);
      for (const alias of model?.aliases ?? []) {
        if (typeof alias === "string") ids.add(alias);
      }
    }
  }
  return [...ids];
}

/** Um id do catálogo está aposentado quando sua forma nua (sem prefixo `vendor/`) está. */
export function isRetiredId(id, retiredIds) {
  const lower = String(id).toLowerCase();
  if (retiredIds.has(lower)) return true;
  const slash = lower.lastIndexOf("/");
  return slash !== -1 && retiredIds.has(lower.slice(slash + 1));
}

/** (a) Linhas do FITNESS_TABLE que ainda pontuam um modelo aposentado e roteável. */
export function findRetiredFitnessRows(routableRetiredIds, scoreFor, taskTypes = TASK_TYPES) {
  const violations = [];
  for (const id of routableRetiredIds) {
    for (const task of taskTypes) {
      const score = scoreFor(id, task);
      if (score !== null && score !== undefined) {
        violations.push(
          `${id} scores ${score} for "${task}" via FITNESS_TABLE (vendor retired it)`
        );
      }
    }
  }
  return violations;
}

/** (b) Alvos de alias aposentados ou fora do catálogo. */
export function findBadAliasTargets(aliases, catalogIds, retiredIds) {
  const catalog = new Set([...catalogIds].map((id) => id.toLowerCase()));
  const violations = [];
  for (const [source, target] of Object.entries(aliases)) {
    const lower = String(target).toLowerCase();
    if (!catalog.has(lower)) {
      violations.push(`${source} → ${target} (no provider in REGISTRY serves this id)`);
    } else if (retiredIds.has(lower)) {
      violations.push(`${source} → ${target} (the vendor has retired this id)`);
    }
  }
  return violations;
}

/** (c) Ids aposentados que o catálogo ainda roteia sem encaminhamento nem allowlist. */
export function findUnforwardedRetiredIds(routableRetiredIds, aliases, allowlist) {
  const allowed = new Set((allowlist ?? []).map((id) => String(id).toLowerCase()));
  return routableRetiredIds
    .filter((id) => !(id in aliases) && !allowed.has(String(id).toLowerCase()))
    .map((id) => `${id} is retired but still routable with no BUILT_IN_ALIASES forward`);
}

/** (d) Linhas de DEFAULT_DEGRADATION_MAP com origem ou destino aposentado. */
export function findRetiredDegradationRows(degradationMap, retiredIds) {
  const violations = [];
  for (const [source, target] of Object.entries(degradationMap ?? {})) {
    if (isRetiredId(source, retiredIds)) {
      violations.push(
        `${source} → ${target} (the vendor has retired the source id; checkLifecycle rejects it before the redirect runs)`
      );
    }
    if (isRetiredId(target, retiredIds)) {
      violations.push(`${source} → ${target} (the vendor has retired the target id)`);
    }
  }
  return violations;
}

export function readSnapshot(snapshotPath = SNAPSHOT_PATH) {
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const retiredIds = new Set(
    Object.entries(snapshot.retired ?? {})
      .filter(([, entry]) => entry?.status === "retired")
      .map(([id]) => id.toLowerCase())
  );
  return { snapshot, retiredIds };
}

async function loadProductionTables() {
  // Nenhum gate pode migrar o banco do operador: taskFitness.ts importa src/lib/db/core.ts,
  // então DATA_DIR aponta para um diretório descartável ANTES do import dinâmico.
  process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lifecycle-gate-"));
  const [
    { REGISTRY },
    { getStaticFitnessTableScore },
    { getBuiltInAliases },
    { getDefaultDegradationMap },
  ] = await Promise.all([
    import(pathToFileURL(path.join(ROOT, "open-sse/config/providers/index.ts")).href),
    import(pathToFileURL(path.join(ROOT, "open-sse/services/autoCombo/taskFitness.ts")).href),
    import(pathToFileURL(path.join(ROOT, "open-sse/services/modelDeprecation.ts")).href),
    import(pathToFileURL(path.join(ROOT, "open-sse/services/backgroundTaskDetector.ts")).href),
  ]);
  return { REGISTRY, getStaticFitnessTableScore, getBuiltInAliases, getDefaultDegradationMap };
}

function report(label, violations, hint) {
  if (!violations.length) {
    console.log(`[model-lifecycle] OK — ${label}`);
    return 0;
  }
  console.error(
    `[model-lifecycle] ${violations.length} violation(s) — ${label}:\n` +
      violations.map((v) => "  ✗ " + v).join("\n") +
      `\n  → ${hint}`
  );
  return violations.length;
}

async function main() {
  const { snapshot, retiredIds } = readSnapshot();
  const { REGISTRY, getStaticFitnessTableScore, getBuiltInAliases, getDefaultDegradationMap } =
    await loadProductionTables();

  const catalogIds = collectCatalogIds(REGISTRY);
  const routableRetired = catalogIds.filter((id) => isRetiredId(id, retiredIds)).sort();
  const aliases = getBuiltInAliases();
  const degradationMap = getDefaultDegradationMap();

  let failures = 0;
  failures += report(
    `FITNESS_TABLE scores none of the ${routableRetired.length} routable retired id(s)`,
    findRetiredFitnessRows(routableRetired, getStaticFitnessTableScore),
    "drop the row from FITNESS_TABLE in open-sse/services/autoCombo/taskFitness.ts, or replace it with the versioned id of the live successor."
  );
  failures += report(
    `all ${Object.keys(aliases).length} BUILT_IN_ALIASES targets are present in REGISTRY and absent from the retired-id snapshot`,
    findBadAliasTargets(aliases, catalogIds, retiredIds),
    "point the alias at the replacement the vendor publishes (see `sources` in config/quality/model-lifecycle.json). Never invent a target."
  );
  failures += report(
    "every routable retired id is forwarded or allowlisted",
    findUnforwardedRetiredIds(routableRetired, aliases, snapshot.allowedRetiredInCatalog),
    "add a BUILT_IN_ALIASES forward to the vendor's replacement, remove the model from the provider catalog, or (last resort) add the id to `allowedRetiredInCatalog` in config/quality/model-lifecycle.json with a tracking issue."
  );

  failures += report(
    `none of the ${Object.keys(degradationMap).length} DEFAULT_DEGRADATION_MAP rows names a retired id`,
    findRetiredDegradationRows(degradationMap, retiredIds),
    "drop the row from DEFAULT_DEGRADATION_MAP in open-sse/services/backgroundTaskDetector.ts (a retired source can never reach the redirect), or point a retired target at the replacement the vendor publishes (see `sources` in config/quality/model-lifecycle.json)."
  );

  if (failures) {
    console.error(`[model-lifecycle] FAIL — ${failures} violation(s) across 4 check(s).`);
    process.exit(1);
  }
  console.log(
    `[model-lifecycle] PASS — snapshot ${snapshot.generatedAt}, ${retiredIds.size} retired id(s), ${catalogIds.length} catalog id(s).`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`[model-lifecycle] ERROR — ${err?.message ?? err}`);
    process.exit(1);
  });
}
