import test from "node:test";
import assert from "node:assert/strict";

import { isCodexOriginatedHeaders } from "../../open-sse/config/codexIdentity.ts";
import {
  echoModelInObject,
  echoModelInSseLine,
} from "../../open-sse/services/responseModelEcho.ts";

const { openaiToOpenAIResponsesResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// #3697: Codex CLI compatibility shim — echo the client-requested (effort-suffixed) model
// id (e.g. `gpt-5.5-xhigh`) in Responses API payloads instead of the bare upstream id
// (`gpt-5.5`), so the Codex CLI status line/model button shows the active effort.

function collectResponsesEvents(chunks: Array<Record<string, unknown> | null>) {
  const state = initState(FORMATS.OPENAI_RESPONSES) as Record<string, unknown>;
  const events: Array<{ event: string; data: Record<string, unknown> }> = [];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk as never, state as never);
    if (result) events.push(...(result as never));
  }
  return events;
}

test("isCodexOriginatedHeaders detects Codex CLI via originator header (Headers instance)", () => {
  const headers = new Headers({ originator: "codex_cli_rs" });
  assert.equal(isCodexOriginatedHeaders(headers), true);
});

test("isCodexOriginatedHeaders detects Codex CLI via User-Agent (plain object, case-insensitive)", () => {
  assert.equal(isCodexOriginatedHeaders({ "User-Agent": "codex_cli_rs/0.136.0" }), true);
});

test("isCodexOriginatedHeaders returns false for non-Codex clients", () => {
  assert.equal(isCodexOriginatedHeaders(new Headers({ "user-agent": "curl/8.0" })), false);
  assert.equal(isCodexOriginatedHeaders({}), false);
  assert.equal(isCodexOriginatedHeaders(null), false);
});

test("OpenAI -> Responses translator carries the upstream model into response.created/completed", () => {
  const events = collectResponsesEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-5.5",
      choices: [{ index: 0, delta: { content: "hi" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-5.5",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    null, // flush -> response.completed
  ]);

  const created = events.find((e) => e.event === "response.created");
  const completed = events.find((e) => e.event === "response.completed");
  assert.equal((created!.data.response as Record<string, unknown>).model, "gpt-5.5");
  assert.equal((completed!.data.response as Record<string, unknown>).model, "gpt-5.5");
});

test("OpenAI -> Responses translator omits model when the upstream never sent one (no regression)", () => {
  const events = collectResponsesEvents([
    {
      id: "chatcmpl-1",
      choices: [{ index: 0, delta: { content: "hi" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    null,
  ]);

  const created = events.find((e) => e.event === "response.created");
  const completed = events.find((e) => e.event === "response.completed");
  assert.equal("model" in (created!.data.response as Record<string, unknown>), false);
  assert.equal("model" in (completed!.data.response as Record<string, unknown>), false);
});

test("full shim pipeline: bare upstream model in Responses payloads gets rewritten to the requested effort-suffixed id", () => {
  const events = collectResponsesEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-5.5",
      choices: [{ index: 0, delta: { content: "hi" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-5.5",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    null,
  ]);

  const requestedModel = "gpt-5.5-xhigh";
  const created = events.find((e) => e.event === "response.created")!.data;
  const completed = events.find((e) => e.event === "response.completed")!.data;

  // Non-stream / object form (chatCore's non-streaming return path).
  echoModelInObject(created, requestedModel);
  echoModelInObject(completed, requestedModel);
  assert.equal((created.response as Record<string, unknown>).model, requestedModel);
  assert.equal((completed.response as Record<string, unknown>).model, requestedModel);

  // Streaming SSE-line form (chatCore's createModelEchoTransform pipe stage).
  const sseLine = `data: ${JSON.stringify({
    type: "response.completed",
    response: { id: "resp_1", object: "response", model: "gpt-5.5", status: "completed" },
  })}`;
  const rewritten = echoModelInSseLine(sseLine, requestedModel);
  assert.ok(rewritten.includes(`"model":"${requestedModel}"`), rewritten);
  assert.ok(!rewritten.includes('"model":"gpt-5.5"'), rewritten);
});

test("echoModelInObject/echoModelInSseLine leave non-Responses shapes governed by the existing top-level rule (no regression)", () => {
  const chatCompletionChunk = { id: "x", model: "gpt-5.5", choices: [] };
  echoModelInObject(chatCompletionChunk, "claude-sonnet-cx");
  assert.equal(chatCompletionChunk.model, "claude-sonnet-cx");

  const line = echoModelInSseLine(
    'data: {"id":"1","model":"gpt-5.5","choices":[]}',
    "claude-sonnet-cx"
  );
  assert.equal(line, 'data: {"id":"1","model":"claude-sonnet-cx","choices":[]}');
});
