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
 * wreq-js -> outDir/node_modules/wreq-js                     Y               Y           Y    SHARED (extra module)
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
 * scripts/dev/head-response-guard.cjs -> outDir/head-respons  Y               Y           -    SHARED (extra module)
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
 * MCP server esbuild -> dist/open-sse/mcp-server/server.js    -               Y           -    UNIQUE (prepublish)
 * CLI esbuild -> bin/omniroute.mjs                            -               Y           -    UNIQUE (prepublish)
 * sidecar/doc copies (.env.example, docs/, sync-env, etc.)    -               Y           -    UNIQUE (prepublish)
 * prune + validate (pack-artifact-policy)                      -               Y           -    UNIQUE (prepublish)
 * data/ dir creation                                           -               Y           -    UNIQUE (prepublish)
 * --- electron-UNIQUE ---
 * better-sqlite3 prebuild verify + compile-input strip          -               -           Y    UNIQUE (electron)
 * Turbopack hashed-module symlink materialize (node_modules)   -               -           Y    SHARED (opt-in: materializeSymlinks)
 * symlink guard (assertBundleIsPackagable)                     -               -           Y    UNIQUE (electron)
 * removeGeneratedElectronArtifacts                             -               -           Y    UNIQUE (electron)
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { colocateLlmlinguaOptionals, SEED_PACKAGES } from "./colocateOptionals.mjs";
import { WREQ_JS_NATIVE_BINDINGS } from "./wreqJsNative.mjs";

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
export const NATIVE_ASSET_ENTRIES = [
  {
    label: "better-sqlite3 native binary",
    src: ["node_modules", "better-sqlite3", "build"],
    dest: ["node_modules", "better-sqlite3", "build"],
  },
  {
    label: "better-sqlite3 prebuilt native binaries",
    src: ["node_modules", "better-sqlite3", "prebuilds"],
    dest: ["node_modules", "better-sqlite3", "prebuilds"],
  },
  {
    // onnxruntime-node's dist/binding.js dlopen()s a platform-specific
    // libonnxruntime.so.1 shipped under bin/napi-v3/<platform>/<arch>/ — a
    // *dynamic* native load Next.js's standalone file trace can't see (same
    // blind spot class as the LLMLingua closure below, just for a .so instead
    // of a JS import). Without this the standalone bundle boots with
    // "Error: libonnxruntime.so.1: cannot open shared object file: No such
    // file or directory" the first time transformers/llmlingua actually try
    // to run ONNX inference.
    label: "onnxruntime-node native binaries (libonnxruntime .so + .node addon)",
    src: ["node_modules", "onnxruntime-node", "bin"],
    dest: ["node_modules", "onnxruntime-node", "bin"],
  },
  {
    // TPROXY IP_TRANSPARENT addon (Fase 3 / Epic A). Built by build-tproxy-native
    // before assembly; Linux-only + opt-in, so the source is absent on non-Linux
    // builds → syncNativeAssetsToDir skips it gracefully. The runtime loader
    // (transparentSocket.ts) resolves it cwd-relative to this same dest.
    label: "TPROXY transparent-socket addon (Linux-only, opt-in)",
    src: ["src", "mitm", "tproxy", "native", "build", "Release", "transparent.node"],
    dest: ["src", "mitm", "tproxy", "native", "build", "Release", "transparent.node"],
  },
];

/** @type {{label:string, src:string[], dest:string[]}[]} */
const EXTRA_MODULE_ENTRIES = [
  {
    // tlsClient.ts intentionally resolves wreq-js through a runtime-dynamic
    // require so Turbopack cannot rewrite the package name to a hashed external.
    // That also makes the package invisible to static tracing, so copy the whole
    // module—not only rust/—into every standalone artifact.
    label: "wreq-js TLS runtime",
    src: ["node_modules", "wreq-js"],
    dest: ["node_modules", "wreq-js"],
  },
  ...WREQ_JS_NATIVE_BINDINGS.map((binding) => ({
    label: `${binding.packageName} native binding`,
    src: ["node_modules", ...binding.packageName.split("/")],
    dest: ["node_modules", ...binding.packageName.split("/")],
  })),
  {
    label: "third-party notices",
    src: ["THIRD_PARTY_NOTICES.md"],
    dest: ["THIRD_PARTY_NOTICES.md"],
  },
  {
    label: "wreq-js native provenance manifest",
    src: ["config", "release", "wreq-js-native-manifest.json"],
    dest: ["config", "release", "wreq-js-native-manifest.json"],
  },
  {
    label: "wreq-js Rust license inventory",
    src: ["config", "release", "wreq-js-rust-license-inventory.json"],
    dest: ["config", "release", "wreq-js-rust-license-inventory.json"],
  },
  {
    label: "wreq-js Rust/native notice bundle",
    src: ["config", "release", "wreq-js-rust-notices.md"],
    dest: ["config", "release", "wreq-js-rust-notices.md"],
  },
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
    // #9451: server.cjs requires 6 shims from ./_internal/ (bypass, ingest,
    // forwardTarget, aliasConfig, standaloneRouting, rootCaShim) which the MITM
    // child process loads via require(). Next.js's standalone tracer never sees
    // them (server.cjs is a separate node process, not imported by the main
    // server), so the _internal/ directory must be copied explicitly or the MITM
    // child crashes with MODULE_NOT_FOUND at boot.
    label: "MITM _internal shims (#9451)",
    src: ["src", "mitm", "_internal"],
    dest: ["src", "mitm", "_internal"],
  },
  {
    // #9451: rootCaShim.cjs does `await import("selfsigned")` for dynamic SSL
    // certificate generation. The MITM child is not traced by Next.js, so the
    // package is absent from the Docker standalone bundle without this entry.
    label: "selfsigned (MITM rootCaShim dynamic import — #9451)",
    src: ["node_modules", "selfsigned"],
    dest: ["node_modules", "selfsigned"],
  },
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
    label: "main-server timeouts (server-ws.mjs dependency, #7003/#7065-class)",
    src: ["scripts", "dev", "main-server-timeouts.mjs"],
    dest: ["main-server-timeouts.mjs"],
  },
  {
    label: "systemd sd_notify helper (server-ws.mjs dependency)",
    src: ["scripts", "dev", "systemd-notify.mjs"],
    dest: ["systemd-notify.mjs"],
  },
  {
    label: "HTTP method guard (server-ws.mjs dependency)",
    src: ["scripts", "dev", "http-method-guard.cjs"],
    dest: ["http-method-guard.cjs"],
  },
  {
    label: "HEAD response guard (server-ws.mjs dependency)",
    src: ["scripts", "dev", "head-response-guard.cjs"],
    dest: ["head-response-guard.cjs"],
  },
  {
    label: "responses-ws-proxy (server-ws.mjs dependency)",
    src: ["scripts", "dev", "responses-ws-proxy.mjs"],
    dest: ["responses-ws-proxy.mjs"],
  },
  {
    label: "ChatGPT Web Codex MCP tunnel entrypoint",
    src: ["bin", "chatgpt-web-codex-mcp.mjs"],
    dest: ["bin", "chatgpt-web-codex-mcp.mjs"],
  },
  {
    label: "webdav-handler (server-ws.mjs dependency)",
    src: ["scripts", "dev", "webdav-handler.mjs"],
    dest: ["webdav-handler.mjs"],
  },
  {
    // #5242: opt-in HTTPS/TLS resolver (server-ws.mjs dependency).
    label: "tls-options (server-ws.mjs dependency)",
    src: ["scripts", "dev", "tls-options.mjs"],
    dest: ["tls-options.mjs"],
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
    label: "normalizeBasePath helper",
    src: ["scripts", "build", "normalizeBasePath.mjs"],
    dest: ["build", "normalizeBasePath.mjs"],
  },
  {
    label: "docker basePath entrypoint",
    src: ["scripts", "docker", "ensure-docker-base-path.mjs"],
    dest: ["docker", "ensure-docker-base-path.mjs"],
  },
  {
    label: "docker basePath patcher",
    src: ["scripts", "docker", "patch-standalone-base-path.mjs"],
    dest: ["docker", "patch-standalone-base-path.mjs"],
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
    // esbuild's `--packages=external` leaves `undici` as a static top-level ESM
    // import in the compiled MCP server bundle (dist/open-sse/mcp-server/server.js),
    // resolved at module-link time. Next.js's standalone output-file tracer (nft)
    // sometimes emits a hollow dist/node_modules/undici/ (package.json only), which
    // SHADOWS the fully-populated sibling node_modules/undici and crashes
    // `omniroute --mcp` at startup. See #7701.
    label: "undici (MCP server static import — #7701)",
    src: ["node_modules", "undici"],
    dest: ["node_modules", "undici"],
  },
  {
    // Turbopack's standalone tracer can emit a hollow node_modules/ws/ directory
    // for the externalized `ws` package (no package.json / index.js), which then
    // shadows the real install at runtime and crashes instrumentation with:
    // "Cannot find package '<bundle>/node_modules/ws/index.js'" (#OmniRoute v3.8.50 live bug).
    // Overlay the full source package so the bundled server resolves the real entrypoint.
    label: "ws (externalized runtime package shadow fix)",
    src: ["node_modules", "ws"],
    dest: ["node_modules", "ws"],
  },
  {
    label: "sql.js WASM fallback runtime",
    src: ["node_modules", "sql.js"],
    dest: ["node_modules", "sql.js"],
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
 * Copy native standalone assets (better-sqlite3 build/prebuilds and TPROXY).
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
    // See resolvesToSamePath/clearStaleDest (sync copy path, same module) — the same
    // ERR_FS_CP_EINVAL/ERR_FS_CP_DIR_TO_NON_DIR races apply to fsImpl.cp here.
    if (resolvesToSamePath(sourcePath, destinationPath)) continue;
    clearStaleDest(destinationPath);

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
    if (resolvesToSamePath(sourcePath, destPath)) continue;
    clearStaleDest(destPath);

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
    stampServiceWorkerBuildId(resolvedOutDir);
  }
}

/**
 * The service-worker update algorithm compares the BYTES of the fetched worker
 * script against the installed worker; a changed query string only busts the
 * HTTP cache, it does not make the browser install a new generation. So a
 * build identifier has to be part of the sw.js bytes themselves. Stamp
 * NEXT_PUBLIC_SW_BUILD_ID (same resolution chain as next.config.mjs) into the
 * copied sw.js as a comment + CACHE_NAME suffix; the source file in public/
 * stays generic for dev.
 */
function stampServiceWorkerBuildId(resolvedOutDir) {
  const swDest = path.join(resolvedOutDir, "public", "sw.js");
  if (!fsSync.existsSync(swDest)) return;
  const buildId =
    process.env.OMNIROUTE_SW_BUILD_ID || process.env.SOURCE_VERSION || String(Date.now());
  let sw = fsSync.readFileSync(swDest, "utf8");
  sw = sw.replace(
    /^const CACHE_NAME = "omniroute-pwa-v3";$/m,
    `const CACHE_NAME = "omniroute-pwa-v3-${buildId}"; // build ${buildId}`
  );
  fsSync.writeFileSync(swDest, sw);
}

/**
 * Two independent copy passes assemble a bundle: the bulk "standalone -> outDir" tree
 * copy (step 1 of assembleStandalone) can already have carried a prior entry's result
 * into `dest` (e.g. an absolute pnpm-store symlink, or a directory) BEFORE this entry's
 * own copy runs. `fs.cpSync`/`fs.cp` refuse to overwrite in two such cases even with
 * `force: true`:
 *   - dest already resolves (via symlink chain) to the exact same real path as src ->
 *     ERR_FS_CP_EINVAL "src and dest cannot be the same".
 *   - dest exists with a different node type than src (file/symlink vs directory) ->
 *     ERR_FS_CP_DIR_TO_NON_DIR / ERR_FS_CP_NON_DIR_TO_DIR.
 * Under heavy concurrent build I/O this manifested non-deterministically across
 * different EXTRA_MODULE_ENTRIES/NATIVE_ASSET_ENTRIES on every retry. Resolve both
 * cases up front: skip entirely when dest is already the right target, otherwise clear
 * whatever stale node occupies dest (via lstat, so it also removes a broken symlink)
 * so the fresh copy always lands cleanly.
 *
 * @param {string} src
 * @param {string} dest
 * @returns {boolean} true when dest already IS src's target and no copy is needed
 */
function resolvesToSamePath(src, dest) {
  if (path.resolve(src) === path.resolve(dest)) return true;
  if (!fsSync.existsSync(dest)) return false;
  try {
    return fsSync.realpathSync(src) === fsSync.realpathSync(dest);
  } catch {
    return false;
  }
}

/** @see resolvesToSamePath — clears whatever stale node sits at `dest` before a copy. */
function clearStaleDest(dest) {
  try {
    fsSync.lstatSync(dest);
  } catch {
    return;
  }
  fsSync.rmSync(dest, { recursive: true, force: true });
}

/**
 * Copy native assets (better-sqlite3 and TPROXY) and extra runtime modules/sidecars
 * (wreq-js, pino, migrations, MITM server, helper scripts, sqlite-vec platform packages, …)
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
    if (resolvesToSamePath(src, dest)) continue;
    clearStaleDest(dest);
    fsSync.mkdirSync(path.dirname(dest), { recursive: true });
    fsSync.cpSync(src, dest, { recursive: true, force: true });
    console.log(`[assembleStandalone] Copied native asset: ${asset.label}`);
  }

  for (const mod of EXTRA_MODULE_ENTRIES) {
    const src = path.join(projectRoot, ...mod.src);
    if (!fsSync.existsSync(src)) continue;
    const dest = path.join(resolvedOutDir, ...mod.dest);
    if (resolvesToSamePath(src, dest)) continue;
    clearStaleDest(dest);
    fsSync.mkdirSync(path.dirname(dest), { recursive: true });
    fsSync.cpSync(src, dest, { recursive: true, force: true });
    console.log(`[assembleStandalone] Synced module: ${mod.label}`);
  }
}

/**
 * Next/Turbopack standalone output can leave behind hollow top-level package
 * directories for externalized runtime deps (directory exists, but contains no
 * files). Those empty placeholders shadow the real repo-level install and make
 * runtime ESM externals fail with "Cannot find package '<bundle>/node_modules/<pkg>/index.js'"
 * even though the dependency is present in the source tree.
 *
 * Repair strategy: for each empty top-level package dir already present in the
 * assembled bundle, if the same package exists in the project root node_modules,
 * replace the hollow directory with a full recursive copy from the source install.
 * This keeps the fix narrowly scoped to packages the standalone already expects.
 *
 * @param {string} projectRoot
 * @param {string} bundleNodeModules
 * @returns {{repaired: number, packages: string[]}}
 */
function repairEmptyExternalPackageDirs(projectRoot, bundleNodeModules) {
  const summary = { repaired: 0, packages: [] };
  const sourceNodeModules = path.join(projectRoot, "node_modules");
  if (!fsSync.existsSync(bundleNodeModules) || !fsSync.existsSync(sourceNodeModules)) {
    return summary;
  }

  for (const name of fsSync.readdirSync(bundleNodeModules)) {
    if (name.startsWith(".") || name.startsWith("@")) continue;

    const bundlePkgDir = path.join(bundleNodeModules, name);
    const sourcePkgDir = path.join(sourceNodeModules, name);

    let bundleStat;
    try {
      bundleStat = fsSync.statSync(bundlePkgDir);
    } catch {
      continue;
    }
    if (!bundleStat.isDirectory()) continue;

    let bundleEntries = [];
    try {
      bundleEntries = fsSync.readdirSync(bundlePkgDir);
    } catch {
      continue;
    }
    if (bundleEntries.length > 0 || !fsSync.existsSync(sourcePkgDir)) continue;

    let sourceStat;
    try {
      sourceStat = fsSync.statSync(sourcePkgDir);
    } catch {
      continue;
    }
    if (!sourceStat.isDirectory()) continue;
    // See resolvesToSamePath/clearStaleDest above: bundlePkgDir can itself be a
    // symlink to sourcePkgDir's realpath whose target momentarily read as empty
    // under heavy concurrent build I/O (a transient readdirSync race, not a real
    // hollow placeholder), or a stale non-directory node from an earlier pass.
    if (resolvesToSamePath(sourcePkgDir, bundlePkgDir)) continue;
    clearStaleDest(bundlePkgDir);

    fsSync.cpSync(sourcePkgDir, bundlePkgDir, { recursive: true, force: true });
    summary.repaired += 1;
    summary.packages.push(name);
  }

  return summary;
}

/**
 * Materialize Turbopack "hashed external module" symlinks inside a bundled
 * node_modules dir into real, self-contained directories.
 *
 * Next.js/Turbopack standalone output emits entries like
 *   better-sqlite3-90e2652d1716b047 -> <buildMachineAbsPath>/node_modules/better-sqlite3
 * as ABSOLUTE symlinks into the build machine's tree. cpSync preserves symlinks and
 * electron-builder preserves extraResources symlinks verbatim, so the packaged app
 * ships dangling links pointing at e.g. /Users/runner/work/... On the end-user machine
 * those targets don't exist → the instrumentation hook throws
 * ERR_MODULE_NOT_FOUND: Cannot find package 'ws-<hash>' → server boot fails.
 * (issues #6724, #6594). Windows is doubly broken because it can't follow POSIX
 * symlinks at all.
 *
 * The fix: for every symlink under the given node_modules (top level + one level of
 * scoped @scope/ dirs), replace it with a REAL directory copy of its dereferenced
 * target — a dereference is the only option that is correct on every OS (Windows
 * included) and survives the machine that built it. If the link is already dangling
 * (target absent), fall back to copying a sibling real package whose name is the
 * hashed name with its trailing `-<hex>` suffix stripped; if none exists, drop the
 * dangling link so it cannot poison module resolution.
 *
 * @param {string} nodeModulesDir - absolute path to a bundled node_modules directory
 * @returns {{ materialized: number, relinked: number, removed: number }}
 */
export function materializeBundledSymlinks(nodeModulesDir) {
  const summary = { materialized: 0, relinked: 0, removed: 0 };
  if (!fsSync.existsSync(nodeModulesDir)) return summary;

  const entries = [];
  for (const name of fsSync.readdirSync(nodeModulesDir)) {
    const entryPath = path.join(nodeModulesDir, name);
    if (name.startsWith("@") && fsSync.lstatSync(entryPath).isDirectory()) {
      // Scoped packages live one level deeper (@scope/pkg).
      for (const scoped of fsSync.readdirSync(entryPath)) {
        entries.push(path.join(entryPath, scoped));
      }
      continue;
    }
    entries.push(entryPath);
  }

  for (const entryPath of entries) {
    let stat;
    try {
      stat = fsSync.lstatSync(entryPath);
    } catch {
      continue;
    }
    if (!stat.isSymbolicLink()) continue;

    let realTarget = null;
    try {
      realTarget = fsSync.realpathSync(entryPath);
    } catch {
      realTarget = null;
    }

    if (realTarget && fsSync.existsSync(realTarget)) {
      // Dereference: copy the resolved real files in place of the link.
      fsSync.rmSync(entryPath, { recursive: true, force: true });
      fsSync.cpSync(realTarget, entryPath, { recursive: true, dereference: true });
      summary.materialized += 1;
      continue;
    }

    // Dangling link (e.g. absolute path into the build machine that no longer
    // exists). Try a sibling real package named without the trailing -<hex> hash.
    const baseName = path.basename(entryPath).replace(/-[0-9a-f]{8,}$/i, "");
    const sibling = path.join(path.dirname(entryPath), baseName);
    if (baseName !== path.basename(entryPath) && fsSync.existsSync(sibling)) {
      let siblingStat = null;
      try {
        siblingStat = fsSync.lstatSync(sibling);
      } catch {
        siblingStat = null;
      }
      if (siblingStat && siblingStat.isDirectory()) {
        fsSync.rmSync(entryPath, { recursive: true, force: true });
        fsSync.cpSync(sibling, entryPath, { recursive: true, dereference: true });
        summary.relinked += 1;
        continue;
      }
    }

    // Nothing to resolve to — drop the dangling link so it cannot shadow resolution.
    console.warn(
      `[assembleStandalone] Dropping dangling module symlink (target missing): ${entryPath}`
    );
    fsSync.rmSync(entryPath, { recursive: true, force: true });
    summary.removed += 1;
  }

  return summary;
}

/**
 * Sync an Electron-ABI-rebuilt native module into any hashed/plain copies of
 * that module already materialized inside a nested node_modules dir.
 *
 * materializeBundledSymlinks() turns Turbopack hashed-module symlinks (e.g.
 * `better-sqlite3-90e2652d1716b047`) into real directory copies of the
 * Node-ABI build. A later step in prepare-electron-standalone.mjs rebuilds
 * better-sqlite3 against the Electron ABI at the bundle root — but the
 * hashed copy under the nested node_modules still holds the stale Node-ABI
 * build, and the server's hashed `require("better-sqlite3-<hash>")` resolves
 * to it, not the rebuilt root module. Previously that hashed copy was simply
 * deleted, which caused MODULE_NOT_FOUND and a silent fallback to the sql.js
 * WASM driver in the packaged app (issue #6794 follow-up). Overwriting each
 * matching entry with the rebuilt root module keeps the hashed require
 * resolving to a working, ABI-correct native driver instead.
 *
 * @param {string} rootModuleDir - absolute path to the already-rebuilt module (e.g. <standalone>/node_modules/better-sqlite3)
 * @param {string} nodeModulesDir - absolute path to the nested node_modules dir to scan
 * @returns {{ synced: number }}
 */
export function syncRebuiltNativeModuleIntoHashedEntries(rootModuleDir, nodeModulesDir) {
  const summary = { synced: 0 };
  if (!fsSync.existsSync(rootModuleDir) || !fsSync.existsSync(nodeModulesDir)) return summary;

  const baseName = path.basename(rootModuleDir);
  const pattern = new RegExp(`^${baseName}(-[0-9a-f]{8,})?$`, "i");

  for (const name of fsSync.readdirSync(nodeModulesDir)) {
    if (!pattern.test(name)) continue;
    const entryPath = path.join(nodeModulesDir, name);
    fsSync.rmSync(entryPath, { recursive: true, force: true });
    fsSync.cpSync(rootModuleDir, entryPath, { recursive: true, dereference: true });
    summary.synced += 1;
  }

  return summary;
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
 * @param {boolean} [opts.materializeSymlinks]   - dereference Turbopack hashed-module symlinks in node_modules (default false)
 * @returns {void}
 */
export function assembleStandalone({
  distDir,
  outDir,
  projectRoot = process.cwd(),
  sanitizePaths = false,
  patchTurbopackChunks: doPatchChunks = false,
  copyNatives = true,
  materializeSymlinks = false,
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
    // Repair hollow externalized package dirs in BOTH locations Turbopack's standalone
    // tracer can populate: the top-level bundle node_modules, and — for projects with a
    // custom distDir (see next.config.mjs) — the nested <relDistDir>/node_modules mirrored
    // alongside the traced server chunks. materializeBundledSymlinks (step 7 below) already
    // treats these as two distinct targets; #9913 only covered the top-level one, which left
    // the nested location's hollow dirs unrepaired (#7346).
    for (const bundleNodeModules of [
      path.join(resolvedOutDir, "node_modules"),
      path.join(resolvedOutDir, relDistDir, "node_modules"),
    ]) {
      const emptyPkgRepair = repairEmptyExternalPackageDirs(projectRoot, bundleNodeModules);
      if (emptyPkgRepair.repaired > 0) {
        console.log(
          `[assembleStandalone] Repaired ${emptyPkgRepair.repaired} hollow external package dir(s) in ` +
            `${path.relative(resolvedOutDir, bundleNodeModules) || "."}: ${emptyPkgRepair.packages.join(", ")}`
        );
      }
    }

    // #9166: dynamically imported LLMLingua packages are not reliably traced
    // into the standalone bundle. Copy their complete dependency closure from
    // the installed root tree without overwriting packages already traced by
    // Next.js. Include transformers here so its ONNX runtime closure is also
    // guaranteed in Docker/standalone builds.
    colocateLlmlinguaOptionals({
      rootDir: projectRoot,
      targetNodeModulesDir: path.join(resolvedOutDir, "node_modules"),
      seeds: [...SEED_PACKAGES, "@huggingface/transformers"],
      log: (message) => console.log(`[assembleStandalone] ${message.trim()}`),
    });
  }

  // 7. Optionally dereference Turbopack hashed-module symlinks so the bundle is
  //    self-contained (no absolute links into the build machine). Runs AFTER the
  //    native/extra-module copy so the sibling-package relink fallback can find
  //    real packages. See materializeBundledSymlinks + issues #6724, #6594.
  if (materializeSymlinks) {
    for (const nmDir of [
      path.join(resolvedOutDir, "node_modules"),
      path.join(resolvedOutDir, relDistDir, "node_modules"),
    ]) {
      const s = materializeBundledSymlinks(nmDir);
      if (s.materialized || s.relinked || s.removed) {
        console.log(
          `[assembleStandalone] Materialized module symlinks in ${path.relative(resolvedOutDir, nmDir) || "."}: ` +
            `${s.materialized} dereferenced, ${s.relinked} relinked, ${s.removed} dropped`
        );
      }
    }
  }
}
