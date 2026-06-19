import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { InterceptedRequestSchema } from "@/mitm/inspector/types";

const require = createRequire(import.meta.url);
const { buildIngestEntry, postIngestEntry, INGEST_PATH } = require("../../src/mitm/_internal/ingest.cjs");

test("buildIngestEntry produces a schema-valid agent-bridge entry", () => {
  const entry = buildIngestEntry({
    id: "11111111-1111-4111-8111-111111111111",
    timestamp: "2026-06-19T00:00:00.000Z",
    method: "POST",
    host: "daily-cloudcode-pa.googleapis.com",
    path: "/v1internal:streamGenerateContent?alt=sse",
    agentId: "antigravity",
    sourceModel: "gemini-2.5-pro",
    mappedModel: "glm-5.2",
    requestHeaders: { "content-type": "application/json" },
    requestBody: '{"model":"gemini-2.5-pro"}',
    requestSize: 26,
    status: 200,
    responseHeaders: { "content-type": "text/event-stream" },
    responseBody: "data: {}",
    responseSize: 8,
    proxyLatencyMs: 5,
    upstreamLatencyMs: 100,
  });

  assert.equal(entry.source, "agent-bridge");
  assert.equal(entry.agent, "antigravity");
  assert.equal(entry.sourceModel, "gemini-2.5-pro");
  assert.equal(entry.mappedModel, "glm-5.2");
  assert.equal(entry.totalLatencyMs, 105);

  // Must satisfy the same schema the ingest endpoint validates against.
  const parsed = InterceptedRequestSchema.safeParse(entry);
  assert.ok(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues));
});

test("buildIngestEntry defaults missing optional fields to a valid entry", () => {
  const entry = buildIngestEntry({
    id: "22222222-2222-4222-8222-222222222222",
    timestamp: "2026-06-19T00:00:00.000Z",
    method: "POST",
    host: "daily-cloudcode-pa.googleapis.com",
    path: "/v1internal:streamGenerateContent",
    status: "error",
    error: "OmniRoute 400: bad request",
  });

  assert.equal(entry.requestBody, null);
  assert.equal(entry.responseBody, null);
  assert.equal(entry.requestSize, 0);
  assert.equal(entry.responseSize, 0);
  assert.deepEqual(entry.requestHeaders, {});
  assert.equal(entry.status, "error");
  assert.equal(entry.error, "OmniRoute 400: bad request");
  // No latencies → no totalLatencyMs key.
  assert.equal("totalLatencyMs" in entry, false);

  const parsed = InterceptedRequestSchema.safeParse(entry);
  assert.ok(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues));
});

test("postIngestEntry posts to the ingest path with a bearer token and returns true on 2xx", async () => {
  type FetchOpts = { method: string; headers: Record<string, string>; body: string };
  const calls: Array<{ url: string; opts: FetchOpts }> = [];
  const fakeFetch = async (url: string, opts: FetchOpts) => {
    calls.push({ url, opts });
    return { ok: true };
  };

  const ok = await postIngestEntry("http://localhost:20128", "tok123", { id: "x" }, fakeFetch);

  assert.equal(ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `http://localhost:20128${INGEST_PATH}`);
  assert.equal(calls[0].opts.headers.Authorization, "Bearer tok123");
  assert.equal(calls[0].opts.method, "POST");
});

test("postIngestEntry returns false without a token and never calls fetch", async () => {
  let called = false;
  const ok = await postIngestEntry(
    "http://localhost:20128",
    "",
    { id: "x" },
    async () => {
      called = true;
      return { ok: true };
    }
  );
  assert.equal(ok, false);
  assert.equal(called, false);
});

test("postIngestEntry swallows fetch errors (never throws)", async () => {
  const ok = await postIngestEntry("http://localhost:20128", "tok", { id: "x" }, async () => {
    throw new Error("network down");
  });
  assert.equal(ok, false);
});

test("postIngestEntry returns false on a non-2xx response", async () => {
  const ok = await postIngestEntry("http://localhost:20128", "tok", { id: "x" }, async () => ({
    ok: false,
  }));
  assert.equal(ok, false);
});
