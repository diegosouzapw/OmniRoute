import test from "node:test";
import assert from "node:assert/strict";

import {
  NotionAuthError,
  NotionNotFoundError,
  NotionRateLimitError,
  NotionValidationError,
  NotionServerError,
  NotionTimeoutError,
} from "../../src/lib/notion/api.ts";

test("NotionAuthError has correct name", () => {
  const err = new NotionAuthError("bad token");
  assert.equal(err.name, "NotionAuthError");
  assert.equal(err.message, "bad token");
});

test("NotionNotFoundError has correct name", () => {
  const err = new NotionNotFoundError("not found");
  assert.equal(err.name, "NotionNotFoundError");
});

test("NotionRateLimitError has retryAfter property", () => {
  const err = new NotionRateLimitError("rate limited", 5);
  assert.equal(err.retryAfter, 5);
  assert.equal(err.name, "NotionRateLimitError");
});

test("NotionValidationError has correct name", () => {
  const err = new NotionValidationError("invalid");
  assert.equal(err.name, "NotionValidationError");
});

test("NotionServerError has correct name", () => {
  const err = new NotionServerError("server error");
  assert.equal(err.name, "NotionServerError");
});

test("NotionTimeoutError has correct name", () => {
  const err = new NotionTimeoutError("timed out");
  assert.equal(err.name, "NotionTimeoutError");
});

test("createNotionClient returns object with expected methods", async () => {
  const { createNotionClient } = await import("../../src/lib/notion/api.ts");
  const client = createNotionClient("test-token");
  assert.equal(typeof client.searchPagesAndDatabases, "function");
  assert.equal(typeof client.getPage, "function");
  assert.equal(typeof client.listBlockChildren, "function");
  assert.equal(typeof client.queryDatabase, "function");
  assert.equal(typeof client.getDatabase, "function");
  assert.equal(typeof client.appendBlocks, "function");
});
