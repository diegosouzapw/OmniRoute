import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { maybeHandleDisallowedMethod } = require("../../scripts/dev/http-method-guard.cjs");

test("raw HTTP guard rejects high-risk unsupported methods before Next.js handles them", () => {
  const cases: Array<{
    label: string;
    method: string;
    url: string;
    allow: string;
  }> = [
    { label: "login TRACE", method: "TRACE", url: "/api/auth/login", allow: "POST" },
    { label: "login QUERY", method: "QUERY", url: "/api/auth/login", allow: "POST" },
    { label: "logout QUERY", method: "QUERY", url: "/api/auth/logout", allow: "POST" },
    { label: "keys QUERY", method: "QUERY", url: "/api/keys", allow: "GET, POST" },
    {
      label: "key detail QUERY",
      method: "QUERY",
      url: "/api/keys/0",
      allow: "GET, PATCH, DELETE",
    },
  ];

  for (const testCase of cases) {
    let body = "";
    const headers = new Map<string, string>();
    const response = {
      statusCode: 200,
      setHeader(name: string, value: string) {
        headers.set(name.toLowerCase(), value);
      },
      end(chunk: string) {
        body += chunk;
      },
    };

    const handled = maybeHandleDisallowedMethod(
      { method: testCase.method, url: testCase.url },
      response
    );
    assert.equal(handled, true, testCase.label);
    assert.equal(response.statusCode, 405, testCase.label);
    assert.equal(headers.get("allow"), testCase.allow, testCase.label);
    assert.match(body, /METHOD_NOT_ALLOWED/, testCase.label);
  }
});

test("raw HTTP guard allows documented methods through", () => {
  const response = {
    setHeader() {
      throw new Error("allowed methods should not write headers");
    },
    end() {
      throw new Error("allowed methods should not end the response");
    },
  };

  assert.equal(
    maybeHandleDisallowedMethod({ method: "POST", url: "/api/auth/login" }, response),
    false
  );
  assert.equal(maybeHandleDisallowedMethod({ method: "GET", url: "/api/keys" }, response), false);
  assert.equal(
    maybeHandleDisallowedMethod({ method: "OPTIONS", url: "/api/keys" }, response),
    false
  );
  assert.equal(
    maybeHandleDisallowedMethod({ method: "QUERY", url: "/api/health/ping" }, response),
    false
  );
});

test("raw HTTP guard rejects undici-unsupported methods (TRACE/TRACK/CONNECT) on ANY path", () => {
  // Regression guard (release v3.8.44 dast-smoke): TRACE reached Next's
  // middleware adapter, which throws `TypeError: 'TRACE' HTTP method is
  // unsupported.` while constructing the fetch Request — an unhandled 500 on
  // EVERY route. The guard must answer a clean 405 before Next sees it.
  for (const method of ["TRACE", "TRACK", "CONNECT"]) {
    for (const url of ["/api/keys/0/devices", "/dashboard", "/v1/chat/completions"]) {
      const headers: Record<string, string> = {};
      const response = {
        statusCode: 0,
        setHeader(name: string, value: string) {
          headers[name] = value;
        },
        body: "",
        end(payload?: string) {
          this.body = payload || "";
        },
      };
      const handled = maybeHandleDisallowedMethod({ method, url }, response);
      assert.equal(handled, true, `${method} ${url} must be handled by the guard`);
      assert.equal(response.statusCode, 405, `${method} ${url} must yield 405`);
      assert.ok(headers.Allow, `${method} ${url} must set an Allow header`);
      assert.match(response.body, /METHOD_NOT_ALLOWED/);
    }
  }
});

test("OpenAPI documents high-risk route auth and setup responses", () => {
  const spec = readFileSync("docs/openapi.yaml", "utf8");
  const apiKeyDetailStart = spec.indexOf("  /api/keys/{id}:");
  const apiKeyDetailEnd = spec.indexOf("\n  /api/combos:", apiKeyDetailStart);
  const apiKeyDetail = spec.slice(apiKeyDetailStart, apiKeyDetailEnd);

  assert.match(apiKeyDetail, /\n    get:/);
  assert.match(apiKeyDetail, /\n    patch:/);
  assert.match(apiKeyDetail, /\n    delete:/);
  assert.match(apiKeyDetail, /"401":\n\s+description: Authentication required/);
  assert.match(apiKeyDetail, /"404":\n\s+description: Key not found/);

  const loginStart = spec.indexOf("  /api/auth/login:");
  const loginEnd = spec.indexOf("\n  /api/auth/logout:", loginStart);
  const login = spec.slice(loginStart, loginEnd);
  assert.match(login, /"400":\n\s+description: Invalid login request/);
  assert.match(login, /"401":\n\s+description: Invalid password/);
  assert.match(login, /"403":\n\s+description: Password setup required/);
  assert.match(login, /"429":\n\s+description: Too many failed attempts/);
});
