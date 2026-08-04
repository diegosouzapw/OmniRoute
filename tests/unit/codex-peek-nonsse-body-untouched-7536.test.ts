// #7536: Codex non-stream chat 502'd with "Response body is already used".
//
// Root cause (confirmed live on the VPS via fs-instrumentation): the Codex HTTP
// transport uses the wreq-js TLS-fingerprint client, whose Response is backed by
// a native body handle. On that response, merely *accessing* `response.body`
// disturbs the handle so a later `.text()` throws
// `TypeError: Response body is already used`. The Codex non-stream upstream
// response arrives with an EMPTY content-type, so `peekCodexSseTransientError`
// early-returns — but its guard evaluated `!response.body` (touching `.body`)
// BEFORE the content-type check. That single `.body` access consumed the body,
// and chatCore's `readNonStreamingResponseBody` → `.text()` then 502'd. Streaming
// was unaffected because the peek genuinely wants the body for SSE responses.
//
// The fix reorders the guard so the content-type is checked before `.body` is
// touched. This test locks that in: peek must NOT access `.body` for a non-SSE
// response, and the body must remain readable downstream.
import test from "node:test";
import assert from "node:assert/strict";

import { peekCodexSseTransientError } from "../../open-sse/executors/codex.ts";

/**
 * Mimic a wreq-js native-handle Response: reading `.body` is destructive — once
 * accessed, `.text()` throws exactly like the live 502. This is what the real
 * bug looked like end-to-end.
 */
function makeDestructiveBodyResponse(contentType: string) {
  let bodyAccessCount = 0;
  let disturbed = false;
  const response = {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers(contentType ? { "content-type": contentType } : {}),
    get body() {
      bodyAccessCount += 1;
      disturbed = true; // native handle is now consumed
      return new ReadableStream<Uint8Array>();
    },
    async text() {
      if (disturbed) throw new TypeError("Response body is already used");
      return "downstream still works";
    },
  } as unknown as Response;
  return { response, bodyAccessCount: () => bodyAccessCount };
}

test("peekCodexSseTransientError does not touch response.body for an empty-content-type response (#7536)", async () => {
  const { response, bodyAccessCount } = makeDestructiveBodyResponse("");

  const result = await peekCodexSseTransientError(response);

  assert.equal(result.matched, null);
  assert.equal(result.replacementBody, null);
  assert.equal(
    bodyAccessCount(),
    0,
    "peek must not access .body when content-type is not text/event-stream"
  );
  // The real regression: the body had to stay readable for the non-stream path.
  assert.equal(await response.text(), "downstream still works");
});

test("peekCodexSseTransientError does not touch response.body for a non-SSE (application/json) response (#7536)", async () => {
  const { response, bodyAccessCount } = makeDestructiveBodyResponse("application/json");

  const result = await peekCodexSseTransientError(response);

  assert.equal(result.matched, null);
  assert.equal(result.replacementBody, null);
  assert.equal(bodyAccessCount(), 0, "non-SSE content-type must short-circuit before .body");
  assert.equal(await response.text(), "downstream still works");
});
