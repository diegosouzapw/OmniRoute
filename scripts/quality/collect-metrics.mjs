#!/usr/bin/env node
// scripts/quality/collect-metrics.mjs — emite quality-metrics.json
// Coletores incrementais: Fase 1 traz ESLint warnings + cobertura.
// Fases 3/4 estendem com duplicação (jscpd), tamanho de arquivo e cobertura por módulo.
// Fase 6A.11: openapiCoverage.pct + i18nUiCoverage.pct (mínimo entre locales).
// Task 7.9: coverage.<modulo>.lines para ~8 módulos críticos, lidos do
//   coverage/coverage-summary.json se existir (sem erro se ausente).
import fs from "node:fs";
import { promises as fsAsync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import yaml from "js-yaml";

const cwd = process.cwd();
const out = {};

// 1) ESLint: contagem de warnings (errors devem ser 0; o lint já gata isso)
function eslintCounts() {
  let stdout;
  try {
    stdout = execFileSync("npx", ["eslint", ".", "--format", "json"], {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
  } catch (e) {
    // eslint sai com código != 0 quando há errors; o JSON ainda vem no stdout
    stdout = e.stdout?.toString() || "[]";
  }
  const results = JSON.parse(stdout);
  out.eslintWarnings = results.reduce((n, r) => n + (r.warningCount || 0), 0);
  out.eslintErrors = results.reduce((n, r) => n + (r.errorCount || 0), 0);
}

// 2) Cobertura: lê coverage/coverage-summary.json se existir (gerado por c8)
function coverage() {
  const p = path.join(cwd, "coverage", "coverage-summary.json");
  if (!fs.existsSync(p)) return;
  const t = JSON.parse(fs.readFileSync(p, "utf8")).total;
  out["coverage.statements"] = t.statements.pct;
  out["coverage.lines"] = t.lines.pct;
  out["coverage.functions"] = t.functions.pct;
  out["coverage.branches"] = t.branches.pct;
}

// 3) Coverage per critical module (Task 7.9)
// Reads coverage/coverage-summary.json (produced by `npm run test:coverage` via c8).
// If the file is absent → silently skips (no error). This allows the gate to
// function normally in environments where coverage was not run (e.g. lint-only CI).
//
// The summary JSON produced by c8 looks like:
//   { "total": {...}, "/abs/path/to/file.ts": { lines: { pct: 78 }, ... }, ... }
//
// modulePaths is a record of { metricSuffix: relPathFromRoot[] } — the first
// matching key in the summary wins.

/**
 * Pure function — extracts per-module line-coverage percentages from a
 * coverage-summary.json object.
 *
 * @param {Record<string, { lines?: { pct: number } }>} summaryJson
 *   The parsed coverage-summary.json (keys are absolute file paths or "total").
 * @param {Record<string, string[]>} modulePaths
 *   Map of { metricKey: [relPath, ...fallbacks] } where relPath is relative to
 *   the repo root (forward slashes). Returns the lines.pct of the first match.
 * @param {string} repoRoot  Absolute path to the repo root (used to build keys).
 * @returns {Record<string, number>} Map of metricKey → lines.pct (0-100).
 */
export function extractModuleCoverage(summaryJson, modulePaths, repoRoot) {
  const result = {};
  // Build a normalised lookup: absolute path (forward slashes) → pct
  const lookup = new Map();
  for (const [rawKey, data] of Object.entries(summaryJson)) {
    if (rawKey === "total") continue;
    const norm = rawKey.replace(/\\/g, "/");
    const pct = data?.lines?.pct;
    if (typeof pct === "number") lookup.set(norm, pct);
  }

  const normRoot = repoRoot.replace(/\\/g, "/").replace(/\/$/, "");

  for (const [metricKey, candidates] of Object.entries(modulePaths)) {
    for (const rel of candidates) {
      const abs = `${normRoot}/${rel.replace(/\\/g, "/").replace(/^\//, "")}`;
      if (lookup.has(abs)) {
        result[metricKey] = lookup.get(abs);
        break;
      }
    }
  }
  return result;
}

/** The 8 critical modules tracked by Task 7.9 (relative paths from repo root). */
export const CRITICAL_MODULE_PATHS = {
  "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"],
  "coverage.combo.lines": ["open-sse/services/combo.ts"],
  "coverage.accountFallback.lines": ["open-sse/services/accountFallback.ts"],
  "coverage.auth.lines": ["src/sse/services/auth.ts"],
  "coverage.routeGuard.lines": ["src/server/authz/routeGuard.ts"],
  "coverage.error.lines": ["open-sse/utils/error.ts"],
  "coverage.publicCreds.lines": ["open-sse/utils/publicCreds.ts"],
  "coverage.circuitBreaker.lines": ["src/shared/utils/circuitBreaker.ts"],
};

function coverageByModule() {
  const p = path.join(cwd, "coverage", "coverage-summary.json");
  if (!fs.existsSync(p)) return; // absent → skip silently (Task 7.9 spec)
  let summaryJson;
  try {
    summaryJson = JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return; // malformed file → skip
  }
  const moduleMetrics = extractModuleCoverage(summaryJson, CRITICAL_MODULE_PATHS, cwd);
  Object.assign(out, moduleMetrics);
}

// 4) OpenAPI coverage: percentage of implemented routes documented in openapi.yaml
function openapiCoverage() {
  const API_ROOT = path.join(cwd, "src", "app", "api");
  const OPENAPI_PATH = path.join(cwd, "docs", "reference", "openapi.yaml");
  if (!fs.existsSync(API_ROOT) || !fs.existsSync(OPENAPI_PATH)) return;

  function collectRoutePaths(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const paths = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        paths.push(...collectRoutePaths(fullPath));
        continue;
      }
      if (entry.isFile() && entry.name === "route.ts") {
        const apiPath = path
          .dirname(fullPath)
          .replace(API_ROOT, "")
          .replace(/\[([^\]]+)\]/g, "{$1}");
        paths.push(`/api${apiPath}`);
      }
    }
    return paths;
  }

  function normalizePath(p) {
    return p.replace(/\/\[\.\.\.([^\]]+)\]/g, "/{$1}").replace(/\[([^\]]+)\]/g, "{$1}");
  }

  const implementedPaths = collectRoutePaths(API_ROOT).map(normalizePath);
  const raw = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
  const documentedPaths = new Set(Object.keys(raw.paths || {}));
  const covered = implementedPaths.filter((p) => documentedPaths.has(p)).length;
  const total = implementedPaths.length;
  if (total > 0) out["openapiCoverage.pct"] = parseFloat(((covered / total) * 100).toFixed(1));
}

// 4) i18n UI coverage: minimum real coverage across all non-en locales
async function i18nUiCoverage() {
  const MESSAGES_DIR = path.join(cwd, "src", "i18n", "messages");
  const CONFIG_PATH = path.join(cwd, "config", "i18n.json");
  const SOURCE_LOCALE = "en";
  const PLACEHOLDER_PREFIX = "__MISSING__:";

  if (!fs.existsSync(MESSAGES_DIR)) return;
  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) return;

  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function collectLeafPaths(obj, prefix = []) {
    const paths = [];
    for (const [key, value] of Object.entries(obj)) {
      const next = [...prefix, key];
      if (isPlainObject(value)) {
        paths.push(...collectLeafPaths(value, next));
      } else {
        paths.push(next);
      }
    }
    return paths;
  }

  const FORBIDDEN_KEY_SEGMENTS = new Set(["__proto__", "prototype", "constructor"]);

  function lookupPath(obj, parts) {
    let cur = obj;
    for (const part of parts) {
      if (!isPlainObject(cur)) return undefined;
      if (FORBIDDEN_KEY_SEGMENTS.has(part)) return undefined;
      if (!Object.prototype.hasOwnProperty.call(cur, part)) return undefined;
      const entry = Object.entries(cur).find(([k]) => k === part);
      cur = entry ? entry[1] : undefined;
    }
    return cur;
  }

  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const enPaths = collectLeafPaths(source);
  const totalEn = enPaths.length;
  if (totalEn === 0) return;

  let configCodes = null;
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
      if (Array.isArray(cfg.locales)) configCodes = new Set(cfg.locales.map((l) => l.code));
    } catch {
      /* ignore */
    }
  }

  const onDisk = (await fsAsync.readdir(MESSAGES_DIR))
    .filter((f) => f.endsWith(".json") && f !== `${SOURCE_LOCALE}.json`)
    .map((f) => f.slice(0, -5))
    .filter((code) => (configCodes ? configCodes.has(code) : true));

  let minCoverage = 100;
  for (const locale of onDisk) {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    let target;
    try {
      target = JSON.parse(fs.readFileSync(localePath, "utf8"));
    } catch {
      minCoverage = 0;
      continue;
    }
    let present = 0;
    let placeholder = 0;
    for (const pathParts of enPaths) {
      const value = lookupPath(target, pathParts);
      if (value === undefined || isPlainObject(value)) continue;
      present++;
      if (typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX)) placeholder++;
    }
    const coverage = ((present - placeholder) / totalEn) * 100;
    if (coverage < minCoverage) minCoverage = coverage;
  }

  if (onDisk.length > 0) out["i18nUiCoverage.pct"] = parseFloat(minCoverage.toFixed(1));
}

// Only run the collection pipeline when this file is executed directly.
// When imported (e.g. in tests), only the exported pure functions are available
// without triggering the expensive ESLint + i18n filesystem walks.
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  eslintCounts();
  coverage();
  coverageByModule();
  openapiCoverage();
  await i18nUiCoverage();
  fs.writeFileSync(
    path.join(cwd, "config/quality/quality-metrics.json"),
    JSON.stringify(out, null, 2) + "\n"
  );
  console.log("[collect-metrics]", JSON.stringify(out));
}
