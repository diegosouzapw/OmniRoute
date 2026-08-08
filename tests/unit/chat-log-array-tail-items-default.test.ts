/**
 * Regression test for the CHAT_LOG_ARRAY_TAIL_ITEMS default bump 24 -> 128.
 *
 * Real agentic CLIs with many MCP servers routinely declare 40-50+ tools in
 * a single request — a live OpenClaw session logged 47. The old tail-24
 * default silently dropped the array's earlier entries behind an
 * `_omniroute_truncated_array` marker, including (in one traced case) the
 * tool actually being called, making its declared shape unrecoverable from
 * the call log even though the call itself succeeded.
 *
 * Pins the literal default so a future edit can't silently regress it back
 * toward the old, too-small value.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { getChatLogArrayTailItems } from "@/lib/logEnv";

test("getChatLogArrayTailItems defaults to 128 (not the old 24) when unset", () => {
  const saved = process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
  delete process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
  try {
    assert.equal(getChatLogArrayTailItems(), 128);
  } finally {
    if (saved === undefined) delete process.env.CHAT_LOG_ARRAY_TAIL_ITEMS;
    else process.env.CHAT_LOG_ARRAY_TAIL_ITEMS = saved;
  }
});
