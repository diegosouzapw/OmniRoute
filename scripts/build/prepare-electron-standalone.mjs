#!/usr/bin/env node

import { cpSync, existsSync, lstatSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { assembleStandalone } from "./assembleStandalone.mjs";
import { buildRebuildSpawnPlan } from "./electronRebuildPlan.mjs";

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

// --- Electron-UNIQUE: rebuild better-sqlite3 against the Electron ABI --------
//
// The `npm ci` at the repo root compiles better-sqlite3 for the CI *Node* ABI
// (e.g. 137 for Node 24). The packaged app runs its Next.js server via
// ELECTRON_RUN_AS_NODE, so it needs the *Electron* ABI (146 for electron 42,
// 148 for electron 43). We cannot rely on electron-builder's @electron/rebuild
// here: it searches `electron/node_modules` (where better-sqlite3 does not live)
// and, with the default prebuild path, tries to fetch a prebuilt binary — but
// better-sqlite3@12.11.1 only ships prebuilds up to electron-v146, so electron
// 43 (v148) silently gets no rebuild and the app dies with "Nenhum driver
// SQLite disponível — better-sqlite3 (falhou)".
//
// Instead we copy the *full* module (source + binding.gyp) from the root into
// the standalone and compile it from source against the Electron headers, so
// `bindings` finds a correct build/Release/better_sqlite3.node regardless of
// prebuild availability. Robust to any current/future electron version.

function readElectronVersion() {
  const pkg = JSON.parse(readFileSync(join(ROOT, "electron", "package.json"), "utf8"));
  const raw = pkg.devDependencies?.electron || pkg.dependencies?.electron || "";
  return String(raw).replace(/^[\^~]/, "");
}

function rebuildBetterSqlite3ForElectron(standaloneNodeModules) {
  const srcMod = join(ROOT, "node_modules", "better-sqlite3");
  if (!existsSync(srcMod)) {
    console.warn("[electron] better-sqlite3 not found at repo root — skipping ABI rebuild.");
    return;
  }
  const electronVersion = readElectronVersion();
  if (!electronVersion) {
    throw new Error("[electron] could not resolve electron version for better-sqlite3 rebuild.");
  }
  const destMod = join(standaloneNodeModules, "better-sqlite3");
  // copyNatives only copies build/; we need the full module (src + binding.gyp)
  // to compile from source. Overwrite the copied Node-ABI build in the process.
  cpSync(srcMod, destMod, { recursive: true, force: true });
  rmSync(join(destMod, "build"), { recursive: true, force: true });

  console.log(`[electron] rebuilding better-sqlite3 against electron ${electronVersion} ABI…`);
  const plan = buildRebuildSpawnPlan(process.platform);
  const result = spawnSync(
    plan.command,
    plan.args,
    {
      cwd: destMod,
      stdio: "inherit",
      // .cmd shims must go through a shell on Windows (CVE-2024-27980 hardening
      // makes a shell-less spawn fail with status null); args are fixed literals.
      shell: plan.shell,
      // Compile against the Electron headers (not Node's) so the .node lands in
      // build/Release with the Electron NODE_MODULE_VERSION. No shell interpolation.
      env: {
        ...process.env,
        npm_config_runtime: "electron",
        npm_config_target: electronVersion,
        npm_config_disturl: "https://electronjs.org/headers",
        npm_config_arch: process.arch,
        npm_config_build_from_source: "true",
      },
    }
  );
  if (result.status !== 0) {
    throw new Error(
      `[electron] better-sqlite3 rebuild against electron ${electronVersion} failed (exit ${result.status}).`
    );
  }
  // Drop the now-unneeded compile inputs to keep the packaged app lean.
  for (const dir of ["deps", "src", "build/Debug", "build/obj.target"]) {
    rmSync(join(destMod, dir), { recursive: true, force: true });
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
  // Next can emit hashed external package names in instrumentation chunks.
  // The standalone dependency tree contains the canonical package names, so
  // normalize those imports before electron-builder copies the bundle.
  patchTurbopackChunks: true,
  copyNatives: true,
  // #6724/#6594: dereference Turbopack hashed-module symlinks — inside the packaged
  // app they would point at the build machine's absolute paths and break on install.
  materializeSymlinks: true,
});

// Electron-UNIQUE post-assembly steps
removeGeneratedElectronArtifacts();

// Rebuild better-sqlite3 from source against the Electron ABI in the primary
// node_modules (where the standalone server resolves it). keytar is still
// stripped so electron-builder's @electron/rebuild handles it (it has electron
// prebuilds); also drop any stray Node-ABI better-sqlite3 under .next/node_modules
// so it cannot shadow the rebuilt one.
rebuildBetterSqlite3ForElectron(join(ELECTRON_STANDALONE_DIR, "node_modules"));
removeNativeModules(join(ELECTRON_STANDALONE_DIR, "node_modules"), ["keytar"]);
removeNativeModules(join(ELECTRON_STANDALONE_DIR, ".next", "node_modules"), [
  "better-sqlite3",
  "keytar",
]);

console.log(
  `[electron] prepared standalone bundle: ${relative(ROOT, ELECTRON_STANDALONE_DIR) || "."}`
);
