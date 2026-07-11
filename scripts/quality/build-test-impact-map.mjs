import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC_ROOTS = ["src", "open-sse"];
const IMPORT_RE =
  /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const EXTS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = path.join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith("@omniroute/open-sse"))
    base = path.join(ROOT, "open-sse", spec.replace(/^@omniroute\/open-sse\/?/, ""));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const e of EXTS) {
    if (fs.existsSync(base + e)) return base + e;
  }
  for (const e of EXTS) {
    const idx = path.join(base, "index" + e);
    if (fs.existsSync(idx)) return idx;
  }
  return fs.existsSync(base) && fs.statSync(base).isFile() ? base : null;
}

function sourceDepsOf(entry) {
  const seen = new Set();
  const stack = [entry];
  const sources = new Set();
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    let code;
    try {
      code = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const m of code.matchAll(IMPORT_RE)) {
      const spec = m[1] || m[2] || m[3];
      if (!spec) continue;
      const r = resolveImport(spec, f);
      if (!r) continue;
      const rel = path.relative(ROOT, r);
      if (SRC_ROOTS.some((s) => rel.startsWith(s + path.sep))) sources.add(rel);
      stack.push(r);
    }
  }
  return sources;
}

// Mirror EXACTLY the `npm run test:unit` glob — the curated set of node:test files.
// The TIA step runs the selected subset via `node --test`, so it must NOT include
// vitest files (`.test.tsx`, `open-sse/**/__tests__`, `tests/unit/autoCombo`), nor
// e2e/integration tests, which can't run under node:test (they 99-false-failed before).
// Mirror EXACTLY the package.json `test:unit` / `test:unit:ci` globs (incl. memory,
// usage, combo, dashboard, serial, and *.test.mjs). Drift here → false __RUN_ALL__.
const testFiles = globSync(
  [
    "tests/unit/*.test.ts",
    "tests/unit/{api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,ui,usage}/**/*.test.ts",
    "tests/unit/**/*.test.mjs",
    "tests/unit/dashboard/**/*.test.ts",
    // Quarentena serial (P0.3): também são node:test — a TIA precisa mapeá-los.
    "tests/unit/serial/**/*.test.ts",
  ],
  { cwd: ROOT, absolute: true }
);
const map = {};
for (const tf of testFiles) {
  const relTest = path.relative(ROOT, tf);
  for (const src of sourceDepsOf(tf)) {
    (map[src] ||= []).push(relTest);
  }
}
for (const k of Object.keys(map)) map[k].sort();
const out = path.join(ROOT, "config/quality/test-impact-map.json");
fs.writeFileSync(out, JSON.stringify({ generatedFrom: "import-graph", sources: map }, null, 2) + "\n");
console.log(
  `test-impact-map: ${Object.keys(map).length} source files mapped from ${testFiles.length} test files`
);
