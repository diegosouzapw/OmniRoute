// #6414: POST /v1/chat/completions (and /v1/messages) must return HTTP 415
// `unsupported_media_type` when the Content-Type header is not application/json,
// matching OpenAI's reference API and RFC 7231 §6.5.13. Previously OmniRoute
// silently parsed such requests as JSON via `.clone().json().catch(() => null)`
// and let them reach the provider-lookup layer, where they surfaced as misleading
// `model_not_found` / generic errors instead of a boundary 415.
import test from "node:test";
import assert from "node:assert/strict";

const { requireJsonContentType } = await import(
  "../../src/shared/middleware/requireJsonContentType.ts"
);

function makeRequest(method: string, contentType: string | null): Request {
  const headers = new Headers();
  if (contentType !== null) headers.set("content-type", contentType);
  return new Request("http://localhost/v1/chat/completions", {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : "{}",
  });
}

test("returns 415 for text/plain on POST", async () => {
  const rejection = requireJsonContentType(makeRequest("POST", "text/plain"));
  assert.ok(rejection, "expected a rejection Response");
  assert.equal(rejection.status, 415);
  const body = await rejection.json();
  assert.equal(body.error.code, "unsupported_media_type");
  assert.equal(body.error.type, "invalid_request_error");
});

test("returns 415 when Content-Type header is missing on POST", async () => {
  const rejection = requireJsonContentType(makeRequest("POST", null));
  assert.ok(rejection, "missing content-type must be rejected");
  assert.equal(rejection.status, 415);
});

test("returns 415 for application/x-www-form-urlencoded on POST", async () => {
  const rejection = requireJsonContentType(
    makeRequest("POST", "application/x-www-form-urlencoded")
  );
  assert.ok(rejection);
  assert.equal(rejection.status, 415);
});

test("admits application/json", () => {
  assert.equal(requireJsonContentType(makeRequest("POST", "application/json")), null);
});

test("admits application/json with charset suffix", () => {
  assert.equal(
    requireJsonContentType(makeRequest("POST", "application/json; charset=utf-8")),
    null
  );
});

test("admits Application/JSON (case-insensitive)", () => {
  assert.equal(requireJsonContentType(makeRequest("POST", "Application/JSON")), null);
});

test("admits application/json with leading whitespace", () => {
  assert.equal(requireJsonContentType(makeRequest("POST", "  application/json")), null);
});

test("does not touch GET requests (no body → nothing to reject)", () => {
  assert.equal(requireJsonContentType(makeRequest("GET", "text/plain")), null);
});

test("does not touch OPTIONS preflight", () => {
  assert.equal(requireJsonContentType(makeRequest("OPTIONS", null)), null);
});

test("guards PUT and PATCH the same as POST", () => {
  const putRejection = requireJsonContentType(makeRequest("PUT", "text/plain"));
  assert.ok(putRejection);
  assert.equal(putRejection.status, 415);

  const patchRejection = requireJsonContentType(makeRequest("PATCH", "text/plain"));
  assert.ok(patchRejection);
  assert.equal(patchRejection.status, 415);
});

test("rejection carries CORS + JSON headers", () => {
  const rejection = requireJsonContentType(makeRequest("POST", "text/plain"));
  assert.ok(rejection);
  assert.equal(rejection.headers.get("Content-Type"), "application/json");
  assert.ok(rejection.headers.get("Access-Control-Allow-Methods"));
});
