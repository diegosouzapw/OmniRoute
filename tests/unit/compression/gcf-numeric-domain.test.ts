/**
 * Regression guard for the GCF numeric domain (SPEC 2.3.1 / 2.3.2).
 *
 * formatNumber() gated plain-decimal rendering at `abs < 1e21`, so an integer-valued double
 * in [2^53, 1e21) was emitted as a bare-integer token (e.g. `1e18` -> `1000000000000000000`).
 * That token is indistinguishable from an int64 on the wire and beyond a JavaScript decoder's
 * safe-integer range (2^53-1), so a spec-compliant decoder rejects it (unsafe_integer) or a
 * cross-language decoder reads it as an exact int64 it never was. The fix gates at 2^53, so
 * such values render in exponent form and stay typed as doubles.
 *
 * Reachable in prod: headroomEngine.apply() ships the encoded blob.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/generic.ts";
import { decodeGeneric } from "@omniroute/open-sse/services/compression/engines/headroom/gcf/decode_generic.ts";

test("a double >= 2^53 renders in exponent form, not a bare integer (SPEC 2.3.1)", () => {
  const wire = encodeGeneric([{ v: 1e18 }]);
  assert.match(wire, /1e\+18/, `expected exponent notation, got:\n${wire}`);
  assert.doesNotMatch(
    wire,
    /1000000000000000000/,
    `a bare-integer token for a double is ambiguous with int64:\n${wire}`
  );
  assert.deepEqual(decodeGeneric(wire), [{ v: 1e18 }]);
});

test("2^53 itself renders as exponent and round-trips", () => {
  const wire = encodeGeneric([{ v: 9007199254740992 }]); // 2^53
  assert.doesNotMatch(wire, /9007199254740992/, `2^53 must not emit as a bare integer:\n${wire}`);
  assert.deepEqual(decodeGeneric(wire), [{ v: 9007199254740992 }]);
});

test("integers below 2^53 still render as plain decimal (int64 domain) and round-trip", () => {
  const rows = [{ v: 42 }, { v: 1234567 }, { v: 9007199254740991 }]; // 2^53-1
  const wire = encodeGeneric(rows);
  assert.match(wire, /9007199254740991/, `2^53-1 is an exact int64 and must stay plain:\n${wire}`);
  assert.deepEqual(decodeGeneric(wire), rows);
});
