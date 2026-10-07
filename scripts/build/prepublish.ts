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
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { assembleStandalone } from "./assembleStandalone.mjs";
import { buildMitmUtilities } from "./buildMitm.mjs";
import { isNativeExecutable, resolveLocalBinEntry } from "./buildToolRunner.mjs";
import { resolveBundledNpmEntry } from "./resolveNpmEntry.ts";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  APP_STAGING_ALLOWED_PATH_PREFIXES,
  APP_STAGING_REMOVAL_PATHS,
  findUnexpectedArtifactPaths,
} from "./pack-artifact-policy.ts";
import {
  collectWorkspaceVersions,
  findPackageJsonFiles,
  hasWorkspaceProtocol,
  resolvePackageJsonWorkspaceProtocols,
} from "./resolveWorkspaceProtocols.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..");
const NPX_BIN = process.platform === "win32" ? "npx.cmd" : "npx";

// On Windows the npm/npx entry points are `.cmd` shims, and Node >= 20 refuses to
// spawn a `.cmd` without a shell (EINVAL, from the CVE-2024-27980 hardening). On
// Node 24 that makes every `execFileSync(NPX_BIN, ...)` in this script fail, which
// silently skipped the MITM utilities, the MCP server bundle, the LLMLingua worker
// and the OpenCode plugin while the build still reported success.
//
// `shell: true` would fix the spawn but disables argument escaping (DEP0190), so it
// is only the last resort. Preferred order: run the tool's own JS entry point with
// this Node binary — no shim, no shell, nothing to escape. `resolveLocalBinEntry()`
// and `isNativeExecutable()` implement that resolution and now live in
// buildToolRunner.mjs, shared with the plain-`node` build scripts.

/**
 * Runs a build tool without ever touching a `.cmd` shim. `packageName` is where the
 * tool lives in the local dependency tree; when it is not installed there the call
 * falls back to the Node-resolved `npx` entry point, and only then to the shim.
 */
function runBuildTool(
  packageName: string,
  binName: string,
  args: readonly string[],
  options: Parameters<typeof execFileSync>[2]
): void {
  const localEntry = resolveLocalBinEntry(packageName, binName);
  if (localEntry) {
    if (isNativeExecutable(localEntry)) {
      execFileSync(localEntry, [...args], options);
      return;
    }
    execFileSync(process.execPath, [localEntry, ...args], options);
    return;
  }
  const npxEntry = resolveBundledNpmEntry("npx-cli.js");
  if (npxEntry) {
    execFileSync(process.execPath, [npxEntry, binName, ...args], options);
    return;
  }
  // Last resort. The arguments here are static build literals, never user input,
  // so the missing escaping under `shell` is not an injection surface.
  execFileSync(NPX_BIN, [binName, ...args], {
    ...options,
    shell: process.platform === "win32",
  });
}

const DIST_DIR = join(ROOT, "dist");
const METHOD_GUARD_REQUIRE = 'require("./http-method-guard.cjs").installHttpMethodGuard();\n';

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

const distServer = join(DIST_DIR, "server.js");
const methodGuardSrc = join(ROOT, "scripts", "dev", "http-method-guard.cjs");
const methodGuardDest = join(DIST_DIR, "http-method-guard.cjs");
if (existsSync(methodGuardSrc)) {
  cpSync(methodGuardSrc, methodGuardDest);
}
if (existsSync(distServer)) {
  const serverSource = readFileSync(distServer, "utf8");
  if (!serverSource.includes("installHttpMethodGuard")) {
    writeFileSync(distServer, METHOD_GUARD_REQUIRE + serverSource);
    console.log("  ✅ Patched dist/server.js with HTTP method guard.");
  }
}

// ── Step 8: Compile + copy MITM cert utilities ─────────────
const mitmDest = join(DIST_DIR, "src", "mitm");
console.log("  🔨 Typechecking and bundling MITM utilities...");
await buildMitmUtilities({ projectRoot: ROOT, destination: mitmDest });
console.log("  ✅ MITM utilities compiled to dist/src/mitm/");

// ── Step 8.5: Bundle MCP server ────────────────────────────
const mcpSrcFile = join(ROOT, "open-sse", "mcp-server", "server.ts");
const mcpDestDir = join(DIST_DIR, "open-sse", "mcp-server");
const mcpDestFile = join(mcpDestDir, "server.js");

if (existsSync(mcpSrcFile)) {
  console.log("  🔨 Bundling MCP Server (TypeScript → JavaScript)...");
  mkdirSync(mcpDestDir, { recursive: true });
  try {
    runBuildTool(
      "esbuild",
      "esbuild",
      [
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

const chatGptWebCodexMcpSrcFile = join(
  ROOT,
  "open-sse",
  "vendor",
  "codex-chatgpt-web",
  "adapters",
  "chatgpt-web",
  "mcp-server.ts"
);
const chatGptWebCodexMcpDestFile = join(
  DIST_DIR,
  "open-sse",
  "vendor",
  "codex-chatgpt-web",
  "adapters",
  "chatgpt-web",
  "mcp-server.js"
);
if (existsSync(chatGptWebCodexMcpSrcFile)) {
  console.log("  🔨 Bundling ChatGPT Web (Codex) MCP bridge...");
  mkdirSync(dirname(chatGptWebCodexMcpDestFile), { recursive: true });
  runBuildTool(
    "esbuild",
    "esbuild",
    [
      "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.ts",
      "--bundle",
      "--platform=node",
      "--packages=external",
      "--format=esm",
      "--outfile=dist/open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.js",
    ],
    { cwd: ROOT, stdio: "inherit" }
  );
}

// ── Step 8.6: Bundle call-log artifact worker ────────────────────────
const healthWorkerDest = join(DIST_DIR, "src/lib/db/healthCheckWorker.js");
mkdirSync(dirname(healthWorkerDest), { recursive: true });
runBuildTool(
  "esbuild",
  "esbuild",
  [
    "src/lib/db/healthCheckWorker.ts",
    "--bundle",
    "--platform=node",
    "--packages=external",
    "--format=esm",
    `--outfile=${healthWorkerDest}`,
  ],
  { cwd: ROOT, stdio: "inherit" }
);

const callLogWorkerSrc = join(ROOT, "src", "lib", "usage", "callLogArtifactWorker.ts");
const callLogWorkerDest = join(DIST_DIR, "src", "lib", "usage", "callLogArtifactWorker.js");
if (!existsSync(callLogWorkerSrc)) {
  throw new Error("Required call-log artifact worker source is missing");
}
console.log("  🔨 Bundling call-log artifact worker...");
mkdirSync(dirname(callLogWorkerDest), { recursive: true });
runBuildTool(
  "esbuild",
  "esbuild",
  [
    "src/lib/usage/callLogArtifactWorker.ts",
    "--bundle",
    "--platform=node",
    "--packages=external",
    "--format=esm",
    "--outfile=dist/src/lib/usage/callLogArtifactWorker.js",
  ],
  { cwd: ROOT, stdio: "inherit" }
);

// ── Step 8.6a: Bundle LLMLingua ONNX worker ───────────────────────────
// The worker is spawned via worker_threads at a path the Next.js bundler cannot
// statically trace, so it must ship as a standalone .js (mirrors the MCP-server
// bundling above). Heavy deps (@atjsh/llmlingua-2 / @huggingface/transformers /
// js-tiktoken) stay EXTERNAL — they are optionalDependencies,
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
    runBuildTool(
      "esbuild",
      "esbuild",
      [
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

// ── Step 8.6b: Bundle synchronous compression worker ──────────────────
const compressionWorkerSrc = join(
  ROOT,
  "open-sse",
  "services",
  "compression",
  "compressionWorker.ts"
);
const compressionWorkerDest = join(
  DIST_DIR,
  "open-sse",
  "services",
  "compression",
  "compressionWorker.js"
);
if (!existsSync(compressionWorkerSrc)) {
  throw new Error("Required compression worker source is missing");
}
console.log("  🔨 Bundling compression worker...");
mkdirSync(dirname(compressionWorkerDest), { recursive: true });
runBuildTool(
  "esbuild",
  "esbuild",
  [
    "open-sse/services/compression/compressionWorker.ts",
    "--bundle",
    "--platform=node",
    "--packages=external",
    "--format=esm",
    "--outfile=dist/open-sse/services/compression/compressionWorker.js",
  ],
  { cwd: ROOT, stdio: "inherit" }
);

// ── Step 8.7: Bundle CLI Entrypoint ──────────────────────────
const cliSrcFile = join(ROOT, "bin", "omniroute.ts");
const cliDestFile = join(ROOT, "bin", "omniroute.mjs");

if (existsSync(cliSrcFile)) {
  console.log("  🔨 Bundling CLI Entrypoint (TypeScript → JavaScript)...");
  try {
    runBuildTool(
      "esbuild",
      "esbuild",
      [
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
if (existsSync(opencodePluginSrc) && existsSync(join(opencodePluginSrc, "package.json"))) {
  // The plugin's tsup config is ESM-only (format: ["esm"]), so a successful
  // build only ever produces dist/index.js (+ dist/index.d.ts) — never
  // dist/index.cjs. Gate the skip solely on dist/index.js.
  const pluginAlreadyBuilt = existsSync(opencodePluginDist);
  if (!pluginAlreadyBuilt) {
    console.log("\n  🔨 Building @omniroute/opencode-plugin (tsup)...");
    try {
      // The plugin is a standalone package (not an npm workspace), so the root
      // install never populates its node_modules — and tsup with `dts: true`
      // needs the plugin's own devDependencies (typescript, @opencode-ai/plugin
      // types). Without this install a fresh CI publish fails at this step.
      if (!existsSync(join(opencodePluginSrc, "node_modules"))) {
        // The plugin's node_modules is gitignored, so a fresh CI checkout
        // ALWAYS installs here. The registry CDN is intermittently flaky
        // (onnxruntime-class ETIMEDOUTs to the Microsoft CDN have repeatedly
        // stalled CI npm steps for 20+ minutes), and npm's unbounded fetch
        // retries turn a stalled connection into a hang that eats the whole
        // job budget. Bound the fetch and retry the install a few times:
        // transient network failures fail fast and recover instead of hanging.
        const npmEntry = resolveBundledNpmEntry("npm-cli.js");
        const installArgs = [
          "install",
          "--no-audit",
          "--no-fund",
          "--fetch-retries=2",
          "--fetch-retry-mintimeout=2000",
          "--fetch-retry-maxtimeout=30000",
          "--fetch-timeout=60000",
        ];
        const runPluginInstall = () => {
          if (npmEntry) {
            execFileSync(process.execPath, [npmEntry, ...installArgs], {
              cwd: opencodePluginSrc,
              stdio: "inherit",
            });
          } else if (process.platform !== "win32") {
            // No bundled npm entry found (non-standard Node layout). Plain `npm` is
            // safe here — the .cmd-shim hazard #8858 guards against is Windows-only.
            execFileSync("npm", installArgs, {
              cwd: opencodePluginSrc,
              stdio: "inherit",
            });
          } else {
            throw new Error(
              "npm-cli.js not found next to the running Node binary; cannot install the plugin dependencies without falling back to a .cmd shim."
            );
          }
        };
        const sleepSync = (ms: number) =>
          Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
        let installError: any = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            if (attempt > 1) {
              console.log(
                `  🔄 @omniroute/opencode-plugin npm install retry (attempt ${attempt}/3)`
              );
            }
            runPluginInstall();
            installError = null;
            break;
          } catch (err: any) {
            installError = err;
            if (attempt < 3) {
              console.warn(
                `  ⚠️  plugin npm install failed (attempt ${attempt}/3): ${err?.message ?? String(err)} — retrying in 10s`
              );
              sleepSync(10_000);
            }
          }
        }
        if (installError) throw installError;
      }
      runBuildTool("tsup", "tsup", [], {
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
// #9985: neverAllowedSegments is EMPTY here on purpose — unlike the publish
// tarball gate, the staged dist/ legitimately contains node_modules (the
// standalone server's runtime deps, including Turbopack-hashed packages whose
// wasm files DB init requires). The allowlist prefixes above are the contract.
const stagedFiles = walkFiles(DIST_DIR);
const unexpectedStagedFiles = findUnexpectedArtifactPaths(stagedFiles, {
  exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
  prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
  neverAllowedSegments: [],
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
  neverAllowedSegments: [],
});

if (remainingUnexpectedFiles.length > 0) {
  console.error("\n  ❌ Staged dist/ still contains unexpected publish artifacts:");
  remainingUnexpectedFiles.forEach((violation: string) =>
    console.error(`     - dist/${violation}`)
  );
  process.exit(1);
}

// -- Step 11: Resolve workspace: protocol dependencies -----------------
// npm/pnpm workspace protocol specifiers (workspace:*, workspace:^, ...)
// are meaningless to the npm registry and make `npm install -g omniroute`
// fail with EUNSUPPORTEDPROTOCOL. Rewrite any that leaked into published
// package.json files to the concrete workspace package version.
// Only touch files inside the staged dist/ tree; workspace member source
// package.json files must never be mutated by the publish step.
const workspaceVersions = collectWorkspaceVersions(ROOT);
const publishablePackageJsonDirs = [DIST_DIR];
const publishablePackageJsonPaths = publishablePackageJsonDirs
  .flatMap((dir) => (existsSync(dir) ? findPackageJsonFiles(dir) : []))
  .filter((filePath) => existsSync(filePath));

for (const pkgJsonPath of publishablePackageJsonPaths) {
  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8")) as Record<string, unknown>;
  } catch {
    continue;
  }
  if (!hasWorkspaceProtocol(pkg)) continue;

  const resolved = resolvePackageJsonWorkspaceProtocols(pkg, workspaceVersions);
  writeFileSync(pkgJsonPath, JSON.stringify(resolved, null, 2) + "\n");
  console.log(`  [resolved] Resolved workspace: protocols in ${relative(ROOT, pkgJsonPath)}`);
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
