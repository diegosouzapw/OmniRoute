#!/usr/bin/env node

/**
 * OmniRoute — Postinstall Native Module Fix
 *
 * The npm package ships with a Next.js standalone build that includes
 * native modules compiled for the build platform (Linux x64) inside
 * dist/node_modules/. However, npm also installs these as top-level
 * dependencies (in the root node_modules/), correctly compiled for
 * the user's platform.
 *
 * This script copies the correctly-built native binaries from the root
 * into the standalone dist directory — no rebuild or build tools needed.
 *
 * Modules repaired:
 *   - better-sqlite3 (SQLite bindings)
 *   - wreq-js (TLS client for OAuth and web-cookie providers)
 *   - sql.js (WASM SQLite fallback runtime)
 *   - node-machine-id (local CLI machine-token server runtime)
 *
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/129
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/321
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/426
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/1634
 * Fixes: https://github.com/diegosouzapw/OmniRoute/issues/7802
 */

import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PUBLISHED_BUILD_ARCH, PUBLISHED_BUILD_PLATFORM } from "./native-binary-compat.mjs";
import { hasStandaloneAppBundle, isTermux } from "./postinstallSupport.mjs";
import { colocateLlmlinguaOptionals } from "./colocateOptionals.mjs";
import { fixPlaywrightAndroid } from "./fixPlaywrightAndroid.mjs";
import { resolveWreqJsNativeBinding, WREQ_JS_VERSION } from "./wreqJsNative.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..");
const requireFromPackage = createRequire(join(ROOT, "package.json"));

/**
 * Patch node-gyp's common.gypi to include the android_ndk_path variable.
 *
 * On Termux/Android, node-gyp's bundled common.gypi (in ~/.cache/node-gyp/<version>/)
 * does not define the `android_ndk_path` variable that the build system expects.
 * Setting GYP_DEFINES="android_ndk_path=''" is not enough because common.gypi
 * is parsed separately and the variable must be declared in the 'variables' section.
 *
 * This function finds and patches the common.gypi for the current Node.js version,
 * adding `'android_ndk_path%': ''` to the variables block. The patch is idempotent.
 */
function patchNodeGypCommonGypi() {
  try {
    const nodeVersion = process.version; // e.g. "v26.4.0"
    const gypDir = join(
      process.env.HOME || process.env.USERPROFILE || "/root",
      ".cache",
      "node-gyp",
      nodeVersion.replace(/^v/, "")
    );
    const commonGypi = join(gypDir, "include", "node", "common.gypi");

    if (!existsSync(commonGypi)) {
      console.warn(`  ⚠️  common.gypi not found at ${commonGypi}, skipping patch`);
      return;
    }

    let content = readFileSync(commonGypi, "utf8");

    // Check if already patched
    if (content.includes("android_ndk_path")) {
      return;
    }

    // Find the variables section and add android_ndk_path
    // The pattern is: 'variables': { 'node_use_openssl%': ... }
    // We insert our variable right after the opening of the variables block
    const variablesMatch = content.match(/('variables'\s*:\s*\{)/);
    if (variablesMatch) {
      const insertPos = content.indexOf(variablesMatch[0]) + variablesMatch[0].length;
      content =
        content.slice(0, insertPos) + "\n      'android_ndk_path%': ''," + content.slice(insertPos);
      writeFileSync(commonGypi, content, "utf8");
      console.log(`  ✅ Patched common.gypi for Android at ${commonGypi}`);
    }
  } catch (err) {
    console.warn(`  ⚠️  Could not patch common.gypi: ${err.message}`);
  }
}

const appBinary = join(
  ROOT,
  "dist",
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
  if (!existsSync(join(ROOT, "dist", "node_modules", "better-sqlite3"))) {
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
      "dist",
      "node_modules",
      ".bin",
      process.platform === "win32" ? "node-pre-gyp.cmd" : "node-pre-gyp"
    );
    const preGypFallback = join(
      ROOT,
      "dist",
      "node_modules",
      "@mapbox",
      "node-pre-gyp",
      "bin",
      "node-pre-gyp"
    );
    const preGypCmd = existsSync(preGypBin) ? preGypBin : preGypFallback;

    if (existsSync(preGypCmd)) {
      execSync(`"${process.execPath}" "${preGypCmd}" install --fallback-to-build=false`, {
        cwd: join(ROOT, "dist", "node_modules", "better-sqlite3"),
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

  // Declared OUTSIDE the try: the catch below reads `isAndroid` to pick the
  // timeout it reports. While it was `const` inside the try block, the timeout
  // branch threw `ReferenceError: isAndroid is not defined`, which escaped the
  // catch, rejected the top-level await in this module and failed the whole
  // `npm install` — instead of printing the manual-fix hints a few lines down.
  // On Android/Termux we rebuild from source with --build-from-source.
  const isAndroid = process.platform === "android" || isTermux();

  try {
    const { execSync } = await import("node:child_process");

    const rebuildCmd = isAndroid
      ? "npm install better-sqlite3 --build-from-source --force"
      : "npm rebuild better-sqlite3";

    const env = { ...process.env };
    if (isAndroid) {
      env.GYP_DEFINES = "android_ndk_path=''";
      // Patch node-gyp's common.gypi to include android_ndk_path variable
      // so the gyp build system doesn't fail with "Unknown variable"
      patchNodeGypCommonGypi();
    }

    execSync(rebuildCmd, {
      cwd: join(ROOT, "dist"),
      stdio: "inherit",
      timeout: isAndroid ? 600_000 : 300_000, // ARM compilation is slower
      env,
    });

    process.dlopen({ exports: {} }, appBinary);
    console.log("  ✅ Native module rebuilt successfully!\n");
    return;
  } catch (err) {
    const isTimeout = err.killed || err.signal === "SIGTERM";
    if (isTimeout) {
      const secs = isAndroid ? 600 : 300;
      console.warn(`  ⚠️  npm rebuild timed out after ${secs}s.`);
    } else {
      console.warn(`  ⚠️  npm rebuild failed: ${err.message}`);
    }
  }

  console.warn("\n  ⚠️  Could not fix better-sqlite3 native module automatically.");
  console.warn("     The server may not start correctly.");
  console.warn("     Manual fix options:");
  if (process.platform === "win32") {
    console.warn("     Option A (easiest — no build tools needed):");
    console.warn(`       cd "${join(ROOT, "dist", "node_modules", "better-sqlite3")}"`);
    console.warn("       npx @mapbox/node-pre-gyp install --fallback-to-build=false");
    console.warn("     Option B (requires Build Tools for Visual Studio):");
    console.warn(`       cd "${join(ROOT, "dist")}" && npm rebuild better-sqlite3`);
    console.warn("       Install from: https://visualstudio.microsoft.com/visual-cpp-build-tools/");
    console.warn("       Also ensure Python is installed: https://python.org");
  } else if (process.platform === "darwin") {
    console.warn(`     cd ${join(ROOT, "dist")} && npm rebuild better-sqlite3`);
    console.warn("     If build tools are missing: xcode-select --install");
  } else {
    console.warn(`     cd ${join(ROOT, "dist")} && npm rebuild better-sqlite3`);
  }
  console.warn("");
}

/** Copy the current wreq-js 3.2 optional binding into the standalone dist tree. */
async function fixWreqJsBinary() {
  if (!existsSync(join(ROOT, "dist", "node_modules", "wreq-js"))) {
    return;
  }

  const runtimePlatform = isTermux() ? "android" : process.platform;
  const binding = resolveWreqJsNativeBinding({
    platform: runtimePlatform,
    arch: process.arch,
  });
  if (!binding) {
    console.warn(
      `  ⚠️  wreq-js ${WREQ_JS_VERSION} has no native binding for ` +
        `${runtimePlatform}-${process.arch}.`
    );
    return;
  }

  const packageSegments = binding.packageName.split("/");
  const rootBindingDir = join(ROOT, "node_modules", ...packageSegments);
  const appBindingDir = join(ROOT, "dist", "node_modules", ...packageSegments);
  const rootBinaryPath = join(rootBindingDir, binding.fileName);
  const appBinaryPath = join(appBindingDir, binding.fileName);

  if (existsSync(appBinaryPath)) {
    try {
      process.dlopen({ exports: {} }, appBinaryPath);
      return;
    } catch (err) {
      console.warn(`  ⚠️  wreq-js binary exists but failed to load: ${err.message}`);
    }
  }

  console.log(`\n  🔧 Fixing ${binding.packageName} for ${runtimePlatform}-${process.arch}...`);

  if (existsSync(rootBindingDir) && existsSync(rootBinaryPath)) {
    try {
      mkdirSync(dirname(appBindingDir), { recursive: true });
      cpSync(rootBindingDir, appBindingDir, { recursive: true, force: true });
      process.dlopen({ exports: {} }, appBinaryPath);
      console.log(`  ✅ ${binding.packageName} copied to standalone successfully!\n`);
      return;
    } catch (err) {
      console.warn(`  ⚠️  Copied ${binding.packageName} failed to load: ${err.message}`);
    }
  }

  console.warn(
    `\n  ⚠️  Could not install ${binding.packageName}@${WREQ_JS_VERSION} for ` +
      `${runtimePlatform}-${process.arch}.`
  );
  console.warn("     Browser-TLS OAuth and web-cookie providers may not work.");
  console.warn(`     Manual fix: npm install --include=optional wreq-js@${WREQ_JS_VERSION}\n`);
}

async function ensureSwcHelpers() {
  if (!hasStandaloneAppBundle(ROOT)) {
    return;
  }

  const swcHelpersApp = join(ROOT, "dist", "node_modules", "@swc", "helpers");
  const swcHelpersRoot = join(ROOT, "node_modules", "@swc", "helpers");

  if (existsSync(swcHelpersApp)) {
    return;
  }

  if (existsSync(swcHelpersRoot)) {
    try {
      const { cpSync } = await import("node:fs");
      mkdirSync(join(ROOT, "dist", "node_modules", "@swc"), { recursive: true });
      cpSync(swcHelpersRoot, swcHelpersApp, { recursive: true });
      console.log("  ✅ @swc/helpers copied to standalone dist/node_modules.\n");
    } catch (err) {
      console.warn(`  ⚠️  Could not copy @swc/helpers: ${err.message}`);
      console.warn(
        "     Try manually: cp -r node_modules/@swc/helpers dist/node_modules/@swc/helpers\n"
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

/**
 * Co-locate the LLMLingua-2 SLM optional dependency closure into dist/node_modules so the
 * compression "ultra" SLM tier (PR #4257) resolves a single @huggingface/transformers instance at
 * runtime. No-op unless the optionals were installed (`--include=optional`). See colocateOptionals.mjs.
 */
async function ensureLlmlinguaOptionals() {
  try {
    colocateLlmlinguaOptionals({ rootDir: ROOT, log: (m) => console.log(m) });
  } catch (err) {
    // Best-effort: the SLM tier is itself fail-open, so a co-location hiccup never fails the install.
    console.warn(`  ⚠️  LLMLingua optional co-location skipped: ${err.message}`);
  }
}

/**
 * Preflight check for development installs (when standalone dist/ bundle is not present).
 * Warns or errors if critical native dependencies like better-sqlite3 were skipped by npm >= 11
 * allowScripts restrictions.
 */
async function verifyDevNativeModules() {
  if (hasStandaloneAppBundle(ROOT)) {
    return;
  }

  const criticalModules = [
    { name: "better-sqlite3", fatal: true },
    { name: "esbuild", fatal: true },
  ];

  for (const { name, fatal } of criticalModules) {
    if (!existsSync(join(ROOT, "node_modules", name))) {
      const level = fatal ? "🔴 CRITICAL" : "⚠️  WARNING";
      console.error(`\n  ${level}: '${name}' is missing from node_modules/`);
      console.error(`     This usually happens with npm ≥ 11, which blocks install`);
      console.error(`     scripts for optional dependencies by default.`);
      console.error(`\n     Fix options:`);
      console.error(`       1. npm approve-scripts ${name} && npm install`);
      console.error(`       2. npm pack ${name} && tar -xzf ${name}-*.tgz -C node_modules`);
      console.error(`          && mv node_modules/package node_modules/${name}`);
      console.error(`       3. Downgrade to npm 10: npm install -g npm@10\n`);
    }
  }
}

async function ensureStandaloneRuntimePackages() {
  for (const packageName of ["sql.js", "node-machine-id"]) {
    let source;
    try {
      source = dirname(dirname(requireFromPackage.resolve(packageName)));
    } catch {
      console.warn(`  ⚠️  ${packageName} could not be resolved from the npm install.`);
      continue;
    }
    const destination = join(ROOT, "dist", "node_modules", packageName);
    try {
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(source, destination, { recursive: true, force: true });
      console.log(`  ✅ ${packageName} copied to standalone dist/node_modules.`);
    } catch (err) {
      console.warn(`  ⚠️  Could not copy ${packageName}: ${err.message}`);
    }
  }
}

await verifyDevNativeModules();
await fixBetterSqliteBinary();
await fixWreqJsBinary();
await fixPlaywrightAndroid({ rootDir: ROOT });
await ensureSwcHelpers();
await ensureStandaloneRuntimePackages();
await ensureLlmlinguaOptionals();
await syncProjectEnv();

// Warm up native runtimes (better-sqlite3 in ~/.omniroute/runtime/).
// Non-fatal: errors are caught inside postinstall.mjs.
try {
  await import("../postinstall.mjs");
} catch {
  // Silently skip — runtime warm-up is best-effort.
}
