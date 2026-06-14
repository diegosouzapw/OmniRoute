#!/usr/bin/env node
// scripts/check/check-vuln-ratchet.mjs
// Catraca de vulnerabilidades de dependências via osv-scanner (Task 7.2 — Fase 7).
//
// Saída (stdout):
//   vulnCount=N         — total de vulnerabilidades encontradas (todos os severities)
//   vulnCount=SKIP reason=binary-absent   — osv-scanner não está no PATH
//
// Esta versão é ADVISORY (sai 0 sempre). O ratchet (direction:down) é gerenciado
// pelo motor quality-baseline.json no CI (Task 7.2 INT).
//
// Uso:
//   node scripts/check/check-vuln-ratchet.mjs
//   node scripts/check/check-vuln-ratchet.mjs --json   # imprime JSON bruto do osv-scanner
//   node scripts/check/check-vuln-ratchet.mjs --quiet  # suprime logs de diagnóstico

import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");

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
 * @param {string} osvBin - Caminho para o binário osv-scanner
 * @returns {object} JSON parseado do output
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
      process.exit(2);
    }
  }

  try {
    return JSON.parse(stdout);
  } catch (parseErr) {
    process.stderr.write(`[vuln-ratchet] ERRO ao parsear JSON do osv-scanner: ${parseErr.message}\n`);
    process.stderr.write(`[vuln-ratchet] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`);
    process.exit(2);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const osvBin = findOsvScanner();

  if (!osvBin) {
    // Skip gracioso: binário ausente — esperado em ambientes sem osv-scanner instalado.
    console.log("vulnCount=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] SKIP — osv-scanner não encontrado no PATH.\n" +
        "[vuln-ratchet] Instale via: https://google.github.io/osv-scanner/\n" +
        "[vuln-ratchet] ADVISORY — este gate sai 0 (ratchet entra no CI da Fase 7 INT).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const osvJson = runOsvScanner(osvBin);

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
    process.stderr.write(
      "[vuln-ratchet] ADVISORY — esta versão não falha pela contagem (ratchet entra no CI).\n"
    );
  }

  // Sai 0 sempre nesta versão (advisory)
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
