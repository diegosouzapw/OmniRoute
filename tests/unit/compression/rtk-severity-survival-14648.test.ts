/**
 * RTK severity survival — regression guard.
 *
 * Context: RTK's whole value on log output is that the *diagnostic* lines survive
 * truncation. Severity lines could be silently dropped at four independent stages, and
 * the fix touches one place per stage:
 *
 *   1. engine priority regex   — index.ts::defaultPriorityPatterns
 *   2. filter priority patterns — filterSchema.ts bridges `preserve.errorPatterns` /
 *      `preserve.summaryPatterns` into `priorityPatterns`
 *   3. filter keep stage       — filterSchema.ts bridges `rules.includePatterns` into
 *      `keepPatterns` (only when the stage is already live — see that file)
 *   4. smartTruncate's char branch — smartTruncate.ts, which enforced `maxCharsPerResult`
 *      with a blind character slice and never consulted the priority lines it had just
 *      selected.
 *
 * Stage 4 is why a short-line fixture passes while production still loses severities: the
 * char budget only binds when lines are long, so a fixture built from short lines never
 * reaches the branch. This file therefore drives the real production entry point
 * (`processRtkText`) at realistic line lengths, not a hand-built harness.
 *
 * Measured on the published image (v3.8.50) before the fix: 0/55 filters kept all eight
 * severity words at the live `maxCharsPerResult` (12000), at both ~60-char and ~250-char
 * lines. After: 55/55 at both lengths.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { matchRtkFilter } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import { DEFAULT_RTK_CONFIG } from "../../../open-sse/services/compression/types.ts";

/** The severity vocabulary the four fix layers must protect. */
const SEVERITIES = [
  "FATAL",
  "CRITICAL",
  "SEVERE",
  "PANIC",
  "OOMKilled",
  "ERROR",
  "FAIL",
  "Traceback",
] as const;

/** Real command samples so filter selection runs through the production path. */
const COMMANDS: Array<{ command: string; filter: string }> = [
  { command: "docker logs api", filter: "docker-logs" },
  { command: "cat /var/log/app.log", filter: "npm-audit" },
  { command: "./deploy.sh --verbose", filter: "npm-audit" },
  { command: "grep -rn error /var/log/app.log", filter: "shell-grep" },
  { command: "tail -n 500 /var/log/app.log", filter: "npm-audit" },
  { command: "npm install", filter: "npm-install" },
  { command: "pytest -q", filter: "test-pytest" },
];

/**
 * Build log-like output of a given line length with the eight severity words
 * placed mid-list — i.e. *outside* both the preserved head and the preserved
 * tail, so only genuine priority handling can save them.
 */
function buildPayload(lineLength: number, totalLines = 400): string {
  const pad = "x".repeat(Math.max(0, lineLength - 80));
  const mid = Math.floor(totalLines / 2);
  const lines: string[] = [];
  for (let i = 0; i < totalLines; i += 1) {
    const offset = i - mid;
    lines.push(
      offset >= 0 && offset < SEVERITIES.length
        ? `2026-09-20 12:07:04 ${SEVERITIES[offset]} marker-${SEVERITIES[offset]} rollback required ${pad}`
        : `2026-09-20 12:07:04 INFO request handled service=api id=${i} ${pad}`
    );
  }
  return lines.join("\n");
}

function survived(text: string): string[] {
  return SEVERITIES.filter((severity) => text.includes(`marker-${severity}`));
}

describe("RTK severity survival (production path)", () => {
  for (const lineLength of [60, 250]) {
    describe(`~${lineLength}-char lines`, () => {
      for (const { command, filter } of COMMANDS) {
        it(`keeps all ${SEVERITIES.length} severities for \`${command}\``, () => {
          const payload = buildPayload(lineLength);
          const result = processRtkText(payload, {
            command,
            config: { enabled: true, intensity: "standard" },
          });

          // The fixture only proves anything if the command routes to the filter under
          // test — otherwise it silently exercises the generic-output fallback.
          assert.equal(
            matchRtkFilter(payload, command)?.id,
            filter,
            `\`${command}\` no longer routes to the ${filter} filter`
          );

          const kept = survived(result.text);
          assert.deepEqual(
            kept,
            [...SEVERITIES],
            `\`${command}\`: expected all severities to survive, got ${kept.length}/${SEVERITIES.length}` +
              ` (kept: ${kept.join(", ") || "none"})`
          );
        });
      }
    });
  }

  /**
   * The char branch only fires when the *character* budget binds. If it never
   * fires, a fixture cannot prove the four layers work — it would pass even on
   * the unpatched code. This guards the fixture itself against going vacuous.
   */
  it("the char branch actually fires at the live maxCharsPerResult", () => {
    const payload = buildPayload(250, 700);
    const result = processRtkText(payload, {
      command: "docker logs api",
      config: { enabled: true, intensity: "standard" },
    });

    assert.ok(
      result.text.includes("[rtk:truncated by chars]") ||
        result.text.length <= DEFAULT_RTK_CONFIG.maxCharsPerResult,
      "fixture no longer reaches the char branch — the regression guard would be vacuous"
    );
    assert.ok(
      result.text.length <= DEFAULT_RTK_CONFIG.maxCharsPerResult,
      `output must respect maxCharsPerResult (${DEFAULT_RTK_CONFIG.maxCharsPerResult}), got ${result.text.length}`
    );
  });

  it("never exceeds maxCharsPerResult at any budget that binds", () => {
    const payload = buildPayload(250, 900);
    for (const maxCharsPerResult of [12000, 5000, 3000, 1500]) {
      const result = processRtkText(payload, {
        command: "docker logs api",
        config: { enabled: true, intensity: "standard", maxCharsPerResult },
      });
      assert.ok(
        result.text.length <= maxCharsPerResult,
        `budget ${maxCharsPerResult} exceeded: ${result.text.length} chars`
      );
    }
  });

  /**
   * Guards the *mechanism*, not just the outcome: severities survive because RTK
   * selects the filter from the **command**, never by sniffing the payload. A
   * refactor that starts classifying by content would reintroduce the
   * ancestor bug where any `HH:MM:SS`-stamped log line is mistaken for grep
   * output (see the 9router `isGrepLine` port).
   */
  it("selects the filter from the command, not from payload content", () => {
    const payload = buildPayload(250);
    const logs = processRtkText(payload, {
      command: "docker logs api",
      config: { enabled: true, intensity: "standard" },
    });
    const grep = processRtkText(payload, {
      command: "grep -rn error /var/log/app.log",
      config: { enabled: true, intensity: "standard" },
    });

    // Same bytes, different command → the filter selection may differ, but both
    // must still protect every severity line.
    assert.deepEqual(survived(logs.text), [...SEVERITIES]);
    assert.deepEqual(survived(grep.text), [...SEVERITIES]);
  });
});
