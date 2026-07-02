/**
 * Regression guard for B-GCF-QUOTE (lossless violation).
 *
 * SPEC §2.4 requires quoting a string that contains the inline-array pattern `[`…`]``:`
 * (e.g. `ERR[404]: Not Found`, `[Speaker 1]: Hello`). needsQuote() lacked that rule, so
 * such a value emitted bare on a line-level `key=value` RHS is re-parsed by the decoder
 * (decode_generic.ts:142-160) as an inline-array header → throws `count_mismatch` (or
 * silently decodes wrong). Reachable in prod: headroomEngine.apply() ships the blob.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { needsQuote } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/scalar.ts";
import { encodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/generic.ts";
import { decodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/decode_generic.ts";

test("needsQuote flags the inline-array pattern [..]:  (SPEC §2.4)", () => {
  assert.equal(needsQuote("ERR[404]: Not Found"), true);
  assert.equal(needsQuote("[Speaker 1]: Hello"), true);
  assert.equal(needsQuote("[1]: y"), true);
  // Must not over-trigger on innocuous brackets without the colon.
  assert.equal(needsQuote("arr[0] index"), false);
  assert.equal(needsQuote("plain value here"), false);
});

test("GCF round-trips nested values containing [..]: losslessly (B-GCF-QUOTE)", () => {
  const data = [
    { id: 1, status: "x", code: 1, meta: { note: "ERR[404]: Not Found" } },
    { id: 2, status: "y", code: 2, meta: { note: "[Speaker 1]: Hello world" } },
    { id: 3, status: "z", code: 3, meta: { note: "plain note" } },
  ];
  const encoded = encodeGeneric(data);
  const decoded = decodeGeneric(encoded);
  assert.deepEqual(decoded, data);
});
