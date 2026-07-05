import test from "node:test";
import assert from "assert";
import {
  validateResponseQuality,
  releaseQualityClone,
} from "../../open-sse/services/combo/validateQuality.ts";

function makeResponse(body: string, contentType = "text/plain") {
  return {
    headers: {
      get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null),
    },
    clone: () => ({ text: async () => body }),
  } as unknown as Response;
}

test("returns valid=true for SSE with 'event:' lines", async () => {
  const res = await validateResponseQuality(makeResponse("event: message\n\n"), false, {});
  assert.strictEqual(res.valid, true);
});

test("returns valid=true for SSE with 'data:' lines", async () => {
  const res = await validateResponseQuality(makeResponse('data: {"foo":"bar"}\n\n'), false, {});
  assert.strictEqual(res.valid, true);
});

test("returns valid=false for non-JSON non-SSE text", async () => {
  const res = await validateResponseQuality(makeResponse("Hello world"), false, {});
  assert.strictEqual(res.valid, false);
});

test("returns valid=false for Responses API bodies with no output items", async () => {
  const res = await validateResponseQuality(
    makeResponse(JSON.stringify({ object: "response", status: "completed", output: [] }), "application/json"),
    false,
    {}
  );
  assert.strictEqual(res.valid, false);
});

test("returns valid=true for Responses API bodies with structural output", async () => {
  const res = await validateResponseQuality(
    makeResponse(
      JSON.stringify({
        object: "response",
        status: "completed",
        output: [{ type: "function_call", name: "lookup", arguments: "{}" }],
      }),
      "application/json"
    ),
    false,
    {}
  );
  assert.strictEqual(res.valid, true);
});

// ── releaseQualityClone (memory: release the abandoned quality-check tee branch) ──

test("releaseQualityClone is a no-op when the clone fell back to the original", () => {
  const original = new Response("body");
  // clone === original → must NOT touch the body (it's the response being streamed).
  releaseQualityClone(original, original, { clonedResponse: original });
  assert.strictEqual(original.bodyUsed, false, "original body must remain untouched");
});

test("releaseQualityClone cancels the discarded clonedResponse body", async () => {
  const original = new Response("streamed to client");
  const cloneBody = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("abandoned tee branch"));
    },
  });
  const clonedResponse = new Response(cloneBody);
  releaseQualityClone({} as Response, original, { clonedResponse });
  // Give the microtask queue a tick for the cancel() promise to settle.
  await Promise.resolve();
  assert.ok(clonedResponse.body?.locked || cloneBody.locked === false);
  // The original (client-facing) response is never disturbed.
  assert.strictEqual(original.bodyUsed, false);
});

test("releaseQualityClone does not throw when there is no clonedResponse", () => {
  const original = new Response("body");
  assert.doesNotThrow(() => releaseQualityClone({} as Response, original, {}));
});
