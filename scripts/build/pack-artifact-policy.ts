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
  "http-method-guard.cjs",
  "open-sse/mcp-server/server.js",
  // LLMLingua ONNX worker — esbuild'd standalone .js spawned via worker_threads
  // (the Next.js bundler can't trace the computed Worker path). Kept like the MCP server.
  "open-sse/services/compression/engines/llmlingua/onnxWorker.js",
  "package.json",
  "peer-stamp.mjs",
  "responses-ws-proxy.mjs",
  "scripts/dev/sync-env.mjs",
  "server.js",
  "server-ws.mjs",
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
  "bin/mcp-server.mjs",
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
  "scripts/build/build-next-isolated.mjs",
  "scripts/check/check-supported-node-runtime.ts",
  "scripts/build/native-binary-compat.mjs",
  "scripts/build/postinstall.mjs",
  "scripts/build/postinstallSupport.mjs",
  "scripts/build/colocateOptionals.mjs",
  // #5227: imported at runtime by bin/cli/commands/serve.mjs (heap auto-calibration).
  "scripts/build/runtime-env.mjs",
  "scripts/build/sync-env.mjs",
  "scripts/dev/responses-ws-proxy.mjs",
  "scripts/dev/sync-env.mjs",
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
  "dist/open-sse/services/compression/rules/en/filler.json",
  "dist/server.js",
  "dist/server-ws.mjs",
  "dist/responses-ws-proxy.mjs",
  "dist/peer-stamp.mjs",
  "dist/http-method-guard.cjs",
  "dist/webdav-handler.mjs",
  "bin/cli/program.mjs",
  "bin/mcp-server.mjs",
  "bin/nodeRuntimeSupport.mjs",
  "bin/omniroute.mjs",
  "package.json",
  "scripts/build/native-binary-compat.mjs",
  "scripts/build/postinstall.mjs",
  "scripts/build/postinstallSupport.mjs",
  "scripts/build/colocateOptionals.mjs",
  "scripts/build/runtime-env.mjs",
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

export function findUnexpectedArtifactPaths(
  filePaths: string[],
  { exactPaths = [], prefixPaths = [] }: { exactPaths?: string[]; prefixPaths?: string[] } = {}
): string[] {
  const normalizedExact = new Set(exactPaths.map(normalizeArtifactPath));
  const normalizedPrefixes = prefixPaths.map(normalizeArtifactPath);

  return filePaths
    .map(normalizeArtifactPath)
    .filter(Boolean)
    .filter(
      (filePath) =>
        !normalizedExact.has(filePath) &&
        !normalizedPrefixes.some((prefix) => filePath.startsWith(prefix))
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
