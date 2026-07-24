/**
 * Guards the executor `execute()` result contract.
 *
 * `normalizeExecutorResult()` has always accepted `Response | { response, ... }` — the
 * bare arm is what the web/scraping executors return from their error and passthrough
 * paths (see `chatcore-upstream-timeouts.test.ts`, which covers the normalizer itself).
 * `BaseExecutor.execute` nonetheless *inferred* only the object shape from its single
 * return statement, so every override returning a bare `Response` was reported as
 * incompatible (TS2416) and DuckDuckGo's 14 valid `return`s as TS2739.
 *
 * Declaring `ExecutorExecuteResult` on the base fixed that, and required the two
 * subclasses that consume `super.execute()` to narrow before reading `.response`.
 * These tests pin the runtime behavior of that narrowing so a future "simplification"
 * cannot quietly drop the bare-Response arm.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";

type ExecuteFn = typeof BaseExecutor.prototype.execute;

/** Swap BaseExecutor.execute for the duration of one call, then restore it. */
async function withBaseExecuteStub<T>(stub: ExecuteFn, run: () => Promise<T>): Promise<T> {
  const original = BaseExecutor.prototype.execute;
  BaseExecutor.prototype.execute = stub;
  try {
    return await run();
  } finally {
    BaseExecutor.prototype.execute = original;
  }
}

const INPUT = {
  model: "gpt-4o",
  body: { messages: [{ role: "user", content: "hi" }] },
  stream: false,
  credentials: {},
  signal: new AbortController().signal,
};

test("GithubExecutor.execute passes a bare Response through untouched", async () => {
  const bare = new Response("upstream body", { status: 503 });

  const result = await withBaseExecuteStub(
    (async () => bare) as ExecuteFn,
    () => new GithubExecutor().execute(INPUT)
  );

  assert.equal(
    result,
    bare,
    "the bare-Response arm has no capture object to materialize and must be returned as-is"
  );
});

test("GithubExecutor.execute still materializes the capture-object arm", async () => {
  const captured = {
    response: new Response("hello", { status: 200, statusText: "OK" }),
    url: "https://api.githubcopilot.com/chat/completions",
    headers: { "x-req": "1" },
    transformedBody: { a: 1 },
  };

  const result = await withBaseExecuteStub(
    (async () => captured) as ExecuteFn,
    () => new GithubExecutor().execute(INPUT)
  );

  assert.ok(!(result instanceof Response), "the object arm must stay an object");
  const obj = result as typeof captured;

  // The body is re-wrapped into a native Response so downstream reads work after
  // wreq-js clone/text semantics have consumed the original.
  assert.equal(obj.response.status, 200);
  assert.equal(await obj.response.text(), "hello");
  assert.equal(obj.url, captured.url, "the capture fields must survive materialization");
  assert.deepEqual(obj.transformedBody, { a: 1 });
});

test("GithubExecutor.execute tolerates a nullish result without throwing", async () => {
  const result = await withBaseExecuteStub(
    (async () => undefined) as unknown as ExecuteFn,
    () => new GithubExecutor().execute(INPUT)
  );

  assert.equal(result, undefined, "a nullish base result must short-circuit, not throw");
});
