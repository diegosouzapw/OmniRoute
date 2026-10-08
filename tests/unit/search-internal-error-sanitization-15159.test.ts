import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// Regression guard for audit #15159 / Hard Rule #12 — Wave 1.3.
//
// src/app/api/v1/search/route.ts:444-449 caught ANY unexpected internal exception
// and forwarded its raw message to the client:
//
//   log.error("SEARCH", `Unexpected error: ${err.message}`);
//   const errorPayload = toJsonErrorPayload(err.message, "Internal search error");
//   return new Response(JSON.stringify(errorPayload), { status: 500, ... });
//
// The leak is that `toJsonErrorPayload` was handed an *internal* exception, not
// an upstream provider body. An internal exception's message is our own text:
// it can carry an absolute path, a SQL fragment, a credential echoed from a
// failed connection, or a stack tail.
//
// The sibling alpha/search/route.ts:253-273 already got this right and even
// carries the comment explaining why — buildErrorBody(), which sanitizes
// internally. One file apart, fixed on one side only. This guard pins the
// converged shape and fails if search/route.ts regresses to the raw pattern.

const SEARCH_ROUTE = "src/app/api/v1/search/route.ts";
const ALPHA_SEARCH_ROUTE = "src/app/api/v1/alpha/search/route.ts";

function routeSource(relativePath: string): string {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), "utf8");
}

/**
 * The `catch (err)` tail of a route's postHandler, with line comments stripped.
 *
 * Stripping matters: a prose comment that merely NAMES a sanctioned builder is
 * not a call to it. Caught by reverting the fix and re-running — the
 * convergence assertion below passed on the comment text alone while the code
 * had been rolled back, which is exactly the false-green this file must not have.
 */
function catchTail(source: string): string {
  const index = source.lastIndexOf("} catch (");
  assert.ok(index > -1, "route must have a trailing catch block");
  return source
    .slice(index)
    .split("\n")
    .map((line) => line.replace(/\/\/.*$/, ""))
    .join("\n");
}

test("Wave 1.3: /v1/search does not forward the raw message of an internal exception", () => {
  const tail = catchTail(routeSource(SEARCH_ROUTE));

  assert.doesNotMatch(
    tail,
    /toJsonErrorPayload\(\s*err\.message\s*,\s*"Internal search error"/,
    "the generic catch must not pass err.message to toJsonErrorPayload (audit #15159 wave 1.3)"
  );
});

test("Wave 1.3: /v1/search routes the internal-exception branch through buildErrorBody", () => {
  const tail = catchTail(routeSource(SEARCH_ROUTE));

  assert.match(
    tail,
    /\bbuildErrorBody\(/,
    "the generic catch must build its body with the sanitizing buildErrorBody"
  );
  // The provider-failure branch above it (SearchError) legitimately keeps its own
  // controlled text; only the *unexpected* branch is an internal exception.
  assert.match(tail, /internal_server_error/, "the internal branch needs a canonical error code");
});

test("Wave 1.3: /v1/search keeps its provider-failure branch on toJsonErrorPayload", () => {
  // Scope check: this fix must not disturb the SearchError branch, whose message
  // is our own controlled provider-failure text.
  const tail = catchTail(routeSource(SEARCH_ROUTE));
  assert.match(
    tail,
    /toJsonErrorPayload\(\s*err\.message\s*,\s*"Search provider error"/,
    "the SearchError branch should keep its existing normalized payload"
  );
});

test("Wave 1.3: both search routes sanitize the same way (no one-file divergence)", () => {
  // The audit's core complaint about this class: alpha/search got it right and
  // v1/search did not, one file apart. Assert the two stay converged.
  const searchTail = catchTail(routeSource(SEARCH_ROUTE));
  const alphaTail = catchTail(routeSource(ALPHA_SEARCH_ROUTE));

  assert.match(searchTail, /\bbuildErrorBody\(/, "/v1/search must use buildErrorBody");
  assert.match(alphaTail, /\bbuildErrorBody\(/, "/v1/alpha/search must keep using buildErrorBody");
});

test("Wave 1.3: /v1/search still logs the internal error for the operator", () => {
  // A sanitizer that erases the operator's only diagnostic is not a fix. The
  // log.error must survive — sanitization belongs on the RESPONSE path, not the
  // log path.
  const tail = catchTail(routeSource(SEARCH_ROUTE));
  assert.match(
    tail,
    /log\.error\(\s*"SEARCH"/,
    "the internal exception must still be logged for diagnosis"
  );
});

// The source-shape assertions above prove the route calls the sanctioned builder.
// These two prove the builder itself still does its job, so the guard fails if
// EITHER half regresses — the alpha/search precedent
// (tests/unit/issue-8674-alpha-search.test.ts:84-95) notes that regex-only tests
// "could not have caught" this class and falsely asserted errors were sanitized.
const HOSTILE_INTERNAL_ERROR =
  "ENOENT: no such file or directory, open '/home/user/.secret/keys.json' " +
  "api_key=sk-live-SEARCH-SECRET\n" +
  "    at getProviderCreds (/srv/app/src/sse/services/auth.ts:2943:11)";

async function buildSearchInternalErrorBody(): Promise<string> {
  const { buildErrorBody } = await import("@omniroute/open-sse/utils/error.ts");
  const { HTTP_STATUS } = await import("@omniroute/open-sse/config/constants.ts");
  return JSON.stringify(
    buildErrorBody(HTTP_STATUS.SERVER_ERROR, HOSTILE_INTERNAL_ERROR, undefined, {
      type: "internal_server_error",
      code: "internal_server_error",
    })
  );
}

test("Wave 1.3: the internal-exception body leaks no credential, path or stack frame", async () => {
  const serialized = await buildSearchInternalErrorBody();

  assert.ok(!serialized.includes("sk-live-SEARCH-SECRET"), `credential leaked: ${serialized}`);
  assert.ok(!serialized.includes("/home/user/.secret"), `absolute path leaked: ${serialized}`);
  assert.ok(!serialized.includes("/srv/app"), `server path leaked: ${serialized}`);
  assert.ok(!serialized.includes("    at "), `stack frame leaked: ${serialized}`);
});

test("Wave 1.3: the sanitized body still tells the operator what failed", async () => {
  // A sanitizer that redacts everything is a black hole, not a fix: the 500 must
  // stay diagnosable.
  const serialized = await buildSearchInternalErrorBody();
  assert.match(serialized, /ENOENT/);
  assert.match(serialized, /internal_server_error/);
});
