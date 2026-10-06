#!/usr/bin/env node

/**
 * OmniRoute — optional runtime pack installer (Stage 7, issue #10321).
 *
 * First-use installer used by `omniroute packs …` (bin/cli/commands/packs.mjs):
 * extracts a versioned pack tarball (or pre-extracted tree) from a source dir
 * into `${DATA_DIR}/packs/<name>` AFTER verifying every member checksum against
 * the bundle-shipped `optional-packs.index.json`. Atomic: staged into a temp
 * sibling dir and renamed into place only when verification passes, so a failed
 * install never leaves a half-pack that the runtime gate would misread as
 * installed.
 *
 * Pure Node (fs/path/child_process tar) — importable from tests, no CLI
 * framework coupling. Fail-closed on integrity, fail-open on absence.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  OPTIONAL_PACKS,
  PACK_INDEX_FILENAME,
  findPack,
  verifyAgainstIndexEntry,
} from "./optionalPackManifest.mjs";

const MAX_WALK_UP = 8;

/** Walk up from each start dir looking for the bundle-shipped pack index. */
export function findPackIndexFile(startDirs) {
  for (const start of startDirs) {
    if (!start) continue;
    let dir = path.resolve(start);
    for (let i = 0; i <= MAX_WALK_UP; i++) {
      const candidate = path.join(dir, PACK_INDEX_FILENAME);
      if (fs.existsSync(candidate)) return candidate;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

/** Parse + shape-check an index file. Throws on malformed JSON/schema. */
export function readPackIndex(indexFile) {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(indexFile, "utf8"));
  } catch (err) {
    throw new Error(
      `malformed pack index: ${indexFile} (${err instanceof Error ? err.message : String(err)})`
    );
  }
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.packs)) {
    throw new Error(`malformed pack index: ${indexFile}`);
  }
  return raw;
}

/** @returns {string} `${DATA_DIR||~/.omniroute}/packs` */
export function packsRoot(dataDir) {
  return path.join(
    dataDir || process.env.DATA_DIR || path.join(os.homedir(), ".omniroute"),
    "packs"
  );
}

function indexEntryFor(index, name) {
  return index.packs.find((entry) => entry.name === name) ?? null;
}

/**
 * Merged view of one pack: manifest definition + index entry + on-disk state.
 * `verified` is tri-state: null = not installed, true/false = verify result.
 */
export async function packState(name, { dataDir, index }) {
  const pack = findPack(name);
  if (!pack) throw new Error(`unknown pack: ${name}`);
  const entry = index ? indexEntryFor(index, name) : null;
  const installDir = path.join(packsRoot(dataDir), name);
  const nodeModulesDir = path.join(installDir, "node_modules");
  const installed = fs.existsSync(nodeModulesDir);
  let verified = null;
  let errors = null;
  if (installed && entry) {
    const result = await verifyAgainstIndexEntry(entry, nodeModulesDir);
    verified = result.ok;
    errors = result.ok ? null : result.errors;
  }
  return {
    name,
    description: pack.description,
    packVersion: entry?.packVersion ?? pack.packVersion,
    indexed: entry !== null,
    installed,
    verified,
    errors,
    members: entry ? entry.packages.map((p) => p.name) : pack.packages.map((p) => p.name),
  };
}

/** Merged view of every pack, manifest order. */
export async function listPackStates({ dataDir, index }) {
  return Promise.all(OPTIONAL_PACKS.map((pack) => packState(pack.name, { dataDir, index })));
}

/**
 * Resolve the payload for a pack from a source dir. Accepted layouts:
 *  - `<source>/optional-pack-<name>.tar.gz` (release asset / staging output)
 *  - `<source>/optional-pack-<name>/node_modules/…` (pre-extracted staging tree)
 *  - `<source>/<name>/node_modules/…` (bare pack name)
 *
 * @returns {{kind: "tarball"|"dir", nodeModulesDir: string}} payload whose
 *   contents must equal `<pack>/node_modules`; tarballs are extracted into
 *   `stagingDir` by the caller (installPack).
 */
export function resolvePackSource(name, sourceDir, stagingDir) {
  const tarball = path.join(sourceDir, `optional-pack-${name}.tar.gz`);
  if (fs.existsSync(tarball)) {
    return { kind: "tarball", tarball, stagingDir };
  }
  for (const layout of [
    path.join(sourceDir, `optional-pack-${name}`, "node_modules"),
    path.join(sourceDir, name, "node_modules"),
  ]) {
    if (fs.existsSync(layout)) return { kind: "dir", nodeModulesDir: layout };
  }
  throw new Error(
    `no payload for pack "${name}" under ${sourceDir} (expected optional-pack-${name}.tar.gz or an extracted pack dir)`
  );
}

function extractTarball(tarball, stagingDir) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });
  const result = spawnSync(
    process.platform === "win32" ? "tar.exe" : "tar",
    ["-xzf", tarball, "-C", stagingDir],
    { stdio: "pipe" }
  );
  if (result.status !== 0) {
    throw new Error(`failed to extract ${path.basename(tarball)} (exit ${result.status})`);
  }
  const nodeModulesDir = path.join(stagingDir, "node_modules");
  if (!fs.existsSync(nodeModulesDir)) {
    throw new Error(`tarball ${path.basename(tarball)} did not contain a node_modules/ root`);
  }
  return nodeModulesDir;
}

/**
 * Install a pack: extract → verify against the index → atomic rename into
 * `${DATA_DIR}/packs/<name>`. Replaces any previous install.
 *
 * @returns {object} the verified index entry
 */
export async function installPack(name, { dataDir, index, sourceDir, log = () => {} }) {
  const entry = indexEntryFor(index ?? {}, name);
  if (!entry) throw new Error(`pack "${name}" is not in the pack index`);
  const root = packsRoot(dataDir);
  const installDir = path.join(root, name);
  const stagingDir = path.join(root, `.staging-${name}-${process.pid}`);
  const finalNodeModules = path.join(installDir, "node_modules");

  const source = resolvePackSource(name, sourceDir, stagingDir);
  let payloadNodeModules;
  if (source.kind === "tarball") {
    payloadNodeModules = extractTarball(source.tarball, stagingDir);
  } else {
    payloadNodeModules = source.nodeModulesDir;
  }

  const result = await verifyAgainstIndexEntry(entry, payloadNodeModules);
  if (!result.ok) {
    if (source.kind === "tarball") fs.rmSync(stagingDir, { recursive: true, force: true });
    throw new Error(
      `pack "${name}" payload failed verification:\n  - ${result.errors.join("\n  - ")}`
    );
  }

  fs.rmSync(installDir, { recursive: true, force: true });
  fs.mkdirSync(installDir, { recursive: true });
  if (source.kind === "tarball") {
    // The staged tree already holds the verified payload — just move it in.
    fs.renameSync(payloadNodeModules, finalNodeModules);
    fs.rmSync(stagingDir, { recursive: true, force: true });
  } else {
    fs.cpSync(payloadNodeModules, finalNodeModules, { recursive: true });
  }
  log(`[optional-packs] installed "${name}" (packVersion ${entry.packVersion}) into ${installDir}`);
  return entry;
}

/** Remove an installed pack (no-op when absent). */
export function removePack(name, { dataDir, log = () => {} }) {
  const installDir = path.join(packsRoot(dataDir), name);
  if (!fs.existsSync(installDir)) return false;
  fs.rmSync(installDir, { recursive: true, force: true });
  log(`[optional-packs] removed "${name}"`);
  return true;
}
