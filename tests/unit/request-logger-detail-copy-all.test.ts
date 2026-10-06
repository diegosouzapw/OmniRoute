import test from "node:test";
import assert from "node:assert/strict";

// Pure-function coverage for buildCopyAllText (src/shared/components/RequestLoggerDetail.tsx):
// the "Copy all" button composes every visible payload section + stream chunk into a single
// block so users can copy the whole request/response transcript with one click.
import { buildCopyAllText } from "../../src/shared/components/RequestLoggerDetail.tsx";

test("buildCopyAllText: joins sections in order with section separators", () => {
  const text = buildCopyAllText({
    sections: [
      { title: "Provider Request", json: '{"a":1}' },
      { title: "Provider Response", json: '{"b":2}' },
    ],
  });
  assert.match(text, /^### Provider Request\n\{"a":1\}\n\n---\n\n### Provider Response\n\{"b":2\}$/);
});

test("buildCopyAllText: includes provider/client/openai stream chunks before sections", () => {
  const text = buildCopyAllText({
    sections: [{ title: "Payload", json: "{}" }],
    streamChunks: {
      provider: ["data: {", '"x":1}', "\n\n"],
      client: "data: done",
    },
  });
  const lines = text.split("\n\n---\n\n");
  assert.equal(lines.length, 3);
  assert.equal(lines[0], '### PROVIDER STREAM\ndata: {"x":1}\n\n');
  assert.equal(lines[1], "### CLIENT STREAM\ndata: done");
  assert.equal(lines[2], "### Payload\n{}");
});

test("buildCopyAllText: falls back to legacy request/response when no sections exist", () => {
  const text = buildCopyAllText({
    sections: [],
    legacyRequest: '{"prompt":"hi"}',
    legacyResponse: '{"reply":"hello"}',
    legacyRequestTitle: "Request Payload",
    legacyResponseTitle: "Response Payload",
  });
  assert.equal(
    text,
    '### Response Payload\n{"reply":"hello"}\n\n---\n\n### Request Payload\n{"prompt":"hi"}'
  );
});

test("buildCopyAllText: returns empty string when no sections, chunks, or legacy payloads exist", () => {
  const text = buildCopyAllText({ sections: [] });
  assert.equal(text, "");
});
