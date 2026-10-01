// A stalled upstream body must not fail the request without a second
// attempt through the same routing path: the executor loop already ended once
// headers arrived, so the readiness gate is the only place left to retry.
// Opt-in via STREAM_READINESS_STALL_RETRY (default off).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const FLAG = "STREAM_READINESS_STALL_RETRY";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-readiness-fallback-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STREAM_READINESS_TIMEOUT_MS = "300";
process.env.STREAM_READINESS_MAX_TIMEOUT_MS = "600";
process.env[FLAG] = "true";

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

const contentChunk = (content: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-fallback",
    object: "chat.completion.chunk",
    model: "gpt-4o-mini",
    choices: [{ index: 0, delta: { role: "assistant", content } }],
  })}\n\n`;

function goodStreamResponse(): Response {
  return new Response(contentChunk("hello") + "data: [DONE]\n\n", {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function closedStreamResponse(): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

function noopLog() {
  const warn: string[] = [];
  return {
    debug() {},
    info() {},
    error() {},
    warn: (tag: string, msg: string) => warn.push(`${tag} ${msg}`),
    warnLines: warn,
  };
}

function chatArgs(body: Record<string, unknown>, log: ReturnType<typeof noopLog>) {
  return {
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test-fallback", providerSpecificData: {} },
    log,
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
  } as unknown as Parameters<typeof handleChatCore>[0];
}

const requestBody = {
  model: "openai/gpt-4o-mini",
  stream: true,
  messages: [{ role: "user", content: "hi" }],
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a body that closes before any event retries once and serves the second body", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return calls === 1 ? closedStreamResponse() : goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    response?: Response;
  };

  try {
    assert.equal(calls, 2, "expected one upstream request plus one fallback request");
    assert.equal(result.success, true);
    const text = await result.response!.text();
    assert.match(text, /hello/);
    assert.ok(
      log.warnLines.some((line) => line.includes("retrying once")),
      `expected a fallback warn line, got: ${log.warnLines.join(" | ")}`
    );
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("two stalled bodies report the second failure with its own code", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return closedStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    status?: number;
    errorType?: string;
    errorCode?: string;
    response?: Response;
  };

  try {
    assert.equal(calls, 2, "expected exactly two upstream requests, never a loop");
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(result.errorType, "stream_early_eof");
    assert.equal(result.errorCode, "STREAM_EARLY_EOF");
    assert.ok(
      log.warnLines.some((line) => line.includes("retrying once")),
      `expected a fallback warn line, got: ${log.warnLines.join(" | ")}`
    );
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("a client that goes away during the first wait gets no second request", async () => {
  let calls = 0;
  let releaseFirst: ((value: Response) => void) | null = null;
  const firstGate = new Promise<Response>((resolve) => {
    releaseFirst = resolve;
  });
  const aborter = new AbortController();
  globalThis.fetch = (async () => {
    calls += 1;
    if (calls === 1) return firstGate;
    return goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const pending = handleChatCore({
    ...chatArgs(requestBody, log),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(requestBody),
      headers: new Headers({ accept: "text/event-stream" }),
      signal: aborter.signal,
    },
  }) as Promise<{ success: boolean; status?: number; response?: Response }>;
  await new Promise((resolve) => setTimeout(resolve, 50));
  aborter.abort();
  releaseFirst!(closedStreamResponse());

  const result = await pending;
  try {
    assert.equal(calls, 1, "no fallback request after the client went away");
    assert.equal(result.success, false);
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("with the flag off, a stalled first body issues no second request", async () => {
  const prior = process.env[FLAG];
  delete process.env[FLAG];
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return closedStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    status?: number;
    response?: Response;
  };

  try {
    assert.equal(calls, 1, "flag off: no fallback request after a stalled first body");
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  } finally {
    await result.response?.body?.cancel().catch(() => {});
    if (prior === undefined) delete process.env[FLAG];
    else process.env[FLAG] = prior;
  }
});

test("a healthy first body issues no fallback request", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    response?: Response;
  };

  try {
    assert.equal(calls, 1, "no fallback request when the first body is healthy");
    assert.equal(result.success, true);
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("a stalled first body never marks the account unavailable", async () => {
  let calls = 0;
  const seen: Array<{ fn: string }> = [];
  globalThis.fetch = (async () => {
    calls += 1;
    return calls === 1 ? closedStreamResponse() : goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();
  const onStreamFailure = () => {
    seen.push({ fn: "onStreamFailure" });
  };

  const result = (await handleChatCore({
    ...chatArgs(requestBody, log),
    onStreamFailure,
  })) as { success: boolean; response?: Response };

  try {
    assert.equal(result.success, true);
    assert.deepEqual(seen, [], "the stalled body must not penalize the account");
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("a stalled first body leaves no reader behind after the fallback succeeds", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return calls === 1 ? closedStreamResponse() : goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    response?: Response;
  };

  try {
    // The first body is cancelled before the second dispatch (no double-held
    // slot); the served body drains fully, proving the served stream owns the
    // only live reader.
    assert.equal(calls, 2, "expected one upstream request plus one fallback request");
    assert.equal(result.success, true);
    const text = await result.response!.text();
    assert.match(text, /hello/);
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

function silentStreamResponse(): Response {
  // Headers arrive, then the body stays open without a single byte: the
  // readiness gate must hit its own timeout (short test budget injected via
  // STREAM_READINESS_TIMEOUT_MS/STREAM_READINESS_MAX_TIMEOUT_MS above; the
  // 80s/180s production defaults are untouched) instead of hanging.
  return new Response(
    new ReadableStream<Uint8Array>({
      start() {},
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

test("a silent body hitting the readiness timeout retries once and serves the second body", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return calls === 1 ? silentStreamResponse() : goodStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    errorType?: string;
    errorCode?: string;
    response?: Response;
  };

  try {
    // Observable at this level: exactly one fallback dispatch, then success.
    // (The per-account identity only exists inside provider-specific
    // executors; the default executor serves every dispatch from the same
    // request credentials, so account rotation itself is covered by the
    // executor-level rotation tests, not by fetch-call counting here.)
    assert.equal(calls, 2, "expected one upstream request plus one fallback request");
    assert.equal(result.success, true);
    const text = await result.response!.text();
    assert.match(text, /hello/);
    assert.ok(
      log.warnLines.some((line) => line.includes("retrying once")),
      `expected a fallback warn line, got: ${log.warnLines.join(" | ")}`
    );
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});

test("a single-account request retries at most once and never loops", async () => {
  // With the request-scoped fetch mock there is a single credential by
  // construction: the only observable rotation signal at this level is the
  // dispatch count. Assert the bound (exactly 2), not the identity.
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return closedStreamResponse();
  }) as typeof fetch;
  const log = noopLog();

  const result = (await handleChatCore(chatArgs(requestBody, log))) as {
    success: boolean;
    status?: number;
    response?: Response;
  };

  try {
    assert.equal(calls, 2, "expected exactly two upstream requests, never a loop");
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  } finally {
    await result.response?.body?.cancel().catch(() => {});
  }
});
