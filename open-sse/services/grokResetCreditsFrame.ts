/**
 * grokResetCreditsFrame.ts — gRPC-web decoder for
 * `prod_mc_billing.ConsumerUiSvc/GetRemainingResets`.
 *
 * Live shape (X500, 2026-09-05): empty DATA + grpc-status 0 = inventory 0;
 * otherwise repeated top-level field 10, each a ConsumerResetToken:
 *   field 1 (bytes) token id — server-side redeem only, never logged
 *   field 2 (varint) granted unix seconds
 *   field 3 (varint) expires unix seconds
 *
 * Do not reuse grokCliQuotaFrame.decodeFields: that Map last-wins and
 * would collapse repeated field 10 to a single token.
 */
import { probeFrameHeader } from "./grokCliQuotaFrame.ts";

const WIRE_TYPE_VARINT = 0;
const WIRE_TYPE_FIXED64 = 1;
const WIRE_TYPE_LENGTH_DELIMITED = 2;
const WIRE_TYPE_FIXED32 = 5;
const GRPC_WEB_TRAILER_FLAG_BIT = 0x80;
const MAX_VARINT_SHIFT_BITS = 70n;

const FIELD_RESET_TOKEN = 10;
const TOKEN_FIELD_ID = 1;
const TOKEN_FIELD_EXPIRES = 3;
const REDEEM_REQUEST_TOKEN_ID_FIELD = 10;

type ProtoField =
  | { wireType: typeof WIRE_TYPE_VARINT; value: number }
  | {
      wireType: typeof WIRE_TYPE_FIXED64 | typeof WIRE_TYPE_FIXED32 | typeof WIRE_TYPE_LENGTH_DELIMITED;
      bytes: Buffer;
    };

type TaggedField = { fieldNumber: number; field: ProtoField };

export type GrokResetCreditsSnapshot = {
  count: number;
  nextExpiresAt: string | null;
};

export type GrokResetCreditToken = {
  tokenId: string;
  expiresAt: string | null;
};

export type GrokResetCreditsDecode =
  | { ok: true; snapshot: GrokResetCreditsSnapshot; tokens: GrokResetCreditToken[] }
  | { ok: false; reason: "empty-buffer" | "no-data-frame" | "malformed" | "trailer-nonzero" };

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let n = Math.floor(value);
  while (n > 0x7f) {
    bytes.push((n & 0x7f) | 0x80);
    n = Math.floor(n / 128);
  }
  bytes.push(n);
  return Buffer.from(bytes);
}

/**
 * ConsumerRedeemResetReq.token_id is field 10 (live X500 2026-09-05:
 * fake field-10 id → grpc-status 9 "does not exist"; field 1 / empty →
 * grpc-status 3 "Invalid token_id").
 */
export function encodeRedeemResetRequest(tokenId: string): Buffer {
  const body = Buffer.from(tokenId, "utf8");
  return Buffer.concat([
    encodeVarint((REDEEM_REQUEST_TOKEN_ID_FIELD << 3) | WIRE_TYPE_LENGTH_DELIMITED),
    encodeVarint(body.length),
    body,
  ]);
}

export function encodeGrpcWebRequest(payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function readVarint(buffer: Buffer, offset: number): { value: number; next: number } | null {
  let result = 0n;
  let shift = 0n;
  let pos = offset;
  for (;;) {
    if (pos >= buffer.length) return null;
    const byte = buffer[pos];
    result |= BigInt(byte & 0x7f) << shift;
    pos += 1;
    if ((byte & 0x80) === 0) break;
    shift += 7n;
    if (shift > MAX_VARINT_SHIFT_BITS) return null;
  }
  return { value: Number(result), next: pos };
}

function readField(buffer: Buffer, offset: number): { tagged: TaggedField; next: number } | null {
  const tagResult = readVarint(buffer, offset);
  if (!tagResult) return null;
  const fieldNumber = tagResult.value >>> 3;
  const wireType = tagResult.value & 0x7;
  if (fieldNumber === 0) return null;

  if (wireType === WIRE_TYPE_VARINT) {
    const valueResult = readVarint(buffer, tagResult.next);
    if (!valueResult) return null;
    return {
      tagged: { fieldNumber, field: { wireType: WIRE_TYPE_VARINT, value: valueResult.value } },
      next: valueResult.next,
    };
  }
  if (wireType === WIRE_TYPE_LENGTH_DELIMITED) {
    const lengthResult = readVarint(buffer, tagResult.next);
    if (!lengthResult) return null;
    const { value: length, next: bodyStart } = lengthResult;
    if (length < 0 || bodyStart + length > buffer.length) return null;
    return {
      tagged: {
        fieldNumber,
        field: { wireType: WIRE_TYPE_LENGTH_DELIMITED, bytes: buffer.subarray(bodyStart, bodyStart + length) },
      },
      next: bodyStart + length,
    };
  }
  if (wireType === WIRE_TYPE_FIXED64) {
    if (tagResult.next + 8 > buffer.length) return null;
    return {
      tagged: {
        fieldNumber,
        field: { wireType: WIRE_TYPE_FIXED64, bytes: buffer.subarray(tagResult.next, tagResult.next + 8) },
      },
      next: tagResult.next + 8,
    };
  }
  if (wireType === WIRE_TYPE_FIXED32) {
    if (tagResult.next + 4 > buffer.length) return null;
    return {
      tagged: {
        fieldNumber,
        field: { wireType: WIRE_TYPE_FIXED32, bytes: buffer.subarray(tagResult.next, tagResult.next + 4) },
      },
      next: tagResult.next + 4,
    };
  }
  return null;
}

function walkFields(buffer: Buffer): TaggedField[] | null {
  const fields: TaggedField[] = [];
  let offset = 0;
  while (offset < buffer.length) {
    const result = readField(buffer, offset);
    if (!result) return null;
    fields.push(result.tagged);
    offset = result.next;
  }
  return fields;
}

function decodeTrailerMessage(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    return raw;
  }
}

function parseTrailer(trailerBody: Buffer): { status: number | null; message: string | null } {
  const text = trailerBody.toString("utf8");
  const statusMatch = text.match(/grpc-status:\s*(\d+)/);
  const messageMatch = text.match(/grpc-message:\s*([^\r\n]+)/);
  return {
    status: statusMatch ? Number(statusMatch[1]) : null,
    message: decodeTrailerMessage(messageMatch?.[1] ?? null),
  };
}

export function decodeGrokGrpcWebRpc(
  buffer: Buffer,
  headerStatus?: string | null,
  headerMessage?: string | null
): { grpcStatus: string; grpcMessage: string | null } {
  let trailerStatus: number | null = null;
  let trailerMessage: string | null = null;
  let offset = 0;
  while (offset < buffer.length) {
    const frame = probeFrameHeader(buffer, offset);
    if (!frame) break;
    const frameEnd = frame.payloadStart + frame.payloadLength;
    const body = buffer.subarray(frame.payloadStart, frameEnd);
    if ((frame.flag & GRPC_WEB_TRAILER_FLAG_BIT) !== 0) {
      const parsed = parseTrailer(body);
      if (parsed.status !== null) trailerStatus = parsed.status;
      if (parsed.message) trailerMessage = parsed.message;
    }
    offset = frameEnd;
  }
  const grpcStatus =
    trailerStatus !== null ? String(trailerStatus) : headerStatus && headerStatus.trim() ? headerStatus.trim() : "13";
  const grpcMessage = trailerMessage ?? decodeTrailerMessage(headerMessage ?? null);
  return { grpcStatus, grpcMessage };
}

function splitFrames(buffer: Buffer): {
  dataPayload: Buffer | null;
  sawData: boolean;
  trailerStatus: number | null;
} {
  let offset = 0;
  let dataPayload: Buffer | null = null;
  let sawData = false;
  let trailerStatus: number | null = null;

  while (offset < buffer.length) {
    const frame = probeFrameHeader(buffer, offset);
    if (!frame) break;
    const frameEnd = frame.payloadStart + frame.payloadLength;
    const body = buffer.subarray(frame.payloadStart, frameEnd);
    if ((frame.flag & GRPC_WEB_TRAILER_FLAG_BIT) !== 0) {
      const status = parseTrailer(body).status;
      if (status !== null) trailerStatus = status;
    } else if (!sawData) {
      sawData = true;
      dataPayload = body;
    }
    offset = frameEnd;
  }

  return { dataPayload, sawData, trailerStatus };
}

function tokenExpiresAtMs(tokenFields: TaggedField[]): number | null {
  const expires = tokenFields.find(
    (field) => field.fieldNumber === TOKEN_FIELD_EXPIRES && field.field.wireType === WIRE_TYPE_VARINT
  );
  if (!expires || expires.field.wireType !== WIRE_TYPE_VARINT) return null;
  if (!Number.isFinite(expires.field.value)) return null;
  return expires.field.value * 1000;
}

function tokenIdFromFields(tokenFields: TaggedField[]): string | null {
  const id = tokenFields.find(
    (field) =>
      field.fieldNumber === TOKEN_FIELD_ID && field.field.wireType === WIRE_TYPE_LENGTH_DELIMITED
  );
  if (!id || id.field.wireType !== WIRE_TYPE_LENGTH_DELIMITED) return null;
  const tokenId = id.field.bytes.toString("utf8").trim();
  return tokenId.length > 0 ? tokenId : null;
}

function inventoryFromPayload(
  payload: Buffer,
  nowMs: number
): { snapshot: GrokResetCreditsSnapshot; tokens: GrokResetCreditToken[] } | null {
  if (payload.length === 0) {
    return { snapshot: { count: 0, nextExpiresAt: null }, tokens: [] };
  }

  const top = walkFields(payload);
  if (!top) return null;

  const tokens: GrokResetCreditToken[] = [];
  const expiresMs: number[] = [];

  for (const tagged of top) {
    if (tagged.fieldNumber !== FIELD_RESET_TOKEN) continue;
    if (tagged.field.wireType !== WIRE_TYPE_LENGTH_DELIMITED) return null;
    const tokenFields = walkFields(tagged.field.bytes);
    if (!tokenFields) return null;
    const tokenId = tokenIdFromFields(tokenFields);
    if (!tokenId) return null;
    const expires = tokenExpiresAtMs(tokenFields);
    if (expires !== null && expires < nowMs) continue;
    tokens.push({
      tokenId,
      expiresAt: expires === null ? null : new Date(expires).toISOString(),
    });
    if (expires !== null) expiresMs.push(expires);
  }

  const next = expiresMs.length > 0 ? Math.min(...expiresMs) : null;
  return {
    snapshot: {
      count: tokens.length,
      nextExpiresAt: next === null ? null : new Date(next).toISOString(),
    },
    tokens,
  };
}

export function decodeGrokResetCreditsFrame(
  buffer: Buffer,
  nowMs = Date.now()
): GrokResetCreditsDecode {
  if (!buffer || buffer.length === 0) {
    return { ok: false, reason: "empty-buffer" };
  }

  try {
    const framed = probeFrameHeader(buffer, 0) !== null;
    if (!framed) {
      const inventory = inventoryFromPayload(buffer, nowMs);
      if (!inventory) return { ok: false, reason: "malformed" };
      return { ok: true, ...inventory };
    }

    const { dataPayload, sawData, trailerStatus } = splitFrames(buffer);
    if (trailerStatus !== null && trailerStatus !== 0) {
      return { ok: false, reason: "trailer-nonzero" };
    }
    if (!sawData || dataPayload === null) {
      return { ok: false, reason: "no-data-frame" };
    }

    const inventory = inventoryFromPayload(dataPayload, nowMs);
    if (!inventory) return { ok: false, reason: "malformed" };
    return { ok: true, ...inventory };
  } catch {
    return { ok: false, reason: "malformed" };
  }
}
