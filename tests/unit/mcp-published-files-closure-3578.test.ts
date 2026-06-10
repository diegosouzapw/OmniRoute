import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

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
