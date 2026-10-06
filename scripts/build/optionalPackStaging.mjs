#!/usr/bin/env node

/**
 * OmniRoute — Stage 7 build-time optional-pack staging (issue #10321).
 *
 * Runs ONLY against the Electron staging tree (`.build/electron-standalone`),
 * after `assembleStandalone()` and the native-module steps. For each optional
 * pack in OPTIONAL_PACKS it:
 *
 *  1. checksums every member from the staged `node_modules` closure and emits
 *     `optional-packs.index.json` at the bundle root (one source of truth for
 *     the CLI installer and `verify`),
 *  2. MOVES the member trees out of the staging bundle into
 *     `.build/optional-packs/<name>/node_modules/…` (same volume → cheap rename),
 *  3. emits `optional-pack-<name>.tar.gz` next to them (bsdtar; disable with
 *     `OMNIROUTE_OPTIONAL_PACK_TAR=0`) for the desktop release workflow to
 *     upload as versioned assets.
 *
 * The shared Next standalone bundle (Docker / non-Electron deploys) is never
 * touched — only the Electron staging copy, mirroring the Stage 5 doc pruner's
 * boundary. Fail-open: members missing from staging are skipped with a warning
 * (a future bundle graph change must not break packaging), but the index only
 * records packs whose members were actually staged.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  OPTIONAL_PACKS,
  PACK_INDEX_FILENAME,
  buildPackIndexEntry,
} from "../packs/optionalPackManifest.mjs";

/**
 * Locate every `node_modules/<member>` copy inside the staging tree (bounded:
 * the standalone bundle only nests node_modules under the root and under
 * `.build/next/`, but a defensive two-level walk costs nothing on ~1k dirs).
 *
 * @param {string} stagingRoot
 * @param {string} member package name (scoped names keep their slash)
 * @returns {string[]} absolute member dir paths found
 */
export function findMemberDirs(stagingRoot, member) {
  const rel = member.split("/").join(path.sep);
  const found = [];
  const visit = (dir, depth) => {
    if (depth > 3) return;
    const candidate = path.join(dir, "node_modules", rel);
    if (fs.existsSync(candidate)) found.push(candidate);
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === "node_modules") continue;
      if (entry.name.startsWith(".") || entry.name === "dist") continue;
      visit(path.join(dir, entry.name), depth + 1);
    }
  };
  visit(stagingRoot, 0);
  return found;
}

/** @returns {{removedFiles: number, removedBytes: number}} */
function moveTree(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    fs.renameSync(src, dest);
  } catch {
    fs.cpSync(src, dest, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
  }
  let files = 0;
  let bytes = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else {
        files++;
        bytes += fs.statSync(full).size;
      }
    }
  };
  walk(dest);
  return { removedFiles: files, removedBytes: bytes };
}

export function tarPack(packOutDir, tarballPath) {
  // bsdtar ships with macOS, Linux images, and Windows runners (System32\tar.exe).
  // GNU tar (common in Git-for-Windows environments) treats `C:\...` in `-f` as a
  // remote rsh target ("Cannot connect to C:"), so always pass a bare filename
  // and point cwd at the tarball directory instead.
  const result = spawnSync(
    process.platform === "win32" ? "tar.exe" : "tar",
    ["-czf", path.basename(tarballPath), "-C", packOutDir, "node_modules"],
    { stdio: "pipe", cwd: path.dirname(tarballPath) }
  );
  if (result.status !== 0) {
    throw new Error(
      `optional-pack tar failed for ${path.basename(tarballPath)} (exit ${result.status})` +
        `: ${(result.stderr || result.stdout || "").toString().slice(-600)}`
    );
  }
}

/**
 * Stage all optional packs out of the Electron bundle.
 *
 * @param {{stagingRoot: string, packsOutDir: string, emitTarballs?: boolean, log?: (msg: string) => void}} opts
 * @returns {{index: object, packs: {name: string, removedFiles: number, removedBytes: number, tarball?: string}[]}}
 */
export async function stageOptionalPacks({
  stagingRoot,
  packsOutDir,
  emitTarballs = process.env.OMNIROUTE_OPTIONAL_PACK_TAR !== "0",
  log = () => {},
}) {
  const packsOut = [];
  const indexPacks = [];

  for (const pack of OPTIONAL_PACKS) {
    const packOutDir = path.join(packsOutDir, pack.name);
    let removedFiles = 0;
    let removedBytes = 0;
    let stagedMembers = 0;

    for (const member of pack.packages) {
      const memberDirs = findMemberDirs(stagingRoot, member.name);
      if (memberDirs.length === 0) {
        // Fail-open: a member absent from the bundle (dependency-graph change,
        // pruning by an earlier stage) must not break packaging. It is simply
        // not part of the staged pack; `buildPackIndexEntry` below refuses to
        // index a pack with missing members, so such a pack is skipped wholly.
        log(`[optional-packs] member not found in staging tree (skipped): ${member.name}`);
        continue;
      }
      const dest = path.join(packOutDir, "node_modules", ...member.name.split("/"));
      const stats = moveTree(memberDirs[0], dest);
      // Any duplicate copies (nested `.build/next/node_modules`) are deleted:
      // they would ship member bytes inside the installer again.
      for (const extra of memberDirs.slice(1)) {
        fs.rmSync(extra, { recursive: true, force: true });
      }
      removedFiles += stats.removedFiles;
      removedBytes += stats.removedBytes;
      stagedMembers++;
    }

    if (stagedMembers !== pack.packages.length) {
      log(
        `[optional-packs] pack "${pack.name}" incomplete (${stagedMembers}/${pack.packages.length}) — not indexed`
      );
      continue;
    }

    const indexEntry = await buildPackIndexEntry(pack, path.join(packOutDir, "node_modules"));
    indexPacks.push(indexEntry);

    let tarball;
    if (emitTarballs) {
      tarball = path.join(packsOutDir, indexEntry.tarball);
      tarPack(packOutDir, tarball);
    }
    packsOut.push({ name: pack.name, removedFiles, removedBytes, tarball });
    log(
      `[optional-packs] staged "${pack.name}": ${removedFiles} files, ${(removedBytes / 1024 / 1024).toFixed(1)} MB out of the desktop bundle`
    );
  }

  const index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    packs: indexPacks,
  };
  fs.writeFileSync(
    path.join(stagingRoot, PACK_INDEX_FILENAME),
    `${JSON.stringify(index, null, 2)}\n`
  );
  log(`[optional-packs] wrote ${PACK_INDEX_FILENAME} (${indexPacks.length} pack(s))`);
  return { index, packs: packsOut };
}
