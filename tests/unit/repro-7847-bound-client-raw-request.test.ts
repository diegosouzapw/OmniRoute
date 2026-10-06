// Repro + regression guard for #7847: buildClientRawRequest deep-clones the ENTIRE request body
// on every chat request, unbounded, even though every consumer of clientRawRequest.body is
// observability that either discards it or re-clones it *bounded*.
//
// Consumers traced at the time of writing — none feeds dispatch, translation or the upstream call:
//   1. chatCore.ts        -> reqLogger.logClientRawRequest(...)  (no-op when the logger is off,
//                            otherwise re-clones via cloneBoundedForLog)
//   2. chatCore.ts        -> trackPendingRequest({ clientRequest }) -> /api/logs/[id]
//   3. chat.ts            -> recordRejectedRequestUsage({ requestBody })
//
// The incident: a 3.05 MiB request (729 messages / 86 tools) reached ~12,282 MiB of V8 heap.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildClientRawRequest } = await import("../../src/sse/handlers/chat.ts");
const { cloneBoundedForLog, MAX_LOG_ARRAY_ITEMS } =
  await import("../../open-sse/utils/requestLogger.ts");

const MESSAGES = MAX_LOG_ARRAY_ITEMS + 500;

function makeRequest(): Request {
  return new Request("http://localhost:20128/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
}

function longHistoryBody() {
  return {
    model: "claude-opus-5",
    messages: Array.from({ length: MESSAGES }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `message ${i} `.repeat(200),
    })),
  };
}

test("#7847: buildClientRawRequest must not retain an unbounded copy of the message history", () => {
  const captured = buildClientRawRequest(makeRequest(), longHistoryBody()) as {
    body: { messages: unknown[] };
  };

  // The bounded clone keeps a truncation marker plus the tail, never the whole history.
  assert.ok(
    captured.body.messages.length <= MAX_LOG_ARRAY_ITEMS + 1,
    `clientRawRequest.body retained ${captured.body.messages.length} of ${MESSAGES} messages — ` +
      `every consumer is observability and keeps at most ${MAX_LOG_ARRAY_ITEMS}`
  );
});

test("#7847: the retained snapshot does not grow with the message count", () => {
  // The amplification in #7847 is that retention scaled with history length. Ten times the
  // history must not cost ten times the retained snapshot.
  const size = (v: unknown) => JSON.stringify(v).length;
  const at = (messages: number) =>
    size(
      (
        buildClientRawRequest(makeRequest(), {
          model: "claude-opus-5",
          messages: Array.from({ length: messages }, (_, i) => ({
            role: i % 2 === 0 ? "user" : "assistant",
            content: `message ${i} `.repeat(200),
          })),
        }) as { body: unknown }
      ).body
    );

  const small = at(MESSAGES);
  const tenfold = at(MESSAGES * 10);
  // Not exactly equal: only the tail is retained, and the tail of the longer history carries
  // wider index numbers ("message 7999" vs "message 799"). What matters is that the growth is
  // a rounding error rather than the 10x a proportional retention would cost.
  assert.ok(
    tenfold < small * 1.5,
    `retained ${tenfold} bytes for ${MESSAGES * 10} messages vs ${small} for ${MESSAGES} — ` +
      `retention must be bounded; proportional retention would be ~${small * 10}`
  );
});

test("bounding at the entry does not change what the request logger ultimately stores", () => {
  // chatCore hands clientRawRequest.body to reqLogger.logClientRawRequest, which applies
  // cloneBoundedForLog itself. Bounding earlier may only be safe if that second pass is a
  // no-op — otherwise the persisted log payload would change shape.
  const body = longHistoryBody();
  const once = cloneBoundedForLog(body);
  const twice = cloneBoundedForLog(once);
  assert.deepEqual(
    twice,
    once,
    "cloneBoundedForLog must be idempotent for the entry clone to be safe"
  );
});

test("buildClientRawRequest still carries endpoint, headers and signal", () => {
  const req = new Request("http://localhost:20128/v1/chat/completions?x=1", {
    method: "POST",
    headers: { "content-type": "application/json", "x-omniroute-session-id": "sess-1" },
  });
  const out = buildClientRawRequest(req, { model: "m", messages: [] }) as {
    endpoint: string;
    headers: Record<string, string>;
    signal: unknown;
  };
  assert.equal(out.endpoint, "/v1/chat/completions");
  assert.equal(out.headers["x-omniroute-session-id"], "sess-1");
  assert.equal(out.headers["content-type"], "application/json");
  assert.ok("signal" in out);
});

test("the captured body is a snapshot — later mutation of the request body must not leak in", () => {
  // chatCore rewrites `body` downstream (plugin onRequest hook, compression). The captured
  // snapshot must not alias it, or the log would show post-mutation content.
  const body = { model: "m", messages: [{ role: "user", content: "original" }] };
  const captured = buildClientRawRequest(makeRequest(), body) as {
    body: { messages: { content: string }[] };
  };
  body.messages[0].content = "mutated by a downstream plugin";
  assert.equal(captured.body.messages[0].content, "original");
});
