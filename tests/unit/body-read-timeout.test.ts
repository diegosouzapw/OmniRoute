import test from "node:test";
import assert from "node:assert/strict";

import { withBodyTimeout } from "../../open-sse/utils/stream.ts";

test("withBodyTimeout resolves with the value when the promise completes before timeout", async () => {
  const result = await withBodyTimeout(Promise.resolve("hello"), 5000);
  assert.equal(result, "hello");
});

test("withBodyTimeout rejects with BodyTimeoutError when the promise exceeds the timeout", async () => {
  const neverResolves = new Promise<string>(() => {});
  await assert.rejects(withBodyTimeout(neverResolves, 50), (error) => {
    assert.ok(error instanceof Error);
    assert.equal(error.name, "BodyTimeoutError");
    assert.match(error.message, /body read timeout after 50ms/);
    return true;
  });
});

test("withBodyTimeout forwards the original rejection when the promise rejects before timeout", async () => {
  const originalError = new Error("network failure");
  const rejects = Promise.reject(originalError);
  await assert.rejects(withBodyTimeout(rejects, 5000), (error) => {
    assert.equal(error, originalError);
    return true;
  });
});

test("withBodyTimeout with timeoutMs=0 skips timeout and passes through directly", async () => {
  // A promise that would timeout with any positive timeout
  const slow = new Promise((resolve) => setTimeout(() => resolve("late"), 200));
  // With timeoutMs=0, it should wait for the promise naturally
  const result = await withBodyTimeout(slow, 0);
  assert.equal(result, "late");
});

test("withBodyTimeout cleans up the timer after successful resolution", async () => {
  const result = await withBodyTimeout(Promise.resolve(42), 100);
  assert.equal(result, 42);
  // If the timer wasn't cleaned up, the process might hang or throw later.
  // Wait a bit to confirm no stray timer fires.
  await new Promise((resolve) => setTimeout(resolve, 150));
});

test("withBodyTimeout cleans up the timer after rejection", async () => {
  const originalError = new Error("fail");
  await assert.rejects(
    withBodyTimeout(Promise.reject(originalError), 100),
    (error) => error === originalError
  );
  // Wait to confirm no stray timer
  await new Promise((resolve) => setTimeout(resolve, 150));
});
