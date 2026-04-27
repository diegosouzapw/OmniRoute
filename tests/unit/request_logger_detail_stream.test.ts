import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const { default: RequestLoggerDetail } =
  await import("../../src/shared/components/RequestLoggerDetail.tsx");

test("request logger detail renders stream chunks correctly", () => {
  const log = {
    status: 200,
    method: "POST",
    path: "/v1/chat/completions",
    provider: "gemini",
    model: "gemma-4-31b-it",
    timestamp: new Date().toISOString(),
    duration: 100,
  };

  const detail = {
    pipelinePayloads: {
      streamChunks: {
        provider: [
          'data: {"type": "message_start"}\n\n',
          'data: {"type": "content_block_start"}\n\n',
          ": x-omniroute-latency-ms=1\n",
          "data: [DONE]\n\n",
        ],
      },
    },
    responseBody: "{}",
  };

  const html = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log,
      detail,
      loading: false,
      debugEnabled: true,
      onClose: () => {},
      onCopy: async () => true,
    })
  );

  const expectedFragment = "message_start";
  assert.notEqual(
    html.indexOf(">Event Stream (Debug)<"),
    -1,
    "Event Stream header should be present"
  );
  // The payload is HTML-escaped; check for the provider key token and the message content
  assert.notEqual(
    html.indexOf("provider"),
    -1,
    "Stream chunks output should reference provider key"
  );
  assert.notEqual(
    html.indexOf(expectedFragment),
    -1,
    "Stream content (message_start) should be present in rendered HTML"
  );
});
