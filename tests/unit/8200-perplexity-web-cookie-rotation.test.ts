// Issue #8200: perplexity-web must persist Set-Cookie session-token rotations
// via onCredentialsRefreshed using the shared mergeRefreshedCookie +
// buildSessionCookieHeader in open-sse/utils/nextAuthCookie.ts).
import test from "node:test";
import assert from "node:assert/strict";

const { mergeRefreshedCookie, buildSessionCookieHeader } =
  await import("../../open-sse/utils/nextAuthCookie.ts");
const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

function mockPplxStream(answer = "Hello, world!") {
  const encoder = new TextEncoder();
  const body =
    `event: message\r\ndata: ${JSON.stringify({
      backend_uuid: "uuid-8200",
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: { chunks: [answer], progress: "DONE" },
        },
      ],
      status: "COMPLETED",
    })}\r\n\r\n` + "event: end_of_stream\r\n\r\n";
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

test("nextAuthCookie: buildSessionCookieHeader passes full DevTools cookie blob verbatim", () => {
  const blob =
    "__Secure-next-auth.session-token.0=partA; __Secure-next-auth.session-token.1=partB; cf_clearance=CF";
  assert.equal(buildSessionCookieHeader(blob), blob);
  assert.equal(buildSessionCookieHeader(`Cookie: ${blob}`), blob);
});

test("nextAuthCookie: buildSessionCookieHeader wraps bare session-token value", () => {
  assert.equal(
    buildSessionCookieHeader("eyJhbGciOiJIUzI1NiJ9"),
    "__Secure-next-auth.session-token=eyJhbGciOiJIUzI1NiJ9"
  );
});

test("nextAuthCookie: mergeRefreshedCookie preserves cf_clearance and drops stale chunks", () => {
  const merged = mergeRefreshedCookie(
    "__Secure-next-auth.session-token.0=OLD0; __Secure-next-auth.session-token.1=OLD1; cf_clearance=CFCLEAR",
    "__Secure-next-auth.session-token.0=NEW0; Path=/; HttpOnly, __Secure-next-auth.session-token.1=NEW1; Path=/; HttpOnly"
  );
  assert.ok(merged);
  assert.match(merged, /session-token\.0=NEW0/);
  assert.match(merged, /session-token\.1=NEW1/);
  assert.match(merged, /cf_clearance=CFCLEAR/);
  assert.doesNotMatch(merged, /OLD0/);
  assert.doesNotMatch(merged, /OLD1/);
});

test("#8200: PerplexityWebExecutor persists rotated session-token via onCredentialsRefreshed", async () => {
  const captured: { cookie?: string; headers?: Record<string, string> } = {};
  let persisted: Record<string, unknown> | null = null;

  __setTlsFetchOverrideForTesting(async (_url, opts) => {
    captured.cookie = opts.headers?.Cookie as string | undefined;
    captured.headers = opts.headers as Record<string, string>;
    const headers = new Headers({
      "Content-Type": "text/event-stream",
      "set-cookie": "__Secure-next-auth.session-token=ROTATED-VALUE; Path=/; HttpOnly; Secure",
    });
    return {
      status: 200,
      headers,
      text: null,
      body: mockPplxStream(),
    };
  });

  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "old-cookie-value" },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: async (creds) => {
        persisted = creds as Record<string, unknown>;
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(
      captured.cookie,
      "__Secure-next-auth.session-token=old-cookie-value",
      "bare apiKey must be normalized for the upstream Cookie header"
    );
    assert.ok(
      persisted,
      "onCredentialsRefreshed must fire when Set-Cookie rotates the session token"
    );
    assert.equal(
      persisted.apiKey,
      "__Secure-next-auth.session-token=ROTATED-VALUE",
      "rotated cookie must round-trip as a full cookie line for DB persistence"
    );
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("#8200: PerplexityWebExecutor preserves cf_clearance when session-token rotates", async () => {
  let persisted: Record<string, unknown> | null = null;

  __setTlsFetchOverrideForTesting(async () => {
    const headers = new Headers({
      "Content-Type": "text/event-stream",
      "set-cookie":
        "__Secure-next-auth.session-token.0=NEW0; Path=/; HttpOnly, " +
        "__Secure-next-auth.session-token.1=NEW1; Path=/; HttpOnly",
    });
    return {
      status: 200,
      headers,
      text: null,
      body: mockPplxStream(),
    };
  });

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: {
        apiKey: "__Secure-next-auth.session-token=UNCHUNKED_OLD; cf_clearance=CFCLEAR",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: async (creds) => {
        persisted = creds as Record<string, unknown>;
      },
    });

    assert.ok(persisted);
    const apiKey = String(persisted.apiKey);
    assert.match(apiKey, /cf_clearance=CFCLEAR/, "non-session cookies must survive rotation merge");
    assert.match(apiKey, /session-token\.0=NEW0/);
    assert.match(apiKey, /session-token\.1=NEW1/);
    assert.doesNotMatch(apiKey, /UNCHUNKED_OLD/);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("#8200: PerplexityWebExecutor skips onCredentialsRefreshed when Set-Cookie is absent", async () => {
  let persisted = false;

  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "text/event-stream" }),
    text: null,
    body: mockPplxStream(),
  }));

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "stable-cookie" },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: async () => {
        persisted = true;
      },
    });

    assert.equal(persisted, false, "callback must not fire without a session-token rotation");
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});
