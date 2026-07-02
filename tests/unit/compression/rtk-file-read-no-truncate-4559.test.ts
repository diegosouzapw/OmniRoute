/**
 * TDD regression for #4559: RTK compression over-truncates tool-result content.
 *
 * A user reported that when a tool returns a file's contents (e.g. a ~147-line
 * text/code file via a Read tool), RTK's default caps (maxLinesPerResult: 120,
 * maxCharsPerResult: 12000) drop the middle and most lines are silently
 * suppressed. Disabling compression OR the RTK "tool results" toggle fixes it;
 * OpenRouter (no OmniRoute) is unaffected.
 *
 * Root cause: the final `smartTruncate` hard-cap in processRtkText fires for ANY
 * tool result over 120 lines — including document/file reads — even though RTK's
 * intent is repetitive *command output* (npm install logs, make, docker logs),
 * NOT prose/code file reads.
 *
 * Fix: when the content is NOT a recognized repetitive command/log output
 * (detection.type === "unknown" with no detected command — i.e. a document-style
 * read), RTK must NOT apply the line/char truncation that drops the middle.
 * Genuine repetitive logs (which detect as a known command type) are unaffected,
 * preserving RTK's value there.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// A ~147-line mixed prose/code file read — every line is distinct content, NOT
// repetitive log noise. No shell-command prefix, so RTK detects it as "unknown".
function buildFileRead(): string {
  const lines: string[] = [];
  lines.push("# Module: payment processor");
  lines.push("");
  lines.push("This module reconciles charges against the ledger.");
  lines.push("");
  lines.push("import { Decimal } from './decimal';");
  lines.push("import { Ledger } from './ledger';");
  lines.push("");
  for (let i = 0; i < 70; i++) {
    lines.push(`export function step${i}(input: Input${i}): Result${i} {`);
    lines.push(`  // reconcile bucket ${i} against the prior settlement window`);
    lines.push(`  const value = computeBucket${i}(input.amount, input.currency);`);
    lines.push(`  const settled = applyDiscount${i}(value, input.coupon);`);
    lines.push(`  return { id: ${i}, value: settled, settledAt: input.timestamp${i} };`);
    lines.push("}");
    lines.push("");
  }
  return lines.join("\n");
}

describe("RTK file-read tool result — #4559 no over-truncation", () => {
  it("does not drop the middle of a 147-line document/file read", () => {
    const fileRead = buildFileRead();
    const totalLines = fileRead.split("\n").length;
    assert.ok(totalLines > 120, `fixture should exceed default cap; got ${totalLines}`);

    // Default RTK tool-result path (applyToToolResults defaults true; this is the
    // text path the Anthropic/OpenAI tool_result blocks feed into).
    const result = processRtkText(fileRead, {
      config: { maxLinesPerResult: 120, maxCharsPerResult: 12000 },
    });

    // The hard-cap truncation must NOT have fired for a document/file read.
    assert.ok(
      !result.techniquesUsed.includes("rtk-truncate"),
      `file-read content must not be hard-cap truncated; techniquesUsed: ${result.techniquesUsed.join(
        ", "
      )}`
    );

    // The truncation marker must be absent and the middle content retained.
    assert.ok(
      !result.text.includes("[rtk:truncated"),
      "no truncation marker should be injected into a file read"
    );

    // Sample lines from the head, middle, and tail must all survive.
    assert.ok(result.text.includes("step0("), "head content survives");
    assert.ok(result.text.includes("step35("), "middle content survives");
    assert.ok(result.text.includes("step69("), "tail content survives");

    // Output retains the vast majority of the lines (not dropped below a
    // reasonable threshold).
    const outLines = result.text.split("\n").length;
    assert.ok(
      outLines >= totalLines * 0.9,
      `expected to retain >=90% of lines; kept ${outLines}/${totalLines}`
    );
  });

  it("still truncates genuine repetitive command output (RTK value preserved)", () => {
    // npm install-style repetitive log lines, with a detected command so RTK
    // recognizes it as repetitive output worth truncating.
    const noise = Array.from(
      { length: 300 },
      (_, i) => `added package-${i}@1.0.0 to node_modules`
    ).join("\n");
    const input = `$ npm install\n${noise}`;

    const result = processRtkText(input, {
      command: "npm install",
      config: { maxLinesPerResult: 120, maxCharsPerResult: 12000 },
    });

    assert.ok(
      result.compressed,
      "repetitive npm install output should still be compressed"
    );
  });
});
