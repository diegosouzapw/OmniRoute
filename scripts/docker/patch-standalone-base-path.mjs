/**
 * Rewrites Next.js standalone manifests and embedded basePath literals so a bundle
 * built for the domain root can serve under OMNIROUTE_BASE_PATH at container start.
 */

import fs from "node:fs";
import path from "node:path";
import { normalizeBasePath } from "../build/normalizeBasePath.mjs";

const JSON_MANIFEST_NAMES = new Set([
  "routes-manifest.json",
  "prerender-manifest.json",
  "required-server-files.json",
  "images-manifest.json",
  "app-path-routes-manifest.json",
]);

/**
 * @param {string} appRoot
 * @returns {string[]}
 */
export function discoverNextDistRoots(appRoot) {
  const candidates = [".build/next", ".next", path.join(".build", "next")];
  const found = [];
  for (const rel of candidates) {
    const abs = path.join(appRoot, rel);
    if (fs.existsSync(path.join(abs, "routes-manifest.json"))) {
      found.push(abs);
    }
  }
  return found;
}

/**
 * @param {unknown} node
 * @param {string} basePath
 */
function patchJsonNode(node, basePath) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const entry of node) patchJsonNode(entry, basePath);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "basePath" && typeof value === "string") {
      node[key] = basePath;
      continue;
    }
    patchJsonNode(value, basePath);
  }
}

/**
 * @param {string} filePath
 * @param {string} basePath
 */
export function patchJsonManifestFile(filePath, basePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  patchJsonNode(parsed, basePath);
  const next = `${JSON.stringify(parsed, null, 2)}\n`;
  if (next !== raw) {
    fs.writeFileSync(filePath, next);
    return true;
  }
  return false;
}

const BASE_PATH_LITERAL_RE =
  /basePath\s*:\s*(?:""|''|`{2})|basePath\s*:\s*void 0|"basePath"\s*:\s*""/g;

/**
 * @param {string} content
 * @param {string} basePath
 */
export function patchBasePathLiterals(content, basePath) {
  const escaped = basePath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return content.replace(BASE_PATH_LITERAL_RE, (match) => {
    if (match.startsWith('"basePath"')) return `"basePath":"${escaped}"`;
    if (match.includes("void 0")) return `basePath:"${escaped}"`;
    return `basePath:"${escaped}"`;
  });
}

/**
 * @param {string} rootDir
 * @param {string} basePath
 */
function walkAndPatchTextFiles(rootDir, basePath) {
  let patchedFiles = 0;
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!/\.(?:js|json|cjs|mjs)$/.test(entry.name)) continue;
      const before = fs.readFileSync(full, "utf8");
      const after = patchBasePathLiterals(before, basePath);
      if (after !== before) {
        fs.writeFileSync(full, after);
        patchedFiles += 1;
      }
    }
  }
  return patchedFiles;
}

/**
 * @param {object} opts
 * @param {string} opts.appRoot standalone bundle root (cwd in Docker)
 * @param {string} opts.fromBasePath normalized baked base path
 * @param {string} opts.toBasePath normalized runtime base path
 */
export function patchStandaloneBasePath({ appRoot, fromBasePath, toBasePath }) {
  const from = normalizeBasePath(fromBasePath);
  const to = normalizeBasePath(toBasePath);
  if (from === to) {
    return { changed: false, patchedManifests: 0, patchedTextFiles: 0, distRoots: [] };
  }
  if (from) {
    throw new Error(
      `runtime OMNIROUTE_BASE_PATH (${to || "(root)"}) does not match the image build ` +
        `(${from}). Rebuild with --build-arg OMNIROUTE_BASE_PATH=${to || '""'}.`
    );
  }
  if (!to) {
    throw new Error("patchStandaloneBasePath requires a non-empty target base path");
  }

  const distRoots = discoverNextDistRoots(appRoot);
  if (distRoots.length === 0) {
    throw new Error(
      "could not locate routes-manifest.json under .build/next or .next in the standalone bundle"
    );
  }

  let patchedManifests = 0;
  let patchedTextFiles = 0;
  for (const distRoot of distRoots) {
    for (const name of JSON_MANIFEST_NAMES) {
      const manifestPath = path.join(distRoot, name);
      if (!fs.existsSync(manifestPath)) continue;
      if (patchJsonManifestFile(manifestPath, to)) patchedManifests += 1;
    }
    const serverDir = path.join(distRoot, "server");
    if (fs.existsSync(serverDir)) patchedTextFiles += walkAndPatchTextFiles(serverDir, to);
    const staticDir = path.join(distRoot, "static");
    if (fs.existsSync(staticDir)) patchedTextFiles += walkAndPatchTextFiles(staticDir, to);
  }

  for (const entry of ["server.js", "server-ws.mjs"]) {
    const serverEntry = path.join(appRoot, entry);
    if (!fs.existsSync(serverEntry)) continue;
    const before = fs.readFileSync(serverEntry, "utf8");
    const after = patchBasePathLiterals(before, to);
    if (after !== before) {
      fs.writeFileSync(serverEntry, after);
      patchedTextFiles += 1;
    }
  }

  return { changed: true, patchedManifests, patchedTextFiles, distRoots, toBasePath: to };
}
