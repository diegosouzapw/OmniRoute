import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Stream early EOF sibling failover (direct single-model path).
//
// When the upstream opens an SSE stream but closes it before emitting any
// useful frame, the readiness gate surfaces 502 STREAM_EARLY_EOF. The
// bounded same-connection retry makes one plain re-attempt; once it is
// exhausted the request must fail over to a sibling connection instead of
// returning the 502 while an eligible connection is still available.
// No account is ever marked unavailable for an early close (an early close
// is not a bad connection), and STREAM_READINESS_TIMEOUT keeps its
// terminal return (a slow-but-alive upstream must not be retried twice).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-early-eof-failover-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-early-eof-failover-${Date.now()}`;
}

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  await new Promise((resolve) => setImmediate(resolve));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
}

async function seedConnection(name: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
  });
}

// An SSE body that closes with zero non-ping frames: the exact input shape
// the readiness gate turns into 502 STREAM_EARLY_EOF.
function pingOnlyStreamBody(): string {
  return `: keepalive\n\ndata: ${JSON.stringify({ type: "ping" })}\n\n`;
}

function pingOnlyStreamResponse(): Response {
  return new Response(pingOnlyStreamBody(), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function successStreamResponse(content: string): Response {
  return new Response(
    `data: ${JSON.stringify({
      id: "chatcmpl-early-eof-failover",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
    })}\n\ndata: ${JSON.stringify({
      id: "chatcmpl-early-eof-failover",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n\ndata: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function streamRequest(extraHeaders: Record<string, string> = {}) {
  const nonce = `early-eof-failover-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      max_tokens: 16,
      stream: true,
      temperature: 0,
    }),
  });
}

// Every outbound fetch carries the connection's own credential, so the stub
// attributes each dispatch to a connection by its Authorization header.
type DispatchLog = Array<{ auth: string; url: string }>;

function stubFetch(
  dispatches: DispatchLog,
  handler: (_auth: string, callIndex: number) => Response
) {
  globalThis.fetch = (async (url: unknown, init: { headers?: unknown }) => {
    const headers = new Headers((init?.headers ?? {}) as HeadersInit);
    const auth = headers.get("authorization") ?? "";
    const callIndex = dispatches.length;
    dispatches.push({ auth: String(auth), url: String(url) });
    return handler(String(auth), callIndex);
  }) as typeof fetch;
}

function authOf(apiKey: string): string {
  return `Bearer ${apiKey}`;
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("stream early EOF failover", async (t) => {
  await t.test(
    "fails over to the sibling connection after the bounded retry is exhausted",
    async () => {
      const connA = await seedConnection("openai-failover-a", "sk-failover-conn-a");
      const connB = await seedConnection("openai-failover-b", "sk-failover-conn-b");

      const dispatches: DispatchLog = [];
      stubFetch(dispatches, (_auth, callIndex) => {
        // Attempts 1 and 2 close early with zero useful frames (the bounded
        // same-connection retry from #3758); the 3rd dispatch must reach the
        // sibling and succeed so the client never sees the 502. The failover
        // lives on the post-retry terminal path, where the request used to end.
        if (callIndex < 2) return pingOnlyStreamResponse();
        return successStreamResponse("OK");
      });

      // The STREAM warn assertion rides on a leak of the logger's worker-thread
      // transport timing, so it cannot be observed reliably at the route seam.
      // Assert the failover through its stable, load-bearing signals instead:
      // the 3rd dispatch on the sibling, the sibling's selected-connection
      // header, and a 200 with the sibling's content.
      const response = await chatRoute.POST(streamRequest());
      const bodyText = await response.text();

      assert.equal(
        dispatches.length,
        3,
        `expected 3 dispatches (1 + retry + sibling), got ${dispatches.length}`
      );
      assert.equal(dispatches[0]!.auth, authOf("sk-failover-conn-a"));
      assert.equal(
        dispatches[1]!.auth,
        authOf("sk-failover-conn-a"),
        "the bounded retry stays on the same connection"
      );
      assert.equal(
        dispatches[2]!.auth,
        authOf("sk-failover-conn-b"),
        "the exhausted retry must fail over to the sibling connection"
      );
      assert.equal(
        response.status,
        200,
        `expected 200 after sibling failover, got ${response.status}: ${bodyText.slice(0, 300)}`
      );
      assert.equal(
        response.headers.get("X-OmniRoute-Selected-Connection-Id"),
        connB.id,
        "the response must carry the sibling as the selected connection"
      );
      assert.ok(bodyText.length > 0, "the sibling response must carry a body");
      assert.ok(
        !bodyText.includes("STREAM_EARLY_EOF"),
        "the client must never see the early-EOF 502 after failover"
      );
      assert.ok(connA.id.length > 0 && connB.id.length > 0 && connA.id !== connB.id);
    }
  );

  await t.test("returns terminal 502 with a singleton pool", async () => {
    const conn = await seedConnection("openai-singleton", "sk-failover-singleton");

    const dispatches: DispatchLog = [];
    stubFetch(dispatches, () => pingOnlyStreamResponse());

    const response = await chatRoute.POST(streamRequest());
    const bodyText = await response.text();

    // 1 initial + 1 bounded same-connection retry, then the terminal return:
    // no sibling exists, so no 3rd dispatch.
    assert.equal(
      dispatches.length,
      2,
      `expected exactly 2 dispatches on a singleton pool, got ${dispatches.length}`
    );
    assert.equal(
      response.status,
      502,
      `expected terminal 502, got ${response.status}: ${bodyText.slice(0, 300)}`
    );
    const body = JSON.parse(bodyText) as { error?: { code?: string; type?: string } };
    const code = body?.error?.code ?? body?.error?.type ?? "";
    assert.ok(
      code === "STREAM_EARLY_EOF" || code === "bad_gateway",
      `expected a stream-early-EOF 502 body, got code=${code}: ${bodyText.slice(0, 300)}`
    );
    if (code === "bad_gateway") {
      assert.match(
        bodyText,
        /before producing a non-ping SSE event|early/i,
        "a generic-code 502 must still carry the early-EOF message"
      );
    }
    assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), conn.id);
  });

  await t.test("returns terminal 502 with a forced connection", async () => {
    const connA = await seedConnection("openai-forced-a", "sk-failover-forced-a");
    await seedConnection("openai-forced-b", "sk-failover-forced-b");

    const dispatches: DispatchLog = [];
    stubFetch(dispatches, () => pingOnlyStreamResponse());

    const response = await chatRoute.POST(streamRequest({ "x-omniroute-connection": connA.id }));
    const bodyText = await response.text();

    // The forced pin is an operator instruction: the same-connection retry
    // is itself skipped for a forced pin, so the terminal return fires after
    // the single forced dispatch — and it must never silently rotate to the
    // sibling.
    assert.equal(
      dispatches.length,
      1,
      `expected exactly 1 dispatch with a forced pin, got ${dispatches.length}`
    );
    for (const dispatch of dispatches) {
      assert.equal(
        dispatch.auth,
        authOf("sk-failover-forced-a"),
        "every dispatch must stay on the forced connection"
      );
    }
    assert.equal(
      response.status,
      502,
      `expected terminal 502, got ${response.status}: ${bodyText.slice(0, 300)}`
    );
  });

  await t.test("never marks the account unavailable for early EOF", async () => {
    const connA = await seedConnection("openai-nomark-a", "sk-failover-nomark-a");
    const connB = await seedConnection("openai-nomark-b", "sk-failover-nomark-b");

    const dispatches: DispatchLog = [];
    stubFetch(dispatches, (_auth, callIndex) => {
      if (callIndex < 2) return pingOnlyStreamResponse();
      return successStreamResponse("OK");
    });

    const response = await chatRoute.POST(streamRequest());
    await response.text();
    assert.equal(response.status, 200);
    assert.equal(
      dispatches.length,
      3,
      "failover must have happened for the no-marking check to be meaningful"
    );

    // Observable via persisted connection state: a marked account carries a
    // future rateLimitedUntil (cooldown); an early close must leave both
    // connections unmarked.
    const afterA = await providersDb.getProviderConnectionById(connA.id);
    const afterB = await providersDb.getProviderConnectionById(connB.id);
    for (const [label, row] of [
      ["first", afterA],
      ["sibling", afterB],
    ] as const) {
      const rowRecord = row as unknown as Record<string, unknown>;
      const until = (rowRecord?.rateLimitedUntil as string | null) ?? null;
      assert.ok(
        until === null || Number(new Date(String(until)).getTime()) <= Date.now(),
        `expected no cooldown on the ${label} connection after early EOF, got rateLimitedUntil=${until}`
      );
      assert.notEqual(
        rowRecord?.testStatus,
        "unavailable",
        `expected no unavailable status on the ${label} connection after early EOF`
      );
    }
  });

  await t.test(
    "keeps STREAM_READINESS_TIMEOUT terminal even with a sibling available",
    async () => {
      const chatSource = fs.readFileSync(
        new URL("../../src/sse/handlers/chat.ts", import.meta.url),
        "utf8"
      );

      const startMarker = [
        "      if (",
        '        (result.errorType === "stream_timeout" || result.errorType === "stream_early_eof") &&',
        "        !isAntigravityStreamReadinessFailure",
        "      ) {",
      ].join("\n");
      const start = chatSource.indexOf(startMarker);
      assert.notEqual(start, -1, "non-Antigravity stream-failure branch must exist");
      const end = chatSource.indexOf("\n      if (isAntigravityStreamReadinessFailure)", start);
      assert.notEqual(end, -1, "stream-failure branch end marker must exist");
      const branch = chatSource.slice(start, end);

      // The failover gate admits only the terminal early-EOF shape, so the
      // timeout path can never reach the exclude-and-continue: a stalled
      // upstream keeps its terminal return (retrying it would double the
      // latency of a request that is still warming up).
      const gateIndex = branch.indexOf("if (isTerminalStreamEarlyEof && !hasForcedConnection)");
      assert.ok(
        gateIndex >= 0,
        "the sibling-failover gate must exist and pin hasForcedConnection before any mutation"
      );
      const terminalReturn = branch.indexOf("return withSelectedConnectionHeader(");
      assert.ok(terminalReturn >= 0, "the terminal return must remain");
      assert.match(
        branch,
        /if \(isTerminalStreamEarlyEof && !hasForcedConnection\) \{[\s\S]*?excludedConnectionIds\.add\(credentials\.connectionId\)[\s\S]*?continue;/,
        "only the terminal early-EOF path may exclude-and-continue to a sibling"
      );
      const gateToReturn = branch.slice(gateIndex, terminalReturn);
      assert.ok(
        !gateToReturn.includes("stream_timeout"),
        "the timeout path must not pass through the sibling-failover gate"
      );
    }
  );
});
