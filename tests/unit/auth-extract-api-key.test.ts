import test from "node:test";
import assert from "node:assert/strict";

const { extractApiKey } = await import("../../src/sse/services/auth.ts");

function makeRequest(headers: Record<string, string>): Request {
  return new Request("https://omniroute.test/v1/messages", { headers });
}

const ANTHROPIC = { "anthropic-version": "2023-06-01" } as const;

test("extractApiKey returns Bearer key when Authorization header is set", () => {
  const req = makeRequest({ Authorization: "Bearer sk-test-bearer" });
  assert.equal(extractApiKey(req), "sk-test-bearer");
});

test("extractApiKey trims surrounding whitespace from Bearer token", () => {
  const req = makeRequest({ Authorization: "Bearer   sk-padded-token   " });
  assert.equal(extractApiKey(req), "sk-padded-token");
});

test("extractApiKey is case-insensitive on the Authorization header name", () => {
  const req = makeRequest({ authorization: "Bearer sk-lowercase-header" });
  assert.equal(extractApiKey(req), "sk-lowercase-header");
});

test("extractApiKey is case-insensitive on the 'bearer' prefix", () => {
  const req = makeRequest({ Authorization: "bearer sk-lowercase-prefix" });
  assert.equal(extractApiKey(req), "sk-lowercase-prefix");
});

test("extractApiKey falls back to x-api-key when Authorization is absent and anthropic-version is set (#2225)", () => {
  const req = makeRequest({ "x-api-key": "sk-anthropic-native", ...ANTHROPIC });
  assert.equal(extractApiKey(req), "sk-anthropic-native");
});

test("extractApiKey accepts uppercase X-Api-Key header alongside anthropic-version (#2225)", () => {
  const req = makeRequest({ "X-Api-Key": "sk-uppercase-xapikey", ...ANTHROPIC });
  assert.equal(extractApiKey(req), "sk-uppercase-xapikey");
});

test("extractApiKey trims surrounding whitespace from x-api-key value", () => {
  const req = makeRequest({ "x-api-key": "   sk-padded-xapikey   ", ...ANTHROPIC });
  assert.equal(extractApiKey(req), "sk-padded-xapikey");
});

test("extractApiKey prefers Bearer over x-api-key when both are present (back-compat)", () => {
  const req = makeRequest({
    Authorization: "Bearer sk-bearer-wins",
    "x-api-key": "sk-loser",
    ...ANTHROPIC,
  });
  assert.equal(extractApiKey(req), "sk-bearer-wins");
});

test("extractApiKey returns null when neither header is present", () => {
  const req = makeRequest({});
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey returns null when x-api-key contains only whitespace", () => {
  const req = makeRequest({ "x-api-key": "   ", ...ANTHROPIC });
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey returns null when Authorization is not a Bearer scheme and x-api-key is absent", () => {
  const req = makeRequest({ Authorization: "Basic <stub-base64>" });
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey falls back to x-api-key when Authorization is a non-Bearer scheme (anthropic-version present)", () => {
  const req = makeRequest({
    Authorization: "Basic <stub-base64>",
    "x-api-key": "stub-fallback-after-basic",
    ...ANTHROPIC,
  });
  assert.equal(extractApiKey(req), "stub-fallback-after-basic");
});

test("extractApiKey ignores x-api-key when anthropic-version is missing — protects local-mode non-Anthropic clients", () => {
  const req = makeRequest({ "x-api-key": "placeholder-key" });
  assert.equal(extractApiKey(req), null);
});

test("extractApiKey accepts Anthropic-Version (TitleCase) header", () => {
  const req = makeRequest({
    "x-api-key": "sk-titlecase-version",
    "Anthropic-Version": "2024-10-22",
  });
  assert.equal(extractApiKey(req), "sk-titlecase-version");
});
