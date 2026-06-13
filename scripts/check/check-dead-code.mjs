#!/usr/bin/env node
// scripts/check/check-dead-code.mjs
// Gate de dead-code via knip — unused exports, unused files.
// Esta versão é ADVISORY (sai 0 sempre, exceto erro de execução).
// O ratchet no quality-baseline.json entra no bloco INT da Fase 7.
//
// Saída (stdout):
//   DEAD_EXPORTS=<n>    — exports/re-exports/tipos não utilizados
//   DEAD_FILES=<n>      — arquivos sem nenhum consumidor
//   DEAD_TOTAL=<n>      — soma de ambos (métrica primária para o ratchet)
//
// Use --json para imprimir o relatório completo do knip em JSON.
// Use --quiet para suprimir logs de diagnóstico.

import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const KNIP_BIN = path.join(ROOT, "node_modules", ".bin", "knip");
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");

/**
 * Conta dead exports e dead files a partir do output JSON do knip.
 *
 * O reporter JSON do knip emite:
 *   { issues: Array<{ file, exports?, files?, types?, nsExports?, nsTypes?, ... }> }
 *
 * Cada entrada em `exports`, `types`, `nsExports`, `nsTypes` é um símbolo morto naquele
 * arquivo. A presença do arquivo em si na lista (campo `files: []` não-vazio ou arquivo
 * sem outros campos relevantes com `files: true` no include) indica arquivo morto.
 *
 * @param {object} knipJson - Objeto JSON parseado do output do knip
 * @returns {{ deadExports: number, deadFiles: number, deadTotal: number }}
 */
export function parseKnipMetrics(knipJson) {
  if (!knipJson || !Array.isArray(knipJson.issues)) {
    return { deadExports: 0, deadFiles: 0, deadTotal: 0 };
  }

  let deadExports = 0;
  let deadFiles = 0;

  for (const fileEntry of knipJson.issues) {
    // Dead file: o arquivo aparece na lista com campo `files` populado
    // (knip emite um entry com files:[] indicando "este arquivo é morto")
    if (Array.isArray(fileEntry.files) && fileEntry.files.length > 0) {
      deadFiles += fileEntry.files.length;
    }
    // Alguns reporters indicam arquivo morto sem campo files — o entry existe
    // sem exports/types = o arquivo inteiro não tem consumidor
    // (conservador: só contar quando files[] está presente e populado)

    // Dead exports: somar todos os símbolos mortos por tipo de export
    const exportFields = ["exports", "types", "nsExports", "nsTypes", "enumMembers", "namespaceMembers", "duplicates"];
    for (const field of exportFields) {
      if (Array.isArray(fileEntry[field])) {
        deadExports += fileEntry[field].length;
      }
    }
  }

  return {
    deadExports,
    deadFiles,
    deadTotal: deadExports + deadFiles,
  };
}

function runKnip() {
  const args = [
    "--reporter", "json",
    "--no-progress",
    "--no-exit-code",  // não falha por contagem — só coletamos métricas
  ];

  if (!QUIET) {
    process.stderr.write("[dead-code] Rodando knip --reporter json ...\n");
  }

  let stdout;
  try {
    stdout = execFileSync(KNIP_BIN, args, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 128 * 1024 * 1024,
      timeout: 300_000, // 5 min (knip pode ser lento em monorepos grandes)
    });
  } catch (err) {
    // knip sai com código != 0 quando encontra issues; o JSON ainda vai no stdout.
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) {
      process.stderr.write(`[dead-code] ERRO ao executar knip: ${err.message}\n`);
      process.exit(2);
    }
  }

  let knipJson;
  try {
    knipJson = JSON.parse(stdout);
  } catch (parseErr) {
    process.stderr.write(`[dead-code] ERRO ao parsear JSON do knip: ${parseErr.message}\n`);
    process.stderr.write(`[dead-code] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`);
    process.exit(2);
  }

  return knipJson;
}

function main() {
  const knipJson = runKnip();

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(knipJson, null, 2) + "\n");
    return;
  }

  const { deadExports, deadFiles, deadTotal } = parseKnipMetrics(knipJson);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
  console.log(`DEAD_EXPORTS=${deadExports}`);
  console.log(`DEAD_FILES=${deadFiles}`);
  console.log(`DEAD_TOTAL=${deadTotal}`);

  if (!QUIET) {
    process.stderr.write(
      `[dead-code] exports mortos: ${deadExports} | arquivos mortos: ${deadFiles} | total: ${deadTotal}\n`
    );
    process.stderr.write(
      `[dead-code] ADVISORY — esta versão não falha pela contagem (ratchet entra no INT da Fase 7).\n`
    );
  }

  // Sai 0 sempre nesta versão (advisory)
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
