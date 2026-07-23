#!/usr/bin/env node
// scripts/check/check-fetch-targets.mjs  v2
// Gate anti-alucinação: todo fetch("/api/...") em src/ (client-side) deve
// resolver para um route.ts real em src/app/api/. Mata rotas inventadas.
//
// Três subchecks (6A.7):
//  1. Paths estáticos literais:        fetch("/api/foo")  → rota deve existir
//  2. Prefixo de template literal:     fetch(`/api/x/${id}`) → prefixo estático deve ter
//                                      ao menos uma rota filha/irmã
//  3. Método HTTP literal:             fetch("/api/foo", { method: "POST" }) → route.ts
//                                      deve exportar POST (inclui re-exports)
//
// Escopo (v2): todo src/**/*.{ts,tsx} client-side
//   Excluídos: src/app/api/**, src/lib/db/**, *.test.ts, *.spec.ts, node_modules
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();
const SRC = path.join(cwd, "src");
const API = path.join(cwd, "src/app/api");

// Paths que o checker não resolve estaticamente (allowlist com justificativa):
//  - /api/v1/* é a superfície OpenAI-compat (proxy), não rotas internas do dashboard.
const IGNORE = [
  /^\/api\/v1\//, // superfície OpenAI-compat
];

// Mismatches src/**→rota PRÉ-EXISTENTES ou não-resolvíveis estaticamente.
// Congelados para a catraca ficar verde e bloquear qualquer nova rota inventada.
// NÃO adicione novos sem justificativa — esse é o ponto do gate.
//
// Format for stale-enforcement: entries must match the string produced by
// the checkers below (i.e. the raw apiPath or prefix string, not the file+arrow).
const KNOWN_MISSING = new Set([
  // src/lib/evals/evalRunner.ts → /api/data  (server-side eval runner calling a
  // local data endpoint that is not a Next.js route; needs a real route or fix)
  "/api/data",
  // src/app/(dashboard)/…/AgentBridgePageClient.tsx calls bypass with PUT but
  // the route only exports GET/POST/DELETE — real method miss, tracked for fix.
  "/api/tools/agent-bridge/bypass::PUT",
]);

// ─── filesystem helpers ───────────────────────────────────────────────────────

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

/** Is this file excluded from client-side scanning? */
function isExcluded(filePath) {
  const rel = path.relative(cwd, filePath).replace(/\\/g, "/");
  return (
    rel.startsWith("src/app/api/") ||
    rel.includes("node_modules") ||
    rel.includes(".next") ||
    rel.startsWith("src/lib/db/") ||
    /\.test\.(ts|tsx)$/.test(rel) ||
    /\.spec\.(ts|tsx)$/.test(rel)
  );
}

function collectRouteFiles() {
  return new Set(
    walk(API)
      .filter((p) => /route\.tsx?$/.test(p))
      .map((p) => path.relative(cwd, p).replace(/\\/g, "/"))
  );
}

// ─── route resolution helpers (exported for tests) ───────────────────────────

/**
 * Resolves an API path to the most specific matching route file.
 * Prefers static routes over dynamic [param] routes when both match.
 *
 * @param {string} apiPath - e.g. "/api/combos/test"
 * @param {Set<string>} routeFiles - relative paths like "src/app/api/…/route.ts"
 * @returns {string | null} matched route file path, or null
 */
export function resolveApiPathToRouteFile(apiPath, routeFiles) {
  const segs = apiPath
    .replace(/^\//, "")
    .replace(/[?#].*$/, "")
    .split("/");
  let staticMatch = null;
  let dynamicMatch = null;
  for (const rf of routeFiles) {
    const rsegs = rf
      .replace(/^src\/app\//, "")
      .replace(/\/route\.tsx?$/, "")
      .split("/");
    if (rsegs.length !== segs.length) continue;
    const isDynamic = rsegs.some((rs) => /^\[.*\]$/.test(rs));
    const ok = rsegs.every((rs, i) => rs === segs[i] || /^\[.*\]$/.test(rs));
    if (ok) {
      if (!isDynamic) staticMatch = rf;
      else if (!dynamicMatch) dynamicMatch = rf;
    }
  }
  return staticMatch || dynamicMatch;
}

/**
 * Returns true if the API path resolves to any known route file.
 * Exported for backward compatibility with existing tests.
 */
export function resolveApiPathToRoute(apiPath, routeFiles) {
  return resolveApiPathToRouteFile(apiPath, routeFiles) !== null;
}

/**
 * Prefix-match for template literals: checks whether any route exists whose
 * path starts with the static prefix (same depth or deeper).
 *
 * @param {string} prefix - static prefix extracted from a template literal,
 *   e.g. "/api/providers/" or "/api/usage/analytics?since="
 * @param {Set<string>} routeFiles
 * @returns {boolean}
 */
export function resolveApiPrefixToRoute(prefix, routeFiles) {
  // Strip query params and trailing slash from the prefix
  const cleanPrefix = prefix.replace(/[?#].*$/, "").replace(/\/$/, "");
  const prefixSegs = cleanPrefix.replace(/^\//, "").split("/");
  for (const rf of routeFiles) {
    const rsegs = rf
      .replace(/^src\/app\//, "")
      .replace(/\/route\.tsx?$/, "")
      .split("/");
    // Route must be at least as deep as the prefix
    if (rsegs.length < prefixSegs.length) continue;
    const ok = prefixSegs.every((ps, i) => ps === rsegs[i] || /^\[.*\]$/.test(rsegs[i]));
    if (ok) return true;
  }
  return false;
}

/**
 * Checks whether a route file's source exports the given HTTP method.
 * Handles:
 *   - `export async function POST(…)`
 *   - `export const DELETE = …`
 *   - `export { GET, PUT } from "…"` (re-exports)
 *
 * @param {string} routeSource - the CONTENT of the route file (string)
 * @param {string} method - uppercase HTTP method, e.g. "POST"
 * @returns {boolean}
 */
export function routeExportsMethod(routeSource, method) {
  // Direct export: `export [async] function METHOD` or `export const METHOD`
  const directRe = new RegExp(
    `export\\s+(?:async\\s+)?(?:function|const)\\s+${method}\\b`
  );
  if (directRe.test(routeSource)) return true;
  // Re-export: `export { GET, PUT } from "…"`
  const reExportRe = /export\s*\{([^}]+)\}\s*from/g;
  let m;
  while ((m = reExportRe.exec(routeSource))) {
    const names = m[1]
      .split(",")
      .map((s) => s.trim().split(/\s+as\s+/)[0].trim());
    if (names.includes(method)) return true;
  }
  return false;
}

// ─── extraction helpers ───────────────────────────────────────────────────────

/**
 * Extracts static /api/ paths from fetch/fetchJson/apiFetch calls.
 * Returns only full static literals (no template expressions).
 */
function extractStaticFetchPaths(content) {
  // Matches: fetch("/api/foo"), fetch('/api/foo'), fetch(`/api/foo`) (no ${ })
  // The negative lookahead (?!.*\$\{) is applied on the matched string itself
  const re = /(?:fetch|fetchJson|apiFetch)\(\s*["'`](\/api\/[A-Za-z0-9_\-/[\]]+)["'`]/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) out.push(m[1]);
  return out;
}

/**
 * Extracts static prefixes from template-literal fetch calls that contain
 * at least one dynamic expression (${…}).
 */
function extractTemplateFetchPrefixes(content) {
  const re = /(?:fetch|fetchJson|apiFetch)\(\s*`(\/api\/[^`]*)`/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) {
    const full = m[1];
    const dynIdx = full.indexOf("${");
    if (dynIdx !== -1) {
      out.push(full.substring(0, dynIdx));
    }
  }
  return out;
}

/**
 * Extracts static fetch paths together with the HTTP method literal, when
 * present in the options object (2nd argument of fetch).
 * Returns { apiPath, method } pairs where method defaults to "GET".
 */
function extractStaticFetchPathsWithMethod(content) {
  // Match static path + optional second argument block (up to 500 chars)
  const re =
    /(?:fetch|fetchJson|apiFetch)\(\s*["'](\/api\/[A-Za-z0-9_\-/[\]]+)["']\s*(?:,\s*(\{[^)]{0,500}))?/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) {
    const apiPath = m[1];
    const optStr = m[2] || "";
    const methodMatch = /method\s*:\s*["']([A-Z]+)["']/.exec(optStr);
    const method = methodMatch ? methodMatch[1] : "GET";
    out.push({ apiPath, method });
  }
  return out;
}

// ─── main ─────────────────────────────────────────────────────────────────────

function main() {
  const routeFiles = collectRouteFiles();
  const liveMissesStatic = new Set();
  const liveMissesMethod = new Set();

  for (const f of walk(SRC)) {
    if (isExcluded(f)) continue;
    const content = fs.readFileSync(f, "utf8");

    // Subcheck 1: static paths
    for (const apiPath of extractStaticFetchPaths(content)) {
      if (IGNORE.some((rx) => rx.test(apiPath))) continue;
      if (KNOWN_MISSING.has(apiPath)) {
        liveMissesStatic.add(apiPath); // record as live so stale-check works
        continue;
      }
      if (!resolveApiPathToRoute(apiPath, routeFiles)) {
        console.error(
          `[check-fetch-targets] ✗ rota inexistente: ${path.relative(cwd, f)} → ${apiPath}`
        );
        process.exitCode = 1;
        liveMissesStatic.add(apiPath);
      }
    }

    // Subcheck 2: template literal prefixes
    for (const prefix of extractTemplateFetchPrefixes(content)) {
      if (IGNORE.some((rx) => rx.test(prefix))) continue;
      if (!resolveApiPrefixToRoute(prefix, routeFiles)) {
        console.error(
          `[check-fetch-targets] ✗ prefixo de template inexistente: ${path.relative(cwd, f)} → "${prefix}"`
        );
        process.exitCode = 1;
      }
    }

    // Subcheck 3: HTTP method on static paths
    for (const { apiPath, method } of extractStaticFetchPathsWithMethod(content)) {
      if (method === "GET") continue;
      if (IGNORE.some((rx) => rx.test(apiPath))) continue;
      const routeFile = resolveApiPathToRouteFile(apiPath, routeFiles);
      if (!routeFile) continue; // Already caught by subcheck 1
      const key = `${apiPath}::${method}`;
      if (KNOWN_MISSING.has(key)) {
        liveMissesMethod.add(key); // record as live for stale-check
        continue;
      }
      const routeSource = fs.readFileSync(path.join(cwd, routeFile), "utf8");
      if (!routeExportsMethod(routeSource, method)) {
        console.error(
          `[check-fetch-targets] ✗ método ${method} não exportado: ${path.relative(cwd, f)} → ${apiPath} (em ${routeFile})`
        );
        process.exitCode = 1;
        liveMissesMethod.add(key);
      }
    }
  }

  // Stale-enforcement: any entry in KNOWN_MISSING that was NOT seen as a live
  // violation means the problem was fixed — the entry must be removed to lock
  // in the improvement (6A.3 pattern).
  const allLive = new Set([...liveMissesStatic, ...liveMissesMethod]);
  assertNoStale([...KNOWN_MISSING], allLive, "fetch-targets");

  if (!process.exitCode) {
    console.log(`[check-fetch-targets] OK (${routeFiles.size} rotas conhecidas)`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
