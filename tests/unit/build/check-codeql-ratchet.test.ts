// tests/unit/build/check-codeql-ratchet.test.ts
// TDD unit tests for scripts/check/check-codeql-ratchet.mjs — Task 7.3 CodeQL ratchet.
//
// Strategy: test the exported pure function without calling the GitHub API.
// All fixtures are synthetic GitHub API responses.
//   - parseCodeQLAlerts() — filters + counts open, non-dismissed CodeQL alerts
//                           (Hard Rule #14: dismissed alerts do not count)
import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { parseCodeQLAlerts } from "../../../scripts/check/check-codeql-ratchet.mjs";

// ---------------------------------------------------------------------------
// Fixtures — synthetic GitHub code-scanning/alerts API responses
// ---------------------------------------------------------------------------

/** Helper to build a minimal alert object. */
function makeAlert(overrides: {
  number?: number;
  state?: "open" | "dismissed" | "fixed";
  tool?: string;
  ruleId?: string;
  severity?: string;
  securitySeverity?: string;
  dismissedReason?: string | null;
} = {}) {
  return {
    number: overrides.number ?? 1,
    state: overrides.state ?? "open",
    dismissed_reason: overrides.dismissedReason ?? null,
    dismissed_at: overrides.dismissedReason ? "2026-01-01T00:00:00Z" : null,
    tool: {
      name: overrides.tool ?? "CodeQL",
      guid: null,
      version: "2.16.0",
    },
    rule: {
      id: overrides.ruleId ?? "js/sql-injection",
      name: overrides.ruleId ?? "SQL Injection",
      severity: overrides.severity ?? "error",
      security_severity_level: overrides.securitySeverity ?? "high",
      description: "Vulnerability description",
    },
    most_recent_instance: {
      ref: "refs/heads/main",
      state: overrides.state ?? "open",
    },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
    url: "https://api.github.com/repos/owner/repo/code-scanning/alerts/1",
    html_url: "https://github.com/owner/repo/security/code-scanning/1",
  };
}

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — input inválido
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: null retorna alertCount=0", () => {
  const result = parseCodeQLAlerts(null);
  assert.equal(result.alertCount, 0);
  assert.deepEqual(result.bySeverity, {});
  assert.deepEqual(result.byRule, {});
});

test("parseCodeQLAlerts: undefined retorna alertCount=0", () => {
  const result = parseCodeQLAlerts(undefined as unknown as null);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: objeto (não-array) retorna alertCount=0", () => {
  const result = parseCodeQLAlerts({ number: 1, state: "open" } as unknown as null);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: string retorna alertCount=0", () => {
  const result = parseCodeQLAlerts("open" as unknown as null);
  assert.equal(result.alertCount, 0);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — array vazio
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: array vazio retorna alertCount=0", () => {
  const result = parseCodeQLAlerts([]);
  assert.equal(result.alertCount, 0);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — Hard Rule #14: dismissed alerts don't count
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: alerta dismissed NÃO conta (Hard Rule #14)", () => {
  const alerts = [
    makeAlert({ state: "dismissed", dismissedReason: "false positive" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "dismissed alert must not be counted");
});

test("parseCodeQLAlerts: alerta dismissed com razão 'used in tests' NÃO conta", () => {
  const alerts = [
    makeAlert({ state: "dismissed", dismissedReason: "used in tests" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: alerta dismissed independente da razão NÃO conta", () => {
  const alerts = [
    makeAlert({ state: "dismissed", dismissedReason: "wont fix" }),
    makeAlert({ number: 2, state: "dismissed", dismissedReason: "false positive" }),
    makeAlert({ number: 3, state: "dismissed", dismissedReason: "used in tests" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "all dismissed states must be excluded");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — estado fixed não conta
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: alerta fixed NÃO conta", () => {
  const alerts = [
    makeAlert({ state: "fixed" as "open" | "dismissed" | "fixed" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "fixed alerts are not open, must not count");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — somente alertas CodeQL (filtra outras ferramentas)
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: alertas de outras ferramentas são ignorados", () => {
  const alerts = [
    makeAlert({ tool: "Semgrep", ruleId: "semgrep-rule-1" }),
    makeAlert({ number: 2, tool: "ESLint", ruleId: "eslint-rule-1" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "only CodeQL alerts should be counted");
});

test("parseCodeQLAlerts: tool 'CodeQL' (maiúsculas) conta", () => {
  const alerts = [makeAlert({ tool: "CodeQL" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: tool 'codeql' (minúsculas) conta (case-insensitive)", () => {
  const alerts = [makeAlert({ tool: "codeql" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: tool 'CodeQL Community' também conta (contém 'codeql')", () => {
  const alerts = [makeAlert({ tool: "CodeQL Community" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — contagem de alertas open
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: 1 alerta open CodeQL retorna alertCount=1", () => {
  const alerts = [makeAlert({ state: "open" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: 3 alertas open retorna alertCount=3", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open" }),
    makeAlert({ number: 2, state: "open", ruleId: "js/xss" }),
    makeAlert({ number: 3, state: "open", ruleId: "js/path-injection" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 3);
});

test("parseCodeQLAlerts: mix de open, dismissed, fixed — conta só open", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open" }),
    makeAlert({ number: 2, state: "dismissed", dismissedReason: "false positive" }),
    makeAlert({ number: 3, state: "fixed" as "open" | "dismissed" | "fixed" }),
    makeAlert({ number: 4, state: "open", ruleId: "js/xss" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 2, "only 2 open, non-dismissed alerts");
});

test("parseCodeQLAlerts: mix de CodeQL e outras ferramentas — conta só CodeQL", () => {
  const alerts = [
    makeAlert({ number: 1, tool: "CodeQL", state: "open" }),
    makeAlert({ number: 2, tool: "Semgrep", state: "open" }),
    makeAlert({ number: 3, tool: "CodeQL", state: "open", ruleId: "js/xss" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 2, "only CodeQL open alerts");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — severidade
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: coleta bySeverity de security_severity_level", () => {
  const alerts = [
    makeAlert({ number: 1, securitySeverity: "critical" }),
    makeAlert({ number: 2, securitySeverity: "high" }),
    makeAlert({ number: 3, securitySeverity: "medium" }),
    makeAlert({ number: 4, securitySeverity: "high" }), // segundo high
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 4);
  assert.equal(result.bySeverity["critical"], 1);
  assert.equal(result.bySeverity["high"], 2);
  assert.equal(result.bySeverity["medium"], 1);
});

test("parseCodeQLAlerts: alerta sem security_severity_level usa rule.severity", () => {
  const alerts = [
    {
      ...makeAlert({ number: 1 }),
      rule: {
        id: "js/unused-local-variable",
        name: "Unused variable",
        severity: "warning",
        // sem security_severity_level
        description: "Local var not used",
      },
    },
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
  assert.ok(
    "warning" in result.bySeverity || "unknown" in result.bySeverity,
    "severity should be captured"
  );
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — byRule
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: agrupa por rule.id em byRule", () => {
  const alerts = [
    makeAlert({ number: 1, ruleId: "js/sql-injection" }),
    makeAlert({ number: 2, ruleId: "js/xss" }),
    makeAlert({ number: 3, ruleId: "js/sql-injection" }), // segundo do mesmo rule
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.byRule["js/sql-injection"], 2);
  assert.equal(result.byRule["js/xss"], 1);
});

test("parseCodeQLAlerts: alerta sem rule retorna byRule com 'unknown'", () => {
  const alert = {
    number: 1,
    state: "open",
    dismissed_reason: null,
    dismissed_at: null,
    tool: { name: "CodeQL", guid: null, version: "2.16.0" },
    // sem rule
  };
  const result = parseCodeQLAlerts([alert]);
  assert.equal(result.alertCount, 1);
  assert.ok("unknown" in result.byRule);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — dismissed não contamina contagens
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: dismissed com mesmo ruleId que open — dismissed não aparece em byRule", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open", ruleId: "js/sql-injection" }),
    makeAlert({ number: 2, state: "dismissed", ruleId: "js/sql-injection", dismissedReason: "false positive" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
  assert.equal(result.byRule["js/sql-injection"], 1, "only the open alert should appear in byRule");
});
