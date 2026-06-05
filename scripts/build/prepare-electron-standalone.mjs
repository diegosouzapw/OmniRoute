#!/usr/bin/env node

import { existsSync, lstatSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { assembleStandalone } from "./assembleStandalone.mjs";

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

function removeNativeModules(baseDir) {
  if (!existsSync(baseDir)) return;
  const dirs = readdirSync(baseDir);
  for (const dir of dirs) {
    if (dir.startsWith("better-sqlite3") || dir.startsWith("keytar")) {
      const fullPath = join(baseDir, dir);
      rmSync(fullPath, { recursive: true, force: true });
    }
  }
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
  copyNatives: true,
});

// Electron-UNIQUE post-assembly steps
removeGeneratedElectronArtifacts();

// Strip better-sqlite3 and keytar so electron-builder rebuilds them against Electron ABI
removeNativeModules(join(ELECTRON_STANDALONE_DIR, "node_modules"));
removeNativeModules(join(ELECTRON_STANDALONE_DIR, ".next", "node_modules"));

console.log(
  `[electron] prepared standalone bundle: ${relative(ROOT, ELECTRON_STANDALONE_DIR) || "."}`
);
