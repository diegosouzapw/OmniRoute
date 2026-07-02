import fs from "node:fs";
import path from "node:path";

// Dirs collected ONLY by vitest (vitest.mcp.config.ts include globs for .ts tests).
// Keep in sync with vitest.mcp.config.ts. A test here MUST import from "vitest".
const VITEST_ONLY_DIRS = [
  "tests/unit/autoCombo",
  "open-sse/services/autoCombo",
  "open-sse/mcp-server",
];

function walk(dir, root, out = []) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return out;
  for (const name of fs.readdirSync(abs)) {
    const rel = path.join(dir, name);
    const s = fs.statSync(path.join(root, rel));
    if (s.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(rel, root, out);
    } else if (/\.test\.(ts|tsx|js|mjs)$/.test(name)) {
      out.push(rel);
    }
  }
  return out;
}

function isVitestOnly(relFile) {
  const norm = relFile.replace(/\\/g, "/");
  return VITEST_ONLY_DIRS.some(
    (d) => norm.startsWith(d + "/") && (norm.includes("/__tests__/") || d.startsWith("tests/unit/"))
  );
}

export function findRunnerMismatches(root) {
  const files = VITEST_ONLY_DIRS.flatMap((d) => walk(d, root));
  const bad = [];
  for (const f of files) {
    if (!isVitestOnly(f)) continue;
    const txt = fs.readFileSync(path.join(root, f), "utf8");
    const importsNodeTest = /from\s+["']node:test["']/.test(txt);
    const importsVitest = /from\s+["']vitest["']/.test(txt);
    if (importsNodeTest && !importsVitest) {
      bad.push({ file: f, reason: "vitest-only dir but imports node:test (use the vitest API)" });
    }
  }
  return bad;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = process.cwd();
  const bad = findRunnerMismatches(root);
  if (bad.length) {
    console.error(`[test-runner-api] FAIL — ${bad.length} test(s) use the wrong runner API:`);
    for (const b of bad) console.error(`  ${b.file}: ${b.reason}`);
    process.exit(1);
  }
  console.log("[test-runner-api] OK — vitest-only dirs use the vitest API.");
}
