#!/usr/bin/env node

/**
 * OmniRoute — Prepublish Build Script
 *
 * Builds the Next.js app in standalone mode and copies output
 * into the `app/` directory that gets published to npm.
 *
 * Run with: node scripts/prepublish.mjs
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const APP_DIR = join(ROOT, "app");

console.log("🔨 OmniRoute — Building for npm publish...\n");

// ── Step 1: Clean previous app/ directory ──────────────────
if (existsSync(APP_DIR)) {
  console.log("  🧹 Cleaning previous app/ directory...");
  rmSync(APP_DIR, { recursive: true, force: true });
}

// ── Step 2: Install dependencies ───────────────────────────
console.log("  📦 Installing dependencies...");
execSync("npm install", { cwd: ROOT, stdio: "inherit" });

// ── Step 3: Build Next.js ──────────────────────────────────
console.log("  🏗️  Building Next.js (standalone)...");
execSync("npx next build --webpack", { cwd: ROOT, stdio: "inherit" });

// ── Step 4: Verify standalone output ───────────────────────
const standaloneDir = join(ROOT, ".next", "standalone");
const serverJs = join(standaloneDir, "server.js");

if (!existsSync(serverJs)) {
  console.error("\n  ❌ Standalone build not found at:", standaloneDir);
  console.error("     Make sure next.config.mjs has: output: 'standalone'");
  process.exit(1);
}

// ── Step 5: Copy standalone output to app/ ─────────────────
console.log("  📋 Copying standalone build to app/...");
mkdirSync(APP_DIR, { recursive: true });
cpSync(standaloneDir, APP_DIR, { recursive: true });

// ── Step 5.5: Sanitize hardcoded build-machine paths ───────
// Next.js standalone bakes absolute build-time paths into server.js and
// required-server-files.json (outputFileTracingRoot, appDir, turbopack root).
// Replace the build machine's absolute path with "." (current directory)
// so paths resolve relative to wherever the standalone app/ is installed.
console.log("  🧹 Sanitizing build-machine paths...");
const buildRoot = ROOT.replace(/\\/g, "/"); // normalise for regex safety
const sanitizeTargets = [
  join(APP_DIR, "server.js"),
  join(APP_DIR, ".next", "required-server-files.json"),
];
let sanitisedCount = 0;
for (const filePath of sanitizeTargets) {
  if (!existsSync(filePath)) continue;
  let content = readFileSync(filePath, "utf8");
  // Escape special regex characters in the path
  const escaped = buildRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  const matches = content.match(re);
  if (matches) {
    // Replace with "." so Next.js resolves paths relative to the standalone dir
    content = content.replace(re, ".");
    writeFileSync(filePath, content);
    sanitisedCount += matches.length;
  }
}
if (sanitisedCount > 0) {
  console.log(`  ✅ Sanitised ${sanitisedCount} hardcoded path references`);
} else {
  console.log("  ℹ️  No hardcoded paths found to sanitise");
}

// ── Step 6: Copy static assets ─────────────────────────────
const staticSrc = join(ROOT, ".next", "static");
const staticDest = join(APP_DIR, ".next", "static");
if (existsSync(staticSrc)) {
  console.log("  📋 Copying static assets...");
  mkdirSync(staticDest, { recursive: true });
  cpSync(staticSrc, staticDest, { recursive: true });
}

// ── Step 7: Copy public/ assets ────────────────────────────
const publicSrc = join(ROOT, "public");
const publicDest = join(APP_DIR, "public");
if (existsSync(publicSrc)) {
  console.log("  📋 Copying public/ assets...");
  mkdirSync(publicDest, { recursive: true });
  cpSync(publicSrc, publicDest, { recursive: true });
}

// ── Step 8: Copy MITM cert utilities (if needed) ───────────
const mitmSrc = join(ROOT, "src", "mitm");
const mitmDest = join(APP_DIR, "src", "mitm");
if (existsSync(mitmSrc)) {
  console.log("  📋 Copying MITM utilities...");
  mkdirSync(mitmDest, { recursive: true });
  cpSync(mitmSrc, mitmDest, { recursive: true });
}

// ── Step 9: Copy shared utilities needed at runtime ────────
const sharedApiKey = join(ROOT, "src", "shared", "utils", "apiKey.js");
const sharedApiKeyDest = join(APP_DIR, "src", "shared", "utils");
if (existsSync(sharedApiKey)) {
  console.log("  📋 Copying shared utilities...");
  mkdirSync(sharedApiKeyDest, { recursive: true });
  cpSync(sharedApiKey, join(sharedApiKeyDest, "apiKey.js"));
}

// ── Step 10: Ensure data/ directory exists ──────────────────
mkdirSync(join(APP_DIR, "data"), { recursive: true });

// ── Done ───────────────────────────────────────────────────
const appPkg = join(APP_DIR, "package.json");
if (existsSync(appPkg)) {
  const pkg = JSON.parse(readFileSync(appPkg, "utf8"));
  console.log(`\n  ✅ Build complete!`);
  console.log(`     App directory: app/`);
  console.log(`     Server entry:  app/server.js`);
} else {
  console.log(`\n  ✅ Build complete! (app/ ready for publish)`);
}

console.log("");
