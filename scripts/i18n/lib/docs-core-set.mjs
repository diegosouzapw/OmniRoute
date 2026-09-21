/**
 * The docs "core set": the source documents every existing locale mirror carries.
 *
 * The translation pipeline (`scripts/i18n/run-translation.mjs`) knows ~150
 * source files, but only a core of them is translated in every locale under
 * `docs/i18n/`. A new locale should reach parity with its peers rather than
 * translate the full set, so the core is derived from the tree itself — the
 * intersection of the relative paths present under every existing,
 * non-`docsExcluded` locale directory — instead of being hard-coded.
 *
 *   docsLocaleDirs({ root, config })     → ["ar", "az", …] locale codes whose
 *                                          docs/i18n/<code>/ directory exists
 *   computeDocsCoreSet({ root, config }) → sorted repo-relative source paths
 *
 * Paths that are not translation targets are dropped from the result: the
 * strict-mirror stubs (`llm.txt`, `CHANGELOG.md`), the operator-only
 * `docs/guides/I18N.md`, and any mirror whose English source no longer exists
 * at `<root>/<path>`. Synchronous and filesystem-only — no network, no writes.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export const CORE_SET_EXCLUDED = ["llm.txt", "CHANGELOG.md", "docs/guides/I18N.md"];

function walkFiles(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(abs, base, out);
    else if (entry.isFile()) out.push(path.relative(base, abs).split(path.sep).join("/"));
  }
  return out;
}

function isDirectory(abs) {
  return existsSync(abs) && statSync(abs).isDirectory();
}

function isFile(abs) {
  return existsSync(abs) && statSync(abs).isFile();
}

export function docsLocaleDirs({ root, config }) {
  const excluded = new Set(config.docsExcluded ?? ["en"]);
  return config.locales
    .map((locale) => locale.code)
    .filter((code) => !excluded.has(code) && isDirectory(path.join(root, "docs", "i18n", code)));
}

export function computeDocsCoreSet({ root, config }) {
  let shared = null;
  for (const code of docsLocaleDirs({ root, config })) {
    const files = new Set(walkFiles(path.join(root, "docs", "i18n", code)));
    shared = shared === null ? files : new Set([...shared].filter((rel) => files.has(rel)));
  }
  if (shared === null) return [];
  const dropped = new Set(CORE_SET_EXCLUDED);
  return [...shared].filter((rel) => !dropped.has(rel) && isFile(path.join(root, rel))).sort();
}
