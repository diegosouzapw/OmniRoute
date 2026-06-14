#!/usr/bin/env node
// scripts/check/check-codeql-ratchet.mjs
// Catraca de alertas CodeQL (Task 7.3 — Fase 7).
//
// Usa a GitHub API via `gh` CLI para buscar alertas de code-scanning abertos e
// não-dismissed (respeita Hard Rule #14: alertas dismissed não contam).
//
// Saída (stdout):
//   codeqlAlerts=N        — contagem de alertas CodeQL abertos, não-dismissed
//   codeqlAlerts=SKIP reason=binary-absent   — `gh` não está no PATH
//   codeqlAlerts=SKIP reason=no-auth         — `gh` presente mas sem autenticação
//   codeqlAlerts=SKIP reason=api-error:<code>  — erro da API GitHub
//
// Esta versão é ADVISORY (sai 0 sempre). O ratchet (direction:down) é gerenciado
// pelo motor quality-baseline.json no CI (Task 7.3 INT).
//
// Uso:
//   node scripts/check/check-codeql-ratchet.mjs
//   node scripts/check/check-codeql-ratchet.mjs --json   # imprime array de alertas
//   node scripts/check/check-codeql-ratchet.mjs --quiet  # suprime logs de diagnóstico

import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta alertas CodeQL abertos e não-dismissed a partir do JSON da GitHub API.
 *
 * A GitHub API /code-scanning/alerts retorna um array de:
 * {
 *   number: number,
 *   state: "open" | "dismissed" | "fixed",
 *   dismissed_reason: string | null,
 *   dismissed_at: string | null,
 *   tool: { name: string, ... },
 *   rule: { id: string, severity: string, security_severity_level?: string, ... },
 *   ...
 * }
 *
 * Hard Rule #14: alertas com `state="dismissed"` NÃO contam, independente da razão.
 * Filtramos por state="open" E tool.name contendo "CodeQL" (case-insensitive).
 * Alertas de outras ferramentas (ex: Semgrep) são ignorados.
 *
 * @param {Array|null} alerts - Array de alertas da API GitHub
 * @returns {{ alertCount: number, bySeverity: Record<string, number>, byRule: Record<string, number> }}
 */
export function parseCodeQLAlerts(alerts) {
  if (!Array.isArray(alerts)) {
    return { alertCount: 0, bySeverity: {}, byRule: {} };
  }

  let alertCount = 0;
  const bySeverity = {};
  const byRule = {};

  for (const alert of alerts) {
    // Ignorar alertas não-CodeQL (outras ferramentas de code scanning)
    const toolName = alert?.tool?.name ?? "";
    if (!toolName.toLowerCase().includes("codeql")) continue;

    // Hard Rule #14: alertas dismissed não contam
    if (alert.state === "dismissed") continue;

    // Só alertas abertos
    if (alert.state !== "open") continue;

    alertCount++;

    // Coletar por severidade (security_severity_level ou severity da rule)
    const severity = (
      alert?.rule?.security_severity_level ??
      alert?.rule?.severity ??
      "unknown"
    ).toLowerCase();
    bySeverity[severity] = (bySeverity[severity] ?? 0) + 1;

    // Coletar por rule ID
    const ruleId = alert?.rule?.id ?? "unknown";
    byRule[ruleId] = (byRule[ruleId] ?? 0) + 1;
  }

  return { alertCount, bySeverity, byRule };
}

// ---------------------------------------------------------------------------
// Repository detection
// ---------------------------------------------------------------------------

/**
 * Detecta o owner/repo do repositório atual usando `gh repo view`.
 * Retorna null se `gh` não estiver disponível ou não autenticado.
 *
 * @param {string} ghBin - Caminho para o binário gh
 * @returns {string|null} "owner/repo" ou null
 */
export function detectRepo(ghBin) {
  try {
    const stdout = execFileSync(ghBin, ["repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"], {
      encoding: "utf8",
      timeout: 15_000,
    });
    return stdout.trim() || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `gh` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho absoluto para o binário, ou null se ausente.
 */
export function findGhCli() {
  try {
    const result = spawnSync("which", ["gh"], {
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
    const result = spawnSync("gh", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "gh"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// API caller
// ---------------------------------------------------------------------------

/**
 * Busca alertas CodeQL abertos via `gh api`.
 * Pagina automaticamente (GitHub retorna max 100 por página).
 *
 * @param {string} ghBin - Caminho para o binário gh
 * @param {string} repo  - "owner/repo"
 * @returns {Array} Array de alertas
 */
function fetchCodeQLAlerts(ghBin, repo) {
  const allAlerts = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const endpoint = `/repos/${repo}/code-scanning/alerts?state=open&tool_name=CodeQL&per_page=${perPage}&page=${page}`;

    if (!QUIET) {
      process.stderr.write(`[codeql-ratchet] Buscando alertas: página ${page} ...\n`);
    }

    let stdout;
    try {
      stdout = execFileSync(ghBin, ["api", endpoint], {
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (err) {
      const errMsg = String(err.stderr ?? err.message ?? "");

      // Sem autenticação
      if (errMsg.includes("authentication") || errMsg.includes("401") || errMsg.includes("not logged")) {
        return { error: "no-auth", message: errMsg };
      }

      // Rate limit ou outro erro HTTP
      const codeMatch = /HTTP (\d{3})/.exec(errMsg);
      const code = codeMatch ? codeMatch[1] : "unknown";
      return { error: `api-error:${code}`, message: errMsg };
    }

    let page_alerts;
    try {
      page_alerts = JSON.parse(stdout);
    } catch (parseErr) {
      process.stderr.write(`[codeql-ratchet] ERRO ao parsear resposta da API: ${parseErr.message}\n`);
      process.exit(2);
    }

    // A API retorna null quando não há mais páginas (ou array vazio)
    if (!Array.isArray(page_alerts) || page_alerts.length === 0) break;

    allAlerts.push(...page_alerts);

    // Se retornou menos que perPage, chegamos à última página
    if (page_alerts.length < perPage) break;

    page++;
  }

  return allAlerts;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const ghBin = findGhCli();

  if (!ghBin) {
    console.log("codeqlAlerts=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[codeql-ratchet] SKIP — `gh` CLI não encontrado no PATH.\n" +
        "[codeql-ratchet] Instale via: https://cli.github.com/\n" +
        "[codeql-ratchet] ADVISORY — este gate sai 0 (ratchet entra no CI da Fase 7 INT).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  // Detectar repositório
  const repo = detectRepo(ghBin);
  if (!repo) {
    console.log("codeqlAlerts=SKIP reason=no-repo");
    if (!QUIET) {
      process.stderr.write(
        "[codeql-ratchet] SKIP — não foi possível detectar o repositório GitHub.\n" +
        "[codeql-ratchet] Execute dentro de um repositório GitHub com `gh` autenticado.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  if (!QUIET) {
    process.stderr.write(`[codeql-ratchet] Repositório detectado: ${repo}\n`);
  }

  // Buscar alertas
  const result = fetchCodeQLAlerts(ghBin, repo);

  // Tratar erros da API com skip gracioso
  if (!Array.isArray(result)) {
    const { error, message } = result;
    console.log(`codeqlAlerts=SKIP reason=${error}`);
    if (!QUIET) {
      process.stderr.write(`[codeql-ratchet] SKIP — erro ao consultar API GitHub: ${message.slice(0, 200)}\n`);
    }
    process.exitCode = 0;
    return;
  }

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    return;
  }

  const { alertCount, bySeverity, byRule } = parseCodeQLAlerts(result);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
  console.log(`codeqlAlerts=${alertCount}`);

  if (!QUIET) {
    const severitySummary = Object.entries(bySeverity)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ") || "nenhum";
    const topRules = Object.entries(byRule)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([r, n]) => `${r}(${n})`)
      .join(", ") || "nenhum";

    process.stderr.write(
      `[codeql-ratchet] Alertas CodeQL abertos (não-dismissed): ${alertCount}\n`
    );
    if (alertCount > 0) {
      process.stderr.write(`[codeql-ratchet]   Por severidade: ${severitySummary}\n`);
      process.stderr.write(`[codeql-ratchet]   Top regras: ${topRules}\n`);
    }
    process.stderr.write(
      "[codeql-ratchet] ADVISORY — esta versão não falha pela contagem (ratchet entra no CI).\n"
    );
  }

  // Sai 0 sempre nesta versão (advisory)
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
