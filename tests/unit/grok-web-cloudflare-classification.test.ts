import test from "node:test";
import assert from "node:assert/strict";
import {
  __setTlsFetchOverrideForTesting,
  type TlsFetchResult,
} from "../../open-sse/services/grokTlsClient.ts";
import { __setGrokClearanceAcquireOverrideForTesting } from "../../open-sse/services/grokClearance.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const {
  GrokWebExecutor,
  classifyGrokNullBodyError,
  resolveGrokNullBodyTlsResult,
} = await import("../../open-sse/executors/grok-web.ts");

// ─── Fixtures ───────────────────────────────────────────────────────────────

const CF_CHALLENGE_BODY = `
<!DOCTYPE html>
<html>
  <head><title>Just a moment...</title></head>
  <body>
    <script>window._cf_chl_opt = { cvId: "3" };</script>
    Checking your browser before accessing grok.com — challenges.cloudflare.com
  </body>
</html>
`;

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

// ─── Step 1: pure classification ───────────────────────────────────────────

test("classifyGrokNullBodyError: Cloudflare anti-bot body + 403 -> cloudflare_challenge", () => {
  const result = classifyGrokNullBodyError(403, CF_CHALLENGE_BODY);
  assert.equal(result.type, "cloudflare_challenge");
  assert.equal(result.code, "cf_mitigated_challenge");
  assert.notEqual(result.type, "authentication_error");
  assert.match(result.message, /cloudflare/i);
  assert.match(result.message, /residential/i);
});

test("classifyGrokNullBodyError: 401 with a normal (non-CF) body -> authentication_error", () => {
  const result = classifyGrokNullBodyError(401, NORMAL_AUTH_FAILURE_BODY);
  assert.equal(result.type, "authentication_error");
  assert.match(result.message, /re-paste your sso cookie/i);
});

test("classifyGrokNullBodyError: 403 with a normal (non-CF) body -> authentication_error", () => {
  const result = classifyGrokNullBodyError(403, NORMAL_AUTH_FAILURE_BODY);
  assert.equal(result.type, "authentication_error");
});

test("classifyGrokNullBodyError: 429 -> rate_limit_error (regression guard)", () => {
  const result = classifyGrokNullBodyError(429, RATE_LIMIT_BODY);
  assert.equal(result.type, "rate_limit_error");
  assert.match(result.message, /rate limited/i);
});

test("classifyGrokNullBodyError: other status -> generic upstream_error", () => {
  const result = classifyGrokNullBodyError(500, "internal error");
  assert.equal(result.type, "upstream_error");
  assert.match(result.message, /HTTP 500/);
});

test("classifyGrokNullBodyError: null/undefined text never misclassifies as Cloudflare", () => {
  assert.equal(classifyGrokNullBodyError(401, null).type, "authentication_error");
  assert.equal(classifyGrokNullBodyError(401, undefined).type, "authentication_error");
});

// ─── Step 1 wired end-to-end through the executor ──────────────────────────

test("executor: Cloudflare challenge on non-streaming body surfaces cloudflare_challenge (not authentication_error)", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  }));

  const executor = new GrokWebExecutor();
  const result = await executor.execute(baseInput());
  assert.equal(result.response.status, 403);
  const json = await result.response.json();
  assert.equal(json.error.type, "cloudflare_challenge");
  assert.equal(json.error.code, "cf_mitigated_challenge");
});

test("executor: expired SSO cookie (401, normal body) still surfaces authentication_error", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 401,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: NORMAL_AUTH_FAILURE_BODY,
    body: null,
  }));

  const executor = new GrokWebExecutor();
  const result = await executor.execute(baseInput());
  assert.equal(result.response.status, 401);
  const json = await result.response.json();
  assert.equal(json.error.type, "authentication_error");
});

test("executor: 429 still surfaces rate_limit_error (regression guard)", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 429,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: RATE_LIMIT_BODY,
    body: null,
  }));

  const executor = new GrokWebExecutor();
  const result = await executor.execute(baseInput());
  assert.equal(result.response.status, 429);
  const json = await result.response.json();
  assert.equal(json.error.type, "rate_limit_error");
});

// ─── Step 2: gated browser-backed retry (mocked browser, no real launch) ──

test("resolveGrokNullBodyTlsResult: gate OFF -> no acquisition attempted, CF result returned unchanged", async () => {
  delete process.env.OMNIROUTE_BROWSER_POOL;
  delete process.env.WEB_COOKIE_USE_BROWSER;

  let acquireCalls = 0;
  __setGrokClearanceAcquireOverrideForTesting(async () => {
    acquireCalls++;
    return "fresh-token";
  });

  const cfResult: TlsFetchResult = {
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  };

  const resolved = await resolveGrokNullBodyTlsResult({
    tlsResult: cfResult,
    headers: { Cookie: "sso=abc123" },
    grokPayload: { modeId: "fast" },
  });

  assert.equal(acquireCalls, 0, "acquisition must not be attempted when the gate is off");
  assert.equal(resolved, cfResult);
});

test("resolveGrokNullBodyTlsResult: gate ON + CF challenge + mocked success -> retried once with injected cf_clearance", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";

  __setGrokClearanceAcquireOverrideForTesting(async () => "fresh-cf-token");

  let retryCount = 0;
  let capturedCookie: string | undefined;
  __setTlsFetchOverrideForTesting(async (_url, options) => {
    retryCount++;
    capturedCookie = (options.headers as Record<string, string>)?.Cookie;
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "application/x-ndjson" }),
      text: null,
      body: mockGrokStream([
        { result: { response: { modelResponse: { message: "ok", responseId: "r1" } } } },
      ]),
    };
  });

  const cfResult: TlsFetchResult = {
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  };

  const resolved = await resolveGrokNullBodyTlsResult({
    tlsResult: cfResult,
    headers: { Cookie: "sso=abc123" },
    grokPayload: { modeId: "fast" },
  });

  assert.equal(retryCount, 1, "tlsFetchGrok must be retried exactly once");
  assert.ok(resolved.body, "retried result must carry a streamable body");
  assert.match(capturedCookie || "", /sso=abc123/);
  assert.match(capturedCookie || "", /cf_clearance=fresh-cf-token/);
});

test("resolveGrokNullBodyTlsResult: gate ON + acquisition failure -> falls through to original CF result (no throw)", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";
  __setGrokClearanceAcquireOverrideForTesting(async () => null);

  let retryCount = 0;
  __setTlsFetchOverrideForTesting(async () => {
    retryCount++;
    throw new Error("should not be called when acquisition fails");
  });

  const cfResult: TlsFetchResult = {
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  };

  const resolved = await resolveGrokNullBodyTlsResult({
    tlsResult: cfResult,
    headers: { Cookie: "sso=abc123" },
    grokPayload: { modeId: "fast" },
  });

  assert.equal(retryCount, 0, "tlsFetchGrok retry must not be attempted without a fresh clearance");
  assert.equal(resolved, cfResult);
});

test("resolveGrokNullBodyTlsResult: gate ON + retry still challenged -> falls through to CF result (no throw)", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";
  __setGrokClearanceAcquireOverrideForTesting(async () => "fresh-cf-token");

  __setTlsFetchOverrideForTesting(async () => ({
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  }));

  const cfResult: TlsFetchResult = {
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  };

  const resolved = await resolveGrokNullBodyTlsResult({
    tlsResult: cfResult,
    headers: { Cookie: "sso=abc123" },
    grokPayload: { modeId: "fast" },
  });

  assert.equal(resolved, cfResult, "must fall through to the original CF result, not throw");
});

test("resolveGrokNullBodyTlsResult: non-CF null body (auth/rate-limit) never attempts acquisition", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";
  let acquireCalls = 0;
  __setGrokClearanceAcquireOverrideForTesting(async () => {
    acquireCalls++;
    return "fresh-cf-token";
  });

  const authResult: TlsFetchResult = {
    status: 401,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: NORMAL_AUTH_FAILURE_BODY,
    body: null,
  };

  const resolved = await resolveGrokNullBodyTlsResult({
    tlsResult: authResult,
    headers: { Cookie: "sso=abc123" },
    grokPayload: { modeId: "fast" },
  });

  assert.equal(acquireCalls, 0, "a genuine auth failure must not trigger browser acquisition");
  assert.equal(resolved, authResult);
});

// ─── Step 2 wired end-to-end through the executor ──────────────────────────

test("executor: gate ON + CF challenge + mocked browser success -> chat succeeds via retried request", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";
  __setGrokClearanceAcquireOverrideForTesting(async () => "fresh-cf-token");

  let callCount = 0;
  __setTlsFetchOverrideForTesting(async () => {
    callCount++;
    if (callCount === 1) {
      return {
        status: 403,
        headers: new Headers({ "Content-Type": "text/html" }),
        text: CF_CHALLENGE_BODY,
        body: null,
      };
    }
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "application/x-ndjson" }),
      text: null,
      body: mockGrokStream([
        { result: { response: { modelResponse: { message: "Hello!", responseId: "r1" } } } },
      ]),
    };
  });

  const executor = new GrokWebExecutor();
  const result = await executor.execute(baseInput());
  assert.equal(callCount, 2, "expected the initial CF-blocked call + one recovery retry");
  assert.equal(result.response.status, 200);
  const json = await result.response.json();
  assert.equal(json.choices[0].message.content, "Hello!");
});

test("executor: gate ON + CF challenge + acquisition failure -> still surfaces cloudflare_challenge", async () => {
  process.env.OMNIROUTE_BROWSER_POOL = "on";
  __setGrokClearanceAcquireOverrideForTesting(async () => null);

  __setTlsFetchOverrideForTesting(async () => ({
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: CF_CHALLENGE_BODY,
    body: null,
  }));

  const executor = new GrokWebExecutor();
  const result = await executor.execute(baseInput());
  assert.equal(result.response.status, 403);
  const json = await result.response.json();
  assert.equal(json.error.type, "cloudflare_challenge");
});
