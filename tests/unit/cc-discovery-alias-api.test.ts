import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Set DATA_DIR to a temp dir before any imports that touch the DB.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-cc-alias-api-"));
process.env.DATA_DIR = tmpDir;
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/providers/[id]/cc-alias/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(tmpDir, { recursive: true });
}

function makeParams(id: string): { params: Promise<{ id: string }> } {
  return { params: Promise.resolve({ id }) };
}

function putRequest(body: unknown): Request {
  return new Request("http://localhost/api/providers/anthropic/cc-alias", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function getRequest(): Request {
  return new Request("http://localhost/api/providers/anthropic/cc-alias", { method: "GET" });
}

describe("PUT/GET /api/providers/[id]/cc-alias", () => {
  beforeEach(() => {
    resetDb();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    delete process.env.REQUIRE_API_KEY;
  });

  it("PUT provider on -> GET reflects the override", async () => {
    const putRes = await route.PUT(
      putRequest({ scope: "provider", value: "on" }),
      makeParams("anthropic")
    );
    assert.equal(putRes.status, 200);
    const putBody = await putRes.json();
    assert.deepEqual(putBody, { success: true });

    const getRes = await route.GET(getRequest(), makeParams("anthropic"));
    assert.equal(getRes.status, 200);
    const getBody = await getRes.json();
    assert.equal(getBody.provider, "on");
    assert.deepEqual(getBody.models, {});
  });

  it("PUT model off -> GET reflects the override, scoped to that provider only", async () => {
    const putRes = await route.PUT(
      putRequest({ scope: "model", modelId: "claude-opus-4", value: "off" }),
      makeParams("anthropic")
    );
    assert.equal(putRes.status, 200);

    const getRes = await route.GET(getRequest(), makeParams("anthropic"));
    const getBody = await getRes.json();
    assert.equal(getBody.provider, null);
    assert.deepEqual(getBody.models, { "claude-opus-4": "off" });

    // A model override under a different provider must not leak in.
    const otherRes = await route.GET(getRequest(), makeParams("openai"));
    const otherBody = await otherRes.json();
    assert.deepEqual(otherBody.models, {});
  });

  it("PUT value:null clears an existing override back to inherit", async () => {
    await route.PUT(putRequest({ scope: "provider", value: "on" }), makeParams("anthropic"));
    await route.PUT(putRequest({ scope: "provider", value: null }), makeParams("anthropic"));

    const getRes = await route.GET(getRequest(), makeParams("anthropic"));
    const getBody = await getRes.json();
    assert.equal(getBody.provider, null);
  });

  it("PUT with invalid body -> 400", async () => {
    const res = await route.PUT(
      putRequest({ scope: "provider", value: "maybe" }),
      makeParams("anthropic")
    );
    assert.equal(res.status, 400);
  });

  it("PUT with missing scope -> 400", async () => {
    const res = await route.PUT(putRequest({ value: "on" }), makeParams("anthropic"));
    assert.equal(res.status, 400);
  });

  it("PUT scope:model without modelId -> 400", async () => {
    const res = await route.PUT(
      putRequest({ scope: "model", value: "on" }),
      makeParams("anthropic")
    );
    assert.equal(res.status, 400);
  });

  it("PUT with invalid JSON body -> 400 without leaking a stack trace", async () => {
    const badRequest = new Request("http://localhost/api/providers/anthropic/cc-alias", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    const res = await route.PUT(badRequest, makeParams("anthropic"));
    assert.equal(res.status, 400);
    const body = await res.json();
    const text = JSON.stringify(body);
    assert.equal(text.includes(" at "), false, "error body must not leak a stack trace");
    assert.equal(text.toLowerCase().includes(".ts:"), false, "error body must not leak file:line");
  });
});
