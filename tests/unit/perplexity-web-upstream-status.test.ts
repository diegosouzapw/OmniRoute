import test from "node:test";
import assert from "node:assert/strict";

// Upstream refusals must publish the status on the capture sink so proxy
// health counts them as upstream instead of transport failures.
const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";

// ─── Helpers ────────────────────────────────────────────────────────────────

function successStream(): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  chunks.push(
    `event: message\r\ndata: ${JSON.stringify({
      backend_uuid: "upstream-status-success",
      blocks: [
        { intended_usage: "markdown", markdown_block: { chunks: ["Hello"], progress: "DONE" } },
      ],
      status: "COMPLETED",
    })}\r\n\r\n`
  );
  chunks.push("event: end_of_stream\r\n\r\n");
  const body = chunks.join("");
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

function installTlsOverride(
  handler: (url: string, options?: unknown) => Promise<unknown> | unknown
): { restore: () => void } {
  __setTlsFetchOverrideForTesting(handler as never);
  return {
    restore: () => {
      __setTlsFetchOverrideForTesting(null);
    },
  };
}

function executeInput() {
  return {
    model: "pplx-auto",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "test-cookie-value" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  };
}

// ─── Upstream status on refusals ────────────────────────────────────────────

test("upstream refusal records the status on the sink", async () => {
  const { restore } = installTlsOverride(async () => ({
    status: 429,
    headers: new Headers(),
    text: "limited",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new PerplexityWebExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    restore();
  }
});

test("authentication refusal records the received status on the sink", async () => {
  const { restore } = installTlsOverride(async () => ({
    status: 401,
    headers: new Headers(),
    text: "unauthorized",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new PerplexityWebExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 401);
    assert.equal(response.status, 401);
  } finally {
    restore();
  }
});

test("successful response leaves the sink untouched", async () => {
  const { restore } = installTlsOverride(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "text/event-stream" }),
    text: null,
    body: successStream(),
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new PerplexityWebExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 200);
  } finally {
    restore();
  }
});

test("network failure leaves the sink untouched", async () => {
  const { restore } = installTlsOverride(async () => {
    throw new Error("connection reset");
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new PerplexityWebExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});
