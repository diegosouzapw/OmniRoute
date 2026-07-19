import test from "node:test";
import assert from "node:assert/strict";

import { decodeGrokCreditsFrame, probeFrameHeader } from "../../open-sse/services/grokCliQuotaFrame.ts";

/**
 * Minimal protobuf encoder for test fixtures only — mirrors the wire format
 * grokCliQuotaFrame.ts decodes (varint tags, fixed64 doubles, length-delimited
 * strings). Not exported from the production module: no schema is public for
 * this endpoint, so tests build synthetic buffers rather than replaying real
 * captured traffic.
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

function encodeDoubleField(fieldNumber: number, value: number): Buffer {
  const body = Buffer.alloc(8);
  body.writeDoubleLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 1), body]);
}

function encodeStringField(fieldNumber: number, value: string): Buffer {
  const body = Buffer.from(value, "utf8");
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function frameBuffer(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = 0x00; // uncompressed
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function buildMessage(percentUsed: number | null, resetAt: string | null): Buffer {
  const parts: Buffer[] = [];
  if (percentUsed !== null) parts.push(encodeDoubleField(1, percentUsed));
  if (resetAt !== null) parts.push(encodeStringField(2, resetAt));
  return Buffer.concat(parts);
}

test("decodeGrokCreditsFrame decodes a framed buffer with credit_usage_percent present", () => {
  const payload = buildMessage(0.42, "2026-08-01T00:00:00.000Z");
  const buffer = frameBuffer(payload);

  const result = decodeGrokCreditsFrame(buffer);

  assert.ok(result);
  assert.ok(Math.abs(result.percentUsed - 0.42) < 1e-9);
  assert.equal(result.resetAt, "2026-08-01T00:00:00.000Z");
});

test("decodeGrokCreditsFrame decodes a raw (unframed) buffer by falling back", () => {
  const payload = buildMessage(0.75, "2026-09-01T00:00:00.000Z");

  // probeFrameHeader must correctly reject this as "not framed" first.
  assert.equal(probeFrameHeader(payload), null);

  const result = decodeGrokCreditsFrame(payload);

  assert.ok(result);
  assert.ok(Math.abs(result.percentUsed - 0.75) < 1e-9);
  assert.equal(result.resetAt, "2026-09-01T00:00:00.000Z");
});

test("decodeGrokCreditsFrame treats an omitted credit_usage_percent as 0% (proto3 default)", () => {
  const payload = buildMessage(null, "2026-10-01T00:00:00.000Z");

  const result = decodeGrokCreditsFrame(payload);

  assert.ok(result);
  assert.equal(result.percentUsed, 0);
  assert.equal(result.resetAt, "2026-10-01T00:00:00.000Z");
});

test("decodeGrokCreditsFrame returns null for a malformed/truncated buffer", () => {
  const payload = buildMessage(0.5, null);
  // Truncate mid-field so the varint/length-delimited walk runs off the end.
  const truncated = payload.subarray(0, payload.length - 3);

  const result = decodeGrokCreditsFrame(truncated);

  assert.equal(result, null);
});

test("decodeGrokCreditsFrame returns null for an empty buffer", () => {
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
  header[0] = 0x07; // not 0x00 or 0x01
  header.writeUInt32BE(0, 1);

  assert.equal(probeFrameHeader(header), null);
});
