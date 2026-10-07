import assert from "node:assert/strict";
import test from "node:test";
import {
  assertValidationCredentials,
  validationFetch,
} from "../../open-sse/executors/base/validationDispatch.ts";

test("validationFetch without an observer passes the exact request options straight to fetch", async () => {
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: unknown; options: unknown }> = [];
  globalThis.fetch = (async (url: unknown, options: unknown) => {
    seen.push({ url, options });
    return new Response("ok");
  }) as typeof fetch;
  try {
    const options: RequestInit = { method: "POST", body: "{}", redirect: "follow" };
    const res = await validationFetch(undefined, "openai", "m", { apiKey: "k" })(
      "https://example.invalid/v1",
      options
    );
    assert.equal(await res.text(), "ok");
    assert.equal(seen.length, 1);
    assert.equal(seen[0].url, "https://example.invalid/v1");
    assert.equal(seen[0].options, options, "options object must be forwarded untouched");
    assert.equal(options.redirect, "follow");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("assertValidationCredentials is a no-op without an observer", () => {
  assert.doesNotThrow(() =>
    assertValidationCredentials(undefined, {
      apiKey: "k",
      providerSpecificData: { extraApiKeys: ["a", "b"] },
    })
  );
});
