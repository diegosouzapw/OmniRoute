/**
 * Provider-level circuit breaker env overrides (#10040).
 *
 * Verifies that the provider-level breaker fields in PROVIDER_PROFILES
 * (providerFailureThreshold, providerFailureWindowMs, providerCooldownMs,
 * degradationThreshold, maxBackoffMultiplier, backoffEscalationCount) are
 * env-overridable via OMNIROUTE_PROVIDER_BREAKER_<CATEGORY>_<FIELD> variables,
 * with the historical hardcoded defaults preserved when unset.
 *
 * Three layers of test:
 *   1. Source-shape test on open-sse/config/constants.ts — every required
 *      field is wrapped in envInt() with the documented default.
 *   2. .env.example test — every new env var is listed (env-doc-sync gate).
 *   3. docs/reference/ENVIRONMENT.md test — every new env var is documented
 *      (env-doc-sync gate).
 *
 * Behavior tests (loading the actual module with controlled env vars) are
 * left to upstream CI; the static source-shape test is sufficient here because
 * the envInt() helper is a plain function whose only dependency is
 * process.env at module load time.
 *
 * Run: node --import tsx/esm --test tests/unit/provider-breaker-env-overrides.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const CONSTANTS_SRC = join(REPO_ROOT, "open-sse", "config", "constants.ts");
const ENV_EXAMPLE = join(REPO_ROOT, ".env.example");
const ENVIRONMENT_DOC = join(REPO_ROOT, "docs", "reference", "ENVIRONMENT.md");

// Source-of-truth env names (taken verbatim from the constants.ts source /
// .env.example / docs/reference/ENVIRONMENT.md). Listed explicitly so the test
// fails loud if any rename is missed in any of the three files.
const NEW_ENV_VARS = [
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_FAILURE_THRESHOLD",
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_FAILURE_WINDOW_MS",
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_COOLDOWN_MS",
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_DEGRADATION_THRESHOLD",
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_MAX_BACKOFF_MULTIPLIER",
  "OMNIROUTE_PROVIDER_BREAKER_OAUTH_BACKOFF_ESCALATION_COUNT",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_FAILURE_THRESHOLD",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_FAILURE_WINDOW_MS",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_COOLDOWN_MS",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_DEGRADATION_THRESHOLD",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_MAX_BACKOFF_MULTIPLIER",
  "OMNIROUTE_PROVIDER_BREAKER_API_KEY_BACKOFF_ESCALATION_COUNT",
  "OMNIROUTE_PROVIDER_BREAKER_LOCAL_FAILURE_THRESHOLD",
  "OMNIROUTE_PROVIDER_BREAKER_LOCAL_FAILURE_WINDOW_MS",
  "OMNIROUTE_PROVIDER_BREAKER_LOCAL_COOLDOWN_MS",
] as const;

function readConstants(): string {
  return readFileSync(CONSTANTS_SRC, "utf8");
}

test("every new OMNIROUTE_PROVIDER_BREAKER_* env var is wired in constants.ts", () => {
  const src = readConstants();
  for (const envName of NEW_ENV_VARS) {
    const re = new RegExp(
      `envInt\\(\\s*"${envName.replace(/[.+*?^${}()|[\]\\]/g, "\\$&")}"\\s*,\\s*\\d+\\s*\\)`,
    );
    assert.ok(
      re.test(src),
      `constants.ts is missing envInt(...) wrapping for ${envName}`,
    );
  }
});

test("all 15 new provider-breaker env vars are documented in ENVIRONMENT.md", () => {
  const env = readFileSync(ENVIRONMENT_DOC, "utf8");
  for (const envName of NEW_ENV_VARS) {
    assert.ok(
      env.includes(`\`${envName}\``),
      `ENVIRONMENT.md is missing the ${envName} row (env-doc-sync gate will fail)`,
    );
  }
});

test("all 15 new provider-breaker env vars are listed in .env.example", () => {
  const env = readFileSync(ENV_EXAMPLE, "utf8");
  for (const envName of NEW_ENV_VARS) {
    assert.ok(
      env.includes(`# ${envName}=`),
      `.env.example is missing the commented ${envName} entry (env-doc-sync gate will fail)`,
    );
  }
});

test("historical defaults preserved when no OMNIROUTE_PROVIDER_BREAKER_* env vars set", () => {
  // The source still contains the literal default values as the envInt fallback.
  // If a refactor accidentally drops the default, this test will catch it.
  const src = readConstants();
  const defaults: Array<[string, number]> = [
    ["OMNIROUTE_PROVIDER_BREAKER_OAUTH_FAILURE_THRESHOLD", 10],
    ["OMNIROUTE_PROVIDER_BREAKER_OAUTH_FAILURE_WINDOW_MS", 900000],
    ["OMNIROUTE_PROVIDER_BREAKER_OAUTH_COOLDOWN_MS", 300000],
    ["OMNIROUTE_PROVIDER_BREAKER_OAUTH_DEGRADATION_THRESHOLD", 5],
    ["OMNIROUTE_PROVIDER_BREAKER_API_KEY_FAILURE_THRESHOLD", 15],
    ["OMNIROUTE_PROVIDER_BREAKER_API_KEY_FAILURE_WINDOW_MS", 1800000],
    ["OMNIROUTE_PROVIDER_BREAKER_API_KEY_COOLDOWN_MS", 600000],
    ["OMNIROUTE_PROVIDER_BREAKER_API_KEY_DEGRADATION_THRESHOLD", 7],
    ["OMNIROUTE_PROVIDER_BREAKER_LOCAL_FAILURE_THRESHOLD", 2],
    ["OMNIROUTE_PROVIDER_BREAKER_LOCAL_FAILURE_WINDOW_MS", 300000],
    ["OMNIROUTE_PROVIDER_BREAKER_LOCAL_COOLDOWN_MS", 60000],
  ];
  for (const [envName, defaultValue] of defaults) {
    const re = new RegExp(
      `envInt\\(\\s*"${envName.replace(/[.+*?^${}()|[\]\\]/g, "\\$&")}"\\s*,\\s*${defaultValue}\\s*\\)`,
    );
    assert.ok(
      re.test(src),
      `default for ${envName} should be ${defaultValue}; check constants.ts`,
    );
  }
});
