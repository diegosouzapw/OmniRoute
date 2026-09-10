import test from "node:test";
import assert from "node:assert/strict";
import { rowMatchesFilter } from "../../src/app/api/usage/call-logs/route.ts";

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

  // #12873. The dashboard's API-key dropdown carries `apiKeyId || apiKeyName`
  // as its option value, so selecting a key sends the id. `getCallLogs()`
  // matches either column, then this predicate re-filtered the same rows on the
  // name alone and discarded all of them: a key with thousands of calls showed
  // zero rows from the dropdown while typing its name worked.
  const keyedRow = {
    ...baseRow,
    apiKeyId: "01ab6f86-3789-403a-9cf4-2f3f68551db9",
  };

  test("#12873 apiKey filter matches the key id sent by the dropdown", () => {
    assert.equal(
      rowMatchesFilter(keyedRow, { apiKey: "01ab6f86-3789-403a-9cf4-2f3f68551db9" }),
      true
    );
  });

  test("#12873 apiKey filter still matches the key name", () => {
    assert.equal(rowMatchesFilter(keyedRow, { apiKey: "DevKey" }), true);
  });

  test("#12873 apiKey filter rejects a different key id", () => {
    assert.equal(
      rowMatchesFilter(keyedRow, { apiKey: "ffffffff-0000-0000-0000-000000000000" }),
      false
    );
  });

  test("#12873 in-memory rows carry neither field and stay excluded", () => {
    // buildCallLogListRows() emits active/completed entries with both fields
    // null; an API-key filter must not start letting those through.
    const inMemoryRow = { ...baseRow, apiKeyId: null, apiKeyName: null };
    assert.equal(
      rowMatchesFilter(inMemoryRow, { apiKey: "01ab6f86-3789-403a-9cf4-2f3f68551db9" }),
      false
    );
    assert.equal(rowMatchesFilter(inMemoryRow, { apiKey: "DevKey" }), false);
  });

  test("#12873 free-text search reaches the key id, as the SQL predicate does", () => {
    // getCallLogs()'s search branch matches `cl.api_key_id` too.
    assert.equal(rowMatchesFilter(keyedRow, { search: "01ab6f86" }), true);
  });
});
