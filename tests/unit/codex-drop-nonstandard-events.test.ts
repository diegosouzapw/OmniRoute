// Regression guard for #4715: the Codex HTTP transport forwards the upstream SSE
// stream verbatim, including the non-standard `event: codex.rate_limits` frame
// (no `data:` line). That frame breaks the OpenAI SDK's responses.stream() with
// HTTP 502 "Controller is already closed". filterNonstandardCodexSse() strips
// every `codex.*` event block from the byte stream while preserving standard ones.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterNonstandardCodexSse } from "../../open-sse/executors/codex.ts";

function sseResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

async function readAll(res: Response): Promise<string> {
  return await res.text();
}

describe("filterNonstandardCodexSse (#4715)", () => {
  it("drops codex.* event blocks but keeps standard response.* events", async () => {
    const stream =
      "event: response.created\ndata: {\"type\":\"response.created\"}\n\n" +
      "event: codex.rate_limits\n\n" +
      "event: response.output_text.delta\ndata: {\"delta\":\"hi\"}\n\n" +
      "event: response.completed\ndata: {\"type\":\"response.completed\"}\n\n";
    const out = await readAll(filterNonstandardCodexSse(sseResponse(stream)));
    assert.ok(!out.includes("codex.rate_limits"), "codex.* frame must be stripped");
    assert.ok(out.includes("response.created"), "standard events preserved");
    assert.ok(out.includes("response.output_text.delta"), "standard delta preserved");
    assert.ok(out.includes("response.completed"), "terminal event preserved");
  });

  it("passes through non-SSE responses untouched", async () => {
    const json = new Response("{\"ok\":true}", {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const out = filterNonstandardCodexSse(json);
    assert.equal(await out.text(), "{\"ok\":true}");
  });

  it("drops a trailing codex.* block with no double-newline terminator (flush path)", async () => {
    const stream =
      "event: response.created\ndata: {}\n\n" + "event: codex.token_count\ndata: {}";
    const out = await readAll(filterNonstandardCodexSse(sseResponse(stream)));
    assert.ok(out.includes("response.created"));
    assert.ok(!out.includes("codex.token_count"));
  });
});
