/**
 * A 403 or 451 carrying `insufficient_quota` on one tool shape is replayed once
 * in the other shape; only when both shapes fail does the credits verdict stand.
 */
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import {
  _resetShapeMemoForTests,
  _setShapeClockForTests,
} from "../../open-sse/executors/opencodeRequestShape.ts";
import { _resetToolObservationForTests } from "../../open-sse/executors/opencodeToolObservation.ts";

const MODEL = "nemotron-3.5-lightning-free";
const TITLE_PROMPT =
  "You are a title generator. You output ONLY a thread title.\n- Never use tools\n- Keep it short";
const QUOTA_BODY = JSON.stringify({
  error: { type: "insufficient_quota", message: "insufficient_quota" },
});
const SSE_OK =
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":null}]}\n\n' +
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
  "data: [DONE]\n\n";

type Body = Record<string, unknown>;

function toolCount(body: Body): number {
  return Array.isArray(body.tools) ? body.tools.length : 0;
}

const originalFetch = globalThis.fetch;
let bodies: Body[] = [];

function quotaRefusal(status: number): Response {
  return new Response(QUOTA_BODY, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function answerOk(): Response {
  return new Response(SSE_OK, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

/** First call refused with the quota token on the tools shape, second call accepted bare. */
function installQuotaThenOk(status: number): void {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? "{}")) as Body;
    bodies.push(body);
    if (bodies.length === 1) return quotaRefusal(status);
    return answerOk();
  }) as typeof globalThis.fetch;
}

/** Every call refused with the quota token, whatever the shape. */
function installQuotaAlways(status: number): void {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return quotaRefusal(status);
  }) as typeof globalThis.fetch;
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  _setShapeClockForTests(() => Date.now());
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  _setShapeClockForTests(() => Date.now());
  resetDbInstance();
});

const titleBody = (): Body => ({
  model: MODEL,
  messages: [
    { role: "system", content: TITLE_PROMPT },
    { role: "user", content: "hello" },
  ],
});

async function run(body: Body): Promise<Response> {
  const executor = new OpencodeExecutor("opencode-zen");
  const credentials: ProviderCredentials = {
    apiKey: "k",
    accessToken: null,
    connectionId: "c",
  };
  const result = (await executor.execute({
    model: String(body.model),
    body,
    stream: true,
    signal: null,
    credentials,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  })) as { response: Response };
  return result.response;
}

for (const status of [403, 451]) {
  test(`a ${status} carrying the quota token on the tools shape is replayed bare and accepted`, async () => {
    installQuotaThenOk(status);
    const response = await run(titleBody());
    assert.equal(response.status, 200);
    assert.equal(bodies.length, 2);
    assert.ok(toolCount(bodies[0]) > 0);
    assert.equal(toolCount(bodies[1]), 0);
  });
}

test("when both shapes carry the quota token the refusal is returned and stays a credits verdict", async () => {
  installQuotaAlways(403);
  const response = await run(titleBody());
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 2);
  assert.equal(
    classifyProviderError(403, QUOTA_BODY, "opencode-zen"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
  assert.equal(
    classifyProviderError(403, QUOTA_BODY, "openai"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});

test("a 403 without the exact token is not replayed", async () => {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return new Response(JSON.stringify({ error: { message: "insufficient quota" } }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 1);
});

test("a plain-text 403 carrying the exact token is replayed", async () => {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    if (bodies.length === 1) {
      return new Response("insufficient_quota", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
    return answerOk();
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 200);
  assert.equal(bodies.length, 2);
});

test("a 403 carrying the quota token plus a user_blocked marker is not replayed", async () => {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return new Response(
      JSON.stringify({ error: { message: "insufficient_quota [user_blocked] egress refused" } }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 1);
});
