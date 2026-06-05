#!/usr/bin/env node

/**
 * write-build-sha.mjs — HEAD sentinel guard for OmniRoute release builds.
 *
 * Writes OMNIROUTE_BUILD_SHA (or git rev-parse --short HEAD) into:
 *   - dist/BUILD_SHA
 *   - .build/next/standalone/BUILD_SHA  (present after `npm run build`)
 *
 * Exits 1 if the standalone directory does not exist, which guards against
 * stale-cache shipping where a previous build artifact is accidentally published
 * without a fresh `next build`.
 *
 * Usage: node scripts/build/write-build-sha.mjs
 * Called by: npm run build:release (after npm run build)
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// Resolve the build SHA: prefer the env var (set by build:release script), fall
// back to running git rev-parse.
function resolveBuildSha() {
  if (process.env.OMNIROUTE_BUILD_SHA) {
    return process.env.OMNIROUTE_BUILD_SHA.trim();
  }
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
  } catch (err) {
    console.error("[write-build-sha] Could not determine build SHA:", err.message);
    process.exit(1);
  }
}

const sha = resolveBuildSha();
const NEXT_DIST = process.env.NEXT_DIST_DIR || ".build/next";
const standaloneDir = path.join(ROOT, NEXT_DIST, "standalone");
const distDir = path.join(ROOT, "dist");

// Guard: standalone must exist (ensures build:release runs after npm run build)
if (!fs.existsSync(standaloneDir)) {
  console.error(
    `[write-build-sha] FATAL: standalone dir not found: ${standaloneDir}\n` +
      `  Run \`npm run build\` before \`npm run build:release\`.`
  );
  process.exit(1);
}

// Write sentinel to the standalone dir (Docker/dev path)
const standaloneSentinel = path.join(standaloneDir, "BUILD_SHA");
fs.writeFileSync(standaloneSentinel, sha + "\n");
console.log(`[write-build-sha] Written ${sha} -> ${path.relative(ROOT, standaloneSentinel)}`);

// Write sentinel to dist/ (npm publish path) if it exists
if (fs.existsSync(distDir)) {
  const distSentinel = path.join(distDir, "BUILD_SHA");
  fs.writeFileSync(distSentinel, sha + "\n");
  console.log(`[write-build-sha] Written ${sha} -> ${path.relative(ROOT, distSentinel)}`);
}

console.log(`[write-build-sha] Build SHA: ${sha}`);
