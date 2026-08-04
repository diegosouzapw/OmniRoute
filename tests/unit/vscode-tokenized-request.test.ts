import assert from "node:assert/strict";
import test from "node:test";

const tokenizedRequest = await import("../../src/app/api/v1/vscode/[token]/tokenizedRequest.ts");
const rawTokenizedRequest =
  await import("../../src/app/api/v1/vscode/raw/[token]/tokenizedRequest.ts");

test("vscode tokenized request helper infers grouped path token", () => {
  const request = new Request("http://localhost/api/v1/vscode/sk-grouped/models");
  const rewritten = tokenizedRequest.withPathTokenApiKey(request);

  assert.equal(rewritten.headers.get("x-api-key"), "sk-grouped");
  assert.equal(rewritten.headers.get("authorization"), "Bearer sk-grouped");
});

test("vscode tokenized request helper infers raw path token", () => {
  const request = new Request("http://localhost/api/v1/vscode/raw/sk-raw/models");
  const rewritten = rawTokenizedRequest.withPathTokenApiKey(request);

  assert.equal(rewritten.headers.get("x-api-key"), "sk-raw");
  assert.equal(rewritten.headers.get("authorization"), "Bearer sk-raw");
});

test("vscode tokenized request helper preserves existing auth headers", () => {
  const request = new Request("http://localhost/api/v1/vscode/sk-path/models", {
    headers: {
      authorization: "Bearer existing",
      "x-api-key": "sk-existing",
    },
  });
  const rewritten = tokenizedRequest.withPathTokenApiKey(request, "sk-explicit");

  assert.equal(rewritten.headers.get("x-api-key"), "sk-existing");
  assert.equal(rewritten.headers.get("authorization"), "Bearer existing");
});

test("vscode tokenized request helper carries POST bodies", async () => {
  const request = new Request("http://localhost/api/v1/vscode/raw/sk-raw/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model: "test" }),
  });
  const rewritten = rawTokenizedRequest.withPathTokenApiKey(request);

  assert.equal(rewritten.headers.get("x-api-key"), "sk-raw");
  assert.deepEqual(await rewritten.json(), { model: "test" });
});
