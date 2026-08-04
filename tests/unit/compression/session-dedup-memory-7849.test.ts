import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const FIXTURE = join(REPO_ROOT, "tests/fixtures/compression/session-dedup-memory-7849.ts");
const SUFFIX_WORK_BUDGET = 32 * 1024 * 1024;
const SUFFIX_WORK_BUDGET_WARNING = "session-dedup: skipped (suffix work budget exceeded)";

function makeFixedWidthText(lineCount: number, lineChars: number, tag: string): string {
  return Array.from({ length: lineCount }, (_, index) => {
    const prefix = `${tag}-${index.toString().padStart(4, "0")}:`;
    assert.ok(prefix.length <= lineChars);
    return prefix + "x".repeat(lineChars - prefix.length);
  }).join("\n");
}

function projectedSuffixWork(text: string, passCount: number): number {
  let work = 0;
  for (let start = 0; start <= text.length; start++) {
    if (start === 0 || text.charCodeAt(start - 1) === 10) {
      work += (text.length - start) * passCount;
    }
  }
  return work;
}

function makeSharedBudgetBody(): Record<string, unknown> {
  return {
    messages: [
      { role: "tool", content: makeFixedWidthText(600, 49, "first") },
      { role: "tool", content: makeFixedWidthText(600, 49, "second") },
    ],
  };
}

test("#7849: shares the two-pass suffix-work budget across all messages", () => {
  const body = makeSharedBudgetBody();
  const messages = body.messages as Array<{ content: string }>;
  const perMessageWork = messages.map(({ content }) => projectedSuffixWork(content, 2));

  assert.ok(
    perMessageWork.every((work) => work < SUFFIX_WORK_BUDGET),
    "each message must fit the two-pass budget on its own"
  );
  assert.ok(
    messages.reduce((total, { content }) => total + projectedSuffixWork(content, 1), 0) <
      SUFFIX_WORK_BUDGET,
    "the pair must fit if incorrectly charged for only one pass"
  );
  assert.ok(
    perMessageWork.reduce((total, work) => total + work, 0) > SUFFIX_WORK_BUDGET,
    "the pair must exceed the shared budget when correctly charged for two passes"
  );

  for (const message of messages) {
    const individualResult = sessionDedupEngine.apply({
      messages: [message, { role: "assistant", content: "a unique short companion" }],
    });
    assert.equal(individualResult.stats, null, "each message must be accepted individually");
  }

  const result = sessionDedupEngine.apply(body);
  assert.deepEqual(result.stats?.validationWarnings, [SUFFIX_WORK_BUDGET_WARNING]);
});

test("#7849: exhausted suffix-work budget fails open with exact zero-savings stats", () => {
  const body = makeSharedBudgetBody();
  const result = sessionDedupEngine.apply(body);

  assert.strictEqual(result.body, body, "budget exhaustion must return the input body by identity");
  assert.equal(result.compressed, false);
  assert.ok(result.stats, "budget exhaustion must return explanatory stats");
  assert.equal(result.stats.originalTokens, result.stats.compressedTokens);
  assert.equal(result.stats.savingsPercent, 0);
  assert.deepEqual(result.stats.validationWarnings, [SUFFIX_WORK_BUDGET_WARNING]);
});

test("#7849: near-boundary under-budget request still deduplicates", () => {
  const repeatedText = makeFixedWidthText(578, 49, "same");
  const projectedWork = projectedSuffixWork(repeatedText, 2) * 2;
  assert.ok(projectedWork <= SUFFIX_WORK_BUDGET);
  assert.ok(
    SUFFIX_WORK_BUDGET - projectedWork < 100_000,
    "fixture must remain close to the work-budget boundary"
  );

  const body = {
    messages: [
      { role: "user", content: repeatedText },
      { role: "user", content: repeatedText },
    ],
  };
  const result = sessionDedupEngine.apply(body);
  const messages = result.body.messages as Array<{ content: string }>;

  assert.equal(result.compressed, true);
  assert.equal(messages[0].content, repeatedText);
  assert.match(messages[1].content, /^\[dedup:ref sha=[0-9a-f]{24}\]$/);
  assert.ok((result.stats?.savingsPercent ?? 0) > 0);
  assert.deepEqual(result.stats?.validationWarnings ?? [], []);
});

test(
  "#7849: line-rich long context stays within a 512 MiB heap and the stacked pipeline continues",
  { timeout: 60_000 },
  () => {
    const child = spawnSync(
      process.execPath,
      ["--max-old-space-size=512", "--import", "tsx/esm", FIXTURE],
      {
        cwd: REPO_ROOT,
        encoding: "utf8",
        timeout: 45_000,
      }
    );

    assert.equal(
      child.status,
      0,
      `compression child must not OOM or time out\nstdout: ${child.stdout}\nstderr: ${child.stderr}`
    );

    const output = JSON.parse(child.stdout) as {
      enginesRun: string[];
      warnings: string[];
    };
    assert.deepEqual(output.enginesRun, ["session-dedup", "lite", "rtk", "headroom", "caveman"]);
    assert.ok(
      output.warnings.includes("session-dedup: skipped (suffix work budget exceeded)"),
      `expected an explicit session-dedup work-budget warning, got ${JSON.stringify(output.warnings)}`
    );
  }
);
