/**
 * #3229 — agy `gemini-3.1-pro-high`/`-low` returned [400] but were MASKED as an empty
 * `chat.completion` envelope.
 *
 * Two parts:
 *  (a) the budget-suffix ids had no alias, so `resolveAntigravityModelId` sent them
 *      verbatim to upstream (which rejects -high/-low for gemini-3.x) → alias to plain.
 *  (b) the non-stream branch fed the 4xx response into the SSE collector, producing a
 *      synthetic `{"object":"chat.completion","content":""}` instead of a real error →
 *      build a proper sanitized error body for non-ok upstream responses.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveAntigravityModelId } from "../../open-sse/config/antigravityModelAliases.ts";
import { buildAntigravityUpstreamError } from "../../open-sse/executors/antigravityUpstreamError.ts";

test("(a) agy gemini-3.1-pro -high/-low budget suffixes alias to the plain upstream id", () => {
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-high"), "gemini-3.1-pro");
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro-low"), "gemini-3.1-pro");
  // plain id stays plain
  assert.equal(resolveAntigravityModelId("gemini-3.1-pro"), "gemini-3.1-pro");
});

test("(b) a non-ok upstream response becomes a real error body, not an empty chat.completion", () => {
  const body = buildAntigravityUpstreamError(
    400,
    "Bad Request",
    JSON.stringify({ error: { code: 400, message: "Model not found: gemini-3.1-pro-high" } })
  );
  assert.notEqual((body as { object?: string }).object, "chat.completion");
  assert.ok(body.error, "must carry an error object");
  assert.equal(typeof body.error.message, "string");
  // sanitized: no raw stack traces leaked (hard rule #12)
  assert.ok(!body.error.message.includes("at /"));

  // non-JSON upstream body still yields a valid error envelope
  const body2 = buildAntigravityUpstreamError(503, "Service Unavailable", "<html>oops</html>");
  assert.ok(body2.error);
  assert.notEqual((body2 as { object?: string }).object, "chat.completion");
});
