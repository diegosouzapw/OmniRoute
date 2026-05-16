#!/usr/bin/env node
/**
 * Strict environment variable contract checker.
 *
 * Enforces that every env var referenced in OmniRoute source code appears in
 * both `.env.example` and `docs/reference/ENVIRONMENT.md`, and that the two files agree
 * on the documented var set. Falls back to a small allowlist for variables
 * that are intentionally documented but not literally referenced (legacy
 * aliases, future-supported hooks) or vice versa.
 *
 *  Usage:
 *    node scripts/check/check-env-doc-sync.mjs           # strict (CI mode)
 *    node scripts/check/check-env-doc-sync.mjs --lenient # legacy report-only mode
 *
 * Strict mode exits non-zero if any of these are non-empty:
 *  - vars in code but missing from .env.example
 *  - vars in .env.example but missing from ENVIRONMENT.md
 *  - vars in ENVIRONMENT.md but missing from .env.example
 *
 * Programmatic API:
 *  Other Node tests can `import { runEnvDocSync } from "./check-env-doc-sync.mjs"`
 *  and pass `{ root, envExample, envDoc, codeVars, ignore, docOnlyAllowlist,
 *  envOnlyAllowlist }` to drive the checker against fixtures.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

// ─── Allowlists ────────────────────────────────────────────────────────────
// Env vars referenced in code that should NOT trigger documentation drift.
// These are usually system/process vars or harness-only knobs.
const IGNORE_FROM_CODE = new Set([
  "NODE_ENV",
  "PATH",
  "HOME",
  "USER",
  "PWD",
  "SHELL",
  "TERM",
  "TZ",
  "LANG",
  "LC_ALL",
  "LC_MESSAGES",
  "CI",
  "GITHUB_ACTIONS",
  "RUNNER_OS",
  // OS / Node internals frequently surfaced by indirect dependencies.
  "APPDATA",
  "LOCALAPPDATA",
  "XDG_CONFIG_HOME",
  "USERPROFILE",
  "PREFIX",
  // X11 display server — set by the OS/session manager, not OmniRoute config.
  "DISPLAY",
  // Next.js / Node test runners — these are framework-managed.
  "NEXT_DIST_DIR",
  "NEXT_PHASE",
  "NEXT_RUNTIME",
  "VITEST",
  // CI providers (set by the runner).
  "GITHUB_BASE_REF",
  "GITHUB_BASE_SHA",
  // CLI machine-id token opt-out (server-side flag; not user-configurable via .env).
  "OMNIROUTE_DISABLE_CLI_TOKEN",
  // update-notifier opt-out for the CLI binary.
  "OMNIROUTE_NO_UPDATE_NOTIFIER",
  // Platform / OS detection vars read by CLI environment helper (bin/cli/utils/environment.mjs).
  // These are external signals set by the host OS or cloud provider — not OmniRoute config.
  "CODESPACES",
  "GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN",
  "GITPOD_WORKSPACE_ID",
  "NO_COLOR",
  "REPL_ID",
  "REPL_SLUG",
  "WSL_DISTRO_NAME",
  "WSL_INTEROP",
  // X11/Wayland display server vars used by tray heuristic (isTraySupported).
  "DISPLAY",
  "WAYLAND_DISPLAY",
  // Build-time override for OpenAPI spec path used by generate-api-commands.mjs.
  "OPENAPI_SPEC",
  // Aliases for documented vars handled via fallback ordering.
  "API_KEY",
  "APP_URL",
  "PUBLIC_URL",
  "ANTHROPIC_API_URL",
  "OPENAI_API_URL",
  "LOG_LEVEL",
  // Internal QA helpers used only by scripts/ and Playwright.
  "QA_BASE_URL",
  "QA_LOCALES",
  "QA_REPORT_SUFFIX",
  "QA_ROUTES",
  // Doctor diagnostic flags (no runtime behavior yet — placeholders).
  "OMNIROUTE_DOCTOR_HOST",
  "OMNIROUTE_DOCTOR_LIVENESS_URL",
  "OMNIROUTE_PROVIDER_CATALOG_PATH",
  "OMNIROUTE_PROVIDER_TEST_MODEL",
  // Source typo / placeholder.
  "OMNIROUT",
  // Static config alias path (the canonical var is OMNIROUTE_PAYLOAD_RULES_PATH).
  "PAYLOAD_RULES_PATH",
]);

// Vars documented in ENVIRONMENT.md but intentionally absent from .env.example.
// Used for past-tense documentation (Audit / Dead vars section), legacy aliases
// with no runtime hook, and section anchors that look like vars to the regex.
const DOC_ONLY_ALLOWLIST = new Set([
  // Audit history (Removed / Dead Variables section).
  "CEREBRAS_API_KEY",
  "COHERE_API_KEY",
  "FIREWORKS_API_KEY",
  "GROQ_API_KEY",
  "MISTRAL_API_KEY",
  "NEBIUS_API_KEY",
  "PERPLEXITY_API_KEY",
  "TOGETHER_API_KEY",
  "XAI_API_KEY",
  "QIANFAN_API_KEY",
  "CURSOR_PROTOBUF_DEBUG",
  "CLI_COMPAT_KIRO",
  "CLI_KIMI_CODING_BIN",
  "CLI_ROO_BIN",
  "IFLOW_OAUTH_CLIENT_ID",
  "IFLOW_OAUTH_CLIENT_SECRET",
  // Source-code constants accidentally captured by the doc regex.
  "CLI_COMPAT_OMITTED_PROVIDER_IDS",
  // Sample default values that look like SHOUTY_NAMES (not env vars).
  "CHANGEME",
  // Legacy aliases — present in docs as "would be aliases" but read-only
  // through their canonical names today.
  "OMNIROUTE_CRYPT_KEY",
  "OMNIROUTE_API_KEY_BASE64",
  // Future-supported hooks: documented but currently hardcoded constants.
  "MAX_RETRY_INTERVAL_SEC",
  "REQUEST_RETRY",
  "SKILLS_EXECUTION_TIMEOUT_MS",
  "SKILLS_SANDBOX_DOCKER_IMAGE",
]);

// Vars present in .env.example but intentionally absent from ENVIRONMENT.md.
// Empty today — kept for forward compatibility / explicit exemption.
const ENV_ONLY_ALLOWLIST = new Set([]);

// ─── Parsing helpers ───────────────────────────────────────────────────────

/**
 * Extract VAR= entries from a `.env`-style file (handles commented examples).
 */
export function parseEnvExampleVars(text) {
  const vars = new Set();
  for (const line of String(text ?? "").split("\n")) {
    const m = line.match(/^#?\s*([A-Z][A-Z0-9_]+)\s*=/);
    if (m) vars.add(m[1]);
  }
  return vars;
}

/**
 * Extract `VARNAME` tokens from a markdown doc — matches anything in backticks
 * that looks like an env var (uppercase + digit + underscore).
 */
export function parseEnvDocVars(text) {
  const vars = new Set();
  for (const m of String(text ?? "").matchAll(/`([A-Z][A-Z0-9_]{2,})`/g)) {
    vars.add(m[1]);
  }
  return vars;
}

/**
 * Collect environment variable references in source code via grep against
 * the `process.env` member access pattern.
 */
function scanCodeVars({ cwd } = {}) {
  const repoRoot = cwd ?? REPO_ROOT;
  const stdout = execSync(
    "grep -rhoE 'process\\.env\\.[A-Z][A-Z0-9_]+' " +
      "src/ open-sse/ bin/ scripts/ electron/main.js electron/preload.js 2>/dev/null || true",
    { cwd: repoRoot, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  const vars = new Set();
  for (const line of stdout.split("\n")) {
    const m = line.match(/^process\.env\.([A-Z][A-Z0-9_]+)$/);
    if (m) vars.add(m[1]);
  }
  return vars;
}

/**
 * Diff helper.
 */
function diff(set, against) {
  return [...set].filter((v) => !against.has(v)).sort();
}

// ─── Programmatic entry point ──────────────────────────────────────────────

/**
 * Run the contract checker. All inputs are overridable for tests.
 *
 * Returns `{ ok: boolean, summary, problems: { codeMissingEnv, envMissingDoc,
 *   docMissingEnv } }`.
 */
export function runEnvDocSync(options = {}) {
  const ignore = options.ignore ?? IGNORE_FROM_CODE;
  const docOnly = options.docOnlyAllowlist ?? DOC_ONLY_ALLOWLIST;
  const envOnly = options.envOnlyAllowlist ?? ENV_ONLY_ALLOWLIST;

  const envExampleText =
    options.envExampleText ??
    (options.envExamplePath
      ? fs.readFileSync(options.envExamplePath, "utf8")
      : fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8"));
  const envDocText =
    options.envDocText ??
    (options.envDocPath
      ? fs.readFileSync(options.envDocPath, "utf8")
      : fs.readFileSync(path.join(REPO_ROOT, "docs", "reference", "ENVIRONMENT.md"), "utf8"));

  const envVars = parseEnvExampleVars(envExampleText);
  const docVars = parseEnvDocVars(envDocText);

  const codeVars = new Set(
    [...(options.codeVars ?? scanCodeVars({ cwd: options.root }))].filter((v) => !ignore.has(v))
  );

  const codeMissingEnv = diff(codeVars, envVars);
  const envMissingDoc = diff(envVars, docVars).filter((v) => !envOnly.has(v));
  const docMissingEnv = diff(docVars, envVars).filter((v) => !docOnly.has(v));

  const ok =
    codeMissingEnv.length === 0 && envMissingDoc.length === 0 && docMissingEnv.length === 0;

  return {
    ok,
    summary: {
      code: codeVars.size,
      envExample: envVars.size,
      doc: docVars.size,
    },
    problems: {
      codeMissingEnv,
      envMissingDoc,
      docMissingEnv,
    },
  };
}

// ─── CLI ───────────────────────────────────────────────────────────────────

function printList(label, list, marker) {
  if (list.length === 0) {
    console.log(`  ${marker || "✓"} ${label}: none`);
    return;
  }
  console.log(`  ✗ ${label}: ${list.length}`);
  for (const v of list.slice(0, 50)) console.log(`     - ${v}`);
  if (list.length > 50) console.log(`     ... and ${list.length - 50} more`);
}

function main() {
  const lenient = process.argv.includes("--lenient");
  const result = runEnvDocSync();

  console.log("Env var contract sync report");
  console.log("============================");
  console.log(`Code references:          ${result.summary.code} unique vars`);
  console.log(`In .env.example:          ${result.summary.envExample} unique vars`);
  console.log(`In docs/reference/ENVIRONMENT.md: ${result.summary.doc} unique vars`);
  console.log();

  printList("In code but missing from .env.example", result.problems.codeMissingEnv);
  printList("In .env.example but missing from ENVIRONMENT.md", result.problems.envMissingDoc);
  printList("In ENVIRONMENT.md but missing from .env.example", result.problems.docMissingEnv);

  if (result.ok) {
    console.log("\n✓ Env / docs contract is in sync.");
    process.exit(0);
  }

  if (lenient) {
    console.log("\n⚠ Drift detected (lenient mode — exit 0).");
    process.exit(0);
  }

  console.log(
    "\n✗ Env / docs contract is out of sync. Update .env.example, docs/reference/ENVIRONMENT.md,"
  );
  console.log("  or the allowlists in scripts/check/check-env-doc-sync.mjs and try again.");
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
