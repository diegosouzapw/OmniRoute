import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

// #3578 — `omniroute --mcp` crashed on npm installs with ERR_MODULE_NOT_FOUND for
// src/lib/combos/steps.ts: the MCP server runs from raw TypeScript source and imports
// across src/ + open-sse/, but the published `files` allowlist only shipped a few
// cherry-picked paths. This gate computes the MCP server's transitive import closure
// and asserts every reachable src/ + open-sse/ file is covered by a package.json
// `files` entry, so a missing dir can never silently ship a broken --mcp again.

const ROOT = process.cwd();

function resolveImport(fromFile: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join("src", spec.slice(2));
  else if (spec.startsWith("@omniroute/open-sse/"))
    base = path.join("open-sse", spec.slice("@omniroute/open-sse/".length));
  else if (spec === "@omniroute/open-sse") base = path.join("open-sse", "index");
  else if (spec.startsWith("./") || spec.startsWith("../"))
    base = path.join(path.dirname(fromFile), spec);
  else return null; // bare package — not our source
  base = base.replace(/\.(ts|tsx|js|mjs)$/, "");
  const cands = [
    base + ".ts",
    base + ".tsx",
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    base + ".js",
    base + ".mjs",
  ];
  for (const c of cands) if (fs.existsSync(path.join(ROOT, c))) return c;
  return null;
}

function computeMcpClosure(): string[] {
  const roots: string[] = [];
  for (const f of fs.readdirSync(path.join(ROOT, "open-sse/mcp-server"))) {
    if (f.endsWith(".ts")) roots.push("open-sse/mcp-server/" + f);
  }
  for (const d of ["open-sse/mcp-server/tools", "open-sse/mcp-server/schemas"]) {
    const abs = path.join(ROOT, d);
    if (fs.existsSync(abs))
      for (const f of fs.readdirSync(abs)) if (f.endsWith(".ts")) roots.push(d + "/" + f);
  }

  const seen = new Set<string>();
  const stack = [...roots];
  const importRe =
    /(?:import|export)[^"']*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
  while (stack.length) {
    const f = stack.pop() as string;
    if (seen.has(f)) continue;
    seen.add(f);
    let src: string;
    try {
      src = fs.readFileSync(path.join(ROOT, f), "utf8");
    } catch {
      continue;
    }
    let m: RegExpExecArray | null;
    while ((m = importRe.exec(src))) {
      const spec = m[1] || m[2];
      if (!spec) continue;
      const r = resolveImport(f, spec);
      if (r && !seen.has(r)) stack.push(r);
    }
  }
  return [...seen].filter((f) => f.startsWith("src/") || f.startsWith("open-sse/"));
}

function isCoveredByFiles(file: string, filesEntries: string[]): boolean {
  for (const entry of filesEntries) {
    if (entry.endsWith("/")) {
      if (file === entry.slice(0, -1) || file.startsWith(entry)) return true;
    } else if (file === entry || file.startsWith(entry + "/")) {
      return true;
    }
  }
  return false;
}

test("#3578 every MCP-server source file is covered by package.json files", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const filesEntries: string[] = pkg.files || [];
  const closure = computeMcpClosure();

  // Sanity: the closure must actually include the file the bug report hit.
  assert.ok(
    closure.includes("src/lib/combos/steps.ts"),
    "closure should include the file from the bug report (#3578)"
  );

  const uncovered = closure.filter((f) => !isCoveredByFiles(f, filesEntries));
  assert.deepEqual(
    uncovered,
    [],
    `These MCP-reachable source files are not in package.json "files" and would 404 a published --mcp:\n` +
      uncovered.map((f) => "  - " + f).join("\n")
  );
});

// #3821-review (LEDGER-1): the static `files` check above only guards UNDER-inclusion
// (every MCP file is allowlisted). It cannot see that the whole-directory entries
// (open-sse/, src/lib/, ...) also drag co-located test files into the tarball, nor that
// a future secret-bearing fixture under a shipped dir would publish. This test asserts
// the REAL `npm pack --dry-run` output in BOTH directions: the MCP closure is present AND
// no `__tests__` / `*.test.*` / `*.spec.*` file ships. It is the regression anchor for the
// `!**/*.test.*` negations in package.json `files`.
function packedFilePaths(): string[] {
  // --dry-run writes no tarball; --json emits [{ files: [{ path }] }] on stdout.
  const out = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
  const parsed = JSON.parse(out) as Array<{ files?: Array<{ path: string }> }>;
  const entry = parsed[0];
  assert.ok(entry?.files?.length, "npm pack --dry-run returned no files");
  return entry.files!.map((f) => f.path);
}

const TEST_FILE_RE = /(?:^|\/)__tests__\/|\.(?:test|spec)\.[cm]?[jt]sx?$/;

test("#3578/#3821 npm pack ships the MCP closure but no test files", () => {
  const packed = packedFilePaths();
  const packedSet = new Set(packed);

  // Direction 1 — under-inclusion: every MCP-reachable source file is actually packed.
  const closure = computeMcpClosure();
  const missing = closure.filter((f) => !packedSet.has(f));
  assert.deepEqual(
    missing,
    [],
    `MCP-reachable source files are missing from the published tarball (would 404 --mcp):\n` +
      missing.map((f) => "  - " + f).join("\n")
  );
  // Spot-check the file from the original bug report.
  assert.ok(
    packedSet.has("src/lib/combos/steps.ts"),
    "src/lib/combos/steps.ts (the #3578 bug file) must be in the tarball"
  );

  // Direction 2 — over-inclusion: no co-located test / spec file is published.
  const shippedTests = packed.filter((f) => TEST_FILE_RE.test(f));
  assert.deepEqual(
    shippedTests,
    [],
    `These test files leaked into the npm tarball — tighten package.json "files" negations:\n` +
      shippedTests.map((f) => "  - " + f).join("\n")
  );
});
