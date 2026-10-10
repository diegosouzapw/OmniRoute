import test from "node:test";
import assert from "node:assert/strict";
import {
  isSafeQuotaRecoveryBody,
  isTerminalQuotaResponse,
  quotaRecoveryDelayMs,
} from "../../src/lib/quota/quotaSessionRecovery.ts";

test("recovery accepts only explicit non-streaming turns without tools or opaque state", () => {
  assert.equal(
    isSafeQuotaRecoveryBody({
      stream: false,
      messages: [{ role: "user", content: "answer this" }],
    }),
    true
  );
  assert.equal(isSafeQuotaRecoveryBody({ stream: true, messages: [{ role: "user" }] }), false);
  assert.equal(
    isSafeQuotaRecoveryBody({
      stream: false,
      input: [{ role: "user", content: "answer this" }],
      previous_response_id: "resp_1",
    }),
    false
  );
  assert.equal(
    isSafeQuotaRecoveryBody({
      stream: false,
      messages: [{ role: "user", content: "call a tool" }],
      tools: [{ type: "function", function: { name: "write_file" } }],
    }),
    false
  );
  assert.equal(
    isSafeQuotaRecoveryBody({
      stream: false,
      input: [{ type: "function_call_output", call_id: "call_1", output: "done" }],
    }),
    false
  );
});

test("only an explicit quota error can create a recovery ticket", async () => {
  const response = (status: number, message: string) =>
    new Response(JSON.stringify({ error: { message } }), { status });
  assert.equal(await isTerminalQuotaResponse(response(429, "quota exhausted")), true);
  assert.equal(await isTerminalQuotaResponse(response(402, "credits exhausted")), true);
  assert.equal(await isTerminalQuotaResponse(response(429, "temporary burst rate limit")), false);
  assert.equal(await isTerminalQuotaResponse(response(503, "upstream unavailable")), false);
  assert.equal(await isTerminalQuotaResponse(response(200, "quota exhausted")), false);
});

test("retry-after is honored with bounded scheduling", () => {
  const now = Date.parse("2026-09-28T09:00:00Z");
  assert.equal(quotaRecoveryDelayMs(new Response(null, { status: 429 }), now), 60_000);
  assert.equal(
    quotaRecoveryDelayMs(new Response(null, { status: 429, headers: { "Retry-After": "120" } }), now),
    120_000
  );
  assert.equal(
    quotaRecoveryDelayMs(
      new Response(null, {
        status: 429,
        headers: { "Retry-After": "2026-09-28T09:05:00Z" },
      }),
      now
    ),
    300_000
  );
});
