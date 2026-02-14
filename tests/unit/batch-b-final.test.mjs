/**
 * Batch B — Final Tasks Tests
 *
 * Tests for: evalRunner, a11yAudit, responsiveSpecs, compliance (noLog)
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// ──────────────── T-42: Eval Runner ────────────────

import {
  registerSuite,
  getSuite,
  listSuites,
  evaluateCase,
  runSuite,
  createScorecard,
  resetSuites,
} from "../../src/lib/evals/evalRunner.js";

describe("evalRunner", () => {
  after(() => {
    // Re-register golden set since resetSuites clears everything
    resetSuites();
  });

  it("should have golden-set suite pre-registered", () => {
    const suite = getSuite("golden-set");
    assert.ok(suite);
    assert.equal(suite.name, "OmniRoute Golden Set");
    assert.ok(suite.cases.length >= 10);
  });

  it("should list registered suites", () => {
    const suites = listSuites();
    assert.ok(suites.length >= 1);
    assert.ok(suites.some((s) => s.id === "golden-set"));
  });

  it("should evaluate exact match", () => {
    const result = evaluateCase(
      { id: "t1", name: "test", model: "test", input: {}, expected: { strategy: "exact", value: "hello" } },
      "hello"
    );
    assert.equal(result.passed, true);
  });

  it("should fail exact match on mismatch", () => {
    const result = evaluateCase(
      { id: "t2", name: "test", model: "test", input: {}, expected: { strategy: "exact", value: "hello" } },
      "world"
    );
    assert.equal(result.passed, false);
  });

  it("should evaluate contains (case-insensitive)", () => {
    const result = evaluateCase(
      { id: "t3", name: "test", model: "test", input: {}, expected: { strategy: "contains", value: "paris" } },
      "The capital is Paris."
    );
    assert.equal(result.passed, true);
  });

  it("should evaluate regex", () => {
    const result = evaluateCase(
      { id: "t4", name: "test", model: "test", input: {}, expected: { strategy: "regex", value: "\\d+" } },
      "The answer is 42."
    );
    assert.equal(result.passed, true);
  });

  it("should evaluate custom function", () => {
    const result = evaluateCase(
      {
        id: "t5", name: "test", model: "test", input: {},
        expected: { strategy: "custom", fn: (output) => output.length > 5 },
      },
      "this is long enough"
    );
    assert.equal(result.passed, true);
  });

  it("should handle unknown strategy gracefully", () => {
    const result = evaluateCase(
      { id: "t6", name: "test", model: "test", input: {}, expected: { strategy: "unknown" } },
      "test"
    );
    assert.equal(result.passed, false);
    assert.ok(result.error.includes("Unknown strategy"));
  });

  it("should run suite and produce summary", () => {
    registerSuite({
      id: "test-suite",
      name: "Test Suite",
      cases: [
        { id: "c1", name: "pass", model: "m", input: {}, expected: { strategy: "contains", value: "yes" } },
        { id: "c2", name: "fail", model: "m", input: {}, expected: { strategy: "contains", value: "no" } },
      ],
    });

    const result = runSuite("test-suite", { c1: "yes it works", c2: "yes it works" });
    assert.equal(result.summary.total, 2);
    assert.equal(result.summary.passed, 1);
    assert.equal(result.summary.failed, 1);
    assert.equal(result.summary.passRate, 50);
  });

  it("should create scorecard from runs", () => {
    const run1 = runSuite("test-suite", { c1: "yes", c2: "no" });
    const scorecard = createScorecard([run1]);
    assert.equal(scorecard.suites, 1);
    assert.equal(scorecard.totalCases, 2);
  });

  it("should throw on unknown suite", () => {
    assert.throws(() => runSuite("nonexistent", {}), { message: /not found/ });
  });
});

// ──────────────── T-35: a11y Audit ────────────────

import { auditHTML, generateReport, WCAG_RULES } from "../../src/shared/utils/a11yAudit.js";

describe("a11yAudit", () => {
  it("should pass for compliant HTML", () => {
    const html = '<button aria-label="Close">X</button><img alt="Logo" src="logo.png" />';
    const violations = auditHTML(html);
    const noImgViolations = violations.filter((v) => v.id !== WCAG_RULES.ARIA_LABEL);
    assert.equal(noImgViolations.length, 0);
  });

  it("should detect images without alt text", () => {
    const html = '<img src="photo.jpg" />';
    const violations = auditHTML(html);
    assert.ok(violations.some((v) => v.id === WCAG_RULES.IMAGE_ALT));
  });

  it("should detect dialogs without role", () => {
    const html = '<div class="modal"><p>Content</p></div>';
    const violations = auditHTML(html);
    assert.ok(violations.some((v) => v.id === WCAG_RULES.DIALOG_ROLE));
  });

  it("should generate report summary", () => {
    const violations = [
      { id: "test", description: "test", impact: "critical", help: "fix", nodes: [] },
      { id: "test2", description: "test", impact: "serious", help: "fix", nodes: [] },
    ];
    const report = generateReport(violations);
    assert.equal(report.total, 2);
    assert.equal(report.critical, 1);
    assert.equal(report.serious, 1);
    assert.equal(report.passed, false);
  });

  it("should report passed for no violations", () => {
    const report = generateReport([]);
    assert.equal(report.passed, true);
    assert.equal(report.total, 0);
  });

  it("should export WCAG rules", () => {
    assert.ok(WCAG_RULES.ARIA_LABEL);
    assert.ok(WCAG_RULES.COLOR_CONTRAST);
    assert.ok(WCAG_RULES.FOCUS_TRAP);
  });
});

// ──────────────── T-39: Responsive Specs ────────────────

import {
  VIEWPORTS,
  PAGES,
  generateTestMatrix,
  getViewportNames,
} from "../../tests/e2e/responsiveSpecs.mjs";

describe("responsiveSpecs", () => {
  it("should define mobile, tablet, desktop viewports", () => {
    assert.ok(VIEWPORTS.mobile);
    assert.ok(VIEWPORTS.tablet);
    assert.ok(VIEWPORTS.desktop);
    assert.equal(VIEWPORTS.mobile.width, 375);
    assert.equal(VIEWPORTS.tablet.width, 768);
  });

  it("should define pages to test", () => {
    assert.ok(PAGES.length >= 4);
    assert.ok(PAGES.some((p) => p.path === "/login"));
    assert.ok(PAGES.some((p) => p.path === "/dashboard"));
  });

  it("should generate test matrix", () => {
    const matrix = generateTestMatrix();
    assert.equal(matrix.length, 3 * PAGES.length); // 3 viewports × n pages
    assert.ok(matrix[0].testName);
    assert.ok(matrix[0].viewport);
    assert.ok(matrix[0].page);
  });

  it("should get viewport names", () => {
    const names = getViewportNames();
    assert.deepEqual(names, ["mobile", "tablet", "desktop"]);
  });
});

// ──────────────── T-43: Compliance (noLog) ────────────────

import { setNoLog, isNoLog, getRetentionDays } from "../../src/lib/compliance/index.js";

describe("compliance", () => {
  it("should default to logging enabled", () => {
    assert.equal(isNoLog("key-1"), false);
  });

  it("should set noLog opt-out", () => {
    setNoLog("key-1", true);
    assert.equal(isNoLog("key-1"), true);
  });

  it("should clear noLog opt-out", () => {
    setNoLog("key-1", false);
    assert.equal(isNoLog("key-1"), false);
  });

  it("should have default retention of 90 days", () => {
    assert.equal(getRetentionDays(), 90);
  });
});
