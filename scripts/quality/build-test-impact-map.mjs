import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC_ROOTS = ["src", "open-sse"];
const IMPORT_RE =
  /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const EXTS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

// ── Path-literal edges ────────────────────────────────────────────────────────
// The import graph only sees `import`/`require`. A test that pins a workflow or a root
// config reads it as a FILE (`new URL("../../.github/workflows/x.yml", import.meta.url)`,
// `readFileSync(resolve(here, "../../next.config.mjs"))`, `path.join(process.cwd(),
// "next.config.mjs")`), so no edge existed and a change to that artifact never pointed at
// the test. Measured 2026-08-14: 37 test files were invisible this way. These edges go in a
// SEPARATE `artifacts` key so `sources` keeps its exact import-graph semantics (the TIA
// selector treats an unmapped src file as __RUN_ALL__; an unpinned artifact must not).
//
// A literal counts when it (a) looks like a file path with an extension, (b) resolves to an
// existing regular file relative to the test's directory or to the repo root, and (c) lives
// OUTSIDE import territory (src/, open-sse/, bin/ — already covered by `sources`), outside
// tests/ (a test is never its own sibling), and outside generated/private trees.
const PATH_LITERAL_RE =
  /['"`]((?:\.{1,2}\/)+[^'"`\s]+|\.?[\w@-][\w.@-]*(?:\/[\w.@-]+)*\.(?:ya?ml|c?m?js|ts|json|md|toml|sh|txt|env))['"`]/g;
const ARTIFACT_EXCLUDED_PREFIXES = [
  "src/",
  "open-sse/",
  "bin/",
  "tests/",
  "node_modules/",
  ".git/",
  ".claude/",
  ".build/",
  "dist/",
  "coverage/",
  "_",
];
// Hub files already force __RUN_ALL__ in the TIA selector; as sibling edges they would only
// turn every dependabot bump into a wall of advisory findings.
const ARTIFACT_HUB_RE = /^(?:package\.json|package-lock\.json)$/;

function isArtifactPath(rel) {
  return (
    !ARTIFACT_EXCLUDED_PREFIXES.some((p) => rel.startsWith(p)) &&
    !ARTIFACT_HUB_RE.test(rel) &&
    !/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(rel)
  );
}

/** Repo-relative artifact files a test file pins by string literal (POSIX separators). */
export function artifactLiteralsOf(testFile, root = ROOT) {
  const out = new Set();
  let code;
  try {
    code = fs.readFileSync(testFile, "utf8");
  } catch {
    return out;
  }
  const dir = path.dirname(testFile);
  for (const m of code.matchAll(PATH_LITERAL_RE)) {
    const lit = m[1];
    for (const candidate of [path.resolve(dir, lit), path.resolve(root, lit)]) {
      const rel = path.relative(root, candidate).split(path.sep).join("/");
      if (rel.startsWith("..") || path.isAbsolute(rel) || !isArtifactPath(rel)) continue;
      let stat;
      try {
        stat = fs.statSync(candidate);
      } catch {
        continue;
      }
      if (!stat.isFile()) continue;
      out.add(rel);
      break;
    }
  }
  return out;
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
  const artifacts = {};
  for (const tf of testFiles) {
    const relTest = path.relative(root, tf);
    for (const src of sourceDepsOf(tf, root)) {
      (map[src] ||= []).push(relTest);
    }
    for (const artifact of artifactLiteralsOf(tf, root)) {
      (artifacts[artifact] ||= []).push(relTest);
    }
  }
  for (const k of Object.keys(map)) map[k].sort();
  for (const k of Object.keys(artifacts)) artifacts[k].sort();
  return {
    generatedFrom: "import-graph+path-literals",
    sources: map,
    artifacts,
    testFileCount: testFiles.length,
  };
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const result = buildTestImpactMap();
  const { testFileCount, ...map } = result;
  const out = path.join(ROOT, "config/quality/test-impact-map.json");
  fs.writeFileSync(out, JSON.stringify(map, null, 2) + "\n");
  console.log(
    `test-impact-map: ${Object.keys(map.sources).length} source files + ${Object.keys(map.artifacts).length} pinned artifacts mapped from ${testFileCount} test files`
  );
}
