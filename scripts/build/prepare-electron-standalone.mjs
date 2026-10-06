#!/usr/bin/env node

import { existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { assembleStandalone } from "./assembleStandalone.mjs";
import { assertSqlitePrebuildExists } from "./electronRebuildPlan.mjs";
import { pruneElectronRuntimeDocs } from "./electronRuntimeDocs.mjs";
import { stageOptionalPacks } from "./optionalPackStaging.mjs";
import { runBuildTool } from "./buildToolRunner.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..");

const NEXT_DIST_DIR = process.env.NEXT_DIST_DIR || ".build/next";
const DIST_DIR = join(ROOT, NEXT_DIST_DIR);
const STANDALONE_DIR = join(DIST_DIR, "standalone");
const ELECTRON_STANDALONE_DIR = join(ROOT, ".build", "electron-standalone");

// --- Electron-UNIQUE: resolve the nested server.js location ----------------

function resolveStandaloneBundleDir() {
  const directServer = join(STANDALONE_DIR, "server.js");
  if (existsSync(directServer)) {
    return STANDALONE_DIR;
  }

  const nestedCandidates = [
    join(STANDALONE_DIR, "projects", "OmniRoute"),
    join(STANDALONE_DIR, basename(ROOT)),
  ];

  for (const candidate of nestedCandidates) {
    if (existsSync(join(candidate, "server.js"))) {
      return candidate;
    }
  }

  throw new Error(
    `Standalone server bundle not found in ${STANDALONE_DIR}. Run \`npm run build\` first.`
  );
}

// --- Electron-UNIQUE: symlink guard (electron-builder fails on symlinked node_modules) ---

function assertBundleIsPackagable(bundleDir) {
  const nodeModulesPath = join(bundleDir, "node_modules");
  if (!existsSync(nodeModulesPath)) return;

  if (lstatSync(nodeModulesPath).isSymbolicLink()) {
    throw new Error(
      [
        "Next standalone emitted app/node_modules as a symlink.",
        "electron-builder preserves extraResources symlinks, which would make the packaged app",
        "depend on the original build machine path at runtime.",
        "",
        `Offending path: ${nodeModulesPath}`,
        "Use a real node_modules directory in the build worktree before packaging Electron.",
      ].join("\n")
    );
  }
}

// --- Electron-UNIQUE: strip generated electron artifacts from staged dir ---

function removeGeneratedElectronArtifacts() {
  const generatedDirs = [join(ELECTRON_STANDALONE_DIR, "electron", "dist-electron")];

  for (const dir of generatedDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
}

// --- Electron-UNIQUE: remove native modules for electron-builder ABI rebuild ---

function removeNativeModules(baseDir, prefixes = ["keytar"]) {
  if (!existsSync(baseDir)) return;
  const dirs = readdirSync(baseDir);
  for (const dir of dirs) {
    if (prefixes.some((p) => dir.startsWith(p))) {
      const fullPath = join(baseDir, dir);
      rmSync(fullPath, { recursive: true, force: true });
    }
  }
}

// Fail the build if hashed native copies survived the cleanup above. Without this,
// a wrong baseDir makes removeNativeModules() a silent no-op (it early-returns when
// the directory does not exist) and the ABI mismatch only surfaces at runtime on a
// user machine as "Internal Server Error" on every route.
function assertNoStaleHashedNatives(baseDir, prefixes) {
  if (!existsSync(baseDir)) return;
  const leftovers = readdirSync(baseDir).filter((dir) => prefixes.some((p) => dir.startsWith(p)));
  if (leftovers.length > 0) {
    throw new Error(
      `[electron] stale native module copies survived cleanup in ${baseDir}: ` +
        `${leftovers.join(", ")}. These carry the plain-Node ABI and shadow the ` +
        `Electron-rebuilt binaries at runtime (ERR_DLOPEN_FAILED -> sql.js fallback -> OOM).`
    );
  }
}

// --- Electron-UNIQUE: verify better-sqlite3 Node-API prebuilds ----------------
//
// better-sqlite3 >= 13 ships Node-API (NAPI_VERSION=10) prebuilds for every
// platform we package (darwin/linux/linuxmusl/win32 × x64/arm64) inside the
// npm tarball. Node-API addons are ABI-independent, so the same prebuild runs
// under plain Node (CI, CLI) and under the packaged app's ELECTRON_RUN_AS_NODE
// server (verified against electron 43 / NODE_MODULE_VERSION 148 — issue
// #10321 Stage 6). The historical source rebuild below existed because
// better-sqlite3@12 only shipped prebuilds up to electron-v146 and electron 43
// (v148) silently got no binary; v13 makes that obsolete.
//
// Instead of compiling from source on every build (tens of seconds to minutes
// per platform), we fail fast when the prebuild for the CURRENT build platform
// is missing — a missing prebuild must kill the build here, not the app on a
// user machine with "Nenhum driver SQLite disponível — better-sqlite3 (falhou)".

function verifyBetterSqlite3Prebuilds(standaloneNodeModules) {
  const destMod = join(standaloneNodeModules, "better-sqlite3");
  if (!existsSync(destMod)) {
    console.warn("[electron] better-sqlite3 not found in standalone — skipping prebuild check.");
    return;
  }

  // Fail fast when the loader would find no prebuild for THIS build platform.
  // Mirrors better-sqlite3's own lib/binding.js selection logic.
  const reportHeader = process.report?.getReport?.().header;
  assertSqlitePrebuildExists(destMod, process.platform, process.arch, reportHeader);

  // Drop compile inputs and stale Node-ABI build outputs to keep the packaged
  // app lean and to guarantee the loader resolves the prebuild, not a leftover
  // build/Release/better_sqlite3.node compiled for a different ABI.
  for (const dir of ["build", "deps", "src"]) {
    rmSync(join(destMod, dir), { recursive: true, force: true });
  }
  console.log(
    `[electron] better-sqlite3 Node-API prebuilds verified for ${process.platform}-${process.arch}.`
  );
}

function logContextualError(error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[electron] failed to prepare standalone bundle: ${message}`);
  process.exitCode = 1;
}

process.on("uncaughtException", logContextualError);

// Resolve the bundle dir (handles nested project layout) and check for symlinks
const bundleDir = resolveStandaloneBundleDir();
assertBundleIsPackagable(bundleDir);

// Clean the stage dir before assembly
rmSync(ELECTRON_STANDALONE_DIR, { recursive: true, force: true });

// Shared assembly: standalone copy + .next/static + public + abs-path sanitization + natives/@swc/helpers
assembleStandalone({
  distDir: DIST_DIR,
  outDir: ELECTRON_STANDALONE_DIR,
  projectRoot: ROOT,
  sanitizePaths: true,
  // Next can emit hashed external package names in instrumentation chunks.
  // The standalone dependency tree contains the canonical package names, so
  // normalize those imports before electron-builder copies the bundle.
  patchTurbopackChunks: true,
  copyNatives: true,
  // #6724/#6594: dereference Turbopack hashed-module symlinks — inside the packaged
  // app they would point at the build machine's absolute paths and break on install.
  materializeSymlinks: true,
});
const compressionWorkerDest = join(
  ELECTRON_STANDALONE_DIR,
  "open-sse",
  "services",
  "compression",
  "compressionWorker.js"
);
mkdirSync(dirname(compressionWorkerDest), { recursive: true });
runBuildTool(
  "esbuild",
  "esbuild",
  [
    join(ROOT, "open-sse", "services", "compression", "compressionWorker.ts"),
    "--bundle",
    "--platform=node",
    "--packages=external",
    "--format=esm",
    `--outfile=${compressionWorkerDest}`,
  ],
  { stdio: "inherit" }
);

const docsPrune = pruneElectronRuntimeDocs(ELECTRON_STANDALONE_DIR);
if (docsPrune.removedFiles > 0) {
  console.log(
    `[electron] pruned ${docsPrune.removedFiles} authoring doc file(s) ` +
      `(${docsPrune.removedBytes} bytes) from the staging bundle`
  );
}

// Electron-UNIQUE post-assembly steps
removeGeneratedElectronArtifacts();

// Verify better-sqlite3 Node-API prebuilds in the primary node_modules (where
// the standalone server resolves it). keytar is still stripped so
// electron-builder's @electron/rebuild handles it (it has electron prebuilds);
// also drop any stray better-sqlite3 under .next/node_modules so it cannot
// shadow the prebuild-backed one.
verifyBetterSqlite3Prebuilds(join(ELECTRON_STANDALONE_DIR, "node_modules"));
removeNativeModules(join(ELECTRON_STANDALONE_DIR, "node_modules"), ["keytar"]);
removeNativeModules(join(ELECTRON_STANDALONE_DIR, NEXT_DIST_DIR, "node_modules"), [
  "better-sqlite3",
  "keytar",
]);

// Post-condition: the cleanup above must actually have removed the stale Node-ABI
// copies. It silently no-opped across releases because the path was hardcoded to
// ".next" while distDir is ".build/next", so an ABI-mismatched better_sqlite3.node
// shipped inside the installer and the app fell back to sql.js and OOM-ed.
assertNoStaleHashedNatives(join(ELECTRON_STANDALONE_DIR, NEXT_DIST_DIR, "node_modules"), [
  "better-sqlite3",
  "keytar",
]);

// Stage 7 (issue #10321): move the optional ML/browser dependency closure out of
// the desktop bundle into checksummed, versioned packs under
// `.build/optional-packs/` (+ tarballs) and emit `optional-packs.index.json` at
// the bundle root. Runs after the native-module steps so it only ever sees the
// final staging tree. Fail-open per member (see optionalPackStaging.mjs).
const OPTIONAL_PACKS_OUT_DIR = join(ROOT, ".build", "optional-packs");
await stageOptionalPacks({
  stagingRoot: ELECTRON_STANDALONE_DIR,
  packsOutDir: OPTIONAL_PACKS_OUT_DIR,
  log: (msg) => console.log(msg.replace(/^\[optional-packs\]/, "[electron]")),
});

console.log(
  `[electron] prepared standalone bundle: ${relative(ROOT, ELECTRON_STANDALONE_DIR) || "."}`
);
