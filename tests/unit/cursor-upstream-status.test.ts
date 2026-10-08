import test from "node:test";
import assert from "node:assert/strict";

// Cold-open refusals must publish the upstream status on the capture sink so
// proxy health counts them as upstream instead of transport failures.
const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
const { mergeAppliedProxySink } = await import("../../src/sse/handlers/chatHelpers.ts");
const { encodeMessage, encodeString } =
  await import("../../open-sse/utils/cursorAgentProtobuf/wire.ts");
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";

function serverConfig(agentUrl: string, agentnUrl: string): Buffer {
  return encodeMessage(27, [encodeString(1, agentUrl), encodeString(2, agentnUrl)]);
}

function installServerConfigFetch() {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      serverConfig("https://agent.t.api5.cursor.sh", "https://agentn.t.api5.cursor.sh"),
      {
        status: 200,
        headers: { "Content-Type": "application/proto" },
      }
    )) as typeof fetch;
  return { restore: () => (globalThis.fetch = original) };
}

function stubOpenH2(opened: unknown) {
  const proto = CursorExecutor.prototype as unknown as Record<string, unknown>;
  const original = proto.openH2;
  proto.openH2 = async () => opened;
  return { restore: () => (proto.openH2 = original) };
}

function executeInput(stream = false) {
  return {
    model: "auto",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream,
    credentials: { accessToken: "token-test", connectionId: "connection-upstream-status" },
    signal: null,
    log: null,
    upstreamExtraHeaders: null,
    clientHeaders: null,
  };
}

test("cold-open rate limit records the upstream status on the sink", async () => {
  const { restore: restoreFetch } = installServerConfigFetch();
  const { restore: restoreH2 } = stubOpenH2({
    status: 429,
    consumeError: async () => Buffer.from("limited"),
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new CursorExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
    assert.match(await response.text(), /\[429\]/);
  } finally {
    restoreH2();
    restoreFetch();
  }
});

test("cold-open outage records the upstream status on the sink", async () => {
  const { restore: restoreFetch } = installServerConfigFetch();
  const { restore: restoreH2 } = stubOpenH2({
    status: 503,
    consumeError: async () => Buffer.from("down"),
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new CursorExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 503);
    assert.equal(response.status, 503);
    assert.match(await response.text(), /\[503\]/);
  } finally {
    restoreH2();
    restoreFetch();
  }
});

test("a throwing error body still records the upstream status on the sink", async () => {
  const { restore: restoreFetch } = installServerConfigFetch();
  const { restore: restoreH2 } = stubOpenH2({
    status: 429,
    consumeError: async () => {
      throw new Error("stream gone");
    },
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new CursorExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.match(await response.text(), /Unknown error/);
  } finally {
    restoreH2();
    restoreFetch();
  }
});

test("streaming refusal records the upstream status on the sink", async () => {
  const { restore: restoreFetch } = installServerConfigFetch();
  const { restore: restoreH2 } = stubOpenH2({
    status: 429,
    consumeError: async () => Buffer.from("limited"),
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new CursorExecutor().execute(executeInput(true))
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    restoreH2();
    restoreFetch();
  }
});

test("network failure leaves the sink untouched", async () => {
  const { restore: restoreFetch } = installServerConfigFetch();
  const proto = CursorExecutor.prototype as unknown as Record<string, unknown>;
  const original = proto.openH2;
  proto.openH2 = async () => {
    throw new Error("connection reset");
  };
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new CursorExecutor().execute(executeInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 500);
  } finally {
    proto.openH2 = original;
    restoreFetch();
  }
});

test("a recorded status reaches the journaled proxy info", () => {
  const merged = mergeAppliedProxySink({ proxy: null }, { proxy: null, upstreamStatus: 429 });
  assert.equal(merged?.upstreamStatus, 429);
  const untouched = mergeAppliedProxySink({ proxy: null }, { proxy: null });
  assert.equal(untouched?.upstreamStatus, undefined);
});
