import test from "node:test";
import assert from "assert";
import { validateResponseQuality } from "../../open-sse/services/combo";

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
