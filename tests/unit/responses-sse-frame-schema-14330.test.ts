// Regression test for issue #14330: synthesized keepalive and failure frames on
// /v1/responses are not valid Responses API events (missing or duplicated
// `sequence_number`). Each SSE `data:` payload on /v1/responses must satisfy
// the documented Responses event union, which requires a numeric
// `sequence_number` on every typed event.
import { test } from "node:test";
import assert from "node:assert/strict";

import { OPENAI_RESPONSES_IN_PROGRESS_FRAME } from "../../open-sse/utils/sseHeartbeat.ts";
import { synthResponsesFailure } from "../../open-sse/utils/diagnostics.ts";
import { OPENAI_RESPONSES_ERROR_FRAME } from "../../open-sse/utils/earlyStreamKeepalive.ts";
import { formatTranslatedStreamError } from "../../open-sse/utils/streamErrorFormat.ts";

function extractDataLine(sseText: string): Record<string, unknown> {
  const dataLine = sseText.split("\n").find((line) => line.startsWith("data: "));
  assert.ok(dataLine, `expected a data: line in frame, got: ${JSON.stringify(sseText)}`);
  return JSON.parse(dataLine!.slice("data: ".length));
}

test("#14330: OPENAI_RESPONSES_IN_PROGRESS_FRAME (startup + mid-stream keepalive) is a valid response.in_progress event", () => {
  const text = new TextDecoder().decode(OPENAI_RESPONSES_IN_PROGRESS_FRAME);
  const payload = extractDataLine(text);

  assert.equal(payload.type, "response.in_progress");
  assert.equal(
    typeof payload.sequence_number,
    "number",
    "response.in_progress frame is missing sequence_number — a strict client " +
      "(openai-python, etc.) fails to decode this frame and aborts the stream"
  );
  assert.equal(
    typeof payload.response,
    "object",
    "response.in_progress frame is missing the required `response` object"
  );
});

test("#14330: synthResponsesFailure() produces a response.failed event with a numeric sequence_number", () => {
  const text = synthResponsesFailure("timeout");
  const payload = extractDataLine(text);

  assert.equal(payload.type, "response.failed");
  assert.equal(
    typeof payload.sequence_number,
    "number",
    "synthResponsesFailure() omits sequence_number — a strict client fails to " +
      "decode the failure frame and never sees the real upstream error"
  );
});

test("#14330: OPENAI_RESPONSES_ERROR_FRAME does not hardcode a duplicate sequence_number: 0", () => {
  const text = new TextDecoder().decode(OPENAI_RESPONSES_ERROR_FRAME);
  const payload = extractDataLine(text);

  assert.equal(payload.type, "error");
  assert.equal(typeof payload.sequence_number, "number");
  assert.notEqual(
    payload.sequence_number,
    0,
    "OPENAI_RESPONSES_ERROR_FRAME hardcodes sequence_number: 0 instead of " +
      "continuing the real per-stream sequence"
  );
});

test("#14330: formatTranslatedStreamError() (Responses format) does not hardcode a duplicate sequence_number: 0", () => {
  const text = formatTranslatedStreamError(
    { status: 502, message: "boom", code: "stream_error", type: "server_error" },
    "openai-responses"
  );
  const payload = extractDataLine(text);

  assert.equal(payload.type, "response.failed");
  assert.equal(typeof payload.sequence_number, "number");
  assert.notEqual(
    payload.sequence_number,
    0,
    "formatTranslatedStreamError() hardcodes sequence_number: 0 for the " +
      "response.failed frame instead of continuing the real per-stream sequence"
  );
});
