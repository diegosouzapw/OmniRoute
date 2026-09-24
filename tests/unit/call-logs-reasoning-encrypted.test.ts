/**
 * RED test for encrypted-reasoning observability.
 *
 * An upstream Responses API item of type "reasoning" carrying only opaque
 * state (`encrypted_content`, no readable summary) must be recorded as
 * `reasoning_source='encrypted'` — today it records NULL (chat-shaped
 * `responseBody` never carries the opaque item, and nothing threads the
 * stream-side signal to the call log).
 *
 * TDD: this file is written BEFORE the fix. RED = `reasoning_source` NULL
 * despite the opaque reasoning snapshot. GREEN (fix) = `encrypted` + flag.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { saveCallLog } from "../../src/lib/usage/callLogs.ts";

const PREFIX = "test-enc-reasoning";

test.after(() => {
  try {
    const db = getDbInstance();
    db.prepare(`DELETE FROM call_logs WHERE id LIKE '${PREFIX}-%'`).run();
  } catch {
    // best-effort cleanup
  }
  try {
    resetDbInstance();
  } catch {
    // best-effort handle release (per DB-handle hang rule)
  }
});

function opaqueReasoningItem() {
  return {
    id: "rs_opaque_1",
    type: "reasoning",
    // Opaque-only: encrypted blob, no readable summary text.
    encrypted_content: "gAAAAABopaque-blob-that-must-never-be-stored",
    summary: [],
    status: "completed",
  };
}

// ── RED: opaque reasoning snapshot in a Responses-shaped body ────────────────

test("saveCallLog records reasoning_source=encrypted for opaque reasoning item", async () => {
  const db = getDbInstance();
  const testId = `${PREFIX}-sink-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/responses",
    status: 200,
    model: "muse-spark-model",
    provider: "opencode-go",
    duration: 95000,
    tokens: { prompt_tokens: 10, completion_tokens: 20 },
    // Non-streaming snapshot: Responses-shaped body carrying the opaque item.
    responseBody: {
      object: "response",
      output: [opaqueReasoningItem()],
    },
  });

  const row = db
    .prepare(
      "SELECT tokens_reasoning, reasoning_source, reasoning_encrypted, reasoning_duration_ms FROM call_logs WHERE id = ?"
    )
    .get(testId) as {
    tokens_reasoning: number | null;
    reasoning_source: string | null;
    reasoning_encrypted: number | null;
    reasoning_duration_ms: number | null;
  };

  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, "encrypted", "opaque reasoning item → source=encrypted");
  assert.equal(row.reasoning_encrypted, 1, "opaque reasoning item → flag=1");
  assert.equal(row.reasoning_duration_ms, null, "sink-side snapshot → duration NULL");
});

// ── Neighbour cases: existing behaviour unchanged ──────────────────────────

test("saveCallLog keeps reasoning_source NULL with no reasoning at all", async () => {
  const db = getDbInstance();
  const testId = `${PREFIX}-none-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "plain-model",
    provider: "openai",
    duration: 100,
    tokens: { prompt_tokens: 5, completion_tokens: 10 },
    responseBody: {
      choices: [{ message: { role: "assistant", content: "just a plain answer" } }],
    },
  });

  const row = db.prepare("SELECT reasoning_source FROM call_logs WHERE id = ?").get(testId) as {
    reasoning_source: string | null;
  };

  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, null, "no reasoning → source stays NULL");
});

test("saveCallLog keeps reasoning_source=usage when usage reports reasoning tokens", async () => {
  const db = getDbInstance();
  const testId = `${PREFIX}-usage-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "o3-mini",
    provider: "openai",
    duration: 100,
    tokens: {
      prompt_tokens: 5,
      completion_tokens: 100,
      completion_tokens_details: { reasoning_tokens: 57 },
    },
    responseBody: {
      choices: [{ message: { role: "assistant", content: "answer" } }],
    },
  });

  const row = db
    .prepare("SELECT tokens_reasoning, reasoning_source FROM call_logs WHERE id = ?")
    .get(testId) as {
    tokens_reasoning: number | null;
    reasoning_source: string | null;
  };

  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, "usage", "usage-reported reasoning keeps source=usage");
  assert.equal(row.tokens_reasoning, 57, "tokens_reasoning stays usage-derived (57)");
});

// ── Streaming meta: flag+duration+efforts threaded from the stream ───────────

test("saveCallLog writes stream reasoningMeta (flag plus duration plus efforts)", async () => {
  const db = getDbInstance();
  const testId = `${PREFIX}-stream-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/responses",
    status: 200,
    model: "muse-spark-model",
    provider: "opencode-go",
    duration: 95000,
    tokens: { prompt_tokens: 10, completion_tokens: 20 },
    responseBody: {
      choices: [{ message: { role: "assistant", content: "final answer" } }],
    },
    reasoningMeta: { encryptedSeen: true, durationMs: 44000 },
    clientRequestBody: { model: "muse-spark-model", reasoning_effort: "xhigh" },
    upstreamRequestBody: { model: "muse-spark-model", reasoning: { effort: "xhigh" } },
  });

  const row = db
    .prepare(
      "SELECT reasoning_source, reasoning_encrypted, reasoning_duration_ms, reasoning_effort_requested, reasoning_effort_upstream FROM call_logs WHERE id = ?"
    )
    .get(testId) as {
    reasoning_source: string | null;
    reasoning_encrypted: number | null;
    reasoning_duration_ms: number | null;
    reasoning_effort_requested: string | null;
    reasoning_effort_upstream: string | null;
  };

  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, "encrypted", "stream flag → source=encrypted");
  assert.equal(row.reasoning_encrypted, 1, "stream flag → flag=1");
  assert.equal(row.reasoning_duration_ms, 44000, "stream duration threaded to the row");
  assert.equal(row.reasoning_effort_requested, "xhigh", "client effort value only");
  assert.equal(row.reasoning_effort_upstream, "xhigh", "upstream effort value only");
});

// ── Pure observer: added→done pairing, terminal fallback, guards ─────────────

test("observeResponsesReasoningEvent pairs added to done and flags opaque", async () => {
  const { observeResponsesReasoningEvent, snapshotHasOpaqueReasoning } =
    await import("../../open-sse/utils/responsesReasoningObservation.ts");

  const tracker = new Map();
  const added = observeResponsesReasoningEvent(
    tracker,
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "rs_1", type: "reasoning", encrypted_content: "gAAAAABopaque", summary: [] },
    },
    1000
  );
  assert.equal(added.sawOpaque, true, "opaque added is seen");
  assert.equal(added.durationMs, null, "added alone yields no duration");

  const done = observeResponsesReasoningEvent(
    tracker,
    {
      type: "response.output_item.done",
      output_index: 0,
      item: { id: "rs_1", type: "reasoning", encrypted_content: "gAAAAABopaque", summary: [] },
    },
    45000
  );
  assert.equal(done.sawOpaque, true, "paired done confirms opaque");
  assert.equal(done.durationMs, 44000, "added→done delta");

  // Done without a prior added event: flag, no duration.
  const solo = observeResponsesReasoningEvent(
    new Map(),
    {
      type: "response.output_item.done",
      output_index: 3,
      item: { id: "rs_9", type: "reasoning", encrypted_content: "gAAAAABopaque", summary: [] },
    },
    9000
  );
  assert.equal(solo.sawOpaque, true, "done-without-added still flags");
  assert.equal(solo.durationMs, null, "done-without-added yields no duration");

  // Readable reasoning done: not opaque, no flag.
  const clear = observeResponsesReasoningEvent(
    new Map(),
    {
      type: "response.output_item.done",
      output_index: 4,
      item: {
        id: "rs_10",
        type: "reasoning",
        summary: [{ type: "summary_text", text: "thought a bit" }],
      },
    },
    9000
  );
  assert.equal(clear.sawOpaque, false, "readable reasoning is not flagged");

  // Sink snapshot scan: opaque output[] → true; plain → false.
  assert.equal(
    snapshotHasOpaqueReasoning({ output: [{ type: "reasoning", encrypted_content: "x" }] }),
    true,
    "snapshot scan finds opaque item"
  );
  assert.equal(
    snapshotHasOpaqueReasoning({ output: [{ type: "message" }] }),
    false,
    "snapshot scan ignores non-reasoning output"
  );
});
