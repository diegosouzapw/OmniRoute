// #10786: process-wide admitChatRequest must run before Responses/Messages clone/parse.
import test from "node:test";
import assert from "node:assert/strict";

const { ChatAdmissionController, admitChatRequest } =
  await import("../../../src/shared/middleware/chatBodyAdmission.ts");
const { withChatAdmission } = await import("../../../src/shared/middleware/withChatAdmission.ts");

function largeBody(n = 64): string {
  return JSON.stringify({ messages: [{ role: "user", content: "x".repeat(n) }] });
}

function chatRequest(url: string, body: string): Request {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(body.length) },
    body,
  });
}

test("withChatAdmission does not invoke the handler when a second large body is shed", async () => {
  const controller = new ChatAdmissionController(1);
  const options = { controller, largeBodyBytes: 32, hardMaxBytes: 1024, queueMs: 0 };
  const body = largeBody();

  const first = await admitChatRequest(chatRequest("http://x/v1/responses", body), options);
  assert.equal(first.admit, true);
  // Occupy the #10437 healthy-headroom slot so the wrapper still hits today's 503
  // path (withChatAdmission does not inject heapPressureCheck).
  const headroom = controller.tryAcquireHealthyHeadroom();
  assert.ok(headroom);

  let called = false;
  const wrapped = withChatAdmission(async () => {
    called = true;
    return new Response("ok");
  }, options);

  const res = await wrapped(chatRequest("http://x/v1/responses", body));
  assert.equal(called, false);
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), "2");
  const json = await res.json();
  assert.equal(json.error.code, "chat_admission_busy");
  first.lease?.release();
  headroom.release();
});

test("withChatAdmission invokes the handler and forwards the admitted request", async () => {
  const controller = new ChatAdmissionController(1);
  const options = { controller, largeBodyBytes: 32, hardMaxBytes: 1024, queueMs: 0 };
  const body = largeBody();
  let seen: Request | null = null;
  const wrapped = withChatAdmission(async (request: Request) => {
    seen = request;
    return new Response("ok", { status: 200 });
  }, options);
  const res = await wrapped(chatRequest("http://x/v1/messages", body));
  assert.ok(seen);
  assert.equal(res.status, 200);
  assert.equal(await seen.text(), body);
});

test("responses admits inline before json; messages wrap withChatAdmission before withInjectionGuard", async () => {
  const { readFileSync } = await import("node:fs");
  const responses = readFileSync(
    new URL("../../../src/app/api/v1/responses/route.ts", import.meta.url),
    "utf8"
  );
  const messages = readFileSync(
    new URL("../../../src/app/api/v1/messages/route.ts", import.meta.url),
    "utf8"
  );
  const catchAll = readFileSync(
    new URL("../../../src/app/api/v1/responses/[...path]/route.ts", import.meta.url),
    "utf8"
  );
  // Keepalive #10806 inlined admitChatRequest into /v1/responses. Wrapping
  // withChatAdmission on top would double-admit. Body is reserved before json().
  const admitAt = responses.indexOf("await admitChatRequest(request");
  const jsonAt = responses.indexOf("parsedBody = await request.json()");
  assert.ok(admitAt >= 0, "responses route must call admitChatRequest");
  assert.ok(jsonAt > admitAt, "admitChatRequest must run before request.json()");
  assert.doesNotMatch(responses, /withChatAdmission/);
  assert.match(
    messages,
    /withChatAdmission\(\s*withInjectionGuard\(postHandler(?:,\s*\{[^}]*\})?\)\s*\)/
  );
  assert.match(catchAll, /export const POST = withChatAdmission\(postHandler\)/);
  assert.doesNotMatch(catchAll, /export async function POST/);
});

test("remaining handleChat aliases wrap POST with withChatAdmission (#10790)", async () => {
  const { readFileSync } = await import("node:fs");
  const files = [
    "src/app/api/v1/antigravity/route.ts",
    "src/app/api/v1/api/chat/route.ts",
    "src/app/api/v1/completions/route.ts",
    "src/app/api/v1/providers/[provider]/chat/completions/route.ts",
    "src/app/api/v1/relay/chat/completions/route.ts",
  ];
  for (const rel of files) {
    const src = readFileSync(new URL("../../../" + rel, import.meta.url), "utf8");
    assert.match(src, /withChatAdmission/, rel);
    assert.match(src, /export const POST = withChatAdmission\(postHandler\)/, rel);
  }
});
