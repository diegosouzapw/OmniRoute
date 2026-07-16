import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeBootError,
  ensureDbReadyForBoot,
} from "../../src/instrumentation-node";

// Regression guard for #6560: during an update/restart, sql.js's WASM adapter
// can throw the bare string `"Database closed"` (not an Error instance) when a
// stale, already-closed handle is reused. Next.js's own
// `registerInstrumentation()` wrapper unconditionally does
// `err.message = ...` on whatever `register()` rejects with — if that value is
// a primitive string, the assignment itself throws
// `TypeError: Cannot create property 'message' on string 'Database closed'`,
// masking the real error and crashing the whole server on every boot.

test("normalizeBootError wraps a raw thrown string into a real Error", () => {
  const normalized = normalizeBootError("Database closed");
  assert.ok(normalized instanceof Error, "must be a real Error instance");
  assert.equal(normalized.message, "Database closed");

  // The exact crash from #6560: assigning `.message` on the original raw
  // string throws; on the normalized Error it must be a no-op assignment.
  assert.throws(() => {
    // @ts-expect-error - deliberately mutating a primitive to reproduce the bug
    ("Database closed").message = "mutated";
  }, TypeError);
  assert.doesNotThrow(() => {
    normalized.message = `An error occurred while loading instrumentation hook: ${normalized.message}`;
  });
  assert.equal(
    normalized.message,
    "An error occurred while loading instrumentation hook: Database closed"
  );
});

test("normalizeBootError passes real Error instances through unchanged (identity)", () => {
  const original = new Error("boom");
  const normalized = normalizeBootError(original);
  assert.equal(normalized, original);
});

test("normalizeBootError wraps non-string, non-Error throws (null/undefined/object)", () => {
  assert.equal(normalizeBootError(null).message, "null");
  assert.equal(normalizeBootError(undefined).message, "undefined");
  assert.equal(normalizeBootError({ code: "X" }).message, "[object Object]");
});

test("ensureDbReadyForBoot retries once and succeeds when the first attempt throws the raw 'Database closed' string (RED before fix, GREEN after)", async () => {
  let calls = 0;
  const fakeEnsureDbInitialized = async (): Promise<void> => {
    calls += 1;
    if (calls === 1) {
      throw "Database closed";
    }
    // second attempt (post-retry) succeeds, as it would once the caller gets a
    // fresh, non-stale adapter.
  };

  await assert.doesNotReject(ensureDbReadyForBoot(fakeEnsureDbInitialized));
  assert.equal(calls, 2, "must retry exactly once after a transient 'Database closed' failure");
});

test("ensureDbReadyForBoot re-throws (normalized) when the retry also fails", async () => {
  let calls = 0;
  const fakeEnsureDbInitialized = async (): Promise<void> => {
    calls += 1;
    throw "Database closed";
  };

  await assert.rejects(
    ensureDbReadyForBoot(fakeEnsureDbInitialized),
    (err: unknown) => {
      assert.ok(err instanceof Error, "rejection must be a real Error, never a raw string");
      assert.equal((err as Error).message, "Database closed");
      return true;
    }
  );
  assert.equal(calls, 2);
});

test("ensureDbReadyForBoot does not retry and re-throws (normalized) unrelated failures", async () => {
  let calls = 0;
  const fakeEnsureDbInitialized = async (): Promise<void> => {
    calls += 1;
    throw new Error("disk full");
  };

  await assert.rejects(
    ensureDbReadyForBoot(fakeEnsureDbInitialized),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.equal((err as Error).message, "disk full");
      return true;
    }
  );
  assert.equal(calls, 1, "unrelated errors must not trigger the closed-DB retry");
});

test("ensureDbReadyForBoot resolves without retrying when there is no failure", async () => {
  let calls = 0;
  const fakeEnsureDbInitialized = async (): Promise<void> => {
    calls += 1;
  };

  await assert.doesNotReject(ensureDbReadyForBoot(fakeEnsureDbInitialized));
  assert.equal(calls, 1);
});
