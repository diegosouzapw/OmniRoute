import test from "node:test";
import assert from "node:assert/strict";

import { PollinationsExecutor } from "../../open-sse/executors/pollinations.ts";

test("#2987 PollinationsExecutor.buildUrl uses the gen.pollinations.ai gateway (not the legacy text host)", () => {
  const executor = new PollinationsExecutor();
  // Legacy text.pollinations.ai now 404s ("legacy API"); gen.pollinations.ai/v1
  // is the current OpenAI-compatible endpoint and must be the primary.
  assert.equal(
    executor.buildUrl("openai", true),
    "https://gen.pollinations.ai/v1/chat/completions"
  );
  // No legacy text.pollinations.ai endpoint should remain in the rotation.
  assert.equal(
    executor.buildUrl("openai", true, 1),
    "https://gen.pollinations.ai/v1/chat/completions"
  );
});

test("PollinationsExecutor.buildHeaders supports anonymous access and optional SSE accept", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({}, true), {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  });
});

test("PollinationsExecutor.buildHeaders sends API auth for the key-backed tier when configured", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({ apiKey: "poll-key" }, true), {
    "Content-Type": "application/json",
    Authorization: "Bearer poll-key",
    Accept: "text/event-stream",
  });
});

test("PollinationsExecutor.transformRequest is a passthrough for alias models", () => {
  const executor = new PollinationsExecutor();
  const body = { model: "claude", messages: [{ role: "user", content: "hello" }] };
  assert.equal(executor.transformRequest("claude", body, true, {}), body);
});

test("PollinationsExecutor enhances 401 errors for premium models with actionable guidance", async () => {
  const executor = new PollinationsExecutor();

  // Mock super.execute (BaseExecutor.prototype.execute) to throw a 401
  const origBaseExec = Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute;
  Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute = async function () {
    const err = new Error(
      "Authentication required. Please provide an API key via Authorization header (Bearer token) or ?key= query parameter."
    );
    (err as any).status = 401;
    throw err;
  };

  try {
    await executor.execute({
      model: "claude",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.fail("Should have thrown");
  } catch (err: any) {
    assert.equal(err.status, 401);
    assert.match(err.message, /Pollinations model "claude" requires an API key/);
    assert.match(err.message, /enter\.pollinations\.ai/);
    assert.match(err.message, /Free keyless models/);
  } finally {
    Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute = origBaseExec;
  }
});

test("PollinationsExecutor passes through 401 errors for non-premium models", async () => {
  const executor = new PollinationsExecutor();

  const origBaseExec = Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute;
  Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute = async function () {
    const err = new Error("Authentication required");
    (err as any).status = 401;
    throw err;
  };

  try {
    await executor.execute({
      model: "openai",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.fail("Should have thrown");
  } catch (err: any) {
    assert.equal(err.status, 401);
    // Free models should NOT get the enhanced message
    assert.doesNotMatch(err.message, /requires an API key/);
  } finally {
    Object.getPrototypeOf(Object.getPrototypeOf(executor)).execute = origBaseExec;
  }
});

test("#3981 PollinationsExecutor.transformRequest does not force jsonMode on a plain (non-JSON) request", () => {
  const executor = new PollinationsExecutor();
  // A normal chat request has no response_format. Forcing jsonMode here makes
  // pollinations reject the request with HTTP 400 (the bug reported in #3981).
  const body: any = { messages: [{ role: "user", content: "hello" }] };
  executor.transformRequest("openai", body, false, {});
  assert.equal(body.jsonMode, undefined);
});

test("#3981 PollinationsExecutor.transformRequest enables jsonMode when response_format requests json_object", () => {
  const executor = new PollinationsExecutor();
  const body: any = {
    messages: [{ role: "user", content: "hi" }],
    response_format: { type: "json_object" },
  };
  executor.transformRequest("openai", body, false, {});
  assert.equal(body.jsonMode, true);
});

test("#3981 PollinationsExecutor.transformRequest enables jsonMode when response_format requests json_schema", () => {
  const executor = new PollinationsExecutor();
  const body: any = {
    messages: [{ role: "user", content: "hi" }],
    response_format: { type: "json_schema", json_schema: { name: "x", schema: {} } },
  };
  executor.transformRequest("openai", body, false, {});
  assert.equal(body.jsonMode, true);
});
