import test from "node:test";
import assert from "node:assert/strict";
import {
  acquireTurnExecution,
  clearTurnExecutionsForTesting,
  getTurnExecutionSnapshot,
} from "../../../open-sse/handlers/chatCore/turnExecutionGuard.ts";
import { wrapReadableStreamWithFinalize } from "../../../open-sse/handlers/chatCore/streamFinalize.ts";

test.afterEach(() => {
  clearTurnExecutionsForTesting();
});

/**
 * handleChatCore holds the turn slot across its whole body and hands it to the
 * response stream only on the streaming success path. These tests pin that
 * contract on the two primitives the handler composes, so a future refactor
 * that drops the finally block or the stream wrapper leaks the slot loudly.
 */

const KEY = "handoff-contract-key";

type GuardedRun = (ctx: {
  markHandedOff: () => void;
  release: () => void;
}) => ReadableStream<Uint8Array> | void;

function simulateGuardedBody(run: GuardedRun): ReadableStream<Uint8Array> | void {
  const turn = acquireTurnExecution(KEY);
  assert.equal(turn.acquired, true);
  const release = turn.release;
  let handedOff = false;
  try {
    return run({
      markHandedOff: () => {
        handedOff = true;
      },
      release,
    });
  } finally {
    if (!handedOff) release();
  }
}

test("early return inside the guarded body releases the turn slot", () => {
  simulateGuardedBody(() => {
    // cache hit / validation failure / non-streaming reply: never reaches handoff
    return undefined;
  });

  assert.equal(getTurnExecutionSnapshot(KEY), null);
});

test("a throw inside the guarded body releases the turn slot", () => {
  assert.throws(() => {
    simulateGuardedBody(() => {
      throw new Error("upstream exploded");
    });
  }, /upstream exploded/);

  assert.equal(getTurnExecutionSnapshot(KEY), null);
});

test("streaming success keeps the slot held until the client stream drains", async () => {
  const stream = simulateGuardedBody(({ markHandedOff, release }) => {
    assert.ok(getTurnExecutionSnapshot(KEY), "slot must still be held while assembling the stream");
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1]));
        controller.close();
      },
    });
    const wrapped = wrapReadableStreamWithFinalize(source, release);
    markHandedOff();
    return wrapped;
  });

  assert.ok(stream, "streaming path must return a stream");
  assert.ok(getTurnExecutionSnapshot(KEY), "slot stays held after the handler returns");

  const reader = (stream as ReadableStream<Uint8Array>).getReader();
  while (!(await reader.read()).done) {
    // drain
  }

  assert.equal(getTurnExecutionSnapshot(KEY), null, "draining the stream releases the slot");
});

test("cancelling the client stream also releases the turn slot", async () => {
  const stream = simulateGuardedBody(({ markHandedOff, release }) => {
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1]));
      },
    });
    const wrapped = wrapReadableStreamWithFinalize(source, release);
    markHandedOff();
    return wrapped;
  });

  assert.ok(stream);
  assert.ok(getTurnExecutionSnapshot(KEY), "slot held while the client is still reading");

  await (stream as ReadableStream<Uint8Array>).cancel("client disconnected");

  assert.equal(getTurnExecutionSnapshot(KEY), null, "cancel releases the slot");
});

test("an upstream stream error also releases the turn slot", async () => {
  const stream = simulateGuardedBody(({ markHandedOff, release }) => {
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1]));
      },
      pull(controller) {
        controller.error(new Error("upstream died mid-stream"));
      },
    });
    const wrapped = wrapReadableStreamWithFinalize(source, release);
    markHandedOff();
    return wrapped;
  });

  assert.ok(stream);
  const reader = (stream as ReadableStream<Uint8Array>).getReader();
  await assert.rejects(
    (async () => {
      for (;;) {
        const { done } = await reader.read();
        if (done) return;
      }
    })(),
    /upstream died mid-stream/
  );

  assert.equal(getTurnExecutionSnapshot(KEY), null, "a stream error releases the slot");
});

test("a late release from an abandoned stream cannot evict a newer turn", async () => {
  // The handler wraps the stream before awaiting its response hooks. Those
  // hooks and the stream wrapper hold two DIFFERENT release callbacks for the
  // same key once a retry re-acquires it. The stale one must not evict the
  // newer turn.
  const first = acquireTurnExecution(KEY);
  assert.equal(first.acquired, true);

  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array([1]));
      controller.close();
    },
  });
  // The stream keeps its own handle on the first turn's release.
  const orphan = wrapReadableStreamWithFinalize(source, () => {
    first.release();
  });

  // The request fails before handoff; a different code path frees the slot.
  clearTurnExecutionsForTesting();

  const second = acquireTurnExecution(KEY);
  assert.equal(second.acquired, true, "the key is free for a new turn");

  const reader = orphan.getReader();
  while (!(await reader.read()).done) {
    // drain the abandoned stream, firing its stale release
  }

  assert.ok(
    getTurnExecutionSnapshot(KEY),
    "the stale release must not evict the newer turn holding the same key"
  );
  second.release();
});
