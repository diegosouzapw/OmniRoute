const encoder = new TextEncoder();

// Independent AWS EventStream fixture encoder: big-endian lengths, a type-7
// event header, JSON payload and both CRC32 checksums.
function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function kiroEventFrame(eventType: string, payload: unknown): Uint8Array {
  const name = encoder.encode(":event-type");
  const value = encoder.encode(eventType);
  const headers = new Uint8Array(1 + name.length + 1 + 2 + value.length);
  headers[0] = name.length;
  headers.set(name, 1);
  headers[1 + name.length] = 7;
  new DataView(headers.buffer).setUint16(2 + name.length, value.length, false);
  headers.set(value, 4 + name.length);
  const body = encoder.encode(JSON.stringify(payload));
  const frame = new Uint8Array(12 + headers.length + body.length + 4);
  const view = new DataView(frame.buffer);
  view.setUint32(0, frame.length, false);
  view.setUint32(4, headers.length, false);
  view.setUint32(8, crc32(frame.subarray(0, 8)), false);
  frame.set(headers, 12);
  frame.set(body, 12 + headers.length);
  view.setUint32(frame.length - 4, crc32(frame.subarray(0, frame.length - 4)), false);
  return frame;
}
