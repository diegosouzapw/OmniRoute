import test from "node:test";
import assert from "node:assert/strict";
import { inferRequiredScope } from "../../src/server/authz/accessScopes.ts";

test("read methods default to read", () => {
  assert.equal(inferRequiredScope("GET", "/api/v1/models"), "read");
  assert.equal(inferRequiredScope("HEAD", "/api/health"), "read");
  assert.equal(inferRequiredScope("OPTIONS", "/api/anything"), "read");
});

test("mutating methods default to write", () => {
  assert.equal(inferRequiredScope("POST", "/api/keys"), "write");
  assert.equal(inferRequiredScope("PUT", "/api/config"), "write");
  assert.equal(inferRequiredScope("PATCH", "/api/combo/x"), "write");
  assert.equal(inferRequiredScope("DELETE", "/api/keys/abc"), "write");
});

test("admin-prefix routes require admin for ANY method", () => {
  assert.equal(inferRequiredScope("GET", "/api/cli/tokens"), "admin");
  assert.equal(inferRequiredScope("POST", "/api/cli/tokens"), "admin");
  assert.equal(inferRequiredScope("DELETE", "/api/cli/tokens/tok_1"), "admin");
  assert.equal(inferRequiredScope("GET", "/api/oauth/start"), "admin");
  assert.equal(inferRequiredScope("POST", "/api/auth/login"), "admin");
  assert.equal(inferRequiredScope("POST", "/api/policy"), "admin");
  assert.equal(inferRequiredScope("POST", "/api/services/foo/start"), "admin");
});

test("admin-mutation prefixes: GET stays read, mutations become admin", () => {
  // providers: status is read, but creating/rotating is admin
  assert.equal(inferRequiredScope("GET", "/api/providers/status"), "read");
  assert.equal(inferRequiredScope("GET", "/api/providers"), "read");
  assert.equal(inferRequiredScope("POST", "/api/providers"), "admin");
  assert.equal(inferRequiredScope("DELETE", "/api/providers/openai"), "admin");
  // cli-tools/apply writes to the host fs
  assert.equal(inferRequiredScope("POST", "/api/cli-tools/apply"), "admin");
});

test("a brand-new mutating route is write by default (not admin)", () => {
  assert.equal(inferRequiredScope("POST", "/api/some-future-route"), "write");
  assert.equal(inferRequiredScope("GET", "/api/some-future-route"), "read");
});

test("prefix matching does not over-match unrelated paths", () => {
  // "/api/authz-inventory" must NOT be caught by the "/api/auth" admin prefix
  assert.equal(inferRequiredScope("GET", "/api/authz-inventory"), "read");
  // "/api/services" itself and its children are admin, but a lookalike is not
  assert.equal(inferRequiredScope("GET", "/api/services-catalog"), "read");
});
