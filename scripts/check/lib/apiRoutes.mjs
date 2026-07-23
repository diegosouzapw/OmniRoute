/**
 * Shared filesystem inventory of Next.js App Router API routes.
 *
 * Existence reason: openapi-routes (spec→route), docs-symbols (prose→route),
 * and openapi-coverage (route→spec %) all need the same walk of src/app/api.
 * One collector keeps path normalization consistent and avoids triple walks
 * when a combined gate runs them together.
 */
import fs from "node:fs";
import path from "node:path";

/**
 * @param {string} [root] repo root
 * @returns {string} absolute path to src/app/api
 */
export function apiRoot(root = process.cwd()) {
  return path.join(root, "src", "app", "api");
}

/**
 * Convert a directory under src/app/api (the folder that contains route.ts)
 * to an OpenAPI-style /api/... path.
 * Dynamic segments: [id] → {id}, [...slug] → {slug}.
 *
 * @param {string} routeDir absolute directory containing route.ts
 * @param {string} apiRootAbs absolute src/app/api
 * @returns {string}
 */
export function toApiUrlPath(routeDir, apiRootAbs) {
  const rel = path.relative(apiRootAbs, routeDir).replace(/\\/g, "/");
  if (!rel || rel === ".") return "/api";
  const normalized = rel
    .replace(/\[\.\.\.([^\]]+)\]/g, "{$1}")
    .replace(/\[([^\]]+)\]/g, "{$1}");
  return `/api/${normalized}`;
}

/**
 * Walk src/app/api for route.ts(x) → OpenAPI-style URL paths.
 * @param {string} [root]
 * @returns {string[]}
 */
export function collectApiRouteUrlPaths(root = process.cwd()) {
  const API = apiRoot(root);
  if (!fs.existsSync(API)) return [];
  const out = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && /^route\.tsx?$/.test(entry.name)) {
        out.push(toApiUrlPath(path.dirname(full), API));
      }
    }
  }
  walk(API);
  return out;
}

/**
 * Walk src/app/api → relative repo paths to route.ts (docs-symbols resolver).
 * @param {string} [root]
 * @returns {Set<string>}
 */
export function collectApiRouteFiles(root = process.cwd()) {
  const API = apiRoot(root);
  const out = new Set();
  if (!fs.existsSync(API)) return out;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && /^route\.tsx?$/.test(entry.name)) {
        out.add(path.relative(root, full).replace(/\\/g, "/"));
      }
    }
  }
  walk(API);
  return out;
}
