import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const { default: RequestLoggerDetail } =
  await import("../../src/shared/components/RequestLoggerDetail.tsx");

test("event stream shows only when debugEnabled and appears above legacy response", () => {
  const html = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log: {
        status: 504,
        method: "POST",
        path: "/v1/chat/completions",
        timestamp: "2026-04-09T21:27:08.000Z",
        duration: 2500,
        provider: "gemini",
        sourceFormat: "openai-chat",
        model: "test-model",
        tokens: { in: 1, out: 1 },
      },
      detail: {
        pipelinePayloads: {
          streamChunks: {
            provider: ['data: {"content": "hello"}\n\n'],
            openai: ['data: {"choices":[{"delta":{"content":"hi"}}]}\n\n'],
          },
          // No providerResponse here so payloadSections will be empty and the legacy
          // response payload should still be rendered; Event Stream must appear above it.
        },
        responseBody: "{}",
      },

      loading: false,
      debugEnabled: true,
      onClose: () => {},
      onCopy: async () => true,
    })
  );

  assert.notEqual(
    html.indexOf(">Event Stream (Debug)<"),
    -1,
    "Event Stream should be present when debugEnabled"
  );
  // Ensure the legacy response payload is present and that the Event Stream appears above it
  assert.notEqual(
    html.indexOf(">Response Payload (Legacy)<"),
    -1,
    "Legacy response payload should be present"
  );
  assert(
    html.indexOf(">Event Stream (Debug)<") < html.indexOf(">Response Payload (Legacy)<"),
    "Event Stream should appear before Response Payload (Legacy)"
  );
});

test("event stream hidden when debugEnabled is false", () => {
  const html = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log: {
        status: 504,
        method: "POST",
        path: "/v1/chat/completions",
        timestamp: "2026-04-09T21:27:08.000Z",
        duration: 2500,
        provider: "gemini",
        sourceFormat: "openai-chat",
        model: "test-model",
        tokens: { in: 1, out: 1 },
      },
      detail: {
        pipelinePayloads: {
          streamChunks: { provider: ["data: chunk"] },
          providerResponse: { status: 200 },
        },
        responseBody: "{}",
      },
      loading: false,
      debugEnabled: false,
      onClose: () => {},
      onCopy: async () => true,
    })
  );

  assert.equal(
    html.indexOf(">Event Stream (Debug)<"),
    -1,
    "Event Stream should be hidden when debugEnabled is false"
  );
});

test("status discrepancy shows both OmniRoute and provider statuses", () => {
  const html = renderToStaticMarkup(
    React.createElement(RequestLoggerDetail, {
      log: {
        status: 504,
        method: "POST",
        path: "/v1/chat/completions",
        timestamp: "2026-04-09T21:27:08.000Z",
        duration: 2500,
        provider: "gemini",
        sourceFormat: "openai-chat",
        model: "test-model",
        tokens: { in: 1, out: 1 },
      },
      detail: {
        pipelinePayloads: {
          providerResponse: { status: 200 },
        },
      },
      loading: false,
      debugEnabled: false,
      onClose: () => {},
      onCopy: async () => true,
    })
  );

  assert.notEqual(html.indexOf("Upstream: 200"), -1, "Should display upstream/provider status");
  assert.notEqual(
    html.indexOf("OmniRoute returned 504"),
    -1,
    "Should indicate OmniRoute returned its own status"
  );
});

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
