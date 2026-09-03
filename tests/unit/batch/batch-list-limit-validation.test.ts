import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  parseBatchListLimit,
  DEFAULT_BATCH_LIST_LIMIT,
  MAX_BATCH_LIST_LIMIT,
} from "../../../src/app/api/v1/batches/parseListLimit.ts";

describe("parseBatchListLimit", () => {
  test("absent or empty limit falls back to the default", () => {
    assert.deepEqual(parseBatchListLimit(null), { ok: true, limit: DEFAULT_BATCH_LIST_LIMIT });
    assert.deepEqual(parseBatchListLimit(""), { ok: true, limit: DEFAULT_BATCH_LIST_LIMIT });
  });

  test("valid in-range integers are accepted", () => {
    assert.deepEqual(parseBatchListLimit("1"), { ok: true, limit: 1 });
    assert.deepEqual(parseBatchListLimit("20"), { ok: true, limit: 20 });
    assert.deepEqual(parseBatchListLimit("50"), { ok: true, limit: 50 });
    assert.deepEqual(parseBatchListLimit(String(MAX_BATCH_LIST_LIMIT)), {
      ok: true,
      limit: MAX_BATCH_LIST_LIMIT,
    });
  });

  test("non-numeric limit is rejected instead of reaching the DB (no more 500 on ?limit=abc)", () => {
    const r = parseBatchListLimit("abc");
    assert.equal(r.ok, false);
    assert.match((r as { message: string }).message, /between 1 and 100/);
  });

  test("negative and zero limits are rejected (no more incoherent has_more)", () => {
    assert.equal(parseBatchListLimit("-1").ok, false);
    assert.equal(parseBatchListLimit("0").ok, false);
  });

  test("above-max limit is rejected (bounds the read)", () => {
    assert.equal(parseBatchListLimit("101").ok, false);
    assert.equal(parseBatchListLimit("999999999").ok, false);
    // Number("1e9") === 1e9, which parseInt would have truncated to 1 — also out of range.
    assert.equal(parseBatchListLimit("1e9").ok, false);
  });

  test("non-integer numeric limits are rejected", () => {
    assert.equal(parseBatchListLimit("20.5").ok, false);
  });
});
