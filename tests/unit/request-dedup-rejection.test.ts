import assert from "node:assert/strict";
import test from "node:test";

import { clearInflight, deduplicate } from "../../open-sse/services/requestDedup.ts";

function nextImmediate(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

test.beforeEach(() => clearInflight());
test.afterEach(() => clearInflight());

test("a rejected initiator without followers does not leak an unhandled rejection", async () => {
  const error = Object.assign(new Error("synthetic semaphore timeout"), {
    code: "SEMAPHORE_TIMEOUT",
  });
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);

  try {
    await assert.rejects(
      deduplicate("rejected-initiator", async () => {
        throw error;
      }),
      (reason) => reason === error
    );
    await nextImmediate();
    assert.deepEqual(unhandled, []);
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
});

test("a rejected shared execution rejects every follower with the same error", async () => {
  const error = new Error("synthetic shared failure");
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  let rejectExecution!: (reason: unknown) => void;
  let executions = 0;
  const execute = () => {
    executions++;
    return new Promise<string>((_resolve, reject) => {
      rejectExecution = reject;
    });
  };

  try {
    const initiator = deduplicate("shared-rejection", execute);
    await nextImmediate();
    const followerA = deduplicate("shared-rejection", execute);
    const followerB = deduplicate("shared-rejection", execute);
    rejectExecution(error);

    const results = await Promise.allSettled([initiator, followerA, followerB]);
    assert.equal(executions, 1);
    for (const result of results) {
      assert.equal(result.status, "rejected");
      assert.equal(result.reason, error);
    }
    await nextImmediate();
    assert.deepEqual(unhandled, []);
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
});

test("a successful shared execution runs once and marks only followers as deduplicated", async () => {
  let resolveExecution!: (value: string) => void;
  let executions = 0;
  const execute = () => {
    executions++;
    return new Promise<string>((resolve) => {
      resolveExecution = resolve;
    });
  };

  const initiator = deduplicate("shared-success", execute);
  await nextImmediate();
  const followerA = deduplicate("shared-success", execute);
  const followerB = deduplicate("shared-success", execute);
  resolveExecution("ok");

  const results = await Promise.all([initiator, followerA, followerB]);
  assert.equal(executions, 1);
  assert.deepEqual(results, [
    { result: "ok", wasDeduplicated: false, hash: "shared-success" },
    { result: "ok", wasDeduplicated: true, hash: "shared-success" },
    { result: "ok", wasDeduplicated: true, hash: "shared-success" },
  ]);
});
