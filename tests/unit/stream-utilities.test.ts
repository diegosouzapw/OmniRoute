import test from "node:test";
import assert from "node:assert/strict";

import {
  pipeWithDisconnect,
  createStreamController,
  createDisconnectAwareStream,
} from "../../open-sse/utils/streamHandler.ts";

import { wantsProgress, createProgressTransform } from "../../open-sse/utils/progressTracker.ts";

test("wantsProgress detects X-OmniRoute-Progress header correctly", () => {
  const headersObj = { "x-omniroute-progress": "true" };
  assert.equal(wantsProgress(new Headers(headersObj)), true);

  const headersMap = new Map([["x-omniroute-progress", "true"]]);
  assert.equal(wantsProgress(headersMap), true);

  const headersPlain = { "x-omniroute-progress": "true" };
  assert.equal(wantsProgress(headersPlain), true);

  assert.equal(wantsProgress({ "x-omniroute-progress": "false" }), false);
  assert.equal(wantsProgress(null), false);
  assert.equal(wantsProgress({}), false);
});

test("createProgressTransform maps SSE text output to valid byte stream with progress", async () => {
  const transform = createProgressTransform({ signal: new AbortController().signal });
  const writer = transform.writable.getWriter();

  writer.write(new TextEncoder().encode('data: {"chunk":"one"}\n\n'));
  writer.write(new TextEncoder().encode('data: {"chunk":"two"}\n\n'));
  writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
  writer.close();

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }

  assert.match(result, /data: \{"chunk":"one"\}/);
  assert.match(result, /data: \{"chunk":"two"\}/);
  assert.match(result, /data: \[DONE\]/);
  assert.match(result, /event: progress/); // progress check
  assert.match(result, /done":true/);
});

test("createStreamController returns valid controller", () => {
  let completeLogged = false;
  let disconnectLogged = false;

  const originalLog = console.log;
  console.log = (msg) => {
    if (msg.includes("complete")) completeLogged = true;
    if (msg.includes("disconnect")) disconnectLogged = true;
  };

  const sc = createStreamController({
    connectionId: "conn_1",
    onStreamComplete: () => {},
  });

  assert.equal(typeof sc.signal, "object");

  sc.handleComplete();
  assert.equal(completeLogged, true);
  assert.equal(sc.isConnected(), false);

  sc.handleDisconnect();
  assert.equal(disconnectLogged, false);

  console.log = originalLog;
});
