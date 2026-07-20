/**
 * grokCliQuotaFrame.ts — gRPC-web frame decoder for xAI's
 * `grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig` response (#6844).
 *
 * No public `.proto` schema exists for this endpoint. The field mapping
 * below was reverse-engineered from a LIVE capture against `grok.com` on
 * 2026-07-20 (real bearer token, tier-4 account) — the original
 * field-1-is-a-double / field-2-is-a-string guess (sourced from a
 * third-party doc, steipete/CodexBar) turned out to be wrong: it always
 * decoded the real response to `null`. It is intentionally defensive: any
 * malformed or unrecognized buffer returns `null` rather than throwing, so
 * `grokCliQuotaFetcher.ts` can fail open (same "unknown never disables the
 * connection" convention as `antigravityCredits.ts`).
 *
 * Confirmed real response shape (119-byte capture):
 *   top-level field 1 (length-delimited, 92B) — nested "credits info" message
 *     subfield 1  (fixed32 float)            — usage ratio, 0..1 (1.0 = fully used)
 *     subfield 4  (Timestamp{seconds,nanos}) — present in the wild, unused here
 *     subfield 5  (Timestamp{seconds,nanos}) — credit-pool reset time
 *     subfields 7/8/11/13                    — present in the wild, ignored
 *
 * gRPC-web responses may arrive in one of two shapes:
 *   - "framed": one or more 5-byte-header frames (1 flag byte + 4-byte
 *     big-endian length). A unary call over plain `fetch()` gets the DATA
 *     frame (flag 0x00 uncompressed / 0x01 compressed) immediately followed
 *     by a TRAILER frame (flag 0x80 / 0x81 — high bit set, e.g.
 *     `grpc-status:0`, not protobuf) concatenated in the same response body.
 *     `findDataFramePayload()` walks frame-by-frame and returns only the
 *     first DATA frame's payload, skipping trailers — they are never handed
 *     to the protobuf walker.
 *   - "raw": just the protobuf message body, no frame header at all.
 *
 * `probeFrameHeader()` validates a single frame header at a given offset
 * (flag byte must be 0x00/0x01/0x80/0x81 and the declared length must fit
 * the buffer); `decodeGrokCreditsFrame()` falls back to raw parsing only
 * when the buffer doesn't look framed at all.
 *
 * Per proto3 semantics, an *omitted* usage-ratio subfield means 0% used —
 * we never synthesize a different default.
 */

const FIELD_CREDITS_INFO = 1; // top-level: nested message with ratio + timestamps

const CREDITS_FIELD_USAGE_RATIO = 1; // nested: fixed32 float, 0..1 fraction used
const CREDITS_FIELD_RESET_TIMESTAMP = 5; // nested: Timestamp{seconds,nanos} — reset time

const TIMESTAMP_FIELD_SECONDS = 1;
const TIMESTAMP_FIELD_NANOS = 2;

const WIRE_TYPE_VARINT = 0;
const WIRE_TYPE_FIXED64 = 1;
const WIRE_TYPE_LENGTH_DELIMITED = 2;
const WIRE_TYPE_FIXED32 = 5;

// gRPC-web frame flag byte: high bit set (0x80/0x81) marks a TRAILER frame
// (HTTP-trailer-style text, not protobuf); high bit unset (0x00/0x01) marks
// a DATA frame.
const GRPC_WEB_TRAILER_FLAG_BIT = 0x80;

const MAX_VARINT_SHIFT_BITS = 70n;

export interface GrokCreditsQuota {
  /** Percent of the shared credit pool used, 0-100 (NOT a 0-1 fraction). */
  percentUsed: number;
  resetAt: string | null;
}

export interface FrameProbeResult {
  flag: number;
  payloadStart: number;
  payloadLength: number;
}

type ProtoField =
  | { wireType: typeof WIRE_TYPE_VARINT; value: number }
  | { wireType: typeof WIRE_TYPE_FIXED64 | typeof WIRE_TYPE_FIXED32 | typeof WIRE_TYPE_LENGTH_DELIMITED; bytes: Buffer };

/**
 * Validate a gRPC-web frame header at `offset` in `buffer`. Returns the
 * flag byte plus the payload window when the header looks legitimate (flag
 * is 0x00/0x01 data or 0x80/0x81 trailer, declared length fits inside the
 * remaining buffer) or `null` when there is no valid frame header at that
 * offset — the caller then treats the whole buffer as raw, unframed
 * protobuf (when called at offset 0) or stops frame iteration.
 */
export function probeFrameHeader(buffer: Buffer, offset = 0): FrameProbeResult | null {
  if (offset < 0 || buffer.length - offset < 5) return null;
  const flag = buffer[offset];
  if (flag !== 0x00 && flag !== 0x01 && flag !== 0x80 && flag !== 0x81) return null;
  const payloadStart = offset + 5;
  const payloadLength = buffer.readUInt32BE(offset + 1);
  if (payloadLength > buffer.length - payloadStart) return null;
  return { flag, payloadStart, payloadLength };
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

/**
 * Walk consecutive gRPC-web frames from the start of `buffer`, skipping
 * TRAILER frames (flag high bit set — 0x80/0x81) and returning the first
 * DATA frame's payload (flag high bit unset — 0x00/0x01). Returns `null`
 * when no data frame is found before the walk runs out of valid frame
 * headers (a trailer-only buffer, or a malformed frame mid-buffer).
 */
function findDataFramePayload(buffer: Buffer): Buffer | null {
  let offset = 0;
  while (offset < buffer.length) {
    const frame = probeFrameHeader(buffer, offset);
    if (!frame) return null;
    const frameEnd = frame.payloadStart + frame.payloadLength;
    const isTrailer = (frame.flag & GRPC_WEB_TRAILER_FLAG_BIT) !== 0;
    if (!isTrailer) {
      return buffer.subarray(frame.payloadStart, frameEnd);
    }
    offset = frameEnd;
  }
  return null;
}

/** Decode a length-delimited field's bytes as a nested protobuf message. */
function extractNestedMessage(field: ProtoField | undefined): Map<number, ProtoField> | null {
  if (!field || field.wireType !== WIRE_TYPE_LENGTH_DELIMITED) return null;
  return decodeFields(field.bytes);
}

/** Read the nested credits-info message's usage-ratio subfield (fixed32 float, 0..1). */
function extractUsageRatio(field: ProtoField | undefined): number | null {
  if (!field) return 0; // proto3 omission means 0% used
  if (field.wireType === WIRE_TYPE_FIXED32) return field.bytes.readFloatLE(0);
  if (field.wireType === WIRE_TYPE_FIXED64) return field.bytes.readDoubleLE(0);
  return null; // unexpected wire type for the usage-ratio field = malformed
}

/** Read a nested `Timestamp{seconds, nanos}` submessage field as an ISO string. */
function extractResetAt(field: ProtoField | undefined): string | null {
  if (!field || field.wireType !== WIRE_TYPE_LENGTH_DELIMITED) return null;

  const timestampFields = decodeFields(field.bytes);
  if (!timestampFields) return null;

  const secondsField = timestampFields.get(TIMESTAMP_FIELD_SECONDS);
  const nanosField = timestampFields.get(TIMESTAMP_FIELD_NANOS);
  const seconds = secondsField?.wireType === WIRE_TYPE_VARINT ? secondsField.value : 0;
  const nanos = nanosField?.wireType === WIRE_TYPE_VARINT ? nanosField.value : 0;

  const millis = seconds * 1000 + Math.round(nanos / 1_000_000);
  const parsed = new Date(millis);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Decode a `GetGrokCreditsConfig` gRPC-web response buffer into
 * `{ percentUsed, resetAt }` (percentUsed on a 0-100 scale), or `null` when
 * the buffer is empty, truncated, trailer-only, or otherwise unparseable.
 * Never throws.
 */
export function decodeGrokCreditsFrame(buffer: Buffer): GrokCreditsQuota | null {
  if (!buffer || buffer.length === 0) return null;

  try {
    const framed = probeFrameHeader(buffer, 0) !== null;
    const payload = framed ? findDataFramePayload(buffer) : buffer;
    if (!payload) return null;

    const topLevelFields = decodeFields(payload);
    if (!topLevelFields) return null;

    const creditsInfo = extractNestedMessage(topLevelFields.get(FIELD_CREDITS_INFO));
    if (!creditsInfo) return null;

    const usageRatio = extractUsageRatio(creditsInfo.get(CREDITS_FIELD_USAGE_RATIO));
    if (usageRatio === null || !Number.isFinite(usageRatio) || usageRatio < 0) return null;

    return {
      percentUsed: Math.min(100, usageRatio * 100),
      resetAt: extractResetAt(creditsInfo.get(CREDITS_FIELD_RESET_TIMESTAMP)),
    };
  } catch {
    return null;
  }
}
