/**
 * grokCliQuotaFrame.ts — gRPC-web frame decoder for xAI's
 * `grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig` response (#6844).
 *
 * No public `.proto` schema exists for this endpoint (confirmed against
 * steipete/CodexBar's `docs/grok.md` during triage), so this is a minimal
 * varint/length-delimited protobuf decoder — not a codegen'd client. It is
 * intentionally defensive: any malformed or unrecognized buffer returns
 * `null` rather than throwing, so `grokCliQuotaFetcher.ts` can fail open
 * (same "unknown never disables the connection" convention as
 * `antigravityCredits.ts`).
 *
 * gRPC-web responses may arrive in one of two shapes:
 *   - "framed": a 5-byte header (1 compression-flag byte + 4-byte
 *     big-endian length) followed by the protobuf message body.
 *   - "raw": just the protobuf message body, no frame header.
 *
 * `probeFrameHeader()` decides which shape a buffer is by validating the
 * header (compression flag must be 0x00/0x01 and the declared length must
 * fit the buffer) and `decodeGrokCreditsFrame()` falls back to raw parsing
 * when the probe fails.
 *
 * Per proto3 semantics, an *omitted* `credit_usage_percent` field means 0%
 * used — we never synthesize a different default.
 */

const FIELD_CREDIT_USAGE_PERCENT = 1;
const FIELD_RESET_AT = 2;

const WIRE_TYPE_VARINT = 0;
const WIRE_TYPE_FIXED64 = 1;
const WIRE_TYPE_LENGTH_DELIMITED = 2;
const WIRE_TYPE_FIXED32 = 5;

const MAX_VARINT_SHIFT_BITS = 70n;

export interface GrokCreditsQuota {
  percentUsed: number;
  resetAt: string | null;
}

export interface FrameProbeResult {
  payloadStart: number;
  payloadLength: number;
}

type ProtoField =
  | { wireType: typeof WIRE_TYPE_VARINT; value: number }
  | { wireType: typeof WIRE_TYPE_FIXED64 | typeof WIRE_TYPE_FIXED32 | typeof WIRE_TYPE_LENGTH_DELIMITED; bytes: Buffer };

/**
 * Validate a gRPC-web frame header at the start of `buffer`. Returns the
 * payload window when the header looks legitimate (compression flag is
 * 0x00 or 0x01, declared length fits inside the remaining buffer) or
 * `null` when the buffer does not start with a valid frame header — the
 * caller then treats the whole buffer as raw, unframed protobuf.
 */
export function probeFrameHeader(buffer: Buffer): FrameProbeResult | null {
  if (buffer.length < 5) return null;
  const compressionFlag = buffer[0];
  if (compressionFlag !== 0x00 && compressionFlag !== 0x01) return null;
  const payloadLength = buffer.readUInt32BE(1);
  if (payloadLength > buffer.length - 5) return null;
  return { payloadStart: 5, payloadLength };
}

/** Read a protobuf varint starting at `offset`. Returns null past the buffer end. */
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

function readLengthDelimitedField(
  buffer: Buffer,
  offset: number
): { field: ProtoField; next: number } | null {
  const lengthResult = readVarint(buffer, offset);
  if (!lengthResult) return null;
  const { value: length, next: bodyStart } = lengthResult;
  if (length < 0 || bodyStart + length > buffer.length) return null;
  return {
    field: { wireType: WIRE_TYPE_LENGTH_DELIMITED, bytes: buffer.subarray(bodyStart, bodyStart + length) },
    next: bodyStart + length,
  };
}

function readFixedWidthField(
  buffer: Buffer,
  offset: number,
  width: 4 | 8,
  wireType: typeof WIRE_TYPE_FIXED32 | typeof WIRE_TYPE_FIXED64
): { field: ProtoField; next: number } | null {
  if (offset + width > buffer.length) return null;
  return { field: { wireType, bytes: buffer.subarray(offset, offset + width) }, next: offset + width };
}

/** Read a single tagged field at `offset`. Returns null on any malformed/unsupported wire data. */
function readField(
  buffer: Buffer,
  offset: number
): { fieldNumber: number; field: ProtoField; next: number } | null {
  const tagResult = readVarint(buffer, offset);
  if (!tagResult) return null;
  const fieldNumber = tagResult.value >>> 3;
  const wireType = tagResult.value & 0x7;
  if (fieldNumber === 0) return null;

  if (wireType === WIRE_TYPE_VARINT) {
    const valueResult = readVarint(buffer, tagResult.next);
    if (!valueResult) return null;
    return {
      fieldNumber,
      field: { wireType: WIRE_TYPE_VARINT, value: valueResult.value },
      next: valueResult.next,
    };
  }
  if (wireType === WIRE_TYPE_LENGTH_DELIMITED) {
    const result = readLengthDelimitedField(buffer, tagResult.next);
    return result ? { fieldNumber, field: result.field, next: result.next } : null;
  }
  if (wireType === WIRE_TYPE_FIXED64) {
    const result = readFixedWidthField(buffer, tagResult.next, 8, WIRE_TYPE_FIXED64);
    return result ? { fieldNumber, field: result.field, next: result.next } : null;
  }
  if (wireType === WIRE_TYPE_FIXED32) {
    const result = readFixedWidthField(buffer, tagResult.next, 4, WIRE_TYPE_FIXED32);
    return result ? { fieldNumber, field: result.field, next: result.next } : null;
  }
  // Deprecated group wire types (3/4) or any other unrecognized wire type — malformed.
  return null;
}

/** Walk a protobuf message body into a field-number -> field map. Never throws. */
function decodeFields(buffer: Buffer): Map<number, ProtoField> | null {
  const fields = new Map<number, ProtoField>();
  let offset = 0;
  while (offset < buffer.length) {
    const result = readField(buffer, offset);
    if (!result) return null;
    fields.set(result.fieldNumber, result.field);
    offset = result.next;
  }
  return fields;
}

function extractPercentUsed(field: ProtoField | undefined): number | null {
  if (!field) return 0; // proto3 omission means 0% used
  if (field.wireType === WIRE_TYPE_FIXED64) return field.bytes.readDoubleLE(0);
  if (field.wireType === WIRE_TYPE_FIXED32) return field.bytes.readFloatLE(0);
  if (field.wireType === WIRE_TYPE_VARINT) {
    // Varint-encoded percent is assumed to already be a 0-100 integer scale.
    return field.value > 1 ? field.value / 100 : field.value;
  }
  return null; // unexpected wire type for a known field number = malformed
}

function extractResetAt(field: ProtoField | undefined): string | null {
  if (!field || field.wireType !== WIRE_TYPE_LENGTH_DELIMITED) return null;
  const raw = field.bytes.toString("utf8").trim();
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Decode a `GetGrokCreditsConfig` gRPC-web response buffer into
 * `{ percentUsed, resetAt }`, or `null` when the buffer is empty,
 * truncated, or otherwise unparseable. Never throws.
 */
export function decodeGrokCreditsFrame(buffer: Buffer): GrokCreditsQuota | null {
  if (!buffer || buffer.length === 0) return null;

  try {
    const frame = probeFrameHeader(buffer);
    const payload = frame
      ? buffer.subarray(frame.payloadStart, frame.payloadStart + frame.payloadLength)
      : buffer;

    const fields = decodeFields(payload);
    if (!fields) return null;

    const percentUsed = extractPercentUsed(fields.get(FIELD_CREDIT_USAGE_PERCENT));
    if (percentUsed === null || !Number.isFinite(percentUsed) || percentUsed < 0) return null;

    return {
      percentUsed: Math.min(1, percentUsed),
      resetAt: extractResetAt(fields.get(FIELD_RESET_AT)),
    };
  } catch {
    return null;
  }
}
