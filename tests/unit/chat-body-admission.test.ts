// #7846: atomic, actual-byte-bounded admission before chat parsing.
import test from "node:test";
import assert from "node:assert/strict";

const admissionModule = await import("../../src/shared/middleware/chatBodyAdmission.ts");
const {
  admitChatRequest,
  admitChatStructure,
  ChatAdmissionController,
  CHAT_HARD_MAX_MESSAGES,
  releaseChatAdmissionAfterHandler,
  releaseChatAdmissionWhenDone,
  resolveSelfLoopBearer,
} = admissionModule;
const { withEarlyStreamKeepalive } = await import("../../open-sse/utils/earlyStreamKeepalive.ts");

/**
 * Save/restore the env-var keys that `resolveSelfLoopBearer` reads so tests can
 * set them without leaking into the process (and without breaking the existing
 * "sk_real_key must NOT bypass" test that assumes the sentinel is the fallback).
 */
const SELF_LOOP_ENV_KEYS = ["OMNIROUTE_API_KEY", "ROUTER_API_KEY"] as const;
function withSelfLoopEnv(env: Partial<Record<(typeof SELF_LOOP_ENV_KEYS)[number], string>>) {
  const saved = new Map<string, string | undefined>();
  for (const key of SELF_LOOP_ENV_KEYS) {
    saved.set(key, process.env[key]);
    if (env[key] === undefined) delete process.env[key];
    else process.env[key] = env[key];
  }
  return () => {
    for (const key of SELF_LOOP_ENV_KEYS) {
      const value = saved.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

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

test("a byte-light request above the message threshold acquires heavyweight capacity", async () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    null,
    { controller, maxMessages: 10, heavyMessages: 2, heavyTools: 10, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("a byte-light request above the tool threshold is rejected when heavy capacity is busy", async () => {
  const controller = new ChatAdmissionController(1);
  const occupied = controller.tryAcquireHeavy();
  assert.ok(occupied);

  const result = admitChatStructure(
    { messages: [], tools: [{ type: "function" }, { type: "function" }] },
    null,
    { controller, maxMessages: 10, heavyMessages: 10, heavyTools: 2, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("retry-after"), "1");
  assert.equal((await result.response.json()).error.code, "chat_admission_busy");
  occupied.release();
});

test("an opt-in history cap still returns the structured compact-required 413", async () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    { messages: Array.from({ length: 3 }, () => ({ role: "user", content: "x" })) },
    null,
    { controller, maxMessages: 2, heavyMessages: 1, heavyTools: 10, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 413);
  const payload = await result.response.json();
  assert.equal(payload.error.code, "chat_history_too_large");
  assert.equal(payload.error.reason, "message_limit");
  assert.equal(controller.activeHeavy, 0);
});

// A message-count ceiling is deployment policy, not a universal default. With no cap
// configured, a long conversation must reach compression and the bounded heavyweight path
// rather than a terminal 413 the client cannot retry out of.
test("no history cap is enforced by default; long conversations are admitted", async () => {
  assert.equal(CHAT_HARD_MAX_MESSAGES, 0, "the shipped default must not cap history");

  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    { messages: Array.from({ length: 5_000 }, () => ({ role: "user", content: "x" })) },
    null,
    { controller, heavyMessages: 200, heavyTools: 64, heavyTokens: 32_000 }
  );

  assert.equal(result.admit, true, "a 5,000-message conversation must not be rejected outright");
  if (!result.admit) return;
  assert.equal(controller.activeHeavy, 1, "it is still admitted through heavyweight capacity");
  result.lease?.release();
});

test("an uncapped oversized conversation still yields to occupied heavyweight capacity", async () => {
  const controller = new ChatAdmissionController(1);
  const occupied = controller.tryAcquireHeavy();
  assert.ok(occupied);

  const result = admitChatStructure(
    { messages: Array.from({ length: 5_000 }, () => ({ role: "user", content: "x" })) },
    null,
    { controller, maxMessages: 0, heavyMessages: 200, heavyTools: 64, heavyTokens: 32_000 }
  );

  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 503, "backpressure is retryable, not a terminal 413");
  assert.equal(result.response.headers.get("retry-after"), "1");
  const payload = await result.response.json();
  assert.equal(payload.error.code, "chat_admission_busy");
  assert.equal(payload.error.reason, "structure_limit");
  occupied.release();
});

test("maxMessages: 0 explicitly disables the history cap", () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    { messages: Array.from({ length: 3 }, () => ({ role: "user", content: "x" })) },
    null,
    { controller, maxMessages: 0, heavyMessages: 1, heavyTools: 10, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, true);
  if (result.admit) result.lease?.release();
});

test("a conservative token estimate classifies string messages and tool schemas as heavy", () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    {
      messages: [{ role: "user", content: "abcdefgh" }],
      tools: [{ type: "function", function: { name: "tool", description: "abcdefgh" } }],
    },
    null,
    { controller, maxMessages: 10, heavyMessages: 10, heavyTools: 10, heavyTokens: 4 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
});

test("exhausting the bounded structural inspection is conservatively heavyweight", () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    {
      messages: [
        {
          role: "user",
          content: Array.from({ length: 10_001 }, () => ({ value: 0 })),
        },
      ],
    },
    null,
    { controller, maxMessages: 10, heavyMessages: 10, heavyTools: 10, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
});

test("tool-schema property names contribute to the conservative token estimate", () => {
  const controller = new ChatAdmissionController(1);
  const properties = Object.fromEntries(
    Array.from({ length: 5 }, (_, index) => [`${index}${"k".repeat(99)}`, {}])
  );
  const result = admitChatStructure(
    { messages: [], tools: [{ function: { parameters: { properties } } }] },
    null,
    { controller, maxMessages: 10, heavyMessages: 10, heavyTools: 10, heavyTokens: 100 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
});

test("non-ASCII strings use a conservative UTF-8 token estimate", () => {
  const controller = new ChatAdmissionController(1);
  const result = admitChatStructure(
    { messages: [{ role: "user", content: "漢".repeat(100) }] },
    null,
    { controller, maxMessages: 10, heavyMessages: 10, heavyTools: 10, heavyTokens: 100 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
});

test("wide objects exhaust bounded inspection without materializing all property values", () => {
  const controller = new ChatAdmissionController(1);
  const wide = Object.fromEntries(Array.from({ length: 10_001 }, (_, index) => [`k${index}`, 0]));
  const result = admitChatStructure({ messages: [{ role: "user", content: wide }] }, null, {
    controller,
    maxMessages: 10,
    heavyMessages: 10,
    heavyTools: 10,
    heavyTokens: 10_000,
  });

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) result.lease?.release();
});

test("an existing byte-heavy lease is reused for structure-heavy admission", () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const result = admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    lease,
    { controller, maxMessages: 10, heavyMessages: 2, heavyTools: 10, heavyTokens: 10_000 }
  );

  assert.equal(result.admit, true);
  assert.equal(controller.activeHeavy, 1);
  if (result.admit) assert.equal(result.lease, lease);
  lease.release();
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

// ── internal self-loop admission bypass (vision-bridge describe call) ──

function selfLoopChatRequest(
  body: string,
  contentLength: string | null = String(body.length)
): Request {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-omniroute-admission-bypass": "internal",
    // Follows the resolved self-loop bearer (the sentinel in these tests — each
    // test wraps itself in withSelfLoopEnv({}) so it is deterministic even when
    // the developer's shell has OMNIROUTE_API_KEY set).
    authorization: `Bearer ${resolveSelfLoopBearer()}`,
  };
  if (contentLength !== null) headers["content-length"] = contentLength;
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers,
    body,
  });
}

test("internal self-loop describe call bypasses heavyweight admission while parent holds the lease", async () => {
  const restore = withSelfLoopEnv({});
  try {
    const controller = new ChatAdmissionController(1);
    // Parent request already holds the single heavyweight lease (large Zoo Code payload).
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    // Large body (base64 image) would normally 503 chat_admission_busy — the bypass
    // skips the reservation, admits, and does NOT consume a second lease.
    const body = JSON.stringify({
      model: "cmd/xiaomi/mimo-v2.5",
      messages: [{ role: "user", content: "describe" + "x".repeat(512 * 1024) }],
    });
    const result = await admitChatRequest(selfLoopChatRequest(body), {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
    });

    assert.equal(result.admit, true);
    // Still only one heavy (the parent's) — bypass did not reserve.
    assert.equal(controller.activeHeavy, 1);
    // The byte stage returns a sentinel lease (not null) so the route's structural
    // stage treats the base64-heavy describe body as covered instead of trying to
    // re-acquire the busy capacity and 503ing chat_admission_busy.
    assert.ok(result.lease, "bypass must return a sentinel lease, not null");
    if (result.lease) assert.equal(result.lease.released, true);
    if (result.admit) assert.equal(await result.request.text(), body);
    parentLease.release();
    assert.equal(controller.activeHeavy, 0);
  } finally {
    restore();
  }
});

test("bypass describe call passes the structural stage while the parent holds the lease", async () => {
  const restore = withSelfLoopEnv({});
  try {
    const controller = new ChatAdmissionController(1);
    // Parent Zoo Code request (5 msgs + 13 tools) holds the single heavyweight lease.
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    // Base64-heavy describe body that the structural stage would normally classify
    // as heavy (> CHAT_HEAVY_ESTIMATED_TOKENS via the base64 string) and reject
    // with 503 chat_admission_busy when capacity is exhausted.
    const body = JSON.stringify({
      model: "cmd/xiaomi/mimo-v2.5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64," + "A".repeat(512 * 1024) },
            },
            { type: "text", text: "Describe this image." },
          ],
        },
      ],
    });

    // Byte stage (internal bypass) → admitted without consuming the busy capacity.
    const admission = await admitChatRequest(selfLoopChatRequest(body), {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
    });
    assert.equal(admission.admit, true);
    assert.equal(controller.activeHeavy, 1); // parent's lease only
    if (!admission.admit) throw new Error("expected admit");

    // Structural stage (the route's admitChatStructure(parsedBody, admission.lease)):
    // the sentinel lease must prevent the heavy body from re-acquiring → no 503.
    const structural = admitChatStructure(JSON.parse(body), admission.lease, { controller });
    assert.equal(structural.admit, true);
    assert.equal(controller.activeHeavy, 1);

    parentLease.release();
    assert.equal(controller.activeHeavy, 0);
  } finally {
    restore();
  }
});

test("internal bypass still enforces the hard max byte bound", async () => {
  const restore = withSelfLoopEnv({});
  try {
    const controller = new ChatAdmissionController(1);
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    const result = await admitChatRequest(
      selfLoopChatRequest(JSON.stringify({ a: "x" }), "99999999999"),
      { controller, largeBodyBytes: 32, hardMaxBytes: 1024 }
    );
    assert.equal(result.admit, false);
    if (!result.admit) {
      assert.equal(result.response.status, 413);
      assert.equal((await result.response.json()).error.code, "PAYLOAD_TOO_LARGE");
    }
    parentLease.release();
  } finally {
    restore();
  }
});

test("external clients cannot use the bypass header without a trusted self-loop bearer", async () => {
  const restore = withSelfLoopEnv({});
  try {
    const controller = new ChatAdmissionController(1);
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    // Header set but NOT with a trusted self-loop credential (sentinel/env key)
    // → treated as a normal heavy request.
    const body = JSON.stringify({
      model: "cmd/xiaomi/mimo-v2.5",
      messages: [{ role: "user", content: "x".repeat(512 * 1024) }],
    });
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "x-omniroute-admission-bypass": "internal",
      authorization: "Bearer sk_real_key",
      "content-length": String(body.length),
    };
    const request = new Request("http://x/v1/chat/completions", {
      method: "POST",
      headers,
      body,
    });
    const result = await admitChatRequest(request, {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
    });

    // Unknown key + bypass header must NOT bypass — capacity is exhausted → 503.
    assert.equal(result.admit, false);
    if (!result.admit) assert.equal(result.response.status, 503);
    parentLease.release();
  } finally {
    restore();
  }
});

// ── self-loop bearer resolution (env-key aware, #1350) ─────────────────

test("resolveSelfLoopBearer falls back to sk_omniroute when no env key is set", () => {
  const restore = withSelfLoopEnv({});
  try {
    assert.equal(resolveSelfLoopBearer(), "sk_omniroute");
  } finally {
    restore();
  }
});

test("resolveSelfLoopBearer prefers OMNIROUTE_API_KEY over ROUTER_API_KEY", () => {
  const restore = withSelfLoopEnv({
    OMNIROUTE_API_KEY: "omni-key",
    ROUTER_API_KEY: "router-key",
  });
  try {
    assert.equal(resolveSelfLoopBearer(), "omni-key");
  } finally {
    restore();
  }
});

test("resolveSelfLoopBearer uses ROUTER_API_KEY when OMNIROUTE_API_KEY is unset", () => {
  const restore = withSelfLoopEnv({ ROUTER_API_KEY: "router-key" });
  try {
    assert.equal(resolveSelfLoopBearer(), "router-key");
  } finally {
    restore();
  }
});

test("env-key bearer is honored as a self-loop admission bypass (REQUIRE_API_KEY deployment)", async () => {
  const restore = withSelfLoopEnv({ OMNIROUTE_API_KEY: "env-key" });
  try {
    const controller = new ChatAdmissionController(1);
    // Parent holds the single heavyweight lease.
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    const body = JSON.stringify({
      model: "cmd/xiaomi/mimo-v2.5",
      messages: [{ role: "user", content: "x".repeat(512 * 1024) }],
    });
    const request = new Request("http://x/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-admission-bypass": "internal",
        authorization: "Bearer env-key",
        "content-length": String(body.length),
      },
      body,
    });
    const result = await admitChatRequest(request, {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
    });

    assert.equal(result.admit, true, "env-key describe call must bypass when capacity is busy");
    assert.equal(controller.activeHeavy, 1, "bypass must not reserve a second lease");
    parentLease.release();
  } finally {
    restore();
  }
});

test("sk_omniroute sentinel is rejected once an env key is configured (REQUIRE_API_KEY hardening)", async () => {
  const restore = withSelfLoopEnv({ OMNIROUTE_API_KEY: "env-key" });
  try {
    const controller = new ChatAdmissionController(1);
    // Parent holds the single heavyweight lease → capacity exhausted.
    const parentLease = controller.tryAcquireHeavy();
    assert.ok(parentLease);

    const body = JSON.stringify({ model: "cmd/xiaomi/mimo-v2.5", messages: [] });
    // The sentinel is a well-known public value; in a REQUIRE_API_KEY=true
    // deployment the ONLY trusted self-loop credential is the operator's env
    // key. Presenting the sentinel must NOT bypass — otherwise anyone who knows
    // the sentinel could bypass admission on a hardened deployment.
    const request = new Request("http://x/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-admission-bypass": "internal",
        authorization: "Bearer sk_omniroute",
        "content-length": String(body.length),
      },
      body,
    });
    const result = await admitChatRequest(request, {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
    });

    assert.equal(result.admit, false, "sentinel must not bypass when an env key is configured");
    if (!result.admit) assert.equal(result.response.status, 503);
    parentLease.release();
  } finally {
    restore();
  }
});
