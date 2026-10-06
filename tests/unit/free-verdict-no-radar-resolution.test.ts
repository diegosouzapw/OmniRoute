import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Two regimes answer "is this model free?", and they read different sources on
 * purpose: counting/displaying MAY use the Radar-overlaid catalog, deciding
 * (model import, `auto/*` routing, `GET /v1/models`, the browser previews)
 * reads only the shipped baseline. `src/shared/utils/freeModels.ts` states the
 * contract in its header; this test holds it on the server arc.
 *
 * `client-bundle-no-server-only-10692.test.ts` already holds the browser arc
 * (every `"use client"` file must not reach server-only code). Nothing held the
 * server arc: wiring the import route, the published catalog or the paid-model
 * filter onto `getRadarCatalog` would make the modal's preview disagree with
 * the import that runs on click, and no check would turn red. That is the
 * regression class #10692 paid sixty red builds for, and whose docstring says
 * a comment cannot fail a build.
 *
 * Shape mirrors #10692 deliberately, including how entries are discovered
 * rather than hand-listed: static-import BFS, `import type` is not an edge,
 * dynamic `import()` is not followed — both exclusions are load-bearing, a
 * guard that cries wolf gets switched off.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** The module that answers the question: every consumer of it decides. */
const VERDICT_MODULE = "src/shared/utils/freeModels.ts";

/** DB-backed catalog resolution. Deciding must never reach these. */
const DB_BACKED_RESOLUTION = new Set([
  "src/lib/radar/index.ts", // getRadarCatalog
  "src/lib/db/radar.ts", // getRadarCache & co, reads radar_*_cache
]);

/**
 * Surfaces allowed to both decide and resolve. Empty on purpose: an entry here
 * is a documented exception carrying its reason, not a reason to widen the rule.
 */
const COUNTING_SURFACES = new Set<string>([]);

const SCAN_ROOTS = ["src", "open-sse"];
const EXTENSIONS = [".ts", ".tsx", ".mts", ".js"];
const SKIP_DIRS = new Set(["node_modules", ".git", ".build", "dist", ".next", ".claude"]);

/** Resolve an import specifier to a repo-relative file, or null when it leaves the repo. */
function resolveSpecifier(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith(".")) {
    base = path.resolve(path.dirname(path.join(REPO_ROOT, fromFile)), specifier);
  } else if (specifier.startsWith("@omniroute/open-sse")) {
    const rest = specifier.slice("@omniroute/open-sse".length).replace(/^\//, "");
    base = path.join(REPO_ROOT, "open-sse", rest);
  } else if (specifier.startsWith("@omniroute/browser-pool")) {
    const rest = specifier.slice("@omniroute/browser-pool".length).replace(/^\//, "");
    base = path.join(REPO_ROOT, "packages/browser-pool/src", rest);
  } else if (specifier.startsWith("@/")) {
    base = path.join(REPO_ROOT, "src", specifier.slice(2));
  } else {
    return null;
  }
  const candidates = [
    base,
    ...EXTENSIONS.map((ext) => base + ext),
    ...EXTENSIONS.map((ext) => path.join(base, `index${ext}`)),
  ];
  if (base.endsWith(".js")) candidates.push(base.replace(/\.js$/, ".ts"));
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.relative(REPO_ROOT, candidate);
    }
  }
  return null;
}

function isTypeOnlyClause(clause: string): boolean {
  if (/^\s*type\s/.test(clause)) return true;
  const named = /\{([^}]*)\}/.exec(clause);
  if (!named) return false;
  const outsideBraces = clause.replace(/\{[^}]*\}/, "").trim();
  if (/[A-Za-z_$*]/.test(outsideBraces)) return false;
  const bindings = named[1].split(",").map((b) => b.trim()).filter(Boolean);
  return bindings.length > 0 && bindings.every((b) => /^type\s/.test(b));
}

/** Value-carrying static specifiers only. */
function staticSpecifiers(source: string): string[] {
  const withoutDynamic = source.replace(/\bimport\s*\(/g, "__dynamic_import__(");
  const out: string[] = [];
  for (const pattern of [
    /(?:^|\n)\s*import\s+([^;'"]*)from\s*["']([^"']+)["']/g,
    /(?:^|\n)\s*export\s+([^;'"]*)from\s*["']([^"']+)["']/g,
  ]) {
    for (const match of withoutDynamic.matchAll(pattern)) {
      if (isTypeOnlyClause(match[1])) continue;
      out.push(match[2]);
    }
  }
  for (const match of withoutDynamic.matchAll(/(?:^|\n)\s*import\s*["']([^"']+)["']/g)) {
    out.push(match[1]);
  }
  return out;
}

const sourceCache = new Map<string, string>();
function readSource(file: string): string {
  const cached = sourceCache.get(file);
  if (cached !== undefined) return cached;
  const absolute = path.join(REPO_ROOT, file);
  const source = fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : "";
  sourceCache.set(file, source);
  return source;
}

const specifierCache = new Map<string, string[]>();
function edgesOf(file: string): string[] {
  const cached = specifierCache.get(file);
  if (cached) return cached;
  const edges = staticSpecifiers(readSource(file))
    .map((specifier) => resolveSpecifier(file, specifier))
    .filter((resolved): resolved is string => resolved !== null);
  specifierCache.set(file, edges);
  return edges;
}

function walk(dir: string, acc: string[] = []): string[] {
  const absolute = path.join(REPO_ROOT, dir);
  if (!fs.existsSync(absolute)) return acc;
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(relative, acc);
    } else if (/\.tsx?$/.test(entry.name)) {
      acc.push(relative);
    }
  }
  return acc;
}

function isClientComponent(file: string): boolean {
  return /^\s*["']use client["']/m.test(readSource(file).slice(0, 200));
}

/**
 * Every file that decides: the verdict module, plus every non-`"use client"`
 * file importing it. Client components are skipped because the browser arc is
 * already guarded by #10692 — not because they are outside the contract.
 */
function decidingEntries(): string[] {
  const found = [VERDICT_MODULE];
  for (const root of SCAN_ROOTS) {
    for (const file of walk(root)) {
      if (file === VERDICT_MODULE) continue;
      if (COUNTING_SURFACES.has(file) || isClientComponent(file)) continue;
      if (edgesOf(file).includes(VERDICT_MODULE)) found.push(file);
    }
  }
  return found.sort();
}

/** BFS over static imports; returns the first path reaching DB-backed resolution. */
function findResolutionPath(entry: string): string[] | null {
  const seen = new Set<string>([entry]);
  const queue: Array<string[]> = [[entry]];
  while (queue.length > 0) {
    const trail = queue.shift()!;
    for (const resolved of edgesOf(trail[trail.length - 1])) {
      if (seen.has(resolved)) continue;
      if (DB_BACKED_RESOLUTION.has(resolved)) return [...trail, resolved];
      seen.add(resolved);
      queue.push([...trail, resolved]);
    }
  }
  return null;
}

test("no deciding surface statically reaches DB-backed catalog resolution", () => {
  const entries = decidingEntries();

  // The scan found the repo's deciding surfaces, not an empty set.
  assert.ok(
    entries.includes("open-sse/services/autoCombo/paidModelFilter.ts"),
    `discovery looks broken: found ${entries.length} entries, without the paid-model filter`
  );

  const offenders = entries
    .map((entry) => ({ entry, trail: findResolutionPath(entry) }))
    .filter((row): row is { entry: string; trail: string[] } => row.trail !== null);

  assert.deepEqual(
    offenders.map((o) => o.entry),
    [],
    "Deciding must read the shipped catalog only:\n" +
      offenders.map((o) => `  ${o.trail.join("\n    → ")}`).join("\n\n") +
      "\nBreak the chain — deciding reads FREE_MODEL_BUDGETS, never getRadarCatalog. " +
      "If the wiring is intentional, update the contract header on freeModels.ts and " +
      "FREE_TIERS.md first; if the file counts as well as decides, add it to " +
      "COUNTING_SURFACES with the reason."
  );
});

test("the guard detects a real crossing: the counting surface is caught", () => {
  // Positive control on a real file. The free-tier summary route is a counting
  // surface: it legitimately imports getRadarCatalog. Running the same walk over
  // it proves the parser, the alias resolution and the BFS all still work — a
  // check that only ever passes is a check that has stopped looking.
  const countingSurface = "src/app/api/free-tier/summary/route.ts";
  const trail = findResolutionPath(countingSurface);

  assert.ok(
    trail !== null,
    `${countingSurface} resolves the Radar catalog, so the walk must reach it — ` +
      "if this fails, the import scan or the alias resolution is broken, not the code"
  );
  assert.ok(
    trail.some((step) => DB_BACKED_RESOLUTION.has(step)),
    `expected a DB-backed resolution module in the trail, got ${trail.join(" → ")}`
  );
  assert.ok(
    !decidingEntries().includes(countingSurface),
    `${countingSurface} counts, it does not decide — it must not be a deciding entry`
  );
});
