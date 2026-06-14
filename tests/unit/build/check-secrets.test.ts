// tests/unit/build/check-secrets.test.ts
// TDD unit tests for scripts/check/check-secrets.mjs — Task 7.18 gitleaks.
//
// Strategy: test the exported pure function without spawning gitleaks.
// All fixtures are synthetic gitleaks --report-format json outputs.
//   - parseGitleaksJson() — parses gitleaks findings array
import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { parseGitleaksJson } from "../../../scripts/check/check-secrets.mjs";

// ---------------------------------------------------------------------------
// Fixtures — synthetic gitleaks --report-format json output
// ---------------------------------------------------------------------------

/** Helper to build a minimal gitleaks finding. */
function makeFinding(overrides: {
  ruleId?: string;
  file?: string;
  description?: string;
  startLine?: number;
  secret?: string;
} = {}) {
  return {
    Description: overrides.description ?? "GitHub Personal Access Token",
    StartLine: overrides.startLine ?? 42,
    EndLine: overrides.startLine ?? 42,
    StartColumn: 15,
    EndColumn: 50,
    Match: "REDACTED",
    Secret: overrides.secret ?? "ghp_REDACTED",
    File: overrides.file ?? "src/config/secrets.ts",
    SymlinkFile: "",
    Commit: "",
    Entropy: 4.5,
    Author: "Developer",
    Email: "dev@example.com",
    Date: "2026-01-01T00:00:00Z",
    Message: "add config",
    Tags: [],
    RuleID: overrides.ruleId ?? "github-pat",
    Fingerprint: "abc123",
  };
}

// ---------------------------------------------------------------------------
// parseGitleaksJson — input inválido / vazio
// ---------------------------------------------------------------------------

test("parseGitleaksJson: null retorna findingCount=0", () => {
  const result = parseGitleaksJson(null);
  assert.equal(result.findingCount, 0);
  assert.deepEqual(result.byRule, {});
  assert.deepEqual(result.byFile, {});
});

test("parseGitleaksJson: undefined retorna findingCount=0", () => {
  const result = parseGitleaksJson(undefined as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: array vazio retorna findingCount=0", () => {
  const result = parseGitleaksJson([]);
  assert.equal(result.findingCount, 0);
  assert.deepEqual(result.byRule, {});
  assert.deepEqual(result.byFile, {});
});

test("parseGitleaksJson: objeto (não-array) retorna findingCount=0", () => {
  const result = parseGitleaksJson({ RuleID: "github-pat" } as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: string retorna findingCount=0", () => {
  const result = parseGitleaksJson("findings" as unknown as null);
  assert.equal(result.findingCount, 0);
});

test("parseGitleaksJson: número retorna findingCount=0", () => {
  const result = parseGitleaksJson(42 as unknown as null);
  assert.equal(result.findingCount, 0);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — contagem básica
// ---------------------------------------------------------------------------

test("parseGitleaksJson: 1 finding retorna findingCount=1", () => {
  const result = parseGitleaksJson([makeFinding()]);
  assert.equal(result.findingCount, 1);
});

test("parseGitleaksJson: 3 findings retorna findingCount=3", () => {
  const findings = [
    makeFinding({ ruleId: "github-pat", file: "src/a.ts" }),
    makeFinding({ ruleId: "aws-access-key", file: "src/b.ts" }),
    makeFinding({ ruleId: "generic-api-key", file: "src/c.ts" }),
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.findingCount, 3);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — agrupamento por RuleID
// ---------------------------------------------------------------------------

test("parseGitleaksJson: agrupa por RuleID em byRule", () => {
  const findings = [
    makeFinding({ ruleId: "github-pat" }),
    makeFinding({ ruleId: "aws-access-key" }),
    makeFinding({ ruleId: "github-pat" }), // segundo github-pat
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.byRule["github-pat"], 2);
  assert.equal(result.byRule["aws-access-key"], 1);
});

test("parseGitleaksJson: RuleID ausente usa 'unknown'", () => {
  const finding = {
    Description: "Some secret",
    StartLine: 1,
    File: "src/x.ts",
    // sem RuleID
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.findingCount, 1);
  assert.equal(result.byRule["unknown"], 1);
});

test("parseGitleaksJson: suporta campo ruleId (camelCase) como fallback", () => {
  const finding = {
    ruleId: "lowercase-rule",
    File: "src/x.ts",
    Description: "test",
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byRule["lowercase-rule"], 1);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — agrupamento por arquivo
// ---------------------------------------------------------------------------

test("parseGitleaksJson: agrupa por File em byFile", () => {
  const findings = [
    makeFinding({ file: "src/config.ts", ruleId: "github-pat" }),
    makeFinding({ file: "src/config.ts", ruleId: "aws-access-key" }), // mesmo arquivo
    makeFinding({ file: "tests/fixtures/token.ts", ruleId: "github-pat" }),
  ];
  const result = parseGitleaksJson(findings);
  assert.equal(result.byFile["src/config.ts"], 2);
  assert.equal(result.byFile["tests/fixtures/token.ts"], 1);
});

test("parseGitleaksJson: File ausente usa 'unknown' em byFile", () => {
  const finding = {
    RuleID: "github-pat",
    Description: "Token",
    StartLine: 1,
    // sem File
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byFile["unknown"], 1);
});

test("parseGitleaksJson: suporta campo file (camelCase) como fallback", () => {
  const finding = {
    RuleID: "generic-api-key",
    file: "src/config.js",
    Description: "test",
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byFile["src/config.js"], 1);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — entradas inválidas dentro do array
// ---------------------------------------------------------------------------

test("parseGitleaksJson: entradas null dentro do array são ignoradas", () => {
  const findings = [
    makeFinding(),
    null,
    makeFinding({ ruleId: "aws-access-key" }),
  ] as (ReturnType<typeof makeFinding> | null)[];
  const result = parseGitleaksJson(findings as unknown as ReturnType<typeof makeFinding>[]);
  assert.equal(result.findingCount, 2, "null entries should be skipped");
});

test("parseGitleaksJson: entradas primitivas dentro do array são ignoradas", () => {
  const findings = [
    makeFinding(),
    "string-entry",
    42,
    makeFinding({ ruleId: "aws-access-key" }),
  ] as unknown[];
  const result = parseGitleaksJson(findings as ReturnType<typeof makeFinding>[]);
  assert.equal(result.findingCount, 2, "primitive entries should be skipped");
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — casos de borda do RuleID PascalCase
// ---------------------------------------------------------------------------

test("parseGitleaksJson: RuleID PascalCase como emitido pelo gitleaks", () => {
  // gitleaks emite RuleID com PascalCase nos campos
  const finding = {
    RuleID: "github-fine-grained-pat",
    File: "config/auth.yaml",
    Description: "Fine-grained PAT",
    StartLine: 3,
  };
  const result = parseGitleaksJson([finding]);
  assert.equal(result.byRule["github-fine-grained-pat"], 1);
});

// ---------------------------------------------------------------------------
// parseGitleaksJson — invariantes estruturais
// ---------------------------------------------------------------------------

test("parseGitleaksJson: findingCount == soma de todos os byRule values", () => {
  const findings = [
    makeFinding({ ruleId: "a" }),
    makeFinding({ ruleId: "b" }),
    makeFinding({ ruleId: "a" }),
    makeFinding({ ruleId: "c" }),
  ];
  const result = parseGitleaksJson(findings);
  const sumByRule = Object.values(result.byRule).reduce((s, n) => s + n, 0);
  assert.equal(result.findingCount, sumByRule, "findingCount must equal sum of byRule counts");
});

test("parseGitleaksJson: findingCount == soma de todos os byFile values", () => {
  const findings = [
    makeFinding({ file: "src/a.ts" }),
    makeFinding({ file: "src/b.ts" }),
    makeFinding({ file: "src/a.ts" }),
  ];
  const result = parseGitleaksJson(findings);
  const sumByFile = Object.values(result.byFile).reduce((s, n) => s + n, 0);
  assert.equal(result.findingCount, sumByFile, "findingCount must equal sum of byFile counts");
});
