import test from "node:test";
import assert from "node:assert/strict";

let nextResponse: { status: number; body: string } = { status: 404, body: "Not Found" };
let fetchCalls = 0;
let lastUrl = "";

const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");

globalThis.fetch = (async (input: RequestInfo | URL) => {
  fetchCalls++;
  lastUrl = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  return new Response(nextResponse.body, { status: nextResponse.status });
}) as typeof fetch;

function mockFetch(status: number, body: string) {
  nextResponse = { status, body };
  fetchCalls = 0;
  lastUrl = "";
}

test("BUG #7857: a 404 from huggingchat's nonsense /models probe path is reported valid:true", async () => {
  mockFetch(404, "Not Found");
  const result = await validateWebCookieProvider({
    provider: "huggingchat",
    apiKey: "garbage_cookie_value_that_was_never_valid=xyz",
    providerSpecificData: {},
  });
  assert.equal(fetchCalls, 1);
  assert.equal(lastUrl, "https://huggingface.co/chat/conversation/models");
  assert.equal(
    result.valid,
    false,
    "a 404 from a nonsense probe path must never be reported as a valid cookie session"
  );
});

test("BUG #7857: same false positive reproduces for grok-web (conversations/new endpoint)", async () => {
  mockFetch(405, "Method Not Allowed");
  const result = await validateWebCookieProvider({
    provider: "grok-web",
    apiKey: "sso=garbage; sso-rw=garbage",
    providerSpecificData: {},
  });
  assert.equal(fetchCalls, 1);
  assert.equal(
    result.valid,
    false,
    "a 405 from a nonsense probe path must never be reported as a valid cookie session"
  );
});
