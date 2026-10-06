#!/usr/bin/env node
// Gera o export estável do catálogo OmniRoute consumido pelo OmniRoute Radar
// (`RADAR_EXPORT_URL` → `${DATA_DIR}/export-omniroute.json` no servidor privado).
//
// Por que existe: o servidor Radar (1 GB RAM na Akamai) NUNCA clona nem instala
// o OmniRoute; ele só baixa este JSON de uma URL estável. Antes o export vinha
// do snapshot gravado no deploy, preso à máquina do operador. Este script roda
// no CI do OmniRoute (que tem os módulos de catálogo + tsx), emite o export com
// PROVENIÊNCIA e o workflow o publica como asset de release de URL fixa.
//
// Contrato do consumidor (`src/feed/exportSource.ts` no radar-server): exige
// `budgets[]` não-vazio e lê `geradoEm`; chaves extras são ignoradas, então
// `totais`, `registry` e `provenance` viajam junto sem quebrar retrocompat.
//
// Uso (precisa de tsx, pois lê .ts):
//   node --import tsx/esm scripts/release/radar-export.mjs [saída.json]

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(DIR, "../.."); // …/OmniRoute
const SAIDA = process.argv[2] || path.join(REPO, "export-omniroute.json");

const { FREE_MODEL_BUDGETS } = await import(
  path.join(REPO, "open-sse/config/freeModelCatalog.data.ts")
);
const { computeFreeModelTotals } = await import(
  path.join(REPO, "open-sse/config/freeModelCatalog.ts")
);
const { REGISTRY } = await import(path.join(REPO, "open-sse/config/providerRegistry.ts"));

/**
 * Proveniência: quem/quando/de-qual-commit gerou o export. Cada campo é `null`
 * quando a origem é desconhecida — NUNCA inventamos um valor (D16: desconhecido
 * permanece `null`). No CI o GitHub popula as variáveis; localmente caímos no
 * `git` e, sem repositório, em `null`.
 */
function firstEnv(...names) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

function gitHead() {
  try {
    return execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || null;
  } catch {
    return null;
  }
}

function buildProvenance(geradoEm) {
  const sourceCommit = firstEnv("GITHUB_SHA") ?? gitHead();
  const sourceRef = firstEnv("GITHUB_REF_NAME", "GITHUB_REF");
  const server = firstEnv("GITHUB_SERVER_URL");
  const repository = firstEnv("GITHUB_REPOSITORY");
  const runId = firstEnv("GITHUB_RUN_ID");
  const runUrl = server && repository && runId ? `${server}/${repository}/actions/runs/${runId}` : null;
  return {
    generatedAt: geradoEm,
    generator: "scripts/release/radar-export.mjs",
    generatedBy: firstEnv("GITHUB_ACTIONS") ? "github-actions" : "manual",
    sourceCommit,
    sourceRef,
    runUrl,
  };
}

const geradoEm = new Date().toISOString();
const dados = {
  geradoEm,
  budgets: FREE_MODEL_BUDGETS,
  totais: computeFreeModelTotals(),
  // Só as chaves: o consumidor apenas pergunta "sabemos rotear este provider?".
  registry: Object.keys(REGISTRY).sort(),
  provenance: buildProvenance(geradoEm),
};

fs.mkdirSync(path.dirname(path.resolve(SAIDA)), { recursive: true });
fs.writeFileSync(SAIDA, JSON.stringify(dados));
console.log(
  `catálogo exportado → ${path.basename(SAIDA)}: ` +
    `${dados.budgets.length} modelos, ${dados.registry.length} providers no registry` +
    ` (commit ${dados.provenance.sourceCommit ?? "desconhecido"})`
);
