// Path-literal edges (#16068): tests that pin a workflow / root config / doc by reading it as a
// FILE (`new URL("../../.github/workflows/x.yml", import.meta.url)`, `resolve(here, "…")`,
// `path.join(process.cwd(), "…")`, `readFileSync("…")`) have no import edge, so the sibling gate
// and TIA never pointed at them. This module derives `artifacts: { repoFile: [testFiles] }`.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Import territory is already covered by import edges; tests/ and generated trees are noise.
const EXCLUDED_PREFIXES = [
  "src/",
  "open-sse/",
  "bin/",
  "tests/",
  "dist/",
  ".next/",
  "coverage/",
  "docs/i18n/",
  "node_modules/",
];
// Hubs already force a full run in TIA.
const HUB_FILES = new Set(["package.json", "package-lock.json"]);

const LITERAL_RE = /(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g;
const JOIN_CALL_RE = /\b(?:join|resolve)\(((?:[^()]|\([^()]*\))*)\)/g;
const IMPORT_SPEC_RE =
  /(?:\bfrom\s*|\brequire\(\s*|\bimport\(\s*|\bimport\s+)(["'])((?:\\.|(?!\1)[^\\\n])*)\1/g;
const MAX_LITERAL_LENGTH = 300;

function plainLiterals(text) {
  const out = [];
  for (const m of text.matchAll(LITERAL_RE)) {
    const value = m[2];
    if (m[1] === "`" && value.includes("${")) continue;
    if (value && value.length <= MAX_LITERAL_LENGTH) out.push(value);
  }
  return out;
}

/** Literal candidates in `code`, minus import specifiers, plus joined `join/resolve` args. */
export function pathLiteralCandidates(code) {
  const imports = new Set([...code.matchAll(IMPORT_SPEC_RE)].map((m) => m[2]));
  const candidates = new Set(plainLiterals(code).filter((v) => !imports.has(v)));
  for (const call of code.matchAll(JOIN_CALL_RE)) {
    const parts = plainLiterals(call[1]);
    if (parts.length > 1) candidates.add(path.posix.join(...parts));
  }
  return candidates;
}

function isEligible(rel, tracked) {
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false;
  if (HUB_FILES.has(rel) || !tracked.has(rel)) return false;
  return !EXCLUDED_PREFIXES.some((p) => rel.startsWith(p));
}

function resolveCandidates(candidate, testDir, root) {
  const bases = [path.resolve(testDir, candidate), path.resolve(root, candidate)];
  return bases.map((abs) => path.relative(root, abs).split(path.sep).join("/"));
}

export function trackedFiles(root) {
  const out = execFileSync("git", ["ls-files", "-z"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  return new Set(out.split("\0").filter(Boolean));
}

/**
 * @param {{root: string, testFiles: string[], tracked?: Set<string>}} opts
 *   testFiles: absolute or root-relative paths. Returns a sorted, deterministic artifacts map.
 */
export function extractPathLiteralEdges({ root, testFiles, tracked = trackedFiles(root) }) {
  const map = new Map();
  for (const tf of testFiles) {
    const abs = path.resolve(root, tf);
    const relTest = path.relative(root, abs).split(path.sep).join("/");
    let code;
    try {
      code = fs.readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    for (const candidate of pathLiteralCandidates(code)) {
      for (const rel of resolveCandidates(candidate, path.dirname(abs), root)) {
        if (!isEligible(rel, tracked)) continue;
        if (!map.has(rel)) map.set(rel, new Set());
        map.get(rel).add(relTest);
      }
    }
  }
  const artifacts = {};
  for (const key of [...map.keys()].sort()) artifacts[key] = [...map.get(key)].sort();
  return artifacts;
}
