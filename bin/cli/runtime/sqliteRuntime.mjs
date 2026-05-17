import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { validateBinaryMagic, platformBinaryLabel } from "./magicBytes.mjs";

const RUNTIME_DIR = join(homedir(), ".omniroute", "runtime");
const BETTER_SQLITE3_VERSION = "better-sqlite3@^12.6.2";

let resolvedCached = null;

/**
 * Resolves a SQLite driver through a 5-step fallback chain:
 *   1. Bundled better-sqlite3 (optionalDependency)
 *   2. Runtime-installed better-sqlite3 in ~/.omniroute/runtime/
 *   3. Lazy npm install into runtime dir
 *   4. node:sqlite (Node ≥22.5 stdlib)
 *   5. sql.js (bundled WASM, always available)
 *
 * Returns { driver, source } where source is one of:
 *   "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js"
 */
export async function loadSqliteRuntime() {
  if (resolvedCached) return resolvedCached;

  const bundled = await tryLoadBundled();
  if (bundled) {
    resolvedCached = { driver: bundled, source: "bundled" };
    return resolvedCached;
  }

  const runtimeInstalled = await tryLoadRuntimeInstalled();
  if (runtimeInstalled) {
    resolvedCached = { driver: runtimeInstalled, source: "runtime" };
    return resolvedCached;
  }

  try {
    await installRuntime();
    const after = await tryLoadRuntimeInstalled();
    if (after) {
      resolvedCached = { driver: after, source: "runtime-installed-now" };
      return resolvedCached;
    }
  } catch (err) {
    console.warn(`[omniroute] runtime install failed: ${err.message}`);
  }

  try {
    const nodeSqlite = await import("node:sqlite");
    resolvedCached = {
      driver: { kind: "node-sqlite", DatabaseSync: nodeSqlite.DatabaseSync },
      source: "node-sqlite",
    };
    return resolvedCached;
  } catch {}

  const sqljs = await import("sql.js");
  resolvedCached = {
    driver: { kind: "sql-js", initSqlJs: sqljs.default ?? sqljs.initSqlJs },
    source: "sql-js",
  };
  return resolvedCached;
}

async function tryLoadBundled() {
  try {
    const mod = await import("better-sqlite3");
    return { kind: "better-sqlite3", Database: mod.default ?? mod };
  } catch {
    return null;
  }
}

async function tryLoadRuntimeInstalled() {
  const runtimeNodeModules = resolve(RUNTIME_DIR, "node_modules");
  const pkgRoot = resolve(runtimeNodeModules, "better-sqlite3");
  if (!pkgRoot.startsWith(`${runtimeNodeModules}/`)) return null;
  if (!existsSync(join(pkgRoot, "package.json"))) return null;

  const buildDir = join(pkgRoot, "build", "Release");
  if (existsSync(buildDir)) {
    const nodeFile = readdirSync(buildDir).find((f) => f.endsWith(".node"));
    if (nodeFile) {
      const magic = validateBinaryMagic(join(buildDir, nodeFile));
      const expected = platformBinaryLabel();
      if (!magic || (magic !== expected && magic !== "macho-le" && magic !== "macho-fat")) {
        console.warn(
          `[omniroute] runtime sqlite binary magic mismatch (${magic} ≠ ${expected}) — skipping`
        );
        return null;
      }
    }
  }

  try {
    const mod = await import(/* webpackIgnore: true */ pathToFileURL(pkgRoot).href);
    return { kind: "better-sqlite3", Database: mod.default ?? mod };
  } catch {
    return null;
  }
}

function ensureRuntimeDir() {
  if (!existsSync(RUNTIME_DIR)) mkdirSync(RUNTIME_DIR, { recursive: true });
  const pkg = join(RUNTIME_DIR, "package.json");
  if (!existsSync(pkg)) {
    writeFileSync(
      pkg,
      JSON.stringify({ name: "omniroute-runtime", private: true, type: "commonjs" }),
      "utf-8"
    );
  }
}

async function installRuntime() {
  ensureRuntimeDir();
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  execSync(
    `${npm} install --prefix "${RUNTIME_DIR}" ${BETTER_SQLITE3_VERSION} --no-audit --no-fund --silent`,
    { stdio: ["ignore", "ignore", "pipe"], timeout: 180_000 }
  );
}

/** Clears the cached resolved driver (for testing). */
export function clearRuntimeCache() {
  resolvedCached = null;
}
