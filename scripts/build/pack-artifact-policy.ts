/**
 * Shared policy for OmniRoute npm publish artifact hygiene.
 *
 * The package publishes the standalone runtime under dist/ (Layer 1: renamed from app/).
 * This policy keeps local backups, QA scratch files, and development-only
 * directories out of the staged dist/ tree and out of the final tarball.
 */

const STAGING_FORBIDDEN_DIRECTORIES = [
  "app.__qa_backup",
  "coverage",
  "electron",
  "logs",
  "scripts/scratch",
  "tests",
  "vscode-extension",
  "_ideia",
  "_mono_repo",
  "_references",
  "_tasks",
];

const STAGING_FORBIDDEN_FILES = ["audit-report.json", "package-lock.json"];

export const APP_STAGING_REMOVAL_PATHS: string[] = [
  ...STAGING_FORBIDDEN_DIRECTORIES,
  ...STAGING_FORBIDDEN_FILES,
  // onnxruntime CUDA provider binary (~316 MB) inflates the npm tarball
  // past the registry 413 limit for npm.org.  It's only needed on systems
  // with a CUDA GPU — users install CUDA providers separately.
  "node_modules/onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime_providers_cuda.so",
];

export const APP_STAGING_ALLOWED_EXACT_PATHS: string[] = [
  ".env.example",
  "BUILD_SHA",
  "docs/openapi.yaml",
  // #7065: imported by dist/server-ws.mjs; assembleStandalone copies it but without
  // this bare entry the prepublish prune deleted it → every `omniroute` boot of the
  // published 3.8.47 crashed with ERR_MODULE_NOT_FOUND (same class as tls-options/3.8.41).
  "head-response-guard.cjs",
  "http-method-guard.cjs",
  "open-sse/mcp-server/server.js",
  "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.js",
  // LLMLingua ONNX worker — esbuild'd standalone .js spawned via worker_threads
  // (the Next.js bundler can't trace the computed Worker path). Kept like the MCP server.
  "open-sse/services/compression/engines/llmlingua/onnxWorker.js",
  "open-sse/services/compression/compressionWorker.js",
  "src/lib/usage/callLogArtifactWorker.js",
  "package.json",
  "peer-stamp.mjs",
  "main-server-timeouts.mjs",
  // server-ws.mjs import (sd_notify helper) — enforced by the closure test
  // tests/unit/pack-artifact-server-ws-closure.test.ts.
  "systemd-notify.mjs",
  "responses-ws-proxy.mjs",
  "bin/chatgpt-web-codex-mcp.mjs",
  "scripts/dev/sync-env.mjs",
  "scripts/dev/tls-options.mjs",
  "server.js",
  "server-ws.mjs",
  // #5452: dist/tls-options.mjs is copied by assembleStandalone (EXTRA_MODULE_ENTRIES)
  // and imported by dist/server-ws.mjs for opt-in native HTTPS/TLS (#5361). Without
  // this bare entry the prepublish prune (Step 10.7) deletes it → `omniroute serve`
  // crashes with ERR_MODULE_NOT_FOUND (regressed in the published 3.8.41 tarball).
  "tls-options.mjs",
  "webdav-handler.mjs",
];

export const APP_STAGING_ALLOWED_PATH_PREFIXES: string[] = [
  // Layer 1: Next.js distDir changed from ".next" to ".build/next"; the server
  // bundle now lives under .build/next/ inside the standalone output.
  ".build/next/",
  ".next/",
  "data/",
  "node_modules/",
  "open-sse/services/compression/engines/rtk/filters/",
  "open-sse/services/compression/rules/",
  "public/",
  "src/lib/db/migrations/",
  "src/mitm/",
];

export const PACK_ARTIFACT_ALLOWED_EXACT_PATHS: string[] = APP_STAGING_ALLOWED_EXACT_PATHS.map(
  (filePath: string) => `dist/${filePath}`
);

export const PACK_ARTIFACT_ALLOWED_PATH_PREFIXES: string[] = APP_STAGING_ALLOWED_PATH_PREFIXES.map(
  (directoryPath: string) => `dist/${directoryPath}`
);

export const PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS: string[] = [
  ".env.example",
  "LICENSE",
  "README.md",
  "THIRD_PARTY_NOTICES.md",
  "config/release/wreq-js-native-manifest.json",
  "config/release/wreq-js-rust-license-inventory.json",
  "config/release/wreq-js-rust-notices.md",
  "bin/aliasResolver.mjs",
  "bin/chatgpt-web-codex-mcp.mjs",
  // #7808: ESM loader hook split out of bin/aliasResolver.mjs to silence CodeQL
  // js/incomplete-url-substring-sanitization (the old code built a
  // `data:text/javascript,...` URL dynamically). Loaded via pathToFileURL() at
  // runtime; shipped via package.json "files", so it must be allowed here.
  "bin/aliasResolverHook.mjs",
  "bin/mcp-server.mjs",
  // #9281: stdout/stderr console guard preloaded via `node --import` by
  // bin/mcp-server.mjs before the MCP entry's module graph evaluates — without it
  // the published CLI's `omniroute --mcp` crashes on the pathToFileURL() import.
  "bin/mcpStdioConsoleGuard.mjs",
  "bin/nodeRuntimeSupport.mjs",
  "bin/omniroute.mjs",
  "bin/reset-password.mjs",
  // Operator incident-recovery / cold-start shell tooling (rollback, snapshot,
  // restore, cold-start bench) shipped in bin/ for self-hosters — not imported by
  // the runtime. Included via the package.json "files": ["bin/"] entry, so they
  // must be allowed here. Each script is self-documenting via --help.
  "bin/_ops-common.sh",
  "bin/cold-start-bench.sh",
  "bin/restore-data.sh",
  "bin/restore-policies.sh",
  "bin/rollback.sh",
  "bin/snapshot-data.sh",
  // Locale source of truth read at runtime by bin/cli/i18n.mjs (OMNIROUTE_LANG alias
  // resolution: uk → uk-UA, fil/tl → phi, zh-hk/zh-mo/zh-hant → zh-TW) and by
  // bin/cli/commands/config.mjs (`config lang list`). Shipped via package.json "files";
  // without it the published CLI cannot resolve aliases and `config lang list` is empty.
  "config/i18n.json",
  "open-sse/mcp-server/README.md",
  "open-sse/mcp-server/audit.ts",
  "open-sse/mcp-server/httpTransport.ts",
  "open-sse/mcp-server/index.ts",
  "open-sse/mcp-server/runtimeHeartbeat.ts",
  "open-sse/mcp-server/scopeEnforcement.ts",
  "open-sse/mcp-server/server.ts",
  // Runtime polyfill eagerly imported by bin/omniroute.mjs (Node <22 compat);
  // shipped via package.json "files", so it must be allowed in the tarball.
  "open-sse/utils/setupPolyfill.ts",
  "package.json",
  "scripts/build/assembleStandalone.mjs",
  "scripts/build/backendOnlyPages.mjs",
  "scripts/build/build-tproxy-native.mjs",
  "scripts/build/build-next-isolated.mjs",
  "scripts/check/check-supported-node-runtime.ts",
  "scripts/build/native-binary-compat.mjs",
  "scripts/build/wreqJsNative.mjs",
  "scripts/build/postinstall.mjs",
  "scripts/build/postinstallSupport.mjs",
  "scripts/build/colocateOptionals.mjs",
  // #8859: imported by scripts/build/postinstall.mjs to repair playwright-core's
  // browser resolution on Termux/Android (no glibc, no bundled browsers).
  "scripts/build/fixPlaywrightAndroid.mjs",
  // #5227: imported at runtime by bin/cli/commands/serve.mjs (heap auto-calibration).
  "scripts/build/runtime-env.mjs",
  // #10382: imported at runtime by bin/cli/commands/packs.mjs (optional ML/browser
  // runtime pack management) — shipped via package.json "files", so must be allowed.
  "scripts/packs/optionalPackInstaller.mjs",
  "scripts/packs/optionalPackManifest.mjs",
  "scripts/build/sync-env.mjs",
  "scripts/dev/responses-ws-proxy.mjs",
  "scripts/dev/sync-env.mjs",
  // #5361: imported at runtime by bin/cli/commands/serve.mjs + the standalone
  // server wrapper for opt-in native HTTPS/TLS serving (kept dependency-light).
  "scripts/dev/tls-options.mjs",
  "scripts/postinstall.mjs",
  "src/shared/utils/nodeRuntimeSupport.ts",
];

export const PACK_ARTIFACT_ROOT_ALLOWED_PATH_PREFIXES: string[] = [
  "@omniroute/opencode-plugin/",
  "@omniroute/opencode-provider/",
  "bin/cli/",
  // Broad open-sse + src source dirs added to package.json "files" in v3.8.21
  // to allow TypeScript-first imports from the published package.
  "open-sse/",
  "src/domain/",
  "src/lib/",
  "src/models/",
  "src/mitm/",
  "src/server/",
  "src/shared/",
  "src/sse/",
  "src/types/",
];

export const PACK_ARTIFACT_REQUIRED_PATHS: string[] = [
  "dist/open-sse/services/compression/engines/rtk/filters/generic-output.json",
  "dist/src/lib/usage/callLogArtifactWorker.js",
  "dist/open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.js",
  "dist/open-sse/services/compression/rules/en/filler.json",
  "dist/server.js",
  "dist/server-ws.mjs",
  "dist/responses-ws-proxy.mjs",
  "dist/peer-stamp.mjs",
  "dist/main-server-timeouts.mjs",
  // server-ws.mjs import (sd_notify helper) — enforced by the closure test.
  "dist/systemd-notify.mjs",
  "dist/http-method-guard.cjs",
  // #5452: regression guard — make check:pack-artifact fail loudly if the TLS
  // opt-in sidecar (imported by dist/server-ws.mjs) ever vanishes from the tarball.
  "dist/tls-options.mjs",
  // #7065: regression guard for the HEAD response guard (dist/server-ws.mjs import).
  "dist/head-response-guard.cjs",
  "dist/webdav-handler.mjs",
  "bin/cli/program.mjs",
  // Direct imports of bin/omniroute.mjs — bin/cli/ is only an allowlist PREFIX, so a
  // file vanishing from the tarball never fails the unexpected-paths check; only these
  // required entries make its absence loud (#7065 class; derived + enforced by
  // tests/unit/pack-artifact-entrypoint-closures.test.ts).
  "bin/cli/data-dir.mjs",
  "bin/cli/utils/ensureAndroidCacheDir.mjs",
  "bin/cli/utils/parseEnvValue.mjs",
  "bin/cli/utils/storageKeyProvision.mjs",
  "bin/cli/utils/versionFastPath.mjs",
  // #11437 import — `describeVolatileEnvWarning`, called on every CLI boot.
  "bin/cli/utils/volatileEnvPath.mjs",
  "bin/mcp-server.mjs",
  // #9281: stdout/stderr console guard preloaded via `node --import` by
  // bin/mcp-server.mjs before the MCP entry's module graph evaluates — without it
  // the published CLI's `omniroute --mcp` crashes on the pathToFileURL() import.
  "bin/mcpStdioConsoleGuard.mjs",
  "bin/nodeRuntimeSupport.mjs",
  "bin/omniroute.mjs",
  // #7808: aliasResolver + its hook file. bin/omniroute.mjs imports
  // bin/aliasResolver.mjs at startup, which in turn registers
  // bin/aliasResolverHook.mjs as the ESM loader. Both must ship in the tarball
  // or the CLI fails to boot — list them REQUIRED so a regression is loud.
  "bin/aliasResolver.mjs",
  "bin/aliasResolverHook.mjs",
  // Locale aliases consumed by bin/cli/i18n.mjs at runtime. config/ is not an allowlist
  // PREFIX, so a vanished file would never fail the unexpected-paths check — list it
  // REQUIRED so the tarball can never silently lose it again (#7065 class).
  "config/i18n.json",
  "config/release/wreq-js-native-manifest.json",
  "config/release/wreq-js-rust-license-inventory.json",
  "config/release/wreq-js-rust-notices.md",
  "package.json",
  "scripts/build/native-binary-compat.mjs",
  "scripts/build/postinstall.mjs",
  "scripts/build/postinstallSupport.mjs",
  "scripts/build/colocateOptionals.mjs",
  "scripts/build/runtime-env.mjs",
  "scripts/build/wreqJsNative.mjs",
  // #10382: runtime imports of bin/cli/commands/packs.mjs (optional packs CLI) —
  // listed REQUIRED so their absence from the tarball fails loudly.
  "scripts/packs/optionalPackInstaller.mjs",
  "scripts/packs/optionalPackManifest.mjs",
  "src/shared/utils/nodeRuntimeSupport.ts",
];

PACK_ARTIFACT_ALLOWED_EXACT_PATHS.push(...PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS);
PACK_ARTIFACT_ALLOWED_PATH_PREFIXES.push(...PACK_ARTIFACT_ROOT_ALLOWED_PATH_PREFIXES);

export function normalizeArtifactPath(filePath: string): string {
  return String(filePath || "")
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")
    .replace(/\/{2,}/g, "/");
}

/** Extract complete JSON values from npm's mixed stdout/stderr-style output. */
export function parseJsonValuesOutput(output: string): unknown[] {
  const values: unknown[] = [];
  for (let start = 0; start < output.length; start++) {
    if (output[start] !== "[" && output[start] !== "{") continue;

    const stack: string[] = [];
    let inString = false;
    let escaped = false;
    for (let end = start; end < output.length; end++) {
      const char = output[end];
      if (inString) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') inString = false;
        continue;
      }
      if (char === '"') {
        inString = true;
      } else if (char === "[" || char === "{") {
        stack.push(char);
      } else if (char === "]" || char === "}") {
        const expectedOpen = char === "]" ? "[" : "{";
        if (stack.at(-1) !== expectedOpen) break;
        stack.pop();
        if (stack.length === 0) {
          try {
            const parsed: unknown = JSON.parse(output.slice(start, end + 1));
            values.push(parsed);
            start = end;
          } catch {
            // This bracket pair was not a complete JSON value; continue scanning.
          }
          break;
        }
      }
    }
  }
  return values;
}

/** Extract the first matching JSON array from npm's mixed stdout/stderr-style output. */
export function parseJsonArrayOutput(
  output: string,
  matches: (parsed: unknown[]) => boolean = () => true
): unknown[] {
  const parsed = parseJsonValuesOutput(output).find(
    (value): value is unknown[] => Array.isArray(value) && matches(value)
  );
  if (!parsed) throw new Error("Expected a valid JSON array in command output.");
  return parsed;
}

/**
 * Paths that are NEVER publishable, whatever the allowlist says.
 *
 * Existence reason: the allowlist grants whole prefixes (e.g.
 * `@omniroute/opencode-provider/`), so a nested `node_modules` inside an allowed
 * prefix used to be authorized by it. That shipped 79 MB of devDependencies
 * (tsup/esbuild/typescript) — 80% of the tarball — whenever the publish ran from
 * a machine where someone had installed inside that subpackage. `files[]` in
 * package.json now excludes it at the source; this is the gate that FAILS if it
 * ever comes back instead of silently allowing it.
 */
export const PACK_ARTIFACT_NEVER_ALLOWED_SEGMENTS: string[] = ["node_modules"];

export function findUnexpectedArtifactPaths(
  filePaths: string[],
  {
    exactPaths = [],
    prefixPaths = [],
    // #9985: the app-STAGING prune (prepublish Step 10.7) must be able to opt out
    // of the node_modules segment ban — the standalone server's runtime deps live
    // under dist/node_modules and Turbopack-hashed dirs (.build/next/node_modules/
    // sql.js-*/dist/sql-wasm.wasm, transformers ort-wasm). Pruning them 500'd every
    // DB-backed route in packaged boots while /api/monitoring/health stayed green.
    // The PUBLISH gate (validate-pack-artifact) keeps the strict default.
    neverAllowedSegments = PACK_ARTIFACT_NEVER_ALLOWED_SEGMENTS,
  }: {
    exactPaths?: string[];
    prefixPaths?: string[];
    neverAllowedSegments?: string[];
  } = {}
): string[] {
  const normalizedExact = new Set(exactPaths.map(normalizeArtifactPath));
  const normalizedPrefixes = prefixPaths.map(normalizeArtifactPath);

  const hasForbiddenSegment = (filePath: string): boolean =>
    filePath.split("/").some((segment) => neverAllowedSegments.includes(segment));

  return filePaths
    .map(normalizeArtifactPath)
    .filter(Boolean)
    .filter(
      (filePath) =>
        hasForbiddenSegment(filePath) ||
        (!normalizedExact.has(filePath) &&
          !normalizedPrefixes.some((prefix) => filePath.startsWith(prefix)))
    )
    .sort();
}

export function findMissingArtifactPaths(
  filePaths: string[],
  requiredPaths: string[] = []
): string[] {
  const normalizedPaths = new Set(filePaths.map(normalizeArtifactPath).filter(Boolean));
  return requiredPaths
    .map(normalizeArtifactPath)
    .filter(Boolean)
    .filter((requiredPath) => !normalizedPaths.has(requiredPath))
    .sort();
}
