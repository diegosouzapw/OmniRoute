/**
 * Regression guards for the 2026-09-21 client incident: claude-opus-5 failing
 * ~58% of native Claude Code passthrough requests, surfacing to clients as
 * 429 "all targets were skipped by pre-dispatch filters".
 *
 * Three independent defects, one per describe block below.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  stripClaudeRejectedTopLevelFields,
  unpairedClaudeClientFields,
} from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";
import { isSyntheticEmptyStreamFailure } from "../../src/sse/services/syntheticEmptyStream.ts";

describe("Claude passthrough keeps safeguards only next to its paired beta", () => {
  // Live 400 (2026-09-21): `safeguards: Extra inputs are not permitted`. Anthropic
  // rejects the WHOLE request when the auto mode `safeguards` field arrives without
  // the `dangerous-tool-use-2026-09-03` beta. Stripping it unconditionally fixed
  // the 400 but made every gateway session ineligible for server-side auto mode
  // (https://code.claude.com/docs/en/auto-mode-classifier-billing).
  const cases: Array<[string, string | null, readonly string[]]> = [
    ["no anthropic-beta header", null, ["safeguards"]],
    [
      "beta header without the paired beta",
      "claude-code-20250219,oauth-2025-04-20",
      ["safeguards"],
    ],
    [
      "paired beta negotiated",
      "claude-code-20250219,afk-mode-2026-01-31,dangerous-tool-use-2026-09-03",
      [],
    ],
    ["paired beta with odd spacing and casing", " Dangerous-Tool-Use-2026-09-03 ", []],
  ];

  for (const [scenario, clientBeta, expected] of cases) {
    it(`${scenario} strips ${JSON.stringify(expected)}`, () => {
      assert.deepEqual(unpairedClaudeClientFields(clientBeta), expected);
    });
  }
});

describe("stripClaudeRejectedTopLevelFields on the native claude passthrough", () => {
  const AUTO_MODE_BETA = "claude-code-20250219,dangerous-tool-use-2026-09-03";

  function claudeCodeBody(): Record<string, unknown> {
    return {
      model: "claude-sonnet-5",
      messages: [{ role: "user", content: "hi" }],
      temperature: 0.7,
      top_p: 0.9,
      safeguards: [{ type: "dangerous_tool_use", classifier_context: "ctx" }],
    };
  }

  const headerShapes: Array<[string, Headers | Record<string, unknown>]> = [
    ["a fetch Headers instance", new Headers({ "anthropic-beta": AUTO_MODE_BETA })],
    ["a plain header record", { "Anthropic-Beta": AUTO_MODE_BETA }],
  ];

  for (const [shape, headers] of headerShapes) {
    it(`keeps safeguards when ${shape} carries the paired beta`, () => {
      const body = claudeCodeBody();

      stripClaudeRejectedTopLevelFields(body, headers);

      assert.deepEqual(body.safeguards, claudeCodeBody().safeguards);
    });
  }

  it("strips safeguards and top_p but keeps the real payload without the paired beta", () => {
    const body = claudeCodeBody();

    stripClaudeRejectedTopLevelFields(body, { "anthropic-beta": "claude-code-20250219" });

    assert.equal(body.safeguards, undefined);
    assert.equal(body.top_p, undefined);
    assert.equal(body.temperature, 0.7);
    assert.deepEqual(body.messages, claudeCodeBody().messages);
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
