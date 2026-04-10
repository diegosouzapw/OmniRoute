#!/usr/bin/env node

/**
 * OmniRoute — Postinstall Native Module Fix
 *
 * The npm package ships with a Next.js standalone build that includes
 * better-sqlite3 compiled for the build platform (Linux x64) inside
 * app/node_modules/. However, npm also installs better-sqlite3 as a
 * top-level dependency (in the root node_modules/), correctly compiled
 * for the user's platform.
 *
 * This script copies the correctly-built native binary from the root
 * into the standalone app directory — no rebuild or build tools needed.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/129
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/321
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/426
 */

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PUBLISHED_BUILD_ARCH, PUBLISHED_BUILD_PLATFORM } from "./native-binary-compat.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const appBinary = join(
  ROOT,
  "app",
  "node_modules",
  "better-sqlite3",
  "build",
  "Release",
  "better_sqlite3.node"
);
const rootBinary = join(
  ROOT,
  "node_modules",
  "better-sqlite3",
  "build",
  "Release",
  "better_sqlite3.node"
);

async function fixBetterSqliteBinary() {
  if (!existsSync(join(ROOT, "app", "node_modules", "better-sqlite3"))) {
    return;
  }

  const platformMatch =
    process.platform === PUBLISHED_BUILD_PLATFORM && process.arch === PUBLISHED_BUILD_ARCH;

  if (platformMatch) {
    try {
      process.dlopen({ exports: {} }, appBinary);
      return;
    } catch (err) {
      console.warn(`  ⚠️  Bundled binary incompatible despite platform match: ${err.message}`);
    }
  }

  console.log(`\n  🔧 Fixing better-sqlite3 binary for ${process.platform}-${process.arch}...`);

  if (existsSync(rootBinary)) {
    try {
      mkdirSync(dirname(appBinary), { recursive: true });
      copyFileSync(rootBinary, appBinary);
    } catch (err) {
      console.warn(`  ⚠️  Failed to copy binary: ${err.message}`);
    }

    try {
      process.dlopen({ exports: {} }, appBinary);
      console.log("  ✅ Native module fixed successfully!\n");
      return;
    } catch (err) {
      console.warn(`  ⚠️  Copied binary failed to load: ${err.message}`);
    }
  }

  console.log("  📥  Attempting to download prebuilt binary via node-pre-gyp...");
  try {
    const { execSync } = await import("node:child_process");
    const preGypBin = join(
      ROOT,
      "app",
      "node_modules",
      ".bin",
      process.platform === "win32" ? "node-pre-gyp.cmd" : "node-pre-gyp"
    );
    const preGypFallback = join(
      ROOT,
      "app",
      "node_modules",
      "@mapbox",
      "node-pre-gyp",
      "bin",
      "node-pre-gyp"
    );
    const preGypCmd = existsSync(preGypBin) ? preGypBin : preGypFallback;

    if (existsSync(preGypCmd)) {
      execSync(`"${process.execPath}" "${preGypCmd}" install --fallback-to-build=false`, {
        cwd: join(ROOT, "app", "node_modules", "better-sqlite3"),
        stdio: "inherit",
        timeout: 60_000,
      });
      mkdirSync(dirname(appBinary), { recursive: true });

      try {
        process.dlopen({ exports: {} }, appBinary);
        console.log("  ✅ Prebuilt binary downloaded and loaded successfully!\n");
        return;
      } catch (loadErr) {
        console.warn(`  ⚠️  Downloaded binary failed to load: ${loadErr.message}`);
      }
    } else {
      console.warn("  ⚠️  node-pre-gyp not found, skipping prebuilt download.");
    }
  } catch (err) {
    console.warn(`  ⚠️  node-pre-gyp download failed: ${err.message.split("\n")[0]}`);
  }

  console.log("  ⚠️  Attempting npm rebuild (requires build tools)...");

  try {
    const { execSync } = await import("node:child_process");

    // On Android/Termux, rebuild from source with --build-from-source flag
    const isAndroid = process.platform === "android";
    const rebuildCmd = isAndroid
      ? "npm install better-sqlite3 --build-from-source --force"
      : "npm rebuild better-sqlite3";

    execSync(rebuildCmd, {
      cwd: join(ROOT, "app"),
      stdio: "inherit",
      timeout: 300_000, // 5 minutes for source builds
    });

    process.dlopen({ exports: {} }, appBinary);
    console.log("  ✅ Native module rebuilt successfully!\n");
    return;
  } catch (err) {
    const isTimeout = err.killed || err.signal === "SIGTERM";
    if (isTimeout) {
      console.warn("  ⚠️  npm rebuild timed out after 300s.");
    } else {
      console.warn(`  ⚠️  npm rebuild failed: ${err.message}`);
    }
  }

  console.warn("\n  ⚠️  Could not fix better-sqlite3 native module automatically.");
  console.warn("     The server may not start correctly.");
  console.warn("     Manual fix options:");
  if (process.platform === "win32") {
    console.warn("     Option A (easiest — no build tools needed):");
    console.warn(`       cd "${join(ROOT, "app", "node_modules", "better-sqlite3")}"`);
    console.warn("       npx @mapbox/node-pre-gyp install --fallback-to-build=false");
    console.warn("     Option B (requires Build Tools for Visual Studio):");
    console.warn(`       cd "${join(ROOT, "app")}" && npm rebuild better-sqlite3`);
    console.warn("       Install from: https://visualstudio.microsoft.com/visual-cpp-build-tools/");
    console.warn("       Also ensure Python is installed: https://python.org");
  } else if (process.platform === "darwin") {
    console.warn(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3`);
    console.warn("     If build tools are missing: xcode-select --install");
  } else {
    console.warn(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3`);
  }
  console.warn("");
}

async function ensureSwcHelpers() {
  const swcHelpersApp = join(ROOT, "app", "node_modules", "@swc", "helpers");
  const swcHelpersRoot = join(ROOT, "node_modules", "@swc", "helpers");

  if (existsSync(swcHelpersApp)) {
    return;
  }

  if (existsSync(swcHelpersRoot)) {
    try {
      const { cpSync } = await import("node:fs");
      mkdirSync(join(ROOT, "app", "node_modules", "@swc"), { recursive: true });
      cpSync(swcHelpersRoot, swcHelpersApp, { recursive: true });
      console.log("  ✅ @swc/helpers copied to standalone app/node_modules.\n");
    } catch (err) {
      console.warn(`  ⚠️  Could not copy @swc/helpers: ${err.message}`);
      console.warn(
        "     Try manually: cp -r node_modules/@swc/helpers app/node_modules/@swc/helpers\n"
      );
    }
    return;
  }

  console.warn("  ⚠️  @swc/helpers not found in root node_modules either.");
  console.warn("     Try: npm install --save-exact @swc/helpers@0.5.19\n");
}

async function syncProjectEnv() {
  try {
    const { syncEnv } = await import("./sync-env.mjs");
    syncEnv({ rootDir: ROOT });
  } catch (err) {
    console.warn(`  ⚠️  .env sync skipped: ${err.message}`);
  }
}

await fixBetterSqliteBinary();
await ensureSwcHelpers();
await syncProjectEnv();
