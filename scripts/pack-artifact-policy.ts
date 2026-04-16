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
  "scripts/sync-env.mjs",
  "server.js",
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
