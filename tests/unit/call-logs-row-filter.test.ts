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

  // Every clause below has a counterpart in buildCallLogFilterSql(). A persisted
  // row reaches this predicate only because that WHERE already accepted it, so a
  // narrower clause here deletes rows the query got right -- silently, since the
  // response is a plain array with no indication anything was dropped.
  const persistedRow = {
    ...baseRow,
    apiKeyId: "01ab6f86-3789-403a-9cf4-2f3f68551db9",
    requestedModel: "gpt-4o-latest",
    comboStepId: "step-7",
    comboExecutionKey: "exec-abc",
  };

  test("apiKey filter matches the key id the dashboard dropdown sends", () => {
    // RequestLoggerV2 builds each option's value as `apiKeyId || apiKeyName`, so
    // selecting a key sends its UUID. The SQL layer matches api_key_name OR
    // api_key_id; matching only the name here emptied the grid for a key with
    // thousands of calls.
    assert.equal(
      rowMatchesFilter(persistedRow, { apiKey: "01ab6f86-3789-403a-9cf4-2f3f68551db9" }),
      true
    );
    assert.equal(rowMatchesFilter(persistedRow, { apiKey: "DevKey" }), true);
    assert.equal(
      rowMatchesFilter(persistedRow, { apiKey: "00000000-0000-0000-0000-000000000000" }),
      false
    );
  });

  test("combo filter is a presence flag, not a name query", () => {
    // The dashboard's Combo tab sends combo=1 and the SQL clause is
    // `combo_name IS NOT NULL` -- the value is never compared. Substring-matching
    // "1" against the name kept only combos whose name happens to contain a "1".
    assert.equal(rowMatchesFilter(persistedRow, { combo: "1" }), true);
    assert.equal(
      rowMatchesFilter({ ...persistedRow, comboName: "Fast Lane" }, { combo: "1" }),
      true
    );
    assert.equal(rowMatchesFilter({ ...persistedRow, comboName: null }, { combo: "1" }), false);
  });

  test("model filter matches the requested model, as the SQL clause does", () => {
    // `(cl.model LIKE @modelQ OR cl.requested_model LIKE @modelQ)`: an alias the
    // client asked for is often the only name the user recognises.
    assert.equal(rowMatchesFilter(persistedRow, { model: "gpt-4o-latest" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { model: "claude-3-5-sonnet" }), false);
  });

  test("search covers the same columns as the SQL haystack", () => {
    assert.equal(rowMatchesFilter(persistedRow, { search: "01ab6f86" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { search: "gpt-4o-latest" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { search: "step-7" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { search: "exec-abc" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { search: "200" }), true);
    assert.equal(rowMatchesFilter(persistedRow, { search: "not-in-any-column" }), false);
  });

  test("an in-flight row with no attribution is still excluded by an apiKey filter", () => {
    // buildCallLogListRows() gives active and recently-completed entries
    // apiKeyId: null, apiKeyName: null. Widening the clause must not turn "no
    // attribution" into "matches every key".
    const inFlight = { ...baseRow, apiKeyId: null, apiKeyName: null, comboName: null, status: 0 };

    assert.equal(rowMatchesFilter(inFlight, { apiKey: "DevKey" }), false);
    assert.equal(
      rowMatchesFilter(inFlight, { apiKey: "01ab6f86-3789-403a-9cf4-2f3f68551db9" }),
      false
    );
    assert.equal(rowMatchesFilter(inFlight, { combo: "1" }), false);
  });
});
