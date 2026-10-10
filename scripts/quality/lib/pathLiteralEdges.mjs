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

const MAX_LITERAL_LENGTH = 300;
const WORD_CHAR_RE = /[A-Za-z0-9_$]/;
const WHITESPACE_RE = /\s/;

function quotedToken(code, start) {
  const quote = code[start];
  let end = start + 1;
  while (end < code.length && code[end] !== "\n") {
    if (code[end] === quote) {
      const value = end - start - 1 <= MAX_LITERAL_LENGTH ? code.slice(start + 1, end) : null;
      return {
        kind: "literal",
        start,
        end: end + 1,
        quote,
        value: quote === "`" && value?.includes("${") ? null : value,
      };
    }
    // Escapes retain their raw spelling; consume even oversized strings in full so
    // a quote in their contents can never start a second, shorter path candidate.
    if (code[end] === "\\" && code[end + 1] !== "\n") end += 1;
    end += 1;
  }
  return { kind: "literal", start, end, quote, value: null };
}

function pathTokens(code) {
  const tokens = [];
  let cursor = 0;
  while (cursor < code.length) {
    const start = cursor;
    const char = code[cursor];
    if (WHITESPACE_RE.test(char)) {
      cursor += 1;
      continue;
    }
    if ("\"'`".includes(char)) {
      const token = quotedToken(code, cursor);
      tokens.push(token);
      cursor = token.end;
      continue;
    }
    cursor += 1;
    if (WORD_CHAR_RE.test(char)) {
      while (cursor < code.length && WORD_CHAR_RE.test(code[cursor])) cursor += 1;
      tokens.push({ kind: "word", value: code.slice(start, cursor), start, end: cursor });
    } else {
      tokens.push({ kind: "punctuation", value: char, start, end: cursor });
    }
  }
  return tokens;
}

function isImportSpecifier(tokens, index) {
  const token = tokens[index];
  if (token.kind !== "literal" || token.quote === "`") return false;
  const previous = tokens[index - 1];
  if (previous?.kind === "word") {
    return previous.value === "from" || (previous.value === "import" && previous.end < token.start);
  }
  const callee = tokens[index - 2];
  return (
    previous?.kind === "punctuation" &&
    previous.value === "(" &&
    callee?.kind === "word" &&
    (callee.value === "require" || callee.value === "import") &&
    callee.end === previous.start
  );
}

function joinedLiteralParts(tokens, openIndex) {
  const parts = [];
  let depth = 1;
  for (let index = openIndex + 1; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === "literal") {
      if (token.value) parts.push(token.value);
      continue;
    }
    if (token.value === "(") depth += 1;
    if (token.value === ")") depth -= 1;
    if (depth === 0) return parts;
    // Match the existing join/resolve grammar: one nested pair, e.g. process.cwd().
    if (depth > 2) return [];
  }
  return [];
}

/** Literal candidates minus import occurrences, plus joined join/resolve arguments. */
export function pathLiteralCandidates(code) {
  const tokens = pathTokens(code);
  for (let index = 0; index < tokens.length; index += 1) {
    if (isImportSpecifier(tokens, index)) tokens[index].value = null;
  }
  const candidates = new Set(
    tokens.filter((token) => token.kind === "literal" && token.value).map((token) => token.value)
  );
  for (const [index, token] of tokens.entries()) {
    if (token.kind !== "word" || (token.value !== "join" && token.value !== "resolve")) continue;
    const opening = tokens[index + 1];
    if (opening?.kind !== "punctuation" || opening.value !== "(" || token.end !== opening.start)
      continue;
    const parts = joinedLiteralParts(tokens, index + 1);
    if (parts.length > 1) candidates.add(path.posix.join(...parts));
  }
  return candidates;
}

function isEligible(rel, tracked, realRoot) {
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false;
  if (HUB_FILES.has(rel) || !tracked.has(rel)) return false;
  if (EXCLUDED_PREFIXES.some((p) => rel.startsWith(p))) return false;
  const absolute = path.join(realRoot, rel);
  try {
    // Git's index may still list removed files. Reject links, including linked parents,
    // so only an existing regular file at this repository path creates an edge.
    return fs.lstatSync(absolute).isFile() && fs.realpathSync(absolute) === absolute;
  } catch {
    return false;
  }
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
  const realRoot = fs.realpathSync(root);
  for (const tf of testFiles) {
    const abs = path.resolve(root, tf);
    const relTest = path.relative(root, abs).split(path.sep).join("/");
    for (const rel of testArtifactPaths(abs, root, tracked, realRoot)) {
      if (!map.has(rel)) map.set(rel, new Set());
      map.get(rel).add(relTest);
    }
  }
  const artifacts = {};
  for (const key of [...map.keys()].sort()) artifacts[key] = [...map.get(key)].sort();
  return artifacts;
}

function testArtifactPaths(abs, root, tracked, realRoot) {
  let code;
  try {
    code = fs.readFileSync(abs, "utf8");
  } catch {
    return [];
  }
  const paths = new Set();
  for (const candidate of pathLiteralCandidates(code)) {
    for (const rel of resolveCandidates(candidate, path.dirname(abs), root)) {
      if (isEligible(rel, tracked, realRoot)) paths.add(rel);
    }
  }
  return paths;
}
