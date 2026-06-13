#!/usr/bin/env node
// scripts/check/check-secrets.mjs
// Catraca de secret scanning via gitleaks (Task 7.18 — Fase 7).
//
// Complementa `check-public-creds.mjs` (Fase 6, cobre credenciais OAuth públicas
// conhecidas em 2 arquivos específicos): este gate pega a classe geral de secrets —
// `const API_KEY = "sk-…"`, tokens em config/teste/docs, secrets em histórico.
//
// Saída (stdout):
//   secretFindings=N      — número de findings do gitleaks
//   secretFindings=SKIP reason=binary-absent   — gitleaks não está no PATH
//
// Esta versão é ADVISORY (sai 0 sempre). O ratchet (direction:down) é gerenciado
// pelo motor quality-baseline.json no CI (Task 7.18 INT).
//
// Uso:
//   node scripts/check/check-secrets.mjs
//   node scripts/check/check-secrets.mjs --json    # imprime JSON bruto do gitleaks
//   node scripts/check/check-secrets.mjs --quiet   # suprime logs de diagnóstico

import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const GITLEAKS_CONFIG = path.join(ROOT, ".gitleaks.toml");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta findings no JSON emitido por `gitleaks detect --report-format json`.
 *
 * O gitleaks emite um array de findings (ou array vazio / null quando limpo):
 * [
 *   {
 *     Description: string,
 *     StartLine: number,
 *     EndLine: number,
 *     Match: string,       // valor mascarado ou trecho
 *     Secret: string,      // valor mascarado
 *     File: string,        // caminho relativo
 *     Commit: string,
 *     Entropy: number,
 *     Author: string,
 *     Email: string,
 *     Date: string,
 *     Tags: string[],
 *     RuleID: string,
 *     Fingerprint: string
 *   },
 *   ...
 * ]
 *
 * @param {Array|null} gitleaksJson - Array de findings do gitleaks (ou null)
 * @returns {{ findingCount: number, byRule: Record<string, number>, byFile: Record<string, number> }}
 */
export function parseGitleaksJson(gitleaksJson) {
  // null ou array vazio = nenhum finding
  if (gitleaksJson === null || (Array.isArray(gitleaksJson) && gitleaksJson.length === 0)) {
    return { findingCount: 0, byRule: {}, byFile: {} };
  }

  if (!Array.isArray(gitleaksJson)) {
    return { findingCount: 0, byRule: {}, byFile: {} };
  }

  let findingCount = 0;
  const byRule = {};
  const byFile = {};

  for (const finding of gitleaksJson) {
    if (!finding || typeof finding !== "object") continue;

    findingCount++;

    // Agrupar por RuleID (gitleaks usa PascalCase)
    const ruleId = finding.RuleID ?? finding.ruleId ?? "unknown";
    byRule[ruleId] = (byRule[ruleId] ?? 0) + 1;

    // Agrupar por arquivo
    const file = finding.File ?? finding.file ?? "unknown";
    byFile[file] = (byFile[file] ?? 0) + 1;
  }

  return { findingCount, byRule, byFile };
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `gitleaks` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho para o binário, ou null se ausente.
 */
export function findGitleaks() {
  try {
    const result = spawnSync("which", ["gitleaks"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  } catch {
    // which não disponível
  }

  // Fallback: tentar executar diretamente para verificar ENOENT
  try {
    const result = spawnSync("gitleaks", ["version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "gitleaks"; // encontrado no PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const gitleaksBin = findGitleaks();

  if (!gitleaksBin) {
    console.log("secretFindings=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] SKIP — gitleaks não encontrado no PATH.\n" +
        "[check-secrets] Instale via: https://github.com/gitleaks/gitleaks\n" +
        "[check-secrets] ADVISORY — este gate sai 0 (ratchet entra no CI da Fase 7 INT).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  // Construir args sem interpolação de variáveis no script (Hard Rule #13)
  const args = [
    "detect",
    "--no-git",             // escanear diretório em vez de histórico git (mais rápido em CI)
    "--report-format", "json",
    "--report-path", "-",  // output para stdout
    "--source", ROOT,
    "--no-banner",
  ];

  // Adicionar config personalizada se existir
  if (fs.existsSync(GITLEAKS_CONFIG)) {
    args.push("--config", GITLEAKS_CONFIG);
  }

  if (!QUIET) {
    process.stderr.write("[check-secrets] Rodando gitleaks detect --no-git --report-format json ...\n");
  }

  let stdout = "";
  try {
    stdout = execFileSync(gitleaksBin, args, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 120_000, // 2 min
    });
  } catch (err) {
    // exit 1 com stdout = findings encontrados (comportamento esperado do gitleaks)
    stdout = err.stdout ? String(err.stdout) : "";
    const stderr = err.stderr ? String(err.stderr) : "";

    if (err.status === 1 && stdout.trim()) {
      // Normal: gitleaks achou findings e saiu com exit 1
    } else if (!stdout.trim()) {
      process.stderr.write(`[check-secrets] ERRO ao executar gitleaks: ${err.message}\n`);
      if (stderr) process.stderr.write(`[check-secrets] stderr: ${stderr.slice(0, 500)}\n`);
      process.exit(2);
    }
  }

  let gitleaksJson;
  if (!stdout.trim() || stdout.trim() === "null") {
    gitleaksJson = [];
  } else {
    try {
      const parsed = JSON.parse(stdout.trim());
      gitleaksJson = parsed === null ? [] : parsed;
    } catch (parseErr) {
      process.stderr.write(`[check-secrets] ERRO ao parsear JSON do gitleaks: ${parseErr.message}\n`);
      process.stderr.write(`[check-secrets] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`);
      process.exit(2);
    }
  }

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(gitleaksJson, null, 2) + "\n");
    return;
  }

  const { findingCount, byRule, byFile } = parseGitleaksJson(gitleaksJson);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
  console.log(`secretFindings=${findingCount}`);

  if (!QUIET) {
    if (findingCount > 0) {
      const topRules = Object.entries(byRule)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([r, n]) => `${r}(${n})`)
        .join(", ");
      process.stderr.write(`[check-secrets] Findings: ${findingCount} (top rules: ${topRules})\n`);
      process.stderr.write(
        "[check-secrets] Para allowlistar findings legítimos (fixtures de teste, creds públicas),\n" +
        "[check-secrets] adicione entradas em .gitleaks.toml [[allowlist]] com comentário.\n"
      );
    } else {
      process.stderr.write("[check-secrets] Nenhum finding detectado.\n");
    }
    process.stderr.write(
      "[check-secrets] ADVISORY — esta versão não falha pela contagem (ratchet entra no CI).\n"
    );
  }

  // Sai 0 sempre nesta versão (advisory)
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
