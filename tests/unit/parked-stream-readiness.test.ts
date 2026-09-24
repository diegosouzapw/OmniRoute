import test from "node:test";
import assert from "node:assert/strict";

import { ensureStreamReadiness, isParkedResponse } from "../../open-sse/utils/streamReadiness.ts";
import { PARK_PING_FRAME, runParkAndReplay } from "../../open-sse/executors/opencodeParkResume.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";
import type { RotatableAccount } from "../../open-sse/executors/accountRotation.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const REPLAY_JSON = JSON.stringify({
  id: "chatcmpl-park",
  object: "chat.completion",
  created: 0,
  model: "muse-spark",
  choices: [{ index: 0, message: { role: "assistant", content: "hello" }, finish_reason: "stop" }],
});

function sseResponse(chunks: string[], extraHeaders?: Record<string, string>): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", ...(extraHeaders ?? {}) },
  });
}

function rawResponse(bodyText: string): Response {
  return new Response(bodyText, {
    status: 429,
    headers: { "Content-Type": "application/json" },
  });
}

type TestAccount = RotatableAccount & { proxy: null };

function testAccount(): TestAccount {
  return { fingerprint: "a".repeat(32), cooldownUntil: 0, consecutiveFails: 0, proxy: null };
}

function testInput(): ExecuteInput {
  return {
    model: "muse-spark",
    body: {},
    stream: true,
    credentials: { apiKey: null } as unknown as ExecuteInput["credentials"],
    signal: null,
    log: null,
  };
}

const noopLog = { debug() {}, info() {}, warn() {}, error() {} } as unknown as ExecuteInput["log"];

async function readAllText(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const parts: string[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) parts.push(decoder.decode(value, { stream: true }));
    }
    parts.push(decoder.decode());
    return parts.join("");
  } finally {
    reader.releaseLock();
  }
}

// 1. Parked stream (marked, pings, then valid data) passes the guard.
test("parked marked stream with pings then data passes readiness", async () => {
  const parked = await runParkAndReplay(
    {
      accounts: [testAccount()],
      execute: async () => ({ response: rawResponse(REPLAY_JSON) }),
      markSuccess: () => {},
      sleep: async () => true,
    },
    testInput(),
    1000,
    { response: rawResponse(JSON.stringify({ error: { message: "busy" } })) },
    noopLog,
    "cid "
  );
  assert.ok(parked !== null);
  if (parked === null) assert.fail("expected parked result");
  let guardInput: Response | null = null;
  try {
    assert.equal(isParkedResponse(parked.response), true);
    guardInput = parked.response;
    const result = await ensureStreamReadiness(guardInput, {
      timeoutMs: 500,
      maxTimeoutMs: 2000,
    });
    try {
      assert.equal(result.ok, true);
      if (!result.ok) assert.fail("parked stream must pass readiness");
      assert.equal(result.response.status, 200);
      const text = await readAllText(result.response);
      assert.match(text, /:ping/);
      assert.match(text, /data:/);
      assert.ok(text.indexOf(":ping") < text.indexOf("data:"), "ping-then-data order kept");
    } finally {
      if (!result.ok) await result.response.body?.cancel().catch(() => {});
    }
  } finally {
    if (guardInput === null) await parked.response.body?.cancel().catch(() => {});
  }
});

// 2. Same pings without the mark still fail (guard not weakened).
test("unmarked silent stream with identical pings still fails with 502", async () => {
  const response = sseResponse([PARK_PING_FRAME, PARK_PING_FRAME]);
  const result = await ensureStreamReadiness(response, { timeoutMs: 100, maxTimeoutMs: 200 });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("silent stream must remain a readiness failure");
    assert.equal(result.code, "STREAM_EARLY_EOF");
    assert.equal(result.response.status, 502);
  } finally {
    if (result.ok) await result.response.body?.cancel().catch(() => {});
  }
});

// 3. Ceiling intact: marked parked stream with no data past the ceiling times out.
test("parked marked stream without data past the ceiling still times out", async () => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(PARK_PING_FRAME));
      // Never close and never send data: the guard must hit the ceiling.
    },
  });
  const response = new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "x-omniroute-parked-stream": "transient",
    },
  });
  const result = await ensureStreamReadiness(response, { timeoutMs: 50, maxTimeoutMs: 80 });
  try {
    assert.equal(result.ok, false);
    if (result.ok) assert.fail("expected ceiling timeout");
    assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
    assert.equal(result.response.status, 504);
  } finally {
    if (result.ok) await result.response.body?.cancel().catch(() => {});
    else await response.body?.cancel().catch(() => {});
  }
});

// 4. Marker survives a header rebuild but is stripped from the ready response (P3).
test("marker survives header rebuild and is stripped from the ready response", async () => {
  const parked = await runParkAndReplay(
    {
      accounts: [testAccount()],
      execute: async () => ({ response: rawResponse(REPLAY_JSON) }),
      markSuccess: () => {},
      sleep: async () => true,
    },
    testInput(),
    1000,
    { response: rawResponse(JSON.stringify({ error: { message: "busy" } })) },
    noopLog,
    "cid "
  );
  assert.ok(parked !== null);
  if (parked === null) assert.fail("expected parked result");
  try {
    const rebuilt = new Response(parked.response.body, {
      status: parked.response.status,
      statusText: parked.response.statusText,
      headers: parked.response.headers,
    });
    assert.equal(isParkedResponse(rebuilt), true);
    const result = await ensureStreamReadiness(rebuilt, { timeoutMs: 500, maxTimeoutMs: 2000 });
    try {
      assert.equal(result.ok, true);
      if (!result.ok) assert.fail("rebuilt parked stream must pass readiness");
      assert.equal(result.response.headers.get("x-omniroute-parked-stream"), null);
      await result.response.body?.cancel().catch(() => {});
    } finally {
      if (!result.ok) await result.response.body?.cancel().catch(() => {});
    }
  } finally {
    // Body was transferred to `rebuilt`; nothing left to cancel here.
  }
});

// 5. Chat-completion JSON fallback converts to valid SSE frames, order kept.
test("chat-completion JSON fallback converts to valid SSE frames", async () => {
  const parked = await runParkAndReplay(
    {
      accounts: [],
      execute: async () => {
        throw new Error("must not dispatch");
      },
      markSuccess: () => {},
      sleep: async () => true,
    },
    testInput(),
    1000,
    { response: rawResponse(REPLAY_JSON) },
    noopLog,
    "cid "
  );
  assert.ok(parked !== null);
  if (parked === null) assert.fail("expected parked result");
  try {
    const result = await ensureStreamReadiness(parked.response, {
      timeoutMs: 500,
      maxTimeoutMs: 2000,
    });
    try {
      assert.equal(result.ok, true);
      if (!result.ok) assert.fail("converted fallback must pass readiness");
      const text = await readAllText(result.response);
      assert.match(text, /:ping/);
      assert.match(text, /data:/);
      assert.ok(text.indexOf(":ping") < text.indexOf("data:"), "ping-then-data order kept");
    } finally {
      if (!result.ok) await result.response.body?.cancel().catch(() => {});
    }
  } finally {
    // Body transferred to the guard; nothing left to cancel here.
  }
});

// 6. Non-convertible 429 JSON fallback surfaces one error data frame, order kept.
// Note: an error-only frame is deliberately NOT "ready" (readiness treats it
// as no usable output), so this reads the parked body directly instead of
// going through the readiness gate.
test("non-convertible error fallback surfaces a single error data frame", async () => {
  const parked = await runParkAndReplay(
    {
      accounts: [],
      execute: async () => {
        throw new Error("must not dispatch");
      },
      markSuccess: () => {},
      sleep: async () => true,
    },
    testInput(),
    1000,
    { response: rawResponse(JSON.stringify({ error: { message: "quota hit", code: 429 } })) },
    noopLog,
    "cid "
  );
  assert.ok(parked !== null);
  if (parked === null) assert.fail("expected parked result");
  try {
    const text = await readAllText(parked.response);
    assert.match(text, /:ping/);
    assert.ok(text.indexOf(":ping") < text.indexOf("data:"), "ping-then-data order kept");
    const lines = text.split("\n").filter((line) => line.length > 0);
    const dataLines = lines.filter((line) => line.startsWith("data:"));
    assert.equal(dataLines.length, 1, `exactly one data frame, got: ${text}`);
    for (const line of lines) {
      assert.ok(
        line.startsWith("data:") || line.startsWith(":"),
        `only data or comment lines, got: ${line}`
      );
      assert.ok(!line.startsWith("event:"), `no event line, got: ${line}`);
    }
    const payload = JSON.parse(dataLines[0].slice("data:".length));
    assert.ok(
      typeof payload?.error?.message === "string" && payload.error.message.length > 0,
      `error.message present, got: ${dataLines[0]}`
    );
  } finally {
    await parked.response.body?.cancel().catch(() => {});
  }
});
