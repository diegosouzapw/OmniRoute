import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor, isCompactResponsesEndpoint } from "../../open-sse/executors/codex.ts";

const executor = new CodexExecutor();
const buildUrl = (requestEndpointPath: string) =>
  executor.buildUrl("gpt-5", true, 0, { requestEndpointPath } as never);

const plain = buildUrl("/v1/responses");

test("codex responses subpath: ordinary subpaths are forwarded", () => {
  assert.equal(buildUrl("/v1/responses/compact"), `${plain}/compact`);
  assert.equal(buildUrl("/v1/responses/resp_abc123/cancel"), `${plain}/resp_abc123/cancel`);
  assert.equal(isCompactResponsesEndpoint("/v1/responses/compact"), true);
});

test("codex responses subpath: encoded traversal and delimiters fall back to the plain endpoint", () => {
  const hostile = [
    "/v1/responses/..%2f..%2fbackend-api/accounts",
    "/v1/responses/%2e%2e/x",
    "/v1/responses/.%2E/x",
    "/v1/responses/a%5cb",
    "/v1/responses/a%3Fb",
    "/v1/responses/a%23b",
    "/v1/responses/a%00b",
    "/v1/responses/a/../b",
    "/v1/responses/./b",
    "/v1/responses/a\\b",
    "/v1/responses/a?b",
    "/v1/responses/a#b",
  ];
  for (const path of hostile) {
    assert.equal(buildUrl(path), plain, path);
    assert.equal(isCompactResponsesEndpoint(path), false, path);
  }
});
