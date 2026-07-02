import test from "node:test";
import assert from "assert";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";

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
