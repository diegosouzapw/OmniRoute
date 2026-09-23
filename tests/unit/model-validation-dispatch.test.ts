import "./_helpers/modelValidationEnvironment.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { createValidationDispatchFence } from "../../src/lib/modelValidation/dispatchFence.ts";

const credentials = { connectionId: "chosen", apiKey: "fake-dispatch-key" };
function nativeExecutor() {
  return new BaseExecutor("openai", { baseUrl: "https://validation.invalid/v1/chat/completions" });
}

test("strict dispatch blocks a changed connection before invoking its executor", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ choices: [] });
  };
  const executor = nativeExecutor();
  const fence = createValidationDispatchFence({
    provider: "openai",
    modelId: "chosen-model",
    connectionId: "chosen",
    signal: new AbortController().signal,
    assertFresh: () => {},
    expectedExecutor: executor,
    expectedCredentials: credentials,
  });
  const guarded = fence.wrap(executor);
  await assert.rejects(
    () =>
      guarded.execute({
        model: "chosen-model",
        body: {},
        stream: false,
        credentials: { connectionId: "other" },
      }),
    /dispatch/
  );
  assert.equal(calls, 0);
  assert.throws(() => fence.assertDispatched(), /dispatch/);
});

test("strict dispatch rejects proxy wrappers, alternate models, repeated attempts and cache-only results", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ choices: [] });
  };
  const executor = nativeExecutor();
  const options = {
    provider: "openai",
    modelId: "chosen-model",
    connectionId: "chosen",
    signal: new AbortController().signal,
    assertFresh: () => {},
    expectedExecutor: executor,
    expectedCredentials: credentials,
  };
  assert.throws(
    () => createValidationDispatchFence(options).wrap(Object.create(executor)),
    /dispatch/
  );
  assert.throws(() => createValidationDispatchFence(options).assertDispatched(), /dispatch/);
  const alternative = createValidationDispatchFence(options).wrap(executor);
  await assert.rejects(
    () =>
      alternative.execute({
        model: "fallback",
        body: {},
        stream: false,
        credentials: { connectionId: "chosen" },
      }),
    /dispatch/
  );
  const fence = createValidationDispatchFence(options);
  const guarded = fence.wrap(executor);
  const input = {
    model: "chosen-model",
    body: { model: "chosen-model", messages: [{ role: "user", content: "test" }] },
    stream: false,
    credentials,
  };
  await guarded.execute(input);
  fence.assertDispatched();
  await assert.rejects(() => guarded.execute(input), /dispatch/);
  assert.equal(calls, 1);
  assert.throws(() => fence.assertDispatched(), /dispatch/);
});

test("custom execute overrides and final auth/model rewriting are fail-closed", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ choices: [] });
  };
  const executor = nativeExecutor();
  const options = {
    provider: "openai",
    modelId: "chosen-model",
    connectionId: "chosen",
    signal: new AbortController().signal,
    assertFresh: () => {},
    expectedExecutor: executor,
    expectedCredentials: credentials,
  };
  class Specialized extends BaseExecutor {}
  const specialized = new Specialized("openai", {});
  assert.throws(
    () =>
      createValidationDispatchFence({ ...options, expectedExecutor: specialized }).wrap(
        specialized
      ),
    { code: "VALIDATION_EXECUTOR_UNSUPPORTED" }
  );
  for (const changed of ["model", "authorization"]) {
    const fence = createValidationDispatchFence(options);
    await assert.rejects(
      () =>
        fence.wrap(executor).execute({
          model: "chosen-model",
          body: { model: changed === "model" ? "other" : "chosen-model", messages: [] },
          stream: false,
          credentials,
          ...(changed === "authorization"
            ? { upstreamExtraHeaders: { Authorization: "Bearer fake-other" } }
            : {}),
        }),
      /dispatch/
    );
    assert.throws(() => fence.assertDispatched(), /dispatch/);
  }
  assert.equal(calls, 0);
});

test("a specialized executor cannot impersonate BaseExecutor through its constructor property", () => {
  class Specialized extends BaseExecutor {}
  const executor = new Specialized("openai", {});
  Object.defineProperty(executor, "constructor", { value: BaseExecutor });
  const fence = createValidationDispatchFence({
    provider: "openai",
    modelId: "chosen-model",
    connectionId: "chosen",
    signal: new AbortController().signal,
    assertFresh: () => {},
    expectedExecutor: executor,
    expectedCredentials: credentials,
  });
  assert.throws(() => fence.wrap(executor), { code: "VALIDATION_EXECUTOR_UNSUPPORTED" });
});
