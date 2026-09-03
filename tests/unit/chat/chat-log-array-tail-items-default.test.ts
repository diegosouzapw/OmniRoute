/**
 * Regression test for the CHAT_LOG_ARRAY_TAIL_ITEMS default bumps: 24 -> 128 -> 1000.
 *
 * Real agentic CLIs with many MCP servers routinely declare 40-50+ tools in
 * a single request — a live OpenClaw session logged 47 — and a multi-round
 * tool-calling turn logs well over a hundred input items. Worse than a
 * diagnosability gap: `resolvePreviousResponseState`
 * (responsesContinuationStore.ts) reads this same bounded artifact back to
 * reconstruct `previous_response_id` history server-side, so once a stored
 * conversation's input/output array crossed the cap, continuation failed
 * the call outright on the `_omniroute_truncated_array` sentinel. Retention
 * (CALL_LOG_RETENTION_DAYS) already bounds total on-disk size independent of
 * this per-item cap, so raising it further doesn't change the storage
 * ceiling.
 *
 * Pins the literal default so a future edit can't silently regress it back
 * toward one of the old, too-small values.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { getChatLogArrayTailItems } from "@/lib/logEnv";

test("getChatLogArrayTailItems defaults to 1000 (not the old 24 or 128) when unset", () => {
  const saved = process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
  delete process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
  try {
    assert.equal(getChatLogArrayTailItems(), 1000);
  } finally {
    if (saved === undefined) delete process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
    else process.env.CHAT_LOG_ARRAY_TAIL_ITEMS = saved;
  }
});
