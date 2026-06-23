import { test } from "node:test";
import assert from "node:assert/strict";

import {
  findModelById,
  handleGetModelById,
} from "@/app/api/v1/models/modelById";

// #4674 — GET /v1/models/{model} previously had no route handler, so the request
// fell through to the Next.js catch-all and returned the HTML dashboard instead of
// JSON, breaking Claude Code's model-validation probe. These tests pin the JSON
// contract for both the found and not-found paths.

const CATALOG = [
  { id: "claude/claude-sonnet-4-6", object: "model", owned_by: "claude" },
  { id: "cgpt-web/gpt-5.5", object: "model", owned_by: "chatgpt-web" },
  { id: "gpt-5", object: "model", owned_by: "openai" },
];

function listResponse() {
  return Response.json({ object: "list", data: CATALOG });
}

test("findModelById returns the exact-id match", () => {
  const found = findModelById(CATALOG, "claude/claude-sonnet-4-6");
  assert.ok(found);
  assert.equal(found.id, "claude/claude-sonnet-4-6");
  assert.equal(found.object, "model");
});

test("findModelById handles provider-prefixed ids containing a slash", () => {
  const found = findModelById(CATALOG, "cgpt-web/gpt-5.5");
  assert.ok(found);
  assert.equal(found.id, "cgpt-web/gpt-5.5");
});

test("findModelById returns null for an unknown model", () => {
  assert.equal(findModelById(CATALOG, "does-not-exist"), null);
});

test("findModelById tolerates a non-array catalog", () => {
  assert.equal(findModelById(undefined, "gpt-5"), null);
  assert.equal(findModelById(null, "gpt-5"), null);
});

test("handleGetModelById returns 200 JSON for an existing model", async () => {
  const req = new Request("http://localhost:20128/v1/models/gpt-5");
  const res = await handleGetModelById(req, "gpt-5", listResponse);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") || "", /application\/json/);
  const body = await res.json();
  assert.equal(body.id, "gpt-5");
  assert.equal(body.object, "model");
});

test("handleGetModelById returns 404 JSON (not HTML) for an unknown model", async () => {
  const req = new Request("http://localhost:20128/v1/models/ghost");
  const res = await handleGetModelById(req, "ghost", listResponse);
  assert.equal(res.status, 404);
  // The whole point of #4674: never serve the HTML dashboard here.
  const ct = res.headers.get("content-type") || "";
  assert.match(ct, /application\/json/);
  assert.doesNotMatch(ct, /text\/html/);
  const body = await res.json();
  assert.equal(body.error.code, "model_not_found");
  assert.match(body.error.message, /ghost/);
});

test("handleGetModelById propagates an upstream auth/error response unchanged", async () => {
  const req = new Request("http://localhost:20128/v1/models/gpt-5");
  const rejection = async () =>
    Response.json({ error: { message: "unauthorized" } }, { status: 401 });
  const res = await handleGetModelById(req, "gpt-5", rejection);
  assert.equal(res.status, 401);
  const body = await res.json();
  assert.equal(body.error.message, "unauthorized");
});
