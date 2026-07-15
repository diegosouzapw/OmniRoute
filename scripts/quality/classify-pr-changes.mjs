#!/usr/bin/env node
/**
 * PR change classification for ci.yml path filters.
 *
 * Why this exists (not "skip work for free"):
 * - code  → typecheck, unit/vitest, lint bag, quality ratchets (code regressions)
 * - docs  → docs-sync / prose (doc/API contract regressions)
 * - i18n  → message/UI-key validation (translation regressions)
 * - workflow → CI definition changes (always treat as code — gates protect the gates)
 *
 * Pure docs or pure message-catalog PRs should NOT pay full unit/lint wall time.
 * Unknown paths default to code (fail-safe: better over-run than under-protect).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @param {string[]} files relative paths from git diff
 * @returns {{ code: boolean, docs: boolean, i18n: boolean, workflow: boolean, testsOnly: boolean }}
 */
export function classifyPaths(files) {
  let code = false;
  let docs = false;
  let i18n = false;
  let workflow = false;
  // testsOnly (WS3.1 fast lane): every file lives under tests/ AND none is an e2e
  // spec — such a diff cannot change the served app, so the E2E matrix may skip.
  // Changing tests/e2e/** REQUIRES running e2e, so it is excluded from the shortcut.
  let sawAnyFile = false;
  let sawNonTest = false;
  let sawE2eTest = false;

  for (const raw of files) {
    const f = String(raw || "")
      .trim()
      .replace(/\\/g, "/");
    if (!f) continue;
    sawAnyFile = true;
    if (f.startsWith("tests/e2e/")) sawE2eTest = true;
    else if (!f.startsWith("tests/")) sawNonTest = true;

    if (f.startsWith(".github/workflows/") || f === ".zizmor.yml") {
      workflow = true;
      // Workflow edits can weaken or remove gates — treat as code.
      code = true;
      continue;
    }

    // Message catalogs only: translation content, not runtime TS.
    if (f.startsWith("src/i18n/messages/")) {
      i18n = true;
      continue;
    }

    // i18n tooling / non-message i18n source → also code (scripts, config, loaders).
    if (
      f.startsWith("scripts/i18n/") ||
      f === "config/i18n.json" ||
      f.startsWith("src/i18n/")
    ) {
      i18n = true;
      code = true;
      continue;
    }

    if (f.startsWith("docs/") || f.endsWith(".md")) {
      docs = true;
      continue;
    }

    if (
      f.startsWith("src/") ||
      f.startsWith("open-sse/") ||
      f.startsWith("bin/") ||
      f.startsWith("electron/") ||
      f.startsWith("tests/") ||
      f.startsWith("scripts/") ||
      f.startsWith("db/") ||
      f.startsWith("config/") ||
      f === "package.json" ||
      f === "package-lock.json" ||
      /^tsconfig.*\.json$/.test(f) ||
      f.startsWith("next.config.") ||
      f.startsWith("vitest") ||
      f.startsWith("playwright.config.")
    ) {
      code = true;
      continue;
    }

    // Fail-safe: unknown path class → code (do not skip heavy gates by accident).
    code = true;
  }

  return { code, docs, i18n, workflow, testsOnly: sawAnyFile && !sawNonTest && !sawE2eTest };
}

function main() {
  const listPath = process.argv[2];
  let files;
  if (listPath && listPath !== "-") {
    // Both CI callers pass a workspace-relative file (changed-files.txt); confine
    // the argument to the working directory so a stray/hostile path can never
    // read outside the checkout (path-traversal guard).
    const resolved = path.resolve(process.cwd(), listPath);
    const rel = path.relative(process.cwd(), resolved);
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      console.error(`[classify-pr-changes] list path escapes the workspace: ${listPath}`);
      process.exit(1);
    }
    files = fs
      .readFileSync(resolved, "utf8")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    const stdin = fs.readFileSync(0, "utf8");
    files = stdin
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const c = classifyPaths(files);
  // GitHub Actions output format (also human-readable key=value).
  process.stdout.write(
    `code=${c.code}\ndocs=${c.docs}\ni18n=${c.i18n}\nworkflow=${c.workflow}\ntestsOnly=${c.testsOnly}\n`
  );
}

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main();
}
