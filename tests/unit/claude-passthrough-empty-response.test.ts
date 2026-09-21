/**
 * Regression guards for the 2026-09-21 client incident: claude-opus-5 failing
 * ~58% of native Claude Code passthrough requests, surfacing to clients as
 * 429 "all targets were skipped by pre-dispatch filters".
 *
 * Three independent defects, one per describe block below.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { CLAUDE_CLIENT_ONLY_TOP_LEVEL_FIELDS } from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";
import { isSyntheticEmptyStreamFailure } from "../../src/sse/services/auth.ts";

describe("Claude passthrough strips client-only top-level fields", () => {
  // Live 400: `safeguards: Extra inputs are not permitted`. Anthropic rejects
  // the WHOLE request for an unknown top-level field, so forwarding it verbatim
  // guaranteed a 400 on every Claude Code request that sent it.
  it("lists safeguards as a client-only field", () => {
    assert.ok(CLAUDE_CLIENT_ONLY_TOP_LEVEL_FIELDS.includes("safeguards"));
  });

  it("deleting the listed fields removes safeguards but preserves real payload", () => {
    const body: Record<string, unknown> = {
      model: "claude-opus-5",
      messages: [{ role: "user", content: "hi" }],
      temperature: 0.7,
      safeguards: { mode: "strict" },
    };
    for (const field of CLAUDE_CLIENT_ONLY_TOP_LEVEL_FIELDS) {
      if (body[field] !== undefined) delete body[field];
    }
    assert.equal(body.safeguards, undefined);
    assert.equal(body.model, "claude-opus-5");
    assert.equal(body.temperature, 0.7);
    assert.ok(Array.isArray(body.messages));
  });
});

describe("synthetic empty-stream 502 must not trigger a per-model lockout", () => {
  // OmniRoute synthesizes this 502 itself (stream.ts emitClaudeEmptyStreamErrorAndAbort,
  // code "empty_response"). Treating it as an upstream per-model server error
  // locked claude-opus-5 for 60s on HEALTHY accounts; with the remaining accounts
  // rate-limited that emptied the whole combo.
  it("recognises the synthesized empty-response 502", () => {
    assert.equal(
      isSyntheticEmptyStreamFailure(502, "Claude returned an empty response (no content block)"),
      true
    );
  });

  it("does not match a genuine upstream 502", () => {
    assert.equal(isSyntheticEmptyStreamFailure(502, "Bad gateway"), false);
    assert.equal(isSyntheticEmptyStreamFailure(502, ""), false);
    assert.equal(isSyntheticEmptyStreamFailure(502, null), false);
  });

  it("does not match other statuses even with the same text", () => {
    // 503/504 keep the existing model-lockout path (#6216) — only the
    // self-generated 502 is exempt.
    assert.equal(
      isSyntheticEmptyStreamFailure(503, "Claude returned an empty response (no content block)"),
      false
    );
    assert.equal(
      isSyntheticEmptyStreamFailure(429, "Claude returned an empty response (no content block)"),
      false
    );
  });
});

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

function claudeSseResponse(events: string[]): Response {
  const body = events.join("\n") + "\n";
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(body));
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

describe("upstream streaming error text is surfaced, not masked", () => {
  // Previously every in-stream failure collapsed to the bare string "streaming
  // upstream error", and the client only ever saw "Claude returned an empty
  // response (no content block)". That masking hid two real Anthropic
  // rejections for days.
  it("carries the upstream error type and message into the failure reason", async () => {
    const res = claudeSseResponse([
      `event: error`,
      `data: ${JSON.stringify({
        type: "error",
        error: {
          type: "invalid_request_error",
          message: "messages.1.content.1: `tool_addition` blocks require anthropic-beta",
        },
      })}`,
      "",
    ]);

    const out = await validateResponseQuality(res, true, silentLog);
    assert.equal(out.valid, false, "an upstream error event must fail quality validation");
    assert.match(
      String(out.reason),
      /invalid_request_error/,
      `reason must name the upstream error type, got: ${out.reason}`
    );
    assert.match(String(out.reason), /tool_addition/, `reason must carry the upstream message`);
  });

  it("still reports a bare reason when the payload carries no detail", async () => {
    const res = claudeSseResponse([
      `event: error`,
      `data: ${JSON.stringify({ type: "error" })}`,
      "",
    ]);
    const out = await validateResponseQuality(res, true, silentLog);
    assert.equal(out.valid, false);
    assert.match(String(out.reason), /streaming upstream error/);
  });
});
