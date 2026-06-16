#!/usr/bin/env node
// scripts/check/check-openapi-breaking.mjs
// Catraca de breaking-change na API pública (Fase 8 B.4 — backlog opcional).
//
// Diffa a spec do PR (docs/reference/openapi.yaml na working tree = HEAD) contra
// a MESMA spec no branch base, via `oasdiff breaking`. Pega regressões de contrato:
// endpoint removido, parâmetro novo obrigatório, campo de resposta removido, enum
// estreitado, etc. — mudanças que quebram clientes existentes.
//
// Complementa os gates anti-alucinação existentes:
//   • check-openapi-routes.mjs   — toda `path` na spec resolve a uma rota real.
//   • check-openapi-coverage.mjs — % de rotas reais documentadas (ratchet).
// Nenhum dos dois compara DUAS versões da spec; este sim.
//
// Saída (stdout, KEY=VALUE para o coletor de métricas collect-metrics.mjs):
//   openapiBreaking=N                          — número de breaking changes
//   openapiBreaking=SKIP reason=binary-absent  — oasdiff não está no PATH
//   openapiBreaking=SKIP reason=base-unresolved — a spec base não pôde ser lida
//                                                 (arquivo não existia no base, ou
//                                                  clone shallow sem o ref base)
//
// Esta versão é ADVISORY (sai 0 SEMPRE, mesmo com N>0). Promove a bloqueante
// depois (mesma trajetória de todo gate novo neste repo: report → ratchet → block).
//
// Base ref:
//   • CI passa BASE_REF=${{ github.base_ref }} (ex.: "release/v3.8.26").
//   • Local: default origin/release/v3.8.26.
// A spec base é extraída com `git show <BASE_REF>:docs/reference/openapi.yaml`.
//
// Uso:
//   node scripts/check/check-openapi-breaking.mjs
//   BASE_REF=origin/release/v3.8.26 node scripts/check/check-openapi-breaking.mjs
//   node scripts/check/check-openapi-breaking.mjs --json    # imprime JSON bruto do oasdiff
//   node scripts/check/check-openapi-breaking.mjs --quiet   # suprime logs de diagnóstico

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");

const SPEC_REL = "docs/reference/openapi.yaml";
const SPEC_PATH = path.join(ROOT, "docs", "reference", "openapi.yaml");
const DEFAULT_BASE_REF = "origin/release/v3.8.26";

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta breaking changes no JSON emitido por `oasdiff breaking --format json`.
 *
 * O oasdiff emite um array de objetos (ou array vazio quando não há breaking
 * change). Cada objeto tem a forma:
 * [
 *   {
 *     id: string,          // ex.: "api-path-removed-without-deprecation"
 *     text: string,        // descrição legível
 *     level: number,       // 3 = ERR, 2 = WARN, 1 = INFO
 *     operation: string,   // ex.: "GET"
 *     path: string,        // ex.: "/api/bar"
 *     section: string,
 *     source?: string,
 *     baseSource?: { file, line, column },
 *     fingerprint: string
 *   },
 *   ...
 * ]
 *
 * @param {Array|null} oasdiffJson - Array de breaking changes do oasdiff (ou null).
 * @returns {{ count: number, byId: Record<string, number>, byPath: Record<string, number>, items: Array }}
 */
export function parseOasdiffBreaking(oasdiffJson) {
  // null, undefined ou array vazio = nenhum breaking change.
  if (
    oasdiffJson === null ||
    oasdiffJson === undefined ||
    (Array.isArray(oasdiffJson) && oasdiffJson.length === 0)
  ) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  // Defensivo: qualquer coisa que não seja array é tratada como "sem dados".
  if (!Array.isArray(oasdiffJson)) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  let count = 0;
  const byId = {};
  const byPath = {};
  const items = [];

  for (const change of oasdiffJson) {
    if (!change || typeof change !== "object") continue;

    count++;
    items.push(change);

    const id = change.id ?? change.ID ?? "unknown";
    byId[id] = (byId[id] ?? 0) + 1;

    const p = change.path ?? change.Path ?? "unknown";
    byPath[p] = (byPath[p] ?? 0) + 1;
  }

  return { count, byId, byPath, items };
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `oasdiff` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho para o binário, ou null se ausente.
 */
export function findOasdiff() {
  try {
    const result = spawnSync("which", ["oasdiff"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  } catch {
    // which não disponível
  }

  // Fallback: tentar executar diretamente para distinguir ENOENT de "existe".
  try {
    const result = spawnSync("oasdiff", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "oasdiff"; // encontrado no PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Base spec resolution
// ---------------------------------------------------------------------------

/**
 * Extrai a spec base via `git show <BASE_REF>:<SPEC_REL>` para um arquivo temp.
 * Retorna o caminho do temp (chamador é responsável por limpar), ou null se a
 * spec não pôde ser resolvida (ref ausente em clone shallow, ou arquivo não
 * existia naquele ref). NUNCA lança — falha → null → SKIP gracioso.
 *
 * @param {string} baseRef
 * @returns {string|null} caminho do arquivo temp com a spec base, ou null.
 */
export function resolveBaseSpec(baseRef) {
  let stdout;
  try {
    stdout = execFileSync("git", ["show", `${baseRef}:${SPEC_REL}`], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 30_000,
      stdio: ["ignore", "pipe", "ignore"], // descarta stderr ruidoso do git
    });
  } catch {
    // ref desconhecido (shallow clone), arquivo inexistente no base, etc.
    return null;
  }

  if (!stdout || !stdout.trim()) return null;

  const tmpFile = path.join(
    os.tmpdir(),
    `oasdiff-base-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.yaml`
  );
  try {
    fs.writeFileSync(tmpFile, stdout, "utf8");
  } catch {
    return null;
  }
  return tmpFile;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const baseRef = (process.env.BASE_REF || "").trim() || DEFAULT_BASE_REF;

  // 1) HEAD spec precisa existir (working tree).
  if (!fs.existsSync(SPEC_PATH)) {
    console.log("openapiBreaking=SKIP reason=head-spec-absent");
    if (!QUIET) {
      process.stderr.write(`[openapi-breaking] SKIP — spec não encontrada: ${SPEC_PATH}\n`);
    }
    process.exitCode = 0;
    return;
  }

  // 2) Binário oasdiff precisa estar no PATH.
  const oasdiffBin = findOasdiff();
  if (!oasdiffBin) {
    console.log("openapiBreaking=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[openapi-breaking] SKIP — oasdiff não encontrado no PATH.\n" +
          "[openapi-breaking] Instale via: https://github.com/oasdiff/oasdiff\n" +
          "[openapi-breaking] ADVISORY — este gate sai 0 (promove a bloqueante depois).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  // 3) Resolver a spec base (git show → temp). SKIP se não der.
  const baseTmp = resolveBaseSpec(baseRef);
  if (!baseTmp) {
    console.log(`openapiBreaking=SKIP reason=base-unresolved ref=${baseRef}`);
    if (!QUIET) {
      process.stderr.write(
        `[openapi-breaking] SKIP — não consegui ler ${SPEC_REL} em '${baseRef}'.\n` +
          "[openapi-breaking] Causas: clone shallow sem o ref base, arquivo novo (não existia no base),\n" +
          "[openapi-breaking] ou ref inválido. Em CI use fetch-depth: 0 ou git fetch do base ref.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  try {
    // 4) Rodar `oasdiff breaking --format json <baseTmp> <headSpec>`.
    //    oasdiff sai 0 por padrão mesmo com breaking changes (só com --fail-on
    //    é que sai 1). Capturamos stdout independentemente do exit code.
    const args = ["breaking", "--format", "json", baseTmp, SPEC_PATH];

    if (!QUIET) {
      process.stderr.write(
        `[openapi-breaking] Rodando: oasdiff breaking --format json <base:${baseRef}> ${SPEC_REL} ...\n`
      );
    }

    let stdout = "";
    try {
      stdout = execFileSync(oasdiffBin, args, {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        timeout: 90_000,
      });
    } catch (err) {
      // oasdiff PODE sair !=0 (ex.: com --fail-on em versões futuras, ou erro real).
      // Capturamos stdout de qualquer jeito: se ele tem JSON parseável, é o resultado.
      stdout = err.stdout ? String(err.stdout) : "";
      const stderr = err.stderr ? String(err.stderr) : "";
      if (!stdout.trim()) {
        // Sem stdout = erro real do oasdiff (spec inválida, etc.). Advisory → SKIP.
        console.log("openapiBreaking=SKIP reason=oasdiff-error");
        if (!QUIET) {
          process.stderr.write(`[openapi-breaking] SKIP — oasdiff falhou: ${err.message}\n`);
          if (stderr) {
            process.stderr.write(`[openapi-breaking] stderr: ${stderr.slice(0, 500)}\n`);
          }
        }
        process.exitCode = 0;
        return;
      }
    }

    const trimmed = stdout.trim();
    let parsed = [];
    if (trimmed && trimmed !== "null") {
      try {
        parsed = JSON.parse(trimmed);
      } catch (parseErr) {
        // JSON inesperado — advisory, não derruba o build.
        console.log("openapiBreaking=SKIP reason=parse-error");
        if (!QUIET) {
          process.stderr.write(
            `[openapi-breaking] SKIP — JSON do oasdiff não parseável: ${parseErr.message}\n` +
              `[openapi-breaking] stdout (primeiros 500): ${trimmed.slice(0, 500)}\n`
          );
        }
        process.exitCode = 0;
        return;
      }
    }

    if (PRINT_JSON) {
      process.stdout.write(JSON.stringify(parsed, null, 2) + "\n");
      return;
    }

    const { count, byId, byPath, items } = parseOasdiffBreaking(parsed);

    // Emitir KEY=VALUE para o coletor de métricas.
    console.log(`openapiBreaking=${count}`);

    if (!QUIET) {
      if (count > 0) {
        const topIds = Object.entries(byId)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([id, n]) => `${id}(${n})`)
          .join(", ");
        process.stderr.write(
          `[openapi-breaking] ⚠️  ${count} breaking change(s) vs '${baseRef}' (top: ${topIds})\n`
        );
        for (const it of items.slice(0, 20)) {
          const op = it.operation ?? it.Operation ?? "?";
          const p = it.path ?? it.Path ?? "?";
          const txt = it.text ?? it.Text ?? it.id ?? "";
          process.stderr.write(`[openapi-breaking]   ✗ ${op} ${p} — ${txt}\n`);
        }
        if (items.length > 20) {
          process.stderr.write(`[openapi-breaking]   … +${items.length - 20} more\n`);
        }
        // Pista de mitigação: por path.
        const topPaths = Object.entries(byPath)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([p, n]) => `${p}(${n})`)
          .join(", ");
        process.stderr.write(`[openapi-breaking]   affected paths: ${topPaths}\n`);
        process.stderr.write(
          "[openapi-breaking] ADVISORY — promove a BLOQUEANTE depois. Se a quebra é\n" +
            "[openapi-breaking] intencional (major bump), documente no PR; senão, ajuste a spec.\n"
        );
      } else {
        process.stderr.write(
          `[openapi-breaking] OK — nenhuma breaking change na spec vs '${baseRef}'.\n`
        );
      }
    }

    // ADVISORY — sai 0 SEMPRE nesta versão, mesmo com count > 0.
    process.exitCode = 0;
  } finally {
    // Limpa o arquivo temp da spec base.
    try {
      fs.unlinkSync(baseTmp);
    } catch {
      // best-effort
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
