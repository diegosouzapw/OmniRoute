// Regression guard for #4715: the Codex HTTP transport forwards the upstream SSE
// stream verbatim, including the non-standard `event: codex.rate_limits` frame
// (no `data:` line). That frame breaks the OpenAI SDK's responses.stream() with
// HTTP 502 "Controller is already closed". filterNonstandardCodexSse() strips
// every `codex.*` event block from the byte stream while preserving standard ones.
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  filterNonstandardCodexSse,
  codexDropNonstandardEvents,
} from "../../open-sse/executors/codex.ts";

function sseResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function chunkedSseResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

async function readAll(res: Response): Promise<string> {
  return await res.text();
}

describe("codexDropNonstandardEvents (#11014)", () => {
  const KEY = "OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS";
  let saved: string | undefined;

  beforeEach(() => {
    saved = process.env[KEY];
  });

  afterEach(() => {
    if (saved === undefined) delete process.env[KEY];
    else process.env[KEY] = saved;
  });

  it("defaults ON so OpenAI-strict /v1/responses clients are not 502'd", () => {
    delete process.env[KEY];
    assert.equal(codexDropNonstandardEvents(), true);
    process.env[KEY] = "";
    assert.equal(codexDropNonstandardEvents(), true);
    process.env[KEY] = "   ";
    assert.equal(codexDropNonstandardEvents(), true);
  });

  it("opts out on 0/false/no/off", () => {
    for (const v of ["0", "false", "FALSE", "no", "off"]) {
      process.env[KEY] = v;
      assert.equal(codexDropNonstandardEvents(), false, v);
    }
  });

  it("stays on for true/1/yes/on", () => {
    for (const v of ["true", "1", "yes", "on", "TRUE"]) {
      process.env[KEY] = v;
      assert.equal(codexDropNonstandardEvents(), true, v);
    }
  });
});

describe("filterNonstandardCodexSse (#4715)", () => {
  it("drops codex.* event blocks but keeps standard response.* events", async () => {
    const stream =
      'event: response.created\ndata: {"type":"response.created"}\n\n' +
      "event: codex.rate_limits\n\n" +
      'event: response.output_text.delta\ndata: {"delta":"hi"}\n\n' +
      'event: response.completed\ndata: {"type":"response.completed"}\n\n';
    const out = await readAll(filterNonstandardCodexSse(sseResponse(stream)));
    assert.ok(!out.includes("codex.rate_limits"), "codex.* frame must be stripped");
    assert.ok(out.includes("response.created"), "standard events preserved");
    assert.ok(out.includes("response.output_text.delta"), "standard delta preserved");
    assert.ok(out.includes("response.completed"), "terminal event preserved");
  });

  it("filters CRLF-framed events split across transport chunks", async () => {
    const response = chunkedSseResponse([
      'event: response.created\r\ndata: {"type":"response.created"}\r\n\r',
      "\nevent: codex.rate_limits\r\n\r\n",
      'event: response.completed\r\ndata: {"type":"response.completed"}\r\n\r\n',
    ]);

    const out = await readAll(filterNonstandardCodexSse(response));

    assert.ok(!out.includes("codex.rate_limits"), "codex.* frame must be stripped");
    assert.ok(out.includes("response.created"), "standard events preserved");
    assert.ok(out.includes("response.completed"), "terminal event preserved");
  });

  it("passes through non-SSE responses untouched", async () => {
    const json = new Response('{"ok":true}', {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const out = filterNonstandardCodexSse(json);
    assert.equal(await out.text(), '{"ok":true}');
  });

  it("drops a trailing codex.* block with no double-newline terminator (flush path)", async () => {
    const stream = "event: response.created\ndata: {}\n\n" + "event: codex.token_count\ndata: {}";
    const out = await readAll(filterNonstandardCodexSse(sseResponse(stream)));
    assert.ok(out.includes("response.created"));
    assert.ok(!out.includes("codex.token_count"));
  });
});
