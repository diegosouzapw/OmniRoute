import test from "node:test";
import assert from "node:assert/strict";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/grokTlsClient.ts";
import { __setGrokClearanceAcquireOverrideForTesting } from "../../open-sse/services/grokClearance.ts";
import { runWithAppliedProxyCapture } from "../../open-sse/utils/proxyFetch.ts";
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const { GrokWebExecutor } = await import("../../open-sse/executors/grok-web.ts");

// ─── Fixtures ────────────────────────────────────────────────────────────────

const NORMAL_AUTH_FAILURE_BODY = JSON.stringify({
  error: { message: "Invalid session", code: "UNAUTHENTICATED" },
});

const RATE_LIMIT_BODY = JSON.stringify({ error: { message: "Too many requests" } });

function mockGrokStream(events: unknown[]) {
  const encoder = new TextEncoder();
  const lines = events.map((e) => JSON.stringify(e)).join("\n") + "\n";
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines));
      controller.close();
    },
  });
}

function baseInput(overrides: Partial<ExecuteInput> = {}): ExecuteInput {
  return {
    model: "grok-4",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "sso=abc123" },
    signal: undefined,
    log: undefined,
    ...overrides,
  };
}

test.afterEach(() => {
  __setTlsFetchOverrideForTesting(null);
  __setGrokClearanceAcquireOverrideForTesting(null);
  delete process.env.OMNIROUTE_BROWSER_POOL;
  delete process.env.WEB_COOKIE_USE_BROWSER;
});

// ─── Upstream status on refusals ─────────────────────────────────────────────

test("refusal 429 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 429,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: RATE_LIMIT_BODY,
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("refusal 401 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 401,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: NORMAL_AUTH_FAILURE_BODY,
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 401);
    assert.equal(response.status, 401);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("refusal 403 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 403,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: NORMAL_AUTH_FAILURE_BODY,
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 403);
    assert.equal(response.status, 403);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("refusal 500 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 500,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: "internal error",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 500);
    assert.equal(response.status, 500);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("successful completion leaves the sink untouched", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "application/x-ndjson" }),
    text: null,
    body: mockGrokStream([
      { result: { response: { modelResponse: { message: "Hello!", responseId: "r1" } } } },
    ]),
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 200);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("network failure leaves the sink untouched", async () => {
  __setTlsFetchOverrideForTesting(async () => {
    throw new Error("connection reset");
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new GrokWebExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});
