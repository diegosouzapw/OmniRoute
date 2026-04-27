/**
 * Shared policy for OmniRoute npm publish artifact hygiene.
 *
 * The package currently publishes the standalone runtime under app/.
 * This policy keeps local backups, QA scratch files, and development-only
 * directories out of the staged app/ tree and out of the final tarball.
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
];

export const APP_STAGING_ALLOWED_EXACT_PATHS: string[] = [
  ".env.example",
  "docs/openapi.yaml",
  "open-sse/mcp-server/server.js",
  "package.json",
  "responses-ws-proxy.mjs",
  "scripts/sync-env.mjs",
  "server.js",
  "server-ws.mjs",
];

export const APP_STAGING_ALLOWED_PATH_PREFIXES: string[] = [
  ".next/",
  "data/",
  "node_modules/",
  "public/",
  "src/lib/db/migrations/",
  "src/mitm/",
];

export const PACK_ARTIFACT_ALLOWED_EXACT_PATHS: string[] = APP_STAGING_ALLOWED_EXACT_PATHS.map(
  (filePath: string) => `app/${filePath}`
);

export const PACK_ARTIFACT_ALLOWED_PATH_PREFIXES: string[] = APP_STAGING_ALLOWED_PATH_PREFIXES.map(
  (directoryPath: string) => `app/${directoryPath}`
);

export const PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS: string[] = [
  ".env.example",
  "LICENSE",
  "README.md",
  "bin/mcp-server.mjs",
  "bin/nodeRuntimeSupport.mjs",
  "bin/omniroute.mjs",
  "bin/reset-password.mjs",
  "open-sse/mcp-server/README.md",
  "open-sse/mcp-server/audit.ts",
  "open-sse/mcp-server/httpTransport.ts",
  "open-sse/mcp-server/index.ts",
  "open-sse/mcp-server/runtimeHeartbeat.ts",
  "open-sse/mcp-server/scopeEnforcement.ts",
  "open-sse/mcp-server/server.ts",
  "package.json",
  "scripts/build-next-isolated.mjs",
  "scripts/check-supported-node-runtime.ts",
  "scripts/native-binary-compat.mjs",
  "scripts/postinstall.mjs",
  "scripts/postinstallSupport.mjs",
  "scripts/responses-ws-proxy.mjs",
  "scripts/sync-env.mjs",
  "src/shared/utils/nodeRuntimeSupport.ts",
];

export const PACK_ARTIFACT_ROOT_ALLOWED_PATH_PREFIXES: string[] = [
  "open-sse/mcp-server/schemas/",
  "open-sse/mcp-server/tools/",
  "src/shared/contracts/",
];

export const PACK_ARTIFACT_REQUIRED_PATHS: string[] = [
  "app/server.js",
  "app/server-ws.mjs",
  "app/responses-ws-proxy.mjs",
  "bin/mcp-server.mjs",
  "bin/nodeRuntimeSupport.mjs",
  "bin/omniroute.mjs",
  "package.json",
  "scripts/native-binary-compat.mjs",
  "scripts/postinstall.mjs",
  "scripts/postinstallSupport.mjs",
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
