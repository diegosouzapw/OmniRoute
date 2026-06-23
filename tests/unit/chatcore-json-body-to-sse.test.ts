// Characterization of maybeConvertJsonBodyToSse — the #3089 non-SSE JSON → SSE conversion
// extracted from handleChatCore's streaming entry (chatCore god-file decomposition, #3501). Real
// Response objects + injected deps make the content-type gate, the synthesize-or-rebuild branch,
// and the header rewrites observable. Locks: pass-through for SSE/ndjson/no-body, conversion to
// text/event-stream when synthesizable, and rebuild-with-consumed-body otherwise.
import { test } from "node:test";
import assert from "node:assert/strict";

const { maybeConvertJsonBodyToSse } = await import(
  "../../open-sse/handlers/chatCore/jsonBodyToSse.ts"
);

const ctx = { log: undefined, provider: "openai", model: "gpt-x" };

function makeDeps(synth: (s: string) => string | null) {
  return {
    withBodyTimeout: async <T>(p: Promise<T>) => p,
    synthesizeOpenAiSseFromJson: synth,
  } as Parameters<typeof maybeConvertJsonBodyToSse>[2];
}

test("already text/event-stream → returned unchanged (same reference)", async () => {
  const resp = new Response("data: {}\n\n", {
    headers: { "content-type": "text/event-stream" },
  });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => "X"));
  assert.equal(out, resp);
});

test("application/x-ndjson → returned unchanged", async () => {
  const resp = new Response('{"a":1}\n', { headers: { "content-type": "application/x-ndjson" } });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => "X"));
  assert.equal(out, resp);
});

test("no body → returned unchanged", async () => {
  const resp = new Response(null, { headers: { "content-type": "application/json" } });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => "X"));
  assert.equal(out, resp);
});

test("application/json + synthesizable → SSE response with text/event-stream, no content-length", async () => {
  const resp = new Response('{"choices":[]}', {
    headers: { "content-type": "application/json", "content-length": "14" },
  });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => "data: synth\n\n"));
  assert.notEqual(out, resp);
  assert.equal(out.headers.get("content-type"), "text/event-stream");
  assert.equal(out.headers.get("content-length"), null);
  assert.equal(await out.text(), "data: synth\n\n");
});

test("application/json + not synthesizable → rebuilt with consumed body, content-type unchanged", async () => {
  const resp = new Response('{"not":"chat"}', {
    headers: { "content-type": "application/json" },
  });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => null));
  assert.notEqual(out, resp);
  // not converted → content-type stays application/json (rebuilt headers)
  assert.equal(out.headers.get("content-type"), "application/json");
  assert.equal(await out.text(), '{"not":"chat"}');
});

test("status and statusText are preserved on conversion", async () => {
  const resp = new Response('{"choices":[]}', {
    status: 201,
    statusText: "Created",
    headers: { "content-type": "application/json" },
  });
  const out = await maybeConvertJsonBodyToSse(resp, ctx, makeDeps(() => "data: x\n\n"));
  assert.equal(out.status, 201);
  assert.equal(out.statusText, "Created");
});
