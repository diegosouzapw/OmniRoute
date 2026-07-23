import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Regression guard for #5227.
 *
 * The published npm package only ships the paths listed in package.json's
 * `files` whitelist. If a CLI entrypoint under `bin/` imports a module under
 * `scripts/` at runtime, that script MUST be covered by the whitelist —
 * otherwise a global install (`npm install -g omniroute`) fails at startup with
 * "Cannot find module .../scripts/build/runtime-env.mjs".
 *
 * #5227: `bin/cli/commands/serve.mjs` started importing
 * `scripts/build/runtime-env.mjs` (added with the heap auto-calibration fix
 * #5213) but the file was never added to `files`, breaking every global install.
 */

const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "../../../");

function listMjsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listMjsFiles(full));
    } else if (entry.endsWith(".mjs") || entry.endsWith(".js")) {
      out.push(full);
    }
  }
  return out;
}

/** Extract every `scripts/...`-resolving specifier statically/dynamically imported by a bin file. */
function scriptImports(binFile: string): string[] {
  const src = readFileSync(binFile, "utf8");
  const specifiers = new Set<string>();
  // static: from "..."   dynamic: import("...")
  const re = /(?:from|import)\s*\(?\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const spec = m[1];
    if (!spec.startsWith(".")) continue; // only relative imports can reach scripts/
    const resolved = resolve(dirname(binFile), spec);
    const rel = relative(REPO_ROOT, resolved).split("\\").join("/");
    if (rel.startsWith("scripts/")) specifiers.add(rel);
  }
  return [...specifiers];
}

/** A repo-relative path is published if it equals a whitelist entry or sits under a directory entry. */
function isCovered(relPath: string, files: string[]): boolean {
  return files.some((entry) => {
    if (entry.startsWith("!")) return false; // negations never add coverage
    if (entry === relPath) return true;
    const dirEntry = entry.endsWith("/") ? entry : entry + "/";
    return relPath.startsWith(dirEntry);
  });
}

test("#5227 — every scripts/* module imported by bin/ is in the npm files whitelist", () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8"));
  const files: string[] = pkg.files || [];
  assert.ok(files.length > 0, "package.json must declare a files whitelist");

  const binDir = join(REPO_ROOT, "bin");
  const imported = new Set<string>();
  for (const binFile of listMjsFiles(binDir)) {
    for (const spec of scriptImports(binFile)) imported.add(spec);
  }

  // Sanity: the known runtime imports must be detected, else the scanner is broken.
  assert.ok(
    imported.has("scripts/build/runtime-env.mjs"),
    "scanner should detect serve.mjs's import of scripts/build/runtime-env.mjs"
  );

  const missing = [...imported].filter((p) => !isCovered(p, files));
  assert.deepEqual(
    missing,
    [],
    `bin/ imports these scripts/* modules that are NOT in package.json "files" (global install will fail): ${missing.join(", ")}`
  );
});
