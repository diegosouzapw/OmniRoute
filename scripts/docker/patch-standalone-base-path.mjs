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
  /(?:basePath|assetPrefix)\s*:\s*(?:""|''|``)|(?:basePath|assetPrefix)\s*:\s*void 0|"(?:basePath|assetPrefix)"\s*:\s*""|"NEXT_PUBLIC_OMNIROUTE_BASE_PATH"\s*:\s*""|NEXT_PUBLIC_OMNIROUTE_BASE_PATH\s*:\s*""/g;

/**
 * Rewrite the bare config literals Next bakes into the standalone output:
 *   - `basePath` (routing + server-rendered links) — the original scope;
 *   - `assetPrefix` (Next 16 app-router renders SSR asset URLs from
 *     `assetPrefix` ALONE — basePath only affects routing, so a subpath
 *     deploy must mirror it or every `/_next/static` shell reference 404s);
 *   - the `NEXT_PUBLIC_OMNIROUTE_BASE_PATH` env mirror in the inline
 *     nextConfig (server.js) so server-side env reads stay consistent.
 *
 * @param {string} content
 * @param {string} basePath
 */
export function patchBasePathLiterals(content, basePath) {
  const escaped = basePath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return content.replace(BASE_PATH_LITERAL_RE, (match) => {
    if (match.startsWith('"NEXT_PUBLIC_OMNIROUTE_BASE_PATH"')) {
      return `"NEXT_PUBLIC_OMNIROUTE_BASE_PATH":"${escaped}"`;
    }
    if (match.startsWith("NEXT_PUBLIC_OMNIROUTE_BASE_PATH")) {
      return `NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"${escaped}"`;
    }
    if (match.startsWith('"')) {
      // `"basePath":""` / `"assetPrefix":""` (JSON-ish inline config)
      const key = match.slice(1, match.indexOf('"', 1));
      return `"${key}":"${escaped}"`;
    }
    // `basePath:""` / `basePath:void 0` / `assetPrefix:""` (minified code)
    const key = match.slice(0, match.indexOf(":")).trim();
    return `${key}:"${escaped}"`;
  });
}

/**
 * Turbopack's client `process` shim ships an empty env object (`.env={}`).
 * Next 16's client code reads NEXT_PUBLIC_* / OMNIROUTE_BASE_PATH from it at
 * runtime, so without this the client never learns the subpath and the
 * dashboard's fetch/EventSource rewriting (basePathFetch) silently stays on
 * the root path. Populate the two keys the app reads.
 *
 * @param {string} content
 * @param {string} basePath
 */
export function patchProcessEnvShim(content, basePath) {
  const escaped = basePath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return content.replace(/\.env=\{\}/g, () => {
    const keys = `OMNIROUTE_BASE_PATH:"${escaped}",NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"${escaped}"`;
    return `.env={${keys}}`;
  });
}

/**
 * Rewrite baked absolute asset URLs (`"/_next/static/..."`) to the subpath.
 * Covers the client-reference-manifest chunk lists (they are serialized into
 * the RSC flight payload verbatim) and the client/server chunk media imports
 * — every `/ _next/static` reference must be prefixed because the standalone
 * server only serves assets under basePath.
 *
 * @param {string} content
 * @param {string} basePath
 */
export function patchBakedAssetUrls(content, basePath) {
  const escaped = basePath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return content.replace(
    /(["'`])\/_next\/static/g,
    (_match, quote) => `${quote}${escaped}/_next/static`
  );
}

/**
 * Rewrite the client chunk-loader base (#9124). The root-built bundle bakes
 * the lazy-chunk base as a bare "/_next/" literal:
 *   - webpack runtime: `i.p="/_next/"` (`__webpack_require__.p`, publicPath);
 *   - Turbopack runtime: `TURBOPACK_CHUNK_BASE_PATH:"/_next/"` fallback;
 *   - webpack client-reference manifests: `"moduleLoading":{"prefix":"/_next/"}`
 *     (SSR emits the client-chunk <script> tags from this prefix, not from
 *     assetPrefix).
 * Left unpatched, the <script> tags are prefixed but every lazily loaded chunk
 * is requested from `/_next/...`, which 404s behind a non-stripping subpath
 * proxy and leaves the dashboard un-hydrated with no console error (Turbopack)
 * or a MIME-type refusal (webpack). Only these two assignment shapes are
 * touched: the `indexOf("/_next/")` probe that derives the asset prefix from a
 * script src and `assetPrefix + "/_next/"` joins must stay as they are.
 *
 * @param {string} content
 * @param {string} basePath
 */
export function patchChunkLoaderBase(content, basePath) {
  const escaped = basePath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return content
    .replace(
      /(\b[A-Za-z_$][\w$]*\.p\s*=\s*)(["'])\/_next\/\2/g,
      (_match, lhs, quote) => `${lhs}${quote}${escaped}/_next/${quote}`
    )
    .replace(
      /(TURBOPACK_CHUNK_BASE_PATH\s*:\s*)(["'])\/_next\/\2/g,
      (_match, lhs, quote) => `${lhs}${quote}${escaped}/_next/${quote}`
    )
    .replace(
      /("moduleLoading"\s*:\s*\{\s*"prefix"\s*:\s*)"\/_next\/"/g,
      (_match, lhs) => `${lhs}"${escaped}/_next/"`
    );
}

/**
 * Rewrite `url(/_next/static/...)` references in compiled CSS (fonts, images).
 * CSS minifiers drop the quotes, so `patchBakedAssetUrls` never sees them.
 *
 * @param {string} content
 * @param {string} basePath
 */
export function patchCssAssetUrls(content, basePath) {
  return content.replace(
    /url\((\s*["']?)\/_next\/static/g,
    (_match, open) => `url(${open}${basePath}/_next/static`
  );
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
      const isCss = entry.name.endsWith(".css");
      if (!isCss && !/\.(?:js|json|cjs|mjs|html)$/.test(entry.name)) continue;
      const before = fs.readFileSync(full, "utf8");
      const patches = isCss
        ? [patchCssAssetUrls, patchBakedAssetUrls]
        : [patchBasePathLiterals, patchProcessEnvShim, patchBakedAssetUrls, patchChunkLoaderBase];
      const after = patches.reduce((content, patch) => patch(content, basePath), before);
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
