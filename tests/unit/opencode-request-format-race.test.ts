/**
 * The executor is one shared instance per provider alias, and its requests overlap. What is
 * known about a request (its target format) used to be kept in a field of that instance, so a
 * request finishing in the middle of another one changed what the other one saw.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { runInRequestContext } from "../../open-sse/executors/opencodeRequestContext.ts";

type Fields = { _requestFormat: string | null };
const tick = () => new Promise((resolve) => setImmediate(resolve));

test("each request in flight keeps its own format", async () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  const flow = (format: string) =>
    runInRequestContext(async () => {
      executor._requestFormat = format;
      await tick();
      await tick();
      return executor._requestFormat;
    });
  const [a, b] = await Promise.all([flow("claude"), flow("openai-responses")]);
  assert.equal(a, "claude");
  assert.equal(b, "openai-responses");
});

test("a request that ends does not clear what another one is still using", async () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const slow = runInRequestContext(async () => {
    executor._requestFormat = "openai-responses";
    await gate;
    return executor._requestFormat;
  });
  await runInRequestContext(async () => {
    executor._requestFormat = "openai";
    executor._requestFormat = null;
  });
  release();
  assert.equal(await slow, "openai-responses");
});

test("outside execute() the fields are plain fields and a request context does not leak into them", () => {
  const executor = new OpencodeExecutor("opencode-zen") as unknown as Fields;
  executor._requestFormat = "claude";
  runInRequestContext(() => {
    executor._requestFormat = "openai";
  });
  assert.equal(executor._requestFormat, "claude");
});
