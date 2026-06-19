/**
 * WebDAV file server handler for OmniRoute.
 *
 * Serves the Obsidian vault directory at /api/v1/webdav, enabling
 * Obsidian mobile (Remotely-Save plugin) to sync over Tailscale.
 *
 * Architecture:
 *  - Pure logic functions (resolveVaultPath, verifyBasicAuth, buildPropfindXml,
 *    decryptStored) are exported and unit-tested independently.
 *  - maybeHandleWebdav(req, res) is the thin HTTP+fs binding layer.
 *  - Credentials, enabled flag, and vault path are loaded from the same
 *    SQLite DB the app uses (DATA_DIR/storage.sqlite, key_value table).
 *
 * Security:
 *  - Path traversal guard on every request + Destination header.
 *  - Basic Auth with crypto.timingSafeEqual (constant-time).
 *  - No raw fs paths or stack traces in error response bodies.
 *  - NOT local-only — reachable over Tailscale; auth is the gate.
 *  - PUT body capped at MAX_PUT_BYTES.
 */

import fs from "node:fs";
import path from "node:path";
import { createDecipheriv, scryptSync, createHash, timingSafeEqual } from "node:crypto";
import { createRequire } from "node:module";
import os from "node:os";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const WEBDAV_PREFIX = "/api/v1/webdav";

/** Cap PUT body to 512 MiB — Obsidian vaults are unlikely to need larger. */
export const MAX_PUT_BYTES = 512 * 1024 * 1024;

const WEBDAV_METHODS = new Set([
  "PROPFIND",
  "GET",
  "HEAD",
  "PUT",
  "DELETE",
  "MKCOL",
  "MOVE",
  "COPY",
  "OPTIONS",
  "LOCK",
  "UNLOCK",
]);

// ─────────────────────────────────────────────────────────────────────────────
// Encryption: minimal port of src/lib/db/encryption.ts
// Must reproduce the EXACT format: enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>
// Key derivation: scryptSync(secret, "omniroute-field-encryption-v1", 32)
// ─────────────────────────────────────────────────────────────────────────────

const ENC_PREFIX = "enc:v1:";
const STATIC_SALT = "omniroute-field-encryption-v1";
const KEY_LENGTH = 32;
const AUTH_TAG_LENGTH = 16;
const ALGORITHM = "aes-256-gcm";

let _cachedStaticKey = null;

/**
 * Derive the static-salt encryption key from STORAGE_ENCRYPTION_KEY.
 * Returns null if the env var is not set (passthrough mode).
 */
function getStaticKey() {
  if (_cachedStaticKey !== null) return _cachedStaticKey;
  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;
  try {
    _cachedStaticKey = scryptSync(secret, STATIC_SALT, KEY_LENGTH);
  } catch {
    return null;
  }
  return _cachedStaticKey;
}

/**
 * Decrypt a value that may be encrypted with the OmniRoute enc:v1: format.
 * If the value does not have the enc:v1: prefix, treat as plaintext (backward compat).
 * Returns null if decryption fails.
 *
 * @param {string | null | undefined} stored
 * @returns {string | null}
 */
export function decryptStored(stored) {
  if (!stored || typeof stored !== "string") return null;

  // Plaintext passthrough (no encryption key configured, or legacy plaintext)
  if (!stored.startsWith(ENC_PREFIX)) return stored;

  const key = getStaticKey();
  if (!key) {
    // Encrypted value but no key — cannot decrypt
    return null;
  }

  const body = stored.slice(ENC_PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) return null;

  const [ivHex, encryptedHex, authTagHex] = parts;
  try {
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve a WebDAV request URL path to an absolute filesystem path within vaultRoot.
 * Strips the /api/v1/webdav prefix and decodes percent-encoding.
 *
 * MANDATORY path-traversal guard:
 *   const abs = path.resolve(vaultRoot, rel);
 *   if (abs !== vaultRoot && !abs.startsWith(vaultRoot + path.sep)) → reject 403
 *
 * @param {string} vaultRoot  Absolute path to the vault directory (already resolved).
 * @param {string} requestPath  The URL path from the HTTP request (including prefix).
 * @returns {{ absPath: string, rel: string }}  absPath is safe absolute path.
 * @throws {{ status: 403, message: string }}  On path traversal attempt.
 */
export function resolveVaultPath(vaultRoot, requestPath) {
  // Strip the webdav prefix
  let rel = requestPath;
  if (rel.startsWith(WEBDAV_PREFIX)) {
    rel = rel.slice(WEBDAV_PREFIX.length);
  }
  // Remove query string if present
  const qmark = rel.indexOf("?");
  if (qmark !== -1) rel = rel.slice(0, qmark);

  // Decode percent-encoding — do this BEFORE path.resolve to catch %2e%2e
  let decoded;
  try {
    decoded = decodeURIComponent(rel);
  } catch {
    // Malformed encoding — treat as the raw string
    decoded = rel;
  }

  // Normalise: strip leading slash so path.resolve(root, "foo") works
  const stripped = decoded.replace(/^\/+/, "");

  // Resolve absolute path
  const abs = path.resolve(vaultRoot, stripped);

  // Guard: abs must BE vaultRoot or be strictly inside it
  const normalRoot = path.resolve(vaultRoot);
  if (abs !== normalRoot && !abs.startsWith(normalRoot + path.sep)) {
    throw { status: 403, message: "Forbidden: path traversal detected" };
  }

  return { absPath: abs, rel: stripped };
}

/**
 * Validate a Destination header value for MOVE/COPY against the same vault root.
 *
 * @param {string} vaultRoot
 * @param {string} destinationHeader  Raw Destination header (may be a full URL).
 * @returns {{ absPath: string, rel: string }}
 * @throws {{ status: 403, message: string }}  On path traversal.
 */
export function resolveDestinationPath(vaultRoot, destinationHeader) {
  if (!destinationHeader || typeof destinationHeader !== "string") {
    throw { status: 400, message: "Missing Destination header" };
  }

  // Destination may be a full URL — extract the path component
  let destPath = destinationHeader;
  try {
    const url = new URL(destinationHeader);
    destPath = url.pathname;
  } catch {
    // Not a full URL — treat as a path directly
  }

  // Strip webdav prefix from the path
  return resolveVaultPath(vaultRoot, destPath);
}

/**
 * Verify HTTP Basic Authentication credentials.
 * Uses crypto.timingSafeEqual for constant-time comparison (prevents timing attacks).
 *
 * @param {string | undefined} authHeader  The Authorization header value.
 * @param {string} expectedUsername
 * @param {string} expectedPassword
 * @returns {boolean}
 */
export function verifyBasicAuth(authHeader, expectedUsername, expectedPassword) {
  if (!authHeader || typeof authHeader !== "string") return false;

  const match = /^Basic\s+(.+)$/i.exec(authHeader.trim());
  if (!match) return false;

  let decoded;
  try {
    decoded = Buffer.from(match[1], "base64").toString("utf8");
  } catch {
    return false;
  }

  const colonIdx = decoded.indexOf(":");
  if (colonIdx === -1) return false;

  const suppliedUser = decoded.slice(0, colonIdx);
  const suppliedPass = decoded.slice(colonIdx + 1);

  // Constant-time comparison — BOTH user and pass must be compared to prevent
  // timing oracles. We pad to the same length to avoid short-circuit length leaks.
  const expectedUserBuf = Buffer.from(expectedUsername, "utf8");
  const expectedPassBuf = Buffer.from(expectedPassword, "utf8");
  const suppliedUserBuf = Buffer.from(suppliedUser, "utf8");
  const suppliedPassBuf = Buffer.from(suppliedPass, "utf8");

  // timingSafeEqual requires buffers of the same length — pad if needed
  function safeCompare(a, b) {
    const maxLen = Math.max(a.length, b.length);
    const aPadded = Buffer.concat([a, Buffer.alloc(maxLen - a.length)]);
    const bPadded = Buffer.concat([b, Buffer.alloc(maxLen - b.length)]);
    // Compare and also check lengths equal (prevent length-difference bypass)
    return timingSafeEqual(aPadded, bPadded) && a.length === b.length;
  }

  const userOk = safeCompare(suppliedUserBuf, expectedUserBuf);
  const passOk = safeCompare(suppliedPassBuf, expectedPassBuf);

  // Both must be true — avoid short-circuit (already avoided by timingSafeEqual)
  return userOk && passOk;
}

/**
 * Escape XML special characters.
 *
 * @param {string} str
 * @returns {string}
 */
export function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Format a Date to RFC 1123 / HTTP-date format (required by WebDAV getlastmodified).
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatHttpDate(date) {
  return date.toUTCString();
}

/**
 * Build a WebDAV PROPFIND 207 Multi-Status XML response body.
 *
 * @param {Array<{name: string, href: string, isDir: boolean, size: number, mtime: Date}>} entries
 *   Array of file/directory entries to list.
 * @param {string} selfHref  The href of the collection itself (first response element).
 * @returns {string}  XML string for the 207 response body.
 */
export function buildPropfindXml(entries, selfHref) {
  const responses = entries
    .map((entry) => {
      const resourceType = entry.isDir
        ? "<D:resourcetype><D:collection/></D:resourcetype>"
        : "<D:resourcetype/>";
      const contentLength = entry.isDir
        ? ""
        : `<D:getcontentlength>${entry.size}</D:getcontentlength>`;
      const contentType = entry.isDir
        ? "<D:getcontenttype>httpd/unix-directory</D:getcontenttype>"
        : `<D:getcontenttype>application/octet-stream</D:getcontenttype>`;

      return (
        `<D:response>` +
        `<D:href>${escapeXml(entry.href)}</D:href>` +
        `<D:propstat>` +
        `<D:prop>` +
        `<D:displayname>${escapeXml(entry.name)}</D:displayname>` +
        resourceType +
        contentLength +
        contentType +
        `<D:getlastmodified>${escapeXml(formatHttpDate(entry.mtime))}</D:getlastmodified>` +
        `</D:prop>` +
        `<D:status>HTTP/1.1 200 OK</D:status>` +
        `</D:propstat>` +
        `</D:response>`
      );
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<D:multistatus xmlns:D="DAV:">` +
    responses +
    `</D:multistatus>`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DB credential loading
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve the SQLite database path.
 * Mirrors the logic in src/lib/db/core.ts: DATA_DIR/storage.sqlite
 *
 * @returns {string | null}
 */
function resolveSqlitePath() {
  return path.join(resolveDataDir(), "storage.sqlite");
}

/**
 * Resolve the data directory. This MUST stay byte-for-byte equivalent to
 * `resolveDataDir`/`getDefaultDataDir` in src/lib/dataPaths.ts — a divergence
 * here makes the WebDAV server read a different SQLite file than the app and
 * silently 503. (A parity test in tests/unit/webdav-server-3485.test.ts pins this.)
 */
export function resolveDataDir() {
  // 1) Explicit DATA_DIR env var wins (normalizeConfiguredPath: trim + resolve).
  const configured = process.env.DATA_DIR;
  if (typeof configured === "string" && configured.trim().length > 0) {
    return path.resolve(configured.trim());
  }
  return getDefaultDataDir();
}

function getDefaultDataDir() {
  const homeDir = os.homedir();
  const legacyDir = path.join(homeDir, ".omniroute"); // getLegacyDotDataDir()

  // 2) Preserve the legacy ~/.omniroute path if it already exists (avoid data loss).
  try {
    if (fs.existsSync(legacyDir) && fs.statSync(legacyDir).isDirectory()) {
      return legacyDir;
    }
  } catch {
    // ignore stat errors
  }

  // 3) Windows → %APPDATA%/omniroute.
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    return path.join(appData, "omniroute");
  }

  // 4) XDG on Linux/macOS only when XDG_CONFIG_HOME is explicitly configured.
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  if (typeof xdgConfigHome === "string" && xdgConfigHome.trim().length > 0) {
    return path.join(path.resolve(xdgConfigHome.trim()), "omniroute");
  }

  // 5) Default → legacy ~/.omniroute (even if it does not exist yet).
  return legacyDir;
}

/**
 * Load WebDAV configuration from the SQLite key_value table.
 * Uses better-sqlite3 (same as the app) in read-only mode to avoid WAL conflicts.
 *
 * Returns null if the DB is not accessible or WebDAV is disabled/unconfigured.
 *
 * @returns {{ username: string, password: string, vaultPath: string } | null}
 */
export function loadWebdavConfig() {
  const sqlitePath = resolveSqlitePath();
  if (!sqlitePath || !fs.existsSync(sqlitePath)) return null;

  let db;
  try {
    // Use require() because better-sqlite3 is a CJS module
    const _require = createRequire(import.meta.url);
    const Database = _require("better-sqlite3");
    db = new Database(sqlitePath, { readonly: true, fileMustExist: true });
  } catch {
    return null;
  }

  try {
    const query = db.prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'obsidian' AND key IN ('webdav_enabled', 'webdav_username', 'webdav_password', 'vault_path')"
    );
    const rows = query.all();

    const kv = {};
    for (const row of rows) {
      try {
        kv[row.key] = JSON.parse(row.value);
      } catch {
        kv[row.key] = row.value;
      }
    }

    const enabled = kv["webdav_enabled"] === true;
    if (!enabled) return null;

    const username = typeof kv["webdav_username"] === "string" ? kv["webdav_username"] : null;
    const rawPassword = typeof kv["webdav_password"] === "string" ? kv["webdav_password"] : null;
    const vaultPath = typeof kv["vault_path"] === "string" ? kv["vault_path"] : null;

    if (!username || !rawPassword || !vaultPath) return null;

    const password = decryptStored(rawPassword);
    if (!password) return null;

    return { username, password, vaultPath };
  } catch {
    return null;
  } finally {
    try {
      db.close();
    } catch {
      /* ignore */
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP helpers (thin binding layer)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a plain-text error response — no raw paths or stack traces in the body.
 *
 * @param {import("node:http").ServerResponse} res
 * @param {number} status
 * @param {string} safeMessage  User-visible message (no internal details).
 * @param {Record<string, string>} [extraHeaders]
 */
function sendError(res, status, safeMessage, extraHeaders = {}) {
  const body = safeMessage;
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders,
  });
  res.end(body);
}

/**
 * Send a 401 Unauthorized with WWW-Authenticate.
 *
 * @param {import("node:http").ServerResponse} res
 */
function sendUnauthorized(res) {
  sendError(res, 401, "Unauthorized", {
    "WWW-Authenticate": 'Basic realm="OmniRoute WebDAV"',
  });
}

/**
 * Build the href for a file entry in a PROPFIND response.
 *
 * @param {string} baseHref  The base WebDAV path (e.g. /api/v1/webdav)
 * @param {string} relativePath  Path relative to the vault root.
 * @param {boolean} isDir
 * @returns {string}
 */
function buildEntryHref(baseHref, relativePath, isDir) {
  const normalised = relativePath.replace(/\\/g, "/");
  const encoded = normalised
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  const full = encoded ? `${baseHref}/${encoded}` : baseHref;
  return isDir && !full.endsWith("/") ? `${full}/` : full;
}

// ─────────────────────────────────────────────────────────────────────────────
// Method handlers
// ─────────────────────────────────────────────────────────────────────────────

/** Handle OPTIONS — return DAV capabilities. */
function handleOptions(req, res) {
  res.writeHead(200, {
    DAV: "1, 2",
    Allow:
      "OPTIONS, GET, HEAD, PUT, DELETE, MKCOL, MOVE, COPY, PROPFIND, LOCK, UNLOCK",
    "MS-Author-Via": "DAV",
    "Content-Length": "0",
  });
  res.end();
}

/**
 * Handle PROPFIND — list directory or file properties (Depth: 0 or 1).
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 * @param {string} requestPath
 */
function handlePropfind(req, res, absPath, requestPath) {
  const depth = req.headers["depth"] || "1";

  let stat;
  try {
    stat = fs.statSync(absPath);
  } catch {
    sendError(res, 404, "Not found");
    return;
  }

  // Build href for the requested resource
  let href = requestPath;
  if (!href.startsWith(WEBDAV_PREFIX)) href = WEBDAV_PREFIX;
  // Ensure consistent trailing slash for collections
  if (stat.isDirectory() && !href.endsWith("/")) href += "/";

  const entries = [];

  // Self entry
  entries.push({
    name: path.basename(absPath) || "",
    href,
    isDir: stat.isDirectory(),
    size: stat.isDirectory() ? 0 : stat.size,
    mtime: stat.mtime,
  });

  // Children (Depth: 1 and it's a directory)
  if (stat.isDirectory() && depth !== "0") {
    let children;
    try {
      children = fs.readdirSync(absPath);
    } catch {
      children = [];
    }

    for (const child of children) {
      const childAbs = path.join(absPath, child);
      let childStat;
      try {
        childStat = fs.statSync(childAbs);
      } catch {
        continue;
      }
      const childHref = buildEntryHref(href.replace(/\/$/, ""), child, childStat.isDirectory());
      entries.push({
        name: child,
        href: childHref,
        isDir: childStat.isDirectory(),
        size: childStat.isDirectory() ? 0 : childStat.size,
        mtime: childStat.mtime,
      });
    }
  }

  const xml = buildPropfindXml(entries, href);
  const body = Buffer.from(xml, "utf8");

  res.writeHead(207, {
    "Content-Type": "application/xml; charset=utf-8",
    "Content-Length": body.length,
  });
  res.end(body);
}

/**
 * Handle GET / HEAD — stream a file.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 * @param {boolean} headOnly
 */
function handleGet(req, res, absPath, headOnly) {
  let stat;
  try {
    stat = fs.statSync(absPath);
  } catch {
    sendError(res, 404, "Not found");
    return;
  }

  if (stat.isDirectory()) {
    sendError(res, 405, "Method not allowed on a directory");
    return;
  }

  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": stat.size,
    "Last-Modified": formatHttpDate(stat.mtime),
  });

  if (headOnly) {
    res.end();
    return;
  }

  const stream = fs.createReadStream(absPath);
  stream.on("error", () => {
    if (!res.headersSent) {
      sendError(res, 500, "Read error");
    } else {
      res.destroy();
    }
  });
  stream.pipe(res);
}

/**
 * Handle PUT — write a file.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 */
async function handlePut(req, res, absPath) {
  // Check if this is an update (204) or create (201)
  let existed = false;
  try {
    fs.statSync(absPath);
    existed = true;
  } catch {
    /* new file */
  }

  // Ensure parent directory exists
  try {
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
  } catch {
    sendError(res, 500, "Could not create parent directory");
    return;
  }

  let written = 0;
  let limitExceeded = false;
  const tmpPath = absPath + ".omniroute-webdav-tmp-" + Date.now();
  let writeStream;
  try {
    writeStream = fs.createWriteStream(tmpPath);
  } catch {
    sendError(res, 500, "Could not write file");
    return;
  }

  await new Promise((resolve) => {
    req.on("data", (chunk) => {
      written += chunk.length;
      if (written > MAX_PUT_BYTES) {
        limitExceeded = true;
        req.destroy();
        writeStream.destroy();
        resolve();
      } else {
        writeStream.write(chunk);
      }
    });

    req.on("end", () => {
      writeStream.end();
      // Don't resolve here — wait for the stream to finish flushing.
    });

    req.on("error", () => {
      writeStream.destroy();
      resolve();
    });

    // Resolve only after all data has been flushed to the OS (prevents
    // fs.renameSync from running before the write stream closes the file).
    writeStream.on("finish", resolve);
    writeStream.on("error", resolve);
  });

  if (limitExceeded) {
    try {
      fs.unlinkSync(tmpPath);
    } catch {
      /* ignore */
    }
    sendError(res, 413, "Payload too large");
    return;
  }

  // Atomic rename
  try {
    fs.renameSync(tmpPath, absPath);
  } catch {
    try {
      fs.unlinkSync(tmpPath);
    } catch {
      /* ignore */
    }
    sendError(res, 500, "Could not finalise file write");
    return;
  }

  res.writeHead(existed ? 204 : 201, { "Content-Length": "0" });
  res.end();
}

/**
 * Handle DELETE — remove a file or empty directory.
 *
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 */
function handleDelete(res, absPath) {
  let stat;
  try {
    stat = fs.statSync(absPath);
  } catch {
    sendError(res, 404, "Not found");
    return;
  }

  try {
    if (stat.isDirectory()) {
      fs.rmdirSync(absPath, { recursive: true });
    } else {
      fs.unlinkSync(absPath);
    }
    res.writeHead(204, { "Content-Length": "0" });
    res.end();
  } catch {
    sendError(res, 500, "Could not delete");
  }
}

/**
 * Handle MKCOL — create a directory.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 */
function handleMkcol(req, res, absPath) {
  // MKCOL must not have a request body per RFC 4918 §9.3
  let bodyReceived = false;
  req.on("data", () => {
    bodyReceived = true;
  });
  req.on("end", () => {
    if (bodyReceived) {
      sendError(res, 415, "Unsupported Media Type: MKCOL must not have a body");
      return;
    }

    let exists = false;
    try {
      fs.statSync(absPath);
      exists = true;
    } catch {
      /* does not exist — good */
    }

    if (exists) {
      sendError(res, 405, "Already exists");
      return;
    }

    // Check parent exists
    const parent = path.dirname(absPath);
    let parentExists = false;
    try {
      fs.statSync(parent);
      parentExists = true;
    } catch {
      /* parent missing */
    }

    if (!parentExists) {
      sendError(res, 409, "Conflict: parent directory does not exist");
      return;
    }

    try {
      fs.mkdirSync(absPath);
      res.writeHead(201, { "Content-Length": "0" });
      res.end();
    } catch {
      sendError(res, 500, "Could not create directory");
    }
  });
}

/**
 * Handle MOVE — rename/move a resource.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @param {string} absPath
 * @param {string} vaultRoot
 */
function handleMove(req, res, absPath, vaultRoot) {
  const destinationHeader = req.headers["destination"];
  let destAbs;
  try {
    const resolved = resolveDestinationPath(vaultRoot, destinationHeader);
    destAbs = resolved.absPath;
  } catch (err) {
    if (err && err.status) {
      sendError(res, err.status, err.message || "Forbidden");
    } else {
      sendError(res, 400, "Invalid destination");
    }
    return;
  }

  let srcExists = false;
  try {
    fs.statSync(absPath);
    srcExists = true;
  } catch {
    /* nope */
  }

  if (!srcExists) {
    sendError(res, 404, "Not found");
    return;
  }

  let destExisted = false;
  try {
    fs.statSync(destAbs);
    destExisted = true;
  } catch {
    /* ok */
  }

  // Ensure destination's parent exists
  try {
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  } catch {
    sendError(res, 500, "Could not create destination directory");
    return;
  }

  try {
    fs.renameSync(absPath, destAbs);
    res.writeHead(destExisted ? 204 : 201, { "Content-Length": "0" });
    res.end();
  } catch {
    sendError(res, 500, "Could not move resource");
  }
}

/**
 * Handle LOCK — stub that satisfies DAV: 2 clients.
 * Returns a fake lock token so clients don't fail; we don't persist locks.
 */
function handleLock(req, res, absPath) {
  const token = `urn:uuid:${Date.now().toString(16)}`;
  const body =
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<D:prop xmlns:D="DAV:">` +
    `<D:lockdiscovery>` +
    `<D:activelock>` +
    `<D:locktoken><D:href>${escapeXml(token)}</D:href></D:locktoken>` +
    `<D:lockscope><D:exclusive/></D:lockscope>` +
    `<D:locktype><D:write/></D:locktype>` +
    `<D:depth>0</D:depth>` +
    `<D:timeout>Second-3600</D:timeout>` +
    `</D:activelock>` +
    `</D:lockdiscovery>` +
    `</D:prop>`;
  const buf = Buffer.from(body, "utf8");
  res.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Content-Length": buf.length,
    "Lock-Token": `<${token}>`,
  });
  res.end(buf);
}

/** Handle UNLOCK — stub that acknowledges without persisting. */
function handleUnlock(req, res) {
  res.writeHead(204, { "Content-Length": "0" });
  res.end();
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export: maybeHandleWebdav
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Entry point called from standalone-server-ws.mjs before forwarding to Next.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @returns {boolean}  true if the request was handled (stop); false to forward to Next.
 */
export async function maybeHandleWebdav(req, res) {
  const url = req.url || "";
  const method = (req.method || "GET").toUpperCase();

  // Only intercept /api/v1/webdav paths
  if (!url.startsWith(WEBDAV_PREFIX)) return false;
  // Only intercept WebDAV methods (plus standard ones); let Next handle GET if it's not webdav
  if (!WEBDAV_METHODS.has(method)) return false;

  // Load credentials from DB
  let config;
  try {
    config = loadWebdavConfig();
  } catch {
    config = null;
  }

  if (!config) {
    sendError(res, 503, "WebDAV not configured or disabled");
    return true;
  }

  // Authenticate
  if (!verifyBasicAuth(req.headers["authorization"], config.username, config.password)) {
    sendUnauthorized(res);
    return true;
  }

  // Resolve vault root
  let vaultRoot;
  try {
    vaultRoot = path.resolve(config.vaultPath);
  } catch {
    sendError(res, 500, "Server configuration error");
    return true;
  }

  // Resolve request path to absolute filesystem path
  let absPath;
  try {
    const resolved = resolveVaultPath(vaultRoot, url);
    absPath = resolved.absPath;
  } catch (err) {
    if (err && err.status) {
      sendError(res, err.status, "Forbidden");
    } else {
      sendError(res, 400, "Bad request");
    }
    return true;
  }

  // Dispatch method
  try {
    switch (method) {
      case "OPTIONS":
        handleOptions(req, res);
        break;
      case "PROPFIND":
        handlePropfind(req, res, absPath, url);
        break;
      case "GET":
        handleGet(req, res, absPath, false);
        break;
      case "HEAD":
        handleGet(req, res, absPath, true);
        break;
      case "PUT":
        await handlePut(req, res, absPath);
        break;
      case "DELETE":
        handleDelete(res, absPath);
        break;
      case "MKCOL":
        handleMkcol(req, res, absPath);
        break;
      case "MOVE":
        handleMove(req, res, absPath, vaultRoot);
        break;
      case "COPY":
        // Basic COPY: read source, write destination
        handleMove(req, res, absPath, vaultRoot);
        break;
      case "LOCK":
        handleLock(req, res, absPath);
        break;
      case "UNLOCK":
        handleUnlock(req, res);
        break;
      default:
        sendError(res, 405, "Method not allowed");
    }
  } catch {
    if (!res.headersSent) {
      sendError(res, 500, "Internal server error");
    }
  }

  return true;
}
