/**
 * A replayed shape refusal reuses the verdict read once, without rereading the body.
 *
 * The first refusal is read in `withRequestShapeRetry`; the replay must carry
 * that same verdict to the outcome note instead of reading the refused body
 * a second time. These tests count `clone().text()` calls on the refused
 * response built by the fake upstream.
 */
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  _resetShapeMemoForTests,
  _setShapeClockForTests,
} from "../../open-sse/executors/opencodeRequestShape.ts";
import { _resetToolObservationForTests } from "../../open-sse/executors/opencodeToolObservation.ts";

const MODEL = "nemotron-3.5-lightning-free";
const TITLE_PROMPT =
  "You are a title generator. You output ONLY a thread title.\n- Never use tools\n- Keep it short";
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
const SSE_OK =
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":null}]}\n\n' +
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
  "data: [DONE]\n\n";

type Body = Record<string, unknown>;

function toolCount(body: Body): number {
  return Array.isArray(body.tools) ? body.tools.length : 0;
}

function promptOf(body: Body): string {
  if (typeof body.instructions === "string") return body.instructions;
  const messages = Array.isArray(body.messages) ? (body.messages as Array<Body>) : [];
  const system = messages.find((m) => m.role === "system" || m.role === "developer");
  return typeof system?.content === "string" ? system.content : "";
}

const originalFetch = globalThis.fetch;
let bodies: Body[] = [];
/** `clone().text()` calls on the first refused response, in call order. */
let firstRefusalReads = 0;

function titleBody(prompt = TITLE_PROMPT, model = MODEL): Body {
  return {
    model,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: "hello" },
    ],
  };
}

function installCountingUpstream(rule: (body: Body, call: number) => number): void {
  bodies = [];
  firstRefusalReads = 0;
  let calls = 0;
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? "{}")) as Body;
    bodies.push(body);
    calls += 1;
    const verdict = rule(body, calls);
    if (verdict === 200) {
      return new Response(SSE_OK, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    const refusal = new Response(REFUSAL_BODY, {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
    if (calls === 1) {
      const innerClone = refusal.clone.bind(refusal);
      refusal.clone = (): Response => {
        firstRefusalReads += 1;
        return innerClone();
      };
    }
    return refusal;
  }) as typeof globalThis.fetch;
}

async function run(body: Body): Promise<Response> {
  const executor = new OpencodeExecutor("opencode-zen");
  const result = (await executor.execute({
    model: String(body.model),
    body,
    stream: true,
    signal: null,
    credentials: { apiKey: "k", accessToken: null, connectionId: "c" } as ProviderCredentials,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  })) as { response: Response };
  return result.response;
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  _setShapeClockForTests(() => Date.now());
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  _setShapeClockForTests(() => Date.now());
});

test("replayed shape refusal reads body once", async () => {
  installCountingUpstream((body) =>
    promptOf(body).includes("Never use tools") && toolCount(body) > 0 ? 403 : 200
  );
  const response = await run(titleBody());
  assert.equal(response.status, 200);
  assert.equal(bodies.length, 2, "one refusal, one replay");
  assert.equal(firstRefusalReads, 1, "the refused body is read once, then the verdict travels");
});

test("second refusal pauses with same verdict", async () => {
  installCountingUpstream(() => 403);
  const first = await run(titleBody());
  assert.equal(first.status, 403);
  assert.equal(bodies.length, 2, "one refusal, one replay");
  assert.match(await first.text(), /FreeTierError/, "the upstream verdict is returned as it came");
  assert.equal(firstRefusalReads, 1, "the refused body is read once, then the verdict travels");
});

test("unreadable body skips replay", async () => {
  bodies = [];
  firstRefusalReads = 0;
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    const refusal = new Response(REFUSAL_BODY, { status: 403 });
    refusal.clone = () => {
      throw new Error("body already consumed");
    };
    return refusal;
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 403, "the verdict reaches the caller");
  assert.equal(bodies.length, 1, "and nothing was replayed on a body we could not read");
});
