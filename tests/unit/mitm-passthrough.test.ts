import test from "node:test";
import assert from "node:assert/strict";
import { shouldBypass, globMatch, DEFAULT_BYPASS_PATTERNS } from "../../src/mitm/passthrough.ts";

test("shouldBypass — bank subdomain matches default pattern", () => {
  assert.ok(shouldBypass("my.bank.com", []));
  assert.ok(shouldBypass("secure.bank.example", []));
});

test("shouldBypass — .gov domain matches default pattern", () => {
  assert.ok(shouldBypass("portal.gov.br", []));
  assert.ok(shouldBypass("tax.gov", []));
});

test("shouldBypass — okta.com matches default SSO pattern", () => {
  assert.ok(shouldBypass("mycompany.okta.com", []));
  assert.ok(shouldBypass("okta.com", []));
});

test("shouldBypass — auth0.com matches default SSO pattern", () => {
  assert.ok(shouldBypass("myapp.auth0.com", []));
  assert.ok(shouldBypass("auth0.com", []));
});

test("shouldBypass — non-sensitive host does NOT match defaults", () => {
  assert.ok(!shouldBypass("api.openai.com", []));
  assert.ok(!shouldBypass("api.anthropic.com", []));
  assert.ok(!shouldBypass("example.com", []));
});

test("shouldBypass — user custom glob pattern matches", () => {
  assert.ok(shouldBypass("internal.mycompany.com", ["*.mycompany.com"]));
  assert.ok(!shouldBypass("external.othercompany.com", ["*.mycompany.com"]));
});

test("globMatch — star wildcard matches any subdomain", () => {
  assert.ok(globMatch("foo.example.com", "*.example.com"));
  assert.ok(globMatch("bar.example.com", "*.example.com"));
});

test("globMatch — exact match without wildcard", () => {
  assert.ok(globMatch("api.openai.com", "api.openai.com"));
  assert.ok(!globMatch("api.openai.com", "api.anthropic.com"));
});

test("globMatch — invalid regex-like pattern does not throw", () => {
  assert.doesNotThrow(() => globMatch("test.com", "[invalid("));
});

test("DEFAULT_BYPASS_PATTERNS — exported array is not empty", () => {
  assert.ok(DEFAULT_BYPASS_PATTERNS.length >= 4);
  assert.ok(DEFAULT_BYPASS_PATTERNS.every((p) => p instanceof RegExp));
});
