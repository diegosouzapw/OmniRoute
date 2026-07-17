import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSseChunk, summarizeStream } from "../../scripts/homolog/lib/sseCheck.mjs";

test("parseSseChunk separa eventos data: e detecta [DONE]", () => {
  const events = parseSseChunk('data: {"choices":[{"delta":{"content":"O"}}]}\n\ndata: [DONE]\n\n');
  assert.equal(events.length, 2);
  assert.equal(events[1], "[DONE]");
});

test("parseSseChunk acha data: mesmo precedido de comment-lines SSE no mesmo bloco", () => {
  // Formato real da VPS (v3.8.47): trailers de telemetria como comments (`: x-omniroute-*`)
  // no MESMO bloco do data: [DONE] — o parser não pode olhar só o início do bloco.
  const chunk =
    'data: {"choices":[{"delta":{"content":"OK"}}]}\n\n' +
    ": x-omniroute-cache-hit=false\n: x-omniroute-latency-ms=67\ndata: [DONE]\n\n";
  const events = parseSseChunk(chunk);
  assert.deepEqual(events, ['{"choices":[{"delta":{"content":"OK"}}]}', "[DONE]"]);
});

test("summarizeStream exige >=1 delta de conteúdo e terminador [DONE]", () => {
  const good = summarizeStream(['{"choices":[{"delta":{"content":"OK"}}]}', "[DONE]"]);
  assert.equal(good.ok, true);
  const noDone = summarizeStream(['{"choices":[{"delta":{"content":"OK"}}]}']);
  assert.equal(noDone.ok, false);
  const noContent = summarizeStream(["[DONE]"]);
  assert.equal(noContent.ok, false);
});
