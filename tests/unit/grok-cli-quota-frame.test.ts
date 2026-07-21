import test from "node:test";
import assert from "node:assert/strict";

import { decodeGrokCreditsFrame, probeFrameHeader } from "../../open-sse/services/grokCliQuotaFrame.ts";

/**
 * Minimal protobuf encoder for test fixtures only — mirrors the REAL wire
 * format captured live against `grok.com` on 2026-07-20 (see the #7714
 * plan-file validation notes), not the original field-1-double/field-2-string
 * guess. Not exported from the production module: no schema is public for
 * this endpoint, so tests build synthetic buffers rather than replaying real
 * captured traffic byte-for-byte.
 *
 * Confirmed real shape (119-byte capture):
 *   top-level field 1 (length-delimited, 92B) — nested "credits info" message
 *     subfield 1  (fixed32 float) — usage ratio, 0..1 (1.0 = fully used)
 *     subfield 4  (Timestamp{seconds,nanos}) — present in the wild, unused
 *     subfield 5  (Timestamp{seconds,nanos}) — credit-pool reset time
 *   followed by a 2nd gRPC-web frame, flag 0x80 (trailer, `grpc-status:0`)
 */
function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let v = BigInt(value);
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0n);
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeFixed32Field(fieldNumber: number, value: number): Buffer {
  const body = Buffer.alloc(4);
  body.writeFloatLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 5), body]);
}

function encodeLengthDelimited(fieldNumber: number, body: Buffer): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function encodeVarintField(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 0), encodeVarint(value)]);
}

/** Encode a nested `Timestamp{seconds, nanos}` message at `fieldNumber`. */
function encodeTimestampField(fieldNumber: number, seconds: number, nanos: number): Buffer {
  const parts: Buffer[] = [];
  if (seconds !== 0) parts.push(encodeVarintField(1, seconds));
  if (nanos !== 0) parts.push(encodeVarintField(2, nanos));
  return encodeLengthDelimited(fieldNumber, Buffer.concat(parts));
}

interface CreditsInfoShape {
  usageRatio?: number;
  asOfSeconds?: number;
  asOfNanos?: number;
  resetSeconds?: number;
  resetNanos?: number;
}

/** Encode the nested "credits info" message (top-level field 1's payload). */
function encodeCreditsInfo(shape: CreditsInfoShape): Buffer {
  const parts: Buffer[] = [];
  if (shape.usageRatio !== undefined) parts.push(encodeFixed32Field(1, shape.usageRatio));
  if (shape.asOfSeconds !== undefined) {
    parts.push(encodeTimestampField(4, shape.asOfSeconds, shape.asOfNanos ?? 0));
  }
  if (shape.resetSeconds !== undefined) {
    parts.push(encodeTimestampField(5, shape.resetSeconds, shape.resetNanos ?? 0));
  }
  return Buffer.concat(parts);
}

/** Encode the full top-level message: field 1 = the nested credits-info message. */
function encodeTopLevelMessage(creditsInfo: Buffer): Buffer {
  return encodeLengthDelimited(1, creditsInfo);
}

function frameData(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = 0x00; // uncompressed data frame
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

/** A gRPC-web trailer frame (flag 0x80) — not protobuf, must be skipped. */
function frameTrailer(statusText = "grpc-status:0\r\n"): Buffer {
  const body = Buffer.from(statusText, "utf8");
  const header = Buffer.alloc(5);
  header[0] = 0x80;
  header.writeUInt32BE(body.length, 1);
  return Buffer.concat([header, body]);
}

// Values captured live against grok.com's GetGrokCreditsConfig on 2026-07-20.
const REAL_USAGE_RATIO = 1.0;
const REAL_ASOF_SECONDS = 1784221140;
const REAL_ASOF_NANOS = 867850000;
const REAL_RESET_SECONDS = 1784825940;
const REAL_RESET_NANOS = 867850000;
const PERCENT_TOLERANCE = 1e-4; // fixed32 (float) round-trip precision, not fixed64 (double)

function isoFromEpoch(seconds: number, nanos: number): string {
  return new Date(seconds * 1000 + Math.round(nanos / 1_000_000)).toISOString();
}

test("decodeGrokCreditsFrame decodes the real captured GetGrokCreditsConfig shape (nested message, fixed32 ratio, Timestamp reset, trailer frame present)", () => {
  const creditsInfo = encodeCreditsInfo({
    usageRatio: REAL_USAGE_RATIO,
    asOfSeconds: REAL_ASOF_SECONDS,
    asOfNanos: REAL_ASOF_NANOS,
    resetSeconds: REAL_RESET_SECONDS,
    resetNanos: REAL_RESET_NANOS,
  });
  const buffer = Buffer.concat([frameData(encodeTopLevelMessage(creditsInfo)), frameTrailer()]);

  const result = decodeGrokCreditsFrame(buffer);

  assert.ok(result);
  assert.equal(result.percentUsed, 100); // ratio 1.0 * 100, exact in float32
  assert.equal(result.resetAt, isoFromEpoch(REAL_RESET_SECONDS, REAL_RESET_NANOS));
});

test("decodeGrokCreditsFrame ignores a trailing gRPC-web trailer frame (flag 0x80) and decodes the data frame only", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: 0.5, resetSeconds: REAL_RESET_SECONDS, resetNanos: 0 });
  const topMessage = encodeTopLevelMessage(creditsInfo);
  const withoutTrailer = frameData(topMessage);
  const withTrailer = Buffer.concat([frameData(topMessage), frameTrailer()]);

  const resultWithoutTrailer = decodeGrokCreditsFrame(withoutTrailer);
  const resultWithTrailer = decodeGrokCreditsFrame(withTrailer);

  assert.ok(resultWithoutTrailer);
  assert.ok(resultWithTrailer);
  assert.equal(resultWithTrailer.percentUsed, resultWithoutTrailer.percentUsed);
  assert.equal(resultWithTrailer.resetAt, resultWithoutTrailer.resetAt);
  assert.equal(resultWithTrailer.percentUsed, 50);
});

test("decodeGrokCreditsFrame decodes a raw (unframed) buffer by falling back", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: 0.75, resetSeconds: REAL_RESET_SECONDS, resetNanos: REAL_RESET_NANOS });
  const payload = encodeTopLevelMessage(creditsInfo);

  // probeFrameHeader must correctly reject this as "not framed" first.
  assert.equal(probeFrameHeader(payload), null);

  const result = decodeGrokCreditsFrame(payload);

  assert.ok(result);
  assert.ok(Math.abs(result.percentUsed - 75) < PERCENT_TOLERANCE);
  assert.equal(result.resetAt, isoFromEpoch(REAL_RESET_SECONDS, REAL_RESET_NANOS));
});

test("decodeGrokCreditsFrame treats an omitted usage-ratio subfield as 0% (proto3 default)", () => {
  const creditsInfo = encodeCreditsInfo({ resetSeconds: REAL_RESET_SECONDS, resetNanos: REAL_RESET_NANOS });
  const buffer = frameData(encodeTopLevelMessage(creditsInfo));

  const result = decodeGrokCreditsFrame(buffer);

  assert.ok(result);
  assert.equal(result.percentUsed, 0);
  assert.equal(result.resetAt, isoFromEpoch(REAL_RESET_SECONDS, REAL_RESET_NANOS));
});

test("decodeGrokCreditsFrame clamps a usage ratio above 1.0 (overage) to percentUsed 100", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: 1.5 });
  const buffer = frameData(encodeTopLevelMessage(creditsInfo));

  const result = decodeGrokCreditsFrame(buffer);

  assert.ok(result);
  assert.equal(result.percentUsed, 100);
});

test("decodeGrokCreditsFrame returns null for a negative usage ratio (malformed)", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: -0.1 });
  const buffer = frameData(encodeTopLevelMessage(creditsInfo));

  assert.equal(decodeGrokCreditsFrame(buffer), null);
});

test("decodeGrokCreditsFrame returns null when the top-level field 1 is not length-delimited (unexpected shape)", () => {
  const buffer = frameData(encodeVarintField(1, 42));

  assert.equal(decodeGrokCreditsFrame(buffer), null);
});

test("decodeGrokCreditsFrame returns null when the nested usage-ratio subfield has an unexpected wire type", () => {
  // subfield 1 encoded as length-delimited (a string) instead of fixed32.
  const creditsInfo = encodeLengthDelimited(1, Buffer.from("not-a-float", "utf8"));
  const buffer = frameData(encodeTopLevelMessage(creditsInfo));

  assert.equal(decodeGrokCreditsFrame(buffer), null);
});

test("decodeGrokCreditsFrame returns null when the top-level message has no field 1 at all", () => {
  const buffer = frameData(encodeVarintField(9, 1)); // some unrelated field, no credits-info

  assert.equal(decodeGrokCreditsFrame(buffer), null);
});

test("decodeGrokCreditsFrame returns null for a malformed/truncated buffer", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: 0.5, resetSeconds: REAL_RESET_SECONDS, resetNanos: REAL_RESET_NANOS });
  const buffer = frameData(encodeTopLevelMessage(creditsInfo));
  // Truncate mid-way through the nested Timestamp so the inner walk runs off the end.
  const truncated = buffer.subarray(0, buffer.length - 3);

  assert.equal(decodeGrokCreditsFrame(truncated), null);
});

test("decodeGrokCreditsFrame returns null for a frame declaring a trailer-only body (no data frame present)", () => {
  const buffer = frameTrailer();

  assert.equal(decodeGrokCreditsFrame(buffer), null);
});

test("decodeGrokCreditsFrame returns null for an empty buffer (matches the pre-fix no-request-body response)", () => {
  const result = decodeGrokCreditsFrame(Buffer.alloc(0));
  assert.equal(result, null);
});

test("probeFrameHeader rejects a buffer whose declared length exceeds the body", () => {
  const header = Buffer.alloc(5);
  header[0] = 0x00;
  header.writeUInt32BE(9999, 1); // declares far more bytes than actually follow
  const buffer = Buffer.concat([header, Buffer.from([0x01, 0x02])]);

  assert.equal(probeFrameHeader(buffer), null);
});

test("probeFrameHeader rejects an invalid compression flag", () => {
  const header = Buffer.alloc(5);
  header[0] = 0x07; // not 0x00 / 0x01 / 0x80 / 0x81

  assert.equal(probeFrameHeader(header), null);
});

test("probeFrameHeader accepts a trailer frame header (flag 0x80) and surfaces the flag", () => {
  const buffer = frameTrailer();

  const result = probeFrameHeader(buffer);

  assert.ok(result);
  assert.equal(result.flag, 0x80);
});

test("probeFrameHeader reads a frame header at a non-zero offset", () => {
  const creditsInfo = encodeCreditsInfo({ usageRatio: 0.5 });
  const buffer = Buffer.concat([frameData(encodeTopLevelMessage(creditsInfo)), frameTrailer()]);
  const firstFrame = probeFrameHeader(buffer);
  assert.ok(firstFrame);

  const secondOffset = firstFrame.payloadStart + firstFrame.payloadLength;
  const secondFrame = probeFrameHeader(buffer, secondOffset);

  assert.ok(secondFrame);
  assert.equal(secondFrame.flag, 0x80);
});
