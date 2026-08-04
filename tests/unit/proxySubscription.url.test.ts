import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/url.ts");
const { redactSubscriptionUrl } = mod;

test("strips user:pass from the URL", () => {
  assert.equal(
    redactSubscriptionUrl("https://user:pass@example.com/sub"),
    "https://example.com/sub"
  );
});

test("strips username-only credentials", () => {
  assert.equal(
    redactSubscriptionUrl("https://user@example.com/x"),
    "https://example.com/x"
  );
});

test("leaves credential-free URLs untouched", () => {
  assert.equal(redactSubscriptionUrl("https://example.com/sub"), "https://example.com/sub");
  assert.equal(redactSubscriptionUrl("http://10.0.0.1:8080/sub"), "http://10.0.0.1:8080/sub");
  assert.equal(redactSubscriptionUrl("https://example.com:443/a?b=c#d"), "https://example.com:443/a?b=c#d");
});

test("returns unparseable / empty input unchanged", () => {
  assert.equal(redactSubscriptionUrl("not a url"), "not a url");
  assert.equal(redactSubscriptionUrl(""), "");
});
