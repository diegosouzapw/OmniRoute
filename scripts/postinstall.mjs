#!/usr/bin/env node

/**
 * OmniRoute — Postinstall Native Module Rebuild
 *
 * The npm package ships with a Next.js standalone build that includes
 * better-sqlite3 compiled for the build platform (Linux x64).
 * This script detects platform mismatches and rebuilds the native
 * module for the user's actual OS/architecture.
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/129
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// The standalone build bundles better-sqlite3 inside app/node_modules
const appNodeModules = join(ROOT, "app", "node_modules", "better-sqlite3");

if (!existsSync(appNodeModules)) {
  // No bundled better-sqlite3 — nothing to do (dev install, not npm global)
  process.exit(0);
}

const buildInfoPath = join(appNodeModules, "build", "Release", "better_sqlite3.node");

// Quick check: try to load the native module
try {
  // Use a dynamic import-like approach — try to dlopen the .node file
  process.dlopen({ exports: {} }, buildInfoPath);
  // If it loaded, the binary is compatible — nothing to do
  process.exit(0);
} catch {
  // Binary is incompatible — rebuild
}

console.log(`\n  🔧 Rebuilding better-sqlite3 for ${process.platform}-${process.arch}...`);

try {
  execSync("npm rebuild better-sqlite3", {
    cwd: join(ROOT, "app"),
    stdio: "inherit",
    timeout: 120_000,
  });
  console.log("  ✅ Native module rebuilt successfully!\n");
} catch (error) {
  console.warn("  ⚠️  Failed to rebuild better-sqlite3 automatically.");
  console.warn("     You can fix this manually by running:");
  console.warn(`     cd ${join(ROOT, "app")} && npm rebuild better-sqlite3\n`);
  // Don't fail the install — the user can fix manually
}
