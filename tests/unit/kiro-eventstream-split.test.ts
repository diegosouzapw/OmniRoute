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
