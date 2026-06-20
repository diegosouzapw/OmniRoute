import test from "node:test";
import assert from "node:assert/strict";

// #4380: large /v1/chat/completions JSON bodies (270-550 KB coding-agent payloads) were
// JSON-parsed twice — once in the route for the prompt-injection guard, then again in
// handleChat — doubling the body's heap residency on the hot path and feeding an OOM
// crash-loop under concurrent load. The route now threads the already-parsed body to the
// handler via resolveChatRequestBody, which must NOT re-parse when a body is provided.

const { resolveChatRequestBody } = await import("../../src/sse/handlers/requestBody.ts");

function countingRequest() {
  let jsonCalls = 0;
  const request = {
    json: async () => {
      jsonCalls++;
      return { parsed: "from-request" };
    },
  };
  return { request, calls: () => jsonCalls };
}

test("#4380 returns the pre-parsed body WITHOUT re-parsing the request", async () => {
  const { request, calls } = countingRequest();
  const preParsed = { parsed: "from-route-guard", big: "x".repeat(1000) };

  const result = await resolveChatRequestBody(request, preParsed);

  assert.deepEqual(result, preParsed);
  assert.equal(calls(), 0, "must not JSON-parse the large body a second time");
});

test("#4380 falls back to request.json() when no pre-parsed body is threaded", async () => {
  const { request, calls } = countingRequest();

  const viaNull = await resolveChatRequestBody(request, null);
  const viaUndefined = await resolveChatRequestBody(request, undefined);

  assert.deepEqual(viaNull, { parsed: "from-request" });
  assert.deepEqual(viaUndefined, { parsed: "from-request" });
  assert.equal(calls(), 2);
});

test("#4380 a present-but-empty pre-parsed body is used, not re-parsed (no `!body` regression)", async () => {
  const { request, calls } = countingRequest();

  // {} != null → must be used as-is. Guards against a `!preParsedBody` check that would
  // wrongly re-parse a legitimately empty-object body.
  const result = await resolveChatRequestBody(request, {});

  assert.deepEqual(result, {});
  assert.equal(calls(), 0);
});
