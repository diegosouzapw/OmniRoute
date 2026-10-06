/**
 * Regression guard for GCF root-array surplus (SPEC Section 13).
 *
 * The root-array decode discarded parseArrayFromHeader's `consumed` count, so a wire whose
 * declared count was fewer than the rows actually present silently dropped the surplus rows
 * (the row loop breaks at the declared count and the extra lines were never read). SPEC 13
 * makes a count mismatch — fewer OR more items than declared — an error. The fix checks that
 * the consumed lines cover the whole document and throws otherwise.
 *
 * Reachable in prod: headroomEngine round-trips the encoded blob; a truncated decode is a
 * silent losslessness violation.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/generic.ts";
import { decodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/decode_generic.ts";

test("surplus rows beyond the declared root-array count throw count_mismatch (SPEC 13)", () => {
  const rows = [
    { a: 1, b: "x" },
    { a: 2, b: "y" },
    { a: 3, b: "z" },
  ];
  const wire = encodeGeneric(rows); // header declares [3]
  const understated = wire.replace("[3]", "[2]"); // declare fewer than present
  assert.throws(
    () => decodeGeneric(understated),
    /count_mismatch/,
    "a root array carrying more rows than declared must error, not silently truncate"
  );
});

test("a root array with the exact declared count decodes normally", () => {
  const rows = [
    { a: 1, b: "x" },
    { a: 2, b: "y" },
    { a: 3, b: "z" },
  ];
  const wire = encodeGeneric(rows);
  assert.deepEqual(decodeGeneric(wire), rows);
});
