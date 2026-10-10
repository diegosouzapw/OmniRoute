import test from "node:test";
import assert from "node:assert/strict";

import { __test__ } from "../../open-sse/executors/qoder.ts";

const { unwrapQoderEnvelope } = __test__;

// Port of decolua/9router#3510: Qoder answers a temporarily throttled request
// with an embedded 403 envelope carrying the nested code 10605 (queue throttle,
// isQueued/retryAfterSeconds). Treating it as a 403 authentication_error parked
// healthy accounts on the auth cooldown.

type ErrorPayload = {
  error: { message: string; type?: string; code?: string };
};

function sseEnvelope(envelope: Record<string, unknown>): Response {
  return new Response(`data: ${JSON.stringify(envelope)}\n\ndata: [DONE]\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

// Triple-nested shape observed in the upstream report.
const queueBody = JSON.stringify({
  code: "403",
  message: JSON.stringify({
    code: "10605",
    message: JSON.stringify({
      isQueued: false,
      modelKey: "qmodel_38max",
      queueCount: 0,
      queueType: "slow",
      retryAfterSeconds: 30,
    }),
  }),
});

test("#3510: embedded 403 with nested code 10605 is NOT an authentication_error", async () => {
  const result = await unwrapQoderEnvelope(sseEnvelope({ statusCodeValue: 403, body: queueBody }));

  assert.notEqual(result.status, 403, "queue throttle must not surface as 403");
  assert.equal(result.status, 503);
  const payload = (await result.json()) as ErrorPayload;
  assert.notEqual(payload.error.type, "authentication_error");
  assert.equal(payload.error.type, "provider_error");
  assert.equal(payload.error.code, "upstream_busy");
  assert.equal(result.headers.get("Retry-After"), "30");
});

test("#3510: 10605 without retryAfterSeconds is still upstream_busy, no Retry-After", async () => {
  const body = JSON.stringify({ code: "403", message: JSON.stringify({ code: "10605" }) });
  const result = await unwrapQoderEnvelope(sseEnvelope({ statusCodeValue: 403, body }));

  assert.equal(result.status, 503);
  const payload = (await result.json()) as ErrorPayload;
  assert.equal(payload.error.code, "upstream_busy");
  assert.equal(result.headers.get("Retry-After"), null);
});

test("#3510: plain embedded 403 (no 10605) stays an authentication_error", async () => {
  const result = await unwrapQoderEnvelope(
    sseEnvelope({ statusCodeValue: 403, body: '{"code":"403","message":"forbidden"}' })
  );

  assert.equal(result.status, 403);
  const payload = (await result.json()) as ErrorPayload;
  assert.equal(payload.error.type, "authentication_error");
});
