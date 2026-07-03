// Split-guard for the cursorAgentProtobuf wire-primitive extraction (god-file
// decomposition): the low-level protobuf wire codec (varint/tag/length-delimited
// encode+decode + the generic field walker) moved verbatim from cursorAgentProtobuf.ts
// into cursorAgentProtobuf/wire.ts. These primitives were module-private, so the host's
// public API is unchanged; the host imports them back internally. The locks pin the
// leaf's surface, the encode↔decode round-trip invariants, the overrun guard, and that
// the host now imports the wire leaf instead of defining the primitives inline.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import * as wire from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

test("wire leaf exposes the primitives and wire-type constants", () => {
  assert.equal(wire.WT_VARINT, 0);
  assert.equal(wire.WT_LEN, 2);
  for (const fn of [
    "encodeVarint",
    "encodeTag",
    "encodeBytes",
    "encodeString",
    "encodeMessage",
    "encodeUInt32Field",
    "encodeBoolField",
    "encodeDoubleField",
    "decodeVarint",
    "checkedLen",
    "decodeFields",
    "findField",
    "decodeStringField",
    "decodeVarintField",
  ]) {
    assert.equal(
      typeof (wire as Record<string, unknown>)[fn],
      "function",
      `${fn} must be exported`
    );
  }
});

test("varint round-trips across byte-boundaries and bigints", () => {
  for (const n of [0, 1, 127, 128, 300, 16384, 2 ** 31]) {
    const [decoded, next] = wire.decodeVarint(wire.encodeVarint(n), 0);
    assert.equal(decoded, BigInt(n), `varint ${n}`);
    assert.equal(next, wire.encodeVarint(n).length);
  }
  const big = 9007199254740993n; // > Number.MAX_SAFE_INTEGER
  assert.equal(wire.decodeVarint(wire.encodeVarint(big), 0)[0], big);
});

test("string / uint32 / bool fields round-trip through decodeFields", () => {
  assert.equal(wire.decodeStringField(wire.encodeString(1, "héllo"), 1), "héllo");
  assert.equal(wire.decodeStringField(wire.encodeString(3, ""), 3), "");
  assert.equal(wire.decodeVarintField(wire.encodeUInt32Field(2, 42), 2), 42);
  assert.equal(wire.decodeVarintField(wire.encodeBoolField(4, true), 4), 1);
  assert.equal(wire.decodeVarintField(wire.encodeBoolField(4, false), 4), 0);
});

test("decodeFields tags length-delimited vs varint fields and encodeMessage nests", () => {
  const nested = wire.encodeMessage(5, [wire.encodeString(1, "x"), wire.encodeUInt32Field(2, 7)]);
  const [outer] = wire.decodeFields(nested);
  assert.equal(outer.fieldNumber, 5);
  assert.equal(outer.wireType, 2);
  if (outer.wireType === 2) {
    const inner = wire.decodeFields(outer.bytes);
    assert.equal(inner.length, 2);
    assert.equal(wire.decodeStringField(outer.bytes, 1), "x");
    assert.equal(wire.decodeVarintField(outer.bytes, 2), 7);
  }
});

test("checkedLen rejects a length that overruns the buffer", () => {
  assert.throws(() => wire.checkedLen(5n, 0, Buffer.alloc(3)), /overruns buffer/);
  assert.equal(wire.checkedLen(3n, 0, Buffer.alloc(3)), 3);
});

test("host imports the wire leaf and no longer defines the primitives inline", () => {
  const host = fs.readFileSync(path.join("open-sse", "utils", "cursorAgentProtobuf.ts"), "utf-8");
  assert.match(host, /from "\.\/cursorAgentProtobuf\/wire\.ts"/);
  assert.doesNotMatch(host, /^function encodeVarint\(/m, "encodeVarint must live in the wire leaf");
  assert.doesNotMatch(host, /^function decodeFields\(/m, "decodeFields must live in the wire leaf");
});
