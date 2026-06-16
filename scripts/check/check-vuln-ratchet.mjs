#!/usr/bin/env node
// scripts/check/check-vuln-ratchet.mjs
// Catraca de vulnerabilidades de dependências via osv-scanner (Task 7.2 — Fase 7).
//
// Saída (stdout):
//   vulnCount=N         — total de vulnerabilidades encontradas (todos os severities)
//   vulnCount=SKIP reason=binary-absent   — osv-scanner não está no PATH
//
// Por default é ADVISORY (sai 0 sempre). Passe --ratchet para tornar BLOQUEANTE:
// lê metrics.vulnCount.value de config/quality/quality-baseline.json, compara a
// contagem MEDIDA e SAI 1 SE — E SOMENTE SE — a medida for MAIOR que o baseline
// (regressão real, direction:down). Qualquer SKIP gracioso (binário ausente,
// osv.dev/rede inacessível, erro de parse) SAI 0 mesmo com --ratchet — uma falha
// de MEDIÇÃO nunca bloqueia, só uma regressão medida bloqueia.
//
// NB (variância de CVE): osv mede contra um banco de CVEs que cresce de forma
// contínua. Um PR que NÃO toca dependências pode subitamente medir vulnCount >
// baseline porque um novo CVE foi divulgado nas deps existentes — isso é o
// comportamento ESPERADO de um gate de CVE bloqueante, não uma regressão de
// produto. O remédio é (a) bumpar a dep afetada (preferível) ou, se não houver
// fix, (b) re-baseline metrics.vulnCount com justificativa + issue de tracking.
// Ver docs/security/SUPPLY_CHAIN.md → "Variância de CVE".
//
// Uso:
//   node scripts/check/check-vuln-ratchet.mjs
//   node scripts/check/check-vuln-ratchet.mjs --json    # imprime JSON bruto do osv-scanner
//   node scripts/check/check-vuln-ratchet.mjs --quiet   # suprime logs de diagnóstico
//   node scripts/check/check-vuln-ratchet.mjs --ratchet  # falha (exit 1) numa regressão

import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const RATCHET = process.argv.includes("--ratchet");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta vulnerabilidades no JSON emitido por `osv-scanner --format json`.
 *
 * Formato do osv-scanner v1+:
 * {
 *   results: [
 *     {
 *       packages: [
 *         {
 *           package: { name, version, ecosystem },
 *           vulnerabilities: [ { id, aliases, affected, ... }, ... ],
 *           groups: [ { ids: [...] }, ... ]
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 * }
 *
 * Contagem: cada entrada em `vulnerabilities[]` de cada package conta como 1 vuln.
 * Se `groups` estiver presente e tiver menos entradas que `vulnerabilities`, usamos
 * `groups.length` para deduplificar (mesma vuln em múltiplos pacotes conta 1x por
 * grupo). Caso contrário, contamos `vulnerabilities.length`.
 *
 * @param {object|null} osvJson - Objeto JSON parseado do osv-scanner
 * @returns {{ vulnCount: number, bySeverity: Record<string, number> }}
 */
export function parseOsvJson(osvJson) {
  if (!osvJson || !Array.isArray(osvJson.results)) {
    return { vulnCount: 0, bySeverity: {} };
  }

  let vulnCount = 0;
  const bySeverity = {};

  for (const result of osvJson.results) {
    if (!Array.isArray(result.packages)) continue;

    for (const pkg of result.packages) {
      if (!Array.isArray(pkg.vulnerabilities)) continue;

      // Use groups for deduplication when available (same vuln in multiple paths)
      const pkgCount = Array.isArray(pkg.groups) && pkg.groups.length > 0
        ? pkg.groups.length
        : pkg.vulnerabilities.length;

      vulnCount += pkgCount;

      // Collect severity info from the vulnerability entries
      for (const vuln of pkg.vulnerabilities) {
        const severity = extractSeverity(vuln);
        bySeverity[severity] = (bySeverity[severity] ?? 0) + 1;
      }
    }
  }

  return { vulnCount, bySeverity };
}

/**
 * Extrai a severidade de uma entrada de vulnerabilidade do osv-scanner.
 * Tenta database_specific.severity, depois severity[0].type, depois "UNKNOWN".
 *
 * @param {object} vuln - Entrada de vulnerabilidade do osv-scanner
 * @returns {string}
 */
export function extractSeverity(vuln) {
  if (!vuln) return "UNKNOWN";

  // osv-scanner v2 field: database_specific.severity (common in OSV schema)
  const dbSeverity = vuln.database_specific?.severity;
  if (typeof dbSeverity === "string" && dbSeverity.length > 0) {
    return dbSeverity.toUpperCase();
  }

  // CVSS severity array: [{ type: "CVSS_V3", score: "CVSS:3.1/..." }, ...]
  if (Array.isArray(vuln.severity) && vuln.severity.length > 0) {
    const first = vuln.severity[0];
    if (typeof first?.type === "string") {
      return first.type;
    }
  }

  return "UNKNOWN";
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Avalia a contagem MEDIDA de vulnerabilidades contra o baseline.
 * Direction: down (a contagem só pode CAIR — mais vulns = regressão).
 *
 * @param {number} current  - Contagem de vulnerabilidades medida agora.
 * @param {number} baseline - Contagem congelada em quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateVulnRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Lê metrics.vulnCount.value do quality-baseline.json.
 * Retorna null se o arquivo ou a métrica estiverem ausentes (sem baseline não há
 * ratchet possível — o caller trata como SKIP gracioso, exit 0).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineVulnValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.vulnCount;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `osv-scanner` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho absoluto para o binário, ou null se ausente.
 */
export function findOsvScanner() {
  try {
    const result = spawnSync("which", ["osv-scanner"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  } catch {
    // which não disponível — tentar command -v via sh
  }

  // Fallback: tentar executar diretamente para verificar ENOENT
  try {
    const result = spawnSync("osv-scanner", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "osv-scanner"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

/**
 * Executa o osv-scanner sobre o lockfile/diretório.
 * Usa execFileSync sem shell interpolation (Hard Rule #13).
 *
 * Em uma falha de MEDIÇÃO (osv-scanner não produziu JSON — rede/osv.dev
 * inacessível, timeout, JSON inválido) retorna { skip: true, reason } em vez de
 * abortar o processo: o caller traduz isso num SKIP gracioso (exit 0 mesmo com
 * --ratchet). Uma falha de medição NUNCA bloqueia; só uma regressão MEDIDA bloqueia.
 *
 * @param {string} osvBin - Caminho para o binário osv-scanner
 * @returns {{ json: object } | { skip: true, reason: string }}
 */
function runOsvScanner(osvBin) {
  const args = [
    "--format", "json",
    "--lockfile", path.join(ROOT, "package-lock.json"),
  ];

  if (!QUIET) {
    process.stderr.write("[vuln-ratchet] Rodando osv-scanner --format json ...\n");
  }

  let stdout;
  try {
    stdout = execFileSync(osvBin, args, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 120_000, // 2 min
    });
  } catch (err) {
    // osv-scanner sai com código != 0 quando encontra vulnerabilidades;
    // o JSON ainda vai no stdout.
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) {
      process.stderr.write(`[vuln-ratchet] ERRO ao executar osv-scanner: ${err.message}\n`);
      return { skip: true, reason: "osv-error" };
    }
  }

  try {
    return { json: JSON.parse(stdout) };
  } catch (parseErr) {
    process.stderr.write(`[vuln-ratchet] ERRO ao parsear JSON do osv-scanner: ${parseErr.message}\n`);
    process.stderr.write(`[vuln-ratchet] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`);
    return { skip: true, reason: "parse-error" };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const osvBin = findOsvScanner();

  if (!osvBin) {
    // Skip gracioso: binário ausente — esperado em ambientes sem osv-scanner instalado.
    // SKIP sai 0 MESMO com --ratchet (binário ausente nunca bloqueia).
    console.log("vulnCount=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] SKIP — osv-scanner não encontrado no PATH.\n" +
        "[vuln-ratchet] Instale via: https://google.github.io/osv-scanner/\n" +
        "[vuln-ratchet] SKIP gracioso — sai 0 mesmo com --ratchet (binário ausente nunca bloqueia).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const osvResult = runOsvScanner(osvBin);

  // Falha de MEDIÇÃO (rede/osv.dev inacessível, timeout, JSON inválido) → SKIP
  // gracioso, sai 0 mesmo com --ratchet (uma falha de medição nunca bloqueia).
  if (osvResult.skip) {
    console.log(`vulnCount=SKIP reason=${osvResult.reason}`);
    if (!QUIET) {
      process.stderr.write(
        `[vuln-ratchet] SKIP — osv-scanner não produziu uma medição (${osvResult.reason}).\n` +
        "[vuln-ratchet] SKIP gracioso — sai 0 mesmo com --ratchet (falha de medição nunca bloqueia).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const osvJson = osvResult.json;

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(osvJson, null, 2) + "\n");
    return;
  }

  const { vulnCount, bySeverity } = parseOsvJson(osvJson);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
  console.log(`vulnCount=${vulnCount}`);

  if (!QUIET) {
    const severitySummary = Object.entries(bySeverity)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ") || "nenhuma";
    process.stderr.write(
      `[vuln-ratchet] Total de vulnerabilidades: ${vulnCount} (${severitySummary})\n`
    );
  }

  // Medição bem-sucedida → aplica o ratchet (bloqueante só com --ratchet).
  applyRatchet(vulnCount);
}

/**
 * Aplica o ratchet (direction:down) sobre a contagem medida vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet: exit 1 numa regressão real
 * (medida > baseline). Baseline ausente → SKIP gracioso (exit 0).
 *
 * @param {number} vulnCount - Contagem MEDIDA (medição bem-sucedida).
 */
function applyRatchet(vulnCount) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] ADVISORY — não falha pela contagem (passe --ratchet para bloquear regressão).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineVulnValue(BASELINE_PATH);
  if (baselineValue === null) {
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] baseline ausente (metrics.vulnCount) — SKIP gracioso, sai 0.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const { regressed } = evaluateVulnRatchet(vulnCount, baselineValue);
  if (regressed) {
    process.stderr.write(
      `[vuln-ratchet] REGRESSÃO — ${vulnCount} vulnerabilidades > baseline ${baselineValue}\n` +
        "  → Bumpe a(s) dep(s) afetada(s) (preferível). Se não houver fix, re-baseline\n" +
        "    metrics.vulnCount em config/quality/quality-baseline.json com justificativa\n" +
        "    + issue de tracking. Ver docs/security/SUPPLY_CHAIN.md → 'Variância de CVE'.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[vuln-ratchet] OK — sem regressão (${vulnCount} vulns, baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
