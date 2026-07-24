/**
 * TS 7.0 readiness guard for tsconfig files.
 *
 * TypeScript 6.x raises `TS5101: Option 'baseUrl' is deprecated and will stop
 * functioning in TypeScript 7.0` for any tsconfig that still declares
 * `compilerOptions.baseUrl`. The only offender was `open-sse/tsconfig.json`,
 * which paired it with `ignoreDeprecations: "5.0"` to silence the warning.
 *
 * Dropping `baseUrl` changes how `paths` are resolved: without it, every path
 * mapping is resolved relative to the directory containing the tsconfig rather
 * than relative to `baseUrl`. So asserting "no baseUrl" alone is not enough —
 * the mappings have to keep pointing at real directories, or `@/*` and
 * `@omniroute/open-sse/*` silently stop resolving. Both halves are asserted here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Directories that hold generated/vendored copies of tsconfig files. */
const SKIP_DIRS = new Set([
  "node_modules",
  ".build",
  ".next",
  ".next-playwright",
  ".claude",
  ".git",
  "dist",
  "dist-electron",
  "coverage",
  ".source",
  ".tmp",
  "_tasks",
  "_ideia",
  "_mono_repo",
  "_references",
]);

function collectTsconfigs(dir: string, found: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      collectTsconfigs(path.join(dir, entry.name), found);
    } else if (/^tsconfig(\..+)?\.json$/.test(entry.name)) {
      found.push(path.join(dir, entry.name));
    }
  }
  return found;
}

/**
 * tsconfig is JSONC (comments + trailing commas allowed), and glob values like
 * `"**​/*.ts"` contain `/*` — so a hand-rolled comment stripper corrupts them.
 * Use TypeScript's own parser. `extends` is deliberately NOT resolved: each file
 * is asserted on what it literally declares.
 */
function readTsconfig(file: string): { compilerOptions?: Record<string, unknown> } {
  const { config, error } = ts.readConfigFile(file, (p) => fs.readFileSync(p, "utf8"));
  assert.equal(
    error,
    undefined,
    `${path.relative(REPO_ROOT, file)} is not parseable: ${
      error && ts.flattenDiagnosticMessageText(error.messageText, " ")
    }`
  );
  return config as { compilerOptions?: Record<string, unknown> };
}

const TSCONFIGS = collectTsconfigs(REPO_ROOT);

test("repo actually has tsconfig files to check", () => {
  assert.ok(TSCONFIGS.length > 0, "no tsconfig files discovered — the walker is broken");
});

test("no tsconfig declares the TS 7.0-removed 'baseUrl' option", () => {
  const offenders = TSCONFIGS.filter(
    (file) => readTsconfig(file).compilerOptions?.baseUrl !== undefined
  ).map((file) => path.relative(REPO_ROOT, file));

  assert.deepEqual(
    offenders,
    [],
    `'baseUrl' is removed in TypeScript 7.0 (TS5101). Drop it and rewrite 'paths' ` +
      `relative to the tsconfig's own directory. Offenders: ${offenders.join(", ")}`
  );
});

test("no tsconfig needs 'ignoreDeprecations' to silence removed options", () => {
  const offenders = TSCONFIGS.filter(
    (file) => readTsconfig(file).compilerOptions?.ignoreDeprecations !== undefined
  ).map((file) => path.relative(REPO_ROOT, file));

  assert.deepEqual(
    offenders,
    [],
    `'ignoreDeprecations' only suppresses the symptom — remove the deprecated ` +
      `option itself. Offenders: ${offenders.join(", ")}`
  );
});

test("every tsconfig 'paths' mapping resolves to a real file or directory", () => {
  const broken: string[] = [];

  for (const file of TSCONFIGS) {
    const compilerOptions = readTsconfig(file).compilerOptions;
    const paths = compilerOptions?.paths as Record<string, string[]> | undefined;
    if (!paths) continue;

    // Without baseUrl, path mappings resolve relative to the tsconfig's directory.
    const resolveRoot = path.dirname(file);

    for (const [alias, targets] of Object.entries(paths)) {
      for (const target of targets) {
        // Strip the trailing wildcard segment: "../src/*" -> "../src"
        const concrete = target.replace(/\/?\*+$/, "");
        const absolute = path.resolve(resolveRoot, concrete);
        if (!fs.existsSync(absolute)) {
          broken.push(`${path.relative(REPO_ROOT, file)}: "${alias}" -> "${target}"`);
        }
      }
    }
  }

  assert.deepEqual(
    broken,
    [],
    `path alias targets that do not exist on disk:\n  ${broken.join("\n  ")}`
  );
});

test("open-sse aliases point at the repo-root src/ and open-sse/ directories", () => {
  const file = path.join(REPO_ROOT, "open-sse/tsconfig.json");
  const paths = readTsconfig(file).compilerOptions?.paths as Record<string, string[]>;

  assert.ok(paths, "open-sse/tsconfig.json must keep its path aliases");

  const resolveRoot = path.dirname(file);
  const resolveAlias = (alias: string) =>
    path.resolve(resolveRoot, paths[alias][0].replace(/\/?\*+$/, ""));

  assert.equal(resolveAlias("@/*"), path.join(REPO_ROOT, "src"));
  assert.equal(resolveAlias("@omniroute/open-sse"), path.join(REPO_ROOT, "open-sse"));
  assert.equal(resolveAlias("@omniroute/open-sse/*"), path.join(REPO_ROOT, "open-sse"));
});
