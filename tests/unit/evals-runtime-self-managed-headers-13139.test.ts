/**
 * Regression test for #13139 — the eval runner must mark its own requests as
 * self-managed.
 *
 * The runner sends every graded case down the ordinary chat path, so a case
 * picks up whatever that path injects: a selected output style is prepended as
 * a system message (gated on `x-omniroute-compression !== "off"` —
 * open-sse/handlers/chatCore.ts) and, when the run carries an API key,
 * retrieved memory plus the built-in `memory_*` tools are added (gated on
 * `x-omniroute-no-memory`). Both are request-header opt-outs and the runner set
 * neither, so an evaluation measured the operator's injected context instead of
 * the model.
 *
 * The case executor calls the chat route directly, so this pins the contract at
 * the request it builds.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEvalCaseRequest } from "../../src/lib/evals/runtime.ts";

async function readBody(request: Request): Promise<Record<string, unknown>> {
  return JSON.parse(await new Response(request.body).text()) as Record<string, unknown>;
}

test("eval case requests opt out of output-style and memory injection (#13139)", () => {
  const request = buildEvalCaseRequest({ input: {} }, { type: "suite-default" }, null);

  assert.equal(request.headers.get("x-omniroute-compression"), "off");
  assert.equal(request.headers.get("x-omniroute-no-memory"), "true");
});

test("the opt-out survives a run that carries an API key", () => {
  // An API key is what gives the request a memory owner, so this is the
  // configuration where the injection was worst: passing a key made a run score
  // *worse*. Authorization must be added without dropping the opt-outs.
  const request = buildEvalCaseRequest({ input: {} }, { type: "model", id: "gpt-4o" }, "sk-test");

  assert.equal(request.headers.get("x-omniroute-compression"), "off");
  assert.equal(request.headers.get("x-omniroute-no-memory"), "true");
  assert.equal(request.headers.get("Authorization"), "Bearer sk-test");
  assert.equal(request.headers.get("Content-Type"), "application/json");
});

test("no Authorization header is sent when the run has no API key", () => {
  const request = buildEvalCaseRequest({ input: {} }, { type: "suite-default" }, null);

  assert.equal(request.headers.get("Authorization"), null);
  assert.equal(request.headers.get("Content-Type"), "application/json");
});

test("the request stays a POST to the chat-completions route", () => {
  const request = buildEvalCaseRequest({ input: {} }, { type: "suite-default" }, null);

  assert.equal(request.method, "POST");
  assert.equal(request.url, "http://localhost/api/v1/chat/completions");
});

test("an explicit case max_tokens is honored and the 512 default still applies", async () => {
  const explicit = buildEvalCaseRequest(
    { input: { messages: [], max_tokens: 64 } },
    { type: "suite-default" },
    null
  );
  const explicitBody = await readBody(explicit);
  assert.equal(explicitBody.max_tokens, 64);
  assert.equal(explicitBody.stream, false);
  assert.deepEqual(explicitBody.messages, []);

  const implicit = buildEvalCaseRequest(
    { input: { messages: [] } },
    { type: "suite-default" },
    null
  );
  assert.equal((await readBody(implicit)).max_tokens, 512);
});

test("case input fields, the resolved model and the non-streaming flag all reach the body", async () => {
  const request = buildEvalCaseRequest(
    { input: { messages: [{ role: "user", content: "hi" }], temperature: 0.2 } },
    { type: "model", id: "claude-sonnet-4-20250514" },
    null
  );
  const body = await readBody(request);

  assert.equal(body.model, "claude-sonnet-4-20250514");
  assert.equal(body.stream, false);
  assert.deepEqual(body.messages, [{ role: "user", content: "hi" }]);
  assert.equal(body.temperature, 0.2);
});

test("a non-object case input does not leak into the request body", async () => {
  const request = buildEvalCaseRequest({ input: "not-an-object" }, { type: "suite-default" }, null);
  const body = await readBody(request);

  assert.equal(body.stream, false);
  assert.equal(body.max_tokens, 512);
  assert.equal(body.model, "gpt-4o");
});
