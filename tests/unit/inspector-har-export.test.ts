import test from "node:test";
import assert from "node:assert/strict";
import { toHar } from "../../src/lib/inspector/harExport.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

function makeReq(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    source: "agent-bridge",
    timestamp: "2026-05-27T12:00:00.000Z",
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: { "content-type": "application/json" },
    requestBody: '{"model":"gpt-4"}',
    requestSize: 17,
    responseHeaders: { "content-type": "application/json" },
    responseBody: '{"ok":true}',
    responseSize: 11,
    status: 200,
    totalLatencyMs: 200,
    upstreamLatencyMs: 150,
    ...overrides,
  };
}

test("produces HAR v1.2 with creator + entries", () => {
  const har = toHar([makeReq()]);
  assert.equal(har.log.version, "1.2");
  assert.ok(har.log.creator.name.includes("OmniRoute"));
  assert.equal(har.log.entries.length, 1);
});

test("entry fields match the spec", () => {
  const har = toHar([makeReq()]);
  const e = har.log.entries[0];
  assert.equal(e.startedDateTime, "2026-05-27T12:00:00.000Z");
  assert.equal(e.time, 200);
  assert.equal(e.request.method, "POST");
  assert.equal(e.request.url, "https://api.openai.com/v1/chat/completions");
  assert.equal(e.request.httpVersion, "HTTP/1.1");
  assert.equal(e.request.bodySize, 17);
  assert.ok(e.request.postData);
  assert.equal(e.request.postData?.mimeType, "application/json");
  assert.equal(e.response.status, 200);
  assert.equal(e.response.content.size, 11);
  assert.equal(e.response.content.text, '{"ok":true}');
  assert.equal(e.timings.send, 0);
  assert.equal(e.timings.wait, 150);
  assert.equal(e.timings.receive, 50);
});

test("Bearer tokens in headers are masked", () => {
  const req = makeReq({
    requestHeaders: {
      "content-type": "application/json",
      authorization: "Bearer sk-supersecretvalueabc1234567890XYZ",
    },
  });
  const har = toHar([req]);
  const authHeader = har.log.entries[0].request.headers.find(
    (h) => h.name === "authorization"
  );
  assert.ok(authHeader);
  // Either Bearer regex (authorization:\sBearer prefix) or sk-/long-token regex must mask the value
  assert.ok(!authHeader.value.includes("supersecretvalueabc1234567890XYZ"));
  assert.ok(authHeader.value.includes("…") || authHeader.value.includes("***"));
});

test("sk- keys in bodies are masked", () => {
  const req = makeReq({
    requestBody: '{"key":"sk-abcdef1234567890ABCDEF"}',
  });
  const har = toHar([req]);
  const body = har.log.entries[0].request.postData?.text ?? "";
  assert.ok(!body.includes("sk-abcdef1234567890ABCDEF"));
  assert.match(body, /sk-abc/);
});

test("preserves _source custom property", () => {
  const har = toHar([
    makeReq({ source: "http-proxy" }),
    makeReq({ id: "00000000-0000-4000-8000-000000000002", source: "system-proxy" }),
  ]);
  assert.equal(har.log.entries[0]._source, "http-proxy");
  assert.equal(har.log.entries[1]._source, "system-proxy");
});

test("preserves _detectedKind / _contextKey / _agent / _sessionId / _note", () => {
  const har = toHar([
    makeReq({
      agent: "claude",
      detectedKind: "llm",
      contextKey: "abc123",
      sessionId: "00000000-0000-4000-8000-000000000099",
      note: "TLS tunnel",
    }),
  ]);
  const e = har.log.entries[0];
  assert.equal(e._agent, "claude");
  assert.equal(e._detectedKind, "llm");
  assert.equal(e._contextKey, "abc123");
  assert.equal(e._sessionId, "00000000-0000-4000-8000-000000000099");
  assert.equal(e._note, "TLS tunnel");
  assert.equal(e._omniRouteId, "00000000-0000-4000-8000-000000000001");
});

test("handles in-flight / error status without throwing", () => {
  const har = toHar([
    makeReq({ status: "in-flight", responseBody: null }),
    makeReq({ id: "x", status: "error", responseBody: null, error: "boom" }),
  ]);
  assert.equal(har.log.entries[0].response.status, 0);
  assert.equal(har.log.entries[0].response.statusText, "in-flight");
  assert.equal(har.log.entries[1].response.statusText, "error");
});

test("CONNECT-style path renders pseudo-URL", () => {
  const har = toHar([
    makeReq({
      method: "CONNECT",
      host: "api.example.com",
      path: ":443",
      responseBody: null,
    }),
  ]);
  assert.equal(har.log.entries[0].request.url, "https://api.example.com:443");
});
