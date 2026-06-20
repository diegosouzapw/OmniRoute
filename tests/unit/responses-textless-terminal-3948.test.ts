/**
 * #3948 — Combo via n8n (non-streaming) returns empty content.
 *
 * A Responses-API target (codex/`cx`) streams from upstream even on
 * `stream:false`. Its terminal `response.completed` snapshot can carry a
 * non-empty `output` that LACKS the assistant message item (e.g. only a
 * `reasoning` item) even though the streamed `response.output_text.delta`
 * events reconstructed a full assistant message.
 *
 * `parseSSEToResponsesOutput` preferred the terminal `output` wholesale when it
 * was non-empty, discarding the reconstructed delta text → empty content on
 * `stream:false`. n8n defaults to `stream:false`, so the combo response came back
 * HTTP 200 with empty content (regression vs 3.8.10).
 *
 * The aggregator must fall back to the reconstructed delta output when the
 * terminal output has no message item but the reconstruction does — while still
 * letting the terminal snapshot win whenever it already carries the message.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";

type AnyRecord = Record<string, unknown>;

function messageText(output: AnyRecord[]): string {
  const msg = output.find((o) => (o as AnyRecord).type === "message") as AnyRecord | undefined;
  if (!msg) return "";
  const content = Array.isArray(msg.content) ? (msg.content as AnyRecord[]) : [];
  return content.map((p) => String((p as AnyRecord).text ?? "")).join("");
}

// Terminal `response.completed.output` carries ONLY the reasoning item; the
// assistant message text arrived purely via output_text deltas.
const SSE_TEXTLESS_TERMINAL = [
  `event: response.created`,
  `data: {"type":"response.created","response":{"id":"resp_1","object":"response","model":"gpt-5.2-codex","status":"in_progress"}}`,
  ``,
  `event: response.output_item.added`,
  `data: {"type":"response.output_item.added","output_index":0,"item":{"type":"reasoning","summary":[]}}`,
  ``,
  `event: response.output_item.added`,
  `data: {"type":"response.output_item.added","output_index":1,"item":{"type":"message","role":"assistant","content":[]}}`,
  ``,
  `event: response.output_text.delta`,
  `data: {"type":"response.output_text.delta","output_index":1,"delta":"Hello "}`,
  ``,
  `event: response.output_text.delta`,
  `data: {"type":"response.output_text.delta","output_index":1,"delta":"from codex"}`,
  ``,
  `event: response.output_text.done`,
  `data: {"type":"response.output_text.done","output_index":1,"text":"Hello from codex"}`,
  ``,
  `event: response.completed`,
  `data: {"type":"response.completed","response":{"id":"resp_1","object":"response","model":"gpt-5.2-codex","status":"completed","output":[{"type":"reasoning","summary":[{"type":"summary_text","text":"thinking..."}]}],"usage":{"input_tokens":10,"output_tokens":5}}}`,
  ``,
  `data: [DONE]`,
  ``,
].join("\n");

// Control: terminal output DOES carry the assistant message — terminal must win.
const SSE_TERMINAL_WITH_MESSAGE = [
  `event: response.created`,
  `data: {"type":"response.created","response":{"id":"resp_2","object":"response","model":"gpt-5.2-codex","status":"in_progress"}}`,
  ``,
  `event: response.output_item.added`,
  `data: {"type":"response.output_item.added","output_index":0,"item":{"type":"message","role":"assistant","content":[]}}`,
  ``,
  `event: response.output_text.delta`,
  `data: {"type":"response.output_text.delta","output_index":0,"delta":"partial"}`,
  ``,
  `event: response.completed`,
  `data: {"type":"response.completed","response":{"id":"resp_2","object":"response","model":"gpt-5.2-codex","status":"completed","output":[{"type":"message","role":"assistant","content":[{"type":"output_text","annotations":[],"text":"Hi there"}]}],"usage":{"input_tokens":3,"output_tokens":2}}}`,
  ``,
  `data: [DONE]`,
  ``,
].join("\n");

test("#3948 aggregator recovers reconstructed message when terminal output is textless", () => {
  const result = parseSSEToResponsesOutput(SSE_TEXTLESS_TERMINAL, "gpt-5.2-codex") as AnyRecord;
  const output = result.output as AnyRecord[];

  const hasMessage = output.some((o) => o.type === "message");
  assert.ok(hasMessage, "output must contain the assistant message item, not just reasoning");
  assert.equal(
    messageText(output),
    "Hello from codex",
    "the reconstructed delta text must survive a textless terminal snapshot"
  );
});

test("#3948 terminal output still wins when it carries the assistant message", () => {
  const result = parseSSEToResponsesOutput(SSE_TERMINAL_WITH_MESSAGE, "gpt-5.2-codex") as AnyRecord;
  const output = result.output as AnyRecord[];

  assert.equal(
    messageText(output),
    "Hi there",
    "the terminal snapshot message must be preserved (not overwritten by reconstruction)"
  );
});
