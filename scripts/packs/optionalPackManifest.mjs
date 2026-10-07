#!/usr/bin/env node

/**
 * OmniRoute — Optional runtime pack manifest + integrity core.
 *
 * Stage 7 of the Electron efficiency roadmap (issue #10321): the heavy optional
 * ML / browser automation dependency closure is excluded from the packaged
 * desktop app and shipped as versioned, checksummed packs that install on first
 * use into `DATA_DIR/packs/<name>/node_modules`.
 *
 * This module owns the *contract* shared by three consumers:
 *  - `scripts/build/optionalPackStaging.mjs` (build): checksums the staged
 *    closure, emits `optional-packs.index.json`, removes pack members from the
 *    Electron staging tree, optionally tars the packs for release assets.
 *  - `scripts/packs/optionalPackInstaller.mjs` (first use): installs/verifies/
 *    removes packs in DATA_DIR against the shipped index.
 *  - `bin/cli/commands/packs.mjs` (UX): `omniroute packs …`.
 *
 * The runtime *resolution* side (making an installed pack light up the SLM /
 * embeddings / browser features) lives in `open-sse/utils/optionalPacks.ts` and
 * intentionally does NOT import this file — it embeds only the pack names.
 *
 * Fail-open philosophy: every consumer of a pack degrades gracefully when the
 * pack is absent; nothing here may throw into a code path that works today.
 */

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs";
import path from "node:path";

/**
 * The optional runtime packs. Membership changes require bumping `packVersion`.
 *
 * `os`/`cpu` use Node `process.platform`/`process.arch` values and exist so the
 * installer can refuse (with a clear error) a pack whose native payloads do not
 * match the machine — e.g. a future pack that only ships darwin/win prebuilds.
 */
export const OPTIONAL_PACKS = [
  {
    name: "ml-runtime",
    packVersion: 1,
    description:
      "Local ML inference closure: LLMLingua-2 SLM prompt compression and transformers.js memory embeddings",
    packages: [
      // NOTE: exact versions are resolved at packaging time from the staged
      // tree and recorded in optional-packs.index.json — the manifest defines
      // MEMBERSHIP only, so member bumps don't need a manifest edit unless the
      // set of packages changes.
      { name: "@huggingface/transformers" },
      { name: "onnxruntime-node" },
      { name: "@atjsh/llmlingua-2" },
      { name: "js-tiktoken" },
    ],
  },
  {
    name: "browser-runtime",
    packVersion: 1,
    description:
      "Browser automation closure: Claude Turnstile solver and ChatGPT Web (Codex)/Gemini web executors",
    packages: [{ name: "playwright" }, { name: "playwright-core" }],
  },
];

/** Index file emitted at the standalone bundle root (same walk-up anchor style as llmlingua's GATE_DEP_REL). */
export const PACK_INDEX_FILENAME = "optional-packs.index.json";

/** Look up a pack definition by name. */
export function findPack(name) {
  return OPTIONAL_PACKS.find((pack) => pack.name === name) ?? null;
}

/** Flatten every package name across all packs (sorted, deduped). */
export function allPackPackageNames() {
  return [...new Set(OPTIONAL_PACKS.flatMap((pack) => pack.packages.map((p) => p.name)))].sort();
}

/** Whether `platform`/`arch` satisfy a package's optional os/cpu filters. */
export function packageMatchesPlatform(pkg, platform = process.platform, arch = process.arch) {
  if (Array.isArray(pkg.os) && !pkg.os.includes(platform)) return false;
  if (Array.isArray(pkg.cpu) && !pkg.cpu.includes(arch)) return false;
  return true;
}

/** Whether every package of `pack` matches the platform (compat gate for installs). */
export function packMatchesPlatform(pack, platform = process.platform, arch = process.arch) {
  return pack.packages.every((pkg) => packageMatchesPlatform(pkg, platform, arch));
}

// ─── deterministic directory checksum ───────────────────────────────────────────

/**
 * Recursively collect sorted relative POSIX paths of regular files under `dir`.
 * Symlinks are included as their own entries (link target hashed) — npm trees can
 * contain them and silently skipping them would weaken tamper detection.
 *
 * @param {string} dir
 * @returns {{rel: string, absolute: string, symlink: boolean}[]}
 */
export function listDirFiles(dir) {
  const out = [];
  const walk = (current, prefix) => {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    // Sort for determinism across platforms/FS orderings.
    const sorted = [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of sorted) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(absolute, rel);
      } else {
        out.push({ rel, absolute, symlink: entry.isSymbolicLink() });
      }
    }
  };
  walk(dir, "");
  return out;
}

/**
 * Deterministic sha256 over a directory tree: sorted relative path + per-file
 * content (or link target). Byte-stable across platforms (POSIX separators).
 *
 * @param {string} dir
 * @returns {Promise<{sha256: string, files: number, bytes: number}>}
 */
export async function dirChecksum(dir) {
  const hash = createHash("sha256");
  let files = 0;
  let bytes = 0;
  for (const { rel, absolute, symlink } of listDirFiles(dir)) {
    hash.update(rel);
    hash.update("\0");
    if (symlink) {
      let target = "";
      try {
        target = fs.readlinkSync(absolute);
      } catch {
        /* unreadable link — hash as empty target */
      }
      hash.update(`link:${target}`);
    } else {
      let size = 0;
      try {
        size = fs.statSync(absolute).size;
      } catch {
        /* stat race — hash content stream anyway */
      }
      bytes += size;
      hash.update(String(size));
      hash.update("\0");
      try {
        // Stream to keep memory bounded on multi-hundred-MB packages (onnxruntime-node).
        for await (const chunk of createReadStream(absolute)) hash.update(chunk);
      } catch {
        hash.update("<unreadable>");
      }
    }
    hash.update("\0");
    files++;
  }
  return { sha256: hash.digest("hex"), files, bytes };
}

// ─── index build / verify ────────────────────────────────────────────────────────

/**
 * Build the pack index entry for one pack from a populated `node_modules` dir.
 * Records resolved versions + deterministic checksums so installs and `verify`
 * can prove integrity without network access.
 *
 * @param {{name: string, packVersion: number, description?: string, packages: {name: string}[]}} pack
 * @param {string} nodeModulesDir tree containing the pack members
 * @returns {Promise<{name: string, packVersion: number, description: string, tarball: string, packages: object[]}>}
 */
export async function buildPackIndexEntry(pack, nodeModulesDir) {
  const packages = [];
  for (const pkg of pack.packages) {
    const pkgDir = path.join(nodeModulesDir, ...pkg.name.split("/"));
    if (!fs.existsSync(path.join(pkgDir, "package.json"))) {
      throw new Error(`pack member missing from staging tree: ${pkg.name}`);
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
    const checksum = await dirChecksum(pkgDir);
    packages.push({
      name: pkg.name,
      version: manifest.version ?? null,
      sha256: checksum.sha256,
      files: checksum.files,
      bytes: checksum.bytes,
    });
  }
  return {
    name: pack.name,
    packVersion: pack.packVersion,
    description: pack.description,
    tarball: `optional-pack-${pack.name}.tar.gz`,
    packages,
  };
}

/**
 * Verify a directory tree against an index entry (every member checksum).
 *
 * @returns {Promise<{ok: true} | {ok: false, errors: string[]}>}
 */
export async function verifyAgainstIndexEntry(entry, nodeModulesDir) {
  const errors = [];
  for (const pkg of entry.packages) {
    const pkgDir = path.join(nodeModulesDir, ...pkg.name.split("/"));
    if (!fs.existsSync(pkgDir)) {
      errors.push(`${pkg.name}: missing`);
      continue;
    }
    const checksum = await dirChecksum(pkgDir);
    if (checksum.sha256 !== pkg.sha256) {
      errors.push(
        `${pkg.name}: checksum mismatch (expected ${pkg.sha256.slice(0, 12)}, got ${checksum.sha256.slice(0, 12)})`
      );
    }
  }
  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
