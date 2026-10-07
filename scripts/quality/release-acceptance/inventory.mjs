import fs from "node:fs";
import path from "node:path";
import {
  COLLECTORS,
  globToRegExp,
} from "../../check/check-test-discovery.mjs";

const UNIT_CI_GLOBS = new Set([
  "tests/unit/*.test.ts",
  "tests/unit/{api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,translator,ui,usage}/**/*.test.ts",
  "tests/unit/dashboard/**/*.test.ts",
  "tests/unit/serial/**/*.test.ts",
  "tests/unit/**/*.test.mjs",
]);

const INTEGRATION_GLOBS = new Set([
  "tests/integration/*.test.ts",
  "tests/integration/combo-matrix/*.test.ts",
]);

function inScope(collector, scopeSuites) {
  const suites = new Set(scopeSuites);
  if (suites.has("test:unit:ci") && UNIT_CI_GLOBS.has(collector.glob)) return true;
  if (suites.has("test:integration") && INTEGRATION_GLOBS.has(collector.glob)) return true;
  if (suites.has("test:vitest") && collector.sources?.includes("vitest.mcp.config.ts")) {
    return true;
  }
  return false;
}

function walkTestFiles(root = process.cwd()) {
  const out = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === "node_modules" || e.name === ".git") continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(test|spec)\.(ts|tsx|mjs|js)$/.test(e.name)) {
        out.push(path.relative(root, p).split(path.sep).join("/"));
      }
    }
  }
  walk(path.join(root, "tests"));
  walk(path.join(root, "open-sse"));
  walk(path.join(root, "src"));
  return out;
}

export function canonicalSet(scopeSuites, collectors = COLLECTORS, files) {
  const scoped = collectors.filter((c) => inScope(c, scopeSuites));
  const regexes = scoped.map((c) => globToRegExp(c.glob));
  const discovered = files ?? walkTestFiles();
  return discovered.filter((f) => regexes.some((re) => re.test(f)));
}

export function knownUnexecuted(scopeSuites, collectors = COLLECTORS, baseline, files) {
  const discovered = files ?? walkTestFiles();
  const orphans = baseline?.orphans ?? [];
  const outOfScope = collectors.filter((c) => !inScope(c, scopeSuites));
  const collectorsOut = outOfScope.map((c) => {
    const re = globToRegExp(c.glob);
    const count = discovered.filter((f) => re.test(f)).length;
    return {
      glob: c.glob,
      count,
      reason: "collector runner is not a suite of this scope",
    };
  });
  return {
    orphans: { count: orphans.length, paths: orphans },
    collectors: collectorsOut,
  };
}

export function inventoryErrors(scopeSuites, collectors, baseline, discoveredFiles) {
  const errors = [];
  const full = COLLECTORS;
  const givenGlobs = new Set(collectors.map((c) => c.glob));
  for (const c of full) {
    if (!givenGlobs.has(c.glob)) {
      errors.push({
        code: "collector_omitted",
        glob: c.glob,
        detail: `collector ${c.glob} omitted without known_unexecuted listing`,
      });
    }
  }
  const ku = knownUnexecuted(scopeSuites, collectors, baseline, discoveredFiles);
  const knownGlobs = new Set(ku.collectors.map((c) => c.glob));
  const knownOrphans = new Set(ku.orphans.paths);
  const scoped = collectors.filter((c) => inScope(c, scopeSuites));
  const regexes = scoped.map((c) => globToRegExp(c.glob));
  for (const f of discoveredFiles ?? []) {
    const inCanonical = regexes.some((re) => re.test(f));
    const inKnown = knownOrphans.has(f) || [...knownGlobs].some((g) => globToRegExp(g).test(f));
    if (!inCanonical && !inKnown) {
      errors.push({ code: "unmapped_file", path: f, detail: "discovered file belongs to no set" });
    }
  }
  return errors;
}
