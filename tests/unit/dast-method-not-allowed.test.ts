import assert from "node:assert/strict";
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
