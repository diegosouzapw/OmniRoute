import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RingBuffer } from "../../../src/lib/services/ringBuffer.ts";
import type { LogLine } from "../../../src/lib/services/types.ts";

function makeLine(line: string, stream: "stdout" | "stderr" = "stdout"): LogLine {
  return { ts: Date.now(), stream, line };
}

test("push respects byte limit (evicts oldest)", () => {
  // 100-byte limit: each entry is ~40 bytes overhead + line bytes
  const buf = new RingBuffer(100);

  buf.push(makeLine("first")); // ~45 bytes
  buf.push(makeLine("second")); // ~46 bytes — total ~91
  buf.push(makeLine("third")); // would exceed → evict "first"

  const snap = buf.snapshot();
  assert.ok(!snap.some((e) => e.line === "first"), "first should be evicted");
  assert.ok(
    snap.some((e) => e.line === "second"),
    "second should be retained"
  );
  assert.ok(
    snap.some((e) => e.line === "third"),
    "third should be retained"
  );
});

test("snapshot returns isolated copy", () => {
  const buf = new RingBuffer();
  buf.push(makeLine("a"));
  const snap1 = buf.snapshot();
  buf.push(makeLine("b"));
  const snap2 = buf.snapshot();

  assert.equal(snap1.length, 1, "first snapshot unchanged");
  assert.equal(snap2.length, 2, "second snapshot includes new entry");
});

test("subscribe receives new lines", () => {
  const buf = new RingBuffer();
  const received: LogLine[] = [];
  const unsub = buf.subscribe((l) => received.push(l));

  buf.push(makeLine("hello"));
  buf.push(makeLine("world"));

  assert.equal(received.length, 2);
  assert.equal(received[0].line, "hello");
  assert.equal(received[1].line, "world");

  unsub();
  buf.push(makeLine("after-unsub"));
  assert.equal(received.length, 2, "no more events after unsubscribe");
});

test("flush writes to file when path set", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ring-"));
  const filePath = path.join(tmpDir, "ring.log");

  try {
    const buf = new RingBuffer();
    buf.setFlushPath(filePath);
    buf.push(makeLine("line-one"));
    buf.push({ ts: Date.now(), stream: "stderr", line: "err-line" });

    // Force flush by calling private method indirectly — dispose triggers cleanup
    // We access the private method via prototype cast for testing purposes.
    (buf as unknown as { flushToDisk: () => void }).flushToDisk();

    assert.ok(fs.existsSync(filePath), "flush file should exist");
    const content = fs.readFileSync(filePath, "utf8");
    assert.ok(content.includes("line-one"), "flush file should contain log entry");
    assert.ok(content.includes("[stderr]"), "flush file should contain stderr entry");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("dispose clears subscribers and stops flush timer", () => {
  const buf = new RingBuffer();
  const received: LogLine[] = [];
  buf.subscribe((l) => received.push(l));
  buf.dispose();

  buf.push(makeLine("after-dispose"));
  assert.equal(received.length, 0, "no events after dispose");
});
