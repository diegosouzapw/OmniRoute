/**
 * Normalize OMNIROUTE_BASE_PATH for Next.js `basePath` and Docker sentinels.
 *
 * Rules mirror src/shared/services/modelSyncScheduler.ts::normalizeInternalBasePath
 * so runtime self-fetches and the compiled bundle agree on the subpath shape.
 *
 * @param {string | undefined | null} value
 * @returns {string} "" for root, otherwise "/segment" without trailing slash
 */
export function normalizeBasePath(value) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed || trimmed === "/") return "";
  if (!trimmed.startsWith("/") || /[?#\\]/.test(trimmed)) return "";

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) return "";
  return `/${segments.join("/")}`;
}

/**
 * Prefix an application path with a normalized base path.
 *
 * @param {string} basePath normalized via normalizeBasePath
 * @param {string} pathname must start with "/"
 */
export function joinBasePath(basePath, pathname) {
  const pathPart = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (!basePath) return pathPart;
  if (pathPart === "/") return `${basePath}/`;
  return `${basePath}${pathPart}`;
}
