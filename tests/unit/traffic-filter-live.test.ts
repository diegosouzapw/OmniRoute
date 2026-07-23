/**
 * Gap 5 — "Live" (in-flight) filter for the Traffic Inspector.
 *
 * The request-list filter logic used to live inline inside the useTrafficStream
 * hook (untested). It is extracted here into a pure `matchesTrafficFilter` so the
 * new `liveOnly` toggle — and, for the first time, the pre-existing profile/host/
 * agent/status rules — are unit-tested. These tests pin BOTH the new behavior and
 * parity with the old inline logic.
 */
import test from "node:test";
import assert from "node:assert/strict";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

const { matchesTrafficFilter } = await import("../../src/lib/inspector/matchesTrafficFilter.ts");

function mkReq(partial: Partial<InterceptedRequest>): InterceptedRequest {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    source: "agent-bridge",
    timestamp: "2026-06-17T00:00:00.000Z",
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    detectedKind: "llm",
    ...partial,
  };
}

test("liveOnly keeps in-flight requests and drops finished ones", () => {
  assert.equal(matchesTrafficFilter(mkReq({ status: "in-flight" }), { liveOnly: true }), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: 200 }), { liveOnly: true }), false);
  assert.equal(matchesTrafficFilter(mkReq({ status: "error" }), { liveOnly: true }), false);
});

test("liveOnly off (or unset) does not filter by in-flight", () => {
  assert.equal(matchesTrafficFilter(mkReq({ status: 200 }), {}), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: 200 }), { liveOnly: false }), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: "in-flight" }), {}), true);
});

test("liveOnly composes with other filters (host must still match)", () => {
  const req = mkReq({ status: "in-flight", host: "api.anthropic.com" });
  assert.equal(matchesTrafficFilter(req, { liveOnly: true, host: "openai" }), false);
  assert.equal(matchesTrafficFilter(req, { liveOnly: true, host: "anthropic" }), true);
});

// ── Parity with the previous inline applyFilter logic ────────────────────────

test("profile=llm drops non-llm requests", () => {
  assert.equal(matchesTrafficFilter(mkReq({ detectedKind: "app" }), { profile: "llm" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ detectedKind: "llm" }), { profile: "llm" }), true);
});

test("profile=custom keeps only custom-host source", () => {
  assert.equal(matchesTrafficFilter(mkReq({ source: "agent-bridge" }), { profile: "custom" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ source: "custom-host" }), { profile: "custom" }), true);
});

test("host filter is a substring match", () => {
  assert.equal(matchesTrafficFilter(mkReq({ host: "api.openai.com" }), { host: "openai" }), true);
  assert.equal(matchesTrafficFilter(mkReq({ host: "api.openai.com" }), { host: "google" }), false);
});

test("agent, source, sessionId and sameContextKey filters", () => {
  assert.equal(matchesTrafficFilter(mkReq({ agent: "claude-code" }), { agent: "codex" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ source: "http-proxy" }), { source: "system-proxy" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ sessionId: "a" }), { sessionId: "b" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ contextKey: "abc" }), { sameContextKey: "xyz" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ contextKey: "abc" }), { sameContextKey: "abc" }), true);
});

test("status category filter (2xx/4xx/5xx/error)", () => {
  assert.equal(matchesTrafficFilter(mkReq({ status: 200 }), { status: "2xx" }), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: 404 }), { status: "2xx" }), false);
  assert.equal(matchesTrafficFilter(mkReq({ status: 503 }), { status: "5xx" }), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: "error" }), { status: "error" }), true);
  assert.equal(matchesTrafficFilter(mkReq({ status: 200 }), { status: "error" }), false);
});

test("an empty filter set matches everything", () => {
  assert.equal(matchesTrafficFilter(mkReq({}), {}), true);
});
