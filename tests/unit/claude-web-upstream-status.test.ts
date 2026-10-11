import test from "node:test";
import assert from "node:assert/strict";

// Upstream refusals must publish the status on the capture sink so proxy
// health counts them as upstream instead of transport failures.
const { ClaudeWebExecutor } = await import("../../open-sse/executors/claude-web.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/claudeTlsClient.ts");
const { __resetClaudeWebSessionForTesting } =
  await import("../../open-sse/executors/claude-web/session.ts");
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";

// ─── Helpers ────────────────────────────────────────────────────────────────

const COOKIE = "sessionKey=session-secret";

function completionStream(): ReadableStream<Uint8Array> {
  const events = [
    { type: "message_start", message: { model: "claude-sonnet-5" } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "answer" } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "end_turn" } },
    { type: "message_stop" },
  ];
  const bytes = new TextEncoder().encode(
    events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("")
  );
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

/**
 * Install the production TLS override, dispatching by URL: the organization
 * lookup gets orgStatus, the completion call gets completionStatus (or throws
 * when completionThrows is set). Returns { restore }.
 */
function installTlsOverride({
  orgStatus = 200,
  completionStatus = 200,
  completionThrows = false,
}: {
  orgStatus?: number;
  completionStatus?: number;
  completionThrows?: boolean;
} = {}) {
  __setTlsFetchOverrideForTesting(async (url: string) => {
    if (url.includes("/organizations") && !url.includes("/chat_conversations")) {
      if (orgStatus !== 200) {
        return { status: orgStatus, headers: new Headers(), text: "limited", body: null };
      }
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        text: JSON.stringify([{ uuid: "organization-test" }]),
        body: null,
      };
    }
    if (completionThrows) throw new Error("connection reset");
    if (completionStatus !== 200) {
      return { status: completionStatus, headers: new Headers(), text: "limited", body: null };
    }
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: completionStream(),
    };
  });
  return {
    restore: () => {
      __setTlsFetchOverrideForTesting(null);
      __resetClaudeWebSessionForTesting();
    },
  };
}

function executeInput(withOrgId: boolean) {
  return {
    model: "claude-sonnet-5",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: withOrgId ? { cookie: COOKIE, orgId: "organization-test" } : { cookie: COOKIE },
    signal: null,
  };
}

// ─── Upstream status on refusals ────────────────────────────────────────────

test("completion refusal records the upstream status on the sink", async () => {
  const { restore } = installTlsOverride({ completionStatus: 429 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new ClaudeWebExecutor().execute(executeInput(true))
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    restore();
  }
});

test("organization lookup refusal records the upstream status on the sink", async () => {
  const { restore } = installTlsOverride({ orgStatus: 429 });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new ClaudeWebExecutor().execute(executeInput(false))
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});

test("successful completion leaves the sink untouched", async () => {
  const { restore } = installTlsOverride();
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new ClaudeWebExecutor().execute(executeInput(true))
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 200);
  } finally {
    restore();
  }
});

test("network failure leaves the sink untouched", async () => {
  const { restore } = installTlsOverride({ completionThrows: true });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new ClaudeWebExecutor().execute(executeInput(true))
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});
