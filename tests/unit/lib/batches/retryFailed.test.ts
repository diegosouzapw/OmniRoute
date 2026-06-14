import { test } from "node:test";
import assert from "node:assert/strict";

const { buildRetryPlan } = await import("../../../../src/lib/batches/retryFailed.ts");

// ── Helpers ──────────────────────────────────────────────────────────────────

const ENDPOINT = "/v1/chat/completions";

function makeInputLine(customId: string, content = "hello") {
  return JSON.stringify({
    custom_id: customId,
    method: "POST",
    url: ENDPOINT,
    body: { model: "gpt-4o", messages: [{ role: "user", content }] },
  });
}

function makeErrorLine(customId: string, code = "rate_limit_exceeded") {
  return JSON.stringify({
    id: `batch_${customId}`,
    custom_id: customId,
    error: { code, message: `Request failed: ${code}` },
  });
}

function makeJsonl(lines: string[]) {
  return lines.join("\n") + "\n";
}

function parseLines(jsonl: string) {
  return jsonl
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .map((l) => JSON.parse(l));
}

// ── Empty error JSONL ─────────────────────────────────────────────────────────

test("buildRetryPlan: empty errorJsonl → no failed ids, empty newJsonl", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1"), makeInputLine("req-2")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl: "" });
  assert.equal(result.failedCustomIds.length, 0);
  assert.equal(result.retriableLines, 0);
  assert.equal(result.skippedLines, 0);
  assert.equal(result.newJsonl, "");
});

test("buildRetryPlan: whitespace-only errorJsonl → treated as empty", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl: "   \n\n   " });
  assert.equal(result.failedCustomIds.length, 0);
  assert.equal(result.newJsonl, "");
});

// ── No overlap ────────────────────────────────────────────────────────────────

test("buildRetryPlan: no custom_id overlap → retriableLines=0, all input lines skipped", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1"), makeInputLine("req-2")]);
  const errorJsonl = makeJsonl([makeErrorLine("req-99"), makeErrorLine("req-100")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.equal(result.retriableLines, 0);
  assert.equal(result.skippedLines, 2, "both input lines should be skipped");
  assert.equal(result.newJsonl, "");
  assert.ok(result.failedCustomIds.includes("req-99"));
  assert.ok(result.failedCustomIds.includes("req-100"));
});

// ── Partial overlap ────────────────────────────────────────────────────────────

test("buildRetryPlan: partial overlap → only failed custom_ids included in newJsonl", () => {
  const inputJsonl = makeJsonl([
    makeInputLine("req-1"),
    makeInputLine("req-2"),
    makeInputLine("req-3"),
  ]);
  const errorJsonl = makeJsonl([makeErrorLine("req-2")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.equal(result.retriableLines, 1);
  assert.equal(result.skippedLines, 2, "req-1 and req-3 are successful, skip them");
  assert.ok(result.failedCustomIds.includes("req-2"));
  const parsed = parseLines(result.newJsonl);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].custom_id, "req-2");
});

// ── Full overlap ──────────────────────────────────────────────────────────────

test("buildRetryPlan: all input custom_ids in errorJsonl → all lines in newJsonl", () => {
  const ids = ["req-1", "req-2", "req-3"];
  const inputJsonl = makeJsonl(ids.map((id) => makeInputLine(id)));
  const errorJsonl = makeJsonl(ids.map((id) => makeErrorLine(id)));
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.equal(result.retriableLines, 3);
  assert.equal(result.skippedLines, 0);
  const parsed = parseLines(result.newJsonl);
  assert.deepEqual(
    parsed.map((p) => p.custom_id).sort(),
    ids.sort()
  );
});

// ── Invalid JSON in input ─────────────────────────────────────────────────────

test("buildRetryPlan: invalid JSON in inputJsonl → skipped gracefully, valid lines still processed", () => {
  const inputJsonl = "NOT JSON\n" + makeInputLine("req-1") + "\n" + makeInputLine("req-2") + "\n";
  const errorJsonl = makeJsonl([makeErrorLine("req-1")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.equal(result.retriableLines, 1, "req-1 is valid and failed → should be retried");
  assert.ok(result.skippedLines >= 1, "invalid JSON line + req-2 should be skipped");
  const parsed = parseLines(result.newJsonl);
  assert.equal(parsed[0].custom_id, "req-1");
});

// ── Invalid JSON in errorJsonl ────────────────────────────────────────────────

test("buildRetryPlan: invalid JSON in errorJsonl → skipped, valid error lines still parsed", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1"), makeInputLine("req-2")]);
  const errorJsonl = "INVALID\n" + makeErrorLine("req-1") + "\n";
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.equal(result.failedCustomIds.length, 1, "only req-1 is a valid error entry");
  assert.equal(result.retriableLines, 1);
  assert.equal(result.skippedLines, 1, "req-2 was successful → skipped");
});

// ── newJsonl format ────────────────────────────────────────────────────────────

test("buildRetryPlan: newJsonl ends with newline when non-empty", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1")]);
  const errorJsonl = makeJsonl([makeErrorLine("req-1")]);
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  assert.ok(result.newJsonl.endsWith("\n"), "newJsonl should end with newline");
});

test("buildRetryPlan: newJsonl is empty string (not '\\n') when no retriable lines", () => {
  const result = buildRetryPlan({ inputJsonl: "", errorJsonl: "" });
  assert.equal(result.newJsonl, "");
});

// ── failedCustomIds completeness ──────────────────────────────────────────────

test("buildRetryPlan: failedCustomIds contains all ids from errorJsonl", () => {
  const errorIds = ["req-a", "req-b", "req-c"];
  const errorJsonl = makeJsonl(errorIds.map((id) => makeErrorLine(id)));
  const result = buildRetryPlan({ inputJsonl: "", errorJsonl });
  assert.equal(result.failedCustomIds.length, errorIds.length);
  for (const id of errorIds) {
    assert.ok(result.failedCustomIds.includes(id), `${id} should be in failedCustomIds`);
  }
});

// ── Duplicate error entries deduplicated ──────────────────────────────────────

test("buildRetryPlan: duplicate error custom_ids deduped (Set semantics)", () => {
  const inputJsonl = makeJsonl([makeInputLine("req-1"), makeInputLine("req-2")]);
  const errorJsonl = makeJsonl([makeErrorLine("req-1"), makeErrorLine("req-1")]); // dup
  const result = buildRetryPlan({ inputJsonl, errorJsonl });
  // req-1 should only appear once in the output
  const parsed = parseLines(result.newJsonl);
  assert.equal(parsed.filter((p) => p.custom_id === "req-1").length, 1, "req-1 should appear once");
  assert.equal(result.retriableLines, 1);
});
