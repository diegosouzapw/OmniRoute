// #6414 — /v1/chat/completions must reject non-JSON Content-Type with 415.
//
// Before the fix, requests with `Content-Type: text/plain` or a missing Content-Type
// were accepted as long as the body parsed as JSON, then flowed through provider lookup.
// This mismatches RFC 7231 and OpenAI/Anthropic edge behavior — those APIs return 415
// Unsupported Media Type at the edge. The fix adds a small guard at the route entry so
// non-JSON media types fail fast with a structured error before body parsing.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6414-content-type-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const bodyJson = JSON.stringify({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "hi" }],
});

test("#6414 rejects Content-Type: text/plain with 415", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: bodyJson,
  });
  const res = await chatRoute.POST(req);
  assert.equal(res.status, 415);
  const body = await res.json();
  assert.equal(body.error.type, "invalid_request_error");
  assert.equal(body.error.code, "unsupported_media_type");
  assert.match(body.error.message, /application\/json/);
});

test("#6414 rejects missing Content-Type with 415", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    body: bodyJson,
  });
  // Explicitly strip content-type — Request may set a default for string bodies.
  req.headers.delete("content-type");
  const res = await chatRoute.POST(req);
  assert.equal(res.status, 415);
  const body = await res.json();
  assert.equal(body.error.code, "unsupported_media_type");
});

test("#6414 accepts Content-Type: application/json (guard is invisible for JSON traffic)", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyJson,
  });
  const res = await chatRoute.POST(req);
  // Downstream will fail resolution (no provider seeded here), but the guard MUST NOT
  // return 415 for a well-formed application/json request.
  assert.notEqual(res.status, 415);
});

test("#6414 accepts application/json with charset parameter", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: bodyJson,
  });
  const res = await chatRoute.POST(req);
  assert.notEqual(res.status, 415);
});

test.after(() => {
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* Windows tempdir cleanup is best-effort */
  }
});
