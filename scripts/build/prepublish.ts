#!/usr/bin/env node

/**
 * OmniRoute — Prepublish Build Script
 *
 * Consumes the .build/next/standalone artifact produced by `npm run build`
 * (build-next-isolated.mjs) and assembles the npm staging `dist/` directory.
 * Does NOT run a second `next build` — the caller must run `npm run build` first,
 * or this script will invoke it exactly once if the artifact is absent.
 *
 * Run with: node scripts/build/prepublish.ts
 */

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  cpSync,
  rmSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
  chmodSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { assembleStandalone } from "./assembleStandalone.mjs";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  APP_STAGING_ALLOWED_PATH_PREFIXES,
  APP_STAGING_REMOVAL_PATHS,
  findUnexpectedArtifactPaths,
} from "./pack-artifact-policy.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..");
const NPX_BIN = process.platform === "win32" ? "npx.cmd" : "npx";

const DIST_DIR = join(ROOT, "dist");

function walkFiles(dir: string, rootDir: string = dir, files: string[] = []): string[] {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      walkFiles(fullPath, rootDir, files);
      continue;
    }

    files.push(
      fullPath
        .replace(rootDir, "")
        .replace(/^[/\\]/, "")
        .replace(/\\/g, "/")
    );
  }

  return files;
}

function removeEmptyDirectories(dir: string): boolean {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return false;
  }

  let hasFiles = false;
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      const childHasFiles = removeEmptyDirectories(fullPath);
      if (!childHasFiles) {
        rmSync(fullPath, { recursive: true, force: true });
      } else {
        hasFiles = true;
      }
      continue;
    }

    hasFiles = true;
  }

  return hasFiles;
}

console.log("🔨 OmniRoute — Building for npm publish...\n");

// ── Step 1: Clean previous dist/ directory ─────────────────
if (existsSync(DIST_DIR)) {
  console.log("  🧹 Cleaning previous dist/ directory...");
  rmSync(DIST_DIR, { recursive: true, force: true });
}

// ── Step 2: Assert / trigger the Next.js standalone build ──
// prepublish no longer runs its own `next build`.  It consumes the
// .build/next/standalone artifact produced by `npm run build` (build-next-isolated.mjs).
// If the artifact is absent we invoke it exactly once.
const NEXT_DIST = process.env.NEXT_DIST_DIR || ".build/next";
const standaloneServerJs = join(ROOT, NEXT_DIST, "standalone", "server.js");
if (!existsSync(standaloneServerJs)) {
  console.log("  🏗️  .build/next/standalone not found — running `npm run build` once...");
  execFileSync(process.execPath, ["scripts/build/build-next-isolated.mjs"], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (!existsSync(standaloneServerJs)) {
    console.error(
      "\n  ❌ Standalone build not found after `npm run build` at:",
      standaloneServerJs
    );
    console.error("     Make sure next.config.mjs has: output: 'standalone'");
    process.exit(1);
  }
}
console.log("  ✅ Standalone artifact present:", standaloneServerJs);

// ── Step 3–7: Assemble standalone into dist/ ───────────────
// All shared copy/sync/sanitize/chunk-patch operations are delegated to
// assembleStandalone.  npm-UNIQUE steps (MITM, MCP, CLI, sidecars) follow.
console.log("  📋 Assembling standalone bundle into dist/...");
assembleStandalone({
  distDir: join(ROOT, NEXT_DIST),
  outDir: DIST_DIR,
  projectRoot: ROOT,
  sanitizePaths: true,
  patchTurbopackChunks: true,
  copyNatives: true,
});
console.log("  ✅ Standalone bundle assembled to dist/");

// ── Step 8: Compile + copy MITM cert utilities ─────────────
const mitmSrc = join(ROOT, "src", "mitm");
const mitmDest = join(DIST_DIR, "src", "mitm");
if (existsSync(mitmSrc)) {
  console.log("  🔨 Compiling MITM utilities (TypeScript → JavaScript)...");
  mkdirSync(mitmDest, { recursive: true });

  // Write a temporary tsconfig.json targeting the mitm directory
  const mitmTsconfig = {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      outDir: mitmDest,
      rootDir: mitmSrc,
      strict: false,
      noImplicitAny: false,
      strictNullChecks: false,
      noEmitOnError: true,
      allowImportingTsExtensions: true,
      rewriteRelativeImportExtensions: true,
      ignoreDeprecations: "6.0",
      resolveJsonModule: true,
      esModuleInterop: true,
      skipLibCheck: true,
      types: ["node"],
      baseUrl: ".",
      paths: {
        "@/*": ["src/*"],
      },
    },
    include: [mitmSrc + "/**/*"],
  };
  const tmpTsconfigPath = join(ROOT, "tsconfig.mitm.tmp.json");
  writeFileSync(tmpTsconfigPath, JSON.stringify(mitmTsconfig, null, 2));

  try {
    execFileSync(NPX_BIN, ["tsc", "-p", "tsconfig.mitm.tmp.json"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    const mitmServerSrc = join(mitmSrc, "server.cjs");
    if (existsSync(mitmServerSrc)) {
      cpSync(mitmServerSrc, join(mitmDest, "server.cjs"));
    }
    console.log("  ✅ MITM utilities compiled to dist/src/mitm/");
  } catch (err: any) {
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
const mcpDestDir = join(DIST_DIR, "open-sse", "mcp-server");
const mcpDestFile = join(mcpDestDir, "server.js");

if (existsSync(mcpSrcFile)) {
  console.log("  🔨 Bundling MCP Server (TypeScript → JavaScript)...");
  mkdirSync(mcpDestDir, { recursive: true });
  try {
    execFileSync(
      NPX_BIN,
      [
        "esbuild",
        "open-sse/mcp-server/server.ts",
        "--bundle",
        "--platform=node",
        "--packages=external",
        "--format=esm",
        "--outfile=dist/open-sse/mcp-server/server.js",
      ],
      { cwd: ROOT, stdio: "inherit" }
    );
    console.log("  ✅ MCP Server bundled to dist/open-sse/mcp-server/server.js");
  } catch (err: any) {
    console.warn("  ⚠️  MCP Server bundle error:", err.message);
  }
}

// ── Step 8.6: Bundle LLMLingua ONNX worker ────────────────────────────
// The worker is spawned via worker_threads at a path the Next.js bundler cannot
// statically trace, so it must ship as a standalone .js (mirrors the MCP-server
// bundling above). Heavy deps (@atjsh/llmlingua-2 / @huggingface/transformers /
// @tensorflow/tfjs / js-tiktoken) stay EXTERNAL — they are optionalDependencies,
// dynamically imported at runtime, and the worker fail-opens if any is absent.
const llmWorkerSrc = join(
  ROOT,
  "open-sse",
  "services",
  "compression",
  "engines",
  "llmlingua",
  "onnxWorker.ts"
);
const llmWorkerDestDir = join(
  DIST_DIR,
  "open-sse",
  "services",
  "compression",
  "engines",
  "llmlingua"
);
if (existsSync(llmWorkerSrc)) {
  console.log("  🔨 Bundling LLMLingua ONNX worker (TypeScript → JavaScript)...");
  mkdirSync(llmWorkerDestDir, { recursive: true });
  try {
    execFileSync(
      NPX_BIN,
      [
        "esbuild",
        "open-sse/services/compression/engines/llmlingua/onnxWorker.ts",
        "--bundle",
        "--platform=node",
        "--packages=external",
        "--format=esm",
        "--outfile=dist/open-sse/services/compression/engines/llmlingua/onnxWorker.js",
      ],
      { cwd: ROOT, stdio: "inherit" }
    );
    console.log(
      "  ✅ LLMLingua worker bundled to dist/open-sse/services/compression/engines/llmlingua/onnxWorker.js"
    );
  } catch (err: any) {
    console.warn("  ⚠️  LLMLingua worker bundle error:", err.message);
  }
}

// ── Step 8.7: Bundle CLI Entrypoint ──────────────────────────
const cliSrcFile = join(ROOT, "bin", "omniroute.ts");
const cliDestFile = join(ROOT, "bin", "omniroute.mjs");

if (existsSync(cliSrcFile)) {
  console.log("  🔨 Bundling CLI Entrypoint (TypeScript → JavaScript)...");
  try {
    execFileSync(
      NPX_BIN,
      [
        "esbuild",
        "bin/omniroute.ts",
        "--bundle",
        "--platform=node",
        "--packages=external",
        "--format=esm",
        "--outfile=bin/omniroute.mjs",
      ],
      { cwd: ROOT, stdio: "inherit" }
    );
    chmodSync(cliDestFile, 0o755);
    console.log("  ✅ CLI Entrypoint bundled to bin/omniroute.mjs");
  } catch (err: any) {
    console.warn("  ⚠️  CLI bundle error:", err.message);
  }
}

// ── Step 8.8: Build @omniroute/opencode-plugin ──────────────
// The plugin ships bundled inside the omniroute npm package (see root
// package.json "files": ["@omniroute/", ...]). Its built `dist/` MUST be
// present in the publish tarball so `omniroute setup opencode` can copy it
// into the user's OpenCode plugin dir. If the build fails we surface the
// error — shipping without the plugin's dist breaks the documented install
// flow for every downstream user.
const opencodePluginSrc = join(ROOT, "@omniroute", "opencode-plugin");
const opencodePluginDist = join(opencodePluginSrc, "dist", "index.js");
const opencodePluginCjs = join(opencodePluginSrc, "dist", "index.cjs");
if (existsSync(opencodePluginSrc) && existsSync(join(opencodePluginSrc, "package.json"))) {
  const pluginAlreadyBuilt = existsSync(opencodePluginDist) && existsSync(opencodePluginCjs);
  if (!pluginAlreadyBuilt) {
    console.log("\n  🔨 Building @omniroute/opencode-plugin (tsup)...");
    try {
      // The plugin is a standalone package (not an npm workspace), so the root
      // install never populates its node_modules — and tsup with `dts: true`
      // needs the plugin's own devDependencies (typescript, @opencode-ai/plugin
      // types). Without this install a fresh CI publish fails at this step.
      if (!existsSync(join(opencodePluginSrc, "node_modules"))) {
        const NPM_BIN = process.platform === "win32" ? "npm.cmd" : "npm";
        execFileSync(NPM_BIN, ["install", "--no-audit", "--no-fund"], {
          cwd: opencodePluginSrc,
          stdio: "inherit",
        });
      }
      execFileSync(NPX_BIN, ["tsup"], {
        cwd: opencodePluginSrc,
        stdio: "inherit",
        env: { ...process.env, NODE_ENV: "production" },
      });
      console.log("  ✅ @omniroute/opencode-plugin bundled to @omniroute/opencode-plugin/dist/");
    } catch (err: any) {
      console.error("  ❌ Failed to build @omniroute/opencode-plugin:", err.message);
      console.error("     The published package would be missing the plugin dist.");
      console.error(
        "     Run `cd @omniroute/opencode-plugin && npm install && npm run build` to debug."
      );
      process.exit(1);
    }
  } else {
    console.log("  ✅ @omniroute/opencode-plugin dist/ already present (skipping rebuild)");
  }
  // Remove plugin node_modules after build — hard links created by npm install on Linux
  // (CI runner) end up in the tarball as LINK entries, which npm registry rejects with
  // E415 "Hard link is not allowed". The node_modules are only needed for the tsup build;
  // they must not ship in the published package.
  const pluginNodeModules = join(opencodePluginSrc, "node_modules");
  if (existsSync(pluginNodeModules)) {
    rmSync(pluginNodeModules, { recursive: true, force: true });
    console.log("  🧹 Removed @omniroute/opencode-plugin/node_modules (hard link guard)");
  }
} else {
  console.log("  ⏭️  @omniroute/opencode-plugin not found in workspace (skipping build)");
}

// ── Step 9: Copy shared utilities needed at runtime ────────
const sharedApiKey = join(ROOT, "src", "shared", "utils", "apiKey.js");
const sharedApiKeyDest = join(DIST_DIR, "src", "shared", "utils");
if (existsSync(sharedApiKey)) {
  console.log("  📋 Copying shared utilities...");
  mkdirSync(sharedApiKeyDest, { recursive: true });
  cpSync(sharedApiKey, join(sharedApiKeyDest, "apiKey.js"));
}

// ── Step 9.5: Copy minimal runtime sidecars required outside .next ─────────
const envExampleSrc = join(ROOT, ".env.example");
if (existsSync(envExampleSrc)) {
  cpSync(envExampleSrc, join(DIST_DIR, ".env.example"));
}

const openapiSpecSrc = join(ROOT, "docs", "openapi.yaml");
if (existsSync(openapiSpecSrc)) {
  const docsDest = join(DIST_DIR, "docs");
  mkdirSync(docsDest, { recursive: true });
  cpSync(openapiSpecSrc, join(docsDest, "openapi.yaml"));
}

const docsMarkdownSrc = join(ROOT, "docs");
if (existsSync(docsMarkdownSrc)) {
  const docsDest = join(DIST_DIR, "docs");
  mkdirSync(docsDest, { recursive: true });
  const mdFiles = readdirSync(docsMarkdownSrc).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx")
  );
  for (const mdFile of mdFiles) {
    cpSync(join(docsMarkdownSrc, mdFile), join(docsDest, mdFile));
  }
  if (mdFiles.length > 0) {
    console.log(`[prepublish] Copied ${mdFiles.length} docs markdown files to dist/docs/`);
  }
}

const syncEnvSrc = join(ROOT, "scripts", "sync-env.mjs");
if (existsSync(syncEnvSrc)) {
  const scriptsDest = join(DIST_DIR, "scripts");
  mkdirSync(scriptsDest, { recursive: true });
  cpSync(syncEnvSrc, join(scriptsDest, "sync-env.mjs"));
}

const migrationsSrc = join(ROOT, "src", "lib", "db", "migrations");
if (existsSync(migrationsSrc)) {
  const migrationsDest = join(DIST_DIR, "src", "lib", "db", "migrations");
  mkdirSync(join(DIST_DIR, "src", "lib", "db"), { recursive: true });
  cpSync(migrationsSrc, migrationsDest, { recursive: true, force: true });
}

const runtimeAssetDirs = [
  {
    source: join(ROOT, "open-sse", "services", "compression", "engines", "rtk", "filters"),
    destination: join(DIST_DIR, "open-sse", "services", "compression", "engines", "rtk", "filters"),
  },
  {
    source: join(ROOT, "open-sse", "services", "compression", "rules"),
    destination: join(DIST_DIR, "open-sse", "services", "compression", "rules"),
  },
];
for (const assetDir of runtimeAssetDirs) {
  if (existsSync(assetDir.source)) {
    mkdirSync(dirname(assetDir.destination), { recursive: true });
    cpSync(assetDir.source, assetDir.destination, { recursive: true, force: true });
  }
}

// ── Step 10: Ensure data/ directory exists ──────────────────
mkdirSync(join(DIST_DIR, "data"), { recursive: true });

// ── Step 10.5: Copy @swc/helpers into standalone ───────────
// Next.js standalone tracer sometimes omits @swc/helpers from dist/node_modules/,
// causing MODULE_NOT_FOUND at runtime. Always copy it explicitly.
const swcHelpersSrc = join(ROOT, "node_modules", "@swc", "helpers");
const swcHelpersDst = join(DIST_DIR, "node_modules", "@swc", "helpers");
if (existsSync(swcHelpersSrc) && !existsSync(swcHelpersDst)) {
  console.log("  📋 Copying @swc/helpers to standalone dist/node_modules...");
  mkdirSync(join(DIST_DIR, "node_modules", "@swc"), { recursive: true });
  cpSync(swcHelpersSrc, swcHelpersDst, { recursive: true });
  console.log("  ✅ @swc/helpers included in standalone build.");
}

// ── Step 10.6: Remove development-only residue from staged dist/ ────────────
for (const relativePath of APP_STAGING_REMOVAL_PATHS) {
  const targetPath = join(DIST_DIR, relativePath);
  if (existsSync(targetPath)) {
    console.log(`  🧹 Removing dist/${relativePath} (not needed in npm package)...`);
    rmSync(targetPath, { recursive: true, force: true });
    console.log(`  ✅ dist/${relativePath} removed.`);
  }
}

// ── Step 10.7: Prune any staged dist/ file outside the allowed runtime set ──
const stagedFiles = walkFiles(DIST_DIR);
const unexpectedStagedFiles = findUnexpectedArtifactPaths(stagedFiles, {
  exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
  prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
});

if (unexpectedStagedFiles.length > 0) {
  console.log("  🧹 Pruning unexpected files from staged dist/...");
  unexpectedStagedFiles.forEach((unexpectedPath: string) => {
    rmSync(join(DIST_DIR, unexpectedPath), { force: true });
    console.log(`  ✅ Removed dist/${unexpectedPath}`);
  });
  removeEmptyDirectories(DIST_DIR);
}

const remainingUnexpectedFiles = findUnexpectedArtifactPaths(walkFiles(DIST_DIR), {
  exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
  prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
});

if (remainingUnexpectedFiles.length > 0) {
  console.error("\n  ❌ Staged dist/ still contains unexpected publish artifacts:");
  remainingUnexpectedFiles.forEach((violation: string) =>
    console.error(`     - dist/${violation}`)
  );
  process.exit(1);
}

// ── Done ───────────────────────────────────────────────────
const distPkg = join(DIST_DIR, "package.json");
if (existsSync(distPkg)) {
  JSON.parse(readFileSync(distPkg, "utf8"));
  console.log(`\n  ✅ Build complete!`);
  console.log(`     Dist directory: dist/`);
  console.log(`     Server entry:  dist/server.js`);
} else {
  console.log(`\n  ✅ Build complete! (dist/ ready for publish)`);
}

console.log("");
