/**
 * Regression test for /api/conversations/[id]/tree's query-param parsing.
 *
 * Real bug: `Number(searchParams.get("beforeSeq"))` is 0 (not NaN) when the
 * param is absent, since `Number(null) === 0`. That made an ABSENT
 * beforeSeq/afterSeq look like "beforeSeq=0"/"afterSeq=0" was explicitly
 * given, which — because the DB layer checks `opts.afterSeq != null` (true
 * for 0) BEFORE checking limit — forced every single request into the
 * uncapped "poll for new turns" branch, ignoring `limit` entirely and
 * returning the conversation's ENTIRE history on every load.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { parseSeqParam } from "../../src/app/api/conversations/[id]/tree/route.ts";

test("parseSeqParam: an absent query param returns undefined, not 0", () => {
  assert.equal(parseSeqParam(null), undefined);
  assert.equal(parseSeqParam(""), undefined);
});

test("parseSeqParam: a real numeric string parses to that number, including a literal '0'", () => {
  assert.equal(parseSeqParam("0"), 0);
  assert.equal(parseSeqParam("42"), 42);
});

test("parseSeqParam: a non-numeric string returns undefined rather than NaN", () => {
  assert.equal(parseSeqParam("not-a-number"), undefined);
});
