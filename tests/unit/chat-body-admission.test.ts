// #7846: atomic, actual-byte-bounded admission before chat parsing.
import test from "node:test";
import assert from "node:assert/strict";

const {
  admitChatRequest,
  ChatAdmissionController,
  releaseChatAdmissionAfterHandler,
  releaseChatAdmissionWhenDone,
} = await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { withEarlyStreamKeepalive } = await import("../../open-sse/utils/earlyStreamKeepalive.ts");

function chatRequest(body: string, contentLength: string | null = String(body.length)): Request {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (contentLength !== null) headers["content-length"] = contentLength;
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers,
    body,
  });
}

test("small known body is admitted without consuming heavyweight capacity", async () => {
  const controller = new ChatAdmissionController(1);
  const result = await admitChatRequest(chatRequest("{}"), {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
  });
  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 0);
  if (result.admit) assert.equal(await result.request.text(), "{}");
});

test("heavyweight admission is atomic and returns retryable 503 at capacity", async () => {
  const controller = new ChatAdmissionController(1);
  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(40) }] });
  const options = { controller, largeBodyBytes: 32, hardMaxBytes: 1024 };

  const first = await admitChatRequest(chatRequest(body), options);
  assert.equal(first.admit, true);
  if (!first.admit) return;
  assert.equal(controller.activeHeavy, 1);

  const second = await admitChatRequest(chatRequest(body), options);
  assert.equal(second.admit, false);
  if (second.admit) return;
  assert.equal(second.response.status, 503);
  assert.equal(second.response.headers.get("Retry-After"), "2");
  assert.equal((await second.response.json()).error.code, "chat_admission_busy");

  first.lease?.release();
  first.lease?.release();
  assert.equal(controller.activeHeavy, 0, "release must be idempotent");
});

test("small unknown-length bodies do not consume heavyweight capacity", async () => {
  for (const header of [null, "not-a-number"]) {
    const controller = new ChatAdmissionController(1);
    const held = controller.tryAcquireHeavy();
    assert.ok(held);
    const result = await admitChatRequest(chatRequest("{}", header), {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 1024,
    });
    assert.equal(result.admit, true);
    if (result.admit) {
      assert.equal(result.lease, null);
      assert.equal(await result.request.text(), "{}");
    }
    held.release();
  }
});

test("unknown or lying-small lengths cannot bypass occupied heavyweight capacity", async () => {
  for (const contentLength of [null, "1"]) {
    const controller = new ChatAdmissionController(1);
    const held = controller.tryAcquireHeavy();
    assert.ok(held);
    let cancelled = false;
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (contentLength) headers["content-length"] = contentLength;
    const request = new Request("http://x/v1/chat/completions", {
      method: "POST",
      headers,
      body: new ReadableStream<Uint8Array>({
        start(streamController) {
          streamController.enqueue(new Uint8Array(40));
        },
        cancel() {
          cancelled = true;
        },
      }),
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    const result = await admitChatRequest(request, {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 1024,
    });
    assert.equal(result.admit, false);
    if (!result.admit) assert.equal(result.response.status, 503);
    assert.equal(cancelled, true, "remaining upload must be cancelled at the threshold");
    held.release();
  }
});

test("declared body above the hard max is rejected before ingestion", async () => {
  const controller = new ChatAdmissionController(1);
  const result = await admitChatRequest(chatRequest("{}", "65"), {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 64,
  });
  assert.equal(result.admit, false);
  if (!result.admit) assert.equal(result.response.status, 413);
  assert.equal(controller.activeHeavy, 0);
});

test("actual bytes enforce hard max despite a lying small content-length", async () => {
  const controller = new ChatAdmissionController(1);
  const stream = new ReadableStream<Uint8Array>({
    start(streamController) {
      streamController.enqueue(new Uint8Array(40));
      streamController.enqueue(new Uint8Array(40));
      streamController.close();
    },
  });
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "1" },
    body: stream,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  const result = await admitChatRequest(request, {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 64,
  });
  assert.equal(result.admit, false);
  if (!result.admit) {
    assert.equal(result.response.status, 413);
    assert.equal((await result.response.json()).error.code, "PAYLOAD_TOO_LARGE");
  }
  assert.equal(controller.activeHeavy, 0, "hard-cap rejection releases a mid-read lease");
});

test("stream lifecycle holds the lease until close and releases exactly once", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);
  const response = releaseChatAdmissionWhenDone(
    new Response(
      new ReadableStream({
        start(streamController) {
          streamController.enqueue(new TextEncoder().encode("data: ok\n\n"));
          streamController.close();
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    ),
    lease
  );
  assert.equal(controller.activeHeavy, 1);
  assert.equal(await response.text(), "data: ok\n\n");
  assert.equal(controller.activeHeavy, 0);
  lease.release();
  assert.equal(controller.activeHeavy, 0);
});

test("stream cancellation releases the heavyweight lease", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);
  const response = releaseChatAdmissionWhenDone(
    new Response(new ReadableStream({ pull() {} }), {
      headers: { "content-type": "text/event-stream" },
    }),
    lease
  );
  await response.body?.cancel("client disconnected");
  assert.equal(controller.activeHeavy, 0);
});

test("cancelling early keepalive waits for pending handler cleanup before release", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);
  let resolveHandler!: (response: Response) => void;
  const handler = new Promise<Response>((resolve) => {
    resolveHandler = resolve;
  }).then((response) => releaseChatAdmissionWhenDone(response, lease));

  const outer = await withEarlyStreamKeepalive(handler, { thresholdMs: 0, intervalMs: 250 });
  await outer.body?.cancel("client disconnected");
  assert.equal(controller.activeHeavy, 1, "pending handler still owns heavyweight capacity");

  let upstreamCancelled = false;
  resolveHandler(
    new Response(
      new ReadableStream<Uint8Array>({
        pull() {},
        cancel() {
          upstreamCancelled = true;
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    )
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(upstreamCancelled, true);
  assert.equal(controller.activeHeavy, 0, "lease releases only after handler body cancellation");
});

test("pre-aborted early keepalive cancels the eventual handler body and releases admission", async () => {
  const admissionController = new ChatAdmissionController(1);
  const lease = admissionController.tryAcquireHeavy();
  assert.ok(lease);

  const abortController = new AbortController();
  abortController.abort("client already disconnected");

  let resolveHandler!: (response: Response) => void;
  const handler = new Promise<Response>((resolve) => {
    resolveHandler = resolve;
  }).then((response) => releaseChatAdmissionWhenDone(response, lease));

  const outer = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 250,
    signal: abortController.signal,
  });

  let resolveCancelled!: () => void;
  const upstreamCancelled = new Promise<void>((resolve) => {
    resolveCancelled = resolve;
  });
  resolveHandler(
    new Response(
      new ReadableStream<Uint8Array>({
        pull() {},
        cancel() {
          resolveCancelled();
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    )
  );

  const cancelledBeforeTimeout = await Promise.race([
    upstreamCancelled.then(() => true),
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 200)),
  ]);
  assert.equal(cancelledBeforeTimeout, true, "pre-aborted signal must cancel the handler body");
  assert.equal(admissionController.activeHeavy, 0, "pre-abort must not retain admission");
  await outer.body?.cancel();
});

test("handler rejection releases the heavyweight lease", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  await assert.rejects(
    releaseChatAdmissionAfterHandler(Promise.reject(new Error("handler failed")), lease),
    /handler failed/
  );
  assert.equal(controller.activeHeavy, 0);
});

test("pre-aborted keepalive handles a bodyless handler response", async () => {
  const abortController = new AbortController();
  abortController.abort("client already disconnected");

  const outer = await withEarlyStreamKeepalive(
    Promise.resolve(new Response(null, { status: 204 })),
    {
      thresholdMs: 0,
      intervalMs: 250,
      signal: abortController.signal,
    }
  );

  await assert.doesNotReject(outer.text());
});

test("stream read error releases the heavyweight lease", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);
  const response = releaseChatAdmissionWhenDone(
    new Response(
      new ReadableStream({
        start(streamController) {
          streamController.error(new Error("upstream failed"));
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    ),
    lease
  );
  await assert.rejects(response.text(), /upstream failed/);
  assert.equal(controller.activeHeavy, 0);
});
