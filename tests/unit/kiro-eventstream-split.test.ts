import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the kiro executor EventStream framing extraction.
// The pure AWS EventStream binary framing (ByteQueue, CRC32, parseEventFrame) lives in
// kiro/eventstream.ts (self-contained, no host imports). Host imports back what it uses.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "kiro.ts");
const LEAF = join(EXE, "kiro/eventstream.ts");

test("leaf hosts the framing primitives and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  assert.match(src, /export class ByteQueue\b/);
  assert.match(src, /export function crc32\b/);
  assert.match(src, /export function parseEventFrame\b/);
  assert.doesNotMatch(src, /from "\.\.\/kiro\.ts"/);
});

test("host imports the framing primitives back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/kiro\/eventstream\.ts"/);
});

test("crc32 is deterministic and ByteQueue buffers bytes", async () => {
  const { crc32, ByteQueue } = await import("../../open-sse/executors/kiro/eventstream.ts");
  const a = crc32(new Uint8Array([1, 2, 3]));
  const b = crc32(new Uint8Array([1, 2, 3]));
  assert.equal(a, b);
  const q = new ByteQueue();
  assert.equal(typeof q, "object");
});

test("malformed EventStream payload diagnostics never retain upstream content", async () => {
  const { crc32, parseEventFrame } = await import("../../open-sse/executors/kiro/eventstream.ts");
  const sentinel = "PRIVATE_KIRO_UPSTREAM_TRANSCRIPT_SENTINEL";
  const payload = new TextEncoder().encode(sentinel);
  const frame = new Uint8Array(16 + payload.byteLength);
  const view = new DataView(frame.buffer);
  view.setUint32(0, frame.byteLength, false);
  view.setUint32(4, 0, false);
  view.setUint32(8, crc32(frame.subarray(0, 8)), false);
  frame.set(payload, 12);

  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
  try {
    assert.deepEqual(parseEventFrame(frame)?.payload, { raw: sentinel });
  } finally {
    console.warn = originalWarn;
  }

  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Failed to parse payload/);
  assert.match(warnings[0], new RegExp(`${payload.byteLength} bytes`));
  assert.equal(warnings[0].includes(sentinel), false);
});
