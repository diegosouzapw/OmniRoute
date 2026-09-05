import test from "node:test";
import assert from "node:assert/strict";
import { rowMatchesFilter } from "../../../src/app/api/usage/call-logs/route.ts";

test.describe("call-logs rowMatchesFilter unit tests", () => {
  const baseRow = {
    id: "log-1",
    status: 200,
    model: "openai/gpt-4o",
    provider: "openai",
    providerDisplay: "OpenAI Main",
    account: "Work Account",
    apiKeyName: "DevKey",
    comboName: "SmartRouter",
    correlationId: "corr-12345",
    path: "/v1/chat/completions",
    error: null,
  };

  test("status filter matches ok, error, and explicit status codes", () => {
    assert.equal(rowMatchesFilter(baseRow, { status: "ok" }), true);
    assert.equal(rowMatchesFilter(baseRow, { status: "error" }), false);
    assert.equal(rowMatchesFilter(baseRow, { status: 200 }), true);
    assert.equal(rowMatchesFilter(baseRow, { status: 500 }), false);

    const errorRow = { ...baseRow, status: 500, error: "Internal Error" };
    assert.equal(rowMatchesFilter(errorRow, { status: "ok" }), false);
    assert.equal(rowMatchesFilter(errorRow, { status: "error" }), true);
  });

  test("provider filter matches provider name and excludes mismatched in-memory rows", () => {
    assert.equal(rowMatchesFilter(baseRow, { provider: "openai" }), true);
    assert.equal(rowMatchesFilter(baseRow, { provider: "anthropic" }), false);
  });

  test("model filter matches model name and excludes mismatched in-memory rows", () => {
    assert.equal(rowMatchesFilter(baseRow, { model: "gpt-4o" }), true);
    assert.equal(rowMatchesFilter(baseRow, { model: "claude-3-5-sonnet" }), false);
  });

  test("search query matches across haystack fields", () => {
    assert.equal(rowMatchesFilter(baseRow, { search: "SmartRouter" }), true);
    assert.equal(rowMatchesFilter(baseRow, { search: "DevKey" }), true);
    assert.equal(rowMatchesFilter(baseRow, { search: "corr-12345" }), true);
    assert.equal(rowMatchesFilter(baseRow, { search: "non-existent" }), false);
  });
});
