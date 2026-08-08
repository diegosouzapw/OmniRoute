import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const FIXTURE = join(REPO_ROOT, "tests/fixtures/compression/session-dedup-memory-7849.ts");
// #7849 originally bounded session-dedup with a shared "suffix work budget" that
// emitted SUFFIX_WORK_BUDGET_WARNING when exhausted. Commit 7f36b192f0 REPLACED
// that mechanism with the MAX_SUFFIX_STARTS / MAX_TOTAL_BLOCK_BYTES guards and
// removed both the budget and its warning. The invariant #7849 exists for — a
// line-rich long context must not blow the heap, and the engine must fail open —
// is unchanged and still guarded below; only the pins on the removed mechanism
// were rewritten. The budget size is kept as the input-shaping constant that
// produces the pathological pair.
const SUFFIX_WORK_BUDGET = 32 * 1024 * 1024;

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

test("#7849: the two-message pathological pair stays bounded", () => {
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

  // The pathological pair must be processed BOUNDED — quickly and without
  // corrupting the body. Pre-#7849 this shape retained one full-length suffix
  // string per line and OOM-killed the heap.
  const started = Date.now();
  const result = sessionDedupEngine.apply(body);
  assert.ok(
    Date.now() - started < 4000,
    "the pathological pair must stay fast; quadratic work would take seconds"
  );
  assert.ok(Array.isArray((result.body as { messages?: unknown[] }).messages));
});

test("#7849: the pathological pair fails open, returning the input body untouched", () => {
  const body = makeSharedBudgetBody();
  const result = sessionDedupEngine.apply(body);

  // Fail-open is the surviving contract: nothing deduplicable in this shape, so
  // the ORIGINAL body comes back by identity and no compression is claimed. The
  // explanatory zero-savings stats belonged to the removed budget path — the
  // current guards skip before producing any, so stats is null.
  assert.strictEqual(result.body, body, "failing open must return the input body by identity");
  assert.equal(result.compressed, false);
  assert.equal(result.stats, null);
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
    // The OOM guard is `child.status === 0` plus the full engine chain above:
    // pre-fix this fixture killed the 512 MiB heap before the pipeline finished.
    // session-dedup must still REPORT its skip; the exact reason string moved
    // with the mechanism (7f36b192f0), so only the prefix is pinned.
    assert.ok(
      output.warnings.some((warning) => warning.startsWith("session-dedup: skipped")),
      `expected a session-dedup skip warning, got ${JSON.stringify(output.warnings)}`
    );
  }
);
