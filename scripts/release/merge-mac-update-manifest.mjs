#!/usr/bin/env node
// Merge the per-architecture `latest-mac.yml` manifests into one that serves BOTH Macs.
//
// THE BUG THIS FIXES IS LIVE IN v3.8.48: an Intel Mac downloads the ARM dmg.
//
// electron-builder runs once per macOS job (macos-intel, macos-arm64) and each run emits its
// own `latest-mac.yml` listing only its own dmg — 338 and 350 bytes, different content, same
// filename. `actions/download-artifact` with `merge-multiple: true` resolves that name
// collision by ARRIVAL ORDER, so one silently overwrites the other. In the published v3.8.48
// manifest the arm64 build won.
//
// Why that breaks Intel, from electron-updater's own selection code
// (electron-updater/out/providers/Provider.js):
//
//     const result = filteredFiles.find(it =>
//       [it.url.pathname, it.info.url].some(n => n.includes(process.arch))
//     ) ?? filteredFiles.shift();
//
// The Intel dmg is named `OmniRoute-X.Y.Z.dmg` — no arch suffix. On an Intel Mac
// `process.arch` is `"x64"`, no file URL contains "x64", the find misses, and the fallback
// takes the FIRST entry. With an arm64-only manifest that is the ARM dmg.
//
// So ORDER IS THE FIX, not merely tidiness: the entry without an arch suffix must come first,
// because it is the one that can only ever be reached by that fallback. arm64 is found by
// substring wherever it sits.
//
// Usage:
//   node scripts/release/merge-mac-update-manifest.mjs <dir-with-per-artifact-subdirs> <out-dir>
// Exit: 0 on success or when there is nothing to merge (a release with no mac build), 1 when
// the inputs are present but unusable — a wrong manifest is worse than none.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Parse the tiny subset of YAML electron-builder emits. No dependency, no surprises. */
export function parseManifest(text) {
  const src = String(text ?? "");
  const out = { version: "", files: [], path: "", sha512: "", releaseDate: "" };
  const top = /^(version|path|sha512|releaseDate):\s*'?([^'\n]*)'?\s*$/gm;
  for (const m of src.matchAll(top)) out[m[1]] = m[2].trim();

  // files: entries are `  - url: X` followed by indented `sha512:` / `size:` / `blockMapSize:`.
  const fileBlocks = src.split(/^\s*-\s+url:\s*/m).slice(1);
  for (const block of fileBlocks) {
    const url = block.split("\n")[0].trim();
    if (!url) continue;
    const grab = (k) => {
      const m = new RegExp(`^\\s+${k}:\\s*(.+)$`, "m").exec(block);
      return m ? m[1].trim() : "";
    };
    const entry = { url, sha512: grab("sha512"), size: grab("size") };
    const bms = grab("blockMapSize");
    if (bms) entry.blockMapSize = bms;
    out.files.push(entry);
  }
  return out;
}

/** True when the URL carries an explicit architecture electron-updater can match on. */
export function hasArchSuffix(url) {
  return /-(arm64|x64|universal)\./.test(String(url ?? ""));
}

/**
 * Merge parsed manifests into one, ordered so electron-updater resolves every arch.
 *
 * Entries WITHOUT an arch suffix come first, because the un-suffixed build is only ever
 * reachable through electron-updater's `?? shift()` fallback. Suffixed entries are found by
 * substring regardless of position. Duplicate URLs are collapsed, keeping the first.
 */
export function mergeManifests(manifests) {
  const usable = (manifests ?? []).filter((m) => m && Array.isArray(m.files) && m.files.length);
  if (usable.length === 0) return null;

  const seen = new Set();
  const files = [];
  for (const m of usable) {
    for (const f of m.files) {
      if (!f.url || seen.has(f.url)) continue;
      seen.add(f.url);
      files.push(f);
    }
  }
  // Stable partition: un-suffixed first, order otherwise preserved.
  files.sort((a, b) => Number(hasArchSuffix(a.url)) - Number(hasArchSuffix(b.url)));

  const primary = files[0];
  const versions = [...new Set(usable.map((m) => m.version).filter(Boolean))];
  return {
    version: versions[0] ?? "",
    versionConflict: versions.length > 1 ? versions : null,
    files,
    // The legacy top-level fields older clients read must agree with the first entry.
    path: primary.url,
    sha512: primary.sha512,
    releaseDate: usable.map((m) => m.releaseDate).filter(Boolean).sort().pop() ?? "",
  };
}

export function renderManifest(merged) {
  const lines = [`version: ${merged.version}`, "files:"];
  for (const f of merged.files) {
    lines.push(`  - url: ${f.url}`);
    lines.push(`    sha512: ${f.sha512}`);
    lines.push(`    size: ${f.size}`);
    if (f.blockMapSize) lines.push(`    blockMapSize: ${f.blockMapSize}`);
  }
  lines.push(`path: ${merged.path}`);
  lines.push(`sha512: ${merged.sha512}`);
  lines.push(`releaseDate: '${merged.releaseDate}'`);
  return lines.join("\n") + "\n";
}

function main(argv) {
  const [inDir, outDir] = argv;
  if (!inDir || !outDir) {
    process.stderr.write("usage: merge-mac-update-manifest.mjs <in-dir> <out-dir>\n");
    return 1;
  }
  if (!fs.existsSync(inDir)) {
    process.stdout.write(`[merge-mac-manifest] ${inDir} does not exist — nothing to merge.\n`);
    return 0;
  }

  // Every latest-mac.yml under the per-artifact subdirectories.
  const found = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "latest-mac.yml") found.push(p);
    }
  };
  walk(inDir);

  if (found.length === 0) {
    process.stdout.write("[merge-mac-manifest] no latest-mac.yml found — nothing to merge.\n");
    return 0;
  }

  const parsed = found.map((p) => parseManifest(fs.readFileSync(p, "utf8")));
  const merged = mergeManifests(parsed);
  if (!merged) {
    process.stderr.write(
      `[merge-mac-manifest] found ${found.length} manifest(s) but none listed any file — ` +
        `refusing to write a manifest that would send every Mac to nothing.\n`
    );
    return 1;
  }
  if (merged.versionConflict) {
    process.stderr.write(
      `[merge-mac-manifest] the manifests disagree on version (${merged.versionConflict.join(", ")}) ` +
        `— that means artifacts from two different builds are mixed. Refusing.\n`
    );
    return 1;
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "latest-mac.yml"), renderManifest(merged));
  process.stdout.write(
    `[merge-mac-manifest] merged ${found.length} manifest(s) → ${merged.files.length} file(s), ` +
      `first entry ${merged.path} (the arch electron-updater reaches by fallback).\n`
  );
  return 0;
}

if (
  process.argv[1] &&
  fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))
) {
  process.exit(main(process.argv.slice(2)));
}
