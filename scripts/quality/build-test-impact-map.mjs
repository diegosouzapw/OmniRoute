import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC_ROOTS = ["src", "open-sse"];
const IMPORT_RE =
  /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const EXTS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

// A test may pin a root config or a workflow file by reading it, not by importing it
// (#16068): `new URL("../../.github/workflows/quality.yml", import.meta.url)`,
// `readFileSync(resolve(here, "../../next.config.mjs"))`, or
// `path.join(process.cwd(), "next.config.mjs")`. None of those are import specifiers,
// so the sibling gate and the TIA selector never point a change in one of those files
// at the test that pins it. Match the handful of root-config basenames and any
// `.github/workflows/*.yml(.yaml)` path, resolved two ways: relative to the test file
// (the `new URL`/`resolve(here, …)` shape) or relative to the repo root (the
// `process.cwd()` shape, which only makes sense for a file CI actually runs `cwd=root`
// from).
const FILE_CLASS_BODY =
  "(?:\\.\\.\\/)*(?:\\.github\\/workflows\\/[\\w.-]+\\.ya?ml|[\\w.-]+\\.config\\.[cm]?[jt]s|config\\/quality\\/[\\w.-]+\\.json)";
const CONFIG_FILE_RE = new RegExp(`(["'\`])(${FILE_CLASS_BODY})\\1`, "g");
// The joined spec must itself be one of the same classes end to end (anchored), the
// same restriction the single-literal match gets implicitly from CONFIG_FILE_RE's own
// alternation — otherwise `path.join(process.cwd(), "package.json")` or any other
// `path.join`/`path.resolve` call that happens to resolve to a real file (the issue
// explicitly excludes package.json and tests/fixtures) would wrongly become an edge.
const FILE_CLASS_ONLY_RE = new RegExp(`^${FILE_CLASS_BODY}$`);

// The same reference can also arrive as separate path.join/path.resolve segments —
// `path.join(process.cwd(), ".github", "workflows", "quality.yml")` — instead of one
// literal. Capture the anchor-relative segment list and re-join it. This covers the
// `process.cwd()`/`__dirname` anchors seen in the repo; it is not a full static
// evaluator, so a segment built from a variable or template expression is still
// missed (disclosed as a known gap rather than attempted here).
const SEGMENT_JOIN_RE =
  /(?:path\.)?(?:join|resolve)\(\s*(?:process\.cwd\(\)|__dirname)((?:\s*,\s*["'`][^"'`]*["'`])+)\s*\)/g;
const SEGMENT_RE = /["'`]([^"'`]+)["'`]/g;

export function configFileDepsOf(testFile, root = ROOT) {
  const found = new Set();
  let code;
  try {
    code = fs.readFileSync(testFile, "utf8");
  } catch {
    return found;
  }
  for (const m of code.matchAll(CONFIG_FILE_RE)) {
    const spec = m[2];
    const fromTestDir = path.resolve(path.dirname(testFile), spec);
    const fromRoot = path.resolve(root, spec);
    for (const candidate of [fromTestDir, fromRoot]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        found.add(path.relative(root, candidate));
      }
    }
  }
  for (const m of code.matchAll(SEGMENT_JOIN_RE)) {
    const segments = [...m[1].matchAll(SEGMENT_RE)].map((s) => s[1]);
    if (segments.length === 0) continue;
    const spec = segments.join("/");
    if (!FILE_CLASS_ONLY_RE.test(spec)) continue;
    const fromTestDir = path.resolve(path.dirname(testFile), spec);
    const fromRoot = path.resolve(root, spec);
    for (const candidate of [fromTestDir, fromRoot]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        found.add(path.relative(root, candidate));
      }
    }
  }
  return found;
}

export function resolveImport(spec, fromFile, root = ROOT) {
  let base;
  if (spec.startsWith("@/")) base = path.join(root, "src", spec.slice(2));
  else if (spec.startsWith("@omniroute/open-sse"))
    base = path.join(root, "open-sse", spec.replace(/^@omniroute\/open-sse\/?/, ""));
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

export function sourceDepsOf(entry, root = ROOT) {
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
      const r = resolveImport(spec, f, root);
      if (!r) continue;
      const rel = path.relative(root, r);
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
export function buildTestImpactMap(root = ROOT) {
  const testFiles = globSync(
    [
      "tests/unit/*.test.ts",
      "tests/unit/{api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,ui,usage}/**/*.test.ts",
      "tests/unit/**/*.test.mjs",
      "tests/unit/dashboard/**/*.test.ts",
      // Quarentena serial (P0.3): também são node:test — a TIA precisa mapeá-los.
      "tests/unit/serial/**/*.test.ts",
    ],
    { cwd: root, absolute: true }
  );
  const map = {};
  for (const tf of testFiles) {
    const relTest = path.relative(root, tf);
    for (const src of sourceDepsOf(tf, root)) {
      (map[src] ||= []).push(relTest);
    }
    for (const configFile of configFileDepsOf(tf, root)) {
      (map[configFile] ||= []).push(relTest);
    }
  }
  for (const k of Object.keys(map)) map[k].sort();
  return { generatedFrom: "import-graph", sources: map, testFileCount: testFiles.length };
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const result = buildTestImpactMap();
  const { testFileCount, ...map } = result;
  const out = path.join(ROOT, "config/quality/test-impact-map.json");
  fs.writeFileSync(out, JSON.stringify(map, null, 2) + "\n");
  console.log(
    `test-impact-map: ${Object.keys(map.sources).length} source files mapped from ${testFileCount} test files`
  );
}
