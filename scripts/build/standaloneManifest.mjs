#!/usr/bin/env node
/**
 * Byte-level manifest for the shared Next standalone web build (issue #10321,
 * Stage 8).
 *
 * The desktop pipeline used to rebuild the identical Next standalone bundle
 * four times (one per electron-release matrix leg). Stage 8 builds it once on
 * an ubuntu runner and restores it on every leg; this module is the integrity
 * contract that makes a restored tree provably identical to the built one.
 *
 * Deterministic by construction: entries are sorted by path, timestamps are
 * never recorded, and symlinks are pinned by their target so a restored tree
 * verifies even though tar extraction rewrites mtimes.
 */

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs";
import path from "node:path";

export const MANIFEST_VERSION = 1;

/** Streamed sha256 for large native payloads (onnxruntime is ~200 MB). */
async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

/**
 * Rewrite a symlink target so it is anchored to the tree being packed/verified
 * instead of the machine that happened to create it (issue #11979).
 *
 * `npm`'s bin-links usually produce a target already relative to the
 * symlink's own directory (e.g. `../semver/bin/semver.js`), which survives an
 * archive/restore round trip unchanged on every OS. Some `npm ci` legs
 * (observed on the ubuntu web-build runner) instead emit an ABSOLUTE target
 * tied to that machine's checkout path. An absolute target is inherently
 * non-portable: POSIX restores it as a dangling symlink once the packing
 * machine's path is gone, and Windows' `CreateSymbolicLink` rewrites a
 * leading `/` into a drive-relative path on read-back, so a byte-for-byte
 * comparison against the recorded value fails outright.
 *
 * A relative target has no such ambiguity, so an absolute target is resolved
 * against `rootDir` and re-expressed relative to the symlink's own directory
 * -- the same portable shape `npm install` already produces natively.
 *
 * @param {string} rootDir absolute path to the tree root
 * @param {string} entryRelPath the symlink's own path, relative to rootDir (posix-separated)
 * @param {string} rawTarget the raw string from fs.readlinkSync
 * @returns {{ok: true, value: string} | {ok: false, reason: string}}
 */
export function normalizeSymlinkTarget(rootDir, entryRelPath, rawTarget) {
  if (!path.isAbsolute(rawTarget)) {
    return { ok: true, value: rawTarget };
  }
  const rootResolved = path.resolve(rootDir);
  const resolvedTarget = path.resolve(rawTarget);
  const relFromRoot = path.relative(rootResolved, resolvedTarget);
  if (relFromRoot === "" || relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) {
    return {
      ok: false,
      reason: `symlink ${entryRelPath} target escapes the tree root: ${rawTarget}`,
    };
  }
  const symlinkDir = path.dirname(path.join(rootResolved, ...entryRelPath.split("/")));
  const relFromSymlink = path.relative(symlinkDir, resolvedTarget).split(path.sep).join("/");
  return { ok: true, value: relFromSymlink };
}

function walkDir(root, current, entries) {
  const children = fs.readdirSync(current, { withFileTypes: true });
  // Sort for determinism: manifest of the same tree is byte-identical.
  children.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const child of children) {
    const abs = path.join(current, child.name);
    const rel = path.relative(root, abs).split(path.sep).join("/");
    if (child.isSymbolicLink()) {
      const normalized = normalizeSymlinkTarget(root, rel, fs.readlinkSync(abs));
      if (!normalized.ok) {
        throw new Error(`standalone manifest: ${normalized.reason}`);
      }
      entries.push({ path: rel, symlink: normalized.value });
    } else if (child.isDirectory()) {
      walkDir(root, abs, entries);
    } else if (child.isFile()) {
      entries.push({ path: rel, file: abs });
    }
    // Other node types (fifo/socket) never appear in build output; ignoring
    // them keeps the manifest shape minimal.
  }
}

/**
 * Build a manifest of every file and symlink under `rootDir`.
 *
 * @returns {Promise<{version: number, entries: {path: string, bytes: number, sha256: string, symlink?: string}[]}>}
 */
export async function buildStandaloneManifest(rootDir) {
  const entries = [];
  walkDir(rootDir, rootDir, entries);
  const manifestEntries = [];
  for (const entry of entries) {
    if (entry.symlink !== undefined) {
      manifestEntries.push({ path: entry.path, bytes: 0, sha256: "", symlink: entry.symlink });
      continue;
    }
    const stat = fs.statSync(entry.file);
    manifestEntries.push({
      path: entry.path,
      bytes: stat.size,
      sha256: await sha256File(entry.file),
    });
  }
  manifestEntries.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return { version: MANIFEST_VERSION, entries: manifestEntries };
}

/**
 * Verify a restored tree against a manifest built by `buildStandaloneManifest`.
 * Checks existence, size, and content hash of every entry, plus that no
 * unlisted files were smuggled in.
 *
 * @returns {Promise<{ok: true} | {ok: false, errors: string[]}>}
 */
export async function verifyStandaloneManifest(rootDir, manifest) {
  const errors = [];
  if (!manifest || manifest.version !== MANIFEST_VERSION) {
    return { ok: false, errors: [`unsupported manifest version: ${manifest?.version}`] };
  }
  const listed = new Map(manifest.entries.map((e) => [e.path, e]));
  for (const entry of manifest.entries) {
    const abs = path.join(rootDir, ...entry.path.split("/"));
    let stat;
    try {
      stat = fs.lstatSync(abs);
    } catch {
      errors.push(`${entry.path}: missing`);
      continue;
    }
    if (entry.symlink !== undefined) {
      if (!stat.isSymbolicLink()) {
        errors.push(`${entry.path}: expected symlink, found regular entry`);
      } else {
        // Normalize BOTH sides before comparing: the manifest's recorded
        // value is already relative for a tree built after #11979, but an
        // older manifest (or a restoring OS that still hands back an
        // absolute string) is re-anchored here too, so the comparison never
        // depends on which machine happened to produce which string.
        const actual = normalizeSymlinkTarget(rootDir, entry.path, fs.readlinkSync(abs));
        const expected = normalizeSymlinkTarget(rootDir, entry.path, entry.symlink);
        if (!actual.ok) {
          errors.push(`${entry.path}: ${actual.reason}`);
        } else if (!expected.ok) {
          errors.push(`${entry.path}: manifest ${expected.reason}`);
        } else if (actual.value !== expected.value) {
          errors.push(`${entry.path}: symlink target ${actual.value} != ${expected.value}`);
        }
      }
      continue;
    }
    if (!stat.isFile()) {
      errors.push(`${entry.path}: expected file, found directory/symlink`);
      continue;
    }
    if (stat.size !== entry.bytes) {
      errors.push(`${entry.path}: size ${stat.size} != ${entry.bytes}`);
      continue;
    }
    const digest = await sha256File(abs);
    if (digest !== entry.sha256) {
      errors.push(`${entry.path}: sha256 mismatch`);
    }
  }
  const actual = [];
  walkDir(rootDir, rootDir, actual);
  const actualPaths = new Set(actual.map((e) => e.path));
  for (const p of listed.keys()) actualPaths.delete(p);
  if (actualPaths.size > 0) {
    errors.push(`unlisted files: ${[...actualPaths].sort().slice(0, 5).join(", ")}`);
  }
  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
