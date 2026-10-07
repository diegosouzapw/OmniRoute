import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-10849-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeRequest(body: unknown) {
  return new Request("http://localhost/v1/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

type ErrorBody = { error?: { message: string } };

test("#10849: unknown provider id returns 'Unknown search provider: <id>', not opaque 'Invalid request'", async () => {
  const response = await searchRoute.POST(makeRequest({ query: "test", provider: "grok" }), {});
  const body = (await response.json()) as ErrorBody;

  assert.equal(response.status, 400);
  assert.match(
    body.error?.message ?? "",
    /Unknown search provider: grok/,
    `expected a named-provider message, got: ${body.error?.message}`
  );
});

test("#10849: short alias 'brave' resolves like existing 'jina' aliases (not an opaque 400)", async () => {
  const response = await searchRoute.POST(makeRequest({ query: "test", provider: "brave" }), {});
  const body = (await response.json()) as ErrorBody;

  assert.notEqual(
    body.error?.message,
    "Invalid request",
    `expected a named provider error, got opaque: ${JSON.stringify(body.error)}`
  );
});

test("#10849: a genuinely bad field surfaces a non-generic, field-named 400 message", async () => {
  const response = await searchRoute.POST(makeRequest({ query: "test", search_type: "bogus" }), {});
  const body = (await response.json()) as ErrorBody;

  assert.equal(response.status, 400);
  assert.notEqual(
    body.error?.message,
    "Invalid request",
    `expected a field-named message, got opaque: ${JSON.stringify(body.error)}`
  );
  assert.match(
    body.error?.message ?? "",
    /search_type/,
    `expected the message to name the offending field, got: ${body.error?.message}`
  );
});
