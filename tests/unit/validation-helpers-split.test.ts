// Characterization of the validation.ts split (god-file decomposition): the pure infra layer
// (URL normalizers, header builders, fetch/error transport) moved into co-located leaf modules under
// providers/validation/. The host re-imports them and re-exports the two historically-public helpers
// (isRetryableProxyTarget, isSecurityBlockError). These were a behavior-preserving move — no logic
// change — so the locks here are: public surface stays intact, the new modules expose the helpers,
// and a few pure functions still compute identically.
import { test } from "node:test";
import assert from "node:assert/strict";

const HOST = await import("../../src/lib/providers/validation.ts");
const urls = await import("../../src/lib/providers/validation/urlHelpers.ts");
const headers = await import("../../src/lib/providers/validation/headers.ts");
const transport = await import("../../src/lib/providers/validation/transport.ts");

test("host preserves its public surface (dispatcher + claude-code validator + re-exported guards)", () => {
  for (const name of [
    "validateProviderApiKey",
    "validateClaudeCodeCompatibleProvider",
    "validateWebCookieProvider",
    "validateCommandCodeProvider",
    "isRetryableProxyTarget",
    "isSecurityBlockError",
  ]) {
    assert.equal(typeof (HOST as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("re-exported guards are the same function objects as transport's", () => {
  assert.equal(
    (HOST as Record<string, unknown>).isRetryableProxyTarget,
    transport.isRetryableProxyTarget
  );
  assert.equal(
    (HOST as Record<string, unknown>).isSecurityBlockError,
    transport.isSecurityBlockError
  );
});

test("urlHelpers: normalizeBaseUrl trims + strips trailing slash; addModelsSuffix swaps endpoints", () => {
  assert.equal(urls.normalizeBaseUrl("  https://api.x.com/v1/  "), "https://api.x.com/v1");
  assert.equal(urls.normalizeBaseUrl(123 as unknown as string), ""); // non-string guard (#2463)
  assert.equal(
    urls.addModelsSuffix("https://api.x.com/v1/chat/completions"),
    "https://api.x.com/v1/models"
  );
  assert.equal(urls.addModelsSuffix("https://api.x.com/v1/models"), "https://api.x.com/v1/models");
  assert.equal(
    urls.addModelsSuffix("https://api.kimi.com/coding/v1/messages?beta=true"),
    "https://api.kimi.com/coding/v1/models"
  );
});

test("headers: buildBearerHeaders sets Authorization; builders vary the scheme", () => {
  assert.equal(headers.buildBearerHeaders("k").Authorization, "Bearer k");
  assert.equal(headers.buildClarifaiHeaders("k").Authorization, "Key k");
  assert.equal(headers.buildTokenHeaders("k").Authorization, "Token k");
  assert.equal(headers.buildBearerHeaders("").Authorization, undefined); // empty key → no auth header
});

test("transport: isRetryableProxyTarget fails closed on bad URL and blocks private hosts", () => {
  assert.equal(transport.isRetryableProxyTarget("not a url"), false);
  assert.equal(transport.isRetryableProxyTarget("http://169.254.169.254/"), false);
  assert.equal(transport.isRetryableProxyTarget("https://api.openai.com/v1"), true);
});
