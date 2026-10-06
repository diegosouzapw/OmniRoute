/**
 * Shared MCP publish-path helpers (#3578 / #3821).
 *
 * Unit tests use the static `files` allowlist walker (no subprocess).
 * The pack-artifact gate uses the same helpers against a real
 * `npm pack --dry-run --ignore-scripts` file list so concurrent unit
 * suites never shell out to `npm pack`.
 */

import fs from "node:fs";
import path from "node:path";

import { normalizeArtifactPath } from "./pack-artifact-policy.ts";

/** Co-located test / spec paths that must never ship in the npm tarball. */
export const PACK_ARTIFACT_TEST_FILE_RE = /(?:^|\/)__tests__\/|\.(?:test|spec)\.[cm]?[jt]sx?$/;

/** Negations that must stay in package.json `files` (static unit guard). */
export const REQUIRED_PACKAGE_FILES_TEST_NEGATIONS: readonly string[] = [
  "!**/__tests__/**",
  "!**/*.test.ts",
  "!**/*.test.tsx",
  "!**/*.test.js",
  "!**/*.test.mjs",
  "!**/*.spec.ts",
  "!**/*.spec.tsx",
];

/** Spot-check file from the original #3578 bug report. */
export const MCP_CLOSURE_SPOT_CHECK_PATH = "src/lib/combos/steps.ts";

function resolveImport(root: string, fromFile: string, spec: string): string | null {
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
  for (const c of cands) if (fs.existsSync(path.join(root, c))) return c;
  return null;
}

/**
 * Transitive import closure of the MCP server entrypoints under `src/` + `open-sse/`.
 */
export function computeMcpClosure(root: string = process.cwd()): string[] {
  const roots: string[] = [];
  for (const f of fs.readdirSync(path.join(root, "open-sse/mcp-server"))) {
    if (f.endsWith(".ts")) roots.push("open-sse/mcp-server/" + f);
  }
  for (const d of ["open-sse/mcp-server/tools", "open-sse/mcp-server/schemas"]) {
    const abs = path.join(root, d);
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
      src = fs.readFileSync(path.join(root, f), "utf8");
    } catch {
      continue;
    }
    let m: RegExpExecArray | null;
    while ((m = importRe.exec(src))) {
      const spec = m[1] || m[2];
      if (!spec) continue;
      const r = resolveImport(root, f, spec);
      if (r && !seen.has(r)) stack.push(r);
    }
  }
  return [...seen].filter((f) => f.startsWith("src/") || f.startsWith("open-sse/"));
}

/** Whether `file` is covered by a package.json `files` allowlist entry. */
export function isCoveredByFiles(file: string, filesEntries: string[]): boolean {
  for (const entry of filesEntries) {
    if (entry.startsWith("!")) continue; // negations are not positive coverage
    if (entry.endsWith("/")) {
      if (file === entry.slice(0, -1) || file.startsWith(entry)) return true;
    } else if (file === entry || file.startsWith(entry + "/")) {
      return true;
    }
  }
  return false;
}

/** Packed paths that look like test / spec files (over-inclusion). */
export function findLeakedTestArtifactPaths(filePaths: string[]): string[] {
  return filePaths
    .map(normalizeArtifactPath)
    .filter(Boolean)
    .filter((filePath) => PACK_ARTIFACT_TEST_FILE_RE.test(filePath))
    .sort();
}

/** MCP closure members missing from a packed (or candidate) path set. */
export function findMissingMcpClosurePaths(
  packedPaths: string[],
  closurePaths: string[] = computeMcpClosure()
): string[] {
  const packed = new Set(packedPaths.map(normalizeArtifactPath).filter(Boolean));
  return closurePaths
    .map(normalizeArtifactPath)
    .filter(Boolean)
    .filter((filePath) => !packed.has(filePath))
    .sort();
}

/** Required `files` negation entries that are absent from package.json. */
export function findMissingPackageFilesTestNegations(filesEntries: string[]): string[] {
  const present = new Set(filesEntries);
  return REQUIRED_PACKAGE_FILES_TEST_NEGATIONS.filter((entry) => !present.has(entry));
}
