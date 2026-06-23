#!/usr/bin/env node
// scripts/check/check-openapi-routes.mjs
// Gate anti-alucinação (docs): toda `path` documentada em docs/reference/openapi.yaml
// deve resolver para um route.ts real em src/app/api/. Pega endpoint INVENTADO/obsoleto
// na spec (a IA escreve docs descrevendo rota que não existe). Complementa
// check-openapi-coverage.mjs (que mede a direção inversa: % de rotas documentadas).
// Stale-enforcement (6A.3): entrada em KNOWN_STALE_SPEC que não suprime nenhum path
// órfão real → gate falha com instrução de remoção (evita furo de regressão silencioso).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as yaml from "js-yaml";
import { assertNoStale } from "./lib/allowlist.mjs";

const ROOT = process.cwd();
const API_ROOT = path.join(ROOT, "src", "app", "api");
const OPENAPI_PATH = path.join(ROOT, "docs", "reference", "openapi.yaml");

// Entradas da spec sem rota real, congeladas para triagem (catraca: bloqueia NOVAS).
export const KNOWN_STALE_SPEC = new Set([
  // openapi.yaml documenta um state por-agente, mas a rota real é o state GLOBAL
  // (/api/tools/agent-bridge/state); por-agente só há /{id}, /{id}/detect, /mappings, /dns.
]);

/** Normaliza qualquer {param} para {} para casar independente do nome do parâmetro. */
export function normalizeParams(p) {
  return p.replace(/\{[^}]+\}/g, "{}");
}

/** Paths da spec que não casam com nenhuma rota implementada (param-insensitive). */
export function findSpecPathsWithoutRoute(specPaths, implPaths) {
  const impl = new Set(implPaths.map(normalizeParams));
  return specPaths.filter((p) => !impl.has(normalizeParams(p)));
}

function collectRoutePaths(dir) {
  const paths = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...collectRoutePaths(full));
    } else if (entry.isFile() && entry.name === "route.ts") {
      const apiPath = path
        .dirname(full)
        .replace(API_ROOT, "")
        .replace(/\/\[\.\.\.([^\]]+)\]/g, "/{$1}")
        .replace(/\[([^\]]+)\]/g, "{$1}");
      paths.push(`/api${apiPath}`);
    }
  }
  return paths;
}

function main() {
  if (!fs.existsSync(OPENAPI_PATH)) {
    console.error(`[openapi-routes] FAIL — openapi.yaml não encontrado: ${OPENAPI_PATH}`);
    process.exit(1);
  }
  const raw = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
  const specPaths = Object.keys(raw.paths || {}).filter((p) => p.startsWith("/api"));
  const implPaths = collectRoutePaths(API_ROOT);

  // Live orphans BEFORE allowlist filtering (needed for stale-enforcement).
  const liveOrphans = findSpecPathsWithoutRoute(specPaths, implPaths);
  assertNoStale(KNOWN_STALE_SPEC, liveOrphans, "openapi-routes");

  const orphans = liveOrphans.filter((p) => !KNOWN_STALE_SPEC.has(p));
  if (orphans.length) {
    console.error(
      `[openapi-routes] ${orphans.length} path(s) documentado(s) sem rota real:\n` +
        orphans.map((p) => "  ✗ " + p).join("\n") +
        `\n  → crie a rota, corrija/remova a entrada na spec, ou adicione a KNOWN_STALE_SPEC com justificativa.`
    );
    process.exitCode = 1;
  }
  if (!process.exitCode) {
    console.log(
      `[openapi-routes] OK — ${specPaths.length} paths na spec, todos com rota real (${implPaths.length} rotas)`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
