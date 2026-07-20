import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { resolveRequestLifecycleEvent } from "../../open-sse/handlers/chatCore/attemptLogging.ts";

// The live topology lights a node green on `request.started` and only clears it when a
// matching `request.completed`/`request.failed` arrives. Those terminal events were
// declared + consumed by the client but never emitted, so a node stayed green until a
// page reload (the "stuck green" latch). These tests guard the fix that emits them.

test("resolveRequestLifecycleEvent: 2xx success → request.completed keyed by traceId", () => {
  const ev = resolveRequestLifecycleEvent({
    traceId: "abc123",
    status: 200,
    error: null,
    model: "gpt-5.6-sol",
    provider: "codex",
    comboName: "my-combo",
    tokens: { input: 10, output: 5 },
    latencyMs: 1234,
  });
  assert.equal(ev.name, "request.completed");
  assert.equal(ev.payload.id, "abc123");
  if (ev.name !== "request.completed") return;
  assert.equal(ev.payload.status, "success");
  assert.equal(ev.payload.provider, "codex");
  assert.equal(ev.payload.model, "gpt-5.6-sol");
  assert.equal(ev.payload.tokensInput, 10);
  assert.equal(ev.payload.tokensOutput, 5);
  assert.equal(ev.payload.latencyMs, 1234);
  assert.equal(ev.payload.comboName, "my-combo");
});

test("resolveRequestLifecycleEvent: 5xx → request.failed keyed by the same traceId", () => {
  const ev = resolveRequestLifecycleEvent({
    traceId: "e1",
    status: 500,
    error: "boom",
    model: "m",
    provider: "p",
    latencyMs: 7,
  });
  assert.equal(ev.name, "request.failed");
  if (ev.name !== "request.failed") return;
  assert.equal(ev.payload.id, "e1");
  assert.equal(ev.payload.error, "boom");
  assert.equal(ev.payload.statusCode, 500);
  assert.equal(ev.payload.latencyMs, 7);
});

test("resolveRequestLifecycleEvent: a 2xx status carrying an error string is still a failure", () => {
  const ev = resolveRequestLifecycleEvent({ traceId: "x", status: 200, error: "late error", latencyMs: 1 });
  assert.equal(ev.name, "request.failed");
});

test("resolveRequestLifecycleEvent: tokens resolve from prompt_tokens/completion_tokens aliases", () => {
  const ev = resolveRequestLifecycleEvent({
    traceId: "t",
    status: 201,
    tokens: { prompt_tokens: 3, completion_tokens: 8 },
    latencyMs: 0,
  });
  assert.equal(ev.name, "request.completed");
  if (ev.name !== "request.completed") return;
  assert.equal(ev.payload.tokensInput, 3);
  assert.equal(ev.payload.tokensOutput, 8);
});

test("resolveRequestLifecycleEvent: missing/odd tokens degrade to zero, never NaN", () => {
  const ev = resolveRequestLifecycleEvent({ traceId: "z", status: 200, tokens: "nope", latencyMs: 2 });
  assert.equal(ev.name, "request.completed");
  if (ev.name !== "request.completed") return;
  assert.equal(ev.payload.tokensInput, 0);
  assert.equal(ev.payload.tokensOutput, 0);
});

test("attemptLogging emits both terminal events through the dashboard event bus", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../../open-sse/handlers/chatCore/attemptLogging.ts", import.meta.url)),
    "utf8"
  );
  assert.match(src, /emit\("request\.completed"/, "success attempts must emit request.completed");
  assert.match(src, /emit\("request\.failed"/, "failed attempts must emit request.failed");
  assert.match(src, /resolveRequestLifecycleEvent/, "emit must go through the pure resolver");
});

test("chatCore threads traceId into the persistAttemptLogs context (pairs with request.started)", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../../open-sse/handlers/chatCore.ts", import.meta.url)),
    "utf8"
  );
  assert.match(
    src,
    /persistAttemptLogsFor\(args,\s*\{\s*traceId/,
    "the terminal event id must be the same traceId emitted in request.started"
  );
});
