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
 *
 * Second, ADDITIVE level — `domains` (one-CI-policy step 1, RFC #8084 D1-full):
 * the sorted set of real change domains a diff touches (see CHANGE_DOMAINS).
 * It is only EXPOSED (stdout `domains=<csv>` + `outputs.domains` of the
 * `changes` job in ci.yml / quality.yml); no job is gated on it yet. The legacy
 * flags above and their stdout lines stay byte-identical. Unknown paths map to
 * `core` (fail-safe, same spirit as code=true).
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
    if (f.startsWith("scripts/i18n/") || f === "config/i18n.json" || f.startsWith("src/i18n/")) {
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

/**
 * Closed, alphabetically sorted set of change domains. `core` is the fail-safe
 * bucket for shared code and for any path no other rule claims.
 */
export const CHANGE_DOMAINS = Object.freeze([
  "build",
  "catalog",
  "cli",
  "core",
  "db",
  "docs",
  "i18n",
  "provider",
  "routing",
  "tests",
  "ui",
  "workflow",
]);

// open-sse/services/** entries that implement routing / resilience (combo
// strategies, account + provider fallback, cooldowns, rate limiting, breakers).
// Every other service file is shared runtime → `core`.
const ROUTING_SERVICE_PREFIXES = [
  "open-sse/services/combo", // combo.ts, combo/, comboConfig.ts, comboMetrics.ts, …
  "open-sse/services/autoCombo/",
  "open-sse/services/routing/",
  "open-sse/services/routingStrategies.",
  "open-sse/services/accountFallback", // accountFallback.ts + accountFallback/
  "open-sse/services/accountSelector.",
  "open-sse/services/accountSemaphore.",
  "open-sse/services/connectionCircuitBreaker.",
  "open-sse/services/providerCooldownTracker.",
  "open-sse/services/rateLimitManager", // rateLimitManager.ts + rateLimitManager/
  "open-sse/services/rateLimitSemaphore.",
  "open-sse/services/emergencyFallback.",
  "open-sse/services/modelFamilyFallback.",
  "open-sse/services/fusion.",
  "open-sse/services/wildcardRouter.",
  "open-sse/services/taskAwareRout", // taskAwareRouter.ts, taskAwareRouting.ts
  "open-sse/services/imageCombo.",
  "open-sse/services/speechCombo.",
  "open-sse/services/videoCombo.",
  "src/lib/resilience/",
  "src/lib/routing/",
  "src/lib/combos/",
  "src/shared/utils/circuitBreaker.",
];

const BUILD_ROOT_FILES = new Set([
  "package.json",
  "package-lock.json",
  ".dockerignore",
  ".npmrc",
  ".npmignore",
  ".node-version",
  ".nvmrc",
]);

/**
 * Map ONE changed path to exactly one domain. Rule order matters: tests and docs
 * win over the source tree they live in (open-sse/services/__tests__/…,
 * open-sse/services/AGENTS.md), mirroring how classifyPaths() routes `.md`.
 * @param {string} raw relative path from git diff
 * @returns {string} a member of CHANGE_DOMAINS
 */
export function classifyDomain(raw) {
  const f = String(raw || "")
    .trim()
    .replace(/\\/g, "/");

  if (
    f.startsWith(".github/workflows/") ||
    f.startsWith(".github/actions/") ||
    f === ".zizmor.yml"
  ) {
    return "workflow";
  }

  if (
    f.startsWith("tests/") ||
    f.includes("/__tests__/") ||
    /\.(test|spec)\.[cm]?[jt]sx?$/.test(f) ||
    /^vitest[^/]*\.(config|workspace)\.[cm]?[jt]s$/.test(f) ||
    f.startsWith("playwright.config.")
  ) {
    return "tests";
  }

  if (f.startsWith("src/i18n/") || f.startsWith("scripts/i18n/") || f === "config/i18n.json") {
    return "i18n";
  }

  if (f.startsWith("docs/") || f.endsWith(".md")) return "docs";

  if (
    BUILD_ROOT_FILES.has(f) ||
    /(^|\/)package\.json$/.test(f) ||
    f.startsWith("next.config.") ||
    /^Dockerfile(\.|$)/.test(f) ||
    /^docker-compose[^/]*\.ya?ml$/.test(f) ||
    /^tsconfig[^/]*\.json$/.test(f) ||
    f.startsWith("scripts/build/")
  ) {
    return "build";
  }

  if (f.startsWith("bin/")) return "cli";

  if (f.startsWith("src/lib/db/")) return "db"; // includes src/lib/db/migrations/

  if (
    f.startsWith("src/app/api/v1/models/") ||
    f.startsWith("src/lib/catalog/") ||
    f.startsWith("open-sse/config/providerRegistry")
  ) {
    return "catalog";
  }

  if (
    f.startsWith("open-sse/executors/") ||
    f.startsWith("open-sse/translator/") ||
    f.startsWith("open-sse/config/providers/") ||
    f.startsWith("src/shared/constants/providers") // providers.ts + providers/
  ) {
    return "provider";
  }

  if (ROUTING_SERVICE_PREFIXES.some((p) => f.startsWith(p))) return "routing";

  if (f.startsWith("src/app/(dashboard)/") || f.startsWith("src/shared/components/")) {
    return "ui";
  }

  // Shared runtime (open-sse/handlers, open-sse/utils, src/server, the rest of
  // src/lib, …) AND every unknown path: fail-safe to `core`.
  return "core";
}

/**
 * @param {string[]} files relative paths from git diff
 * @returns {string[]} sorted, de-duplicated domains (empty for an empty diff)
 */
export function classifyDomains(files) {
  const seen = new Set();
  for (const raw of files) {
    if (!String(raw || "").trim()) continue;
    seen.add(classifyDomain(raw));
  }
  return CHANGE_DOMAINS.filter((d) => seen.has(d));
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
  // Legacy lines first and unchanged; `domains` is appended (additive).
  process.stdout.write(
    `code=${c.code}\ndocs=${c.docs}\ni18n=${c.i18n}\nworkflow=${c.workflow}\ntestsOnly=${c.testsOnly}\n`
  );
  process.stdout.write(`domains=${classifyDomains(files).join(",")}\n`);
}

const isMain =
  process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main();
}
