import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const HUB_RE = /(setupPolyfill|tsconfig|package\.json|package-lock\.json|\.env|vitest\.config|stryker\.conf)/;
// A changed file counts as a "run-it" test ONLY if it is a node:test unit file the TIA
// step can actually run via `node --test` — i.e. it mirrors the `npm run test:unit` glob.
// This EXCLUDES vitest files (`.test.tsx`, `tests/unit/autoCombo/**`), e2e and integration
// tests, and `src/**/__tests__`/`open-sse/**/__tests__`, which can't run under node:test.
const UNIT_SUBDIRS =
  "api|auth|authz|build|cli|cli-helper|compression|correctness|cors|dashboard|db|db-adapters|docs|gamification|guardrails|lib|mcp|runtime|security|services|settings|shared|ui";
const TEST_RE = new RegExp(`^tests/unit/([^/]+\\.test\\.ts$|(${UNIT_SUBDIRS})/.*\\.test\\.ts$)`);

export function selectImpacted({ changed, map }) {
  const out = new Set();
  for (const f of changed) {
    if (HUB_RE.test(f)) return ["__RUN_ALL__"];
    if (TEST_RE.test(f)) {
      out.add(f);
      continue;
    }
    const isSource =
      f.startsWith("src/") ||
      f.startsWith("open-sse/") ||
      f.startsWith("electron/") ||
      f.startsWith("bin/");
    if (!isSource) continue;
    const hits = map.sources[f];
    if (!hits) return ["__RUN_ALL__"];
    hits.forEach((t) => out.add(t));
  }
  return [...out].sort();
}

function changedFiles() {
  const baseRef = process.env.GITHUB_BASE_REF;
  const baseTarget = process.env.GITHUB_BASE_SHA || (baseRef ? `origin/${baseRef}` : "HEAD~1");
  const stdout = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMR", `${baseTarget}...HEAD`],
    { cwd: ROOT, encoding: "utf8" }
  );
  return stdout
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mapPath = path.join(ROOT, "config/quality/test-impact-map.json");
  let map;
  try {
    map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
  } catch {
    console.log("__RUN_ALL__");
    process.exit(0);
  }
  const sel = selectImpacted({ changed: changedFiles(), map });
  process.stdout.write(sel.join("\n") + "\n");
}
