import test from "node:test";
import assert from "node:assert/strict";
import {
  decodeGrokResetCreditsFrame,
  encodeRedeemResetRequest,
} from "../../open-sse/services/grokResetCreditsFrame.ts";

const GRANTED = 1786560540;
const EXPIRES = 1789238940;
const TOKEN_ID = "test-token-id"; // 13 bytes

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

function encodeLengthDelimited(fieldNumber: number, body: Buffer): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function encodeVarintField(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 0), encodeVarint(value)]);
}

function encodeToken(id: string, granted: number, expires: number): Buffer {
  return Buffer.concat([
    encodeLengthDelimited(1, Buffer.from(id, "utf8")),
    encodeVarintField(2, granted),
    encodeVarintField(3, expires),
  ]);
}

function frameData(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = 0x00;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function frameTrailer(statusText = "grpc-status:0\r\n"): Buffer {
  const body = Buffer.from(statusText, "utf8");
  const header = Buffer.alloc(5);
  header[0] = 0x80;
  header.writeUInt32BE(body.length, 1);
  return Buffer.concat([header, body]);
}

test("empty DATA frame + grpc-status 0 is a real zero inventory", () => {
  const buffer = Buffer.concat([frameData(Buffer.alloc(0)), frameTrailer()]);
  const decoded = decodeGrokResetCreditsFrame(buffer);
  assert.equal(decoded.ok, true);
  if (!decoded.ok) return;
  assert.equal(decoded.snapshot.count, 0);
  assert.equal(decoded.snapshot.nextExpiresAt, null);
});

test("one unexpired field-10 token counts as 1", () => {
  const payload = encodeLengthDelimited(10, encodeToken(TOKEN_ID, GRANTED, EXPIRES));
  const decoded = decodeGrokResetCreditsFrame(Buffer.concat([frameData(payload), frameTrailer()]));
  assert.equal(decoded.ok, true);
  if (!decoded.ok) return;
  assert.equal(decoded.snapshot.count, 1);
  assert.equal(decoded.snapshot.nextExpiresAt, new Date(EXPIRES * 1000).toISOString());
  assert.equal(decoded.tokens.length, 1);
  assert.equal(decoded.tokens[0]?.tokenId, TOKEN_ID);
  assert.equal(decoded.tokens[0]?.expiresAt, new Date(EXPIRES * 1000).toISOString());
});

test("repeated field-10 is not collapsed by a Map walker", () => {
  const a = encodeLengthDelimited(10, encodeToken("test-token-aa", GRANTED, EXPIRES));
  const b = encodeLengthDelimited(10, encodeToken("test-token-bb", GRANTED, EXPIRES + 86400));
  const decoded = decodeGrokResetCreditsFrame(
    Buffer.concat([frameData(Buffer.concat([a, b])), frameTrailer()])
  );
  assert.equal(decoded.ok, true);
  if (!decoded.ok) return;
  assert.equal(decoded.snapshot.count, 2);
  assert.equal(decoded.snapshot.nextExpiresAt, new Date(EXPIRES * 1000).toISOString());
  assert.deepEqual(
    decoded.tokens.map((token) => token.tokenId),
    ["test-token-aa", "test-token-bb"]
  );
});

test("expired tokens are dropped from the count", () => {
  const expired = encodeLengthDelimited(10, encodeToken("test-token-ex", GRANTED, 1_700_000_000));
  const live = encodeLengthDelimited(10, encodeToken(TOKEN_ID, GRANTED, EXPIRES));
  const decoded = decodeGrokResetCreditsFrame(
    Buffer.concat([frameData(Buffer.concat([expired, live])), frameTrailer()])
  );
  assert.equal(decoded.ok, true);
  if (!decoded.ok) return;
  assert.equal(decoded.snapshot.count, 1);
  assert.equal(decoded.snapshot.nextExpiresAt, new Date(EXPIRES * 1000).toISOString());
});

test("nonzero grpc-status is not a zero inventory", () => {
  const decoded = decodeGrokResetCreditsFrame(
    Buffer.concat([frameData(Buffer.alloc(0)), frameTrailer("grpc-status:13\r\n")])
  );
  assert.equal(decoded.ok, false);
  if (decoded.ok) return;
  assert.equal(decoded.reason, "trailer-nonzero");
});

test("trailer-only buffer is not a zero inventory", () => {
  const decoded = decodeGrokResetCreditsFrame(frameTrailer());
  assert.equal(decoded.ok, false);
  if (decoded.ok) return;
  assert.equal(decoded.reason, "no-data-frame");
});

test("empty buffer is not a zero inventory", () => {
  const decoded = decodeGrokResetCreditsFrame(Buffer.alloc(0));
  assert.equal(decoded.ok, false);
  if (decoded.ok) return;
  assert.equal(decoded.reason, "empty-buffer");
});

test("13-byte token id is a string, not a nested protobuf message", () => {
  const payload = encodeLengthDelimited(10, encodeToken(TOKEN_ID, GRANTED, EXPIRES));
  const decoded = decodeGrokResetCreditsFrame(Buffer.concat([frameData(payload), frameTrailer()]));
  assert.equal(decoded.ok, true);
  if (!decoded.ok) return;
  assert.equal(decoded.snapshot.count, 1);
  assert.equal(decoded.tokens[0]?.tokenId, TOKEN_ID);
  assert.equal(decoded.tokens[0]?.tokenId.length, 13);
});

test("RedeemReset request encodes token_id as protobuf field 10", () => {
  const encoded = encodeRedeemResetRequest(TOKEN_ID);
  const tag = encoded[0];
  const length = encoded[1];
  assert.equal(tag, (10 << 3) | 2);
  assert.equal(length, TOKEN_ID.length);
  assert.equal(encoded.subarray(2).toString("utf8"), TOKEN_ID);
});
