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
import {
  existsSync,
  mkdirSync,
  cpSync,
  rmSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
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

// ── Step 2.5: Remove app/ directory before build ───────────
// CRITICAL: The postinstall script may create app/node_modules/@swc/helpers/,
// which causes Next.js 16 to interpret app/ as an App Router directory
// (competing with src/app/). This makes the build silently skip all real
// routes, producing a standalone with only _global-error and _not-found.
// We MUST remove app/ before running `next build`.
if (existsSync(APP_DIR)) {
  console.log("  🧹 Removing app/ created by postinstall (App Router conflict fix)...");
  rmSync(APP_DIR, { recursive: true, force: true });
}

// ── Step 3: Build Next.js ──────────────────────────────────
console.log("  🏗️  Building Next.js (standalone)...");
execSync("npx next build", {
  cwd: ROOT,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PRIVATE_BUILD_WORKER: "0",
  },
});

// ── Step 4: Verify standalone output ───────────────────────
const standaloneDir = join(ROOT, ".next", "standalone");
const serverJs = join(standaloneDir, "server.js");

if (!existsSync(serverJs)) {
  console.error("\n  ❌ Standalone build not found at:", standaloneDir);
  console.error("     Make sure next.config.mjs has: output: 'standalone'");
  process.exit(1);
}

// ── Step 5: Copy standalone output to app/ ─────────────────
// ── Step 4.5: Check build for hashed external references ──────────────────────
// Warn if Turbopack-style hash suffixes are found — they will be resolved at
// runtime by the externals patch in next.config.mjs, but log for visibility.
{
  const HASH_RE = /require\(["']([\w@./-]+-[0-9a-f]{16})["']\)/;
  const scanDir = (dir, hits = []) => {
    let entries = [];
    try {
      entries = readdirSync(dir);
    } catch {
      return hits;
    }
    for (const e of entries) {
      const f = join(dir, e);
      try {
        if (statSync(f).isDirectory()) {
          scanDir(f, hits);
          continue;
        }
        if (!f.endsWith(".js")) continue;
        const m = readFileSync(f, "utf8").match(HASH_RE);
        if (m) hits.push({ file: f.replace(standaloneDir, "app"), mod: m[1] });
      } catch {
        continue;
      }
    }
    return hits;
  };
  const hits = scanDir(join(standaloneDir, ".next", "server"));
  if (hits.length > 0) {
    console.warn(
      "  ⚠️  Hashed externals in build (will be auto-fixed at runtime by externals patch):"
    );
    hits.slice(0, 5).forEach((h) => console.warn());
    if (hits.length > 5) console.warn();
  } else {
    console.log("  ✅ Build clean — no hashed externals found.");
  }
}

console.log("  📋 Copying standalone build to app/...");
mkdirSync(APP_DIR, { recursive: true });
cpSync(standaloneDir, APP_DIR, { recursive: true });

// ── Next.js Turbopack Standalone Tracer Fix ───────────────
// Workaround for Next.js 15+ standalone mode missing Turbopack chunks
const staticChunksSrc = join(ROOT, ".next", "server", "chunks");
const staticChunksDest = join(APP_DIR, ".next", "server", "chunks");
if (existsSync(staticChunksSrc)) {
  console.log("  📋 Patching standalone build with missing Turbopack chunks...");
  cpSync(staticChunksSrc, staticChunksDest, { recursive: true, force: false });
}

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

// ── Step 5.6: Strip Turbopack hashed externals from compiled chunks ─────────
// Even when Turbopack is disabled at build time, some instrumentation chunks
// may still emit require('package-<16hexchars>') instead of require('package').
// These hashed names don't exist in node_modules and cause MODULE_NOT_FOUND at
// runtime. We strip the hex suffix from all .js files in app/.next/server/
// to ensure all require() calls use the real package names.
{
  const serverOutput = join(APP_DIR, ".next", "server");
  const HASH_RE = /(['"\\])([a-z@][a-z0-9@./_-]+-[0-9a-f]{16})\1/g;
  let patchedFiles = 0;
  let patchedMatches = 0;
  const walkDir = (dir) => {
    let entries = [];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        const st = statSync(full);
        if (st.isDirectory()) {
          walkDir(full);
          continue;
        }
        if (!entry.endsWith(".js")) continue;
        const src = readFileSync(full, "utf8");
        let count = 0;
        const patched = src.replace(HASH_RE, (_, q, name) => {
          const base = name.replace(/-[0-9a-f]{16}$/, "");
          count++;
          return `${q}${base}${q}`;
        });
        if (count > 0) {
          writeFileSync(full, patched);
          patchedFiles++;
          patchedMatches += count;
        }
      } catch {
        /* skip unreadable files */
      }
    }
  };
  if (existsSync(serverOutput)) {
    walkDir(serverOutput);
    if (patchedMatches > 0) {
      console.log(
        `  🔧 Hash-strip: patched ${patchedMatches} hashed require() in ${patchedFiles} server chunk file(s)`
      );
    } else {
      console.log("  ✅ Hash-strip: no hashed externals found in compiled chunks.");
    }
  }
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

// ── Step 8: Compile + copy MITM cert utilities ─────────────
const mitmSrc = join(ROOT, "src", "mitm");
const mitmDest = join(APP_DIR, "src", "mitm");
if (existsSync(mitmSrc)) {
  console.log("  🔨 Compiling MITM utilities (TypeScript → JavaScript)...");
  mkdirSync(mitmDest, { recursive: true });

  // Write a temporary tsconfig.json targeting the mitm directory
  const mitmTsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      outDir: mitmDest,
      rootDir: mitmSrc,
      resolveJsonModule: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    include: [mitmSrc + "/**/*"],
  };
  const tmpTsconfigPath = join(ROOT, "tsconfig.mitm.tmp.json");
  writeFileSync(tmpTsconfigPath, JSON.stringify(mitmTsconfig, null, 2));

  try {
    execSync("npx tsc -p tsconfig.mitm.tmp.json", { cwd: ROOT, stdio: "inherit" });
    console.log("  ✅ MITM utilities compiled to app/src/mitm/");
  } catch (err) {
    console.warn("  ⚠️  MITM compile warning (non-fatal):", err.message);
    // Fallback: copy source files so at least they are present
    cpSync(mitmSrc, mitmDest, { recursive: true });
  } finally {
    // Cleanup temp tsconfig
    try {
      rmSync(tmpTsconfigPath);
    } catch {}
  }
}

// ── Step 8.5: Bundle MCP server ────────────────────────────
const mcpSrcFile = join(ROOT, "open-sse", "mcp-server", "server.ts");
const mcpDestDir = join(APP_DIR, "open-sse", "mcp-server");
const mcpDestFile = join(mcpDestDir, "server.js");

if (existsSync(mcpSrcFile)) {
  console.log("  🔨 Bundling MCP Server (TypeScript → JavaScript)...");
  mkdirSync(mcpDestDir, { recursive: true });
  try {
    execSync(
      `npx esbuild open-sse/mcp-server/server.ts --bundle --platform=node --packages=external --format=esm --outfile=app/open-sse/mcp-server/server.js`,
      { cwd: ROOT, stdio: "inherit" }
    );
    console.log("  ✅ MCP Server bundled to app/open-sse/mcp-server/server.js");
  } catch (err) {
    console.warn("  ⚠️  MCP Server bundle error:", err.message);
  }
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

// ── Step 10.5: Copy @swc/helpers into standalone ───────────
// Next.js standalone tracer sometimes omits @swc/helpers from app/node_modules/,
// causing MODULE_NOT_FOUND at runtime. Always copy it explicitly.
const swcHelpersSrc = join(ROOT, "node_modules", "@swc", "helpers");
const swcHelpersDst = join(APP_DIR, "node_modules", "@swc", "helpers");
if (existsSync(swcHelpersSrc) && !existsSync(swcHelpersDst)) {
  console.log("  📋 Copying @swc/helpers to standalone app/node_modules...");
  mkdirSync(join(APP_DIR, "node_modules", "@swc"), { recursive: true });
  cpSync(swcHelpersSrc, swcHelpersDst, { recursive: true });
  console.log("  ✅ @swc/helpers included in standalone build.");
}

// ── Step 10.6: Remove large binaries from standalone build ──
// These directories contain platform-native binaries (.node, .asar) that
// trigger Z_DATA_ERROR during npm pack. They are not needed in the npm package.
const binaryDirsToRemove = ["vscode-extension", "electron", "logs"];
for (const dir of binaryDirsToRemove) {
  const targetDir = join(APP_DIR, dir);
  if (existsSync(targetDir)) {
    console.log(`  🧹 Removing app/${dir}/ (not needed in npm package)...`);
    rmSync(targetDir, { recursive: true, force: true });
    console.log(`  ✅ app/${dir}/ removed.`);
  }
}

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
