#!/usr/bin/env node
/**
 * CLI entry for the shared Next standalone web build (issue #10321, Stage 8).
 *
 * One ubuntu `web-build` job runs `pack` once; every desktop matrix leg runs
 * `restore` (byte-verified against the manifest) and `hydrate` (replaces
 * install-machine-forked native optionals with this leg's own `npm ci` forks,
 * then asserts the bundled natives can service the leg's platform/arch).
 *
 * Rollback: set repo variable ELECTRON_SHARED_STANDALONE=disabled and the
 * workflow falls back to the legacy per-leg `npm run build` — no revert needed.
 */

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  buildStandaloneManifest,
  verifyStandaloneManifest,
  MANIFEST_VERSION,
} from "./standaloneManifest.mjs";
import { createTarGz, extractTarGz } from "./standaloneTarball.mjs";
import { hydratePlatformNatives, verifyBundledNatives } from "./hydrateNativeDeps.mjs";

function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function manifestPathFor(archive) {
  return `${archive}.manifest.json`;
}

/**
 * Pack a web-build tree into a deterministic archive plus a byte-level
 * manifest (which embeds the archive's own sha256 so transfer corruption is
 * caught before extraction).
 *
 * @param {{dir?: string, out: string, manifest?: string}} opts
 * @returns {Promise<{archive: string, manifest: string, files: number, archiveBytes: number}>}
 */
export async function runPack({ dir = ".build/next", out, manifest }) {
  if (!out) throw new Error("pack requires --out <file.tar.gz>");
  const rootDir = path.resolve(dir);
  if (!fs.existsSync(rootDir)) {
    throw new Error(`web build tree not found: ${rootDir} (did 'npm run build' run?)`);
  }
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

  const built = await buildStandaloneManifest(rootDir);
  await createTarGz(rootDir, out);
  const archiveBytes = fs.statSync(out).size;
  const archiveSha = await sha256File(out);

  const manifestFile = manifest ?? manifestPathFor(out);
  const payload = {
    version: MANIFEST_VERSION,
    archive: { name: path.basename(out), bytes: archiveBytes, sha256: archiveSha },
    entries: built.entries,
  };
  fs.writeFileSync(manifestFile, `${JSON.stringify(payload, null, 2)}\n`);
  return { archive: out, manifest: manifestFile, files: built.entries.length, archiveBytes };
}

/**
 * Verify + extract a packed archive into `dir`, then prove the restored tree
 * matches the manifest byte-for-byte.
 *
 * @param {{archive: string, manifest?: string, dir?: string}} opts
 * @returns {Promise<{archive: string, dir: string, files: number}>}
 */
export async function runRestore({ archive, manifest, dir = ".build/next" }) {
  if (!archive) throw new Error("restore requires --archive <file.tar.gz>");
  const manifestFile = manifest ?? manifestPathFor(archive);
  const raw = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  if (raw.version !== MANIFEST_VERSION) {
    throw new Error(`unsupported manifest version: ${raw.version}`);
  }

  const archiveBytes = fs.statSync(archive).size;
  if (archiveBytes !== raw.archive.bytes) {
    throw new Error(`archive size ${archiveBytes} != manifest ${raw.archive.bytes}`);
  }
  const archiveSha = await sha256File(archive);
  if (archiveSha !== raw.archive.sha256) {
    throw new Error(`archive sha256 mismatch (expected ${raw.archive.sha256.slice(0, 12)})`);
  }

  const destDir = path.resolve(dir);
  fs.rmSync(destDir, { recursive: true, force: true });
  await extractTarGz(archive, destDir);

  const verdict = await verifyStandaloneManifest(destDir, raw);
  if (!verdict.ok) {
    throw new Error(
      `restored tree failed manifest verification:\n  ${verdict.errors.join("\n  ")}`
    );
  }
  return { archive, dir: destDir, files: raw.entries.length };
}

/**
 * Hydrate the restored tree's node_modules with this machine's forked
 * optionals and assert bundled natives cover every requested arch.
 *
 * @param {{standaloneNodeModules?: string, sourceNodeModules?: string, platform: string, arch: string}} opts
 *   `arch` accepts a comma-separated list (the linux leg ships x64+arm64).
 * @returns {Promise<{replaced: string[], removed: string[], copied: string[], verified: string[]}>}
 */
export async function runHydrate({
  standaloneNodeModules = ".build/next/standalone/node_modules",
  sourceNodeModules = "node_modules",
  platform,
  arch,
}) {
  if (!platform || !arch) throw new Error("hydrate requires --platform <os> --arch <a[,a2...]>");
  const result = hydratePlatformNatives({
    standaloneNodeModules: path.resolve(standaloneNodeModules),
    sourceNodeModules: path.resolve(sourceNodeModules),
  });
  const verified = [];
  for (const one of arch
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)) {
    const verdict = verifyBundledNatives({
      nodeModulesDir: path.resolve(standaloneNodeModules),
      platform,
      arch: one,
    });
    if (!verdict.ok) {
      throw new Error(
        `bundled natives cannot service ${platform}/${one}:\n  ${verdict.errors.join("\n  ")}`
      );
    }
    verified.push(one);
  }
  return { ...result, verified };
}

// ─── argv plumbing ───────────────────────────────────────────────────────────────

/** Minimal `--key value` parser (booleans: `--key` alone → true). */
export function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      opts._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      opts[key] = next;
      i++;
    } else {
      opts[key] = true;
    }
  }
  return opts;
}

function usage() {
  return [
    "usage:",
    "  standaloneBundle.mjs pack    --out <file.tar.gz> [--dir .build/next] [--manifest <file.json>]",
    "  standaloneBundle.mjs restore --archive <file.tar.gz> [--manifest <file.json>] [--dir .build/next]",
    "  standaloneBundle.mjs hydrate --platform <os> --arch <a[,a2...]>",
    "                          [--standalone-node-modules <dir>] [--source-node-modules <dir>]",
  ].join("\n");
}

async function main(argv) {
  const [command = "", ...rest] = argv;
  const opts = parseArgs(rest);
  try {
    if (command === "pack") {
      const r = await runPack({ dir: opts.dir, out: opts.out, manifest: opts.manifest });
      console.log(
        `[standalone-bundle] packed ${r.files} entries -> ${r.archive} ` +
          `(${(r.archiveBytes / 1e6).toFixed(1)} MB); manifest ${r.manifest}`
      );
    } else if (command === "restore") {
      const r = await runRestore({ archive: opts.archive, manifest: opts.manifest, dir: opts.dir });
      console.log(
        `[standalone-bundle] restored ${r.files} entries from ${path.basename(r.archive)} -> ${r.dir}`
      );
    } else if (command === "hydrate") {
      const r = await runHydrate({
        standaloneNodeModules: opts["standalone-node-modules"],
        sourceNodeModules: opts["source-node-modules"],
        platform: opts.platform,
        arch: opts.arch,
      });
      console.log(
        `[standalone-bundle] hydrated forks: copied=${r.copied.length} replaced=${r.replaced.length} ` +
          `removed=${r.removed.length}; bundled natives verified for ${r.verified.join("+")}`
      );
    } else {
      console.error(usage());
      process.exitCode = 2;
    }
  } catch (err) {
    console.error(`[standalone-bundle] ${command || "(no command)"} failed: ${err.message}`);
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href
) {
  await main(process.argv.slice(2));
}
