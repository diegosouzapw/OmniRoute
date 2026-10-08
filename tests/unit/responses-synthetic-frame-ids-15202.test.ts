/**
 * #15202 — regression of #14330.
 *
 * The 3.8.51 fix that made the synthesized `/v1/responses` frames valid Responses
 * events gave them a `response` object but left `response.id: null`. The Responses
 * event schema types `response.id` as `string | undefined`, so strict decoders
 * (openai-python, OpenCode's Responses client) abort the stream on the very first
 * frame — which is the keepalive `response.in_progress`, emitted before the real
 * `response.created`. Every synthesized frame must carry a STRING `response.id`.
 *
 * The two Codex executor frames (SSE + WebSocket) are covered by the isolated
 * fixture in tests/fixtures/codex-response-failed-boundary.fixture.ts, which
 * asserts the same string-id contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { OPENAI_RESPONSES_IN_PROGRESS_FRAME } from "../../open-sse/utils/sseHeartbeat.ts";
import { synthResponsesFailure } from "../../open-sse/utils/diagnostics.ts";

const { buildStreamErrorChunks } = await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function parseSseData(sseText: string): Record<string, unknown> {
  const dataLine = sseText.split("\n").find((line) => line.startsWith("data: "));
  assert.ok(dataLine, `expected a data: line in frame, got: ${JSON.stringify(sseText)}`);
  return JSON.parse(dataLine!.slice("data: ".length)) as Record<string, unknown>;
}

function assertStringResponseId(payload: Record<string, unknown>, site: string): void {
  const response = payload.response as Record<string, unknown> | undefined;
  assert.equal(typeof response, "object", `${site}: missing the required response object`);
  assert.equal(
    typeof response?.id,
    "string",
    `${site}: response.id must be a string — null abort the strict Responses decoder on the first frame`
  );
}

test("#15202: startup keepalive response.in_progress carries a string response.id", () => {
  const payload = parseSseData(new TextDecoder().decode(OPENAI_RESPONSES_IN_PROGRESS_FRAME));
  assert.equal(payload.type, "response.in_progress");
  assertStringResponseId(payload, "sseHeartbeat keepalive");
});

test("#15202: synthResponsesFailure() carries a string response.id", () => {
  const payload = parseSseData(synthResponsesFailure("timeout"));
  assert.equal(payload.type, "response.failed");
  assertStringResponseId(payload, "diagnostics.synthResponsesFailure");
});

test("#15202: buildStreamErrorChunks() carries a string response.id", () => {
  const chunks = buildStreamErrorChunks("upstream exploded", 502, FORMATS.OPENAI_RESPONSES);
  const payload = parseSseData(new TextDecoder().decode(chunks[0]));
  assert.equal(payload.type, "response.failed");
  assertStringResponseId(payload, "streamHandler.buildStreamErrorChunks");
});
