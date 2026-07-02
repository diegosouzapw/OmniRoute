// Low-level protobuf wire-format primitives for the Cursor Agent codec, extracted
// verbatim from ../cursorAgentProtobuf.ts (god-file decomposition). Pure and
// dependency-free (Buffer only): varint/tag/length-delimited encode+decode and the
// generic field walker. Framing, the value codec, and the message encoders/decoders
// all build on this layer. Nothing here was part of the module's public API, so the
// host imports these back internally (no re-export).

// ─── Wire-type constants ───────────────────────────────────────────────────

export const WT_VARINT = 0;
export const WT_LEN = 2;

// ─── Primitive encoders ────────────────────────────────────────────────────

export function encodeVarint(value: number | bigint): Buffer {
  let v = typeof value === "bigint" ? value : BigInt(value);
  const bytes: number[] = [];
  while (v > 0x7fn) {
    bytes.push(Number(v & 0x7fn) | 0x80);
    v >>= 7n;
  }
  bytes.push(Number(v));
  return Buffer.from(bytes);
}

export function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

export function encodeBytes(fieldNumber: number, value: Buffer | Uint8Array): Buffer {
  const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return Buffer.concat([encodeTag(fieldNumber, WT_LEN), encodeVarint(buf.length), buf]);
}

export function encodeString(fieldNumber: number, value: string): Buffer {
  return encodeBytes(fieldNumber, Buffer.from(value, "utf8"));
}

export function encodeMessage(fieldNumber: number, parts: Buffer[]): Buffer {
  const inner = Buffer.concat(parts);
  return Buffer.concat([encodeTag(fieldNumber, WT_LEN), encodeVarint(inner.length), inner]);
}

export function encodeUInt32Field(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, WT_VARINT), encodeVarint(value)]);
}

export function encodeBoolField(fieldNumber: number, value: boolean): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, WT_VARINT), encodeVarint(value ? 1 : 0)]);
}

export function encodeDoubleField(fieldNumber: number, value: number): Buffer {
  // wire type 1 = 64-bit fixed (double)
  const buf = Buffer.alloc(8);
  buf.writeDoubleLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 1), buf]);
}

// ─── Primitive decoders ────────────────────────────────────────────────────

export function decodeVarint(buf: Buffer, offset: number): [bigint, number] {
  let result = 0n;
  let shift = 0n;
  let pos = offset;
  while (pos < buf.length) {
    const byte = buf[pos++];
    result |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) return [result, pos];
    shift += 7n;
  }
  throw new Error("varint truncated");
}

export type Field =
  | { fieldNumber: number; wireType: 0; varint: bigint }
  | { fieldNumber: number; wireType: 2; bytes: Buffer };

/**
 * Validate a length-delimited field's declared length against the bytes that
 * actually remain in the buffer. Cursor's frames are well-formed, but a
 * corrupted or hostile upstream could declare a length that overruns the
 * buffer; without this guard `Buffer.subarray` silently clamps to EOF and a
 * truncated tool argument (or any nested message) is decoded as empty/partial
 * data instead of being recognized as malformed. Throwing lets the caller —
 * `processFrame`, wrapped in driveH2's per-frame try/catch — skip the bad
 * frame rather than act on corrupted fields. Also rejects absurd lengths that
 * would not fit a JS safe integer.
 */
export function checkedLen(len: bigint, pos: number, buf: Buffer): number {
  if (len < 0n || len > BigInt(buf.length - pos)) {
    throw new Error(
      `length-delimited field overruns buffer (len=${len}, remaining=${buf.length - pos})`
    );
  }
  return Number(len);
}

export function decodeFields(buf: Buffer): Field[] {
  const fields: Field[] = [];
  let pos = 0;
  while (pos < buf.length) {
    const [tag, np] = decodeVarint(buf, pos);
    pos = np;
    const fieldNumber = Number(tag >> 3n);
    const wireType = Number(tag & 0x7n);
    if (wireType === WT_VARINT) {
      const [v, np2] = decodeVarint(buf, pos);
      pos = np2;
      fields.push({ fieldNumber, wireType: 0, varint: v });
    } else if (wireType === WT_LEN) {
      const [len, np2] = decodeVarint(buf, pos);
      pos = np2;
      const lenN = checkedLen(len, pos, buf);
      fields.push({ fieldNumber, wireType: 2, bytes: buf.subarray(pos, pos + lenN) });
      pos += lenN;
    } else if (wireType === 5) {
      pos += 4;
    } else if (wireType === 1) {
      pos += 8;
    } else {
      throw new Error(`unsupported wireType ${wireType}`);
    }
  }
  return fields;
}

export function findField(fields: Field[], fieldNumber: number): Field | undefined {
  return fields.find((f) => f.fieldNumber === fieldNumber);
}

export function decodeStringField(buf: Buffer, fieldNumber: number): string {
  const fields = decodeFields(buf);
  const f = findField(fields, fieldNumber);
  if (f && f.wireType === 2) return f.bytes.toString("utf8");
  return "";
}

export function decodeVarintField(buf: Buffer, fieldNumber: number): number {
  const fields = decodeFields(buf);
  const f = findField(fields, fieldNumber);
  if (f && f.wireType === 0) return Number(f.varint);
  return 0;
}
