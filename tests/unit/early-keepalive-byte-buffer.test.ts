import test from "node:test";
import assert from "node:assert/strict";

import {
  recordEarlyKeepaliveBytes,
  takeEarlyKeepaliveBytes,
} from "../../open-sse/utils/earlyKeepaliveByteBuffer.ts";

test("records are returned in the order they were written", () => {
  const id = "buf-order-1";
  recordEarlyKeepaliveBytes(id, "a");
  recordEarlyKeepaliveBytes(id, "b");
  recordEarlyKeepaliveBytes(id, "c");
  assert.deepEqual(takeEarlyKeepaliveBytes(id), ["a", "b", "c"]);
});

test("take clears the entry — a second take for the same id is empty", () => {
  const id = "buf-once-1";
  recordEarlyKeepaliveBytes(id, "a");
  takeEarlyKeepaliveBytes(id);
  assert.deepEqual(takeEarlyKeepaliveBytes(id), []);
});

test("take on an id that was never recorded returns an empty array, not undefined", () => {
  assert.deepEqual(takeEarlyKeepaliveBytes("buf-never-recorded"), []);
});

test("different correlation ids do not leak into each other", () => {
  recordEarlyKeepaliveBytes("buf-iso-a", "only-a");
  recordEarlyKeepaliveBytes("buf-iso-b", "only-b");
  assert.deepEqual(takeEarlyKeepaliveBytes("buf-iso-a"), ["only-a"]);
  assert.deepEqual(takeEarlyKeepaliveBytes("buf-iso-b"), ["only-b"]);
});

test("empty chunk and empty correlationId are both no-ops", () => {
  const id = "buf-noop-1";
  recordEarlyKeepaliveBytes(id, "");
  recordEarlyKeepaliveBytes("", "should-not-record");
  assert.deepEqual(takeEarlyKeepaliveBytes(id), []);
  assert.deepEqual(takeEarlyKeepaliveBytes(""), []);
});

test("a pathologically long-lived slow path does not grow the buffer unbounded", () => {
  const id = "buf-cap-1";
  for (let i = 0; i < 1000; i++) {
    recordEarlyKeepaliveBytes(id, `tick-${i}`);
  }
  const chunks = takeEarlyKeepaliveBytes(id);
  assert.ok(chunks.length < 1000, "buffer must cap well below an unbounded 1000 items");
  assert.ok(chunks.length > 0, "capping must not silently drop everything");
});
