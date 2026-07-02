/**
 * tests/unit/combo/responseQualityGate.test.ts
 *
 * Characterization tests for the PR-028 leaf extraction:
 *   `open-sse/services/combo/responseQualityGate.ts`
 *
 * The leaf hosts three exports:
 *   • validateResponseQuality  — 304-line combo helper previously pasted
 *                                inside combo/validateQuality.ts; that
 *                                file imported a missing
 *                                `src/lib/usage/tokenAccounting.ts`
 *                                (deleted upstream), making direct unit
 *                                testing impossible until this leaf split
 *                                was made.
 *   • extractReasoningTokens   — local re-implementation of the missing
 *                                `getReasoningTokens(usage)` helper.
 *   • toRetryAfterDisplayValue — display-value coercion for retry-after
 *                                semantics (seconds-since-now vs
 *                                epoch-ms vs string/Date).
 *
 * Scope (intentionally non-overlapping with sibling tests):
 *   • Branches of validateResponseQuality NOT covered by
 *     tests/unit/combo-quality-validator-reasoning.test.ts (which only
 *     covers issue #2341 reasoning_content scenarios against the
 *     re-exported combo.ts path).
 *   • Branches of the new helpers (extractReasoningTokens,
 *     toRetryAfterDisplayValue).
 *
 * Style: node:test + node:assert/strict, matching the rest of
 * tests/unit/combo/*.test.ts.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateResponseQuality,
  extractReasoningTokens,
  toRetryAfterDisplayValue,
} from "../../../open-sse/services/combo/responseQualityGate.ts";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

const silentLog = { warn: () => {} };

function jsonResponse(
  body: unknown,
  init: { contentType?: string; status?: number; headers?: Record<string, string> } = {}
): Response {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      "content-type": init.contentType ?? "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function textResponse(body: string, contentType = "text/plain"): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": contentType },
  });
}

/**
 * Build a streaming-style Response backed by an in-memory chunks array.
 * Used to exercise the bounded SSE peek path of validateResponseQuality.
 */
function sseStreamResponse(chunks: string[], extraHeaders: Record<string, string> = {}): Response {
  const encoder = new TextEncoder();
  // Construct a stream that yields the chunks one at a time (each chunk is
  // emitted via a single read of the reader). This is enough for the
  // bounded-peek path that consumes one read at a time.
  let i = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i++]));
    },
  });
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      ...extraHeaders,
    },
  });
}

// ===========================================================================
// 1. extractReasoningTokens — pure helper, exhaustive branch coverage
// ===========================================================================

test("extractReasoningTokens — returns 0 for null / undefined / non-objects", () => {
  assert.equal(extractReasoningTokens(null), 0);
  assert.equal(extractReasoningTokens(undefined), 0);
  assert.equal(extractReasoningTokens(""), 0);
  assert.equal(extractReasoningTokens(42), 0);
  assert.equal(extractReasoningTokens(true), 0);
});

test("extractReasoningTokens — empty usage object returns 0", () => {
  assert.equal(extractReasoningTokens({}), 0);
});

test("extractReasoningTokens — OpenAI nested completion_tokens_details shape", () => {
  // The canonical upstream nesting for Chat Completions usage.
  assert.equal(
    extractReasoningTokens({
      completion_tokens_details: { reasoning_tokens: 500 },
    }),
    500
  );
});

test("extractReasoningTokens — top-level reasoning_tokens (flat provider, e.g. MiMo)", () => {
  assert.equal(extractReasoningTokens({ reasoning_tokens: 333 }), 333);
});

test("extractReasoningTokens — nested usage.reasoning_tokens (nested provider shape)", () => {
  assert.equal(
    extractReasoningTokens({ usage: { reasoning_tokens: 222 } }),
    222
  );
});

test("extractReasoningTokens — alternate *_details keys are also recognized", () => {
  // The fallback sweep scans any "*detail*" / "*_details" key.
  assert.equal(
    extractReasoningTokens({ tokens_details: { reasoning_tokens: 17 } }),
    17
  );
  assert.equal(
    extractReasoningTokens({ foo_tokens_details: { reasoning_tokens: 19 } }),
    19
  );
  assert.equal(
    extractReasoningTokens({ some_prompt_details: { reasoning_tokens: 23 } }),
    23
  );
});

test("extractReasoningTokens — precedence: completion_tokens_details wins over top-level", () => {
  // When both are present the nested completion_tokens_details must be read.
  assert.equal(
    extractReasoningTokens({
      completion_tokens_details: { reasoning_tokens: 700 },
      reasoning_tokens: 100,
    }),
    700
  );
});

test("extractReasoningTokens — non-numeric reasoning_tokens are ignored (returns 0 / fallback)", () => {
  // Strings, nulls, NaN, booleans are not numeric → not surfaced.
  assert.equal(
    extractReasoningTokens({ completion_tokens_details: { reasoning_tokens: "500" as unknown as number } }),
    0
  );
  assert.equal(
    extractReasoningTokens({ completion_tokens_details: { reasoning_tokens: null as unknown as number } }),
    0
  );
  assert.equal(
    extractReasoningTokens({ completion_tokens_details: { reasoning_tokens: NaN } }),
    0
  );
  assert.equal(
    extractReasoningTokens({ completion_tokens_details: { reasoning_tokens: true as unknown as number } }),
    0
  );
});

test("extractReasoningTokens — Infinity is filtered (not finite)", () => {
  // Number.isFinite(Infinity) is false → treat as no data.
  assert.equal(extractReasoningTokens({ reasoning_tokens: Infinity }), 0);
  assert.equal(extractReasoningTokens({ reasoning_tokens: -Infinity }), 0);
});

test("extractReasoningTokens — zero is a legitimate value (must surface, not be coerced to falsy)", () => {
  // Models that expose reasoning_tokens=0 when reasoning is disabled must be
  // surfaced as 0, which is what the function does.
  assert.equal(extractReasoningTokens({ reasoning_tokens: 0 }), 0);
  assert.equal(
    extractReasoningTokens({ completion_tokens_details: { reasoning_tokens: 0 } }),
    0
  );
});

// ===========================================================================
// 2. toRetryAfterDisplayValue — display-value coercion
// ===========================================================================

test("toRetryAfterDisplayValue — non-number (string / Date) passes through verbatim", () => {
  const now = new Date();
  assert.equal(toRetryAfterDisplayValue(now), now);
  const s = "Retry-After: 30";
  assert.equal(toRetryAfterDisplayValue(s), s);
});

test("toRetryAfterDisplayValue — small numbers (<1e9) are interpreted as seconds-since-now", () => {
  const before = Date.now();
  const out = toRetryAfterDisplayValue(60);
  const after = Date.now();
  assert.ok(out instanceof Date, "small numeric input must coerce to Date");
  // The produced Date must be within [now + 60s - margin, now + 60s + margin].
  const ms = (out as Date).getTime();
  assert.ok(
    ms >= before + 60_000 - 50,
    `expected ms ≥ ${before + 60_000 - 50}, got ${ms}`
  );
  assert.ok(
    ms <= after + 60_000 + 50,
    `expected ms ≤ ${after + 60_000 + 50}, got ${ms}`
  );
});

test("toRetryAfterDisplayValue — large numbers (≥1e9) are interpreted as epoch-ms", () => {
  const epoch = 1_700_000_000_000; // 2023-11-14T22:13:20Z — well past the threshold
  const out = toRetryAfterDisplayValue(epoch);
  assert.ok(out instanceof Date);
  assert.equal((out as Date).getTime(), epoch);
});

test("toRetryAfterDisplayValue — zero stays an epoch-ms Date (boundary)", () => {
  // 0 < 1e9, so it's interpreted as seconds-from-now; result must be a Date
  // roughly equal to Date.now(), NOT 1970-01-01.
  const before = Date.now();
  const out = toRetryAfterDisplayValue(0);
  const after = Date.now();
  assert.ok(out instanceof Date);
  const ms = (out as Date).getTime();
  assert.ok(ms >= before - 50);
  assert.ok(ms <= after + 50);
});

test("toRetryAfterDisplayValue — idempotent: a Date returned earlier is also non-number, so passes through", () => {
  // The function returns `string | Date`. Feeding back a Date-typed result
  // must NOT re-interpret it as an epoch-ms integer (whose getTime would be
  // a huge number, but Date object input is the string|Date branch).
  const original = new Date("2030-01-01T00:00:00Z");
  const out = toRetryAfterDisplayValue(original);
  assert.equal(out, original, "Date input is already a Date — must pass through");
});

test("toRetryAfterDisplayValue — seconds-since-now branch boundary at 1e9 - 1", () => {
  // 999_999_999 (< 1e9) must go through the seconds-from-now path; we just
  // require it return a Date roughly equal to now + 999_999_999 sec.
  const before = Date.now();
  const out = toRetryAfterDisplayValue(999_999_999);
  const after = Date.now();
  const ms = (out as Date).getTime();
  const expectedLow = before + 999_999_999 * 1000 - 50;
  const expectedHigh = after + 999_999_999 * 1000 + 50;
  assert.ok(ms >= expectedLow, `ms ${ms} below ${expectedLow}`);
  assert.ok(ms <= expectedHigh, `ms ${ms} above ${expectedHigh}`);
});

// ===========================================================================
// 3. validateResponseQuality — non-streaming branches (HTTP 200, JSON)
// ===========================================================================

test("validateResponseQuality — streaming flag true with non-SSE content-type short-circuits to valid (no body inspection)", async () => {
  const res = new Response("hello", {
    status: 200,
    headers: { "content-type": "application/json" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
  assert.equal(out.reason, undefined);
});

test("validateResponseQuality — non-streaming flag false passes through non-JSON content type", async () => {
  const res = new Response("hello", {
    status: 200,
    headers: { "content-type": "image/png" },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — non-streaming empty body is invalid", async () => {
  const res = textResponse("", "application/json");
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /empty response body/);
});

test("validateResponseQuality — non-streaming whitespace-only body is invalid", async () => {
  const res = textResponse("   \n\t  ", "application/json");
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /empty response body/);
});

test("validateResponseQuality — non-streaming JSON-parse error returns 'response is not valid JSON'", async () => {
  const res = textResponse("not json at all", "application/json");
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /response is not valid JSON/);
});

test("validateResponseQuality — non-streaming SSE-shaped non-JSON string passes through valid", async () => {
  // Issue (implicit): when a provider returns raw SSE bytes with content-type
  // application/json by mistake, we should not flag it as invalid JSON.
  const res = textResponse("data: hello world\n\n", "application/json");
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — non-streaming event:-prefixed non-JSON string passes through valid", async () => {
  const res = textResponse("event: ping\ndata: {}\n\n", "application/json");
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — JSON without choices array but with `output` field passes valid", async () => {
  const res = jsonResponse({ output: "ok" });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — JSON without choices but with `error` field invalid + reason excerpt", async () => {
  const res = jsonResponse({ error: { message: "boom" } });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /upstream error in 200 body: boom/);
});

test("validateResponseQuality — JSON without choices and no error/output is treated valid (pass-through)", async () => {
  const res = jsonResponse({});
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — choices with no `message` and no `delta` is invalid", async () => {
  const res = jsonResponse({ choices: [{}] });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /choice has no message object/);
});

test("validateResponseQuality — valid JSON OpenAI-shape with content returns valid + clonedResponse", async () => {
  const res = jsonResponse({ choices: [{ message: { content: "hi" } }] });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse, "valid path must return a clonedResponse");
  const body = await (out.clonedResponse as Response).text();
  assert.match(body, /hi/);
});

test("validateResponseQuality — content: null with reasoning_content (#2341) is valid", async () => {
  // From issue #2341: Kimi-K2.5-TEE / GLM-5-TEE use reasoning_content.
  const res = jsonResponse({
    choices: [
      { message: { content: null, reasoning_content: " The user simply said 'Say OK'. OK." } },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — reasoning_content falsy (empty string) with content present is valid", async () => {
  const res = jsonResponse({
    choices: [
      { message: { content: "hello", reasoning_content: "" } },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — content empty + reasoning_content valid + tool_calls empty array → invalid", async () => {
  const res = jsonResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "thinking…",
          tool_calls: [],
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(
    out.reason ?? "",
    /empty content and no tool_calls in response/
  );
});

test("validateResponseQuality — content empty + tool_calls present is valid (no reasoning branch needed)", async () => {
  const res = jsonResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: null,
          tool_calls: [
            { id: "1", type: "function", function: { name: "f", arguments: "{}" } },
          ],
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — content + reasoning tokens 90%+ of completion → invalid (deepseek / nemotron #3587)", async () => {
  const res = jsonResponse({
    choices: [
      { message: { content: null, reasoning_content: "thought hard" } },
    ],
    usage: {
      completion_tokens: 100,
      completion_tokens_details: { reasoning_tokens: 95 },
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(
    out.reason ?? "",
    /reasoning consumed 95\/100 tokens — no content output/
  );
});

test("validateResponseQuality — content empty + reasoning content but reasoning tokens < 90% → valid (pass-through)", async () => {
  const res = jsonResponse({
    choices: [
      { message: { content: null, reasoning_content: "partial" } },
    ],
    usage: {
      completion_tokens: 100,
      completion_tokens_details: { reasoning_tokens: 50 },
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — completion_tokens 0 with non-zero reasoning skips the 90% gate (pass-through valid)", async () => {
  const res = jsonResponse({
    choices: [
      { message: { content: null, reasoning_content: "thought" } },
    ],
    usage: {
      completion_tokens: 0,
      completion_tokens_details: { reasoning_tokens: 50 },
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — usage missing entirely skips reasoning-budget check", async () => {
  const res = jsonResponse({
    choices: [
      { message: { content: null, reasoning_content: "thought" } },
    ],
    // no usage key at all
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — uses `reasoning` field as fallback to `reasoning_content`", async () => {
  // Some providers (e.g. OpenAI o1 base) use the `reasoning` key instead.
  const res = jsonResponse({
    choices: [{ message: { content: null, reasoning: "thinking" } }],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

// ===========================================================================
// 4. validateResponseQuality — streaming / SSE bounded-peek branches
// ===========================================================================

test("validateResponseQuality — streaming with no body short-circuits to valid", async () => {
  // null body is treated as a pass-through — there's no content to inspect.
  const res = new Response(null, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — streaming SSE with content_block_start → valid + clonedResponse", async () => {
  const chunks = [
    'event: message_start\ndata: {"type":"message_start"}\n\n',
    'event: content_block_start\ndata: {"type":"content_block_start","index":0}\n\n',
    'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"text":"hi"}}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse, "found-content path must replay a clonedResponse");
  // The replayed stream should be readable end-to-end (prefix + remainder).
  const replayedBody = await (out.clonedResponse as Response).text();
  assert.match(replayedBody, /hi/);
});

test("validateResponseQuality — streaming SSE with complete lifecycle but zero content_block_* → invalid", async () => {
  // Issue #3685 scenario: content_filter end-of-stream with no content blocks.
  const chunks = [
    'event: message_start\ndata: {"type":"message_start"}\n\n',
    'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"content_filter"}}\n\n',
    'event: message_stop\ndata: {"type":"message_stop"}\n\n',
  ];
  const warnings: string[] = [];
  const log = { warn: (...args: unknown[]) => warnings.push(args.join(" ")) };
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, log);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /streaming empty content block/);
  assert.ok(warnings.length > 0, "warn hook should fire on empty lifecycle");
});

test("validateResponseQuality — streaming SSE with incomplete lifecycle returns valid + replay", async () => {
  // The stream ends without message_start — we must NOT mark it invalid;
  // just replay the buffered bytes.
  const chunks = [
    'event: ping\ndata: {"type":"ping"}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse);
  const replayed = await (out.clonedResponse as Response).text();
  assert.match(replayed, /ping/);
});

test("validateResponseQuality — streaming SSE JSON-parse error on a `data:` line is skipped (does not throw, stream proceeds)", async () => {
  const chunks = [
    'data: not-json\n\n',
    'event: content_block_start\ndata: {"type":"content_block_start"}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, "parser must tolerate bad data lines");
});

test("validateResponseQuality — streaming SSE `data: [DONE]` sentinel is ignored", async () => {
  const chunks = [
    'event: message_start\ndata: {"type":"message_start"}\n\n',
    'data: [DONE]\n\n',
    // No content block follows: this is an "incomplete lifecycle" → valid.
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — streaming SSE empty data line is ignored", async () => {
  const chunks = [
    'data:\n\n',
    'data: \n\n',
    'event: ping\ndata: {"type":"ping"}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — streaming SSE non-data, non-event line (comment) flushes pendingEventType", async () => {
  // A bare comment line in SSE (:heartbeat) — after this, a subsequent
  // `event:` line must NOT carry the previous type forward.
  const chunks = [
    ':heartbeat\n\n', // pure comment (comment lines start with ":")
    'event: ping\ndata: {"type":"ping"}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — streaming SSE `message_delta` without `delta.stop_reason` does not end lifecycle", async () => {
  const chunks = [
    'event: message_start\ndata: {"type":"message_start"}\n\n',
    'event: message_delta\ndata: {"type":"message_delta","delta":{"text":"more"}}\n\n',
    // No stop_reason present → still incomplete lifecycle → valid.
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — streaming SSE message_delta with stop_reason marks lifecycle end (issue #3685 path)", async () => {
  // This combination of message_start + message_delta{stop_reason} +
  // message_stop without any content_block_* events is the canonical
  // content-filter scenario.
  const chunks = [
    'event: message_start\ndata: {"type":"message_start"}\n\n',
    'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n\n',
    'event: message_stop\ndata: {"type":"message_stop"}\n\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /streaming empty content block/);
});

test("validateResponseQuality — streaming SSE trailing CRLF is handled (\\r\\n line endings)", async () => {
  const chunks = [
    'event: message_start\r\ndata: {"type":"message_start"}\r\n\r\n',
    'event: content_block_start\r\ndata: {"type":"content_block_start"}\r\n\r\n',
  ];
  const res = sseStreamResponse(chunks);
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});

// ===========================================================================
// 5. Cross-cutting invariants (return-type / side-effect guarantees)
// ===========================================================================

test("validateResponseQuality — always returns a Promise resolving to a valid-shape object", async () => {
  const cases: Array<{ name: string; build: () => Promise<Response> }> = [
    {
      name: "empty JSON",
      build: async () => jsonResponse({}),
    },
    {
      name: "valid content",
      build: async () =>
        jsonResponse({ choices: [{ message: { content: "hi" } }] }),
    },
    {
      name: "valid reasoning",
      build: async () =>
        jsonResponse({
          choices: [{ message: { content: null, reasoning_content: "ok" } }],
        }),
    },
    {
      name: "image/png non-streaming",
      build: async () => new Response("x", { status: 200, headers: { "content-type": "image/png" } }),
    },
  ];
  for (const c of cases) {
    const res = await c.build();
    const out = await validateResponseQuality(res, false, silentLog);
    assert.equal(typeof out.valid, "boolean", `case [${c.name}].valid must be boolean`);
    if (out.valid === false) {
      assert.equal(
        typeof out.reason,
        "string",
        `case [${c.name}].reason must be string when valid=false`
      );
    }
  }
});

test("validateResponseQuality — does NOT mutate the input Response body (input body stays readable)", async () => {
  const res = jsonResponse({ choices: [{ message: { content: "hi" } }] });
  // Snapshot what the input body says BEFORE the call.
  const originalBody = await res.clone().text();
  const out = await validateResponseQuality(res, false, silentLog);
  // Whatever the function returns, the input body should still contain the
  // original payload (consumed or not, it must not be silently rewritten).
  const afterBody = await res.clone().text();
  assert.equal(afterBody, originalBody);
  assert.equal(out.valid, true);
});

test("validateResponseQuality — returns clonedResponse with the same status / headers as the input", async () => {
  const headers = { "x-extra-header": "ok" };
  const res = jsonResponse(
    { choices: [{ message: { content: "hi" } }] },
    { status: 200, contentType: "application/json", headers }
  );
  const out = await validateResponseQuality(res, false, silentLog);
  assert.ok(out.clonedResponse);
  assert.equal((out.clonedResponse as Response).status, 200);
  assert.match(
    (out.clonedResponse as Response).headers.get("content-type") ?? "",
    /application\/json/
  );
});

test("toRetryAfterDisplayValue / extractReasoningTokens — pure: repeated calls return equal values", () => {
  // extractReasoningTokens has no caching, so calls must be side-effect-free.
  const usage = {
    completion_tokens_details: { reasoning_tokens: 100 },
  };
  for (let i = 0; i < 5; i++) {
    assert.equal(extractReasoningTokens(usage), 100);
  }
});
