import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { maybeHandleDisallowedTrace } = require("../../scripts/dev/http-method-guard.cjs");

test("raw HTTP guard rejects high-risk TRACE requests before Next.js handles them", () => {
  const cases: Array<{
    label: string;
    url: string;
    allow: string;
  }> = [
    { label: "login", url: "/api/auth/login", allow: "POST" },
    { label: "logout", url: "/api/auth/logout", allow: "POST" },
    { label: "keys", url: "/api/keys", allow: "GET, POST" },
    { label: "key detail", url: "/api/keys/0", allow: "GET, PATCH, DELETE" },
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

    const handled = maybeHandleDisallowedTrace({ method: "TRACE", url: testCase.url }, response);
    assert.equal(handled, true, testCase.label);
    assert.equal(response.statusCode, 405, testCase.label);
    assert.equal(headers.get("allow"), testCase.allow, testCase.label);
    assert.match(body, /METHOD_NOT_ALLOWED/, testCase.label);
  }
});
