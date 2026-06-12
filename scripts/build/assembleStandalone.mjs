#!/usr/bin/env node

/**
 * assembleStandalone.mjs - Shared standalone bundle assembler for OmniRoute.
 *
 * Task 0.1 Inventory: Copy/sync operations across the three build scripts
 * -----------------------------------------------------------------------
 * Operation                                           build-next-isolated  prepublish  electron  Status
 * --------------------------------------------------- ------------------- ----------- -------- ------
 * .next/standalone -> outDir (cp)                              Y               Y           Y    SHARED
 * .next/static -> outDir/.next/static (cp)                    Y               Y           Y    SHARED
 * public/ -> outDir/public/ (cp)                              Y               Y           Y    SHARED
 * wreq-js/rust -> outDir/node_modules/wreq-js/rust            Y               -           -    SHARED (native asset)
 * better-sqlite3/build -> outDir/node_modules/better-sqlite3/ Y               -           -    SHARED (native asset)
 * @swc/helpers -> outDir/node_modules/@swc/helpers             Y               Y           Y    SHARED (extra module)
 * pino-abstract-transport -> outDir/node_modules/...          Y               -           -    SHARED (extra module)
 * pino-pretty -> outDir/node_modules/pino-pretty              Y               -           -    SHARED (extra module)
 * split2 -> outDir/node_modules/split2                        Y               -           -    SHARED (extra module)
 * src/lib/db/migrations -> outDir/migrations                  Y               Y           -    SHARED (extra module)
 * src/mitm/server.cjs -> outDir/src/mitm/server.cjs           Y               -           -    SHARED (extra module)
 * scripts/dev/run-standalone.mjs -> outDir/dev/run-standalone Y               -           -    SHARED (extra module)
 * scripts/dev/standalone-server-ws.mjs -> outDir/server-ws    Y               Y           -    SHARED (extra module)
 * scripts/dev/peer-stamp.mjs -> outDir/peer-stamp.mjs         Y               Y           -    SHARED (extra module)
 * scripts/dev/responses-ws-proxy.mjs -> outDir/responses-ws-  Y               Y           -    SHARED (extra module)
 * scripts/build/runtime-env.mjs -> outDir/build/runtime-env   Y               -           -    SHARED (extra module)
 * scripts/build/bootstrap-env.mjs -> outDir/build/bootstrap-  Y               -           -    SHARED (extra module)
 * scripts/dev/healthcheck.mjs -> outDir/healthcheck.mjs       Y               -           -    SHARED (extra module)
 * playwright-core -> outDir/node_modules/playwright-core      Y               -           -    SHARED (extra module)
 * sqlite-vec -> outDir/node_modules/sqlite-vec                Y               -           -    SHARED (extra module)
 * sqlite-vec-linux-x64/arm64/darwin-x64/arm64/win-x64 (same) Y               -           -    SHARED (extra module)
 * abs-path sanitization in server.js + required-server-files  -               Y           Y    SHARED (opt-in: sanitizePaths)
 * Turbopack hashed-chunk patch (.next/server/ *.js)           -               Y           -    SHARED (opt-in: patchTurbopackChunks)
 * --- npm-UNIQUE ---
 * MITM tsc compile -> app/src/mitm/                           -               Y           -    UNIQUE (prepublish)
 * MCP server esbuild -> app/open-sse/mcp-server/server.js     -               Y           -    UNIQUE (prepublish)
 * CLI esbuild -> bin/omniroute.mjs                            -               Y           -    UNIQUE (prepublish)
 * sidecar/doc copies (.env.example, docs/, sync-env, etc.)    -               Y           -    UNIQUE (prepublish)
 * prune + validate (pack-artifact-policy)                      -               Y           -    UNIQUE (prepublish)
 * data/ dir creation                                           -               Y           -    UNIQUE (prepublish)
 * --- electron-UNIQUE ---
 * better-sqlite3 + keytar native strip (ABI rebuild)           -               -           Y    UNIQUE (electron)
 * symlink guard (assertBundleIsPackagable)                     -               -           Y    UNIQUE (electron)
 * removeGeneratedElectronArtifacts                             -               -           Y    UNIQUE (electron)
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

/**
 * Check whether a path exists (async).
 * @param {string} targetPath
 * @returns {Promise<boolean>}
 */
async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * SINGLE SOURCE OF TRUTH for the standalone bundle's native assets and extra
 * modules/sidecars. Both the async path (syncStandaloneNativeAssets /
 * syncStandaloneExtraModules, used by build-next-isolated + tests) and the sync
 * path (copyNativeAssetsAndExtraModules, used by assembleStandalone) derive their
 * copy lists from these arrays. Add a sidecar in ONE place — never two.
 *
 * Each entry uses path SEGMENT arrays (not pre-joined strings) so the source
 * (relative to projectRoot) and destination (relative to outDir) can be joined
 * for either path/platform. @type {{label:string, src:string[], dest:string[]}[]}
 */
const NATIVE_ASSET_ENTRIES = [
  {
    label: "wreq-js native runtime",
    src: ["node_modules", "wreq-js", "rust"],
    dest: ["node_modules", "wreq-js", "rust"],
  },
  {
    label: "better-sqlite3 native binary",
    src: ["node_modules", "better-sqlite3", "build"],
    dest: ["node_modules", "better-sqlite3", "build"],
  },
];

/** @type {{label:string, src:string[], dest:string[]}[]} */
const EXTRA_MODULE_ENTRIES = [
  {
    label: "@swc/helpers",
    src: ["node_modules", "@swc", "helpers"],
    dest: ["node_modules", "@swc", "helpers"],
  },
  {
    label: "pino-abstract-transport",
    src: ["node_modules", "pino-abstract-transport"],
    dest: ["node_modules", "pino-abstract-transport"],
  },
  {
    label: "pino-pretty",
    src: ["node_modules", "pino-pretty"],
    dest: ["node_modules", "pino-pretty"],
  },
  { label: "split2", src: ["node_modules", "split2"], dest: ["node_modules", "split2"] },
  { label: "migrations", src: ["src", "lib", "db", "migrations"], dest: ["migrations"] },
  { label: "MITM server", src: ["src", "mitm", "server.cjs"], dest: ["src", "mitm", "server.cjs"] },
  {
    label: "run-standalone script",
    src: ["scripts", "dev", "run-standalone.mjs"],
    dest: ["dev", "run-standalone.mjs"],
  },
  {
    // WS-aware wrapper that run-standalone.mjs prefers over bare server.js.
    // It installs the trusted peer-IP stamp the authz middleware needs to allow
    // loopback/LAN access to LOCAL_ONLY routes; without it the Docker container
    // fails closed (every LOCAL_ONLY request 403s). Imports peer-stamp.mjs +
    // responses-ws-proxy.mjs, so all three are co-located.
    label: "WS/peer-stamp standalone server wrapper",
    src: ["scripts", "dev", "standalone-server-ws.mjs"],
    dest: ["server-ws.mjs"],
  },
  {
    label: "peer-stamp helper (server-ws.mjs dependency)",
    src: ["scripts", "dev", "peer-stamp.mjs"],
    dest: ["peer-stamp.mjs"],
  },
  {
    label: "responses-ws-proxy (server-ws.mjs dependency)",
    src: ["scripts", "dev", "responses-ws-proxy.mjs"],
    dest: ["responses-ws-proxy.mjs"],
  },
  {
    label: "webdav-handler (server-ws.mjs dependency)",
    src: ["scripts", "dev", "webdav-handler.mjs"],
    dest: ["webdav-handler.mjs"],
  },
  {
    label: "runtime-env script",
    src: ["scripts", "build", "runtime-env.mjs"],
    dest: ["build", "runtime-env.mjs"],
  },
  {
    label: "bootstrap-env script",
    src: ["scripts", "build", "bootstrap-env.mjs"],
    dest: ["build", "bootstrap-env.mjs"],
  },
  {
    label: "healthcheck script",
    src: ["scripts", "dev", "healthcheck.mjs"],
    dest: ["healthcheck.mjs"],
  },
  { label: "public directory", src: ["public"], dest: ["public"] },
  {
    label: "playwright-core (dynamic import by gemini-web executor)",
    src: ["node_modules", "playwright-core"],
    dest: ["node_modules", "playwright-core"],
  },
  {
    label: "sqlite-vec wrapper (vector memory - loaded at runtime via createRequire)",
    src: ["node_modules", "sqlite-vec"],
    dest: ["node_modules", "sqlite-vec"],
  },
  // sqlite-vec's native vec0.so lives in a platform-specific package resolved at
  // runtime via require.resolve(). Next.js does NOT trace it into the standalone
  // (the externalized wrapper is copied, but its optional platform dep is missed -
  // Next.js #88844), so without this the bundled/Docker build silently degrades
  // vector search to FTS5: the wrapper loads but getLoadablePath() throws
  // MODULE_NOT_FOUND. Copy whichever platform package npm actually installed. See #3066.
  ...[
    "sqlite-vec-linux-x64",
    "sqlite-vec-linux-arm64",
    "sqlite-vec-darwin-x64",
    "sqlite-vec-darwin-arm64",
    "sqlite-vec-windows-x64",
  ].map((pkg) => ({ label: pkg, src: ["node_modules", pkg], dest: ["node_modules", pkg] })),
];

/**
 * Copy native standalone assets (wreq-js rust/, better-sqlite3 build/).
 *
 * The destination is derived as <rootDir>/<distDir>/standalone/node_modules/...
 * for backward compatibility with existing callers and tests.
 *
 * @param {string} rootDir      - project root (node_modules are read from here)
 * @param {typeof fs} [fsImpl]  - fs/promises implementation (injectable for tests)
 * @param {Console|{log:Function}} [log] - logger
 * @returns {Promise<boolean>} true if any asset was copied
 */
export async function syncStandaloneNativeAssets(rootDir, fsImpl = fs, log = console, outDir) {
  const standaloneRoot =
    outDir || path.join(rootDir, process.env.NEXT_DIST_DIR || ".build/next", "standalone");
  return syncNativeAssetsToDir(rootDir, standaloneRoot, fsImpl, log);
}

/**
 * Copy extra modules and sidecars into the Next.js standalone output.
 *
 * The destination is derived as <rootDir>/<distDir>/standalone/...
 * where distDir defaults to ".build/next" (overridable via NEXT_DIST_DIR).
 *
 * @param {string} rootDir      - project root
 * @param {typeof fs} [fsImpl]  - fs/promises implementation (injectable for tests)
 * @param {Console|{log:Function}} [log] - logger
 * @returns {Promise<boolean>} true if any module was copied
 */
export async function syncStandaloneExtraModules(rootDir, fsImpl = fs, log = console, outDir) {
  const standaloneRoot =
    outDir || path.join(rootDir, process.env.NEXT_DIST_DIR || ".build/next", "standalone");
  return syncExtraModulesToDir(rootDir, standaloneRoot, fsImpl, log);
}

/**
 * Internal: copy native assets to an arbitrary outDir.
 *
 * @param {string} projectRoot
 * @param {string} outDir
 * @param {typeof fs} fsImpl
 * @param {Console|{log:Function}} log
 * @returns {Promise<boolean>}
 */
async function syncNativeAssetsToDir(projectRoot, outDir, fsImpl, log) {
  let changed = false;

  for (const entry of NATIVE_ASSET_ENTRIES) {
    const sourcePath = path.join(projectRoot, ...entry.src);
    if (!(await exists(sourcePath))) continue;

    const destinationPath = path.join(outDir, ...entry.dest);
    const mkdir =
      typeof fsImpl.mkdir === "function" ? fsImpl.mkdir.bind(fsImpl) : fs.mkdir.bind(fs);
    await mkdir(path.dirname(destinationPath), { recursive: true });
    await fsImpl.cp(sourcePath, destinationPath, {
      recursive: true,
      force: true,
    });
    log.log(
      `[assembleStandalone] Copied native standalone asset: ${path.relative(
        projectRoot,
        destinationPath
      )}`
    );
    changed = true;
  }

  return changed;
}

/**
 * Internal: copy extra modules/sidecars to an arbitrary outDir.
 *
 * @param {string} projectRoot
 * @param {string} outDir
 * @param {typeof fs} fsImpl
 * @param {Console|{log:Function}} log
 * @returns {Promise<boolean>}
 */
async function syncExtraModulesToDir(projectRoot, outDir, fsImpl, log) {
  let changed = false;

  for (const entry of EXTRA_MODULE_ENTRIES) {
    const sourcePath = path.join(projectRoot, ...entry.src);
    if (!(await exists(sourcePath))) continue;

    const destPath = path.join(outDir, ...entry.dest);
    const mkdir =
      typeof fsImpl.mkdir === "function" ? fsImpl.mkdir.bind(fsImpl) : fs.mkdir.bind(fs);
    await mkdir(path.dirname(destPath), { recursive: true });
    await fsImpl.cp(sourcePath, destPath, { recursive: true, force: true });
    log.log(`[assembleStandalone] Synced standalone module: ${entry.label}`);
    changed = true;
  }

  return changed;
}

/**
 * Sanitize absolute build-machine paths in server.js and required-server-files.json.
 * Replaces the build root with "." so paths resolve relative to wherever the standalone
 * bundle is installed.
 *
 * @param {string} projectRoot  - repo root (the path to replace)
 * @param {string} outDir       - assembled standalone output directory
 * @returns {number} number of path replacements made
 */
export function assemblePathSanitize(projectRoot, outDir, distDir = ".next") {
  const buildRoot = projectRoot.replaceAll("\\", "/"); // normalise for regex safety
  const sanitizeTargets = [
    path.join(outDir, "server.js"),
    // required-server-files.json lives under the distDir (e.g. .build/next), not
    // a literal .next — the standalone preserves the configured distDir path.
    path.join(outDir, distDir, "required-server-files.json"),
  ];

  let sanitisedCount = 0;
  for (const filePath of sanitizeTargets) {
    if (!fsSync.existsSync(filePath)) continue;
    let content = fsSync.readFileSync(filePath, "utf8");
    // Escape special regex characters in the path
    const escaped = buildRoot.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    const re = new RegExp(escaped, "g");
    const matches = content.match(re);
    if (matches) {
      content = content.replace(re, ".");
      fsSync.writeFileSync(filePath, content);
      sanitisedCount += matches.length;
    }
  }
  return sanitisedCount;
}

/**
 * Strip Turbopack hashed externals from compiled chunks.
 * Even when Turbopack is disabled at build time, some instrumentation chunks
 * may still emit require('package-<16hexchars>') instead of require('package').
 * We strip the hex suffix from all .js files in outDir/.next/server/.
 *
 * @param {string} outDir - assembled standalone output directory
 * @returns {{ patchedFiles: number, patchedMatches: number }}
 */
export function patchTurbopackChunks(outDir, distDir = ".next") {
  const serverOutput = path.join(outDir, distDir, "server");
  const HASH_RE = /(['"\\])([a-z@][a-z0-9@./_-]+?-[0-9a-f]{16}(?:\/[^'"\\]+)?)\1/g;
  let patchedFiles = 0;
  let patchedMatches = 0;

  const walkDir = (dir) => {
    let entries = [];
    try {
      entries = fsSync.readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry);
      try {
        const st = fsSync.statSync(full);
        if (st.isDirectory()) {
          walkDir(full);
          continue;
        }
        if (!entry.endsWith(".js")) continue;
        const src = fsSync.readFileSync(full, "utf8");
        let count = 0;
        const patched = src.replace(HASH_RE, (_, q, name) => {
          const base = name.replace(/-[0-9a-f]{16}(?=\/|$)/, "");
          count++;
          return `${q}${base}${q}`;
        });
        if (count > 0) {
          fsSync.writeFileSync(full, patched);
          patchedFiles++;
          patchedMatches += count;
        }
      } catch {
        /* skip unreadable files */
      }
    }
  };

  if (fsSync.existsSync(serverOutput)) {
    walkDir(serverOutput);
  }

  return { patchedFiles, patchedMatches };
}

/**
 * Next.js standalone's server.js is CommonJS (uses require()), but the root package.json
 * (which Next copies into the standalone) has "type":"module". Strip "type" so Node treats
 * .js files as CJS in the bundle dir — otherwise `node server.js` fails with
 * "require is not defined in ES module scope".
 *
 * @param {string} resolvedOutDir - assembled standalone output directory
 */
function patchStandalonePackageJson(resolvedOutDir) {
  const outDirPkgJson = path.join(resolvedOutDir, "package.json");
  if (!fsSync.existsSync(outDirPkgJson)) return;
  try {
    const pkg = JSON.parse(fsSync.readFileSync(outDirPkgJson, "utf8"));
    if (pkg.type !== "module") return;
    delete pkg.type;
    fsSync.writeFileSync(outDirPkgJson, JSON.stringify(pkg, null, 2) + "\n");
    console.log(
      "[assembleStandalone] Removed 'type':'module' from standalone package.json (server.js is CJS)"
    );
  } catch (err) {
    console.warn(`[assembleStandalone] Could not patch standalone package.json: ${err.message}`);
  }
}

/**
 * Copy <distDir>/static -> outDir/<relDistDir>/static and projectRoot/public -> outDir/public.
 * The static dest mirrors the configured distDir (e.g. .build/next), which is where the
 * standalone server serves /_next/static from. See step 2 in assembleStandalone for why.
 *
 * @param {{ distDir: string, relDistDir: string, projectRoot: string, resolvedOutDir: string }} opts
 */
function copyStaticAndPublic({ distDir, relDistDir, projectRoot, resolvedOutDir }) {
  const staticSrc = path.join(distDir, "static");
  const staticDest = path.join(resolvedOutDir, relDistDir, "static");
  if (fsSync.existsSync(staticSrc)) {
    fsSync.mkdirSync(path.dirname(staticDest), { recursive: true });
    fsSync.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  }

  const publicSrc = path.join(projectRoot, "public");
  if (fsSync.existsSync(publicSrc)) {
    fsSync.cpSync(publicSrc, path.join(resolvedOutDir, "public"), { recursive: true, force: true });
  }
}

/**
 * Copy native assets (wreq-js, better-sqlite3) and extra runtime modules/sidecars
 * (pino, migrations, MITM server, helper scripts, sqlite-vec platform packages, …)
 * into the assembled bundle. Missing sources are skipped silently.
 *
 * @param {string} projectRoot
 * @param {string} resolvedOutDir
 */
function copyNativeAssetsAndExtraModules(projectRoot, resolvedOutDir) {
  for (const asset of NATIVE_ASSET_ENTRIES) {
    const src = path.join(projectRoot, ...asset.src);
    if (!fsSync.existsSync(src)) continue;
    const dest = path.join(resolvedOutDir, ...asset.dest);
    fsSync.mkdirSync(path.dirname(dest), { recursive: true });
    fsSync.cpSync(src, dest, { recursive: true, force: true });
    console.log(`[assembleStandalone] Copied native asset: ${asset.label}`);
  }

  for (const mod of EXTRA_MODULE_ENTRIES) {
    const src = path.join(projectRoot, ...mod.src);
    if (!fsSync.existsSync(src)) continue;
    const dest = path.join(resolvedOutDir, ...mod.dest);
    fsSync.mkdirSync(path.dirname(dest), { recursive: true });
    fsSync.cpSync(src, dest, { recursive: true, force: true });
    console.log(`[assembleStandalone] Synced module: ${mod.label}`);
  }
}

/**
 * Assemble the Next.js standalone bundle into outDir.
 *
 * Copies <distDir>/standalone -> outDir, then <distDir>/static -> outDir/.next/static,
 * projectRoot/public -> outDir/public, native assets, and extra modules/sidecars.
 * Optionally sanitizes abs paths and patches Turbopack chunks.
 *
 * This is a synchronous function for use in build scripts.
 *
 * @param {object} opts
 * @param {string} opts.distDir                  - Next.js distDir (e.g. ".next" or ".build/next")
 * @param {string} opts.outDir                   - destination directory for the assembled bundle
 * @param {string} [opts.projectRoot]            - repo root; defaults to process.cwd()
 * @param {boolean} [opts.sanitizePaths]         - replace build-machine abs paths with "." (default false)
 * @param {boolean} [opts.patchTurbopackChunks]  - strip hashed externals from .next/server js files (default false)
 * @param {boolean} [opts.copyNatives]           - copy native assets + extra modules (default true)
 * @returns {void}
 */
export function assembleStandalone({
  distDir,
  outDir,
  projectRoot = process.cwd(),
  sanitizePaths = false,
  patchTurbopackChunks: doPatchChunks = false,
  copyNatives = true,
}) {
  if (!distDir) throw new Error("[assembleStandalone] distDir is required");
  if (!outDir) throw new Error("[assembleStandalone] outDir is required");

  // The standalone bundle preserves the distDir path RELATIVE to projectRoot
  // (the server's baked config uses e.g. "./.build/next"), so output dest paths
  // for static / required-server-files / server chunks must use the relative
  // distDir appended to outDir — never the absolute build-machine distDir.
  const relDistDir = path.isAbsolute(distDir) ? path.relative(projectRoot, distDir) : distDir;

  const standaloneDir = path.resolve(path.join(distDir, "standalone"));
  const resolvedOutDir = path.resolve(outDir);
  if (!fsSync.existsSync(standaloneDir)) {
    throw new Error(
      `[assembleStandalone] standalone dir not found: ${standaloneDir}. Run \`next build\` first.`
    );
  }

  // 1. Copy <distDir>/standalone -> outDir (skip when outDir IS the standalone dir — in-place mode)
  fsSync.mkdirSync(resolvedOutDir, { recursive: true });
  if (resolvedOutDir !== standaloneDir) {
    fsSync.cpSync(standaloneDir, resolvedOutDir, { recursive: true });
  }

  // 1.5. Standalone server.js is CJS — strip "type":"module" from the copied package.json.
  patchStandalonePackageJson(resolvedOutDir);

  // 2/3. Copy <distDir>/static -> outDir/<relDistDir>/static and projectRoot/public -> outDir/public.
  // CRITICAL: the standalone server.js is built with distDir baked into its config
  // (e.g. "./.build/next"), so it serves /_next/static from <outDir>/<relDistDir>/static,
  // NOT a literal <outDir>/.next/static. Copying to .next/static leaves the server's
  // static dir empty → every JS/CSS chunk 404s → blank page. Mirror the distDir path.
  copyStaticAndPublic({ distDir, relDistDir, projectRoot, resolvedOutDir });

  // 4. Optionally sanitize abs paths
  if (sanitizePaths) {
    const count = assemblePathSanitize(projectRoot, resolvedOutDir, relDistDir);
    if (count > 0) {
      console.log(`[assembleStandalone] Sanitised ${count} hardcoded path references`);
    }
  }

  // 5. Optionally patch Turbopack hashed chunks
  if (doPatchChunks) {
    const { patchedFiles, patchedMatches } = patchTurbopackChunks(resolvedOutDir, relDistDir);
    if (patchedMatches > 0) {
      console.log(
        `[assembleStandalone] Hash-strip: patched ${patchedMatches} hashed require() in ${patchedFiles} server chunk file(s)`
      );
    }
  }

  // 6. Optionally copy native assets + extra modules (synchronous)
  if (copyNatives) {
    copyNativeAssetsAndExtraModules(projectRoot, resolvedOutDir);
  }
}
