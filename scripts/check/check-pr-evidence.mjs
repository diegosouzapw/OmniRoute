#!/usr/bin/env node
// scripts/check/check-pr-evidence.mjs
// Gate: Hard Rule #18 — "evidence before assertions".
//
// When a PR body makes claims about test/validation success (e.g. "tests pass",
// "all green", "fixed", "added endpoint") it MUST include a block of command
// output as proof.  A PR body with claims but no attached evidence => FAIL.
//
// Skip policy: when not running in a PR context (no PR_BODY env var and `gh pr
// view` is unavailable), exits 0 silently so the gate never blocks local dev.
//
// Conservative by design (two-signal requirement):
//   - A PR body with NO claim-trigger terms always passes.
//   - A PR body with a claim but also an evidence block always passes.
//   - Only the combination of claim(s) + NO evidence block => FAIL.
//
// What counts as a TRIGGER (claim term)?
//   See CLAIM_TRIGGERS below.  We require at least ONE strong trigger OR two
//   weak triggers to fire (reduces false positives from casual phrases).
//
// What counts as EVIDENCE?
//   - A fenced code block (``` ... ```) that contains ≥1 line of output
//     characters (not just whitespace/backticks).  The block must look like
//     terminal/command output: numbers, colons, path separators, status words.
//   - OR an explicit "Evidence" / "Validation" / "Test output" / "Output"
//     section header (##/### prefix) followed by non-empty content.
//   - OR an inline `code span` that matches common test-runner patterns
//     (e.g. "passing", "failed 0", "✓", "PASS", "ok").

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Claim triggers
// ---------------------------------------------------------------------------
// STRONG triggers: single occurrence is sufficient to fire.
// These are explicit outcome/validation assertions.
const STRONG_TRIGGERS = [
  /\ball\s+(?:tests?\s+)?(?:pass(?:ed|ing)?|green)\b/i,
  /\btests?\s+(?:pass(?:ed|ing)?|are\s+(?:green|passing))\b/i,
  /\b(?:typecheck|lint|build)\s+(?:pass(?:ed|ing)?|(?:is\s+)?clean|(?:is\s+)?green|(?:is\s+)?ok)\b/i,
  /\bvalidated\s+(?:on|in|via|with|against|locally|on\s+vps)\b/i,
  /\b(?:zero|0)\s+(?:errors?|failures?|regressions?)\b/i,
  /\btdd\b.*\b(?:pass(?:ed|ing)?|green)\b/i,
  /\bfixed\b.*\band\s+(?:verified|confirmed|tested)\b/i,
  /\bproof\s*:/i,
];

// WEAK triggers: need at least 2 present to fire.
// These are common "seems fine" phrases that alone don't warrant evidence.
const WEAK_TRIGGERS = [
  /\b(?:added|implemented|created)\s+(?:a\s+)?(?:new\s+)?(?:endpoint|route|test|handler|check)\b/i,
  /\bfixed\b/i,
  /\bresolves?\s+#\d+/i,
  /\bshould\s+(?:work|pass|be\s+(?:fine|ok|green))\b/i,
  /\b(?:verified|confirmed|validated)\b/i,
  /\b(?:all|no)\s+(?:regressions?|breaking\s+changes?)\b/i,
  /\blooks?\s+(?:good|fine|ok)\b/i,
  /\bworks?\s+(?:correctly|fine|as\s+expected)\b/i,
];

// ---------------------------------------------------------------------------
// Evidence patterns
// ---------------------------------------------------------------------------
// 1. A fenced code block with "command-output-like" content.
//    The block content must have at least one line that looks like output
//    (contains digit sequences, colons, path separators, or known status tokens).
const FENCED_BLOCK_RE = /```[^\n]*\n([\s\S]*?)```/g;
const OUTPUT_LINE_RE =
  /(?:\d+\s+(?:pass(?:ing)?|fail(?:ing)?|pending)|[✓✗×•]\s|\bPASS\b|\bFAIL\b|\bok\b|\berror\b.*\d|\bwarning\b.*\d|\d+\s+(?:test|spec|suite)|exit\s+code\s*[0-9]|at\s+\S+:\d+|[A-Za-z]+:\s*\d+|^\s*\d+\s+\w)/im;

// 2. An explicit evidence/validation section header followed by non-blank content.
const EVIDENCE_SECTION_RE =
  /^#{1,4}\s+(?:evidence|validation|test\s+(?:output|results?|run)|output|verified|proof)\b[^\n]*/im;

// 3. An inline code span matching common test-runner result tokens.
const INLINE_RESULT_RE =
  /`[^`]*(?:\d+\s+(?:pass(?:ing)?|fail(?:ing)?|test)|✓|✗|PASS(?:ED)?|FAIL(?:ED)?|all\s+\d+)[^`]*`/i;

// ---------------------------------------------------------------------------
// Pure evaluation function (exported for tests)
// ---------------------------------------------------------------------------
/**
 * Evaluate a PR body string.
 *
 * @param {string} body
 * @returns {{ result: "pass" | "fail" | "skip"; reason: string }}
 */
export function evaluatePrBody(body) {
  if (!body || body.trim().length === 0) {
    return { result: "skip", reason: "PR body is empty — nothing to evaluate." };
  }

  // --- 1. Detect claims ---
  const strongMatches = STRONG_TRIGGERS.filter((re) => re.test(body));
  const weakMatches = WEAK_TRIGGERS.filter((re) => re.test(body));
  const hasClaim = strongMatches.length >= 1 || weakMatches.length >= 2;

  if (!hasClaim) {
    return { result: "pass", reason: "No outcome-claim terms detected — no evidence required." };
  }

  // --- 2. Detect evidence ---
  const hasEvidence = hasEvidenceBlock(body);

  if (hasEvidence) {
    return {
      result: "pass",
      reason: "Outcome claim detected and evidence block found.",
    };
  }

  // Build a helpful message listing which triggers fired.
  const firedStrong = strongMatches.map((re) => re.source);
  const firedWeak = weakMatches.map((re) => re.source);
  return {
    result: "fail",
    reason:
      "PR body contains outcome claims but no evidence block (command output, Evidence section, or inline result span).\n" +
      (firedStrong.length > 0 ? `  Strong triggers matched: ${firedStrong.join(", ")}\n` : "") +
      (firedWeak.length >= 2 ? `  Weak triggers matched (≥2): ${firedWeak.join(", ")}\n` : "") +
      "\n" +
      "Hard Rule #18 requires proof that the fix works:\n" +
      "  a) Add a fenced code block (```) containing test-runner or command output, OR\n" +
      "  b) Add a section headed '## Evidence', '## Validation', '## Test output', etc., OR\n" +
      "  c) Add an inline code span with a result token (e.g. `42 passing`, `PASSED`).\n" +
      "See CLAUDE.md → Hard Rule #18.",
  };
}

/**
 * Returns true if the body contains at least one recognised evidence block.
 * @param {string} body
 * @returns {boolean}
 */
function hasEvidenceBlock(body) {
  // Check fenced code blocks for output-like content.
  FENCED_BLOCK_RE.lastIndex = 0;
  let match;
  while ((match = FENCED_BLOCK_RE.exec(body)) !== null) {
    const blockContent = match[1] ?? "";
    if (blockContent.trim().length > 0 && OUTPUT_LINE_RE.test(blockContent)) {
      return true;
    }
  }

  // Check for explicit evidence/validation section header with non-empty body.
  if (EVIDENCE_SECTION_RE.test(body)) {
    // Ensure there's actual content after the header.
    const afterHeader = body.replace(EVIDENCE_SECTION_RE, "").trim();
    if (afterHeader.length > 20) {
      return true;
    }
  }

  // Check for inline code span containing result tokens.
  if (INLINE_RESULT_RE.test(body)) {
    return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------
function getArg(name, fallbackValue = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) return fallbackValue;
  return process.argv[index + 1];
}

function buildReport(lines) {
  return `${lines.join("\n")}\n`;
}

// Only run as CLI entry point.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const summaryFile = getArg("--summary-file", "");

  // --- Resolve PR body ---
  let prBody = null;

  // Priority 1: PR_BODY env var (set by CI / manual invocation).
  if (typeof process.env.PR_BODY === "string") {
    prBody = process.env.PR_BODY;
  }

  // Priority 2: --body-file argument.
  const bodyFile = getArg("--body-file", "");
  if (prBody === null && bodyFile && existsSync(bodyFile)) {
    prBody = readFileSync(bodyFile, "utf8");
  }

  // Priority 3: `gh pr view` (only available inside a PR context).
  if (prBody === null) {
    const ghResult = spawnSync("gh", ["pr", "view", "--json", "body", "--jq", ".body"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (ghResult.status === 0 && ghResult.stdout.trim()) {
      prBody = ghResult.stdout.trim();
    }
  }

  // No PR context available — skip silently.
  if (prBody === null) {
    const report = buildReport([
      "## PR Evidence Gate",
      "",
      "Skipped: no PR body available (PR_BODY not set, --body-file not provided, gh pr view unavailable).",
    ]);
    if (summaryFile) {
      mkdirSync(path.dirname(summaryFile), { recursive: true });
      writeFileSync(summaryFile, report);
    }
    process.stdout.write(report);
    process.exit(0);
  }

  const { result, reason } = evaluatePrBody(prBody);

  const reportLines = ["## PR Evidence Gate", ""];

  if (result === "skip") {
    reportLines.push("Result: SKIP", "", reason);
  } else if (result === "pass") {
    reportLines.push("Result: PASS", "", reason);
  } else {
    reportLines.push(
      "Result: FAIL",
      "",
      reason,
      "",
      "> ℹ️ Editing the PR body to add the evidence does NOT re-run this gate — `ci.yml` " +
        "does not listen to the `edited` event. Add the `## Evidence` block, then **push a " +
        "commit** (or re-run this job) to re-validate. For releases, put the Evidence block in " +
        "the body BEFORE the first push (see the generate-release skill, Phase 0)."
    );
  }

  const report = buildReport(reportLines);

  if (summaryFile) {
    mkdirSync(path.dirname(summaryFile), { recursive: true });
    writeFileSync(summaryFile, report);
  }

  process.stdout.write(report);

  if (result === "fail") {
    process.exit(1);
  }
}
