#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

// This policy is deliberately not derived from imported modules or observed hits.
// A future collector must instrument the same original sources in every lane.
const POLICY = {
  version: 1,
  roots: ["src", "open-sse", "electron", "bin"],
  extensions: [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts"],
  exclusions: ["test-directory", "test-file", "type-declaration", "non-runtime-extension"],
};
const MAX_GIT_OUTPUT = 256 * 1024 * 1024;
const hash = (value) => createHash("sha256").update(value).digest("hex");

function git(root, args, options = {}) {
  return execFileSync("git", ["-C", root, ...args], {
    encoding: "utf8",
    maxBuffer: MAX_GIT_OUTPUT,
    stdio: ["pipe", "pipe", "pipe"],
    ...options,
  });
}

function exclusion(filename) {
  if (filename.split("/").some((part) => ["tests", "__tests__", "__mocks__"].includes(part)))
    return "test-directory";
  if (/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(filename)) return "test-file";
  if (/\.d\.[cm]?ts$/.test(filename)) return "type-declaration";
  if (!POLICY.extensions.includes(posix.extname(filename))) return "non-runtime-extension";
  return null;
}

function readTrackedTree(root, sha) {
  const tree = git(root, ["ls-tree", "-rz", "--full-tree", sha, "--", ...POLICY.roots]);
  return tree
    .split("\0")
    .filter(Boolean)
    .map((entry) => {
      const tab = entry.indexOf("\t");
      const metadata = entry.slice(0, tab).match(/^(\d{6}) (blob|commit) ([a-f0-9]{40})$/);
      const filename = entry.slice(tab + 1);
      if (
        !metadata ||
        tab < 0 ||
        !filename ||
        posix.normalize(filename) !== filename ||
        filename.startsWith("../") ||
        posix.isAbsolute(filename) ||
        /[\\\x00-\x1f?:]/.test(filename)
      ) {
        throw new Error("invalid tracked source entry");
      }
      return { mode: metadata[1], type: metadata[2], blob: metadata[3], path: filename };
    })
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

function sourceIdentities(root, entries) {
  const output = git(root, ["cat-file", "--batch"], {
    encoding: null,
    input: entries.map((entry) => `${entry.blob}\n`).join(""),
  });
  let offset = 0;
  const files = entries.map((entry) => {
    const end = output.indexOf(10, offset);
    if (end < 0) throw new Error("incomplete source blob header");
    const header = output
      .subarray(offset, end)
      .toString("utf8")
      .match(/^([a-f0-9]{40}) blob (\d+)$/);
    const bytes = Number(header?.[2]);
    if (!header || header[1] !== entry.blob || !Number.isSafeInteger(bytes) || bytes < 0)
      throw new Error("invalid source blob identity");
    offset = end + 1;
    const source = output.subarray(offset, offset + bytes);
    if (source.length !== bytes || output[offset + bytes] !== 10)
      throw new Error("incomplete source blob content");
    offset += bytes + 1;
    return { path: entry.path, blob: entry.blob, sourceHash: hash(source), bytes };
  });
  if (offset !== output.length) throw new Error("unexpected extra source blob content");
  return files;
}

/** Freeze a denominator from immutable Git objects, not the mutable worktree. */
export function createCoverageScope(root, sha) {
  if (typeof sha !== "string" || !/^[a-f0-9]{40}$/.test(sha))
    throw new Error("coverage scope requires an exact 40-character commit SHA");
  const commit = git(root, ["rev-parse", "--verify", `${sha}^{commit}`]).trim();
  if (commit !== sha) throw new Error("coverage scope commit mismatch");
  const tree = git(root, ["rev-parse", `${sha}^{tree}`]).trim();
  const entries = readTrackedTree(root, sha);
  const sources = [];
  const excluded = [];
  for (const entry of entries) {
    // Even a tree hidden behind a gitlink cannot silently remove source files.
    if (entry.type !== "blob") throw new Error("coverage scope cannot include a nested repository");
    const reason = exclusion(entry.path);
    if (reason) excluded.push({ path: entry.path, reason });
    else {
      if (!["100644", "100755"].includes(entry.mode))
        throw new Error(`coverage requires a regular tracked source: ${entry.path}`);
      sources.push(entry);
    }
  }
  if (!sources.length) throw new Error("empty production coverage scope");
  const files = sourceIdentities(root, sources);
  const policy = structuredClone(POLICY);
  const scopeHash = hash(JSON.stringify({ policy, files, excluded }));
  return {
    schemaVersion: 1,
    sha,
    tree,
    policy,
    scopeHash,
    files,
    excluded,
    releaseAcceptance: false,
  };
}

/** Recompute against the expected commit; a self-consistent truncated receipt is insufficient. */
export function verifyCoverageScope(receipt, root, sha) {
  const expected = createCoverageScope(root, sha);
  if (!isDeepStrictEqual(receipt, expected)) throw new Error("coverage scope mismatch");
  return {
    verified: true,
    sha,
    scopeHash: expected.scopeHash,
    files: expected.files.length,
    releaseAcceptance: false,
  };
}

function main() {
  const options = {};
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    if (
      !["--root", "--sha", "--verify"].includes(key) ||
      Object.hasOwn(options, key) ||
      !args[index + 1] ||
      args[index + 1].startsWith("--")
    )
      throw new Error("invalid coverage scope arguments");
    options[key] = args[index + 1];
  }
  const root = resolve(options["--root"] || process.cwd());
  const sha = options["--sha"];
  const result = options["--verify"]
    ? verifyCoverageScope(JSON.parse(readFileSync(options["--verify"], "utf8")), root, sha)
    : createCoverageScope(root, sha);
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    main();
  } catch (error) {
    console.error(`[coverage-scope] ${error.message}`);
    process.exitCode = 1;
  }
}
